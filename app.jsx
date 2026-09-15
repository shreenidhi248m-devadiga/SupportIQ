// SupportIQ Landing Page Application
const { useState, useEffect, useRef } = React;

// --- SVG ICON COMPONENT HELPER ---
const Icon = ({ name, className = "w-5 h-5", ...props }) => {
  const icons = {
    sparkles: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    brain: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    mic: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    smile: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    camera: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    route: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    trendingUp: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    check: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    zap: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    shield: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    arrowRight: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    ),
    play: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    user: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    users: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    barChart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    alertTriangle: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    close: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    menu: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    messageSquare: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    fileText: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    clock: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    lock: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  };
  return icons[name] || icons.sparkles;
};

// --- MAIN APPLICATION APP ---
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('started'); // 'started' | 'login'

  // Scroll handler for translucent navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openAuthModal = (type) => {
    setModalType(type);
    setModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-violet selection:text-white">
      {/* Navbar */}
      <Navbar 
        isScrolled={isScrolled} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        openAuthModal={openAuthModal}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <HeroSection openAuthModal={openAuthModal} />

        {/* Social Proof / Trust Strip */}
        <TrustMetrics />

        {/* AI Capabilities Grid */}
        <AICapabilities />

        {/* "More Than a Chatbot" Comparison */}
        <MoreThanChatbot />

        {/* How It Works Timeline */}
        <HowItWorks />

        {/* Real-World Use Case Interactive Demo */}
        <UseCaseDemo />

        {/* Customer + Business Benefits */}
        <Benefits />

        {/* Analytics Preview Dashboard */}
        <AnalyticsPreview />

        {/* Churn Prediction Section */}
        <ChurnPrediction />

        {/* AI + Human Escalation */}
        <HumanEscalation />

        {/* Final Call To Action */}
        <FinalCTA openAuthModal={openAuthModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      {modalOpen && (
        <AuthModal 
          type={modalType} 
          onClose={() => setModalOpen(false)} 
        />
      )}
    </div>
  );
}

