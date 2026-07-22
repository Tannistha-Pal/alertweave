import React, { useState } from 'react';
import { Shield, BookOpen, FileText, Cpu, Award, Code, CheckCircle, HelpCircle, GraduationCap, Quote, ArrowLeft } from 'lucide-react';
import { ResearchPaper } from '../types';
import { mockPapers } from '../data/mockData';

interface ResearchViewProps {
  onBack?: () => void;
}

export default function ResearchView({ onBack }: ResearchViewProps) {
  const [selectedPaperId, setSelectedPaperId] = useState<string>(mockPapers[0].id);
  const activePaper = mockPapers.find(p => p.id === selectedPaperId) || mockPapers[0];

  const mathEquation = `H_c(e_i, e_j) = \\alpha \\cdot \\Delta T(e_i, e_j) + \\beta \\cdot \\mathcal{I}_{res}(u_i, u_j) + \\gamma \\cdot \\mathcal{G}_{cosine}(v_i, v_j)`;

  const universalSchemaJson = {
    "$schema": "https://alertweave.com/schemas/universal-alert-v1.json",
    "telemetryType": "SECURITY_ALERT",
    "vendorOrigin": "CrowdStrike Falcon XDR",
    "payload": {
      "uuid": "4fa6c28d-190b-4e12-bda2",
      "timestamp": "2026-07-16T06:12:05Z",
      "severity": "CRITICAL",
      "entities": {
        "userPrincipal": "svc_backup@corp.internal",
        "domainController": "DC-01.corp.internal",
        "processChain": ["explorer.exe", "cmd.exe", "rundll32.exe"]
      },
      "mitreReference": {
        "tactic": "Credential Access",
        "technique": "OS Credential Dumping",
        "code": "T1003.001"
      }
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
              Cybersecurity Scientific Core
              <span className="text-xs font-mono px-2 py-0.5 bg-cyber-purple/15 text-cyber-purple rounded-full font-bold uppercase tracking-wider">
                Research
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              PEER-REVIEWED METHODOLOGIES AND MATHEMATICAL GRAPH REPRESENTATIONS
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT ACADEMIC PAPERS DIRECTORY */}
        <div className="lg:col-span-4 space-y-4">
          <span className="block text-xs font-mono text-slate-500 uppercase tracking-widest px-1">ACADEMIC PUBLICATIONS</span>
          <div className="space-y-3">
            {mockPapers.map((p) => (
              <div 
                key={p.id}
                onClick={() => setSelectedPaperId(p.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  p.id === selectedPaperId 
                    ? 'bg-[#151B2F] border-cyber-purple shadow-[0_0_15px_rgba(139,92,246,0.15)]' 
                    : 'bg-slate-900/40 hover:bg-slate-900 border-white/5'
                }`}
              >
                <div className="flex items-center gap-2 text-[10px] font-mono text-cyber-purple mb-1">
                  <GraduationCap className="w-4 h-4 text-cyber-purple" />
                  <span>{p.venue}</span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-2">{p.title}</h4>
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-3 pt-2 border-t border-white/5">
                  <span>Year: {p.year}</span>
                  <span className="text-cyber-green font-bold">{p.citationsCount} Citations</span>
                </div>
              </div>
            ))}
          </div>

          {/* Core datasets outline */}
          <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5 space-y-3">
            <span className="block text-[10px] font-mono text-slate-500 uppercase">Evaluation Datasets</span>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-cyber-green" /> MITRE Shield telemetry</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-cyber-green" /> LANL Cyber security logs</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-cyber-green" /> AlertWeave Synthetic Active APT</li>
            </ul>
          </div>
        </div>

        {/* RIGHT ACTIVE PAPER ABSTRACT & FORMALISM DETAILS */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-6">
            {/* Paper Header */}
            <div className="space-y-2 border-b border-white/5 pb-4">
              <span className="text-cyber-purple text-xs font-mono font-bold tracking-wider uppercase">{activePaper.venue} ({activePaper.year})</span>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-white leading-tight">
                {activePaper.title}
              </h2>
              <p className="text-xs text-slate-400 font-mono italic">
                Authors: {activePaper.authors.join(', ')}
              </p>
            </div>

            {/* Paper Abstract */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                <Quote className="w-4 h-4 text-cyber-purple shrink-0" />
                <span>SCIENTIFIC ABSTRACT SUMMARY</span>
              </div>
              <p className="text-sm font-serif text-slate-300 leading-relaxed text-justify">
                {activePaper.abstract}
              </p>
            </div>

            {/* Hypergraph math mathematical formulas represent */}
            <div className="space-y-3">
              <span className="block text-[10px] font-mono text-slate-500 uppercase">Mathematical Formalization Index</span>
              <div className="p-4 bg-slate-950 rounded-xl border border-white/5 flex flex-col items-center justify-center space-y-2 font-mono text-xs md:text-sm text-cyber-blue shadow-inner">
                <p className="text-white font-bold">{mathEquation}</p>
                <span className="text-[9px] text-slate-500">Equation 1.1: Temporal-Identity Causal Correlation Probability Function</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Where <strong className="text-white">ΔT</strong> represents temporal proximity mapping intervals, <strong className="text-white">I_res</strong> calculates cross-endpoint user directory identity resolution convergence vectors, and <strong className="text-white">G_cosine</strong> maps cosine semantic similarities between raw event payloads.
              </p>
            </div>

            {/* Universal schema display */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>UNIVERSAL ALERT TELEMETRY SCHEMA (UAS)</span>
                <span className="text-cyber-green font-bold">JSON NORMALIZATION CORE</span>
              </div>
              <div className="relative">
                <pre className="p-4 bg-slate-950 rounded-xl border border-white/5 text-[11px] font-mono text-slate-300 overflow-x-auto text-left leading-relaxed">
                  {JSON.stringify(universalSchemaJson, null, 2)}
                </pre>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-900 border border-white/10 rounded font-mono text-[8px] text-slate-500 uppercase">
                  schema blueprint
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
