import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Brain, Smile, AlertTriangle, GitBranch, Sparkles, CheckCircle2 } from 'lucide-react';
import { AIProcessingStage } from './AIOrb';

interface AIProcessingStepsProps {
  currentStage: AIProcessingStage;
}

const steps = [
  { id: 'reading', label: 'Request Understanding', desc: "Analyzing the customer's message and identifying the main issue.", icon: FileText },
  { id: 'understanding', label: 'Intent Detection', desc: "Identifying what the customer is trying to accomplish.", icon: Brain },
  { id: 'sentiment', label: 'Sentiment Analysis', desc: "Understanding the customer's emotional state.", icon: Smile },
  { id: 'priority', label: 'Priority Detection', desc: "Determining the urgency of the request.", icon: AlertTriangle },
  { id: 'routing', label: 'Smart Routing', desc: "Selecting the most relevant support department.", icon: GitBranch },
  { id: 'generating', label: 'AI Response', desc: "Preparing an appropriate AI-generated response.", icon: Sparkles },
];

export const AIProcessingSteps: React.FC<AIProcessingStepsProps> = ({ currentStage }) => {
  const getStepStatus = (stepId: string, index: number) => {
    if (currentStage === 'error') return 'pending';
    if (currentStage === 'complete') return 'completed';
    
    const stageOrder = ['idle', 'reading', 'understanding', 'sentiment', 'priority', 'routing', 'generating'];
    const currentIndex = stageOrder.indexOf(currentStage);
    const stepIndex = stageOrder.indexOf(stepId);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-2 text-center md:text-left">AI Analysis Progress</h3>
      <div className="flex flex-col gap-3">
        {steps.map((step, idx) => {
          const status = getStepStatus(step.id, idx);
          const Icon = step.icon;
          
          return (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex items-start gap-3 p-3 rounded-xl border ${
                status === 'active' 
                  ? 'bg-brand-blue/10 border-brand-blue/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]' 
                  : status === 'completed'
                  ? 'bg-white/5 border-white/5'
                  : 'bg-transparent border-transparent opacity-50'
              } transition-all duration-300`}
            >
              <div className={`mt-0.5 shrink-0 ${
                status === 'active' ? 'text-brand-blue animate-pulse' : 
                status === 'completed' ? 'text-emerald-400' : 
                'text-slate-500'
              }`}>
                {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-semibold ${status === 'active' ? 'text-white' : status === 'completed' ? 'text-slate-300' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                  <span className={`text-[10px] font-mono ${
                    status === 'active' ? 'text-brand-blue' : 
                    status === 'completed' ? 'text-emerald-400' : 
                    'text-slate-500'
                  }`}>
                    {status === 'active' ? 'Processing...' : status === 'completed' ? 'Completed' : 'Waiting'}
                  </span>
                </div>
                {status === 'active' && (
                  <motion.span 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-brand-blue/80 mt-1"
                  >
                    {step.desc}
                  </motion.span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
