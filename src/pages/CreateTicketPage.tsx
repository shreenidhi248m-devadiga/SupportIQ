import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomerLayout from '../components/customer/CustomerLayout';
import { PlusCircle, Paperclip, Mic, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import ticketApi from '../services/ticketApi';

export const CreateTicketPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode');

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Claims');
  const [priority, setPriority] = useState('high');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successTicketId, setSuccessTicketId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!subject.trim()) {
      setError('Please enter a ticket subject.');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a detailed description.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('subject', subject);
      formData.append('category', category);
      formData.append('priority', priority);
      formData.append('description', description);
      if (attachment) {
        formData.append('attachment', attachment);
      }

      const res = await ticketApi.createTicket(formData);
      setSuccessTicketId(res.ticketId);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error submitting ticket.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto space-y-6 text-left">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-brand-blue" />
            Create Support Ticket
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Submit your issue. SupportIQ AI will analyze, categorize, and route it to the optimal department.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successTicketId ? (
          <div className="p-8 rounded-3xl bg-slate-900 border border-emerald-500/30 shadow-2xl text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Ticket Submitted Successfully!</h2>
              <p className="text-xs font-mono text-emerald-300 mt-1">Ticket ID: #{successTicketId}</p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => navigate(`/customer/tickets/${successTicketId}`)}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-2"
              >
                View Ticket Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/10 shadow-2xl backdrop-blur-xl space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                Ticket Subject *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Car Insurance Claim - Front Bumper Accident"
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-violet transition-all"
                >
                  <option value="Claims">Claims</option>
                  <option value="Billing">Billing</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Account">Account</option>
                  <option value="General Support">General Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Priority (AI Recommended)
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-violet transition-all"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent / Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                Issue Description *
              </label>
              <textarea
                rows={5}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what happened in detail. AI will analyze sentiment and routing automatically..."
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-violet transition-all resize-none"
              />
            </div>

            {/* File Attachment Dropzone */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                Attachment (Image or Document)
              </label>
              <div className="p-4 rounded-xl bg-slate-950/40 border border-dashed border-white/20 text-center space-y-2">
                <input
                  type="file"
                  id="file-upload"
                  onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-xs font-mono text-brand-cyan hover:underline flex items-center justify-center gap-2"
                >
                  <Paperclip className="w-4 h-4" />
                  {attachment ? attachment.name : 'Choose JPG, PNG, PDF, or DOC file'}
                </label>
                {attachment && (
                  <p className="text-[11px] text-emerald-400 font-mono">File selected: {attachment.name}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-blue via-brand-violet to-brand-purple text-white font-bold text-sm shadow-lg shadow-brand-violet/25 hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Submitting & Routing...' : 'Submit Support Ticket'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CreateTicketPage;
