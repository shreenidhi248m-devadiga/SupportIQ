import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = 'Loading...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-3">
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-md bg-brand-violet/40 animate-pulse"></div>
        <Loader2 className={`${sizeClasses[size]} text-brand-blue animate-spin relative z-10`} />
      </div>
      {text && <p className="text-sm font-medium text-slate-300 font-mono tracking-wide">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;