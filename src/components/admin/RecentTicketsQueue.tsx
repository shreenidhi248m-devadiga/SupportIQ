import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, User } from '../../types';
import adminApi from '../../services/adminApi';
import { ListFilter, ArrowRight, Clock, AlertTriangle, AlertCircle, Info, MoreHorizontal, AlertOctagon } from 'lucide-react';

export const RecentTicketsQueue: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await adminApi.getAllTickets({ limit: 5 });
        setTickets(response.tickets || []);
      } catch (err) {
        console.error("Failed to fetch recent tickets", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertOctagon className="w-4 h-4 text-rose-500" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'medium': return <AlertCircle className="w-4 h-4 text-blue-400" />;
      default: return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20';
      case 'in_progress': return 'bg-brand-blue/10 text-brand-blue border-brand-blue/20';
      case 'waiting_for_customer': return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
      case 'resolved': return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hr ago`;
    return `${Math.floor(diffInHours / 24)} d ago`;
  };

  const getUserName = (customer: User | string) => {
    if (typeof customer === 'string') return 'Unknown';
    return customer.name;
  };

  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-brand-violet" /> Recent Support Requests
        </h3>
        <Link to="/admin/tickets" className="text-sm font-semibold text-brand-violet hover:text-brand-blue transition-colors flex items-center gap-1 group">
          View All Queue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-white/5">
              <th className="pb-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Ticket ID</th>
              <th className="pb-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Customer</th>
              <th className="pb-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Subject</th>
              <th className="pb-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Department</th>
              <th className="pb-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Priority</th>
              <th className="pb-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Status</th>
              <th className="pb-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Created</th>
              <th className="pb-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500 text-sm">
                  Loading recent tickets...
                </td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500 text-sm">
                  No recent tickets found.
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 px-4 text-sm font-mono text-slate-400">
                    <Link to={`/admin/tickets/${ticket._id}`} className="hover:text-brand-cyan transition-colors">
                      #{ticket.ticketId}
                    </Link>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-white">{getUserName(ticket.customerId)}</td>
                  <td className="py-4 px-4 text-sm text-slate-300 max-w-[200px] truncate">{ticket.subject}</td>
                  <td className="py-4 px-4 text-sm text-slate-400">{ticket.department}</td>
                  <td className="py-4 px-4 text-sm capitalize flex items-center gap-2 mt-3.5">
                    {/* Inline icons import for simplicity if missing above */}
                    {ticket.priority === 'critical' && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                    {ticket.priority === 'high' && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                    {ticket.priority === 'medium' && <span className="w-2 h-2 rounded-full bg-blue-400"></span>}
                    {ticket.priority === 'low' && <span className="w-2 h-2 rounded-full bg-slate-400"></span>}
                    <span className={ticket.priority === 'critical' ? 'text-rose-400' : ticket.priority === 'high' ? 'text-amber-400' : 'text-slate-300'}>{ticket.priority}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border capitalize ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-500 font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {formatTimeAgo(ticket.createdAt)}
                  </td>
                  <td className="py-4 px-4">
                    <Link to={`/admin/tickets/${ticket._id}`} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors inline-block">
                      <MoreHorizontal className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
