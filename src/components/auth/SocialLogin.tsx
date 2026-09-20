import React from 'react';

export const SocialLogin: React.FC = () => {
  return (
    <div className="space-y-3 pt-2">
      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-200 dark:border-white/10 w-full transition-colors" />
        <span className="bg-white dark:bg-slate-900 px-3 text-sm font-bold font-mono text-slate-800 dark:text-slate-200 uppercase shrink-0 transition-colors">
          or continue with
        </span>
        <div className="border-t border-slate-200 dark:border-white/10 w-full transition-colors" />
      </div>

      <div className="grid grid-cols-2 gap-3 font-mono text-xs">
        <button
          type="button"
          onClick={() => alert('Google authentication service is connected for demo.')}
          className="py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          Google
        </button>

        <button
          type="button"
          onClick={() => alert('Microsoft authentication service is connected for demo.')}
          className="py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 23 23">
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
          Microsoft
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
