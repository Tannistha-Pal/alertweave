import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, User, Server, Cpu, Layers, GitMerge, Split, Plus, Trash, Eye, Settings, HelpCircle, Activity, PlayCircle, ArrowLeft } from 'lucide-react';
import { SecurityIncident } from '../types';
import { mockIncidents } from '../data/mockData';

interface IncidentListViewProps {
  activeIncidentId: string;
  onSelectIncident: (incId: string) => void;
  onNavigateToDetails: () => void;
  onBack?: () => void;
}

export default function IncidentListView({ 
  activeIncidentId, 
  onSelectIncident, 
  onNavigateToDetails,
  onBack
}: IncidentListViewProps) {
  const [incidents, setIncidents] = useState<SecurityIncident[]>(mockIncidents);
  const [selectedIncidentIds, setSelectedIncidentIds] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newSeverity, setNewSeverity] = useState<'critical' | 'high' | 'medium' | 'low'>('high');

  const selectedIncident = incidents.find((inc) => inc.id === activeIncidentId) || incidents[0];

  const handleSelectCheckbox = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering standard list item selection
    setSelectedIncidentIds((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id: string, nextStatus: SecurityIncident['status']) => {
    setIncidents((prev) => 
      prev.map((inc) => inc.id === id ? { ...inc, status: nextStatus, updatedAt: new Date().toISOString() } : inc)
    );
  };

  const handleMergeIncidents = () => {
    if (selectedIncidentIds.length < 2) return;

    const mergeTargets = incidents.filter((inc) => selectedIncidentIds.includes(inc.id));
    const primary = mergeTargets[0];

    const mergedIncident: SecurityIncident = {
      ...primary,
      id: `INC-MERGED-${Math.floor(Math.random() * 900) + 100}`,
      title: `Merged Threat Campaign: ${primary.title} & Partners`,
      summary: `Consolidated attack campaign encompassing related actions across ${mergeTargets.length} separate threads: ${mergeTargets.map((m) => m.title).join(', ')}.`,
      alertCount: mergeTargets.reduce((sum, m) => sum + m.alertCount, 0),
      hostCount: Math.max(...mergeTargets.map((m) => m.hostCount)),
      userCount: Math.max(...mergeTargets.map((m) => m.userCount)),
      reductionRatio: 99.5,
      confidence: Math.round(mergeTargets.reduce((sum, m) => sum + m.confidence, 0) / mergeTargets.length),
      updatedAt: new Date().toISOString(),
      timeline: mergeTargets.flatMap((m) => m.timeline).sort((a, b) => a.time.localeCompare(b.time)),
      evidence: mergeTargets.flatMap((m) => m.evidence)
    };

    setIncidents((prev) => [mergedIncident, ...prev.filter((inc) => !selectedIncidentIds.includes(inc.id))]);
    setSelectedIncidentIds([]);
    onSelectIncident(mergedIncident.id);
  };

  const handleSplitIncident = (id: string) => {
    const target = incidents.find((inc) => inc.id === id);
    if (!target) return;

    const splitA: SecurityIncident = {
      ...target,
      id: `${target.id}-A`,
      title: `${target.title} (Subset A)`,
      alertCount: Math.round(target.alertCount / 2),
      summary: `${target.summary} - Sub-thread A separated by analyst for segmented playbook remediation.`,
      updatedAt: new Date().toISOString()
    };

    const splitB: SecurityIncident = {
      ...target,
      id: `${target.id}-B`,
      title: `${target.title} (Subset B)`,
      alertCount: Math.round(target.alertCount / 2),
      summary: `${target.summary} - Sub-thread B representing secondary egress activity.`,
      updatedAt: new Date().toISOString()
    };

    setIncidents((prev) => [splitA, splitB, ...prev.filter((inc) => inc.id !== id)]);
    onSelectIncident(splitA.id);
  };

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newInc: SecurityIncident = {
      id: `INC-2026-00${incidents.length + 1}`,
      title: newTitle,
      status: 'active',
      severity: newSeverity,
      confidence: 85,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      alertCount: 1,
      reductionRatio: 90,
      hostCount: 1,
      userCount: 1,
      mitreMapping: [{ tactic: 'Initial Access', technique: 'Spearphishing Attachment', code: 'T1566.001' }],
      summary: newSummary || 'Analyst created security threat thread referencing active forensic research findings.',
      aiReasoning: 'This incident was created manually by an authorized SOC Analyst. Automatic correlation engine tracking has been bound to subsequent alerts featuring associated file signatures.',
      explainabilityText: 'Manual analyst correlation active. Confidence weight is standard (0.85).',
      timeline: [{ time: '06:00:00', event: 'Incident registered manually via SOC console', source: 'Analyst Interface', severity: 'high' }],
      evidence: [{ type: 'Custom Tag', value: 'Manual-Incident', assessment: 'Analyst assessed' }],
      recommendations: ['Perform initial system scan across affected subnet.'],
      nodes: [],
      edges: []
    };

    setIncidents((prev) => [newInc, ...prev]);
    onSelectIncident(newInc.id);
    setShowCreateModal(false);
    setNewTitle('');
    setNewSummary('');
  };

  return (
    <div className="space-y-8 pb-12 relative">
      {/* Page Header and Global Actions */}
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
              Dynamic Incident Hub
              <span className="text-xs font-mono px-2 py-0.5 bg-cyber-purple/15 text-cyber-purple rounded-full font-bold uppercase tracking-wider">
                Triage Panel
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              MERGE, SPLIT, OR ASSOCIATE THREAT STORIES TO DIRECT AUTOMATED ACTION
            </p>
          </div>
        </div>

        {/* Action Panel Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {selectedIncidentIds.length >= 2 && (
            <button
              onClick={handleMergeIncidents}
              className="px-4 py-2 bg-cyber-blue/15 hover:bg-cyber-blue border border-cyber-blue/30 text-cyber-blue hover:text-slate-950 text-xs font-bold font-mono rounded-xl transition-all flex items-center gap-2"
            >
              <GitMerge className="w-3.5 h-3.5" />
              Merge {selectedIncidentIds.length} Selected
            </button>
          )}

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 text-xs font-bold rounded-xl hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Create Incident
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: LIST OF INCIDENTS */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest px-1">ACTIVE INVESTIGATIONS ({incidents.length})</div>
          
          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-2">
            {incidents.map((inc) => {
              const isSelected = inc.id === activeIncidentId;
              const isChecked = selectedIncidentIds.includes(inc.id);

              return (
                <div
                  key={inc.id}
                  onClick={() => onSelectIncident(inc.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all relative ${
                    isSelected 
                      ? 'bg-[#151B2F] border-cyber-blue shadow-[0_0_15px_rgba(0,229,255,0.05)]' 
                      : 'bg-slate-900/40 hover:bg-slate-900/80 border-white/5'
                  }`}
                >
                  {/* Select Box for Merger */}
                  <div 
                    onClick={(e) => handleSelectCheckbox(inc.id, e)}
                    className={`absolute top-4 left-4 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      isChecked 
                        ? 'bg-cyber-blue border-cyber-blue' 
                        : 'border-white/20 hover:border-white/50'
                    }`}
                  >
                    {isChecked && <div className="w-2 h-2 bg-slate-950 rounded-sm" />}
                  </div>

                  <div className="pl-6 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] font-mono font-bold text-cyber-blue">{inc.id}</span>
                        <span className={`px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase rounded ${
                          inc.severity === 'critical' ? 'bg-cyber-red/10 text-cyber-red' : 'bg-cyber-orange/10 text-cyber-orange'
                        }`}>
                          {inc.severity}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded ${
                        inc.status === 'active' ? 'bg-cyber-red/10 text-cyber-red animate-pulse' :
                        inc.status === 'investigating' ? 'bg-cyber-orange/10 text-cyber-orange' :
                        inc.status === 'contained' ? 'bg-cyber-blue/10 text-cyber-blue' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {inc.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-1">{inc.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{inc.summary}</p>

                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono pt-2 border-t border-white/5">
                      <span>{inc.alertCount} related alerts</span>
                      <span className="text-cyber-green font-bold">Conf: {inc.confidence}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: QUICK TRACE AND PLAYBOOK BOARD */}
        <div className="lg:col-span-7 space-y-6">
          {selectedIncident ? (
            <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-6 relative">
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <button
                  onClick={() => handleSplitIncident(selectedIncident.id)}
                  className="p-2 bg-slate-950 hover:bg-slate-900 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-colors"
                  title="Split Incident"
                >
                  <Split className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onNavigateToDetails}
                  className="px-3 py-1.5 bg-cyber-blue text-slate-950 text-xs font-bold rounded-xl hover:bg-cyan-300 transition-colors flex items-center gap-1"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  Full Story Visualizer
                </button>
              </div>

              {/* Header Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyber-blue">{selectedIncident.id}</span>
                  <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full uppercase ${
                    selectedIncident.severity === 'critical' ? 'bg-cyber-red/15 text-cyber-red border border-cyber-red/20' : 'bg-cyber-orange/15 text-cyber-orange border border-cyber-orange/20'
                  }`}>
                    {selectedIncident.severity}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Reduction Ratio: -{selectedIncident.reductionRatio}%</span>
                </div>

                <h3 className="text-xl font-display font-bold text-white pr-24">{selectedIncident.title}</h3>
              </div>

              {/* Quick Status Control */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5 space-y-3">
                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Active State Triage Override</span>
                <div className="flex flex-wrap gap-2">
                  {(['active', 'investigating', 'contained', 'resolved'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedIncident.id, st)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all ${
                        selectedIncident.status === st 
                          ? 'bg-cyber-blue/15 text-cyber-blue border-cyber-blue/30 shadow' 
                          : 'bg-slate-900 hover:bg-slate-800 border-white/5 text-slate-400'
                      }`}
                    >
                      {st.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Reasoning and Story explainability */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyber-purple font-bold">
                  <Cpu className="w-4 h-4" />
                  <span>ALERTWEAVE AI CORRELATION SUMMARY</span>
                </div>
                <div className="p-4 bg-cyber-purple/5 border border-cyber-purple/15 rounded-xl space-y-2">
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {selectedIncident.aiReasoning}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono italic">
                    {selectedIncident.explainabilityText}
                  </p>
                </div>
              </div>

              {/* MITRE technique alignment */}
              <div className="space-y-3">
                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">MITRE ATT&CK Matrix Alignment</span>
                <div className="flex flex-wrap gap-2">
                  {selectedIncident.mitreMapping?.map((mit, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-1 bg-slate-950 rounded-lg border border-white/5 text-[10px] font-mono text-slate-300 flex items-center gap-1.5"
                    >
                      <Shield className="w-3 h-3 text-cyber-blue" />
                      <strong>{mit.code}</strong> {mit.technique} ({mit.tactic})
                    </span>
                  ))}
                </div>
              </div>

              {/* Affected Entities */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase">Affected Subnets / Hosts</span>
                  <span className="block text-sm font-semibold text-white mt-1 flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-cyber-blue" /> {selectedIncident.hostCount} Endpoints
                  </span>
                </div>

                <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase">Hijacked Account Entities</span>
                  <span className="block text-sm font-semibold text-white mt-1 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-cyber-purple" /> {selectedIncident.userCount} Accounts
                  </span>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-sm font-mono border border-dashed border-white/10 rounded-2xl">
              No Incident Selected or Found.
            </div>
          )}
        </div>

      </div>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handleCreateIncident}
            className="glass-panel-heavy p-6 max-w-lg w-full rounded-2xl border border-white/15 space-y-4 shadow-2xl shadow-cyber-purple/20"
          >
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyber-blue" />
                Register Custom Incident Thread
              </h3>
              <button 
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                [Esc]
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block text-slate-400 font-mono">INCIDENT TITLE *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Compromised Developer Workstation RDP Burst" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-cyber-blue"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-400 font-mono">SEVERITY LEVEL *</label>
                <select 
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-950 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-cyber-blue"
                >
                  <option value="critical">CRITICAL (System Isolation Target)</option>
                  <option value="high">HIGH (Active Triage Queue)</option>
                  <option value="medium">MEDIUM (Periodic Audit Queue)</option>
                  <option value="low">LOW (Audit Ledger Only)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-400 font-mono">AI CORRELATION OVERRIDE SUMMARY</label>
                <textarea 
                  rows={3}
                  placeholder="Describe associated file system, network subnet anomalies, or target process paths..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-cyber-blue"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/5">
              <button 
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-slate-900 text-slate-400 hover:text-white font-bold rounded-xl"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 font-bold rounded-xl hover:shadow-lg hover:shadow-cyber-blue/20"
              >
                Commit Threat Incident
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
