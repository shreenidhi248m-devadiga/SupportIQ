import React, { useState, useEffect } from 'react';
import { 
  Rocket, Server, ShieldCheck, Database, CheckCircle2, 
  XCircle, Clock, AlertTriangle, RefreshCw, Terminal, History, ChevronRight
} from 'lucide-react';
import api from '../services/api';

export const DeploymentPage: React.FC = () => {
  const [statusData, setStatusData] = useState<any>(null);
  const [readinessData, setReadinessData] = useState<any>(null);
  const [healthData, setHealthData] = useState<any>(null);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [deploying, setDeploying] = useState(false);
  const [deployStage, setDeployStage] = useState(0);

  const fetchDeploymentData = async () => {
    setLoading(true);
    try {
      const [statusRes, readinessRes, healthRes, historyRes] = await Promise.all([
        api.get('/admin/deployment/status'),
        api.get('/admin/deployment/readiness'),
        api.get('/admin/deployment/system-health'),
        api.get('/admin/deployment/history')
      ]);
      
      setStatusData(statusRes.data);
      setReadinessData(readinessRes.data);
      setHealthData(healthRes.data);
      setHistoryData(historyRes.data);
    } catch (error) {
      console.error('Failed to fetch deployment data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeploymentData();
  }, []);

  const handleDeploy = async () => {
    if (!window.confirm('Deploy to Production?\n\nCurrent: v1.4.2\nTarget: Latest Build\n\nThis action will affect the production environment.')) return;
    
    setDeploying(true);
    setDeployStage(1);
    
    setTimeout(() => setDeployStage(2), 2000); // Validate
    setTimeout(() => setDeployStage(3), 4000); // Build
    setTimeout(() => setDeployStage(4), 7000); // Deploy
    setTimeout(() => setDeployStage(5), 9000); // Verify
    
    setTimeout(async () => {
      await api.post('/admin/deployment/deploy');
      setDeployStage(6); // Live
      setTimeout(() => {
        setDeploying(false);
        fetchDeploymentData(); // Refresh state
      }, 3000);
    }, 11000);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#040612]">
        <RefreshCw className="w-8 h-8 text-brand-blue animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040612] text-slate-200 p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Rocket className="w-8 h-8 text-brand-blue" />
              Deployment & Production Center
            </h1>
            <p className="text-slate-400 mt-2">Manage releases, verify production readiness, and monitor SupportIQ services.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Production
            </div>
            <button 
              onClick={fetchDeploymentData}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Status Hero */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Server className="w-32 h-32" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-6">Production Status</h2>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-emerald-400">System Operational</h3>
                  <p className="text-slate-400">SupportIQ is running normally in production.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Version</p>
                  <p className="font-mono text-lg text-white">{statusData?.version}</p>
                </div>
                <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Uptime</p>
                  <p className="font-mono text-lg text-white">{statusData?.uptime}</p>
                </div>
                <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Last Deploy</p>
                  <p className="font-mono text-sm text-white">
                    {new Date(statusData?.lastDeployment).toLocaleTimeString()}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Duration</p>
                  <p className="font-mono text-lg text-white">{statusData?.deploymentTime}</p>
                </div>
              </div>
            </div>

            {/* Pipeline & Deploy */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Deployment Pipeline</h2>
                <button
                  onClick={handleDeploy}
                  disabled={deploying}
                  className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deploying ? 'Deploying...' : 'Deploy to Production'}
                </button>
              </div>

              <div className="flex items-center justify-between relative px-4">
                <div className="absolute left-10 right-10 top-1/2 h-0.5 bg-slate-700 -z-10 -translate-y-1/2"></div>
                
                {['Prepare', 'Validate', 'Build', 'Deploy', 'Verify', 'Live'].map((step, index) => {
                  const stepNum = index + 1;
                  const isActive = deploying && deployStage === stepNum;
                  const isDone = deploying ? deployStage > stepNum : true;
                  
                  return (
                    <div key={step} className="flex flex-col items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2
                        ${isActive ? 'bg-brand-blue border-brand-blue text-white animate-pulse' : 
                          isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 
                          'bg-slate-800 border-slate-600 text-slate-400'}`}>
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
                      </div>
                      <span className={`text-sm font-medium ${isActive ? 'text-brand-blue' : isDone ? 'text-slate-300' : 'text-slate-500'}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Readiness */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Production Readiness</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {readinessData && Object.entries(readinessData).map(([category, items]: [string, any]) => (
                  <div key={category} className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
                    <h3 className="font-semibold text-white capitalize mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-violet" />
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <ul className="space-y-3">
                      {items.map((item: any, idx: number) => (
                        <li key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">{item.name}</span>
                          <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded text-xs">
                            <CheckCircle2 className="w-3 h-3" /> {item.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            
            {/* Service Health */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Production Services</h2>
              <div className="space-y-4">
                
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-white">Backend API</span>
                    <span className="text-emerald-400 text-xs px-2 py-1 bg-emerald-400/10 rounded">Operational</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-slate-500">
                    <span>Response Time</span>
                    <span>{healthData?.backendAPI.responseTime}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-white">MongoDB</span>
                    <span className="text-emerald-400 text-xs px-2 py-1 bg-emerald-400/10 rounded">Operational</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-slate-500">
                    <span>Latency</span>
                    <span>{healthData?.mongoDB.latency}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-white">AI Services</span>
                    <span className="text-emerald-400 text-xs px-2 py-1 bg-emerald-400/10 rounded">Operational</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-slate-500">
                    <span>Models Loaded</span>
                    <span>6/6</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Deployment History */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <History className="w-5 h-5" /> Recent Deployments
              </h2>
              <div className="space-y-4">
                {historyData.slice(0, 3).map((dep) => (
                  <div key={dep.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                    <div className="mt-1">
                      {dep.status === 'Successful' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-sm font-bold text-white">{dep.version}</span>
                        <span className="text-xs text-slate-500">{new Date(dep.started).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-slate-400">{dep.deployedBy}</span>
                        <span className="font-mono text-[10px] text-slate-500">#{dep.commit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Config Check */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
               <h2 className="text-lg font-semibold text-white mb-4">Environment Config</h2>
               <div className="space-y-3 font-mono text-xs">
                 <div className="flex justify-between items-center">
                   <span className="text-slate-400">NODE_ENV</span>
                   <span className="text-emerald-400">production</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-slate-400">JWT_SECRET</span>
                   <span className="text-emerald-400">••••••••</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-slate-400">MONGO_URI</span>
                   <span className="text-emerald-400">••••••••</span>
                 </div>
               </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DeploymentPage;
