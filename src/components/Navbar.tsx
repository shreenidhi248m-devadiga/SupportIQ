import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Shield, Rocket, User as UserIcon, LogOut, Ticket, Cpu, BarChart2, Bell, LayoutDashboard, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../services/api';
import LogoutConfirmModal from './auth/LogoutConfirmModal';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await api.get('/health', { timeout: 4000 });
        if (res.data && res.data.status === 'ok') {
          setApiOnline(true);
        } else {
          setApiOnline(false);
        }
      } catch (err) {
        setApiOnline(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#040612]/80 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-violet p-0.5 shadow-lg shadow-brand-violet/25 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#040612] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-blue group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                Support<span className="text-gradient font-mono">IQ</span>
                <span className="text-[10px] uppercase tracking-widest font-mono font-semibold px-2 py-0.5 rounded-full bg-brand-violet/20 text-brand-violet border border-brand-violet/30">
                  AI 2.0
                </span>
              </span>
            </div>
          </Link>

          {/* API Health Indicator */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
            <span>SupportIQ API</span>
            {apiOnline === true ? (
              <span className="flex items-center text-emerald-400 font-semibold gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online
              </span>
            ) : apiOnline === false ? (
              <span className="flex items-center text-rose-400 font-semibold gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> Offline
              </span>
            ) : (
              <span className="text-slate-400">Connecting...</span>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Overview
            </Link>

            <Link
              to="/ai-support"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/ai-support') ? 'text-brand-blue bg-brand-blue/10 border border-brand-blue/30' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-4 h-4 text-brand-blue" /> AI Playground
            </Link>

            {isAuthenticated && role === 'customer' && (
              <>
                <Link
                  to="/customer/dashboard"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/customer/dashboard') ? 'text-brand-violet bg-brand-violet/10 border border-brand-violet/30' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link
                  to="/customer/tickets"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/customer/tickets') ? 'text-brand-violet bg-brand-violet/10 border border-brand-violet/30' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Ticket className="w-4 h-4" /> My Tickets
                </Link>
              </>
            )}

            {isAuthenticated && role === 'admin' && (
              <>
                <Link
                  to="/admin/dashboard"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/admin/dashboard') ? 'text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/30' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BarChart2 className="w-4 h-4 text-brand-cyan" /> Admin Dashboard
                </Link>
                <Link
                  to="/admin/tickets"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/admin/tickets') ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  All Tickets
                </Link>
                <Link
                  to="/admin/customers"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/admin/customers') ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Customers
                </Link>
                <Link
                  to="/admin/security"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/admin/security') ? 'text-rose-400 bg-rose-400/10 border border-rose-400/30' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Shield className="w-4 h-4 text-rose-400" /> Security
                </Link>
                <Link
                  to="/admin/deployment"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/admin/deployment') ? 'text-brand-blue bg-brand-blue/10 border border-brand-blue/30' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Rocket className="w-4 h-4 text-brand-blue" /> Deployment
                </Link>
              </>
            )}
          </nav>

          {/* User Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to={role === 'admin' ? '/admin/dashboard' : '/customer/profile'}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-violet/50 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-violet to-brand-blue flex items-center justify-center font-bold text-white text-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-semibold text-white truncate max-w-[100px]">{user?.name}</p>
                    <p className="text-[10px] text-brand-cyan uppercase font-mono font-bold">{user?.role}</p>
                  </div>
                </Link>

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="relative group px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden shadow-lg shadow-brand-violet/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-violet to-brand-purple transition-transform duration-300 group-hover:scale-105"></div>
                  <span className="relative flex items-center gap-1.5">
                    Get Started <Sparkles className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>

      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </header>
  );
};

export default Navbar;
