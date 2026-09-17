import React, { useState } from 'react';
import { User } from '../../types';
import { Search, Filter, AlertOctagon, MoreHorizontal } from 'lucide-react';
import { CustomerIntelligenceDrawer } from './CustomerIntelligenceDrawer';

interface CustomerRiskTableProps {
  customers: User[];
}

export const CustomerRiskTable: React.FC<CustomerRiskTableProps> = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  // Filter and sort customers by risk
  const processedCustomers = customers
    .filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            c.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = riskFilter === 'All' || c.riskLevel === riskFilter;
      return matchesSearch && matchesRisk;
    })
    // Sort High > Medium > Low
    .sort((a, b) => {
      const riskWeight = { 'High': 3, 'Medium': 2, 'Low': 1, 'undefined': 0 };
      const weightA = riskWeight[(a.riskLevel as keyof typeof riskWeight) || 'undefined'];
      const weightB = riskWeight[(b.riskLevel as keyof typeof riskWeight) || 'undefined'];
      return weightB - weightA || (b.churnScore || 0) - (a.churnScore || 0);
    });

  const getRiskColor = (level?: string) => {
    switch (level) {
      case 'High': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Low': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment?.toLowerCase()) {
      case 'angry':
      case 'frustrated': return 'text-rose-400';
      case 'positive': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <>
      <div className="bg-slate-900/50 border border-white/5 rounded-2xl flex flex-col overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
              <AlertOctagon className="w-5 h-5 text-rose-500" /> Customers Requiring Attention
            </h3>
            <p className="text-sm text-slate-400">Identify customers whose recent behavior indicates a higher predicted likelihood of leaving.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search customers..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-brand-blue/50"
              />
            </div>
            
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-sm font-medium text-slate-300 hover:bg-black/60 transition-colors">
                <Filter className="w-4 h-4" /> Risk: {riskFilter}
              </button>
              <div className="absolute right-0 top-full mt-1 w-32 bg-slate-800 border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 py-1">
                {['All', 'High', 'Medium', 'Low'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setRiskFilter(f)}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-slate-700 transition-colors text-slate-300"
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-black/20">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Customer</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Risk Score</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Risk Level</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono text-center">Open Tickets</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Sentiment</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {processedCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <p className="text-slate-400">No customers found matching the current filters.</p>
                  </td>
                </tr>
              ) : (
                processedCustomers.map((customer) => (
                  <tr key={customer.id || customer._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{customer.name}</div>
                          <div className="text-xs text-slate-500">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-mono text-white font-bold">{Math.round((customer.churnScore || 0) * 100)} / 100</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getRiskColor(customer.riskLevel)}`}>
                        {customer.riskLevel || 'Unknown'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm font-mono text-slate-300">{customer.openTickets || 0}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-sm font-medium ${getSentimentColor(customer.sentiment)}`}>
                        {customer.sentiment || 'Neutral'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => setSelectedCustomerId(customer.id || customer._id || null)}
                        className="px-4 py-2 rounded-lg bg-brand-blue/10 text-brand-blue text-xs font-semibold hover:bg-brand-blue/20 transition-colors"
                      >
                        View Insights
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomerId && (
        <CustomerIntelligenceDrawer 
          customerId={selectedCustomerId} 
          onClose={() => setSelectedCustomerId(null)} 
        />
      )}
    </>
  );
};
