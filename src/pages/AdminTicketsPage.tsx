import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../services/adminApi';
import { Ticket } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { Search, Filter, Shield, Edit3, ArrowRight, CheckCircle } from 'lucide-react';
import { AdminLayout } from '../components/admin/AdminLayout';

export const AdminTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [editStatus, setEditStatus] = useState<string>('');
  const [editDept, setEditDept] = useState<string>('');
  const [updating, setUpdating] = useState<boolean>(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAllTickets({
        search: search || undefined,
        status: statusFilter || undefined,
      });
      setTickets(res.tickets || []);
    } catch (err: any) {
      console.error('Error fetching admin tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [search, statusFilter]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTicket) return;

    setUpdating(true);
    try {
      await adminApi.updateTicketStatus(editingTicket.ticketId, {
        status: editStatus,
        department: editDept,
      });
      setEditingTicket(null);
      await fetchTickets();
    } catch (err: any) {
      console.error('Error updating ticket:', err);
      alert(err.response?.data?.message || 'Failed to update ticket');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AdminLayout title="Ticket Operations">
      <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Admin Ticket Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">View, route, update status, and inspect customer support inquiries.</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white dark:bg-[#0E172E] p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tickets by ID, subject, or description..."
            className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 font-mono text-xs w-full sm:w-auto">
          <Filter className="w-4 h-4 text-blue-600 dark:text-brand-cyan" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Tickets Table / List */}
      {loading ? (
        <LoadingSpinner text="Fetching tickets for admin..." />
      ) : tickets.length === 0 ? (
        <EmptyState
          icon="inbox"
          title="No tickets found"
          description="No customer tickets match your query."
        />
      ) : (
        <div className="bg-white dark:bg-[#0E172E] rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-slate-50 dark:bg-black/40 border-b border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="p-4">Ticket ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Sentiment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-200">
                {tickets.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-blue-600 dark:text-brand-blue">#{ticket.ticketId}</td>
                    <td className="p-4 font-sans text-sm font-semibold text-slate-900 dark:text-white">
                      {typeof ticket.customerId === 'object' ? ticket.customerId.name : 'Customer'}
                    </td>
                    <td className="p-4 font-sans text-slate-700 dark:text-slate-200 max-w-xs truncate">{ticket.subject}</td>
                    <td className="p-4">
                      <span className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-md text-slate-700 dark:text-slate-300 font-medium">
                        {ticket.department}
                      </span>
                    </td>
                    <td className="p-4 uppercase font-bold text-slate-800 dark:text-slate-300">{ticket.priority}</td>
                    <td className="p-4 text-purple-600 dark:text-brand-violet font-medium">{ticket.sentiment}</td>
                    <td className="p-4">
                      <span
                        className={`font-bold uppercase px-2.5 py-0.5 rounded-full border text-[11px] ${
                          ticket.status === 'resolved' || ticket.status === 'closed'
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                            : ticket.status === 'in_progress'
                            ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400'
                            : 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400'
                        }`}
                      >
                        {ticket.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingTicket(ticket);
                          setEditStatus(ticket.status);
                          setEditDept(ticket.department);
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-cyan-700 dark:text-brand-cyan transition-colors"
                        title="Edit Status / Department"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/admin/tickets/${ticket.ticketId}`}
                        className="inline-block p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-blue-600 dark:text-brand-blue transition-colors"
                        title="Open Details"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#0E172E] max-w-md w-full p-8 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Update Ticket #{editingTicket.ticketId}</h3>
            
            <form onSubmit={handleUpdate} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">STATUS</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="open">open</option>
                  <option value="in_progress">in_progress</option>
                  <option value="waiting_for_customer">waiting_for_customer</option>
                  <option value="resolved">resolved</option>
                  <option value="closed">closed</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">DEPARTMENT</label>
                <select
                  value={editDept}
                  onChange={(e) => setEditDept(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Claims">Claims</option>
                  <option value="Billing">Billing</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Account Security">Account Security</option>
                  <option value="General Support">General Support</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 font-sans">
                <button
                  type="button"
                  onClick={() => setEditingTicket(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  {updating ? 'Saving...' : 'Save Updates'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      </div>
    </AdminLayout>
  );
};

export default AdminTicketsPage;