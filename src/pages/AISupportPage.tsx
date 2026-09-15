import React, { useState } from 'react';
import aiApi from '../services/aiApi';
import { AIAnalysis } from '../types';
import { Sparkles, Mic, Camera, FileText, Bot, UploadCloud, Play, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export const AISupportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'voice' | 'image' | 'document'>('text');

  const [textInput, setTextInput] = useState<string>('My payment was deducted from my bank account but my order failed.');
  const [fileInput, setFileInput] = useState<File | null>(null);

  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      if (activeTab === 'text') {
        const res = await aiApi.analyzeText(textInput);
        setAnalysisResult(res);
      } else {
        const formData = new FormData();
        if (fileInput) {
          formData.append('attachment', fileInput);
        }
        formData.append('text', textInput);

        let res: any;
        if (activeTab === 'voice') res = await aiApi.analyzeVoice(formData);
        else if (activeTab === 'image') res = await aiApi.analyzeImage(formData);
        else if (activeTab === 'document') res = await aiApi.analyzeDocument(formData);

        setAnalysisResult(res);
      }
    } catch (err: any) {
      console.error('Error running AI analysis:', err);
      setError(err.response?.data?.message || 'Error processing request with SupportIQ AI engine');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-xs font-mono text-brand-blue">
          <Sparkles className="w-3.5 h-3.5" /> SupportIQ Multi-Modal AI Playground
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Live AI Analysis Engine</h1>
        <p className="text-slate-400 text-sm">
          Test SupportIQ natural language understanding, sentiment scoring, voice transcription, and document OCR.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-2 rounded-2xl glass-panel border border-white/10 text-xs font-mono">
        <button
          onClick={() => { setActiveTab('text'); setAnalysisResult(null); }}
          className={`py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'text' ? 'bg-brand-blue text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bot className="w-4 h-4" /> Text NLP
        </button>

        <button
          onClick={() => { setActiveTab('voice'); setAnalysisResult(null); }}
          className={`py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'voice' ? 'bg-brand-violet text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Mic className="w-4 h-4" /> Voice Support
        </button>

        <button
          onClick={() => { setActiveTab('image'); setAnalysisResult(null); }}
          className={`py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'image' ? 'bg-brand-cyan text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Camera className="w-4 h-4" /> Vision OCR
        </button>

        <button
          onClick={() => { setActiveTab('document'); setAnalysisResult(null); }}
          className={`py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'document' ? 'bg-brand-emerald text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" /> Document AI
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Input Box */}
      <form onSubmit={handleRunAnalysis} className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
        
        {activeTab === 'text' ? (
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">ENTER CUSTOMER INQUIRY TEXT</label>
            <textarea
              required
              rows={4}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-brand-blue"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                UPLOAD {activeTab.toUpperCase()} FILE (AUDIO, IMAGE, OR PDF)
              </label>
              <label className="border-2 border-dashed border-white/10 hover:border-brand-blue/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-black/20">
                <UploadCloud className="w-8 h-8 text-brand-blue mb-2" />
                <span className="text-sm font-semibold text-white">
                  {fileInput ? fileInput.name : `Select ${activeTab} file to analyze`}
                </span>
                <input
                  type="file"
                  onChange={(e) => e.target.files && setFileInput(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">OPTIONAL TEXT PROMPT OVERRIDE</label>
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Simulated prompt text..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={analyzing}
          className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-brand-blue via-brand-violet to-brand-purple hover:opacity-95 shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {analyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> SupportIQ AI is analyzing request...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Run SupportIQ AI Analysis
            </>
          )}
        </button>

      </form>

      {/* Result Display Card */}
      {analysisResult && (
        <div className="glass-panel p-8 rounded-3xl border border-brand-blue/30 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-brand-blue" /> AI Analysis Output
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Confidence: {((analysisResult.confidence || 0.96) * 100).toFixed(0)}%
            </span>
          </div>

          {(analysisResult.transcribedText || analysisResult.extractedText) && (
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono space-y-1">
              <span className="text-slate-400 block text-[10px]">EXTRACTED / TRANSCRIBED CONTENT</span>
              <p className="text-slate-200 font-sans text-sm italic">
                "{analysisResult.transcribedText || analysisResult.extractedText}"
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="bg-black/40 p-4 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px]">INTENT</span>
              <span className="text-white font-bold text-sm">{analysisResult.intent}</span>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px]">DEPARTMENT</span>
              <span className="text-brand-blue font-bold text-sm">{analysisResult.department}</span>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px]">SENTIMENT</span>
              <span className="text-rose-400 font-bold text-sm">{analysisResult.sentiment}</span>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px]">CHURN RISK SCORE</span>
              <span className="text-amber-400 font-bold text-sm">{((analysisResult.churnScore || 0.15) * 100).toFixed(0)}%</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-brand-violet/10 border border-brand-violet/30 space-y-2">
            <span className="text-xs font-mono font-bold text-brand-violet block">AUTOMATED AI GENERATED RESPONSE</span>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">{analysisResult.aiResponse}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default AISupportPage;