import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import authApi from '../../services/authApi';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import PasswordStrength from './PasswordStrength';

export const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword({ token, newPassword });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error updating password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Create a new password</h2>
        <p className="text-sm text-slate-400 mt-1">
          Ensure your password contains at least 8 characters with letters, numbers, and symbols.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success ? (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Password Updated Successfully
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              Your password has been changed. You can now log in using your new credentials.
            </p>
          </div>

          <AuthButton onClick={() => navigate('/login')} icon={<ArrowLeft className="w-4 h-4" />}>
            Return to Sign In
          </AuthButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            label="New Password"
            isPassword
            required
            icon={<Lock className="w-4 h-4" />}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <PasswordStrength password={newPassword} />

          <AuthInput
            label="Confirm Password"
            isPassword
            required
            icon={<Lock className="w-4 h-4" />}
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPassword && newPassword !== confirmPassword ? 'Passwords do not match' : undefined}
          />

          <AuthButton type="submit" loading={loading} loadingText="Updating password...">
            Reset Password
          </AuthButton>

          <div className="pt-2 text-center">
            <Link
              to="/login"
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Cancel and Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordForm;
