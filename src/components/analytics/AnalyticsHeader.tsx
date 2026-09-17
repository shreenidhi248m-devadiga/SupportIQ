import React from 'react';
import { DateRangeSelector } from './DateRangeSelector';

interface AnalyticsHeaderProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ selectedRange, onRangeChange }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Customer Intelligence</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Monitor support trends, discover customer patterns, and identify customers who may be at risk of leaving with AI-powered analytics.
        </p>
      </div>
      
      <div className="shrink-0 flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Range</span>
        <DateRangeSelector selectedRange={selectedRange} onRangeChange={onRangeChange} />
      </div>
    </div>
  );
};
