import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, UploadCloud, X, Check, Brain, Search } from 'lucide-react';
import { ImageAnalysisResponse } from '../../services/aiApi';

interface ImageUploadProps {
  onAnalysisComplete: (file: File, analysis: ImageAnalysisResponse) => void;
  onFileSelect?: (file: File | null) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onAnalysisComplete, onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0); // 0 to 4
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
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Unsupported file type"); // In real app use toast
      return;
    }
    setFile(selectedFile);
    if (onFileSelect) onFileSelect(selectedFile);
    
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (onFileSelect) onFileSelect(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    setAnalysisStage(0);
    
    // Simulate Vision processing stages
    const stages = [1, 2, 3, 4];
    for (const stage of stages) {
      await new Promise(r => setTimeout(r, 800));
      setAnalysisStage(stage);
    }
    
    await new Promise(r => setTimeout(r, 500));
    
    // Mock response matching the aiApi interface
    const mockAnalysis: ImageAnalysisResponse = {
      intent: 'insurance claim',
      category: 'vehicle damage',
      department: 'Claims',
      sentiment: 'neutral',
      sentimentScore: 0.5,
      priority: 'high',
      confidence: 0.92,
      churnScore: 0.1,
      aiResponse: 'Vehicle damage detected. Routing to claims.',
      extractedText: 'License Plate: ABC-1234',
      imageFileName: file!.name
    };

    onAnalysisComplete(file!, mockAnalysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 md:p-8 bg-slate-900/40 border border-white/5 rounded-3xl min-h-[400px]">
      
      {!file && (
        <div className="text-center w-full max-w-xl animate-fade-in">
          <h3 className="text-2xl font-bold text-white mb-2">Add an image</h3>
          <p className="text-slate-400 mb-8">Upload a photo, screenshot, receipt, or other image related to your issue.</p>
          
          <div 
            className={`w-full border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center ${
              dragActive 
                ? 'border-brand-blue bg-brand-blue/5' 
                : 'border-white/10 hover:border-brand-blue/50 hover:bg-white/5'
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
              accept=".jpg,.jpeg,.png,.webp"
            />
            
            <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
              <ImageIcon className="w-8 h-8" />
            </div>
            
            <h4 className="text-lg font-semibold text-white mb-2">Drop your image here</h4>
            <p className="text-sm text-slate-500 mb-6">or</p>
            
            <button className="px-6 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors mb-6">
              Browse Files
            </button>
            
            <p className="text-xs font-mono text-slate-500">JPG, PNG, WEBP · Max 10 MB</p>
          </div>
        </div>
      )}

      {file && previewUrl && !isAnalyzing && (
        <div className="w-full max-w-lg animate-fade-in">
          <div className="bg-slate-950/80 border border-white/10 rounded-2xl overflow-hidden mb-6">
            <div className="h-48 w-full relative bg-slate-900 flex items-center justify-center overflow-hidden">
              <img src={previewUrl} alt="Preview" className="object-cover w-full h-full opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-semibold truncate max-w-[200px] sm:max-w-[300px]">{file.name}</div>
                <div className="text-xs text-slate-400 font-mono">{formatFileSize(file.size)}</div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between border-t border-white/5">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <Check className="w-4 h-4" /> Upload complete
              </div>
              <button onClick={removeFile} className="text-slate-400 hover:text-rose-400 text-sm font-medium transition-colors">
                Remove
              </button>
            </div>
          </div>
          
          <button 
            onClick={analyzeImage}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" /> Analyze Image
          </button>
        </div>
      )}

      {isAnalyzing && (
        <div className="w-full max-w-md text-left animate-fade-in">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-brand-cyan/50 shadow-[0_0_15px_rgba(34,211,238,0.2)] shrink-0">
               <img src={previewUrl!} alt="Analyzing" className="object-cover w-full h-full opacity-50" />
               <motion.div 
                 className="absolute top-0 left-0 w-full h-1 bg-brand-cyan shadow-[0_0_10px_#22d3ee]"
                 animate={{ y: [0, 64, 0] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Analyzing your image</h3>
              <p className="text-brand-cyan text-sm animate-pulse">Computer Vision active...</p>
            </div>
          </div>
          
          <div className="space-y-4 bg-slate-900/60 p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 text-emerald-400 text-sm"><Check className="w-4 h-4" /> Image uploaded</div>
            <div className="flex items-center gap-3 text-emerald-400 text-sm"><Check className="w-4 h-4" /> Image quality checked</div>
            
            <div className={`flex items-center gap-3 text-sm transition-colors ${analysisStage >= 1 ? 'text-emerald-400' : 'text-brand-cyan'}`}>
              {analysisStage >= 1 ? <Check className="w-4 h-4" /> : <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse ml-1 mr-1.5"></span>}
              Detecting relevant information
            </div>
            
            <div className={`flex items-center gap-3 text-sm transition-colors ${analysisStage >= 2 ? 'text-emerald-400' : analysisStage === 1 ? 'text-brand-cyan' : 'text-slate-500'}`}>
              {analysisStage >= 2 ? <Check className="w-4 h-4" /> : analysisStage === 1 ? <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse ml-1 mr-1.5"></span> : <span className="pl-4">○</span>}
              Identifying visual details
            </div>
            
            <div className={`flex items-center gap-3 text-sm transition-colors ${analysisStage >= 3 ? 'text-emerald-400' : analysisStage === 2 ? 'text-brand-cyan' : 'text-slate-500'}`}>
              {analysisStage >= 3 ? <Check className="w-4 h-4" /> : analysisStage === 2 ? <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse ml-1 mr-1.5"></span> : <span className="pl-4">○</span>}
              Extracting useful information
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
