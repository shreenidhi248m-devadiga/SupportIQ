import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthButton from '../components/auth/AuthButton';

export const AccessDeniedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleReturn = () => {
    if (user?.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (user?.role === 'customer') {
      navigate('/customer/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/80 border border-rose-500/30 backdrop-blur-xl shadow-2xl text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center shadow-xl shadow-rose-500/10">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[11px] font-mono text-rose-400 tracking-widest uppercase">Error 403</span>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">Access Restricted</h2>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            You don't have permission to access this workspace. This area is reserved for authorized accounts.
          </p>
        </div>

        <div className="pt-2">
          <AuthButton onClick={handleReturn} icon={<Home className="w-4 h-4" />}>
            Return to Dashboard
          </AuthButton>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
