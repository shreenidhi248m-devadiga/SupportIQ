import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { TrendingDown } from 'lucide-react';
import { ChurnRiskPanel } from '../components/admin/ChurnRiskPanel';
import adminApi from '../services/adminApi';
import { AdminAnalytics } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

export const AdminChurnPage: React.FC = () => {
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
          <LoadingSpinner text="Loading churn data..." />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#102A56] dark:text-[#F8FAFC] tracking-tight flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-[#2563EB]" />
            Churn Prediction
          </h1>
          <p className="text-xs text-gray-500 dark:text-[#A8B3C7] mt-1">
            Analyze customer churn risk based on recent support activity and sentiment.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <ChurnRiskPanel analytics={analytics} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminChurnPage;
