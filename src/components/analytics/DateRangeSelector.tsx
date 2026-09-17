import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface DateRangeSelectorProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ selectedRange, onRangeChange }) => {
  const ranges = ['Today', '7 Days', '30 Days', '90 Days', 'Custom'];

  return (
    <div className="relative group z-20">
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm font-medium text-slate-200 hover:bg-slate-800 transition-colors shadow-sm">
        <Calendar className="w-4 h-4 text-brand-blue" />
        {selectedRange} 
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>
      
      <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 origin-top">
        {ranges.map(range => (
          <button 
            key={range}
            onClick={() => onRangeChange(range)}
            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors flex items-center justify-between
              ${selectedRange === range ? 'text-brand-cyan bg-brand-cyan/5 font-medium' : 'text-slate-300'}`}
          >
            {range}
            {selectedRange === range && <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_#22d3ee]"></span>}
          </button>
        ))}
      </div>
    </div>
  );
};