// --- NAVBAR COMPONENT ---
function Navbar({ isScrolled, mobileMenuOpen, setMobileMenuOpen, openAuthModal }) {
  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'AI Capabilities', href: '#capabilities' },
    { name: 'Analytics', href: '#analytics' },
    { name: 'About', href: '#about' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#040612]/85 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-violet to-brand-purple p-0.5 shadow-lg shadow-brand-violet/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#070B1E] rounded-[10px] flex items-center justify-center">
                <Icon name="sparkles" className="w-5 h-5 text-brand-blue animate-pulse-slow" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1 font-mono">
                Support<span className="text-gradient">IQ</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="login.html"
              className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
            >
              Login
            </a>
            <button 
              onClick={() => openAuthModal('started')}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-xl group bg-gradient-to-br from-brand-blue to-brand-violet group-hover:from-brand-blue group-hover:to-brand-purple text-white shadow-lg shadow-brand-violet/25 hover:shadow-brand-violet/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-[#0A0F24] rounded-[10px] group-hover:bg-opacity-0 font-semibold flex items-center gap-1.5">
                Get Started
                <Icon name="arrowRight" className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} className="w-6 h-6" />
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#070B1E]/95 backdrop-blur-xl border-b border-white/10 p-6 shadow-2xl flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-base font-medium text-slate-200 hover:text-brand-blue hover:bg-white/5 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-white/10 my-1"></div>
          <div className="flex flex-col gap-3">
            <a 
              href="login.html"
              className="w-full py-3 text-center font-medium text-slate-200 border border-white/10 rounded-xl bg-white/5"
            >
              Login
            </a>
            <button 
              onClick={() => openAuthModal('started')}
              className="w-full py-3 text-center font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-violet rounded-xl shadow-lg shadow-brand-violet/20"
            >
              Get Started →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// --- HERO SECTION COMPONENT ---
function HeroSection({ openAuthModal }) {
  const [activeStep, setActiveStep] = useState(0);

  // Progressive automation loop for hero dashboard cards
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const heroSteps = [
    { title: "Voice Input", desc: "🎤 Speech detected & converted to text", label: "Speech AI", color: "from-blue-500/20 to-blue-600/10", border: "border-blue-500/40" },
    { title: "AI Understanding", desc: "🧠 Accident Insurance Claim (99.2% confidence)", label: "Intent NLP", color: "from-purple-500/20 to-purple-600/10", border: "border-purple-500/40" },
    { title: "Sentiment", desc: "😟 Frustrated / High Urgency detected", label: "Emotion Engine", color: "from-rose-500/20 to-rose-600/10", border: "border-rose-500/40" },
    { title: "Department", desc: "🎯 Auto-matched to Claims Department", label: "Smart Routing", color: "from-cyan-500/20 to-cyan-600/10", border: "border-cyan-500/40" },
    { title: "Priority", desc: "⚡ High Priority — Ticket #TK-84920 Created", label: "Resolution Dispatch", color: "from-amber-500/20 to-amber-600/10", border: "border-amber-500/40" },
  ];

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-blue text-xs font-semibold tracking-wide uppercase shadow-inner">
              <Icon name="sparkles" className="w-3.5 h-3.5 text-brand-blue" />
              <span>✦ AI-Powered Customer Intelligence</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Intelligent Support.<br />
              <span className="text-gradient">Happier Customers.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl leading-relaxed">
              SupportIQ understands customer problems, analyzes sentiment, processes documents and images, routes tickets automatically, and helps businesses predict customer churn.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
              <button 
                onClick={() => openAuthModal('started')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-blue via-brand-violet to-brand-purple text-white font-semibold text-base shadow-xl shadow-brand-violet/30 hover:shadow-brand-violet/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Get Started
                <Icon name="arrowRight" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a 
                href="#use-case"
                className="px-7 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-200 hover:text-white font-semibold text-base backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2.5 group"
              >
                <Icon name="play" className="w-4 h-4 text-brand-blue group-hover:scale-110 transition-transform" />
                See How It Works
              </a>
            </div>

            {/* Trust Statement */}
            <div className="pt-4 flex items-center gap-3 text-xs sm:text-sm text-slate-400 font-medium">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-brand-blue/30 border border-brand-blue flex items-center justify-center text-[10px] font-bold text-white">AI</div>
                <div className="w-7 h-7 rounded-full bg-brand-violet/30 border border-brand-violet flex items-center justify-center text-[10px] font-bold text-white">IQ</div>
                <div className="w-7 h-7 rounded-full bg-brand-cyan/30 border border-brand-cyan flex items-center justify-center text-[10px] font-bold text-white">24/7</div>
              </div>
              <span>Built for smarter, faster, more human customer support.</span>
            </div>

          </div>

          {/* Right Column: Floating AI Support Dashboard Visualization */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Interactive Glass Container */}
            <div className="relative rounded-2xl glass-panel p-5 sm:p-6 border border-white/15 shadow-2xl overflow-hidden backdrop-blur-xl">
              
              {/* Dashboard Top Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 text-xs font-mono text-slate-400">SupportIQ Engine v4.2</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5"></span>
                    LIVE ORCHESTRATION
                  </span>
                </div>
              </div>

              {/* Customer Prompt Card */}
              <div className="mb-5 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1.5 text-brand-blue font-medium">
                    <Icon name="user" className="w-3.5 h-3.5" /> Customer Audio/Text Transcript
                  </span>
                  <span className="font-mono text-[10px]">10:42 AM</span>
                </div>
                <p className="text-sm sm:text-base text-slate-100 font-medium italic border-l-2 border-brand-blue pl-3 py-1">
                  “My car met with an accident and I want to claim insurance.”
                </p>
              </div>

              {/* AI Progressive Processing Flow */}
              <div className="space-y-3 relative">
                
                {heroSteps.map((step, index) => {
                  const isActive = activeStep === index;
                  const isPassed = activeStep > index;

                  return (
                    <div 
                      key={step.title}
                      className={`p-3.5 rounded-xl border transition-all duration-500 flex items-center justify-between ${
                        isActive 
                          ? `bg-gradient-to-r ${step.color} ${step.border} shadow-lg scale-[1.02]` 
                          : isPassed 
                          ? 'bg-white/[0.03] border-white/10 opacity-90' 
                          : 'bg-white/[0.01] border-white/5 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'
                        }`}>
                          0{index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">{step.label}</span>
                            {isActive && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-violet/30 text-brand-blue font-mono">Processing...</span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-100 mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                      
                      <div className="pl-2">
                        {isPassed ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                            <Icon name="check" className="w-3.5 h-3.5" />
                          </div>
                        ) : isActive ? (
                          <div className="w-6 h-6 rounded-full bg-brand-violet/30 border border-brand-violet text-brand-blue flex items-center justify-center animate-spin">
                            <Icon name="zap" className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10"></div>
                        )}
                      </div>
                    </div>
                  );
                })}

              </div>

              {/* Floating Glass Metric Badges Around Dashboard */}
              <div className="mt-5 grid grid-cols-2 gap-2.5 text-center">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-left flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Icon name="sparkles" className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Intent Confidence</div>
                    <div className="text-xs font-mono font-bold text-slate-100">98.4% Accuracy</div>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-left flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Icon name="check" className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Automated Dispatch</div>
                    <div className="text-xs font-mono font-bold text-emerald-400">Ticket #84920</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Subtle Parallax Decorative Background Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-blue/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-8 -left-6 w-40 h-40 bg-brand-violet/20 rounded-full blur-2xl pointer-events-none"></div>

          </div>

        </div>
      </div>
    </section>
  );
}

// --- SOCIAL PROOF / TRUST STRIP COMPONENT ---
function TrustMetrics() {
  const metrics = [
    { value: "24/7", label: "AI Support", desc: "Autonomous resolution round the clock" },
    { value: "5+", label: "AI Capabilities", desc: "NLP, Voice, Sentiment, Vision & Routing" },
    { value: "Real-Time", label: "Ticket Routing", desc: "Sub-second department classification" },
    { value: "Predictive", label: "Customer Intelligence", desc: "Early churn & dissatisfaction alerts" }
  ];

  return (
    <section className="py-12 border-y border-white/10 bg-white/[0.01] backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <p className="text-sm font-semibold tracking-wider text-slate-400 uppercase font-mono">
            One intelligent system for every customer interaction.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((item) => (
            <div 
              key={item.label}
              className="p-6 rounded-2xl glass-panel glass-panel-hover text-center relative overflow-hidden group"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono mb-1 group-hover:text-gradient transition-all duration-300">
                {item.value}
              </div>
              <div className="text-sm font-bold text-slate-200 mb-1">
                {item.label}
              </div>
              <div className="text-xs text-slate-400">
                {item.desc}
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-brand-violet/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// --- AI CAPABILITIES SECTION COMPONENT ---
function AICapabilities() {
  const capabilities = [
    {
      icon: "brain",
      title: "NLP Intelligence",
      description: "Understand customer intent, context, and problem type from natural language across multiple languages.",
      color: "from-blue-500/20 to-indigo-500/10",
      accent: "text-blue-400",
      border: "hover:border-blue-500/40"
    },
    {
      icon: "mic",
      title: "Voice AI",
      description: "Convert customer voice conversations into structured text and actionable support requests instantly.",
      color: "from-violet-500/20 to-purple-500/10",
      accent: "text-violet-400",
      border: "hover:border-violet-500/40"
    },
    {
      icon: "smile",
      title: "Sentiment Analysis",
      description: "Detect frustration, anger, satisfaction, and urgency in customer interactions in real time.",
      color: "from-rose-500/20 to-pink-500/10",
      accent: "text-rose-400",
      border: "hover:border-rose-500/40"
    },
    {
      icon: "camera",
      title: "Computer Vision",
      description: "Analyze receipts, identity documents, claim images, and damaged-product photos automatically.",
      color: "from-cyan-500/20 to-teal-500/10",
      accent: "text-cyan-400",
      border: "hover:border-cyan-500/40"
    },
    {
      icon: "route",
      title: "Smart Ticket Routing",
      description: "Automatically classify incoming requests and route them to the correct department without delay.",
      color: "from-emerald-500/20 to-green-500/10",
      accent: "text-emerald-400",
      border: "hover:border-emerald-500/40"
    },
    {
      icon: "trendingUp",
      title: "Churn Prediction",
      description: "Identify customers at risk of leaving and empower support teams to take proactive retention action.",
      color: "from-amber-500/20 to-orange-500/10",
      accent: "text-amber-400",
      border: "hover:border-amber-500/40"
    }
  ];

  return (
    <section id="capabilities" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <Icon name="zap" className="w-3.5 h-3.5" /> Next-Gen AI Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything Your Support Team Needs, <span className="text-gradient">Powered by AI</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            From understanding the first message to predicting the next customer action.
          </p>
        </div>

        {/* 3-Column Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className={`p-8 rounded-2xl glass-panel glass-panel-hover border border-white/10 ${item.border} flex flex-col justify-between group relative overflow-hidden`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={item.icon} className={`w-7 h-7 ${item.accent}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-blue transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200">
                <span>Explore capability</span>
                <Icon name="arrowRight" className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>

              {/* Glowing Corner Effect */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-brand-violet/20 transition-all pointer-events-none"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// --- "MORE THAN A CHATBOT" SECTION COMPONENT ---
function MoreThanChatbot() {
  return (
    <section id="features" className="py-24 bg-[#070B1E]/60 border-y border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-purple bg-brand-purple/10 px-3 py-1 rounded-full border border-brand-purple/20">
            The Support IQ Paradigm
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4">
            More Than a Chatbot
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            SupportIQ doesn't just answer questions. It understands what happens before, during, and after every customer interaction.
          </p>
        </div>

        {/* Side-by-Side Comparison Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Panel 1: Traditional Chatbot */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 opacity-70 hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase text-slate-400">Legacy Systems</span>
                <h3 className="text-xl font-bold text-slate-300">Traditional Chatbot</h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono">
                Reactive Only
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center text-xs mt-0.5">✕</span>
                <span>Answers predefined, rigid decision-tree questions only</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center text-xs mt-0.5">✕</span>
                <span>Limited contextual memory across sessions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center text-xs mt-0.5">✕</span>
                <span>Forces customer to manually locate departments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center text-xs mt-0.5">✕</span>
                <span>Manual ticket creation with missing metadata</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center text-xs mt-0.5">✕</span>
                <span>No customer emotion or urgency detection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center text-xs mt-0.5">✕</span>
                <span>No predictive customer churn intelligence</span>
              </li>
            </ul>
          </div>

          {/* Panel 2: SupportIQ (Visually Superior) */}
          <div className="p-8 rounded-2xl glass-panel border border-brand-violet/40 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-violet/25 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-violet/20">
              <div>
                <span className="text-xs font-mono uppercase text-brand-blue font-bold">Next-Gen Intelligence</span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  Support<span className="text-gradient">IQ</span>
                  <Icon name="sparkles" className="w-5 h-5 text-brand-blue animate-bounce" />
                </h3>
              </div>
              <div className="px-3.5 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-brand-blue text-xs font-mono font-bold shadow-inner">
                Proactive & Omnichannel
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-100">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs mt-0.5">
                  <Icon name="check" className="w-3.5 h-3.5" />
                </div>
                <span>Deeply understands customer intent and multi-turn context</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs mt-0.5">
                  <Icon name="check" className="w-3.5 h-3.5" />
                </div>
                <span>Omnichannel input: accepts text, voice, images, & documents</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs mt-0.5">
                  <Icon name="check" className="w-3.5 h-3.5" />
                </div>
                <span>Detects sentiment, tone, and urgency automatically</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs mt-0.5">
                  <Icon name="check" className="w-3.5 h-3.5" />
                </div>
                <span>Automatically creates, tags, and routes tickets in real time</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs mt-0.5">
                  <Icon name="check" className="w-3.5 h-3.5" />
                </div>
                <span>Provides AI responses or escalates complex cases to humans</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-xs mt-0.5">
                  <Icon name="check" className="w-3.5 h-3.5" />
                </div>
                <span>Predicts churn risk and generates customer intelligence</span>
              </li>
            </ul>

            <div className="mt-8 pt-4 border-t border-brand-violet/20 flex items-center justify-between">
              <span className="text-xs text-slate-300">Transform your customer operations today</span>
              <a href="#use-case" className="text-xs font-bold text-brand-blue hover:text-white flex items-center gap-1">
                See Live Simulation →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// --- HOW IT WORKS TIMELINE COMPONENT ---
function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Customer Input",
      desc: "Customer submits an inquiry via text message, voice note, document, or damaged product photo.",
      icon: "messageSquare",
      detail: "Supports text, voice audio, PDFs, PNG/JPG images."
    },
    {
      num: "02",
      title: "AI Understanding",
      desc: "NLP and Speech AI models parse the content to identify exact customer intent and key data entities.",
      icon: "brain",
      detail: "Detects topic, policy number, user ID, and intent category."
    },
    {
      num: "03",
      title: "Intelligent Analysis",
      desc: "Sentiment analysis, urgency scoring, and Computer Vision process visual evidence simultaneously.",
      icon: "zap",
      detail: "Calculates emotional tone score and visual damage severity."
    },
    {
      num: "04",
      title: "Smart Routing",
      desc: "System auto-generates a structured ticket and routes it directly to the exact department.",
      icon: "route",
      detail: "Direct dispatch to Claims, Billing, Tech Support, or Escalation."
    },
    {
      num: "05",
      title: "Resolution",
      desc: "AI handles straightforward issues instantly or prepares pre-filled context for human agents.",
      icon: "shield",
      detail: "Automated resolution or Human-in-the-Loop agent dispatch."
    },
    {
      num: "06",
      title: "Customer Intelligence",
      desc: "Interaction data is stored in the intelligence warehouse to predict churn and optimize workflows.",
      icon: "trendingUp",
      detail: "Updates customer risk score and sentiment timeline."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20">
            End-to-End Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4">
            From Customer Problem to <span className="text-gradient">Intelligent Resolution</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Click any step to inspect how SupportIQ processes interactions in milliseconds.
          </p>
        </div>

        {/* Timeline Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-b from-brand-violet/20 to-brand-blue/10 border-brand-blue shadow-lg scale-[1.03]'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-brand-blue' : 'text-slate-400'}`}>
                    {step.num}
                  </span>
                  <Icon name={step.icon} className={`w-4 h-4 ${isActive ? 'text-brand-blue' : 'text-slate-400'}`} />
                </div>
                <div className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {step.title}
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-brand-violet"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Showcase Panel */}
        <div className="p-8 rounded-2xl glass-panel border border-white/15 backdrop-blur-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-mono font-extrabold text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-lg border border-brand-blue/20">
                  {steps[activeStep].num}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {steps[activeStep].title}
                </h3>
              </div>
              
              <p className="text-base text-slate-200 leading-relaxed">
                {steps[activeStep].desc}
              </p>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-violet/20 text-brand-blue">
                  <Icon name="sparkles" className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">INTELLIGENCE METRIC</div>
                  <div className="text-sm font-medium text-slate-200">{steps[activeStep].detail}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm p-6 rounded-xl bg-[#060919] border border-white/10 text-center space-y-4 relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-blue to-brand-violet mx-auto flex items-center justify-center text-white shadow-xl shadow-brand-violet/30 animate-pulse">
                  <Icon name={steps[activeStep].icon} className="w-8 h-8" />
                </div>
                <div className="text-sm font-semibold text-white">Phase {steps[activeStep].num} Active</div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-brand-blue to-brand-violet h-full transition-all duration-500"
                    style={{ width: `${((activeStep + 1) / 6) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Step {activeStep + 1} of 6</span>
                  <span>{Math.round(((activeStep + 1) / 6) * 100)}% Complete</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

// --- REAL-WORLD USE CASE INTERACTIVE DEMO COMPONENT ---
function UseCaseDemo() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [demoState, setDemoState] = useState('idle'); // 'idle' | 'running' | 'completed'

  const runSimulation = () => {
    setIsProcessing(true);
    setDemoState('running');
    setTimeout(() => {
      setIsProcessing(false);
      setDemoState('completed');
    }, 2400);
  };

  const resetSimulation = () => {
    setDemoState('idle');
  };

  return (
    <section id="use-case" className="py-24 bg-[#05081A] border-b border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 text-emerald-400 font-bold">
            Interactive Insurance Case Study
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4">
            See SupportIQ in Action
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Experience how SupportIQ transforms a complex insurance accident claim into a routed, high-priority ticket in seconds.
          </p>
        </div>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Customer Conversation Panel */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-white/15 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                    JD
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">John Doe (Policy #IN-9082)</div>
                    <div className="text-xs text-slate-400">Customer Channel: Mobile App</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active</span>
              </div>

              {/* Customer Audio / Message Box */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-mono text-brand-blue">
                      <Icon name="mic" className="w-3.5 h-3.5" /> Audio Note + Text Input
                    </span>
                    <span>Just Now</span>
                  </div>

                  <p className="text-sm text-slate-100 font-medium leading-relaxed bg-[#0A0E22] p-3 rounded-lg border border-white/5">
                    “My car met with an accident and I want to claim insurance.”
                  </p>

                  {/* Simulated Image Attachment */}
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Icon name="camera" className="w-4 h-4 text-brand-violet" />
                      <span>vehicle_front_damage.jpg (1.8 MB)</span>
                    </div>
                    <span className="text-[10px] font-mono bg-brand-violet/20 text-brand-violet px-2 py-0.5 rounded">Uploaded</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 italic">
                  💡 Tip: Click "Run AI Processing" to trigger the multi-agent AI pipeline.
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex gap-3">
              {demoState !== 'completed' ? (
                <button
                  onClick={runSimulation}
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-blue via-brand-violet to-brand-purple text-white font-semibold text-sm shadow-xl shadow-brand-violet/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Icon name="zap" className="w-4 h-4 animate-spin text-white" />
                      Processing AI Pipeline...
                    </>
                  ) : (
                    <>
                      <Icon name="play" className="w-4 h-4" />
                      Run AI Processing Simulation
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={resetSimulation}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-sm transition-all"
                >
                  Reset Simulation
                </button>
              )}
            </div>
          </div>

          {/* Right Side: AI Analysis Panel */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-brand-violet/30 relative flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <Icon name="sparkles" className="w-5 h-5 text-brand-blue" />
                  <span className="text-base font-bold text-white">AI Live Analysis Engine</span>
                </div>
                <span className="text-xs font-mono text-slate-400">Execution Time: 0.38s</span>
              </div>

              {/* Steps Progression Display */}
              <div className="space-y-3">
                
                {/* Speech-to-Text */}
                <div className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  demoState !== 'idle' ? 'bg-white/[0.04] border-blue-500/40' : 'bg-white/[0.01] border-white/5 opacity-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                      <Icon name="mic" className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">SPEECH-TO-TEXT</div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-100">Voice converted to clean text (Accuracy 99.4%)</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">✓ DONE</span>
                </div>

                {/* Intent Detection */}
                <div className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  demoState !== 'idle' ? 'bg-white/[0.04] border-purple-500/40' : 'bg-white/[0.01] border-white/5 opacity-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                      <Icon name="brain" className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">INTENT DETECTION</div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-100">Classified: Insurance Claim → Auto Accident</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">✓ DONE</span>
                </div>

                {/* Sentiment Analysis */}
                <div className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  demoState !== 'idle' ? 'bg-white/[0.04] border-rose-500/40' : 'bg-white/[0.01] border-white/5 opacity-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                      <Icon name="smile" className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">SENTIMENT ANALYSIS</div>
                      <div className="text-xs sm:text-sm font-semibold text-rose-400">Frustrated / High Urgency Score (8.9/10)</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-rose-400 font-bold">HIGH URGENCY</span>
                </div>

                {/* Image Computer Vision */}
                <div className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  demoState !== 'idle' ? 'bg-white/[0.04] border-cyan-500/40' : 'bg-white/[0.01] border-white/5 opacity-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                      <Icon name="camera" className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">IMAGE COMPUTER VISION</div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-100">Vehicle front bumper & headlight structural damage detected</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">✓ DONE</span>
                </div>

                {/* Smart Routing & Ticket */}
                <div className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  demoState !== 'idle' ? 'bg-white/[0.04] border-emerald-500/40' : 'bg-white/[0.01] border-white/5 opacity-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <Icon name="route" className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">SMART ROUTING & TICKET</div>
                      <div className="text-xs sm:text-sm font-semibold text-emerald-300">Ticket #TK-84920 → Claims Dept (High Priority)</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">DISPATCHED</span>
                </div>

              </div>
            </div>

            {/* Success Banner State */}
            {demoState === 'completed' && (
              <div className="mt-5 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Icon name="check" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">✓ Customer request successfully routed</div>
                    <div className="text-xs text-emerald-200">Claims specialist notified with AI summary pre-filled.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

// --- CUSTOMER + BUSINESS BENEFITS COMPONENT ---
function Benefits() {
  const customerBenefits = [
    "Less waiting with instant AI comprehension",
    "No confusing manual department searching",
    "Omnichannel voice and text support options",
    "Easy document and damage image upload",
    "Faster issue resolution & claims processing",
    "Personalized assistance tailored to customer history"
  ];

  const businessBenefits = [
    "Automated ticket handling & intelligent classification",
    "Significantly reduced human support workload",
    "Deep real-time customer sentiment monitoring",
    "Faster first response & resolution metrics",
    "Predictive customer churn risk prevention",
    "Actionable support performance analytics & insights",
    "Scalable 24/7 operations without headcount inflation"
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20">
            Dual Impact Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4">
            Built for Customers. <span className="text-gradient">Engineered for Business.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* For Customers */}
          <div className="p-8 rounded-2xl glass-panel border border-white/10 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                <Icon name="user" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase font-bold">End-User Experience</span>
                <h3 className="text-2xl font-bold text-white">For Customers</h3>
              </div>
            </div>

            <ul className="space-y-4">
              {customerBenefits.map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-200 text-sm sm:text-base font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Icon name="check" className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Businesses */}
          <div className="p-8 rounded-2xl glass-panel border border-brand-violet/30 relative overflow-hidden group bg-gradient-to-b from-brand-violet/10 to-transparent">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-violet/20">
              <div className="p-3 rounded-xl bg-brand-violet/20 text-brand-purple">
                <Icon name="trendingUp" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-brand-purple uppercase font-bold">Enterprise ROI</span>
                <h3 className="text-2xl font-bold text-white">For Businesses</h3>
              </div>
            </div>

            <ul className="space-y-4">
              {businessBenefits.map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-100 text-sm sm:text-base font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Icon name="check" className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}

// --- ANALYTICS PREVIEW DASHBOARD COMPONENT ---
function AnalyticsPreview() {
  const [timeframe, setTimeframe] = useState('7d');

  const metrics = {
    '24h': { total: '214', resolved: '188', pending: '26', rate: '87.8%' },
    '7d': { total: '1,284', resolved: '972', pending: '312', rate: '87.0%' },
    '30d': { total: '5,890', resolved: '5,210', pending: '680', rate: '88.4%' },
  }[timeframe];

  return (
    <section id="analytics" className="py-24 bg-[#060A1F]/80 border-y border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-violet text-xs font-mono font-bold uppercase mb-3">
              <Icon name="barChart" className="w-3.5 h-3.5" /> Executive Dashboard Preview
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Customer Intelligence
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Interactive preview showcasing real-time sentiment distribution and resolution metrics.
            </p>
          </div>

          {/* Timeframe selector */}
          <div className="mt-4 md:mt-0 flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 self-start md:self-auto">
            {['24h', '7d', '30d'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  timeframe === tf
                    ? 'bg-brand-violet text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Surface */}
        <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/15 backdrop-blur-2xl space-y-8">
          
          {/* Top KPI Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-xs text-slate-400 font-mono mb-1">TOTAL TICKETS</div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white">{metrics.total}</div>
              <div className="text-[11px] text-emerald-400 font-mono mt-1">↑ 12% vs last period</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-xs text-slate-400 font-mono mb-1">RESOLVED</div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-400">{metrics.resolved}</div>
              <div className="text-[11px] text-emerald-400 font-mono mt-1">Automated + Agent</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-xs text-slate-400 font-mono mb-1">PENDING</div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-400">{metrics.pending}</div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">In queue / Escalated</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-xs text-slate-400 font-mono mb-1">RESOLUTION RATE</div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-brand-blue">{metrics.rate}</div>
              <div className="text-[11px] text-emerald-400 font-mono mt-1">Target: &gt;85%</div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Chart 1: Customer Sentiment Breakdown */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Icon name="smile" className="w-4 h-4 text-brand-blue" />
                  Customer Sentiment
                </h4>
                <span className="text-[10px] font-mono text-slate-400">NLP Classifier</span>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-emerald-400 font-semibold">Positive</span>
                    <span className="text-slate-300">64%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-blue-400 font-semibold">Neutral</span>
                    <span className="text-slate-300">24%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-blue-400 h-full rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-rose-400 font-semibold">Negative</span>
                    <span className="text-slate-300">12%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 2: Ticket Categories Distribution */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Icon name="route" className="w-4 h-4 text-brand-violet" />
                  Ticket Categories
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Auto Routed</span>
              </div>

              <div className="space-y-2.5 pt-1 text-xs font-mono">
                <div className="flex justify-between p-2 rounded bg-white/[0.03]">
                  <span className="text-slate-300">Billing & Payments</span>
                  <span className="text-brand-blue font-bold">32%</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white/[0.03]">
                  <span className="text-slate-300">Technical Support</span>
                  <span className="text-brand-violet font-bold">28%</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white/[0.03]">
                  <span className="text-slate-300">Claims & Claims Policy</span>
                  <span className="text-cyan-400 font-bold">22%</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white/[0.03]">
                  <span className="text-slate-300">Account Management</span>
                  <span className="text-amber-400 font-bold">12%</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white/[0.03]">
                  <span className="text-slate-300">Other General Inquiries</span>
                  <span className="text-slate-400 font-bold">6%</span>
                </div>
              </div>
            </div>

            {/* Chart 3: Churn Risk */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Icon name="trendingUp" className="w-4 h-4 text-amber-400" />
                  Predictive Churn Risk
                </h4>
                <span className="text-[10px] font-mono text-slate-400">ML Forecast</span>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-emerald-400 font-semibold">Low Risk (Healthy)</span>
                    <span className="text-slate-300">75%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-amber-400 font-semibold">Medium Risk (Watch)</span>
                    <span className="text-slate-300">18%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '18%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-rose-400 font-semibold">High Risk (Action Needed)</span>
                    <span className="text-slate-300">7%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: '7%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center text-xs text-slate-400 font-mono border-t border-white/10 pt-4">
            ⚠️ Note: These are sample visualization values representing SupportIQ analytics dashboard interface.
          </div>

        </div>

      </div>
    </section>
  );
}

// --- CHURN PREDICTION SECTION COMPONENT ---
function ChurnPrediction() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              Proactive Customer Retention
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Predict Problems Before <span className="text-gradient">Customers Leave</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              SupportIQ turns customer interaction data into predictive insights, helping teams identify customers who may need attention before they leave.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-slate-200">
                <div className="p-1 rounded bg-rose-500/20 text-rose-400 mt-0.5">
                  <Icon name="alertTriangle" className="w-4 h-4" />
                </div>
                <span>Early detection of recurring dissatisfaction patterns</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-200">
                <div className="p-1 rounded bg-amber-500/20 text-amber-400 mt-0.5">
                  <Icon name="trendingUp" className="w-4 h-4" />
                </div>
                <span>Sentiment degradation scoring across touchpoints</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-200">
                <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                  <Icon name="check" className="w-4 h-4" />
                </div>
                <span>Automated retention triggers & VIP agent alerts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Risk Analysis Card */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-rose-500/30 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold font-mono">
                    CR
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Customer Risk Analysis</h3>
                    <div className="text-xs text-slate-400">Account #AC-49102 • Enterprise Plan</div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold animate-pulse">
                  HIGH RISK
                </span>
              </div>

              {/* Risk Indicators Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-xs text-slate-400 mb-1">Sentiment Trend</div>
                  <div className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                    <Icon name="smile" className="w-4 h-4" /> Negative (8.4/10)
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-xs text-slate-400 mb-1">Complaint Rate</div>
                  <div className="text-sm font-bold text-amber-400">High (4 in 14 days)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-xs text-slate-400 mb-1">Support Experience</div>
                  <div className="text-sm font-bold text-slate-300">Low Satisfaction</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-xs text-slate-400 mb-1">Recent Interactions</div>
                  <div className="text-sm font-bold text-brand-blue">Frequent (Unresolved)</div>
                </div>
              </div>

              {/* Risk Meter Visualizer */}
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 font-bold">Churn Probability Index</span>
                  <span className="text-rose-400 font-extrabold text-sm">89% (HIGH)</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
                  <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>

              <div className="mt-4 text-[11px] text-slate-400 font-mono text-center">
                * Predictive machine learning score generated from interaction telemetry.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// --- AI + HUMAN SUPPORT COMPONENT ---
function HumanEscalation() {
  return (
    <section className="py-24 bg-[#070B1E]/60 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20">
            Human-in-the-Loop Collaboration
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4">
            AI When It Can. <span className="text-gradient">Humans When It Matters.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            SupportIQ enhances human agents instead of replacing them, ensuring complex or emotionally sensitive cases receive immediate expert attention.
          </p>
        </div>

        {/* Visual Workflow Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="p-6 rounded-2xl glass-panel text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center font-mono font-bold">
              01
            </div>
            <h3 className="text-lg font-bold text-white">Customer Inquiry</h3>
            <p className="text-xs text-slate-300">Customer submits request via any supported text or voice channel.</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel text-center space-y-3 border-brand-violet/40">
            <div className="w-12 h-12 rounded-xl bg-brand-violet/20 text-brand-violet mx-auto flex items-center justify-center font-mono font-bold">
              02
            </div>
            <h3 className="text-lg font-bold text-white">AI Analysis & Triage</h3>
            <p className="text-xs text-slate-300">Intent, sentiment, and visual assets evaluated automatically in under 1 second.</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-mono font-bold">
              03
            </div>
            <h3 className="text-lg font-bold text-white">Smart Resolution Choice</h3>
            <p className="text-xs text-slate-300">Routine issues resolved by AI; complex cases escalated with pre-filled summary.</p>
          </div>

        </div>

        {/* Escalation Card Example */}
        <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl border border-white/15 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm font-bold text-white">Escalated to Human Support Agent</span>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">Priority: High</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400">Escalation Reason:</span>
              <div className="text-slate-200 font-semibold mt-0.5">Complex insurance claim with vehicle damage photo</div>
            </div>
            <div>
              <span className="text-slate-400">Assigned Agent Specialist:</span>
              <div className="text-brand-blue font-semibold mt-0.5">Sarah Jenkins (Claims Specialist Lead)</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
            <div className="text-xs font-mono text-brand-violet font-bold">AI GENERATED SUMMARY FOR AGENT:</div>
            <p className="text-xs text-slate-200 italic leading-relaxed">
              “Customer John Doe reported accident damage to vehicle, submitted front bumper photos, and exhibits high frustration sentiment score (8.9/10). Intent classified as Collision Claim. Pre-routed with policy history #IN-9082 attached.”
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// --- FINAL CTA COMPONENT ---
function FinalCTA({ openAuthModal }) {
  return (
    <section className="py-24 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-3xl glass-panel p-10 sm:p-16 border border-brand-violet/30 text-center relative overflow-hidden bg-gradient-to-br from-brand-violet/20 via-[#0A0F28] to-[#050716] shadow-2xl">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
              <Icon name="sparkles" className="w-3.5 h-3.5 text-brand-blue" />
              <span>Ready for Next-Gen Support?</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Make Customer Support <br />
              <span className="text-gradient">Intelligent.</span>
            </h2>

            <p className="text-lg text-slate-300 max-w-xl mx-auto">
              Understand faster. Resolve smarter. Retain customers longer.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => openAuthModal('started')}
                className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gradient-to-r from-brand-blue via-brand-violet to-brand-purple text-white font-semibold text-base shadow-xl shadow-brand-violet/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get Started
                <Icon name="arrowRight" className="w-5 h-5" />
              </button>

              <a 
                href="#capabilities"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-base transition-all"
              >
                Explore Features
              </a>
            </div>

            <div className="pt-4 text-xs text-slate-400 font-mono">
              ✦ Fast Integration • Enterprise Grade Security • 24/7 AI Availability
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// --- FOOTER COMPONENT ---
function Footer() {
  return (
    <footer className="bg-[#030510] border-t border-white/10 pt-16 pb-12 relative z-10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue to-brand-violet p-0.5">
                <div className="w-full h-full bg-[#070B1E] rounded-[6px] flex items-center justify-center">
                  <Icon name="sparkles" className="w-4 h-4 text-brand-blue" />
                </div>
              </div>
              <span className="font-bold text-xl text-white font-mono">
                Support<span className="text-gradient">IQ</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              AI-powered customer intelligence and support system for faster, smarter customer experiences and predictive churn retention.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#capabilities" className="hover:text-white transition-colors">AI Capabilities</a></li>
              <li><a href="#analytics" className="hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Support Portal</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div>© 2026 SupportIQ. All rights reserved.</div>
          <div>Intelligent Customer Intelligence Platform</div>
        </div>

      </div>
    </footer>
  );
}

// --- AUTH / GET STARTED MODAL COMPONENT ---
function AuthModal({ type, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-white/20 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5"
        >
          <Icon name="close" className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-brand-violet/20 border border-brand-violet/40 text-brand-blue mx-auto flex items-center justify-center mb-3">
                <Icon name="sparkles" className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {type === 'login' ? 'Login to SupportIQ' : 'Get Started with SupportIQ'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {type === 'login' ? 'Access your AI intelligence workspace' : 'Experience 24/7 AI-powered customer support'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Work Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue text-sm transition-colors"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet text-white font-semibold text-sm shadow-lg shadow-brand-violet/25 hover:opacity-95 transition-opacity"
              >
                {type === 'login' ? 'Sign In to Account →' : 'Create Free Trial Workspace →'}
              </button>
            </form>

            <div className="text-center text-xs text-slate-400">
              By proceeding you agree to SupportIQ Terms of Service.
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <Icon name="check" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Welcome to SupportIQ!</h3>
            <p className="text-xs text-slate-300">
              Workspace initialization link dispatched to <span className="text-brand-blue font-mono">{email}</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Render Main App to DOM
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
