import React from 'react';
import { AdminAnalytics } from '../../types';
import { Users, Ticket, FolderOpen, CheckCircle, BrainCircuit, AlertOctagon } from 'lucide-react';

interface KPICardsProps {
  analytics: AdminAnalytics;
}

export const KPICards: React.FC<KPICardsProps> = ({ analytics }) => {
  
  // High-Risk Customers is not currently in the analytics endpoint, so we simulate it here based on total customers.
  // In a real app, this would be fetched from the backend.
  const highRiskCustomers = Math.floor(analytics.totalCustomers * 0.08);

  const kpis = [
    {
      id: 'total-customers',
      label: 'Total Customers',
      value: analytics.totalCustomers.toLocaleString(),
      icon: Users,
      trend: '+4.2%',
      trendUp: true,
      color: 'text-brand-blue',
      bg: 'bg-brand-blue/10 border-brand-blue/20'
    },
    {
      id: 'total-tickets',
      label: 'Total Tickets',
      value: analytics.totalTickets.toLocaleString(),
      icon: Ticket,
      trend: '+12.4%',
      trendUp: true,
      color: 'text-brand-violet',
      bg: 'bg-brand-violet/10 border-brand-violet/20'
    },
    {
      id: 'open-tickets',
      label: 'Open Tickets',
      value: analytics.openTickets.toLocaleString(),
      icon: FolderOpen,
      trend: '-2.1%',
      trendUp: false,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10 border-amber-400/20'
    },
    {
      id: 'resolved-tickets',
      label: 'Resolved Tickets',
      value: analytics.resolvedTickets.toLocaleString(),
      icon: CheckCircle,
      trend: '+18.3%',
      trendUp: true,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/20'
    },
    {
      id: 'ai-resolution',
      label: 'AI Resolution Rate',
      value: analytics.aiResolutionRate,
      icon: BrainCircuit,
      trend: '+5.4%',
      trendUp: true,
      color: 'text-brand-cyan',
      bg: 'bg-brand-cyan/10 border-brand-cyan/20'
    },
    {
      id: 'high-risk',
      label: 'High-Risk Customers',
      value: highRiskCustomers.toLocaleString(),
      icon: AlertOctagon,
      trend: '-1.2%',
      trendUp: false, // decreasing churn risk is good
      color: 'text-rose-400',
      bg: 'bg-rose-400/10 border-rose-400/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.id} className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 hover:bg-slate-800/50 transition-colors group relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${kpi.trendUp && kpi.id !== 'high-risk' ? 'text-emerald-400 bg-emerald-400/10' : kpi.id === 'high-risk' && !kpi.trendUp ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`} title="vs previous period">
                {kpi.trendUp ? '↑' : '↓'} {kpi.trend.replace('-', '')}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-2xl font-bold text-white tracking-tight font-mono">{kpi.value}</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">{kpi.label}</div>
            </div>
            
            {/* Subtle glow effect on hover */}
            <div className={`absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out transition-transform`} />
          </div>
        );
      })}
    </div>
  );
};
