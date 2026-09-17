import React from 'react';
import { Mic, Image as ImageIcon, FileText } from 'lucide-react';

export type InputMethod = 'voice' | 'image' | 'document';

interface InputMethodSelectorProps {
  selectedMethod: InputMethod;
  onSelect: (method: InputMethod) => void;
}

export const InputMethodSelector: React.FC<InputMethodSelectorProps> = ({ selectedMethod, onSelect }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full mb-8">
      <button
        type="button"
        onClick={() => onSelect('voice')}
        className={`flex-1 flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 ${
          selectedMethod === 'voice'
            ? 'bg-brand-violet/10 border-brand-violet/50 shadow-[0_0_20px_rgba(139,92,246,0.15)]'
            : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/60 hover:border-white/10'
        }`}
      >
        <div className={`p-3 rounded-full mb-3 ${selectedMethod === 'voice' ? 'bg-brand-violet/20 text-brand-violet' : 'bg-slate-800 text-slate-400'}`}>
          <Mic className="w-6 h-6" />
        </div>
        <h3 className={`font-semibold mb-1 ${selectedMethod === 'voice' ? 'text-white' : 'text-slate-300'}`}>Voice</h3>
        <p className="text-xs text-slate-500 text-center">Speak your problem</p>
      </button>

      <button
        type="button"
        onClick={() => onSelect('image')}
        className={`flex-1 flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 ${
          selectedMethod === 'image'
            ? 'bg-brand-blue/10 border-brand-blue/50 shadow-[0_0_20px_rgba(56,189,248,0.15)]'
            : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/60 hover:border-white/10'
        }`}
      >
        <div className={`p-3 rounded-full mb-3 ${selectedMethod === 'image' ? 'bg-brand-blue/20 text-brand-blue' : 'bg-slate-800 text-slate-400'}`}>
          <ImageIcon className="w-6 h-6" />
        </div>
        <h3 className={`font-semibold mb-1 ${selectedMethod === 'image' ? 'text-white' : 'text-slate-300'}`}>Image</h3>
        <p className="text-xs text-slate-500 text-center">Upload a photo or screenshot</p>
      </button>

      <button
        type="button"
        onClick={() => onSelect('document')}
        className={`flex-1 flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 ${
          selectedMethod === 'document'
            ? 'bg-brand-cyan/10 border-brand-cyan/50 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
            : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/60 hover:border-white/10'
        }`}
      >
        <div className={`p-3 rounded-full mb-3 ${selectedMethod === 'document' ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-slate-800 text-slate-400'}`}>
          <FileText className="w-6 h-6" />
        </div>
        <h3 className={`font-semibold mb-1 ${selectedMethod === 'document' ? 'text-white' : 'text-slate-300'}`}>Document</h3>
        <p className="text-xs text-slate-500 text-center">Upload a receipt or document</p>
      </button>
    </div>
  );
};
