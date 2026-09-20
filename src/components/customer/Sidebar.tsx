import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bot, 
  LayoutDashboard, 
  PlusCircle, 
  Ticket, 
  Sparkles, 
  Mic, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  onLogoutClick: () => void;
  unreadNotificationsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogoutClick, unreadNotificationsCount = 0 }) => {
  const location = useLocation();
  const { user } = useAuth();

  const mainNav = [
    { label: 'Dashboard', path: '/user', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Create Support Ticket', path: '/user/create-ticket', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'My Tickets', path: '/user/tickets', icon: <Ticket className="w-4 h-4" /> },
    { label: 'AI Support Assistant', path: '/user/ai-playground', icon: <Sparkles className="w-4 h-4 text-[#2563EB]" /> },
  ];

  const accountNav = [
    { 
      label: 'Notifications', 
      path: '/user/profile#notifications', 
      icon: <Bell className="w-4 h-4" />,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null 
    },
    { label: 'Profile', path: '/user/profile', icon: <User className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => {
    // Exact match for dashboard
    if (path === '/user') return location.pathname === path;
    
    // Handle Voice Support specifically (query param)
    if (path.includes('?mode=voice')) {
      return location.pathname === '/user/create-ticket' && location.search.includes('mode=voice');
    }
    
    // Handle Create Support Ticket specifically (no voice query param)
    if (path === '/user/create-ticket') {
      return location.pathname === '/user/create-ticket' && !location.search.includes('mode=voice');
    }
    
    // Handle My Tickets (should match /user/tickets and /user/tickets/123, but not /create-ticket)
    if (path === '/user/tickets') {
      return location.pathname === '/user/tickets' || 
             (location.pathname.startsWith('/user/tickets/') && !location.pathname.startsWith('/user/create-ticket'));
    }
    
    // Default prefix match for other paths
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white dark:bg-[#0D1428] border-r border-[#E5E7EB] dark:border-[#111A33] flex flex-col justify-between h-screen sticky top-0 backdrop-blur-2xl z-30 select-none">
      <div className="p-5 space-y-6">
        {/* Brand Header */}
        <Link to="/user" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-violet p-0.5 shadow-lg shadow-brand-violet/25 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-[#0D1428] rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#2563EB]" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-[#102A56] dark:text-[#F8FAFC] tracking-tight flex items-center gap-1">
              Support<span className="text-gradient font-mono">IQ</span>
            </h1>
            <p className="text-[10px] font-mono text-[#2563EB] uppercase tracking-wider">Customer Portal</p>
          </div>
        </Link>

        {/* Main Navigation */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-mono tracking-widest text-gray-600 dark:text-[#A8B3C7] uppercase mb-2">Main Menu</p>
          {mainNav.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  active
                    ? 'text-[#102A56] dark:text-[#F8FAFC] font-semibold shadow-lg shadow-brand-violet/10'
                    : 'text-gray-600 dark:text-[#A8B3C7] hover:text-[#102A56] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:bg-[#111A33]'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="sidebarActivePill"
                    className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-violet/20 border border-brand-violet/40 rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
                <ChevronRight className={`w-3.5 h-3.5 relative z-10 transition-transform ${active ? 'text-[#2563EB] opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
              </Link>
            );
          })}
        </div>

        {/* Account Navigation */}
        <div className="space-y-1 pt-2 border-t border-[#E5E7EB] dark:border-[#111A33]">
          <p className="px-3 text-[10px] font-mono tracking-widest text-gray-600 dark:text-[#A8B3C7] uppercase mb-2">Account</p>
          {accountNav.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'text-[#102A56] dark:text-[#F8FAFC] font-semibold bg-white/10 border border-[#E5E7EB] dark:border-[#111A33]'
                    : 'text-gray-600 dark:text-[#A8B3C7] hover:text-[#102A56] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:bg-[#111A33]'
                }`}
              >
                <span className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
                {item.badge ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-violet text-[#102A56] dark:text-[#F8FAFC]">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>
      {/* Profile Mini Card & Logout */}
      <div className="p-4 mb-20 mx-4 rounded-2xl border border-[#E5E7EB] dark:border-[#111A33] bg-white dark:bg-[#111A33] shadow-sm">
          <div className="flex items-center justify-between">
            <Link to="/user/profile" className="flex items-center gap-3 group overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center font-bold text-[#102A56] dark:text-white text-sm shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-slate-700 transition-transform group-hover:scale-105">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
              </div>
              <div className="text-left truncate">
                <p className="text-sm font-bold text-[#102A56] dark:text-[#F8FAFC] group-hover:text-[#2563EB] transition-colors truncate">
                  {user?.name || 'Customer'}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-[#A8B3C7] truncate font-mono mt-0.5">Customer Account</p>
              </div>
            </Link>

            <button
              onClick={onLogoutClick}
              className="p-2 rounded-xl text-gray-500 dark:text-[#A8B3C7] hover:text-rose-500 hover:bg-rose-50 transition-colors shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
    </aside>
  );
};

export default Sidebar;
