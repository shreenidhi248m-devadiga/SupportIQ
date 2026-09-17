import React from 'react';
import { motion } from 'framer-motion';

export type AIProcessingStage = 
  | 'idle'
  | 'reading' 
  | 'understanding' 
  | 'sentiment' 
  | 'priority' 
  | 'routing' 
  | 'generating'
  | 'complete'
  | 'error';

interface AIOrbProps {
  stage: AIProcessingStage;
}

export const AIOrb: React.FC<AIOrbProps> = ({ stage }) => {
  const getOrbVariants = () => {
    switch (stage) {
      case 'idle':
        return {
          scale: 1,
          opacity: 0.5,
          boxShadow: '0px 0px 20px rgba(56, 189, 248, 0.2)',
          transition: { duration: 2, repeat: Infinity, repeatType: "reverse" as const }
        };
      case 'reading':
        return {
          scale: [1, 1.05, 1],
          opacity: [0.6, 1, 0.6],
          boxShadow: ['0px 0px 30px rgba(56, 189, 248, 0.3)', '0px 0px 50px rgba(56, 189, 248, 0.6)', '0px 0px 30px rgba(56, 189, 248, 0.3)'],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        };
      case 'understanding':
        return {
          scale: [1, 1.15, 1],
          opacity: [0.7, 1, 0.7],
          boxShadow: ['0px 0px 40px rgba(139, 92, 246, 0.4)', '0px 0px 80px rgba(139, 92, 246, 0.7)', '0px 0px 40px rgba(139, 92, 246, 0.4)'],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        };
      case 'sentiment':
        return {
          scale: [1, 1.02, 1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
          boxShadow: '0px 0px 60px rgba(16, 185, 129, 0.5)', // Green tint for sentiment
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        };
      case 'priority':
        return {
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
          boxShadow: ['0px 0px 40px rgba(245, 158, 11, 0.4)', '0px 0px 80px rgba(245, 158, 11, 0.7)', '0px 0px 40px rgba(245, 158, 11, 0.4)'], // Amber tint for priority
          transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } // Faster pulse
        };
      case 'routing':
        return {
          scale: 1.05,
          opacity: 1,
          boxShadow: '0px 0px 60px rgba(56, 189, 248, 0.6)',
          rotate: [0, 360],
          transition: { rotate: { duration: 4, repeat: Infinity, ease: "linear" } }
        };
      case 'generating':
        return {
          scale: [1.05, 1.1, 1.05],
          opacity: 1,
          boxShadow: '0px 0px 80px rgba(192, 132, 252, 0.6)', // Purple tint for generative AI
          rotate: [360, 0],
          transition: { 
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5, repeat: Infinity, ease: "linear" }
          }
        };
      case 'complete':
        return {
          scale: 1,
          opacity: 0.9,
          boxShadow: '0px 0px 40px rgba(16, 185, 129, 0.6)', // Emerald success
          transition: { duration: 0.5 }
        };
      case 'error':
        return {
          scale: 1,
          opacity: 0.8,
          boxShadow: '0px 0px 40px rgba(239, 68, 68, 0.6)', // Red error
          transition: { duration: 0.5 }
        };
      default:
        return { scale: 1, opacity: 0.5 };
    }
  };

  const isRotating = stage === 'routing' || stage === 'generating';

  return (
    <div className="relative flex items-center justify-center w-48 h-48 mx-auto my-8">
      {/* Outer energy ring */}
      <motion.div 
        className="absolute inset-0 rounded-full border border-brand-blue/20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Middle energy ring */}
      <motion.div 
        className="absolute inset-4 rounded-full border border-brand-violet/30"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3], rotate: isRotating ? 360 : 0 }}
        transition={{ 
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" }
        }}
      />

      {/* Core Orb */}
      <motion.div
        className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-violet relative z-10 overflow-hidden"
        animate={getOrbVariants()}
      >
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-white/20 blur-md rounded-full mix-blend-overlay"></div>
        
        {/* Subtle moving highlight */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent"
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
};
