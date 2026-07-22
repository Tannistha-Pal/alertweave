import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, Zap, Cpu, Terminal, ChevronRight, Lock, Award, FileText, CheckCircle, HelpCircle, ArrowRight, Activity, Database, Globe, ChevronUp, ChevronDown, Menu, X, Send, MessageSquare, RefreshCw, Github, Linkedin, Twitter, Mail, AlertTriangle } from 'lucide-react';
import AlertWeaveLogo from './AlertWeaveLogo';

interface LandingPageProps {
  onEnterDashboard: () => void;
  onEnterAuth: () => void;
  onEnterAbout: () => void;
}

function SelfBuildingGraph() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 6);
    }, 3000); // 3 seconds per stage, completes in 18 seconds, resets!
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-cyber-blue/10">
      {/* Top UI Bar */}
      <div className="bg-slate-950/80 px-3 py-2 sm:px-4 sm:py-2.5 border-b border-white/5 flex justify-between items-center text-[10px] sm:text-xs font-mono">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyber-red animate-pulse" />
          <span className="text-slate-300 font-bold">HYPERGRAPH_CONSTRUCT_ENGINE</span>
        </div>
        <div className="text-slate-500 flex items-center gap-1.5 sm:gap-2">
          <span>STATUS:</span>
          <span className="text-cyber-blue animate-pulse font-bold">ACTIVE</span>
        </div>
      </div>

      <div className="p-2 sm:p-5 bg-slate-900/60 space-y-2.5 sm:space-y-5">
        {/* Main Canvas Area */}
        <div className="h-36 sm:h-56 relative bg-slate-950/70 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyber-blue/5 pointer-events-none" />
          <div className="absolute w-[200%] h-[200%] cyber-grid opacity-15 rotate-12 pointer-events-none" />

          {/* Incoming alerts streaming in (drifting dots in background) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
              transition={{ repeat: Infinity, duration: 8 }}
              className="absolute top-6 left-1/4 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyber-blue/40" 
            />
            <motion.div 
              animate={{ x: [0, -50, 0], y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 10 }}
              className="absolute bottom-12 right-1/4 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-cyber-purple/40" 
            />
            <motion.div 
              animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="absolute top-12 right-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyber-green/30" 
            />
          </div>

          {/* STEP 1: Tor Proxy Node Spawns */}
          {stage >= 1 && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-2 left-2 sm:top-8 sm:left-8 p-1 sm:p-2.5 bg-slate-950/90 rounded-xl border border-cyber-red/50 shadow-[0_0_15px_rgba(239,68,68,0.15)] flex items-center gap-1 sm:gap-2 z-10"
            >
              <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-cyber-red animate-ping" />
              <div className="font-mono text-[7px] sm:text-[9px] text-left leading-tight">
                <p className="text-cyber-red font-bold font-sans uppercase text-[6px] sm:text-[8px]">Inbound Traffic</p>
                <p className="text-white font-bold leading-tight">Tor Exit Node</p>
                <p className="text-slate-500 text-[6px] sm:text-[8px]">185.220.101.4</p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Identity Compromise Node Spawns */}
          {stage >= 2 && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute bottom-2 left-3 sm:bottom-8 sm:left-12 p-1 sm:p-2.5 bg-slate-950/90 rounded-xl border border-cyber-purple/50 shadow-[0_0_15px_rgba(139,92,246,0.15)] flex items-center gap-1 sm:gap-2 z-10"
            >
              <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-cyber-purple" />
              <div className="font-mono text-[7px] sm:text-[9px] text-left leading-tight">
                <p className="text-cyber-purple font-bold font-sans uppercase text-[6px] sm:text-[8px]">Identity Alert</p>
                <p className="text-white font-bold leading-tight">adm_security</p>
                <p className="text-slate-500 text-[6px] sm:text-[8px]">Priv Escalated</p>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Server Compromise Node Spawns */}
          {stage >= 3 && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-2 right-2 sm:top-12 sm:right-12 p-1 sm:p-2.5 bg-slate-950/90 rounded-xl border border-cyber-blue/50 shadow-[0_0_15px_rgba(0,229,255,0.15)] flex items-center gap-1 sm:gap-2 z-10"
            >
              <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-cyber-blue" />
              <div className="font-mono text-[7px] sm:text-[9px] text-left leading-tight">
                <p className="text-cyber-blue font-bold font-sans uppercase text-[6px] sm:text-[8px]">Target Entity</p>
                <p className="text-white font-bold leading-tight">SQL-PROD-09</p>
                <p className="text-slate-500 text-[6px] sm:text-[8px]">DB Server</p>
              </div>
            </motion.div>
          )}

          {/* Neon Lines Connecting Nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {stage >= 4 && (
              <>
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                  d="M60,35 L70,110" 
                  stroke="#8B5CF6" 
                  strokeWidth="1.5" 
                  fill="none" 
                  className="block sm:hidden animate-pulse"
                />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                  d="M100,70 L120,165" 
                  stroke="#8B5CF6" 
                  strokeWidth="1.5" 
                  fill="none" 
                  className="hidden sm:block animate-pulse"
                />
              </>
            )}
            {stage >= 5 && (
              <>
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                  d="M85,110 L160,50" 
                  stroke="#00E5FF" 
                  strokeWidth="1.5" 
                  fill="none" 
                  className="block sm:hidden"
                />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                  d="M175,170 L340,110" 
                  stroke="#00E5FF" 
                  strokeWidth="1.5" 
                  fill="none" 
                  className="hidden sm:block"
                />
              </>
            )}
          </svg>

          {/* Central AI Correlation Overlay Indicator */}
          {stage >= 5 && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-x-2 inset-y-2 sm:inset-x-6 sm:inset-y-6 border-2 border-dashed border-cyber-green/30 bg-slate-950/95 rounded-2xl flex flex-col items-center justify-center space-y-0.5 sm:space-y-2 z-20 shadow-2xl shadow-cyber-green/5"
            >
              <div className="relative w-5 h-5 sm:w-8 sm:h-8 bg-cyber-green/15 rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 sm:w-4.5 sm:h-4.5 text-cyber-green animate-pulse" />
              </div>
              <div className="text-center font-mono space-y-0.5">
                <span className="text-[7px] sm:text-[10px] bg-cyber-green/15 text-cyber-green px-1.5 sm:px-2 py-0.5 rounded font-bold">HYPERGRAPH CORRELATION</span>
                <p className="text-[8px] sm:text-[11px] text-white font-bold leading-tight">Story Synthesized: INC-2026-004</p>
                <p className="text-[7px] sm:text-[9px] text-slate-400">Distilled 142 alerts into 1 path</p>
              </div>
            </motion.div>
          )}

          {/* Baseline scanning loop indicator */}
          {stage === 0 && (
            <div className="flex flex-col items-center justify-center space-y-1.5 sm:space-y-3 font-mono">
              <RefreshCw className="w-4.5 h-4.5 sm:w-6 sm:h-6 text-slate-500 animate-spin" />
              <div className="text-center text-[8px] sm:text-[10px] text-slate-500">
                <p className="uppercase tracking-wider">Ingesting Telemetry Streams</p>
                <p className="text-cyber-blue font-bold animate-pulse">CORRELATING WINDOW...</p>
              </div>
            </div>
          )}
        </div>

        {/* AI Synthesis Summary Card */}
        <AnimatePresence mode="wait">
          {stage >= 5 ? (
            <motion.div 
              key="synthesis-active"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-slate-950/80 p-2.5 sm:p-4 rounded-2xl border border-cyber-green/20 space-y-1.5 sm:space-y-2 cursor-default text-left"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping" />
                  <span className="text-[10px] sm:text-xs font-mono text-cyber-green font-bold uppercase tracking-wider">AI Synthesis Story</span>
                </div>
                <span className="text-[8px] sm:text-[10px] font-mono font-bold px-1 py-0.5 bg-cyber-green/15 text-cyber-green rounded-md">
                  CONFIDENCE: 98.4%
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed font-mono">
                &gt; Attacker linked from Tor proxy (185.220.101.4) compromised admin credential (adm_security). Used session tickets to move laterally to critical database host SQL-PROD-09. Containment playbooks prepared.
              </p>
              <div className="flex justify-between text-[8px] sm:text-[9px] text-slate-500 font-mono">
                <span>142 total logs collapsed</span>
                <span>Impact: 1 Server, 1 Identity</span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="synthesis-pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-slate-950/40 p-2.5 sm:p-4 rounded-2xl border border-white/5 space-y-1.5 sm:space-y-2 cursor-default text-left min-h-[75px] sm:min-h-[110px] flex flex-col justify-center animate-pulse"
            >
              <div className="flex justify-between items-center text-[8px] sm:text-[10px] font-mono text-slate-500">
                <span>INGESTION RATE: 14,200 EVENTS/S</span>
                <span>STAGE: {stage} / 5</span>
              </div>
              <div className="w-full bg-slate-900 h-1 sm:h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-cyber-blue h-full"
                  animate={{ width: `${(stage / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-[9px] sm:text-[10px] font-mono text-slate-400 italic text-center leading-relaxed">
                {stage === 0 && 'Awaiting telemetry alerts stream...'}
                {stage === 1 && 'Ingested inbound Tor proxy probe alert from Palo Alto networks.'}
                {stage === 2 && 'Ingested AD account privilege escalation audit logs.'}
                {stage === 3 && 'Detected anomalous database server SQL session credentials access.'}
                {stage === 4 && 'Correlating process signatures with hypergraph heuristics...'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const FAQItem: React.FC<{ faq: { q: string; a: string }; idx: number }> = ({ faq, idx }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsOpen(!isOpen)}
      whileHover={{ y: -2, scale: 1.01 }}
      className={`p-6 bg-[#151B2F]/40 rounded-2xl border transition-all cursor-pointer space-y-2 select-none group ${
        isOpen || isHovered 
          ? 'border-cyber-blue/40 shadow-[0_0_15px_rgba(0,229,255,0.1)] bg-[#151B2F]/60' 
          : 'border-white/5'
      }`}
    >
      <div className="flex gap-2 justify-between items-start text-white font-bold text-sm md:text-base">
        <div className="flex gap-2 items-start">
          <HelpCircle className="w-5 h-5 text-cyber-blue shrink-0 mt-0.5 group-hover:text-cyber-green transition-colors" />
          <h4 className="group-hover:text-cyber-blue transition-colors text-left">{faq.q}</h4>
        </div>
        <motion.div
          animate={{ rotate: isOpen || isHovered ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-500 shrink-0 mt-1"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {(isOpen || isHovered) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-slate-300 text-xs md:text-sm pl-7 leading-relaxed pt-2 text-left">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function LandingPage({ onEnterDashboard, onEnterAuth, onEnterAbout }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('solution');
  const [copiedText, setCopiedText] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Proposal modal states
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [proposalType, setProposalType] = useState<'enterprise' | 'airgapped'>('enterprise');
  const [modalFormData, setModalFormData] = useState({
    name: '',
    email: '',
    org: '',
    useCase: ''
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalSubmitting(true);
    setTimeout(() => {
      setModalSubmitting(false);
      setModalSubmitted(true);
      setTimeout(() => {
        setModalSubmitted(false);
        setProposalModalOpen(false);
        setModalFormData({ name: '', email: '', org: '', useCase: '' });
      }, 3500);
    }, 1200);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    { label: 'Alert Correlation Reduction', value: '98.4%', desc: 'Distills thousands of alerts into single stories' },
    { label: 'Mean Time to Contain (MTTC)', value: '14x Faster', desc: 'Down from 8 hours to under 34 minutes' },
    { label: 'False Positive Filter Accuracy', value: '99.1%', desc: 'Powered by Hypergraph Causal Engines' },
    { label: 'MITRE ATT&CK Matrix Overlay', value: '100%', desc: 'Instant native technique cross-mapping' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Hypergraph Correlation Engine',
      desc: 'Connects the dots between unrelated identity, file, endpoint, and network logs across diverse SIEM sensors.',
    },
    {
      icon: Cpu,
      title: 'Explainable Generative AI',
      desc: 'Translates cryptographic alerts and complex PowerShell telemetry into natural language security summaries and playbooks.',
    },
    {
      icon: Zap,
      title: 'Automated Playbook Triggering',
      desc: 'Isolates endpoints, revokes Active Directory tokens, and blocks Tor traffic at the border with single-click actions.',
    },
    {
      icon: Database,
      title: 'Universal Telemetry Schema',
      desc: 'Parses and normalizes Syslog, AWS CloudTrail, CrowdStrike Falcon, SentinelOne, and Okta formats seamlessly.',
    },
    {
      icon: Globe,
      title: 'Geospatial Botnet Tracking',
      desc: 'Correlates inbound traffic paths from active Tor exit nodes, DigitalOcean proxies, and residential scrapers.',
    },
    {
      icon: Terminal,
      title: 'Causal Chain Lineage Trace',
      desc: 'Visualize processes, child spawns, credential hashes, and registry keys in a beautifully structured causal attack graph.',
    }
  ];

  const faqs = [
    { q: 'How does AlertWeave achieve a 98.4% alert reduction ratio?', a: 'By transitioning from traditional pattern matching to multi-dimensional hypergraph models. Rather than notifying analysts of each individual event, we calculate the causal probability that events belong to the same threat lineage, unifying them into a single incident.' },
    { q: 'Is AlertWeave compatible with our existing CrowdStrike, Palo Alto, and Okta setups?', a: 'Yes. Our platform defines a Universal Alert Schema that integrates natively with major SIEM, XDR, and IAM providers via secure webhook proxies. No custom parser writing is required.' },
    { q: 'Can AlertWeave operate completely on-premise for government or military SOCs?', a: 'Yes. AlertWeave can be deployed in fully air-gapped private sovereign clouds or on-premise clusters. Our architecture supports localized LLM models for offline threat synthesis.' }
  ];

  return (
    <div className="min-h-screen bg-cyber-bg text-slate-100 font-sans selection:bg-cyber-blue selection:text-slate-900 overflow-x-hidden relative">
      
      {/* Background Matrix & Radar Sweep overlay */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cyber-blue/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-cyber-purple/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Network Nodes (Interactive Canvas/SVG Style) */}
      <div className="absolute top-24 left-10 w-full max-w-sm h-64 pointer-events-none opacity-40">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="100" cy="150" r="4" fill="#00E5FF" className="animate-pulse" />
          <circle cx="250" cy="100" r="3" fill="#8B5CF6" />
          <circle cx="300" cy="280" r="5" fill="#00FF88" className="animate-pulse" />
          <path d="M100,150 L250,100 L300,280 Z" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="1" fill="none" />
          <circle cx="180" cy="200" r="2" fill="#F8FAFC" />
          <line x1="100" y1="150" x2="180" y2="200" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" />
          <line x1="250" y1="100" x2="180" y2="200" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" />
          <line x1="300" y1="280" x2="180" y2="200" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-navbar py-2.5 px-3 sm:py-4 sm:px-6 md:px-12 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          onClick={() => {
            scrollToTop();
            setMobileMenuOpen(false);
          }}
          title="Scroll to Top"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-[#050816] border border-cyber-blue/30 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-cyber-blue/20 group-hover:scale-105 transition-transform shrink-0">
            <AlertWeaveLogo className="w-5 h-5 sm:w-6 sm:h-6" />
            <div className="absolute -inset-0.5 rounded-lg sm:rounded-xl bg-cyber-blue/20 blur opacity-25" />
          </div>
          <div className="min-w-0">
            <span className="font-display font-bold text-sm sm:text-xl tracking-tight text-white group-hover:text-cyber-blue transition-colors block leading-none">AlertWeave</span>
            <span className="block text-[8px] sm:text-[9px] font-mono tracking-widest text-cyber-blue font-bold uppercase leading-none mt-1">Causal SOC AI</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button 
            onClick={() => scrollToSection('why')} 
            className="hover:text-cyber-blue transition-colors cursor-pointer text-left bg-transparent border-none font-medium text-slate-300 hover:scale-105 transform active:scale-95 duration-150"
          >
            Why AlertWeave
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            className="hover:text-cyber-blue transition-colors cursor-pointer text-left bg-transparent border-none font-medium text-slate-300 hover:scale-105 transform active:scale-95 duration-150"
          >
            Core Platform
          </button>
          <button 
            onClick={() => scrollToSection('research')} 
            className="hover:text-cyber-blue transition-colors cursor-pointer text-left bg-transparent border-none font-medium text-slate-300 hover:scale-105 transform active:scale-95 duration-150"
          >
            Research & Patents
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="hover:text-cyber-blue transition-colors cursor-pointer text-left bg-transparent border-none font-medium text-slate-300 hover:scale-105 transform active:scale-95 duration-150"
          >
            About Us
          </button>
          <button 
            onClick={() => scrollToSection('pricing')} 
            className="hover:text-cyber-blue transition-colors cursor-pointer text-left bg-transparent border-none font-medium text-slate-300 hover:scale-105 transform active:scale-95 duration-150"
          >
            Prototype Models
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-16">
          <button 
            id="btn-nav-login"
            onClick={onEnterAuth}
            className="px-5 py-2.5 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 font-bold text-sm rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all cursor-pointer flex items-center gap-2 border border-cyber-blue/40"
          >
            Portal Access
          </button>
          <button
            id="btn-nav-demo"
            onClick={onEnterDashboard}
            className="px-5 py-2.5 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 font-bold text-sm rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all cursor-pointer flex items-center gap-2 border border-cyber-blue/40"
          >
            Launch SOC Console
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              onEnterDashboard();
              setMobileMenuOpen(false);
            }}
            className="px-2 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 font-bold text-[10px] sm:text-xs rounded-md sm:rounded-lg hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all cursor-pointer flex items-center gap-1 border border-cyber-blue/40 whitespace-nowrap shrink-0"
          >
            Launch Console
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-white/10 hover:border-cyber-blue/50 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyber-blue transition-all cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown Panel & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-x-0 bottom-0 top-[73px] bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Dropdown Menu */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-[73px] left-0 right-0 z-50 glass-navbar p-6 flex flex-col gap-6 lg:hidden shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
            >
              <div className="flex flex-col gap-2 font-mono text-[10px] text-cyber-blue font-bold uppercase tracking-wider">
                <span>Navigate Sections</span>
                <div className="h-[1px] bg-white/5 w-full" />
              </div>
              <nav className="flex flex-col gap-1 text-sm font-medium">
                <button 
                  onClick={() => {
                    scrollToSection('why');
                    setMobileMenuOpen(false);
                  }} 
                  className="hover:text-cyber-blue text-left bg-transparent border-none text-slate-300 py-3 border-b border-white/5 flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <span>Why AlertWeave</span>
                  <ChevronRight className="w-4 h-4 text-cyber-blue/40 group-hover:text-cyber-blue transition-colors" />
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('features');
                    setMobileMenuOpen(false);
                  }} 
                  className="hover:text-cyber-blue text-left bg-transparent border-none text-slate-300 py-3 border-b border-white/5 flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <span>Core Platform</span>
                  <ChevronRight className="w-4 h-4 text-cyber-blue/40 group-hover:text-cyber-blue transition-colors" />
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('research');
                    setMobileMenuOpen(false);
                  }} 
                  className="hover:text-cyber-blue text-left bg-transparent border-none text-slate-300 py-3 border-b border-white/5 flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <span>Research & Patents</span>
                  <ChevronRight className="w-4 h-4 text-cyber-blue/40 group-hover:text-cyber-blue transition-colors" />
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('about');
                    setMobileMenuOpen(false);
                  }} 
                  className="hover:text-cyber-blue text-left bg-transparent border-none text-slate-300 py-3 border-b border-white/5 flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <span>About Us</span>
                  <ChevronRight className="w-4 h-4 text-cyber-blue/40 group-hover:text-cyber-blue transition-colors" />
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('pricing');
                    setMobileMenuOpen(false);
                  }} 
                  className="hover:text-cyber-blue text-left bg-transparent border-none text-slate-300 py-3 border-b border-white/5 flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <span>Prototype Models</span>
                  <ChevronRight className="w-4 h-4 text-cyber-blue/40 group-hover:text-cyber-blue transition-colors" />
                </button>
              </nav>

              <div className="flex flex-col gap-3 pt-2">
                <button 
                  onClick={() => {
                    onEnterAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 font-bold text-center rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 border border-cyber-blue/40 text-sm"
                >
                  Portal Access
                </button>
                <button
                  onClick={() => {
                    onEnterDashboard();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 font-bold text-center rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 border border-cyber-blue/40 text-sm"
                >
                  Launch SOC Console
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative pt-28 lg:pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded-full">
            <Sparkles className="w-4 h-4 text-cyber-blue animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-blue">Next-Gen Hypergraph Correlation Engine</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight leading-tight">
            From Alert Floods to <br />
            <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green bg-clip-text text-transparent">
              Intelligent Incident Stories
            </span>
          </h1>

          <p className="text-md md:text-lg font-semibold text-cyber-blue max-w-2xl mx-auto lg:mx-0 leading-relaxed uppercase font-mono">
            AI-powered Incident Correlation Platform that transforms thousands of security alerts into explainable attack narratives.
          </p>

          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            AlertWeave intelligently parses, normalizes, and weaves thousands of fragmented corporate security alerts into evolving attack timelines. Dramatically reduce analyst alert fatigue, prevent data exfiltration, and speed up incident containment in under 30 seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0,229,255,0.3)" }}
              whileTap={{ scale: 0.98 }}
              id="btn-hero-launch"
              onClick={onEnterDashboard}
              className="px-6 py-3.5 bg-cyber-blue text-slate-950 font-bold text-base rounded-2xl hover:bg-cyan-300 transition-all cursor-pointer flex items-center gap-2"
            >
              Interactive Demo Cockpit
              <ArrowRight className="w-5 h-5 animate-bounce-horizontal" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              whileTap={{ scale: 0.98 }}
              id="btn-hero-auth"
              onClick={onEnterAuth}
              className="px-6 py-3.5 bg-slate-950/60 border border-white/10 hover:border-white/30 text-white font-bold text-base rounded-2xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Lock className="w-4 h-4 text-cyber-blue animate-pulse" />
              Sign In to Portal
            </motion.button>
          </div>

          {/* Core tech tags */}
          <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyber-green" /> patent protected</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyber-green" /> 98.4% alert reduction</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyber-green" /> mitre att&ck coverage</span>
          </div>
        </motion.div>

        {/* Hero Interactive Cockpit Preview Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full max-w-xl lg:max-w-none"
        >
          <SelfBuildingGraph />
        </motion.div>
      </section>

      {/* TRUSTED BY LOGOS */}
      <section className="border-y border-white/5 bg-slate-950/40 py-8 px-6 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">Securing the Enterprise Ecosystem</p>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-12 opacity-50 md:opacity-70 text-slate-400 font-display font-semibold text-sm md:text-base">
          <span className="hover:text-cyber-blue cursor-default tracking-wider">MICROSOFT SECURITY</span>
          <span className="hover:text-cyber-blue cursor-default tracking-wider">CROWDSTRIKE INC.</span>
          <span className="hover:text-cyber-blue cursor-default tracking-wider">PALO ALTO SECURE</span>
          <span className="hover:text-cyber-blue cursor-default tracking-wider">SENTINEL_ONE</span>
          <span className="hover:text-cyber-blue cursor-default tracking-wider">SPLUNK DEEP</span>
          <span className="hover:text-cyber-blue cursor-default tracking-wider">DATADOG APM</span>
        </div>
      </section>

      {/* THE COGNITIVE DILEMMA & ENTERPRISE TRANSFORMATION (BEFORE VS AFTER) */}
      <section id="why" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16 relative">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-cyber-red/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-2/4 right-1/4 w-[500px] h-[300px] bg-cyber-blue/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-red/10 border border-cyber-red/20 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyber-red">
            <AlertTriangle className="w-4 h-4 text-cyber-red" />
            The Deafening Cost of SIEM Alert Overload
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Stop Staring at Logs.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6]">Start Resolving Incidents.</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Classic Security Operations Centers aren't missing intrusions because they lack data—they miss them because they are drowning in it. Here is the dramatic transformation AlertWeave delivers.
          </p>
        </div>

        {/* SIDE-BY-SIDE TRANSFORMATION CANVAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: BEFORE ALERTWEAVE */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 bg-red-950/5 border border-cyber-red/20 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 bg-cyber-red text-slate-950 font-mono text-[9px] font-black uppercase tracking-wider rounded-bl-xl">
              Without AlertWeave
            </div>
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2.5 text-cyber-red">
                <Terminal className="w-5 h-5" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">Traditional SIEM & EDR Logs</span>
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white">The Defeated, Burned-Out Analyst</h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                An attacker slips through using credential dumping and executes lateral SQL execution. Over 4 hours, independent security systems trigger an endless, disconnected deluge of notifications, leaving analysts blind.
              </p>

              {/* Infinite Scrolling Terminal Simulation */}
              <div className="bg-slate-950/90 rounded-xl border border-cyber-red/20 p-4 h-48 overflow-hidden relative flex flex-col font-mono text-[10px] text-red-400">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none z-10" />
                <div className="flex justify-between items-center text-[9px] text-slate-500 border-b border-white/5 pb-1.5 mb-2 shrink-0">
                  <span>console.syslog_feed.bin</span>
                  <span className="text-cyber-red animate-pulse">● FEED OVERLOADED</span>
                </div>
                
                <div className="flex-1 space-y-1.5 overflow-hidden select-none animate-terminal-scroll">
                  <div className="flex justify-between items-center border-l-2 border-cyber-red/40 pl-2 py-0.5 bg-red-950/20">
                    <span>[AL-911] LSASS memory dump attempt DC-01</span>
                    <span className="text-cyber-red font-bold">14:02:11</span>
                  </div>
                  <div className="flex justify-between items-center border-l-2 border-cyber-red/40 pl-2 py-0.5 bg-red-950/20">
                    <span>[AL-914] Suspicious PowerShell encoded bypass WS-HR-12</span>
                    <span className="text-cyber-red font-bold">14:02:22</span>
                  </div>
                  <div className="flex justify-between items-center border-l-2 border-cyber-red/40 pl-2 py-0.5 bg-red-950/20">
                    <span>[AL-919] Inbound RDP external Tor IP 185.220.101.4</span>
                    <span className="text-cyber-red font-bold">14:03:01</span>
                  </div>
                  <div className="flex justify-between items-center border-l-2 border-cyber-red/40 pl-2 py-0.5 bg-red-950/20">
                    <span>[AL-924] Abnormal S3 bucket access AWS-Prod</span>
                    <span className="text-cyber-red font-bold">14:03:45</span>
                  </div>
                  <div className="flex justify-between items-center border-l-2 border-cyber-red/40 pl-2 py-0.5 bg-red-950/20">
                    <span>[AL-929] Kerberoasting ticket harvest ticket_rc4</span>
                    <span className="text-cyber-red font-bold">14:04:12</span>
                  </div>
                  <div className="flex justify-between items-center border-l-2 border-cyber-red/40 pl-2 py-0.5 bg-red-950/20">
                    <span>[AL-932] PowerShell task scheduler creation</span>
                    <span className="text-cyber-red font-bold">14:04:55</span>
                  </div>
                  <div className="flex justify-between items-center border-l-2 border-cyber-red/40 pl-2 py-0.5 bg-red-950/20">
                    <span>[AL-941] SQL database dump outbound spike</span>
                    <span className="text-cyber-red font-bold">14:05:01</span>
                  </div>
                </div>

                <div className="absolute bottom-2 left-4 right-4 z-20 bg-red-950/90 border border-cyber-red/50 p-2 rounded-lg text-center text-cyber-red font-bold text-[10px] animate-pulse">
                  ⚠️ 10,248 UNRESOLVED RAW EVENTS IN TARGET QUEUE
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Average SOC Triage Time:</span>
                <span className="text-cyber-red font-bold">4.2 Hours</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Analyst Alert Fatigue:</span>
                <span className="text-cyber-red font-bold">Extremely Critical (94%)</span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: WITH ALERTWEAVE */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 bg-slate-900/40 border border-cyber-blue/30 rounded-2xl relative overflow-hidden group shadow-[0_0_20px_rgba(0,229,255,0.05)]">
            <div className="absolute top-0 right-0 p-3 bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-slate-950 font-mono text-[9px] font-black uppercase tracking-wider rounded-bl-xl">
              Causal Engine Active
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2.5 text-cyber-blue">
                <Shield className="w-5 h-5 text-cyber-blue" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyber-blue">AlertWeave Correlation Core</span>
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white">Collapsing Noise Into Attack Stories</h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                AlertWeave absorbs those same 10,248 raw events, tracing temporal relationships and identity markers. Instantly, the chaos collapses into a single, comprehensive timeline with MITRE tags.
              </p>

              {/* Dynamic Collapsed Story Card Representation */}
              <div className="bg-slate-950/90 rounded-xl border border-cyber-blue/20 p-4 h-48 flex flex-col justify-between font-mono text-xs">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] text-cyber-blue font-bold tracking-widest block">WEAVEAI ENGINE RESOLUTION</span>
                    <h4 className="text-white font-bold font-display text-sm">Multi-Stage Active Directory Breach</h4>
                  </div>
                  <span className="px-2 py-0.5 bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/30 rounded text-[9px] font-bold">
                    98.4% CONFIDENCE
                  </span>
                </div>

                {/* collapsed elements chain representation */}
                <div className="flex items-center gap-2 py-2">
                  <div className="px-2 py-1 bg-red-950/40 border border-cyber-red/30 rounded text-[8px] font-bold text-cyber-red">10,248 ALERTS</div>
                  <span className="text-slate-500">➔</span>
                  <div className="px-2 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded text-[8px] font-bold text-cyber-blue">WEAVE CORE</div>
                  <span className="text-slate-500">➔</span>
                  <div className="px-2 py-1 bg-cyber-purple/20 border border-cyber-purple/30 rounded text-[8px] font-bold text-cyber-purple">34 CAUSAL ACTIONS</div>
                </div>

                <div className="p-2.5 bg-slate-900 border border-white/5 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
                    <span className="text-[10px] text-slate-300">Automated Playbook: Iso-host DC-01</span>
                  </div>
                  <button className="px-2.5 py-1 bg-cyber-green hover:bg-emerald-400 text-slate-950 font-bold text-[9px] rounded transition-all">
                    ACTIVATE BLOCK
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Mean Time To Contain (MTTC):</span>
                <span className="text-cyber-green font-bold">3.5 Minutes</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Total Alert Volume Reductions:</span>
                <span className="text-cyber-green font-bold">99.2% Saved</span>
              </div>
            </div>
          </div>

        </div>

        {/* HIGH-IMPACT ENTERPRISE VALUE METRICS CARDS */}
        <div className="pt-8">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-cyber-purple uppercase tracking-widest font-bold">Key Performance Indicators</span>
            <h3 className="text-lg font-display font-bold text-white mt-1">Guaranteed Financial & Defense Metrics</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Metric 1 */}
            <motion.div 
              whileHover={{ y: -4, borderColor: "rgba(0, 229, 255, 0.25)" }}
              className="p-6 bg-slate-900/30 rounded-2xl border border-white/5 text-center space-y-2 transition-all cursor-default"
            >
              <div className="text-4xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                92%
              </div>
              <span className="block text-xs font-mono font-bold text-cyber-blue uppercase tracking-wider">Alert Fatigue Reduction</span>
              <p className="text-[11px] text-slate-500 leading-normal">
                Completely eliminates analyst exhaust by grouping redundant, noisy SIEM telemetry logs.
              </p>
            </motion.div>

            {/* Metric 2 */}
            <motion.div 
              whileHover={{ y: -4, borderColor: "rgba(139, 92, 246, 0.25)" }}
              className="p-6 bg-slate-900/30 rounded-2xl border border-white/5 text-center space-y-2 transition-all cursor-default"
            >
              <div className="text-4xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-500">
                81%
              </div>
              <span className="block text-xs font-mono font-bold text-cyber-purple uppercase tracking-wider">SOC Investigation Saved</span>
              <p className="text-[11px] text-slate-500 leading-normal">
                Synthesizes complete lateral incident stories, shaving hours of manual endpoint forensics search.
              </p>
            </motion.div>

            {/* Metric 3 */}
            <motion.div 
              whileHover={{ y: -4, borderColor: "rgba(0, 229, 255, 0.25)" }}
              className="p-6 bg-slate-900/30 rounded-2xl border border-white/5 text-center space-y-2 transition-all cursor-default"
            >
              <div className="text-4xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
                67%
              </div>
              <span className="block text-xs font-mono font-bold text-cyber-green uppercase tracking-wider">False Positives Gone</span>
              <p className="text-[11px] text-slate-500 leading-normal">
                Verifies threats using cross-platform state convergence before screaming a critical alert.
              </p>
            </motion.div>

            {/* Metric 4 */}
            <motion.div 
              whileHover={{ y: -4, borderColor: "rgba(239, 68, 68, 0.25)" }}
              className="p-6 bg-slate-900/30 rounded-2xl border border-white/5 text-center space-y-2 transition-all cursor-default"
            >
              <div className="text-4xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-amber-500">
                3.5 Min
              </div>
              <span className="block text-xs font-mono font-bold text-cyber-orange uppercase tracking-wider">Mean Time To Contain</span>
              <p className="text-[11px] text-slate-500 leading-normal">
                Compresses defensive action reaction windows from 4.2 hours down to 3.5 minutes flat.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES & HIGHLIGHTS */}
      <section id="features" className="py-20 bg-slate-950/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-display font-bold text-white">Military-Grade Platform Capabilities</h2>
            <p className="text-slate-400 text-sm">
              We engineered AlertWeave to meet the robust performance, strict latency, and advanced data visualization needs of top tier enterprise SOCs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -6, scale: 1.02, boxShadow: "0 10px 30px -10px rgba(0, 229, 255, 0.2)" }}
                  className="p-6 bg-[#151B2F]/60 hover:bg-[#151B2F]/90 rounded-2xl border border-white/5 hover:border-cyber-blue/30 transition-all group duration-300 relative cursor-default"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
                  <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center border border-white/5 group-hover:border-cyber-blue/20 mb-6 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all">
                    <Icon className="w-5 h-5 text-cyber-blue group-hover:text-cyber-green transition-colors" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATISTICS & REAL VALUE */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {stats.map((st, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4, borderColor: "rgba(0, 229, 255, 0.25)", boxShadow: "0 8px 24px -8px rgba(0, 229, 255, 0.1)" }}
              className="p-6 bg-slate-900/30 rounded-2xl border border-white/5 text-center lg:text-left space-y-2 transition-all cursor-default"
            >
              <span className="block text-4xl font-display font-bold text-white tracking-tight glow-text-blue">{st.value}</span>
              <span className="block text-sm font-semibold text-cyber-blue">{st.label}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PATENT READY & RESEARCH SUMMARY */}
      <section id="research" className="py-20 bg-[#151B2F]/40 border-y border-white/5 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyber-purple/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-purple/15 border border-cyber-purple/20 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyber-purple">
              <Award className="w-4 h-4 text-cyber-purple" />
              Academic Research & Patent Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
              Backed by Peer-Reviewed Causal Network Innovations
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              AlertWeave was born as an advanced academic research project aimed at resolving alert flooding. Our core algorithms on multi-dimensional hypergraph construction, transient identity resolution vectors, and causal path synthesis are protected under active Patent applications.
            </p>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-slate-950/60 rounded-xl border border-white/5 space-y-3 cursor-default transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-cyber-blue font-bold">
                <FileText className="w-4 h-4" />
                <span>INDIAN PATENT No. IN-202611044238-A</span>
              </div>
              <p className="text-xs text-slate-400 italic">
                &quot;A probabilistic threat hypergraph correlation system for dynamically assembling fragmented security event payloads into chronological attack chains.&quot;
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.97 }}
                onClick={onEnterDashboard}
                className="px-5 py-2.5 bg-cyber-purple text-white font-bold text-xs rounded-xl hover:bg-violet-600 transition-all flex items-center gap-2 cursor-pointer"
              >
                Read Abstract & Patents
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Mock Research Citations Board */}
            <div className="glass-panel rounded-2xl border border-white/10 p-6 space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                <span>PEER REVIEW SUMMARY</span>
                <span className="text-cyber-green font-bold">CITATION SCORE: 130+</span>
              </div>
              
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="p-3 bg-slate-950/60 rounded-xl border-l-2 border-cyber-blue border-y border-r border-white/5 space-y-1 cursor-default transition-all"
                >
                  <span className="text-[10px] font-mono text-cyber-blue font-bold">IEEE TDSC 2026</span>
                  <p className="text-xs text-white font-bold">Weaving Security Telemetry: Enterprise-Scale Attack Story Reconstruction via Hypergraph Correlation Engines</p>
                  <p className="text-[10px] text-slate-500 font-mono">Authors: Vance, Wright, Vance</p>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="p-3 bg-slate-950/60 rounded-xl border-l-2 border-cyber-purple border-y border-r border-white/5 space-y-1 cursor-default transition-all"
                >
                  <span className="text-[10px] font-mono text-cyber-purple font-bold">ACM CCS 2025</span>
                  <p className="text-xs text-white font-bold">Causal Chain Extraction in Dense Cyber-Telemetry Networks</p>
                  <p className="text-[10px] text-slate-500 font-mono">Authors: Wright, Vance</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ABOUT US & MISSION/VISION SECTION */}
      <section id="about" className="py-24 bg-slate-950/25 border-b border-white/5 px-6 md:px-12 relative overflow-hidden">
        {/* Decorative subtle radar or node glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyber-blue/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyber-purple/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded-full text-xs font-mono font-bold uppercase text-cyber-blue">
              <Sparkles className="w-4 h-4 text-cyber-blue animate-pulse" />
              Sovereign Prototype Initiative
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">About AlertWeave</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              AlertWeave started as an independent research prototype engineered to solve the most painful bottleneck in modern cybersecurity: deafening alert noise. We transition Security Operations from isolated warnings into coherent, automated attack lineages.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Bento block 1: Mission & Origin */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4, borderColor: "rgba(0, 229, 255, 0.2)" }}
              className="p-8 bg-[#151B2F]/40 rounded-3xl border border-white/5 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="block font-mono text-[10px] text-cyber-blue uppercase font-bold tracking-widest">01 / OUR PROTO ORIGIN</span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white">Reimagining Incident Ingestion</h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans text-left">
                  Traditional Security Information and Event Management (SIEM) networks log every file deletion, unsuccessful login, and network hook as isolated, red-banner alerts. Analysts are flooded with thousands of alarms daily, causing critical lag that lets lateral ransomware thrive.
                </p>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans text-left">
                  We formulated a mathematical hypergraph correlation framework to solve this. Our algorithms connect separate endpoint alerts, user credentials, and server ports automatically, creating chronological threat lines in milliseconds.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyber-blue/10 flex items-center justify-center text-cyber-blue">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-white">Hypergraph Engine v1.0.4</span>
                  <span className="text-[10px] font-mono text-slate-500">Autonomous Causal Aggregation</span>
                </div>
              </div>
            </motion.div>

            {/* Bento block 2: Vision & Values */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              whileHover={{ y: -4, borderColor: "rgba(139, 92, 246, 0.2)" }}
              className="p-8 bg-[#151B2F]/40 rounded-3xl border border-white/5 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="block font-mono text-[10px] text-cyber-purple uppercase font-bold tracking-widest">02 / CORE VISION</span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white">Democratizing Defensive AI Graphing</h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans text-left">
                  As an open prototype, we believe enterprise security should be transparent, lightning-fast, and deeply visual. Our vision is to eliminate the requirement for proprietary black-box SIEM filters, replacing them with verifiable graph-theory lineages that run on-premise or in sovereign cloud instances.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-[11px] text-slate-400">
                  <div className="space-y-1.5 p-3 bg-slate-950/40 rounded-xl border border-white/5 text-left">
                    <span className="text-cyber-green font-bold">✓ OPEN PRINCIPLES</span>
                    <p className="text-[10px] text-slate-500 leading-normal">Published algorithms and transparent, math-grounded correlation probability models.</p>
                  </div>
                  <div className="space-y-1.5 p-3 bg-slate-950/40 rounded-xl border border-white/5 text-left">
                    <span className="text-cyber-purple font-bold">✓ SOVEREIGN SANDBOX</span>
                    <p className="text-[10px] text-slate-500 leading-normal">Ensuring air-gapped protection for sensitive state nodes and defense labs.</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyber-purple/10 flex items-center justify-center text-cyber-purple">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-white">Independent Security Group</span>
                  <span className="text-[10px] font-mono text-slate-500">Peer-Reviewed Threat Synthesis</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICING & DEPLOYMENT */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-display font-bold text-white">Prototype Delivery Models</h2>
          <p className="text-slate-400 text-sm">
            As an active research prototype developed by independent Indian security makers, we support dual piloting models for defense labs, national agencies, and critical infrastructure sandboxes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* SaaS Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.01, boxShadow: "0 20px 40px -15px rgba(0, 229, 255, 0.15)", borderColor: "rgba(0, 229, 255, 0.3)" }}
            className="p-8 bg-slate-900/40 rounded-3xl border border-white/5 transition-all space-y-6 flex flex-col justify-between relative overflow-hidden cursor-default"
          >
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-cyber-blue/10 text-cyber-blue font-mono text-[10px] uppercase font-bold rounded-full">Sovereign Cloud Sandbox</span>
              <h3 className="text-2xl font-display font-bold text-white">Cloud SaaS Gateway</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Ideal for sandbox evaluation, academic review, and test pipeline ingestion from your cloud logs. Fully hosted in secure local Indian datacenter infrastructure.
              </p>
              <div className="text-3xl font-display font-bold text-white">₹29,000 <span className="text-sm text-slate-500 font-sans font-normal">/ month (Research Sponsorship)</span></div>
              <ul className="space-y-2.5 font-mono text-xs text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyber-blue" /> Up to 5,000 alerts correlated/sec</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyber-blue" /> Native Cloud App Connectors</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyber-blue" /> 90 Days Telemetry Retaining</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyber-blue" /> Direct core-developer advisor channel</li>
              </ul>
            </div>
            <motion.button 
              whileHover={{ scale: 1.03, backgroundColor: "rgba(0, 229, 255, 1)", color: "#020617", boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setProposalType('enterprise');
                setProposalModalOpen(true);
              }}
              className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
            >
              Request Prototype Proposal
            </motion.button>
          </motion.div>

          {/* On-Premise Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.01, boxShadow: "0 20px 40px -15px rgba(139, 92, 246, 0.15)", borderColor: "rgba(139, 92, 246, 0.6)" }}
            className="p-8 bg-slate-900/40 rounded-3xl border-2 border-cyber-purple/50 transition-all space-y-6 flex flex-col justify-between relative overflow-hidden cursor-default"
          >
            <div className="absolute top-0 right-0 p-3 bg-cyber-purple text-slate-950 font-bold text-[9px] font-mono tracking-widest uppercase rounded-bl-xl">Airgapped Sandbox</div>
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-cyber-purple/15 text-cyber-purple font-mono text-[10px] uppercase font-bold rounded-full">Defense & State Sandboxes</span>
              <h3 className="text-2xl font-display font-bold text-white">Sovereign On-Prem</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Configured for airgapped installations within sovereign defense zones, IIT sandboxes, and government emergency response facilities.
              </p>
              <div className="text-3xl font-display font-bold text-white">Research Grant <span className="text-sm text-slate-500 font-sans font-normal">/ sponsorship</span></div>
              <ul className="space-y-2.5 font-mono text-xs text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyber-purple" /> Unlimited local alert streams</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyber-purple" /> Offline Causal Engines</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyber-purple" /> Air-gapped local build container</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyber-purple" /> Collaborative open research advisory</li>
              </ul>
            </div>
            <motion.button 
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)", backgroundImage: "linear-gradient(to right, #00E5FF, #8B5CF6)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setProposalType('airgapped');
                setProposalModalOpen(true);
              }}
              className="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 font-bold text-sm rounded-xl transition-all cursor-pointer"
            >
              Schedule Sandbox Deployment
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-20 bg-slate-950/20 border-t border-white/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-display font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">Clear insights regarding our causal threat model and system configuration.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#0A0E1A]/95 text-left py-16 px-6 md:px-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand block (takes 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#050816] border border-cyber-blue/30 rounded-xl flex items-center justify-center shadow-md">
                <AlertWeaveLogo className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-display font-bold text-lg tracking-wide text-white">AlertWeave</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              From Alert Floods to Intelligent Incident Stories. The AI-powered SOC platform that correlates thousands of alerts into evolving attack narratives.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-white/5 hover:border-cyber-blue/30 text-slate-400 hover:text-cyber-blue transition-all flex items-center justify-center"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-white/5 hover:border-cyber-blue/30 text-slate-400 hover:text-cyber-blue transition-all flex items-center justify-center"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-white/5 hover:border-cyber-blue/30 text-slate-400 hover:text-cyber-blue transition-all flex items-center justify-center"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="mailto:support@alertweave.com"
                className="w-9 h-9 rounded-full bg-slate-900 border border-white/5 hover:border-cyber-blue/30 text-slate-400 hover:text-cyber-blue transition-all flex items-center justify-center"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform Column */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-sm tracking-wider">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={onEnterDashboard} className="hover:text-cyber-blue transition-all bg-transparent border-none p-0 cursor-pointer text-left">
                  SOC Dashboard
                </button>
              </li>
              <li>
                <button onClick={onEnterDashboard} className="hover:text-cyber-blue transition-all bg-transparent border-none p-0 cursor-pointer text-left">
                  Live Incidents
                </button>
              </li>
              <li>
                <button onClick={onEnterDashboard} className="hover:text-cyber-blue transition-all bg-transparent border-none p-0 cursor-pointer text-left">
                  Attack Graph
                </button>
              </li>
              <li>
                <button onClick={onEnterDashboard} className="hover:text-cyber-blue transition-all bg-transparent border-none p-0 cursor-pointer text-left">
                  MITRE ATT&CK
                </button>
              </li>
              <li>
                <button onClick={onEnterDashboard} className="hover:text-cyber-blue transition-all bg-transparent border-none p-0 cursor-pointer text-left">
                  Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-sm tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollToSection('research')} className="hover:text-cyber-blue transition-all bg-transparent border-none p-0 cursor-pointer text-left">
                  Research
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('research')} className="hover:text-cyber-blue transition-all bg-transparent border-none p-0 cursor-pointer text-left">
                  Patent Overview
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-cyber-blue transition-all bg-transparent border-none p-0 cursor-pointer text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-cyber-blue transition-all bg-transparent border-none p-0 cursor-pointer text-left">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-sm tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-cyber-blue transition-all bg-transparent border-none p-0 cursor-pointer text-left">
                  Mission & Vision
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-cyber-blue transition-all bg-transparent border-none p-0 cursor-pointer text-left">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => alert('AlertWeave Careers: We are actively seeking brilliant cybersecurity prototype research fellows. Send your credentials to support@alertweave.com')} className="hover:text-cyber-blue transition-all bg-transparent border-none p-0 cursor-pointer text-left">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => alert('Sovereign Security Framework: Built with military-grade on-prem container configurations, verified under India ISO 27001 standards.')} className="hover:text-cyber-blue transition-all bg-transparent border-none p-0 cursor-pointer text-left">
                  Security
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 AlertWeave. Patent Pending. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-slate-500 font-medium">
            <a href="#privacy" className="hover:text-cyber-blue transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-cyber-blue transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-cyber-blue transition-colors">Security</a>
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, backgroundColor: "#00E5FF", color: "#020617" }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-slate-900/80 text-cyber-blue border border-cyber-blue/30 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all cursor-pointer z-50 animate-bounce"
            title="Scroll back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dynamic Pilot/Proposal Request Modal */}
      <AnimatePresence>
        {proposalModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!modalSubmitting) setProposalModalOpen(false);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-slate-950 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl text-left"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyber-blue/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Close Button */}
              <button 
                onClick={() => setProposalModalOpen(false)}
                disabled={modalSubmitting}
                className="absolute top-4 right-4 p-2 rounded-xl border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-blue/15 border border-cyber-blue/20 rounded-full text-[10px] font-mono font-bold uppercase text-cyber-blue">
                  <Shield className="w-3.5 h-3.5" />
                  {proposalType === 'enterprise' ? 'Cloud SaaS Ingress Pilot' : 'Sovereign Airgapped Sandbox'}
                </div>
                
                <h3 className="text-xl font-display font-bold text-white">
                  {proposalType === 'enterprise' ? 'Request Pilot Proposal' : 'Request Sandbox Deployment'}
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Provide your technical sandbox coordinates. Our independent research group will generate a customized deployment schema and sign the compliance manifest.
                </p>

                <AnimatePresence mode="wait">
                  {!modalSubmitted ? (
                    <motion.form 
                      key="modal-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleModalSubmit}
                      className="space-y-4 pt-2"
                    >
                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold mb-1">Lead Operator / Researcher</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Dr. Ramesh Kulkarni"
                          value={modalFormData.name}
                          onChange={(e) => setModalFormData({ ...modalFormData, name: e.target.value })}
                          className="w-full p-2.5 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-blue font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold mb-1">Secure Ingress Email</label>
                          <input 
                            type="email" 
                            required
                            placeholder="e.g. r.kulkarni@iitb.ac.in"
                            value={modalFormData.email}
                            onChange={(e) => setModalFormData({ ...modalFormData, email: e.target.value })}
                            className="w-full p-2.5 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-blue font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold mb-1">Organization / Laboratory</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. IIT Bombay Security Lab"
                            value={modalFormData.org}
                            onChange={(e) => setModalFormData({ ...modalFormData, org: e.target.value })}
                            className="w-full p-2.5 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-blue font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase font-bold mb-1">Evaluation Scope & Sandbox Details</label>
                        <textarea 
                          required
                          rows={3}
                          placeholder="Describe your telemetry ingestion volume, custom audit connectors or sovereign air-gapped constraints..."
                          value={modalFormData.useCase}
                          onChange={(e) => setModalFormData({ ...modalFormData, useCase: e.target.value })}
                          className="w-full p-2.5 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-blue font-mono resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={modalSubmitting}
                        className="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple text-slate-950 font-bold text-xs rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 border border-cyber-blue/40 disabled:opacity-50 font-mono"
                      >
                        {modalSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Routing Telemetry Payload...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Transmit Pilot Signal</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="modal-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                    >
                      <div className="w-16 h-16 bg-cyber-green/15 text-cyber-green rounded-full flex items-center justify-center border border-cyber-green/30 animate-pulse">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <div>
                        <h5 className="font-mono text-white font-bold uppercase tracking-wider text-xs">Signal Confirmed & Signed</h5>
                        <p className="text-[11px] text-slate-400 mt-2 font-sans max-w-sm">
                          Your sandbox pilot payload has been securely routed under Indian Patent Office guidelines. Our primary researchers will establish a direct secure key exchange channel.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
