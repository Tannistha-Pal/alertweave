import { SecurityAlert, SecurityIncident, MitreTechnique, ResearchPaper, PatentClaim } from '../types';

export const mockAlerts: SecurityAlert[] = [
  {
    id: 'AL-901',
    timestamp: '2026-07-16T06:12:05-07:00',
    name: 'LSASS Process Memory Dump via Rundll32',
    severity: 'critical',
    source: 'CrowdStrike Falcon',
    host: 'DC-01.corp.internal',
    user: 'svc_backup',
    category: 'Credential Access',
    mitreTactic: 'Credential Access',
    mitreTechnique: 'OS Credential Dumping',
    description: 'Process rundll32.exe was observed loading comsvcs.dll to dump LSASS process memory to C:\\Windows\\Temp\\lsass.dmp.',
    payload: { parentProcess: 'cmd.exe', commandLine: 'rundll32.exe C:\\windows\\system32\\comsvcs.dll, MiniDump 1044 C:\\windows\\temp\\lsass.dmp full', md5: 'f39a7b9c9f283281c3e1e2d8479e0a81' }
  },
  {
    id: 'AL-902',
    timestamp: '2026-07-16T05:48:12-07:00',
    name: 'Suspicious PowerShell Encoded Payload Executed',
    severity: 'high',
    source: 'Windows Defender ATP',
    host: 'WS-MARKETING-04',
    user: 'j_doe',
    category: 'Execution',
    mitreTactic: 'Execution',
    mitreTechnique: 'Command and Scripting Interpreter',
    description: 'PowerShell executable invoked with Base64 encoded arguments commonly associated with Cobalt Strike beacons.',
    payload: { commandLine: 'powershell.exe -nop -w hidden -encodedcommand aAB0AHQAcABzADoALwAvAGEAbABlAHIAdAB3AGUAYQB2AGUALgBjAG8AbQAvAGIAZQBhAGMAbwBuAA==', parentProcess: 'explorer.exe' }
  },
  {
    id: 'AL-903',
    timestamp: '2026-07-16T05:15:33-07:00',
    name: 'Inbound RDP from External TOR Exit Node',
    severity: 'critical',
    source: 'Palo Alto Prisma',
    host: 'SQL-PROD-02.corp.internal',
    user: 'adm_smith',
    category: 'Initial Access',
    mitreTactic: 'Initial Access',
    mitreTechnique: 'External Remote Services',
    description: 'Successful RDP connection originated from a known active Tor exit node IP address 185.220.101.4.',
    payload: { sourceIp: '185.220.101.4', destinationPort: 3389, bandwidthBytes: 154800, threatIntelScore: 99 }
  },
  {
    id: 'AL-904',
    timestamp: '2026-07-16T04:30:19-07:00',
    name: 'Abnormal API Keys Access Spike',
    severity: 'high',
    source: 'AWS CloudTrail',
    host: 'AWS-Prod-Account',
    user: 'iam_deployer',
    category: 'Discovery',
    mitreTactic: 'Discovery',
    mitreTechnique: 'Cloud Infrastructure Discovery',
    description: 'Rapid, successive API calls to list secrets and fetch AWS IAM access keys from outside the default VPC CIDR.',
    payload: { apiMethod: 'ListAccessKeys', ipAddress: '103.22.201.52', userAgent: 'aws-cli/2.0 Python/3.8' }
  },
  {
    id: 'AL-905',
    timestamp: '2026-07-16T03:55:01-07:00',
    name: 'Kerberoasting Ticket Request (RC4 Encryption)',
    severity: 'high',
    source: 'Active Directory Security Logs',
    host: 'DC-01.corp.internal',
    user: 'svc_sql_admin',
    category: 'Credential Access',
    mitreTactic: 'Credential Access',
    mitreTechnique: 'Steal or Modify Kerberos Tickets',
    description: 'Service Ticket request for SPN MSSQLSvc/SQL-PROD-02 utilizing RC4 encryption, indicating active ticket harvesting.',
    payload: { serviceName: 'MSSQLSvc/SQL-PROD-02', ticketType: '0x17 (RC4-HMAC)', clientIp: '10.0.4.15' }
  }
];

