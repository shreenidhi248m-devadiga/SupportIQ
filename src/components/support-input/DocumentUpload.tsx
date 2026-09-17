import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, UploadCloud, X, Check, Search, File } from 'lucide-react';
import { DocumentAnalysisResponse } from '../../services/aiApi';

interface DocumentUploadProps {
  onAnalysisComplete: (file: File, analysis: DocumentAnalysisResponse) => void;
  onFileSelect?: (file: File | null) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ onAnalysisComplete, onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0); 
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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Unsupported file type"); 
      return;
    }
    setFile(selectedFile);
    if (onFileSelect) onFileSelect(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (onFileSelect) onFileSelect(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const analyzeDocument = async () => {
    setIsAnalyzing(true);
    setAnalysisStage(0);
    
    // Simulate OCR processing stages
    const stages = [1, 2, 3, 4];
    for (const stage of stages) {
      await new Promise(r => setTimeout(r, 800));
      setAnalysisStage(stage);
    }
    
    await new Promise(r => setTimeout(r, 500));
    
    // Mock response matching the aiApi interface
    const mockAnalysis: DocumentAnalysisResponse = {
      intent: 'insurance claim',
      category: 'policy question',
      department: 'Claims',
      sentiment: 'neutral',
      sentimentScore: 0.5,
      priority: 'high',
      confidence: 0.94,
      churnScore: 0.1,
      aiResponse: 'Insurance document recognized. Proceeding with claim.',
      extractedText: 'Claim reference: CL-998877\nPolicy Number: POL-5544',
      docFileName: file!.name
    };

    onAnalysisComplete(file!, mockAnalysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 md:p-8 bg-slate-900/40 border border-white/5 rounded-3xl min-h-[400px]">
      
      {!file && (
        <div className="text-center w-full max-w-xl animate-fade-in">
          <h3 className="text-2xl font-bold text-white mb-2">Add supporting documents</h3>
          <p className="text-slate-400 mb-8">Upload receipts, invoices, claim documents, PDFs, or other files that help explain your issue.</p>
          
          <div 
            className={`w-full border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center ${
              dragActive 
                ? 'border-brand-cyan bg-brand-cyan/5' 
                : 'border-white/10 hover:border-brand-cyan/50 hover:bg-white/5'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            
            <div className="w-16 h-16 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mb-4">
              <FileText className="w-8 h-8" />
            </div>
            
            <h4 className="text-lg font-semibold text-white mb-2">Drop your document here</h4>
            <p className="text-sm text-slate-500 mb-6">or</p>
            
            <button className="px-6 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors mb-6">
              Browse Files
            </button>
            
            <p className="text-xs font-mono text-slate-500">PDF, DOC, DOCX, JPG, PNG · Max 10 MB</p>
          </div>
        </div>
      )}

      {file && !isAnalyzing && (
        <div className="w-full max-w-lg animate-fade-in">
          <div className="bg-slate-950/80 border border-white/10 rounded-2xl overflow-hidden mb-6">
            <div className="p-6 flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
                 <File className="w-6 h-6" />
               </div>
               <div className="flex-1 min-w-0">
                 <div className="font-semibold text-white truncate text-lg">{file.name}</div>
                 <div className="flex items-center gap-2 text-sm text-slate-400 font-mono mt-1">
                   <span>{file.type === 'application/pdf' ? 'PDF Document' : 'Document'}</span>
                   <span>•</span>
                   <span>{formatFileSize(file.size)}</span>
                 </div>
               </div>
            </div>
            <div className="px-6 py-4 flex items-center justify-between border-t border-white/5 bg-slate-900/50">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <Check className="w-4 h-4" /> Ready for analysis
              </div>
              <button onClick={removeFile} className="text-slate-400 hover:text-rose-400 text-sm font-medium transition-colors">
                Remove
              </button>
            </div>
          </div>
          
          <button 
            onClick={analyzeDocument}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold text-sm shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" /> Analyze Document
          </button>
        </div>
      )}

      {isAnalyzing && (
        <div className="w-full max-w-md text-left animate-fade-in">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-xl bg-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0 relative overflow-hidden">
               <FileText className="w-8 h-8 opacity-50" />
               <motion.div 
                 className="absolute top-0 left-0 w-full h-1 bg-brand-cyan shadow-[0_0_10px_#22d3ee]"
                 animate={{ y: [0, 64, 0] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
               />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Reading your document</h3>
              <p className="text-brand-cyan text-sm animate-pulse">OCR active...</p>
            </div>
          </div>
          
          <div className="space-y-4 bg-slate-900/60 p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 text-emerald-400 text-sm"><Check className="w-4 h-4" /> Document uploaded</div>
            <div className="flex items-center gap-3 text-emerald-400 text-sm"><Check className="w-4 h-4" /> File validated</div>
            
            <div className={`flex items-center gap-3 text-sm transition-colors ${analysisStage >= 1 ? 'text-emerald-400' : 'text-brand-cyan'}`}>
              {analysisStage >= 1 ? <Check className="w-4 h-4" /> : <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse ml-1 mr-1.5"></span>}
              Extracting text
            </div>
            
            <div className={`flex items-center gap-3 text-sm transition-colors ${analysisStage >= 2 ? 'text-emerald-400' : analysisStage === 1 ? 'text-brand-cyan' : 'text-slate-500'}`}>
              {analysisStage >= 2 ? <Check className="w-4 h-4" /> : analysisStage === 1 ? <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse ml-1 mr-1.5"></span> : <span className="pl-4">○</span>}
              Understanding document content
            </div>
            
            <div className={`flex items-center gap-3 text-sm transition-colors ${analysisStage >= 3 ? 'text-emerald-400' : analysisStage === 2 ? 'text-brand-cyan' : 'text-slate-500'}`}>
              {analysisStage >= 3 ? <Check className="w-4 h-4" /> : analysisStage === 2 ? <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse ml-1 mr-1.5"></span> : <span className="pl-4">○</span>}
              Identifying relevant information
            </div>
            
            <div className={`flex items-center gap-3 text-sm transition-colors ${analysisStage >= 4 ? 'text-emerald-400' : analysisStage === 3 ? 'text-brand-cyan' : 'text-slate-500'}`}>
              {analysisStage >= 4 ? <Check className="w-4 h-4" /> : analysisStage === 3 ? <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse ml-1 mr-1.5"></span> : <span className="pl-4">○</span>}
              Preparing AI analysis
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
