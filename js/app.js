// ============================================================
// WIRED — UX Prototype | app.js Part 1: Data + Core + Dashboard
// ============================================================

// --- MOCK DATA ---
const DATA = {
  user: { name: 'Alex Morgan', role: 'Project Manager', initials: 'AM', color: '#6366f1' },

  projects: [
    { id: 1, name: 'Alpha Launch', type: 'Engineering', status: 'active', priority: 'high', health: 82, progress: 67, pm: 'AM', pmColor: '#6366f1', due: '2026-08-15', budget: 120000, spent: 74000, tasks: { total: 34, done: 23, overdue: 2 }, team: ['AM','JD','SR','TK'], description: 'Full platform launch for Q3 including API, frontend and DevOps pipeline.', startDate: '2026-04-01', milestones: [ { id:1, name:'API complete', date:'2026-06-30', status:'done' }, { id:2, name:'Beta release', date:'2026-07-20', status:'active' }, { id:3, name:'Launch', date:'2026-08-15', status:'upcoming' } ], risks: [ { id:1, desc:'Third-party API dependency delay', severity:'high', owner:'JD', open:true }, { id:2, desc:'Performance under load', severity:'medium', owner:'SR', open:true } ] },
    { id: 2, name: 'Brand Refresh', type: 'Marketing', status: 'at-risk', priority: 'medium', health: 54, progress: 41, pm: 'JD', pmColor: '#f59e0b', due: '2026-07-30', budget: 45000, spent: 28000, tasks: { total: 18, done: 7, overdue: 4 }, team: ['JD','LM'], description: 'Visual identity overhaul across all digital and print touchpoints.', startDate: '2026-05-01', milestones: [ { id:4, name:'Moodboard approved', date:'2026-05-31', status:'done' }, { id:5, name:'Logo final', date:'2026-07-01', status:'active' } ], risks: [ { id:3, desc:'Stakeholder alignment on direction', severity:'high', owner:'JD', open:true } ] },
    { id: 3, name: 'Data Platform', type: 'Engineering', status: 'planning', priority: 'critical', health: null, progress: 8, pm: 'SR', pmColor: '#10b981', due: '2026-12-01', budget: 200000, spent: 5000, tasks: { total: 6, done: 0, overdue: 0 }, team: ['SR','TK','AM'], description: 'Unified data warehouse and analytics platform migration.', startDate: '2026-06-15', milestones: [], risks: [] },
    { id: 4, name: 'Mobile App v2', type: 'Engineering', status: 'active', priority: 'high', health: 76, progress: 55, pm: 'TK', pmColor: '#8b5cf6', due: '2026-09-30', budget: 95000, spent: 48000, tasks: { total: 41, done: 22, overdue: 1 }, team: ['TK','AM','JD'], description: 'Major version update with redesigned UI and offline mode.', startDate: '2026-03-15', milestones: [ { id:6, name:'UX design done', date:'2026-05-15', status:'done' }, { id:7, name:'Beta build', date:'2026-08-01', status:'active' }, { id:8, name:'App store release', date:'2026-09-30', status:'upcoming' } ], risks: [] },
    { id: 5, name: 'Compliance Audit', type: 'Operations', status: 'completed', priority: 'critical', health: 91, progress: 100, pm: 'LM', pmColor: '#06b6d4', due: '2026-05-31', budget: 30000, spent: 28500, tasks: { total: 22, done: 22, overdue: 0 }, team: ['LM','AM'], description: 'Annual SOC2 compliance audit and remediation.', startDate: '2026-03-01', milestones: [], risks: [] },
    { id: 6, name: 'Partner Portal', type: 'Engineering', status: 'on-hold', priority: 'low', health: 38, progress: 22, pm: 'JD', pmColor: '#f59e0b', due: '2026-11-15', budget: 60000, spent: 14000, tasks: { total: 28, done: 6, overdue: 5 }, team: ['JD','SR'], description: 'Self-service portal for external partners.', startDate: '2026-02-01', milestones: [], risks: [ { id:4, desc:'Budget freeze pending executive review', severity:'high', owner:'JD', open:true } ] }
  ],

  approvals: [
    { id: 1, title: 'Create recovery task: Milestone missed', desc: 'Policy "Milestone Slip" triggered because milestone "Logo final" was not completed by 2026-07-01.', policy: 'Milestone Slip', project: 'Brand Refresh', projectId: 2, action: 'create-task', urgency: 'critical', age: '2h ago', taskTitle: 'Recovery plan: Logo final milestone missed', assignee: 'JD', dueOffset: 3 },
    { id: 2, title: 'Change project status → At Risk', desc: 'Policy "Risk Escalation" triggered: task "Stakeholder alignment" has been blocked for 52 hours.', policy: 'Risk Escalation', project: 'Brand Refresh', projectId: 2, action: 'change-status', urgency: 'critical', age: '5h ago', targetStatus: 'at-risk' },
    { id: 3, title: 'Notify PM: Budget threshold reached', desc: 'Policy "Budget Warning" triggered: actual spend is 82% of total budget on Partner Portal.', policy: 'Budget Warning', project: 'Partner Portal', projectId: 6, action: 'notify', urgency: 'normal', age: '1d ago' },
    { id: 4, title: 'Create task: Overdue alert', desc: 'Policy "Overdue Alert" triggered: 4 tasks are past due date on Brand Refresh.', policy: 'Overdue Alert', project: 'Brand Refresh', projectId: 2, action: 'create-task', urgency: 'normal', age: '2d ago', taskTitle: 'Review and reschedule 4 overdue tasks', assignee: 'JD', dueOffset: 2 }
  ],

  approvalHistory: [
    { id: 10, title: 'Create task: Milestone recovery', policy: 'Milestone Slip', project: 'Alpha Launch', outcome: 'approved', decidedBy: 'Alex Morgan', decidedAt: '2026-06-18 14:22', note: 'Assigned to SR with 5-day window.' },
    { id: 11, title: 'Change project status → On Hold', policy: 'Risk Escalation', project: 'Partner Portal', outcome: 'approved-modified', decidedBy: 'Alex Morgan', decidedAt: '2026-06-17 09:10', note: 'Modified: set to On Hold instead of At Risk.' },
    { id: 12, title: 'Notify PM: No update in 7 days', policy: 'Status Reminder', project: 'Mobile App v2', outcome: 'rejected', decidedBy: 'Alex Morgan', decidedAt: '2026-06-15 11:45', note: 'PM already updated manually.' }
  ],

  policies: [
    { id: 1, name: 'Overdue Alert', scope: 'global', status: 'active', trigger: 'Task overdue 1 day', condition: 'Priority = High or Critical', action: 'Notify PM + assignee', requireApproval: false, lastFired: '2d ago', inherited: false },
    { id: 2, name: 'Budget Warning', scope: 'global', status: 'active', trigger: 'Budget threshold 80%', condition: '—', action: 'Notify PM; require approval for spend changes', requireApproval: true, lastFired: '1d ago', inherited: false },
    { id: 3, name: 'Milestone Slip', scope: 'global', status: 'active', trigger: 'Milestone missed', condition: '—', action: 'Escalate to sponsor + create recovery task', requireApproval: true, lastFired: '2h ago', inherited: false },
    { id: 4, name: 'Status Reminder', scope: 'global', status: 'active', trigger: 'No update in 7 days', condition: '—', action: 'Notify PM', requireApproval: false, lastFired: '5d ago', inherited: false },
    { id: 5, name: 'Risk Escalation', scope: 'global', status: 'active', trigger: 'Task blocked 48h', condition: 'Priority = Critical', action: 'Notify PM; change project status to At Risk', requireApproval: true, lastFired: '5h ago', inherited: false },
    { id: 6, name: 'Engineering Over-Budget Watch', scope: 'type', projectType: 'Engineering', status: 'active', trigger: 'Budget threshold 70%', condition: 'Project type = Engineering', action: 'Notify PM + Escalate to sponsor', requireApproval: false, lastFired: 'Never', inherited: false },
    { id: 7, name: 'Alpha Launch: Critical Task Guard', scope: 'project', projectId: 1, status: 'active', trigger: 'Task overdue 2 days', condition: 'Priority = Critical', action: 'Require approval before any status change', requireApproval: true, lastFired: 'Never', inherited: false }
  ],

  team: [
    { id: 1, initials: 'AM', name: 'Alex Morgan', role: 'Project Manager', email: 'alex@wired.io', projects: 3, capacity: 80, color: '#6366f1' },
    { id: 2, initials: 'JD', name: 'Jordan Davis', role: 'Designer', email: 'jordan@wired.io', projects: 2, capacity: 95, color: '#f59e0b' },
    { id: 3, initials: 'SR', name: 'Sam Rivera', role: 'Engineer', email: 'sam@wired.io', projects: 2, capacity: 60, color: '#10b981' },
    { id: 4, initials: 'TK', name: 'Taylor Kim', role: 'Tech Lead', email: 'taylor@wired.io', projects: 2, capacity: 110, color: '#8b5cf6' },
    { id: 5, initials: 'LM', name: 'Lee Mitchell', role: 'Analyst', email: 'lee@wired.io', projects: 1, capacity: 45, color: '#06b6d4' }
  ],

  tasks: {
    1: [
      { id:1, name:'Setup CI/CD pipeline', assignee:'SR', assigneeColor:'#10b981', status:'done', priority:'high', due:'2026-06-10' },
      { id:2, name:'API authentication module', assignee:'AM', assigneeColor:'#6366f1', status:'done', priority:'critical', due:'2026-06-20' },
      { id:3, name:'Load testing & benchmarks', assignee:'SR', assigneeColor:'#10b981', status:'in-progress', priority:'high', due:'2026-07-05' },
      { id:4, name:'Frontend dashboard v1', assignee:'TK', assigneeColor:'#8b5cf6', status:'in-progress', priority:'medium', due:'2026-07-15' },
      { id:5, name:'Security penetration test', assignee:'AM', assigneeColor:'#6366f1', status:'todo', priority:'critical', due:'2026-07-25' },
      { id:6, name:'Docs & runbooks', assignee:'JD', assigneeColor:'#f59e0b', status:'todo', priority:'low', due:'2026-08-01' }
    ],
    2: [
      { id:7, name:'Stakeholder alignment', assignee:'JD', assigneeColor:'#f59e0b', status:'blocked', priority:'critical', due:'2026-06-25' },
      { id:8, name:'Logo design v2', assignee:'JD', assigneeColor:'#f59e0b', status:'in-progress', priority:'high', due:'2026-07-10' },
      { id:9, name:'Brand guidelines doc', assignee:'LM', assigneeColor:'#06b6d4', status:'todo', priority:'medium', due:'2026-07-20' }
    ]
  },

  activity: [
    { type:'task', icon:'✓', color:'#10b981', bg:'#ecfdf5', text:'<strong>Sam Rivera</strong> completed "API authentication module" on <strong>Alpha Launch</strong>', time:'10 min ago' },
    { type:'approval', icon:'⚡', color:'#f59e0b', bg:'#fffbeb', text:'Policy <strong>Milestone Slip</strong> triggered approval request on <strong>Brand Refresh</strong>', time:'2h ago' },
    { type:'walkthrough', icon:'◎', color:'#6366f1', bg:'#eef2ff', text:'<strong>Alex Morgan</strong> completed walkthrough on <strong>Alpha Launch</strong> — health 78→82', time:'1d ago' },
    { type:'risk', icon:'⚠', color:'#ef4444', bg:'#fef2f2', text:'New <strong>High</strong> risk added to <strong>Brand Refresh</strong>: Stakeholder alignment delay', time:'1d ago' },
    { type:'task', icon:'✓', color:'#10b981', bg:'#ecfdf5', text:'<strong>Lee Mitchell</strong> completed all 22 tasks on <strong>Compliance Audit</strong>', time:'3d ago' }
  ]
};