export const mockIncidents: SecurityIncident[] = [
  {
    id: 'INC-2026-004',
    title: 'Multi-Stage Active Directory Ransomware Staging',
    status: 'active',
    severity: 'critical',
    confidence: 98.4,
    createdAt: '2026-07-16T03:45:00-07:00',
    updatedAt: '2026-07-16T06:20:15-07:00',
    alertCount: 142,
    reductionRatio: 99.2, // 142 alerts correlated to 1 incident
    hostCount: 4,
    userCount: 2,
    mitreMapping: [
      { tactic: 'Credential Access', technique: 'OS Credential Dumping', code: 'T1003' },
      { tactic: 'Lateral Movement', technique: 'Remote Services: Remote Desktop Protocol', code: 'T1021.001' },
      { tactic: 'Credential Access', technique: 'Steal or Modify Kerberos Tickets: Kerberoasting', code: 'T1558.003' },
      { tactic: 'Exfiltration', technique: 'Exfiltration Over Web Service', code: 'T1567' }
    ],
    summary: 'A sophisticated attacker gained initial access via compromised remote backup accounts, harvested domain admin credentials using Kerberoasting and LSASS dumping, and is actively preparing a target folder for data exfiltration on the Primary Domain Controller.',
    aiReasoning: 'AlertWeave reconstructed this incident by weaving together alerts across CrowdStrike (LSASS Dump), AD Logs (Kerberoasting), and Palo Alto Networks (Tor connection). By analyzing temporal correlation (<150s gaps), identity convergence (compromised admin tokens traversing hosts), and process lineage, we isolated this multi-stage APT cluster from 142 raw background noises. This confirms with high confidence a coordinated Ransomware Pre-Staging operation.',
    explainabilityText: 'Our Hypergraph Correlation Engine evaluated 142 alerts. It matched a common identity (svc_sql_admin and svc_backup) across 4 endpoints (DC-01, SQL-PROD-02, WS-MARKETING-04, and AWS-Prod). Correlation vector weight: 0.98. Sequence matches the LockBit 3.0 threat group playbook with an 88% behavioral overlay match.',
    timeline: [
      { time: '03:45:12', event: 'Initial ingress established from Tor Node to SQL-PROD-02', source: 'Palo Alto Prisma', severity: 'high' },
      { time: '03:55:01', event: 'Kerberoasting ticket requested using RC4 cypher', source: 'Active Directory Logs', severity: 'high' },
      { time: '04:12:45', event: 'Lateral movement to DC-01 via RDP session hijacking', source: 'CrowdStrike Falcon', severity: 'critical' },
      { time: '05:30:11', event: 'PowerShell script executes Cobalt Strike loader on marketing workstation', source: 'Windows Defender', severity: 'high' },
      { time: '06:12:05', event: 'LSASS memory dump initiated on Domain Controller DC-01', source: 'CrowdStrike Falcon', severity: 'critical' },
      { time: '06:20:15', event: 'Unauthorized high-volume transfer of critical backups begins', source: 'AWS CloudTrail', severity: 'critical' }
    ],
    evidence: [
      { type: 'IP Address', value: '185.220.101.4', assessment: 'TOR node, heavily associated with threat group FIN7' },
      { type: 'File Hash (SHA-256)', value: '6a4220b135ec6402ea29b2b0051e8a93a1cfbd5fb00e2001', assessment: 'Matches Cobalt Strike beacon payload signature' },
      { type: 'Process', value: 'rundll32.exe calling comsvcs.dll', assessment: 'Known technique to bypass endpoint telemetry when dumping credentials' }
    ],
    recommendations: [
      { id: 'REC-01', text: 'Revoke svc_backup and svc_sql_admin sessions instantly across Active Directory.' },
      { id: 'REC-02', text: 'Apply immediate network isolation on DC-01 and SQL-PROD-02 using CrowdStrike network block.' },
      { id: 'REC-03', text: 'Invalidate and roll over Kerberos Ticket Granting Service (krbtgt) password twice.' },
      { id: 'REC-04', text: 'Block the source TOR IP 185.220.101.4 on the border firewall.' }
    ] as any, // Cast to any or just map strings
    nodes: [
      { id: 'node-user-1', label: 'svc_backup', type: 'user', status: 'critical', details: 'Compromised AD Service Account', email: 'svc_backup@corp.internal' },
      { id: 'node-host-1', label: 'DC-01', type: 'server', status: 'critical', details: 'Domain Controller - Primary AD', ipAddress: '10.0.1.10' },
      { id: 'node-host-2', label: 'SQL-PROD-02', type: 'server', status: 'compromised', details: 'Microsoft SQL Production Server', ipAddress: '10.0.4.15' },
      { id: 'node-alert-1', label: 'LSASS Memory Dump', type: 'alert', status: 'critical', details: 'Triggered by CrowdStrike Falcon' },
      { id: 'node-proc-1', label: 'rundll32.exe', type: 'process', status: 'critical', details: 'Process spawn from comsvcs.dll', processPath: 'C:\\Windows\\System32\\rundll32.exe' },
      { id: 'node-file-1', label: 'lsass.dmp', type: 'file', status: 'suspicious', details: 'Credentials Storage File Dump', fileHash: 'd3b073c1a84f328f' },
      { id: 'node-net-1', label: 'Tor Traffic (185.220.101.4)', type: 'network', status: 'critical', details: 'External RDP Inbound', port: 3389 }
    ],
    edges: [
      { id: 'e1', source: 'node-net-1', target: 'node-host-2', label: 'Initial Remote Login', animated: true, type: 'network_connection' },
      { id: 'e2', source: 'node-user-1', target: 'node-host-2', label: 'Auth Token Used', animated: false, type: 'credentials_leak' },
      { id: 'e3', source: 'node-host-2', target: 'node-host-1', label: 'Lateral RDP Movement', animated: true, type: 'lateral_movement' },
      { id: 'e4', source: 'node-host-1', target: 'node-proc-1', label: 'Spawns Process', animated: true, type: 'process_spawn' },
      { id: 'e5', source: 'node-proc-1', target: 'node-file-1', label: 'Writes Dump', animated: true, type: 'file_write' },
      { id: 'e6', source: 'node-proc-1', target: 'node-alert-1', label: 'Raises Alert', animated: true, type: 'alert_trigger' }
    ]
  },
  {
    id: 'INC-2026-003',
    title: 'Cloud Infrastructure API Key Leak & Exfiltration',
    status: 'investigating',
    severity: 'high',
    confidence: 91.2,
    createdAt: '2026-07-16T01:10:00-07:00',
    updatedAt: '2026-07-16T05:10:30-07:00',
    alertCount: 89,
    reductionRatio: 98.8,
    hostCount: 1,
    userCount: 1,
    mitreMapping: [
      { tactic: 'Credential Access', technique: 'Unsecured Credentials: Cloud Secrets', code: 'T1552.001' },
      { tactic: 'Exfiltration', technique: 'Exfiltration to Cloud Storage', code: 'T1567.002' }
    ],
    summary: 'A public GitHub repository accidentally leaked an AWS IAM credentials key. An automated bot scraped the key and initiated a massive AWS S3 bucket synchronization, downloading 14.2 GB of patient database backups.',
    aiReasoning: 'Correlated through GitHub API logs and AWS CloudTrail. The source IP matches an active DigitalOcean proxy IP often used by scanning frameworks. Our AI cluster grouped 89 rapid "GetObject" calls into a single exfiltration timeline.',
    explainabilityText: 'Calculated correlation score: 0.91. Matching parameters: identity (iam_deployer) + geolocation (Frankfurt Proxy) + API access pattern.',
    timeline: [
      { time: '01:10:00', event: 'API keys leaked on public repository branch merge', source: 'GitGuardian Service', severity: 'medium' },
      { time: '01:12:15', event: 'First API call to ListBuckets from external IP', source: 'AWS CloudTrail', severity: 'high' },
      { time: '01:30:00', event: 'High volume download from secure-patient-records-prod', source: 'AWS S3 Logs', severity: 'critical' }
    ],
    evidence: [
      { type: 'Access Key ID', value: 'AKIAIOSFODNN7EXAMPLE', assessment: 'Exposed deployer keys' },
      { type: 'IP Address', value: '103.22.201.52', assessment: 'Frankfurt hosted server scraper' }
    ],
    recommendations: [
      { id: 'REC-01', text: 'Invalidate AWS Access Key AKIAIOSFODNN7EXAMPLE immediately.' },
      { id: 'REC-02', text: 'Attach temporary restrictive AWS IAM deny-all policy to iam_deployer.' },
      { id: 'REC-03', text: 'Enable S3 secure transport restrictions and origin check.' }
    ] as any,
    nodes: [
      { id: 'cloud-user-1', label: 'iam_deployer', type: 'user', status: 'critical', details: 'Leaked IAM User identity' },
      { id: 'cloud-host-1', label: 'AWS-Prod-Account', type: 'host', status: 'suspicious', details: 'Primary Production Cloud Account' },
      { id: 'cloud-alert-1', label: 'S3 Sync Over Web', type: 'alert', status: 'critical', details: 'Fired by AWS GuardDuty' }
    ],
    edges: [
      { id: 'ce1', source: 'cloud-user-1', target: 'cloud-host-1', label: 'Secret Key Abuse', animated: true, type: 'credentials_leak' },
      { id: 'ce2', source: 'cloud-host-1', target: 'cloud-alert-1', label: 'Raises Exfiltration Indicator', animated: true, type: 'alert_trigger' }
    ]
  },
  {
    id: 'INC-2026-002',
    title: 'Phishing Campaign with Multi-Factor Bypass',
    status: 'contained',
    severity: 'medium',
    confidence: 84.5,
    createdAt: '2026-07-15T09:20:00-07:00',
    updatedAt: '2026-07-15T15:45:00-07:00',
    alertCount: 45,
    reductionRatio: 97.7,
    hostCount: 2,
    userCount: 3,
    mitreMapping: [
      { tactic: 'Initial Access', technique: 'Phishing: Spearphishing Link', code: 'T1566.002' },
      { tactic: 'Credential Access', technique: 'Multi-Factor Authentication Bypass', code: 'T1556.006' }
    ],
    summary: 'A phishing link distributed to corporate marketing lists simulated an Okta SSO portal, prompting users to fill in verification codes and bypassing multi-factor settings via Session Cookie hijacking.',
    aiReasoning: 'Reconstructed via Okta Log streams and secure mail filters. Attacker hijacked cookies to bypass prompt, then logged in from unrecognized host system.',
    explainabilityText: 'Alert correlation: 0.84. High identity alignment across concurrent browser sessions.',
    timeline: [
      { time: '09:20:00', event: 'Phishing email containing Okta replica links delivered to 15 recipients', source: 'Proofpoint', severity: 'medium' },
      { time: '09:42:00', event: 'Multi-factor authentication prompt generated successively', source: 'Okta Verify', severity: 'high' },
      { time: '10:05:00', event: 'Successful login bypass via session token hijack', source: 'Okta Logs', severity: 'critical' }
    ],
    evidence: [
      { type: 'Phishing Domain', value: 'okta-auth-update.net', assessment: 'Malicious domain masquerading as Okta SSO' },
      { type: 'Okta Client OS', value: 'Kali Linux / Firefox', assessment: 'Mismatched user-agent from standard employee laptop' }
    ],
    recommendations: [
      { id: 'REC-01', text: 'Revoke and reset all browser active sessions for target users.' },
      { id: 'REC-02', text: 'Blacklist domain okta-auth-update.net on corporate proxy.' },
      { id: 'REC-03', text: 'Inbound filter adjustment to flag lookalike domain prefixes.' }
    ] as any,
    nodes: [],
    edges: []
  }
];

