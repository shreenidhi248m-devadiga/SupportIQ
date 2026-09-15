import React from 'react';
import { CheckCircle2, Clock, Bot, UserCheck, ShieldCheck } from 'lucide-react';

interface TicketTimelineProps {
  status: string;
  department?: string;
}

export const TicketTimeline: React.FC<TicketTimelineProps> = ({ status, department = 'Claims' }) => {
  const steps = [
    { label: 'Ticket Created', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, done: true },
    { label: 'AI Analyzed', icon: <Bot className="w-4 h-4 text-brand-cyan" />, done: true },
    { label: `Routed to ${department}`, icon: <ShieldCheck className="w-4 h-4 text-brand-blue" />, done: true },
    { label: 'Agent Reviewing', icon: <UserCheck className="w-4 h-4 text-amber-400" />, done: status === 'in_progress' || status === 'resolved' },
    { label: 'Resolution', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, done: status === 'resolved' || status === 'closed' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl text-left space-y-4">
      <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase">Ticket Status Timeline</h4>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {steps.map((step, idx) => (
          <div
            key={step.label}
            className={`p-3 rounded-2xl border text-xs font-mono space-y-1.5 transition-all ${
              step.done
                ? 'bg-slate-900 border-white/20 text-white'
                : 'bg-slate-950/40 border-white/5 text-slate-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Step 0{idx + 1}</span>
              {step.icon}
            </div>
            <p className="font-semibold text-xs truncate">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketTimeline;
