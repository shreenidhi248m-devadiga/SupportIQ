import React, { useState, useEffect } from 'react';
import { Search, Bell, HelpCircle, Menu, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminTopBarProps {
  onMenuClick: () => void;
  title?: string;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({ onMenuClick, title = "Dashboard Overview" }) => {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
      localStorage.setItem('supportiq_theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
      localStorage.setItem('supportiq_theme', 'dark');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#040612]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 h-16 flex items-center justify-between px-4 sm:px-6 transition-colors duration-200">
      
      {/* Left side: Mobile menu & Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white hidden sm:block tracking-tight">{title}</h1>
      </div>

      {/* Right side: Search & Actions */}
      <div className="flex items-center gap-4 flex-1 justify-end">
        
        {/* Global Search */}
        <div className="relative hidden md:block max-w-md w-full ml-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search tickets, customers, or IDs..." 
            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-blue-500/50 transition-all font-mono"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 border-l border-slate-200 dark:border-white/10 pl-4">
          {/* Light / Dark Mode Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          <button className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-white dark:border-[#040612]"></span>
          </button>
          
          <button className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-2 pl-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-violet to-brand-blue flex items-center justify-center text-white text-sm font-bold shadow-sm">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden lg:block">
            <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-brand-cyan transition-colors">{user?.name || 'Administrator'}</div>
            <div className="text-[10px] text-slate-500 font-mono">Admin</div>
          </div>
        </div>
        
      </div>
    </header>
  );
};
