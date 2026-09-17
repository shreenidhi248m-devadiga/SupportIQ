import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerLayout from '../components/customer/CustomerLayout';
import { 
  FileText, 
  Mic, 
  UploadCloud, 
  ArrowRight, 
  AlertCircle,
  Bot,
  Brain,
  MessageSquare,
  BarChart,
  ShieldCheck,
  X,
  File,
  CheckCircle2
} from 'lucide-react';
import { AIProcessingOverlay } from '../components/ai/AIProcessingOverlay';
import './CreateTicketPage.css';

type InputMode = 'text' | 'voice' | 'upload';

export const CreateTicketPage: React.FC = () => {
  const navigate = useNavigate();

  const [inputMode, setInputMode] = useState<InputMode>('text');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form State
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  
  // Voice State
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [voiceComplete, setVoiceComplete] = useState(false);
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [error, setError] = useState<string | null>(null);

  // Simulating Voice Recording
  const handleToggleRecord = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  const startRecording = () => {
    setIsRecording(true);
    setVoiceComplete(false);
    recordingTimeoutRef.current = setTimeout(() => stopRecording(), 3000);
  };

  const stopRecording = () => {
    if (recordingTimeoutRef.current) clearTimeout(recordingTimeoutRef.current);
    setIsRecording(false);
    setIsProcessingVoice(true);
    setTimeout(() => {
      setIsProcessingVoice(false);
      setVoiceText("I noticed my payment was deducted twice for the latest invoice. Could you please check and refund the duplicate charge?");
      setVoiceComplete(true);
    }, 1500);
  };

  const handleUseVoiceTranscription = () => {
    setDescription(voiceText);
    setInputMode('text');
    setVoiceComplete(false);
    setVoiceText('');
  };

  // Drag and Drop State
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachment(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (inputMode === 'voice' && !voiceComplete && !description) {
      setError('Please record your message or switch to text mode.');
      return;
    }

    const finalDescription = inputMode === 'voice' && voiceComplete ? voiceText : description;

    if (!finalDescription.trim() && !attachment) {
      setError('Please provide a description or upload a file.');
      return;
    }

    if (inputMode === 'voice' && voiceComplete && !description) {
        setDescription(voiceText); // Sync it before starting analysis
    }

    // Launch the AI Processing Overlay
    setIsProcessing(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isProcessing) {
    return (
      <AIProcessingOverlay 
        inputMode={inputMode}
        subject={subject}
        description={inputMode === 'voice' && voiceComplete ? voiceText : description}
        attachment={attachment}
        onCancel={() => setIsProcessing(false)}
        onViewTicket={(ticketId) => navigate(`/customer/tickets/${ticketId}`)}
      />
    );
  }

  return (
    <CustomerLayout>
      <div className="ticket-page-container">
        <div className="ticket-header">
          <div className="text-xs text-slate-400 font-mono mb-4">Dashboard / Create Ticket</div>
          <h1 className="ticket-header-title">Create Support Ticket</h1>
          <p className="ticket-header-subtitle">Tell us what happened. SupportIQ AI will understand and route your request.</p>
          <div className="ai-status-indicator">
            <span className="ai-status-dot"></span>
            SupportIQ AI Ready
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="ticket-layout">
          <div className="glass-card">
            <div className="input-method-selector">
              <button type="button" className={`method-btn ${inputMode === 'text' ? 'active' : ''}`} onClick={() => setInputMode('text')}>
                <FileText className="method-icon" />
                <span className="method-label">Text</span>
                <span className="method-desc">Describe your issue</span>
              </button>
              <button type="button" className={`method-btn ${inputMode === 'voice' ? 'active' : ''}`} onClick={() => setInputMode('voice')}>
                <Mic className="method-icon" />
                <span className="method-label">Voice</span>
                <span className="method-desc">Tell us what happened</span>
              </button>
              <button type="button" className={`method-btn ${inputMode === 'upload' ? 'active' : ''}`} onClick={() => setInputMode('upload')}>
                <UploadCloud className="method-icon" />
                <span className="method-label">Upload</span>
                <span className="method-desc">Share image/doc</span>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {inputMode === 'text' && (
                <div className="animate-fade-in">
                  <div className="form-group">
                    <label className="form-label">What's the issue?</label>
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Payment was deducted but my order failed" className="form-input" maxLength={100} />
                    <div className="char-count">{subject.length} / 100</div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tell us what happened</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your problem in your own words. You don't need to choose a department—we'll figure that out." className="form-textarea" maxLength={1000} required />
                    <div className="char-count">{description.length} / 1000</div>
                  </div>
                </div>
              )}

              {inputMode === 'voice' && (
                <div className="animate-fade-in voice-mode-container">
                  {!voiceComplete && !isProcessingVoice ? (
                    <>
                      <h3 className="voice-status">Tell us what happened</h3>
                      <p className="voice-help">Speak naturally. SupportIQ will convert your voice into text and analyze your request.</p>
                      <button type="button" className={`mic-btn ${isRecording ? 'recording' : ''}`} onClick={handleToggleRecord}>
                        <Mic className="mic-icon" />
                      </button>
                      <div className="voice-status text-brand-purple">{isRecording ? 'Listening...' : 'Tap to speak'}</div>
                    </>
                  ) : isProcessingVoice ? (
                    <>
                      <div className="mic-btn"><Brain className="mic-icon animate-pulse text-brand-blue" /></div>
                      <div className="voice-status text-brand-blue">Transcribing your request...</div>
                    </>
                  ) : (
                    <div className="w-full text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <h3 className="font-semibold text-white">Here's what we heard</h3>
                      </div>
                      <textarea value={voiceText} onChange={(e) => setVoiceText(e.target.value)} className="form-textarea" rows={4} />
                      <div className="voice-actions">
                        <button type="button" className="voice-btn-secondary" onClick={() => { setVoiceComplete(false); setVoiceText(''); startRecording(); }}>Record Again</button>
                        <button type="button" className="voice-btn-primary" onClick={handleUseVoiceTranscription}>Use This</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {inputMode === 'upload' && (
                <div className="animate-fade-in">
                  <h3 className="form-label text-lg mb-1">Add supporting files</h3>
                  <p className="text-sm text-slate-400 mb-4">Images and documents can help SupportIQ understand your issue faster.</p>
                  
                  {!attachment ? (
                    <div className={`upload-zone ${dragActive ? 'drag-active' : ''}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
                      <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => e.target.files && setAttachment(e.target.files[0])} accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" />
                      <div className="upload-icon-wrapper"><UploadCloud className="w-8 h-8" /></div>
                      <h4 className="upload-title">Drag & drop files here</h4>
                      <p className="upload-subtitle">or Browse Files</p>
                      <div className="upload-formats">
                        <span className="format-badge">JPG</span>
                        <span className="format-badge">PNG</span>
                        <span className="format-badge">PDF</span>
                        <span className="format-badge">DOC</span>
                      </div>
                      <p className="text-xs text-slate-500">Maximum file size: 10MB</p>
                    </div>
                  ) : (
                    <div className="file-preview">
                      <div className="file-info">
                        <div className="w-10 h-10 rounded-lg bg-brand-blue/20 flex items-center justify-center text-brand-blue"><File className="w-5 h-5" /></div>
                        <div>
                          <div className="file-name">{attachment.name}</div>
                          <div className="file-size">{formatFileSize(attachment.size)}</div>
                        </div>
                      </div>
                      <button type="button" className="file-remove" onClick={() => setAttachment(null)} title="Remove file"><X className="w-5 h-5" /></button>
                    </div>
                  )}
                  
                  <div className="form-group mt-4">
                    <label className="form-label">Add optional context</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Briefly describe the file (optional)" className="form-textarea" style={{ minHeight: '80px' }} />
                  </div>
                </div>
              )}

              <button type="submit" disabled={inputMode === 'voice' && !voiceComplete && !description} className="submit-btn mt-6">
                <Bot className="w-5 h-5 text-white/70" />
                Analyze & Submit Request
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>
            </form>
          </div>

          <div className="glass-card ai-sidebar">
            <div>
              <div className="ai-header"><Bot className="ai-icon w-6 h-6" /> AI Understanding</div>
              <p className="ai-intro">Your request will be automatically analyzed by SupportIQ AI for:</p>
              <div className="ai-features-list">
                <div className="ai-feature">
                  <MessageSquare className="ai-feature-icon w-5 h-5" />
                  <div className="ai-feature-text"><span className="ai-feature-title">Intent</span><span className="ai-feature-desc">Figuring out exactly what you need help with.</span></div>
                </div>
                <div className="ai-feature">
                  <Brain className="ai-feature-icon w-5 h-5" />
                  <div className="ai-feature-text"><span className="ai-feature-title">Sentiment</span><span className="ai-feature-desc">Understanding the tone of your message.</span></div>
                </div>
                <div className="ai-feature">
                  <BarChart className="ai-feature-icon w-5 h-5" />
                  <div className="ai-feature-text"><span className="ai-feature-title">Priority</span><span className="ai-feature-desc">Automatically assessing urgency.</span></div>
                </div>
                <div className="ai-feature">
                  <ShieldCheck className="ai-feature-icon w-5 h-5" />
                  <div className="ai-feature-text"><span className="ai-feature-title">Department</span><span className="ai-feature-desc">Routing directly to the right expert.</span></div>
                </div>
              </div>
            </div>
            <div className="ai-status-bottom">
              <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-brand-blue"></span></span>
              SupportIQ AI is active
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CreateTicketPage;
