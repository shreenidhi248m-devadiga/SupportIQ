import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Cpu, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

export const BrandPanel: React.FC = () => {
  const workflowSteps = [
    { label: 'Customer Request', icon: '📩', desc: 'Accident claim submitted with photos' },
    { label: 'AI Understanding', icon: '🧠', desc: 'Intent & entity extraction' },
    { label: 'Sentiment Analysis', icon: '⚡', desc: 'Score: -0.85 (High Urgency)' },
    { label: 'Smart Routing', icon: '🎯', desc: 'Routed to Claims Department' },
    { label: 'Resolution', icon: '✨', desc: 'Instant AI response dispatched' },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-8 lg:p-12 text-left relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="space-y-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-violet p-0.5 shadow-lg shadow-brand-violet/30 flex items-center justify-center">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[14px] flex items-center justify-center transition-colors">
              <Bot className="w-6 h-6 text-brand-cyan" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-600 to-brand-blue dark:from-white dark:via-slate-100 dark:to-brand-cyan">
              SupportIQ
            </h1>
            <p className="text-xs font-mono text-brand-cyan/80">Enterprise AI Support Engine</p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight transition-colors">
            Intelligent Support.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-brand-cyan dark:via-brand-blue dark:to-brand-violet">
              Happier Customers.
            </span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed transition-colors">
            AI-powered customer support that understands, analyzes, and resolves customer problems intelligently.
          </p>
        </div>
      </div>

      {/* Interactive AI Workflow Visualization */}
      <div className="my-8 relative z-10 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-2 transition-colors">
          <span className="flex items-center gap-1.5 text-brand-cyan">
            <Sparkles className="w-3.5 h-3.5" /> AI RESOLUTION PIPELINE
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Active Telemetry
          </span>
        </div>

        <div className="space-y-1 relative border-l-2 border-slate-200 dark:border-white/10 ml-2 pl-4">
          {workflowSteps.map((step, idx) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="py-1.5 flex items-center justify-between group relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-brand-cyan transition-colors" />
              
              <div className="flex items-center gap-2.5">
                <span className="text-sm opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">{step.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-brand-cyan transition-colors">
                    {step.label}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 transition-colors">{step.desc}</p>
                </div>
              </div>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating AI Glass Cards */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="p-3 rounded-xl bg-white/80 dark:bg-slate-950/80 border border-brand-violet/20 dark:border-brand-violet/30 backdrop-blur-xl shadow-lg shadow-brand-violet/5 dark:shadow-brand-violet/10 text-left transition-colors"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-violet font-bold uppercase mb-1">
            <Zap className="w-3 h-3" /> Sentiment Detected
          </div>
          <p className="text-xs font-bold text-slate-800 dark:text-white transition-colors">Frustrated / High Priority</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">Confidence: 98.4%</p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="p-3 rounded-xl bg-white/80 dark:bg-slate-950/80 border border-brand-cyan/20 dark:border-brand-cyan/30 backdrop-blur-xl shadow-lg shadow-brand-cyan/5 dark:shadow-brand-cyan/10 text-left transition-colors"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-cyan font-bold uppercase mb-1">
            <Cpu className="w-3 h-3" /> Smart Routing
          </div>
          <p className="text-xs font-bold text-slate-800 dark:text-white transition-colors">Claims Lead Assigned</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">Response Time: &lt; 2.4s</p>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandPanel;
