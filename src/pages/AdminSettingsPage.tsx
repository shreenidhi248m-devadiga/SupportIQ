import React from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { Settings } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#102A56] dark:text-[#F8FAFC] tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#2563EB]" />
            Settings
          </h1>
          <p className="text-xs text-gray-500 dark:text-[#A8B3C7] mt-1">
            Manage system configuration and platform settings.
          </p>
        </div>
        
        <div className="p-8 rounded-3xl bg-white dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] shadow-sm flex items-center justify-center">
          <p className="text-sm font-mono text-gray-500">Settings panel coming soon.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
