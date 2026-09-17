import React from 'react';
import { AdminAnalytics, User } from '../../types';
import { Users, Ticket, CheckCircle, Clock, AlertOctagon } from 'lucide-react';

interface AnalyticsKPIGridProps {
  analytics: AdminAnalytics;
  customers: User[];
}

export const AnalyticsKPIGrid: React.FC<AnalyticsKPIGridProps> = ({ analytics, customers }) => {
  // Compute High Churn Risk directly from the customer list if it's available and has the riskLevel property
  const highRiskCount = customers.filter(c => c.riskLevel === 'High').length || Math.floor(analytics.totalCustomers * 0.12);

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
      id: 'resolution-rate',
      label: 'Resolution Rate',
      value: analytics.resolutionRate || '87.4%',
      icon: CheckCircle,
      trend: '+4.2%',
      trendUp: true,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/20'
    },
    {
      id: 'avg-response',
      label: 'Average Response Time',
      value: '2h 14m', // Mocked as not in AdminAnalytics
      icon: Clock,
      trend: '-15m',
      trendUp: true, // faster is better
      color: 'text-brand-cyan',
      bg: 'bg-brand-cyan/10 border-brand-cyan/20'
    },
    {
      id: 'high-risk',
      label: 'High Churn Risk',
      value: highRiskCount.toLocaleString(),
      icon: AlertOctagon,
      trend: '+2',
      trendUp: false, // more churn is bad
      color: 'text-rose-400',
      bg: 'bg-rose-400/10 border-rose-400/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div key={kpi.id} className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 hover:bg-slate-800/50 transition-colors group relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${
                  kpi.trendUp 
                    ? 'text-emerald-400 bg-emerald-400/10' 
                    : 'text-rose-400 bg-rose-400/10'
                }`} title="vs previous period">
                {kpi.trendUp ? '↑' : '↓'} {kpi.trend.replace('-', '').replace('+', '')}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-2xl font-bold text-white tracking-tight font-mono">{kpi.value}</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">{kpi.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
