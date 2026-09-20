import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Sparkles } from 'lucide-react';

export const AIProcessing: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    'Understanding your problem',
    'Detecting sentiment & urgency',
    'Identifying routing department',
    'Preparing optimal resolution response',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-brand-violet/20 border border-brand-violet/40 text-[#2563EB] mx-auto flex items-center justify-center shadow-xl shadow-brand-violet/20 animate-pulse">
        <Sparkles className="w-8 h-8" />
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#102A56] dark:text-[#F8FAFC] tracking-tight">Analyzing your request...</h3>
        <p className="text-xs text-gray-600 dark:text-[#A8B3C7] mt-1 font-mono">SupportIQ Neural Engine at work</p>
      </div>

      <div className="max-w-md mx-auto space-y-3 text-left">
        {steps.map((text, idx) => (
          <div
            key={text}
            className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
              idx < step
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : idx === step
                ? 'bg-brand-violet/10 border-brand-violet/40 text-[#2563EB] font-bold'
                : 'bg-[#F8FAFC] dark:bg-[#111A33] border-[#E5E7EB] dark:border-[#111A33] text-gray-500 dark:text-[#71809A]'
            }`}
          >
            <span>{text}</span>
            {idx < step ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : idx === step ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#2563EB] shrink-0" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIProcessing;
