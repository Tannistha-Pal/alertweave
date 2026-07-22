/**
 * AlertWeave Security Operations Center Type Declarations
 * Professional cybersecurity schemas matching enterprise SIEM/XDR telemetry.
 */

export interface SecurityAlert {
  id: string;
  timestamp: string;
  name: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string; // e.g., "CrowdStrike Falcon", "Palo Alto Prisma", "Okta Directory"
  host: string;
  user: string;
  category: string;
  mitreTactic: string;
  mitreTechnique: string;
  description: string;
  payload: Record<string, string | number | boolean>;
}

export interface AttackNode {
  id: string;
  label: string;
  type: 'host' | 'user' | 'server' | 'alert' | 'credential' | 'process' | 'file' | 'network';
  status: 'critical' | 'compromised' | 'suspicious' | 'safe';
  details: string;
  ipAddress?: string;
  email?: string;
  processPath?: string;
  fileHash?: string;
  port?: number;
}

export interface AttackEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  animated: boolean;
  type: 'credentials_leak' | 'network_connection' | 'lateral_movement' | 'process_spawn' | 'alert_trigger' | 'file_write';
}

export interface SecurityIncident {
  id: string;
  title: string;
  status: 'active' | 'investigating' | 'contained' | 'resolved' | 'dormant';
  severity: 'critical' | 'high' | 'medium' | 'low';
  confidence: number; // percentage (0-100)
  createdAt: string;
  updatedAt: string;
  alertCount: number;
  reductionRatio: number; // e.g. "98.4% alert reduction"
  hostCount: number;
  userCount: number;
  mitreMapping: { tactic: string; technique: string; code: string }[];
  summary: string;
  aiReasoning: string;
  explainabilityText: string;
  timeline: {
    time: string;
    event: string;
    source: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
  }[];
  evidence: {
    type: string;
    value: string;
    assessment: string;
  }[];
  recommendations: string[];
  nodes: AttackNode[];
  edges: AttackEdge[];
}

export interface MitreTechnique {
  code: string;
  name: string;
  tactic: string;
  detected: boolean;
  incidentsCount: number;
  confidence: number;
  playbookAvailable: boolean;
}

export interface GlobalFilter {
  timeRange: '1h' | '24h' | '7d' | '30d';
  severity: ('critical' | 'high' | 'medium' | 'low')[];
  source: string;
  searchQuery: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  doi: string;
  architectureNodes: string[];
  citationsCount: number;
}

export interface PatentClaim {
  id: string;
  title: string;
  status: 'Pending' | 'Granted' | 'Published';
  filingNumber: string;
  filingDate: string;
  inventors: string[];
  abstract: string;
  claims: string[];
}