export const mockMitreMatrix: MitreTechnique[] = [
  { code: 'T1566', name: 'Phishing', tactic: 'Initial Access', detected: true, incidentsCount: 2, confidence: 94, playbookAvailable: true },
  { code: 'T1190', name: 'Exploit Public-Facing Application', tactic: 'Initial Access', detected: false, incidentsCount: 0, confidence: 0, playbookAvailable: true },
  { code: 'T1203', name: 'Exploitation for Client Execution', tactic: 'Execution', detected: false, incidentsCount: 0, confidence: 0, playbookAvailable: false },
  { code: 'T1059', name: 'Command & Scripting Interpreter', tactic: 'Execution', detected: true, incidentsCount: 4, confidence: 99, playbookAvailable: true },
  { code: 'T1078', name: 'Valid Accounts', tactic: 'Defense Evasion', detected: true, incidentsCount: 3, confidence: 88, playbookAvailable: true },
  { code: 'T1036', name: 'Masquerading', tactic: 'Defense Evasion', detected: true, incidentsCount: 1, confidence: 75, playbookAvailable: true },
  { code: 'T1003', name: 'OS Credential Dumping', tactic: 'Credential Access', detected: true, incidentsCount: 2, confidence: 98, playbookAvailable: true },
  { code: 'T1558', name: 'Steal/Modify Kerberos Tickets', tactic: 'Credential Access', detected: true, incidentsCount: 1, confidence: 95, playbookAvailable: true },
  { code: 'T1046', name: 'Network Service Discovery', tactic: 'Discovery', detected: false, incidentsCount: 0, confidence: 0, playbookAvailable: false },
  { code: 'T1082', name: 'System Information Discovery', tactic: 'Discovery', detected: true, incidentsCount: 2, confidence: 82, playbookAvailable: true },
  { code: 'T1021', name: 'Lateral Remote Desktop Protocol', tactic: 'Lateral Movement', detected: true, incidentsCount: 1, confidence: 97, playbookAvailable: true },
  { code: 'T1072', name: 'Software Deployment Tools', tactic: 'Lateral Movement', detected: false, incidentsCount: 0, confidence: 0, playbookAvailable: true },
  { code: 'T1567', name: 'Exfiltration Over Web Service', tactic: 'Exfiltration', detected: true, incidentsCount: 2, confidence: 96, playbookAvailable: true }
];

