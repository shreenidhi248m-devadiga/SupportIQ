import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import authApi from '../../services/authApi';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Forgot your password?</h2>
        <p className="text-sm text-slate-400 mt-1">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {submitted ? (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Reset Link Sent
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              If an account exists with <strong>{email}</strong>, you will receive password reset instructions shortly.
            </p>
          </div>

          <Link to="/login">
            <AuthButton variant="outline" icon={<ArrowLeft className="w-4 h-4" />}>
              Return to Sign In
            </AuthButton>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            label="Email Address"
            type="email"
            required
            icon={<Mail className="w-4 h-4" />}
            placeholder="Enter your registered email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthButton
            type="submit"
            loading={loading}
            loadingText="Sending link..."
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Send Reset Link
          </AuthButton>

          <div className="pt-2 text-center">
            <Link
              to="/login"
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
