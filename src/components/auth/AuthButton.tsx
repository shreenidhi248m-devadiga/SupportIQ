import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface AuthButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'admin' | 'outline';
  icon?: React.ReactNode;
  className?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  loadingText,
  variant = 'primary',
  icon,
  className = '',
}) => {
  const baseStyles = 'w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-brand-blue via-brand-violet to-brand-purple text-white hover:opacity-95 shadow-brand-violet/25 focus:ring-brand-violet/50',
    admin: 'bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white hover:opacity-95 shadow-teal-500/20 focus:ring-teal-500/50',
    secondary: 'bg-white/10 text-white hover:bg-white/15 border border-white/10 focus:ring-white/20',
    outline: 'bg-transparent text-slate-300 hover:text-white border border-white/10 hover:border-white/25 focus:ring-white/20',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>{loadingText || 'Processing...'}</span>
        </>
      ) : (
        <>
          {children}
          {icon && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default AuthButton;
