import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../services/adminApi';
import { AdminAnalytics } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { Shield, Users, Ticket as TicketIcon, CheckCircle, Clock, AlertTriangle, BarChart2, PieChart, TrendingUp, Cpu, RefreshCw } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.getAnalytics();
      setAnalytics(data);
    } catch (err: any) {
      console.error('Error fetching admin analytics:', err);
      setError(err.response?.data?.message || 'Error connecting to admin analytics backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner text="Aggregating MongoDB system telemetry..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-brand-cyan/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/10 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 text-xs font-mono text-brand-cyan">
            <Shield className="w-3.5 h-3.5" /> Admin Command Center
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">System Telemetry & Analytics</h1>
          <p className="text-slate-400 text-sm">
            Live database counts, department workload breakdown, sentiment metrics, and AI resolution rates.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={fetchAnalytics}
            className="p-3 rounded-xl glass-panel hover:bg-white/10 border border-white/10 text-slate-300 transition-colors"
            title="Refresh Metrics"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <Link
            to="/admin/tickets"
            className="px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-brand-cyan hover:opacity-90 transition-all shadow-lg shadow-brand-cyan/20 flex items-center gap-2"
          >
            Manage All Tickets
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
          {error}
        </div>
      )}

      {analytics && (
        <>
          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-mono font-semibold uppercase">TOTAL CUSTOMERS</span>
                <Users className="w-5 h-5 text-brand-blue" />
              </div>
              <p className="text-3xl font-extrabold text-white font-mono">{analytics.totalCustomers}</p>
              <p className="text-xs text-slate-400">Registered platform users</p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-mono font-semibold uppercase">TOTAL TICKETS</span>
                <TicketIcon className="w-5 h-5 text-brand-violet" />
              </div>
              <p className="text-3xl font-extrabold text-white font-mono">{analytics.totalTickets}</p>
              <p className="text-xs text-slate-400">Recorded support requests</p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-mono font-semibold uppercase">RESOLUTION RATE</span>
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-extrabold text-emerald-400 font-mono">{analytics.resolutionRate}</p>
              <p className="text-xs text-slate-400">{analytics.resolvedTickets} tickets resolved</p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-mono font-semibold uppercase">AI AUTO-ROUTING ACCURACY</span>
                <Cpu className="w-5 h-5 text-brand-cyan" />
              </div>
              <p className="text-3xl font-extrabold text-brand-cyan font-mono">{analytics.aiResolutionRate}</p>
              <p className="text-xs text-slate-400">High confidence classification</p>
            </div>

          </div>

          {/* Breakdown Grids */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Tickets by Department */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-brand-blue" /> Workload by Department
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {Object.entries(analytics.ticketsByDepartment || {}).length === 0 ? (
                  <p className="text-slate-500 py-4 text-center">No department data</p>
                ) : (
                  Object.entries(analytics.ticketsByDepartment).map(([dept, count]) => (
                    <div key={dept} className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>{dept}</span>
                        <span className="font-bold text-white">{count}</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-blue h-full rounded-full"
                          style={{ width: `${Math.min(100, (count / (analytics.totalTickets || 1)) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Sentiment Distribution */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-brand-violet" /> Sentiment Breakdown
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {Object.entries(analytics.sentimentDistribution || {}).length === 0 ? (
                  <p className="text-slate-500 py-4 text-center">No sentiment telemetry</p>
                ) : (
                  Object.entries(analytics.sentimentDistribution).map(([sent, count]) => (
                    <div key={sent} className="p-3 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center">
                      <span className="text-slate-300">{sent}</span>
                      <span className="font-bold text-brand-violet">{count} Tickets</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Priority Breakdown */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-brand-amber" /> Tickets by Priority
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {Object.entries(analytics.ticketsByPriority || {}).length === 0 ? (
                  <p className="text-slate-500 py-4 text-center">No priority telemetry</p>
                ) : (
                  Object.entries(analytics.ticketsByPriority).map(([prio, count]) => (
                    <div key={prio} className="p-3 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center">
                      <span className="text-slate-300 uppercase font-bold">{prio}</span>
                      <span className="font-bold text-amber-400">{count}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default AdminDashboard;