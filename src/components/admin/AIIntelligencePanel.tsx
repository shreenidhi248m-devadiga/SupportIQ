import React from 'react';
import { AdminAnalytics } from '../../types';
import { BrainCircuit, ArrowRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AIIntelligencePanelProps {
  analytics: AdminAnalytics;
}

export const AIIntelligencePanel: React.FC<AIIntelligencePanelProps> = ({ analytics }) => {
  // Deriving some AI metrics based on total tickets for visual demonstration as per prompt
  const analyzed = analytics.totalTickets || 842;
  const responses = Math.floor(analyzed * 0.73) || 614;
  const routed = Math.floor(analyzed * 0.86) || 729;
  const escalated = Math.floor(analyzed * 0.1) || 86;
  const confidence = analytics.aiResolutionRate || '91%';

  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-[#0a1128] border border-slate-200 dark:border-brand-blue/20 rounded-2xl p-6 h-full flex flex-col relative overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-brand-cyan/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-blue-600 dark:text-brand-cyan" /> SupportIQ AI Intelligence
        </h3>
        <Link to="/admin/ai" className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-brand-cyan dark:hover:text-brand-blue transition-colors flex items-center gap-1 group">
          View AI Insights <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* Left: AI Stats */}
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
            <span className="text-sm text-slate-600 dark:text-slate-300">Requests Analyzed</span>
            <span className="font-mono text-slate-900 dark:text-white font-bold">{analyzed}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
            <span className="text-sm text-slate-600 dark:text-slate-300">AI Responses Generated</span>
            <span className="font-mono text-slate-900 dark:text-white font-bold">{responses}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
            <span className="text-sm text-slate-600 dark:text-slate-300">Auto-Routed Tickets</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{routed}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
            <span className="text-sm text-slate-600 dark:text-slate-300">AI Escalations</span>
            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{escalated}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-slate-600 dark:text-slate-300">Average AI Confidence</span>
            <span className="font-mono text-blue-600 dark:text-brand-cyan font-bold">{confidence}</span>
          </div>
        </div>

        {/* Right: AI Pipeline Visualization */}
        <div className="bg-slate-50 dark:bg-black/30 rounded-xl p-4 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center space-y-2">
          
          <div className="w-full text-center p-2 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-xs text-slate-700 dark:text-slate-300 font-medium shadow-xs">
            Customer Input <span className="text-[10px] text-slate-400 ml-2 font-mono">{analyzed} reqs</span>
          </div>
          <ArrowDown className="w-4 h-4 text-blue-400 dark:text-brand-blue/50" />
          
          <div className="w-full text-center p-2 rounded bg-blue-50 dark:bg-brand-blue/10 border border-blue-200 dark:border-brand-blue/20 text-xs text-blue-700 dark:text-brand-blue font-semibold">
            NLP Understanding
          </div>
          <ArrowDown className="w-4 h-4 text-blue-400 dark:text-brand-blue/50" />
          
          <div className="w-full flex gap-2">
            <div className="flex-1 text-center p-2 rounded bg-purple-50 dark:bg-brand-violet/10 border border-purple-200 dark:border-brand-violet/20 text-[10px] text-purple-700 dark:text-brand-violet font-semibold">
              Sentiment
            </div>
            <div className="flex-1 text-center p-2 rounded bg-cyan-50 dark:bg-brand-cyan/10 border border-cyan-200 dark:border-brand-cyan/20 text-[10px] text-cyan-800 dark:text-brand-cyan font-semibold">
              Priority
            </div>
          </div>
          <ArrowDown className="w-4 h-4 text-blue-400 dark:text-brand-blue/50" />
          
          <div className="w-full text-center p-2 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
            Department Routing <span className="text-[10px] opacity-70 ml-2 font-mono">{routed}</span>
          </div>
          <ArrowDown className="w-4 h-4 text-blue-400 dark:text-brand-blue/50" />

          <div className="w-full text-center p-2 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-slate-200 font-medium shadow-xs">
            AI Response Generation <span className="text-[10px] text-slate-400 ml-2 font-mono">{responses}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
