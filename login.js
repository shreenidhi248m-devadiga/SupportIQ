// SupportIQ Dual-Role Login Application (Customer & Admin)
const { useState, useEffect } = React;

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
    smile: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    route: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
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
    user: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    arrowRight: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    ),
    arrowLeft: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    ),
    eye: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    eyeOff: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908A9.954 9.954 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-6.165-6.165a3 3 0 004.243 4.243M3 3l18 18" />
      </svg>
    ),
    lock: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    check: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    google: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    ),
    alertCircle: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };
  return icons[name] || icons.sparkles;
};

// --- MAIN LOGIN APPLICATION ---
function LoginApp() {
  const [role, setRole] = useState('customer'); // 'customer' | 'admin'
  const [isSignup, setIsSignup] = useState(false); // toggle Customer signup mode
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [fullName, setFullName] = useState('');
  
  // Status State
  const [loading, setLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState(null); // null | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  // Active step animation on left side
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflowStep((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setIsSignup(false);
    setAuthStatus(null);
    setStatusMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthStatus(null);

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      if (role === 'admin') {
        if (adminCode && adminCode.length < 4) {
          setAuthStatus('error');
          setStatusMessage('Invalid Admin Access Code. Code must be at least 4 characters.');
          return;
        }
        setAuthStatus('success');
        setStatusMessage('Admin Authorization Successful! Accessing SupportIQ Command Center...');
      } else {
        setAuthStatus('success');
        setStatusMessage(isSignup ? 'Account Created Successfully! Welcome to SupportIQ.' : 'Authentication Successful! Redirecting to Workspace...');
      }
    }, 1500);
  };

  const workflowSteps = [
    { title: "Customer Request", desc: "Omnichannel text, voice, or file", color: "border-blue-500/40 text-blue-400" },
    { title: "AI Understanding", desc: "Intent & entity classification", color: "border-purple-500/40 text-purple-400" },
    { title: "Sentiment Analysis", desc: "Tone & urgency evaluation", color: "border-rose-500/40 text-rose-400" },
    { title: "Smart Routing", desc: "Automated department dispatch", color: "border-cyan-500/40 text-cyan-400" },
    { title: "Intelligent Resolution", desc: "AI action or human escalation", color: "border-emerald-500/40 text-emerald-400" }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between relative z-10 px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Header Navigation Bar */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between py-4">
        <a href="index.html" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-violet to-brand-purple p-0.5 shadow-lg shadow-brand-violet/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#070B1E] rounded-[10px] flex items-center justify-center">
              <Icon name="sparkles" className="w-5 h-5 text-brand-blue" />
            </div>
          </div>
          <span className="font-bold text-xl tracking-tight text-white font-mono">
            Support<span className="text-gradient">IQ</span>
          </span>
        </a>

        <a 
          href="index.html" 
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all"
        >
          <Icon name="arrowLeft" className="w-3.5 h-3.5" />
          Back to SupportIQ Home
        </a>
      </header>

      {/* Main Split-Screen Container */}
      <main className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8 my-auto">
        
        {/* LEFT SIDE (55% desktop width): AI SaaS Environment */}
        <div className="lg:col-span-6 space-y-8 pr-0 lg:pr-6">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-blue text-xs font-semibold uppercase tracking-wider">
              <Icon name="sparkles" className="w-3.5 h-3.5 text-brand-blue" />
              <span>AI-Powered Customer Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Smarter Support <br />
              <span className="text-gradient">Starts Here.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Connect to your intelligent support workspace and experience faster, simpler customer service powered by real-time AI.
            </p>
          </div>

          {/* Animated AI Workflow Container */}
          <div className="p-6 rounded-2xl glass-panel border border-white/15 space-y-4 relative overflow-hidden backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-white/10">
              <span className="flex items-center gap-2 text-brand-blue font-bold">
                <Icon name="zap" className="w-4 h-4" /> SupportIQ Autonomous Pipeline
              </span>
              <span className="text-[10px] bg-brand-violet/20 text-brand-blue px-2 py-0.5 rounded border border-brand-violet/30">Active Engine</span>
            </div>

            <div className="space-y-2.5 relative">
              {workflowSteps.map((step, idx) => {
                const isActive = activeWorkflowStep === idx;
                return (
                  <div 
                    key={step.title}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all duration-300 ${
                      isActive 
                        ? `bg-white/[0.08] ${step.color} shadow-lg translate-x-1.5` 
                        : 'bg-white/[0.02] border-white/5 text-slate-400 opacity-65'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-full font-mono flex items-center justify-center text-[10px] font-bold ${
                        isActive ? 'bg-brand-violet/30 text-white' : 'bg-white/5 text-slate-400'
                      }`}>
                        0{idx + 1}
                      </span>
                      <span className="font-semibold">{step.title}</span>
                    </div>
                    <span className="font-mono text-[11px] opacity-80">{step.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floating Glass AI Cards Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl glass-panel border border-white/10 flex items-center gap-3 animate-float">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <Icon name="brain" className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">🧠 AI Understanding</div>
                <div className="text-[11px] text-slate-400">Intent detected</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl glass-panel border border-white/10 flex items-center gap-3 animate-float-delayed">
              <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                <Icon name="smile" className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">😊 Sentiment</div>
                <div className="text-[11px] text-slate-400">Emotion analyzed</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl glass-panel border border-white/10 flex items-center gap-3 animate-float-delayed">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Icon name="route" className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">🎯 Smart Routing</div>
                <div className="text-[11px] text-slate-400">Department identified</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl glass-panel border border-white/10 flex items-center gap-3 animate-float">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Icon name="zap" className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">⚡ AI Response</div>
                <div className="text-[11px] text-slate-400">Ready to respond</div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE (45% desktop width): Glassmorphism Login Card */}
        <div className="lg:col-span-6">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
            
            {/* Ambient Corner Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-violet/30 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {role === 'admin' ? 'Admin Access' : isSignup ? 'Create SupportIQ Account' : 'Welcome to SupportIQ'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                {role === 'admin' 
                  ? 'Sign in to manage your SupportIQ platform & telemetry' 
                  : isSignup 
                  ? 'Start managing support requests with AI in seconds' 
                  : 'Sign in to access your intelligent workspace'}
              </p>
            </div>

            {/* Segmented Role Selector */}
            <div className="p-1 rounded-xl bg-white/[0.04] border border-white/10 grid grid-cols-2 gap-1 mb-8">
              <button
                type="button"
                onClick={() => handleRoleChange('customer')}
                className={`py-3 px-4 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  role === 'customer'
                    ? 'bg-gradient-to-r from-brand-blue to-brand-violet text-white shadow-lg shadow-brand-violet/25 font-bold border border-white/20 scale-[1.01]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon name="user" className="w-4 h-4" />
                Customer
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`py-3 px-4 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  role === 'admin'
                    ? 'bg-gradient-to-r from-brand-violet to-brand-purple text-white shadow-lg shadow-brand-purple/25 font-bold border border-white/20 scale-[1.01]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon name="shield" className="w-4 h-4" />
                Admin
              </button>
            </div>

            {/* Sub-badge description tag for selected role */}
            <div className="mb-6 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs flex items-center gap-2 text-slate-300">
              {role === 'customer' ? (
                <>
                  <span className="p-1.5 rounded bg-brand-blue/20 text-brand-blue font-bold">👤 Customer</span>
                  <span>Manage your support requests, claims, & AI chat history.</span>
                </>
              ) : (
                <>
                  <span className="p-1.5 rounded bg-brand-violet/20 text-brand-violet font-bold">🛡 Admin</span>
                  <span>Access system routing policies, sentiment analytics & security controls.</span>
                </>
              )}
            </div>

            {/* Dynamic Login / Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name field (Only during Customer signup mode) */}
              {role === 'customer' && isSignup && (
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue text-sm transition-colors"
                  />
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  {role === 'admin' ? 'Admin Email' : 'Email Address'}
                </label>
                <input
                  type="email"
                  required
                  placeholder={role === 'admin' ? 'Enter administrator email' : 'Enter your email address'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue text-sm transition-colors"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue text-sm pr-11 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    aria-label="Toggle password visibility"
                  >
                    <Icon name={showPassword ? "eyeOff" : "eye"} className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Admin Access Code Field (Only shown when Admin is selected) */}
              {role === 'admin' && (
                <div className="animate-fade-in">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1">
                      <Icon name="lock" className="w-3.5 h-3.5 text-brand-violet" />
                      Admin Access Code
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">Security Token</span>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter secure access code (e.g. ADM-9082)"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-brand-violet/30 text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple text-sm font-mono tracking-wider transition-colors"
                  />
                </div>
              )}

              {/* Options Row: Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-white/10 border-white/20 text-brand-violet focus:ring-0 cursor-pointer accent-brand-violet"
                  />
                  <span>{role === 'admin' ? 'Remember this device' : 'Remember me'}</span>
                </label>

                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link sent to your registered email."); }} className="text-brand-blue hover:text-white font-medium transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl text-white font-semibold text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  role === 'admin'
                    ? 'bg-gradient-to-r from-brand-violet to-brand-purple shadow-brand-purple/30 hover:scale-[1.01]'
                    : 'bg-gradient-to-r from-brand-blue via-brand-violet to-brand-purple shadow-brand-violet/30 hover:scale-[1.01]'
                }`}
              >
                {loading ? (
                  <>
                    <Icon name="zap" className="w-4 h-4 animate-spin" />
                    Authenticating...
                  </>
                ) : role === 'admin' ? (
                  <>
                    Access Admin Panel
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </>
                ) : isSignup ? (
                  <>
                    Create SupportIQ Account
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Sign In
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Status Message Notification */}
              {authStatus === 'success' && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2.5 animate-fade-in">
                  <Icon name="check" className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {authStatus === 'error' && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-medium flex items-center gap-2.5 animate-fade-in">
                  <Icon name="alertCircle" className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Customer Social SSO Login & Account Toggle (Only shown for Customer role) */}
              {role === 'customer' && (
                <>
                  <div className="relative py-2 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                    <span className="relative px-3 bg-[#0A0F24] text-[11px] font-mono text-slate-400 uppercase">or continue with</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                        setAuthStatus('success');
                        setStatusMessage('Google OAuth Authorized! Signing in...');
                      }, 1200);
                    }}
                    className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-medium text-xs flex items-center justify-center gap-3 transition-colors"
                  >
                    <Icon name="google" className="w-4 h-4" />
                    Continue with Google
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSignup(!isSignup)}
                      className="text-xs text-slate-300 hover:text-white transition-colors"
                    >
                      {isSignup ? (
                        <>Already have an account? <span className="text-brand-blue font-bold underline">Sign In</span></>
                      ) : (
                        <>New to SupportIQ? <span className="text-brand-blue font-bold underline">Create an account</span></>
                      )}
                    </button>
                  </div>
                </>
              )}

              {/* Admin Security Indicator */}
              {role === 'admin' && (
                <div className="pt-3 border-t border-white/10 text-center flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
                  <Icon name="shield" className="w-4 h-4 text-brand-violet" />
                  <span>🛡 Secure Admin Access • Encrypted Telemetry Session</span>
                </div>
              )}

            </form>

          </div>
        </div>

      </main>

      {/* Page Footer */}
      <footer className="max-w-7xl mx-auto w-full py-4 text-center text-xs text-slate-500 font-mono border-t border-white/5">
        © 2026 SupportIQ. All rights reserved. • Enterprise Customer Intelligence System
      </footer>

    </div>
  );
}

// Render Login App to DOM
ReactDOM.createRoot(document.getElementById('login-root')).render(<LoginApp />);
