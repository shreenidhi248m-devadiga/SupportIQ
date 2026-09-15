import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield } from 'lucide-react';

interface RoleSelectorProps {
  selectedRole: 'customer' | 'admin';
  onSelectRole: (role: 'customer' | 'admin') => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onSelectRole }) => {
  return (
    <div className="space-y-2 mb-6">
      <label className="block text-[11px] font-mono tracking-widest text-slate-400 uppercase text-center">
        Who are you?
      </label>
      <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-950/70 border border-white/10 relative">
        <button
          type="button"
          onClick={() => onSelectRole('customer')}
          className={`relative z-10 py-2.5 rounded-xl text-xs font-semibold font-mono transition-colors flex items-center justify-center gap-2 ${
            selectedRole === 'customer' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>👤 Customer</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectRole('admin')}
          className={`relative z-10 py-2.5 rounded-xl text-xs font-semibold font-mono transition-colors flex items-center justify-center gap-2 ${
            selectedRole === 'admin' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>🛡 Admin</span>
        </button>

        {/* Animated background pill */}
        <motion.div
          className={`absolute inset-y-1.5 rounded-xl shadow-lg ${
            selectedRole === 'customer'
              ? 'bg-gradient-to-r from-brand-blue to-brand-violet shadow-brand-violet/30'
              : 'bg-gradient-to-r from-teal-600 to-emerald-600 shadow-teal-500/30'
          }`}
          initial={false}
          animate={{
            x: selectedRole === 'customer' ? '0%' : '100%',
            width: 'calc(50% - 6px)',
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          style={{ left: '6px' }}
        />
      </div>
    </div>
  );
};

export default RoleSelector;