// --- STATE ---
const STATE = {
  currentPage: 'dashboard',
  currentProject: null,
  currentTab: 'overview',
  currentApprovalTab: 'pending',
  selectedApproval: null,
  sidebarCollapsed: false,
  wizardStep: 1,
  walkthroughStep: 1,
  walkthroughActive: false,
  wizardData: {}
};

// --- ICONS (inline SVG helpers) ---
const I = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  dollar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  alertTriangle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  history: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.71L1 10"/></svg>`
};

// Sized icon wrapper — prevents bare SVGs from expanding
function ico(svg, size=14) {
  return `<span style="display:inline-flex;width:${size}px;height:${size}px;flex-shrink:0;vertical-align:middle">${svg}</span>`;
}

// --- UTILITIES ---
function hs(score) {
  if (score === null || score === undefined) return { cls: '', label: 'N/A', color: '#94a3b8' };
  if (score >= 75) return { cls: 'hs-green', label: 'Healthy', color: '#10b981' };
  if (score >= 50) return { cls: 'hs-amber', label: 'At Risk', color: '#f59e0b' };
  return { cls: 'hs-red', label: 'Critical', color: '#ef4444' };
}

function healthBadge(score) {
  const h = hs(score);
  if (score === null || score === undefined) return `<span class="badge badge-gray">N/A</span>`;
  return `<span class="badge" style="background:${h.color}18;color:${h.color}"><span class="badge-dot" style="background:${h.color}"></span>${score}</span>`;
}

function statusBadge(status) {
  const map = {
    'active': ['badge-active', 'Active'],
    'at-risk': ['badge-at-risk', 'At Risk'],
    'planning': ['badge-planning', 'Planning'],
    'on-hold': ['badge-on-hold', 'On Hold'],
    'completed': ['badge-completed', 'Completed'],
    'archived': ['badge-archived', 'Archived']
  };
  const [cls, label] = map[status] || ['badge-gray', status];
  return `<span class="badge ${cls}"><span class="badge-dot"></span>${label}</span>`;
}

function priorityBadge(p) {
  const map = { critical:'badge-critical', high:'badge-high', medium:'badge-medium', low:'badge-low' };
  return `<span class="badge ${map[p]||'badge-gray'}">${p.charAt(0).toUpperCase()+p.slice(1)}</span>`;
}

function avatar(initials, color, size='md') {
  return `<div class="avatar avatar-${size}" style="background:${color}">${initials}</div>`;
}

function avatarGroup(members) {
  return `<div class="avatar-group">${members.map(m=>{
    const t = DATA.team.find(x=>x.initials===m);
    return avatar(m, t?t.color:'#6366f1','sm');
  }).join('')}</div>`;
}

function progressBar(pct, cls='blue') {
  const h = hs(pct);
  const barCls = pct===null ? 'blue' : (pct>=75?'green':pct>=50?'amber':'red');
  return `<div class="progress-bar"><div class="progress-fill ${barCls}" style="width:${pct||0}%"></div></div>`;
}

function fmt(n) { return n>=1000 ? '$'+(n/1000).toFixed(0)+'k' : '$'+n; }
function fmtFull(n) { return '$'+n.toLocaleString(); }

function toast(msg, type='success') {
  const icons = { success: I.checkCircle, error: I.x, warning: I.alertTriangle, info: I.info };
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span class="toast-icon ${type}">${icons[type]||I.info}</span>${msg}`;
  document.getElementById('toast-container').appendChild(t);
  t.onclick = () => t.remove();
  setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity 300ms'; setTimeout(()=>t.remove(),300); }, 4000);
}

// --- SIDEBAR ---
function renderSidebar() {
  const nav = [
    { id:'dashboard', label:'Dashboard', icon:I.dashboard },
    { id:'projects', label:'Projects', icon:I.folder },
    { id:'approvals', label:'Approvals', icon:I.check, badge: DATA.approvals.length },
    { id:'policies', label:'Policies', icon:I.zap },
    { id:'team', label:'Team', icon:I.users },
    { id:'analytics', label:'Analytics', icon:I.chart }
  ];
  document.getElementById('sidebar').innerHTML = `
    <div class="sidebar-logo">
      <div class="logo-mark">W</div>
      <span class="logo-name">Wired</span>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section-label">Main</div>
      ${nav.map(n=>`
        <div class="nav-item ${STATE.currentPage===n.id?'active':''}" data-page="${n.id}">
          ${n.icon}
          <span>${n.label}</span>
          ${n.badge ? `<span class="nav-badge">${n.badge}</span>` : ''}
        </div>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      ${avatar(DATA.user.initials, DATA.user.color, 'sm')}
      <div>
        <div class="user-name">${DATA.user.name}</div>
        <div class="user-role">${DATA.user.role}</div>
      </div>
    </div>`;
  document.querySelectorAll('#sidebar .nav-item[data-page]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.page));
  });
}

// --- TOPBAR ---
function renderTopbar(crumbs) {
  document.getElementById('topbar').innerHTML = `
    <div class="topbar-breadcrumb">
      ${crumbs.map((c,i)=>`
        ${i>0?`<span class="crumb-sep">${I.chevronRight}</span>`:''}
        <span class="${i===crumbs.length-1?'crumb-active':''}" ${c.page?`style="cursor:pointer" data-page="${c.page}"`:''}>${c.label}</span>
      `).join('')}
    </div>
    <div class="topbar-search">${I.search}<span>Search...</span></div>
    <div class="topbar-actions">
      <div class="topbar-icon-btn" title="Notifications">
        ${I.bell}
        <span class="topbar-notif-dot"></span>
      </div>
      <div class="topbar-icon-btn" title="Settings">${I.settings}</div>
      <div class="topbar-avatar" title="${DATA.user.name}">${DATA.user.initials}</div>
    </div>`;
  document.querySelectorAll('#topbar [data-page]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.page));
  });
}

// --- ROUTER ---
function navigate(page, projectId) {
  if (page === 'project-detail' && projectId) {
    STATE.currentProject = DATA.projects.find(p=>p.id===projectId);
    STATE.currentTab = 'overview';
  }
  STATE.currentPage = page;
  renderSidebar();
  render();
}

function render() {
  const content = document.getElementById('content');
  content.className = 'page-fade';
  switch(STATE.currentPage) {
    case 'dashboard': renderDashboard(); break;
    case 'projects': renderProjects(); break;
    case 'project-detail': renderProjectDetail(); break;
    case 'approvals': renderApprovals(); break;
    case 'policies': renderPolicies(); break;
    case 'team': renderTeam(); break;
    case 'analytics': renderAnalytics(); break;
    default: renderDashboard();
  }
}

