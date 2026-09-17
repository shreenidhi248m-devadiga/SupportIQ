import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertOctagon, TrendingDown, Clock, MessageSquare, Info } from 'lucide-react';
import { CustomerIntelligence } from '../../types';
import adminApi from '../../services/adminApi';
import LoadingSpinner from '../LoadingSpinner';

interface CustomerIntelligenceDrawerProps {
  customerId: string;
  onClose: () => void;
}

export const CustomerIntelligenceDrawer: React.FC<CustomerIntelligenceDrawerProps> = ({ customerId, onClose }) => {
  const [data, setData] = useState<CustomerIntelligence | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntelligence = async () => {
      setLoading(true);
      setError(null);
      try {
        const intel = await adminApi.getCustomerIntelligence(customerId);
        setData(intel);
      } catch (err: any) {
        setError("Could not load customer intelligence.");
      } finally {
        setLoading(false);
      }
    };
    fetchIntelligence();
  }, [customerId]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        {/* Drawer */}
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md h-full bg-[#040612] border-l border-white/10 shadow-2xl flex flex-col"
        >
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner text="Analyzing customer history..." />
            </div>
          ) : error || !data ? (
            <div className="p-8 text-center text-rose-400">
              <p>{error || "No data found."}</p>
              <button onClick={onClose} className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg">Close</button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-6 border-b border-white/10 bg-slate-900/50 flex items-start justify-between shrink-0">
                <div>
                  <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Customer Intelligence</h2>
                  <div className="text-xl font-bold text-white mb-1">{data.customer.name}</div>
                  <div className="text-sm font-mono text-brand-cyan">{data.customer.email}</div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                
                {/* Prediction Card */}
                <div className="bg-slate-900 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] pointer-events-none"></div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-300">Predicted Risk</h3>
                    <div className="text-xs font-mono text-slate-500">Confidence: 84%</div>
                  </div>
                  
                  <div className="flex items-end gap-4 mb-4">
                    <div className="text-5xl font-black font-mono text-white tracking-tighter">
                      {Math.round(data.activity.churnScore * 100)}<span className="text-xl text-slate-500 font-medium">/100</span>
                    </div>
                    <div className="pb-1 text-lg font-bold text-rose-400 flex items-center gap-1">
                      <AlertOctagon className="w-5 h-5" /> {data.activity.riskLevel} Risk
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase">Contributing Signals</h4>
                    <ul className="text-sm text-slate-300 space-y-2">
                      <li className="flex gap-2"><span className="text-rose-500">•</span> High frequency of support requests in the last 30 days</li>
                      <li className="flex gap-2"><span className="text-rose-500">•</span> Consistently frustrated sentiment in recent interactions</li>
                      <li className="flex gap-2"><span className="text-rose-500">•</span> Resolution time average exceeds normal thresholds</li>
                    </ul>
                  </div>
                </div>

                {/* Information Callout */}
                <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-brand-blue mb-1">How is this prediction generated?</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      SupportIQ analyzes relevant customer-support signals such as interaction frequency, unresolved requests, sentiment patterns, and other available behavioral indicators to estimate churn risk. <strong>Predictions are estimates, not guarantees.</strong>
                    </p>
                  </div>
                </div>

                {/* Support History Summary */}
                <div>
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-violet" /> Support History
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                      <div className="text-xs text-slate-500 mb-1">Total Tickets</div>
                      <div className="font-mono font-bold text-white">{data.activity.totalTickets}</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                      <div className="text-xs text-slate-500 mb-1">Open Tickets</div>
                      <div className="font-mono font-bold text-amber-400">{data.activity.openTickets}</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                      <div className="text-xs text-slate-500 mb-1">Resolved Tickets</div>
                      <div className="font-mono font-bold text-emerald-400">{data.activity.resolvedTickets}</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                      <div className="text-xs text-slate-500 mb-1">Avg Resolution Time</div>
                      <div className="font-mono font-bold text-slate-300">{data.activity.resolutionTimeAvg}</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Timeline */}
                <div>
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-brand-cyan" /> Recent Activity
                  </h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
                    {data.ticketHistory?.slice(0, 3).map((ticket, i) => (
                      <div key={ticket.ticketId} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                         <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-[#040612] bg-brand-cyan shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                         <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-slate-900/80 p-3 rounded-xl border border-white/5 ml-4 md:ml-0 shadow-sm">
                           <div className="text-[10px] text-brand-cyan font-mono mb-1">{new Date(ticket.createdAt).toLocaleDateString()}</div>
                           <div className="text-xs font-medium text-white mb-1 truncate">{ticket.subject}</div>
                           <div className="text-[10px] text-slate-500 capitalize">Status: {ticket.status.replace('_', ' ')}</div>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
                
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
