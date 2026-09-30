import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Rocket, User as UserIcon, LogOut, Ticket, Cpu, BarChart2, Bell, LayoutDashboard, CheckCircle, AlertCircle, ChevronDown, Moon, Sun, Layers } from 'lucide-react';
import api from '../services/api';
import LogoutConfirmModal from './auth/LogoutConfirmModal';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('supportiq_theme');
    if (saved) return saved === 'dark';
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    const saved = localStorage.getItem('supportiq_theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else if (saved === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
      localStorage.setItem('supportiq_theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
      localStorage.setItem('supportiq_theme', 'dark');
    }
  };

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
    <header className="sticky top-0 z-50 bg-white dark:bg-[#0D1428] border-b border-[#E5E7EB] dark:border-[#1E293B] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#102A56] flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-[#102A56] dark:text-[#F8FAFC] flex items-center gap-1.5">
                Support<span className="text-[#2563EB] font-mono">IQ</span>
                <span className="text-[10px] uppercase tracking-widest font-mono font-semibold px-2 py-0.5 rounded-full bg-[#EFF6FF] dark:bg-[#111A33] text-[#2563EB] border border-[#2563EB]/20">
                  AI 2.0
                </span>
              </span>
            </div>
          </Link>

          {/* API Health Indicator */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F8FAFC] dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#1E293B] text-xs font-mono text-[#102A56] dark:text-gray-300">
            <span>SupportIQ API</span>
            {apiOnline === true ? (
              <span className="flex items-center text-emerald-600 font-semibold gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online
              </span>
            ) : apiOnline === false ? (
              <span className="flex items-center text-red-600 font-semibold gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> Offline
              </span>
            ) : (
              <span className="text-gray-400">Connecting...</span>
            )}
          </div>

          {/* Middle: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1.5">
            <Link
              to={isAuthenticated && role === 'admin' ? '/admin' : isAuthenticated && role === 'customer' ? '/user' : '/'}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                (isActive('/') && !isAuthenticated) || (isActive('/admin') && role === 'admin') ? 'text-[#2563EB] bg-[#EFF6FF] dark:bg-blue-600/15 font-semibold' : 'text-gray-500 dark:text-[#71809A] hover:text-[#102A56] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-white/5'
              }`}
            >
              Overview
            </Link>

            {!isAuthenticated && (
              <>
                <a
                  href="/#features"
                  className="px-3.5 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-[#71809A] hover:text-[#102A56] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
                >
                  <Cpu className="w-4 h-4 text-blue-500" />
                  Features
                </a>

                <a
                  href="/#demo"
                  className="px-3.5 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-[#71809A] hover:text-[#102A56] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  AI Engine
                </a>

                <a
                  href="/#solutions"
                  className="px-3.5 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-[#71809A] hover:text-[#102A56] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
                >
                  <Layers className="w-4 h-4 text-emerald-500" />
                  Solutions
                </a>
              </>
            )}



            {isAuthenticated && role === 'customer' && (
              <>
                <Link
                  to="/user"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/user') ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold' : 'text-gray-500 dark:text-[#71809A] hover:text-[#102A56] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link
                  to="/user/tickets"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/user/tickets') ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold' : 'text-gray-500 dark:text-[#71809A] hover:text-[#102A56] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <Ticket className="w-4 h-4" /> My Tickets
                </Link>
              </>
            )}

            {isAuthenticated && role === 'admin' && (
              <>
                <Link
                  to="/admin"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/admin') ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold' : 'text-gray-500 dark:text-[#71809A] hover:text-[#102A56] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <BarChart2 className="w-4 h-4" /> Admin Dashboard
                </Link>
                <Link
                  to="/admin/tickets"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/admin/tickets') ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold' : 'text-gray-500 dark:text-[#71809A] hover:text-[#102A56] hover:bg-[#F8FAFC]'
                  }`}
                >
                  All Tickets
                </Link>
                <Link
                  to="/admin/customers"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/admin/customers') ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold' : 'text-gray-500 dark:text-[#71809A] hover:text-[#102A56] hover:bg-[#F8FAFC]'
                  }`}
                >
                  Customers
                </Link>
                <Link
                  to="/admin/deployment"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/admin/deployment') ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold' : 'text-gray-500 dark:text-[#71809A] hover:text-[#102A56] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <Rocket className="w-4 h-4" /> Deployment
                </Link>
              </>
            )}
          </nav>

          {/* Right: User Auth / Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* Theme Toggle */}
                <button 
                  onClick={toggleTheme} 
                  title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-gray-500 dark:text-[#71809A] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDarkMode ? <Moon className="w-5 h-5 text-gray-200" /> : <Sun className="w-5 h-5 text-amber-500" />}
                </button>

                <div className="relative">
                  <button 
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-3 px-2 py-1.5 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#111A33] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-sm border border-[#2563EB]/20">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="text-left text-xs hidden lg:block">
                      <p className="font-semibold text-[#102A56] dark:text-[#F8FAFC] truncate max-w-[120px]">{user?.name}</p>
                      <p className="text-[10px] text-gray-500 dark:text-[#71809A] uppercase font-bold tracking-wider">{user?.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {/* Profile Dropdown */}
                  {showProfileDropdown && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowProfileDropdown(false)} 
                      />
                      <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#0D1428] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl py-1.5 z-50">
                        <div className="px-4 py-2 border-b border-slate-100 dark:border-white/5 mb-1">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user?.name || 'User'}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                        </div>
                        <Link
                          to={role === 'admin' ? '/admin' : '/user/profile'}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-white transition-colors"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          <UserIcon className="w-4 h-4 text-slate-400 dark:text-slate-300" />
                          My Profile
                        </Link>
                        <button
                          onClick={() => { setShowProfileDropdown(false); setShowLogoutModal(true); }}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/15 flex items-center gap-2.5 transition-colors"
                        >
                          <LogOut className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2.5">
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-[#A8B3C7] hover:text-[#102A56] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary px-5 py-2 rounded-xl text-sm flex items-center gap-1.5 shadow-sm hover:shadow"
                >
                  Get Started <Sparkles className="w-4 h-4" />
                </Link>
                {/* Theme Toggle Button next to Get Started */}
                <button 
                  onClick={toggleTheme} 
                  title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-gray-500 dark:text-[#71809A] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDarkMode ? <Moon className="w-5 h-5 text-gray-200" /> : <Sun className="w-5 h-5 text-amber-500" />}
                </button>
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