// --- DASHBOARD ---
function renderDashboard() {
  renderTopbar([{label:'Dashboard'}]);
  const active = DATA.projects.filter(p=>p.status==='active').length;
  const overdue = DATA.projects.reduce((a,p)=>a+(p.tasks.overdue||0),0);
  const avgHealth = Math.round(DATA.projects.filter(p=>p.health).reduce((a,p)=>a+p.health,0)/DATA.projects.filter(p=>p.health).length);

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Good morning, Alex 👋</div>
        <div class="page-subtitle">Friday, June 20 · ${active} active projects · ${DATA.approvals.length} approvals pending</div>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" id="btn-new-project">${I.plus} New Project</button>
      </div>
    </div>

    <div class="grid-kpi mb-6">
      ${kpiTile('Active Projects', active, '#eef2ff', '#6366f1', I.folder, '+2 this month', 'up')}
      ${kpiTile('Pending Approvals', DATA.approvals.length, '#fef2f2', '#ef4444', I.check, '2 critical', 'down')}
      ${kpiTile('Team Members', DATA.team.length, '#ecfdf5', '#10b981', I.users, 'All active', 'up')}
      ${kpiTile('Overdue Tasks', overdue, '#fffbeb', '#f59e0b', I.clock, 'Across 3 projects', 'down')}
    </div>

    <div class="grid-2 mb-6">
      <div>
        <div class="section-title">Recent Projects</div>
        ${DATA.projects.slice(0,4).map(p=>`
          <div class="project-card mb-3" data-project="${p.id}">
            <div class="flex items-center justify-between">
              <div>
                <div class="project-card-type">${p.type}</div>
                <div class="project-card-name">${p.name}</div>
              </div>
              ${healthBadge(p.health)}
            </div>
            ${statusBadge(p.status)}
            <div class="progress-bar mt-2"><div class="progress-fill ${p.health>=75?'green':p.health>=50?'amber':'red'}" style="width:${p.progress}%"></div></div>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs text-muted">${p.progress}% complete</span>
              ${avatarGroup(p.team.slice(0,3))}
            </div>
          </div>
        `).join('')}
        <button class="btn btn-ghost w-full mt-2" data-page="projects">${I.arrowRight} View all projects</button>
      </div>

      <div>
        <div class="section-title">Pending Approvals</div>
        <div class="card">
          ${DATA.approvals.slice(0,3).map(a=>`
            <div class="approval-item" data-approval="${a.id}" style="${a.urgency==='critical'?'border-left:3px solid #ef4444':''}">
              <div class="approval-icon" style="background:${a.urgency==='critical'?'#fef2f2':'#f1f5f9'}">
                ${a.urgency==='critical'?`<span style="color:#ef4444">${I.alertTriangle}</span>`:`<span style="color:#64748b">${I.zap}</span>`}
              </div>
              <div class="approval-body">
                <div class="approval-title">${a.title}</div>
                <div class="approval-meta">
                  <span>${ico(I.folder)}${a.project}</span>
                  <span>${ico(I.clock)}${a.age}</span>
                  ${a.urgency==='critical'?`<span class="badge badge-critical">Critical</span>`:`<span class="badge badge-gray">Normal</span>`}
                </div>
              </div>
              <div class="approval-actions">
                <button class="btn btn-success btn-sm approve-btn" data-id="${a.id}">Approve</button>
                <button class="btn btn-secondary btn-sm reject-btn" data-id="${a.id}">Reject</button>
              </div>
            </div>
          `).join('')}
          <button class="btn btn-ghost w-full mt-3" data-page="approvals">${I.arrowRight} View all approvals</button>
        </div>

        <div class="section-title mt-6">Activity</div>
        <div class="card">
          <div class="activity-feed">
            ${DATA.activity.map(a=>`
              <div class="activity-item">
                <div class="activity-icon" style="background:${a.bg};color:${a.color}">${a.icon}</div>
                <div>
                  <div class="activity-text">${a.text}</div>
                  <div class="activity-time">${a.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;

  document.querySelectorAll('.project-card[data-project]').forEach(el => {
    el.addEventListener('click', () => navigate('project-detail', +el.dataset.project));
  });
  document.querySelectorAll('#content [data-page]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.page));
  });
  document.getElementById('btn-new-project')?.addEventListener('click', launchWizard);
  document.querySelectorAll('.approve-btn').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); handleApprove(+btn.dataset.id); });
  });
  document.querySelectorAll('.reject-btn').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); handleReject(+btn.dataset.id); });
  });
}

function kpiTile(label, value, bg, color, icon, trend, dir) {
  return `<div class="kpi-tile">
    <div class="kpi-head">
      <div>
        <div class="kpi-label">${label}</div>
        <div class="kpi-value" style="color:${color}">${value}</div>
      </div>
      <div class="kpi-icon" style="background:${bg};color:${color}">${icon}</div>
    </div>
    <div class="kpi-trend ${dir}" style="color:${dir==='up'?'#10b981':'#ef4444'}">${dir==='up'?'↑':'↓'} ${trend}</div>
  </div>`;
}

// --- PROJECTS LIST ---
function renderProjects() {
  renderTopbar([{label:'Projects'}]);
  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Projects</div>
        <div class="page-subtitle">${DATA.projects.length} total · ${DATA.projects.filter(p=>p.status==='active').length} active</div>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary">${I.filter} Filter</button>
        <button class="btn btn-primary" id="btn-new-project2">${I.plus} New Project</button>
      </div>
    </div>

    <div class="grid-projects">
      ${DATA.projects.map(p=>`
        <div class="project-card" data-project="${p.id}">
          <div class="flex items-center justify-between">
            <div class="project-card-type">${p.type}</div>
            ${priorityBadge(p.priority)}
          </div>
          <div class="project-card-name">${p.name}</div>
          <div class="project-card-meta">
            ${statusBadge(p.status)}
            ${healthBadge(p.health)}
          </div>
          <div class="progress-bar"><div class="progress-fill ${p.health>=75?'green':p.health>=50?'amber':'red'}" style="width:${p.progress}%"></div></div>
          <div class="project-card-footer">
            <span class="text-xs text-muted">${ico(I.calendar,12)}Due ${p.due}</span>
            ${avatarGroup(p.team.slice(0,3))}
          </div>
          <div class="project-card-footer mt-2">
            <span class="text-xs text-muted">${fmt(p.spent)} / ${fmt(p.budget)}</span>
            <span class="text-xs text-muted">${p.tasks.done}/${p.tasks.total} tasks</span>
          </div>
        </div>
      `).join('')}
      <div class="project-card project-card-new" id="btn-new-project3">
        ${I.plus}
        <span>New Project</span>
      </div>
    </div>`;

  document.querySelectorAll('#content .project-card[data-project]').forEach(el => {
    el.addEventListener('click', () => navigate('project-detail', +el.dataset.project));
  });
  document.getElementById('btn-new-project2')?.addEventListener('click', launchWizard);
  document.getElementById('btn-new-project3')?.addEventListener('click', launchWizard);
}

// --- PROJECT DETAIL ---
function renderProjectDetail() {
  const p = STATE.currentProject;
  if (!p) { navigate('projects'); return; }
  const h = hs(p.health);
  renderTopbar([
    {label:'Projects', page:'projects'},
    {label:p.name}
  ]);

  const tabs = ['overview','tasks','timeline','budget','team','policies','activity'];
  document.getElementById('content').innerHTML = `
    <div class="project-detail-header">
      <div class="flex items-center justify-between">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <div class="project-card-type">${p.type}</div>
            ${statusBadge(p.status)}
            ${priorityBadge(p.priority)}
            ${p.health ? `<span class="badge" style="background:${h.color}18;color:${h.color}">${I.checkCircle} ${p.health} — ${h.label}</span>` : `<span class="badge badge-gray">Health: N/A</span>`}
          </div>
          <div class="project-detail-title">${p.name}</div>
          <div class="project-detail-meta">
            <span>${ico(I.users)}PM: ${p.pm}</span>
            <span>${ico(I.calendar)}Due: ${p.due}</span>
            <span>${ico(I.dollar)}Budget: ${fmtFull(p.budget)}</span>
            <span>${ico(I.clock)}Started: ${p.startDate}</span>
          </div>
        </div>
        <div class="flex gap-3">
          <button class="btn btn-secondary" id="btn-walkthrough">${I.play} Run Walkthrough</button>
          <button class="btn btn-primary">${I.edit} Edit</button>
        </div>
      </div>
      <div class="project-detail-stats">
        <div class="project-detail-stat">
          <span class="project-detail-stat-label">Progress</span>
          <div class="flex items-center gap-3">
            <div class="progress-bar" style="width:140px"><div class="progress-fill ${h.cls.replace('hs-','')}" style="width:${p.progress}%"></div></div>
            <span class="project-detail-stat-value">${p.progress}%</span>
          </div>
        </div>
        <div class="project-detail-stat">
          <span class="project-detail-stat-label">Budget Used</span>
          <span class="project-detail-stat-value">${fmtFull(p.spent)} <span class="text-muted" style="font-size:13px;font-weight:400">/ ${fmtFull(p.budget)}</span></span>
        </div>
        <div class="project-detail-stat">
          <span class="project-detail-stat-label">Tasks</span>
          <span class="project-detail-stat-value">${p.tasks.done}/${p.tasks.total} <span class="text-muted" style="font-size:13px;font-weight:400">done</span>${p.tasks.overdue?`<span style="color:#ef4444;font-size:12px;margin-left:8px">⚠ ${p.tasks.overdue} overdue</span>`:''}</span>
        </div>
        <div class="project-detail-stat">
          <span class="project-detail-stat-label">Risks</span>
          <span class="project-detail-stat-value">${p.risks.filter(r=>r.open).length} open</span>
        </div>
      </div>
    </div>

    <div class="tabs">
      ${tabs.map(t=>`<div class="tab-item ${STATE.currentTab===t?'active':''}" data-tab="${t}">${t.charAt(0).toUpperCase()+t.slice(1)}</div>`).join('')}
    </div>
    <div class="tab-content" id="tab-content"></div>`;

  document.querySelectorAll('.tab-item[data-tab]').forEach(el => {
    el.addEventListener('click', () => {
      STATE.currentTab = el.dataset.tab;
      document.querySelectorAll('.tab-item').forEach(t=>t.classList.remove('active'));
      el.classList.add('active');
      renderTabContent(p);
    });
  });
  document.getElementById('btn-walkthrough')?.addEventListener('click', () => launchWalkthrough(p));
  renderTabContent(p);
}

function renderTabContent(p) {
  const el = document.getElementById('tab-content');
  switch(STATE.currentTab) {
    case 'overview':  el.innerHTML = renderOverviewTab(p); break;
    case 'tasks':     el.innerHTML = renderTasksTab(p); bindTaskActions(p); return;
    case 'timeline':  el.innerHTML = renderTimelineTab(p); break;
    case 'budget':    el.innerHTML = renderBudgetTab(p); break;
    case 'team':      el.innerHTML = renderTeamTab(p); break;
    case 'policies':  el.innerHTML = renderPoliciesTab(p); break;
    case 'activity':  el.innerHTML = renderActivityTab(p); break;
  }
}

function renderOverviewTab(p) {
  return `
    <div class="grid-2">
      <div>
        <div class="card mb-4">
          <div class="card-header"><div class="card-title">Description</div></div>
          <p style="font-size:13px;color:#475569;line-height:1.6">${p.description}</p>
        </div>
        <div class="card mb-4">
          <div class="card-header"><div class="card-title">Upcoming Milestones</div></div>
          ${p.milestones.length ? p.milestones.map(m=>`
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div style="width:10px;height:10px;background:${m.status==='done'?'#10b981':m.status==='active'?'#6366f1':'#cbd5e1'};border-radius:50%"></div>
                <span style="font-size:13px;font-weight:500">${m.name}</span>
              </div>
              <span class="text-xs text-muted">${m.date}</span>
            </div>
          `).join('') : '<p class="text-muted text-sm">No milestones defined.</p>'}
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Open Risks</div></div>
          ${p.risks.filter(r=>r.open).length ? p.risks.filter(r=>r.open).map(r=>`
            <div class="risk-row">
              <div class="risk-severity">${priorityBadge(r.severity)}</div>
              <div style="flex:1;font-size:13px">${r.desc}</div>
              <div class="text-xs text-muted">${r.owner}</div>
            </div>
          `).join('') : '<p class="text-muted text-sm">No open risks.</p>'}
        </div>
      </div>
      <div>
        <div class="card mb-4">
          <div class="card-header"><div class="card-title">Health Score</div></div>
          <div style="text-align:center;padding:16px 0">
            ${p.health ? `
              <div style="font-size:56px;font-weight:800;color:${hs(p.health).color};line-height:1">${p.health}</div>
              <div style="font-size:14px;color:${hs(p.health).color};font-weight:600;margin-top:6px">${hs(p.health).label}</div>
            ` : `<div style="font-size:24px;color:#94a3b8">N/A</div><div class="text-xs text-muted mt-2">Add milestones and tasks to see score</div>`}
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px">
            ${[['Tasks','S_task',p.tasks.total?Math.round(p.tasks.done/p.tasks.total*100):0],['Milestones','S_ms',p.milestones.length?Math.round(p.milestones.filter(m=>m.status==='done').length/p.milestones.length*100):null],['Budget','S_budget',p.budget?Math.round((1-Math.max(0,(p.spent/p.budget-0.8)/0.25))*100):null],['Risk','S_risk',p.risks.length?Math.max(0,100-p.risks.filter(r=>r.open&&r.severity==='high').length*20):100]].map(([label,,val])=>`
              <div style="background:#f8fafc;border-radius:8px;padding:10px;text-align:center">
                <div style="font-size:18px;font-weight:700;color:${val>=75?'#10b981':val>=50?'#f59e0b':val!==null?'#ef4444':'#94a3b8'}">${val!==null?val:'N/A'}</div>
                <div style="font-size:11px;color:#94a3b8;margin-top:2px">${label}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Team</div></div>
          ${p.team.map(ini=>{
            const m = DATA.team.find(t=>t.initials===ini);
            return m ? `
              <div class="flex items-center gap-3 mb-3">
                ${avatar(m.initials, m.color, 'sm')}
                <div>
                  <div style="font-size:13px;font-weight:500">${m.name}</div>
                  <div class="text-xs text-muted">${m.role}</div>
                </div>
              </div>` : '';
          }).join('')}
        </div>
      </div>
    </div>`;
}

function renderTasksTab(p) {
  const tasks = DATA.tasks[p.id] || [];
  return `
    <div class="flex items-center justify-between mb-4">
      <span class="text-sm text-secondary">${tasks.length} tasks</span>
      <button class="btn btn-primary btn-sm" id="add-task-btn">${I.plus} Add Task</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead><tr>
          <th>Task</th><th>Assignee</th><th>Status</th><th>Priority</th><th>Due Date</th>
        </tr></thead>
        <tbody>
          ${tasks.map(t=>`
            <tr>
              <td class="td-name">${t.name}</td>
              <td><div class="flex items-center gap-2">${avatar(t.assignee,t.assigneeColor,'xs')}<span class="text-sm">${t.assignee}</span></div></td>
              <td><span class="badge ${taskStatusBadge(t.status)}">${t.status.replace('-',' ')}</span></td>
              <td>${priorityBadge(t.priority)}</td>
              <td class="td-muted">${t.due}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
}

function bindTaskActions(p) {
  document.getElementById('add-task-btn')?.addEventListener('click', () => {
    toast('Task creation coming in next build', 'info');
  });
}

function taskStatusBadge(s) {
  return {done:'badge-completed',blocked:'badge-critical','in-progress':'badge-active',review:'badge-pending',todo:'badge-gray'}[s]||'badge-gray';
}

function renderTimelineTab(p) {
  const months = ['Apr','May','Jun','Jul','Aug','Sep'];
  return `
    <div class="timeline-container">
      <div class="timeline-header">${months.map(m=>`<div class="timeline-month">${m}</div>`).join('')}</div>
      ${(DATA.tasks[p.id]||[]).slice(0,5).map((t,i)=>`
        <div class="timeline-row">
          <div class="timeline-row-label">${t.name.length>18?t.name.slice(0,18)+'…':t.name}</div>
          <div class="timeline-row-bar">
            <div class="timeline-bar" style="left:${10+i*8}%;width:${20+Math.random()*30}%;background:${t.status==='done'?'#10b981':t.status==='in-progress'?'#6366f1':'#94a3b8'}">${t.status}</div>
          </div>
        </div>
      `).join('')}
      ${p.milestones.map(m=>`
        <div class="timeline-row">
          <div class="timeline-row-label">${I.calendar} ${m.name}</div>
          <div class="timeline-row-bar">
            <div class="timeline-milestone" style="left:${m.status==='done'?15:m.status==='active'?45:75}%"></div>
          </div>
        </div>
      `).join('')}
    </div>`;
}

function renderBudgetTab(p) {
  const pct = Math.round(p.spent/p.budget*100);
  const cats = [['Engineering',Math.round(p.spent*0.6)],['Design',Math.round(p.spent*0.2)],['Operations',Math.round(p.spent*0.15)],['Contingency',Math.round(p.spent*0.05)]];
  return `
    <div class="grid-3 mb-6">
      ${kpiTile('Total Budget', fmtFull(p.budget), '#eef2ff', '#6366f1', I.dollar, '', 'up')}
      ${kpiTile('Spent', fmtFull(p.spent), pct>80?'#fef2f2':'#ecfdf5', pct>80?'#ef4444':'#10b981', I.chart, `${pct}% of budget`, pct>80?'down':'up')}
      ${kpiTile('Remaining', fmtFull(p.budget-p.spent), '#fffbeb', '#f59e0b', I.dollar, '', 'up')}
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">Budget by Category</div></div>
      ${cats.map(([cat,amt])=>`
        <div class="budget-bar-row">
          <div class="budget-bar-header">
            <span class="budget-bar-label">${cat}</span>
            <span class="budget-bar-amounts">${fmtFull(amt)} / ${fmtFull(Math.round(p.budget*0.4))}</span>
          </div>
          <div class="progress-bar"><div class="progress-fill blue" style="width:${Math.round(amt/p.budget*100)}%"></div></div>
        </div>
      `).join('')}
    </div>`;
}

function renderTeamTab(p) {
  return `
    <div class="table-wrapper">
      <table>
        <thead><tr><th>Member</th><th>Role</th><th>Email</th><th>Workload</th></tr></thead>
        <tbody>
          ${p.team.map(ini=>{
            const m = DATA.team.find(t=>t.initials===ini);
            if(!m) return '';
            const over = m.capacity > 100;
            return `<tr>
              <td><div class="flex items-center gap-2">${avatar(m.initials,m.color,'sm')}<span class="font-semibold">${m.name}</span></div></td>
              <td class="text-secondary">${m.role}</td>
              <td class="text-muted">${m.email}</td>
              <td>
                <div class="workload-bar"><div class="workload-fill ${over?'workload-over':m.capacity>75?'workload-high':'workload-normal'}" style="width:${Math.min(100,m.capacity)}%"></div></div>
                <div class="text-xs text-muted mt-1">${m.capacity}% ${over?'⚠ Over capacity':''}</div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderPoliciesTab(p) {
  const global = DATA.policies.filter(pol=>pol.scope==='global');
  const proj = DATA.policies.filter(pol=>pol.scope==='project'&&pol.projectId===p.id);
  return `
    <div class="flex items-center justify-between mb-4">
      <span class="text-sm text-secondary">${global.length} inherited · ${proj.length} project-specific</span>
      <button class="btn btn-primary btn-sm">${I.plus} Add Policy</button>
    </div>
    ${proj.map(pol=>policyCard(pol)).join('')}
    <div class="section-title mt-4">Inherited (Global)</div>
    ${global.map(pol=>policyCard(pol,true)).join('')}`;
}

function renderActivityTab(p) {
  return `
    <div class="card">
      <div class="activity-feed">
        ${DATA.activity.map(a=>`
          <div class="activity-item">
            <div class="activity-icon" style="background:${a.bg};color:${a.color}">${a.icon}</div>
            <div>
              <div class="activity-text">${a.text}</div>
              <div class="activity-time">${a.time}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
}

// --- APPROVALS ---
function handleApprove(id) {
  const idx = DATA.approvals.findIndex(a=>a.id===id);
  if(idx>-1) {
    const a = DATA.approvals.splice(idx,1)[0];
    DATA.approvalHistory.unshift({...a, outcome:'approved', decidedBy:DATA.user.name, decidedAt:'Just now', note:''});
    renderSidebar();
    toast(`Approved: ${a.title}`, 'success');
    if(STATE.currentPage==='approvals') renderApprovals();
    else if(STATE.currentPage==='dashboard') renderDashboard();
  }
}

function handleReject(id) {
  const idx = DATA.approvals.findIndex(a=>a.id===id);
  if(idx>-1) {
    const a = DATA.approvals.splice(idx,1)[0];
    DATA.approvalHistory.unshift({...a, outcome:'rejected', decidedBy:DATA.user.name, decidedAt:'Just now', note:''});
    renderSidebar();
    toast(`Rejected: ${a.title}`, 'warning');
    if(STATE.currentPage==='approvals') renderApprovals();
    else if(STATE.currentPage==='dashboard') renderDashboard();
  }
}

function renderApprovals() {
  renderTopbar([{label:'Approvals'}]);
  const tabs = ['pending','history'];
  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Approval Queue</div>
        <div class="page-subtitle">${DATA.approvals.length} pending · ${DATA.approvals.filter(a=>a.urgency==='critical').length} critical</div>
      </div>
    </div>
    <div class="tabs mb-5">
      ${tabs.map(t=>`<div class="tab-item ${STATE.currentApprovalTab===t?'active':''}" data-atab="${t}">${t.charAt(0).toUpperCase()+t.slice(1)}${t==='pending'?` (${DATA.approvals.length})`:''}</div>`).join('')}
    </div>
    <div id="approval-content"></div>`;

  document.querySelectorAll('[data-atab]').forEach(el => {
    el.addEventListener('click', () => {
      STATE.currentApprovalTab = el.dataset.atab;
      STATE.selectedApproval = null;
      document.querySelectorAll('[data-atab]').forEach(t=>t.classList.remove('active'));
      el.classList.add('active');
      renderApprovalContent();
    });
  });
  renderApprovalContent();
}

function renderApprovalContent() {
  const el = document.getElementById('approval-content');
  if(STATE.currentApprovalTab==='pending') {
    if(!DATA.approvals.length) {
      el.innerHTML = `<div class="empty-state"><div class="empty-state-icon">✓</div><div class="empty-state-title">All caught up</div><div class="empty-state-desc">No pending approvals. Check back after your next policy cycle.</div></div>`;
      return;
    }
    const sorted = [...DATA.approvals].sort((a,b)=>a.urgency==='critical'?-1:1);
    const sel = STATE.selectedApproval;
    el.innerHTML = `<div style="display:grid;grid-template-columns:${sel?'1fr 1fr':'1fr'};gap:20px">
      <div>
        ${sorted.map(a=>`
          <div class="approval-item ${sel&&sel.id===a.id?'selected':''}" data-aid="${a.id}" style="${a.urgency==='critical'?'border-left:3px solid #ef4444':''}">
            <input type="checkbox" style="margin-top:4px;accent-color:#6366f1">
            <div class="approval-icon" style="background:${a.urgency==='critical'?'#fef2f2':'#f1f5f9'}">
              ${a.urgency==='critical'?`<span style="color:#ef4444">${I.alertTriangle}</span>`:`<span style="color:#64748b">${I.zap}</span>`}
            </div>
            <div class="approval-body">
              <div class="flex items-center gap-2 mb-1">
                ${a.urgency==='critical'?`<span class="badge badge-critical">Critical</span>`:`<span class="badge badge-gray">Normal</span>`}
                <span class="text-xs text-muted">${a.age}</span>
              </div>
              <div class="approval-title">${a.title}</div>
              <div class="approval-meta">
                <span>${ico(I.folder)}${a.project}</span>
                <span>${ico(I.zap)}${a.policy}</span>
              </div>
            </div>
            <div class="approval-actions flex-col gap-2">
              <button class="btn btn-success btn-sm approve-btn" data-id="${a.id}">Approve</button>
              <button class="btn btn-secondary btn-sm reject-btn" data-id="${a.id}">Reject</button>
            </div>
          </div>
        `).join('')}
      </div>
      ${sel ? renderApprovalDetail(sel) : ''}
    </div>`;
    document.querySelectorAll('.approval-item[data-aid]').forEach(el => {
      el.addEventListener('click', e => {
        if(e.target.tagName==='BUTTON'||e.target.closest('button')) return;
        STATE.selectedApproval = DATA.approvals.find(a=>a.id===+el.dataset.aid);
        renderApprovalContent();
      });
    });
    document.querySelectorAll('.approve-btn').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); handleApprove(+btn.dataset.id); });
    });
    document.querySelectorAll('.reject-btn').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); handleReject(+btn.dataset.id); });
    });
  } else {
    el.innerHTML = `
      <div class="table-wrapper">
        <table>
          <thead><tr><th>Item</th><th>Project</th><th>Policy</th><th>Outcome</th><th>Decided by</th><th>When</th></tr></thead>
          <tbody>
            ${DATA.approvalHistory.map(h=>`
              <tr>
                <td class="td-name">${h.title}</td>
                <td class="text-secondary">${h.project}</td>
                <td class="text-muted">${h.policy}</td>
                <td><span class="badge ${h.outcome==='approved'||h.outcome==='approved-modified'?'badge-approved':'badge-rejected'}">${h.outcome==='approved-modified'?'Approved (Modified)':h.outcome.charAt(0).toUpperCase()+h.outcome.slice(1)}</span></td>
                <td class="text-secondary">${h.decidedBy}</td>
                <td class="td-muted">${h.decidedAt}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>`;
  }
}

function renderApprovalDetail(a) {
  return `<div class="approval-detail-panel">
    <div class="flex items-center justify-between mb-4">
      <div class="card-title">Action Detail</div>
      <button class="btn btn-ghost btn-sm" id="close-detail">${I.x}</button>
    </div>
    <div class="approval-context-block">
      <div class="approval-context-row"><span class="approval-context-key">Project</span><span class="approval-context-val">${a.project}</span></div>
      <div class="approval-context-row"><span class="approval-context-key">Policy</span><span class="approval-context-val">${a.policy}</span></div>
      <div class="approval-context-row"><span class="approval-context-key">Action type</span><span class="approval-context-val">${a.action}</span></div>
      <div class="approval-context-row"><span class="approval-context-key">Urgency</span><span class="approval-context-val">${a.urgency==='critical'?'<span class="badge badge-critical">Critical</span>':'<span class="badge badge-gray">Normal</span>'}</span></div>
      <div class="approval-context-row"><span class="approval-context-key">Triggered</span><span class="approval-context-val">${a.age}</span></div>
    </div>
    <p style="font-size:13px;color:#475569;line-height:1.6;margin-bottom:16px">${a.desc}</p>
    ${a.taskTitle ? `
      <div class="form-group mb-4">
        <label class="form-label">Task title <span style="font-size:11px;color:#6366f1;font-weight:400">(editable)</span></label>
        <input class="input" value="${a.taskTitle}">
      </div>
      <div class="form-row mb-4">
        <div class="form-group">
          <label class="form-label">Assignee</label>
          <select class="input select"><option>${a.assignee}</option>${DATA.team.map(t=>`<option>${t.initials}</option>`).join('')}</select>
        </div>
        <div class="form-group">
          <label class="form-label">Due date</label>
          <input class="input" type="date" value="2026-06-23">
        </div>
      </div>` : ''}
    <div class="form-group mb-4">
      <label class="form-label">PM note (optional)</label>
      <textarea class="textarea" placeholder="Add context or instructions…" rows="2"></textarea>
    </div>
    <div class="flex gap-3">
      <button class="btn btn-success flex-1 approve-btn" data-id="${a.id}">Approve</button>
      <button class="btn btn-secondary flex-1 reject-btn" data-id="${a.id}">Reject</button>
    </div>
  </div>`;
}

// --- POLICIES ---
function policyCard(pol, inherited=false) {
  return `<div class="policy-card">
    <div class="policy-card-header">
      <div>
        <div class="policy-card-name">${pol.name} ${inherited?`<span class="badge badge-gray" style="font-size:10px">${I.lock} Inherited</span>`:''}</div>
        <div class="policy-card-meta">
          <span>${ico(I.zap)}${pol.scope==='global'?'Global':pol.scope==='type'?`Type: ${pol.projectType}`:'Project'}</span>
          <span>${ico(I.clock)}Last fired: ${pol.lastFired}</span>
          ${pol.requireApproval?`<span class="badge badge-pending">Requires approval</span>`:''}
        </div>
      </div>
      <div class="flex items-center gap-3">
        <label class="toggle-switch"><input type="checkbox" ${pol.status==='active'?'checked':''}><span class="toggle-slider"></span></label>
        ${!inherited?`<button class="btn btn-ghost btn-sm">${I.edit}</button><button class="btn btn-ghost btn-sm">${I.copy}</button>`:'' }
      </div>
    </div>
    <div class="policy-card-rule"><span style="display:inline-flex;width:14px;height:14px;flex-shrink:0;margin-top:2px">${I.zap}</span><span><strong>IF</strong> ${pol.trigger}${pol.condition&&pol.condition!=='—'?' <strong>AND</strong> '+pol.condition:''} → <strong>THEN</strong> ${pol.action}</span></div>
  </div>`;
}

function renderPolicies() {
  renderTopbar([{label:'Policies'}]);
  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Policies</div>
        <div class="page-subtitle">${DATA.policies.length} policies · ${DATA.policies.filter(p=>p.status==='active').length} active</div>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary">${I.plus} New Policy</button>
      </div>
    </div>
    <div class="section-title">Global Policies</div>
    ${DATA.policies.filter(p=>p.scope==='global').map(p=>policyCard(p)).join('')}
    <div class="section-title mt-6">Project Type Policies</div>
    ${DATA.policies.filter(p=>p.scope==='type').map(p=>policyCard(p)).join('')}
    <div class="section-title mt-6">Project-Specific Policies</div>
    ${DATA.policies.filter(p=>p.scope==='project').map(p=>policyCard(p)).join('')}`;
}

