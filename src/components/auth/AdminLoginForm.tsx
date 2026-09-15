import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Key, ArrowRight, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import authApi from '../../services/authApi';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import SecurityIndicator from './SecurityIndicator';

export const AdminLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fillDemoAdmin = () => {
    setEmail('admin@supportiq.com');
    setPassword('Admin@123456');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError('Please enter administrator email.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setLoading(true);
    try {
      const data = await authApi.loginAdmin(email, password);
      login(data.token, data.user);
      setSuccess('Admin authentication successful! Accessing console...');

      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Invalid administrator credentials.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Shield className="w-6 h-6 text-teal-400 shrink-0" />
          Administrator Access
        </h2>
        <p className="text-sm text-slate-400 mt-1">Sign in securely to manage the SupportIQ platform.</p>
      </div>

      <SecurityIndicator role="admin" />

      {/* Demo Admin Helper */}
      <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-xs font-mono flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-teal-300">
          <Zap className="w-4 h-4 shrink-0" />
          <span className="truncate">Demo: admin@supportiq.com</span>
        </div>
        <button
          type="button"
          onClick={fillDemoAdmin}
          className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold transition-all shrink-0"
        >
          Auto Fill
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Admin Email"
          type="email"
          required
          icon={<Shield className="w-4 h-4" />}
          placeholder="admin@supportiq.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          label="Password"
          isPassword
          required
          icon={<Lock className="w-4 h-4" />}
          placeholder="Admin@123456"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthInput
          label="Admin Access Code (Optional)"
          icon={<Key className="w-4 h-4" />}
          placeholder="Enter access code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />

        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              className="rounded bg-slate-950 border-white/20 text-teal-500 focus:ring-teal-500/40"
            />
            <span>Remember this device</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-teal-400 hover:text-teal-300 hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton
          type="submit"
          variant="admin"
          loading={loading}
          loadingText="Authenticating..."
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Access Admin Panel
        </AuthButton>
      </form>
    </div>
  );
};

export default AdminLoginForm;
