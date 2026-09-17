import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, RotateCcw, Check, Brain } from 'lucide-react';
import aiApi from '../../services/aiApi';

interface VoiceInputProps {
  onTranscriptionComplete: (text: string) => void;
  onCombinedStateChange?: (text: string) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscriptionComplete, onCombinedStateChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Since we cannot actually record audio natively easily without browser permissions 
  // and real backend in this mock environment, we simulate the recording process.
  // In a production app, we would use MediaRecorder API here.

  const startRecording = () => {
    setIsRecording(true);
    setTranscription(null);
    setElapsedTime(0);
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    processRecording();
  };

  const processRecording = async () => {
    setIsProcessing(true);
    
    // Simulate API call for transcription
    try {
      // In a real app we'd send the audio blob. Here we just mock the delay.
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockedTranscript = "My car was damaged in an accident and I need help submitting an insurance claim.";
      setTranscription(mockedTranscript);
      if (onCombinedStateChange) onCombinedStateChange(mockedTranscript);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUseRequest = () => {
    if (transcription) {
      onTranscriptionComplete(transcription);
    }
  };

  const handleEditTranscript = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscription(e.target.value);
    if (onCombinedStateChange) onCombinedStateChange(e.target.value);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-slate-900/40 border border-white/5 rounded-3xl min-h-[400px]">
      
      {!isRecording && !isProcessing && !transcription && (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Tell us what happened</h3>
          <p className="text-slate-400 mb-12">Speak naturally. You don't need to explain everything perfectly.</p>
          
          <button 
            onClick={startRecording}
            className="group relative w-32 h-32 flex items-center justify-center rounded-full bg-brand-violet/10 border-2 border-brand-violet/50 text-brand-violet hover:bg-brand-violet/20 hover:scale-105 transition-all duration-300 mx-auto"
          >
            <Mic className="w-12 h-12" />
            <div className="absolute -bottom-8 whitespace-nowrap font-medium text-slate-300 group-hover:text-white transition-colors">
              🎙 Tap to speak
            </div>
          </button>
        </div>
      )}

      {isRecording && (
        <div className="text-center w-full">
          <div className="flex items-center justify-center gap-2 text-rose-400 mb-6 font-mono text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            Recording
          </div>
          
          <div className="text-3xl font-mono text-white mb-12 font-light">
            {formatTime(elapsedTime)} <span className="text-slate-500">/ 02:00</span>
          </div>

          {/* Animated Waveform Simulation */}
          <div className="flex items-center justify-center gap-1.5 h-16 mb-12">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-brand-violet rounded-full"
                animate={{ 
                  height: ['20%', `${40 + Math.random() * 60}%`, '20%'] 
                }}
                transition={{ 
                  duration: 0.5 + Math.random() * 0.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <button 
            onClick={stopRecording}
            className="flex items-center gap-2 mx-auto px-6 py-3 rounded-full bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-colors font-medium"
          >
            <Square className="w-4 h-4 fill-current" /> Stop Recording
          </button>
        </div>
      )}

      {isProcessing && (
        <div className="text-center w-full flex flex-col items-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full border-2 border-brand-violet/20 border-t-brand-violet mb-6 flex items-center justify-center"
          >
            <Brain className="w-8 h-8 text-brand-violet" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Understanding your voice...</h3>
          <p className="text-brand-violet/80 animate-pulse">Transcribing your request</p>
        </div>
      )}

      {transcription && !isProcessing && (
        <div className="w-full max-w-2xl text-left animate-fade-in">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4">Your request</h3>
            <textarea 
              value={transcription}
              onChange={handleEditTranscript}
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-4 text-slate-200 text-lg leading-relaxed focus:outline-none focus:border-brand-violet resize-none min-h-[120px]"
            />
          </div>

          <div className="bg-slate-900/60 rounded-xl p-4 border border-white/5 mb-8">
            <div className="text-xs font-mono text-brand-violet uppercase tracking-wider mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4" /> SupportIQ AI
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-emerald-400"><Check className="w-4 h-4" /> Voice converted to text</div>
              <div className="flex items-center gap-2 text-emerald-400"><Check className="w-4 h-4" /> Request understood</div>
              <div className="flex items-center gap-2 text-brand-blue"><span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse ml-1 mr-1.5"></span> Analyzing intent...</div>
              <div className="flex items-center gap-2 text-slate-500 pl-4">○ Detecting sentiment</div>
              <div className="flex items-center gap-2 text-slate-500 pl-4">○ Determining priority</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleUseRequest}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet text-white font-bold text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              Use This Request
            </button>
            <button 
              onClick={() => { setTranscription(null); if(onCombinedStateChange) onCombinedStateChange(''); }}
              className="py-3.5 px-6 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Record Again
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
