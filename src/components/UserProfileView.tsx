import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Shield, Activity, Terminal, Key, Lock, Check, RefreshCw, 
  Sliders, Globe, Laptop, Server, Clock, Edit2, Save, FileText, 
  CheckCircle2, Zap, AlertCircle, Copy, CheckCircle, ArrowLeft
} from 'lucide-react';

interface UserProfileViewProps {
  userEmail: string;
  onLogout: () => void;
  onUpdateEmail: (email: string) => void;
  onBack?: () => void;
}

export default function UserProfileView({ userEmail, onLogout, onUpdateEmail, onBack }: UserProfileViewProps) {
  // Account Information States
  const [analystName, setAnalystName] = useState('Helen Vance, Ph.D.');
  const [analystRole, setAnalystRole] = useState('Principal SOC Threat Investigator');
  const [emailInput, setEmailInput] = useState(userEmail);
  const [nodeLocation, setNodeLocation] = useState('Bengaluru SecOps Hub - Rack E4');
  const [isEditing, setIsEditing] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  // Profile preferences
  const [activeTab, setActiveTab] = useState<'overview' | 'credentials' | 'audit' | 'settings'>('overview');
  
  // Interactive Credentials states
  const [localToken, setLocalToken] = useState('aw_live_9042b10098a58f921d3e2d8479e390c2a');
  const [sensorStatus, setSensorStatus] = useState<'active' | 'generating'>('active');
  const [copiedToken, setCopiedToken] = useState(false);

  // Security Verification status checklist states
  const [endpointVerification, setEndpointVerification] = useState(true);
  const [firewallActive, setFirewallActive] = useState(true);
  const [secureVpn, setSecureVpn] = useState(true);
  const [mfaStatus, setMfaStatus] = useState(true);

  // Dynamic audit logs state
  const [auditLogs, setAuditLogs] = useState<Array<{ id: string; timestamp: string; action: string; category: string }>>([
    { id: '1', timestamp: '2026-07-16T14:32:01Z', action: 'User session initialized successfully', category: 'AUTH' },
    { id: '2', timestamp: '2026-07-16T14:35:10Z', action: 'Audited Threat Incident INC-2026-004', category: 'AUDIT' },
    { id: '3', timestamp: '2026-07-16T14:55:42Z', action: 'Generated Causal Graph Visualizations', category: 'SYSTEM' },
    { id: '4', timestamp: '2026-07-16T15:02:15Z', action: 'Refreshed active MITRE ATT&CK framework data', category: 'THREAT' },
  ]);

  // Handle temporary alert message helper
  const triggerAlert = (text: string, type: 'success' | 'info' = 'success') => {
    setAlertMessage({ text, type });
    setTimeout(() => {
      setAlertMessage(null);
    }, 4000);
  };

  // Profile Form Saver
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      triggerAlert('Please provide a valid corporate principal email.', 'info');
      return;
    }
    onUpdateEmail(emailInput);
    setIsEditing(false);
    
    // Add audit log for this update
    const newLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action: `Profile updated: Principal identifier changed to ${emailInput}`,
      category: 'AUTH'
    };
    setAuditLogs([newLog, ...auditLogs]);
    triggerAlert('Analyst security identity updated successfully.');
  };

  // Roll API Tokens
  const handleRegenerateToken = () => {
    setSensorStatus('generating');
    setTimeout(() => {
      const generated = 'aw_live_' + Array.from({ length: 32 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      setLocalToken(generated);
      setSensorStatus('active');
      
      const newLog = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        action: 'Rolled over active local sensor integration secret token',
        category: 'CREDENTIALS'
      };
      setAuditLogs([newLog, ...auditLogs]);
      triggerAlert('Local sensor integration token rolled over.');
    }, 1200);
  };

  // Copy API Token to Clipboard
  const handleCopyToken = () => {
    navigator.clipboard.writeText(localToken);
    setCopiedToken(true);
    triggerAlert('Sensor integration token copied to clipboard.');
    setTimeout(() => setCopiedToken(false), 2000);
  };

  // Interactive diagnostic helper
  const runSelfDiagnostic = () => {
    const newLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action: 'Triggered manual self-diagnostic sweep. Secure core reports 100% integrity.',
      category: 'DIAGNOSTIC'
    };
    setAuditLogs([newLog, ...auditLogs]);
    triggerAlert('Endpoint defense sweep completed. Zero compromises detected.', 'success');
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Welcome Title Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded-lg border border-white/5 text-cyber-blue hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-2.5">
            <User className="w-8 h-8 text-cyber-blue" />
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                Analyst Identity Command
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-wider">
                Review authorized credentials, SOC statistics, and physical node telemetry
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 hover:border-rose-500 text-rose-400 hover:text-slate-950 font-bold font-mono text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer self-stretch md:self-auto justify-center"
        >
          <Lock className="w-4 h-4" />
          Terminate Session
        </button>
      </div>

      {/* Floating System Notification Banner */}
      <AnimatePresence>
        {alertMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`p-4 rounded-xl border flex items-center gap-3 font-mono text-xs ${
              alertMessage.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-cyber-blue/10 border-cyber-blue/30 text-cyber-blue'
            }`}
          >
            {alertMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span className="flex-1">{alertMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Overview Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Core Identity Card */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-[#0A0E1A]/85 rounded-2xl border border-white/10 overflow-hidden shadow-xl relative">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyber-blue to-cyber-purple" />
            
            {/* User Avatar details */}
            <div className="p-6 text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyber-blue to-cyber-purple p-[1px] shadow-lg">
                  <div className="w-full h-full rounded-2xl bg-[#0d1226] flex items-center justify-center font-display font-bold text-3xl text-white">
                    {analystName.split(' ').map(n => n[0]).filter(c => c !== 'P' && c !== 'D').slice(0, 2).join('') || 'HV'}
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0A0E1A] animate-pulse" title="MFA Authenticated Session" />
              </div>

              <div className="space-y-1">
                <h2 className="text-lg font-display font-bold text-white">{analystName}</h2>
                <span className="inline-block px-2.5 py-0.5 bg-cyber-blue/10 border border-cyber-blue/20 rounded-full text-[10px] font-mono font-bold uppercase text-cyber-blue">
                  {analystRole}
                </span>
              </div>

              <div className="h-px bg-white/5 pt-2" />

              {/* Physical Telemetry */}
              <div className="space-y-2.5 text-left font-mono text-[11px] text-slate-400">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-500 uppercase">ACCESS AUTHORITY</span>
                  <span className="text-cyber-purple font-bold">LEVEL_3_ADMIN</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-500 uppercase">TELEMETRY NODE</span>
                  <span className="text-white font-medium truncate max-w-[140px]" title={nodeLocation}>{nodeLocation}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 uppercase">IP INGRESS</span>
                  <span className="text-white">172.56.88.190</span>
                </div>
              </div>
            </div>
          </div>

          {/* Endpoint Security Health posture checklist */}
          <div className="bg-[#0A0E1A]/60 rounded-2xl border border-white/5 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wide">SECURE DEVICE POSTURE</h3>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10 font-bold uppercase">COMPLIANT</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-cyber-blue" />
                  <span className="text-slate-300">Endpoint Protection</span>
                </div>
                <button 
                  onClick={() => {
                    setEndpointVerification(!endpointVerification);
                    triggerAlert(`Endpoint protection simulation toggled to ${!endpointVerification ? 'ON' : 'OFF'}.`, 'info');
                  }}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${endpointVerification ? 'bg-emerald-500' : 'bg-slate-800'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${endpointVerification ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyber-purple" />
                  <span className="text-slate-300">Firewall Rules Compliance</span>
                </div>
                <button 
                  onClick={() => {
                    setFirewallActive(!firewallActive);
                    triggerAlert(`Firewall filter checks ${!firewallActive ? 'ACTIVE' : 'DEACTIVATED'}.`, 'info');
                  }}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${firewallActive ? 'bg-emerald-500' : 'bg-slate-800'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${firewallActive ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyber-blue" />
                  <span className="text-slate-300">Dedicated Sovereign VPN</span>
                </div>
                <button 
                  onClick={() => {
                    setSecureVpn(!secureVpn);
                    triggerAlert(`VPN channel tunnel connection state updated.`, 'info');
                  }}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${secureVpn ? 'bg-emerald-500' : 'bg-slate-800'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${secureVpn ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-pink-400" />
                  <span className="text-slate-300">Biometric MFA Active</span>
                </div>
                <button 
                  onClick={() => {
                    setMfaStatus(!mfaStatus);
                    triggerAlert(`MFA authentication requirement updated.`, 'info');
                  }}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${mfaStatus ? 'bg-emerald-500' : 'bg-slate-800'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${mfaStatus ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>

            <button 
              onClick={runSelfDiagnostic}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-white/5 font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Activity className="w-3.5 h-3.5 text-cyber-blue animate-pulse" />
              Trigger Core Diagnostics Sweep
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Tab View */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Selection */}
          <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-4 text-xs font-mono font-bold tracking-wider uppercase transition-all relative cursor-pointer shrink-0 ${
                activeTab === 'overview' ? 'text-cyber-blue' : 'text-slate-400 hover:text-white'
              }`}
            >
              Overview & Analytics
              {activeTab === 'overview' && (
                <motion.div layoutId="profileTabBorder" className="absolute bottom-0 inset-x-0 h-0.5 bg-cyber-blue" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('credentials')}
              className={`pb-3 px-4 text-xs font-mono font-bold tracking-wider uppercase transition-all relative cursor-pointer shrink-0 ${
                activeTab === 'credentials' ? 'text-cyber-blue' : 'text-slate-400 hover:text-white'
              }`}
            >
              Security Credentials
              {activeTab === 'credentials' && (
                <motion.div layoutId="profileTabBorder" className="absolute bottom-0 inset-x-0 h-0.5 bg-cyber-blue" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`pb-3 px-4 text-xs font-mono font-bold tracking-wider uppercase transition-all relative cursor-pointer shrink-0 ${
                activeTab === 'audit' ? 'text-cyber-blue' : 'text-slate-400 hover:text-white'
              }`}
            >
              Console Activity Logs
              {activeTab === 'audit' && (
                <motion.div layoutId="profileTabBorder" className="absolute bottom-0 inset-x-0 h-0.5 bg-cyber-blue" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-3 px-4 text-xs font-mono font-bold tracking-wider uppercase transition-all relative cursor-pointer shrink-0 ${
                activeTab === 'settings' ? 'text-cyber-blue' : 'text-slate-400 hover:text-white'
              }`}
            >
              Manage Account
              {activeTab === 'settings' && (
                <motion.div layoutId="profileTabBorder" className="absolute bottom-0 inset-x-0 h-0.5 bg-cyber-blue" />
              )}
            </button>
          </div>

          {/* TAB CONTENT SPACES */}
          <div className="min-h-[400px]">
            
            {/* TAB 1: OVERVIEW & ANALYTICS */}
            {activeTab === 'overview' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 text-left"
              >
                {/* Bento Grid Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5 text-left space-y-2">
                    <span className="block font-mono text-[9px] text-slate-500 uppercase font-bold">Resolved Threats</span>
                    <span className="block font-display font-bold text-2xl text-white">42</span>
                    <span className="block font-mono text-[8px] text-cyber-green font-bold">✓ 100% SUCCESS RATE</span>
                  </div>

                  <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5 text-left space-y-2">
                    <span className="block font-mono text-[9px] text-slate-500 uppercase font-bold">Causal Nodes Audited</span>
                    <span className="block font-display font-bold text-2xl text-cyber-blue">1,840</span>
                    <span className="block font-mono text-[8px] text-slate-400">LAST SYNC 1M AGO</span>
                  </div>

                  <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5 text-left space-y-2">
                    <span className="block font-mono text-[9px] text-slate-500 uppercase font-bold">Mean Response Time</span>
                    <span className="block font-display font-bold text-2xl text-white">14.5<span className="text-xs font-medium text-slate-500">m</span></span>
                    <span className="block font-mono text-[8px] text-cyber-purple font-bold">▲ SLOWER BY 2%</span>
                  </div>

                  <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5 text-left space-y-2">
                    <span className="block font-mono text-[9px] text-slate-500 uppercase font-bold">Incident Ownership</span>
                    <span className="block font-display font-bold text-2xl text-cyber-purple">8</span>
                    <span className="block font-mono text-[8px] text-cyber-blue font-bold">ACTIVE CASES IN QUEUE</span>
                  </div>
                </div>

                {/* Analyst Bio, Focus areas, etc. */}
                <div className="bg-[#0A0E1A]/40 rounded-2xl border border-white/5 p-6 space-y-4">
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-cyber-blue" />
                    Analyst Bio & Security Mandate
                  </h3>
                  
                  <div className="text-slate-300 text-xs leading-relaxed space-y-3 font-sans">
                    <p>
                      Dr. Helen Vance manages causal lineage correlation protocols at the Sovereign Bengaluru node. With over twelve years of experience mapping root cause execution structures, she specializes in lateral movement neutralization, air-gapped protection arrays, and deep memory diagnostics on high-profile corporate domains.
                    </p>
                    <p className="text-slate-400 italic">
                      &quot;Security operations are failing due to deafening alert floods. My focus is deploying the AlertWeave hypergraph engine to synthesize chronological stories, turning millions of warnings into simple threat lineages.&quot;
                    </p>
                  </div>
                </div>

                {/* Sub-Specializations Visual Badges */}
                <div className="bg-[#0A0E1A]/40 rounded-2xl border border-white/5 p-6 space-y-4">
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">THREAT COGNITIVE SPECIALIZATION MATRIX</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 space-y-1">
                      <span className="block text-[10px] text-white font-bold">LATERAL MOVEMENT HUNTER</span>
                      <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-cyber-blue rounded-full" style={{ width: '92%' }} />
                      </div>
                      <span className="block text-[8px] font-mono text-slate-500 text-right">92% PROFICIENCY</span>
                    </div>

                    <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 space-y-1">
                      <span className="block text-[10px] text-white font-bold">WINDOWS KERNEL MALWARE</span>
                      <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-cyber-purple rounded-full" style={{ width: '85%' }} />
                      </div>
                      <span className="block text-[8px] font-mono text-slate-500 text-right">85% PROFICIENCY</span>
                    </div>

                    <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 space-y-1">
                      <span className="block text-[10px] text-white font-bold">RANSOMWARE PRE-EMPTION</span>
                      <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-cyber-blue rounded-full" style={{ width: '95%' }} />
                      </div>
                      <span className="block text-[8px] font-mono text-slate-500 text-right">95% PROFICIENCY</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: SECURITY CREDENTIALS & TOKENS */}
            {activeTab === 'credentials' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 text-left"
              >
                <div className="bg-[#0A0E1A]/40 rounded-2xl border border-white/5 p-6 space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                      <Key className="w-4 h-4 text-cyber-blue" />
                      API Integration Key Principal
                    </h3>
                    <p className="text-[10px] font-mono text-slate-500">
                      USE THIS SYMMETRIC TOKEN TO INITIALIZE SENSORS ON EXTERNAL HOSTS (SERVER/VM AGENTS)
                    </p>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-4 bg-slate-950 rounded-xl border border-white/10 space-y-2 relative">
                      <div className="flex justify-between items-center text-[9px] text-slate-500">
                        <span>SOVEREIGN CLOUD SYMMETRIC SECRET</span>
                        <span>SHA256 SYMMETRIC SECURE KEY</span>
                      </div>
                      <div className="text-cyber-green font-bold truncate bg-slate-900/60 p-2.5 rounded font-mono select-all text-xs border border-white/5 flex justify-between items-center pr-2 gap-4">
                        <span>{localToken}</span>
                        <button
                          onClick={handleCopyToken}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                          title="Copy Key to Clipboard"
                        >
                          {copiedToken ? <Check className="w-3.5 h-3.5 text-cyber-green" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={handleRegenerateToken}
                        disabled={sensorStatus === 'generating'}
                        className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-white/5 transition-all cursor-pointer font-bold flex items-center justify-center gap-2 text-xs"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 text-cyber-blue ${sensorStatus === 'generating' ? 'animate-spin' : ''}`} />
                        {sensorStatus === 'generating' ? 'Rolling Crypto-Keys...' : 'Regenerate API Integration Secret'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A0E1A]/40 rounded-2xl border border-white/5 p-6 space-y-4">
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-4 h-4 text-cyber-purple" />
                    Cryptographic Session Signatures
                  </h3>
                  <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5 space-y-3 font-mono text-xs text-slate-300">
                    <div className="flex items-center justify-between text-[11px] py-1 border-b border-white/5">
                      <span>SIGNATURE TYPE:</span>
                      <span className="text-white font-bold">RSA 4096-bit Secure Identity Token</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] py-1 border-b border-white/5">
                      <span>KEY ROLLOVERS:</span>
                      <span className="text-white">Active (Daily Auto-Refresh)</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] py-1">
                      <span>LAST ROTATION:</span>
                      <span className="text-cyber-blue">Today at 08:12 UTC</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: CONSOLE ACTIVITY AUDIT LOGS */}
            {activeTab === 'audit' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 text-left"
              >
                <div className="bg-[#0A0E1A]/40 rounded-2xl border border-white/10 overflow-hidden">
                  <div className="bg-slate-950 px-4 py-3 border-b border-white/10 flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-white tracking-widest uppercase flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyber-blue animate-pulse" />
                      Analyst Session Audit Console
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">LIVE COGNITIVE MONITORING</span>
                  </div>

                  <div className="p-4 bg-slate-950/60 font-mono text-[11px] text-slate-300 space-y-2.5 max-h-[350px] overflow-y-auto">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="flex gap-2 items-start py-1.5 border-b border-white/5 last:border-0 hover:bg-slate-900/40 rounded px-1 transition-all">
                        <span className="text-slate-500 shrink-0 select-none">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider shrink-0 uppercase ${
                          log.category === 'AUTH' ? 'bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/20' :
                          log.category === 'CREDENTIALS' ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/20' :
                          log.category === 'SYSTEM' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/10' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {log.category}
                        </span>
                        <span className="text-slate-200 flex-1 break-all">{log.action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[10px] text-slate-500 font-mono">
                    * ALL DEPLOYED AUDITS ARE TRANSMITTED TO CENTRAL COMPLIANCE STACKS AND PERSISTED FOR 365 DAYS.
                  </p>
                </div>
              </motion.div>
            )}

            {/* TAB 4: MANAGE ACCOUNT DETAILS */}
            {activeTab === 'settings' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 text-left"
              >
                <form onSubmit={handleSaveProfile} className="bg-[#0A0E1A]/40 rounded-2xl border border-white/5 p-6 space-y-5">
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-cyber-blue" />
                    Edit Analyst Security Identity
                  </h3>

                  <div className="space-y-4 font-mono text-xs text-left">
                    <div className="space-y-1">
                      <label className="block text-slate-400 uppercase">Analyst Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="text" 
                          required
                          value={analystName}
                          onChange={(e) => setAnalystName(e.target.value)}
                          placeholder="Dr. Helen Vance"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-slate-400 uppercase">Enrolled SecOps Role / Command Title *</label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="text" 
                          required
                          value={analystRole}
                          onChange={(e) => setAnalystRole(e.target.value)}
                          placeholder="e.g. Senior Security Analyst"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-slate-400 uppercase">Corporate Principal Email *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="email" 
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="helen.vance@alertweave.com"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-slate-400 uppercase">Sovereign Physical Telemetry Node Location</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="text" 
                          value={nodeLocation}
                          onChange={(e) => setNodeLocation(e.target.value)}
                          placeholder="e.g. Bengaluru SecOps Hub - Rack E4"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 font-bold rounded-xl hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        Save Analyst Security Identity
                      </button>
                    </div>
                  </div>
                </form>

                {/* Password reset trigger simulation inside settings */}
                <div className="bg-[#0A0E1A]/40 rounded-2xl border border-white/5 p-6 space-y-4">
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">Update Session Access Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => triggerAlert('Security bypass token dispatched via email directory.', 'info')}
                      className="py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-white/5 font-mono text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-cyber-blue" />
                      Dispatch Reset Token
                    </button>
                    <button 
                      type="button"
                      onClick={() => triggerAlert('Corporate Active Directory synced with sovereign node keys.', 'success')}
                      className="py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-white/5 font-mono text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-cyber-purple" />
                      Re-Sync Active Directory
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
