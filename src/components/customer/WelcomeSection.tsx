import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, PlusCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const WelcomeSection: React.FC = () => {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(' ')[0] : 'Customer';

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-white/10 shadow-2xl relative overflow-hidden text-left">
      {/* Background ambient lighting */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-violet/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-cyan text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SupportIQ AI Engine Connected
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
            How can we help you today? Describe your problem or track ongoing support tickets in real-time.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/customer/tickets/new"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-blue via-brand-violet to-brand-purple text-white font-semibold text-xs shadow-lg shadow-brand-violet/25 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Create Support Ticket
          </Link>

          <Link
            to="/ai-support"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            Ask AI Assistant
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
