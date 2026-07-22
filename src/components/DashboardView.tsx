import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, AlertTriangle, Cpu, TrendingUp, Search, SlidersHorizontal, Activity, RefreshCw, Terminal, ArrowRight, User, Server, Network, Clock, Eye, AlertCircle, Send, Mail, Phone, MapPin, CheckCircle, Globe, MessageSquare, Play, RotateCcw, ShieldAlert, Wifi } from 'lucide-react';
import { SecurityIncident, SecurityAlert } from '../types';
import { mockAlerts } from '../data/mockData';

// Import our custom state store!
import { useAlertWeaveStore } from '../data/store';

interface DashboardViewProps {
  onSelectIncident: (incId: string) => void;
  onNavigateToView: (view: 'incidents' | 'graph' | 'mitre' | 'analytics' | 'chat') => void;
}

export default function DashboardView({ onSelectIncident, onNavigateToView }: DashboardViewProps) {
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d'>('24h');
  const [searchQuery, setSearchQuery] = useState('');
  const [tickerAlerts, setTickerAlerts] = useState<SecurityAlert[]>([]);

  // Connect to our central state store!
  const {
    systemOnline,
    setSystemOnline,
    alertsCount,
    incidentsCount,
    cpuUsage,
    ingestionRate,
    alertReductionRatio,
    incidents,
    alerts,
    simulation,
    startAttackSimulation,
    resetSimulation
  } = useAlertWeaveStore();

  // New Contact Desk states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'L3 Emergency Escalation',
    priority: 'high',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'L3 Emergency Escalation',
        priority: 'high',
        message: ''
      });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1200);
  };

  // Initialize ticker with store alerts
  useEffect(() => {
    setTickerAlerts(alerts);
  }, [alerts]);

  // Simulate dynamic live incoming alerts for the live ticker to make the dashboard feel incredibly real-time and responsive!
  useEffect(() => {
    const interval = setInterval(() => {
      const sources = ['CrowdStrike Falcon', 'AWS CloudTrail', 'Okta Directory', 'Palo Alto Prisma', 'Zscaler Proxy'];
      const targets = ['DC-01.corp.internal', 'SQL-PROD-02.corp.internal', 'WS-HR-12', 'AWS-S3-PatientRecords'];
      const users = ['svc_backup', 'j_doe', 'adm_smith', 'e_vance'];
      const alertNames = [
        'Uncommon Scheduled Task Created',
        'Inbound Traffic Burst from Anarchist IP',
        'Kerberos TGT Request Failure',
        'Encrypted SSH session payload mismatch',
        'Okta MFA Push Fatigue Event'
      ];
      const severities: ('critical' | 'high' | 'medium' | 'low')[] = ['critical', 'high', 'medium', 'low'];
      const selectedSeverity = severities[Math.floor(Math.random() * severities.length)];

      const newAlert: SecurityAlert = {
        id: `AL-${Math.floor(Math.random() * 900) + 100}`,
        timestamp: new Date().toISOString(),
        name: alertNames[Math.floor(Math.random() * alertNames.length)],
        severity: selectedSeverity,
        source: sources[Math.floor(Math.random() * sources.length)],
        host: targets[Math.floor(Math.random() * targets.length)],
        user: users[Math.floor(Math.random() * users.length)],
        category: 'Discovery & Execution',
        mitreTactic: 'Execution',
        mitreTechnique: 'System Information Discovery',
        description: 'Simulated high-velocity security logs telemetry analyzed by the local sensor array.',
        payload: { command: 'systemctl status network', status: 'completed' }
      };

      setTickerAlerts((prev) => [newAlert, ...prev.slice(0, 12)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const filteredIncidents = incidents.filter((inc) => {
    const matchesSearch = inc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          inc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header with filters and Refresh status */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-[#0a0f19]/80 p-4 rounded-2xl border border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            SOC Intelligent Cockpit
            <span className={`text-xs font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
              systemOnline ? 'bg-cyber-green/15 text-cyber-green animate-pulse' : 'bg-cyber-red/15 text-cyber-red'
            }`}>
              ● {systemOnline ? 'Live Engine Active' : 'Engine Idle'}
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            CORRELATING SECURE LOGS FROM 14 AGENTS AND 3 INTEGRATIONS
          </p>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 md:flex-initial min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search incidents, assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-blue/50 transition-colors font-mono"
            />
          </div>

          {/* Time range switcher */}
          <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-white/5">
            {(['1h', '24h', '7d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 text-[10px] font-mono font-bold rounded-lg transition-all ${
                  timeRange === r 
                    ? 'bg-cyber-blue text-slate-950 shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setSystemOnline(!systemOnline)}
            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl border border-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Toggle Engine State"
          >
            <RefreshCw className={`w-4 h-4 ${systemOnline ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>
        </div>
      </div>

      {/* KPI METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI: Raw Alert Inflow */}
        <div className="p-5 bg-[#111625]/80 rounded-2xl border border-white/5 relative group hover:border-cyber-blue/20 transition-all">
          <div className="absolute top-4 right-4 text-cyber-blue bg-cyber-blue/10 p-1.5 rounded-xl">
            <Activity className="w-4 h-4" />
          </div>
          <span className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">Raw Alerts Ingested</span>
          <span className="block text-2xl font-display font-bold text-white mt-2">{alertsCount.toLocaleString()}</span>
          <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-cyber-green">
            <span>{alertReductionRatio}% noise filtered</span>
            <span className="text-slate-500 font-normal">Rate: {ingestionRate.toLocaleString()}/s</span>
          </div>
        </div>

        {/* KPI: Evolving Incidents */}
        <div className="p-5 bg-[#111625]/80 rounded-2xl border border-white/5 relative group hover:border-cyber-red/20 transition-all">
          <div className="absolute top-4 right-4 text-cyber-red bg-cyber-red/10 p-1.5 rounded-xl">
            <AlertTriangle className="w-4 h-4 animate-pulse" />
          </div>
          <span className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">Active Threat Stories</span>
          <span className="block text-2xl font-display font-bold text-cyber-red mt-2">{incidentsCount} Incidents</span>
          <div className="mt-2 flex items-center gap-1 text-[9px] font-mono text-cyber-red">
            <span className="w-1 h-1 rounded-full bg-cyber-red animate-ping shrink-0" />
            <span className="truncate">Causal engine has aligned live exfiltrations</span>
          </div>
        </div>

        {/* KPI: Mean Time To Contain */}
        <div className="p-5 bg-[#111625]/80 rounded-2xl border border-white/5 relative group hover:border-cyber-green/20 transition-all">
          <div className="absolute top-4 right-4 text-cyber-green bg-cyber-green/10 p-1.5 rounded-xl">
            <Clock className="w-4 h-4" />
          </div>
          <span className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">MTTC (Causal Mitigation)</span>
          <span className="block text-2xl font-display font-bold text-white mt-2">34.2 mins</span>
          <div className="mt-2 flex items-center gap-1 text-[9px] font-mono text-cyber-green">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>14x reduction vs legacy SIEMs</span>
          </div>
        </div>

        {/* KPI: AI Fusion Confidence */}
        <div className="p-5 bg-[#111625]/80 rounded-2xl border border-white/5 relative group hover:border-cyber-purple/20 transition-all">
          <div className="absolute top-4 right-4 text-cyber-purple bg-cyber-purple/10 p-1.5 rounded-xl">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="block text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-widest">Global CPU Core Load</span>
          <span className="block text-2xl font-display font-bold text-cyber-purple mt-2">{cpuUsage}% Core</span>
          <div className="mt-2 flex items-center gap-1.5 text-[9px] font-mono text-slate-500">
            <span>False positive accuracy: 99.1%</span>
          </div>
        </div>

      </div>

      {/* WEAVEAI CYBER RANGE & ATTACK SIMULATOR (IMPROVEMENTS 4 & 5) */}
      <div className="p-5 bg-[#0b0f19]/90 rounded-2xl border border-red-500/10 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                {simulation.isRunning ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-red opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-red"></span>
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
                )}
              </span>
              <span className="text-[10px] font-mono text-cyber-orange uppercase font-bold tracking-wider">
                WeaveAI™ Cyber Range
              </span>
            </div>
            <h3 className="text-base font-bold text-white">
              Deterministic Multi-Stage APT Attack Simulation Engine
            </h3>
            <p className="text-xs text-slate-400 max-w-4xl">
              Inject synthetic intrusion vectors directly into memory. Test hypergraph routing accuracy, causal state resolution, and MITRE mapping coverage in real time.
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto shrink-0">
            {simulation.isRunning ? (
              <div className="flex items-center gap-2 px-3.5 py-2 bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-xs font-bold font-mono rounded-xl animate-pulse">
                <RefreshCw className="w-3 h-3 animate-spin" />
                SIMULATING ATTACK...
              </div>
            ) : simulation.currentStepIndex >= 0 ? (
              <button
                onClick={resetSimulation}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold font-mono rounded-xl border border-white/5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Range State
              </button>
            ) : (
              <button
                onClick={startAttackSimulation}
                className="flex items-center gap-1.5 px-4 py-2 bg-cyber-red hover:bg-red-500 text-slate-950 text-xs font-bold font-mono rounded-xl transition-all cursor-pointer shadow-lg shadow-cyber-red/15"
              >
                <Play className="w-3 h-3 fill-current" />
                Simulate Attack
              </button>
            )}
          </div>
        </div>

        {/* STEPPER PROGRESSION TIMELINE */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-1">
          {simulation.steps.map((step, idx) => {
            const isCompleted = simulation.currentStepIndex >= idx;
            const isActive = simulation.currentStepIndex === idx;
            
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all flex flex-col justify-between h-28 ${
                  isActive 
                    ? 'bg-[#150a0a]/80 border-cyber-red shadow-[0_0_15px_rgba(239,68,68,0.15)] scale-[1.02]' 
                    : isCompleted 
                    ? 'bg-slate-900/40 border-cyber-green/30' 
                    : 'bg-slate-950/20 border-white/5 opacity-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive 
                      ? 'bg-cyber-red/20 text-cyber-red animate-pulse' 
                      : isCompleted 
                      ? 'bg-cyber-green/15 text-cyber-green' 
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    STAGE {idx + 1}
                  </span>
                  <span className="text-[8px] font-mono text-slate-500">
                    {step.time}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className={`text-xs font-bold leading-tight ${
                    isActive ? 'text-cyber-red animate-pulse' : 'text-white'
                  }`}>
                    {step.tactic}
                  </h4>
                  <p className="text-[9px] text-slate-400 line-clamp-2 leading-snug">
                    {step.event}
                  </p>
                </div>

                <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 pt-1.5 border-t border-white/5">
                  <span>{step.code}</span>
                  <span className="text-slate-400 uppercase font-bold">{step.severity}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHARTS SECTION - CUSTOM SVG FOR MAXIMUM VISUAL PERFORMANCE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SVG Area Chart: Threat Intensity Over Time (24h) */}
        <div className="lg:col-span-8 p-6 bg-slate-900/40 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-xs font-mono text-cyber-blue uppercase tracking-wider font-bold">Threat Density & Inflow Vector</span>
                <h3 className="text-lg font-display font-bold text-white">Dynamic Active Intrusion Volumes</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">PEAK INTRUSIONS AT 03:00 - 05:00 UTC</span>
            </div>

            {/* Custom SVG Area Graph */}
            <div className="relative h-64 w-full bg-slate-950/50 rounded-xl border border-white/5 overflow-hidden p-2 flex items-end">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
                <div className="border-b border-white/30 w-full" />
                <div className="border-b border-white/30 w-full" />
                <div className="border-b border-white/30 w-full" />
                <div className="border-b border-white/30 w-full" />
              </div>

              {/* Area graph */}
              <svg className="w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cyber-chart-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#050816" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Area paths */}
                <path
                  d="M 0 200 Q 100 160 200 120 T 400 60 T 600 140 T 800 40 L 800 240 L 0 240 Z"
                  fill="url(#cyber-chart-gradient)"
                />
                {/* Stroke line */}
                <path
                  d="M 0 200 Q 100 160 200 120 T 400 60 T 600 140 T 800 40"
                  fill="none"
                  stroke="url(#cyber-chart-gradient)"
                  strokeWidth="3.5"
                />
                {/* Pulsing indicator at active peak point (x: 400, y: 60) */}
                <circle cx="400" cy="60" r="5" fill="#00FF88" className="animate-pulse" />
                <circle cx="800" cy="40" r="5" fill="#FF4D6D" className="animate-pulse" />
              </svg>

              {/* Custom SVG Tooltip Overlay */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-950/90 border border-cyber-green/50 rounded-lg text-[10px] font-mono text-center shadow-xl shadow-cyber-green/10">
                <span className="block text-cyber-green font-bold">⚠️ RANSOMWARE SEQUENCE SYNTHESIZED</span>
                <span className="text-slate-400">Time: 04:12 | Confidence: 98.4%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-between text-[10px] text-slate-500 font-mono">
            <span>00:00 UTC</span>
            <span>06:00 UTC</span>
            <span>12:00 UTC</span>
            <span>18:00 UTC</span>
            <span>24:00 UTC</span>
          </div>
        </div>

        {/* Threat Severity & Affected Vectors */}
        <div className="lg:col-span-4 p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-6">
          <div>
            <span className="text-xs font-mono text-cyber-purple uppercase tracking-wider font-bold">Risk Assessment</span>
            <h3 className="text-lg font-display font-bold text-white">Severity Vector Ratio</h3>
          </div>

          {/* Radial or Donut Visualizer using custom SVG elements */}
          <div className="flex items-center justify-center py-4">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                {/* Background circle */}
                <path
                  className="text-slate-900"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Critical Red Path */}
                <path
                  className="text-cyber-red"
                  strokeDasharray="42, 100"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* High Warning Orange Path */}
                <path
                  className="text-cyber-orange"
                  strokeDasharray="35, 100"
                  strokeDashoffset="-42"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Medium Blue Path */}
                <path
                  className="text-cyber-blue"
                  strokeDasharray="23, 100"
                  strokeDashoffset="-77"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-display font-bold text-white">42%</span>
                <span className="text-[9px] font-mono text-cyber-red font-bold uppercase tracking-wider">Critical</span>
              </div>
            </div>
          </div>

          {/* Legend Table */}
          <div className="space-y-2 font-mono text-[10px] text-slate-400">
            <div className="flex justify-between items-center p-1.5 bg-slate-950/30 rounded border border-white/5">
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyber-red" /> Critical</span>
              <span className="text-white font-bold">2 Active Incidents</span>
            </div>
            <div className="flex justify-between items-center p-1.5 bg-slate-950/30 rounded border border-white/5">
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyber-orange" /> High</span>
              <span className="text-white font-bold">1 Investigating</span>
            </div>
            <div className="flex justify-between items-center p-1.5 bg-slate-950/30 rounded border border-white/5">
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyber-blue" /> Medium / Low</span>
              <span className="text-white font-bold">0 Active</span>
            </div>
          </div>

        </div>

      </div>

      {/* INCIDENTS TO TRIAGE & LIVE TELEMETRY LOGS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Incidents Feed */}
        <div className="lg:col-span-7 p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-mono text-cyber-orange uppercase tracking-wider font-bold">Triage Queue</span>
              <h3 className="text-lg font-display font-bold text-white">Active Threat Stories</h3>
            </div>
            <button 
              id="btn-all-incidents"
              onClick={() => onNavigateToView('incidents')}
              className="text-xs font-mono text-cyber-blue hover:underline flex items-center gap-1.5"
            >
              Full Feed <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {filteredIncidents.map((inc) => (
              <div 
                key={inc.id}
                className={`p-5 bg-[#151B2F]/80 rounded-xl border transition-all cursor-pointer group ${
                  inc.severity === 'critical' ? 'hover:border-cyber-red/40 border-white/5' : 'hover:border-cyber-orange/40 border-white/5'
                }`}
                onClick={() => onSelectIncident(inc.id)}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] text-cyber-blue font-bold">{inc.id}</span>
                      <span className={`px-2 py-0.5 text-[8px] font-mono font-bold rounded-full uppercase ${
                        inc.severity === 'critical' ? 'bg-cyber-red/15 text-cyber-red border border-cyber-red/20' : 'bg-cyber-orange/15 text-cyber-orange border border-cyber-orange/20'
                      }`}>
                        {inc.severity}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">Confidence: {inc.confidence}%</span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyber-blue transition-colors">{inc.title}</h4>
                  </div>
                  
                  {/* Incident reduction ratio tag */}
                  <div className="text-right shrink-0">
                    <span className="block text-xs font-mono text-cyber-green font-bold">-{inc.reductionRatio}%</span>
                    <span className="text-[9px] text-slate-500 font-mono">Alert Reduction</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {inc.summary}
                </p>

                {/* Foot indicators */}
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono pt-3 border-t border-white/5 mt-3">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1"><Server className="w-3 h-3 text-cyber-blue" /> {inc.hostCount} hosts</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3 text-cyber-purple" /> {inc.userCount} users</span>
                  </div>
                  <span className="text-[9px] text-slate-600">Updated {new Date(inc.updatedAt).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Security Log Telemetry Ticker (Animated Feed) */}
        <div className="lg:col-span-5 p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-4 flex flex-col h-[520px]">
          <div>
            <span className="text-xs font-mono text-cyber-green uppercase tracking-wider font-bold">Telemetry Sensor Core</span>
            <h3 className="text-lg font-display font-bold text-white">Live Alert Ticker</h3>
          </div>

          {/* Scrolling Panel */}
          <div className="flex-1 bg-slate-950/60 rounded-xl border border-white/5 overflow-hidden flex flex-col p-3 relative">
            <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 py-4 font-mono text-[10px]">
              {tickerAlerts.map((al, idx) => (
                <div 
                  key={al.id + idx}
                  className="p-3 bg-slate-900/80 border-l-2 border-y border-r border-white/5 rounded-r-lg space-y-1 hover:bg-slate-900 transition-colors"
                  style={{
                    borderLeftColor: 
                      al.severity === 'critical' ? '#ff4d6d' : 
                      al.severity === 'high' ? '#ffb020' : '#00e5ff'
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold text-[9px]">{al.source}</span>
                    <span className="text-[9px] text-slate-500">
                      {new Date(al.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-white font-bold truncate">{al.name}</p>
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>Host: {al.host}</span>
                    <span>User: {al.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* TOP TARGET COMPROMISE DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Vector: Vulnerable Server / Network Host */}
        <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center gap-2.5 text-cyber-blue">
            <Server className="w-5 h-5" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">Top Affected Asset</span>
          </div>
          <div>
            <span className="block text-white font-bold text-base">DC-01.corp.internal</span>
            <span className="block text-[10px] font-mono text-slate-500">ROLE: ACTIVE_DIRECTORY_DC</span>
          </div>
          <div className="p-2.5 bg-slate-950/60 rounded-xl border border-white/5 flex justify-between text-[11px] font-mono">
            <span className="text-slate-400">Threat Incidents:</span>
            <span className="text-cyber-red font-bold">1 Active</span>
          </div>
        </div>

        {/* Vector: Target Credentials Role */}
        <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center gap-2.5 text-cyber-purple">
            <User className="w-5 h-5" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">Compromised User Token</span>
          </div>
          <div>
            <span className="block text-white font-bold text-base">svc_backup</span>
            <span className="block text-[10px] font-mono text-slate-500">ROLE: ENTERPRISE_DOMAIN_BACKUPS</span>
          </div>
          <div className="p-2.5 bg-slate-950/60 rounded-xl border border-white/5 flex justify-between text-[11px] font-mono">
            <span className="text-slate-400">Active Kerberos Hijacks:</span>
            <span className="text-cyber-red font-bold">2 Detected</span>
          </div>
        </div>

        {/* Vector: Inbound Geo Threat Core */}
        <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center gap-2.5 text-cyber-red">
            <Network className="w-5 h-5" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">Inbound Attack Node IP</span>
          </div>
          <div>
            <span className="block text-white font-bold text-base">185.220.101.4</span>
            <span className="block text-[10px] font-mono text-slate-500">REGISTRATION: ACTIVE_TOR_EXIT</span>
          </div>
          <div className="p-2.5 bg-slate-950/60 rounded-xl border border-white/5 flex justify-between text-[11px] font-mono">
            <span className="text-slate-400">Intelligence Rep Score:</span>
            <span className="text-cyber-red font-bold">99 / 100</span>
          </div>
        </div>

      </div>

      {/* SECTION: SOC CONTACT & TACTICAL HELPDESK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 bg-[#151B2F]/30 p-8 rounded-3xl border border-white/5 relative overflow-hidden text-left">
        {/* Ambient glowing accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-blue/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyber-purple/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Column 1: Office info & Helplines */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded-full text-xs font-mono font-bold uppercase text-cyber-blue">
              <Shield className="w-4 h-4 text-cyber-blue animate-pulse" />
              Tactical Support Ingress
            </div>
            <h3 className="text-2xl font-display font-bold text-white leading-tight">
              L3 Operator Incident Escalation Desk
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Direct connection to AlertWeave's Security Advisory Center. For emergency telemetry routing issues, active threat mitigation workflows, or enterprise pilot integrations.
            </p>
          </div>

          {/* Active Helpdesk Channels */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 flex items-center gap-3">
              <Mail className="w-4 h-4 text-cyber-blue shrink-0" />
              <div>
                <span className="block text-[9px] text-slate-500 uppercase font-bold">Secured Email Ingress</span>
                <span className="text-slate-200">escalations@alertweave.in / support@alertweave.com</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 flex items-center gap-3">
              <Phone className="w-4 h-4 text-cyber-purple shrink-0" />
              <div>
                <span className="block text-[9px] text-slate-500 uppercase font-bold">Priority Hotline (HQ)</span>
                <span className="text-slate-200">+91 80 4920 1100 (Bengaluru)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-cyber-green shrink-0" />
              <div>
                <span className="block text-[9px] text-slate-500 uppercase font-bold">Primary Research & Tech Hub</span>
                <span className="text-slate-200 leading-tight">AlertWeave Tech Park, Outer Ring Road, Bengaluru, KA, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Ingress Submission Form */}
        <div className="p-6 bg-slate-950/60 rounded-2xl border border-white/10 relative">
          <h4 className="text-sm font-mono text-white font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyber-blue" />
            Operator Signal Transmission
          </h4>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleContactSubmit} 
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1.5">Operator Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Officer Rohan Mehra"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-blue font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1.5">SOC Identity (Email)</label>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. r.mehra@defence.gov.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-blue font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1.5">Escalation Priority</label>
                    <select 
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-blue font-mono appearance-none"
                    >
                      <option value="low">Priority 3 (Routine)</option>
                      <option value="high">Priority 2 (High)</option>
                      <option value="critical">Priority 1 (Incident Response)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1.5">Support Class</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-blue font-mono appearance-none"
                    >
                      <option value="L3 Emergency Escalation">L3 Alert Escalation</option>
                      <option value="Sovereign On-Prem Setup">Sovereign On-Prem</option>
                      <option value="Patent Documentation Inquiry">Patent / Research IP</option>
                      <option value="Other Advisory Needs">Other Advisory Needs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1.5">Signal Payload (Message)</label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Specify the hypergraph anomaly ID or custom telemetry constraints..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-blue font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 font-bold text-xs rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 border border-cyber-blue/40 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transmitting Signal...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Incident Payload</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="h-[310px] flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 bg-cyber-green/15 text-cyber-green rounded-full flex items-center justify-center border border-cyber-green/30 animate-pulse">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h5 className="font-mono text-white font-bold uppercase tracking-wider text-xs">Signal Confirmed & Signed</h5>
                  <p className="text-[11px] text-slate-400 mt-1 font-sans">
                    Your tactical telemetry payload has been securely ingested under Indian Patent Office routing protocols. A Level-3 Security Analyst will respond shortly.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* COCKPIT FOOTER MODULE */}
      <footer className="border-t border-white/5 mt-16 pt-8 pb-4 text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8 text-xs">
          {/* Logo Brand column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-tr from-cyber-blue to-cyber-purple rounded flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-slate-950" />
              </div>
              <span className="font-display font-bold text-sm tracking-wide text-white">AlertWeave</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Indian Patent Registered causal hypergraph orchestration and alert distillation engine. Securing critical enterprise infrastructure and state assets across key sovereign corridors.
            </p>
            <div className="flex items-center gap-2 font-mono text-[9px] text-cyber-green bg-cyber-green/5 border border-cyber-green/10 w-fit px-2 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-ping" />
              <span>INDIAN SOC CORRIDOR SECURE</span>
            </div>
          </div>

          {/* Quick Cockpit Views */}
          <div className="space-y-3">
            <span className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">Cockpit Navigation</span>
            <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-slate-400">
              <button 
                onClick={() => onNavigateToView('incidents')} 
                className="text-left hover:text-cyber-blue transition-colors bg-transparent border-none p-0 cursor-pointer"
              >
                &gt; Incident Hub
              </button>
              <button 
                onClick={() => onNavigateToView('graph')} 
                className="text-left hover:text-cyber-blue transition-colors bg-transparent border-none p-0 cursor-pointer"
              >
                &gt; Causal Graph
              </button>
              <button 
                onClick={() => onNavigateToView('mitre')} 
                className="text-left hover:text-cyber-blue transition-colors bg-transparent border-none p-0 cursor-pointer"
              >
                &gt; MITRE Matrix
              </button>
              <button 
                onClick={() => onNavigateToView('analytics')} 
                className="text-left hover:text-cyber-blue transition-colors bg-transparent border-none p-0 cursor-pointer"
              >
                &gt; Threat Metrics
              </button>
            </div>
          </div>

          {/* Standards & Certifications */}
          <div className="space-y-3">
            <span className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">Sovereign Compliance</span>
            <div className="space-y-2 font-mono text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-cyber-blue rounded-full" />
                <span>IPO Utility Patent (IN-202611044238-A)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-cyber-blue rounded-full" />
                <span>ISO 27001 ISMS Audited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-cyber-blue rounded-full" />
                <span>SOC 2 Type II Confidentiality Certified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono text-slate-500">
          <p>© 2026 AlertWeave Technologies Pvt. Ltd. (Bengaluru & New Delhi). All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-cyber-blue transition-colors">Privacy Charter</a>
            <a href="#terms" className="hover:text-cyber-blue transition-colors">Terms of Operations</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
