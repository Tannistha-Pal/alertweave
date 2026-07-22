import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, FileText, Download, ArrowLeft, RefreshCw, Layers, Server, User, Terminal, Cpu, Clock, Check, Printer, X } from 'lucide-react';
import { SecurityIncident } from '../types';
import { mockIncidents } from '../data/mockData';

interface IncidentDetailsViewProps {
  incidentId: string;
  onBackToList: () => void;
}

export default function IncidentDetailsView({ incidentId, onBackToList }: IncidentDetailsViewProps) {
  const incident = mockIncidents.find((inc) => inc.id === incidentId) || mockIncidents[0];
  const [mitigationChecked, setMitigationChecked] = useState<Record<string, boolean>>({});
  const [showExportModal, setShowExportModal] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const toggleMitigation = (recText: string) => {
    setMitigationChecked((prev) => ({
      ...prev,
      [recText]: !prev[recText]
    }));
  };

  const handleExportPdf = () => {
    setGeneratingPdf(true);
    setTimeout(() => {
      setGeneratingPdf(false);
      setShowExportModal(true);
    }, 1800);
  };

  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>AlertWeave Briefing Report - ${incident.id}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.5;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 20px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .header-title h1 {
      font-size: 28px;
      margin: 0 0 5px 0;
      text-transform: uppercase;
      font-weight: 900;
    }
    .header-title span {
      font-size: 10px;
      font-family: monospace;
      color: #64748b;
      letter-spacing: 0.1em;
    }
    .confidential {
      font-size: 12px;
      font-family: monospace;
      color: #475569;
      margin-top: 5px;
      font-weight: bold;
    }
    .header-meta {
      text-align: right;
      font-family: monospace;
      font-size: 12px;
      color: #64748b;
    }
    .section-title {
      font-size: 16px;
      font-family: monospace;
      font-weight: bold;
      text-transform: uppercase;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 5px;
      margin-top: 30px;
      margin-bottom: 15px;
      color: #1e293b;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-family: monospace;
      font-size: 12px;
      margin-top: 15px;
      margin-bottom: 15px;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f1f5f9;
      color: #334155;
    }
    .timeline-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 15px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-family: monospace;
      font-size: 11px;
    }
    .timeline-time {
      font-weight: bold;
      white-space: nowrap;
    }
    .timeline-event {
      flex: 1;
      color: #0f172a;
    }
    .timeline-source {
      color: #64748b;
      white-space: nowrap;
    }
    .footer {
      margin-top: 50px;
      border-top: 1px solid #cbd5e1;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .seal-container {
      display: flex;
      gap: 15px;
      align-items: center;
    }
    .seal {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 4px double #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 10px;
      text-align: center;
    }
    .seal-meta {
      font-family: monospace;
      font-size: 10px;
      color: #64748b;
    }
    .signature {
      text-align: right;
      font-family: monospace;
      font-size: 12px;
    }
    .signature-line {
      border-bottom: 1px solid #0f172a;
      width: 180px;
      margin-bottom: 5px;
      font-style: italic;
    }
    @media print {
      body {
        padding: 0;
      }
      .print-btn {
        display: none;
      }
    }
    .print-btn-container {
      margin-top: 30px;
      text-align: right;
    }
    .print-btn {
      background-color: #0f172a;
      color: #ffffff;
      border: none;
      padding: 10px 20px;
      font-family: monospace;
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 6px;
    }
    .print-btn:hover {
      background-color: #1e293b;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-title">
      <span>ALERTMAP SECURITY LEDGER INCIDENT REPORT</span>
      <h1>ALERTWEAVE BRIEFING REPORT</h1>
      <div class="confidential">CONFIDENTIAL // NATIONAL SECURITY PROTOCOL APPROVED</div>
    </div>
    <div class="header-meta">
      <div>DOCUMENT NO: ${incident.id}</div>
      <div>COMPILED: ${new Date().toLocaleDateString()}</div>
    </div>
  </div>

  <div class="section-title">1. Executive Cyber Summary</div>
  <p style="font-size: 14px; font-family: serif; color: #334155;">
    This document records the incident threat analysis synthesized by the AlertWeave Hypergraph Engine. The network security cluster identified highly coordinated lateral traversal originating from known Tor nodes and executing credentials dumping on Primary Active Directory systems.
  </p>

  <table>
    <thead>
      <tr>
        <th>THREAT CLASSIFICATION</th>
        <th>CAUSAL CERTAINTY SCORE</th>
        <th>RAW ALERTS INVOLVED</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>${incident.title}</strong></td>
        <td><strong>${incident.confidence}% Score</strong></td>
        <td><strong>${incident.alertCount} events</strong></td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">2. Reconstructed Chronological Sequence</div>
  <div>
    ${(incident.timeline || []).map(ev => `
      <div class="timeline-item">
        <span class="timeline-time">${ev.time} UTC</span>
        <span class="timeline-event">${ev.event}</span>
        <span class="timeline-source">Source: ${ev.source}</span>
      </div>
    `).join('')}
  </div>

  <div class="footer">
    <div class="seal-container">
      <div class="seal">SECURE<br>SEAL</div>
      <div class="seal-meta">
        <div>DIGITAL VALIDATION CODE: AW-904-CS-984</div>
        <div>APPROVED UNDER PATENT CLAIMS US-2026-0442388</div>
      </div>
    </div>
    <div class="signature">
      <div class="signature-line" style="border-bottom: 1px solid #000; padding-bottom: 5px;">Dr. Helen Vance</div>
      <div style="font-size: 10px; color: #64748b;">CHIEF CYBER FORENSICS OFFICER // ALERTWEAVE INC</div>
    </div>
  </div>

  <div class="print-btn-container">
    <button class="print-btn" onclick="window.print()">Print Report / Save to PDF</button>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AlertWeave_Report_${incident.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTxt = () => {
    let txt = `==================================================\n`;
    txt += `ALERTMAP SECURITY LEDGER INCIDENT REPORT\n`;
    txt += `ALERTWEAVE BRIEFING REPORT\n`;
    txt += `CONFIDENTIAL // NATIONAL SECURITY PROTOCOL APPROVED\n`;
    txt += `==================================================\n\n`;
    txt += `DOCUMENT NO: ${incident.id}\n`;
    txt += `COMPILED: ${new Date().toLocaleDateString()}\n\n`;
    txt += `1. Executive Cyber Summary\n`;
    txt += `--------------------------\n`;
    txt += `This document records the incident threat analysis synthesized by the AlertWeave Hypergraph Engine. The network security cluster identified highly coordinated lateral traversal originating from known Tor nodes and executing credentials dumping on Primary Active Directory systems.\n\n`;
    txt += `THREAT CLASSIFICATION: ${incident.title}\n`;
    txt += `CAUSAL CERTAINTY SCORE: ${incident.confidence}% Score\n`;
    txt += `RAW ALERTS INVOLVED: ${incident.alertCount} events\n\n`;
    txt += `2. Reconstructed Chronological Sequence\n`;
    txt += `---------------------------------------\n`;
    (incident.timeline || []).forEach((ev) => {
      txt += `[${ev.time} UTC] - ${ev.event} (Source: ${ev.source})\n`;
    });
    txt += `\n==================================================\n`;
    txt += `DIGITAL VALIDATION CODE: AW-904-CS-984\n`;
    txt += `APPROVED UNDER PATENT CLAIMS US-2026-0442388\n`;
    txt += `CHIEF CYBER FORENSICS OFFICER: Dr. Helen Vance\n`;
    txt += `ALERTWEAVE INC\n`;
    txt += `==================================================\n`;

    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AlertWeave_Report_${incident.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-12 relative">
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
        <button
          onClick={onBackToList}
          className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-white/5 rounded-lg text-cyber-blue hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={handleExportPdf}
            className="px-4 py-2 bg-[#151B2F] border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-slate-950 text-xs font-bold font-mono rounded-xl transition-all flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center"
          >
            {generatingPdf ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Compiling Report...
              </>
            ) : (
              <>
                <Printer className="w-3.5 h-3.5" />
                Export Executive PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* CORE STATS HIGHLIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 space-y-1">
          <span className="block text-[10px] font-mono text-slate-500 uppercase">Threat ID</span>
          <span className="block text-lg font-mono text-cyber-blue font-bold">{incident.id}</span>
        </div>

        <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 space-y-1">
          <span className="block text-[10px] font-mono text-slate-500 uppercase">Alert Reduction Density</span>
          <span className="block text-lg font-mono text-cyber-green font-bold">-{incident.reductionRatio}% Ratio</span>
        </div>

        <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 space-y-1">
          <span className="block text-[10px] font-mono text-slate-500 uppercase">Causal Certainty Weight</span>
          <span className="block text-lg font-mono text-cyber-purple font-bold">{incident.confidence}% Score</span>
        </div>

        <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 space-y-1">
          <span className="block text-[10px] font-mono text-slate-500 uppercase">Current Contain State</span>
          <span className="block text-lg font-mono text-cyber-red font-bold uppercase animate-pulse">{incident.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT MAIN STORY BLOCK */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Causal Attack Incident Summary */}
          <div className="p-6 bg-[#151B2F]/40 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyber-blue font-bold">
              <Shield className="w-4.5 h-4.5" />
              <span>CAUSAL THREAT HYPERGRAPH STORY</span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-display font-bold text-white leading-snug">
              {incident.title}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {incident.summary}
            </p>

            {/* AI Reasoning explainability block */}
            <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyber-purple font-bold">
                <Cpu className="w-4 h-4" />
                <span>Explainable AI Core Reasoning</span>
              </div>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                {incident.aiReasoning}
              </p>
            </div>
          </div>

          {/* CHRONOLOGICAL EVENT TIMELINE */}
          <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-mono text-cyber-orange font-bold">
                <Clock className="w-4.5 h-4.5" />
                <span>TEMPORAL INCIDENT CHRONOLOGY</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">SORTED BY ASCENDING UTC TIME</span>
            </div>

            <div className="relative pl-6 border-l border-white/10 space-y-6 text-xs">
              {incident.timeline?.map((ev, idx) => (
                <div key={idx} className="relative">
                  {/* Glowing vertical point */}
                  <span className={`absolute -left-[28.5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${
                    ev.severity === 'critical' ? 'bg-cyber-red animate-ping' : 
                    ev.severity === 'high' ? 'bg-cyber-orange' : 'bg-cyber-blue'
                  }`} />

                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 space-y-2">
                    <div className="flex justify-between items-center font-mono">
                      <span className="text-slate-500 font-bold">{ev.time} UTC</span>
                      <span className="text-[10px] text-cyber-blue font-semibold">{ev.source}</span>
                    </div>
                    <p className="text-white font-semibold">{ev.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT PLAYBOOKS & EVIDENCE PANEL */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* PLAYBOOK AUDIT ACTUATION */}
          <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyber-green font-bold">
              <CheckCircle className="w-4.5 h-4.5" />
              <span>DEFENSIVE PLAYBOOK ACTUATION</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Check active parameters below to automatically deploy endpoint isolation, proxy blocks, or credential session revocation on standard AD.
            </p>

            <div className="space-y-2.5 pt-2">
              {incident.recommendations?.map((rec: any, idx: number) => {
                const recText = typeof rec === 'string' ? rec : rec.text;
                const isChecked = mitigationChecked[recText] || false;
                return (
                  <div 
                    key={idx}
                    onClick={() => toggleMitigation(recText)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex gap-3 items-start ${
                      isChecked 
                        ? 'bg-cyber-green/10 border-cyber-green/30' 
                        : 'bg-slate-950 hover:bg-slate-900 border-white/5'
                    }`}
                  >
                    <div className={`mt-0.5 w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked ? 'bg-cyber-green border-cyber-green text-slate-950' : 'border-white/20'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className={`text-xs leading-relaxed font-mono ${isChecked ? 'text-cyber-green' : 'text-slate-300'}`}>
                      {recText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ENTERPRISE RISK SCORE CARD (IMPROVEMENT 15) */}
          <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-cyber-orange font-bold">
                <Shield className="w-4.5 h-4.5 text-cyber-orange" />
                <span>ENTERPRISE RISK SCORE MATRIX</span>
              </div>
              <span className="text-[9px] font-mono bg-cyber-red/10 text-cyber-red border border-cyber-red/20 px-2 py-0.5 rounded-full font-bold">
                HIGH THREAT
              </span>
            </div>

            {/* Core Score Circle and Dial */}
            <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5 flex items-center justify-between gap-4 font-mono">
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 uppercase block">Calculated Exposure</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-cyber-red font-display">87</span>
                  <span className="text-xs text-slate-500">/ 100</span>
                </div>
                <span className="text-[10px] text-slate-400 block leading-tight">Priority Incident Triage Code Red</span>
              </div>
              
              {/* Mini visual indicator segments */}
              <div className="flex gap-1 shrink-0">
                {[...Array(10)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`w-1.5 h-6 rounded-sm ${
                      i < 8 
                        ? i < 4 
                          ? 'bg-cyber-blue' 
                          : i < 7 
                            ? 'bg-cyber-orange animate-pulse' 
                            : 'bg-cyber-red animate-pulse'
                        : 'bg-slate-800'
                    }`} 
                  />
                ))}
              </div>
            </div>

            {/* Breakdown Parameters */}
            <div className="space-y-3 font-mono text-[10px] text-slate-400">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Asset Criticality (Crown Jewels):</span>
                  <span className="text-white font-bold">9.4 / 10 (Critical)</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyber-red h-full rounded-full" style={{ width: '94%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Exploit Vector Severity:</span>
                  <span className="text-white font-bold">8.8 / 10 (Abuse)</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyber-orange h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Lateral Movement Velocity:</span>
                  <span className="text-white font-bold">High (12 hops/sec)</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyber-purple h-full rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* CRITICAL FORENSIC EVIDENCE */}
          <div className="p-6 bg-[#151B2F]/40 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyber-red font-bold">
              <Terminal className="w-4.5 h-4.5" />
              <span>COGNITIVE FORENSIC EVIDENCE</span>
            </div>

            <div className="space-y-3">
              {incident.evidence?.map((ev, idx) => (
                <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1.5 font-mono text-[10px]">
                  <div className="flex justify-between items-center text-slate-500">
                    <span>{ev.type}</span>
                    <span className="text-cyber-red font-bold">CRITICAL</span>
                  </div>
                  <p className="text-white font-bold break-all">{ev.value}</p>
                  <p className="text-slate-400">{ev.assessment}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* PDF EXPORT PRESENTATION BRIEFING MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-filter backdrop-blur-sm z-50 flex justify-center items-start p-4 md:p-8 overflow-y-auto">
          {/* Floating close button at the top-right of the viewport so it is ALWAYS accessible */}
          <button 
            onClick={() => setShowExportModal(false)}
            className="fixed top-6 right-6 z-[60] p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full border border-white/15 transition-all flex items-center justify-center cursor-pointer shadow-2xl hover:scale-105 active:scale-95 print:hidden"
            title="Go Back to Details (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="bg-white text-slate-900 max-w-4xl w-full rounded-2xl p-8 space-y-8 shadow-2xl relative my-8 print:my-0">
            {/* Top close button inside report */}
            <div className="flex justify-end print:hidden">
              <button 
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold font-mono rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Close Preview
              </button>
            </div>

            {/* Document Header */}
            <div className="border-b-2 border-slate-900 pb-6 flex justify-between items-start">
              <div>
                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">ALERTMAP SECURITY LEDGER INCIDENT REPORT</span>
                <h1 className="text-3xl font-serif font-black tracking-tight text-slate-900 uppercase">ALERTWEAVE BRIEFING REPORT</h1>
                <span className="block text-xs font-mono text-slate-600 mt-1">CONFIDENTIAL // NATIONAL SECURITY PROTOCOL APPROVED</span>
              </div>
              <div className="text-right font-mono text-xs text-slate-500">
                <span>DOCUMENT NO: {incident.id}</span>
                <span className="block">COMPILED: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* Incident Summary */}
            <div className="space-y-4">
              <h3 className="text-base font-mono font-bold uppercase border-b border-slate-300 pb-1 text-slate-800">1. Executive Cyber Summary</h3>
              <p className="text-sm font-serif leading-relaxed text-slate-800">
                This document records the incident threat analysis synthesized by the AlertWeave Hypergraph Engine. The network security cluster identified highly coordinated lateral traversal originating from known Tor nodes and executing credentials dumping on Primary Active Directory systems.
              </p>
              <table className="w-full text-left font-mono text-xs border border-slate-300">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-2 border border-slate-300">THREAT CLASSIFICATION</th>
                    <th className="p-2 border border-slate-300">CAUSAL CERTAINTY SCORE</th>
                    <th className="p-2 border border-slate-300">RAW ALERTS INVOLVAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-slate-300 font-bold">{incident.title}</td>
                    <td className="p-2 border border-slate-300 font-bold">{incident.confidence}% Score</td>
                    <td className="p-2 border border-slate-300 font-bold">{incident.alertCount} events</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Chronology List for Briefing */}
            <div className="space-y-3">
              <h3 className="text-base font-mono font-bold uppercase border-b border-slate-300 pb-1 text-slate-800">2. Reconstructed Chronological Sequence</h3>
              <div className="space-y-3 font-mono text-[11px] text-slate-700">
                {incident.timeline?.map((ev, i) => (
                  <div key={i} className="flex justify-between items-start gap-4 border-b border-slate-100 pb-1.5">
                    <span className="font-bold whitespace-nowrap">{ev.time} UTC</span>
                    <p className="flex-1 text-slate-900">{ev.event}</p>
                    <span className="text-slate-500 whitespace-nowrap">Source: {ev.source}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seal of Validation and signatures */}
            <div className="pt-12 border-t border-slate-300 flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-full border-4 border-double border-slate-800 flex items-center justify-center font-serif text-[11px] font-black text-center text-slate-800 select-none">
                  SECURE<br />SEAL
                </div>
                <div className="font-mono text-[10px] text-slate-500">
                  <span className="block">DIGITAL VALIDATION CODE: AW-904-CS-984</span>
                  <span className="block">APPROVED UNDER PATENT CLAIMS US-2026-0442388</span>
                </div>
              </div>

              <div className="text-right font-mono text-xs space-y-4">
                <div className="border-b border-slate-900 w-44 inline-block text-center italic text-slate-600 font-serif">Dr. Helen Vance</div>
                <span className="block text-[10px] text-slate-500">CHIEF CYBER FORENSICS OFFICER // ALERTWEAVE INC</span>
              </div>
            </div>

            {/* Print and Download Actions footer */}
            <div className="flex flex-wrap justify-between items-center pt-6 border-t border-slate-100 print:hidden gap-4">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs font-mono rounded-xl transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back to Details
              </button>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleDownloadHtml}
                  className="px-5 py-2.5 bg-[#151B2F] hover:bg-[#1a223c] border border-cyber-blue/30 text-cyber-blue font-bold text-xs font-mono rounded-xl transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  Download HTML Report
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold text-xs font-mono rounded-xl transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  Download TXT Report
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono rounded-xl transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
