import React, { useState } from 'react';
import CustomerLayout from '../components/customer/CustomerLayout';
import { User, Mail, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CustomerProfile: React.FC = () => {
  const { user } = useAuth();
  const [successMsg, setSuccessMsg] = useState(false);

  return (
    <CustomerLayout>
      <div className="max-w-3xl mx-auto space-y-6 text-left">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 text-brand-blue" />
            Customer Profile
          </h1>
          <p className="text-xs text-slate-400 mt-1">View and manage your personal account settings.</p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/70 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-violet to-brand-blue flex items-center justify-center font-bold text-white text-2xl shadow-xl">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user?.name}</h2>
              <p className="text-xs font-mono text-brand-cyan">Verified Customer Account</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Full Name</span>
              <p className="font-bold text-white text-sm">{user?.name}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Email Address</span>
              <p className="font-bold text-white text-sm">{user?.email}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Account Role</span>
              <p className="font-bold text-emerald-400 text-sm uppercase">Customer</p>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerProfile;
