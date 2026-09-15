import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl text-center space-y-5"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-slate-300 mx-auto flex items-center justify-center shadow-lg">
            <LogOut className="w-7 h-7 text-rose-400" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">Are you sure you want to sign out?</h3>
            <p className="text-xs text-slate-400 mt-1">
              You will need to sign in again to access active support sessions and tickets.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-mono text-slate-300 font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-mono text-white font-semibold transition-all shadow-lg shadow-rose-600/30"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LogoutConfirmModal;
