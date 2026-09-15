import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import adminApi from '../services/adminApi';
import { CustomerIntelligence } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { Sparkles, Shield, User, ArrowLeft, AlertTriangle, TrendingUp, Clock, Ticket as TicketIcon, CheckCircle } from 'lucide-react';

export const CustomerIntelligencePage: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();

  const [intel, setIntel] = useState<CustomerIntelligence | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntel = async () => {
      if (!customerId) return;
      setLoading(true);
      try {
        const data = await adminApi.getCustomerIntelligence(customerId);
        setIntel(data);
      } catch (err: any) {
        console.error('Error fetching customer intelligence:', err);
        setError(err.response?.data?.message || 'Failed to retrieve customer intelligence');
      } finally {
        setLoading(false);
      }
    };
    fetchIntel();
  }, [customerId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner text="Computing predictive customer intelligence telemetry..." />
      </div>
    );
  }

  if (error || !intel) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Intelligence Profile Unavailable</h2>
        <p className="text-sm text-slate-400">{error || 'Could not locate customer telemetry.'}</p>
        <Link to="/admin/customers" className="inline-block px-5 py-2.5 rounded-xl bg-brand-violet text-white text-sm font-bold">
          Back to Customer Directory
        </Link>
      </div>
    );
  }

  const { customer, activity, ticketHistory, sentimentHistory } = intel;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Bar */}
      <div>
        <Link to="/admin/customers" className="text-xs font-mono text-brand-blue hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Customer Directory
        </Link>
        <h1 className="text-3xl font-extrabold text-white">Customer Intelligence Telemetry</h1>
        <p className="text-sm text-slate-400">Predictive dissatisfaction alerts, churn risk analysis, and sentiment history.</p>
      </div>

      {/* Customer Header Info Panel */}
      <div className="glass-panel p-8 rounded-3xl border border-brand-violet/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-blue via-brand-violet to-brand-purple flex items-center justify-center font-extrabold text-white text-2xl shadow-lg shadow-brand-violet/20">
            {customer.name ? customer.name.charAt(0).toUpperCase() : 'C'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{customer.name}</h2>
            <p className="text-xs font-mono text-brand-blue">{customer.email}</p>
            <p className="text-xs font-mono text-slate-400 mt-1">Phone: {customer.phone || 'N/A'}</p>
          </div>
        </div>

        {/* Churn Risk Badge Box */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-right space-y-1 font-mono w-full md:w-auto">
          <span className="text-[10px] text-slate-400 uppercase block">PREDICTED CHURN RISK</span>
          <div className="flex items-center justify-end gap-2">
            <span
              className={`text-xl font-extrabold ${
                activity.riskLevel === 'High'
                  ? 'text-rose-400'
                  : activity.riskLevel === 'Medium'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {activity.riskLevel} Risk ({((activity.churnScore || 0.15) * 100).toFixed(0)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Activity Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">TOTAL TICKETS</span>
          <p className="text-3xl font-extrabold text-white font-mono">{activity.totalTickets}</p>
          <p className="text-xs text-slate-400">{activity.openTickets} open, {activity.resolvedTickets} resolved</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">COMPLAINT FREQUENCY</span>
          <p className="text-3xl font-extrabold text-brand-violet font-mono">{activity.complaintFrequency}</p>
          <p className="text-xs text-slate-400">Inquiry recurrence rate</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">AVG RESOLUTION TIME</span>
          <p className="text-3xl font-extrabold text-brand-cyan font-mono">{activity.resolutionTimeAvg}</p>
          <p className="text-xs text-slate-400">Time to resolution</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase">CHURN SCORE</span>
          <p className="text-3xl font-extrabold text-amber-400 font-mono">{((activity.churnScore || 0) * 100).toFixed(0)}%</p>
          <p className="text-xs text-slate-400">Retention risk probability</p>
        </div>
      </div>

      {/* Sentiment History Timeline & Ticket History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Sentiment Timeline */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-blue" /> Sentiment History
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {sentimentHistory.length === 0 ? (
              <p className="text-slate-500 py-4 text-center">No sentiment history recorded yet.</p>
            ) : (
              sentimentHistory.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-bold text-white truncate max-w-[200px]">{item.subject}</span>
                    <span className="text-rose-400 font-bold">{item.sentiment}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Priority: {item.priority}</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Ticket History */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TicketIcon className="w-5 h-5 text-brand-violet" /> Customer Ticket History
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {ticketHistory.length === 0 ? (
              <p className="text-slate-500 py-4 text-center">No ticket history recorded.</p>
            ) : (
              ticketHistory.map((t) => (
                <Link
                  key={t._id}
                  to={`/customer/tickets/${t.ticketId}`}
                  className="block p-4 rounded-xl bg-black/40 hover:bg-white/5 border border-white/5 space-y-1 transition-colors"
                >
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-brand-blue font-bold">#{t.ticketId}</span>
                    <span className="uppercase text-amber-400 font-bold">{t.status}</span>
                  </div>
                  <p className="font-sans text-sm font-bold text-white truncate">{t.subject}</p>
                </Link>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default CustomerIntelligencePage;