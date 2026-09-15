import React, { ReactNode } from 'react';
import { Inbox, FolderOpen, BellOff, Users } from 'lucide-react';

interface EmptyStateProps {
  icon?: 'inbox' | 'folder' | 'bell' | 'users';
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  description,
  action,
}) => {
  const icons = {
    inbox: <Inbox className="w-12 h-12 text-brand-violet/70" />,
    folder: <FolderOpen className="w-12 h-12 text-brand-blue/70" />,
    bell: <BellOff className="w-12 h-12 text-brand-cyan/70" />,
    users: <Users className="w-12 h-12 text-brand-purple/70" />,
  };

  return (
    <div className="glass-panel rounded-2xl p-10 text-center flex flex-col items-center justify-center border border-white/10 max-w-md mx-auto my-8">
      <div className="w-20 h-20 rounded-2xl bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center mb-4 shadow-inner">
        {icons[icon]}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      {description && <p className="text-slate-400 text-sm mb-6 leading-relaxed">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export default EmptyState;