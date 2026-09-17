import React, { useState, useEffect } from 'react';
import adminApi from '../services/adminApi';
import { AdminAnalytics } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminWelcome } from '../components/admin/AdminWelcome';
import { KPICards } from '../components/admin/KPICards';
import { TicketOperationsChart } from '../components/admin/TicketOperationsChart';
import { TicketStatusDistribution } from '../components/admin/TicketStatusDistribution';
import { DepartmentPerformance } from '../components/admin/DepartmentPerformance';
import { RecentTicketsQueue } from '../components/admin/RecentTicketsQueue';
import { AIIntelligencePanel } from '../components/admin/AIIntelligencePanel';
import { SentimentIntelligence } from '../components/admin/SentimentIntelligence';
import { ChurnRiskPanel } from '../components/admin/ChurnRiskPanel';

export const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAnalytics = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await adminApi.getAnalytics();
      setAnalytics(data);
    } catch (err: any) {
      console.error('Error fetching admin analytics:', err);
      setError(err.response?.data?.message || 'Error connecting to admin analytics backend');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040612] flex items-center justify-center">
        <LoadingSpinner text="Aggregating MongoDB system telemetry..." />
      </div>
    );
  }

  return (
    <AdminLayout title="Dashboard Overview">
      <AdminWelcome onRefresh={() => fetchAnalytics(true)} isRefreshing={isRefreshing} />
      
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm mb-6">
          {error}
        </div>
      )}

      {analytics && (
        <div className="space-y-6 animate-fade-in">
          {/* Top KPIs Row */}
          <KPICards analytics={analytics} />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TicketOperationsChart analytics={analytics} />
            </div>
            <div>
              <TicketStatusDistribution analytics={analytics} />
            </div>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AIIntelligencePanel analytics={analytics} />
            </div>
            <div>
              <DepartmentPerformance analytics={analytics} />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentTicketsQueue />
            </div>
            <div className="space-y-6">
              <SentimentIntelligence analytics={analytics} />
              <ChurnRiskPanel analytics={analytics} />
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;