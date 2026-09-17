import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface ActivityLog {
  id: string;
  time: string;
  message: string;
}

interface AIActivityPanelProps {
  logs: ActivityLog[];
}

export const AIActivityPanel: React.FC<AIActivityPanelProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 backdrop-blur-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
        <Terminal className="w-4 h-4 text-slate-400" />
        <h3 className="text-xs font-mono text-slate-300 uppercase tracking-wider">AI Activity</h3>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-1.5 font-mono text-[11px] sm:text-xs pr-2"
        style={{ maxHeight: '150px' }}
      >
        {logs.length === 0 ? (
          <div className="text-slate-600 italic">Waiting for activity...</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 animate-fade-in">
              <span className="text-slate-500 shrink-0">{log.time}</span>
              <span className="text-brand-cyan/80">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
