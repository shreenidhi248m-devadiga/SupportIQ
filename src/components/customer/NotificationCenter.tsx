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
    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-white dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] shadow-2xl p-4 text-left space-y-3 z-50">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-[#111A33] pb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#2563EB]" />
          <h4 className="text-sm font-bold text-[#102A56] dark:text-[#F8FAFC]">Notifications</h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllAsRead}
            className="text-[11px] font-mono text-[#2563EB] hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </button>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-500 hover:text-[#102A56] dark:text-[#71809A] dark:hover:text-[#F8FAFC]">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-4 text-center text-xs font-mono text-gray-600 dark:text-[#A8B3C7]">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div className="p-6 text-center space-y-1">
          <p className="text-xs font-bold text-[#102A56] dark:text-[#F8FAFC]">You're all caught up!</p>
          <p className="text-[11px] text-gray-600 dark:text-[#A8B3C7]">No unread notifications at this time.</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className={`p-3 rounded-2xl border text-xs space-y-1 transition-all ${
                notif.isRead ? 'bg-white dark:bg-[#0D1428]/40 border-[#E5E7EB] dark:border-[#111A33] text-gray-600 dark:text-[#A8B3C7]' : 'bg-white dark:bg-[#0D1428] border-[#2563EB]/20 dark:border-[#2563EB]/20 text-[#102A56] dark:text-[#F8FAFC] font-medium'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2563EB] text-[11px]">{notif.title}</span>
                <span className="text-[10px] text-gray-500 dark:text-[#71809A] font-mono">
                  {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-[#71809A]">{notif.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
