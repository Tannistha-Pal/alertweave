import React, { useState } from 'react';
import { Shield, Sparkles, Send, CheckCircle, Database, Server, Cpu, Layers, HelpCircle, Users, Mail, Globe, ArrowLeft } from 'lucide-react';

interface AboutContactViewProps {
  onBack?: () => void;
}

export default function AboutContactView({ onBack }: AboutContactViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    org: '',
    deployment: 'saas',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  const techStack = [
    { name: 'React 19 / TypeScript', role: 'State Machine & Component architecture' },
    { name: 'Tailwind CSS v4.0', role: 'Cyber glassmorphic styling and layouts' },
    { name: 'Framer Motion 12', role: 'Dynamic micro-interactions and visual timelines' },
    { name: 'Lucide React', role: 'System-wide secure vector iconography' },
    { name: 'Express / CJS Causal Core', role: 'High-speed event trace normalization' }
  ];

  const roadmapItems = [
    { period: 'Q3 2026', title: 'Multi-Tenant Sovereign Clusters', desc: 'Isolating decentralized hypergraph caches across global cloud sectors.' },
    { period: 'Q4 2026', title: 'Local Offline Edge LLM Integration', desc: 'Shipping lightweight local models for high-security airgapped military deployments.' },
    { period: 'Q1 2027', title: 'Self-Healing Causal Playbook Actuation', desc: 'Integrating machine-learned agent chains to automatically contain lateral movements.' }
  ];

  return (
    <div className="space-y-12 pb-12">
      
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
              Company & Contact Core
              <span className="text-xs font-mono px-2 py-0.5 bg-cyber-blue/15 text-cyber-blue rounded-full font-bold uppercase tracking-wider">
                About Us
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              DISCOVER OUR MISSION, SYSTEM ROADMAP, AND CONTACT CHANNELS
            </p>
          </div>
        </div>
      </div>
      
      {/* SECTION 1: ABOUT / MISSION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-slate-900/40 p-8 rounded-2xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-blue/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded-full text-xs font-mono font-bold uppercase text-cyber-blue">
            <Globe className="w-4 h-4 text-cyber-blue" />
            AlertWeave Research Initiative
          </div>
          <h2 className="text-3xl font-display font-bold text-white leading-tight">
            Our Mission: Eradicate Alert Fatigue, Secure the Core
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            AlertWeave started as a pioneer research prototype engineered by computer science researchers, IP attorneys, and incident response makers. We realized that security teams fail to prevent major breaches not due to a lack of alerts, but because of the overwhelming noise of disconnected logs.
          </p>
          <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5 font-serif text-xs text-slate-400 italic">
            &quot;By shifting from isolated alerts to structured, chronological causal narratives, we restore absolute clarity to security operations and contain breaches before they execute ransomware payloads.&quot;
          </div>
        </div>

        {/* Tech Stack Bento list */}
        <div className="space-y-4">
          <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1">INTEGRATED ENGINEERING STACK</span>
          <div className="space-y-2">
            {techStack.map((tech, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-white/5 flex justify-between items-center font-mono text-[11px]">
                <span className="text-white font-bold">{tech.name}</span>
                <span className="text-slate-500 text-right text-[10px]">{tech.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROADMAP TIMELINE */}
      <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5 space-y-6">
        <div>
          <span className="text-xs font-mono text-cyber-purple uppercase tracking-wider font-bold">Strategic Vision</span>
          <h3 className="text-lg font-display font-bold text-white">Product Milestones Roadmap</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-left">
          {roadmapItems.map((item, i) => (
            <div key={i} className="p-4 bg-slate-950/60 rounded-xl border-t-2 border-cyber-purple border-x border-b border-white/5 space-y-2">
              <span className="text-cyber-purple font-bold text-xs">{item.period}</span>
              <h4 className="text-white font-bold text-xs leading-tight">{item.title}</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: DEMO REQUEST / CONTACT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Contact Info blocks */}
        <div className="p-6 bg-[#151B2F]/40 rounded-2xl border border-white/5 space-y-6">
          <div>
            <span className="text-xs font-mono text-cyber-blue uppercase tracking-wider font-bold font-display">Client Inquiries</span>
            <h3 className="text-lg font-display font-bold text-white">Enterprise Engagement</h3>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Have questions regarding our sovereign airgapped licensing formats, patent documentation, or academic data sets? Book an evaluation session with our solutions engineering team.
          </p>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-xl border border-white/5">
               <Mail className="w-4 h-4 text-cyber-blue" />
               <div>
                 <span className="block text-slate-500 text-[9px] uppercase">Research Ingress Email</span>
                 <span className="text-white">escalations@alertweave.in / support@alertweave.com</span>
               </div>
             </div>

             <div className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-xl border border-white/5">
               <Globe className="w-4 h-4 text-cyber-purple" />
               <div>
                 <span className="block text-slate-500 text-[9px] uppercase">Primary Research Hub</span>
                 <span className="text-white">AlertWeave Tech Park, Outer Ring Road, Bengaluru, KA, India</span>
               </div>
             </div>
           </div>
         </div>

         {/* Dynamic Demo request form */}
         <div className="p-6 bg-slate-900/40 rounded-2xl border border-white/5">
           {submitted ? (
             <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 font-mono">
               <div className="w-16 h-16 rounded-full bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center text-cyber-green">
                 <CheckCircle className="w-8 h-8 animate-bounce" />
               </div>
               <div className="space-y-1">
                 <h4 className="text-white font-bold text-sm">Sandbox Pilot Registered</h4>
                 <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans leading-relaxed">
                   Thank you, <strong className="text-white">{formData.name}</strong>. A lead prototype researcher will coordinate an evaluation sandbox setup at <strong className="text-white">{formData.email}</strong> shortly.
                 </p>
               </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-900 rounded-xl border border-white/10 text-xs text-slate-300"
              >
                Book Another Evaluation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs text-left">
              <div className="space-y-1">
                <label className="block text-slate-400 uppercase tracking-wider text-[10px]">Your Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Dr. Vikram Iyer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-400 uppercase tracking-wider text-[10px]">Work Corporate Email *</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. v.iyer@cert-in.org.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-400 uppercase tracking-wider text-[10px]">Organization / Agency *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. CERT-In (Computer Emergency Response Team India)"
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-400 uppercase tracking-wider text-[10px]">DEPLOYMENT SPECIFICATION PREFERENCE</label>
                <select 
                  value={formData.deployment}
                  onChange={(e) => setFormData({ ...formData, deployment: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue"
                >
                  <option value="saas">SaaS Gateway (Multi-tenant Managed Cloud)</option>
                  <option value="airgapped">Sovereign Air-gapped (Private Local Container Cluster)</option>
                  <option value="research">Academic Research Cooperation</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-400 uppercase tracking-wider text-[10px]">EVALUATION BRIEFING SPECIFICATION</label>
                <textarea 
                  rows={3}
                  placeholder="Inquire about custom webhook parsers, temporal latency parameters, or patent timeline approvals..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-white/5 rounded-xl text-white focus:outline-none focus:border-cyber-blue"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 font-bold rounded-xl hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit Sandbox Request
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
