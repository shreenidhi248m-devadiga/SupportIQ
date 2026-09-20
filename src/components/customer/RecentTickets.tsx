import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket as TicketIcon, Clock, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Ticket as TicketType } from '../../types';

interface RecentTicketsProps {
  tickets: TicketType[];
  loading?: boolean;
}

export const RecentTickets: React.FC<RecentTicketsProps> = ({ tickets, loading = false }) => {
  const navigate = useNavigate();
  const recentList = tickets.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-mono font-semibold">Open</span>;
      case 'in_progress':
        return <span className="px-2.5 py-0.5 rounded-full bg-[#EFF6FF] dark:bg-[#111A33] text-[#2563EB] border border-[#2563EB]/20 dark:border-[#2563EB]/20 text-[11px] font-mono font-semibold">In Progress</span>;
      case 'resolved':
      case 'closed':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-semibold">Resolved</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-[#F8FAFC] dark:bg-[#1A2340] text-gray-500 dark:text-[#71809A] text-[11px] font-mono">{status}</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
      case 'critical':
        return <span className="text-rose-400 font-bold uppercase text-[10px]">High</span>;
      case 'medium':
        return <span className="text-amber-400 font-bold uppercase text-[10px]">Medium</span>;
      default:
        return <span className="text-gray-600 dark:text-[#A8B3C7] font-bold uppercase text-[10px]">Low</span>;
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#111A33] border border-[#E5E7EB] dark:border-[#111A33] backdrop-blur-xl shadow-xl text-left space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#102A56] dark:text-[#F8FAFC] tracking-tight flex items-center gap-2">
          <TicketIcon className="w-5 h-5 text-[#2563EB]" />
          Recent Tickets
        </h3>

        <Link
          to="/user/tickets"
          className="text-xs font-mono text-[#2563EB] hover:text-[#2563EB] flex items-center gap-1 transition-colors"
        >
          View All Tickets <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-white dark:bg-[#0D1428]/60 border border-[#E5E7EB] dark:border-[#111A33] animate-pulse" />
          ))}
        </div>
      ) : recentList.length === 0 ? (
        <div className="p-8 text-center space-y-3 rounded-2xl bg-white dark:bg-[#0D1428]/50 border border-[#E5E7EB] dark:border-[#111A33]">
          <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] dark:bg-[#111A33] text-gray-600 dark:text-[#A8B3C7] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-sm font-bold text-[#102A56] dark:text-[#F8FAFC]">You're all clear!</p>
          <p className="text-xs text-gray-600 dark:text-[#A8B3C7]">You don't have any support tickets currently open.</p>
          <Link
            to="/user/create-ticket"
            className="inline-block mt-2 px-4 py-2 rounded-xl bg-brand-violet text-[#102A56] dark:text-[#F8FAFC] text-xs font-bold hover:opacity-95 transition-all"
          >
            Create Your First Ticket
          </Link>
        </div>
      ) : (
        <div className="space-y-2.5">
          {recentList.map((ticket) => (
            <div
              key={ticket._id || ticket.ticketId}
              onClick={() => navigate(`/user/tickets/${ticket.ticketId}`)}
              className="p-4 rounded-2xl bg-white dark:bg-[#0D1428]/60 border border-[#E5E7EB] dark:border-[#111A33] hover:border-brand-violet/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#2563EB]">#{ticket.ticketId}</span>
                  <span className="text-xs font-semibold text-[#102A56] dark:text-[#F8FAFC] group-hover:text-[#2563EB] transition-colors">
                    {ticket.subject}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-gray-600 dark:text-[#A8B3C7]">
                  <span>Dept: {ticket.department}</span>
                  <span>•</span>
                  <span>Priority: {getPriorityBadge(ticket.priority)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                {getStatusBadge(ticket.status)}
                <ChevronRight className="w-4 h-4 text-gray-500 dark:text-[#71809A] group-hover:text-[#102A56] dark:text-[#F8FAFC] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTickets;
