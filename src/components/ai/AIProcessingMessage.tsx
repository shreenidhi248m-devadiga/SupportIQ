import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIProcessingStage } from './AIOrb';

interface AIProcessingMessageProps {
  currentStage: AIProcessingStage;
}

const getMessageForStage = (stage: AIProcessingStage) => {
  switch (stage) {
    case 'reading': return "Reading your request...";
    case 'understanding': return "Understanding what you need...";
    case 'sentiment': return "Analyzing customer sentiment...";
    case 'priority': return "Determining request priority...";
    case 'routing': return "Finding the right support department...";
    case 'generating': return "Preparing your AI response...";
    case 'complete': return "Analysis complete.";
    case 'error': return "Analysis failed.";
    default: return "Initializing AI Engine...";
  }
};

export const AIProcessingMessage: React.FC<AIProcessingMessageProps> = ({ currentStage }) => {
  return (
    <div className="h-12 flex items-center justify-center w-full my-4 relative" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute w-full text-center"
        >
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-brand-cyan via-white to-brand-violet bg-clip-text text-transparent">
            {getMessageForStage(currentStage)}
          </h2>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
