import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerLayout from '../components/customer/CustomerLayout';
import TicketTimeline from '../components/customer/TicketTimeline';
import { ArrowLeft, Send, Bot, User as UserIcon, CheckCircle2, Clock } from 'lucide-react';
import ticketApi from '../services/ticketApi';
import { Ticket, Message, AIAnalysis } from '../types';

export const TicketDetailsPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!ticketId) return;
    const fetchTicketDetails = async () => {
      try {
        const data = await ticketApi.getTicket(ticketId);
        setTicket(data.ticket);
        setAiAnalysis(data.aiAnalysis);
        setMessages(data.messages || []);
      } catch (err) {
        console.error('Error fetching ticket details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicketDetails();
  }, [ticketId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !ticketId) return;

    setSending(true);
    try {
      const msg = await ticketApi.sendMessage(ticketId, newMessage);
      setMessages((prev) => [...prev, msg]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <CustomerLayout>
        <div className="p-12 text-center text-xs font-mono text-slate-400">Loading ticket details...</div>
      </CustomerLayout>
    );
  }

  if (!ticket) {
    return (
      <CustomerLayout>
        <div className="p-12 text-center space-y-3">
          <p className="text-base font-bold text-white">Ticket Not Found</p>
          <button onClick={() => navigate('/customer/tickets')} className="px-4 py-2 bg-brand-violet rounded-xl text-xs font-bold">
            Back to My Tickets
          </button>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="space-y-6 text-left">
        {/* Header Back Button */}
        <button
          onClick={() => navigate('/customer/tickets')}
          className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Tickets
        </button>

        {/* Ticket Title & Status */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-brand-cyan">#{ticket.ticketId}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-violet/20 text-brand-cyan text-[10px] font-mono uppercase font-bold">
                {ticket.department}
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-tight mt-1">{ticket.subject}</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono capitalize">
              {ticket.status}
            </span>
          </div>
        </div>

        {/* Ticket Resolution Timeline */}
        <TicketTimeline status={ticket.status} department={ticket.department} />

        {/* Message Thread */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-4">
          <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest">Conversation History</h3>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {messages.map((msg, idx) => (
              <div
                key={msg._id || idx}
                className={`p-4 rounded-2xl text-xs space-y-1 backdrop-blur-md max-w-2xl ${
                  msg.senderRole === 'customer'
                    ? 'bg-brand-violet/20 border border-brand-violet/30 text-white ml-auto text-right'
                    : 'bg-slate-950 border border-white/10 text-slate-200 mr-auto text-left'
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 mb-1">
                  <span>{msg.senderRole === 'customer' ? 'You' : 'SupportIQ AI Assistant'}</span>
                  <span>•</span>
                  <span>{new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-sm leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>

          {/* Send Reply Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-white/10">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your reply..."
              className="flex-1 bg-slate-950/70 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet transition-all"
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="px-5 py-2.5 rounded-xl bg-brand-violet text-white font-bold text-xs hover:opacity-95 disabled:opacity-50 transition-all flex items-center gap-1.5"
            >
              Send <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default TicketDetailsPage;
