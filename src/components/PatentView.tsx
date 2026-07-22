import React, { useState } from 'react';
import { Shield, Award, Calendar, FileText, CheckCircle, Clock, Cpu, Users, Layers, AlertCircle, ArrowLeft } from 'lucide-react';
import { PatentClaim } from '../types';
import { mockPatents } from '../data/mockData';

interface PatentViewProps {
  onBack?: () => void;
}

export default function PatentView({ onBack }: PatentViewProps) {
  const [selectedPatentId, setSelectedPatentId] = useState<string>(mockPatents[0].id);
  const activePatent = mockPatents.find(p => p.id === selectedPatentId) || mockPatents[0];

  const patentTimeline = [
    { year: '2024', event: 'Initial conception & hypergraph architecture design', desc: 'Conceived causal hypergraph alert distillation index in response to enterprise client fatigue audits.' },
    { year: '2024', event: 'First provisional Indian Patent Office (IPO) utility filing', desc: 'Documented core algebraic formula representations and entity resolution proxies under priority code IN-2024110442.' },
    { year: '2025', event: 'Hypergraph Engine Lab Prototype completed', desc: 'Achieved 98% reduction results across initial LANL and synthetic log benchmarks in academic sandboxes.' },
    { year: '2026', event: 'Full Patent Grant approved by Indian Patent Office (IPO)', desc: 'Granted under registration IN-202611044238-A for automated threat reconstitution.' }
  ];

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
              Patent IP Portfolio
              <span className="text-xs font-mono px-2 py-0.5 bg-cyber-green/15 text-cyber-green rounded-full font-bold uppercase tracking-wider">
                IP Protected
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              INDIAN PATENT OFFICE (IPO) UTILITY CLAIMS & REGISTERED INTELLECTUAL PROPERTY
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PATENT DIRECTORY */}
        <div className="lg:col-span-4 space-y-4">
          <span className="block text-xs font-mono text-slate-500 uppercase tracking-widest px-1">REGISTERED CLAIMS</span>
          <div className="space-y-3">
            {mockPatents.map((pat) => (
              <div 
                key={pat.id}
                onClick={() => setSelectedPatentId(pat.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  pat.id === selectedPatentId 
                    ? 'bg-[#151B2F] border-cyber-green shadow-[0_0_15px_rgba(0,255,136,0.15)]' 
                    : 'bg-slate-900/40 hover:bg-slate-900 border-white/5'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mb-1">
                  <span>{pat.filingNumber}</span>
                  <span className={`px-2 py-0.5 text-[8px] font-mono font-bold rounded uppercase ${
                    pat.status === 'Granted' ? 'bg-cyber-green/15 text-cyber-green' : 'bg-cyber-purple/15 text-cyber-purple'
                  }`}>
                    {pat.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-2">{pat.title}</h4>
              </div>
            ))}
          </div>

          {/* Quick patent highlight block */}
          <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5 space-y-3 font-mono text-xs">
            <span className="block text-slate-500 text-[10px] uppercase">LEGAL NOTICES</span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              AlertWeave™ is a registered trademark. The causal correlation algebraic structures, universal entity mapping records, and local container air-gapped architectures are protected under international utility IP codes.
            </p>
          </div>
        </div>

        {/* RIGHT ACTIVE PATENT DETAIL & TIMELINE */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Patent Details card */}
          <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-6">
            <div className="space-y-2 border-b border-white/5 pb-4">
              <div className="flex justify-between items-center">
                <span className="text-cyber-green text-xs font-mono font-bold tracking-wider uppercase">Filing Code: {activePatent.filingNumber}</span>
                <span className="text-slate-500 font-mono text-xs">Filed: {activePatent.filingDate}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-white leading-tight">
                {activePatent.title}
              </h2>
              <p className="text-xs text-slate-400 font-mono italic">
                Inventors: {activePatent.inventors.join(', ')}
              </p>
            </div>

            {/* Abstract */}
            <div className="space-y-1.5 text-xs">
              <span className="block text-[10px] font-mono text-slate-500 uppercase">Patent abstract blueprint</span>
              <p className="text-slate-300 leading-relaxed font-sans bg-slate-950 p-4 rounded-xl border border-white/5">
                {activePatent.abstract}
              </p>
            </div>

            {/* Claims Checklist */}
            <div className="space-y-3 text-xs">
              <span className="block text-[10px] font-mono text-slate-500 uppercase">Documented Patent Claims ({activePatent.claims.length})</span>
              <div className="space-y-2 font-mono">
                {activePatent.claims.map((cl, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-white/5 flex gap-3 items-start">
                    <span className="text-cyber-green font-bold shrink-0">Claim {idx + 1}.</span>
                    <p className="text-slate-400 leading-relaxed text-[11px]">{cl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ACTIVE PATENT TIMELINE CARD */}
          <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-6">
            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">UTILITY INNOVATION TIMELINE</span>
            
            <div className="relative pl-6 border-l border-white/10 space-y-6 text-xs font-mono">
              {patentTimeline.map((item, i) => (
                <div key={i} className="relative">
                  {/* Visual timeline node */}
                  <span className="absolute -left-[28.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyber-green border-2 border-slate-950 animate-pulse" />
                  
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 space-y-1 text-left">
                    <span className="text-cyber-green font-bold text-xs">{item.year}</span>
                    <h4 className="text-white font-bold text-xs leading-tight">{item.event}</h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
