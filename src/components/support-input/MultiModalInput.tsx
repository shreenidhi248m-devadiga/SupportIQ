import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Image as ImageIcon, FileText, ArrowRight, Edit3 } from 'lucide-react';
import { InputMethod, InputMethodSelector } from './InputMethodSelector';
import { VoiceInput } from './VoiceInput';
import { ImageUpload } from './ImageUpload';
import { DocumentUpload } from './DocumentUpload';
import { ImageAnalysisResponse, DocumentAnalysisResponse } from '../../services/aiApi';

interface MultiModalInputProps {
  onSubmit: (data: {
    description: string;
    attachment: File | null;
    analysisData?: any;
    inputMode: 'text' | 'voice' | 'upload';
  }) => void;
}

export const MultiModalInput: React.FC<MultiModalInputProps> = ({ onSubmit }) => {
  const [selectedMethod, setSelectedMethod] = useState<InputMethod>('voice');
  
  const [voiceText, setVoiceText] = useState<string>('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResponse | DocumentAnalysisResponse | null>(null);

  const [showSummary, setShowSummary] = useState(false);

  const handleVoiceComplete = (text: string) => {
    setVoiceText(text);
    // If they already have an attachment, they just added voice. Or vice versa.
    setShowSummary(true);
  };

  const handleVoiceChange = (text: string) => {
    setVoiceText(text);
  };

  const handleImageAnalysisComplete = (file: File, analysis: ImageAnalysisResponse) => {
    setAttachment(file);
    setAnalysisResult(analysis);
    setShowSummary(true);
  };

  const handleDocumentAnalysisComplete = (file: File, analysis: DocumentAnalysisResponse) => {
    setAttachment(file);
    setAnalysisResult(analysis);
    setShowSummary(true);
  };

  const handleFinalSubmit = () => {
    // Determine the primary input mode for the overlay
    let inputMode: 'text' | 'voice' | 'upload' = 'voice';
    if (attachment && !voiceText) inputMode = 'upload';
    if (voiceText && !attachment) inputMode = 'voice';
    // If both, backend considers it an upload with description, we'll mark as voice to show text in UI or upload to show file
    if (attachment && voiceText) inputMode = 'upload'; 

    onSubmit({
      description: voiceText || (analysisResult as any)?.extractedText || '',
      attachment,
      analysisData: analysisResult,
      inputMode
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-emerald-400';
    if (confidence >= 0.7) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!showSummary ? (
          <motion.div
            key="input-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-3">Explain it your way. SupportIQ understands the rest.</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Speak your problem, upload a document, or add an image. Our AI will analyze the information and help route your request to the right support team.
              </p>
            </div>

            <InputMethodSelector 
              selectedMethod={selectedMethod} 
              onSelect={setSelectedMethod} 
            />

            <div className="w-full">
              <AnimatePresence mode="wait">
                {selectedMethod === 'voice' && (
                  <motion.div key="voice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <VoiceInput onTranscriptionComplete={handleVoiceComplete} onCombinedStateChange={handleVoiceChange} />
                  </motion.div>
                )}
                {selectedMethod === 'image' && (
                  <motion.div key="image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ImageUpload onAnalysisComplete={handleImageAnalysisComplete} onFileSelect={setAttachment} />
                  </motion.div>
                )}
                {selectedMethod === 'document' && (
                  <motion.div key="document" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <DocumentUpload onAnalysisComplete={handleDocumentAnalysisComplete} onFileSelect={setAttachment} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* If they have multiple inputs partially filled, allow them to combine */}
            {(voiceText || attachment) && (
              <div className="mt-8 w-full flex justify-end animate-fade-in">
                 <button 
                  onClick={() => setShowSummary(true)}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
                 >
                   Review Information
                 </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Your Support Request</h2>
              <p className="text-slate-400">Review the information SupportIQ has gathered before final submission.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Inputs Summary */}
              <div className="bg-slate-900/60 border border-white/5 p-6 rounded-2xl">
                <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-4">Input Provided</h3>
                
                <div className="space-y-4">
                  {voiceText ? (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-brand-violet/20 text-brand-violet rounded-lg shrink-0">
                        <Mic className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white mb-1">Voice Transcribed</div>
                        <p className="text-sm text-slate-300 italic border-l-2 border-brand-violet/30 pl-3">"{voiceText}"</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 border border-white/10 border-dashed rounded-xl">
                      <span className="text-sm text-slate-500">No voice recorded</span>
                      <button onClick={() => { setSelectedMethod('voice'); setShowSummary(false); }} className="text-xs text-brand-violet hover:underline">Add Voice</button>
                    </div>
                  )}

                  {attachment ? (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-brand-cyan/20 text-brand-cyan rounded-lg shrink-0">
                        {attachment.type.startsWith('image') ? <ImageIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white mb-1">{attachment.type.startsWith('image') ? 'Image Uploaded' : 'Document Uploaded'}</div>
                        <p className="text-sm text-slate-300">{attachment.name}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 border border-white/10 border-dashed rounded-xl">
                      <span className="text-sm text-slate-500">No files uploaded</span>
                      <div className="flex gap-2">
                        <button onClick={() => { setSelectedMethod('image'); setShowSummary(false); }} className="text-xs text-brand-blue hover:underline">Add Image</button>
                        <button onClick={() => { setSelectedMethod('document'); setShowSummary(false); }} className="text-xs text-brand-cyan hover:underline">Add Document</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Understanding Pre-computation */}
              <div className="bg-brand-blue/5 border border-brand-blue/20 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-blue/20 blur-2xl rounded-full"></div>
                <h3 className="text-sm font-mono text-brand-blue uppercase tracking-wider mb-4">Initial AI Understanding</h3>
                
                {analysisResult ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Intent</div>
                        <div className="text-white font-medium capitalize">{analysisResult.intent}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Category</div>
                        <div className="text-white font-medium capitalize">{analysisResult.category}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Department</div>
                        <div className="text-white font-medium capitalize">{analysisResult.department}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">AI Confidence</div>
                        <div className={`font-medium ${getConfidenceColor(analysisResult.confidence)}`}>
                          {(analysisResult.confidence * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                    {analysisResult.extractedText && (
                      <div className="mt-4 pt-4 border-t border-brand-blue/20">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Extracted Information</div>
                        <p className="text-sm text-slate-300 font-mono bg-slate-900/50 p-2 rounded-lg whitespace-pre-wrap">
                          {analysisResult.extractedText}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                   <div className="h-full flex flex-col items-center justify-center text-center pb-8 opacity-70">
                     <p className="text-sm text-slate-400">SupportIQ will analyze this combined information upon submission.</p>
                   </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end border-t border-white/10 pt-6">
              <button 
                onClick={() => setShowSummary(false)}
                className="py-3.5 px-6 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4" /> Edit Request
              </button>
              <button 
                onClick={handleFinalSubmit}
                className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet text-white font-bold text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                Analyze & Submit Request <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
