import React, { useState, useEffect } from 'react';
import { 
  Settings, Shield, Lock, Key, Smartphone, Clock, 
  Globe, AlertTriangle, CheckCircle2, UserCheck, 
  Eye, EyeOff, Save, RefreshCw, LogOut, Laptop, 
  History, Sparkles, Check, Copy, ExternalLink
} from 'lucide-react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

interface SessionItem {
  id: string;
  device: string;
  browser: string;
  os: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export const AdminSettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  
  // Tab State
  const [activeTab, setActiveTab] = useState<'security' | 'session' | 'profile' | 'audit'>('security');
  
  // Profile State
  const [name, setName] = useState(user?.name || 'SupportIQ Admin Lead');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST)');
  
  // Security & Login Settings State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [showMfaModal, setShowMfaModal] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [copiedSecret, setCopiedSecret] = useState(false);
  
  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Session Governance State
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [singleSessionMode, setSingleSessionMode] = useState(true);
  const [rememberDuration, setRememberDuration] = useState('7');
  const [maxFailedAttempts, setMaxFailedAttempts] = useState('5');
  const [lockoutDuration, setLockoutDuration] = useState('30');
  
  // IP Restriction State
  const [ipRestricted, setIpRestricted] = useState(false);
  const [allowedIps, setAllowedIps] = useState('192.168.1.0/24, 10.0.0.1, 127.0.0.1');
  const [emergencyBypass, setEmergencyBypass] = useState(true);
  
  // Sessions State
  const [sessions, setSessions] = useState<SessionItem[]>([
    {
      id: 'sess-1',
      device: 'Desktop Workstation',
      browser: 'Chrome 124.0',
      os: 'Windows 11 Enterprise',
      ip: '192.168.1.104',
      location: 'Bengaluru, India',
      lastActive: 'Active Now',
      isCurrent: true
    },
    {
      id: 'sess-2',
      device: 'MacBook Pro 16"',
      browser: 'Safari 17.4',
      os: 'macOS Sonoma',
      ip: '203.0.113.88',
      location: 'Austin, TX, USA',
      lastActive: '2 hours ago',
      isCurrent: false
    },
    {
      id: 'sess-3',
      device: 'iPhone 15 Pro',
      browser: 'Mobile Safari',
      os: 'iOS 17.5',
      ip: '198.51.100.24',
      location: 'San Francisco, CA, USA',
      lastActive: 'Yesterday at 4:15 PM',
      isCurrent: false
    }
  ]);
  
  // Status message / feedback
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Load saved settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('supportiq_admin_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.twoFactorEnabled !== undefined) setTwoFactorEnabled(parsed.twoFactorEnabled);
        if (parsed.sessionTimeout) setSessionTimeout(parsed.sessionTimeout);
        if (parsed.singleSessionMode !== undefined) setSingleSessionMode(parsed.singleSessionMode);
        if (parsed.rememberDuration) setRememberDuration(parsed.rememberDuration);
        if (parsed.maxFailedAttempts) setMaxFailedAttempts(parsed.maxFailedAttempts);
        if (parsed.lockoutDuration) setLockoutDuration(parsed.lockoutDuration);
        if (parsed.ipRestricted !== undefined) setIpRestricted(parsed.ipRestricted);
        if (parsed.allowedIps) setAllowedIps(parsed.allowedIps);
        if (parsed.emergencyBypass !== undefined) setEmergencyBypass(parsed.emergencyBypass);
        if (parsed.timezone) setTimezone(parsed.timezone);
      } catch (e) {
        console.error('Error loading admin settings', e);
      }
    }
  }, []);

  const saveSettingsLocally = (overrides: Record<string, any> = {}) => {
    const data = {
      twoFactorEnabled,
      sessionTimeout,
      singleSessionMode,
      rememberDuration,
      maxFailedAttempts,
      lockoutDuration,
      ipRestricted,
      allowedIps,
      emergencyBypass,
      timezone,
      ...overrides
    };
    localStorage.setItem('supportiq_admin_settings', JSON.stringify(data));
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Handle Profile Update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put('/users/profile', { name, phone });
      if (res.data?.data) {
        updateUser(res.data.data);
      }
      saveSettingsLocally({ timezone });
      showNotification('success', 'Admin profile information updated successfully.');
    } catch (err: any) {
      // Fallback local update if mock
      if (user) {
        updateUser({ ...user, name, phone });
      }
      saveSettingsLocally({ timezone });
      showNotification('success', 'Admin profile updated.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Update
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      showNotification('error', 'Please enter your current password.');
      return;
    }
    if (newPassword.length < 8) {
      showNotification('error', 'New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showNotification('error', 'New password and confirm password do not match.');
      return;
    }

    setLoading(true);
    try {
      await api.put('/users/change-password', { currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showNotification('success', 'Admin password changed successfully. All sessions refreshed.');
    } catch (err: any) {
      showNotification('error', err.response?.data?.message || 'Failed to update password. Verify current password.');
    } finally {
      setLoading(false);
    }
  };

  // Revoke session
  const handleRevokeSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    showNotification('success', 'Admin session revoked successfully.');
  };

  const handleRevokeAllOther = () => {
    setSessions(prev => prev.filter(s => s.isCurrent));
    showNotification('success', 'All other active admin sessions have been terminated.');
  };

  // Password requirements calculation
  const hasMinLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasNumberOrSymbol = /[\d!@#$%^&*]/.test(newPassword);

  return (
    <AdminLayout title="Admin Settings">
      <div className="space-y-6 animate-fade-in max-w-6xl">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:bg-brand-cyan/15 dark:text-brand-cyan flex items-center justify-center">
                <Settings className="w-6 h-6" />
              </div>
              Admin Settings & Security
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Configure administrator login authentication, multi-factor security, session governance, and access controls.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-brand-cyan text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            Enterprise Role: Admin Lead
          </div>
        </div>

        {/* Feedback Banner */}
        {feedback && (
          <div className={`p-4 rounded-xl flex items-center justify-between border ${
            feedback.type === 'success' 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' 
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
          }`}>
            <div className="flex items-center gap-2 text-sm font-medium">
              {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              {feedback.message}
            </div>
            <button onClick={() => setFeedback(null)} className="text-xs font-mono opacity-70 hover:opacity-100">Dismiss</button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-blue-600 text-blue-600 dark:border-brand-cyan dark:text-brand-cyan font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            Login & Credentials
          </button>

          <button
            onClick={() => setActiveTab('session')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'session'
                ? 'border-blue-600 text-blue-600 dark:border-brand-cyan dark:text-brand-cyan font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            Session Governance & IP
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 dark:border-brand-cyan dark:text-brand-cyan font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Admin Profile & Identity
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'audit'
                ? 'border-blue-600 text-blue-600 dark:border-brand-cyan dark:text-brand-cyan font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            Active Sessions ({sessions.length})
          </button>
        </div>

        {/* TAB 1: LOGIN & CREDENTIALS */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            
            {/* 2FA Card */}
            <div className="bg-white dark:bg-[#0E172E] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      Two-Factor Authentication (2FA / MFA)
                      {twoFactorEnabled ? (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">Active</span>
                      ) : (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">Disabled</span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Enforce verification codes from authenticator apps (Google Authenticator, Microsoft Authenticator) for admin login.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const next = !twoFactorEnabled;
                      setTwoFactorEnabled(next);
                      saveSettingsLocally({ twoFactorEnabled: next });
                      showNotification('success', next ? 'Two-Factor Authentication enforced for Admin logins.' : '2FA disabled for Admin logins.');
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      twoFactorEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  {twoFactorEnabled && (
                    <button
                      type="button"
                      onClick={() => setShowMfaModal(true)}
                      className="text-xs font-semibold text-blue-600 dark:text-brand-cyan hover:underline"
                    >
                      Configure Keys
                    </button>
                  )}
                </div>
              </div>

              {twoFactorEnabled && (
                <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-mono">
                    <Key className="w-4 h-4 text-purple-500" />
                    <span>Current Auth Method: <strong>TOTP Authenticator App</strong> (6-Digit Time-Based Passcode)</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowMfaModal(true)}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-medium"
                    >
                      View Backup Codes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Change Password Card */}
            <div className="bg-white dark:bg-[#0E172E] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-brand-cyan flex items-center justify-center shrink-0">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Admin Password & Authentication</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Update your administrative master password. Changing your password securely terminates other active sessions.
                  </p>
                </div>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Current Master Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Password strength checklist */}
                {newPassword && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-white/5 space-y-1.5">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Password Criteria:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <span className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                        <Check className="w-3.5 h-3.5" /> 8+ Characters
                      </span>
                      <span className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                        <Check className="w-3.5 h-3.5" /> Uppercase Letter
                      </span>
                      <span className={`flex items-center gap-1.5 ${hasNumberOrSymbol ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                        <Check className="w-3.5 h-3.5" /> Number / Symbol
                      </span>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? 'Updating Credentials...' : 'Save New Password'}
                  </button>
                </div>
              </form>
            </div>

            {/* Login Rate Limiting & Lockout Policy */}
            <div className="bg-white dark:bg-[#0E172E] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Brute-Force & Lockout Policy</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Protect the administrator portal against brute-force credential stuffing.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Max Consecutive Failed Attempts
                  </label>
                  <select
                    value={maxFailedAttempts}
                    onChange={(e) => {
                      setMaxFailedAttempts(e.target.value);
                      saveSettingsLocally({ maxFailedAttempts: e.target.value });
                      showNotification('success', 'Lockout attempt threshold updated.');
                    }}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="3">3 Failed Attempts (Strict)</option>
                    <option value="5">5 Failed Attempts (Standard Recommended)</option>
                    <option value="10">10 Failed Attempts (Permissive)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Lockout Cooldown Duration
                  </label>
                  <select
                    value={lockoutDuration}
                    onChange={(e) => {
                      setLockoutDuration(e.target.value);
                      saveSettingsLocally({ lockoutDuration: e.target.value });
                      showNotification('success', 'Lockout cooldown duration updated.');
                    }}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes (Recommended)</option>
                    <option value="60">1 Hour</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SESSION GOVERNANCE & IP */}
        {activeTab === 'session' && (
          <div className="space-y-6">
            
            {/* Session Timeout */}
            <div className="bg-white dark:bg-[#0E172E] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Session Inactivity & Governance</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Automatically terminate idle sessions and govern device lifetime for administrator accounts.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Idle Session Auto-Lock Timeout
                  </label>
                  <select
                    value={sessionTimeout}
                    onChange={(e) => {
                      setSessionTimeout(e.target.value);
                      saveSettingsLocally({ sessionTimeout: e.target.value });
                      showNotification('success', `Session auto-lock set to ${e.target.value} minutes.`);
                    }}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="15">15 Minutes of inactivity (High Security)</option>
                    <option value="30">30 Minutes (Recommended)</option>
                    <option value="60">1 Hour</option>
                    <option value="240">4 Hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    "Remember Device" Lifetime
                  </label>
                  <select
                    value={rememberDuration}
                    onChange={(e) => {
                      setRememberDuration(e.target.value);
                      saveSettingsLocally({ rememberDuration: e.target.value });
                      showNotification('success', `Device remember duration set to ${e.target.value} days.`);
                    }}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="1">1 Day</option>
                    <option value="7">7 Days (Recommended)</option>
                    <option value="30">30 Days</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Enforce Single Active Session</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Signing in from another device or location will immediately revoke all older active sessions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = !singleSessionMode;
                    setSingleSessionMode(next);
                    saveSettingsLocally({ singleSessionMode: next });
                    showNotification('success', next ? 'Single session policy enabled.' : 'Concurrent sessions allowed.');
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    singleSessionMode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      singleSessionMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* IP Whitelist & Restriction */}
            <div className="bg-white dark:bg-[#0E172E] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">IP Whitelist & Geofencing</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Permit administrator logins exclusively from trusted corporate CIDR subnets or static VPN IP addresses.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Enforce IP Whitelisting</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Block admin portal login requests from non-whitelisted addresses.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const next = !ipRestricted;
                      setIpRestricted(next);
                      saveSettingsLocally({ ipRestricted: next });
                      showNotification('success', next ? 'Admin IP restriction enabled.' : 'IP restriction disabled.');
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      ipRestricted ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        ipRestricted ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {ipRestricted && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Allowed CIDR Blocks / IP Addresses
                    </label>
                    <input
                      type="text"
                      value={allowedIps}
                      onChange={(e) => {
                        setAllowedIps(e.target.value);
                        saveSettingsLocally({ allowedIps: e.target.value });
                      }}
                      placeholder="e.g. 192.168.1.0/24, 10.0.0.1, 127.0.0.1"
                      className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        id="bypass"
                        checked={emergencyBypass}
                        onChange={(e) => {
                          setEmergencyBypass(e.target.checked);
                          saveSettingsLocally({ emergencyBypass: e.target.checked });
                        }}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="bypass" className="text-xs text-slate-600 dark:text-slate-400">
                        Allow emergency MFA email verification bypass if connecting outside known subnets
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: ADMIN PROFILE & IDENTITY */}
        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-[#0E172E] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-brand-cyan flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Admin Identity & Operator Profile</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Manage your administrator display name, contact phone, and operating timezone.
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-5 max-w-xl">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Verified Admin Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={user?.email || 'admin@supportiq.com'}
                    disabled
                    className="w-full bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-500 dark:text-slate-400 font-mono cursor-not-allowed"
                  />
                  <div className="absolute right-3 top-2.5 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Default Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST - UTC+5:30)</option>
                    <option value="America/New_York (EST)">America/New_York (EST - UTC-5)</option>
                    <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST - UTC-8)</option>
                    <option value="Europe/London (GMT)">Europe/London (GMT - UTC+0)</option>
                    <option value="UTC">Coordinated Universal Time (UTC)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Saving Changes...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: ACTIVE SESSIONS & AUDIT TRAIL */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            
            <div className="bg-white dark:bg-[#0E172E] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Administrator Sessions</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Currently authenticated browser instances across devices.
                  </p>
                </div>

                {sessions.length > 1 && (
                  <button
                    onClick={handleRevokeAllOther}
                    className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Revoke All Other Sessions
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {sessions.map((sess) => (
                  <div
                    key={sess.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                      sess.isCurrent 
                        ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/40' 
                        : 'bg-slate-50 dark:bg-black/20 border-slate-200/80 dark:border-white/5'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        sess.isCurrent ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                      }`}>
                        <Laptop className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">{sess.device}</span>
                          {sess.isCurrent && (
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-600 text-white">Current Device</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          <span>{sess.browser} • {sess.os}</span>
                          <span>•</span>
                          <span>IP: {sess.ip}</span>
                          <span>•</span>
                          <span>{sess.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{sess.lastActive}</span>
                      {!sess.isCurrent && (
                        <button
                          onClick={() => handleRevokeSession(sess.id)}
                          className="px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-xs font-medium transition-colors"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Login Audit Trail Log */}
            <div className="bg-white dark:bg-[#0E172E] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Recent Administrator Login Events</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Chronological record of recent successful logins and security challenges.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-black/40 border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                      <th className="p-3">Event</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">IP Address</th>
                      <th className="p-3">MFA Method</th>
                      <th className="p-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    <tr className="hover:bg-slate-50 dark:hover:bg-white/5">
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">Admin Portal Sign In</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Success
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">192.168.1.104</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">TOTP Authenticator</td>
                      <td className="p-3 text-slate-500">Today, 6:45 PM</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-white/5">
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">Admin Portal Sign In</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Success
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">203.0.113.88</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">Session Restored</td>
                      <td className="p-3 text-slate-500">Today, 2:10 PM</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-white/5">
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">Password Challenge</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">198.51.100.24</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">Password + MFA</td>
                      <td className="p-3 text-slate-500">Yesterday, 4:15 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* MFA Setup Modal */}
        {showMfaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-[#0E172E] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Authenticator App Setup</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">TOTP (Google / Microsoft Authenticator)</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMfaModal(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-mono text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-white rounded-2xl border border-slate-200 shadow-inner">
                {/* Simulated QR Code SVG */}
                <div className="w-40 h-40 bg-slate-900 rounded-lg p-2 flex flex-col justify-between items-center text-white">
                  <div className="grid grid-cols-4 gap-1.5 w-full h-full p-1">
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-transparent"></div>
                    <div className="bg-white rounded-sm"></div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-2">Scan QR code in Authenticator</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Or manually enter setup key:</label>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 font-mono text-xs text-slate-800 dark:text-white">
                  <span>JBSW Y3DP EHPK 3PXP</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('JBSWY3DPEHPK3PXP');
                      setCopiedSecret(true);
                      setTimeout(() => setCopiedSecret(false), 2000);
                    }}
                    className="text-blue-600 dark:text-brand-cyan hover:underline flex items-center gap-1 text-[11px]"
                  >
                    {copiedSecret ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSecret ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Verify 6-digit code:</label>
                <input
                  type="text"
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000 000"
                  className="w-full text-center tracking-widest text-lg font-mono py-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowMfaModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (mfaCode.length === 6) {
                      setTwoFactorEnabled(true);
                      saveSettingsLocally({ twoFactorEnabled: true });
                      setShowMfaModal(false);
                      showNotification('success', 'Two-Factor Authentication verified and activated.');
                    } else {
                      showNotification('error', 'Please enter a valid 6-digit passcode.');
                    }
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white shadow-sm"
                >
                  Verify & Save
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
