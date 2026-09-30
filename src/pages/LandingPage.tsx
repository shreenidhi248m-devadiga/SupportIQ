import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Brain,
  Mic,
  Camera,
  GitPullRequest,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play,
  Check,
  Zap,
  ShieldCheck,
  Layers
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const capabilities = [
    {
      icon: <Brain className="w-6 h-6 text-[#102A56] dark:text-[#2563EB]" />,
      title: 'NLP Sentiment Analysis',
      desc: 'Deep natural language understanding to detect anger, urgency, satisfaction, and problem intent.',
    },
    {
      icon: <Mic className="w-6 h-6 text-[#102A56] dark:text-[#2563EB]" />,
      title: 'Voice & Speech AI',
      desc: 'Transcribe audio recordings in real time and analyze voice tone & support requests.',
    },
    {
      icon: <Camera className="w-6 h-6 text-[#102A56] dark:text-[#2563EB]" />,
      title: 'Document & Vision OCR',
      desc: 'Extract text from accident photos, receipts, invoices, and PDF insurance documents automatically.',
    },
    {
      icon: <GitPullRequest className="w-6 h-6 text-[#102A56] dark:text-[#2563EB]" />,
      title: 'Sub-Second Routing',
      desc: 'Pre-assign tickets to Claims, Billing, or Tech teams instantly based on AI classification.',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#102A56] dark:text-[#2563EB]" />,
      title: 'Churn Risk Alerts',
      desc: 'Predict dissatisfied customer churn risk and alert customer success managers proactively.',
    },
  ];

  return (
    <div className="space-y-24 pb-20 bg-[#F8FAFC] dark:bg-[#080D1F] min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 bg-white dark:bg-[#0D1428] border-b border-[#E5E7EB] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 dark:hidden"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-mono text-[#102A56]">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <span>Next-Gen Customer Support & Intelligence</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#102A56] dark:text-[#F8FAFC] tracking-tight leading-[1.1]">
                Smarter Support.<br/>
                <span className="text-[#2563EB] block mt-1">Faster Resolution.</span>
                <span className="block mt-2">
                  Happier Customers.
                </span>
              </h1>

              <p className="text-lg text-gray-600 dark:text-[#A8B3C7] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                SupportIQ analyzes customer sentiment, processes documents & voice recordings, routes support tickets in seconds, and predicts customer churn before it happens.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/register"
                  className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2 group"
                >
                  Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/ai-support"
                  className="btn-secondary w-full sm:w-auto px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 text-[#2563EB] fill-[#2563EB]" /> Try AI Playground
                </Link>
              </div>

              {/* Feature Highlights */}
              <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-[#102A56] dark:text-[#F8FAFC] font-semibold">
                <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#2563EB]" /> Sub-second classification</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#2563EB]" /> Multi-modal (Text, Voice, OCR)</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#2563EB]" /> Express & MongoDB powered</div>
              </div>
            </div>

            {/* Right Column Demo Visualization Card */}
            <div id="demo" className="lg:col-span-5 relative animate-fade-in scroll-mt-28">
              <div className="card-premium p-6 relative z-10">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <span className="text-xs font-mono text-gray-500 dark:text-[#71809A] font-semibold flex items-center gap-1.5">
                    SupportIQ Engine <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Live
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-2">
                    <div className="text-xs text-gray-500 dark:text-[#71809A] font-mono flex justify-between font-bold tracking-wider uppercase">
                      <span>Incoming Inquiry</span>
                      <span className="text-[#2563EB]">#TK-84920</span>
                    </div>
                    <p className="text-sm text-[#102A56] font-medium italic">
                      "My car was hit in an accident. Front bumper is damaged and I need to file an insurance claim immediately."
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#EFF6FF] border border-[#2563EB]/20 space-y-4">
                    <div className="flex justify-between text-xs font-mono font-bold tracking-wider">
                      <span className="text-[#102A56] flex items-center gap-1.5 uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" /> AI Analysis Result
                      </span>
                      <span className="text-[#2563EB]">98% Confidence</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white dark:bg-[#0D1428] p-3 rounded-lg border border-[#E5E7EB] shadow-sm">
                        <span className="text-gray-500 dark:text-[#71809A] block text-[10px] uppercase font-bold tracking-wider mb-1">INTENT</span>
                        <span className="text-[#102A56] dark:text-[#F8FAFC] font-bold">Accident Claim</span>
                      </div>
                      <div className="bg-white dark:bg-[#0D1428] p-3 rounded-lg border border-[#E5E7EB] shadow-sm">
                        <span className="text-gray-500 dark:text-[#71809A] block text-[10px] uppercase font-bold tracking-wider mb-1">DEPARTMENT</span>
                        <span className="text-[#2563EB] font-bold">Claims Dept</span>
                      </div>
                      <div className="bg-white dark:bg-[#0D1428] p-3 rounded-lg border border-[#E5E7EB] shadow-sm">
                        <span className="text-gray-500 dark:text-[#71809A] block text-[10px] uppercase font-bold tracking-wider mb-1">SENTIMENT</span>
                        <span className="text-[#102A56] dark:text-[#F8FAFC] font-bold">Frustrated</span>
                      </div>
                      <div className="bg-white dark:bg-[#0D1428] p-3 rounded-lg border border-[#E5E7EB] shadow-sm">
                        <span className="text-gray-500 dark:text-[#71809A] block text-[10px] uppercase font-bold tracking-wider mb-1">CHURN RISK</span>
                        <span className="text-[#102A56] dark:text-[#F8FAFC] font-bold">72% (High)</span>
                      </div>
                    </div>

                    <div className="text-xs text-[#102A56] dark:text-[#F8FAFC] bg-white dark:bg-[#0D1428] p-3 rounded-lg border border-[#E5E7EB] shadow-sm leading-relaxed mt-2">
                      <strong className="text-[#2563EB] mr-1">AI Response:</strong> Your ticket has been pre-routed to our Claims Department with High Priority. A specialist is notified.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AI CAPABILITIES GRID */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-mono text-[#2563EB] uppercase tracking-widest font-bold">Comprehensive Platform</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#102A56] dark:text-[#F8FAFC]">Engineered for Modern Customer Operations</h3>
          <p className="text-gray-600 dark:text-[#A8B3C7] text-lg">
            Replace legacy ticket queues with predictive intelligence, automatic routing, and multi-channel input understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="card-premium p-8 space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB]">
                {cap.icon}
              </div>
              <h4 className="text-xl font-bold text-[#102A56] dark:text-[#F8FAFC]">{cap.title}</h4>
              <p className="text-gray-600 dark:text-[#A8B3C7] text-sm leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section id="solutions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest font-bold">Industry Solutions</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#102A56] dark:text-[#F8FAFC]">Tailored For High-Velocity Teams</h3>
          <p className="text-gray-600 dark:text-[#A8B3C7] text-lg">
            SupportIQ scales across technical support, billing escalations, claims processing, and customer success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-premium p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-[#102A56] dark:text-[#F8FAFC]">Fintech & Insurance Claims</h4>
            <p className="text-gray-600 dark:text-[#A8B3C7] text-sm leading-relaxed">
              Extract claim forms, policy documents, and receipts automatically via OCR and fast-track to tier-2 adjusters.
            </p>
            <div className="pt-2 text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <span>99.2% Accuracy Rate</span>
            </div>
          </div>

          <div className="card-premium p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-[#102A56] dark:text-[#F8FAFC]">SaaS & Product Companies</h4>
            <p className="text-gray-600 dark:text-[#A8B3C7] text-sm leading-relaxed">
              Sub-second triage into Billing, Bug Reports, and Feature Requests directly to engineering and customer success reps.
            </p>
            <div className="pt-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <span>Under 400ms Triage</span>
            </div>
          </div>

          <div className="card-premium p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-[#102A56] dark:text-[#F8FAFC]">Enterprise Customer Success</h4>
            <p className="text-gray-600 dark:text-[#A8B3C7] text-sm leading-relaxed">
              Real-time churn risk indicators flag frustrated accounts before negative reviews or contract cancellations occur.
            </p>
            <div className="pt-2 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span>Proactive Retention</span>
            </div>
          </div>
        </div>
      </section>



      {/* CTA SECTION */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="card-premium p-10 sm:p-16 text-center space-y-8 relative overflow-hidden border-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A56] dark:text-[#F8FAFC] relative z-10">
            Ready to Connect Your Customer Support to AI?
          </h2>
          <p className="text-gray-600 dark:text-[#A8B3C7] max-w-xl mx-auto text-base relative z-10">
            Join SupportIQ workspace today. Real database persistence, real REST APIs, and instant AI analytics.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 relative z-10">
            <Link
              to="/register"
              className="bg-[#2563EB] text-white hover:bg-[#2563EB]Hover px-8 py-4 rounded-xl text-base font-bold transition-all shadow-md"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="bg-white dark:bg-[#111A33] text-[#102A56] dark:text-[#F8FAFC] border border-[#E5E7EB] dark:border-[#080D1F] hover:bg-[#F8FAFC] dark:hover:bg-[#111A33]/80 px-8 py-4 rounded-xl text-base font-semibold transition-all"
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