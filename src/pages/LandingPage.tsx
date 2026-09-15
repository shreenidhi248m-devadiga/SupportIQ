import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Brain,
  Mic,
  Smile,
  Camera,
  GitPullRequest,
  TrendingUp,
  CheckCircle,
  Zap,
  Clock,
  BarChart,
  ArrowRight,
  Play,
  RotateCcw,
  Check,
  ShieldAlert,
  UserCheck,
  FileText,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const capabilities = [
    {
      icon: <Brain className="w-6 h-6 text-brand-blue" />,
      title: 'NLP Sentiment Analysis',
      desc: 'Deep natural language understanding to detect anger, urgency, satisfaction, and problem intent.',
    },
    {
      icon: <Mic className="w-6 h-6 text-brand-violet" />,
      title: 'Voice & Speech AI',
      desc: 'Transcribe audio recordings in real time and analyze voice tone & support requests.',
    },
    {
      icon: <Camera className="w-6 h-6 text-brand-cyan" />,
      title: 'Document & Vision OCR',
      desc: 'Extract text from accident photos, receipts, invoices, and PDF insurance documents automatically.',
    },
    {
      icon: <GitPullRequest className="w-6 h-6 text-brand-emerald" />,
      title: 'Sub-Second Routing',
      desc: 'Pre-assign tickets to Claims, Billing, or Tech teams instantly based on AI classification.',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-amber" />,
      title: 'Churn Risk Alerts',
      desc: 'Predict dissatisfied customer churn risk and alert customer success managers proactively.',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-pill text-xs font-mono text-brand-blue border border-brand-blue/30 shadow-lg shadow-brand-blue/10">
                <Sparkles className="w-4 h-4 text-brand-blue animate-pulse" />
                <span>Next-Gen Customer Support & Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Smarter Support.{' '}
                <span className="text-gradient block mt-1">Faster Resolution.</span>
                <span className="text-slate-300 text-3xl sm:text-4xl lg:text-5xl font-semibold block mt-2">
                  Happier Customers.
                </span>
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                SupportIQ analyzes customer sentiment, processes documents & voice recordings, routes support tickets in sub-seconds, and predicts customer churn before it happens.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-brand-blue via-brand-violet to-brand-purple hover:opacity-95 transition-all shadow-xl shadow-brand-violet/25 flex items-center justify-center gap-2 group"
                >
                  Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/ai-support"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-slate-200 glass-panel hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10"
                >
                  <Play className="w-4 h-4 text-brand-blue fill-brand-blue" /> Try AI Playground
                </Link>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Sub-second classification</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Multi-modal (Text, Voice, OCR)</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Express & MongoDB powered</div>
              </div>
            </div>

            {/* Right Column Demo Visualization Card */}
            <div className="lg:col-span-5 relative">
              <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl relative z-10 overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <span className="text-xs font-mono text-brand-blue">SupportIQ Engine Live Telemetry</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="text-xs text-slate-400 font-mono flex justify-between">
                      <span>INCOMING INQUIRY</span>
                      <span className="text-amber-400">#TK-84920</span>
                    </div>
                    <p className="text-sm text-slate-200 italic font-sans">
                      "My car was hit in an accident. Front bumper is damaged and I need to file an insurance claim immediately!"
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-brand-violet/10 border border-brand-violet/30 space-y-3">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-brand-violet font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> AI ANALYSIS RESULT
                      </span>
                      <span className="text-emerald-400">98% Confidence</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                        <span className="text-slate-400 block text-[10px]">INTENT</span>
                        <span className="text-white font-bold">Accident Claim</span>
                      </div>
                      <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                        <span className="text-slate-400 block text-[10px]">DEPARTMENT</span>
                        <span className="text-brand-blue font-bold">Claims Dept</span>
                      </div>
                      <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                        <span className="text-slate-400 block text-[10px]">SENTIMENT</span>
                        <span className="text-rose-400 font-bold">Frustrated</span>
                      </div>
                      <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                        <span className="text-slate-400 block text-[10px]">CHURN RISK</span>
                        <span className="text-amber-400 font-bold">72% (High)</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 bg-black/40 p-3 rounded-xl border border-white/10 leading-relaxed">
                      <strong className="text-brand-blue">AI Response:</strong> Your ticket has been pre-routed to our Claims Department with High Priority. A specialist is notified.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AI CAPABILITIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono text-brand-blue uppercase tracking-widest font-bold">Comprehensive Platform</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white">Engineered for Modern Customer Operations</h3>
          <p className="text-slate-400 text-sm sm:text-base">
            Replace legacy ticket queues with predictive intelligence, automatic routing, and multi-channel input understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-8 rounded-3xl border border-white/10 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                {cap.icon}
              </div>
              <h4 className="text-xl font-bold text-white">{cap.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-brand-violet/30 p-10 sm:p-16 text-center space-y-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-violet/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Connect Your Customer Support to AI?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-base">
            Join SupportIQ workspace today. Real database persistence, real REST APIs, and instant AI analytics.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-brand-blue via-brand-violet to-brand-purple shadow-lg shadow-brand-violet/30 hover:opacity-95 transition-all"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 rounded-xl text-base font-semibold text-slate-200 glass-panel hover:bg-white/10 transition-all border border-white/10"
            >
              Sign In to Workspace
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;