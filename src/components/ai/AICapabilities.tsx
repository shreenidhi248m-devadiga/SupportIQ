import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { AIProcessingStage } from './AIOrb';

interface AICapabilitiesProps {
  currentStage: AIProcessingStage;
}

export const AICapabilities: React.FC<AICapabilitiesProps> = ({ currentStage }) => {
  
  const getStatus = (requiredStage: string[]) => {
    if (currentStage === 'error') return 'pending';
    if (currentStage === 'complete') return 'completed';
    
    const stageOrder = ['idle', 'reading', 'understanding', 'sentiment', 'priority', 'routing', 'generating'];
    const currentIndex = stageOrder.indexOf(currentStage);
    
    // Find the max index required for this capability to be active
    const maxReqIndex = Math.max(...requiredStage.map(s => stageOrder.indexOf(s)));
    
    if (currentIndex > maxReqIndex) return 'completed';
    if (currentIndex === maxReqIndex) return 'active';
    return 'pending';
  };

  const capabilities = [
    { name: 'NLP', triggers: ['reading', 'understanding'] },
    { name: 'Sentiment AI', triggers: ['sentiment'] },
    { name: 'Priority AI', triggers: ['priority'] },
    { name: 'Smart Routing', triggers: ['routing'] },
    { name: 'Computer Vision', triggers: ['reading'] }, // Assuming active early if image
    { name: 'AI Response', triggers: ['generating'] },
  ];

  return (
    <div className="w-full flex flex-wrap justify-center gap-4 sm:gap-6 py-4">
      {capabilities.map(cap => {
        const status = getStatus(cap.triggers);
        
        return (
          <div key={cap.name} className="flex items-center gap-1.5 opacity-80">
            <span className="text-xs font-mono text-slate-300">{cap.name}</span>
            {status === 'completed' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : status === 'active' ? (
              <div className="w-3.5 h-3.5 rounded-full bg-brand-blue animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            ) : (
              <Circle className="w-3.5 h-3.5 text-slate-600" />
            )}
          </div>
        );
      })}
    </div>
  );
};