// --- TEAM ---
function renderTeam() {
  renderTopbar([{label:'Team'}]);
  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div><div class="page-title">Team</div><div class="page-subtitle">${DATA.team.length} members</div></div>
      <div class="page-actions"><button class="btn btn-primary">${I.plus} Invite Member</button></div>
    </div>
    <div class="grid-projects">
      ${DATA.team.map(m=>`
        <div class="member-card">
          ${avatar(m.initials, m.color, 'lg')}
          <div class="member-name">${m.name}</div>
          <div class="member-role">${m.role}</div>
          <div class="member-stat">${ico(I.folder)}${m.projects} projects</div>
          <div class="workload-bar w-full">
            <div class="workload-fill ${m.capacity>100?'workload-over':m.capacity>75?'workload-high':'workload-normal'}" style="width:${Math.min(100,m.capacity)}%"></div>
          </div>
          <div class="text-xs text-muted">${m.capacity}% capacity ${m.capacity>100?'⚠':''}</div>
        </div>
      `).join('')}
    </div>`;
}

// --- ANALYTICS ---
function renderAnalytics() {
  renderTopbar([{label:'Analytics'}]);
  const heights = [60,85,45,90,70,55,80,95,65,75,50,88];
  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div><div class="page-title">Analytics</div><div class="page-subtitle">Portfolio overview · June 2026</div></div>
    </div>
    <div class="grid-kpi mb-6">
      ${kpiTile('Avg Health Score', '72', '#eef2ff', '#6366f1', I.chart, '+4 this month', 'up')}
      ${kpiTile('On-Time Milestones', '78%', '#ecfdf5', '#10b981', I.check, 'vs 71% last month', 'up')}
      ${kpiTile('Approval Resolution', '4.2h', '#fffbeb', '#f59e0b', I.clock, 'avg time', 'up')}
      ${kpiTile('Budget Variance', '+6%', '#fef2f2', '#ef4444', I.dollar, 'across portfolio', 'down')}
    </div>
    <div class="grid-2 mb-6">
      <div class="card">
        <div class="card-header"><div class="card-title">Health Score Trend</div></div>
        <div class="bar-chart">
          ${heights.map((h,i)=>`<div class="bar-chart-bar" style="height:${h}%;background:${h>=75?'#10b981':h>=50?'#f59e0b':'#ef4444'}" title="Week ${i+1}: ${h}"></div>`).join('')}
        </div>
        <div class="flex justify-between text-xs text-muted mt-2">
          <span>Jan</span><span>Mar</span><span>May</span><span>Jun</span>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Portfolio Health Grid</div></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${DATA.projects.filter(p=>p.status!=='archived').map(p=>`
            <div style="padding:10px;border-radius:8px;background:${p.health>=75?'#ecfdf5':p.health>=50?'#fffbeb':p.health?'#fef2f2':'#f1f5f9'};border:1px solid ${p.health>=75?'#bbf7d0':p.health>=50?'#fde68a':p.health?'#fecaca':'#e2e8f0'}">
              <div style="font-size:12px;font-weight:600;color:${p.health>=75?'#15803d':p.health>=50?'#d97706':p.health?'#dc2626':'#64748b'}">${p.health||'N/A'}</div>
              <div style="font-size:11px;color:#475569;margin-top:2px">${p.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><div class="card-title">Budget Variance by Project</div></div>
        ${DATA.projects.filter(p=>p.budget).map(p=>{
          const v = Math.round((p.spent/p.budget)*100);
          return `<div class="budget-bar-row">
            <div class="budget-bar-header"><span class="budget-bar-label">${p.name}</span><span class="budget-bar-amounts">${v}%</span></div>
            <div class="progress-bar"><div class="progress-fill ${v>80?'red':v>60?'amber':'green'}" style="width:${v}%"></div></div>
          </div>`;
        }).join('')}
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Task Completion Velocity</div></div>
        <div class="analytics-chart-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg><span>Velocity chart — Phase 2</span></div>
      </div>
    </div>`;
}

// --- WIZARD ---
function launchWizard() {
  STATE.wizardStep = 1;
  STATE.wizardData = { tags: [], team: [], milestones: [], policies: [] };
  const el = document.createElement('div');
  el.id = 'wizard-shell';
  el.className = 'wizard-shell';
  document.body.appendChild(el);
  renderWizard();
}

function closeWizard() {
  document.getElementById('wizard-shell')?.remove();
}

function renderWizard() {
  const steps = [
    { label:'Project Basics', sub:'Name, type, priority' },
    { label:'Team & Stakeholders', sub:'Members & roles' },
    { label:'Timeline & Milestones', sub:'Dates & checkpoints' },
    { label:'Budget & Policies', sub:'Funding & automation' },
    { label:'Review & Launch', sub:'Confirm & go live' }
  ];
  const el = document.getElementById('wizard-shell');
  const pct = Math.round(((STATE.wizardStep-1)/5)*100);
  el.innerHTML = `
    <div class="wizard-topbar">
      <div class="wizard-topbar-title">New Project</div>
      <div class="flex gap-3">
        <button class="btn btn-ghost btn-sm">Save Draft</button>
        <button class="btn btn-ghost btn-sm" id="wizard-close">${I.x} Exit</button>
      </div>
    </div>
    <div class="wizard-body">
      <div class="wizard-sidebar">
        <div class="stepper">
          ${steps.map((s,i)=>`
            <div class="stepper-item ${i+1<STATE.wizardStep?'done':i+1===STATE.wizardStep?'current':''}">
              <div class="stepper-node">${i+1<STATE.wizardStep?I.check:(i+1)}</div>
              <div class="stepper-info">
                <div class="stepper-label">${s.label}</div>
                <div class="stepper-sublabel">${s.sub}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="wizard-progress-bar">
          <div class="progress-fill blue" style="width:${pct}%"></div>
        </div>
        <div class="text-xs text-muted mt-2">${pct}% complete</div>
      </div>
      <div class="wizard-content">
        <div class="wizard-content-inner" id="wizard-step-content"></div>
      </div>
    </div>
    <div class="wizard-footer">
      <div class="wizard-footer-left">${I.info} Step ${STATE.wizardStep} of 5</div>
      <div class="wizard-footer-right">
        ${STATE.wizardStep > 1 ? `<button class="btn btn-secondary" id="wiz-back">${I.chevronLeft} Back</button>` : ''}
        ${STATE.wizardStep < 5
          ? `<button class="btn btn-primary" id="wiz-next">Next ${I.chevronRight}</button>`
          : `<button class="btn btn-success" id="wiz-launch">${I.checkCircle} Launch Project</button>`
        }
      </div>
    </div>`;

  document.getElementById('wizard-close')?.addEventListener('click', closeWizard);
  document.getElementById('wiz-back')?.addEventListener('click', () => { STATE.wizardStep--; renderWizard(); });
  document.getElementById('wiz-next')?.addEventListener('click', () => { STATE.wizardStep++; renderWizard(); });
  document.getElementById('wiz-launch')?.addEventListener('click', () => {
    closeWizard();
    toast('Project launched successfully!', 'success');
  });

  renderWizardStep();
}

function renderWizardStep() {
  const el = document.getElementById('wizard-step-content');
  switch(STATE.wizardStep) {
    case 1: el.innerHTML = wizardStep1(); bindWizardTags(); break;
    case 2: el.innerHTML = wizardStep2(); bindWizardTeam(); break;
    case 3: el.innerHTML = wizardStep3(); bindWizardMilestones(); break;
    case 4: el.innerHTML = wizardStep4(); break;
    case 5: el.innerHTML = wizardStep5(); break;
  }
}

function wizardStep1() {
  return `
    <div class="wizard-step-title">Project Basics</div>
    <div class="wizard-step-desc">Set the foundation — every field here drives how Wired structures your project.</div>
    <div class="form-group mb-4"><label class="form-label">Project name <span>*</span></label><input class="input" id="wiz-name" placeholder="e.g. Q3 Platform Launch" value="${STATE.wizardData.name||''}"></div>
    <div class="form-group mb-4"><label class="form-label">Description</label><textarea class="textarea" id="wiz-desc" placeholder="What is this project delivering?">${STATE.wizardData.desc||''}</textarea></div>
    <div class="form-row mb-4">
      <div class="form-group"><label class="form-label">Project type <span>*</span></label>
        <select class="input select" id="wiz-type">
          <option value="">Select type…</option>
          ${['Engineering','Marketing','Operations','Design','Research'].map(t=>`<option ${STATE.wizardData.type===t?'selected':''}>${t}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label class="form-label">Priority <span>*</span></label>
        <select class="input select" id="wiz-priority">
          <option value="">Select…</option>
          ${['Critical','High','Medium','Low'].map(p=>`<option ${STATE.wizardData.priority===p?'selected':''}>${p}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Tags</label>
      <div class="tags-input-container" id="tags-container">
        ${(STATE.wizardData.tags||[]).map(t=>`<span class="tag-chip">${t}<span class="tag-chip-remove">×</span></span>`).join('')}
        <input style="border:none;outline:none;flex:1;min-width:80px;font-size:13px" placeholder="Add tag…" id="tags-input">
      </div>
    </div>`;
}

function bindWizardTags() {
  const input = document.getElementById('tags-input');
  input?.addEventListener('keydown', e => {
    if(e.key==='Enter'||e.key===',') {
      e.preventDefault();
      const v = input.value.trim();
      if(v) { STATE.wizardData.tags = [...(STATE.wizardData.tags||[]),v]; renderWizardStep(); }
    }
  });
  document.querySelectorAll('.tag-chip-remove').forEach((btn,i) => {
    btn.addEventListener('click', () => { STATE.wizardData.tags.splice(i,1); renderWizardStep(); });
  });
}

function wizardStep2() {
  return `
    <div class="wizard-step-title">Team & Stakeholders</div>
    <div class="wizard-step-desc">Define who's responsible and who needs to be kept in the loop.</div>
    <div class="wizard-step-section">
      <div class="wizard-step-section-title">Project Manager</div>
      <div class="team-member-row">
        ${avatar(DATA.user.initials, DATA.user.color, 'sm')}
        <span style="font-size:13px;font-weight:500;flex:1">${DATA.user.name}</span>
        <span class="badge badge-primary">PM (You)</span>
      </div>
    </div>
    <div class="wizard-step-section">
      <div class="wizard-step-section-title">Team Members</div>
      <div id="team-rows">
        ${(STATE.wizardData.team||[]).map((m,i)=>`
          <div class="team-member-row">
            <input class="input team-name" placeholder="Name" value="${m.name||''}">
            <select class="input select team-role" style="width:140px">
              ${['Engineer','Designer','Analyst','PM','Lead'].map(r=>`<option ${m.role===r?'selected':''}>${r}</option>`).join('')}
            </select>
            <button class="btn btn-ghost btn-sm remove-team" data-i="${i}">${I.x}</button>
          </div>`).join('')}
      </div>
      <button class="btn btn-ghost btn-sm mt-2" id="add-team-btn">${I.plus} Add member</button>
    </div>
    <div class="wizard-step-section">
      <div class="wizard-step-section-title">Stakeholders</div>
      <div class="form-group"><label class="form-label">Executive Sponsor</label><input class="input" placeholder="Sponsor name or email"></div>
    </div>`;
}

function bindWizardTeam() {
  document.getElementById('add-team-btn')?.addEventListener('click', () => {
    STATE.wizardData.team = [...(STATE.wizardData.team||[]), { name:'', role:'Engineer' }];
    renderWizardStep();
  });
  document.querySelectorAll('.remove-team').forEach(btn => {
    btn.addEventListener('click', () => { STATE.wizardData.team.splice(+btn.dataset.i,1); renderWizardStep(); });
  });
}

function wizardStep3() {
  return `
    <div class="wizard-step-title">Timeline & Milestones</div>
    <div class="wizard-step-desc">Set the project timeline and define the key checkpoints that signal progress.</div>
    <div class="form-row mb-6">
      <div class="form-group"><label class="form-label">Start date <span>*</span></label><input class="input" type="date" id="wiz-start" value="${STATE.wizardData.start||'2026-07-01'}"></div>
      <div class="form-group"><label class="form-label">End date <span>*</span></label><input class="input" type="date" id="wiz-end" value="${STATE.wizardData.end||'2026-12-31'}"></div>
    </div>
    <div class="wizard-step-section-title">Milestones</div>
    <div id="milestone-rows">
      ${(STATE.wizardData.milestones||[]).map((m,i)=>`
        <div class="milestone-row">
          <input class="input ms-name" placeholder="Milestone name" value="${m.name||''}">
          <input class="input input-date ms-date" type="date" value="${m.date||''}">
          <select class="input select" style="width:120px">
            <option>Key Milestone</option><option>Checkpoint</option>
          </select>
          <button class="btn btn-ghost btn-sm remove-ms" data-i="${i}">${I.trash}</button>
        </div>`).join('')}
    </div>
    <button class="btn btn-ghost btn-sm mt-2" id="add-ms-btn">${I.plus} Add milestone</button>`;
}

function bindWizardMilestones() {
  document.getElementById('add-ms-btn')?.addEventListener('click', () => {
    STATE.wizardData.milestones = [...(STATE.wizardData.milestones||[]), { name:'', date:'' }];
    renderWizardStep();
  });
  document.querySelectorAll('.remove-ms').forEach(btn => {
    btn.addEventListener('click', () => { STATE.wizardData.milestones.splice(+btn.dataset.i,1); renderWizardStep(); });
  });
}

function wizardStep4() {
  const templates = DATA.policies.filter(p=>p.scope==='global');
  return `
    <div class="wizard-step-title">Budget & Policies</div>
    <div class="wizard-step-desc">Set funding limits and choose which automation policies apply to this project.</div>
    <div class="wizard-step-section">
      <div class="wizard-step-section-title">Budget</div>
      <div class="form-row mb-4">
        <div class="form-group"><label class="form-label">Total Budget ($) <span>*</span></label><input class="input" type="number" placeholder="e.g. 100000"></div>
        <div class="form-group"><label class="form-label">Contingency (%)</label><input class="input" type="number" placeholder="10"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Engineering</label><input class="input" type="number" placeholder="$0"></div>
        <div class="form-group"><label class="form-label">Design</label><input class="input" type="number" placeholder="$0"></div>
      </div>
    </div>
    <div class="wizard-step-section">
      <div class="wizard-step-section-title">Automation Policies</div>
      <div class="form-hint mb-4">These global policies already apply. Add project-specific rules below.</div>
      ${templates.map(p=>`
        <div class="policy-option">
          <input type="checkbox" checked>
          <div>
            <div class="policy-option-title">${p.name}</div>
            <div class="policy-option-desc">${p.trigger} → ${p.action}</div>
          </div>
        </div>`).join('')}
    </div>`;
}

function wizardStep5() {
  const d = STATE.wizardData;
  return `
    <div class="wizard-step-title">Review & Launch</div>
    <div class="wizard-step-desc">Confirm everything looks right before making this project live.</div>
    <div class="review-section">
      <div class="review-section-title">Project Basics</div>
      <div class="review-row"><span class="review-key">Name</span><span class="review-val">${d.name||'—'}</span></div>
      <div class="review-row"><span class="review-key">Type</span><span class="review-val">${d.type||'—'}</span></div>
      <div class="review-row"><span class="review-key">Priority</span><span class="review-val">${d.priority?priorityBadge(d.priority.toLowerCase()):'—'}</span></div>
      <div class="review-row"><span class="review-key">Tags</span><span class="review-val">${d.tags?.length?d.tags.map(t=>`<span class="badge badge-primary">${t}</span>`).join(' '):'—'}</span></div>
    </div>
    <div class="review-section">
      <div class="review-section-title">Team</div>
      <div class="review-row"><span class="review-key">PM</span><span class="review-val">${DATA.user.name}</span></div>
      <div class="review-row"><span class="review-key">Members</span><span class="review-val">${d.team?.length?d.team.map(m=>m.name||'Unnamed').join(', '):'None added'}</span></div>
    </div>
    <div class="review-section">
      <div class="review-section-title">Timeline</div>
      <div class="review-row"><span class="review-key">Start</span><span class="review-val">${d.start||'—'}</span></div>
      <div class="review-row"><span class="review-key">End</span><span class="review-val">${d.end||'—'}</span></div>
      <div class="review-row"><span class="review-key">Milestones</span><span class="review-val">${d.milestones?.length||0} defined</span></div>
    </div>
    <div class="review-section">
      <div class="review-section-title">Validation</div>
      ${['Project name set','Project type selected','Start & end dates set','At least one team member'].map((item,i)=>`
        <div class="flex items-center gap-3 mb-2">
          <span style="color:${[d.name,d.type,d.start&&d.end,d.team?.length][i]?'#10b981':'#94a3b8'}">${[d.name,d.type,d.start&&d.end,d.team?.length][i]?I.checkCircle:I.info}</span>
          <span style="font-size:13px;color:${[d.name,d.type,d.start&&d.end,d.team?.length][i]?'#0f172a':'#94a3b8'}">${item}</span>
        </div>`).join('')}
    </div>`;
}

// --- WALKTHROUGH ---
function launchWalkthrough(project) {
  STATE.walkthroughStep = 1;
  STATE.walkthroughProject = project;
  const steps = ['Status Update','Risk Review','Team Check','Milestone Review','Budget Review','Action Items'];
  const el = document.createElement('div');
  el.id = 'wt-overlay';
  el.className = 'walkthrough-backdrop';
  document.body.appendChild(el);
  renderWalkthrough(steps);
}

function closeWalkthrough() {
  document.getElementById('wt-overlay')?.remove();
}

function renderWalkthrough(steps) {
  const s = STATE.walkthroughStep;
  const p = STATE.walkthroughProject;
  const el = document.getElementById('wt-overlay');
  el.innerHTML = `
    <div class="walkthrough-card">
      <div class="walkthrough-header">
        <div class="walkthrough-label">Project Walkthrough · ${p.name} · Step ${s} of ${steps.length}</div>
        <div class="walkthrough-question">${steps[s-1]}</div>
        <div class="wt-progress mt-4" style="padding:0">
          ${steps.map((_,i)=>`<div class="wt-step-dot ${i+1<s?'done':i+1===s?'current':''}"></div>`).join('')}
        </div>
      </div>
      <div class="walkthrough-body">${renderWalkthroughStep(s, p)}</div>
      <div class="walkthrough-footer">
        <span class="walkthrough-step-counter">${s} / ${steps.length}</span>
        <div class="flex gap-3">
          <button class="btn btn-ghost btn-sm" id="wt-skip">Skip</button>
          ${s > 1 ? `<button class="btn btn-secondary btn-sm" id="wt-back">${I.chevronLeft} Back</button>` : ''}
          ${s < steps.length
            ? `<button class="btn btn-primary btn-sm" id="wt-next">Next ${I.chevronRight}</button>`
            : `<button class="btn btn-success btn-sm" id="wt-complete">${I.checkCircle} Complete</button>`
          }
        </div>
      </div>
    </div>`;

  document.getElementById('wt-skip')?.addEventListener('click', () => {
    if(s < steps.length) { STATE.walkthroughStep++; renderWalkthrough(steps); }
    else { closeWalkthrough(); toast('Walkthrough skipped', 'info'); }
  });
  document.getElementById('wt-back')?.addEventListener('click', () => { STATE.walkthroughStep--; renderWalkthrough(steps); });
  document.getElementById('wt-next')?.addEventListener('click', () => { STATE.walkthroughStep++; renderWalkthrough(steps); });
  document.getElementById('wt-complete')?.addEventListener('click', () => {
    closeWalkthrough();
    toast('Walkthrough complete — health score updated', 'success');
  });
}

function renderWalkthroughStep(s, p) {
  switch(s) {
    case 1: return `
      <p class="text-secondary text-sm mb-4">Current computed health: <strong style="color:${hs(p.health).color}">${p.health||'N/A'} — ${p.health?hs(p.health).label:'Insufficient data'}</strong></p>
      <div class="form-group mb-4"><label class="form-label">Overall status <span>*</span></label>
        ${['On Track','At Risk','Off Track'].map(v=>`<div class="check-row mb-2"><input type="radio" name="wt-status" value="${v}"><div><div class="check-row-label">${v}</div></div></div>`).join('')}
      </div>
      <div class="form-group mb-4"><label class="form-label">Status notes</label><textarea class="textarea" placeholder="Any context for the team…"></textarea></div>`;
    case 2: return `
      <p class="text-secondary text-sm mb-4">${p.risks.filter(r=>r.open).length} open risk(s) on this project.</p>
      ${p.risks.filter(r=>r.open).map(r=>`
        <div class="flex items-center gap-3 mb-2 p-3" style="background:#fafafa;border-radius:8px;border:1px solid #e2e8f0">
          ${priorityBadge(r.severity)}<span style="font-size:13px;flex:1">${r.desc}</span>
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:#64748b"><input type="checkbox"> Resolved</label>
        </div>`).join('')}
      <div class="form-group mt-4"><label class="form-label">Are there new risks?</label>
        <div class="check-row mb-2"><input type="radio" name="wt-risk" value="no" checked><div class="check-row-label">No new risks</div></div>
        <div class="check-row"><input type="radio" name="wt-risk" value="yes"><div class="check-row-label">Yes — add below</div></div>
      </div>`;
    case 3: return `
      <div class="form-group mb-4"><label class="form-label">Is any team member over capacity?</label>
        <div class="check-row mb-2"><input type="radio" name="wt-cap" value="no" checked><div class="check-row-label">No — all on track</div></div>
        <div class="check-row"><input type="radio" name="wt-cap" value="yes"><div class="check-row-label">Yes — flag members</div></div>
      </div>
      <div class="form-group mb-4"><label class="form-label">Are there any blockers?</label>
        <div class="check-row mb-2"><input type="radio" name="wt-block" value="no" checked><div class="check-row-label">No blockers</div></div>
        <div class="check-row"><input type="radio" name="wt-block" value="yes"><div class="check-row-label">Yes — describe below</div></div>
      </div>
      <div class="form-group"><label class="form-label">Team notes</label><textarea class="textarea" placeholder="Any capacity or team health notes…"></textarea></div>`;
    case 4: return `
      <p class="text-secondary text-sm mb-4">${p.milestones.length} milestone(s) defined.</p>
      ${p.milestones.map(m=>`
        <div class="flex items-center gap-3 mb-3 p-3" style="background:#fafafa;border-radius:8px;border:1px solid #e2e8f0">
          <div style="flex:1"><div style="font-size:13px;font-weight:500">${m.name}</div><div class="text-xs text-muted">${m.date}</div></div>
          ${statusBadge(m.status==='done'?'completed':m.status==='active'?'active':'planning')}
          <input type="date" class="input" style="width:140px" value="${m.date}">
        </div>`).join('')}
      <div class="form-group mt-3"><label class="form-label">Milestone notes</label><textarea class="textarea" placeholder="Any schedule changes to note…"></textarea></div>`;
    case 5: return `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px">
        <div style="padding:12px;border-radius:8px;background:#f1f5f9;text-align:center">
          <div style="font-size:18px;font-weight:700">${fmtFull(p.budget)}</div>
          <div class="text-xs text-muted">Total Budget</div>
        </div>
        <div style="padding:12px;border-radius:8px;background:#f1f5f9;text-align:center">
          <div style="font-size:18px;font-weight:700">${fmtFull(p.spent)}</div>
          <div class="text-xs text-muted">Spent</div>
        </div>
        <div style="padding:12px;border-radius:8px;background:#f1f5f9;text-align:center">
          <div style="font-size:18px;font-weight:700">${Math.round(p.spent/p.budget*100)}%</div>
          <div class="text-xs text-muted">Used</div>
        </div>
      </div>
      <div class="form-group mb-4"><label class="form-label">Is spend on track?</label>
        ${['Yes — on track','Concern — slight overrun','Off Track — needs action'].map(v=>`<div class="check-row mb-2"><input type="radio" name="wt-budget"><div class="check-row-label">${v}</div></div>`).join('')}
      </div>
      <div class="form-group"><label class="form-label">Forecasted total spend</label><input class="input" type="number" value="${p.spent}"></div>`;
    case 6: return `
      <p class="text-secondary text-sm mb-4">Suggested action items based on your walkthrough responses. Check those to create as tasks.</p>
      ${[
        { title:'Schedule recovery planning meeting', assignee: p.pm, checked: true },
        { title:`Review workload for Taylor Kim`, assignee:'TK', checked: true },
        { title:'Communicate timeline change to stakeholders', assignee: p.pm, checked: false }
      ].map(a=>`
        <div class="p-3 mb-2" style="border:1px solid #e2e8f0;border-radius:8px;background:#fafafa">
          <div class="flex items-center gap-3">
            <input type="checkbox" ${a.checked?'checked':''} style="accent-color:#6366f1">
            <div style="flex:1">
              <input class="input" style="font-size:13px;font-weight:500;border:none;background:transparent;padding:0;box-shadow:none" value="${a.title}">
            </div>
          </div>
          <div class="flex gap-3 mt-2">
            <select class="input select btn-sm" style="width:auto"><option>${a.assignee}</option></select>
            <input class="input btn-sm" type="date" value="2026-06-23" style="width:140px">
          </div>
        </div>`).join('')}
      <button class="btn btn-ghost btn-sm mt-2">${I.plus} Add custom task</button>`;
  }
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  render();
});
