import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import authApi from '../../services/authApi';
import AuthButton from './AuthButton';

export const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = async () => {
    setResending(true);
    try {
      await authApi.verifyEmail({ email: user?.email });
      setTimer(30);
      setCanResend(false);
    } catch (err) {
      console.error(err);
    } finally {
      setResending(false);
    }
  };

  const handleConfirmVerified = () => {
    setVerified(true);
    setTimeout(() => {
      navigate('/customer/dashboard');
    }, 1000);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-3xl bg-brand-violet/10 border border-brand-violet/30 mx-auto flex items-center justify-center text-brand-cyan shadow-xl shadow-brand-violet/20">
          <Mail className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Verify your email</h2>
          <p className="text-xs text-slate-400 mt-1">
            We've sent a verification link to{' '}
            <span className="text-brand-cyan font-mono">{user?.email || 'your email address'}</span>.
          </p>
        </div>
      </div>

      {verified ? (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center space-y-2">
          <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-400" />
          <p className="font-bold text-sm">Email verified successfully.</p>
          <p className="text-xs text-emerald-200">Redirecting to your SupportIQ dashboard...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 text-xs font-mono text-slate-300 space-y-2">
            <p className="font-bold text-white flex items-center gap-2">
              <span>✉️</span> Check your inbox
            </p>
            <p className="text-slate-400">
              Click the verification link inside the email to complete your registration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="mailto:"
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-mono text-white text-center flex items-center justify-center gap-2 transition-all"
            >
              <Mail className="w-4 h-4" /> Open Email
            </a>

            <button
              type="button"
              disabled={!canResend || resending}
              onClick={handleResend}
              className="py-3 px-4 rounded-xl bg-slate-950/60 border border-white/10 hover:border-white/20 text-xs font-mono text-slate-300 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
              {canResend ? 'Resend Verification' : `Resend in 00:${timer < 10 ? '0' + timer : timer}`}
            </button>
          </div>

          <AuthButton onClick={handleConfirmVerified} icon={<ArrowRight className="w-4 h-4" />}>
            Continue to SupportIQ
          </AuthButton>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
