import React, { useState } from 'react';
import { Bot, Sparkles, Mic, Paperclip, ArrowRight, Loader2 } from 'lucide-react';
import { AIAnalysis } from '../../types';
import aiApi from '../../services/aiApi';
import AIProcessing from './AIProcessing';
import AIResultCard from './AIResultCard';

interface AIAssistantCardProps {
  onTicketCreated?: () => void;
}

export const AIAssistantCard: React.FC<AIAssistantCardProps> = ({ onTicketCreated }) => {
  const [problemText, setProblemText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AIAnalysis | null>(null);

  const suggestions = [
    'Payment issue with my subscription',
    'Vehicle accident insurance claim request',
    'Technical bug in application dashboard',
    'Account access and password recovery',
  ];

  const handleAnalyze = async (textToAnalyze?: string) => {
    const text = textToAnalyze || problemText;
    if (!text.trim()) return;

    setAnalyzing(true);
    setResult(null);

    try {
      const data = await aiApi.analyzeText(text);
      setResult(data);
    } catch (err) {
      console.error('Error analyzing text:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111A33] border border-brand-violet/40 shadow-2xl backdrop-blur-2xl text-left space-y-6 relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-[#111A33] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-violet/20 border border-brand-violet/40 text-[#2563EB] flex items-center justify-center shadow-lg shadow-brand-violet/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#102A56] dark:text-[#F8FAFC] flex items-center gap-2">
              SupportIQ AI Assistant
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A8B3C7]">Describe your problem and let AI analyze, route, and resolve your request.</p>
          </div>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
          AI 2.0 Ready
        </span>
      </div>

      {/* Input Textarea & Controls */}
      {!analyzing && !result && (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              rows={4}
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="Describe your issue in detail (e.g. My payment was deducted twice for order #88431, please process a refund)..."
              className="w-full bg-white dark:bg-[#0D1428]/70 border border-[#E5E7EB] dark:border-[#111A33] rounded-2xl p-4 text-base text-[#102A56] dark:text-[#F8FAFC] placeholder-slate-500 focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 transition-all resize-none"
            />

            <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB] dark:border-[#111A33] px-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-[#A8B3C7]">
                <button
                  type="button"
                  onClick={() => alert('Voice recorder active. Speak your issue clearly.')}
                  className="p-2 rounded-xl hover:bg-white/10 hover:text-[#102A56] dark:text-[#F8FAFC] transition-colors flex items-center gap-1.5 text-xs font-mono"
                  title="Voice input"
                >
                  <Mic className="w-4 h-4 text-[#2563EB]" /> Voice
                </button>
                <button
                  type="button"
                  onClick={() => alert('Drag and drop your file or document below.')}
                  className="p-2 rounded-xl hover:bg-white/10 hover:text-[#102A56] dark:text-[#F8FAFC] transition-colors flex items-center gap-1.5 text-xs font-mono"
                  title="Attach file"
                >
                  <Paperclip className="w-4 h-4 text-[#2563EB]" /> Upload
                </button>
              </div>

              <button
                type="button"
                disabled={!problemText.trim()}
                onClick={() => handleAnalyze()}
                className="px-6 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-sm shadow-lg shadow-brand-blue/25 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                Ask SupportIQ <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="space-y-2">
            <p className="text-xs font-mono text-gray-600 dark:text-[#A8B3C7] uppercase tracking-wider">Example Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => {
                    setProblemText(sug);
                    handleAnalyze(sug);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] dark:bg-[#111A33] hover:bg-white/15 border border-[#E5E7EB] dark:border-[#111A33] text-sm font-medium text-gray-500 dark:text-[#71809A] hover:text-[#102A56] dark:text-[#F8FAFC] transition-all"
                >
                  💡 {sug}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Processing Animation */}
      {analyzing && <AIProcessing />}

      {/* AI Analysis Output Result */}
      {result && (
        <AIResultCard
          analysis={result}
          onReset={() => {
            setResult(null);
            setProblemText('');
          }}
          onTicketCreated={onTicketCreated}
        />
      )}
    </div>
  );
};

export default AIAssistantCard;
