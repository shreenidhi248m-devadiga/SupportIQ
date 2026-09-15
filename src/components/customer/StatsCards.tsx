import React from 'react';
import { Ticket, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Ticket as TicketType } from '../../types';

interface StatsCardsProps {
  tickets: TicketType[];
  loading?: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ tickets, loading = false }) => {
  const total = tickets.length;
  const openCount = tickets.filter((t) => t.status === 'open' || t.status === 'in_progress').length;
  const resolvedCount = tickets.filter((t) => t.status === 'resolved' || t.status === 'closed').length;
  const avgResponseTime = total > 0 ? '< 15 min' : '0 min';

  const stats = [
    {
      label: 'Total Tickets',
      value: total,
      desc: 'All your support requests',
      icon: <Ticket className="w-5 h-5 text-brand-blue" />,
      border: 'border-brand-blue/30',
      glow: 'shadow-brand-blue/10',
    },
    {
      label: 'Open Tickets',
      value: openCount,
      desc: 'Currently being handled',
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      border: 'border-amber-500/30',
      glow: 'shadow-amber-500/10',
    },
    {
      label: 'Resolved',
      value: resolvedCount,
      desc: 'Successfully resolved',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/10',
    },
    {
      label: 'Average Response',
      value: avgResponseTime,
      desc: 'Recent support response time',
      icon: <AlertCircle className="w-5 h-5 text-brand-cyan" />,
      border: 'border-brand-cyan/30',
      glow: 'shadow-brand-cyan/10',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-900/60 border border-white/10 animate-pulse p-4 space-y-3">
            <div className="h-4 bg-slate-800 rounded w-1/2" />
            <div className="h-8 bg-slate-800 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`p-5 rounded-2xl bg-slate-900/70 border ${stat.border} backdrop-blur-xl shadow-lg ${stat.glow} space-y-2 hover:border-white/20 transition-all`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{stat.label}</span>
            <div className="p-2 rounded-xl bg-white/5">{stat.icon}</div>
          </div>
          <p className="text-2xl font-extrabold text-white tracking-tight">{stat.value}</p>
          <p className="text-[11px] text-slate-400">{stat.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
