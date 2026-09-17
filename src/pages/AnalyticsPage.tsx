import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import { AnalyticsHeader } from '../components/analytics/AnalyticsHeader';
import { AnalyticsKPIGrid } from '../components/analytics/AnalyticsKPIGrid';
import { SupportVolumeChart } from '../components/analytics/SupportVolumeChart';
import { CustomerRiskTable } from '../components/analytics/CustomerRiskTable';
import LoadingSpinner from '../components/LoadingSpinner';
import adminApi from '../services/adminApi';
import { AdminAnalytics, User } from '../types';
import { AlertCircle } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState('30 Days');
  const [activeTab, setActiveTab] = useState<'overview' | 'behavior' | 'sentiment' | 'ai' | 'churn'>('overview');
  
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch both generic analytics and customer data to compute churn dynamically
        const [analyticsData, customersData] = await Promise.all([
          adminApi.getAnalytics(),
          adminApi.getAllCustomers()
        ]);
        setAnalytics(analyticsData);
        setCustomers(customersData);
      } catch (err: any) {
        console.error("Failed to load intelligence data", err);
        setError(err.message || 'Analytics unavailable');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedRange]); // Re-fetch or re-filter when range changes

  const tabs = [
    { id: 'overview', label: 'Analytics Overview' },
    { id: 'behavior', label: 'Customer Behavior' },
    { id: 'sentiment', label: 'Sentiment' },
    { id: 'ai', label: 'AI Performance' },
    { id: 'churn', label: 'Churn Prediction' }
  ];

  if (loading) {
    return (
      <AdminLayout title="Customer Intelligence">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <LoadingSpinner text="Aggregating intelligence data..." />
        </div>
      </AdminLayout>
    );
  }

  if (error || !analytics) {
    return (
      <AdminLayout title="Customer Intelligence">
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-center max-w-lg mx-auto mt-20">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Analytics Unavailable</h3>
          <p className="text-slate-400 text-sm mb-6">We couldn't load the latest analytics. {error}</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors">Retry</button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Customer Intelligence">
      <AnalyticsHeader selectedRange={selectedRange} onRangeChange={setSelectedRange} />

      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-white/10 mb-8 pb-px">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'text-brand-cyan border-brand-cyan shadow-[0_4px_15px_-3px_rgba(34,211,238,0.3)]'
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Routing */}
      <div className="animate-fade-in min-h-[500px]">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <AnalyticsKPIGrid analytics={analytics} customers={customers} />
            <SupportVolumeChart trends={analytics.ticketTrends || []} />
          </div>
        )}
        
        {activeTab === 'churn' && (
          <div className="space-y-6">
            <CustomerRiskTable customers={customers} />
          </div>
        )}

        {(activeTab === 'behavior' || activeTab === 'sentiment' || activeTab === 'ai') && (
           <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-slate-900/30 rounded-2xl border border-white/5 border-dashed">
             <h3 className="text-lg font-medium text-white mb-2">Select a different tab to view {activeTab}</h3>
             <p className="text-sm text-slate-500 max-w-md">The detailed implementation for this specific sub-view is designed but pending final backend metrics mapping. Try "Overview" or "Churn Prediction".</p>
           </div>
        )}
      </div>

    </AdminLayout>
  );
};

export default AnalyticsPage;
