import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerLayout from '../components/customer/CustomerLayout';
import { AlertCircle } from 'lucide-react';
import { AIProcessingOverlay } from '../components/ai/AIProcessingOverlay';
import { MultiModalInput } from '../components/support-input/MultiModalInput';
import './CreateTicketPage.css';

export const CreateTicketPage: React.FC = () => {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  
  // Payload for AI Processing Overlay
  const [ticketPayload, setTicketPayload] = useState<{
    subject: string;
    description: string;
    attachment: File | null;
    inputMode: 'text' | 'voice' | 'upload';
  }>({
    subject: '',
    description: '',
    attachment: null,
    inputMode: 'voice'
  });

  const [error, setError] = useState<string | null>(null);

  const handleMultiModalSubmit = (data: {
    description: string;
    attachment: File | null;
    analysisData?: any;
    inputMode: 'text' | 'voice' | 'upload';
  }) => {
    setError(null);
    if (!data.description.trim() && !data.attachment) {
      setError('Please provide a description or upload a file.');
      return;
    }

    setTicketPayload({
      subject: data.analysisData?.intent || 'Support Request',
      description: data.description,
      attachment: data.attachment,
      inputMode: data.inputMode
    });
    
    setIsProcessing(true);
  };

  if (isProcessing) {
    return (
      <AIProcessingOverlay 
        inputMode={ticketPayload.inputMode}
        subject={ticketPayload.subject}
        description={ticketPayload.description}
        attachment={ticketPayload.attachment}
        onCancel={() => setIsProcessing(false)}
        onViewTicket={(ticketId) => navigate(`/customer/tickets/${ticketId}`)}
      />
    );
  }

  return (
    <CustomerLayout>
      <div className="ticket-page-container w-full max-w-6xl mx-auto py-8">
        <div className="ticket-header mb-12">
          <div className="text-xs text-slate-400 font-mono mb-4 text-center md:text-left">Dashboard / Create Ticket</div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2 mb-6 max-w-4xl mx-auto">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <MultiModalInput onSubmit={handleMultiModalSubmit} />
        
        <div className="text-center mt-12 mb-4 animate-fade-in opacity-50">
           <p className="text-xs font-mono text-slate-400">Your information is securely processed to assist with your request.</p>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CreateTicketPage;
