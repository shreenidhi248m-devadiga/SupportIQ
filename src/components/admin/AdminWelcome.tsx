import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { RefreshCw, Activity } from 'lucide-react';

interface AdminWelcomeProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const AdminWelcome: React.FC<AdminWelcomeProps> = ({ onRefresh, isRefreshing }) => {
  const { user } = useAuth();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {getGreeting()}, {user?.name || 'Administrator'}.
        </h2>
        <p className="text-slate-400 mt-1 text-sm">
          Here's what's happening across your support operations today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          System Operational
        </div>

        <button 
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-2 rounded-xl bg-slate-900 border border-white/10 hover:bg-white/5 text-slate-300 transition-colors disabled:opacity-50"
          title="Refresh Data"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};
