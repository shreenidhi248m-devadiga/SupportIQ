import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../services/adminApi';
import { User } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { Search, Users, Activity, ArrowRight, AlertTriangle } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Customer Directory & Churn Risk</h1>
          <p className="text-sm text-slate-400">View customer accounts, ticket history counts, sentiment trends, and churn risk scores.</p>
        </div>
      </div>

      {/* Search */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers by name or email..."
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 font-mono"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSpinner text="Fetching customer directory..." />
      ) : filteredCustomers.length === 0 ? (
        <EmptyState icon="users" title="No customers found" description="No registered customers match your search." />
      ) : (
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-black/40 border-b border-white/10 text-slate-400 uppercase tracking-wider">
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
              <tbody className="divide-y divide-white/5 text-slate-200">
                {filteredCustomers.map((cust) => {
                  const riskLevel = cust.riskLevel || 'Low';
                  const churnScore = cust.churnScore || 0.15;

                  return (
                    <tr key={cust._id || cust.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-sans font-bold text-white flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-violet to-brand-blue flex items-center justify-center font-bold text-white text-xs">
                          {cust.name ? cust.name.charAt(0).toUpperCase() : 'C'}
                        </div>
                        <span>{cust.name}</span>
                      </td>
                      <td className="p-4 text-slate-300">{cust.email}</td>
                      <td className="p-4 text-slate-400">{cust.phone || 'N/A'}</td>
                      <td className="p-4 font-bold text-brand-blue">{cust.totalTickets || 0}</td>
                      <td className="p-4">
                        <span className="text-amber-400 font-bold">{cust.openTickets || 0} Open</span> /{' '}
                        <span className="text-emerald-400">{cust.resolvedTickets || 0} Resolved</span>
                      </td>
                      <td className="p-4 text-brand-violet">{cust.sentiment || 'Neutral'}</td>
                      <td className="p-4">
                        <span
                          className={`font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                            riskLevel === 'High'
                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                              : riskLevel === 'Medium'
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          }`}
                        >
                          {riskLevel} ({((churnScore || 0.15) * 100).toFixed(0)}%)
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          to={`/admin/customers/${cust._id || cust.id}/intelligence`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-violet/20 border border-brand-violet/40 text-brand-violet hover:bg-brand-violet hover:text-white transition-colors"
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
  );
};

export default AdminCustomersPage;