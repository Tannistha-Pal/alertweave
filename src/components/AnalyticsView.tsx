import React, { useState } from 'react';
import { Shield, TrendingUp, TrendingDown, HelpCircle, Activity, BarChart2, Calendar, FileText, Settings, Sparkles, ArrowLeft } from 'lucide-react';

interface AnalyticsViewProps {
  onBack?: () => void;
}

export default function AnalyticsView({ onBack }: AnalyticsViewProps) {
  const [activeSegment, setActiveSegment] = useState<'daily' | 'monthly'>('daily');

  const metricStats = [
    { label: 'Alert Reduction Ratio', value: '98.4%', trend: 'up', trendText: '+1.2% over last 30 days', desc: 'Alert consolidation density' },
    { label: 'Mean Time to Contain (MTTC)', value: '34.2 mins', trend: 'down', trendText: '-12.5% faster triage', desc: 'Average active incident lifetime' },
    { label: 'Analyst Alert Backlog', value: '0 items', trend: 'down', trendText: '-100% overload drop', desc: 'Queue saturation index' },
    { label: 'Sensor Integrity Score', value: '99.98%', trend: 'up', trendText: 'Perfect network parity', desc: 'Healthy agents coverage' }
  ];

  // 24 hours risk activities heatmap representation (24 block metrics)
  const heatmapHours = Array.from({ length: 24 }).map((_, idx) => {
    const hoursStr = `${idx.toString().padStart(2, '0')}:00`;
    // Simulate hot spots around 03:00 - 05:00 UTC (LockBit campaign)
    let intensity: 'none' | 'low' | 'medium' | 'high' | 'critical' = 'none';
    if (idx === 3 || idx === 6) intensity = 'critical';
    else if (idx === 4 || idx === 5) intensity = 'high';
    else if (idx >= 2 && idx <= 10) intensity = 'medium';
    else if (Math.random() > 0.4) intensity = 'low';

    return { hour: hoursStr, intensity };
  });

  const getHeatmapColorClass = (intensity: string) => {
    switch (intensity) {
      case 'critical': return 'bg-cyber-red border-cyber-red shadow-[0_0_10px_#ff4d6d]';
      case 'high': return 'bg-cyber-orange border-cyber-orange';
      case 'medium': return 'bg-cyber-purple border-cyber-purple';
      case 'low': return 'bg-cyber-blue/30 border-cyber-blue/50';
      default: return 'bg-slate-950 border-white/5';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3.5">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded-lg border border-white/5 text-cyber-blue hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight flex items-center gap-2">
              Intelligent Threat Analytics
              <span className="text-xs font-mono px-2 py-0.5 bg-cyber-green/15 text-cyber-green rounded-full font-bold uppercase tracking-wider">
                Metrics Core
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              CONSOLIDATED HISTORICAL ATTACK LOGISTICS AND PERFORMANCE REDUCTION REPORTS
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-white/5">
          {(['daily', 'monthly'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setActiveSegment(s)}
              className={`px-4 py-1.5 text-xs font-mono font-bold rounded-lg transition-all capitalize ${
                activeSegment === s 
                  ? 'bg-cyber-blue text-slate-950 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s} Analysis
            </button>
          ))}
        </div>
      </div>

      {/* HISTORIC METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricStats.map((st, i) => (
          <div key={i} className="p-6 bg-[#151B2F]/40 rounded-2xl border border-white/5 space-y-3">
            <span className="block text-xs font-mono text-slate-500 uppercase">{st.label}</span>
            <span className="block text-2xl font-display font-bold text-white">{st.value}</span>
            
            <div className={`text-[10px] font-mono flex items-center gap-1 ${
              st.trend === 'up' ? 'text-cyber-green' : 'text-cyber-blue'
            }`}>
              {st.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{st.trendText}</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">{st.desc}</p>
          </div>
        ))}
      </div>

      {/* THREAT ANALYSIS CHARTS AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Custom Area Chart: Incident Reduction and Contain Speed Trends */}
        <div className="lg:col-span-8 p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-mono text-cyber-blue uppercase tracking-wider font-bold">Consolidation Vector</span>
              <h3 className="text-lg font-display font-bold text-white">Alert Flood Reduction Progress</h3>
            </div>
            <span className="text-[10px] font-mono text-cyber-green font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> SAVING 98.4% AUDIT WORK
            </span>
          </div>

          {/* SVG representation of Consolidation metrics */}
          <div className="relative h-64 bg-slate-950/50 rounded-xl border border-white/5 overflow-hidden flex items-end p-2">
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
              <div className="border-b border-white/30 w-full" />
              <div className="border-b border-white/30 w-full" />
              <div className="border-b border-white/30 w-full" />
            </div>

            <svg className="w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="none">
              <defs>
                <linearGradient id="reduction-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00FF88" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#050816" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Green consolidation area */}
              <path
                d="M 0 200 Q 150 140 300 120 T 600 60 T 800 50 L 800 240 L 0 240 Z"
                fill="url(#reduction-glow)"
              />
              <path
                d="M 0 200 Q 150 140 300 120 T 600 60 T 800 50"
                fill="none"
                stroke="#00FF88"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>WEEK 01</span>
            <span>WEEK 02</span>
            <span>WEEK 03</span>
            <span>WEEK 04</span>
          </div>
        </div>

        {/* Workload Risk Heatmap over 24 hours */}
        <div className="lg:col-span-4 p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-cyber-purple uppercase tracking-wider font-bold">24-Hour Cycle</span>
            <h3 className="text-lg font-display font-bold text-white">Risk Heatmap Distribution</h3>
          </div>

          {/* Grid Blocks */}
          <div className="grid grid-cols-6 gap-2">
            {heatmapHours.map((hr, idx) => (
              <div 
                key={idx}
                className={`p-2.5 rounded-lg border text-center transition-all ${getHeatmapColorClass(hr.intensity)}`}
                title={`${hr.hour} UTC Intensity: ${hr.intensity}`}
              >
                <span className="block text-[8px] font-mono font-bold text-white">{hr.hour}</span>
                <span className="block text-[6px] font-mono text-slate-500 capitalize">{hr.intensity}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 text-[9px] font-mono text-slate-500 leading-relaxed text-center">
            Heatspots correspond to active intrusion attempts, primarily peaking at 03:00 - 05:00 UTC.
          </div>
        </div>

      </div>

    </div>
  );
}
