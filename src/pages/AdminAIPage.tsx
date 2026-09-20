import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { Sparkles } from 'lucide-react';
import { AIIntelligencePanel } from '../components/admin/AIIntelligencePanel';
import adminApi from '../services/adminApi';
import { AdminAnalytics } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

export const AdminAIPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await adminApi.getAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading || !analytics) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <LoadingSpinner text="Loading AI analytics..." />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#102A56] dark:text-[#F8FAFC] tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#2563EB]" />
            AI Analytics
          </h1>
          <p className="text-xs text-gray-500 dark:text-[#A8B3C7] mt-1">
            Monitor the performance and resolution rate of SupportIQ AI agents.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <AIIntelligencePanel analytics={analytics} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAIPage;
