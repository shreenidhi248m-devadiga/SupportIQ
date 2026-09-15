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
        return <span className="px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-cyan border border-brand-blue/30 text-[11px] font-mono font-semibold">In Progress</span>;
      case 'resolved':
      case 'closed':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-semibold">Resolved</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-mono">{status}</span>;
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
        return <span className="text-slate-400 font-bold uppercase text-[10px]">Low</span>;
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl shadow-xl text-left space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <TicketIcon className="w-5 h-5 text-brand-blue" />
          Recent Tickets
        </h3>

        <Link
          to="/customer/tickets"
          className="text-xs font-mono text-brand-blue hover:text-brand-cyan flex items-center gap-1 transition-colors"
        >
          View All Tickets <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-slate-950/60 border border-white/10 animate-pulse" />
          ))}
        </div>
      ) : recentList.length === 0 ? (
        <div className="p-8 text-center space-y-3 rounded-2xl bg-slate-950/50 border border-white/5">
          <div className="w-12 h-12 rounded-2xl bg-white/5 text-slate-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-sm font-bold text-white">You're all clear!</p>
          <p className="text-xs text-slate-400">You don't have any support tickets currently open.</p>
          <Link
            to="/customer/tickets/new"
            className="inline-block mt-2 px-4 py-2 rounded-xl bg-brand-violet text-white text-xs font-bold hover:opacity-95 transition-all"
          >
            Create Your First Ticket
          </Link>
        </div>
      ) : (
        <div className="space-y-2.5">
          {recentList.map((ticket) => (
            <div
              key={ticket._id || ticket.ticketId}
              onClick={() => navigate(`/customer/tickets/${ticket.ticketId}`)}
              className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-brand-violet/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-brand-cyan">#{ticket.ticketId}</span>
                  <span className="text-xs font-semibold text-white group-hover:text-brand-cyan transition-colors">
                    {ticket.subject}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                  <span>Dept: {ticket.department}</span>
                  <span>•</span>
                  <span>Priority: {getPriorityBadge(ticket.priority)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                {getStatusBadge(ticket.status)}
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTickets;
