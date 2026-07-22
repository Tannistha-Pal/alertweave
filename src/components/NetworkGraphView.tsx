import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { 
  Shield, Server, User, Terminal, FileText, Network, AlertCircle, 
  Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw, Search, Cpu, Key, 
  HelpCircle, ArrowLeft, Play, Pause, SkipBack, SkipForward, Sparkles, 
  Send, Loader2, MessageSquare, AlertOctagon, HelpCircle as HelpIcon, Radio
} from 'lucide-react';
import { AttackNode, AttackEdge } from '../types';

interface NetworkGraphViewProps {
  nodes: AttackNode[];
  edges: AttackEdge[];
  onBack?: () => void;
}

export default function NetworkGraphView({ nodes, edges, onBack }: NetworkGraphViewProps) {
  // Viewport states
  const [zoom, setZoom] = useState(0.85);
  const [panX, setPanX] = useState(20);
  const [panY, setPanY] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<AttackNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  // Dragging individual nodes
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);

  // Replay states (Improvement 10)
  const [replayIndex, setReplayIndex] = useState<number>(nodes.length - 1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1800); // ms per node

  // AI Causal Explainability states ("WHY?" Engine) (Improvement 8)
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Coordinate positions for nodes to render them in a beautiful, structured lateral flow
  const initialPositions: Record<string, { x: number; y: number }> = {
    // Incident 004 nodes
    'node-net-1': { x: 100, y: 220 },
    'node-host-2': { x: 260, y: 220 },
    'node-user-1': { x: 260, y: 80 },
    'node-host-1': { x: 440, y: 220 },
    'node-proc-1': { x: 600, y: 150 },
    'node-file-1': { x: 740, y: 110 },
    'node-alert-1': { x: 740, y: 240 },
    // Cloud Incident nodes
    'cloud-user-1': { x: 180, y: 100 },
    'cloud-host-1': { x: 380, y: 200 },
    'cloud-alert-1': { x: 580, y: 300 }
  };

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(initialPositions);

  // Sync node list lengths with replay index when nodes load
  useEffect(() => {
    setReplayIndex(nodes.length - 1);
  }, [nodes]);

  // Video Replay automation tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setReplayIndex((prev) => {
          if (prev >= nodes.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, nodes]);

  // Reset chat when another node is selected
  useEffect(() => {
    if (selectedNode) {
      setChatMessages([
        {
          role: 'assistant',
          text: `Hello Analyst. I am WeaveAI. I have parsed the telemetry link metrics for **${selectedNode.label}**. Ask me anything about how AlertWeave correlated this entity.`
        }
      ]);
    }
  }, [selectedNode]);

  const getNodeCoordinates = (id: string) => {
    return positions[id] || { x: 300, y: 200 };
  };

  // Zoom / Pan and dragging handlers
  const handleMouseDown = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('.interactive-control')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingNodeId) {
      // Dynamic node dragging calculation
      setPositions((prev) => ({
        ...prev,
        [draggingNodeId]: {
          x: (prev[draggingNodeId]?.x || 300) + e.movementX / zoom,
          y: (prev[draggingNodeId]?.y || 200) + e.movementY / zoom,
        }
      }));
      return;
    }

    if (!isDragging) return;
    setPanX(e.clientX - dragStart.x);
    setPanY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingNodeId(null);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.interactive-control')) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - panX, y: touch.clientY - panY });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (draggingNodeId) return;
    if (!isDragging) return;
    const touch = e.touches[0];
    setPanX(touch.clientX - dragStart.x);
    setPanY(touch.clientY - dragStart.y);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDraggingNodeId(null);
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') setZoom((prev) => Math.min(prev + 0.1, 2));
    else if (direction === 'out') setZoom((prev) => Math.max(prev - 0.1, 0.4));
    else {
      setZoom(0.85);
      setPanX(20);
      setPanY(30);
    }
  };

  // Check if node is active in current replay step
  const isNodeActiveInReplay = (nodeId: string) => {
    const nodeIdx = nodes.findIndex((n) => n.id === nodeId);
    return nodeIdx !== -1 && nodeIdx <= replayIndex;
  };

  const isNodeConnected = (nodeId: string) => {
    if (!hoveredNode) return true;
    if (nodeId === hoveredNode) return true;
    return edges.some(
      (edge) => 
        (edge.source === nodeId && edge.target === hoveredNode) ||
        (edge.source === hoveredNode && edge.target === nodeId)
    );
  };

  const isEdgeHighlighted = (edge: AttackEdge) => {
    if (!hoveredNode) return false;
    return edge.source === hoveredNode || edge.target === hoveredNode;
  };

  const getNodeColorClass = (status: AttackNode['status'], isActive: boolean) => {
    if (!isActive) return 'stroke-slate-700 fill-slate-900/30';
    switch (status) {
      case 'critical': return 'stroke-cyber-red fill-cyber-red/10 shadow-cyber-red/50';
      case 'compromised': return 'stroke-cyber-orange fill-cyber-orange/10 shadow-cyber-orange/50';
      case 'suspicious': return 'stroke-cyber-purple fill-cyber-purple/10 shadow-cyber-purple/50';
      default: return 'stroke-cyber-blue fill-cyber-blue/10';
    }
  };

  const getNodeIcon = (type: AttackNode['type'], isActive: boolean) => {
    const color = isActive ? 'text-white' : 'text-slate-500';
    switch (type) {
      case 'server': return <Server className={`w-4 h-4 ${color}`} />;
      case 'user': return <User className={`w-4 h-4 ${color}`} />;
      case 'process': return <Terminal className={`w-4 h-4 ${color}`} />;
      case 'file': return <FileText className={`w-4 h-4 ${color}`} />;
      case 'alert': return <AlertCircle className={`w-4 h-4 ${color}`} />;
      case 'credential': return <Key className={`w-4 h-4 ${color}`} />;
      default: return <Network className={`w-4 h-4 ${color}`} />;
    }
  };

  // Ask WeaveAI ("WHY?" Engine)
  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedNode) return;

    const userMessage = chatInput;
    setChatMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsAiLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Selected incident/node: ${selectedNode.label} (${selectedNode.type}).
