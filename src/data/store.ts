import { create } from 'zustand';
import { SecurityIncident, SecurityAlert, AttackNode, AttackEdge } from '../types';
import { mockIncidents, mockAlerts } from './mockData';

export type ViewState = 'landing' | 'dashboard' | 'incidents' | 'details' | 'graph' | 'mitre' | 'analytics' | 'research' | 'patent' | 'about' | 'auth' | 'chat';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
}

interface SimulationStep {
  time: string;
  event: string;
  source: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  tactic: string;
  technique: string;
  code: string;
  nodeToAdd?: AttackNode;
  edgeToAdd?: AttackEdge;
}

interface AlertWeaveState {
  currentView: ViewState;
  viewHistory: ViewState[];
  activeIncidentId: string;
  isLoggedIn: boolean;
  userEmail: string;
  sidebarOpen: boolean;
  notificationsOpen: boolean;
  notifications: NotificationItem[];
  systemOnline: boolean;
  
  // Dynamic metrics
  alertsCount: number;
  incidentsCount: number;
  cpuUsage: number;
  ingestionRate: number;
  alertReductionRatio: number;
  
  // Real incidents state
  incidents: SecurityIncident[];
  alerts: SecurityAlert[];
  
  // Threat Replay state
  replay: {
    isPlaying: boolean;
    currentStepIndex: number;
    maxSteps: number;
  };

  // Attack Simulation State
  simulation: {
    isRunning: boolean;
    currentStepIndex: number;
    steps: SimulationStep[];
    logs: { time: string; event: string; source: string; severity: 'critical' | 'high' | 'medium' | 'low' }[];
  };

