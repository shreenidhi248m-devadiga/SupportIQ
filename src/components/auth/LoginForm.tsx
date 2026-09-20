import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import authApi from '../../services/authApi';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import SocialLogin from './SocialLogin';
import SecurityIndicator from './SecurityIndicator';

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fillDemoCustomer = () => {
    setEmail('john.doe@example.com');
    setPassword('Customer@123456');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setLoading(true);
    try {
      const data = await authApi.loginCustomer(email, password);
      login(data.token, data.user);
      setSuccess('Login successful! Redirecting to dashboard...');

      setTimeout(() => {
        navigate('/user');
      }, 1000);
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Invalid email or password.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">Welcome back</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">Sign in to continue to your SupportIQ workspace.</p>
      </div>

      {/* Demo Credentials Helper Box */}
      <div className="p-3 rounded-2xl bg-blue-50 dark:bg-brand-violet/10 border border-blue-200 dark:border-brand-violet/30 text-[11px] dark:text-xs font-mono flex items-center justify-between gap-2 transition-colors">
        <div className="flex items-center gap-2 text-blue-800 dark:text-brand-cyan transition-colors">
          <Zap className="w-4 h-4 shrink-0" />
          <span className="truncate">Demo: john.doe@example.com</span>
        </div>
        <button
          type="button"
          onClick={fillDemoCustomer}
          className="px-2.5 py-1 rounded-lg bg-brand-blue hover:bg-blue-700 dark:bg-brand-violet dark:hover:bg-brand-violet/80 text-white font-bold transition-all shrink-0"
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
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Email Address"
          type="email"
          required
          icon={<Mail className="w-4 h-4" />}
          placeholder="john.doe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          label="Password"
          isPassword
          required
          icon={<Lock className="w-4 h-4" />}
          placeholder="Customer@123456"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 transition-colors">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded bg-white dark:bg-slate-950 border-slate-300 dark:border-white/20 text-brand-violet focus:ring-brand-violet/40 transition-colors"
            />
            <span>Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-brand-blue hover:text-brand-cyan hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton
          type="submit"
          loading={loading}
          loadingText="Signing in..."
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Sign In
        </AuthButton>
      </form>

      <SocialLogin />

      <div className="pt-2 text-center text-sm font-bold font-mono text-slate-800 dark:text-slate-200 transition-colors">
        Don't have an account?{' '}
        {onSwitchToRegister ? (
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-brand-blue font-semibold hover:underline"
          >
            Create customer account
          </button>
        ) : (
          <Link to="/register" className="text-brand-blue font-semibold hover:underline">
            Create customer account
          </Link>
        )}
      </div>

      <SecurityIndicator role="customer" />
    </div>
  );
};

export default LoginForm;
