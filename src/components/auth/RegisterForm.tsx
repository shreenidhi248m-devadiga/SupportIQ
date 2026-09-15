import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User as UserIcon, Mail, Phone, Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import authApi from '../../services/authApi';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import PasswordStrength from './PasswordStrength';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setLoading(true);
    try {
      const data = await authApi.registerCustomer({ name, email, password, phone });
      login(data.token, data.user);
      setSuccess('Account created successfully! Redirecting to email verification...');

      setTimeout(() => {
        navigate('/verify-email');
      }, 1200);
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Unable to create account. Please try again.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Create your SupportIQ account</h2>
        <p className="text-sm text-slate-400 mt-1">Get faster, smarter support with AI-powered assistance.</p>
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
          label="Full Name"
          required
          icon={<UserIcon className="w-4 h-4" />}
          placeholder="e.g. Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <AuthInput
          label="Email Address"
          type="email"
          required
          icon={<Mail className="w-4 h-4" />}
          placeholder="e.g. jane.doe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          label="Phone Number (Optional)"
          type="tel"
          icon={<Phone className="w-4 h-4" />}
          placeholder="+1 (555) 000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <AuthInput
          label="Password"
          isPassword
          required
          icon={<Lock className="w-4 h-4" />}
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordStrength password={password} />

        <AuthInput
          label="Confirm Password"
          isPassword
          required
          icon={<Lock className="w-4 h-4" />}
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPassword && password !== confirmPassword ? 'Passwords do not match' : undefined}
        />

        <label className="flex items-start gap-2.5 cursor-pointer text-xs font-mono text-slate-400 select-none pt-1">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5 rounded bg-slate-950 border-white/20 text-brand-violet focus:ring-brand-violet/40"
          />
          <span>
            I agree to the <a href="#" className="text-brand-blue hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-brand-blue hover:underline">Privacy Policy</a>.
          </span>
        </label>

        <AuthButton
          type="submit"
          loading={loading}
          loadingText="Creating account..."
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Create Account
        </AuthButton>
      </form>

      <div className="pt-2 text-center text-xs font-mono text-slate-400 border-t border-white/10">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-blue font-semibold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