  // View control actions
  setCurrentView: (view: ViewState, pushHistory?: boolean) => void;
  goBack: () => void;
  setActiveIncidentId: (id: string) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUserEmail: (email: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  setSystemOnline: (online: boolean) => void;
  addNotification: (title: string, description: string, severity: 'critical' | 'high' | 'medium' | 'low') => void;
  clearNotifications: () => void;
  
  // Dynamic operations
  triggerTelemetryPing: () => void;
  
  // Threat Replay actions
  setReplayPlaying: (isPlaying: boolean) => void;
  setReplayStepIndex: (index: number) => void;
  stepReplayForward: () => void;
  stepReplayBackward: () => void;
  resetReplay: () => void;

  // Attack Simulation Actions
  startAttackSimulation: () => void;
  advanceSimulationStep: () => void;
  resetSimulation: () => void;
}

const initialSimulationSteps: SimulationStep[] = [
  {
    time: '09:41:02',
    event: 'Failed Remote Login Audit Spike (Brute Force Detected)',
    source: 'Okta Directory',
    severity: 'medium',
    tactic: 'Initial Access',
    technique: 'Valid Accounts',
    code: 'T1078',
    nodeToAdd: { id: 'node-sim-net', label: 'External SSH brute force', type: 'network', status: 'suspicious', details: 'Continuous dictionary attacks from unrecognized proxy block' }
  },
  {
    time: '09:43:15',
    event: 'Suspicious PowerShell Execution with Encoded payload',
    source: 'Windows Defender ATP',
    severity: 'high',
    tactic: 'Execution',
    technique: 'Command and Scripting Interpreter',
    code: 'T1059',
    nodeToAdd: { id: 'node-sim-user', label: 'adm_security', type: 'user', status: 'compromised', details: 'Compromised admin service identity' },
    edgeToAdd: { id: 'edge-sim-1', source: 'node-sim-net', target: 'node-sim-user', label: 'Auth Bypass', animated: true, type: 'credentials_leak' }
  },
  {
    time: '09:45:30',
    event: 'LSASS Process Memory Dump (comsvcs.dll hijacking)',
    source: 'CrowdStrike Falcon',
    severity: 'critical',
    tactic: 'Credential Access',
    technique: 'OS Credential Dumping',
    code: 'T1003',
    nodeToAdd: { id: 'node-sim-host', label: 'SQL-PROD-09', type: 'server', status: 'critical', details: 'Database Server running SQL Server 2022' },
    edgeToAdd: { id: 'edge-sim-2', source: 'node-sim-user', target: 'node-sim-host', label: 'Privilege Escalation', animated: true, type: 'lateral_movement' }
  },
  {
    time: '09:48:00',
    event: 'Lateral Movement: Inbound SMB/RDP session to Domain Controller',
    source: 'Active Directory Logs',
    severity: 'critical',
    tactic: 'Lateral Movement',
    technique: 'Remote Services',
    code: 'T1021',
    nodeToAdd: { id: 'node-sim-proc', label: 'powershell.exe', type: 'process', status: 'critical', details: 'Process spawn executing Cobalt Strike beacon' },
    edgeToAdd: { id: 'edge-sim-3', source: 'node-sim-host', target: 'node-sim-proc', label: 'Lateral Spawn', animated: true, type: 'process_spawn' }
  },
  {
    time: '09:52:12',
    event: 'Data Exfiltration: High-Volume Outbound Cloud Storage Sync',
    source: 'Palo Alto Networks',
    severity: 'critical',
    tactic: 'Exfiltration',
    technique: 'Exfiltration Over Web Service',
    code: 'T1567',
    nodeToAdd: { id: 'node-sim-alert', label: 'C2 Exfiltration Beacon', type: 'alert', status: 'critical', details: 'Outbound command-and-control connection' },
    edgeToAdd: { id: 'edge-sim-4', source: 'node-sim-proc', target: 'node-sim-alert', label: 'Exfiltration Triggered', animated: true, type: 'alert_trigger' }
  }
];

export const useAlertWeaveStore = create<AlertWeaveState>((set, get) => ({
  currentView: 'landing',
  viewHistory: [],
  activeIncidentId: 'INC-2026-004',
  isLoggedIn: false,
  userEmail: 'senabby420@gmail.com',
  sidebarOpen: true,
  notificationsOpen: false,
  notifications: [
    {
      id: 'notif-1',
      title: 'SYSTEM TELEMETRY ALERTS',
      description: 'INC-004: Ransomware Staging Detected',
      severity: 'critical',
      timestamp: '06:20:15'
    }
  ],
  systemOnline: true,
  
  // Real-time metrics
  alertsCount: 1420,
  incidentsCount: 3,
  cpuUsage: 24,
  ingestionRate: 14205,
  alertReductionRatio: 99.2,
  
  incidents: [...mockIncidents],
  alerts: [...mockAlerts],
  
  replay: {
    isPlaying: false,
    currentStepIndex: 5, // Default showing all nodes for standard incidents
    maxSteps: 6
  },

  simulation: {
    isRunning: false,
    currentStepIndex: -1,
    steps: initialSimulationSteps,
    logs: []
  },

  setCurrentView: (view, pushHistory = true) => {
    const { currentView, viewHistory } = get();
    const updatedHistory = pushHistory && view !== currentView 
      ? [...viewHistory, currentView] 
      : viewHistory;
      
    set({ 
      currentView: view,
      viewHistory: updatedHistory,
      // If we change incident view or reset view, align replay indices
      replay: {
        isPlaying: false,
        currentStepIndex: view === 'graph' ? 6 : 6,
        maxSteps: 6
      }
    });
  },

  goBack: () => {
    const { viewHistory } = get();
    if (viewHistory.length > 0) {
      const updatedHistory = [...viewHistory];
      const previousView = updatedHistory.pop()!;
      set({ currentView: previousView, viewHistory: updatedHistory });
    } else {
      set({ currentView: 'landing' });
    }
  },

  setActiveIncidentId: (id) => {
    const incident = get().incidents.find(inc => inc.id === id);
    const stepCount = incident ? incident.timeline.length : 6;
    set({ 
      activeIncidentId: id,
      replay: {
        isPlaying: false,
        currentStepIndex: stepCount,
        maxSteps: stepCount
      }
    });
  },

  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setUserEmail: (email) => set({ userEmail: email }),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setNotificationsOpen: (open) => set({ notificationsOpen: open }),
  setSystemOnline: (online) => set({ systemOnline: online }),
  
  addNotification: (title, description, severity) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      description,
      severity,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
    };
    set((state) => ({
      notifications: [newNotif, ...state.notifications]
    }));
  },

  clearNotifications: () => set({ notifications: [] }),

  triggerTelemetryPing: () => {
    set((state) => {
      const rMultiplier = Math.random() > 0.5 ? 1 : -1;
      const rateDiff = Math.floor(Math.random() * 50) * rMultiplier;
      const cpuDiff = Math.floor(Math.random() * 3) * rMultiplier;
      const alertsIncr = Math.random() > 0.7 ? 1 : 0;
      
      return {
        alertsCount: state.alertsCount + alertsIncr,
        ingestionRate: Math.max(12000, state.ingestionRate + rateDiff),
        cpuUsage: Math.min(95, Math.max(10, state.cpuUsage + cpuDiff))
      };
    });
  },

  // Threat Replay Controls
  setReplayPlaying: (isPlaying) => {
    set((state) => ({
      replay: { ...state.replay, isPlaying }
    }));
  },

  setReplayStepIndex: (index) => {
    set((state) => ({
      replay: { ...state.replay, currentStepIndex: index }
    }));
  },

  stepReplayForward: () => {
    set((state) => {
      const nextIndex = Math.min(state.replay.currentStepIndex + 1, state.replay.maxSteps);
      return {
        replay: { ...state.replay, currentStepIndex: nextIndex }
      };
    });
  },

  stepReplayBackward: () => {
    set((state) => {
      const prevIndex = Math.max(state.replay.currentStepIndex - 1, 0);
      return {
        replay: { ...state.replay, currentStepIndex: prevIndex }
      };
    });
  },

  resetReplay: () => {
    set((state) => ({
      replay: { ...state.replay, currentStepIndex: 0, isPlaying: false }
    }));
  },

  // Attack Simulation Actions
  startAttackSimulation: () => {
    const { simulation } = get();
    if (simulation.isRunning) return;

    // Reset current simulation states
    set((state) => ({
      simulation: {
        ...state.simulation,
        isRunning: true,
        currentStepIndex: -1,
        logs: []
      }
    }));

    // Trigger sequential animation step increments
    const runNext = () => {
      const currentSim = get().simulation;
      if (!currentSim.isRunning) return;

      if (currentSim.currentStepIndex < currentSim.steps.length - 1) {
        get().advanceSimulationStep();
        setTimeout(runNext, 4000); // 4 seconds interval between logs
      } else {
        // Complete simulation
        set((state) => ({
          simulation: {
            ...state.simulation,
            isRunning: false
          }
        }));
        get().addNotification(
          'CRITICAL EXFILTRATION COMPLETE',
          'Simulated attack has finished the final exfiltration stage on SQL-PROD-09.',
          'critical'
        );
      }
    };

    // Begin sequence
    setTimeout(runNext, 1000);
  },

  advanceSimulationStep: () => {
    const { simulation, incidents, alertsCount, incidentsCount } = get();
    const nextIndex = simulation.currentStepIndex + 1;
    if (nextIndex >= simulation.steps.length) return;

    const currentStep = simulation.steps[nextIndex];
    
    // Construct new log item
    const newLog = {
      time: currentStep.time,
      event: currentStep.event,
      source: currentStep.source,
      severity: currentStep.severity
    };

    // Check if simulation incident already exists
    const simIncidentId = 'INC-2026-SIM';
    let updatedIncidents = [...incidents];
    let isNewIncident = false;

    let simIncident = updatedIncidents.find(inc => inc.id === simIncidentId);

    if (!simIncident) {
      isNewIncident = true;
      simIncident = {
        id: simIncidentId,
        title: 'Active Cyber-Attack Simulation (Interactive Probe)',
        status: 'active',
        severity: 'critical',
        confidence: 60, // starts low, increases with more evidence!
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        alertCount: 1,
        reductionRatio: 90.0,
        hostCount: 1,
        userCount: 0,
        mitreMapping: [],
        summary: 'A live cybersecurity intrusion simulation is running in memory. Telemetry signals are currently correlating across hosts, identities, and protocols to synthesize real-time causal paths.',
        aiReasoning: 'AlertWeave Hypergraph Engine is actively correlating incoming signals. We have observed ingress probes, credential reuse attempts, and privilege escalations compiling into a chronological sequence.',
        explainabilityText: 'AlertWeave evaluates simulated event triggers. Identity congruence resolves to adm_security traversing external proxies. AI pattern-overlay matching: LockBit 3.0 (72% probability match).',
        timeline: [],
        evidence: [],
        recommendations: [
          'Revoke compromised adm_security session credentials immediately.',
          'Isolate host SQL-PROD-09 via CrowdStrike Falcon agent block.',
          'Block proxy outbound ranges on egress border firewalls.'
        ],
        nodes: [],
        edges: []
      };
      updatedIncidents.push(simIncident);
    }

    // Append step to incident timeline
    simIncident.timeline = [
      ...simIncident.timeline,
      {
        time: currentStep.time,
        event: currentStep.event,
        source: currentStep.source,
        severity: currentStep.severity
      }
    ];

    // Append nodes & edges
    if (currentStep.nodeToAdd) {
      // Avoid duplicate nodes
      if (!simIncident.nodes.some(n => n.id === currentStep.nodeToAdd!.id)) {
        simIncident.nodes = [...simIncident.nodes, currentStep.nodeToAdd];
      }
    }

    if (currentStep.edgeToAdd) {
      if (!simIncident.edges.some(e => e.id === currentStep.edgeToAdd!.id)) {
        simIncident.edges = [...simIncident.edges, currentStep.edgeToAdd];
      }
    }

    // Update counts & confidence
    simIncident.alertCount = simIncident.timeline.length * 15 + Math.floor(Math.random() * 5);
    simIncident.reductionRatio = parseFloat((100 - (1 / simIncident.alertCount) * 100).toFixed(1));
    simIncident.hostCount = simIncident.nodes.filter(n => n.type === 'host' || n.type === 'server').length || 1;
    simIncident.userCount = simIncident.nodes.filter(n => n.type === 'user').length || 1;
    simIncident.confidence = parseFloat((60 + (nextIndex * 8.5)).toFixed(1));
    
    // Add mapping
    if (!simIncident.mitreMapping.some(m => m.code === currentStep.code)) {
      simIncident.mitreMapping.push({
        tactic: currentStep.tactic,
        technique: currentStep.technique,
        code: currentStep.code
      });
    }

    // Set updated simulation state
    set((state) => ({
      alertsCount: alertsCount + 15,
      incidentsCount: isNewIncident ? incidentsCount + 1 : incidentsCount,
      activeIncidentId: simIncidentId, // Focus onto the active simulated incident!
      incidents: updatedIncidents,
      simulation: {
        ...state.simulation,
        currentStepIndex: nextIndex,
        logs: [...state.simulation.logs, newLog]
      },
      replay: {
        isPlaying: false,
        currentStepIndex: simIncident.timeline.length,
        maxSteps: simIncident.timeline.length
      }
    }));

    get().addNotification(
      `SIMULATION: ${currentStep.tactic}`,
      currentStep.event,
      currentStep.severity
    );
  },

  resetSimulation: () => {
    set((state) => {
      // Filter out the simulated incident to reset
      const resetIncidents = state.incidents.filter(inc => inc.id !== 'INC-2026-SIM');
      return {
        incidents: resetIncidents,
        activeIncidentId: 'INC-2026-004', // default back to first incident
        incidentsCount: 3,
        simulation: {
          isRunning: false,
          currentStepIndex: -1,
          steps: initialSimulationSteps,
          logs: []
        },
        replay: {
          isPlaying: false,
          currentStepIndex: 6,
          maxSteps: 6
        }
      };
    });
    get().addNotification(
      'SIMULATION RESET',
      'The attack simulation environment has been cleanly flushed.',
      'low'
    );
  }
}));
