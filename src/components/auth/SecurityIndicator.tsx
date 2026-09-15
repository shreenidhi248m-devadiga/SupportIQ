import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

interface SecurityIndicatorProps {
  role: 'customer' | 'admin';
}

export const SecurityIndicator: React.FC<SecurityIndicatorProps> = ({ role }) => {
  if (role === 'admin') {
    return (
      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs flex items-center gap-2 font-mono">
        <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
        <div>
          <p className="font-semibold text-teal-200">🛡 Secure Administrator Authentication</p>
          <p className="text-[11px] text-teal-400/80">Authorized personnel only. Sessions are logged & monitored.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 pt-2">
      <Lock className="w-3.5 h-3.5 text-emerald-400" />
      <span>🔒 Your information is securely protected.</span>
    </div>
  );
};

export default SecurityIndicator;
