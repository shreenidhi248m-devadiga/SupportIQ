import React, { useState } from 'react';
import { Search, Bell, HelpCircle, User, LogOut, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationCenter from './NotificationCenter';

interface TopNavbarProps {
  onLogoutClick: () => void;
  apiOnline?: boolean | null;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onLogoutClick, apiOnline = true }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/user/tickets?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 border-b border-[#E5E7EB] dark:border-[#111A33] bg-white dark:bg-[#0D1428]/70 backdrop-blur-xl sticky top-0 z-20 px-6 flex items-center justify-between">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-gray-600 dark:text-[#A8B3C7] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tickets, issues, knowledge base..."
          className="w-full bg-white dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] rounded-xl pl-10 pr-4 py-2 text-xs text-[#102A56] dark:text-[#F8FAFC] placeholder-slate-500 focus:outline-none focus:border-brand-violet focus:ring-1 focus:ring-brand-violet/30 transition-all"
        />
      </form>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* API Health Status */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-gray-500 dark:text-[#71809A]">SupportIQ AI Online</span>
        </div>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] text-gray-500 dark:text-[#71809A] hover:text-[#102A56] dark:text-[#F8FAFC] hover:bg-white/10 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-violet" />
          </button>

          {showNotifications && (
            <NotificationCenter onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-[#F8FAFC] dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] hover:border-white/20 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-violet to-brand-blue flex items-center justify-center font-bold text-[#102A56] dark:text-[#F8FAFC] text-xs">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <span className="text-xs font-semibold text-[#102A56] dark:text-[#F8FAFC] max-w-[120px] truncate">
              {user?.name || 'Customer'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-600 dark:text-[#A8B3C7]" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] shadow-2xl p-1.5 text-xs font-medium text-gray-500 dark:text-[#71809A] z-50">
              <Link
                to="/user/profile"
                onClick={() => setShowUserDropdown(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 hover:text-[#102A56] dark:text-[#F8FAFC] transition-colors"
              >
                <User className="w-4 h-4 text-[#2563EB]" />
                Profile Settings
              </Link>
              <button
                onClick={() => {
                  setShowUserDropdown(false);
                  onLogoutClick();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
