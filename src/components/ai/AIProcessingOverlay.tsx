import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, RefreshCcw } from 'lucide-react';
import { AIOrb, AIProcessingStage } from './AIOrb';
import { AIProcessingMessage } from './AIProcessingMessage';
import { AIProcessingSteps } from './AIProcessingSteps';
import { AIActivityPanel } from './AIActivityPanel';
import { RequestSummaryCard } from './RequestSummaryCard';
import { AICapabilities } from './AICapabilities';
import { AIAnalysisComplete } from './AIAnalysisComplete';
import aiApi from '../../services/aiApi';
import ticketApi from '../../services/ticketApi';
import { AIAnalysis } from '../../types';

interface AIProcessingOverlayProps {
  inputMode: 'text' | 'voice' | 'upload';
  subject: string;
  description: string;
  attachment: File | null;
  onCancel: () => void;
  onViewTicket: (ticketId: string) => void;
}

export const AIProcessingOverlay: React.FC<AIProcessingOverlayProps> = ({
  inputMode,
  subject,
  description,
  attachment,
  onCancel,
  onViewTicket
}) => {
  const [stage, setStage] = useState<AIProcessingStage>('idle');
  const [logs, setLogs] = useState<{id: string, time: string, message: string}[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysis | null>(null);
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addLog = (message: string) => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setLogs(prev => [...prev, { id: Math.random().toString(), time: timeString, message }]);
  };

  useEffect(() => {
    let isMounted = true;

    const runAnalysis = async () => {
      try {
        setStage('reading');
        addLog('Request received');
        
        // Minimum visual wait times so user can see the animations
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
        // Start backend request concurrently with visual stages
        let analysisPromise: Promise<AIAnalysis>;
        
        if (inputMode === 'upload' && attachment) {
          const fd = new FormData();
          fd.append('attachment', attachment);
          if (subject) fd.append('subject', subject);
          if (description) fd.append('description', description);
          analysisPromise = aiApi.analyzeDocument(fd);
        } else if (inputMode === 'voice' && attachment) {
          const fd = new FormData();
          fd.append('attachment', attachment);
          if (subject) fd.append('subject', subject);
          analysisPromise = aiApi.analyzeVoice(fd);
        } else {
          analysisPromise = aiApi.analyzeText(description, subject);
        }

        await delay(1000);
        if (!isMounted) return;
        
        setStage('understanding');
        addLog('Text analyzed');
        await delay(1000);
        if (!isMounted) return;
        
        setStage('sentiment');
        addLog('Intent detected');
        await delay(1200);
        if (!isMounted) return;
        
        setStage('priority');
        addLog('Sentiment analyzed');
        await delay(1000);
        if (!isMounted) return;
        
        setStage('routing');
        addLog('Priority calculated');
        await delay(1200);
        if (!isMounted) return;
        
        setStage('generating');
        addLog('Department identified');
        
        // Wait for actual backend response to finish if it hasn't already
        const analysis = await analysisPromise;
        if (!isMounted) return;
        
        addLog('Response generated');
        setAnalysisResult(analysis);
        
        // Now create the ticket
        const ticketFd = new FormData();
        ticketFd.append('subject', subject || `AI Request: ${analysis.intent}`);
        ticketFd.append('category', analysis.category);
        ticketFd.append('priority', analysis.priority);
        ticketFd.append('description', description);
        if (attachment) {
          ticketFd.append('attachment', attachment);
        }
        
        const ticketRes = await ticketApi.createTicket(ticketFd);
        if (!isMounted) return;
        
        setCreatedTicketId(ticketRes.ticketId);
        setStage('complete');
        addLog('Analysis complete');

      } catch (err: any) {
        if (!isMounted) return;
        console.error("AI Processing Error:", err);
        setStage('error');
        setError(err.message || 'Connection Interrupted');
        addLog('Error during processing');
      }
    };

    runAnalysis();

    return () => {
      isMounted = false;
    };
  }, []); // Run once on mount

  const handleRetry = () => {
    setError(null);
    setStage('idle');
    setLogs([]);
    setAnalysisResult(null);
    setCreatedTicketId(null);
    
    // Slight delay before remounting logic runs again, but since it's in useEffect we need to trigger it.
    // Instead of forcing a remount, we can just close and reopen or use a trigger state.
    // For simplicity, we just cancel back to edit.
    onCancel();
  };

  const handleSubmitWithoutAI = async () => {
    try {
      setStage('generating');
      const ticketFd = new FormData();
      ticketFd.append('subject', subject || 'Support Request');
      ticketFd.append('category', 'General Support');
      ticketFd.append('priority', 'medium');
      ticketFd.append('description', description);
      if (attachment) {
        ticketFd.append('attachment', attachment);
      }
      
      const ticketRes = await ticketApi.createTicket(ticketFd);
      onViewTicket(ticketRes.ticketId);
    } catch (err: any) {
      setError('Failed to submit ticket manually.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#0a0f24] overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col p-4 md:p-8 max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
          <div className="font-bold text-xl text-white tracking-tight">SupportIQ</div>
          <h1 className="text-lg text-slate-300 hidden md:block">AI Request Analysis</h1>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan bg-brand-blue/10 px-3 py-1.5 rounded-full border border-brand-blue/30">
            <span className={`w-2 h-2 rounded-full bg-brand-cyan ${stage !== 'error' && stage !== 'complete' ? 'animate-pulse' : ''}`}></span>
            SupportIQ AI Online
          </div>
        </header>

        {stage === 'error' ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
            <XCircle className="w-16 h-16 text-rose-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">We couldn't complete the AI analysis</h2>
            <p className="text-slate-400 mb-8">{error === 'Connection Interrupted' ? "We're having trouble connecting to SupportIQ." : "Something went wrong while analyzing your request. Your information has not been lost."}</p>
            
            <div className="flex flex-col gap-3 w-full">
              <button onClick={handleRetry} className="py-3 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white font-bold transition-all flex items-center justify-center gap-2">
                <RefreshCcw className="w-4 h-4" /> Try Again
              </button>
              <button onClick={handleSubmitWithoutAI} className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all">
                Submit Without AI Analysis
              </button>
              <button onClick={onCancel} className="py-3 rounded-xl bg-transparent border border-white/20 text-slate-300 hover:bg-white/5 font-semibold transition-all">
                Return to Edit
              </button>
            </div>
          </div>
        ) : stage === 'complete' && analysisResult && createdTicketId ? (
          <div className="flex-1 flex flex-col justify-center py-8">
            <AIAnalysisComplete 
              analysis={analysisResult} 
              onViewTicket={() => onViewTicket(createdTicketId)}
              onEditRequest={onCancel}
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Main AI Visualization area */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
              <AIOrb stage={stage} />
              <AIProcessingMessage currentStage={stage} />
              <AICapabilities currentStage={stage} />
            </div>

            {/* Bottom Panels Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              
              <div className="lg:col-span-1 order-2 lg:order-1">
                <RequestSummaryCard 
                  description={description}
                  inputMode={inputMode}
                  attachmentName={attachment?.name}
                />
              </div>

              <div className="lg:col-span-1 order-1 lg:order-2 flex items-center justify-center">
                <AIProcessingSteps currentStage={stage} />
              </div>

              <div className="lg:col-span-1 order-3">
                <AIActivityPanel logs={logs} />
              </div>
              
            </div>

            <div className="text-center mt-12 mb-4">
              <p className="text-sm font-medium text-slate-300">SupportIQ AI is securely analyzing your request.</p>
              <p className="text-xs text-slate-500 mt-1">Your request will be automatically routed to the appropriate support team.</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
