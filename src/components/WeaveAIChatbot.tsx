import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, Sparkles, Trash2, Shield, ArrowRight, CornerDownLeft, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export default function WeaveAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I am **WeaveAI**, your intelligent SOC Assistant. I can help you correlate security alerts, build playbooks, understand Threat Metrics, or answer any questions about the AlertWeave platform. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Suggested starting prompts
  const suggestedPrompts = [
    { label: "What is AlertWeave?", text: "What is the primary function and architecture of the AlertWeave platform?" },
    { label: "Brute Force Response Playbook", text: "Can you help me design a custom response playbook for a brute force attack?" },
    { label: "How does correlation work?", text: "How does AlertWeave correlate an alert storm into a unified Incident Story?" },
    { label: "MITRE ATT&CK Mapping", text: "Explain how security events map to the MITRE ATT&CK Matrix." }
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorMsg(null);
    const userMessage: Message = {
      id: Math.random().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Format history + new message for stateless endpoint contents parameter
      // Contents must be of format: { role: 'user'|'model', parts: [{ text: string }] }
      const newHistory = [...messages, userMessage];
      const apiContents = newHistory.map((msg) => ({
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
        throw new Error(data.error || 'Failed to get response from Gemini.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'model',
          text: data.text || "I didn't receive a clear response. Let me try again.",
          timestamp: new Date()
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Unable to reach WeaveAI. Please check your network connection or server secrets.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your conversation history?")) {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: "Hello! I am **WeaveAI**, your intelligent SOC Assistant. I can help you correlate security alerts, build playbooks, understand Threat Metrics, or answer any questions about the AlertWeave platform. How can I assist you today?",
          timestamp: new Date()
        }
      ]);
      setErrorMsg(null);
    }
  };

  // Minimal helper to format simple markdown bold tags (`**text**`) or bullet points (`- item` or `* item`)
  const formatMessageText = (text: string) => {
    // Process bullet points and line breaks
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let content = line;
      let isBullet = false;

      // Check if line is bullet point
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        content = line.trim().substring(2);
        isBullet = true;
      }

      // Replace markdown bold tags **word** with standard JSX bold elements
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
          <li key={idx} className="ml-4 list-disc text-slate-200 text-xs my-1 font-mono">
            {renderedText}
          </li>
        );
      }

      return (
        <p key={idx} className="text-xs leading-relaxed font-mono mb-2 text-slate-200">
          {renderedText}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      {/* 1. Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ transformOrigin: 'bottom right' }}
            className="w-[calc(100vw-2rem)] xs:w-[360px] sm:w-[400px] h-[min(540px,100vh-120px)] bg-[#0b0f19]/95 backdrop-blur-md border border-cyber-blue/30 rounded-2xl shadow-[0_0_35px_rgba(0,229,255,0.2)] flex flex-col mb-4 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#0d1428] to-[#151f3c] border-b border-cyber-blue/20 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyber-blue/15 border border-cyber-blue/30 flex items-center justify-center">
                  <Bot className="w-4.5 h-4.5 text-cyber-blue animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-white tracking-wide flex items-center gap-1">
                    WeaveAI <Sparkles className="w-3.5 h-3.5 text-cyber-blue" />
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                    <span className="text-[9px] font-mono tracking-widest text-cyber-green uppercase font-bold">READY / SECURE</span>
                  </div>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Clear Chat History"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Feed Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative custom-scrollbar bg-[#060811]/40">
              <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 border text-left shadow-md ${
                      msg.role === 'user'
                        ? 'bg-cyber-blue/15 border-cyber-blue/40 text-slate-100 rounded-tr-none'
                        : 'bg-slate-900/60 border-white/10 text-slate-100 rounded-tl-none'
                    }`}
                  >
                    {/* Role Header */}
                    <div className="flex items-center gap-1.5 mb-1.5 text-[9px] font-mono tracking-wider font-bold">
                      {msg.role === 'user' ? (
                        <>
                          <span className="text-cyber-blue">ANALYST_AGENT</span>
                        </>
                      ) : (
                        <>
                          <Shield className="w-3 h-3 text-cyber-blue" />
                          <span className="text-cyber-blue">WEAVE_SOC_ENGINE</span>
                        </>
                      )}
                      <span className="text-slate-500">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* Format Paragraphs & Lists */}
                    <div className="space-y-1">
                      {formatMessageText(msg.text)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/60 border border-white/10 rounded-xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    <div className="flex items-center gap-1.5 mb-2 text-[9px] font-mono tracking-wider text-cyber-blue font-bold">
                      <Bot className="w-3 h-3 text-cyber-blue" />
                      <span>COGNITIVE_REASONING_ENGINE</span>
                    </div>
                    <div className="flex items-center gap-1 px-1 py-1">
                      <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Error Box */}
              {errorMsg && (
                <div className="p-3 bg-cyber-red/10 border border-cyber-red/30 rounded-xl text-left">
                  <span className="block font-mono text-[10px] font-bold text-cyber-red uppercase mb-1">SYSTEM_ERROR_TELEMETRY</span>
                  <p className="text-[11px] text-slate-300 font-mono leading-relaxed">{errorMsg}</p>
                  <button
                    onClick={() => handleSendMessage(messages[messages.length - 1]?.text || "Hello")}
                    className="mt-2 flex items-center gap-1 px-2.5 py-1 bg-cyber-red/20 hover:bg-cyber-red/30 border border-cyber-red/40 rounded-lg text-[9px] font-mono text-white tracking-wider uppercase cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Retry Connection
                  </button>
                </div>
              )}

              {/* Quick Prompt Suggestion Box when no chat or clear is starting */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-2 space-y-2 text-left">
                  <span className="block font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">SUGGESTED_INQUIRIES</span>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt.text)}
                        className="p-2.5 bg-slate-900/40 hover:bg-[#151B2F]/60 border border-white/5 hover:border-cyber-blue/30 rounded-xl text-left text-xs text-slate-300 hover:text-white transition-all duration-150 cursor-pointer flex items-center justify-between group active:scale-98"
                      >
                        <span className="font-mono tracking-wide">{prompt.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyber-blue group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 bg-[#0a0d18] border-t border-white/5 flex items-center gap-2 shrink-0"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask WeaveAI a question..."
                  disabled={isLoading}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/10 focus:border-cyber-blue/50 text-slate-100 placeholder-slate-500 rounded-xl text-xs font-mono outline-none transition-all pr-8 disabled:opacity-50"
                />
                <span className="absolute right-2.5 top-2.5 text-[9px] font-mono text-slate-500 hidden sm:inline-flex items-center gap-0.5">
                  <CornerDownLeft className="w-2.5 h-2.5" /> Enter
                </span>
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-cyber-blue to-cyan-500 hover:from-cyan-400 hover:to-cyber-blue text-slate-950 p-2 rounded-xl flex items-center justify-center cursor-pointer transition-all disabled:opacity-40 disabled:pointer-events-none active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Launch Button with Label */}
      <div className="flex items-center gap-2.5">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="px-3 py-1.5 bg-[#0b0f19]/95 border border-cyber-blue/30 text-white text-[10px] font-mono font-bold tracking-wider rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.15)] flex items-center gap-1.5 select-none"
          >
            <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-ping" />
            ASK WEAVEAI
          </motion.div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyber-blue to-cyan-500 hover:from-cyan-400 hover:to-cyber-blue text-slate-950 flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)] relative"
          title="Chat with WeaveAI"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative flex items-center justify-center"
              >
                <Bot className="w-6 h-6 animate-pulse" />
                {/* Pulse notification dot */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-blue rounded-full border-2 border-[#050816] animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
