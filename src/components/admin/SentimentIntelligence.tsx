import React from 'react';
import { AdminAnalytics } from '../../types';
import { Smile, TrendingDown, TrendingUp } from 'lucide-react';

interface SentimentIntelligenceProps {
  analytics: AdminAnalytics;
}

export const SentimentIntelligence: React.FC<SentimentIntelligenceProps> = ({ analytics }) => {
  const sentiment = analytics.sentimentDistribution || {};
  
  const positive = sentiment['positive'] || 0;
  const neutral = sentiment['neutral'] || 0;
  const frustrated = sentiment['frustrated'] || 0;
  const angry = sentiment['angry'] || 0;
  
  const total = positive + neutral + frustrated + angry || 1;
  
  const data = [
    { label: 'Positive', count: positive, color: 'text-emerald-400', bg: 'bg-emerald-400', pct: Math.round((positive/total)*100) },
    { label: 'Neutral', count: neutral, color: 'text-blue-400', bg: 'bg-blue-400', pct: Math.round((neutral/total)*100) },
    { label: 'Frustrated', count: frustrated, color: 'text-amber-400', bg: 'bg-amber-400', pct: Math.round((frustrated/total)*100) },
    { label: 'Angry', count: angry, color: 'text-rose-500', bg: 'bg-rose-500', pct: Math.round((angry/total)*100) },
  ];

  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Smile className="w-4 h-4 text-emerald-400" /> Customer Sentiment
        </h3>
      </div>

      <div className="space-y-4 flex-1 flex flex-col justify-center">
        {data.map((item) => (
          <div key={item.label} className="group">
            <div className="flex justify-between items-center mb-1.5 text-sm">
              <span className="text-slate-300 font-medium">{item.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-mono">{item.count}</span>
                <span className={`font-mono font-bold ${item.color} w-8 text-right`}>{item.pct}%</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${item.bg} transition-all duration-1000 ease-out`} 
                style={{ width: `${item.pct}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Sentiment Trend</span>
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
            <TrendingDown className="w-3.5 h-3.5" /> Negative sentiment down 12%
          </div>
        </div>
      </div>
    </div>
  );
};
