import React from 'react';
import { AdminAnalytics } from '../../types';
import { AlertOctagon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChurnRiskPanelProps {
  analytics: AdminAnalytics;
}

export const ChurnRiskPanel: React.FC<ChurnRiskPanelProps> = ({ analytics }) => {
  // Mocking high risk customers data for the dashboard visual requirements
  const highRiskCustomers = [
    { id: 'CUST-8492', name: 'Acme Corp', tickets: 12, sentiment: 'Frustrated', risk: 'High', lastActive: '2 hrs ago' },
    { id: 'CUST-3921', name: 'Global Tech', tickets: 8, sentiment: 'Angry', risk: 'High', lastActive: '1 hr ago' },
    { id: 'CUST-1044', name: 'Nexus Inc', tickets: 15, sentiment: 'Frustrated', risk: 'Medium', lastActive: '5 hrs ago' },
  ];

  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-rose-500" /> Customer Churn Risk
        </h3>
        <Link to="/admin/churn" className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 group">
          View All <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Customer</th>
              <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono text-center">Open Tickets</th>
              <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Recent Sentiment</th>
              <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono text-right">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {highRiskCustomers.map((cust) => (
              <tr key={cust.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="py-3">
                  <div className="text-sm font-medium text-white">{cust.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{cust.id}</div>
                </td>
                <td className="py-3 text-sm text-slate-300 font-mono text-center">{cust.tickets}</td>
                <td className="py-3">
                   <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border ${
                     cust.sentiment === 'Angry' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-400/10 text-amber-400 border-amber-400/20'
                   }`}>
                     {cust.sentiment}
                   </span>
                </td>
                <td className="py-3 text-sm text-slate-400 font-mono text-right">{cust.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
