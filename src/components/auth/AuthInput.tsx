import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  isPassword?: boolean;
  helperText?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  icon,
  error,
  isPassword = false,
  helperText,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const computedType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-1.5 text-left w-full">
      <label htmlFor={inputId} className="block text-xs font-mono tracking-wider text-slate-300 uppercase">
        {label}
      </label>

      <div className="relative group">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-blue transition-colors">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          type={computedType}
          className={`w-full bg-slate-950/60 border border-white/10 rounded-xl py-3 text-sm text-white placeholder-slate-500 
            transition-all outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 
            ${icon ? 'pl-10' : 'pl-4'} ${isPassword ? 'pr-11' : 'pr-4'} 
            ${error ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20' : ''} 
            ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-lg focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {helperText && !error && (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      )}

      {error && (
        <p className="text-xs text-rose-400 flex items-center gap-1 font-medium mt-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
};

export default AuthInput;
