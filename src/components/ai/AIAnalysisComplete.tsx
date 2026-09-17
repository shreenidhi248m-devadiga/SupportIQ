import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Edit } from 'lucide-react';
import { AIAnalysis } from '../../types';

interface AIAnalysisCompleteProps {
  analysis: AIAnalysis;
  onViewTicket: () => void;
  onEditRequest: () => void;
}

export const AIAnalysisComplete: React.FC<AIAnalysisCompleteProps> = ({ 
  analysis, 
  onViewTicket, 
  onEditRequest 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-3xl font-bold text-white">Analysis Complete</h2>
        <p className="text-slate-400">SupportIQ has understood your request.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Intent</div>
          <div className="text-white font-semibold capitalize">{analysis.intent}</div>
        </div>
        <div className="bg-slate-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Category</div>
          <div className="text-white font-semibold capitalize">{analysis.category}</div>
        </div>
        <div className="bg-slate-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Sentiment</div>
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold capitalize">{analysis.sentiment}</span>
            <span className="text-xs text-brand-cyan">{(analysis.sentimentScore * 100).toFixed(0)}%</span>
          </div>
        </div>
        <div className="bg-slate-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Priority</div>
          <div className="text-white font-semibold capitalize">{analysis.priority}</div>
        </div>
        <div className="bg-slate-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Department</div>
          <div className="text-white font-semibold capitalize">{analysis.department}</div>
        </div>
        <div className="bg-slate-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">AI Confidence</div>
          <div className="text-emerald-400 font-semibold">{(analysis.confidence * 100).toFixed(0)}%</div>
        </div>
      </div>

      <div className="bg-brand-blue/10 border border-brand-blue/30 rounded-xl p-6 mt-6">
        <h3 className="text-sm font-mono text-brand-blue uppercase tracking-wider mb-2">SupportIQ Recommendation</h3>
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          This request appears to require assistance from the {analysis.department} Department.
        </p>
        <div className="text-sm text-white font-medium bg-slate-900/50 p-4 rounded-lg border border-white/5">
          <span className="text-slate-400 block mb-1 text-xs">Recommended action:</span>
          {analysis.aiResponse || "Review the provided information and begin verification process."}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button 
          onClick={onViewTicket}
          className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet text-white font-bold text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          View Support Ticket <ArrowRight className="w-4 h-4" />
        </button>
        <button 
          onClick={onEditRequest}
          className="py-3.5 px-6 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" /> Edit Request
        </button>
      </div>
    </motion.div>
  );
};
