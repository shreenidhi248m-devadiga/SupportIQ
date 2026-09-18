import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Server, 
  Database, 
  Activity, 
  Lock, 
  FileKey, 
  UserCheck, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Terminal,
  ActivitySquare
} from 'lucide-react';

type HealthStatus = 'checking' | 'healthy' | 'warning' | 'critical';

interface SystemMetric {
  id: string;
  name: string;
  status: HealthStatus;
  message: string;
  icon: React.ReactNode;
  latency?: number;
}

export const SecurityDashboardPage: React.FC = () => {
  const [overallStatus, setOverallStatus] = useState<HealthStatus>('checking');
  
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { id: 'app', name: 'Application Core', status: 'checking', message: 'Verifying core services...', icon: <Activity className="w-5 h-5" /> },
    { id: 'api', name: 'API Gateway', status: 'checking', message: 'Pinging endpoints...', icon: <Server className="w-5 h-5" /> },
    { id: 'db', name: 'Database Connectivity', status: 'checking', message: 'Checking read/write...', icon: <Database className="w-5 h-5" /> },
    { id: 'ai', name: 'AI Services (LLM)', status: 'checking', message: 'Validating model inference...', icon: <ActivitySquare className="w-5 h-5" /> },
  ]);

  const [securityControls, setSecurityControls] = useState([
    { id: 'auth', name: 'Authentication (JWT)', status: 'checking', icon: <Lock className="w-5 h-5" /> },
    { id: 'rbac', name: 'Role-Based Access', status: 'checking', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'upload', name: 'File Upload Scanner', status: 'checking', icon: <FileKey className="w-5 h-5" /> },
  ]);

  // Simulate health checks
  useEffect(() => {
    const runChecks = async () => {
      // Simulate delay for realism
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMetrics([
        { id: 'app', name: 'Application Core', status: 'healthy', message: 'Operational', latency: 45, icon: <Activity className="w-5 h-5" /> },
        { id: 'api', name: 'API Gateway', status: 'healthy', message: 'Operational', latency: 32, icon: <Server className="w-5 h-5" /> },
        { id: 'db', name: 'Database Connectivity', status: 'healthy', message: 'Operational', latency: 12, icon: <Database className="w-5 h-5" /> },
        { id: 'ai', name: 'AI Services (LLM)', status: 'healthy', message: 'Operational', latency: 215, icon: <ActivitySquare className="w-5 h-5" /> },
      ]);

      setSecurityControls([
        { id: 'auth', name: 'Authentication (JWT)', status: 'healthy', icon: <Lock className="w-5 h-5" /> },
        { id: 'rbac', name: 'Role-Based Access', status: 'healthy', icon: <UserCheck className="w-5 h-5" /> },
        { id: 'upload', name: 'File Upload Scanner', status: 'healthy', icon: <FileKey className="w-5 h-5" /> },
      ]);
      
      setOverallStatus('healthy');
    };

    runChecks();
  }, []);

  const getStatusColor = (status: HealthStatus) => {
    switch(status) {
      case 'healthy': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'warning': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'critical': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  const getStatusIcon = (status: HealthStatus) => {
    switch(status) {
      case 'healthy': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'critical': return <XCircle className="w-5 h-5 text-rose-400" />;
      default: return <RefreshCw className="w-5 h-5 text-brand-blue animate-spin" />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-brand-violet" />
            Security & System Health
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Monitor SupportIQ's application health, security controls, and quality checks from one centralized workspace.
          </p>
        </div>
        
        <div className={`flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 shadow-lg backdrop-blur-md transition-all duration-500
          ${overallStatus === 'healthy' ? 'bg-emerald-500/10 shadow-emerald-500/5' : 'bg-slate-800'}`}>
          {overallStatus === 'healthy' && (
            <>
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-emerald-400 tracking-wide">System Operational</span>
            </>
          )}
          {overallStatus === 'checking' && (
            <>
              <RefreshCw className="w-5 h-5 text-brand-blue animate-spin" />
              <span className="font-semibold text-slate-300 tracking-wide">Running Diagnostics...</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Core Infrastructure Health */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-white border-l-4 border-brand-blue pl-3">Infrastructure Health</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map(metric => (
              <div key={metric.id} className="bg-white/[0.02] border border-white/10 rounded-xl p-5 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  {getStatusIcon(metric.status)}
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg border ${getStatusColor(metric.status)}`}>
                    {metric.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{metric.name}</h3>
                    <p className="text-sm text-slate-400">{metric.message}</p>
                  </div>
                </div>
                
                {metric.latency !== undefined && metric.status === 'healthy' && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-mono">LATENCY</span>
                    <span className="text-emerald-400/80 font-mono bg-emerald-400/10 px-2 py-1 rounded">{metric.latency}ms</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security Controls */}
        <div className="space-y-6">
           <h2 className="text-xl font-semibold text-white border-l-4 border-brand-violet pl-3">Security Controls</h2>
           <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
              <div className="space-y-6">
                {securityControls.map(control => (
                  <div key={control.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-slate-400">
                        {control.icon}
                      </div>
                      <span className="text-slate-200">{control.name}</span>
                    </div>
                    {getStatusIcon(control.status)}
                  </div>
                ))}
              </div>
           </div>

           {/* Deployment Readiness */}
           <h2 className="text-xl font-semibold text-white border-l-4 border-amber-500 pl-3 mt-8">Deployment Readiness</h2>
           <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-6 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2 mb-4 text-slate-500">
                <Terminal className="w-4 h-4" />
                <span>Automated Test Results</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-400">PASS</span>
                  <span>Unit Tests (142/142)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-400">PASS</span>
                  <span>Integration (38/38)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-400">PASS</span>
                  <span>E2E Workflows (12/12)</span>
                </div>
                <div className="h-px bg-slate-800 my-3" />
                <div className="flex justify-between text-slate-400">
                  <span>Code Coverage</span>
                  <span>94.2%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>System Errors (24h)</span>
                  <span className="text-emerald-400">0</span>
                </div>
              </div>
           </div>
        </div>

      </div>

      {/* Security Event Log */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white border-l-4 border-rose-500 pl-3 mb-6">Recent Security Events</h2>
        <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/20 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">Event Type</th>
                <th className="px-6 py-4 font-medium">Source IP</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr className="hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-mono text-xs text-slate-500">2026-09-18 08:42:12</td>
                <td className="px-6 py-4">Admin Login (Successful)</td>
                <td className="px-6 py-4 font-mono text-xs">192.168.1.105</td>
                <td className="px-6 py-4"><span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs">Success</span></td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-mono text-xs text-slate-500">2026-09-18 07:15:33</td>
                <td className="px-6 py-4">API Key Rotation</td>
                <td className="px-6 py-4 font-mono text-xs">System</td>
                <td className="px-6 py-4"><span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs">Success</span></td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-mono text-xs text-slate-500">2026-09-17 23:51:09</td>
                <td className="px-6 py-4 text-amber-400">Failed Login Attempt</td>
                <td className="px-6 py-4 font-mono text-xs text-amber-400/70">45.22.109.11</td>
                <td className="px-6 py-4"><span className="text-amber-400 bg-amber-400/10 px-2 py-1 rounded text-xs">Blocked</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default SecurityDashboardPage;
