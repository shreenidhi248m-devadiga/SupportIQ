import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CustomerLayout from '../components/customer/CustomerLayout';
import { Ticket as TicketIcon, Search, Filter, PlusCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import ticketApi from '../services/ticketApi';
import { Ticket } from '../types';

export const MyTicketsPage: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await ticketApi.getMyTickets();
        setTickets(data || []);
      } catch (err) {
        console.error('Error fetching tickets:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || t.ticketId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <CustomerLayout>
      <div className="space-y-6 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <TicketIcon className="w-6 h-6 text-brand-blue" />
              My Support Tickets
            </h1>
            <p className="text-xs text-slate-400 mt-1">Track and manage all your active and past support requests.</p>
          </div>

          <Link
            to="/customer/tickets/new"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet text-white font-bold text-xs shadow-lg shadow-brand-violet/20 hover:opacity-95 transition-all flex items-center gap-2 self-start"
          >
            <PlusCircle className="w-4 h-4" /> Create Ticket
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ticket ID or subject..."
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet transition-all"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-violet transition-all"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Tickets List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 rounded-2xl bg-slate-900/60 border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-white/10 space-y-3">
            <CheckCircle2 className="w-10 h-10 mx-auto text-slate-500" />
            <p className="text-sm font-bold text-white">No tickets found</p>
            <p className="text-xs text-slate-400">No support tickets match your search filters.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket._id || ticket.ticketId}
                onClick={() => navigate(`/customer/tickets/${ticket.ticketId}`)}
                className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-brand-violet/40 backdrop-blur-xl transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-brand-cyan">#{ticket.ticketId}</span>
                    <h3 className="text-sm font-semibold text-white group-hover:text-brand-cyan transition-colors">
                      {ticket.subject}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span>Department: {ticket.department}</span>
                    <span>•</span>
                    <span className="capitalize">Priority: {ticket.priority}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono capitalize">
                    {ticket.status}
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default MyTicketsPage;