Node details: ${selectedNode.details}.
IP Address: ${selectedNode.ipAddress || 'N/A'}.
Email: ${selectedNode.email || 'N/A'}.

Question: ${userMessage}

Please provide a highly professional, cyber-literate explanation of why this entity is linked or what forensics look like.`
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setChatMessages((prev) => [...prev, { role: 'assistant', text: data.text }]);
    } catch (error: any) {
      console.error(error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `⚠️ **WeaveAI Error**: Failed to fetch AI causal link details. ${error.message || 'Please check if GEMINI_API_KEY is configured.'}`
        }
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredNodes = nodes.filter(
    (n) => filterType === 'all' || n.type === filterType
  );

  return (
    <div 
      ref={containerRef}
      className={`relative bg-[#050816] rounded-2xl border border-white/5 overflow-hidden select-none flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[620px]'
      }`}
    >
      
      {/* GRAPH CANVAS UTILITY HUD */}
      <div className="interactive-control bg-[#090d1e]/90 px-4 py-3 border-b border-white/5 flex flex-wrap justify-between items-center gap-4 z-10">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 bg-slate-950 hover:bg-slate-800 rounded-lg border border-white/5 text-cyber-blue hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95 animate-pulse"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <span className="text-[10px] font-mono text-cyber-blue font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyber-red animate-pulse" />
              Dynamic Hypergraph Core
            </span>
            <h2 className="text-sm font-bold text-white">Visual Causal Path Investigation (Draggable Canvas)</h2>
          </div>
        </div>

        {/* Toolbar parameters */}
        <div className="flex items-center gap-3">
          {/* Node Category filter selectors */}
          <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-white/5 text-xs font-mono">
            {['all', 'user', 'server', 'process', 'alert'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all capitalize ${
                  filterType === t 
                    ? 'bg-cyber-blue text-slate-950' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Graph visual controls */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => handleZoom('in')}
              className="p-1.5 hover:bg-[#111] rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleZoom('out')}
              className="p-1.5 hover:bg-[#111] rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleZoom('reset')}
              className="p-1.5 hover:bg-[#111] rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Reset Viewport"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-white/10 mx-1" />
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 hover:bg-[#111] rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* RENDER CANVAS CONTAINER */}
      <div 
        className="flex-1 cursor-grab active:cursor-grabbing overflow-hidden relative bg-[#040612]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Futuristic Grid Overlay */}
        <div className="absolute inset-0 cyber-grid pointer-events-none opacity-25" />

        {/* Dynamic Canvas Instruction Bubble */}
        <div className="absolute top-4 left-4 p-2 bg-[#090d1e]/80 rounded-xl border border-white/5 text-[9px] font-mono text-slate-400 z-10">
          💡 Drag nodes to customize network architecture view
        </div>

        {/* Outer SVG Canvas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <g transform={`translate(${panX + (containerRef.current?.clientWidth || 0) / 2 - 400 * zoom}, ${panY + (containerRef.current?.clientHeight || 0) / 2 - 180 * zoom}) scale(${zoom})`}>
            
            {/* RENDER EDGES FIRST */}
            {edges.map((edge) => {
              const fromCoord = getNodeCoordinates(edge.source);
              const toCoord = getNodeCoordinates(edge.target);
              const highlighted = isEdgeHighlighted(edge);
              const isSourceActive = isNodeActiveInReplay(edge.source);
              const isTargetActive = isNodeActiveInReplay(edge.target);
              const isEdgeActive = isSourceActive && isTargetActive;

              return (
                <g key={edge.id} className="pointer-events-auto">
                  {/* Outer glow aura path */}
                  <path
                    d={`M ${fromCoord.x} ${fromCoord.y} C ${(fromCoord.x + toCoord.x) / 2} ${fromCoord.y}, ${(fromCoord.x + toCoord.x) / 2} ${toCoord.y}, ${toCoord.x} ${toCoord.y}`}
                    fill="none"
                    stroke={highlighted ? '#00E5FF' : isEdgeActive ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.02)'}
                    strokeWidth={highlighted ? 4.5 : 2}
                    className="transition-all duration-300"
                  />
                  {/* Primary Connection Line */}
                  <path
                    d={`M ${fromCoord.x} ${fromCoord.y} C ${(fromCoord.x + toCoord.x) / 2} ${fromCoord.y}, ${(fromCoord.x + toCoord.x) / 2} ${toCoord.y}, ${toCoord.x} ${toCoord.y}`}
                    fill="none"
                    stroke={highlighted ? '#00E5FF' : isEdgeActive ? '#00b4d8' : 'rgba(255, 255, 255, 0.06)'}
                    strokeWidth="1.5"
                    strokeDasharray={edge.animated && isEdgeActive ? '6 3' : 'none'}
                    className={edge.animated && isEdgeActive ? 'cyber-grid-active' : ''}
                  />
                </g>
              );
            })}

            {/* RENDER NODES NEXT */}
            {filteredNodes.map((node) => {
              const coord = getNodeCoordinates(node.id);
              const isSelected = selectedNode?.id === node.id;
              const connected = isNodeConnected(node.id);
              const isActive = isNodeActiveInReplay(node.id);

              return (
                <g 
                  key={node.id} 
                  transform={`translate(${coord.x}, ${coord.y})`}
                  className="pointer-events-auto cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNode(node);
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setDraggingNodeId(node.id);
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Outer Selection Indicator Ring */}
                  <circle
                    r="23"
                    fill="none"
                    stroke={isSelected ? '#00E5FF' : 'none'}
                    strokeWidth="2.5"
                    className="animate-pulse"
                  />

                  {/* Primary Core Circle */}
                  <circle
                    r="17"
                    className={`stroke-2 transition-all duration-300 ${getNodeColorClass(node.status, isActive)}`}
                    style={{ opacity: connected ? 1 : 0.25 }}
                  />

                  {/* Node Label Text */}
                  <foreignObject x="-50" y="22" width="100" height="32" className="text-center overflow-visible">
                    <div 
                      className={`text-[9px] font-mono font-bold leading-tight select-none truncate ${
                        !isActive ? 'text-slate-600' : connected ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {node.label}
                    </div>
                  </foreignObject>

                  {/* Icon at core coordinates */}
                  <g transform="translate(-8, -8)" style={{ opacity: connected ? 1 : 0.25 }}>
                    {getNodeIcon(node.type, isActive)}
                  </g>
                </g>
              );
            })}

          </g>
        </svg>

        {/* BOTTOM REPLAY TIMELINE PLAYER CONTROLS (IMPROVEMENT 10) */}
        <div className="interactive-control absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-2 sm:px-4 sm:py-3 bg-[#090d1e]/95 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 shadow-2xl z-10 w-[92%] max-w-[580px]">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button
              onClick={() => {
                setIsPlaying(false);
                setReplayIndex(0);
              }}
              disabled={replayIndex === 0}
              className="p-1.5 hover:bg-[#111625] text-slate-400 hover:text-white rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
              title="First Stage"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setReplayIndex((prev) => Math.max(0, prev - 1));
              }}
              disabled={replayIndex === 0}
              className="p-1.5 hover:bg-[#111625] text-slate-400 hover:text-white rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
              title="Prev Stage"
            >
              <RotateCcw className="w-4 h-4 -scale-x-100" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-cyber-blue text-slate-950 hover:bg-cyan-300 rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-lg shadow-cyber-blue/10"
              title={isPlaying ? 'Pause' : 'Play Simulation Replay'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setReplayIndex((prev) => Math.min(nodes.length - 1, prev + 1));
              }}
              disabled={replayIndex === nodes.length - 1}
              className="p-1.5 hover:bg-[#111625] text-slate-400 hover:text-white rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
              title="Next Stage"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setReplayIndex(nodes.length - 1);
              }}
              disabled={replayIndex === nodes.length - 1}
              className="p-1.5 hover:bg-[#111625] text-slate-400 hover:text-white rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
              title="Latest Stage"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Progress timeline slider */}
          <div className="flex-1 flex flex-col gap-1 w-full">
            <div className="flex justify-between text-[8px] font-mono text-slate-500 uppercase tracking-widest">
              <span>Threat Timeline scrubbing</span>
              <span className="text-cyber-blue font-bold">STAGE {replayIndex + 1} / {nodes.length}</span>
            </div>
            <input
              type="range"
              min="0"
              max={nodes.length - 1}
              value={replayIndex}
              onChange={(e) => {
                setIsPlaying(false);
                setReplayIndex(parseInt(e.target.value));
              }}
              className="w-full accent-cyber-blue h-1 bg-slate-950 rounded-lg cursor-pointer border-none outline-none"
            />
          </div>

          {/* Speed Indicator */}
          <div className="flex sm:flex-col gap-1 sm:gap-0.5 justify-between sm:justify-center w-full sm:w-auto text-right shrink-0 border-t sm:border-t-0 border-white/5 pt-1.5 sm:pt-0">
            <span className="text-[8px] font-mono text-slate-500 uppercase">PLAY RATE</span>
            <button
              onClick={() => setPlaybackSpeed((prev) => prev === 1000 ? 1800 : prev === 1800 ? 2500 : 1000)}
              className="text-[9px] font-mono font-bold text-cyber-blue hover:underline cursor-pointer"
            >
              {playbackSpeed === 1000 ? 'Fast (1s)' : playbackSpeed === 1800 ? 'Norm (1.8s)' : 'Slow (2.5s)'}
            </button>
          </div>
        </div>

        {/* BOTTOM LEFT MAP LEGEND PANEL */}
        <div className="interactive-control absolute bottom-36 sm:bottom-24 left-4 p-3 bg-slate-900/90 rounded-xl border border-white/5 font-mono text-[9px] text-slate-400 space-y-1 z-10 w-44 hidden md:block">
          <span className="block text-white font-bold mb-1 uppercase tracking-wider">Node Legend</span>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyber-red" /> Active Target Critical</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyber-orange" /> Compromised Node</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyber-purple" /> Suspicious Behavior</div>
          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyber-blue" /> Uncompromised Entity</div>
        </div>

        {/* RIGHT FORENSIC INFO PANEL & "WHY?" ENGINE DRAWER (IMPROVEMENT 8) */}
        {selectedNode && (
          <div className="interactive-control absolute left-4 right-4 md:left-auto md:right-4 top-4 bottom-24 md:bottom-4 md:inset-y-4 md:w-[350px] bg-[#090d1e]/95 rounded-2xl border border-white/5 p-4 shadow-2xl z-20 overflow-hidden flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-[10px] font-mono text-cyber-blue font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-cyber-blue" />
                  Forensic Analytics
                </span>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="text-[10px] text-slate-500 hover:text-white font-mono cursor-pointer"
                >
                  [Dismiss]
                </button>
              </div>

              {/* Node Title Header */}
              <div className="space-y-1">
                <span className="block text-[9px] font-mono text-slate-500 uppercase">ENTITY NAME</span>
                <h3 className="text-base font-bold text-white leading-tight">{selectedNode.label}</h3>
                <span className={`inline-block px-2 py-0.5 text-[8px] font-mono font-bold rounded-full uppercase ${
                  selectedNode.status === 'critical' ? 'bg-cyber-red/15 text-cyber-red border border-cyber-red/20' : 
                  selectedNode.status === 'compromised' ? 'bg-cyber-orange/15 text-cyber-orange border border-cyber-orange/20' : 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/10'
                }`}>
                  Status: {selectedNode.status}
                </span>
              </div>

              {/* Technical properties */}
              <div className="p-3 bg-slate-950 rounded-xl border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-500">Node Type:</span>
                  <span className="text-white font-bold capitalize">{selectedNode.type}</span>
                </div>

                {selectedNode.ipAddress && (
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-500">IP Address:</span>
                    <span className="text-cyber-blue font-bold">{selectedNode.ipAddress}</span>
                  </div>
                )}

                {selectedNode.email && (
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Corporate Email:</span>
                    <span className="text-cyber-purple font-bold break-all max-w-[180px] text-right">{selectedNode.email}</span>
                  </div>
                )}

                {selectedNode.processPath && (
                  <div className="space-y-1 font-mono text-[9px]">
                    <span className="text-slate-500 block">Process Execution Path:</span>
                    <p className="text-white font-bold break-all p-2 bg-slate-900 rounded">{selectedNode.processPath}</p>
                  </div>
                )}

                {selectedNode.fileHash && (
                  <div className="space-y-1 font-mono text-[9px]">
                    <span className="text-slate-500 block">MD5 Payload Hash:</span>
                    <p className="text-cyber-green font-bold break-all p-2 bg-slate-900 rounded">{selectedNode.fileHash}</p>
                  </div>
                )}
              </div>

              {/* WHY? Causal Explanations Engine */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono text-cyber-orange font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyber-orange" />
                  WeaveAI™ Causal Explainability
                </span>

                <div className="bg-slate-950/80 rounded-xl p-3 border border-white/5 space-y-3 max-h-[190px] overflow-y-auto">
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`text-[11px] leading-relaxed font-mono ${
                        msg.role === 'user' ? 'text-cyber-blue text-right border-r-2 border-cyber-blue/30 pr-1.5' : 'text-slate-300'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <span>&gt; {msg.text}</span>
                      ) : (
                        <div>{msg.text}</div>
                      )}
                    </div>
                  ))}
                  {isAiLoading && (
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                      <Loader2 className="w-3 h-3 animate-spin text-cyber-blue" />
                      WeaveAI is compiling causal metrics...
                    </div>
                  )}
                </div>

                {/* AI Question Form */}
                <form onSubmit={handleAskAi} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Ask why correlated..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={isAiLoading}
                    className="flex-1 px-2.5 py-1.5 bg-slate-950 border border-white/5 rounded-lg text-[10px] text-white focus:outline-none focus:border-cyber-blue/50 transition-colors font-mono disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isAiLoading || !chatInput.trim()}
                    className="p-1.5 bg-cyber-blue hover:bg-cyan-300 disabled:opacity-40 text-slate-950 rounded-lg transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Isolate button */}
            <div className="pt-3 border-t border-white/5 shrink-0">
              <button 
                onClick={() => {
                  alert(`⚠️ Isolation Command Broadcasted! Deployed playbook task 'CONTAIN_HOST_EGRESS' to agent matching endpoint: ${selectedNode.label}.`);
                  setSelectedNode(null);
                }}
                className="w-full py-2 bg-cyber-red/10 hover:bg-cyber-red text-cyber-red hover:text-slate-950 border border-cyber-red/20 hover:border-transparent font-bold font-mono text-[10px] rounded-xl transition-all cursor-pointer active:scale-[0.98]"
              >
                Isolate Target Node
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
