import React, { useState } from 'react';
import { Shield, CheckCircle, Info, Play, AlertTriangle, Search, Activity, Cpu, BookOpen, ArrowLeft } from 'lucide-react';
import { MitreTechnique } from '../types';
import { mockMitreMatrix } from '../data/mockData';

interface MitreMatrixViewProps {
  onBack?: () => void;
}

export default function MitreMatrixView({ onBack }: MitreMatrixViewProps) {
  const [selectedTech, setSelectedTech] = useState<MitreTechnique | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [playbookRunning, setPlaybookRunning] = useState<string | null>(null);

  const tactics = [
    'Initial Access',
    'Execution',
    'Defense Evasion',
    'Credential Access',
    'Discovery',
    'Lateral Movement',
    'Exfiltration'
  ];

  const getTechniquesForTactic = (tactic: string) => {
    return mockMitreMatrix.filter(
      (tech) => 
        tech.tactic === tactic && 
        tech.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const coverageStats = {
    totalCovered: mockMitreMatrix.filter(m => m.detected).length,
    totalPlaybooks: mockMitreMatrix.filter(m => m.playbookAvailable).length,
    overallConfidence: Math.round(mockMitreMatrix.filter(m => m.detected).reduce((sum, m) => sum + m.confidence, 0) / mockMitreMatrix.filter(m => m.detected).length)
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
              MITRE ATT&CK Matrix
              <span className="text-xs font-mono px-2 py-0.5 bg-cyber-blue/15 text-cyber-blue rounded-full font-bold uppercase tracking-wider">
                Playbook Coverage
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              DYNAMIC CLUSTER DETECTION CROSS-MAPPED TO MITRE TECHNIQUES FRAMEWORK v14
            </p>
          </div>
        </div>

        {/* Search inside Mitre */}
        <div className="relative flex-1 md:flex-initial min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search techniques (e.g. Phishing)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-blue"
          />
        </div>
      </div>

      {/* COVERAGE STATISTICS METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-cyber-red/10 rounded-xl flex items-center justify-center border border-cyber-red/20 shrink-0">
            <AlertTriangle className="w-5 h-5 text-cyber-red" />
          </div>
          <div>
            <span className="block text-[10px] font-mono text-slate-500 uppercase">Detected Tactics Active</span>
            <span className="block text-xl font-display font-bold text-white">{coverageStats.totalCovered} Active Techniques</span>
          </div>
        </div>

        <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-cyber-green/10 rounded-xl flex items-center justify-center border border-cyber-green/20 shrink-0">
            <CheckCircle className="w-5 h-5 text-cyber-green" />
          </div>
          <div>
            <span className="block text-[10px] font-mono text-slate-500 uppercase">Playbook Mitigations Ready</span>
            <span className="block text-xl font-display font-bold text-white">{coverageStats.totalPlaybooks} Active Triggers</span>
          </div>
        </div>

        <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-cyber-purple/10 rounded-xl flex items-center justify-center border border-cyber-purple/20 shrink-0">
            <Cpu className="w-5 h-5 text-cyber-purple" />
          </div>
          <div>
            <span className="block text-[10px] font-mono text-slate-500 uppercase">Engine Triage Confidence</span>
            <span className="block text-xl font-display font-bold text-white">{coverageStats.overallConfidence}% Average weight</span>
          </div>
        </div>

      </div>

      {/* MATRIX REPRESENTATION FLOW */}
      <div className="flex overflow-x-auto gap-4 pb-4 select-none scrollbar-thin scrollbar-thumb-slate-800">
        {tactics.map((tac) => {
          const techniques = getTechniquesForTactic(tac);
          return (
            <div key={tac} className="space-y-3 w-[200px] sm:w-[220px] lg:w-auto lg:flex-1 shrink-0">
              {/* Tactic Column Header */}
              <div className="bg-slate-950 px-3 py-2.5 rounded-xl border border-white/5 text-center">
                <span className="block text-[10px] font-mono text-slate-400 font-bold leading-tight">{tac}</span>
              </div>

              {/* Technique blocks */}
              <div className="space-y-2.5">
                {techniques.map((tech) => (
                  <div 
                    key={tech.code}
                    onClick={() => setSelectedTech(tech)}
                    className={`p-3 rounded-xl border cursor-pointer text-left transition-all ${
                      tech.detected 
                        ? 'bg-cyber-red/10 hover:bg-cyber-red/20 border-cyber-red/40 animate-cyber-pulse' 
                        : 'bg-[#151B2F]/40 hover:bg-[#151B2F]/80 border-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-start font-mono text-[8px] text-slate-500 mb-1">
                      <span>{tech.code}</span>
                      {tech.playbookAvailable && (
                        <span className="text-cyber-green text-[7px] font-bold uppercase">Ready</span>
                      )}
                    </div>
                    <span className="block text-[10px] font-bold text-white line-clamp-2 leading-tight">{tech.name}</span>
                  </div>
                ))}

                {techniques.length === 0 && (
                  <div className="p-3 bg-slate-900/10 border border-dashed border-white/5 rounded-xl text-center font-mono text-[9px] text-slate-600">
                    No active techniques
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* TECHNIQUE DETAIL DRAWER / OVERLAY PANEL */}
      {selectedTech && (
        <div className="p-6 bg-[#151B2F]/60 rounded-2xl border border-cyber-blue/30 space-y-4 font-mono text-xs max-w-4xl">
          <div className="flex justify-between items-start border-b border-white/5 pb-3">
            <div>
              <span className="text-cyber-blue text-[10px] font-bold uppercase">{selectedTech.code} // MITRE ATT&CK DETAILS</span>
              <h3 className="text-base font-bold text-white font-display mt-0.5">{selectedTech.name}</h3>
            </div>
            <button 
              onClick={() => setSelectedTech(null)}
              className="text-slate-400 hover:text-white"
            >
              [Close Panel]
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5 space-y-1.5">
              <span className="text-slate-500 text-[10px]">CURRENT DETECTION COUNTS</span>
              <p className="text-sm font-bold text-white">{selectedTech.incidentsCount} active events</p>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5 space-y-1.5">
              <span className="text-slate-500 text-[10px]">CORRELATION CONFIDENCE RATIO</span>
              <p className="text-sm font-bold text-cyber-red">{selectedTech.confidence}% weight</p>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5 space-y-1.5">
              <span className="text-slate-500 text-[10px]">MITIGATION TRIGGER ACTION</span>
              {playbookRunning === selectedTech.code ? (
                <div className="w-full py-1.5 px-3 bg-cyber-blue/15 text-cyber-blue font-bold rounded-lg text-[9px] text-center border border-cyber-blue/30 animate-pulse font-mono">
                  ⚡ Playbook Deploying...
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setPlaybookRunning(selectedTech.code);
                    setTimeout(() => setPlaybookRunning(null), 3000);
                  }}
                  className="w-full py-1.5 px-3 bg-cyber-green text-slate-950 font-bold rounded-lg text-[10px] flex items-center justify-center gap-1 hover:bg-emerald-400 transition-all cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-slate-950" />
                  Launch Contain Playbook
                </button>
              )}
            </div>

          </div>

          <div className="space-y-1.5">
            <span className="text-slate-500 text-[10px]">CYBER DEFENSE PLAYBOOK OVERVIEW</span>
            <p className="text-slate-300 leading-relaxed font-sans p-3 bg-slate-950 rounded-xl border border-white/5">
              This technique describes a highly critical defensive evasion or credentials compromise activity. The defense protocol maps incoming process parents to verify token lineages. Upon violation, automated sensors trigger endpoint host isolation block lists.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
