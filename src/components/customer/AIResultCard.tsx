import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Ticket, ArrowRight, RefreshCw, Cpu, Zap, ShieldAlert, Sparkles } from 'lucide-react';
import { AIAnalysis } from '../../types';
import ticketApi from '../../services/ticketApi';

interface AIResultCardProps {
  analysis: AIAnalysis;
  onReset: () => void;
  onTicketCreated?: () => void;
}

export const AIResultCard: React.FC<AIResultCardProps> = ({ analysis, onReset, onTicketCreated }) => {
  const navigate = useNavigate();
  const [creatingTicket, setCreatingTicket] = useState(false);
  const [ticketCreatedId, setTicketCreatedId] = useState<string | null>(null);

  const handleCreateTicket = async () => {
    setCreatingTicket(true);
    try {
      const formData = new FormData();
      formData.append('subject', analysis.intent || 'Support Request');
      formData.append('description', analysis.aiResponse || 'Automated AI request');
      formData.append('category', analysis.category || 'General Support');
      formData.append('priority', analysis.priority || 'medium');

      const res = await ticketApi.createTicket(formData);
      setTicketCreatedId(res.ticketId);
      if (onTicketCreated) onTicketCreated();
    } catch (err) {
      console.error('Error creating ticket from AI analysis:', err);
    } finally {
      setCreatingTicket(false);
    }
  };

  if (ticketCreatedId) {
    return (
      <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-4 text-center">
        <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
        <div>
          <h3 className="text-xl font-bold text-white">Ticket Created Successfully!</h3>
          <p className="text-xs text-emerald-200 mt-1 font-mono">
            Ticket ID: <span className="font-bold text-white">#{ticketCreatedId}</span>
          </p>
        </div>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(`/customer/tickets/${ticketCreatedId}`)}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2"
          >
            View Ticket <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onReset}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-all"
          >
            Ask Another Question
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Intent</span>
          <p className="font-bold text-white truncate">{analysis.intent || 'General Inquiry'}</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Department</span>
          <p className="font-bold text-brand-cyan truncate">{analysis.department || 'Support'}</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Priority</span>
          <p className="font-bold text-amber-400 uppercase">{analysis.priority || 'medium'}</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">AI Confidence</span>
          <p className="font-bold text-emerald-400">{Math.round((analysis.confidence || 0.95) * 100)}%</p>
        </div>
      </div>

      {/* AI Response Card */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-brand-violet/30 space-y-2 text-left">
        <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan">
          <Sparkles className="w-4 h-4" /> SupportIQ AI Response:
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">{analysis.aiResponse}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
        <button
          onClick={onReset}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Analysis
        </button>

        <button
          onClick={handleCreateTicket}
          disabled={creatingTicket}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue via-brand-violet to-brand-purple text-white font-bold text-xs shadow-lg shadow-brand-violet/25 hover:opacity-95 transition-all flex items-center gap-2"
        >
          {creatingTicket ? 'Creating Ticket...' : 'Convert to Support Ticket'} <Ticket className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AIResultCard;