export const mockPapers: ResearchPaper[] = [
  {
    id: 'paper-01',
    title: 'Weaving Security Telemetry: Enterprise-Scale Attack Story Reconstruction via Hypergraph Correlation Engines',
    authors: ['Dr. Vikram Iyer', 'Prof. Ramesh Kulkarni', 'Dr. Helen Vance'],
    venue: 'IEEE Transactions on Dependable and Secure Computing (TDSC)',
    year: 2026,
    abstract: 'Enterprise Security Operations Centers (SOCs) suffer from severe cognitive overloading due to disconnected alert bursts. This paper introduces AlertWeave, an advanced system utilizing temporal hypergraphs, probabilistic cross-layer identity mapping, and causal sequence learning to automatically distill thousands of raw security events into actionable attack stories. Our evaluation across enterprise datasets shows a 98.4% alert reduction ratio and a 14x acceleration in Mean Time to Containment (MTTC).',
    doi: '10.1109/TDSC.2026.1044229',
    architectureNodes: ['SIEM Sensor Array', 'Hypergraph Correlator', 'Causal Weaver', 'LLM Explainability Synthesizer', 'Defensive Actuator'],
    citationsCount: 42
  },
  {
    id: 'paper-02',
    title: 'Causal Chain Extraction in Dense Cyber-Telemetry Networks',
    authors: ['Prof. Ramesh Kulkarni', 'Dr. Vikram Iyer'],
    venue: 'ACM Conference on Computer and Communications Security (CCS)',
    year: 2025,
    abstract: 'Abstracting attacker lateral movement from network background noises requires structural path analyses. We propose a state-space telemetry tracing schema that represents endpoints, users, ports, and processes as multi-attribute nodes. By evaluating the joint probability of transition matrices, we reconstruct the underlying attack graphs even under partial coverage or log deletion.',
    doi: '10.1145/ccs.2025.55392',
    architectureNodes: ['Active Trace Buffer', 'Transition Estimator', 'State Weaver', 'Adaptive Forensics Log'],
    citationsCount: 88
  }
];

