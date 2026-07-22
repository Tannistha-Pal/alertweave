import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Sparkles, Trash2, Shield, ArrowRight, CornerDownLeft, 
  RefreshCw, Terminal, Cpu, Clock, Key, AlertTriangle, Play, HelpCircle,
  Activity, CheckCircle, ArrowLeft, MessageSquare, Database, Network
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

interface WeaveAIChatWorkspaceProps {
  onBack?: () => void;
}

export default function WeaveAIChatWorkspace({ onBack }: WeaveAIChatWorkspaceProps) {
  const [input, setInput] = useState('');
  const [activeMobileTab, setActiveMobileTab] = useState<'chat' | 'library' | 'diagnostics'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-ws',
      role: 'model',
      text: "Welcome to the **WeaveAI Cognitive SOC Workspace**. I am your dedicated cybersecurity virtual analyst. I am initialized with real-time SIEM alerts, entity link graphs, and MITRE playbook schemas. Ask me to correlate alerts, analyze payload signatures, or draft security advisories.",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Cybersecurity Prompt Blueprints
  const promptBlueprints = [
    {
      category: "Triage Playbooks",
      title: "Ransomware Containment",
      text: "Draft an immediate containment playbook for suspected LockBit ransomware spreading via lateral RPC connections. List step-by-step commands for network host isolation."
    },
    {
      category: "Threat Hunting",
      title: "Powershell Obfuscation",
      text: "How do I identify and decode Base64 obfuscated Powershell processes spawning from rundll32.exe in Windows Event ID 4688 logs?"
    },
    {
      category: "Architecture",
      title: "Causal Graph Correlation",
      text: "Explain how AlertWeave's causal hypergraph algebraic formulation (Equation 1.1) reduces alert storms into discrete Incident Stories."
    },
    {
      category: "Response Plans",
      title: "DDoS Mitigation",
      text: "Create a mitigation sequence for a high-volume DNS Amplification flood attacking our public API endpoint. Detail firewall threshold configurations."
    }
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorMsg(null);
    const userMsg: Message = {
      id: Math.random().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const apiContents = [...messages, userMsg].map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents: apiContents }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to communicate with WeaveAI.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'model',
          text: data.text || "No response received.",
          timestamp: new Date()
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to reach co-pilot. Verify GEMINI_API_KEY environment variable.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Confirm deletion of active workspace threat-log memory?")) {
      setMessages([
        {
          id: 'welcome-ws',
          role: 'model',
          text: "Memory cleared. WeaveAI Cognitive SOC Workspace is back online. How can I protect your enterprise today?",
          timestamp: new Date()
        }
      ]);
      setErrorMsg(null);
    }
  };

  const formatMessageText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let content = line;
      let isBullet = false;

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        content = line.trim().substring(2);
        isBullet = true;
      }

      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-cyan-400 font-bold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
      }

      const renderedText = parts.length > 0 ? parts : content;

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-300 text-xs my-1 font-mono leading-relaxed">
            {renderedText}
          </li>
        );
      }

      return (
        <p key={idx} className="text-xs leading-relaxed font-mono mb-2 text-slate-300">
          {renderedText}
        </p>
      );
    });
  };

  return (
    <div className="space-y-4 pb-12 lg:h-[calc(100vh-140px)] flex flex-col min-h-0">
      
      {/* 1. Header Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-950/40 p-4 rounded-2xl border border-white/5 shrink-0">
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
            <h1 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
              WeaveAI™ Cognitive Command
              <span className="text-xs font-mono px-2 py-0.5 bg-cyber-blue/15 text-cyber-blue rounded-full font-bold uppercase tracking-wider animate-pulse">
                Interactive Copilot
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              HYPERGRAPH CORRELATION AND AUTOMATED INCIDENT EXPLAINABILITY CORE
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-cyber-red/10 border border-white/5 text-slate-400 hover:text-cyber-red text-xs font-mono rounded-xl transition-all flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Log Memory
        </button>
      </div>

      {/* Responsive mobile view selector tabs */}
      <div className="flex lg:hidden p-1 bg-slate-950/80 rounded-xl border border-white/5 shrink-0">
        <button
          onClick={() => setActiveMobileTab('chat')}
          className={`flex-1 py-2 text-[10px] font-mono font-bold rounded-lg transition-all ${
            activeMobileTab === 'chat' 
              ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/20' 
              : 'text-slate-400'
          }`}
        >
          💬 Live Feed
        </button>
        <button
          onClick={() => setActiveMobileTab('library')}
          className={`flex-1 py-2 text-[10px] font-mono font-bold rounded-lg transition-all ${
            activeMobileTab === 'library' 
              ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/20' 
              : 'text-slate-400'
          }`}
        >
          📚 Prompt Lib
        </button>
        <button
          onClick={() => setActiveMobileTab('diagnostics')}
          className={`flex-1 py-2 text-[10px] font-mono font-bold rounded-lg transition-all ${
            activeMobileTab === 'diagnostics' 
              ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/20' 
              : 'text-slate-400'
          }`}
        >
          📊 Telemetry
        </button>
      </div>

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-hidden">
        
        {/* LEFT COLUMN: Prompt Blueprints */}
        <div className={`lg:col-span-3 bg-slate-900/20 rounded-2xl border border-white/5 p-4 flex-col justify-between overflow-y-auto space-y-4 ${activeMobileTab === 'library' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="space-y-3">
            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1">Triage Prompt Library</span>
            <div className="space-y-2.5">
              {promptBlueprints.map((bp, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(bp.text)}
                  className="w-full text-left p-3 bg-slate-950/60 hover:bg-slate-900 border border-white/5 hover:border-cyber-blue/30 rounded-xl transition-all cursor-pointer group space-y-1"
                >
                  <span className="block text-[8px] font-mono text-cyber-blue uppercase tracking-widest">{bp.category}</span>
                  <h4 className="text-xs font-bold text-white leading-tight group-hover:text-cyber-blue transition-colors">{bp.title}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-normal">{bp.text}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 font-mono text-[9px] text-slate-500 leading-relaxed">
            💡 Tap any blueprint card above to immediately execute the WeaveAI co-pilot security assessment playbook.
          </div>
        </div>

        {/* CENTER COLUMN: Live Chat Feed */}
        <div className={`lg:col-span-6 bg-slate-900/40 rounded-2xl border border-white/5 flex-col justify-between overflow-hidden relative h-[500px] lg:h-auto ${activeMobileTab === 'chat' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="absolute inset-0 cyber-grid opacity-[0.03] pointer-events-none" />
          
          {/* Thread list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 border text-left shadow-lg ${
                    msg.role === 'user'
                      ? 'bg-cyber-blue/10 border-cyber-blue/30 text-white rounded-tr-none'
                      : 'bg-slate-950 border-white/5 text-white rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5 text-[8px] font-mono tracking-wider font-bold">
                    {msg.role === 'user' ? (
                      <span className="text-cyber-blue">ANALYST_COGNITIVE</span>
                    ) : (
                      <>
                        <Shield className="w-3 h-3 text-cyber-blue" />
                        <span className="text-cyber-blue">WEAVE_AI_AGENT</span>
                      </>
                    )}
                    <span className="text-slate-500">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="space-y-1 font-mono">
                    {formatMessageText(msg.text)}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-950 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3">
                  <div className="flex items-center gap-1.5 mb-2 text-[8px] font-mono tracking-wider text-cyber-blue font-bold">
                    <Bot className="w-3 h-3 text-cyber-blue animate-pulse" />
                    <span>COGNITIVE_REASONING_TICK</span>
                  </div>
                  <div className="flex items-center gap-1 px-1">
                    <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-cyber-red/10 border border-cyber-red/30 rounded-xl text-left font-mono">
                <span className="block text-[9px] font-bold text-cyber-red uppercase mb-1">CO-PILOT DISRUPTION</span>
                <p className="text-[10px] text-slate-300 leading-relaxed">{errorMsg}</p>
                <button
                  onClick={() => handleSendMessage(messages[messages.length - 1]?.text || "Retry")}
                  className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyber-red/20 border border-cyber-red/30 rounded-lg text-[9px] text-white tracking-wider uppercase cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reconnect Workspace
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form container */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="p-3.5 bg-[#070b16] border-t border-white/5 flex items-center gap-3 shrink-0"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query SIEM database or ask WeaveAI correlation questions..."
                disabled={isLoading}
                className="w-full px-4 py-3 bg-slate-900 border border-white/10 focus:border-cyber-blue/50 text-slate-100 placeholder-slate-500 rounded-xl text-xs font-mono outline-none transition-all pr-12 disabled:opacity-50"
              />
              <span className="absolute right-3 top-3 text-[9px] font-mono text-slate-500 hidden sm:inline-flex items-center gap-0.5 select-none">
                <CornerDownLeft className="w-2.5 h-2.5" /> Enter
              </span>
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-cyber-blue to-cyan-500 hover:from-cyan-400 hover:to-cyber-blue text-slate-950 p-2.5 rounded-xl flex items-center justify-center cursor-pointer transition-all disabled:opacity-40 disabled:pointer-events-none active:scale-95 shadow-lg shadow-cyber-blue/10 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Co-pilot Diagnostics */}
        <div className={`lg:col-span-3 bg-slate-900/20 rounded-2xl border border-white/5 p-4 space-y-4 overflow-y-auto ${activeMobileTab === 'diagnostics' ? 'block' : 'hidden lg:block'}`}>
          <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1">Diagnostics & Telemetry</span>
          
          <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-3 font-mono text-[10px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Cognitive Status:</span>
              <span className="text-cyber-green font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                ONLINE
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Target Model:</span>
              <span className="text-cyber-blue font-bold">gemini-3.5-flash</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Workspace Hash:</span>
              <span className="text-slate-400 break-all max-w-[120px] text-right">a8f4c93d...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Triage Speed:</span>
              <span className="text-cyber-green font-bold">0.82 seconds</span>
            </div>
          </div>

          {/* Active SIEM connection status */}
          <div className="p-3 bg-[#151B2F]/30 rounded-xl border border-white/5 space-y-2.5 text-[10px]">
            <span className="block text-white font-bold font-mono">CONNECTED DATA INGESTS</span>
            <div className="space-y-2 font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyber-green" /> CrowdStrike Falcon (Live)
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyber-green" /> Okta Audit Directory (Live)
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyber-green" /> Palo Alto Prisma Firewalls
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5 flex items-center gap-3">
            <Activity className="w-5 h-5 text-cyber-purple shrink-0 animate-pulse" />
            <div className="font-mono text-[9px]">
              <span className="block text-slate-500 uppercase">Alert Filtering Rate</span>
              <span className="block text-white font-bold">128.4 events correlated/min</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
