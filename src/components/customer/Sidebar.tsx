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
    { label: 'Dashboard', path: '/customer/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Create Support Ticket', path: '/customer/tickets/new', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'My Tickets', path: '/customer/tickets', icon: <Ticket className="w-4 h-4" /> },
    { label: 'AI Support Assistant', path: '/ai-support', icon: <Sparkles className="w-4 h-4 text-brand-cyan" /> },
    { label: 'Voice Support', path: '/customer/tickets/new?mode=voice', icon: <Mic className="w-4 h-4" /> },
  ];

  const accountNav = [
    { 
      label: 'Notifications', 
      path: '/customer/profile#notifications', 
      icon: <Bell className="w-4 h-4" />,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null 
    },
    { label: 'Profile', path: '/customer/profile', icon: <User className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path || (path !== '/customer/dashboard' && location.pathname.startsWith(path));

  return (
    <aside className="w-64 bg-slate-950/80 border-r border-white/10 flex flex-col justify-between h-screen sticky top-0 backdrop-blur-2xl z-30 select-none">
      <div className="p-5 space-y-6">
        {/* Brand Header */}
        <Link to="/customer/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-violet p-0.5 shadow-lg shadow-brand-violet/25 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-brand-cyan" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1">
              Support<span className="text-gradient font-mono">IQ</span>
            </h1>
            <p className="text-[10px] font-mono text-brand-cyan uppercase tracking-wider">Customer Portal</p>
          </div>
        </Link>

        {/* Main Navigation */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">Main Menu</p>
          {mainNav.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  active
                    ? 'text-white font-semibold shadow-lg shadow-brand-violet/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
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
                <ChevronRight className={`w-3.5 h-3.5 relative z-10 transition-transform ${active ? 'text-brand-cyan opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
              </Link>
            );
          })}
        </div>

        {/* Account Navigation */}
        <div className="space-y-1 pt-2 border-t border-white/10">
          <p className="px-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">Account</p>
          {accountNav.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'text-white font-semibold bg-white/10 border border-white/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
                {item.badge ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-violet text-white">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Profile Mini Card & Logout */}
      <div className="p-4 border-t border-white/10 bg-slate-900/40">
        <div className="flex items-center justify-between">
          <Link to="/customer/profile" className="flex items-center gap-2.5 group overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-violet to-brand-blue flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-md">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div className="text-left truncate">
              <p className="text-xs font-semibold text-white group-hover:text-brand-cyan transition-colors truncate">
                {user?.name || 'Customer'}
              </p>
              <p className="text-[10px] text-slate-400 truncate font-mono">Customer Account</p>
            </div>
          </Link>

          <button
            onClick={onLogoutClick}
            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
