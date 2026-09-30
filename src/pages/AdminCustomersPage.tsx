import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../services/adminApi';
import { User } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { Search, Users, Activity, ArrowRight, AlertTriangle } from 'lucide-react';
import { AdminLayout } from '../components/admin/AdminLayout';

export const AdminCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const data = await adminApi.getAllCustomers();
        setCustomers(data);
      } catch (err: any) {
        console.error('Error fetching admin customers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Customers Directory">
      <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Customer Directory & Churn Risk</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">View customer accounts, ticket history counts, sentiment trends, and churn risk scores.</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-[#0E172E] p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers by name or email..."
            className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner text="Fetching customer directory..." />
      ) : filteredCustomers.length === 0 ? (
        <EmptyState icon="users" title="No customers found" description="No registered customers match your search." />
      ) : (
        <div className="bg-white dark:bg-[#0E172E] rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-slate-50 dark:bg-black/40 border-b border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Contact Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Total Tickets</th>
                  <th className="p-4">Open / Resolved</th>
                  <th className="p-4">Latest Sentiment</th>
                  <th className="p-4">Churn Risk</th>
                  <th className="p-4 text-right">Intelligence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-200">
                {filteredCustomers.map((cust) => {
                  const riskLevel = cust.riskLevel || 'Low';
                  const churnScore = cust.churnScore || 0.15;

                  return (
                    <tr key={cust._id || cust.id} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 font-sans font-bold text-slate-900 dark:text-white flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-violet to-brand-blue flex items-center justify-center font-bold text-white text-xs shadow-sm">
                          {cust.name ? cust.name.charAt(0).toUpperCase() : 'C'}
                        </div>
                        <span className="font-semibold">{cust.name}</span>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">{cust.email}</td>
                      <td className="p-4 text-slate-500 dark:text-slate-400">{cust.phone || 'N/A'}</td>
                      <td className="p-4 font-bold text-blue-600 dark:text-brand-blue">{cust.totalTickets || 0}</td>
                      <td className="p-4">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">{cust.openTickets || 0} Open</span> /{' '}
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{cust.resolvedTickets || 0} Resolved</span>
                      </td>
                      <td className="p-4 text-purple-600 dark:text-brand-violet font-medium">{cust.sentiment || 'Neutral'}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                            riskLevel === 'High'
                              ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/20'
                              : riskLevel === 'Medium'
                              ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
                              : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
                          }`}
                        >
                          {riskLevel} ({((churnScore || 0.15) * 100).toFixed(0)}%)
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          to={`/admin/customers/${cust._id || cust.id}/intelligence`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-brand-violet/20 dark:hover:bg-brand-violet/30 text-blue-700 dark:text-brand-cyan border border-blue-200 dark:border-brand-violet/30 transition-colors font-sans text-xs font-semibold"
                        >
                          <Activity className="w-3.5 h-3.5" /> Intelligence
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      </div>
    </AdminLayout>
  );
};

export default AdminCustomersPage;