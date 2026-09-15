import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthButton from './AuthButton';

interface SessionExpiredModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  if (!isOpen) return null;

  const handleSignInAgain = () => {
    logout();
    if (onClose) onClose();
    navigate('/login');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-rose-500/30 shadow-2xl text-center space-y-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center shadow-lg">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">Your session has expired</h3>
            <p className="text-xs text-slate-300 mt-1">
              Please sign in again to continue working in your SupportIQ workspace.
            </p>
          </div>

          <AuthButton onClick={handleSignInAgain} icon={<LogIn className="w-4 h-4" />}>
            Sign In Again
          </AuthButton>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SessionExpiredModal;
