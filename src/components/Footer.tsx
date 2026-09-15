import React from 'react';
import { Sparkles, Shield, Cpu, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#040612] border-t border-white/10 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-violet p-0.5 shadow-md shadow-brand-violet/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Support<span className="text-gradient">IQ</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-Powered Customer Intelligence & Support System. Predictive sentiment, sub-second ticket routing, and proactive churn risk detection.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-mono">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="/#features" className="hover:text-brand-blue transition-colors">AI Capabilities</a></li>
              <li><a href="/#demo" className="hover:text-brand-blue transition-colors">Live Simulation</a></li>
              <li><a href="/ai-support" className="hover:text-brand-blue transition-colors">Voice & Document Vision</a></li>
              <li><a href="/#churn" className="hover:text-brand-blue transition-colors">Churn Intelligence</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-mono">Workspaces</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="/login" className="hover:text-brand-violet transition-colors">Customer Portal</a></li>
              <li><a href="/login" className="hover:text-brand-violet transition-colors">Admin Command Center</a></li>
              <li><a href="/register" className="hover:text-brand-violet transition-colors">Create Account</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-mono">Security & SLA</h4>
            <div className="glass-panel p-4 rounded-xl space-y-2 border border-white/10 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2 text-emerald-400">
                <Shield className="w-4 h-4" /> 99.99% Enterprise Uptime
              </div>
              <div className="flex items-center gap-2 text-brand-blue">
                <Cpu className="w-4 h-4" /> Sub-second AI NLP Latency
              </div>
              <div className="flex items-center gap-2 text-brand-violet">
                <Activity className="w-4 h-4" /> End-to-End JWT Auth
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} SupportIQ Inc. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-2">
            Built with React, Express, TypeScript & MongoDB.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;