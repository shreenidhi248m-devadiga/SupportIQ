import React, { useState } from 'react';
import { AdminAnalytics } from '../../types';
import { BarChart3, ChevronDown } from 'lucide-react';

interface TicketOperationsChartProps {
  analytics: AdminAnalytics;
}

export const TicketOperationsChart: React.FC<TicketOperationsChartProps> = ({ analytics }) => {
  const [filter, setFilter] = useState('7 Days');

  // We are provided `ticketTrends` from the backend API.
  const trends = analytics.ticketTrends || [];

  // Finding max value for scaling the CSS chart
  const maxValue = trends.length > 0 ? Math.max(...trends.map(t => t.tickets)) : 100;
  // Fallback data if empty
  const displayData = trends.length > 0 ? trends : [
    { day: 'Mon', tickets: 45 }, { day: 'Tue', tickets: 52 }, { day: 'Wed', tickets: 38 },
    { day: 'Thu', tickets: 65 }, { day: 'Fri', tickets: 48 }, { day: 'Sat', tickets: 25 },
    { day: 'Sun', tickets: 30 }
  ];
  const chartMax = Math.max(...displayData.map(t => t.tickets)) * 1.2;

  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-blue" /> Support Ticket Overview
        </h3>
        
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors">
            {filter} <ChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute right-0 top-full mt-1 w-32 bg-slate-800 border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 py-1">
            {['Today', '7 Days', '30 Days', '90 Days'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-700 transition-colors ${filter === f ? 'text-brand-blue font-semibold' : 'text-slate-300'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-end gap-2 md:gap-4 h-48 mt-auto pt-4 relative border-b border-white/10 pb-4">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-4 w-8 flex flex-col justify-between text-[10px] text-slate-500 font-mono">
           <span>{Math.round(chartMax)}</span>
           <span>{Math.round(chartMax / 2)}</span>
           <span>0</span>
        </div>

        {/* Chart Bars */}
        <div className="flex-1 flex items-end justify-between gap-1 md:gap-3 pl-10 h-full relative z-10">
          {displayData.map((data, index) => {
            const heightPercentage = (data.tickets / chartMax) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                {/* Tooltip */}
                <div className="absolute -top-10 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 z-20">
                  {data.tickets} tickets
                </div>
                
                {/* Bar */}
                <div className="w-full relative flex items-end justify-center h-full">
                  <div 
                    className="w-full bg-gradient-to-t from-brand-blue/80 to-brand-cyan/80 rounded-t-sm transition-all duration-1000 ease-out hover:from-brand-blue hover:to-brand-cyan"
                    style={{ height: `${heightPercentage}%` }}
                  ></div>
                </div>
                
                {/* X-axis label */}
                <div className="absolute -bottom-6 text-[10px] text-slate-400 font-mono">
                  {data.day}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Grid lines */}
        <div className="absolute left-10 right-0 top-0 h-px bg-white/5"></div>
        <div className="absolute left-10 right-0 top-1/2 h-px bg-white/5"></div>
      </div>
    </div>
  );
};
