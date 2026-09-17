import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  Building2, 
  BrainCircuit, 
  Smile, 
  AlertOctagon, 
  BarChart4, 
  Cpu, 
  Bell, 
  Settings,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const navGroups = [
    {
      title: 'Overview',
      links: [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Support Operations',
      links: [
        { name: 'Tickets', path: '/admin/tickets', icon: Ticket },
        { name: 'Customers', path: '/admin/customers', icon: Users },
        { name: 'Departments', path: '/admin/departments', icon: Building2 }
      ]
    },
    {
      title: 'Customer Intelligence',
      links: [
        { name: 'Analytics & Insights', path: '/admin/intelligence', icon: BrainCircuit }
      ]
    },
    {
      title: 'Analytics',
      links: [
        { name: 'Support Analytics', path: '/admin/analytics', icon: BarChart4 },
        { name: 'AI Performance', path: '/admin/ai-performance', icon: Cpu }
      ]
    },
    {
      title: 'System',
      links: [
        { name: 'Notifications', path: '/admin/notifications', icon: Bell },
        { name: 'Settings', path: '/admin/settings', icon: Settings }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#0a0f24] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Branding */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-violet flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <span className="font-bold text-white text-lg leading-none mt-0.5">S</span>
             </div>
             <span className="font-bold text-xl text-white tracking-tight">SupportIQ</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest pl-10">
            Admin Console
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-8 no-scrollbar">
          {navGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.name}>
                      <NavLink
                        to={link.path}
                        onClick={() => onClose()}
                        end={link.path === '/admin'}
                        className={({ isActive }) => 
                          `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            isActive 
                              ? 'bg-brand-blue/10 text-brand-cyan border border-brand-blue/20 shadow-[0_0_10px_rgba(56,189,248,0.05)]' 
                              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4" />
                        {link.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Profile Footer */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0">
               <UserIcon className="w-5 h-5 text-slate-400" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white truncate">{user?.name || 'Administrator'}</div>
              <div className="text-xs text-brand-cyan font-mono truncate">{user?.role || 'admin'}</div>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 text-slate-400 text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};