export const mockPatents: PatentClaim[] = [
  {
    id: 'pat-01',
    title: 'Probabilistic Threat Hypergraph Correlation and Automated Attack Incident Reconstitution System',
    status: 'Granted',
    filingNumber: 'IN-202611044238-A',
    filingDate: 'September 12, 2024',
    inventors: ['Dr. Vikram Iyer', 'Prof. Ramesh Kulkarni'],
    abstract: 'A method and system to dynamically assemble fragmented cybersecurity alert logs into correlated, chronological multi-host threat incidents. The system calculates threat confidence factors by weighting cross-vendor sensor metadata, mapping entities to transient identity records, and animating causal attack graphs to trigger automated mitigation playbooks.',
    claims: [
      'A non-transitory computer-readable storage medium hosting instructions that construct an active multi-dimensional hypergraph representing entities as nodes and temporal dependencies as edges.',
      'Evaluating cross-vendor sensor confidence thresholds against historical alert convergence statistics to compute a global incident confidence score.',
      'Automatically executing API endpoint isolation policies based on computed threat weights and MITRE ATT&CK technique verification indicators.'
    ]
  },
  {
    id: 'pat-02',
    title: 'Real-time Identity Resolution and Session Reconstruction in Heterogeneous SIEM Architectures',
    status: 'Pending',
    filingNumber: 'IN-202521090123-A',
    filingDate: 'May 04, 2025',
    inventors: ['Dr. Vikram Iyer', 'Dr. Helen Vance'],
    abstract: 'An enterprise threat intelligence apparatus that tracks disparate identity signatures (such as Active Directory SIDs, AWS ARN roles, public IP addresses, and custom browser cookie payloads) across diverse security logs to construct a unified, dynamic user behavior record, bypassing network translation obstacles.',
    claims: [
      'Constructing a live registry of temporary identity bindings across cloud platforms, authentication logs, and network endpoints.',
      'Correlating specific credential usage spikes with concurrent remote session protocol handshakes to isolate identity theft indicators.'
    ]
  }
];
