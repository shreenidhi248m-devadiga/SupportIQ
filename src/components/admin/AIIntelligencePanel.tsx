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
    <div className="bg-gradient-to-br from-slate-900 to-[#0a1128] border border-brand-blue/20 rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-brand-cyan" /> SupportIQ AI Intelligence
        </h3>
        <Link to="/admin/insights" className="text-xs font-semibold text-brand-cyan hover:text-brand-blue transition-colors flex items-center gap-1 group">
          View AI Insights <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* Left: AI Stats */}
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-sm text-slate-300">Requests Analyzed</span>
            <span className="font-mono text-white font-bold">{analyzed}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-sm text-slate-300">AI Responses Generated</span>
            <span className="font-mono text-white font-bold">{responses}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-sm text-slate-300">Auto-Routed Tickets</span>
            <span className="font-mono text-emerald-400 font-bold">{routed}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-sm text-slate-300">AI Escalations</span>
            <span className="font-mono text-amber-400 font-bold">{escalated}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-slate-300">Average AI Confidence</span>
            <span className="font-mono text-brand-cyan font-bold">{confidence}</span>
          </div>
        </div>

        {/* Right: AI Pipeline Visualization */}
        <div className="bg-black/30 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center space-y-2">
          
          <div className="w-full text-center p-2 rounded bg-white/5 text-xs text-slate-300 font-medium">
            Customer Input <span className="text-[10px] text-slate-500 ml-2 font-mono">{analyzed} reqs</span>
          </div>
          <ArrowDown className="w-4 h-4 text-brand-blue/50" />
          
          <div className="w-full text-center p-2 rounded bg-brand-blue/10 border border-brand-blue/20 text-xs text-brand-blue font-medium shadow-[0_0_10px_rgba(56,189,248,0.1)]">
            NLP Understanding
          </div>
          <ArrowDown className="w-4 h-4 text-brand-blue/50" />
          
          <div className="w-full flex gap-2">
            <div className="flex-1 text-center p-2 rounded bg-brand-violet/10 border border-brand-violet/20 text-[10px] text-brand-violet font-medium shadow-[0_0_10px_rgba(139,92,246,0.1)]">
              Sentiment
            </div>
            <div className="flex-1 text-center p-2 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-[10px] text-brand-cyan font-medium shadow-[0_0_10px_rgba(34,211,238,0.1)]">
              Priority
            </div>
          </div>
          <ArrowDown className="w-4 h-4 text-brand-blue/50" />
          
          <div className="w-full text-center p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            Department Routing <span className="text-[10px] opacity-70 ml-2 font-mono">{routed}</span>
          </div>
          <ArrowDown className="w-4 h-4 text-brand-blue/50" />

          <div className="w-full text-center p-2 rounded bg-white/5 border border-white/10 text-xs text-slate-200 font-medium">
            AI Response Generation <span className="text-[10px] text-slate-500 ml-2 font-mono">{responses}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
