import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserLayout from '../components/customer/UserLayout';
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
    <UserLayout>
      <div className="space-y-6 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#102A56] dark:text-[#F8FAFC] tracking-tight flex items-center gap-2">
              <TicketIcon className="w-6 h-6 text-[#2563EB]" />
              My Support Tickets
            </h1>
            <p className="text-xs text-gray-600 dark:text-[#A8B3C7] mt-1">Track and manage all your active and past support requests.</p>
          </div>

          <Link
            to="/user/create-ticket"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet text-[#102A56] dark:text-[#F8FAFC] font-bold text-xs shadow-lg shadow-brand-violet/20 hover:opacity-95 transition-all flex items-center gap-2 self-start"
          >
            <PlusCircle className="w-4 h-4" /> Create Ticket
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-gray-600 dark:text-[#A8B3C7] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ticket ID or subject..."
              className="w-full bg-white dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#102A56] dark:text-[#F8FAFC] placeholder-slate-500 focus:outline-none focus:border-brand-violet transition-all"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-white dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] rounded-xl px-4 py-2.5 text-xs text-[#102A56] dark:text-[#F8FAFC] focus:outline-none focus:border-brand-violet transition-all"
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
              <div key={i} className="h-20 rounded-2xl bg-white dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] animate-pulse" />
            ))}
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] space-y-3">
            <CheckCircle2 className="w-10 h-10 mx-auto text-gray-500 dark:text-[#71809A]" />
            <p className="text-sm font-bold text-[#102A56] dark:text-[#F8FAFC]">No tickets found</p>
            <p className="text-xs text-gray-600 dark:text-[#A8B3C7]">No support tickets match your search filters.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket._id || ticket.ticketId}
                onClick={() => navigate(`/user/tickets/${ticket.ticketId}`)}
                className="p-5 rounded-2xl bg-white dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] hover:border-brand-violet/40 backdrop-blur-xl transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#2563EB]">#{ticket.ticketId}</span>
                    <h3 className="text-sm font-semibold text-[#102A56] dark:text-[#F8FAFC] group-hover:text-[#2563EB] transition-colors">
                      {ticket.subject}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-gray-600 dark:text-[#A8B3C7]">
                    <span>Department: {ticket.department}</span>
                    <span>•</span>
                    <span className="capitalize">Priority: {ticket.priority}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <span className="px-3 py-1 rounded-full bg-[#F8FAFC] dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] text-xs font-mono capitalize">
                    {ticket.status}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-500 dark:text-[#71809A] group-hover:text-[#102A56] dark:text-[#F8FAFC] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default MyTicketsPage;
