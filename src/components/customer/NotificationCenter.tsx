import React, { useState, useEffect } from 'react';
import { Bell, CheckCheck, X } from 'lucide-react';
import { NotificationItem } from '../../types';
import userApi from '../../services/userApi';

interface NotificationCenterProps {
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await userApi.getNotifications();
        setNotifications(data || []);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
      finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl p-4 text-left space-y-3 z-50">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-violet" />
          <h4 className="text-sm font-bold text-white">Notifications</h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllAsRead}
            className="text-[11px] font-mono text-brand-cyan hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </button>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-4 text-center text-xs font-mono text-slate-400">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div className="p-6 text-center space-y-1">
          <p className="text-xs font-bold text-white">You're all caught up!</p>
          <p className="text-[11px] text-slate-400">No unread notifications at this time.</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className={`p-3 rounded-2xl border text-xs space-y-1 transition-all ${
                notif.isRead ? 'bg-slate-950/40 border-white/5 text-slate-400' : 'bg-slate-950 border-brand-violet/30 text-white font-medium'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-cyan text-[11px]">{notif.title}</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-slate-300">{notif.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
