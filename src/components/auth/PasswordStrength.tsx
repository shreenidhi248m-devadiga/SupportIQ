import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const hasMinLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const score = [hasMinLen, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

  const getStrengthLabel = () => {
    if (!password) return { label: 'None', color: 'bg-slate-700', text: 'text-slate-400', width: 'w-0' };
    if (score <= 1) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-400', width: 'w-1/3' };
    if (score === 2 || score === 3) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-400', width: 'w-2/3' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400', width: 'w-full' };
  };

  const strength = getStrengthLabel();

  return (
    <div className="space-y-2 font-mono text-xs text-left pt-1">
      {password && (
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400">Password Strength:</span>
            <span className={`font-bold ${strength.text}`}>{strength.label}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
        <div className={`flex items-center gap-1.5 ${hasMinLen ? 'text-emerald-400' : 'text-slate-400'}`}>
          {hasMinLen ? <Check className="w-3.5 h-3.5 shrink-0" /> : <X className="w-3.5 h-3.5 shrink-0 text-slate-400" />}
          <span>8+ characters</span>
        </div>
        <div className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-400' : 'text-slate-400'}`}>
          {hasUpper ? <Check className="w-3.5 h-3.5 shrink-0" /> : <X className="w-3.5 h-3.5 shrink-0 text-slate-400" />}
          <span>Uppercase letter</span>
        </div>
        <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-400' : 'text-slate-400'}`}>
          {hasNumber ? <Check className="w-3.5 h-3.5 shrink-0" /> : <X className="w-3.5 h-3.5 shrink-0 text-slate-400" />}
          <span>One number</span>
        </div>
        <div className={`flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-400' : 'text-slate-400'}`}>
          {hasSpecial ? <Check className="w-3.5 h-3.5 shrink-0" /> : <X className="w-3.5 h-3.5 shrink-0 text-slate-400" />}
          <span>Special character</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
