import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SupportVolumeChartProps {
  trends: Array<{ day: string; tickets: number }>;
}

export const SupportVolumeChart: React.FC<SupportVolumeChartProps> = ({ trends }) => {
  const [metric, setMetric] = useState('Total Tickets');

  // Fallback data if backend doesn't provide
  const displayData = trends.length > 0 ? trends : [
    { day: 'Mon', tickets: 45 }, { day: 'Tue', tickets: 52 }, { day: 'Wed', tickets: 38 },
    { day: 'Thu', tickets: 65 }, { day: 'Fri', tickets: 48 }, { day: 'Sat', tickets: 25 },
    { day: 'Sun', tickets: 30 }
  ];

  // Adjust display data based on metric purely for visual demonstration
  const adjustedData = displayData.map(d => ({
    ...d,
    tickets: metric === 'Resolved Tickets' ? Math.floor(d.tickets * 0.8) : 
             metric === 'Escalated Tickets' ? Math.floor(d.tickets * 0.15) : d.tickets
  }));

  const chartMax = Math.max(...adjustedData.map(t => t.tickets), 10) * 1.2;

  const metrics = ['Total Tickets', 'New Tickets', 'Resolved Tickets', 'Escalated Tickets'];

  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-blue" /> Support Volume
        </h3>
        
        <div className="flex bg-slate-900/80 p-1 rounded-lg border border-white/5 overflow-x-auto no-scrollbar">
          {metrics.map(m => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                metric === m ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-end gap-2 md:gap-4 h-64 relative border-b border-white/10 pb-4">
        {/* Y-axis */}
        <div className="absolute left-0 top-0 bottom-4 w-8 flex flex-col justify-between text-[10px] text-slate-500 font-mono">
           <span>{Math.round(chartMax)}</span>
           <span>{Math.round(chartMax * 0.75)}</span>
           <span>{Math.round(chartMax * 0.5)}</span>
           <span>{Math.round(chartMax * 0.25)}</span>
           <span>0</span>
        </div>

        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(pct => (
          <div key={pct} className="absolute left-10 right-0 h-px bg-white/5" style={{ bottom: `${pct}%` }}></div>
        ))}

        {/* Chart Bars/Area */}
        <div className="flex-1 flex items-end justify-between gap-1 md:gap-4 pl-10 h-full relative z-10 w-full">
          {adjustedData.map((data, index) => {
            const heightPercentage = (data.tickets / chartMax) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center group relative h-full justify-end w-full">
                
                {/* Tooltip */}
                <div className="absolute -top-12 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 z-20 shadow-xl flex flex-col items-center">
                  <span className="font-bold text-brand-blue">{data.tickets}</span>
                  <span className="text-[10px] text-slate-400">{data.day}</span>
                </div>
                
                {/* The Bar */}
                <div className="w-full relative flex items-end justify-center h-full max-w-[40px]">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercentage}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    className={`w-full rounded-t-sm transition-colors ${
                      metric === 'Escalated Tickets' ? 'bg-rose-500/80 group-hover:bg-rose-400' :
                      metric === 'Resolved Tickets' ? 'bg-emerald-500/80 group-hover:bg-emerald-400' :
                      'bg-brand-blue/80 group-hover:bg-brand-cyan'
                    }`}
                  />
                </div>
                
                {/* X-axis label */}
                <div className="absolute -bottom-6 text-[10px] text-slate-400 font-mono">
                  {data.day}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
