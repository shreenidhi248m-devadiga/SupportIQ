import React from 'react';
import { Search, Bell, HelpCircle, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminTopBarProps {
  onMenuClick: () => void;
  title?: string;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({ onMenuClick, title = "Dashboard Overview" }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#040612]/80 backdrop-blur-xl border-b border-white/5 h-16 flex items-center justify-between px-4 sm:px-6">
      
      {/* Left side: Mobile menu & Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-white hidden sm:block">{title}</h1>
      </div>

      {/* Right side: Search & Actions */}
      <div className="flex items-center gap-4 flex-1 justify-end">
        
        {/* Global Search */}
        <div className="relative hidden md:block max-w-md w-full ml-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search tickets, customers, or IDs..." 
            className="w-full bg-slate-900/50 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-brand-blue/50 focus:bg-slate-900 focus:ring-1 focus:ring-brand-blue/50 transition-all"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
          <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-[#040612]"></span>
          </button>
          
          <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Profile Dropdown (visual only for now) */}
        <div className="flex items-center gap-2 pl-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-violet to-brand-blue flex items-center justify-center text-white text-sm font-bold shadow-sm">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden lg:block">
            <div className="text-sm font-semibold text-white group-hover:text-brand-cyan transition-colors">{user?.name || 'Administrator'}</div>
            <div className="text-[10px] text-slate-500 font-mono">Admin</div>
          </div>
        </div>
        
      </div>
    </header>
  );
};
