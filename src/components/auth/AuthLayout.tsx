import React from 'react';
import BrandPanel from './BrandPanel';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#040612] relative overflow-hidden">
      {/* Background grid overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

      {/* Main card container */}
      <div className="w-full max-w-5xl rounded-3xl bg-slate-900/70 border border-white/10 shadow-2xl backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative z-10">
        
        {/* Left Side: Brand & AI Visuals (Hidden on mobile, 5 cols on lg) */}
        <div className="hidden lg:block lg:col-span-5 bg-gradient-to-b from-slate-950/90 to-slate-900/90 border-r border-white/10">
          <BrandPanel />
        </div>

        {/* Right Side: Auth Form Container (12 cols on mobile, 7 cols on lg) */}
        <div className="col-span-1 lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
