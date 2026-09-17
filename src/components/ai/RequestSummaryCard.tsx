import React from 'react';
import { MessageSquare, Paperclip, Mic } from 'lucide-react';

interface RequestSummaryCardProps {
  description: string;
  attachmentName?: string | null;
  inputMode: 'text' | 'voice' | 'upload';
}

export const RequestSummaryCard: React.FC<RequestSummaryCardProps> = ({ description, attachmentName, inputMode }) => {
  const truncatedDesc = description.length > 100 ? `${description.substring(0, 100)}...` : description;

  const InputIcon = inputMode === 'text' ? MessageSquare : inputMode === 'voice' ? Mic : Paperclip;

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 backdrop-blur-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
        <InputIcon className="w-4 h-4 text-slate-400" />
        <h3 className="text-xs font-mono text-slate-300 uppercase tracking-wider">Your Request</h3>
      </div>
      
      <div className="flex-1 flex flex-col justify-center space-y-3">
        {description && (
          <div>
            <p className="text-sm text-slate-300 italic border-l-2 border-brand-violet/50 pl-3">
              "{truncatedDesc}"
            </p>
            {description.length > 100 && (
              <button type="button" className="text-xs text-brand-blue hover:underline mt-1 pl-3">
                View full request
              </button>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">Input Type</span>
            <span className="text-white capitalize">{inputMode}</span>
          </div>
          
          {attachmentName && (
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase">Attachment</span>
              <span className="text-white truncate max-w-[120px]" title={attachmentName}>{attachmentName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
