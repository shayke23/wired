// ============================================================
// WIRED — UX Prototype | app.js Part 1: Data + Core + Dashboard
// ============================================================

// --- MOCK DATA ---
const DATA = {
  user: {
    name: 'Alex Morgan', role: 'Project Manager', initials: 'AM', color: '#6366f1',
    email: 'alex.morgan@wired.io', phone: '+1 (415) 555-0142',
    title: 'Senior Project Manager', department: 'Delivery', location: 'San Francisco, CA',
    timezone: 'America/Los_Angeles', bio: 'Driving cross-functional delivery for platform & growth initiatives.',
    twoFactor: true, lastPasswordChange: '2026-04-12',
    sessions: [
      { id: 1, device: 'MacBook Pro · Chrome', location: 'San Francisco, CA', current: true,  lastActive: 'Active now' },
      { id: 2, device: 'iPhone 15 · Wired iOS',  location: 'San Francisco, CA', current: false, lastActive: '2 hours ago' },
      { id: 3, device: 'Windows · Edge',          location: 'New York, NY',      current: false, lastActive: 'Jun 24, 2026' }
    ],
    settings: {
      theme: 'light', accentColor: '#6366f1', density: 'comfortable', sidebar: 'expanded',
      language: 'en', dateFormat: 'MMM D, YYYY', timeFormat: '12h', weekStart: 'monday',
      landingPage: 'dashboard', defaultProjectView: 'overview',
      notifyEmail: true, notifyPush: true, notifyDigest: 'daily',
      notifyApprovals: true, notifyMentions: true, notifyAssignments: true,
      notifyStatusChanges: false, notifyAutomations: true, quietHours: false,
      autoAssign: true, confirmDestructive: true, showCompletedTasks: false,
      showNotes: true,
      wireMode: 'semi-auto',
      tableBorderWidth: '1', tableBorderColor: '#334155'
    }
  },

  notes: [
    { id: 1, title: 'Stakeholder sync — key takeaways', body: 'Sponsor wants weekly status on Alpha Launch. Flag the third-party API risk early. Budget review moved to first week of August.', color: '#fef3c7', pinned: true, updated: '2026-06-26' },
    { id: 2, title: 'Ideas: automation policies', body: 'Add a policy for stale tasks (no update in 5 days). Consider auto-escalating critical issues that stay open past 48h. Draft a "budget freeze" guard for on-hold projects.', color: '#dbeafe', pinned: false, updated: '2026-06-24' },
    { id: 3, title: 'Brand Refresh — open questions', body: 'Confirm logo direction with JD. Who signs off on the final palette? Need print specs from the vendor before asset production.', color: '#dcfce7', pinned: false, updated: '2026-06-22' },
    { id: 4, title: 'Personal todo', body: '· Review Q3 capacity plan\n· Prep retro for Compliance Audit\n· Follow up on Partner Portal budget', color: '#f3e8ff', pinned: false, updated: '2026-06-20' }
  ],

  projects: [
    { id: 1, name: 'Alpha Launch', type: 'Engineering', workflowId: 1, status: 'active', priority: 'high', health: 82, progress: 67, pm: 'AM', pmColor: '#6366f1', due: '2026-08-15', budget: 120000, spent: 74000, tasks: { total: 34, done: 23, overdue: 2 }, team: ['AM','JD','SR','TK'], description: 'Full platform launch for Q3 including API, frontend and DevOps pipeline.', startDate: '2026-04-01', milestones: [ { id:1, name:'API complete', date:'2026-06-30', status:'done' }, { id:2, name:'Beta release', date:'2026-07-20', status:'active' }, { id:3, name:'Launch', date:'2026-08-15', status:'upcoming' } ], risks: [ { id:1, desc:'Third-party API dependency delay', severity:'high', owner:'JD', open:true }, { id:2, desc:'Performance under load', severity:'medium', owner:'SR', open:true } ] },
    { id: 2, name: 'Brand Refresh', type: 'Marketing', workflowId: 2, status: 'at-risk', priority: 'medium', health: 54, progress: 41, pm: 'JD', pmColor: '#f59e0b', due: '2026-07-30', budget: 45000, spent: 28000, tasks: { total: 18, done: 7, overdue: 4 }, team: ['JD','LM'], description: 'Visual identity overhaul across all digital and print touchpoints.', startDate: '2026-05-01', milestones: [ { id:4, name:'Moodboard approved', date:'2026-05-31', status:'done' }, { id:5, name:'Logo final', date:'2026-07-01', status:'active' } ], risks: [ { id:3, desc:'Stakeholder alignment on direction', severity:'high', owner:'JD', open:true } ] },
    { id: 3, name: 'Data Platform', type: 'Engineering', workflowId: 1, status: 'planning', priority: 'critical', health: null, progress: 8, pm: 'SR', pmColor: '#10b981', due: '2026-12-01', budget: 200000, spent: 5000, tasks: { total: 6, done: 0, overdue: 0 }, team: ['SR','TK','AM'], description: 'Unified data warehouse and analytics platform migration.', startDate: '2026-06-15', milestones: [], risks: [] },
    { id: 4, name: 'Mobile App v2', type: 'Engineering', workflowId: 1, status: 'active', priority: 'high', health: 76, progress: 55, pm: 'TK', pmColor: '#8b5cf6', due: '2026-09-30', budget: 95000, spent: 48000, tasks: { total: 41, done: 22, overdue: 1 }, team: ['TK','AM','JD'], description: 'Major version update with redesigned UI and offline mode.', startDate: '2026-03-15', milestones: [ { id:6, name:'UX design done', date:'2026-05-15', status:'done' }, { id:7, name:'Beta build', date:'2026-08-01', status:'active' }, { id:8, name:'App store release', date:'2026-09-30', status:'upcoming' } ], risks: [] },
    { id: 5, name: 'Compliance Audit', type: 'Operations', workflowId: 3, status: 'completed', priority: 'critical', health: 91, progress: 100, pm: 'LM', pmColor: '#06b6d4', due: '2026-05-31', budget: 30000, spent: 28500, tasks: { total: 22, done: 22, overdue: 0 }, team: ['LM','AM'], description: 'Annual SOC2 compliance audit and remediation.', startDate: '2026-03-01', milestones: [], risks: [] },
    { id: 6, name: 'Partner Portal', type: 'Engineering', workflowId: null, status: 'on-hold', priority: 'low', health: 38, progress: 22, pm: 'JD', pmColor: '#f59e0b', due: '2026-11-15', budget: 60000, spent: 14000, tasks: { total: 28, done: 6, overdue: 5 }, team: ['JD','SR'], description: 'Self-service portal for external partners.', startDate: '2026-02-01', milestones: [], risks: [ { id:4, desc:'Budget freeze pending executive review', severity:'high', owner:'JD', open:true } ] }
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
    { id: 1, initials: 'AM', name: 'Alex Morgan', role: 'Project Manager', email: 'alex@wired.io', projects: 3, capacity: 80, color: '#6366f1', team: 'Core', department: 'Product' },
    { id: 2, initials: 'JD', name: 'Jordan Davis', role: 'Designer', email: 'jordan@wired.io', projects: 2, capacity: 95, color: '#f59e0b', team: 'Brand', department: 'Design' },
    { id: 3, initials: 'SR', name: 'Sam Rivera', role: 'Engineer', email: 'sam@wired.io', projects: 2, capacity: 60, color: '#10b981', team: 'Platform', department: 'Engineering' },
    { id: 4, initials: 'TK', name: 'Taylor Kim', role: 'Tech Lead', email: 'taylor@wired.io', projects: 2, capacity: 110, color: '#8b5cf6', team: 'Infrastructure', department: 'Engineering' },
    { id: 5, initials: 'LM', name: 'Lee Mitchell', role: 'Analyst', email: 'lee@wired.io', projects: 1, capacity: 45, color: '#06b6d4', team: 'Analytics', department: 'Operations' },
    { id: 6, initials: 'DC', name: 'Devon Cohen', role: 'QA Engineer', email: 'devon.cohen@wired.io', projects: 2, capacity: 118, color: '#ec4899', team: 'Infrastructure', department: 'Data' },
    { id: 7, initials: 'LI', name: 'Lane Ivanov', role: 'DevOps Engineer', email: 'lane.ivanov@wired.io', projects: 3, capacity: 51, color: '#14b8a6', team: 'Revenue', department: 'Quality' },
    { id: 8, initials: 'CT', name: 'Casey Tran', role: 'UX Researcher', email: 'casey.tran@wired.io', projects: 4, capacity: 64, color: '#f97316', team: 'Horizon', department: 'Security' },
    { id: 9, initials: 'SE', name: 'Skyler Eriksen', role: 'Data Scientist', email: 'skyler.eriksen@wired.io', projects: 5, capacity: 77, color: '#3b82f6', team: 'Pulse', department: 'Customer Success' },
    { id: 10, initials: 'DJ', name: 'Dakota Johnson', role: 'Scrum Master', email: 'dakota.johnson@wired.io', projects: 1, capacity: 90, color: '#84cc16', team: 'Core', department: 'Engineering' },
    { id: 11, initials: 'IC', name: 'Indra Cruz', role: 'Solutions Architect', email: 'indra.cruz@wired.io', projects: 2, capacity: 103, color: '#a855f7', team: 'Analytics', department: 'Design' },
    { id: 12, initials: 'PN', name: 'Phoenix Novak', role: 'Frontend Engineer', email: 'phoenix.novak@wired.io', projects: 3, capacity: 116, color: '#0ea5e9', team: 'Foundations', department: 'Product' },
    { id: 13, initials: 'BY', name: 'Bellamy Yamada', role: 'Backend Engineer', email: 'bellamy.yamada@wired.io', projects: 4, capacity: 49, color: '#eab308', team: 'Nebula', department: 'Operations' },
    { id: 14, initials: 'KM', name: 'Kit Mitchell', role: 'Marketing Manager', email: 'kit.mitchell@wired.io', projects: 5, capacity: 62, color: '#6366f1', team: 'Platform', department: 'Marketing' },
    { id: 15, initials: 'MS', name: 'Morgan Singh', role: 'Account Executive', email: 'morgan.singh@wired.io', projects: 1, capacity: 75, color: '#f59e0b', team: 'Mobile', department: 'Sales' },
    { id: 16, initials: 'CH', name: 'Cameron Hughes', role: 'Support Lead', email: 'cameron.hughes@wired.io', projects: 2, capacity: 88, color: '#10b981', team: 'Brand', department: 'Data' },
    { id: 17, initials: 'FS', name: 'Finley Sato', role: 'Security Engineer', email: 'finley.sato@wired.io', projects: 3, capacity: 101, color: '#8b5cf6', team: 'Velocity', department: 'Quality' },
    { id: 18, initials: 'HD', name: 'Harper Dubois', role: 'Project Manager', email: 'harper.dubois@wired.io', projects: 4, capacity: 114, color: '#06b6d4', team: 'Atlas', department: 'Security' },
    { id: 19, initials: 'OS', name: 'Oakley Smith', role: 'Designer', email: 'oakley.smith@wired.io', projects: 5, capacity: 47, color: '#ef4444', team: 'Growth', department: 'Customer Success' },
    { id: 20, initials: 'AB', name: 'Ari Bauer', role: 'Engineer', email: 'ari.bauer@wired.io', projects: 1, capacity: 60, color: '#ec4899', team: 'Infrastructure', department: 'Engineering' },
    { id: 21, initials: 'JM', name: 'Jess Mehta', role: 'Tech Lead', email: 'jess.mehta@wired.io', projects: 2, capacity: 73, color: '#14b8a6', team: 'Revenue', department: 'Design' },
    { id: 22, initials: 'LX', name: 'Lee Xu', role: 'Analyst', email: 'lee.xu@wired.io', projects: 3, capacity: 86, color: '#f97316', team: 'Horizon', department: 'Product' },
    { id: 23, initials: 'DK', name: 'Drew Kim', role: 'Product Manager', email: 'drew.kim@wired.io', projects: 4, capacity: 99, color: '#3b82f6', team: 'Pulse', department: 'Operations' },
    { id: 24, initials: 'EK', name: 'Emerson Khan', role: 'QA Engineer', email: 'emerson.khan@wired.io', projects: 5, capacity: 112, color: '#84cc16', team: 'Core', department: 'Marketing' },
    { id: 25, initials: 'FG', name: 'Frankie Gomez', role: 'DevOps Engineer', email: 'frankie.gomez@wired.io', projects: 1, capacity: 45, color: '#a855f7', team: 'Analytics', department: 'Sales' },
    { id: 26, initials: 'NR', name: 'Noa Rossi', role: 'UX Researcher', email: 'noa.rossi@wired.io', projects: 2, capacity: 58, color: '#0ea5e9', team: 'Foundations', department: 'Data' },
    { id: 27, initials: 'ZC', name: 'Zion Conti', role: 'Data Scientist', email: 'zion.conti@wired.io', projects: 3, capacity: 71, color: '#eab308', team: 'Nebula', department: 'Quality' },
    { id: 28, initials: 'IG', name: 'Ira Garcia', role: 'Scrum Master', email: 'ira.garcia@wired.io', projects: 4, capacity: 84, color: '#6366f1', team: 'Platform', department: 'Security' },
    { id: 29, initials: 'TR', name: 'Taylor Reed', role: 'Solutions Architect', email: 'taylor.reed@wired.io', projects: 5, capacity: 97, color: '#f59e0b', team: 'Mobile', department: 'Customer Success' },
    { id: 30, initials: 'QL', name: 'Quinn Lima', role: 'Frontend Engineer', email: 'quinn.lima@wired.io', projects: 1, capacity: 110, color: '#10b981', team: 'Brand', department: 'Engineering' },
    { id: 31, initials: 'RW', name: 'Rowan Wang', role: 'Backend Engineer', email: 'rowan.wang@wired.io', projects: 2, capacity: 43, color: '#8b5cf6', team: 'Velocity', department: 'Design' },
    { id: 32, initials: 'ER', name: 'Elliot Rivera', role: 'Marketing Manager', email: 'elliot.rivera@wired.io', projects: 3, capacity: 56, color: '#06b6d4', team: 'Atlas', department: 'Product' },
    { id: 33, initials: 'MW', name: 'Micah Wilson', role: 'Account Executive', email: 'micah.wilson@wired.io', projects: 4, capacity: 69, color: '#ef4444', team: 'Growth', department: 'Operations' },
    { id: 34, initials: 'WF', name: 'Wren Foster', role: 'Support Lead', email: 'wren.foster@wired.io', projects: 5, capacity: 82, color: '#ec4899', team: 'Infrastructure', department: 'Marketing' },
    { id: 35, initials: 'HQ', name: 'Hollis Quintero', role: 'Security Engineer', email: 'hollis.quintero@wired.io', projects: 1, capacity: 95, color: '#14b8a6', team: 'Revenue', department: 'Sales' },
    { id: 36, initials: 'SB', name: 'Sam Berg', role: 'Project Manager', email: 'sam.berg@wired.io', projects: 2, capacity: 108, color: '#f97316', team: 'Horizon', department: 'Data' },
    { id: 37, initials: 'AC', name: 'Avery Chen', role: 'Designer', email: 'avery.chen@wired.io', projects: 3, capacity: 41, color: '#3b82f6', team: 'Pulse', department: 'Quality' },
    { id: 38, initials: 'HA', name: 'Hayden Adams', role: 'Engineer', email: 'hayden.adams@wired.io', projects: 4, capacity: 54, color: '#84cc16', team: 'Core', department: 'Security' },
    { id: 39, initials: 'CK', name: 'Charlie Klein', role: 'Tech Lead', email: 'charlie.klein@wired.io', projects: 5, capacity: 67, color: '#a855f7', team: 'Analytics', department: 'Customer Success' },
    { id: 40, initials: 'LV', name: 'Lennon Vargas', role: 'Analyst', email: 'lennon.vargas@wired.io', projects: 1, capacity: 80, color: '#0ea5e9', team: 'Foundations', department: 'Engineering' },
    { id: 41, initials: 'TD', name: 'Tatum Davis', role: 'Product Manager', email: 'tatum.davis@wired.io', projects: 2, capacity: 93, color: '#eab308', team: 'Nebula', department: 'Design' },
    { id: 42, initials: 'GB', name: 'Gray Brown', role: 'QA Engineer', email: 'gray.brown@wired.io', projects: 3, capacity: 106, color: '#6366f1', team: 'Platform', department: 'Product' },
    { id: 43, initials: 'JE', name: 'Jordan Evans', role: 'DevOps Engineer', email: 'jordan.evans@wired.io', projects: 4, capacity: 119, color: '#f59e0b', team: 'Mobile', department: 'Operations' },
    { id: 44, initials: 'JP', name: 'Jamie Park', role: 'UX Researcher', email: 'jamie.park@wired.io', projects: 5, capacity: 52, color: '#10b981', team: 'Brand', department: 'Marketing' },
    { id: 45, initials: 'PA', name: 'Parker Abbas', role: 'Data Scientist', email: 'parker.abbas@wired.io', projects: 1, capacity: 65, color: '#8b5cf6', team: 'Velocity', department: 'Sales' },
    { id: 46, initials: 'BP', name: 'Blake Patel', role: 'Scrum Master', email: 'blake.patel@wired.io', projects: 2, capacity: 78, color: '#06b6d4', team: 'Atlas', department: 'Data' },
    { id: 47, initials: 'KL', name: 'Kai Levi', role: 'Solutions Architect', email: 'kai.levi@wired.io', projects: 3, capacity: 91, color: '#ef4444', team: 'Growth', department: 'Quality' },
    { id: 48, initials: 'SJ', name: 'Shiloh Jones', role: 'Frontend Engineer', email: 'shiloh.jones@wired.io', projects: 4, capacity: 104, color: '#ec4899', team: 'Infrastructure', department: 'Security' },
    { id: 49, initials: 'EU', name: 'Eden Ueda', role: 'Backend Engineer', email: 'eden.ueda@wired.io', projects: 5, capacity: 117, color: '#14b8a6', team: 'Revenue', department: 'Customer Success' },
    { id: 50, initials: 'AD', name: 'Alex Davis', role: 'Marketing Manager', email: 'alex.davis@wired.io', projects: 1, capacity: 50, color: '#f97316', team: 'Horizon', department: 'Engineering' }
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

  workflows: [
    {
      id: 1, name: 'Software Delivery', description: 'Standard engineering project lifecycle from discovery to production.', projectType: 'Engineering', color: '#6366f1',
      phases: [
        { id: 1, name: 'Discovery', color: '#6366f1', actions: [
          { id: 1, name: 'Define project scope', type: 'document', required: true, desc: 'Document goals, constraints, and success criteria' },
          { id: 2, name: 'Stakeholder interviews', type: 'meeting', required: true, desc: 'Align with all key stakeholders on expectations' },
          { id: 3, name: 'Technical feasibility', type: 'review', required: false, desc: 'Assess technical risks and dependencies' }
        ]},
        { id: 2, name: 'Design', color: '#8b5cf6', actions: [
          { id: 4, name: 'Architecture design', type: 'document', required: true, desc: 'System design document and data model' },
          { id: 5, name: 'UX wireframes', type: 'task', required: true, desc: 'Low-fidelity wireframes for all key screens' },
          { id: 6, name: 'Design review', type: 'approval', required: true, desc: 'Sign-off from PM and tech lead' }
        ]},
        { id: 3, name: 'Build', color: '#0891b2', actions: [
          { id: 7, name: 'Sprint planning', type: 'meeting', required: true, desc: 'Break work into sprints with story points' },
          { id: 8, name: 'Development', type: 'task', required: true, desc: 'Core feature implementation' },
          { id: 9, name: 'Code review', type: 'review', required: true, desc: 'Peer review for all PRs before merge' },
          { id: 10, name: 'Unit tests', type: 'task', required: true, desc: 'Minimum 80% coverage' }
        ]},
        { id: 4, name: 'Test', color: '#d97706', actions: [
          { id: 11, name: 'QA testing', type: 'task', required: true, desc: 'Manual and automated test execution' },
          { id: 12, name: 'Performance testing', type: 'task', required: false, desc: 'Load and stress testing' },
          { id: 13, name: 'Stakeholder UAT', type: 'review', required: true, desc: 'User acceptance testing sign-off' }
        ]},
        { id: 5, name: 'Launch', color: '#16a34a', actions: [
          { id: 14, name: 'Deployment plan', type: 'document', required: true, desc: 'Runbook for production deployment' },
          { id: 15, name: 'Go/No-go approval', type: 'approval', required: true, desc: 'Final launch sign-off from sponsor' },
          { id: 16, name: 'Deploy to production', type: 'milestone', required: true, desc: 'Production release' },
          { id: 17, name: 'Post-launch review', type: 'meeting', required: false, desc: 'Retrospective and lessons learned' }
        ]}
      ]
    },
    {
      id: 2, name: 'Campaign Launch', description: 'Marketing campaign lifecycle from brief to results analysis.', projectType: 'Marketing', color: '#f59e0b',
      phases: [
        { id: 6, name: 'Brief', color: '#f59e0b', actions: [
          { id: 18, name: 'Creative brief', type: 'document', required: true, desc: 'Goals, audience, messaging, and budget' },
          { id: 19, name: 'Brief approval', type: 'approval', required: true, desc: 'Stakeholder sign-off on brief' }
        ]},
        { id: 7, name: 'Creative', color: '#ec4899', actions: [
          { id: 20, name: 'Concept development', type: 'task', required: true, desc: 'Initial creative concepts and moodboards' },
          { id: 21, name: 'Creative review', type: 'review', required: true, desc: 'Internal creative review' },
          { id: 22, name: 'Client approval', type: 'approval', required: true, desc: 'Client sign-off on creative direction' },
          { id: 23, name: 'Asset production', type: 'task', required: true, desc: 'Produce all final assets' }
        ]},
        { id: 8, name: 'Launch', color: '#16a34a', actions: [
          { id: 24, name: 'Channel setup', type: 'task', required: true, desc: 'Configure all campaign channels' },
          { id: 25, name: 'Launch review', type: 'approval', required: true, desc: 'Final pre-launch check' },
          { id: 26, name: 'Go live', type: 'milestone', required: true, desc: 'Campaign goes live' }
        ]},
        { id: 9, name: 'Measure', color: '#6366f1', actions: [
          { id: 27, name: 'Performance tracking', type: 'task', required: true, desc: 'Monitor KPIs daily' },
          { id: 28, name: 'Results report', type: 'document', required: true, desc: 'Post-campaign analysis and ROI' }
        ]}
      ]
    },
    {
      id: 3, name: 'Compliance & Audit', description: 'Structured audit workflow with mandatory approval gates.', projectType: 'Operations', color: '#06b6d4',
      phases: [
        { id: 10, name: 'Preparation', color: '#06b6d4', actions: [
          { id: 29, name: 'Scope definition', type: 'document', required: true, desc: 'Define audit scope and objectives' },
          { id: 30, name: 'Evidence gathering', type: 'task', required: true, desc: 'Collect required documentation' }
        ]},
        { id: 11, name: 'Assessment', color: '#8b5cf6', actions: [
          { id: 31, name: 'Control testing', type: 'task', required: true, desc: 'Test all in-scope controls' },
          { id: 32, name: 'Gap analysis', type: 'review', required: true, desc: 'Identify and document gaps' },
          { id: 33, name: 'Findings review', type: 'meeting', required: true, desc: 'Review findings with team' }
        ]},
        { id: 12, name: 'Remediation', color: '#d97706', actions: [
          { id: 34, name: 'Remediation plan', type: 'document', required: true, desc: 'Plan to address all findings' },
          { id: 35, name: 'Remediation execution', type: 'task', required: true, desc: 'Implement fixes' },
          { id: 36, name: 'Re-testing', type: 'review', required: true, desc: 'Verify remediation is effective' }
        ]},
        { id: 13, name: 'Sign-off', color: '#16a34a', actions: [
          { id: 37, name: 'Final report', type: 'document', required: true, desc: 'Auditor final report' },
          { id: 38, name: 'Executive sign-off', type: 'approval', required: true, desc: 'Leadership approval of findings' },
          { id: 39, name: 'Audit closed', type: 'milestone', required: true, desc: 'Formal audit closure' }
        ]}
      ]
    },
    {
      id: 4, name: 'Customer Release', description: 'End-to-end product release lifecycle from planning to post-release monitoring.', projectType: 'Engineering', color: '#0ea5e9',
      phases: [
        { id: 14, name: 'Release Planning', color: '#0ea5e9', actions: [
          { id: 40, name: 'Define release scope', type: 'document', required: true, desc: 'Lock features, fixes, and cut-off date for the release' },
          { id: 41, name: 'Release schedule', type: 'document', required: true, desc: 'Timeline with code freeze, staging, and go-live dates' },
          { id: 42, name: 'Risk assessment', type: 'review', required: false, desc: 'Identify release risks and mitigation plans' }
        ]},
        { id: 15, name: 'Readiness', color: '#8b5cf6', actions: [
          { id: 43, name: 'Code freeze', type: 'milestone', required: true, desc: 'Freeze the release branch for stabilization' },
          { id: 44, name: 'Release notes', type: 'document', required: true, desc: 'Draft customer-facing changelog and notes' },
          { id: 45, name: 'Regression testing', type: 'task', required: true, desc: 'Full regression suite on the release candidate' },
          { id: 46, name: 'Security review', type: 'review', required: true, desc: 'Security and dependency scan sign-off' }
        ]},
        { id: 16, name: 'Staging', color: '#d97706', actions: [
          { id: 47, name: 'Deploy to staging', type: 'task', required: true, desc: 'Promote release candidate to the staging environment' },
          { id: 48, name: 'Smoke tests', type: 'task', required: true, desc: 'Verify critical paths in staging' },
          { id: 49, name: 'Stakeholder UAT', type: 'review', required: true, desc: 'Business and support sign-off on staging build' },
          { id: 50, name: 'Go/No-go approval', type: 'approval', required: true, desc: 'Final release decision from release manager' }
        ]},
        { id: 17, name: 'Rollout', color: '#16a34a', actions: [
          { id: 51, name: 'Deploy to production', type: 'milestone', required: true, desc: 'Ship the release to customers' },
          { id: 52, name: 'Post-deploy verification', type: 'task', required: true, desc: 'Confirm health checks and key metrics after deploy' },
          { id: 53, name: 'Customer announcement', type: 'task', required: true, desc: 'Publish release notes and notify customers' }
        ]},
        { id: 18, name: 'Post-release', color: '#6366f1', actions: [
          { id: 54, name: 'Monitor & support', type: 'task', required: true, desc: 'Track errors, feedback, and incidents post-launch' },
          { id: 55, name: 'Release retrospective', type: 'meeting', required: false, desc: 'Review what went well and improvement actions' }
        ]}
      ]
    },
    {
      id: 5, name: 'RFP', description: 'Request for Proposal lifecycle from intake and qualification through vendor award.', projectType: 'Operations', color: '#7c3aed',
      phases: [
        { id: 19, name: 'Intake', color: '#7c3aed', actions: [
          { id: 56, name: 'Log RFP request', type: 'document', required: true, desc: 'Capture the opportunity, source, and submission deadline' },
          { id: 57, name: 'Bid/no-bid decision', type: 'approval', required: true, desc: 'Leadership go/no-go on pursuing the RFP' },
          { id: 58, name: 'Assign proposal team', type: 'task', required: true, desc: 'Name the owner and contributors for each section' }
        ]},
        { id: 20, name: 'Requirements', color: '#6366f1', actions: [
          { id: 59, name: 'Analyze RFP document', type: 'review', required: true, desc: 'Break down mandatory requirements, scope, and evaluation criteria' },
          { id: 60, name: 'Compliance matrix', type: 'document', required: true, desc: 'Map each requirement to a proposal response and owner' },
          { id: 61, name: 'Clarification questions', type: 'task', required: false, desc: 'Submit questions to the issuer before the Q&A deadline' }
        ]},
        { id: 21, name: 'Solution & Pricing', color: '#0891b2', actions: [
          { id: 63, name: 'Solution design', type: 'document', required: true, desc: 'Draft the proposed approach, methodology, and deliverables' },
          { id: 64, name: 'Pricing & estimate', type: 'task', required: true, desc: 'Build the cost model and pricing schedule' },
          { id: 65, name: 'Win themes & differentiators', type: 'document', required: false, desc: 'Articulate why we win against competitors' }
        ]},
        { id: 22, name: 'Drafting', color: '#d97706', actions: [
          { id: 66, name: 'Write proposal sections', type: 'task', required: true, desc: 'Author responses per the compliance matrix' },
          { id: 67, name: 'Collect past performance', type: 'document', required: true, desc: 'Gather case studies, references, and certifications' },
          { id: 68, name: 'Executive summary', type: 'document', required: true, desc: 'Draft the executive summary and cover letter' }
        ]},
        { id: 23, name: 'Review & Approval', color: '#dc2626', actions: [
          { id: 69, name: 'Color-team review', type: 'review', required: true, desc: 'Peer review of the full proposal for quality and compliance' },
          { id: 70, name: 'Legal & contracts review', type: 'review', required: true, desc: 'Review terms, liability, and contractual commitments' },
          { id: 71, name: 'Final approval', type: 'approval', required: true, desc: 'Executive sign-off to submit' }
        ]},
        { id: 24, name: 'Submission', color: '#16a34a', actions: [
          { id: 72, name: 'Finalize & package', type: 'task', required: true, desc: 'Assemble final documents per submission format' },
          { id: 73, name: 'Submit proposal', type: 'milestone', required: true, desc: 'Deliver the proposal before the deadline' },
          { id: 74, name: 'Award decision', type: 'milestone', required: false, desc: 'Record win/loss and capture debrief feedback' }
        ]}
      ]
    }
  ],

  integrations: [
    { id:1, name:'Jira', category:'Project Tracking', icon:'J', color:'#0052cc', bg:'#e6f0ff', status:'connected', syncedAt:'2026-06-20 08:14', records:2340, description:'Sync issues and epics as tasks and milestones.' },
    { id:2, name:'GitHub', category:'Engineering', icon:'G', color:'#24292e', bg:'#f0f0f0', status:'connected', syncedAt:'2026-06-20 09:02', records:876, description:'Link pull requests and commits to project tasks.' },
    { id:3, name:'Slack', category:'Communication', icon:'S', color:'#4a154b', bg:'#f3ecf4', status:'connected', syncedAt:'2026-06-20 07:50', records:0, description:'Send notifications and approval requests to channels.' },
    { id:4, name:'Salesforce', category:'CRM', icon:'SF', color:'#00a1e0', bg:'#e6f5fb', status:'disconnected', syncedAt:null, records:0, description:'Pull account and opportunity data into project context.' },
    { id:5, name:'Google Sheets', category:'Spreadsheet', icon:'GS', color:'#34a853', bg:'#eaf6ed', status:'disconnected', syncedAt:null, records:0, description:'Import/export project data to spreadsheets.' },
    { id:6, name:'Notion', category:'Documentation', icon:'N', color:'#000000', bg:'#f5f5f5', status:'disconnected', syncedAt:null, records:0, description:'Sync pages and databases as project documents.' },
    { id:7, name:'Zapier', category:'Automation', icon:'Z', color:'#ff4a00', bg:'#fff0eb', status:'disconnected', syncedAt:null, records:0, description:'Connect to 5,000+ apps via automation workflows.' },
    { id:8, name:'REST API', category:'Custom', icon:'API', color:'#6366f1', bg:'#eef2ff', status:'connected', syncedAt:'2026-06-19 18:30', records:512, description:'Custom endpoint — push or pull data via webhook.' }
  ],

  rawData: [
    { id:1, source:'Jira', type:'Issue', externalId:'ALPHA-142', name:'API rate limiting implementation', field1:'In Progress', field2:'Sam Rivera', field3:'2026-07-15', linkedProject:'Alpha Launch', importedAt:'2026-06-20 08:14' },
    { id:2, source:'Jira', type:'Issue', externalId:'ALPHA-139', name:'OAuth token refresh bug', field1:'Done', field2:'Alex Morgan', field3:'2026-06-18', linkedProject:'Alpha Launch', importedAt:'2026-06-20 08:14' },
    { id:3, source:'Jira', type:'Epic', externalId:'BRAND-12', name:'Brand visual identity system', field1:'In Progress', field2:'Jordan Davis', field3:'2026-07-30', linkedProject:'Brand Refresh', importedAt:'2026-06-20 08:14' },
    { id:4, source:'GitHub', type:'Pull Request', externalId:'#284', name:'feat: add offline sync mode', field1:'Open', field2:'Taylor Kim', field3:'2026-06-21', linkedProject:'Mobile App v2', importedAt:'2026-06-20 09:02' },
    { id:5, source:'GitHub', type:'Pull Request', externalId:'#281', name:'fix: memory leak in list renderer', field1:'Merged', field2:'Sam Rivera', field3:'2026-06-19', linkedProject:'Mobile App v2', importedAt:'2026-06-20 09:02' },
    { id:6, source:'GitHub', type:'Commit', externalId:'a3f9c12', name:'refactor: extract auth middleware', field1:'Merged', field2:'Alex Morgan', field3:'2026-06-18', linkedProject:'Alpha Launch', importedAt:'2026-06-20 09:02' },
    { id:7, source:'REST API', type:'Webhook', externalId:'WH-0091', name:'Budget approval received from Finance', field1:'Processed', field2:'System', field3:'2026-06-19', linkedProject:'Data Platform', importedAt:'2026-06-19 18:30' },
    { id:8, source:'REST API', type:'Webhook', externalId:'WH-0088', name:'Stakeholder sign-off on scope doc', field1:'Processed', field2:'System', field3:'2026-06-17', linkedProject:'Alpha Launch', importedAt:'2026-06-19 18:30' },
    { id:9, source:'Jira', type:'Issue', externalId:'DATA-04', name:'Schema migration for user events', field1:'To Do', field2:'Sam Rivera', field3:'2026-08-01', linkedProject:'Data Platform', importedAt:'2026-06-20 08:14' },
    { id:10, source:'GitHub', type:'Pull Request', externalId:'#112', name:'chore: upgrade to Node 22', field1:'Open', field2:'Taylor Kim', field3:'2026-06-22', linkedProject:'Partner Portal', importedAt:'2026-06-20 09:02' }
  ],

  customViews: [
    { id:1, name:'At-Risk Projects', description:'Projects with health below 60 or status At Risk', icon:'alertTriangle', color:'#ef4444', filters:[{field:'health',op:'<',value:'60'},{field:'status',op:'=',value:'at-risk'}], columns:['name','health','status','pm','due'], createdBy:'AM', createdAt:'2026-06-10', lastRun:'2026-06-20', rows:2 },
    { id:2, name:'Open Approvals by Priority', description:'All pending approvals sorted by priority and age', icon:'check', color:'#f59e0b', filters:[{field:'approvalStatus',op:'=',value:'pending'}], columns:['title','project','priority','requestedBy','createdAt'], createdBy:'AM', createdAt:'2026-06-12', lastRun:'2026-06-20', rows:4 },
    { id:3, name:'Engineering Milestones Q3', description:'All milestones for Engineering projects due in Q3 2026', icon:'flag', color:'#6366f1', filters:[{field:'type',op:'=',value:'Engineering'},{field:'dueDate',op:'between',value:'2026-07-01,2026-09-30'}], columns:['milestone','project','dueDate','status','owner'], createdBy:'SR', createdAt:'2026-06-14', lastRun:'2026-06-19', rows:5 },
    { id:4, name:'Budget Overrun Watch', description:'Projects where spend exceeds 80% of budget', icon:'dollar', color:'#dc2626', filters:[{field:'budgetUsed',op:'>',value:'80'}], columns:['name','budget','spent','budgetPct','pm','status'], createdBy:'LM', createdAt:'2026-06-01', lastRun:'2026-06-18', rows:3 },
    { id:5, name:'Team Workload Summary', description:'Tasks per team member across all active projects', icon:'users', color:'#8b5cf6', filters:[{field:'status',op:'=',value:'active'}], columns:['member','openTasks','overdueTasks','projects','capacity'], createdBy:'AM', createdAt:'2026-05-28', lastRun:'2026-06-20', rows:5 }
  ],

  customFields: [
    { id:1, name:'Client Name', type:'text', appliesTo:'Project', required:false, description:'External client or stakeholder organisation name', usedIn:4, createdBy:'AM', createdAt:'2026-05-15' },
    { id:2, name:'Contract Value', type:'currency', appliesTo:'Project', required:false, description:'Total contract value associated with this project', usedIn:3, createdBy:'LM', createdAt:'2026-05-20' },
    { id:3, name:'Regulatory Flag', type:'boolean', appliesTo:'Project', required:false, description:'Whether this project falls under regulatory compliance requirements', usedIn:2, createdBy:'LM', createdAt:'2026-06-01' },
    { id:4, name:'External Ticket ID', type:'text', appliesTo:'Task', required:false, description:'Linked ticket ID from Jira or GitHub', usedIn:18, createdBy:'SR', createdAt:'2026-05-10' },
    { id:5, name:'Review Notes', type:'long text', appliesTo:'Approval', required:true, description:'Mandatory notes field for approval decisions', usedIn:7, createdBy:'AM', createdAt:'2026-06-05' },
    { id:6, name:'Phase Gate Score', type:'number', appliesTo:'Milestone', required:false, description:'Numeric quality gate score (0–100) assessed at milestone review', usedIn:5, createdBy:'AM', createdAt:'2026-06-08' },
    { id:7, name:'Vendor', type:'select', appliesTo:'Task', required:false, description:'Third-party vendor responsible for this deliverable', usedIn:6, createdBy:'JD', createdAt:'2026-06-12' },
    { id:8, name:'Risk Category', type:'select', appliesTo:'Risk', required:true, description:'Classification: Technical / Financial / Operational / Reputational', usedIn:9, createdBy:'LM', createdAt:'2026-05-22' }
  ],

  reports: [
    { id:'cr1', name:'Q3 Engineering Summary', vizType:'bar',   metric:'progress', description:'Progress across all engineering projects in Q3.', createdBy:'AM', createdAt:'2026-06-10', tags:['engineering','q3'] },
    { id:'cr2', name:'Budget vs Spend — Active', vizType:'bar', metric:'budget',   description:'Budget burn for all currently active projects.', createdBy:'LM', createdAt:'2026-06-14', tags:['budget','finance'] }
  ],

  automations: [
    { id:1, projectId:1, name:'Notify on PR merged', trigger:'pull_request.merged', condition:'branch = main', action:'notify', actionTarget:'AM', actionDetail:'Notify PM when a PR is merged to main', status:'active', lastRun:'2026-06-20 09:02', runCount:14, createdBy:'SR', createdAt:'2026-04-10' },
    { id:2, projectId:1, name:'Auto-close task on deploy', trigger:'deployment.success', condition:'environment = production', action:'update_task_status', actionTarget:null, actionDetail:'Mark linked task as Done when a deployment to production succeeds', status:'active', lastRun:'2026-06-19 16:45', runCount:6, createdBy:'AM', createdAt:'2026-04-12' },
    { id:3, projectId:1, name:'Overdue escalation', trigger:'task.overdue', condition:'priority = critical', action:'change_project_status', actionTarget:null, actionDetail:'Set project status to At Risk when a critical task goes overdue', status:'paused', lastRun:'Never', runCount:0, createdBy:'AM', createdAt:'2026-05-01' },
    { id:4, projectId:2, name:'Slack alert on risk added', trigger:'risk.created', condition:'severity = high', action:'notify', actionTarget:'JD', actionDetail:'Ping PM on Slack when a high-severity risk is logged', status:'active', lastRun:'2026-06-18 11:20', runCount:3, createdBy:'JD', createdAt:'2026-05-05' },
    { id:5, projectId:4, name:'Beta build reminder', trigger:'milestone.due_in_7d', condition:'', action:'notify', actionTarget:'TK', actionDetail:'Remind Tech Lead 7 days before a milestone is due', status:'active', lastRun:'2026-06-14 08:00', runCount:2, createdBy:'TK', createdAt:'2026-03-20' }
  ],

  actions: [
    { id:101, name:'Sync Jira tasks', type:'sync', category:'Integration', project:'Alpha Launch', projectId:1, description:'Pull latest Jira issue statuses into project tasks', lastRun:'2026-06-20 08:14', runCount:31, createdBy:'SR', createdAt:'2026-04-05' },
    { id:102, name:'Generate health report', type:'report', category:'Reporting', project:'All Projects', projectId:null, description:'Compute and save a health snapshot for every active project', lastRun:'2026-06-19 18:00', runCount:8, createdBy:'AM', createdAt:'2026-05-01' },
    { id:103, name:'Re-assign overdue tasks', type:'update_task_status', category:'Task Management', project:'Brand Refresh', projectId:2, description:'Bulk-reassign all overdue tasks to PM for triage', lastRun:'2026-06-18 09:30', runCount:3, createdBy:'JD', createdAt:'2026-05-10' },
    { id:104, name:'Escalate blocked tasks to sponsor', type:'notify', category:'Escalation', project:'Alpha Launch', projectId:1, description:'Send a digest of all blocked tasks to the project sponsor', lastRun:'Never', runCount:0, createdBy:'AM', createdAt:'2026-06-01' },
    { id:105, name:'Archive completed milestones', type:'update_task_status', category:'Cleanup', project:'All Projects', projectId:null, description:'Move all done milestones to archived state and recalculate progress', lastRun:'2026-06-15 12:00', runCount:5, createdBy:'AM', createdAt:'2026-05-20' },
    { id:106, name:'Push budget alert to Slack', type:'send_slack', category:'Integration', project:'Partner Portal', projectId:6, description:'Post current budget burn rate to #project-finance Slack channel', lastRun:'2026-06-17 16:00', runCount:2, createdBy:'LM', createdAt:'2026-06-10' }
  ],

  departments: [
    { id:1, name:'Engineering',  head:'SR', headName:'Sam Rivera',  headColor:'#10b981', budget:480000, spent:312000, headcount:8,  allocated:7,  color:'#6366f1' },
    { id:2, name:'Marketing',    head:'JD', headName:'Jordan Davis', headColor:'#f59e0b', budget:120000, spent:72000,  headcount:4,  allocated:3,  color:'#f59e0b' },
    { id:3, name:'Operations',   head:'LM', headName:'Lee Mitchell', headColor:'#06b6d4', budget:95000,  spent:61000,  headcount:5,  allocated:4,  color:'#10b981' },
    { id:4, name:'Design',       head:'JD', headName:'Jordan Davis', headColor:'#f59e0b', budget:85000,  spent:44000,  headcount:3,  allocated:3,  color:'#8b5cf6' },
    { id:5, name:'Product',      head:'AM', headName:'Alex Morgan',  headColor:'#6366f1', budget:140000, spent:89000,  headcount:4,  allocated:4,  color:'#0891b2' },
  ],

  peopleAllocations: [
    { memberId:1, initials:'AM', name:'Alex Morgan',   color:'#6366f1', department:'Product',     role:'Project Manager', capacity:100, allocations:[{projectId:1,pct:40},{projectId:3,pct:20},{projectId:4,pct:30}], otherPct:10 },
    { memberId:2, initials:'JD', name:'Jordan Davis',  color:'#f59e0b', department:'Design',      role:'Designer',        capacity:100, allocations:[{projectId:2,pct:55},{projectId:6,pct:30}], otherPct:15 },
    { memberId:3, initials:'SR', name:'Sam Rivera',    color:'#10b981', department:'Engineering', role:'Engineer',        capacity:100, allocations:[{projectId:1,pct:50},{projectId:3,pct:35}], otherPct:15 },
    { memberId:4, initials:'TK', name:'Taylor Kim',    color:'#8b5cf6', department:'Engineering', role:'Tech Lead',       capacity:100, allocations:[{projectId:4,pct:60},{projectId:1,pct:20},{projectId:3,pct:15}], otherPct:5 },
    { memberId:5, initials:'LM', name:'Lee Mitchell',  color:'#06b6d4', department:'Operations',  role:'Analyst',         capacity:100, allocations:[{projectId:5,pct:70},{projectId:6,pct:15}], otherPct:15 },
  ],

  costCategories: [
    { id:1, name:'Labor',          icon:'users',    budget:680000, spent:435000, color:'#6366f1' },
    { id:2, name:'Tools & Licenses', icon:'cpu',    budget:48000,  spent:31200,  color:'#8b5cf6' },
    { id:3, name:'Infrastructure', icon:'database', budget:72000,  spent:52000,  color:'#0891b2' },
    { id:4, name:'Travel',         icon:'flag',     budget:24000,  spent:8500,   color:'#f59e0b' },
    { id:5, name:'External / Vendors', icon:'link', budget:96000,  spent:51800,  color:'#10b981' },
  ],

  issues: [
    { id:1,  title:'Login page crashes on Safari 17',        type:'bug',     status:'open',        priority:'critical', project:'Mobile App v2',    projectId:4, assignee:'TK', assigneeColor:'#8b5cf6', reporter:'AM', created:'2026-06-01', updated:'2026-06-18', due:'2026-06-25', labels:['frontend','auth'],    description:'Users on Safari 17 encounter a white screen on the login page after entering credentials.' },
    { id:2,  title:'Add SSO support via SAML 2.0',           type:'feature', status:'in-progress', priority:'high',     project:'Alpha Launch',     projectId:1, assignee:'SR', assigneeColor:'#10b981', reporter:'AM', created:'2026-05-20', updated:'2026-06-19', due:'2026-07-10', labels:['auth','backend'],    description:'Enterprise customers require SAML 2.0-based single sign-on to meet their IT policies.' },
    { id:3,  title:'Dashboard KPI tiles misaligned on 1366px', type:'bug',   status:'in-review',   priority:'medium',   project:'Alpha Launch',     projectId:1, assignee:'JD', assigneeColor:'#f59e0b', reporter:'TK', created:'2026-06-05', updated:'2026-06-20', due:'2026-06-28', labels:['ui','responsive'],  description:'At 1366×768 screen width the KPI tiles wrap incorrectly and overflow the container.' },
    { id:4,  title:'Export reports to PDF',                  type:'feature', status:'open',        priority:'medium',   project:'Alpha Launch',     projectId:1, assignee:'AM', assigneeColor:'#6366f1', reporter:'LM', created:'2026-06-08', updated:'2026-06-15', due:'2026-07-20', labels:['reports','export'],  description:'PMs need to export the project health report to PDF for weekly stakeholder reviews.' },
    { id:5,  title:'Brand color tokens not applied in dark mode', type:'bug', status:'open',       priority:'high',     project:'Brand Refresh',    projectId:2, assignee:'JD', assigneeColor:'#f59e0b', reporter:'JD', created:'2026-06-10', updated:'2026-06-17', due:'2026-07-05', labels:['design','dark-mode'], description:'Several semantic color variables fall back to light-mode values in dark-mode context.' },
    { id:6,  title:'Pipeline fails on Node 20 upgrade',      type:'bug',     status:'in-progress', priority:'critical', project:'Alpha Launch',     projectId:1, assignee:'SR', assigneeColor:'#10b981', reporter:'SR', created:'2026-06-12', updated:'2026-06-20', due:'2026-06-22', labels:['ci','backend'],     description:'CI pipeline throws ENOENT errors after upgrading the base image to Node 20.' },
    { id:7,  title:'Introduce GraphQL subscriptions for real-time updates', type:'feature', status:'open', priority:'high', project:'Data Platform', projectId:3, assignee:'SR', assigneeColor:'#10b981', reporter:'AM', created:'2026-06-14', updated:'2026-06-14', due:'2026-09-01', labels:['api','backend'],    description:'Real-time push for dashboard widgets to avoid polling overhead.' },
    { id:8,  title:'SOC2 evidence collection automation',    type:'task',    status:'done',        priority:'critical', project:'Compliance Audit', projectId:5, assignee:'LM', assigneeColor:'#06b6d4', reporter:'LM', created:'2026-04-01', updated:'2026-05-28', due:'2026-05-31', labels:['compliance'],       description:'Script to pull access logs, change records and policy docs into the audit folder.' },
    { id:9,  title:'Offline mode sync conflict resolution',  type:'feature', status:'in-progress', priority:'high',     project:'Mobile App v2',    projectId:4, assignee:'TK', assigneeColor:'#8b5cf6', reporter:'TK', created:'2026-05-28', updated:'2026-06-19', due:'2026-08-01', labels:['mobile','sync'],    description:'When a device reconnects, conflicting record changes must be merged deterministically.' },
    { id:10, title:'Partner portal session timeout too short', type:'bug',   status:'open',        priority:'low',      project:'Partner Portal',   projectId:6, assignee:'JD', assigneeColor:'#f59e0b', reporter:'LM', created:'2026-06-02', updated:'2026-06-10', due:'2026-07-15', labels:['auth','ux'],        description:'Session expires after 10 minutes of inactivity; partners want at least 30 minutes.' },
    { id:11, title:'Milestone progress bar jumps on re-render', type:'bug',  status:'in-review',  priority:'medium',   project:'Mobile App v2',    projectId:4, assignee:'TK', assigneeColor:'#8b5cf6', reporter:'AM', created:'2026-06-09', updated:'2026-06-18', due:'2026-07-12', labels:['ui','animation'],   description:'Progress bar animates from 0% on each component re-render instead of retaining position.' },
    { id:12, title:'Bulk-assign tasks to team member',       type:'feature', status:'open',        priority:'medium',   project:'Alpha Launch',     projectId:1, assignee:'AM', assigneeColor:'#6366f1', reporter:'AM', created:'2026-06-16', updated:'2026-06-16', due:'2026-07-30', labels:['tasks','ux'],       description:'PMs need to select multiple tasks and reassign them to a team member in one action.' },
    { id:13, title:'Data warehouse schema migration fails on rollback', type:'bug', status:'open', priority:'critical', project:'Data Platform', projectId:3, assignee:'SR', assigneeColor:'#10b981', reporter:'SR', created:'2026-06-17', updated:'2026-06-20', due:'2026-06-27', labels:['database','backend'], description:'Alembic downgrade fails with FK constraint errors when rolling back the v3 schema.' },
    { id:14, title:'Add Gantt chart to project timeline tab', type:'feature', status:'open',       priority:'medium',   project:'Alpha Launch',     projectId:1, assignee:'JD', assigneeColor:'#f59e0b', reporter:'TK', created:'2026-06-18', updated:'2026-06-18', due:'2026-08-10', labels:['ui','timeline'],    description:'Project managers want to see task dependencies as a Gantt chart in the timeline tab.' },
    { id:15, title:'Push notifications not delivered on Android 14', type:'bug', status:'open',   priority:'high',     project:'Mobile App v2',    projectId:4, assignee:'TK', assigneeColor:'#8b5cf6', reporter:'JD', created:'2026-06-19', updated:'2026-06-20', due:'2026-07-08', labels:['mobile','notifications'], description:'Firebase Cloud Messaging tokens are not refreshed after the Android 14 background restriction policy change.' },
  ],

  oobViews: [
    { id:1,  category:'Projects',  name:'All Projects Overview',       icon:'folder',        color:'#6366f1', description:'Every project with status, health score, PM, progress and due date.', columns:['name','type','status','health','progress','pm','due'], previewRows:[['Alpha Launch','Engineering','Active','82','67%','AM','Aug 15'],['Brand Refresh','Marketing','At Risk','54','41%','JD','Jul 30'],['Data Platform','Engineering','Planning','–','8%','SR','Dec 01']], tags:['projects','overview'] },
    { id:2,  category:'Projects',  name:'At-Risk & Overdue Projects',  icon:'alertTriangle', color:'#ef4444', description:'Projects flagged At Risk or with health below 60 and overdue tasks.', columns:['name','status','health','overdueTasks','budget','pm'], previewRows:[['Brand Refresh','At Risk','54','4','$45k','JD'],['Partner Portal','On Hold','38','5','$60k','JD']], tags:['risk','health'] },
    { id:3,  category:'Projects',  name:'Budget Burn by Project',      icon:'dollar',        color:'#f59e0b', description:'Budget, spend, remaining and burn rate for every project.', columns:['name','budget','spent','remaining','burnPct','status'], previewRows:[['Alpha Launch','$120k','$74k','$46k','62%','Active'],['Brand Refresh','$45k','$28k','$17k','62%','At Risk'],['Compliance Audit','$30k','$28.5k','$1.5k','95%','Completed']], tags:['budget','finance'] },
    { id:4,  category:'Tasks',     name:'Overdue Tasks Across All Projects', icon:'clock',   color:'#dc2626', description:'All tasks past their due date, grouped by project and assignee.', columns:['task','project','assignee','dueDate','priority','daysOverdue'], previewRows:[['OAuth token refresh bug','Alpha Launch','AM','Jun 10','High','10d'],['Logo design v2','Brand Refresh','JD','Jun 15','High','5d'],['Partner API contract','Partner Portal','JD','May 30','Medium','21d']], tags:['tasks','overdue'] },
    { id:5,  category:'Tasks',     name:'My Open Tasks',               icon:'checkSquare',   color:'#6366f1', description:'All tasks assigned to the current user that are not yet done.', columns:['task','project','status','priority','due'], previewRows:[['Define project scope','Alpha Launch','In Progress','High','Jun 25'],['Architecture review','Data Platform','Todo','Critical','Jul 01']], tags:['tasks','personal'] },
    { id:6,  category:'Tasks',     name:'High Priority Task Queue',    icon:'zap',           color:'#f59e0b', description:'Open tasks across all projects ranked Critical or High priority.', columns:['task','project','assignee','priority','due','status'], previewRows:[['API rate limiting','Alpha Launch','SR','High','Jul 15','In Progress'],['Schema migration','Data Platform','SR','Critical','Aug 01','Todo']], tags:['tasks','priority'] },
    { id:7,  category:'Approvals', name:'Pending Approvals Queue',     icon:'check',         color:'#0891b2', description:'All open approval requests with requester, age and priority.', columns:['title','project','requestedBy','priority','created','age'], previewRows:[['Launch go/no-go','Alpha Launch','AM','Critical','Jun 18','2d'],['Scope change','Brand Refresh','JD','High','Jun 16','4d']], tags:['approvals'] },
    { id:8,  category:'Approvals', name:'Approval History (30 days)',  icon:'history',       color:'#6b7280', description:'All decisions made in the last 30 days with outcome and reviewer.', columns:['title','project','decision','reviewer','decidedAt'], previewRows:[['Q2 budget increase','Data Platform','Approved','AM','Jun 12'],['Vendor NDA','Partner Portal','Rejected','LM','Jun 05']], tags:['approvals','history'] },
    { id:9,  category:'Team',      name:'Team Workload Heatmap',       icon:'users',         color:'#8b5cf6', description:'Open and overdue task counts per team member across active projects.', columns:['member','role','openTasks','overdueTasks','projects','capacity'], previewRows:[['Alex Morgan','PM','12','1','4','85%'],['Sam Rivera','Engineer','18','2','3','110%'],['Taylor Kim','Engineer','15','1','3','92%']], tags:['team','capacity'] },
    { id:10, category:'Team',      name:'Milestone Calendar',          icon:'calendar',      color:'#16a34a', description:'All upcoming milestones across projects in chronological order.', columns:['milestone','project','dueDate','owner','status'], previewRows:[['Beta release','Alpha Launch','Jul 20','AM','Active'],['Logo final','Brand Refresh','Jul 01','JD','Active'],['Beta build','Mobile App v2','Aug 01','TK','Active']], tags:['milestones','timeline'] },
    { id:11, category:'Health',    name:'Health Score Breakdown',      icon:'chart',         color:'#10b981', description:'Per-project health score with component breakdown: tasks, milestones, budget, risk.', columns:['project','health','taskScore','milestoneScore','budgetScore','riskScore'], previewRows:[['Alpha Launch','82','88','75','85','80'],['Brand Refresh','54','52','60','70','35'],['Mobile App v2','76','80','72','78','74']], tags:['health','analytics'] },
    { id:12, category:'Health',    name:'Risk Register',               icon:'alertTriangle', color:'#f59e0b', description:'All open risks across projects with severity, owner and mitigation status.', columns:['risk','project','severity','owner','open','mitigation'], previewRows:[['API dependency delay','Alpha Launch','High','JD','Yes','—'],['Stakeholder alignment','Brand Refresh','High','JD','Yes','—'],['Budget freeze','Partner Portal','High','JD','Yes','—']], tags:['risk'] }
  ],

  activity: [
    { type:'task', icon:'✓', color:'#10b981', bg:'#ecfdf5', text:'<strong>Sam Rivera</strong> completed "API authentication module" on <strong>Alpha Launch</strong>', time:'10 min ago' },
    { type:'approval', icon:'⚡', color:'#f59e0b', bg:'#fffbeb', text:'Policy <strong>Milestone Slip</strong> triggered approval request on <strong>Brand Refresh</strong>', time:'2h ago' },
    { type:'walkthrough', icon:'◎', color:'#6366f1', bg:'#eef2ff', text:'<strong>Alex Morgan</strong> completed walkthrough on <strong>Alpha Launch</strong> — health 78→82', time:'1d ago' },
    { type:'risk', icon:'⚠', color:'#ef4444', bg:'#fef2f2', text:'New <strong>High</strong> risk added to <strong>Brand Refresh</strong>: Stakeholder alignment delay', time:'1d ago' },
    { type:'task', icon:'✓', color:'#10b981', bg:'#ecfdf5', text:'<strong>Lee Mitchell</strong> completed all 22 tasks on <strong>Compliance Audit</strong>', time:'3d ago' }
  ]
};

// --- DECISION LOG SEED ---
// Every project carries a decision register (key decisions + rationale).
DATA.projects.forEach(p => { if (!p.decisions) p.decisions = []; });
(DATA.projects.find(p => p.id === 1) || {}).decisions = [
  { id:1, title:'Use PostgreSQL for the primary datastore', context:'Need ACID guarantees and strong JSON support for the analytics workload.', alternatives:'MongoDB, DynamoDB', owner:'SR', date:'2026-04-18', impact:'high', status:'decided' },
  { id:2, title:'Adopt trunk-based development with feature flags', context:'Long-lived branches were causing painful merges before the beta cutover.', alternatives:'GitFlow, release branches', owner:'AM', date:'2026-05-02', impact:'medium', status:'decided' },
  { id:3, title:'Defer native mobile app to a fast-follow release', context:'Scope pressure on the Q3 launch; responsive web covers 90% of use.', alternatives:'Ship web + iOS together, React Native wrapper', owner:'AM', date:'2026-06-10', impact:'high', status:'proposed' }
];
(DATA.projects.find(p => p.id === 2) || {}).decisions = [
  { id:4, title:'Standardize on a single serif display typeface', context:'Brand audit found five competing fonts across touchpoints.', alternatives:'Keep dual sans/serif system, license a custom face', owner:'JD', date:'2026-05-20', impact:'medium', status:'decided' },
  { id:5, title:'Original teal palette superseded by deep indigo', context:'Accessibility contrast testing failed on the teal-on-white combination.', alternatives:'Darken teal, add outlines', owner:'LM', date:'2026-06-01', impact:'low', status:'superseded' }
];

// --- QUALITY / TEST PLANS SEED ---
// Manual + automation test plans with execution status per project.
DATA.testPlans = [
  // Manual test plans
  { id:1, name:'Alpha Launch — Regression Suite', kind:'manual', project:'Alpha Launch', projectId:1, owner:'DC', ownerColor:'#ec4899', status:'passed', priority:'high', environment:'Staging', lastRun:'2026-06-28', tests:{ total:48, passed:44, failed:1, blocked:1, pending:2 } },
  { id:2, name:'Checkout & Payments Smoke', kind:'manual', project:'Alpha Launch', projectId:1, owner:'EK', ownerColor:'#84cc16', status:'failed', priority:'critical', environment:'Staging', lastRun:'2026-06-30', tests:{ total:22, passed:15, failed:5, blocked:0, pending:2 } },
  { id:3, name:'Brand Refresh — Visual QA', kind:'manual', project:'Brand Refresh', projectId:2, owner:'JD', ownerColor:'#f59e0b', status:'in-progress', priority:'medium', environment:'Preview', lastRun:'2026-07-01', tests:{ total:30, passed:12, failed:2, blocked:1, pending:15 } },
  { id:4, name:'Mobile App v2 — Device Matrix', kind:'manual', project:'Mobile App v2', projectId:4, owner:'GB', ownerColor:'#6366f1', status:'in-progress', priority:'high', environment:'Device Lab', lastRun:'2026-06-29', tests:{ total:60, passed:38, failed:6, blocked:4, pending:12 } },
  { id:5, name:'Compliance Audit — Manual Controls', kind:'manual', project:'Compliance Audit', projectId:5, owner:'LM', ownerColor:'#06b6d4', status:'passed', priority:'critical', environment:'Production', lastRun:'2026-05-28', tests:{ total:22, passed:22, failed:0, blocked:0, pending:0 } },
  { id:6, name:'Partner Portal — Exploratory', kind:'manual', project:'Partner Portal', projectId:6, owner:'DC', ownerColor:'#ec4899', status:'blocked', priority:'low', environment:'Staging', lastRun:'2026-06-15', tests:{ total:18, passed:4, failed:1, blocked:9, pending:4 } },
  { id:7, name:'Data Platform — Migration Validation', kind:'manual', project:'Data Platform', projectId:3, owner:'SR', ownerColor:'#10b981', status:'draft', priority:'high', environment:'—', lastRun:'Never', tests:{ total:14, passed:0, failed:0, blocked:0, pending:14 } },
  // Automation test plans
  { id:8, name:'Alpha Launch — API E2E', kind:'automation', project:'Alpha Launch', projectId:1, owner:'LI', ownerColor:'#14b8a6', status:'passed', priority:'critical', framework:'Playwright', schedule:'On every merge', coverage:81, duration:'6m 12s', lastRun:'2026-07-02', tests:{ total:214, passed:210, failed:2, blocked:0, pending:2 } },
  { id:9, name:'Alpha Launch — Unit + Integration', kind:'automation', project:'Alpha Launch', projectId:1, owner:'SR', ownerColor:'#10b981', status:'passed', priority:'high', framework:'Jest', schedule:'On every merge', coverage:88, duration:'2m 41s', lastRun:'2026-07-02', tests:{ total:1180, passed:1174, failed:3, blocked:0, pending:3 } },
  { id:10, name:'Mobile App v2 — UI Automation', kind:'automation', project:'Mobile App v2', projectId:4, owner:'FS', ownerColor:'#8b5cf6', status:'failed', priority:'high', framework:'Detox', schedule:'Nightly', coverage:64, duration:'11m 03s', lastRun:'2026-07-01', tests:{ total:96, passed:82, failed:11, blocked:1, pending:2 } },
  { id:11, name:'Brand Refresh — Visual Regression', kind:'automation', project:'Brand Refresh', projectId:2, owner:'PN', ownerColor:'#0ea5e9', status:'in-progress', priority:'medium', framework:'Chromatic', schedule:'On PR', coverage:52, duration:'4m 18s', lastRun:'2026-07-01', tests:{ total:74, passed:40, failed:4, blocked:0, pending:30 } },
  { id:12, name:'Data Platform — Pipeline Contract Tests', kind:'automation', project:'Data Platform', projectId:3, owner:'FG', ownerColor:'#a855f7', status:'draft', priority:'high', framework:'pytest', schedule:'Not scheduled', coverage:12, duration:'—', lastRun:'Never', tests:{ total:38, passed:0, failed:0, blocked:0, pending:38 } },
  { id:13, name:'Compliance Audit — Security Scans', kind:'automation', project:'Compliance Audit', projectId:5, owner:'HQ', ownerColor:'#14b8a6', status:'passed', priority:'critical', framework:'OWASP ZAP', schedule:'Weekly', coverage:0, duration:'8m 55s', lastRun:'2026-05-30', tests:{ total:52, passed:52, failed:0, blocked:0, pending:0 } },
  { id:14, name:'Partner Portal — Smoke Automation', kind:'automation', project:'Partner Portal', projectId:6, owner:'LI', ownerColor:'#14b8a6', status:'blocked', priority:'low', framework:'Cypress', schedule:'Paused', coverage:34, duration:'—', lastRun:'2026-06-14', tests:{ total:40, passed:12, failed:2, blocked:24, pending:2 } }
];

// --- STATE ---
const STATE = {
  currentPage: 'dashboard',
  currentProject: DATA.projects.find(p => p.id === 1),
  currentTab: 'overview',
  currentApprovalTab: 'pending',
  selectedApproval: null,
  sidebarCollapsed: false,
  sidebarHidden: false,
  wizardStep: 1,
  walkthroughStep: 1,
  walkthroughActive: false,
  wizardData: {},
  dsTab: 'integrations',
  dsViewBuilder: false,
  dsViewFilters: null,
  dsFieldBuilder: false,
  oobCategory: 'All',
  actionsTab: 'all',
  actionEditingId: null,
  runningActionId: null,
  issuesViewId: 'oob-all',
  issuesSearch: '',
  issuesCustomViews: [],
  resourceTab: 'overview',
  commercialTab: 'overview',
  risksFilter: { severity: '', status: '' },
  decisionsFilter: { impact: '', status: '' },
  teamView: 'table',
  workflowView: 'table',
  qualityTab: 'manual',
  wireAnalyzing: false,
  wireProposals: null,
  wireSignals: 7   // unreviewed channel signals waiting to be wired (seed count)
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
  help: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  history: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.71L1 10"/></svg>`,
  workflow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="4" height="4" rx="1"/><rect x="10" y="3" width="4" height="4" rx="1"/><rect x="17" y="3" width="4" height="4" rx="1"/><rect x="3" y="17" width="4" height="4" rx="1"/><rect x="10" y="17" width="4" height="4" rx="1"/><line x1="5" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="12" y2="11"/><line x1="19" y1="7" x2="19" y2="11"/><line x1="5" y1="12" x2="12" y2="12"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  gitBranch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
  checkSquare: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  fileText: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  flag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
  thumbsUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`,
  database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  plug: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M7 6h10v10"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="6" r="2"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  table2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  sliders: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`,
  refreshCw: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  reports: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 17V13"/><path d="M12 17V9"/><path d="M16 17V11"/></svg>`,
  pieChart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>`,
  pivot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`,
  actions: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,
  issues: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  kanban: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="4" height="18" rx="1"/><rect x="10" y="3" width="4" height="12" rx="1"/><rect x="17" y="3" width="4" height="15" rx="1"/></svg>`,
  timeline: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><circle cx="7" cy="12" r="2"/><circle cx="17" cy="12" r="2"/><path d="M5 8l-2 4 2 4"/><path d="M19 8l2 4-2 4"/></svg>`,
  calendarView: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="7" y="14" width="3" height="3" rx="1" fill="currentColor"/><rect x="14" y="14" width="3" height="3" rx="1" fill="currentColor"/></svg>`,
  resource: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><line x1="19" y1="8" x2="22" y2="8"/><line x1="19" y1="11" x2="22" y2="11"/><line x1="19" y1="14" x2="22" y2="14"/></svg>`,
  trendUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  palette: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>`,
  key: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  monitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  logOut: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  smartphone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`
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

// Escape user-entered text before interpolating into innerHTML.
function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

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
  const globalNav = [
    { id:'dashboard', label:'Dashboard', icon:I.dashboard },
    { id:'wire', label:'Wire', icon:I.zap, badge: wireBadgeCount() || null, badgeClass:'nav-badge--wire wire-signal-badge' },
    { id:'portfolio', label:'1 Pager', icon:I.fileText },
    { id:'commercial', label:'Commercial', icon:I.trendUp },
    { id:'quality', label:'Quality', icon:I.checkSquare },
  ];
  if (DATA.user.settings.showNotes) {
    globalNav.push({ id:'notes', label:'Notes', icon:I.fileText });
  }
  const criticalIssues = DATA.issues.filter(i => i.priority === 'critical' && i.status !== 'done').length;
  const projectScopedNav = STATE.currentProject ? [
    { id:'one-pager',    label:'1 Pager',      icon:I.fileText },
    { id:'prd',          label:'PRD',          icon:I.checkSquare },
    { id:'approvals',    label:'Approvals',    icon:I.check,    badge: DATA.approvals.length },
    { id:'issues',       label:'Issues',       icon:I.issues,   badge: criticalIssues || null },
    { id:'risks',        label:'Risks',        icon:I.shield,   badge: STATE.currentProject.risks.filter(r=>r.open).length || null },
    { id:'decisions',    label:'Decisions',    icon:I.gitBranch, badge: (STATE.currentProject.decisions||[]).filter(d=>d.status==='proposed').length || null },
    { id:'actions',      label:'Actions',      icon:I.actions },
    { id:'resources',    label:'Resources',    icon:I.resource },
    { id:'policies',     label:'Policies',     icon:I.zap },
    { id:'workflows',    label:'Workflows',    icon:I.workflow },
    { id:'team',         label:'Team',         icon:I.users },
    { id:'analytics',    label:'Analytics',    icon:I.chart },
    { id:'project-quality', label:'Quality',   icon:I.checkSquare },
    { id:'reports',      label:'Reports',      icon:I.reports },
    { id:'integrations', label:'Integrations', icon:I.plug },
  ] : [];

  const navItem = n => `
    <div class="nav-item ${STATE.currentPage===n.id?'active':''}" data-page="${n.id}">
      ${n.icon}<span>${n.label}</span>
      ${n.badge ? `<span class="nav-badge ${n.badgeClass||''}">${n.badge}</span>` : ''}
    </div>`;

  const isProjectPage = STATE.currentPage === 'project-detail' || STATE.currentPage === 'projects';

  document.getElementById('sidebar').innerHTML = `
    <button class="sidebar-toggle" id="sidebar-toggle" title="Toggle sidebar">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <div class="sidebar-logo">
      <div class="logo-mark">W</div>
      <span class="logo-name">Wired</span>
    </div>
    <div class="sidebar-body">
      <nav class="sidebar-nav sidebar-nav--global">
        <div class="nav-section-label">Global</div>
        ${globalNav.map(navItem).join('')}
      </nav>
      <nav class="sidebar-nav sidebar-nav--project">
        <div class="nav-section-label">Project</div>
        <div class="nav-project-picker ${isProjectPage ? 'active' : ''}" id="nav-project-picker">
          <div class="nav-project-picker-trigger" id="nav-project-trigger">
            ${I.folder}
            <span class="nav-project-picker-label">${STATE.currentProject ? STATE.currentProject.name : 'Select project…'}</span>
            <span class="nav-project-picker-chevron">${I.chevronRight}</span>
          </div>
          <div class="nav-project-dropdown" id="nav-project-dropdown">
            <div class="nav-project-dropdown-header">Switch project</div>
            ${DATA.projects.map(p => `
              <div class="nav-project-option ${STATE.currentProject && STATE.currentProject.id===p.id ? 'selected' : ''}" data-project-id="${p.id}">
                <span class="nav-project-option-dot" style="background:${p.color||'#6366f1'}"></span>
                <span>${p.name}</span>
              </div>
            `).join('')}
            <div class="nav-project-option nav-project-option--all" data-page="projects">
              ${I.folder}<span>All projects</span>
            </div>
          </div>
        </div>
        ${STATE.currentProject ? `
          <div class="nav-project-context">
            ${projectScopedNav.map(navItem).join('')}
          </div>` : ''}
      </nav>
    </div>
    <div class="sidebar-footer ${STATE.currentPage==='user-settings'?'active':''}" id="sidebar-user" title="Account settings">
      ${avatar(DATA.user.initials, DATA.user.color, 'sm')}
      <div>
        <div class="user-name">${DATA.user.name}</div>
        <div class="user-role">${DATA.user.role}</div>
      </div>
      <span class="sidebar-user-cog">${I.settings}</span>
    </div>`;

  document.querySelectorAll('#sidebar .nav-item[data-page]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.page));
  });
  document.getElementById('sidebar-user')?.addEventListener('click', () => navigate('user-settings'));

  document.getElementById('sidebar-toggle').addEventListener('click', () => {
    setSidebarHidden(true);
  });

  applySidebarHidden();

  // Project picker toggle
  const trigger = document.getElementById('nav-project-trigger');
  const dropdown = document.getElementById('nav-project-dropdown');
  const picker = document.getElementById('nav-project-picker');
  trigger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = picker.classList.contains('open');
    picker.classList.toggle('open');
    if (!isOpen) {
      const rect = trigger.getBoundingClientRect();
      dropdown.style.top = (rect.bottom + 4) + 'px';
      dropdown.style.left = rect.left + 'px';
      dropdown.style.width = rect.width + 'px';
    }
  });
  document.querySelectorAll('.nav-project-option[data-project-id]').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      picker.classList.remove('open');
      navigate('project-detail', +el.dataset.projectId);
    });
  });
  document.querySelector('.nav-project-option--all[data-page]')?.addEventListener('click', e => {
    e.stopPropagation();
    picker.classList.remove('open');
    navigate('projects');
  });
  document.addEventListener('click', function closePicker(e) {
    if (!picker.contains(e.target)) {
      picker.classList.remove('open');
      document.removeEventListener('click', closePicker);
    }
  });
}

// Show/hide the whole sidebar. The topbar hamburger is always visible so the
// menu can be brought back after it is hidden.
function setSidebarHidden(hidden) {
  STATE.sidebarHidden = hidden;
  try { localStorage.setItem('wiredSidebarHidden', hidden ? '1' : '0'); } catch (e) {}
  applySidebarHidden();
}

function applySidebarHidden() {
  document.getElementById('sidebar')?.classList.toggle('hidden', STATE.sidebarHidden);
  document.body.classList.toggle('sidebar-hidden', STATE.sidebarHidden);
  document.querySelectorAll('.menu-toggle-btn').forEach(btn =>
    btn.classList.toggle('active', !STATE.sidebarHidden));
}

function restoreSidebarState() {
  try { STATE.sidebarHidden = localStorage.getItem('wiredSidebarHidden') === '1'; } catch (e) {}
}

// --- TOPBAR ---
function renderTopbar(crumbs) {
  document.getElementById('topbar').innerHTML = `
    <button class="topbar-menu-btn menu-toggle-btn" id="topbar-menu-btn" title="Toggle menu">${I.menu}</button>
    <div class="topbar-breadcrumb">
      ${crumbs.map((c,i)=>`
        ${i>0?`<span class="crumb-sep">${I.chevronRight}</span>`:''}
        <span class="${i===crumbs.length-1?'crumb-active':''}" ${c.page?`style="cursor:pointer" data-page="${c.page}"`:''}>${c.label}</span>
      `).join('')}
    </div>
    <div class="topbar-search">${I.search}<span>Search...</span></div>
    <div class="topbar-actions">
      <button class="wire-btn" id="topbar-wire-btn" title="Wire — turn channel updates into action items">
        ${ico(I.zap,15)}<span>Wire!</span>
        <span class="wire-signal-badge" style="${wireBadgeCount()?'':'display:none'}">${wireBadgeCount()}</span>
      </button>
      <div class="topbar-icon-btn" title="Notifications">
        ${I.bell}
        <span class="topbar-notif-dot"></span>
      </div>
      <div class="topbar-icon-btn" title="Support" data-page="support">${I.help}</div>
      <div class="topbar-icon-btn" title="Settings" data-page="user-settings">${I.settings}</div>
    </div>`;
  document.querySelectorAll('#topbar [data-page]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.page));
  });
  document.getElementById('topbar-menu-btn')?.addEventListener('click', () => {
    setSidebarHidden(!STATE.sidebarHidden);
  });
  document.getElementById('topbar-wire-btn')?.addEventListener('click', launchWire);
  applySidebarHidden();
}

// --- ROUTER ---
function navigate(page, projectId) {
  STATE.openReport = null;
  if (page === 'project-detail' && projectId) {
    STATE.currentProject = DATA.projects.find(p=>p.id===projectId);
    STATE.currentTab = 'overview';
  }
  STATE.currentPage = page;
  persistLocation();
  renderSidebar();
  render();
}

// Persist current page/project/tab so the location survives a refresh.
function persistLocation() {
  try {
    localStorage.setItem('wiredLocation', JSON.stringify({
      page: STATE.currentPage,
      projectId: STATE.currentProject ? STATE.currentProject.id : null,
      tab: STATE.currentTab
    }));
  } catch (e) { console.error('[persistLocation]', e); }
}

function restoreLocation() {
  let saved;
  try { saved = JSON.parse(localStorage.getItem('wiredLocation') || 'null'); }
  catch (e) { return; }
  if (!saved || !saved.page) return;
  if (saved.projectId != null) {
    const proj = DATA.projects.find(p => p.id === saved.projectId);
    if (proj) STATE.currentProject = proj;
  }
  if (saved.tab) STATE.currentTab = saved.tab;
  STATE.currentPage = saved.page;
}

function render() {
  const content = document.getElementById('content');
  content.className = 'page-fade';
  // If the Notes page is hidden via settings, never land on it.
  if (STATE.currentPage === 'notes' && !DATA.user.settings.showNotes) {
    STATE.currentPage = 'dashboard';
  }
  switch(STATE.currentPage) {
    case 'dashboard': renderDashboard(); break;
    case 'risks':     renderRisks(); break;
    case 'decisions': renderDecisions(); break;
    case 'resources': renderResources(); break;
    case 'commercial': renderCommercial(); break;
    case 'quality': renderQuality(); break;
    case 'project-quality': renderQuality(true); break;
    case 'portfolio': renderPortfolioOnePager(); break;
    case 'notes':     renderNotes(); break;
    case 'issues':    renderIssues(); break;
    case 'actions':   renderActions(); break;
    case 'projects': renderProjects(); break;
    case 'project-detail': renderProjectDetail(); break;
    case 'one-pager': renderOnePager(); break;
    case 'prd':       renderPRD(); break;
    case 'approvals': renderApprovals(); break;
    case 'policies': renderPolicies(); break;
    case 'team': renderTeam(); break;
    case 'analytics': renderAnalytics(); break;
    case 'workflows': renderWorkflows(); break;
    case 'integrations': renderDataSources(); break;
    case 'reports': renderReports(); break;
    case 'workflow-builder': renderWorkflowBuilder(); break;
    case 'user-settings': renderUserSettings(); break;
    case 'support': renderSupport(); break;
    case 'wire': renderWire(); break;
    default: renderDashboard();
  }
}

// --- DASHBOARD ---
// --- ACTIONS ---
const ACTION_TYPES = ['notify','update_task_status','change_project_status','create_task','send_slack','send_email','sync','report'];
const ACTION_CATEGORIES = ['Integration','Reporting','Task Management','Escalation','Cleanup','Custom'];

function renderActions() {
  renderTopbar([{label:'Actions'}]);
  const allActions = buildActionsView();
  const automated = allActions.filter(a=>a.automationId);
  const manual = allActions.filter(a=>!a.automationId);

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Actions</div>
        <div class="page-subtitle">${allActions.length} total · ${automated.length} automated · ${manual.length} manual</div>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-secondary" id="btn-actions-filter">${I.filter} Filter</button>
        <button class="btn btn-primary" id="btn-new-action">${I.plus} New Action</button>
      </div>
    </div>

    <div class="tabs mb-5">
      <div class="tab-item ${STATE.actionsTab==='all'?'active':''}" data-atab="all">All (${allActions.length})</div>
      <div class="tab-item ${STATE.actionsTab==='automated'?'active':''}" data-atab="automated">Automated (${automated.length})</div>
      <div class="tab-item ${STATE.actionsTab==='manual'?'active':''}" data-atab="manual">Manual only (${manual.length})</div>
    </div>

    <div id="actions-list"></div>

    <div id="action-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:1000;align-items:center;justify-content:center">
      <div class="card" style="width:560px;max-width:95vw;padding:28px">
        <div class="flex items-center justify-between mb-4">
          <div style="font-weight:700;font-size:16px" id="action-modal-title">New Action</div>
          <button class="btn btn-secondary btn-sm" id="btn-action-cancel">Cancel</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label style="font-size:12px;font-weight:600;color:#475569;display:block;margin-bottom:4px">Name</label>
            <input id="act-name" type="text" placeholder="e.g. Escalate blocked tasks" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;box-sizing:border-box">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label style="font-size:12px;font-weight:600;color:#475569;display:block;margin-bottom:4px">Type</label>
              <select id="act-type" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;box-sizing:border-box">
                ${ACTION_TYPES.map(t=>`<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:#475569;display:block;margin-bottom:4px">Category</label>
              <select id="act-category" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;box-sizing:border-box">
                ${ACTION_CATEGORIES.map(c=>`<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:#475569;display:block;margin-bottom:4px">Project</label>
            <select id="act-project" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;box-sizing:border-box">
              <option value="">All Projects</option>
              ${DATA.projects.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:#475569;display:block;margin-bottom:4px">Description</label>
            <textarea id="act-desc" rows="2" placeholder="What does this action do?" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;resize:vertical;box-sizing:border-box"></textarea>
          </div>
        </div>
        <div class="flex gap-3 mt-5" style="justify-content:flex-end">
          <button class="btn btn-secondary" id="btn-action-cancel2">Cancel</button>
          <button class="btn btn-primary" id="btn-action-save">Save Action</button>
        </div>
      </div>
    </div>

    <div id="run-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:1000;align-items:center;justify-content:center">
      <div class="card" style="width:440px;max-width:95vw;padding:28px">
        <div style="font-weight:700;font-size:16px;margin-bottom:8px" id="run-modal-title">Run Action</div>
        <div style="font-size:13px;color:#64748b;margin-bottom:20px" id="run-modal-desc"></div>
        <div style="background:#f8fafc;border-radius:8px;padding:14px;margin-bottom:20px;font-size:13px">
          <div class="flex items-center gap-2 mb-2" style="font-weight:600">${ico(I.alertTriangle,14)} This will run immediately</div>
          <div style="color:#64748b">The action will execute against live project data. This cannot be undone.</div>
        </div>
        <div class="flex gap-3" style="justify-content:flex-end">
          <button class="btn btn-secondary" id="btn-run-cancel">Cancel</button>
          <button class="btn btn-primary" id="btn-run-confirm" style="background:#6366f1">${ico(I.play,13)} Run Now</button>
        </div>
      </div>
    </div>`;

  document.querySelectorAll('[data-atab]').forEach(el => {
    el.addEventListener('click', () => {
      STATE.actionsTab = el.dataset.atab;
      document.querySelectorAll('[data-atab]').forEach(t=>t.classList.remove('active'));
      el.classList.add('active');
      renderActionsList();
    });
  });

  document.getElementById('btn-new-action').addEventListener('click', () => openActionModal(null));
  document.getElementById('btn-action-cancel').addEventListener('click', closeActionModal);
  document.getElementById('btn-action-cancel2').addEventListener('click', closeActionModal);
  document.getElementById('btn-run-cancel').addEventListener('click', () => { document.getElementById('run-modal').style.display='none'; });

  document.getElementById('btn-action-save').addEventListener('click', () => {
    const name = document.getElementById('act-name').value.trim();
    if (!name) { toast('Name is required', 'warning'); return; }
    const pid = document.getElementById('act-project').value;
    const proj = pid ? DATA.projects.find(p=>p.id===+pid) : null;
    if (STATE.actionEditingId) {
      const a = DATA.actions.find(x=>x.id===STATE.actionEditingId);
      if (a) {
        a.name = name;
        a.type = document.getElementById('act-type').value;
        a.category = document.getElementById('act-category').value;
        a.project = proj ? proj.name : 'All Projects';
        a.projectId = proj ? proj.id : null;
        a.description = document.getElementById('act-desc').value.trim();
      }
      toast('Action updated', 'success');
    } else {
      DATA.actions.push({
        id: Date.now(),
        name,
        type: document.getElementById('act-type').value,
        category: document.getElementById('act-category').value,
        project: proj ? proj.name : 'All Projects',
        projectId: proj ? proj.id : null,
        description: document.getElementById('act-desc').value.trim(),
        lastRun: 'Never', runCount: 0,
        createdBy: DATA.user.initials, createdAt: '2026-06-20'
      });
      toast('Action created', 'success');
    }
    closeActionModal();
    renderActionsList();
  });

  document.getElementById('btn-run-confirm').addEventListener('click', () => {
    const id = STATE.runningActionId;
    document.getElementById('run-modal').style.display = 'none';
    const a = DATA.actions.find(x=>x.id===id) || (() => {
      const auto = DATA.automations.find(x=>x.id===id);
      return auto ? { name: auto.name } : null;
    })();
    if (a) {
      if (DATA.actions.find(x=>x.id===id)) {
        const act = DATA.actions.find(x=>x.id===id);
        act.lastRun = '2026-06-20 (just now)';
        act.runCount++;
      }
      toast(`Running: ${a.name}`, 'info');
      setTimeout(() => toast(`Completed: ${a.name}`, 'success'), 1800);
      renderActionsList();
    }
  });

  renderActionsList();
}

function buildActionsView() {
  const manual = DATA.actions.map(a => ({ ...a, automationId: null, trigger: null }));
  const automated = DATA.automations.map(a => {
    const proj = DATA.projects.find(p=>p.id===a.projectId);
    return {
      id: a.id + 10000,
      name: a.name,
      type: a.action,
      category: 'Automation',
      project: proj ? proj.name : 'Unknown',
      projectId: a.projectId,
      description: a.actionDetail,
      lastRun: a.lastRun,
      runCount: a.runCount,
      createdBy: a.createdBy,
      createdAt: a.createdAt,
      automationId: a.id,
      trigger: a.trigger,
      automationStatus: a.status
    };
  });
  return [...manual, ...automated];
}

function renderActionsList() {
  const all = buildActionsView();
  const tab = STATE.actionsTab || 'all';
  const items = tab === 'automated' ? all.filter(a=>a.automationId)
              : tab === 'manual'    ? all.filter(a=>!a.automationId)
              : all;

  const categoryColors = {
    'Integration': '#6366f1', 'Reporting': '#10b981', 'Task Management': '#f59e0b',
    'Escalation': '#ef4444', 'Cleanup': '#64748b', 'Custom': '#8b5cf6', 'Automation': '#0891b2'
  };

  document.getElementById('actions-list').innerHTML = items.length ? `
    <div class="card p-0">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid #e2e8f0">
            <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Name</th>
            <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Type / Category</th>
            <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Project</th>
            <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Mode</th>
            <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Last Run</th>
            <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Runs</th>
            <th style="padding:10px 16px"></th>
          </tr>
        </thead>
        <tbody>
          ${items.map(a => {
            const catColor = categoryColors[a.category] || '#64748b';
            const isAuto = !!a.automationId;
            return `
            <tr style="border-bottom:1px solid #f1f5f9" data-action-id="${a.id}">
              <td style="padding:12px 16px">
                <div style="font-size:13px;font-weight:500">${a.name}</div>
                <div style="font-size:12px;color:#94a3b8;margin-top:2px">${a.description}</div>
              </td>
              <td style="padding:12px 16px">
                <div style="font-size:12px;background:#f1f5f9;display:inline-block;padding:2px 8px;border-radius:4px;font-family:monospace;margin-bottom:4px">${a.type}</div>
                <div><span style="font-size:11px;background:${catColor}18;color:${catColor};padding:1px 7px;border-radius:10px;font-weight:600">${a.category}</span></div>
              </td>
              <td style="padding:12px 16px;font-size:13px;color:#475569">${a.project}</td>
              <td style="padding:12px 16px">
                ${isAuto
                  ? `<div style="display:flex;flex-direction:column;gap:4px">
                      <span style="font-size:11px;background:#0891b218;color:#0891b2;padding:2px 8px;border-radius:10px;font-weight:600">${ico(I.zap,11)} Automated</span>
                      <span style="font-size:11px;color:#94a3b8;font-family:monospace">${a.trigger}</span>
                     </div>`
                  : `<span style="font-size:11px;background:#f1f5f9;color:#475569;padding:2px 8px;border-radius:10px;font-weight:600">${ico(I.play,11)} Manual</span>`}
              </td>
              <td style="padding:12px 16px;font-size:12px;color:#64748b">${a.lastRun}</td>
              <td style="padding:12px 16px;font-size:12px;color:#64748b">${a.runCount}</td>
              <td style="padding:12px 16px;text-align:right;white-space:nowrap">
                <button class="btn btn-primary btn-sm btn-run-action" data-id="${a.id}" data-name="${a.name}" data-desc="${a.description}" style="margin-right:4px">${ico(I.play,12)} Run</button>
                ${!isAuto ? `
                  <button class="btn btn-secondary btn-sm btn-edit-action" data-id="${a.id}" style="margin-right:4px">Edit</button>
                  <button class="btn btn-secondary btn-sm btn-delete-action" data-id="${a.id}" style="color:#ef4444">Delete</button>
                ` : `
                  <button class="btn btn-secondary btn-sm" onclick="navigate('project-detail',${a.projectId});STATE.currentTab='automations';renderTabContent(STATE.currentProject)" style="font-size:11px">${ico(I.zap,11)} View Automation</button>
                `}
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>` : `
    <div class="card" style="text-align:center;padding:40px 20px;color:#94a3b8">
      <div style="font-size:32px;margin-bottom:8px">⚡</div>
      <div style="font-weight:600;margin-bottom:4px">No actions here</div>
      <div style="font-size:13px">Switch tabs or create a new action.</div>
    </div>`;

  document.querySelectorAll('.btn-run-action').forEach(btn => {
    btn.addEventListener('click', () => {
      STATE.runningActionId = +btn.dataset.id;
      document.getElementById('run-modal-title').textContent = `Run: ${btn.dataset.name}`;
      document.getElementById('run-modal-desc').textContent = btn.dataset.desc;
      document.getElementById('run-modal').style.display = 'flex';
    });
  });

  document.querySelectorAll('.btn-edit-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const a = DATA.actions.find(x=>x.id===+btn.dataset.id);
      if (a) openActionModal(a);
    });
  });

  document.querySelectorAll('.btn-delete-action').forEach(btn => {
    btn.addEventListener('click', () => {
      DATA.actions = DATA.actions.filter(x=>x.id!==+btn.dataset.id);
      toast('Action deleted', 'warning');
      renderActionsList();
    });
  });
}

function openActionModal(a) {
  STATE.actionEditingId = a ? a.id : null;
  document.getElementById('action-modal-title').textContent = a ? 'Edit Action' : 'New Action';
  document.getElementById('act-name').value = a ? a.name : '';
  document.getElementById('act-type').value = a ? a.type : ACTION_TYPES[0];
  document.getElementById('act-category').value = a ? a.category : ACTION_CATEGORIES[0];
  document.getElementById('act-project').value = a && a.projectId ? a.projectId : '';
  document.getElementById('act-desc').value = a ? a.description : '';
  document.getElementById('action-modal').style.display = 'flex';
}

function closeActionModal() {
  document.getElementById('action-modal').style.display = 'none';
}

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

    ${wireBadgeCount() ? `
    <div class="wire-signal-strip" id="wire-signal-strip">
      <div class="wire-signal-orb">${ico(I.zap,18)}</div>
      <div class="wire-signal-copy">
        <div class="wire-signal-title">${wireBadgeCount()} new signal${wireBadgeCount()===1?'':'s'} waiting to be wired</div>
        <div class="wire-signal-sub">Recent activity across Slack, email, Teams and meeting notes can be turned into action items.</div>
      </div>
      <button class="btn btn-primary" id="wire-signal-cta">${ico(I.zap,14)} Wire now</button>
    </div>` : ''}

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
  document.getElementById('wire-signal-cta')?.addEventListener('click', launchWire);
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

  const tabs = ['overview','tasks','timeline','budget','team','policies','automations','activity'];
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
      persistLocation();
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
    case 'policies':     el.innerHTML = renderPoliciesTab(p); break;
    case 'automations':  el.innerHTML = renderAutomationsTab(p); bindAutomationsTab(p); return;
    case 'activity':     el.innerHTML = renderActivityTab(p); break;
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

const AUTOMATION_TRIGGERS = ['task.overdue','task.created','task.status_changed','pull_request.merged','deployment.success','milestone.due_in_7d','milestone.missed','risk.created','budget.threshold_80'];
const AUTOMATION_ACTIONS  = ['notify','update_task_status','change_project_status','create_task','send_slack','send_email'];

function renderAutomationsTab(p) {
  const autos = DATA.automations.filter(a=>a.projectId===p.id);
  const activeCount = autos.filter(a=>a.status==='active').length;
  return `
    <div class="flex items-center justify-between mb-4">
      <span class="text-sm text-secondary">${autos.length} automation${autos.length!==1?'s':''} · ${activeCount} active</span>
      <button class="btn btn-primary btn-sm" id="btn-new-automation">${I.plus} New Automation</button>
    </div>
    ${autos.length ? `
    <div class="card p-0">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid #e2e8f0">
            <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Name</th>
            <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Trigger</th>
            <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Action</th>
            <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Status</th>
            <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Last Run</th>
            <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Runs</th>
            <th style="padding:10px 16px"></th>
          </tr>
        </thead>
        <tbody id="automations-tbody">
          ${autos.map(a => automationRow(a)).join('')}
        </tbody>
      </table>
    </div>` : `
    <div class="card" style="text-align:center;padding:40px 20px;color:#94a3b8">
      <div style="font-size:32px;margin-bottom:8px">⚡</div>
      <div style="font-weight:600;margin-bottom:4px">No automations yet</div>
      <div style="font-size:13px">Create your first automation to reduce manual work.</div>
    </div>`}
    <div id="automation-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:1000;display:none;align-items:center;justify-content:center">
      <div class="card" style="width:520px;max-width:95vw;padding:28px">
        <div class="flex items-center justify-between mb-4">
          <div style="font-weight:700;font-size:16px" id="automation-modal-title">New Automation</div>
          <button class="btn btn-secondary btn-sm" id="btn-automation-cancel">Cancel</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label style="font-size:12px;font-weight:600;color:#475569;display:block;margin-bottom:4px">Name</label>
            <input id="auto-name" type="text" placeholder="e.g. Notify on PR merged" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;box-sizing:border-box">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:#475569;display:block;margin-bottom:4px">Trigger</label>
            <select id="auto-trigger" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;box-sizing:border-box">
              ${AUTOMATION_TRIGGERS.map(t=>`<option value="${t}">${t}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:#475569;display:block;margin-bottom:4px">Condition <span style="font-weight:400;color:#94a3b8">(optional)</span></label>
            <input id="auto-condition" type="text" placeholder="e.g. priority = critical" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;box-sizing:border-box">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:#475569;display:block;margin-bottom:4px">Action</label>
            <select id="auto-action" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;box-sizing:border-box">
              ${AUTOMATION_ACTIONS.map(a=>`<option value="${a}">${a}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:#475569;display:block;margin-bottom:4px">Description</label>
            <textarea id="auto-detail" rows="2" placeholder="What does this automation do?" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;resize:vertical;box-sizing:border-box"></textarea>
          </div>
        </div>
        <div class="flex gap-3 mt-5" style="justify-content:flex-end">
          <button class="btn btn-secondary" id="btn-automation-cancel2">Cancel</button>
          <button class="btn btn-primary" id="btn-automation-save">Save Automation</button>
        </div>
      </div>
    </div>`;
}

function automationRow(a) {
  const statusColor = a.status==='active' ? '#10b981' : '#94a3b8';
  return `
    <tr data-auto-id="${a.id}" style="border-bottom:1px solid #f1f5f9">
      <td style="padding:12px 16px;font-size:13px;font-weight:500">${a.name}</td>
      <td style="padding:12px 16px"><span style="font-size:12px;background:#f1f5f9;padding:2px 8px;border-radius:4px;font-family:monospace">${a.trigger}</span></td>
      <td style="padding:12px 16px"><span style="font-size:12px;background:#f1f5f9;padding:2px 8px;border-radius:4px;font-family:monospace">${a.action}</span></td>
      <td style="padding:12px 16px">
        <span class="auto-status-badge" style="font-size:12px;background:${statusColor}18;color:${statusColor};padding:2px 10px;border-radius:12px;font-weight:600;cursor:pointer" data-auto-id="${a.id}">${a.status}</span>
      </td>
      <td style="padding:12px 16px;font-size:12px;color:#64748b">${a.lastRun}</td>
      <td style="padding:12px 16px;font-size:12px;color:#64748b">${a.runCount}</td>
      <td style="padding:12px 16px;text-align:right">
        <button class="btn btn-secondary btn-sm btn-edit-auto" data-auto-id="${a.id}" style="margin-right:4px">Edit</button>
        <button class="btn btn-secondary btn-sm btn-delete-auto" data-auto-id="${a.id}" style="color:#ef4444">Delete</button>
      </td>
    </tr>`;
}

function bindAutomationsTab(p) {
  let editingId = null;

  function openModal(auto) {
    editingId = auto ? auto.id : null;
    document.getElementById('automation-modal-title').textContent = auto ? 'Edit Automation' : 'New Automation';
    document.getElementById('auto-name').value = auto ? auto.name : '';
    document.getElementById('auto-trigger').value = auto ? auto.trigger : AUTOMATION_TRIGGERS[0];
    document.getElementById('auto-condition').value = auto ? auto.condition : '';
    document.getElementById('auto-action').value = auto ? auto.action : AUTOMATION_ACTIONS[0];
    document.getElementById('auto-detail').value = auto ? auto.actionDetail : '';
    document.getElementById('automation-modal').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('automation-modal').style.display = 'none';
  }

  function refreshTable() {
    const autos = DATA.automations.filter(a=>a.projectId===p.id);
    const tbody = document.getElementById('automations-tbody');
    if (tbody) tbody.innerHTML = autos.map(a=>automationRow(a)).join('');
    rebindRows();
  }

  function rebindRows() {
    document.querySelectorAll('.auto-status-badge').forEach(el => {
      el.onclick = () => {
        const id = +el.dataset.autoId;
        const a = DATA.automations.find(x=>x.id===id);
        if (a) { a.status = a.status==='active' ? 'paused' : 'active'; refreshTable(); }
      };
    });
    document.querySelectorAll('.btn-edit-auto').forEach(el => {
      el.onclick = () => { const a = DATA.automations.find(x=>x.id===+el.dataset.autoId); openModal(a); };
    });
    document.querySelectorAll('.btn-delete-auto').forEach(el => {
      el.onclick = () => {
        const id = +el.dataset.autoId;
        DATA.automations = DATA.automations.filter(x=>x.id!==id);
        refreshTable();
        toast('Automation deleted', 'warning');
      };
    });
  }

  document.getElementById('btn-new-automation')?.addEventListener('click', () => openModal(null));
  document.getElementById('btn-automation-cancel')?.addEventListener('click', closeModal);
  document.getElementById('btn-automation-cancel2')?.addEventListener('click', closeModal);

  document.getElementById('btn-automation-save')?.addEventListener('click', () => {
    const name = document.getElementById('auto-name').value.trim();
    if (!name) { toast('Name is required', 'warning'); return; }
    if (editingId) {
      const a = DATA.automations.find(x=>x.id===editingId);
      if (a) {
        a.name = name;
        a.trigger = document.getElementById('auto-trigger').value;
        a.condition = document.getElementById('auto-condition').value.trim();
        a.action = document.getElementById('auto-action').value;
        a.actionDetail = document.getElementById('auto-detail').value.trim();
      }
      toast('Automation updated', 'success');
    } else {
      const newAuto = {
        id: Date.now(), projectId: p.id,
        name,
        trigger: document.getElementById('auto-trigger').value,
        condition: document.getElementById('auto-condition').value.trim(),
        action: document.getElementById('auto-action').value,
        actionTarget: null,
        actionDetail: document.getElementById('auto-detail').value.trim(),
        status: 'active', lastRun: 'Never', runCount: 0,
        createdBy: DATA.user.initials, createdAt: '2026-06-20'
      };
      DATA.automations.push(newAuto);
      toast('Automation created', 'success');
    }
    closeModal();
    refreshTable();
  });

  rebindRows();
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

// --- WIRE (channels → actionable items) ---
// The "Wire!" button ingests recent messages from connected communication
// channels and translates them into new or updated work items. Two modes:
//  · semi-auto (default): every change is applied only after per-item consent
//  · auto: changes are applied immediately, then shown for review with Undo
const WIRE_CHANNELS = {
  slack:   { label: 'Slack',         color: '#4A154B', tag: '#' },
  email:   { label: 'Email',         color: '#EA4335', tag: '@' },
  teams:   { label: 'MS Teams',      color: '#4B53BC', tag: 'T' },
  meeting: { label: 'Meeting notes', color: '#0891B2', tag: '●' }
};
const WIRE_ENTITY = {
  risk:     { label: 'Risk',     icon: I.shield,      color: '#EF4444' },
  issue:    { label: 'Issue',    icon: I.issues,      color: '#F59E0B' },
  approval: { label: 'Approval', icon: I.check,       color: '#0891B2' },
  task:     { label: 'Task',     icon: I.checkSquare, color: '#6366F1' },
  decision: { label: 'Decision', icon: I.gitBranch,   color: '#8B5CF6' }
};

// Count of signals waiting to be wired: live pending count once a scan exists,
// otherwise the seed count of unreviewed channel activity.
function wireBadgeCount() {
  if (STATE.wireProposals) return STATE.wireProposals.filter(p => p.status === 'pending').length;
  return STATE.wireSignals || 0;
}
// Sync the topbar-button and sidebar badges in place, without a full re-render.
function updateWireBadges() {
  const n = wireBadgeCount();
  document.querySelectorAll('.wire-signal-badge').forEach(el => {
    el.textContent = n;
    el.style.display = n > 0 ? '' : 'none';
  });
}

let _wireSeq = 9000;
function _wireId() { return ++_wireSeq; }
function _wireToday() { return new Date().toISOString().slice(0, 10); }
function _teamColor(initials) {
  const m = DATA.team.find(t => t.initials === initials);
  return m ? m.color : '#6366f1';
}
function _cap(s) { return typeof s === 'string' && s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

// Fresh set of proposals each run — a mock "AI extraction" from connected channels.
function buildWireProposals() {
  return [
    { id: 'w1', channel: 'slack', author: 'Jordan Davis', authorColor: '#f59e0b', when: '8 min ago',
      raw: 'Client just told us the teal palette is a no-go — we are blocked until they sign off on the indigo direction.',
      confidence: 'high', op: 'create', entity: 'risk', projectId: 2, project: 'Brand Refresh', status: 'pending',
      payload: { risk: { desc: 'Client rejected teal palette — blocked pending indigo sign-off', severity: 'high', owner: 'JD' } } },

    { id: 'w2', channel: 'email', author: 'Priya Shah · Sponsor', authorColor: '#6366f1', when: '22 min ago',
      raw: 'Please treat the Safari login crash as the top priority for this sprint — it is blocking our enterprise pilot.',
      confidence: 'high', op: 'update', entity: 'issue', projectId: 4, project: 'Mobile App v2', status: 'pending',
      payload: { ref: { issueId: 1 }, changes: { status: 'in-progress' },
        targetLabel: 'Login page crashes on Safari 17', changeLabel: 'Status → In Progress',
        title: 'Escalate Safari login crash to active work' } },

    { id: 'w3', channel: 'slack', author: 'Sam Rivera', authorColor: '#10b981', when: '35 min ago',
      raw: 'Load testing finished — benchmarks all passed, p95 well under target. Calling it done.',
      confidence: 'high', op: 'update', entity: 'task', projectId: 1, project: 'Alpha Launch', status: 'pending',
      payload: { ref: { projectId: 1, taskId: 3 }, changes: { status: 'done' },
        targetLabel: 'Load testing & benchmarks', changeLabel: 'Status → Done',
        title: 'Mark load testing & benchmarks complete' } },

    { id: 'w4', channel: 'meeting', author: 'Architecture sync', authorColor: '#0891b2', when: '1h ago',
      raw: 'We agreed the public API needs rate limiting before the beta opens up — Sam to own it, target mid-August.',
      confidence: 'medium', op: 'create', entity: 'issue', projectId: 3, project: 'Data Platform', status: 'pending',
      payload: { issue: { title: 'Add rate limiting to public API endpoints', type: 'feature', priority: 'high',
        assignee: 'SR', due: '2026-08-20', labels: ['api', 'backend'],
        description: 'Introduce request rate limiting on public API endpoints ahead of the beta opening.' } } },

    { id: 'w5', channel: 'email', author: 'Dana Lee · Finance', authorColor: '#0891b2', when: '2h ago',
      raw: 'Partner Portal has now consumed 82% of its budget. No further spend should be committed without PM sign-off.',
      confidence: 'high', op: 'create', entity: 'approval', projectId: 6, project: 'Partner Portal', status: 'pending',
      payload: { approval: { title: 'Approve continued spend — Partner Portal at 82% budget',
        desc: 'Finance flagged that Partner Portal has consumed 82% of its budget. PM sign-off required before committing further spend.',
        policy: 'Budget Warning', action: 'notify', urgency: 'normal' } } },

    { id: 'w6', channel: 'teams', author: 'Taylor Kim', authorColor: '#8b5cf6', when: '3h ago',
      raw: 'Heads up — Android 14 push notifications are still failing after the background policy change. This could slip the beta.',
      confidence: 'medium', op: 'create', entity: 'risk', projectId: 4, project: 'Mobile App v2', status: 'pending',
      payload: { risk: { desc: 'Android 14 push failures may slip the beta build', severity: 'high', owner: 'TK' } } },

    { id: 'w7', channel: 'meeting', author: 'Compliance follow-up', authorColor: '#06b6d4', when: '5h ago',
      raw: 'Action item: schedule the SOC2 evidence refresh so we are ready for the next audit window.',
      confidence: 'low', op: 'create', entity: 'task', projectId: 5, project: 'Compliance Audit', status: 'pending',
      payload: { task: { name: 'Schedule SOC2 evidence refresh', assignee: 'LM', priority: 'medium', status: 'todo', due: '2026-07-20' } } }
  ];
}

// Path helpers operate on p.payload using dot notation (e.g. 'risk.severity').
function wireGet(p, path) { return path.split('.').reduce((o, k) => (o == null ? o : o[k]), p.payload); }
function wireSet(p, path, val) {
  const ks = path.split('.'); const last = ks.pop();
  let o = p.payload; ks.forEach(k => { o = o[k]; });
  o[last] = val;
}

// Derive display (title + editable fields) from the canonical payload.
function wireDescribe(p) {
  if (p.op === 'update') {
    return { title: p.payload.title, titlePath: null, fields: [
      { k: 'Target', v: p.payload.targetLabel },
      { k: 'Change', v: p.payload.changeLabel }
    ] };
  }
  const o = p.payload[p.entity];
  const sev = ['low', 'medium', 'high'];
  const pri = ['low', 'medium', 'high', 'critical'];
  switch (p.entity) {
    case 'risk': return { title: o.desc, titlePath: 'risk.desc', fields: [
      { k: 'Severity', v: _cap(o.severity), path: 'risk.severity', enum: sev },
      { k: 'Owner',    v: o.owner,          path: 'risk.owner' }
    ] };
    case 'issue': return { title: o.title, titlePath: 'issue.title', fields: [
      { k: 'Type',     v: _cap(o.type),     path: 'issue.type' },
      { k: 'Priority', v: _cap(o.priority), path: 'issue.priority', enum: pri },
      { k: 'Assignee', v: o.assignee,       path: 'issue.assignee' },
      { k: 'Due',      v: o.due,            path: 'issue.due' }
    ] };
    case 'approval': return { title: o.title, titlePath: 'approval.title', fields: [
      { k: 'Urgency', v: _cap(o.urgency), path: 'approval.urgency', enum: ['normal', 'critical'] },
      { k: 'Policy',  v: o.policy,        path: 'approval.policy' }
    ] };
    case 'task': return { title: o.name, titlePath: 'task.name', fields: [
      { k: 'Priority', v: _cap(o.priority), path: 'task.priority', enum: pri },
      { k: 'Assignee', v: o.assignee,       path: 'task.assignee' },
      { k: 'Due',      v: o.due,            path: 'task.due' }
    ] };
    default: return { title: p.id, titlePath: null, fields: [] };
  }
}

// Apply a proposal to live DATA and remember how to undo it.
function applyWireProposal(p) {
  if (!p || p.status === 'applied') return;
  if (p.op === 'create') {
    if (p.entity === 'risk') {
      const proj = DATA.projects.find(x => x.id === p.projectId); if (!proj) return;
      if (!proj.risks) proj.risks = [];
      const r = { id: _wireId(), desc: p.payload.risk.desc, severity: p.payload.risk.severity, owner: p.payload.risk.owner, open: true };
      proj.risks.push(r);
      p._undo = () => { const i = proj.risks.indexOf(r); if (i >= 0) proj.risks.splice(i, 1); };
    } else if (p.entity === 'issue') {
      const o = p.payload.issue;
      const it = { id: _wireId(), title: o.title, type: o.type, status: 'open', priority: o.priority,
        project: p.project, projectId: p.projectId, assignee: o.assignee, assigneeColor: _teamColor(o.assignee),
        reporter: DATA.user.initials, created: _wireToday(), updated: _wireToday(), due: o.due,
        labels: o.labels || [], description: o.description || '' };
      DATA.issues.push(it);
      p._undo = () => { const i = DATA.issues.indexOf(it); if (i >= 0) DATA.issues.splice(i, 1); };
    } else if (p.entity === 'approval') {
      const o = p.payload.approval;
      const ap = { id: _wireId(), title: o.title, desc: o.desc, policy: o.policy, project: p.project,
        projectId: p.projectId, action: o.action || 'notify', urgency: o.urgency, age: 'just now' };
      DATA.approvals.push(ap);
      p._undo = () => { const i = DATA.approvals.indexOf(ap); if (i >= 0) DATA.approvals.splice(i, 1); };
    } else if (p.entity === 'task') {
      const o = p.payload.task;
      if (!DATA.tasks[p.projectId]) DATA.tasks[p.projectId] = [];
      const t = { id: _wireId(), name: o.name, assignee: o.assignee, assigneeColor: _teamColor(o.assignee),
        status: o.status || 'todo', priority: o.priority, due: o.due };
      DATA.tasks[p.projectId].push(t);
      const proj = DATA.projects.find(x => x.id === p.projectId);
      if (proj && proj.tasks) proj.tasks.total++;
      p._undo = () => {
        const arr = DATA.tasks[p.projectId] || []; const i = arr.indexOf(t); if (i >= 0) arr.splice(i, 1);
        if (proj && proj.tasks) proj.tasks.total--;
      };
    }
  } else { // update
    let target = null;
    if (p.entity === 'issue') target = DATA.issues.find(i => i.id === p.payload.ref.issueId);
    else if (p.entity === 'task') target = (DATA.tasks[p.payload.ref.projectId] || []).find(t => t.id === p.payload.ref.taskId);
    if (target) {
      const prev = {};
      Object.keys(p.payload.changes).forEach(k => { prev[k] = target[k]; target[k] = p.payload.changes[k]; });
      if ('updated' in target) target.updated = _wireToday();
      p._undo = () => { Object.keys(prev).forEach(k => { target[k] = prev[k]; }); };
    }
  }
  p.status = 'applied';
}

function undoWireProposal(p) {
  if (!p || p.status !== 'applied') return;
  if (typeof p._undo === 'function') p._undo();
  p._undo = null;
  p.status = 'pending';
}

function launchWire() {
  STATE.wireProposals = buildWireProposals();
  STATE.wireAnalyzing = true;
  navigate('wire');
}

function renderWire() {
  renderTopbar([{ label: 'Wire' }]);
  const content = document.getElementById('content');
  if (!STATE.wireProposals) { STATE.wireProposals = buildWireProposals(); STATE.wireAnalyzing = true; }

  if (STATE.wireAnalyzing) {
    const chans = DATA.integrations.filter(i => i.status === 'connected');
    content.innerHTML = `
      <div class="wire-analyzing">
        <div class="wire-scan-orb">${ico(I.zap, 30)}</div>
        <div class="wire-scan-title">Analyzing your channels…</div>
        <div class="wire-scan-sub">Reading recent Slack, email, Teams and meeting activity for anything that needs to become an action.</div>
        <div class="wire-scan-chips">
          ${['Slack', 'Email', 'MS Teams', 'Meeting notes'].map(c => `<span class="wire-scan-chip">${c}</span>`).join('')}
        </div>
      </div>`;
    setTimeout(() => {
      if (STATE.currentPage !== 'wire' || !STATE.wireAnalyzing) return;
      STATE.wireAnalyzing = false;
      if (DATA.user.settings.wireMode === 'auto') {
        STATE.wireProposals.forEach(applyWireProposal);
        renderSidebar();
      }
      renderWire();
    }, 1200);
    return;
  }
  renderWireReview();
}

function wireCard(p) {
  const ch = WIRE_CHANNELS[p.channel] || WIRE_CHANNELS.slack;
  const ent = WIRE_ENTITY[p.entity];
  const d = wireDescribe(p);
  const editable = p.status === 'pending';

  const titleHtml = (editable && d.titlePath)
    ? `<span class="wire-editable wire-card-title" data-wid="${p.id}" data-path="${d.titlePath}">${escapeHtml(d.title)}</span>`
    : `<span class="wire-card-title">${escapeHtml(d.title)}</span>`;

  const fields = d.fields.map(f => {
    let val;
    if (f.enum && editable) {
      val = `<span class="wire-enum" data-wid="${p.id}" data-path="${f.path}" data-enum="${f.enum.join(',')}">${escapeHtml(f.v)} ${ico(I.chevronRight, 10)}</span>`;
    } else if (editable && f.path) {
      val = `<span class="wire-editable wire-field-v" data-wid="${p.id}" data-path="${f.path}">${escapeHtml(f.v)}</span>`;
    } else {
      val = `<span class="wire-field-v">${escapeHtml(f.v)}</span>`;
    }
    return `<div class="wire-field"><span class="wire-field-k">${f.k}</span>${val}</div>`;
  }).join('');

  let actions = '';
  if (p.status === 'pending') {
    actions = `
      <button class="btn btn-success btn-sm" data-wire-accept="${p.id}">${ico(I.check, 13)} Accept</button>
      <button class="btn btn-secondary btn-sm" data-wire-dismiss="${p.id}">Dismiss</button>`;
  } else if (p.status === 'applied') {
    actions = `
      <span class="wire-tag wire-tag-applied">${ico(I.checkCircle, 13)} Applied</span>
      <button class="btn btn-ghost btn-sm" data-wire-view="${p.id}">View ${ico(I.arrowRight, 12)}</button>
      <button class="btn btn-secondary btn-sm" data-wire-undo="${p.id}">Undo</button>`;
  } else {
    actions = `
      <span class="wire-tag wire-tag-dismissed">Dismissed</span>
      <button class="btn btn-secondary btn-sm" data-wire-restore="${p.id}">Restore</button>`;
  }

  return `
    <div class="wire-card wire-card--${p.status}" data-wid="${p.id}">
      <div class="wire-card-head">
        <span class="wire-op wire-op--${p.op}">${p.op === 'create' ? 'New' : 'Update'}</span>
        <span class="wire-entity" style="color:${ent.color}">${ico(ent.icon, 13)} ${ent.label}</span>
        <span class="wire-proj">${ico(I.folder, 12)} ${escapeHtml(p.project)}</span>
        <span class="wire-conf wire-conf--${p.confidence}">${_cap(p.confidence)} confidence</span>
      </div>
      <div class="wire-card-body">
        ${titleHtml}
        <div class="wire-fields">${fields}</div>
      </div>
      <div class="wire-source">
        <span class="wire-chan" style="background:${ch.color}"><span class="wire-chan-tag">${ch.tag}</span>${ch.label}</span>
        <span class="wire-src-meta"><strong style="color:${p.authorColor}">${escapeHtml(p.author)}</strong> · ${p.when}</span>
        <div class="wire-raw">“${escapeHtml(p.raw)}”</div>
      </div>
      <div class="wire-card-actions">${actions}</div>
    </div>`;
}

function renderWireReview() {
  const ps = STATE.wireProposals || [];
  const pending = ps.filter(p => p.status === 'pending');
  const applied = ps.filter(p => p.status === 'applied');
  const dismissed = ps.filter(p => p.status === 'dismissed');
  const mode = DATA.user.settings.wireMode;

  const order = { pending: 0, applied: 1, dismissed: 2 };
  const sorted = [...ps].sort((a, b) => order[a.status] - order[b.status]);

  const banner = mode === 'auto'
    ? `<div class="wire-banner wire-banner--auto">${ico(I.zap, 15)}<div><strong>Automatic mode.</strong> ${applied.length} change${applied.length === 1 ? '' : 's'} ${applied.length ? 'were applied automatically' : 'to apply'}. Review below and undo anything that looks off.</div></div>`
    : `<div class="wire-banner wire-banner--semi">${ico(I.info, 15)}<div><strong>Semi-automatic mode.</strong> Nothing changes until you approve it. Review each item, edit the details if needed, then Accept or Dismiss.</div></div>`;

  const modeToggle = `
    <div class="wire-mode">
      <span class="wire-mode-label">Mode</span>
      <div class="us-segment" data-segment="wireMode" id="wire-mode-seg">
        <button class="us-seg-btn ${mode === 'semi-auto' ? 'active' : ''}" data-val="semi-auto">Semi-auto</button>
        <button class="us-seg-btn ${mode === 'auto' ? 'active' : ''}" data-val="auto">Auto</button>
      </div>
    </div>`;

  const bulk = (mode !== 'auto' && pending.length) ? `
    <div class="wire-bulk">
      <button class="btn btn-primary btn-sm" id="wire-accept-all">${ico(I.check, 13)} Accept all (${pending.length})</button>
      <button class="btn btn-secondary btn-sm" id="wire-dismiss-all">Dismiss all</button>
    </div>` : '';

  const body = ps.length ? `
    <div class="wire-summary">
      <span class="wire-stat"><strong>${pending.length}</strong> pending</span>
      <span class="wire-stat"><strong>${applied.length}</strong> applied</span>
      <span class="wire-stat"><strong>${dismissed.length}</strong> dismissed</span>
    </div>
    ${bulk}
    <div class="wire-list">${sorted.map(wireCard).join('')}</div>`
    : `<div class="empty-state"><div class="empty-state-icon">✓</div>
        <div class="empty-state-title">Nothing to wire</div>
        <div class="empty-state-desc">No new signals were found across your channels. Check back after the next round of updates.</div></div>`;

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Wire Review</div>
        <div class="page-subtitle">Changes translated from your communication channels</div>
      </div>
      <div class="flex items-center gap-3">
        ${modeToggle}
        <button class="btn btn-secondary" id="wire-rescan">${ico(I.refreshCw, 14)} Re-scan</button>
        <button class="btn btn-primary" id="wire-done">Done</button>
      </div>
    </div>
    ${banner}
    ${body}`;

  bindWireReview();
}

function bindWireReview() {
  const root = document.getElementById('content');
  const find = id => (STATE.wireProposals || []).find(p => p.id === id);

  root.querySelectorAll('[data-wire-accept]').forEach(b => b.addEventListener('click', () => {
    applyWireProposal(find(b.dataset.wireAccept)); renderSidebar(); toast('Change applied'); renderWireReview();
  }));
  root.querySelectorAll('[data-wire-dismiss]').forEach(b => b.addEventListener('click', () => {
    const p = find(b.dataset.wireDismiss); if (p) p.status = 'dismissed'; renderWireReview();
  }));
  root.querySelectorAll('[data-wire-undo]').forEach(b => b.addEventListener('click', () => {
    undoWireProposal(find(b.dataset.wireUndo)); renderSidebar(); toast('Change reverted'); renderWireReview();
  }));
  root.querySelectorAll('[data-wire-restore]').forEach(b => b.addEventListener('click', () => {
    const p = find(b.dataset.wireRestore); if (p) p.status = 'pending'; renderWireReview();
  }));
  root.querySelectorAll('[data-wire-view]').forEach(b => b.addEventListener('click', () => wireView(find(b.dataset.wireView))));

  root.querySelector('#wire-accept-all')?.addEventListener('click', () => {
    (STATE.wireProposals || []).filter(p => p.status === 'pending').forEach(applyWireProposal);
    renderSidebar(); toast('All changes applied'); renderWireReview();
  });
  root.querySelector('#wire-dismiss-all')?.addEventListener('click', () => {
    (STATE.wireProposals || []).filter(p => p.status === 'pending').forEach(p => { p.status = 'dismissed'; });
    renderWireReview();
  });
  root.querySelector('#wire-rescan')?.addEventListener('click', launchWire);
  root.querySelector('#wire-done')?.addEventListener('click', () => navigate('dashboard'));

  // Mode toggle: switching to auto applies any still-pending items.
  root.querySelector('#wire-mode-seg')?.querySelectorAll('[data-val]').forEach(btn => btn.addEventListener('click', () => {
    const val = btn.dataset.val;
    if (DATA.user.settings.wireMode === val) return;
    DATA.user.settings.wireMode = val;
    saveUserSettings();
    if (val === 'auto') {
      (STATE.wireProposals || []).filter(p => p.status === 'pending').forEach(applyWireProposal);
      renderSidebar();
    }
    toast('Wire mode: ' + (val === 'auto' ? 'Automatic' : 'Semi-automatic'));
    renderWireReview();
  }));

  // Enum badges cycle to the next value.
  root.querySelectorAll('.wire-enum').forEach(el => el.addEventListener('click', () => {
    const p = find(el.dataset.wid); if (!p) return;
    const vals = el.dataset.enum.split(',');
    const cur = wireGet(p, el.dataset.path);
    wireSet(p, el.dataset.path, vals[(vals.indexOf(cur) + 1) % vals.length]);
    renderWireReview();
  }));

  // Keep the topbar-button and sidebar signal badges in sync with pending count.
  updateWireBadges();

  // Click-to-edit text (title, owner, assignee, due, etc.).
  root.querySelectorAll('.wire-editable').forEach(span => span.addEventListener('click', () => {
    const p = find(span.dataset.wid); if (!p) return;
    const path = span.dataset.path;
    const current = wireGet(p, path) || '';
    const input = document.createElement('input');
    input.type = 'text'; input.value = current; input.className = 'wire-edit-input';
    span.replaceWith(input); input.focus(); input.select();
    let done = false;
    const commit = save => {
      if (done) return; done = true;
      if (save) { const v = input.value.trim(); if (v) wireSet(p, path, v); }
      renderWireReview();
    };
    input.addEventListener('blur', () => commit(true));
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
      if (e.key === 'Escape') { done = true; renderWireReview(); }
    });
  }));
}

function wireView(p) {
  if (!p) return;
  const proj = DATA.projects.find(x => x.id === p.projectId);
  if (proj) STATE.currentProject = proj;
  if (p.entity === 'task') { STATE.currentTab = 'tasks'; navigate('project-detail', p.projectId); return; }
  const pageMap = { risk: 'risks', issue: 'issues', approval: 'approvals', decision: 'decisions' };
  navigate(pageMap[p.entity] || 'dashboard');
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

// --- SUPPORT ---
function renderSupport() {
  renderTopbar([{label:'Support'}]);
  const channels = [
    { icon: I.info, title:'Help Center', desc:'Browse guides, FAQs, and product documentation.', action:'Open docs' },
    { icon: I.users, title:'Contact Support', desc:'Reach our team — typical reply within a few hours.', action:'Start a ticket' },
    { icon: I.zap, title:"What's New", desc:'See the latest features, fixes, and release notes.', action:'View changelog' },
  ];
  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Support</div>
        <div class="page-subtitle">Get help, contact our team, or browse documentation</div>
      </div>
    </div>
    <div class="grid-projects">
      ${channels.map(c=>`
        <div class="member-card" style="align-items:flex-start;text-align:left;gap:10px">
          <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:#eef2ff;color:#6366f1">${c.icon}</div>
          <div class="member-name">${c.title}</div>
          <div class="text-sm text-muted">${c.desc}</div>
          <button class="btn btn-secondary mt-2">${c.action}</button>
        </div>
      `).join('')}
    </div>`;
}

// --- TEAM ---
function renderTeam() {
  renderTopbar([{label:'Team'}]);
  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div><div class="page-title">Team</div><div class="page-subtitle">${DATA.team.length} members</div></div>
      <div class="page-actions">
        <div class="view-toggle" id="team-view-toggle">
          <button class="view-toggle-btn ${STATE.teamView==='table'?'active':''}" data-teamview="table" title="Table view">${ico(I.list,16)}</button>
          <button class="view-toggle-btn ${STATE.teamView==='grid'?'active':''}" data-teamview="grid" title="Card view">${ico(I.grid,16)}</button>
        </div>
        <button class="btn btn-primary">${I.plus} Invite Member</button>
      </div>
    </div>
    ${STATE.teamView==='grid' ? renderTeamGrid() : renderTeamTable()}`;

  document.querySelectorAll('#team-view-toggle [data-teamview]').forEach(btn => {
    btn.addEventListener('click', () => { STATE.teamView = btn.dataset.teamview; renderTeam(); });
  });
}

function renderTeamGrid() {
  return `
    <div class="grid-projects">
      ${DATA.team.map(m=>`
        <div class="member-card">
          ${avatar(m.initials, m.color, 'lg')}
          <div class="member-name">${m.name}</div>
          <div class="member-role">${m.role}</div>
          <div class="member-meta">
            <span class="member-team-badge" style="--badge-color:${m.color}">${m.team}</span>
            <span class="member-dept">${m.department}</span>
          </div>
          <div class="member-stat">${ico(I.folder)}${m.projects} projects</div>
          <div class="workload-bar w-full">
            <div class="workload-fill ${m.capacity>100?'workload-over':m.capacity>75?'workload-high':'workload-normal'}" style="width:${Math.min(100,m.capacity)}%"></div>
          </div>
          <div class="text-xs text-muted">${m.capacity}% capacity ${m.capacity>100?'⚠':''}</div>
        </div>
      `).join('')}
    </div>`;
}

function renderTeamTable() {
  return `
    <div class="table-wrapper team-table-wrap">
      <table>
        <thead><tr><th>Member</th><th>Role</th><th>Team</th><th>Department</th><th>Email</th><th>Projects</th><th>Capacity</th></tr></thead>
        <tbody>
          ${DATA.team.map(m=>{
            const over = m.capacity > 100;
            return `<tr>
              <td><div class="flex items-center gap-2">${avatar(m.initials,m.color,'sm')}<span class="font-semibold">${m.name}</span></div></td>
              <td class="text-secondary">${m.role}</td>
              <td><span class="member-team-badge" style="--badge-color:${m.color}">${m.team}</span></td>
              <td class="text-secondary">${m.department}</td>
              <td class="text-muted">${m.email}</td>
              <td class="text-secondary">${m.projects}</td>
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

// --- QUALITY ---
// Map a test-plan status to a badge class + label.
function qualityStatusBadge(status) {
  const map = {
    'passed':      ['badge-completed', 'Passed'],
    'failed':      ['badge-critical',  'Failed'],
    'in-progress': ['badge-active',    'In Progress'],
    'blocked':     ['badge-on-hold',   'Blocked'],
    'pending':     ['badge-pending',   'Pending'],
    'draft':       ['badge-planning',  'Draft']
  };
  const [cls, label] = map[status] || ['badge-gray', status];
  return `<span class="badge ${cls}"><span class="badge-dot"></span>${label}</span>`;
}

// Representative (capped) test cases + steps generated from a plan's result
// counts, so every plan can drill down: plan → level-1 cases → level-2 steps.
const QUALITY_CASE_TITLES = [
  'Happy path — primary flow completes successfully',
  'Input validation — invalid values are rejected',
  'Boundary — edge and limit values are handled',
  'Authorization — unauthorized access is blocked',
  'Error handling — graceful failure on server error',
  'Regression — previously fixed defect stays fixed'
];
const QUALITY_STEP_TEMPLATES = [
  ['Open the feature under a clean session', 'Feature loads with no console errors'],
  ['Enter the required input data', 'Fields accept and validate the input'],
  ['Trigger the primary action', 'Request is dispatched and acknowledged'],
  ['Verify the resulting UI state', 'Outcome matches the expected result'],
  ['Reload and re-check the record', 'State is persisted correctly']
];

function buildTestCases(plan) {
  if (plan._cases) return plan._cases;
  const t = plan.tests;
  // Flatten counts into a status bucket, surfacing fails/blocks first.
  const bucket = [];
  const push = (status, n) => { for (let i = 0; i < n; i++) bucket.push(status); };
  push('failed', t.failed); push('blocked', t.blocked);
  push('pending', t.pending); push('passed', t.passed);

  const CAP = 6;
  let sample = bucket;
  if (bucket.length > CAP) {
    const nonPass = bucket.filter(s => s !== 'passed').slice(0, CAP - 1);
    sample = nonPass.concat(bucket.filter(s => s === 'passed').slice(0, CAP - nonPass.length));
  }

  const cases = sample.map((status, idx) => {
    const nSteps = 3 + (idx % 3); // 3–5 steps
    const steps = [];
    for (let s = 0; s < nSteps; s++) {
      const [action, expected] = QUALITY_STEP_TEMPLATES[s % QUALITY_STEP_TEMPLATES.length];
      let st = 'passed';
      if (status === 'pending') st = 'pending';
      else if (status !== 'passed' && s === nSteps - 1) st = status; // last step carries the fail/block
      steps.push({ n: s + 1, action, expected, status: st });
    }
    return { id: `${plan.id}-${idx + 1}`, code: `TC-${String(idx + 1).padStart(2, '0')}`,
             title: QUALITY_CASE_TITLES[idx % QUALITY_CASE_TITLES.length], status, steps };
  });

  plan._cases = { cases, total: t.total };
  return plan._cases;
}

// Level-1 cases (each expandable to its level-2 steps) for one plan.
function qualityCasesMarkup(plan) {
  const { cases, total } = buildTestCases(plan);
  return `
    <div class="quality-cases">
      <div class="quality-cases-label">Test cases</div>
      ${cases.map(c => `
        <div class="quality-case">
          <div class="quality-case-head" data-case-toggle>
            <span class="tree-toggle">${I.chevronRight}</span>
            <span class="quality-case-code">${c.code}</span>
            <span class="quality-case-title">${escapeHtml(c.title)}</span>
            ${qualityStatusBadge(c.status)}
            <span class="text-xs text-muted quality-case-steps-count">${c.steps.length} steps</span>
          </div>
          <div class="quality-steps hidden">
            <table class="quality-steps-table">
              <thead><tr><th style="width:44px">#</th><th>Step</th><th>Expected result</th><th style="width:110px">Status</th></tr></thead>
              <tbody>
                ${c.steps.map(s => `
                  <tr>
                    <td class="text-muted">${s.n}</td>
                    <td>${escapeHtml(s.action)}</td>
                    <td class="text-secondary">${escapeHtml(s.expected)}</td>
                    <td>${qualityStatusBadge(s.status)}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>`).join('')}
      <div class="quality-cases-footer">Showing ${cases.length} of ${total} test cases</div>
    </div>`;
}

// Horizontal pass/fail/blocked/pending distribution bar for a plan's tests.
function qualityResultBar(t) {
  const total = t.total || 1;
  const seg = (n, color) => n > 0 ? `<div style="width:${(n/total)*100}%;background:${color}" title="${n}"></div>` : '';
  return `<div class="quality-result-bar">
    ${seg(t.passed, '#10b981')}${seg(t.failed, '#ef4444')}${seg(t.blocked, '#f59e0b')}${seg(t.pending, '#cbd5e1')}
  </div>`;
}

// scoped=true → limit to the current project (project-context entry point);
// otherwise show the full portfolio of test plans.
function renderQuality(scoped) {
  const proj = scoped ? STATE.currentProject : null;
  renderTopbar(proj ? [{ label: proj.name }, { label: 'Quality' }] : [{ label: 'Quality' }]);

  const base = proj ? DATA.testPlans.filter(p => p.projectId === proj.id) : DATA.testPlans;
  const plans = base.filter(p => p.kind === STATE.qualityTab);
  const manualCount = base.filter(p => p.kind === 'manual').length;
  const autoCount = base.filter(p => p.kind === 'automation').length;

  // KPIs computed across the active tab.
  const agg = plans.reduce((a, p) => {
    a.passed += p.tests.passed; a.failed += p.tests.failed;
    a.blocked += p.tests.blocked; a.total += p.tests.total;
    return a;
  }, { passed: 0, failed: 0, blocked: 0, total: 0 });
  const executed = agg.passed + agg.failed;
  const passRate = executed ? Math.round((agg.passed / executed) * 100) : 0;
  const failingPlans = plans.filter(p => p.status === 'failed').length;

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Quality${proj ? ` · ${proj.name}` : ''}</div>
        <div class="page-subtitle">${base.length} test plans · ${manualCount} manual · ${autoCount} automation</div>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary">${I.plus} New Test Plan</button>
      </div>
    </div>

    <div class="grid-kpi mb-6">
      ${kpiTile('Test Plans', String(plans.length), '#eef2ff', '#6366f1', I.checkSquare, `${STATE.qualityTab === 'manual' ? 'manual' : 'automation'} suites`, 'up')}
      ${kpiTile('Pass Rate', passRate + '%', '#ecfdf5', '#10b981', I.checkCircle, `${agg.passed}/${executed} executed`, passRate >= 80 ? 'up' : 'down')}
      ${kpiTile('Failing Plans', String(failingPlans), '#fef2f2', '#ef4444', I.alertTriangle, `${agg.failed} tests failed`, 'down')}
      ${kpiTile('Blocked Tests', String(agg.blocked), '#fffbeb', '#f59e0b', I.lock, 'awaiting unblock', agg.blocked ? 'down' : 'up')}
    </div>

    <div class="tabs mb-5">
      <div class="tab-item ${STATE.qualityTab === 'manual' ? 'active' : ''}" data-qtab="manual">Manual Tests (${manualCount})</div>
      <div class="tab-item ${STATE.qualityTab === 'automation' ? 'active' : ''}" data-qtab="automation">Automation Tests (${autoCount})</div>
    </div>

    <div id="quality-content"></div>`;

  document.querySelectorAll('[data-qtab]').forEach(el => {
    el.addEventListener('click', () => {
      STATE.qualityTab = el.dataset.qtab;
      renderQuality(scoped);
    });
  });

  renderQualityContent(plans, !!proj);
}

function renderQualityContent(plans, scoped) {
  const el = document.getElementById('quality-content');
  const isAuto = STATE.qualityTab === 'automation';

  if (!plans.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-state-icon">✓</div><div class="empty-state-title">No test plans</div><div class="empty-state-desc">No ${STATE.qualityTab} test plans yet. Create one to start tracking coverage.</div></div>`;
    return;
  }

  el.innerHTML = `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Test Plan</th>
            ${scoped ? '' : '<th>Project</th>'}
            <th>Owner</th>
            <th>${isAuto ? 'Framework' : 'Environment'}</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Results</th>
            <th>${isAuto ? 'Coverage' : 'Progress'}</th>
            <th>Last Run</th>
          </tr>
        </thead>
        <tbody>
          ${plans.map(p => {
            const t = p.tests;
            const done = t.passed + t.failed + t.blocked;
            const progress = t.total ? Math.round((done / t.total) * 100) : 0;
            const secondary = isAuto
              ? `<div class="quality-cov"><div class="progress-bar"><div class="progress-fill ${p.coverage >= 75 ? 'green' : p.coverage >= 50 ? 'amber' : 'red'}" style="width:${p.coverage}%"></div></div><span class="text-xs text-muted">${p.coverage}%</span></div>`
              : `<div class="quality-cov"><div class="progress-bar"><div class="progress-fill ${progress >= 100 ? 'green' : 'blue'}" style="width:${progress}%"></div></div><span class="text-xs text-muted">${progress}%</span></div>`;
            return `<tr class="quality-plan-row" data-plan="${p.id}">
              <td>
                <div class="flex items-center gap-2">
                  <span class="tree-toggle">${I.chevronRight}</span>
                  <div>
                    <div class="font-semibold">${escapeHtml(p.name)}</div>
                    ${isAuto ? `<div class="text-xs text-muted">${escapeHtml(p.schedule)}${p.duration && p.duration !== '—' ? ` · ${p.duration}` : ''}</div>` : `<div class="text-xs text-muted">${t.total} test cases</div>`}
                  </div>
                </div>
              </td>
              ${scoped ? '' : `<td class="text-secondary">${escapeHtml(p.project)}</td>`}
              <td><div class="flex items-center gap-2">${avatar(p.owner, p.ownerColor, 'sm')}<span class="text-secondary">${p.owner}</span></div></td>
              <td class="text-secondary">${escapeHtml(isAuto ? p.framework : p.environment)}</td>
              <td>${priorityBadge(p.priority)}</td>
              <td>${qualityStatusBadge(p.status)}</td>
              <td>
                ${qualityResultBar(t)}
                <div class="text-xs text-muted mt-1">${t.passed} pass · ${t.failed} fail${t.blocked ? ` · ${t.blocked} blocked` : ''}${t.pending ? ` · ${t.pending} pending` : ''}</div>
              </td>
              <td>${secondary}</td>
              <td class="text-muted">${escapeHtml(p.lastRun)}</td>
            </tr>
            <tr class="quality-detail-row hidden" data-detail="${p.id}">
              <td colspan="${scoped ? 8 : 9}">${qualityCasesMarkup(p)}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;

  bindQualityTree(el);
}

// Wire up the two-level expand/collapse: plan row → cases, case head → steps.
function bindQualityTree(root) {
  root.querySelectorAll('.quality-plan-row').forEach(row => {
    row.addEventListener('click', () => {
      const detail = root.querySelector(`.quality-detail-row[data-detail="${row.dataset.plan}"]`);
      if (!detail) return;
      const nowVisible = detail.classList.toggle('hidden') === false;
      row.classList.toggle('open', nowVisible);
    });
  });
  root.querySelectorAll('.quality-case-head').forEach(head => {
    head.addEventListener('click', e => {
      e.stopPropagation();
      const steps = head.parentElement.querySelector('.quality-steps');
      if (!steps) return;
      const nowVisible = steps.classList.toggle('hidden') === false;
      head.classList.toggle('open', nowVisible);
    });
  });
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

// --- USER SETTINGS ---
function saveUserSettings() {
  try { localStorage.setItem('wiredUserSettings', JSON.stringify(DATA.user.settings)); }
  catch (e) { console.error('[saveUserSettings]', e); }
}
function restoreUserSettings() {
  let saved;
  try { saved = JSON.parse(localStorage.getItem('wiredUserSettings') || 'null'); }
  catch (e) { saved = null; }
  if (saved && typeof saved === 'object') DATA.user.settings = { ...DATA.user.settings, ...saved };
  applyTableBorderVars();
}

function applyTableBorderVars() {
  const s = DATA.user.settings;
  const root = document.documentElement;
  root.style.setProperty('--table-border-width', (s.tableBorderWidth || '1') + 'px');
  root.style.setProperty('--table-border-color', s.tableBorderColor || '#334155');
}

const US_TABS = [
  { id:'profile',       label:'Profile',            icon:I.user },
  { id:'security',      label:'Account & Security', icon:I.shield },
  { id:'notifications', label:'Notifications',      icon:I.bell },
  { id:'appearance',    label:'Appearance',         icon:I.palette },
  { id:'preferences',   label:'Preferences',        icon:I.sliders }
];

const US_ACCENTS = ['#6366f1','#8b5cf6','#ec4899','#ef4444','#f59e0b','#10b981','#06b6d4','#3b82f6'];

function renderUserSettings() {
  if (!STATE.settingsTab) STATE.settingsTab = 'profile';
  renderTopbar([{ label:'Account' }, { label: US_TABS.find(t=>t.id===STATE.settingsTab).label }]);
  const u = DATA.user;
  const el = document.getElementById('content');
  el.innerHTML = `
    <div class="page-content us-page">
      <div class="us-hero">
        <div class="us-hero-avatar" style="background:${u.color}">${u.initials}
          <button class="us-hero-cam" title="Change photo" id="us-photo">${ico(I.camera,14)}</button>
        </div>
        <div class="us-hero-info">
          <div class="us-hero-name">${u.name}</div>
          <div class="us-hero-meta">${u.title} · ${u.department}</div>
          <div class="us-hero-tags">
            <span class="us-tag">${ico(I.mail,12)}${u.email}</span>
            <span class="us-tag">${ico(I.globe,12)}${u.location}</span>
            ${u.twoFactor?`<span class="us-tag us-tag--ok">${ico(I.shield,12)}2FA enabled</span>`:''}
          </div>
        </div>
      </div>
      <div class="us-shell">
        <nav class="us-nav">
          ${US_TABS.map(t=>`<button class="us-nav-item ${STATE.settingsTab===t.id?'active':''}" data-ustab="${t.id}">${ico(t.icon,16)}<span>${t.label}</span></button>`).join('')}
          <div class="us-nav-sep"></div>
          <button class="us-nav-item us-nav-item--danger" id="us-signout">${ico(I.logOut,16)}<span>Sign out</span></button>
        </nav>
        <div class="us-body" id="us-body">${renderUsTab()}</div>
      </div>
    </div>`;

  el.querySelectorAll('[data-ustab]').forEach(t =>
    t.addEventListener('click', () => { STATE.settingsTab = t.dataset.ustab; renderUserSettings(); }));
  el.querySelector('#us-photo')?.addEventListener('click', () => toast('Photo upload is a Phase 2 capability', 'info'));
  el.querySelector('#us-signout')?.addEventListener('click', () => toast('Signed out (demo)', 'info'));
  bindUsTab();
}

function renderUsTab() {
  switch (STATE.settingsTab) {
    case 'profile':       return usProfileTab();
    case 'security':      return usSecurityTab();
    case 'notifications': return usNotificationsTab();
    case 'appearance':    return usAppearanceTab();
    case 'preferences':   return usPreferencesTab();
    default: return '';
  }
}

/* ---- shared building blocks ---- */
function usToggleRow(key, label, desc) {
  const on = key === 'twoFactorToggle' ? DATA.user.twoFactor : DATA.user.settings[key];
  return `<div class="us-row">
    <div class="us-row-text"><div class="us-row-label">${label}</div><div class="us-row-desc">${desc}</div></div>
    <label class="toggle-switch"><input type="checkbox" data-toggle="${key}" ${on?'checked':''}><span class="toggle-slider"></span></label>
  </div>`;
}
function usSegment(key, options) {
  const cur = DATA.user.settings[key];
  return `<div class="us-segment" data-segment="${key}">
    ${options.map(o=>`<button class="us-seg-btn ${cur===o.val?'active':''}" data-val="${o.val}">${o.icon?ico(o.icon,14):''}${o.label}</button>`).join('')}
  </div>`;
}
function usField(id, label, value, type='text', placeholder='') {
  const tag = type==='textarea'
    ? `<textarea class="input textarea" id="${id}" data-profile="${id}" placeholder="${placeholder}">${value||''}</textarea>`
    : `<input class="input" id="${id}" data-profile="${id}" type="${type}" value="${value||''}" placeholder="${placeholder}">`;
  return `<div class="form-group">${label?`<label class="form-label">${label}</label>`:''}${tag}</div>`;
}

/* ---- Profile ---- */
function usProfileTab() {
  const u = DATA.user;
  return `
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Personal information</div>
        <div class="us-section-sub">This is how you appear across your workspace.</div></div>
      <div class="card us-card">
        <div class="form-row mb-4">
          ${usField('name','Full name',u.name)}
          ${usField('title','Job title',u.title)}
        </div>
        <div class="form-row mb-4">
          ${usField('email','Email',u.email,'email')}
          ${usField('phone','Phone',u.phone)}
        </div>
        <div class="form-row mb-4">
          ${usField('department','Department',u.department)}
          ${usField('location','Location',u.location)}
        </div>
        <div class="form-group mb-4">
          <label class="form-label">Timezone</label>
          <select class="input select" data-profile="timezone" id="pf-timezone">
            ${['America/Los_Angeles','America/New_York','Europe/London','Europe/Berlin','Asia/Jerusalem','Asia/Tokyo'].map(tz=>`<option ${u.timezone===tz?'selected':''}>${tz}</option>`).join('')}
          </select>
        </div>
        ${usField('bio','Bio',u.bio,'textarea','Tell your team a little about yourself…')}
        <div class="us-actions">
          <button class="btn btn-ghost" id="pf-reset">Reset</button>
          <button class="btn btn-primary" id="pf-save">${ico(I.check,14)} Save changes</button>
        </div>
      </div>
    </div>`;
}

/* ---- Security ---- */
function usSecurityTab() {
  const u = DATA.user;
  return `
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Password</div>
        <div class="us-section-sub">Last changed ${u.lastPasswordChange}.</div></div>
      <div class="card us-card">
        <div class="form-group mb-4"><label class="form-label">Current password</label><input class="input" type="password" id="sec-cur" placeholder="••••••••"></div>
        <div class="form-row mb-4">
          <div class="form-group"><label class="form-label">New password</label><input class="input" type="password" id="sec-new" placeholder="At least 8 characters"></div>
          <div class="form-group"><label class="form-label">Confirm new password</label><input class="input" type="password" id="sec-confirm" placeholder="Repeat password"></div>
        </div>
        <div class="us-actions"><button class="btn btn-primary" id="sec-save">${ico(I.key,14)} Update password</button></div>
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Two-factor authentication</div>
        <div class="us-section-sub">Add an extra layer of security to your account.</div></div>
      <div class="card us-card">
        ${usToggleRow('twoFactorToggle','Authenticator app','Require a one-time code from your authenticator on each sign-in.')}
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Active sessions</div>
        <div class="us-section-sub">Devices currently signed in to your account.</div></div>
      <div class="card us-card us-card--flush">
        ${u.sessions.map(s=>`
          <div class="us-session">
            <span class="us-session-icon">${ico(s.device.includes('iPhone')||s.device.includes('iOS')?I.smartphone:I.monitor,18)}</span>
            <div class="us-session-info">
              <div class="us-session-device">${s.device} ${s.current?'<span class="us-badge-current">This device</span>':''}</div>
              <div class="us-session-meta">${s.location} · ${s.lastActive}</div>
            </div>
            ${s.current?'':`<button class="btn btn-ghost btn-sm" data-revoke="${s.id}">Revoke</button>`}
          </div>`).join('')}
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title us-danger-title">Danger zone</div></div>
      <div class="card us-card us-danger-card">
        <div class="us-row">
          <div class="us-row-text"><div class="us-row-label">Deactivate account</div><div class="us-row-desc">Temporarily disable your account. You can reactivate by signing in again.</div></div>
          <button class="btn btn-secondary btn-sm" id="sec-deactivate">Deactivate</button>
        </div>
        <div class="us-row">
          <div class="us-row-text"><div class="us-row-label">Delete account</div><div class="us-row-desc">Permanently remove your account and all associated data. This cannot be undone.</div></div>
          <button class="btn btn-danger btn-sm" id="sec-delete">Delete account</button>
        </div>
      </div>
    </div>`;
}

/* ---- Notifications ---- */
function usNotificationsTab() {
  return `
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Channels</div>
        <div class="us-section-sub">Choose where you receive notifications.</div></div>
      <div class="card us-card us-card--flush">
        ${usToggleRow('notifyEmail','Email','Send notifications to ' + DATA.user.email + '.')}
        ${usToggleRow('notifyPush','Push','Real-time alerts on your devices.')}
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Email digest</div>
        <div class="us-section-sub">A rollup of activity across your projects.</div></div>
      <div class="card us-card">
        ${usSegment('notifyDigest',[{val:'off',label:'Off'},{val:'daily',label:'Daily'},{val:'weekly',label:'Weekly'}])}
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">What to notify me about</div></div>
      <div class="card us-card us-card--flush">
        ${usToggleRow('notifyApprovals','Approval requests','When an approval needs your decision.')}
        ${usToggleRow('notifyMentions','Mentions','When someone @mentions you in a comment.')}
        ${usToggleRow('notifyAssignments','Task assignments','When a task is assigned to you.')}
        ${usToggleRow('notifyStatusChanges','Status changes','When a project or task status changes.')}
        ${usToggleRow('notifyAutomations','Automation runs','When an automation you own executes.')}
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Quiet hours</div>
        <div class="us-section-sub">Pause non-critical notifications overnight (10pm–7am).</div></div>
      <div class="card us-card us-card--flush">
        ${usToggleRow('quietHours','Enable quiet hours','Critical approvals will still come through.')}
      </div>
    </div>`;
}

/* ---- Appearance ---- */
function usAppearanceTab() {
  const accent = DATA.user.settings.accentColor;
  return `
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Theme</div>
        <div class="us-section-sub">Customize how Wired looks for you.</div></div>
      <div class="card us-card">
        ${usSegment('theme',[{val:'light',label:'Light',icon:I.sun},{val:'dark',label:'Dark',icon:I.moon},{val:'system',label:'System',icon:I.monitor}])}
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Accent color</div>
        <div class="us-section-sub">Used for buttons, links and highlights.</div></div>
      <div class="card us-card">
        <div class="us-swatches" data-accent>
          ${US_ACCENTS.map(c=>`<button class="us-swatch ${accent===c?'active':''}" data-color="${c}" style="background:${c}" title="${c}">${accent===c?ico(I.check,14):''}</button>`).join('')}
        </div>
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Display density</div>
        <div class="us-section-sub">How much breathing room between elements.</div></div>
      <div class="card us-card">
        ${usSegment('density',[{val:'compact',label:'Compact'},{val:'comfortable',label:'Comfortable'},{val:'spacious',label:'Spacious'}])}
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Sidebar</div>
        <div class="us-section-sub">Default state when you open the app.</div></div>
      <div class="card us-card">
        ${usSegment('sidebar',[{val:'expanded',label:'Expanded'},{val:'collapsed',label:'Collapsed'}])}
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Table borders</div>
        <div class="us-section-sub">Line thickness and color for data table grid lines.</div></div>
      <div class="card us-card">
        <div class="us-row">
          <div class="us-row-text"><div class="us-row-label">Border width</div><div class="us-row-desc">How thick the grid lines appear.</div></div>
          ${usSegment('tableBorderWidth',[{val:'1',label:'Thin'},{val:'2',label:'Medium'},{val:'3',label:'Thick'}])}
        </div>
        <div class="us-row">
          <div class="us-row-text"><div class="us-row-label">Border color</div><div class="us-row-desc">Pick any color for the grid lines.</div></div>
          <input type="color" class="us-color-input" data-tableborder value="${DATA.user.settings.tableBorderColor||'#334155'}">
        </div>
      </div>
    </div>`;
}

/* ---- Preferences ---- */
function usPreferencesTab() {
  const s = DATA.user.settings;
  const sel = (key, opts) => `<select class="input select" data-setting="${key}">${opts.map(o=>`<option value="${o.val}" ${s[key]===o.val?'selected':''}>${o.label}</option>`).join('')}</select>`;
  return `
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Language & region</div></div>
      <div class="card us-card">
        <div class="form-row mb-4">
          <div class="form-group"><label class="form-label">Language</label>
            ${sel('language',[{val:'en',label:'English'},{val:'es',label:'Español'},{val:'fr',label:'Français'},{val:'de',label:'Deutsch'},{val:'he',label:'עברית'}])}</div>
          <div class="form-group"><label class="form-label">Date format</label>
            ${sel('dateFormat',[{val:'MMM D, YYYY',label:'Jun 27, 2026'},{val:'DD/MM/YYYY',label:'27/06/2026'},{val:'MM/DD/YYYY',label:'06/27/2026'},{val:'YYYY-MM-DD',label:'2026-06-27'}])}</div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Time format</label>
            ${usSegment('timeFormat',[{val:'12h',label:'12-hour'},{val:'24h',label:'24-hour'}])}</div>
          <div class="form-group"><label class="form-label">Week starts on</label>
            ${usSegment('weekStart',[{val:'sunday',label:'Sunday'},{val:'monday',label:'Monday'}])}</div>
        </div>
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Defaults</div>
        <div class="us-section-sub">Where Wired takes you and what it shows first.</div></div>
      <div class="card us-card">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Landing page</label>
            ${sel('landingPage',[{val:'dashboard',label:'Dashboard'},{val:'projects',label:'Projects'},{val:'commercial',label:'Commercial'}])}</div>
          <div class="form-group"><label class="form-label">Default project view</label>
            ${sel('defaultProjectView',[{val:'overview',label:'Overview'},{val:'tasks',label:'Tasks'},{val:'timeline',label:'Timeline'},{val:'budget',label:'Budget'}])}</div>
        </div>
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Workflow</div></div>
      <div class="card us-card us-card--flush">
        ${usToggleRow('autoAssign','Auto-assign new tasks to me','When I create a task, set me as the assignee.')}
        ${usToggleRow('confirmDestructive','Confirm before destructive actions','Ask before deleting projects, tasks or automations.')}
        ${usToggleRow('showCompletedTasks','Show completed tasks by default','Include done items in task lists without filtering.')}
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Wire</div>
        <div class="us-section-sub">How Wired applies changes it extracts from your communication channels.</div></div>
      <div class="card us-card">
        <div class="form-group">
          <label class="form-label">Apply mode</label>
          ${usSegment('wireMode',[{val:'semi-auto',label:'Semi-automatic'},{val:'auto',label:'Automatic'}])}
          <div style="font-size:12px;color:var(--c-text-2);margin-top:8px;line-height:1.55">
            <strong>Semi-automatic</strong> (default): every change is reviewed and applied only after you approve it, per item.
            <strong>Automatic</strong>: changes are applied immediately when you Wire, then shown for review with an option to undo.
          </div>
        </div>
      </div>
    </div>
    <div class="us-section">
      <div class="us-section-head"><div class="us-section-title">Navigation</div>
        <div class="us-section-sub">Show or hide global sections in the sidebar.</div></div>
      <div class="card us-card us-card--flush">
        ${usToggleRow('showNotes','Show Notes page','Display the Notes section in the global sidebar navigation.')}
      </div>
    </div>`;
}

/* ---- bindings ---- */
function bindUsTab() {
  const body = document.getElementById('us-body');
  if (!body) return;

  // toggles
  body.querySelectorAll('[data-toggle]').forEach(inp => {
    inp.addEventListener('change', () => {
      const key = inp.dataset.toggle;
      if (key === 'twoFactorToggle') { DATA.user.twoFactor = inp.checked; }
      else { DATA.user.settings[key] = inp.checked; saveUserSettings(); }
      // Toggling a sidebar section's visibility must refresh the nav immediately.
      if (key === 'showNotes') renderSidebar();
      toast(inp.checked ? 'Enabled' : 'Disabled', 'success');
    });
  });

  // segmented controls
  body.querySelectorAll('[data-segment]').forEach(seg => {
    seg.querySelectorAll('[data-val]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = seg.dataset.segment;
        DATA.user.settings[key] = btn.dataset.val;
        saveUserSettings();
        if (key === 'tableBorderWidth') applyTableBorderVars();
        seg.querySelectorAll('[data-val]').forEach(b => b.classList.toggle('active', b === btn));
        toast('Preference updated', 'success');
      });
    });
  });

  // dropdown settings (preferences)
  body.querySelectorAll('[data-setting]').forEach(sel => {
    sel.addEventListener('change', () => {
      DATA.user.settings[sel.dataset.setting] = sel.value;
      saveUserSettings();
      toast('Preference updated', 'success');
    });
  });

  // table border color picker
  body.querySelectorAll('[data-tableborder]').forEach(inp => {
    inp.addEventListener('input', () => {
      DATA.user.settings.tableBorderColor = inp.value;
      applyTableBorderVars();
    });
    inp.addEventListener('change', () => {
      saveUserSettings();
      toast('Table border color updated', 'success');
    });
  });

  // accent swatches
  body.querySelectorAll('[data-accent] [data-color]').forEach(sw => {
    sw.addEventListener('click', () => {
      DATA.user.settings.accentColor = sw.dataset.color;
      saveUserSettings();
      renderUserSettings();
      toast('Accent color updated', 'success');
    });
  });

  // profile save / reset
  body.querySelector('#pf-save')?.addEventListener('click', () => {
    body.querySelectorAll('[data-profile]').forEach(f => {
      const v = f.value.trim();
      DATA.user[f.dataset.profile] = v;
    });
    if (DATA.user.name) {
      DATA.user.initials = DATA.user.name.split(/\s+/).map(w => w[0]).slice(0,2).join('').toUpperCase();
    }
    renderSidebar();
    renderUserSettings();
    toast('Profile saved', 'success');
  });
  body.querySelector('#pf-reset')?.addEventListener('click', () => renderUserSettings());

  // security
  body.querySelector('#sec-save')?.addEventListener('click', () => {
    const cur = body.querySelector('#sec-cur').value;
    const nw = body.querySelector('#sec-new').value;
    const cf = body.querySelector('#sec-confirm').value;
    if (!cur || !nw) return toast('Fill in your current and new password', 'warning');
    if (nw.length < 8) return toast('New password must be at least 8 characters', 'warning');
    if (nw !== cf) return toast('New passwords do not match', 'error');
    DATA.user.lastPasswordChange = '2026-06-27';
    renderUserSettings();
    toast('Password updated', 'success');
  });
  body.querySelectorAll('[data-revoke]').forEach(btn => {
    btn.addEventListener('click', () => {
      DATA.user.sessions = DATA.user.sessions.filter(s => s.id !== +btn.dataset.revoke);
      renderUserSettings();
      toast('Session revoked', 'success');
    });
  });
  body.querySelector('#sec-deactivate')?.addEventListener('click', () => toast('Account deactivation is a Phase 2 capability', 'info'));
  body.querySelector('#sec-delete')?.addEventListener('click', () => toast('Account deletion is a Phase 2 capability', 'warning'));
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

// --- DATA SOURCES ---
function renderDataSources() {
  if (!STATE.dsTab) STATE.dsTab = 'integrations';
  renderTopbar([{label:'Integrations'}]);
  const el = document.getElementById('content');

  const tabs = [
    { id:'integrations', label:'Integrations', icon:I.plug },
    { id:'raw-data',     label:'Raw Data',     icon:I.table2 },
    { id:'views',        label:'Custom Views', icon:I.eye },
    { id:'fields',       label:'Custom Fields',icon:I.sliders },
    { id:'oob-views',   label:'Built-in Views', icon:I.layers }
  ];

  const connected = DATA.integrations.filter(i=>i.status==='connected').length;
  const totalRecords = DATA.integrations.reduce((s,i)=>s+i.records,0);

  el.innerHTML = `
    <div class="page-content">
      <div class="page-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--sp-4)">
        <div>
          <h1 class="page-title">Integrations</h1>
          <p class="page-subtitle">${connected} connected · ${totalRecords.toLocaleString()} records synced · ${DATA.customViews.length} custom views · ${DATA.customFields.length} custom fields</p>
        </div>
      </div>
      <div class="ds-tabs">
        ${tabs.map(t=>`<div class="ds-tab ${STATE.dsTab===t.id?'active':''}" data-dstab="${t.id}">${t.icon}${t.label}</div>`).join('')}
      </div>
      <div id="ds-tab-body">${renderDsTabBody()}</div>
    </div>`;

  el.querySelectorAll('[data-dstab]').forEach(t=>{
    t.addEventListener('click',()=>{ STATE.dsTab=t.dataset.dstab; renderDataSources(); });
  });
  bindDsTab();
}

function renderDsTabBody() {
  switch(STATE.dsTab) {
    case 'integrations': return renderDsIntegrations();
    case 'raw-data':     return renderDsRawData();
    case 'views':        return renderDsViews();
    case 'fields':       return renderDsFields();
    case 'oob-views':   return renderDsOobViews();
    default: return '';
  }
}

function bindDsTab() {
  switch(STATE.dsTab) {
    case 'integrations': bindDsIntegrations(); break;
    case 'raw-data':     bindDsRawData(); break;
    case 'views':        bindDsViews(); break;
    case 'fields':       bindDsFields(); break;
    case 'oob-views':   bindDsOobViews(); break;
  }
}

/* ---- Integrations tab ---- */
function renderDsIntegrations() {
  return `
    <div style="background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--r-lg);overflow:hidden;box-shadow:var(--sh-sm)">
      <table class="table" id="integrations-table">
        <thead><tr>
          <th>Integration</th><th>Category</th><th>Status</th>
          <th style="text-align:right">Records</th><th>Last Synced</th><th style="text-align:right">Actions</th>
        </tr></thead>
        <tbody id="integrations-body">
          ${DATA.integrations.map(intg=>`
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:var(--sp-2)">
                  <div class="integration-icon" style="background:${intg.bg};color:${intg.color};width:28px;height:28px;font-size:12px;flex:0 0 auto">${intg.icon}</div>
                  <div>
                    <div style="font-size:13px;font-weight:600;color:var(--c-text-1)">${intg.name}</div>
                    <div style="font-size:11px;color:var(--c-text-3)">${intg.description}</div>
                  </div>
                </div>
              </td>
              <td style="font-size:12px;color:var(--c-text-2)">${intg.category}</td>
              <td>
                ${intg.status==='connected'
                  ? `<span class="badge" style="background:#f0fdf4;color:#16a34a;font-size:10px">${ico(I.checkCircle,10)} Connected</span>`
                  : `<span class="badge badge-gray" style="font-size:10px">Disconnected</span>`}
              </td>
              <td style="text-align:right;font-size:12px;color:var(--c-text-2)">${intg.status==='connected'?intg.records.toLocaleString():'—'}</td>
              <td style="font-size:11px;color:var(--c-text-3)">${intg.syncedAt||'—'}</td>
              <td style="text-align:right">
                <div style="display:flex;align-items:center;justify-content:flex-end;gap:var(--sp-2)">
                  <label class="toggle">
                    <input type="checkbox" class="intg-toggle" data-intg="${intg.id}" ${intg.status==='connected'?'checked':''}>
                    <span class="toggle-track"></span>
                  </label>
                  ${intg.status==='connected'
                    ? `<button class="btn btn-secondary btn-sm intg-sync-btn" data-intg="${intg.id}">${ico(I.refreshCw,12)} Sync</button>`
                    : `<button class="btn btn-ghost btn-sm" style="font-size:12px">Docs ${ico(I.link,12)}</button>`}
                </div>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function bindDsIntegrations() {
  document.querySelectorAll('.intg-toggle').forEach(chk=>{
    chk.addEventListener('change',()=>{
      const intg = DATA.integrations.find(i=>i.id===+chk.dataset.intg);
      if(!intg) return;
      intg.status = chk.checked ? 'connected' : 'disconnected';
      if(chk.checked) intg.syncedAt = new Date().toISOString().slice(0,16).replace('T',' ');
      toast(chk.checked ? `${intg.name} connected` : `${intg.name} disconnected`, chk.checked?'success':'info');
      renderDataSources();
    });
  });
  document.querySelectorAll('.intg-sync-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const intg = DATA.integrations.find(i=>i.id===+btn.dataset.intg);
      if(!intg) return;
      intg.syncedAt = new Date().toISOString().slice(0,16).replace('T',' ');
      toast(`${intg.name} synced`, 'success');
      renderDataSources();
    });
  });
}

/* ---- Raw Data tab ---- */
function renderDsRawData() {
  const sourceColors = { Jira:'#0052cc', GitHub:'#24292e', 'REST API':'#6366f1', Slack:'#4a154b' };
  const statusColors = { Done:'#16a34a', Merged:'#16a34a', Processed:'#6366f1', 'In Progress':'#d97706', Open:'#2563eb', 'To Do':'#94a3b8' };
  return `
    <div style="display:flex;align-items:center;gap:var(--sp-3);margin-bottom:var(--sp-4)">
      <select class="input select" style="width:160px" id="ds-source-filter">
        <option value="">All sources</option>
        ${[...new Set(DATA.rawData.map(r=>r.source))].map(s=>`<option>${s}</option>`).join('')}
      </select>
      <select class="input select" style="width:140px" id="ds-type-filter">
        <option value="">All types</option>
        ${[...new Set(DATA.rawData.map(r=>r.type))].map(t=>`<option>${t}</option>`).join('')}
      </select>
      <select class="input select" style="width:180px" id="ds-project-filter">
        <option value="">All projects</option>
        ${[...new Set(DATA.rawData.map(r=>r.linkedProject))].map(p=>`<option>${p}</option>`).join('')}
      </select>
      <span style="font-size:12px;color:var(--c-text-3);margin-left:auto">${DATA.rawData.length} records</span>
    </div>
    <div style="background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--r-lg);overflow:hidden;box-shadow:var(--sh-sm)">
      <table class="table" id="raw-data-table">
        <thead><tr>
          <th>Source</th><th>Type</th><th>External ID</th><th>Name</th>
          <th>Status</th><th>Assignee</th><th>Linked Project</th><th>Imported</th>
        </tr></thead>
        <tbody id="raw-data-body">
          ${DATA.rawData.map(r=>`
            <tr>
              <td><span class="ds-source-badge" style="background:${sourceColors[r.source]||'#6b7280'}20;color:${sourceColors[r.source]||'#6b7280'}">${r.source}</span></td>
              <td style="font-size:11px;color:var(--c-text-3);font-weight:500">${r.type}</td>
              <td><code style="font-size:11px;background:#f1f5f9;padding:1px 6px;border-radius:4px;color:#475569">${r.externalId}</code></td>
              <td style="max-width:220px;font-size:13px">${r.name}</td>
              <td><span style="font-size:11px;font-weight:600;color:${statusColors[r.field1]||'#6b7280'}">${r.field1}</span></td>
              <td style="font-size:12px">${r.field2}</td>
              <td><span class="badge badge-active" style="font-size:10px">${r.linkedProject}</span></td>
              <td style="font-size:11px;color:var(--c-text-3)">${r.importedAt}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function bindDsRawData() {
  function applyFilters() {
    const src = document.getElementById('ds-source-filter')?.value || '';
    const typ = document.getElementById('ds-type-filter')?.value || '';
    const prj = document.getElementById('ds-project-filter')?.value || '';
    const sourceColors = { Jira:'#0052cc', GitHub:'#24292e', 'REST API':'#6366f1', Slack:'#4a154b' };
    const statusColors = { Done:'#16a34a', Merged:'#16a34a', Processed:'#6366f1', 'In Progress':'#d97706', Open:'#2563eb', 'To Do':'#94a3b8' };
    const filtered = DATA.rawData.filter(r=>
      (!src || r.source===src) && (!typ || r.type===typ) && (!prj || r.linkedProject===prj)
    );
    const body = document.getElementById('raw-data-body');
    if(body) body.innerHTML = filtered.map(r=>`
      <tr>
        <td><span class="ds-source-badge" style="background:${sourceColors[r.source]||'#6b7280'}20;color:${sourceColors[r.source]||'#6b7280'}">${r.source}</span></td>
        <td style="font-size:11px;color:var(--c-text-3);font-weight:500">${r.type}</td>
        <td><code style="font-size:11px;background:#f1f5f9;padding:1px 6px;border-radius:4px;color:#475569">${r.externalId}</code></td>
        <td style="max-width:220px;font-size:13px">${r.name}</td>
        <td><span style="font-size:11px;font-weight:600;color:${statusColors[r.field1]||'#6b7280'}">${r.field1}</span></td>
        <td style="font-size:12px">${r.field2}</td>
        <td><span class="badge badge-active" style="font-size:10px">${r.linkedProject}</span></td>
        <td style="font-size:11px;color:var(--c-text-3)">${r.importedAt}</td>
      </tr>`).join('');
  }
  ['ds-source-filter','ds-type-filter','ds-project-filter'].forEach(id=>{
    document.getElementById(id)?.addEventListener('change', applyFilters);
  });
}

/* ---- Custom Views tab ---- */
function renderDsViews() {
  if(STATE.dsViewBuilder) return renderDsViewBuilder();
  return `
    <div style="display:flex;justify-content:flex-end;margin-bottom:var(--sp-4)">
      <button class="btn btn-primary" id="new-view-btn">${ico(I.plus)} New View</button>
    </div>
    <div style="background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--r-lg);overflow:hidden;box-shadow:var(--sh-sm)">
      <table class="table" id="views-table">
        <thead><tr>
          <th>View</th><th>Columns</th><th>Created by</th>
          <th>Last run</th><th style="text-align:right">Rows</th>
        </tr></thead>
        <tbody id="views-body">
          ${DATA.customViews.map(v=>`
            <tr class="view-row" data-view="${v.id}" style="cursor:pointer">
              <td>
                <div style="display:flex;align-items:center;gap:var(--sp-2)">
                  <div class="view-card-icon" style="background:${v.color}18;color:${v.color};width:28px;height:28px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;border-radius:6px">${I[v.icon]||I.eye}</div>
                  <div>
                    <div style="font-size:13px;font-weight:600;color:var(--c-text-1)">${v.name}</div>
                    <div style="font-size:11px;color:var(--c-text-3)">${v.description}</div>
                  </div>
                </div>
              </td>
              <td>
                <div class="view-columns" style="margin:0">
                  ${v.columns.map(c=>`<span class="view-col-chip">${c}</span>`).join('')}
                </div>
              </td>
              <td style="font-size:12px;color:var(--c-text-2)">${ico(I.users,11)} ${v.createdBy}</td>
              <td style="font-size:11px;color:var(--c-text-3)">${v.lastRun}</td>
              <td style="text-align:right;font-size:12px;color:var(--c-text-2)">${v.rows}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderDsViewBuilder() {
  const fieldOptions = ['name','status','health','priority','pm','budget','spent','budgetPct','due','type','progress'];
  const opOptions = ['=','!=','>','<','>=','<=','contains','between'];
  const filters = STATE.dsViewFilters || [{ field:'status', op:'=', value:'' }];
  return `
    <div class="ds-builder">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--sp-5)">
        <h3 style="font-size:15px;font-weight:700">${ico(I.eye)} New Custom View</h3>
        <button class="btn-icon" id="view-builder-close">${I.x}</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-5)">
        <div>
          <div class="form-group mb-4">
            <label class="form-label">View name <span>*</span></label>
            <input class="input" id="vb-name" placeholder="e.g. Q3 Engineering Milestones">
          </div>
          <div class="form-group mb-4">
            <label class="form-label">Description</label>
            <textarea class="textarea" id="vb-desc" placeholder="What does this view show?"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Accent color</label>
            <div style="display:flex;gap:var(--sp-2)">
              ${['#6366f1','#ef4444','#f59e0b','#16a34a','#0891b2','#8b5cf6'].map(c=>`
                <div class="vb-color" data-color="${c}" style="width:24px;height:24px;border-radius:50%;background:${c};cursor:pointer;border:2px solid transparent;transition:border-color .15s"></div>`).join('')}
            </div>
          </div>
        </div>
        <div>
          <div class="form-group mb-4">
            <label class="form-label">Filters</label>
            <div id="vb-filters">
              ${filters.map((_,i)=>`
                <div class="filter-row">
                  <select class="input select vb-filter-field">${fieldOptions.map(f=>`<option>${f}</option>`).join('')}</select>
                  <select class="input select vb-filter-op" style="width:90px">${opOptions.map(o=>`<option>${o}</option>`).join('')}</select>
                  <input class="input vb-filter-val" placeholder="value">
                  <button class="btn-icon btn-sm vb-remove-filter" data-i="${i}">${I.x}</button>
                </div>`).join('')}
            </div>
            <button class="btn btn-ghost btn-sm mt-2" id="vb-add-filter">${ico(I.plus)} Add filter</button>
          </div>
          <div class="form-group">
            <label class="form-label">Columns to show</label>
            <div style="display:flex;flex-wrap:wrap;gap:var(--sp-2)" id="vb-columns">
              ${fieldOptions.map(f=>`
                <label style="display:flex;align-items:center;gap:4px;font-size:12px;cursor:pointer">
                  <input type="checkbox" class="vb-col" value="${f}" style="accent-color:#6366f1" checked> ${f}
                </label>`).join('')}
            </div>
          </div>
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:var(--sp-3);margin-top:var(--sp-5);padding-top:var(--sp-4);border-top:1px solid var(--c-border)">
        <button class="btn btn-secondary" id="view-builder-cancel">Cancel</button>
        <button class="btn btn-primary" id="view-builder-save">${ico(I.checkCircle)} Save View</button>
      </div>
    </div>`;
}

function bindDsViews() {
  if(STATE.dsViewBuilder) {
    let selectedColor = '#6366f1';
    document.querySelectorAll('.vb-color').forEach(c=>{
      c.addEventListener('click',()=>{ selectedColor=c.dataset.color; document.querySelectorAll('.vb-color').forEach(x=>x.style.borderColor='transparent'); c.style.borderColor='#1e293b'; });
    });
    document.getElementById('vb-add-filter')?.addEventListener('click',()=>{
      STATE.dsViewFilters = (STATE.dsViewFilters||[{ field:'status',op:'=',value:'' }]).concat([{ field:'name',op:'contains',value:'' }]);
      renderDataSources();
    });
    document.querySelectorAll('.vb-remove-filter').forEach(btn=>{
      btn.addEventListener('click',()=>{
        STATE.dsViewFilters = (STATE.dsViewFilters||[]).filter((_,i)=>i!==+btn.dataset.i);
        renderDataSources();
      });
    });
    document.getElementById('view-builder-close')?.addEventListener('click',()=>{ STATE.dsViewBuilder=false; STATE.dsViewFilters=null; renderDataSources(); });
    document.getElementById('view-builder-cancel')?.addEventListener('click',()=>{ STATE.dsViewBuilder=false; STATE.dsViewFilters=null; renderDataSources(); });
    document.getElementById('view-builder-save')?.addEventListener('click',()=>{
      const name = document.getElementById('vb-name')?.value.trim();
      if(!name){ toast('View name is required','error'); return; }
      const cols = [...document.querySelectorAll('.vb-col:checked')].map(c=>c.value);
      DATA.customViews.push({
        id: DATA.customViews.length+1, name, color:selectedColor, icon:'eye',
        description: document.getElementById('vb-desc')?.value.trim()||'',
        filters: STATE.dsViewFilters||[], columns:cols.length?cols:['name','status'],
        createdBy:'AM', createdAt:new Date().toISOString().slice(0,10), lastRun:'—', rows:0
      });
      STATE.dsViewBuilder=false; STATE.dsViewFilters=null;
      toast(`View "${name}" saved`,'success');
      renderDataSources();
    });
    return;
  }
  document.getElementById('new-view-btn')?.addEventListener('click',()=>{ STATE.dsViewBuilder=true; renderDataSources(); });
  document.querySelectorAll('.view-row[data-view]').forEach(row=>{
    row.addEventListener('click',()=>{ toast('View opened — data would render here','info'); });
  });
}

/* ---- Custom Fields tab ---- */
function renderDsFields() {
  if(STATE.dsFieldBuilder) return renderDsFieldBuilder() + renderFieldsTable();
  return `
    <div style="display:flex;justify-content:flex-end;margin-bottom:var(--sp-4)">
      <button class="btn btn-primary" id="new-field-btn">${ico(I.plus)} New Field</button>
    </div>` + renderFieldsTable();
}

function renderFieldsTable() {
  const typeClass = { text:'text', number:'number', currency:'currency', boolean:'boolean', select:'select', 'long text':'longtext', date:'date' };
  return `
    <div style="background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--r-lg);overflow:hidden;box-shadow:var(--sh-sm)">
      <table class="table">
        <thead><tr>
          <th>Field name</th><th>Type</th><th>Applies to</th><th>Description</th>
          <th>Required</th><th>Used in</th><th>Created</th><th></th>
        </tr></thead>
        <tbody>
          ${DATA.customFields.map(f=>`
            <tr>
              <td style="font-weight:600;font-size:13px">${f.name}</td>
              <td><span class="field-type field-type-${typeClass[f.type]||'text'}">${f.type}</span></td>
              <td style="font-size:12px;color:var(--c-text-2)">${f.appliesTo}</td>
              <td style="font-size:12px;color:var(--c-text-2);max-width:240px">${f.description}</td>
              <td style="text-align:center">${f.required ? `<span style="color:#16a34a;font-size:16px">✓</span>` : `<span style="color:#d1d5db;font-size:16px">–</span>`}</td>
              <td style="font-size:12px;color:var(--c-text-2)">${f.usedIn} records</td>
              <td style="font-size:11px;color:var(--c-text-3)">${f.createdAt}</td>
              <td>
                <button class="btn-icon btn-sm field-delete-btn" data-fid="${f.id}" title="Delete field">${I.trash}</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderDsFieldBuilder() {
  const types = ['text','number','currency','boolean','select','long text','date'];
  const targets = ['Project','Task','Milestone','Approval','Risk'];
  return `
    <div class="ds-builder">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--sp-5)">
        <h3 style="font-size:15px;font-weight:700">${ico(I.sliders)} New Custom Field</h3>
        <button class="btn-icon" id="field-builder-close">${I.x}</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-5)">
        <div>
          <div class="form-group mb-4">
            <label class="form-label">Field name <span>*</span></label>
            <input class="input" id="fb-name" placeholder="e.g. Client Name">
          </div>
          <div class="form-group mb-4">
            <label class="form-label">Field type</label>
            <select class="input select" id="fb-type">
              ${types.map(t=>`<option value="${t}">${t.charAt(0).toUpperCase()+t.slice(1)}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Applies to</label>
            <select class="input select" id="fb-target">
              ${targets.map(t=>`<option>${t}</option>`).join('')}
            </select>
          </div>
        </div>
        <div>
          <div class="form-group mb-4">
            <label class="form-label">Description</label>
            <textarea class="textarea" id="fb-desc" placeholder="What is this field used for?"></textarea>
          </div>
          <div class="form-group">
            <label style="display:flex;align-items:center;gap:var(--sp-2);cursor:pointer">
              <input type="checkbox" id="fb-required" style="accent-color:#6366f1">
              <span class="form-label" style="margin:0">Required</span>
            </label>
            <div style="font-size:11px;color:var(--c-text-3);margin-top:4px">Users must fill this field before submitting</div>
          </div>
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:var(--sp-3);margin-top:var(--sp-5);padding-top:var(--sp-4);border-top:1px solid var(--c-border)">
        <button class="btn btn-secondary" id="field-builder-cancel">Cancel</button>
        <button class="btn btn-primary" id="field-builder-save">${ico(I.checkCircle)} Save Field</button>
      </div>
    </div>`;
}

function bindDsFields() {
  if(STATE.dsFieldBuilder) {
    document.getElementById('field-builder-close')?.addEventListener('click',()=>{ STATE.dsFieldBuilder=false; renderDataSources(); });
    document.getElementById('field-builder-cancel')?.addEventListener('click',()=>{ STATE.dsFieldBuilder=false; renderDataSources(); });
    document.getElementById('field-builder-save')?.addEventListener('click',()=>{
      const name = document.getElementById('fb-name')?.value.trim();
      if(!name){ toast('Field name is required','error'); return; }
      DATA.customFields.push({
        id: DATA.customFields.length+1, name,
        type: document.getElementById('fb-type')?.value||'text',
        appliesTo: document.getElementById('fb-target')?.value||'Project',
        description: document.getElementById('fb-desc')?.value.trim()||'',
        required: document.getElementById('fb-required')?.checked||false,
        usedIn:0, createdBy:'AM', createdAt:new Date().toISOString().slice(0,10)
      });
      STATE.dsFieldBuilder=false;
      toast(`Field "${name}" created`,'success');
      renderDataSources();
    });
  } else {
    document.getElementById('new-field-btn')?.addEventListener('click',()=>{ STATE.dsFieldBuilder=true; renderDataSources(); });
  }
  document.querySelectorAll('.field-delete-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const f = DATA.customFields.find(x=>x.id===+btn.dataset.fid);
      DATA.customFields = DATA.customFields.filter(x=>x.id!==+btn.dataset.fid);
      toast(`Field "${f?.name}" deleted`,'info');
      renderDataSources();
    });
  });
}

/* ---- Out-of-the-box Views tab ---- */
function renderDsOobViews() {
  const categories = [...new Set(DATA.oobViews.map(v=>v.category))];
  const active = STATE.oobCategory || 'All';

  const catCounts = { All: DATA.oobViews.length };
  categories.forEach(c => { catCounts[c] = DATA.oobViews.filter(v=>v.category===c).length; });
  const allCats = ['All', ...categories];

  const filtered = active==='All' ? DATA.oobViews : DATA.oobViews.filter(v=>v.category===active);

  return `
    <div style="display:flex;gap:var(--sp-6)">
      <!-- Category sidebar -->
      <div style="width:160px;flex-shrink:0">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--c-text-3);margin-bottom:var(--sp-3)">Category</div>
        ${allCats.map(c=>`
          <div class="oob-cat-item ${active===c?'active':''}" data-cat="${c}">
            <span>${c}</span>
            <span class="oob-cat-count">${catCounts[c]}</span>
          </div>`).join('')}
      </div>
      <!-- View cards -->
      <div style="flex:1">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--sp-4)">
          <div style="font-size:13px;color:var(--c-text-3)">${filtered.length} view${filtered.length!==1?'s':''}</div>
          <div style="display:flex;align-items:center;gap:var(--sp-2)">
            <div style="position:relative">
              <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);pointer-events:none">${ico(I.search,13)}</span>
              <input class="input" id="oob-search" placeholder="Search views…" style="padding-left:30px;width:200px;height:30px;font-size:12px">
            </div>
          </div>
        </div>
        <div id="oob-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:var(--sp-4)">
          ${filtered.map(v => renderOobCard(v)).join('')}
        </div>
      </div>
    </div>`;
}

function renderOobCard(v) {
  return `
    <div class="oob-card" data-oob="${v.id}">
      <div class="oob-card-top">
        <div class="oob-card-icon" style="background:${v.color}18;color:${v.color}">${I[v.icon]||I.eye}</div>
        <div style="flex:1">
          <div class="oob-card-name">${v.name}</div>
          <div class="oob-cat-pill">${v.category}</div>
        </div>
        <span class="oob-builtin-badge">${ico(I.lock,10)} Built-in</span>
      </div>
      <div class="oob-card-desc">${v.description}</div>
      <div class="oob-preview-table">
        <div class="oob-preview-head">
          ${v.columns.map(c=>`<span>${c}</span>`).join('')}
        </div>
        ${v.previewRows.map(row=>`
          <div class="oob-preview-row">
            ${row.map((cell,i)=>`<span style="${i===0?'font-weight:600':''}">${cell}</span>`).join('')}
          </div>`).join('')}
      </div>
      <div class="oob-card-footer">
        <div style="display:flex;gap:4px;flex-wrap:wrap">
          ${v.tags.map(t=>`<span class="oob-tag">#${t}</span>`).join('')}
        </div>
        <div style="display:flex;gap:var(--sp-2)">
          <button class="btn btn-ghost btn-sm oob-clone-btn" data-oob="${v.id}">${ico(I.copy,12)} Clone</button>
          <button class="btn btn-primary btn-sm oob-open-btn" data-oob="${v.id}">${ico(I.eye,12)} Open</button>
        </div>
      </div>
    </div>`;
}

function bindDsOobViews() {
  document.querySelectorAll('.oob-cat-item[data-cat]').forEach(el=>{
    el.addEventListener('click',()=>{ STATE.oobCategory=el.dataset.cat; renderDataSources(); });
  });

  document.getElementById('oob-search')?.addEventListener('input', e=>{
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.oob-card[data-oob]').forEach(card=>{
      const v = DATA.oobViews.find(x=>x.id===+card.dataset.oob);
      const match = !q || v.name.toLowerCase().includes(q) || v.description.toLowerCase().includes(q) || v.tags.some(t=>t.includes(q));
      card.style.display = match ? '' : 'none';
    });
  });

  document.querySelectorAll('.oob-open-btn[data-oob]').forEach(btn=>{
    btn.addEventListener('click', e=>{ e.stopPropagation(); const v=DATA.oobViews.find(x=>x.id===+btn.dataset.oob); toast(`Opening "${v.name}"…`,'info'); });
  });

  document.querySelectorAll('.oob-clone-btn[data-oob]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      e.stopPropagation();
      const v = DATA.oobViews.find(x=>x.id===+btn.dataset.oob);
      DATA.customViews.push({
        id: DATA.customViews.length+1, name:`${v.name} (copy)`, color:v.color, icon:v.icon,
        description: v.description, filters:[], columns:[...v.columns],
        createdBy:'AM', createdAt:new Date().toISOString().slice(0,10), lastRun:'—', rows:0
      });
      toast(`"${v.name}" cloned to Custom Views`,'success');
    });
  });
}

// --- WORKFLOWS ---
function renderWorkflows() {
  const wflows = DATA.workflows;
  const actionTypeColor = { document:'#6366f1', meeting:'#0891b2', review:'#d97706', task:'#16a34a', approval:'#dc2626', milestone:'#7c3aed' };

  function phaseCount(w) { return w.phases.length; }
  function actionCount(w) { return w.phases.reduce((s,p)=>s+p.actions.length,0); }
  function projectsUsing(w) { return DATA.projects.filter(p=>p.workflowId===w.id); }

  function workflowGrid() {
    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:var(--sp-5)">
        ${wflows.map(w => {
          const projs = projectsUsing(w);
          return `
          <div class="workflow-card" data-wf="${w.id}">
            <div class="workflow-card-accent" style="background:${w.color}"></div>
            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:var(--sp-2)">
              <div class="workflow-card-name">${w.name}</div>
              <span class="badge" style="background:#f1f5f9;color:#64748b;font-size:11px">${w.projectType}</span>
            </div>
            <div class="workflow-card-desc">${w.description}</div>
            <div class="workflow-card-stats">
              <span>${ico(I.gitBranch)} ${phaseCount(w)} phases</span>
              <span>${ico(I.checkSquare)} ${actionCount(w)} actions</span>
              <span>${ico(I.folder)} ${projs.length} project${projs.length!==1?'s':''}</span>
            </div>
            <div class="workflow-card-phases mt-3">
              ${w.phases.map(ph=>`<span class="workflow-phase-pip" style="background:${ph.color}22;color:${ph.color}">${ph.name}</span>`).join('')}
            </div>
          </div>`;
        }).join('')}
        <div class="workflow-card" id="empty-wf-card" style="border-style:dashed;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:180px;cursor:pointer;color:var(--c-text-3);gap:var(--sp-3)">
          <div style="width:44px;height:44px;border-radius:50%;background:#f1f5f9;display:flex;align-items:center;justify-content:center">${ico(I.plus,24)}</div>
          <div style="font-size:14px;font-weight:600">Create new workflow</div>
          <div style="font-size:12px;text-align:center;max-width:220px">Define phases and actions to standardize how projects run</div>
        </div>
      </div>`;
  }

  function workflowTable() {
    return `
      <div class="table-wrapper workflow-table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Type</th><th>Phases</th><th>Actions</th><th>Projects</th><th>Phase flow</th></tr></thead>
          <tbody>
            ${wflows.map(w => {
              const projs = projectsUsing(w);
              return `<tr class="workflow-row" data-wf="${w.id}" style="cursor:pointer">
                <td>
                  <div class="flex items-center gap-2">
                    <span style="width:8px;height:8px;border-radius:2px;background:${w.color};flex:none"></span>
                    <span class="font-semibold">${w.name}</span>
                  </div>
                  <div class="text-xs text-muted mt-1">${w.description}</div>
                </td>
                <td><span class="badge" style="background:#f1f5f9;color:#64748b;font-size:11px">${w.projectType}</span></td>
                <td class="text-secondary">${phaseCount(w)}</td>
                <td class="text-secondary">${actionCount(w)}</td>
                <td class="text-secondary">${projs.length}</td>
                <td>
                  <div class="flex items-center gap-1" style="flex-wrap:wrap">
                    ${w.phases.map(ph=>`<span class="workflow-phase-pip" style="background:${ph.color}22;color:${ph.color}">${ph.name}</span>`).join('') || '<span class="text-muted text-xs">No phases</span>'}
                  </div>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  }

  renderTopbar([{label:'Workflows'}]);
  const el = document.getElementById('content');
  el.innerHTML = `
    <div class="page-content">
      <div class="page-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--sp-6)">
        <div>
          <h1 class="page-title">Workflows</h1>
          <p class="page-subtitle">Define reusable project templates with phases and actions</p>
        </div>
        <div class="page-actions">
          <div class="view-toggle" id="workflow-view-toggle">
            <button class="view-toggle-btn ${STATE.workflowView==='table'?'active':''}" data-workflowview="table" title="Table view">${ico(I.list,16)}</button>
            <button class="view-toggle-btn ${STATE.workflowView==='grid'?'active':''}" data-workflowview="grid" title="Card view">${ico(I.grid,16)}</button>
          </div>
          <button class="btn btn-primary" id="new-workflow-btn">${I.plus} New Workflow</button>
        </div>
      </div>
      ${STATE.workflowView==='grid' ? workflowGrid() : workflowTable()}
    </div>`;

  document.querySelectorAll('#workflow-view-toggle [data-workflowview]').forEach(btn => {
    btn.addEventListener('click', () => { STATE.workflowView = btn.dataset.workflowview; renderWorkflows(); });
  });

  el.querySelectorAll('.workflow-card[data-wf], .workflow-row[data-wf]').forEach(card => {
    card.addEventListener('click', () => {
      const wf = DATA.workflows.find(w=>w.id===+card.dataset.wf);
      STATE.currentWorkflow = wf;
      renderWorkflowBuilder(wf);
    });
  });
  document.getElementById('new-workflow-btn')?.addEventListener('click', () => {
    const newWf = {
      id: DATA.workflows.length + 1,
      name: 'New Workflow',
      description: 'Describe this workflow…',
      projectType: 'General',
      color: '#6366f1',
      phases: []
    };
    DATA.workflows.push(newWf);
    STATE.currentWorkflow = newWf;
    renderWorkflowBuilder(newWf);
  });
  document.getElementById('empty-wf-card')?.addEventListener('click', () => {
    document.getElementById('new-workflow-btn')?.click();
  });
}

function renderWorkflowBuilder(wf) {
  const actionTypeColor = { document:'#6366f1', meeting:'#0891b2', review:'#d97706', task:'#16a34a', approval:'#dc2626', milestone:'#7c3aed' };
  const actionTypeIcon  = { document:I.fileText, meeting:I.users, review:I.checkSquare, task:I.checkCircle, approval:I.thumbsUp, milestone:I.flag };
  const actionTypes = ['document','meeting','review','task','approval','milestone'];
  let selectedAction = null; // { phaseId, actionId }

  const shell = document.createElement('div');
  shell.className = 'wf-builder-shell';
  shell.id = 'wf-builder-shell';
  document.body.appendChild(shell);

  function projs() { return DATA.projects.filter(p=>p.workflowId===wf.id); }

  function buildDetailPanel() {
    if (!selectedAction) return `<div style="padding:var(--sp-6);text-align:center;color:var(--c-text-3);margin-top:60px"><div style="font-size:13px">Select an action to view or edit its details</div></div>`;
    const phase = wf.phases.find(p=>p.id===selectedAction.phaseId);
    const action = phase?.actions.find(a=>a.id===selectedAction.actionId);
    if (!action) return '';
    const color = actionTypeColor[action.type] || '#6366f1';
    return `
      <div class="wf-detail-header">
        <div style="display:flex;align-items:center;gap:var(--sp-3)">
          <div class="wf-action-icon" style="background:${color}22;width:32px;height:32px">${ico(actionTypeIcon[action.type]||I.checkSquare,16)}</div>
          <div>
            <div style="font-size:13px;font-weight:700">${action.name}</div>
            <div style="font-size:11px;color:var(--c-text-3)">${phase.name}</div>
          </div>
        </div>
        <button class="btn-icon btn-sm" id="detail-close" title="Close">${I.x}</button>
      </div>
      <div class="wf-detail-body">
        <div class="form-group">
          <label class="form-label">Action name</label>
          <input class="input" id="det-name" value="${action.name}">
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="textarea" id="det-desc" style="min-height:72px">${action.desc||''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Action type</label>
          <div class="action-type-grid">
            ${actionTypes.map(t=>`
              <div class="action-type-btn ${action.type===t?'active':''}" data-type="${t}">
                ${ico(actionTypeIcon[t]||I.checkSquare,16)}
                <span>${t.charAt(0).toUpperCase()+t.slice(1)}</span>
              </div>`).join('')}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" style="display:flex;align-items:center;gap:var(--sp-2)">
            <input type="checkbox" ${action.required?'checked':''} id="det-required" style="accent-color:#6366f1">
            Required action
          </label>
          <div style="font-size:11px;color:var(--c-text-3);margin-top:4px">Required actions must be completed before the phase can close</div>
        </div>
        <button class="btn btn-danger btn-sm w-full" id="det-delete" style="margin-top:auto">${I.trash} Delete action</button>
      </div>`;
  }

  function buildCanvas() {
    return wf.phases.map((phase, pi) => {
      const c = phase.color || '#6366f1';
      const actionCards = phase.actions.map(action => {
        const tc = actionTypeColor[action.type] || '#6366f1';
        const isSelected = selectedAction?.phaseId===phase.id && selectedAction?.actionId===action.id;
        return `<div class="wf-action ${isSelected?'selected':''}" data-pid="${phase.id}" data-aid="${action.id}">
          ${action.required?'<div class="wf-action-required" title="Required"></div>':''}
          <div class="wf-action-header">
            <div class="wf-action-icon" style="background:${tc}22">${ico(actionTypeIcon[action.type]||I.checkSquare,12)}</div>
            <div class="wf-action-name">${action.name}</div>
          </div>
          <div class="wf-action-type" style="color:${tc}">${action.type}</div>
        </div>`;
      }).join('');

      const col = `
        <div class="wf-phase" data-phaseid="${phase.id}">
          <div class="wf-phase-header">
            <div class="wf-phase-header-bg" style="background:${c}"></div>
            <div class="wf-phase-name" data-phasename="${phase.id}">${phase.name}</div>
            <span class="wf-phase-count" style="background:${c}22;color:${c}">${phase.actions.length}</span>
            <button class="btn-icon btn-sm wf-phase-del" data-delphase="${phase.id}" title="Delete phase" style="position:relative;z-index:1;margin-left:4px">${I.x}</button>
          </div>
          <div class="wf-actions">${actionCards}</div>
          <div class="wf-add-action" data-addaction="${phase.id}">+ Add action</div>
        </div>`;

      const connector = pi < wf.phases.length - 1
        ? `<div class="wf-connector"><div class="wf-connector-line" style="background:#cbd5e1"></div><svg width="8" height="8" viewBox="0 0 8 8" style="flex-shrink:0"><path d="M0 4h8M5 1l3 3-3 3" stroke="#cbd5e1" stroke-width="1.5" fill="none"/></svg></div>`
        : '';
      return col + connector;
    }).join('') + `
      <div class="wf-add-phase" id="wf-add-phase-btn">
        ${ico(I.plus,24)}
        <div style="font-size:13px;font-weight:600">Add Phase</div>
      </div>`;
  }

  function renderAll() {
    const hasPanel = !!selectedAction;
    shell.innerHTML = `
      <div class="wf-builder-topbar">
        <div class="wf-builder-topbar-left">
          <button class="topbar-menu-btn menu-toggle-btn" id="wf-menu-btn" title="Toggle menu">${I.menu}</button>
          <button class="btn-icon" id="wf-back-btn" title="Back to workflows">${I.chevronLeft}</button>
          <div>
            <div class="wf-builder-title" id="wf-title-label">${wf.name}</div>
            <div class="wf-builder-subtitle">${wf.projectType} · ${wf.phases.length} phases · ${wf.phases.reduce((s,p)=>s+p.actions.length,0)} actions</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:var(--sp-3)">
          <span class="badge" style="background:#f0fdf4;color:#16a34a;font-size:11px">${I.check} Auto-saved</span>
          <button class="btn btn-secondary btn-sm" id="wf-settings-btn">${I.settings} Settings</button>
        </div>
      </div>
      <div style="display:flex;flex:1;overflow:hidden">
        <div class="wf-builder-body" style="flex:1">
          <div class="wf-canvas">${buildCanvas()}</div>
        </div>
        ${hasPanel ? `<div class="wf-detail-panel">${buildDetailPanel()}</div>` : ''}
      </div>
      <div class="wf-projects-bar">
        <span class="wf-projects-bar-label">Projects using this workflow:</span>
        ${projs().length
          ? projs().map(p=>`<span class="badge" style="background:#e0e7ff;color:#4338ca">${p.name}</span>`).join('')
          : '<span style="color:var(--c-text-3);font-size:12px">None yet — assign projects from the project detail page</span>'}
      </div>`;
    bindEvents();
  }

  function bindEvents() {
    // Menu toggle — keep the main menu reachable from inside the builder
    document.getElementById('wf-menu-btn')?.addEventListener('click', () => {
      setSidebarHidden(!STATE.sidebarHidden);
    });

    // Back
    document.getElementById('wf-back-btn')?.addEventListener('click', () => {
      shell.remove();
      navigate('workflows');
    });

    // Phase name inline edit
    shell.querySelectorAll('.wf-phase-name[data-phasename]').forEach(el => {
      el.addEventListener('click', () => {
        const pid = +el.dataset.phasename;
        const phase = wf.phases.find(p=>p.id===pid);
        if(!phase) return;
        const input = document.createElement('input');
        input.className = 'wf-phase-name-input';
        input.value = phase.name;
        el.replaceWith(input);
        input.focus(); input.select();
        const commit = () => {
          phase.name = input.value.trim() || phase.name;
          renderAll();
        };
        input.onblur = commit;
        input.onkeydown = e => { if(e.key==='Enter') input.blur(); if(e.key==='Escape'){ input.value=phase.name; input.blur(); } };
      });
    });

    // Add phase
    document.getElementById('wf-add-phase-btn')?.addEventListener('click', () => {
      const colors = ['#6366f1','#8b5cf6','#0891b2','#d97706','#16a34a','#dc2626','#f59e0b','#06b6d4'];
      const nextId = Math.max(0,...wf.phases.map(p=>p.id))+1;
      wf.phases.push({ id:nextId, name:`Phase ${nextId}`, color: colors[(nextId-1)%colors.length], actions:[] });
      renderAll();
    });

    // Delete phase
    shell.querySelectorAll('.wf-phase-del[data-delphase]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const pid = +btn.dataset.delphase;
        wf.phases = wf.phases.filter(p=>p.id!==pid);
        if(selectedAction?.phaseId===pid) selectedAction=null;
        renderAll();
      });
    });

    // Add action
    shell.querySelectorAll('.wf-add-action[data-addaction]').forEach(el => {
      el.addEventListener('click', () => {
        const pid = +el.dataset.addaction;
        const phase = wf.phases.find(p=>p.id===pid);
        if(!phase) return;
        const nextId = Math.max(0,...phase.actions.map(a=>a.id),0)+1;
        const newAction = { id:nextId, name:'New action', type:'task', required:false, desc:'' };
        phase.actions.push(newAction);
        selectedAction = { phaseId:pid, actionId:nextId };
        renderAll();
      });
    });

    // Select action
    shell.querySelectorAll('.wf-action[data-pid]').forEach(el => {
      el.addEventListener('click', () => {
        const pid = +el.dataset.pid, aid = +el.dataset.aid;
        selectedAction = { phaseId:pid, actionId:aid };
        renderAll();
      });
    });

    // Detail panel interactions
    const detName = document.getElementById('det-name');
    const detDesc = document.getElementById('det-desc');
    if(detName && selectedAction) {
      const phase = wf.phases.find(p=>p.id===selectedAction.phaseId);
      const action = phase?.actions.find(a=>a.id===selectedAction.actionId);
      if(action) {
        detName.onblur = () => { action.name = detName.value.trim() || action.name; renderAll(); };
        detName.onkeydown = e => { if(e.key==='Enter') detName.blur(); };
        detDesc.onblur = () => { action.desc = detDesc.value.trim(); };

        document.getElementById('det-required')?.addEventListener('change', e => { action.required = e.target.checked; renderAll(); });

        shell.querySelectorAll('.action-type-btn[data-type]').forEach(btn => {
          btn.addEventListener('click', () => { action.type = btn.dataset.type; renderAll(); });
        });

        document.getElementById('det-delete')?.addEventListener('click', () => {
          phase.actions = phase.actions.filter(a=>a.id!==action.id);
          selectedAction = null;
          renderAll();
        });
        document.getElementById('detail-close')?.addEventListener('click', () => { selectedAction = null; renderAll(); });
      }
    }
  }

  renderAll();
}

// --- REPORTS ---
const OOB_REPORTS = [
  { id:'oob1', name:'Health Score by Project',    vizType:'bar',   icon:'bar',   color:'#6366f1', description:'Current health score for every project.' },
  { id:'oob2', name:'Budget vs Spend',             vizType:'bar2',  icon:'bar',   color:'#f59e0b', description:'Budget allocated vs actual spend per project.' },
  { id:'oob3', name:'Task Status Distribution',    vizType:'pie',   icon:'pie',   color:'#10b981', description:'Breakdown of tasks by status across all projects.' },
  { id:'oob4', name:'Team Workload',               vizType:'bar3',  icon:'bar',   color:'#8b5cf6', description:'Open task count per team member.' },
  { id:'oob5', name:'Risk Severity Breakdown',     vizType:'pie2',  icon:'pie',   color:'#ef4444', description:'Distribution of open risks by severity level.' },
  { id:'oob6', name:'Project KPI Summary',         vizType:'pivot', icon:'pivot', color:'#0891b2', description:'Progress, budget burn, tasks and health in one pivot.' },
];

const METRIC_LABELS = { health:'Health Scores', budget:'Budget vs Spend', tasks:'Task Distribution', team:'Team Workload', risk:'Risk Breakdown', pivot:'Project KPI Pivot' };
const VIZ_LABELS = { bar:'Bar Chart', bar2:'Grouped Bar', bar3:'Bar Chart', pie:'Pie Chart', pie2:'Pie Chart', pivot:'Pivot Table' };

function openReportDetail(type, id) {
  STATE.openReport = { type, id };
  renderReports();
}

function renderOnePager() {
  const p = STATE.currentProject;
  if (!p) { navigate('projects'); return; }
  const h = hs(p.health);
  const budgetPct = p.budget ? Math.round((p.spent / p.budget) * 100) : 0;
  const openRisks = p.risks.filter(r => r.open);

  renderTopbar([{ label: p.name, page: 'project-detail' }, { label: '1 Pager' }]);

  const stat = (label, value, sub='') => `
    <div class="op-stat">
      <div class="op-stat-label">${label}</div>
      <div class="op-stat-value">${value}${sub ? `<span class="op-stat-sub">${sub}</span>` : ''}</div>
    </div>`;

  document.getElementById('content').innerHTML = `
    <div class="page-header op-no-print">
      <div>
        <h1 class="page-title">1 Pager</h1>
        <p class="page-sub">A single-page executive summary of ${p.name}</p>
      </div>
      <button class="btn btn-secondary" id="op-print-btn">${I.fileText} Print / PDF</button>
    </div>

    <div class="card op-sheet">
      <div class="op-head">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <div class="project-card-type">${p.type}</div>
            ${statusBadge(p.status)}
            ${priorityBadge(p.priority)}
            ${healthBadge(p.health)}
          </div>
          <div class="op-title">${p.name}</div>
        </div>
        <div class="op-head-meta">
          <span>${ico(I.users)} PM: ${p.pm}</span>
          <span>${ico(I.clock)} ${p.startDate} → ${p.due}</span>
        </div>
      </div>

      <div class="op-stats">
        ${stat('Progress', p.progress + '%')}
        ${stat('Health', p.health == null ? 'N/A' : p.health, p.health == null ? '' : ' / 100')}
        ${stat('Budget Used', fmt(p.spent), ' of ' + fmt(p.budget) + ` · ${budgetPct}%`)}
        ${stat('Tasks', `${p.tasks.done}/${p.tasks.total}`, p.tasks.overdue ? ` · ${p.tasks.overdue} overdue` : ' done')}
        ${stat('Open Risks', openRisks.length)}
      </div>

      <div class="grid-2 op-body">
        <div>
          <div class="op-block">
            <div class="op-block-title">Summary</div>
            <p style="font-size:13px;color:#475569;line-height:1.6;margin:0">${p.description}</p>
          </div>
          <div class="op-block">
            <div class="op-block-title">Milestones</div>
            ${p.milestones.length ? p.milestones.map(m => `
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div style="width:10px;height:10px;background:${m.status==='done'?'#10b981':m.status==='active'?'#6366f1':'#cbd5e1'};border-radius:50%"></div>
                  <span style="font-size:13px;font-weight:500">${m.name}</span>
                </div>
                <span class="text-xs text-muted">${m.date}</span>
              </div>
            `).join('') : '<p class="text-muted text-sm">No milestones defined.</p>'}
          </div>
        </div>
        <div>
          <div class="op-block">
            <div class="op-block-title">Open Risks</div>
            ${openRisks.length ? openRisks.map(r => `
              <div class="risk-row">
                <div class="risk-severity">${priorityBadge(r.severity)}</div>
                <div style="flex:1;font-size:13px">${r.desc}</div>
                <div class="text-xs text-muted">${r.owner}</div>
              </div>
            `).join('') : '<p class="text-muted text-sm">No open risks.</p>'}
          </div>
          <div class="op-block">
            <div class="op-block-title">Team</div>
            <div class="flex items-center gap-3">
              ${avatarGroup(p.team)}
              <span class="text-sm text-muted">${p.team.length} members</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  document.getElementById('op-print-btn')?.addEventListener('click', () => window.print());
}

// Global / portfolio 1 Pager — single-page executive overview across all projects.
function renderPortfolioOnePager() {
  renderTopbar([{ label: '1 Pager' }]);

  const projects = DATA.projects;
  const active = projects.filter(p => p.status === 'active').length;
  const atRisk = projects.filter(p => p.status === 'at-risk' || p.status === 'on-hold').length;
  const withHealth = projects.filter(p => p.health != null);
  const avgHealth = withHealth.length ? Math.round(withHealth.reduce((a, p) => a + p.health, 0) / withHealth.length) : null;
  const totalBudget = projects.reduce((a, p) => a + (p.budget || 0), 0);
  const totalSpent = projects.reduce((a, p) => a + (p.spent || 0), 0);
  const budgetPct = totalBudget ? Math.round((totalSpent / totalBudget) * 100) : 0;
  const totalOverdue = projects.reduce((a, p) => a + (p.tasks.overdue || 0), 0);
  const openRisks = projects.reduce((a, p) => a + p.risks.filter(r => r.open).length, 0);

  const stat = (label, value, sub = '') => `
    <div class="op-stat">
      <div class="op-stat-label">${label}</div>
      <div class="op-stat-value">${value}${sub ? `<span class="op-stat-sub">${sub}</span>` : ''}</div>
    </div>`;

  const projectRow = p => {
    const pBudgetPct = p.budget ? Math.round((p.spent / p.budget) * 100) : 0;
    const openR = p.risks.filter(r => r.open).length;
    const barCls = p.health == null ? 'blue' : (p.health >= 75 ? 'green' : p.health >= 50 ? 'amber' : 'red');
    return `
      <tr class="op-portfolio-row" data-project="${p.id}">
        <td>
          <div style="font-weight:600;font-size:13px">${p.name}</div>
          <div class="text-xs text-muted">${p.type} · PM ${p.pm}</div>
        </td>
        <td>${statusBadge(p.status)}</td>
        <td>${healthBadge(p.health)}</td>
        <td style="min-width:120px">
          <div class="progress-bar"><div class="progress-fill ${barCls}" style="width:${p.progress}%"></div></div>
          <div class="text-xs text-muted mt-1">${p.progress}%</div>
        </td>
        <td class="text-sm">${fmt(p.spent)} <span class="text-xs text-muted">/ ${fmt(p.budget)} · ${pBudgetPct}%</span></td>
        <td class="text-sm">${p.tasks.done}/${p.tasks.total}${p.tasks.overdue ? ` <span style="color:var(--c-danger)">· ${p.tasks.overdue} overdue</span>` : ''}</td>
        <td class="text-sm" style="text-align:center">${openR || '—'}</td>
      </tr>`;
  };

  document.getElementById('content').innerHTML = `
    <div class="page-header op-no-print">
      <div>
        <h1 class="page-title">1 Pager</h1>
        <p class="page-sub">A single-page executive overview across all ${projects.length} projects</p>
      </div>
      <button class="btn btn-secondary" id="op-print-btn">${I.fileText} Print / PDF</button>
    </div>

    <div class="card op-sheet">
      <div class="op-head">
        <div>
          <div class="op-title">Portfolio Overview</div>
          <div class="text-sm text-muted mt-1">${active} active · ${atRisk} needs attention · ${projects.length} total</div>
        </div>
        <div class="op-head-meta">
          <span>${ico(I.clock)} As of ${DATA.user && DATA.user.today ? DATA.user.today : 'Jun 27, 2026'}</span>
        </div>
      </div>

      <div class="op-stats">
        ${stat('Projects', projects.length, ` · ${active} active`)}
        ${stat('Avg Health', avgHealth == null ? 'N/A' : avgHealth, avgHealth == null ? '' : ' / 100')}
        ${stat('Budget Used', fmt(totalSpent), ' of ' + fmt(totalBudget) + ` · ${budgetPct}%`)}
        ${stat('Overdue Tasks', totalOverdue)}
        ${stat('Open Risks', openRisks)}
      </div>

      <div class="op-body">
        <div class="op-block">
          <div class="op-block-title">Projects</div>
          <table class="op-portfolio-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Health</th>
                <th>Progress</th>
                <th>Budget</th>
                <th>Tasks</th>
                <th style="text-align:center">Risks</th>
              </tr>
            </thead>
            <tbody>
              ${projects.map(projectRow).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;

  document.getElementById('op-print-btn')?.addEventListener('click', () => window.print());
  document.querySelectorAll('.op-portfolio-row[data-project]').forEach(el => {
    el.addEventListener('click', () => navigate('project-detail', +el.dataset.project));
  });
}

function renderReports() {
  if (!STATE.reportsTab) STATE.reportsTab = 'oob';

  if (STATE.openReport) { renderReportDetail(STATE.openReport); return; }

  renderTopbar([{ label: 'Reports' }]);

  const oobReports = OOB_REPORTS;

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Reports</h1>
        <p class="page-sub">Visualise project data with built-in and custom reports</p>
      </div>
      <button class="btn btn-primary" id="rpt-new-btn">${I.plus} New Report</button>
    </div>

    <div class="tab-bar" style="margin-bottom:24px">
      <div class="tab-item ${STATE.reportsTab==='oob'?'active':''}" data-tab="oob">Built-in Reports</div>
      <div class="tab-item ${STATE.reportsTab==='custom'?'active':''}" data-tab="custom">Custom Reports</div>
    </div>

    <div id="rpt-body"></div>
  `;

  document.querySelectorAll('.tab-item[data-tab]').forEach(el => {
    el.addEventListener('click', () => { STATE.reportsTab = el.dataset.tab; renderReports(); });
  });
  document.getElementById('rpt-new-btn').addEventListener('click', () => openReportModal());

  if (STATE.reportsTab === 'oob') renderOobReports(oobReports);
  else renderCustomReports();
}

// ---- chart helpers ----
function svgBar(values, labels, colors, maxVal) {
  const W = 340, H = 140, pad = 30, bGap = 8;
  const n = values.length;
  const bW = Math.max(12, (W - pad*2 - bGap*(n-1)) / n);
  const max = maxVal || Math.max(...values, 1);
  const bars = values.map((v, i) => {
    const bH = Math.round((v / max) * (H - 28));
    const x = pad + i * (bW + bGap);
    const y = H - 18 - bH;
    const label = labels[i].length > 8 ? labels[i].slice(0,7)+'…' : labels[i];
    return `
      <rect x="${x}" y="${y}" width="${bW}" height="${bH}" rx="3" fill="${colors[i % colors.length]}" opacity="0.85"/>
      <text x="${x + bW/2}" y="${H - 4}" text-anchor="middle" font-size="9" fill="#64748B">${label}</text>
      <text x="${x + bW/2}" y="${y - 4}" text-anchor="middle" font-size="9" fill="#94A3B8">${v}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:140px">${bars}</svg>`;
}

function svgBar2(valA, valB, labels, colorA, colorB) {
  const W = 340, H = 140, pad = 30, bGap = 14, pairGap = 4;
  const n = labels.length;
  const pairW = (W - pad*2 - bGap*(n-1)) / n;
  const bW = (pairW - pairGap) / 2;
  const max = Math.max(...valA, ...valB, 1);
  const bars = labels.map((lbl, i) => {
    const x = pad + i * (pairW + bGap);
    const hA = Math.round((valA[i] / max) * (H - 28));
    const hB = Math.round((valB[i] / max) * (H - 28));
    const yA = H - 18 - hA, yB = H - 18 - hB;
    const label = lbl.length > 8 ? lbl.slice(0,7)+'…' : lbl;
    return `
      <rect x="${x}" y="${yA}" width="${bW}" height="${hA}" rx="2" fill="${colorA}" opacity="0.85"/>
      <rect x="${x+bW+pairGap}" y="${yB}" width="${bW}" height="${hB}" rx="2" fill="${colorB}" opacity="0.85"/>
      <text x="${x + pairW/2}" y="${H-4}" text-anchor="middle" font-size="9" fill="#64748B">${label}</text>`;
  }).join('');
  const legend = `
    <rect x="${pad}" y="2" width="10" height="8" rx="2" fill="${colorA}"/>
    <text x="${pad+13}" y="10" font-size="9" fill="#94A3B8">Budget</text>
    <rect x="${pad+60}" y="2" width="10" height="8" rx="2" fill="${colorB}"/>
    <text x="${pad+73}" y="10" font-size="9" fill="#94A3B8">Spent</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:140px">${legend}${bars}</svg>`;
}

function svgPie(slices) {
  // slices: [{label, value, color}]
  const total = slices.reduce((s,x) => s+x.value, 0) || 1;
  const cx = 70, cy = 70, r = 58;
  let angle = -Math.PI / 2;
  const paths = slices.map(s => {
    const frac = s.value / total;
    const a1 = angle, a2 = angle + frac * 2 * Math.PI;
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const large = frac > 0.5 ? 1 : 0;
    angle = a2;
    if (frac < 0.001) return '';
    return `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large},1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${s.color}" opacity="0.88"/>`;
  }).join('');
  const legend = slices.map((s,i) => `
    <rect x="148" y="${10 + i*20}" width="10" height="10" rx="2" fill="${s.color}"/>
    <text x="162" y="${19 + i*20}" font-size="10" fill="#94A3B8">${s.label} (${s.value})</text>`).join('');
  return `<svg viewBox="0 0 340 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:140px">${paths}${legend}</svg>`;
}

function svgPivot(rows, cols, data) {
  const cellW = 72, cellH = 28, hdrH = 30, rowLblW = 110;
  const W = rowLblW + cols.length * cellW + 2;
  const H = hdrH + rows.length * cellH + 2;
  let cells = '';
  cols.forEach((col, ci) => {
    cells += `<rect x="${rowLblW + ci*cellW}" y="0" width="${cellW}" height="${hdrH}" fill="#1E293B"/>
    <text x="${rowLblW + ci*cellW + cellW/2}" y="19" text-anchor="middle" font-size="10" font-weight="600" fill="#94A3B8">${col}</text>`;
  });
  rows.forEach((row, ri) => {
    const bg = ri % 2 === 0 ? '#0F172A' : '#162032';
    cells += `<rect x="0" y="${hdrH + ri*cellH}" width="${W}" height="${cellH}" fill="${bg}"/>
    <text x="8" y="${hdrH + ri*cellH + 18}" font-size="10" fill="#CBD5E1">${row}</text>`;
    cols.forEach((col, ci) => {
      const val = data[ri][ci];
      const isNum = typeof val === 'number';
      const color = isNum && val >= 75 ? '#10b981' : isNum && val >= 50 ? '#f59e0b' : '#CBD5E1';
      cells += `<text x="${rowLblW + ci*cellW + cellW/2}" y="${hdrH + ri*cellH + 18}" text-anchor="middle" font-size="10" fill="${color}">${val}</text>`;
    });
  });
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:${Math.min(H,180)}px;border-radius:6px;overflow:hidden">${cells}</svg>`;
}

// --- computed chart data from live DATA ---
function chartHealthBar() {
  const ps = DATA.projects.filter(p => p.health != null);
  return svgBar(ps.map(p=>p.health), ps.map(p=>p.name),
    ['#6366f1','#8b5cf6','#10b981','#f59e0b','#ef4444','#0891b2'], 100);
}
function chartBudgetBar() {
  const ps = DATA.projects;
  return svgBar2(ps.map(p=>Math.round(p.budget/1000)), ps.map(p=>Math.round(p.spent/1000)),
    ps.map(p=>p.name), '#6366f1', '#f59e0b');
}
function chartTaskPie() {
  const all = Object.values(DATA.tasks).flat();
  const counts = {};
  all.forEach(t => { counts[t.status] = (counts[t.status]||0)+1; });
  const palette = { done:'#10b981', 'in-progress':'#6366f1', todo:'#94A3B8', blocked:'#ef4444' };
  const labels = { done:'Done', 'in-progress':'In Progress', todo:'To Do', blocked:'Blocked' };
  return svgPie(Object.entries(counts).map(([k,v]) => ({ label: labels[k]||k, value:v, color: palette[k]||'#6366f1' })));
}
function chartTeamBar() {
  const all = Object.values(DATA.tasks).flat().filter(t => t.status !== 'done');
  const counts = {};
  DATA.team.forEach(m => { counts[m.initials] = 0; });
  all.forEach(t => { if (counts[t.assignee] !== undefined) counts[t.assignee]++; });
  return svgBar(Object.values(counts), DATA.team.map(m=>m.name.split(' ')[0]),
    DATA.team.map(m=>m.color), null);
}
function chartRiskPie() {
  const risks = DATA.projects.flatMap(p => p.risks||[]).filter(r=>r.open);
  const counts = { high:0, medium:0, low:0 };
  risks.forEach(r => { counts[r.severity] = (counts[r.severity]||0)+1; });
  return svgPie([
    { label:'High', value:counts.high, color:'#ef4444' },
    { label:'Medium', value:counts.medium, color:'#f59e0b' },
    { label:'Low', value:counts.low, color:'#10b981' },
  ]);
}
function chartPivot() {
  const rows = DATA.projects.map(p=>p.name);
  const cols = ['Health','Progress','Budget%','Tasks Done'];
  const data = DATA.projects.map(p => [
    p.health ?? '—',
    p.progress,
    Math.round(p.spent/p.budget*100),
    p.tasks.done
  ]);
  return svgPivot(rows, cols, data);
}

const OOB_CHARTS = {
  oob1: chartHealthBar,
  oob2: chartBudgetBar,
  oob3: chartTaskPie,
  oob4: chartTeamBar,
  oob5: chartRiskPie,
  oob6: chartPivot,
};

// metric → live chart for custom reports
function chartForMetric(metric) {
  const map = { health: chartHealthBar, budget: chartBudgetBar, tasks: chartTaskPie, team: chartTeamBar, risk: chartRiskPie, pivot: chartPivot };
  return (map[metric] || chartHealthBar)();
}

function renderOobReports(oobReports) {
  const iconMap = {
    bar: I.reports, pie: I.pieChart, pivot: I.pivot
  };
  document.getElementById('rpt-body').innerHTML = `
    <div class="rpt-grid">
      ${oobReports.map(r => `
        <div class="rpt-card rpt-card-clickable" data-id="${r.id}">
          <div class="rpt-card-header">
            <span class="rpt-card-icon" style="background:${r.color}18;color:${r.color}">${iconMap[r.icon]||I.reports}</span>
            <div>
              <div class="rpt-card-name">${r.name}</div>
              <div class="rpt-card-desc">${r.description}</div>
            </div>
          </div>
          <div class="rpt-chart-area">${OOB_CHARTS[r.id]?.() || ''}</div>
        </div>
      `).join('')}
    </div>`;

  document.querySelectorAll('#rpt-body .rpt-card-clickable').forEach(card => {
    card.addEventListener('click', () => openReportDetail('oob', card.dataset.id));
  });
}

function renderCustomReports() {
  const reports = DATA.reports;
  const metricOptions = [
    { value:'health', label:'Health Scores' },
    { value:'budget', label:'Budget vs Spend' },
    { value:'tasks',  label:'Task Distribution' },
    { value:'team',   label:'Team Workload' },
    { value:'risk',   label:'Risk Breakdown' },
    { value:'pivot',  label:'Project KPI Pivot' },
  ];
  const vizOptions = [
    { value:'bar',   label:'Bar Chart' },
    { value:'pie',   label:'Pie Chart' },
    { value:'pivot', label:'Pivot Table' },
  ];

  document.getElementById('rpt-body').innerHTML = `
    ${reports.length === 0 ? `
      <div class="empty-state">
        ${I.reports}
        <h3>No custom reports yet</h3>
        <p>Create a report to visualise your project data your way.</p>
        <button class="btn btn-primary" id="rpt-empty-new">${I.plus} New Report</button>
      </div>` : `
      <div class="rpt-grid">
        ${reports.map(r => `
          <div class="rpt-card rpt-card-clickable" data-id="${r.id}">
            <div class="rpt-card-header">
              <span class="rpt-card-icon" style="background:#6366f118;color:#6366f1">${I.reports}</span>
              <div style="flex:1">
                <div class="rpt-card-name">${r.name}</div>
                <div class="rpt-card-desc">${r.description}</div>
              </div>
              <div class="rpt-card-actions">
                <button class="btn-icon rpt-edit-btn" data-id="${r.id}" title="Edit">${I.edit}</button>
                <button class="btn-icon rpt-del-btn" data-id="${r.id}" title="Delete">${I.trash}</button>
              </div>
            </div>
            <div class="rpt-chart-area">${chartForMetric(r.metric)}</div>
            <div class="rpt-card-meta">
              <span>By ${r.createdBy}</span>
              <span>${r.createdAt}</span>
              ${r.tags.map(t=>`<span class="rpt-tag">${t}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>`}
  `;

  document.getElementById('rpt-empty-new')?.addEventListener('click', () => openReportModal());
  document.querySelectorAll('#rpt-body .rpt-card-clickable').forEach(card => {
    card.addEventListener('click', () => openReportDetail('custom', card.dataset.id));
  });
  document.querySelectorAll('.rpt-edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const r = DATA.reports.find(x => x.id === btn.dataset.id);
      if (r) openReportModal(r);
    });
  });
  document.querySelectorAll('.rpt-del-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!confirm('Delete this report?')) return;
      DATA.reports = DATA.reports.filter(x => x.id !== btn.dataset.id);
      toast('Report deleted');
      renderReports();
    });
  });
}

// --- REPORT DETAIL (full inner page) ---
function enlargeChart(svg) {
  return svg.replace(/height:\s*\d+px/, 'height:380px');
}

function renderReportDetail(ref) {
  let r, chart, isCustom, metricLabel, vizLabel, color;
  if (ref.type === 'oob') {
    r = OOB_REPORTS.find(x => x.id === ref.id);
    if (!r) { STATE.openReport = null; return renderReports(); }
    chart = OOB_CHARTS[r.id]?.() || '';
    isCustom = false;
    color = r.color;
  } else {
    r = DATA.reports.find(x => x.id === ref.id);
    if (!r) { STATE.openReport = null; return renderReports(); }
    chart = chartForMetric(r.metric);
    isCustom = true;
    color = '#6366f1';
  }
  metricLabel = isCustom ? (METRIC_LABELS[r.metric] || r.metric) : (METRIC_LABELS[r.id] || r.name);
  vizLabel = VIZ_LABELS[r.vizType] || r.vizType || '—';

  renderTopbar([{ label: 'Reports', page: 'reports' }, { label: r.name }]);

  const metaItem = (label, value) => `
    <div class="rpt-detail-meta-item">
      <div class="rpt-detail-meta-label">${label}</div>
      <div class="rpt-detail-meta-value">${value}</div>
    </div>`;

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div style="display:flex;align-items:flex-start;gap:14px">
        <button class="btn btn-secondary btn-sm" id="rpt-detail-back">${I.chevronLeft} Back</button>
        <div style="display:flex;align-items:flex-start;gap:12px">
          <span class="rpt-card-icon" style="background:${color}18;color:${color};width:42px;height:42px">${I.reports}</span>
          <div>
            <h1 class="page-title">${r.name}</h1>
            <p class="page-sub">${r.description || ''}</p>
          </div>
        </div>
      </div>
      ${isCustom ? `
        <div style="display:flex;gap:8px">
          <button class="btn btn-secondary" id="rpt-detail-edit">${I.edit} Edit</button>
          <button class="btn btn-secondary" id="rpt-detail-del">${I.trash} Delete</button>
        </div>` : `
        <span class="rpt-detail-badge">Built-in</span>`}
    </div>

    <div class="rpt-detail-chart">${enlargeChart(chart)}</div>

    <div class="rpt-detail-meta">
      ${metaItem('Data source', metricLabel)}
      ${metaItem('Chart type', vizLabel)}
      ${isCustom ? metaItem('Created by', r.createdBy) : metaItem('Origin', 'Built-in report')}
      ${isCustom ? metaItem('Created', r.createdAt) : ''}
      ${isCustom && r.tags?.length ? metaItem('Tags', r.tags.map(t=>`<span class="rpt-tag">${t}</span>`).join(' ')) : ''}
    </div>
  `;

  document.getElementById('rpt-detail-back').addEventListener('click', () => {
    STATE.openReport = null;
    renderReports();
  });
  document.getElementById('rpt-detail-edit')?.addEventListener('click', () => openReportModal(r));
  document.getElementById('rpt-detail-del')?.addEventListener('click', () => {
    if (!confirm('Delete this report?')) return;
    DATA.reports = DATA.reports.filter(x => x.id !== r.id);
    STATE.openReport = null;
    toast('Report deleted');
    renderReports();
  });
}

function openReportModal(existing) {
  const isEdit = !!existing;
  const overlay = document.getElementById('modal-overlay');
  const box = document.getElementById('modal-box');
  overlay.classList.remove('hidden');
  box.innerHTML = `
    <div class="modal-header">
      <h3>${isEdit ? 'Edit' : 'New'} Report</h3>
      <button class="btn-icon" id="rpt-modal-close">${I.x}</button>
    </div>
    <div class="modal-body" style="display:flex;flex-direction:column;gap:16px">
      <div class="form-group">
        <label class="form-label">Report name</label>
        <input class="form-input" id="rm-name" value="${existing?.name||''}" placeholder="e.g. Q3 Budget Overview"/>
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <input class="form-input" id="rm-desc" value="${existing?.description||''}" placeholder="What does this report show?"/>
      </div>
      <div class="form-row">
        <div class="form-group" style="flex:1">
          <label class="form-label">Data source</label>
          <select class="form-select" id="rm-metric">
            <option value="health" ${existing?.metric==='health'?'selected':''}>Health Scores</option>
            <option value="budget" ${existing?.metric==='budget'?'selected':''}>Budget vs Spend</option>
            <option value="tasks"  ${existing?.metric==='tasks' ?'selected':''}>Task Distribution</option>
            <option value="team"   ${existing?.metric==='team'  ?'selected':''}>Team Workload</option>
            <option value="risk"   ${existing?.metric==='risk'  ?'selected':''}>Risk Breakdown</option>
            <option value="pivot"  ${existing?.metric==='pivot' ?'selected':''}>Project KPI Pivot</option>
          </select>
        </div>
        <div class="form-group" style="flex:1">
          <label class="form-label">Chart type</label>
          <select class="form-select" id="rm-viztype">
            <option value="bar"   ${existing?.vizType==='bar'  ?'selected':''}>Bar Chart</option>
            <option value="pie"   ${existing?.vizType==='pie'  ?'selected':''}>Pie Chart</option>
            <option value="pivot" ${existing?.vizType==='pivot'?'selected':''}>Pivot Table</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Tags <span style="color:#64748B;font-weight:400">(comma-separated)</span></label>
        <input class="form-input" id="rm-tags" value="${(existing?.tags||[]).join(', ')}" placeholder="e.g. budget, q3"/>
      </div>
      <div id="rm-preview" style="background:#0F172A;border-radius:8px;padding:12px;margin-top:4px">
        <div style="font-size:11px;color:#475569;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.6px">Preview</div>
        ${chartForMetric(existing?.metric||'health')}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="rpt-modal-cancel">Cancel</button>
      <button class="btn btn-primary" id="rpt-modal-save">${isEdit ? 'Save changes' : 'Create report'}</button>
    </div>`;

  const close = () => { overlay.classList.add('hidden'); box.innerHTML = ''; };
  document.getElementById('rpt-modal-close').addEventListener('click', close);
  document.getElementById('rpt-modal-cancel').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  // Live preview update
  document.getElementById('rm-metric').addEventListener('change', e => {
    document.getElementById('rm-preview').innerHTML = `
      <div style="font-size:11px;color:#475569;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.6px">Preview</div>
      ${chartForMetric(e.target.value)}`;
  });

  document.getElementById('rpt-modal-save').addEventListener('click', () => {
    const name = document.getElementById('rm-name').value.trim();
    if (!name) { toast('Name is required', 'error'); return; }
    const tags = document.getElementById('rm-tags').value.split(',').map(t=>t.trim()).filter(Boolean);
    if (isEdit) {
      Object.assign(existing, {
        name,
        description: document.getElementById('rm-desc').value.trim(),
        metric: document.getElementById('rm-metric').value,
        vizType: document.getElementById('rm-viztype').value,
        tags,
      });
      toast('Report updated');
    } else {
      DATA.reports.push({
        id: 'cr' + Date.now(),
        name,
        description: document.getElementById('rm-desc').value.trim(),
        metric: document.getElementById('rm-metric').value,
        vizType: document.getElementById('rm-viztype').value,
        createdBy: DATA.user.initials,
        createdAt: new Date().toISOString().slice(0,10),
        tags,
      });
      toast('Report created');
    }
    close();
    STATE.reportsTab = 'custom';
    renderReports();
  });
}

// --- RESOURCES ---
function renderResources() {
  if (!STATE.resourceTab) STATE.resourceTab = 'overview';
  renderTopbar([{ label: 'Resources' }]);

  const totalBudget = DATA.costCategories.reduce((s,c)=>s+c.budget,0);
  const totalSpent  = DATA.costCategories.reduce((s,c)=>s+c.spent,0);
  const totalHeadcount = DATA.departments.reduce((s,d)=>s+d.headcount,0);
  const totalAllocated = DATA.departments.reduce((s,d)=>s+d.allocated,0);
  const avgCapacity = Math.round(DATA.peopleAllocations.reduce((s,p)=>{
    const used = p.allocations.reduce((a,x)=>a+x.pct,0) + p.otherPct;
    return s + used;
  }, 0) / DATA.peopleAllocations.length);

  const tabs = [
    { id:'overview',    label:'Overview' },
    { id:'budget',      label:'Budget' },
    { id:'people',      label:'People' },
    { id:'departments', label:'Departments' },
  ];

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Resources</h1>
        <p class="page-sub">Budget, headcount and capacity across all projects and departments</p>
      </div>
      <button class="btn btn-primary" id="res-request-btn">${ico(I.plus,13)} Request Resource</button>
    </div>

    <div class="tab-bar" style="margin-bottom:24px;display:flex;flex-direction:row">
      ${tabs.map(t=>`<div class="tab-item ${STATE.resourceTab===t.id?'active':''}" data-tab="${t.id}">${t.label}</div>`).join('')}
    </div>

    <div id="res-body"></div>
  `;

  document.querySelectorAll('.tab-item[data-tab]').forEach(el => {
    el.addEventListener('click', () => { STATE.resourceTab = el.dataset.tab; renderResources(); });
  });
  document.getElementById('res-request-btn').addEventListener('click', () => showToast('Resource request flow coming soon', 'info'));

  const body = document.getElementById('res-body');
  if      (STATE.resourceTab === 'overview')    renderResourcesOverview(body, totalBudget, totalSpent, totalHeadcount, totalAllocated, avgCapacity);
  else if (STATE.resourceTab === 'budget')      renderResourcesBudget(body);
  else if (STATE.resourceTab === 'people')      renderResourcesPeople(body);
  else if (STATE.resourceTab === 'departments') renderResourcesDepts(body);
}

function resBudgetBar(spent, budget, color) {
  const pct = Math.min(100, Math.round(spent / budget * 100));
  const barColor = pct > 90 ? '#ef4444' : pct > 75 ? '#f59e0b' : color || '#6366f1';
  return `
    <div style="display:flex;align-items:center;gap:8px">
      <div style="flex:1;height:6px;border-radius:4px;background:var(--border)">
        <div style="width:${pct}%;height:100%;border-radius:4px;background:${barColor};transition:width .4s"></div>
      </div>
      <span style="font-size:11px;font-weight:600;color:${barColor};width:32px;text-align:right">${pct}%</span>
    </div>`;
}

function resFmt(n) { return n>=1000000?'$'+(n/1000000).toFixed(1)+'M':'$'+(n/1000).toFixed(0)+'k'; }

function renderResourcesOverview(el, totalBudget, totalSpent, totalHeadcount, totalAllocated, avgCapacity) {
  const remaining = totalBudget - totalSpent;
  const burnPct   = Math.round(totalSpent / totalBudget * 100);

  el.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px">
      ${resKpi('Total Budget',    resFmt(totalBudget),   '#eef2ff','#6366f1', I.dollar,   `${burnPct}% consumed`)}
      ${resKpi('Spent to Date',   resFmt(totalSpent),    burnPct>80?'#fef2f2':'#f0fdf4', burnPct>80?'#ef4444':'#16a34a', I.trendUp, `${resFmt(remaining)} remaining`)}
      ${resKpi('Total Headcount', totalHeadcount+' ppl', '#f0fdf4','#10b981', I.users,    `${totalAllocated} allocated`)}
      ${resKpi('Avg Capacity',    avgCapacity+'%',       avgCapacity>95?'#fef2f2':'#fffbeb', avgCapacity>95?'#ef4444':'#f59e0b', I.chart, avgCapacity>95?'Over capacity':'Utilisation')}
    </div>

    <div style="margin-bottom:28px">
      <div class="card" style="padding:20px">
        <div class="section-title" style="margin-bottom:16px">Budget by Cost Category</div>
        ${DATA.costCategories.map(c=>`
          <div style="margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="font-size:13px;font-weight:500">${c.name}</span>
              <span style="font-size:12px;color:var(--text-muted)">${resFmt(c.spent)} / ${resFmt(c.budget)}</span>
            </div>
            ${resBudgetBar(c.spent, c.budget, c.color)}
          </div>`).join('')}
      </div>
    </div>

    <div class="card" style="padding:20px">
      <div class="section-title" style="margin-bottom:16px">Department Headcount &amp; Allocation</div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px">
        ${DATA.departments.map(d=>{
          const allocPct = Math.round(d.allocated/d.headcount*100);
          return `
            <div style="text-align:center;padding:16px;border-radius:10px;border:1px solid var(--border)">
              <div style="width:44px;height:44px;border-radius:50%;background:${d.color}18;border:2px solid ${d.color};display:flex;align-items:center;justify-content:center;margin:0 auto 10px;font-size:18px;font-weight:700;color:${d.color}">${d.headcount}</div>
              <div style="font-size:13px;font-weight:600;margin-bottom:2px">${d.name}</div>
              <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px">${d.allocated}/${d.headcount} allocated</div>
              ${resBudgetBar(d.allocated, d.headcount, d.color)}
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

function resKpi(label, value, bg, color, icon, sub) {
  return `
    <div class="card" style="padding:18px;background:${bg}">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <span style="display:inline-flex;width:32px;height:32px;border-radius:8px;background:${color}20;color:${color};align-items:center;justify-content:center">${ico(icon,16)}</span>
        <span style="font-size:12px;color:var(--text-muted);font-weight:500">${label}</span>
      </div>
      <div style="font-size:24px;font-weight:700;color:${color}">${value}</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px">${sub}</div>
    </div>`;
}

function renderResourcesBudget(el) {
  el.innerHTML = `
    <div style="margin-bottom:24px">
      <div class="card" style="padding:20px">
        <div class="section-title" style="margin-bottom:16px">Cost Category Breakdown</div>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead>
            <tr style="border-bottom:2px solid var(--border)">
              <th style="text-align:left;padding:6px 8px;color:var(--text-muted);font-weight:600">Category</th>
              <th style="text-align:right;padding:6px 8px;color:var(--text-muted);font-weight:600">Budget</th>
              <th style="text-align:right;padding:6px 8px;color:var(--text-muted);font-weight:600">Spent</th>
              <th style="text-align:right;padding:6px 8px;color:var(--text-muted);font-weight:600">Remaining</th>
              <th style="padding:6px 8px;color:var(--text-muted);font-weight:600;width:100px">Burn</th>
            </tr>
          </thead>
          <tbody>
            ${DATA.costCategories.map(c=>{
              const rem = c.budget-c.spent;
              const pct = Math.round(c.spent/c.budget*100);
              const barColor = pct>90?'#ef4444':pct>75?'#f59e0b':c.color;
              return `<tr style="border-bottom:1px solid var(--border)">
                <td style="padding:10px 8px">
                  <span style="display:inline-flex;align-items:center;gap:6px">
                    <span style="width:8px;height:8px;border-radius:50%;background:${c.color};flex-shrink:0"></span>
                    ${c.name}
                  </span>
                </td>
                <td style="padding:10px 8px;text-align:right;font-weight:500">${resFmt(c.budget)}</td>
                <td style="padding:10px 8px;text-align:right;color:${barColor};font-weight:600">${resFmt(c.spent)}</td>
                <td style="padding:10px 8px;text-align:right;color:var(--text-muted)">${resFmt(rem)}</td>
                <td style="padding:10px 8px">${resBudgetBar(c.spent,c.budget,c.color)}</td>
              </tr>`;
            }).join('')}
            <tr style="border-top:2px solid var(--border);background:var(--surface)">
              <td style="padding:10px 8px;font-weight:700">Total</td>
              <td style="padding:10px 8px;text-align:right;font-weight:700">${resFmt(DATA.costCategories.reduce((s,c)=>s+c.budget,0))}</td>
              <td style="padding:10px 8px;text-align:right;font-weight:700">${resFmt(DATA.costCategories.reduce((s,c)=>s+c.spent,0))}</td>
              <td style="padding:10px 8px;text-align:right;font-weight:700">${resFmt(DATA.costCategories.reduce((s,c)=>s+c.budget-c.spent,0))}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;
}

function renderResourcesPeople(el) {
  const projects = DATA.projects;

  el.innerHTML = `
    <div style="margin-bottom:20px">
      <div class="card" style="padding:20px">
        <div class="section-title" style="margin-bottom:16px">Capacity &amp; Allocation Matrix</div>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead>
            <tr style="border-bottom:2px solid var(--border)">
              <th style="text-align:left;padding:8px 10px;font-weight:600;color:var(--text-muted)">Person</th>
              <th style="text-align:left;padding:8px 10px;font-weight:600;color:var(--text-muted)">Department</th>
              ${projects.map(p=>`<th style="text-align:center;padding:8px 6px;font-weight:600;color:var(--text-muted);font-size:11px;max-width:80px">${p.name.split(' ')[0]}</th>`).join('')}
              <th style="text-align:center;padding:8px 10px;font-weight:600;color:var(--text-muted)">Other</th>
              <th style="text-align:left;padding:8px 10px;font-weight:600;color:var(--text-muted);width:140px">Utilisation</th>
            </tr>
          </thead>
          <tbody>
            ${DATA.peopleAllocations.map(person=>{
              const totalUsed = person.allocations.reduce((s,a)=>s+a.pct,0) + person.otherPct;
              const barColor = totalUsed > 100 ? '#ef4444' : totalUsed > 85 ? '#f59e0b' : '#10b981';
              return `<tr style="border-bottom:1px solid var(--border)">
                <td style="padding:10px 10px">
                  <div style="display:flex;align-items:center;gap:8px">
                    <span style="width:28px;height:28px;border-radius:50%;background:${person.color};color:#fff;font-size:10px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0">${person.initials}</span>
                    <div>
                      <div style="font-weight:500">${person.name}</div>
                      <div style="font-size:11px;color:var(--text-muted)">${person.role}</div>
                    </div>
                  </div>
                </td>
                <td style="padding:10px 10px;font-size:12px;color:var(--text-muted)">${person.department}</td>
                ${projects.map(p=>{
                  const alloc = person.allocations.find(a=>a.projectId===p.id);
                  return alloc
                    ? `<td style="text-align:center;padding:10px 6px"><span style="display:inline-block;padding:3px 8px;border-radius:8px;font-size:11px;font-weight:700;background:${person.color}18;color:${person.color}">${alloc.pct}%</span></td>`
                    : `<td style="text-align:center;padding:10px 6px;color:var(--border)">—</td>`;
                }).join('')}
                <td style="text-align:center;padding:10px 10px;font-size:12px;color:var(--text-muted)">${person.otherPct}%</td>
                <td style="padding:10px 10px">
                  <div style="display:flex;align-items:center;gap:6px">
                    <div style="flex:1;height:6px;border-radius:4px;background:var(--border)">
                      <div style="width:${Math.min(100,totalUsed)}%;height:100%;border-radius:4px;background:${barColor}"></div>
                    </div>
                    <span style="font-size:11px;font-weight:700;color:${barColor};width:34px">${totalUsed}%</span>
                  </div>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
      ${DATA.peopleAllocations.map(person=>{
        const totalUsed = person.allocations.reduce((s,a)=>s+a.pct,0) + person.otherPct;
        const avail = Math.max(0,100-totalUsed);
        const barColor = totalUsed > 100 ? '#ef4444' : totalUsed > 85 ? '#f59e0b' : '#10b981';
        return `
          <div class="card" style="padding:18px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
              <span style="width:36px;height:36px;border-radius:50%;background:${person.color};color:#fff;font-size:13px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${person.initials}</span>
              <div>
                <div style="font-weight:600;font-size:14px">${person.name}</div>
                <div style="font-size:11px;color:var(--text-muted)">${person.role} · ${person.department}</div>
              </div>
            </div>
            ${person.allocations.map(a=>{
              const proj = DATA.projects.find(p=>p.id===a.projectId);
              return proj ? `
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
                  <span style="font-size:12px;color:var(--text)">${proj.name}</span>
                  <div style="display:flex;align-items:center;gap:6px">
                    <div style="width:60px;height:5px;border-radius:3px;background:var(--border)">
                      <div style="width:${a.pct}%;height:100%;border-radius:3px;background:${person.color}"></div>
                    </div>
                    <span style="font-size:11px;font-weight:600;color:${person.color};width:28px">${a.pct}%</span>
                  </div>
                </div>` : '';
            }).join('')}
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
              <span style="font-size:12px;color:var(--text-muted)">Other / Admin</span>
              <div style="display:flex;align-items:center;gap:6px">
                <div style="width:60px;height:5px;border-radius:3px;background:var(--border)">
                  <div style="width:${person.otherPct}%;height:100%;border-radius:3px;background:#94a3b8"></div>
                </div>
                <span style="font-size:11px;font-weight:600;color:#94a3b8;width:28px">${person.otherPct}%</span>
              </div>
            </div>
            <div style="border-top:1px solid var(--border);padding-top:10px;display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:12px;font-weight:600;color:${barColor}">${totalUsed}% utilised</span>
              <span style="font-size:11px;color:var(--text-muted)">${avail}% available</span>
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

function renderResourcesDepts(el) {
  el.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:24px">
      ${DATA.departments.map(d=>{
        const burnPct = Math.round(d.spent/d.budget*100);
        const allocPct = Math.round(d.allocated/d.headcount*100);
        const barColor = burnPct>90?'#ef4444':burnPct>75?'#f59e0b':d.color;
        const deptProjects = DATA.projects.filter(p =>
          DATA.peopleAllocations.some(pa => pa.department===d.name && pa.allocations.some(a=>a.projectId===p.id))
        );
        return `
          <div class="card" style="padding:20px;border-top:3px solid ${d.color}">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px">
              <div>
                <div style="font-size:16px;font-weight:700">${d.name}</div>
                <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Head: ${d.headName}</div>
              </div>
              <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:${d.headColor};color:#fff;font-size:12px;font-weight:700">${d.head}</span>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
              <div style="padding:10px;background:var(--surface);border-radius:8px">
                <div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Budget</div>
                <div style="font-size:16px;font-weight:700;color:${d.color}">${resFmt(d.budget)}</div>
              </div>
              <div style="padding:10px;background:var(--surface);border-radius:8px">
                <div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Spent</div>
                <div style="font-size:16px;font-weight:700;color:${barColor}">${resFmt(d.spent)}</div>
              </div>
              <div style="padding:10px;background:var(--surface);border-radius:8px">
                <div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Headcount</div>
                <div style="font-size:16px;font-weight:700">${d.headcount}</div>
              </div>
              <div style="padding:10px;background:var(--surface);border-radius:8px">
                <div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Allocated</div>
                <div style="font-size:16px;font-weight:700;color:${allocPct===100?'#f59e0b':d.color}">${d.allocated}</div>
              </div>
            </div>

            <div style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:4px">
                <span>Budget burn</span><span>${burnPct}%</span>
              </div>
              ${resBudgetBar(d.spent, d.budget, d.color)}
            </div>
            <div style="margin-bottom:14px">
              <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:4px">
                <span>Headcount allocation</span><span>${allocPct}%</span>
              </div>
              ${resBudgetBar(d.allocated, d.headcount, d.color)}
            </div>

            ${deptProjects.length ? `
              <div style="font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em">Active in</div>
              <div style="display:flex;flex-wrap:wrap;gap:4px">
                ${deptProjects.map(p=>`<span style="font-size:11px;padding:2px 8px;border-radius:8px;background:${d.color}15;color:${d.color};font-weight:500">${p.name.split(' ')[0]}</span>`).join('')}
              </div>` : ''}
          </div>`;
      }).join('')}
    </div>`;
}

// --- ISSUES ---
const ISSUE_STATUSES   = ['open','in-progress','in-review','done','closed'];
const ISSUE_PRIORITIES = ['critical','high','medium','low'];
const ISSUE_TYPES      = ['bug','feature','task'];

const ISSUE_STATUS_META = {
  'open':        { label:'Open',       color:'#64748b', bg:'#f1f5f9' },
  'in-progress': { label:'In Progress',color:'#0891b2', bg:'#e0f2fe' },
  'in-review':   { label:'In Review',  color:'#7c3aed', bg:'#ede9fe' },
  'done':        { label:'Done',       color:'#16a34a', bg:'#dcfce7' },
  'closed':      { label:'Closed',     color:'#94a3b8', bg:'#f8fafc' },
};
const ISSUE_PRIORITY_META = {
  critical: { label:'Critical', color:'#dc2626', bg:'#fef2f2' },
  high:     { label:'High',     color:'#ea580c', bg:'#fff7ed' },
  medium:   { label:'Medium',   color:'#ca8a04', bg:'#fefce8' },
  low:      { label:'Low',      color:'#64748b', bg:'#f1f5f9' },
};
const ISSUE_TYPE_META = {
  bug:     { label:'Bug',     color:'#ef4444', icon:'🐛' },
  feature: { label:'Feature', color:'#6366f1', icon:'✨' },
  task:    { label:'Task',    color:'#10b981', icon:'✓'  },
};

const OOB_ISSUE_VIEWS = [
  { id:'oob-all',      label:'All Issues',    layout:'table',    groupBy:null,        filter:null,          icon:'list',       description:'Every issue across all projects' },
  { id:'oob-mine',     label:'My Issues',     layout:'table',    groupBy:null,        filter:'assignee-me', icon:'checkSquare',description:'Issues assigned to you' },
  { id:'oob-board',    label:'Status Board',  layout:'board',    groupBy:'status',    filter:null,          icon:'kanban',     description:'Kanban board grouped by status' },
  { id:'oob-priority', label:'By Priority',   layout:'board',    groupBy:'priority',  filter:null,          icon:'zap',        description:'Board grouped by priority level' },
  { id:'oob-timeline', label:'Timeline',      layout:'timeline', groupBy:null,        filter:null,          icon:'timeline',   description:'Gantt-style view by due date' },
  { id:'oob-calendar', label:'Calendar',      layout:'calendar', groupBy:null,        filter:null,          icon:'calendar',   description:'Issues plotted on a monthly calendar' },
];

function getIssuesForView(view) {
  let issues = [...DATA.issues];
  if (view.filter === 'assignee-me') issues = issues.filter(i => i.assignee === DATA.user.initials);
  if (STATE.issuesSearch) {
    const q = STATE.issuesSearch.toLowerCase();
    issues = issues.filter(i => i.title.toLowerCase().includes(q) || i.labels.some(l=>l.includes(q)));
  }
  return issues;
}

function issueBadge(type, val) {
  if (type === 'status') {
    const m = ISSUE_STATUS_META[val] || {};
    return `<span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;background:${m.bg};color:${m.color}">${m.label||val}</span>`;
  }
  if (type === 'priority') {
    const m = ISSUE_PRIORITY_META[val] || {};
    return `<span style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;background:${m.bg};color:${m.color}">${m.label||val}</span>`;
  }
  if (type === 'itype') {
    const m = ISSUE_TYPE_META[val] || {};
    return `<span style="display:inline-block;padding:2px 7px;border-radius:10px;font-size:11px;font-weight:600;background:${m.color}18;color:${m.color}">${m.icon} ${m.label||val}</span>`;
  }
  return val;
}

// --- RISKS (project-scoped risk register) ---
const RISK_SEVERITIES = ['low','medium','high','critical'];

function findRisk(projectId, riskId) {
  const p = DATA.projects.find(x => x.id === projectId);
  if (!p) return null;
  return p.risks.find(r => r.id === riskId) || null;
}

function restoreRisksFilters() {
  const key = 'risksFilters_' + (STATE.currentProject ? STATE.currentProject.id : 'none');
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  if (saved && Object.keys(saved).length) STATE.risksFilter = { severity:'', status:'', ...saved };
  else STATE.risksFilter = { severity:'', status:'' };
}

function renderRisks() {
  const p = STATE.currentProject;
  if (!p) { navigate('projects'); return; }
  renderTopbar([{ label: p.name, page: 'project-detail' }, { label: 'Risks' }]);
  restoreRisksFilters();
  const filterKey = 'risksFilters_' + p.id;

  const f = STATE.risksFilter;
  let rows = [...p.risks];
  if (f.severity) rows = rows.filter(r => r.severity === f.severity);
  if (f.status)   rows = rows.filter(r => (f.status === 'open' ? r.open : !r.open));

  const all = p.risks;
  const open = all.filter(r => r.open).length;
  const high = all.filter(r => r.open && (r.severity === 'high' || r.severity === 'critical')).length;

  const stat = (val, label, color) => `
    <div class="card" style="flex:1;padding:16px 18px">
      <div style="font-size:28px;font-weight:800;color:${color||'var(--text)'};line-height:1">${val}</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${label}</div>
    </div>`;

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Risks</div>
        <div class="page-subtitle">${p.name} · ${all.length} risk${all.length!==1?'s':''} · ${open} open · ${high} high/critical</div>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-primary" id="btn-new-risk">${I.plus} New Risk</button>
      </div>
    </div>

    <div class="flex gap-3 mb-5">
      ${stat(all.length, 'Total risks')}
      ${stat(open, 'Open', '#f59e0b')}
      ${stat(high, 'High / Critical', '#ef4444')}
      ${stat(all.length - open, 'Closed', '#10b981')}
    </div>

    <div class="flex gap-3 mb-4" style="align-items:center">
      <select class="form-select" id="risk-f-severity" style="max-width:160px">
        <option value="">All severities</option>
        ${RISK_SEVERITIES.map(s=>`<option value="${s}" ${f.severity===s?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
      </select>
      <select class="form-select" id="risk-f-status" style="max-width:140px">
        <option value="">All statuses</option>
        <option value="open" ${f.status==='open'?'selected':''}>Open</option>
        <option value="closed" ${f.status==='closed'?'selected':''}>Closed</option>
      </select>
      ${(f.severity||f.status)?`<button class="btn btn-secondary btn-sm" id="risk-f-clear">Clear filters</button>`:''}
      <span style="margin-left:auto;font-size:12px;color:var(--text-muted)">${rows.length} shown</span>
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      ${rows.length ? `
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="border-bottom:2px solid var(--border)">
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted)">Risk</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted)">Implications</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted)">Mitigation</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted);width:110px">Severity</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted);width:90px">Owner</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted);width:120px">Due</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted);width:90px">Status</th>
            <th style="width:44px"></th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(r => `
            <tr style="border-bottom:1px solid var(--border)">
              <td style="padding:10px 14px">
                <span class="risk-edit" data-pid="${p.id}" data-rid="${r.id}" data-field="desc"
                  style="cursor:text;display:inline-block;min-width:40px;border-radius:3px;padding:1px 3px">${r.desc||'<span style="color:#bbb">Describe risk…</span>'}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="risk-edit" data-pid="${p.id}" data-rid="${r.id}" data-field="implications"
                  style="cursor:text;display:inline-block;min-width:40px;border-radius:3px;padding:1px 3px">${r.implications||'<span style="color:#bbb">Add implications…</span>'}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="risk-edit" data-pid="${p.id}" data-rid="${r.id}" data-field="mitigation"
                  style="cursor:text;display:inline-block;min-width:40px;border-radius:3px;padding:1px 3px">${r.mitigation||'<span style="color:#bbb">Add mitigation…</span>'}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="risk-sev" data-pid="${p.id}" data-rid="${r.id}" title="Click to change severity"
                  style="cursor:pointer">${priorityBadge(r.severity)}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="risk-edit" data-pid="${p.id}" data-rid="${r.id}" data-field="owner"
                  style="cursor:text;display:inline-block;min-width:30px;border-radius:3px;padding:1px 3px">${r.owner||'<span style="color:#bbb">—</span>'}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="risk-edit" data-pid="${p.id}" data-rid="${r.id}" data-field="due"
                  style="cursor:text;display:inline-block;min-width:40px;border-radius:3px;padding:1px 3px">${r.due||'<span style="color:#bbb">Set date…</span>'}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="risk-status" data-pid="${p.id}" data-rid="${r.id}" title="Click to toggle"
                  style="cursor:pointer"><span class="badge ${r.open?'badge-high':'badge-completed'}">${r.open?'Open':'Closed'}</span></span>
              </td>
              <td style="padding:10px 14px;text-align:center">
                <button class="btn-icon risk-del" data-pid="${p.id}" data-rid="${r.id}" title="Delete risk" style="color:#ef4444">${ico(I.trash,15)}</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>` : `
        <div style="text-align:center;padding:60px;color:var(--text-muted)">
          ${(f.severity||f.status)?'No risks match the current filters.':'No risks logged yet. Click “New Risk” to add one.'}
        </div>`}
    </div>
  `;

  // --- filters ---
  const setFilter = (key, val) => {
    STATE.risksFilter[key] = val;
    localStorage.setItem(filterKey, JSON.stringify(STATE.risksFilter));
    renderRisks();
  };
  document.getElementById('risk-f-severity').addEventListener('change', e => setFilter('severity', e.target.value));
  document.getElementById('risk-f-status').addEventListener('change', e => setFilter('status', e.target.value));
  document.getElementById('risk-f-clear')?.addEventListener('click', () => {
    STATE.risksFilter = { severity:'', status:'' };
    localStorage.removeItem(filterKey);
    renderRisks();
  });

  document.getElementById('btn-new-risk').addEventListener('click', () => openRiskModal());

  // --- inline text edit (desc, owner) ---
  document.querySelectorAll('.risk-edit').forEach(span => {
    span.addEventListener('mouseenter', () => { span.style.background = '#f0f7ff'; });
    span.addEventListener('mouseleave', () => { span.style.background = ''; });
    span.addEventListener('click', () => {
      const risk = findRisk(+span.dataset.pid, +span.dataset.rid);
      if (!risk) return;
      const field = span.dataset.field;
      const isDate = field === 'due';
      const input = document.createElement('input');
      input.type = isDate ? 'date' : 'text';
      input.value = risk[field] || '';
      input.style.cssText = 'border:1px solid #3498db;border-radius:4px;padding:2px 6px;font-size:inherit;width:' + (isDate ? 150 : Math.max(120, ((risk[field]||'').length + 2) * 8)) + 'px;outline:none';
      span.replaceWith(input);
      input.focus();
      input.select();
      let done = false;
      const commit = (save) => {
        if (done) return; done = true;
        if (save) { risk[field] = input.value.trim(); }
        renderRisks();
      };
      input.addEventListener('blur', () => commit(true));
      input.addEventListener('keydown', ke => {
        if (ke.key === 'Enter') { ke.preventDefault(); commit(true); }
        if (ke.key === 'Escape') { ke.preventDefault(); commit(false); }
      });
    });
  });

  // --- severity badge cycle ---
  document.querySelectorAll('.risk-sev').forEach(el => {
    el.addEventListener('click', () => {
      const risk = findRisk(+el.dataset.pid, +el.dataset.rid);
      if (!risk) return;
      const i = RISK_SEVERITIES.indexOf(risk.severity);
      risk.severity = RISK_SEVERITIES[(i + 1) % RISK_SEVERITIES.length];
      renderRisks();
    });
  });

  // --- status toggle ---
  document.querySelectorAll('.risk-status').forEach(el => {
    el.addEventListener('click', () => {
      const risk = findRisk(+el.dataset.pid, +el.dataset.rid);
      if (!risk) return;
      risk.open = !risk.open;
      renderRisks();
    });
  });

  // --- delete ---
  document.querySelectorAll('.risk-del').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirm('Delete this risk?')) return;
      const p = DATA.projects.find(x => x.id === +el.dataset.pid);
      if (!p) return;
      p.risks = p.risks.filter(r => r.id !== +el.dataset.rid);
      toast('Risk deleted');
      renderRisks();
    });
  });
}

function openRiskModal() {
  const overlay = document.getElementById('modal-overlay');
  const box = document.getElementById('modal-box');
  overlay.classList.remove('hidden');
  box.innerHTML = `
    <div class="modal-header">
      <h3>New Risk</h3>
      <button class="btn-icon" id="risk-modal-close">${I.x}</button>
    </div>
    <div class="modal-body" style="display:flex;flex-direction:column;gap:16px">
      <div class="form-group">
        <label class="form-label">Description</label>
        <input class="form-input" id="rk-desc" placeholder="e.g. Third-party API dependency delay"/>
      </div>
      <div class="form-group">
        <label class="form-label">Implications</label>
        <input class="form-input" id="rk-implications" placeholder="e.g. Launch could slip by 2 weeks"/>
      </div>
      <div class="form-group">
        <label class="form-label">Mitigation</label>
        <input class="form-input" id="rk-mitigation" placeholder="e.g. Line up a backup vendor"/>
      </div>
      <div class="form-row">
        <div class="form-group" style="flex:1">
          <label class="form-label">Severity</label>
          <select class="form-select" id="rk-severity">
            ${RISK_SEVERITIES.map(s=>`<option value="${s}" ${s==='medium'?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
          </select>
        </div>
        <div class="form-group" style="flex:1">
          <label class="form-label">Owner</label>
          <input class="form-input" id="rk-owner" placeholder="e.g. JD"/>
        </div>
        <div class="form-group" style="flex:1">
          <label class="form-label">Due date</label>
          <input class="form-input" id="rk-due" type="date"/>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="risk-modal-cancel">Cancel</button>
      <button class="btn btn-primary" id="risk-modal-save">Add risk</button>
    </div>`;

  const close = () => { overlay.classList.add('hidden'); box.innerHTML = ''; };
  document.getElementById('risk-modal-close').addEventListener('click', close);
  document.getElementById('risk-modal-cancel').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  document.getElementById('risk-modal-save').addEventListener('click', () => {
    const desc = document.getElementById('rk-desc').value.trim();
    if (!desc) { toast('Risk description is required', 'warning'); return; }
    const p = STATE.currentProject;
    if (!p) { toast('No project selected', 'warning'); return; }
    const maxId = Math.max(0, ...DATA.projects.flatMap(pr => pr.risks.map(r => r.id)));
    p.risks.push({
      id: maxId + 1,
      desc,
      implications: document.getElementById('rk-implications').value.trim(),
      mitigation: document.getElementById('rk-mitigation').value.trim(),
      severity: document.getElementById('rk-severity').value,
      owner: document.getElementById('rk-owner').value.trim() || '—',
      due: document.getElementById('rk-due').value,
      open: true
    });
    toast('Risk added');
    close();
    renderRisks();
  });
}

// ============================================================
// DECISIONS — project decision log / register
// ============================================================
const DECISION_STATUSES = ['proposed', 'decided', 'deferred', 'superseded'];
const DECISION_IMPACTS  = ['low', 'medium', 'high'];
const DECISION_STATUS_COLOR = { proposed:'#f59e0b', decided:'#10b981', deferred:'#6366f1', superseded:'#94a3b8' };
const DECISION_IMPACT_COLOR = { low:'#94a3b8', medium:'#6366f1', high:'#ef4444' };

function decisionBadge(value, color) {
  return `<span class="badge" style="background:${color}1a;color:${color}"><span class="badge-dot" style="background:${color}"></span>${value.charAt(0).toUpperCase()+value.slice(1)}</span>`;
}

function findDecision(projectId, decisionId) {
  const p = DATA.projects.find(x => x.id === projectId);
  if (!p || !p.decisions) return null;
  return p.decisions.find(d => d.id === decisionId) || null;
}

function restoreDecisionsFilters() {
  const key = 'decisionsFilters_' + (STATE.currentProject ? STATE.currentProject.id : 'none');
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  if (saved && Object.keys(saved).length) STATE.decisionsFilter = { impact:'', status:'', ...saved };
  else STATE.decisionsFilter = { impact:'', status:'' };
}

function renderDecisions() {
  const p = STATE.currentProject;
  if (!p) { navigate('projects'); return; }
  if (!p.decisions) p.decisions = [];
  renderTopbar([{ label: p.name, page: 'project-detail' }, { label: 'Decisions' }]);
  restoreDecisionsFilters();
  const filterKey = 'decisionsFilters_' + p.id;

  const f = STATE.decisionsFilter;
  let rows = [...p.decisions];
  if (f.impact) rows = rows.filter(d => d.impact === f.impact);
  if (f.status) rows = rows.filter(d => d.status === f.status);

  const all = p.decisions;
  const decided = all.filter(d => d.status === 'decided').length;
  const proposed = all.filter(d => d.status === 'proposed').length;
  const superseded = all.filter(d => d.status === 'superseded').length;

  const stat = (val, label, color) => `
    <div class="card" style="flex:1;padding:16px 18px">
      <div style="font-size:28px;font-weight:800;color:${color||'var(--text)'};line-height:1">${val}</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${label}</div>
    </div>`;

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <div class="page-title">Decisions</div>
        <div class="page-subtitle">${p.name} · ${all.length} decision${all.length!==1?'s':''} · ${decided} decided · ${proposed} proposed</div>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-primary" id="btn-new-decision">${I.plus} Log Decision</button>
      </div>
    </div>

    <div class="flex gap-3 mb-5">
      ${stat(all.length, 'Total decisions')}
      ${stat(decided, 'Decided', '#10b981')}
      ${stat(proposed, 'Proposed', '#f59e0b')}
      ${stat(superseded, 'Superseded', '#94a3b8')}
    </div>

    <div class="flex gap-3 mb-4" style="align-items:center">
      <select class="form-select" id="dec-f-impact" style="max-width:160px">
        <option value="">All impact</option>
        ${DECISION_IMPACTS.map(s=>`<option value="${s}" ${f.impact===s?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
      </select>
      <select class="form-select" id="dec-f-status" style="max-width:160px">
        <option value="">All statuses</option>
        ${DECISION_STATUSES.map(s=>`<option value="${s}" ${f.status===s?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
      </select>
      ${(f.impact||f.status)?`<button class="btn btn-secondary btn-sm" id="dec-f-clear">Clear filters</button>`:''}
      <span style="margin-left:auto;font-size:12px;color:var(--text-muted)">${rows.length} shown</span>
    </div>

    <div class="card" style="padding:0;overflow:hidden">
      ${rows.length ? `
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="border-bottom:2px solid var(--border)">
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted)">Decision</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted)">Context &amp; rationale</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted)">Alternatives considered</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted);width:110px">Impact</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted);width:90px">Owner</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted);width:120px">Date</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted);width:130px">Status</th>
            <th style="width:44px"></th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(d => `
            <tr style="border-bottom:1px solid var(--border)">
              <td style="padding:10px 14px">
                <span class="dec-edit" data-pid="${p.id}" data-did="${d.id}" data-field="title"
                  style="cursor:text;display:inline-block;min-width:40px;border-radius:3px;padding:1px 3px;font-weight:600">${d.title||'<span style="color:#bbb">Name the decision…</span>'}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="dec-edit" data-pid="${p.id}" data-did="${d.id}" data-field="context"
                  style="cursor:text;display:inline-block;min-width:40px;border-radius:3px;padding:1px 3px">${d.context||'<span style="color:#bbb">Add context…</span>'}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="dec-edit" data-pid="${p.id}" data-did="${d.id}" data-field="alternatives"
                  style="cursor:text;display:inline-block;min-width:40px;border-radius:3px;padding:1px 3px">${d.alternatives||'<span style="color:#bbb">Options weighed…</span>'}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="dec-impact" data-pid="${p.id}" data-did="${d.id}" title="Click to change impact"
                  style="cursor:pointer">${decisionBadge(d.impact||'medium', DECISION_IMPACT_COLOR[d.impact]||'#6366f1')}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="dec-edit" data-pid="${p.id}" data-did="${d.id}" data-field="owner"
                  style="cursor:text;display:inline-block;min-width:30px;border-radius:3px;padding:1px 3px">${d.owner||'<span style="color:#bbb">—</span>'}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="dec-edit" data-pid="${p.id}" data-did="${d.id}" data-field="date"
                  style="cursor:text;display:inline-block;min-width:40px;border-radius:3px;padding:1px 3px">${d.date||'<span style="color:#bbb">Set date…</span>'}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="dec-status" data-pid="${p.id}" data-did="${d.id}" title="Click to advance status"
                  style="cursor:pointer">${decisionBadge(d.status||'proposed', DECISION_STATUS_COLOR[d.status]||'#f59e0b')}</span>
              </td>
              <td style="padding:10px 14px;text-align:center">
                <button class="btn-icon dec-del" data-pid="${p.id}" data-did="${d.id}" title="Delete decision" style="color:#ef4444">${ico(I.trash,15)}</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>` : `
        <div style="text-align:center;padding:60px;color:var(--text-muted)">
          ${(f.impact||f.status)?'No decisions match the current filters.':'No decisions logged yet. Click “Log Decision” to record one.'}
        </div>`}
    </div>
  `;

  // --- filters ---
  const setFilter = (key, val) => {
    STATE.decisionsFilter[key] = val;
    localStorage.setItem(filterKey, JSON.stringify(STATE.decisionsFilter));
    renderDecisions();
  };
  document.getElementById('dec-f-impact').addEventListener('change', e => setFilter('impact', e.target.value));
  document.getElementById('dec-f-status').addEventListener('change', e => setFilter('status', e.target.value));
  document.getElementById('dec-f-clear')?.addEventListener('click', () => {
    STATE.decisionsFilter = { impact:'', status:'' };
    localStorage.removeItem(filterKey);
    renderDecisions();
  });

  document.getElementById('btn-new-decision').addEventListener('click', () => openDecisionModal());

  // --- inline text edit ---
  document.querySelectorAll('.dec-edit').forEach(span => {
    span.addEventListener('mouseenter', () => { span.style.background = '#f0f7ff'; });
    span.addEventListener('mouseleave', () => { span.style.background = ''; });
    span.addEventListener('click', () => {
      const dec = findDecision(+span.dataset.pid, +span.dataset.did);
      if (!dec) return;
      const field = span.dataset.field;
      const isDate = field === 'date';
      const input = document.createElement('input');
      input.type = isDate ? 'date' : 'text';
      input.value = dec[field] || '';
      input.style.cssText = 'border:1px solid #3498db;border-radius:4px;padding:2px 6px;font-size:inherit;width:' + (isDate ? 150 : Math.max(140, ((dec[field]||'').length + 2) * 8)) + 'px;outline:none';
      span.replaceWith(input);
      input.focus();
      input.select();
      let done = false;
      const commit = (save) => {
        if (done) return; done = true;
        if (save) { dec[field] = input.value.trim(); }
        renderDecisions();
      };
      input.addEventListener('blur', () => commit(true));
      input.addEventListener('keydown', ke => {
        if (ke.key === 'Enter') { ke.preventDefault(); commit(true); }
        if (ke.key === 'Escape') { ke.preventDefault(); commit(false); }
      });
    });
  });

  // --- impact badge cycle ---
  document.querySelectorAll('.dec-impact').forEach(el => {
    el.addEventListener('click', () => {
      const dec = findDecision(+el.dataset.pid, +el.dataset.did);
      if (!dec) return;
      const i = DECISION_IMPACTS.indexOf(dec.impact);
      dec.impact = DECISION_IMPACTS[(i + 1) % DECISION_IMPACTS.length];
      renderDecisions();
    });
  });

  // --- status badge cycle ---
  document.querySelectorAll('.dec-status').forEach(el => {
    el.addEventListener('click', () => {
      const dec = findDecision(+el.dataset.pid, +el.dataset.did);
      if (!dec) return;
      const i = DECISION_STATUSES.indexOf(dec.status);
      dec.status = DECISION_STATUSES[(i + 1) % DECISION_STATUSES.length];
      renderSidebar();
      renderDecisions();
    });
  });

  // --- delete ---
  document.querySelectorAll('.dec-del').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirm('Delete this decision?')) return;
      const proj = DATA.projects.find(x => x.id === +el.dataset.pid);
      if (!proj) return;
      proj.decisions = proj.decisions.filter(d => d.id !== +el.dataset.did);
      toast('Decision deleted');
      renderSidebar();
      renderDecisions();
    });
  });
}

function openDecisionModal() {
  const overlay = document.getElementById('modal-overlay');
  const box = document.getElementById('modal-box');
  overlay.classList.remove('hidden');
  box.innerHTML = `
    <div class="modal-header">
      <h3>Log Decision</h3>
      <button class="btn-icon" id="dec-modal-close">${I.x}</button>
    </div>
    <div class="modal-body" style="display:flex;flex-direction:column;gap:16px">
      <div class="form-group">
        <label class="form-label">Decision</label>
        <input class="form-input" id="dc-title" placeholder="e.g. Use PostgreSQL for the primary datastore"/>
      </div>
      <div class="form-group">
        <label class="form-label">Context &amp; rationale</label>
        <input class="form-input" id="dc-context" placeholder="e.g. Need ACID guarantees and strong JSON support"/>
      </div>
      <div class="form-group">
        <label class="form-label">Alternatives considered</label>
        <input class="form-input" id="dc-alternatives" placeholder="e.g. MongoDB, DynamoDB"/>
      </div>
      <div class="form-row">
        <div class="form-group" style="flex:1">
          <label class="form-label">Impact</label>
          <select class="form-select" id="dc-impact">
            ${DECISION_IMPACTS.map(s=>`<option value="${s}" ${s==='medium'?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
          </select>
        </div>
        <div class="form-group" style="flex:1">
          <label class="form-label">Status</label>
          <select class="form-select" id="dc-status">
            ${DECISION_STATUSES.map(s=>`<option value="${s}" ${s==='proposed'?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
          </select>
        </div>
        <div class="form-group" style="flex:1">
          <label class="form-label">Owner</label>
          <input class="form-input" id="dc-owner" placeholder="e.g. SR"/>
        </div>
        <div class="form-group" style="flex:1">
          <label class="form-label">Date</label>
          <input class="form-input" id="dc-date" type="date"/>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="dec-modal-cancel">Cancel</button>
      <button class="btn btn-primary" id="dec-modal-save">Log decision</button>
    </div>`;

  const close = () => { overlay.classList.add('hidden'); box.innerHTML = ''; };
  document.getElementById('dec-modal-close').addEventListener('click', close);
  document.getElementById('dec-modal-cancel').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  document.getElementById('dec-modal-save').addEventListener('click', () => {
    const title = document.getElementById('dc-title').value.trim();
    if (!title) { toast('Decision title is required', 'warning'); return; }
    const p = STATE.currentProject;
    if (!p) { toast('No project selected', 'warning'); return; }
    if (!p.decisions) p.decisions = [];
    const maxId = Math.max(0, ...DATA.projects.flatMap(pr => (pr.decisions||[]).map(d => d.id)));
    p.decisions.push({
      id: maxId + 1,
      title,
      context: document.getElementById('dc-context').value.trim(),
      alternatives: document.getElementById('dc-alternatives').value.trim(),
      impact: document.getElementById('dc-impact').value,
      status: document.getElementById('dc-status').value,
      owner: document.getElementById('dc-owner').value.trim() || '—',
      date: document.getElementById('dc-date').value
    });
    toast('Decision logged');
    close();
    renderSidebar();
    renderDecisions();
  });
}

// ============================================================
// PRD — Project Requirement Definition
// ============================================================
const PRD_DOC_STATUSES = ['Draft', 'In Review', 'Approved'];
const PRD_REQ_TYPES    = ['Functional', 'Non-Functional'];
const PRD_PRIORITIES   = ['Must', 'Should', 'Could', "Won't"];   // MoSCoW
const PRD_REQ_STATUSES = ['Proposed', 'Approved', 'In Progress', 'Done'];

const PRD_DOC_STATUS_COLOR = { 'Draft':'#94a3b8', 'In Review':'#f59e0b', 'Approved':'#10b981' };
const PRD_PRIORITY_COLOR   = { 'Must':'#ef4444', 'Should':'#f59e0b', 'Could':'#6366f1', "Won't":'#94a3b8' };
const PRD_REQ_STATUS_COLOR = { 'Proposed':'#94a3b8', 'Approved':'#6366f1', 'In Progress':'#f59e0b', 'Done':'#10b981' };

function prdBadge(value, color) {
  return `<span class="badge" style="background:${color}1a;color:${color}"><span class="badge-dot" style="background:${color}"></span>${value}</span>`;
}

// Lazily create (and seed) the PRD document for a project.
function getPRD(projectId) {
  if (!DATA.prds) DATA.prds = {};
  if (!DATA.prds[projectId]) {
    const p = DATA.projects.find(x => x.id === projectId);
    DATA.prds[projectId] = {
      status: 'Draft',
      version: '0.1',
      author: p ? p.pm : '',
      updatedAt: todayStr(),
      overview: p ? p.description : '',
      goals: '',
      metrics: '',
      scopeIn: '',
      scopeOut: '',
      assumptions: '',
      requirements: []
    };
  }
  return DATA.prds[projectId];
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function persistPRDs() {
  try { localStorage.setItem('wiredPRDs', JSON.stringify(DATA.prds || {})); }
  catch (e) { console.error('[persistPRDs]', e); }
}

function restorePRDs() {
  try {
    const saved = JSON.parse(localStorage.getItem('wiredPRDs') || 'null');
    if (saved && typeof saved === 'object') DATA.prds = saved;
  } catch (e) { console.error('[restorePRDs]', e); }
}

// Persist after any PRD mutation, stamping the "last updated" date.
function touchPRD(projectId) {
  const doc = getPRD(projectId);
  doc.updatedAt = todayStr();
  persistPRDs();
}

function renderPRD() {
  const p = STATE.currentProject;
  if (!p) { navigate('projects'); return; }
  const doc = getPRD(p.id);
  renderTopbar([{ label: p.name, page: 'project-detail' }, { label: 'PRD' }]);

  const reqs = doc.requirements;
  const mustCount = reqs.filter(r => r.priority === 'Must').length;
  const doneCount = reqs.filter(r => r.status === 'Done').length;

  // Inline-editable narrative block.
  const section = (key, title, placeholder) => `
    <div class="card prd-section" style="padding:18px 20px;margin-bottom:16px">
      <div class="op-block-title" style="margin-bottom:8px">${title}</div>
      <div class="prd-edit" data-field="${key}" data-placeholder="${placeholder}"
        style="font-size:13px;color:#475569;line-height:1.6;cursor:text;white-space:pre-wrap;min-height:20px;border-radius:4px;padding:4px 6px;margin:-4px -6px">${doc[key] ? escapeHtml(doc[key]) : `<span style="color:#94a3b8">${placeholder}</span>`}</div>
    </div>`;

  document.getElementById('content').innerHTML = `
    <div class="page-header prd-no-print">
      <div>
        <div class="page-title">PRD</div>
        <div class="page-subtitle">Project Requirement Definition · ${p.name}</div>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-secondary" id="prd-print-btn">${I.fileText} Print / PDF</button>
        <button class="btn btn-primary" id="prd-add-req">${I.plus} Add Requirement</button>
      </div>
    </div>

    <div class="card" style="padding:18px 20px;margin-bottom:16px;display:flex;align-items:center;gap:28px;flex-wrap:wrap">
      <div>
        <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">Status</div>
        <span class="prd-doc-status" title="Click to change status" style="cursor:pointer">${prdBadge(doc.status, PRD_DOC_STATUS_COLOR[doc.status])}</span>
      </div>
      <div>
        <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">Version</div>
        <span class="prd-meta-edit" data-field="version" style="font-size:14px;font-weight:600;cursor:text;border-radius:4px;padding:1px 4px">${escapeHtml(doc.version)}</span>
      </div>
      <div>
        <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">Author</div>
        <span class="prd-meta-edit" data-field="author" style="font-size:14px;font-weight:600;cursor:text;border-radius:4px;padding:1px 4px">${doc.author ? escapeHtml(doc.author) : '<span style="color:#94a3b8">—</span>'}</span>
      </div>
      <div>
        <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">Last updated</div>
        <span style="font-size:14px;font-weight:600">${doc.updatedAt}</span>
      </div>
      <div style="margin-left:auto;text-align:right">
        <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">Requirements</div>
        <span style="font-size:14px;font-weight:600">${reqs.length} total · ${mustCount} must · ${doneCount} done</span>
      </div>
    </div>

    ${section('overview', 'Overview / Problem Statement', 'What problem does this project solve, and for whom? Click to edit…')}
    ${section('goals', 'Goals & Objectives', 'List the primary goals and objectives. Click to edit…')}
    ${section('metrics', 'Success Metrics', 'How will success be measured (KPIs, targets)? Click to edit…')}

    <div class="grid-2" style="gap:16px;margin-bottom:16px">
      ${section('scopeIn', 'In Scope', 'What is included in this project? Click to edit…').replace('margin-bottom:16px','margin-bottom:0')}
      ${section('scopeOut', 'Out of Scope', 'What is explicitly excluded? Click to edit…').replace('margin-bottom:16px','margin-bottom:0')}
    </div>

    ${section('assumptions', 'Assumptions & Constraints', 'List assumptions, dependencies, and constraints. Click to edit…')}

    <div class="card" style="padding:0;overflow:hidden">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--border)">
        <div class="op-block-title" style="margin:0">Requirements</div>
        <button class="btn btn-secondary btn-sm prd-no-print" id="prd-add-req-2">${I.plus} Add</button>
      </div>
      ${reqs.length ? `
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="border-bottom:2px solid var(--border)">
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted);width:70px">ID</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted)">Requirement</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted);width:140px">Type</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted);width:110px">Priority</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted);width:130px">Status</th>
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-muted);width:90px">Owner</th>
            <th style="width:44px" class="prd-no-print"></th>
          </tr>
        </thead>
        <tbody>
          ${reqs.map(r => `
            <tr style="border-bottom:1px solid var(--border)">
              <td style="padding:10px 14px;font-weight:600;color:var(--text-muted);font-variant-numeric:tabular-nums">${r.code}</td>
              <td style="padding:10px 14px">
                <span class="prd-req-edit" data-rid="${r.id}" data-field="title"
                  style="cursor:text;display:inline-block;min-width:40px;border-radius:3px;padding:1px 3px">${r.title ? escapeHtml(r.title) : '<span style="color:#bbb">Describe requirement…</span>'}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="prd-req-cycle" data-rid="${r.id}" data-field="type" title="Click to change" style="cursor:pointer">${prdBadge(r.type, '#0891b2')}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="prd-req-cycle" data-rid="${r.id}" data-field="priority" title="Click to change" style="cursor:pointer">${prdBadge(r.priority, PRD_PRIORITY_COLOR[r.priority])}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="prd-req-cycle" data-rid="${r.id}" data-field="status" title="Click to change" style="cursor:pointer">${prdBadge(r.status, PRD_REQ_STATUS_COLOR[r.status])}</span>
              </td>
              <td style="padding:10px 14px">
                <span class="prd-req-edit" data-rid="${r.id}" data-field="owner"
                  style="cursor:text;display:inline-block;min-width:30px;border-radius:3px;padding:1px 3px">${r.owner ? escapeHtml(r.owner) : '<span style="color:#bbb">—</span>'}</span>
              </td>
              <td style="padding:10px 14px;text-align:center" class="prd-no-print">
                <button class="btn-icon prd-req-del" data-rid="${r.id}" title="Delete requirement" style="color:#ef4444">${ico(I.trash,15)}</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>` : `
        <div style="text-align:center;padding:50px;color:var(--text-muted)">
          No requirements yet. Click “Add Requirement” to capture the first one.
        </div>`}
    </div>
  `;

  // --- print ---
  document.getElementById('prd-print-btn').addEventListener('click', () => window.print());

  // --- add requirement ---
  document.getElementById('prd-add-req').addEventListener('click', () => openPRDReqModal());
  document.getElementById('prd-add-req-2')?.addEventListener('click', () => openPRDReqModal());

  // --- narrative section inline edit (multiline) ---
  document.querySelectorAll('.prd-edit').forEach(el => {
    el.addEventListener('mouseenter', () => { el.style.background = '#f0f7ff'; });
    el.addEventListener('mouseleave', () => { el.style.background = ''; });
    el.addEventListener('click', () => {
      const field = el.dataset.field;
      const ta = document.createElement('textarea');
      ta.value = doc[field] || '';
      ta.rows = Math.max(3, (ta.value.match(/\n/g) || []).length + 3);
      ta.style.cssText = 'border:1px solid #6366f1;border-radius:4px;padding:8px;font:inherit;line-height:1.6;color:#475569;width:100%;box-sizing:border-box;outline:none;resize:vertical';
      el.replaceWith(ta);
      ta.focus();
      let done = false;
      const commit = (save) => {
        if (done) return; done = true;
        if (save) { doc[field] = ta.value.trim(); touchPRD(p.id); }
        renderPRD();
      };
      ta.addEventListener('blur', () => commit(true));
      ta.addEventListener('keydown', ke => {
        if (ke.key === 'Enter' && (ke.metaKey || ke.ctrlKey)) { ke.preventDefault(); commit(true); }
        if (ke.key === 'Escape') { ke.preventDefault(); commit(false); }
      });
    });
  });

  // --- meta inline edit (version, author) ---
  document.querySelectorAll('.prd-meta-edit').forEach(el => {
    el.addEventListener('mouseenter', () => { el.style.background = '#f0f7ff'; });
    el.addEventListener('mouseleave', () => { el.style.background = ''; });
    el.addEventListener('click', () => {
      const field = el.dataset.field;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = doc[field] || '';
      input.style.cssText = 'border:1px solid #6366f1;border-radius:4px;padding:2px 6px;font-size:14px;font-weight:600;width:120px;outline:none';
      el.replaceWith(input);
      input.focus(); input.select();
      let done = false;
      const commit = (save) => {
        if (done) return; done = true;
        if (save) { doc[field] = input.value.trim(); touchPRD(p.id); }
        renderPRD();
      };
      input.addEventListener('blur', () => commit(true));
      input.addEventListener('keydown', ke => {
        if (ke.key === 'Enter') { ke.preventDefault(); commit(true); }
        if (ke.key === 'Escape') { ke.preventDefault(); commit(false); }
      });
    });
  });

  // --- doc status cycle ---
  document.querySelector('.prd-doc-status')?.addEventListener('click', () => {
    const i = PRD_DOC_STATUSES.indexOf(doc.status);
    doc.status = PRD_DOC_STATUSES[(i + 1) % PRD_DOC_STATUSES.length];
    touchPRD(p.id);
    renderPRD();
  });

  // --- requirement text inline edit (title, owner) ---
  document.querySelectorAll('.prd-req-edit').forEach(span => {
    span.addEventListener('mouseenter', () => { span.style.background = '#f0f7ff'; });
    span.addEventListener('mouseleave', () => { span.style.background = ''; });
    span.addEventListener('click', () => {
      const req = doc.requirements.find(r => r.id === +span.dataset.rid);
      if (!req) return;
      const field = span.dataset.field;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = req[field] || '';
      input.style.cssText = 'border:1px solid #3498db;border-radius:4px;padding:2px 6px;font-size:inherit;width:' + Math.max(120, ((req[field]||'').length + 2) * 8) + 'px;outline:none';
      span.replaceWith(input);
      input.focus(); input.select();
      let done = false;
      const commit = (save) => {
        if (done) return; done = true;
        if (save) { req[field] = input.value.trim(); touchPRD(p.id); }
        renderPRD();
      };
      input.addEventListener('blur', () => commit(true));
      input.addEventListener('keydown', ke => {
        if (ke.key === 'Enter') { ke.preventDefault(); commit(true); }
        if (ke.key === 'Escape') { ke.preventDefault(); commit(false); }
      });
    });
  });

  // --- requirement badge cycles (type, priority, status) ---
  const cycleMap = { type: PRD_REQ_TYPES, priority: PRD_PRIORITIES, status: PRD_REQ_STATUSES };
  document.querySelectorAll('.prd-req-cycle').forEach(el => {
    el.addEventListener('click', () => {
      const req = doc.requirements.find(r => r.id === +el.dataset.rid);
      if (!req) return;
      const field = el.dataset.field;
      const opts = cycleMap[field];
      const i = opts.indexOf(req[field]);
      req[field] = opts[(i + 1) % opts.length];
      touchPRD(p.id);
      renderPRD();
    });
  });

  // --- delete requirement ---
  document.querySelectorAll('.prd-req-del').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirm('Delete this requirement?')) return;
      doc.requirements = doc.requirements.filter(r => r.id !== +el.dataset.rid);
      touchPRD(p.id);
      toast('Requirement deleted');
      renderPRD();
    });
  });
}

function openPRDReqModal() {
  const p = STATE.currentProject;
  if (!p) { toast('No project selected', 'warning'); return; }
  const doc = getPRD(p.id);
  const overlay = document.getElementById('modal-overlay');
  const box = document.getElementById('modal-box');
  overlay.classList.remove('hidden');
  box.innerHTML = `
    <div class="modal-header">
      <h3>Add Requirement</h3>
      <button class="btn-icon" id="prd-modal-close">${I.x}</button>
    </div>
    <div class="modal-body" style="display:grid;grid-template-columns:120px 1fr;gap:16px 14px;align-items:center">
      <label class="form-label" for="prd-req-title" style="margin:0;text-align:left">Requirement</label>
      <input class="form-input" id="prd-req-title" placeholder="e.g. Users can reset their password via email"/>

      <label class="form-label" for="prd-req-type" style="margin:0;text-align:left">Type</label>
      <select class="form-select" id="prd-req-type">
        ${PRD_REQ_TYPES.map(t=>`<option value="${t}">${t}</option>`).join('')}
      </select>

      <label class="form-label" for="prd-req-priority" style="margin:0;text-align:left">Priority</label>
      <select class="form-select" id="prd-req-priority">
        ${PRD_PRIORITIES.map(pr=>`<option value="${pr}" ${pr==='Should'?'selected':''}>${pr}</option>`).join('')}
      </select>

      <label class="form-label" for="prd-req-status" style="margin:0;text-align:left">Status</label>
      <select class="form-select" id="prd-req-status">
        ${PRD_REQ_STATUSES.map(s=>`<option value="${s}">${s}</option>`).join('')}
      </select>

      <label class="form-label" for="prd-req-owner" style="margin:0;text-align:left">Owner</label>
      <input class="form-input" id="prd-req-owner" placeholder="e.g. AM"/>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="prd-modal-cancel">Cancel</button>
      <button class="btn btn-primary" id="prd-modal-save">Add requirement</button>
    </div>`;

  const close = () => { overlay.classList.add('hidden'); box.innerHTML = ''; };
  document.getElementById('prd-modal-close').addEventListener('click', close);
  document.getElementById('prd-modal-cancel').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  document.getElementById('prd-modal-save').addEventListener('click', () => {
    const title = document.getElementById('prd-req-title').value.trim();
    if (!title) { toast('Requirement text is required', 'warning'); return; }
    const maxId = Math.max(0, ...Object.values(DATA.prds || {}).flatMap(d => d.requirements.map(r => r.id)));
    const seq = doc.requirements.length + 1;
    doc.requirements.push({
      id: maxId + 1,
      code: 'REQ-' + String(seq).padStart(3, '0'),
      title,
      type: document.getElementById('prd-req-type').value,
      priority: document.getElementById('prd-req-priority').value,
      status: document.getElementById('prd-req-status').value,
      owner: document.getElementById('prd-req-owner').value.trim()
    });
    touchPRD(p.id);
    toast('Requirement added');
    close();
    renderPRD();
  });
}

function renderIssues() {
  renderTopbar([{ label: 'Issues' }]);

  const allViews = [
    ...OOB_ISSUE_VIEWS,
    ...STATE.issuesCustomViews
  ];
  const activeView = allViews.find(v => v.id === STATE.issuesViewId) || OOB_ISSUE_VIEWS[0];
  const issues = getIssuesForView(activeView);

  const viewIconMap = { list:I.list, checkSquare:I.checkSquare, kanban:I.kanban, zap:I.zap, timeline:I.timeline, calendar:I.calendarView };

  const sidebarHtml = `
    <div style="width:220px;flex-shrink:0;border-right:1px solid var(--border);padding:16px 12px;display:flex;flex-direction:column;gap:4px;overflow-y:auto">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;padding:4px 8px 8px">Built-in Views</div>
      ${OOB_ISSUE_VIEWS.map(v => `
        <div class="issues-view-item ${activeView.id===v.id?'active':''}" data-view="${v.id}" style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:7px;cursor:pointer;font-size:13px;font-weight:${activeView.id===v.id?'600':'400'};color:${activeView.id===v.id?'var(--primary)':'var(--text)'};background:${activeView.id===v.id?'var(--primary-light)':'transparent'};transition:background .15s">
          <span style="display:inline-flex;width:15px;height:15px;flex-shrink:0;opacity:.7">${viewIconMap[v.icon]||I.list}</span>
          ${v.label}
        </div>`).join('')}

      <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;padding:16px 8px 8px;display:flex;align-items:center;justify-content:space-between">
        My Views
        <button id="issues-new-view-btn" style="background:none;border:none;cursor:pointer;color:var(--primary);display:inline-flex;align-items:center;padding:2px">${ico(I.plus,13)}</button>
      </div>
      ${STATE.issuesCustomViews.length === 0
        ? `<div style="font-size:12px;color:var(--text-muted);padding:4px 10px">No custom views yet</div>`
        : STATE.issuesCustomViews.map(v => `
          <div class="issues-view-item ${activeView.id===v.id?'active':''}" data-view="${v.id}" style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:7px;cursor:pointer;font-size:13px;font-weight:${activeView.id===v.id?'600':'400'};color:${activeView.id===v.id?'var(--primary)':'var(--text)'};background:${activeView.id===v.id?'var(--primary-light)':'transparent'};transition:background .15s">
            <span style="display:inline-flex;width:15px;height:15px;flex-shrink:0;opacity:.7">${viewIconMap[v.icon]||I.list}</span>
            <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${v.label}</span>
            <span class="issues-del-view" data-view="${v.id}" style="display:none;cursor:pointer;color:#ef4444">${ico(I.x,12)}</span>
          </div>`).join('')}
    </div>`;

  const toolbar = `
    <div style="display:flex;align-items:center;gap:10px;padding:14px 20px 0;flex-shrink:0">
      <div style="position:relative;flex:1;max-width:320px">
        <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text-muted)">${ico(I.search,14)}</span>
        <input id="issues-search" type="text" placeholder="Search issues…" value="${STATE.issuesSearch||''}"
          style="width:100%;padding:7px 10px 7px 32px;border:1px solid var(--border);border-radius:8px;font-size:13px;background:var(--surface);color:var(--text);box-sizing:border-box">
      </div>
      <span style="font-size:12px;color:var(--text-muted)">${issues.length} issue${issues.length!==1?'s':''}</span>
      <button class="btn btn-primary btn-sm" id="issues-new-btn" style="margin-left:auto">${ico(I.plus,13)} New Issue</button>
    </div>`;

  const viewDesc = activeView.description ? `<div style="font-size:12px;color:var(--text-muted);padding:6px 20px 0">${activeView.description}</div>` : '';

  let bodyHtml = '';
  if (activeView.layout === 'table')    bodyHtml = renderIssuesTable(issues, activeView);
  else if (activeView.layout === 'board')    bodyHtml = renderIssuesBoard(issues, activeView);
  else if (activeView.layout === 'timeline') bodyHtml = renderIssuesTimeline(issues);
  else if (activeView.layout === 'calendar') bodyHtml = renderIssuesCalendar(issues);

  document.getElementById('content').innerHTML = `
    <div style="display:flex;height:100%;overflow:hidden">
      ${sidebarHtml}
      <div style="flex:1;min-width:0;display:flex;flex-direction:column;overflow:hidden">
        ${toolbar}
        ${viewDesc}
        <div style="flex:1;overflow:auto;padding:${activeView.layout==='board'?'14px 20px':'14px 20px'}">
          ${bodyHtml}
        </div>
      </div>
    </div>
  `;

  // bind view switcher
  document.querySelectorAll('.issues-view-item[data-view]').forEach(el => {
    el.addEventListener('click', () => { STATE.issuesViewId = el.dataset.view; renderIssues(); });
    el.addEventListener('mouseenter', () => { const del = el.querySelector('.issues-del-view'); if(del) del.style.display='inline-flex'; });
    el.addEventListener('mouseleave', () => { const del = el.querySelector('.issues-del-view'); if(del) del.style.display='none'; });
  });
  document.querySelectorAll('.issues-del-view').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      STATE.issuesCustomViews = STATE.issuesCustomViews.filter(v => v.id !== el.dataset.view);
      if (STATE.issuesViewId === el.dataset.view) STATE.issuesViewId = 'oob-all';
      renderIssues();
    });
  });

  document.getElementById('issues-search').addEventListener('input', e => {
    STATE.issuesSearch = e.target.value;
    renderIssues();
  });

  document.getElementById('issues-new-btn').addEventListener('click', () => openIssueModal());
  document.getElementById('issues-new-view-btn').addEventListener('click', () => openIssueViewModal());

  document.querySelectorAll('.issues-row[data-id]').forEach(el => {
    el.addEventListener('click', () => openIssueDetail(+el.dataset.id));
  });
  document.querySelectorAll('.issue-card[data-id]').forEach(el => {
    el.addEventListener('click', () => openIssueDetail(+el.dataset.id));
  });
}

function renderIssuesTable(issues, view) {
  if (!issues.length) return `<div style="text-align:center;padding:60px;color:var(--text-muted)">No issues found</div>`;
  return `
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead>
        <tr style="border-bottom:2px solid var(--border)">
          <th style="text-align:left;padding:8px 10px;font-weight:600;color:var(--text-muted);width:36px">#</th>
          <th style="text-align:left;padding:8px 10px;font-weight:600;color:var(--text-muted)">Title</th>
          <th style="text-align:left;padding:8px 10px;font-weight:600;color:var(--text-muted);width:90px">Type</th>
          <th style="text-align:left;padding:8px 10px;font-weight:600;color:var(--text-muted);width:110px">Status</th>
          <th style="text-align:left;padding:8px 10px;font-weight:600;color:var(--text-muted);width:90px">Priority</th>
          <th style="text-align:left;padding:8px 10px;font-weight:600;color:var(--text-muted);width:140px">Project</th>
          <th style="text-align:left;padding:8px 10px;font-weight:600;color:var(--text-muted);width:90px">Assignee</th>
          <th style="text-align:left;padding:8px 10px;font-weight:600;color:var(--text-muted);width:90px">Due</th>
        </tr>
      </thead>
      <tbody>
        ${issues.map(iss => `
          <tr class="issues-row" data-id="${iss.id}" style="border-bottom:1px solid var(--border);cursor:pointer;transition:background .12s" onmouseenter="this.style.background='var(--surface-hover)'" onmouseleave="this.style.background=''">
            <td style="padding:10px 10px;color:var(--text-muted);font-size:11px">#${iss.id}</td>
            <td style="padding:10px 10px">
              <div style="font-weight:500;color:var(--text)">${iss.title}</div>
              <div style="margin-top:3px;display:flex;gap:4px;flex-wrap:wrap">
                ${iss.labels.map(l=>`<span style="font-size:10px;padding:1px 6px;border-radius:8px;background:var(--surface-hover);color:var(--text-muted)">${l}</span>`).join('')}
              </div>
            </td>
            <td style="padding:10px 10px">${issueBadge('itype',iss.type)}</td>
            <td style="padding:10px 10px">${issueBadge('status',iss.status)}</td>
            <td style="padding:10px 10px">${issueBadge('priority',iss.priority)}</td>
            <td style="padding:10px 10px;font-size:12px;color:var(--text-muted)">${iss.project}</td>
            <td style="padding:10px 10px">
              <span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:${iss.assigneeColor};color:#fff;font-size:10px;font-weight:700">${iss.assignee}</span>
            </td>
            <td style="padding:10px 10px;font-size:12px;color:var(--text-muted)">${iss.due||'—'}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

function renderIssuesBoard(issues, view) {
  const groupKey = view.groupBy || 'status';
  const groups = groupKey === 'status' ? ISSUE_STATUSES : ISSUE_PRIORITIES;
  const metaMap = groupKey === 'status' ? ISSUE_STATUS_META : ISSUE_PRIORITY_META;

  const cols = groups.map(g => {
    const cards = issues.filter(i => i[groupKey] === g);
    const meta  = metaMap[g] || { label: g, color:'#64748b', bg:'#f1f5f9' };
    return `
      <div style="flex-shrink:0;width:240px;display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;align-items:center;gap:8px;padding:8px 4px">
          <span style="width:10px;height:10px;border-radius:50%;background:${meta.color};flex-shrink:0"></span>
          <span style="font-weight:600;font-size:13px;color:var(--text)">${meta.label||g}</span>
          <span style="margin-left:auto;font-size:11px;background:var(--surface-hover);padding:1px 7px;border-radius:10px;color:var(--text-muted)">${cards.length}</span>
        </div>
        ${cards.map(iss => `
          <div class="issue-card" data-id="${iss.id}" style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px;cursor:pointer;transition:box-shadow .15s" onmouseenter="this.style.boxShadow='0 2px 10px rgba(0,0,0,.08)'" onmouseleave="this.style.boxShadow=''">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;margin-bottom:6px">
              ${issueBadge('itype',iss.type)}
              <span style="font-size:10px;color:var(--text-muted)">#${iss.id}</span>
            </div>
            <div style="font-size:13px;font-weight:500;color:var(--text);margin-bottom:8px;line-height:1.4">${iss.title}</div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              ${groupKey==='status' ? issueBadge('priority',iss.priority) : issueBadge('status',iss.status)}
              <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${iss.assigneeColor};color:#fff;font-size:9px;font-weight:700">${iss.assignee}</span>
            </div>
          </div>`).join('')}
        ${cards.length === 0 ? `<div style="border:2px dashed var(--border);border-radius:10px;padding:20px;text-align:center;color:var(--text-muted);font-size:12px">No issues</div>` : ''}
      </div>`;
  }).join('');

  return `<div style="display:flex;gap:16px;align-items:flex-start;overflow-x:auto;padding-bottom:8px">${cols}</div>`;
}

function renderIssuesTimeline(issues) {
  const sorted = [...issues].filter(i=>i.due).sort((a,b)=>a.due.localeCompare(b.due));
  if (!sorted.length) return `<div style="text-align:center;padding:60px;color:var(--text-muted)">No issues with due dates</div>`;

  const minDate = new Date(sorted[0].due);
  const maxDate = new Date(sorted[sorted.length-1].due);
  const totalDays = Math.max(1, (maxDate - minDate) / 86400000) + 14;
  const W = 700;

  const today = new Date('2026-06-20');
  const todayOffset = Math.max(0,(today-minDate)/86400000/totalDays*W);

  const rows = sorted.map((iss, idx) => {
    const d = new Date(iss.due);
    const offset = Math.max(0,(d-minDate)/86400000/totalDays*W);
    const barW = 120;
    const x = Math.min(offset, W-barW);
    const y = idx*38+10;
    const pm = ISSUE_PRIORITY_META[iss.priority]||{color:'#64748b'};
    const label = iss.title.length > 28 ? iss.title.slice(0,26)+'…' : iss.title;
    return `
      <rect x="${x}" y="${y}" width="${barW}" height="24" rx="5" fill="${pm.color}" opacity="0.18"/>
      <rect x="${x}" y="${y}" width="4" height="24" rx="2" fill="${pm.color}"/>
      <text x="${x+10}" y="${y+15}" font-size="11" fill="var(--text)">${label}</text>
      <text x="${x+barW+6}" y="${y+15}" font-size="10" fill="var(--text-muted)">${iss.due}</text>`;
  }).join('');

  const svgH = sorted.length*38+30;
  return `
    <div style="overflow-x:auto">
      <svg viewBox="0 0 ${W+160} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="width:100%;min-width:600px;font-family:inherit">
        <line x1="${todayOffset}" y1="0" x2="${todayOffset}" y2="${svgH}" stroke="#ef444450" stroke-width="1.5" stroke-dasharray="4"/>
        <text x="${todayOffset+3}" y="12" font-size="10" fill="#ef4444">Today</text>
        ${rows}
      </svg>
    </div>`;
}

function renderIssuesCalendar(issues) {
  const year = 2026, month = 5; // June 2026 (0-indexed)
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();

  const byDay = {};
  issues.forEach(iss => {
    if (!iss.due) return;
    const d = new Date(iss.due);
    if (d.getFullYear()===year && d.getMonth()===month) {
      const k = d.getDate();
      if (!byDay[k]) byDay[k]=[];
      byDay[k].push(iss);
    }
  });

  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let cells = '';
  let dayCount = 1;
  for (let row=0; row<6; row++) {
    for (let col=0; col<7; col++) {
      const cellIdx = row*7+col;
      if (cellIdx < firstDay || dayCount > daysInMonth) {
        cells += `<div style="min-height:80px;border:1px solid var(--border);border-radius:6px;background:var(--surface-hover);opacity:.4"></div>`;
      } else {
        const isToday = dayCount===20;
        const issDay = byDay[dayCount]||[];
        const dots = issDay.slice(0,3).map(iss => {
          const pm = ISSUE_PRIORITY_META[iss.priority]||{color:'#64748b'};
          return `<div class="issue-card" data-id="${iss.id}" style="font-size:10px;padding:2px 5px;border-radius:4px;background:${pm.color}18;color:${pm.color};cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${iss.title}">${iss.title.slice(0,20)}${iss.title.length>20?'…':''}</div>`;
        }).join('');
        const more = issDay.length > 3 ? `<div style="font-size:10px;color:var(--text-muted)">+${issDay.length-3} more</div>` : '';
        cells += `<div style="min-height:80px;border:1px solid var(--border);border-radius:6px;padding:6px;background:${isToday?'var(--primary-light)':'var(--card)'}">
          <div style="font-weight:${isToday?'700':'400'};font-size:12px;color:${isToday?'var(--primary)':'var(--text-muted)'};margin-bottom:4px">${dayCount}</div>
          <div style="display:flex;flex-direction:column;gap:2px">${dots}${more}</div>
        </div>`;
        dayCount++;
      }
    }
    if (dayCount > daysInMonth) break;
  }

  return `
    <div>
      <div style="font-size:15px;font-weight:700;margin-bottom:12px;color:var(--text)">${monthNames[month]} ${year}</div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:6px">
        ${days.map(d=>`<div style="text-align:center;font-size:11px;font-weight:600;color:var(--text-muted);padding:4px">${d}</div>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px">${cells}</div>
    </div>`;
}

function openIssueDetail(id) {
  const iss = DATA.issues.find(i=>i.id===id);
  if (!iss) return;
  const pm = ISSUE_PRIORITY_META[iss.priority]||{};
  const sm = ISSUE_STATUS_META[iss.status]||{};
  const tm = ISSUE_TYPE_META[iss.type]||{};

  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:1000;display:flex;align-items:flex-start;justify-content:flex-end';
  overlay.className = 'app-modal';
  overlay.innerHTML = `
    <div style="width:480px;height:100%;background:var(--card);overflow-y:auto;padding:28px;box-shadow:-4px 0 24px rgba(0,0,0,.15);display:flex;flex-direction:column;gap:16px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between">
        <span style="font-size:12px;color:var(--text-muted)">Issue #${iss.id}</span>
        <button id="iss-close" style="background:none;border:none;cursor:pointer;color:var(--text-muted)">${ico(I.x,16)}</button>
      </div>
      <div style="font-size:17px;font-weight:700;color:var(--text);line-height:1.4">${iss.title}</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${issueBadge('itype',iss.type)}
        ${issueBadge('status',iss.status)}
        ${issueBadge('priority',iss.priority)}
      </div>
      <div style="font-size:13px;color:var(--text-muted);line-height:1.6">${iss.description}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:16px;background:var(--surface);border-radius:10px">
        <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Project</div><div style="font-size:13px;font-weight:500">${iss.project}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Assignee</div><div style="font-size:13px;font-weight:500;display:flex;align-items:center;gap:6px"><span style="width:22px;height:22px;border-radius:50%;background:${iss.assigneeColor};color:#fff;font-size:9px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${iss.assignee}</span>${iss.assignee}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Due</div><div style="font-size:13px;font-weight:500">${iss.due||'—'}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Reporter</div><div style="font-size:13px;font-weight:500">${iss.reporter}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Created</div><div style="font-size:13px;font-weight:500">${iss.created}</div></div>
        <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">Updated</div><div style="font-size:13px;font-weight:500">${iss.updated}</div></div>
      </div>
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:8px">Labels</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${iss.labels.map(l=>`<span style="font-size:11px;padding:2px 8px;border-radius:8px;background:var(--surface-hover);color:var(--text-muted)">${l}</span>`).join('')}
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if(e.target===overlay) overlay.remove(); });
  overlay.querySelector('#iss-close').addEventListener('click', () => overlay.remove());
}

function openIssueModal() {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:1000;display:flex;align-items:center;justify-content:center';
  overlay.className = 'app-modal';
  overlay.innerHTML = `
    <div style="background:var(--card);border-radius:14px;padding:28px;width:500px;max-width:95vw;display:flex;flex-direction:column;gap:16px;box-shadow:0 8px 40px rgba(0,0,0,.18)">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:16px;font-weight:700">New Issue</span>
        <button id="ni-close" style="background:none;border:none;cursor:pointer;color:var(--text-muted)">${ico(I.x,16)}</button>
      </div>
      <input id="ni-title" type="text" placeholder="Issue title…" style="padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:14px;background:var(--surface);color:var(--text);outline:none">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:4px">Type</label>
          <select id="ni-type" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:8px;font-size:13px;background:var(--surface);color:var(--text)">
            ${ISSUE_TYPES.map(t=>`<option value="${t}">${t.charAt(0).toUpperCase()+t.slice(1)}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:4px">Priority</label>
          <select id="ni-priority" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:8px;font-size:13px;background:var(--surface);color:var(--text)">
            ${ISSUE_PRIORITIES.map(p=>`<option value="${p}">${p.charAt(0).toUpperCase()+p.slice(1)}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:4px">Project</label>
          <select id="ni-project" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:8px;font-size:13px;background:var(--surface);color:var(--text)">
            ${DATA.projects.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:4px">Assignee</label>
          <select id="ni-assignee" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:8px;font-size:13px;background:var(--surface);color:var(--text)">
            ${DATA.team.map(m=>`<option value="${m.initials}">${m.name}</option>`).join('')}
          </select>
        </div>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:4px">Due Date</label>
        <input id="ni-due" type="date" style="padding:8px;border:1px solid var(--border);border-radius:8px;font-size:13px;background:var(--surface);color:var(--text)">
      </div>
      <textarea id="ni-desc" placeholder="Description (optional)…" rows="3" style="padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;background:var(--surface);color:var(--text);resize:vertical;outline:none"></textarea>
      <div style="display:flex;justify-content:flex-end;gap:10px">
        <button id="ni-cancel" class="btn btn-secondary">Cancel</button>
        <button id="ni-save" class="btn btn-primary">Create Issue</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  overlay.addEventListener('click', e => { if(e.target===overlay) close(); });
  overlay.querySelector('#ni-close').addEventListener('click', close);
  overlay.querySelector('#ni-cancel').addEventListener('click', close);
  overlay.querySelector('#ni-save').addEventListener('click', () => {
    const title = overlay.querySelector('#ni-title').value.trim();
    if (!title) { overlay.querySelector('#ni-title').focus(); return; }
    const projId = +overlay.querySelector('#ni-project').value;
    const proj   = DATA.projects.find(p=>p.id===projId);
    const assigneeInit = overlay.querySelector('#ni-assignee').value;
    const member = DATA.team.find(m=>m.initials===assigneeInit);
    const newId  = Math.max(...DATA.issues.map(i=>i.id))+1;
    DATA.issues.push({
      id:      newId,
      title,
      type:         overlay.querySelector('#ni-type').value,
      status:       'open',
      priority:     overlay.querySelector('#ni-priority').value,
      project:      proj ? proj.name : '',
      projectId:    projId,
      assignee:     assigneeInit,
      assigneeColor: member ? member.color : '#64748b',
      reporter:     DATA.user.initials,
      created:      '2026-06-20',
      updated:      '2026-06-20',
      due:          overlay.querySelector('#ni-due').value || null,
      labels:       [],
      description:  overlay.querySelector('#ni-desc').value.trim(),
    });
    close();
    showToast('Issue created', 'success');
    renderIssues();
  });
}

function openIssueViewModal() {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:1000;display:flex;align-items:center;justify-content:center';
  overlay.className = 'app-modal';
  overlay.innerHTML = `
    <div style="background:var(--card);border-radius:14px;padding:28px;width:420px;max-width:95vw;display:flex;flex-direction:column;gap:16px;box-shadow:0 8px 40px rgba(0,0,0,.18)">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:16px;font-weight:700">New View</span>
        <button id="nv-close" style="background:none;border:none;cursor:pointer;color:var(--text-muted)">${ico(I.x,16)}</button>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:4px">View Name</label>
        <input id="nv-name" type="text" placeholder="e.g. Critical Bugs" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:14px;background:var(--surface);color:var(--text);outline:none;box-sizing:border-box">
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:8px">Layout</label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px" id="nv-layout-picker">
          ${[
            {id:'table',    icon:'list',        label:'Table'},
            {id:'board',    icon:'kanban',      label:'Board'},
            {id:'timeline', icon:'timeline',    label:'Timeline'},
            {id:'calendar', icon:'calendarView',label:'Calendar'},
          ].map(opt=>`
            <div class="nv-layout-opt" data-layout="${opt.id}" style="border:2px solid var(--border);border-radius:8px;padding:10px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;transition:border-color .15s">
              <span style="color:var(--text-muted)">${ico(I[opt.icon],20)}</span>
              <span style="font-size:12px;font-weight:500">${opt.label}</span>
            </div>`).join('')}
        </div>
      </div>
      <div id="nv-groupby-wrap">
        <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:4px">Group By (Board only)</label>
        <select id="nv-groupby" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:8px;font-size:13px;background:var(--surface);color:var(--text)">
          <option value="status">Status</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:4px">Filter Assignee</label>
        <select id="nv-filter" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:8px;font-size:13px;background:var(--surface);color:var(--text)">
          <option value="">All assignees</option>
          <option value="assignee-me">Assigned to me</option>
        </select>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:10px">
        <button id="nv-cancel" class="btn btn-secondary">Cancel</button>
        <button id="nv-save" class="btn btn-primary">Create View</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  let selectedLayout = 'table';
  const layoutOpts = overlay.querySelectorAll('.nv-layout-opt');
  const groupWrap   = overlay.querySelector('#nv-groupby-wrap');

  const setLayout = (id) => {
    selectedLayout = id;
    layoutOpts.forEach(el => {
      el.style.borderColor = el.dataset.layout===id ? 'var(--primary)' : 'var(--border)';
      el.style.background  = el.dataset.layout===id ? 'var(--primary-light)' : '';
    });
    groupWrap.style.display = id==='board' ? '' : 'none';
  };
  setLayout('table');
  layoutOpts.forEach(el => el.addEventListener('click', () => setLayout(el.dataset.layout)));

  const close = () => overlay.remove();
  overlay.addEventListener('click', e => { if(e.target===overlay) close(); });
  overlay.querySelector('#nv-close').addEventListener('click', close);
  overlay.querySelector('#nv-cancel').addEventListener('click', close);
  overlay.querySelector('#nv-save').addEventListener('click', () => {
    const name = overlay.querySelector('#nv-name').value.trim();
    if (!name) { overlay.querySelector('#nv-name').focus(); return; }
    const iconMap = { table:'list', board:'kanban', timeline:'timeline', calendar:'calendarView' };
    const newView = {
      id:      'custom-' + Date.now(),
      label:   name,
      layout:  selectedLayout,
      groupBy: selectedLayout==='board' ? overlay.querySelector('#nv-groupby').value : null,
      filter:  overlay.querySelector('#nv-filter').value || null,
      icon:    iconMap[selectedLayout]||'list',
      description: `Custom view: ${name}`,
    };
    STATE.issuesCustomViews.push(newView);
    STATE.issuesViewId = newView.id;
    close();
    renderIssues();
  });
}

// ============================================================
// COMMERCIAL — internal competitive analysis (dev use only)
// ============================================================
const COMMERCIAL = {
  competitors: [
    { id:'wired',   name:'Wired',      vendor:'(us)',           color:'#6366f1', segment:'Governance-first PM', founded:2026, tagline:'Policy-driven project governance with approval gates and live health scoring.' },
    { id:'jira',    name:'Jira',       vendor:'Atlassian',      color:'#0052cc', segment:'Engineering / Agile', founded:2002, tagline:'Issue tracking and agile boards with a deep developer ecosystem.' },
    { id:'monday',  name:'monday.com', vendor:'monday.com',     color:'#ff3d57', segment:'Work OS / general',   founded:2012, tagline:'Highly visual, flexible Work OS for cross-functional teams.' },
    { id:'asana',   name:'Asana',      vendor:'Asana',          color:'#f06a6a', segment:'Work management',     founded:2008, tagline:'Task and workflow management with goals and portfolios.' },
    { id:'clickup', name:'ClickUp',    vendor:'ClickUp',        color:'#7b68ee', segment:'All-in-one',         founded:2017, tagline:'Broad "one app to replace them all" feature surface.' },
    { id:'linear',  name:'Linear',     vendor:'Linear',         color:'#5e6ad2', segment:'Engineering',        founded:2019, tagline:'Fast, opinionated issue tracker for software teams.' },
    { id:'wrike',   name:'Wrike',      vendor:'Wrike',          color:'#08cf65', segment:'Enterprise PM',      founded:2006, tagline:'Enterprise work management with strong reporting and approvals.' },
  ],

  // capability matrix — value is 'yes' | 'partial' | 'no'. star = a Wired differentiator row.
  features: [
    { name:'Kanban / board views',        star:false, wired:'yes',     jira:'yes',     monday:'yes',     asana:'yes',     clickup:'yes',     linear:'yes',     wrike:'yes' },
    { name:'Gantt / timeline',            star:false, wired:'yes',     jira:'partial', monday:'yes',     asana:'yes',     clickup:'yes',     linear:'no',      wrike:'yes' },
    { name:'Issue tracking',              star:false, wired:'yes',     jira:'yes',     monday:'partial', asana:'partial', clickup:'yes',     linear:'yes',     wrike:'partial' },
    { name:'Custom fields',               star:false, wired:'yes',     jira:'yes',     monday:'yes',     asana:'yes',     clickup:'yes',     linear:'partial', wrike:'yes' },
    { name:'Workflow automation',         star:false, wired:'yes',     jira:'yes',     monday:'yes',     asana:'yes',     clickup:'yes',     linear:'partial', wrike:'yes' },
    { name:'Resource / capacity mgmt',    star:false, wired:'yes',     jira:'no',      monday:'yes',     asana:'yes',     clickup:'yes',     linear:'no',      wrike:'yes' },
    { name:'Custom reports / dashboards', star:false, wired:'yes',     jira:'yes',     monday:'yes',     asana:'yes',     clickup:'yes',     linear:'partial', wrike:'yes' },
    { name:'Native integrations',         star:false, wired:'partial', jira:'yes',     monday:'yes',     asana:'yes',     clickup:'yes',     linear:'yes',     wrike:'yes' },
    { name:'Phase-gated workflows',       star:true,  wired:'yes',     jira:'partial', monday:'no',      asana:'no',      clickup:'partial', linear:'no',      wrike:'partial' },
    { name:'Policy / governance engine',  star:true,  wired:'yes',     jira:'no',      monday:'no',      asana:'no',      clickup:'no',      linear:'no',      wrike:'partial' },
    { name:'Approval gates',              star:true,  wired:'yes',     jira:'partial', monday:'partial', asana:'partial', clickup:'partial', linear:'no',      wrike:'yes' },
    { name:'Project health scoring',      star:true,  wired:'yes',     jira:'no',      monday:'no',      asana:'partial', clickup:'no',      linear:'no',      wrike:'partial' },
    { name:'Guided walkthroughs',         star:true,  wired:'yes',     jira:'no',      monday:'no',      asana:'no',      clickup:'no',      linear:'no',      wrike:'no' },
  ],

  // illustrative public list pricing, per user / month billed annually (USD)
  pricing: [
    { id:'wired',   free:'Internal',          low:null, high:null, note:'Pre-commercial — pricing not yet set' },
    { id:'jira',    free:'Up to 10 users',    low:7.75, high:15.25, note:'Standard → Premium' },
    { id:'monday',  free:'Up to 2 seats',     low:9,    high:19,    note:'Basic → Pro' },
    { id:'asana',   free:'Up to 10 users',    low:10.99,high:24.99, note:'Starter → Advanced' },
    { id:'clickup', free:'Free Forever',      low:7,    high:12,    note:'Unlimited → Business' },
    { id:'linear',  free:'Up to 10 users',    low:8,    high:14,    note:'Basic → Business' },
    { id:'wrike',   free:'Limited',           low:9.80, high:24.80, note:'Team → Business' },
  ],

  wins: [
    { title:'Policy & governance engine', desc:'Global, type- and project-scoped policies that auto-trigger actions and approvals — no competitor ships this natively.' },
    { title:'Approval gates everywhere', desc:'Approvals are first-class: queue, history, and policy-driven requests woven through every workflow phase.' },
    { title:'Live project health scoring', desc:'Composite health (tasks, milestones, budget, risk) surfaced continuously, not as a bolt-on report.' },
    { title:'Phase-gated workflows', desc:'Opinionated lifecycle templates with required actions and sign-off gates per phase.' },
    { title:'Guided walkthroughs', desc:'Built-in onboarding that drives health improvement — unique vs. all listed tools.' },
  ],
  gaps: [
    { title:'Integration breadth', desc:'Jira, Monday and Asana have hundreds of native integrations + app marketplaces; Wired has a focused set today.' },
    { title:'Ecosystem & mindshare', desc:'Atlassian/Asana own developer and enterprise mindshare; Wired is pre-market.' },
    { title:'Mobile & offline', desc:'Competitors ship mature native mobile apps; Wired is web-first.' },
    { title:'Scale & SSO/enterprise admin', desc:'Enterprise IAM, audit and provisioning still need to reach parity with Wrike/Jira.' },
  ],
};

function cmCell(v) {
  if (v === 'yes')     return '<span style="color:#16a34a;font-weight:700;font-size:15px">✓</span>';
  if (v === 'partial') return '<span style="color:#f59e0b;font-weight:700;font-size:15px">~</span>';
  return '<span style="color:#cbd5e1;font-weight:700;font-size:15px">–</span>';
}

function renderCommercial() {
  renderTopbar([{ label: 'Commercial' }]);

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Commercial</h1>
        <p class="page-subtitle">Competitive comparison vs. leading project-management tools — internal, for development use only</p>
      </div>
      <span class="badge badge-medium" title="This page is internal and not part of the customer-facing product">${ico(I.lock,12)} Internal · Dev only</span>
    </div>

    <div id="cm-body"></div>
  `;

  renderCommercialComparison(document.getElementById('cm-body'));
}

function cmKpiCardsHtml() {
  const others = COMMERCIAL.competitors.filter(c=>c.id!=='wired');
  const starFeatures = COMMERCIAL.features.filter(f=>f.star);
  const wiredYes = COMMERCIAL.features.filter(f=>f.wired==='yes').length;
  return `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
      ${resKpi('Competitors Tracked', others.length+'',          '#eef2ff','#6366f1', I.layers,   'Leading PM tools')}
      ${resKpi('Capabilities Mapped', COMMERCIAL.features.length+'', '#f0fdf4','#16a34a', I.checkSquare, wiredYes+' supported by Wired')}
      ${resKpi('Differentiators',     starFeatures.length+'',     '#fffbeb','#f59e0b', I.zap,      'Where Wired stands alone')}
      ${resKpi('Market Position',     'Challenger',               '#fef2f2','#ef4444', I.trendUp,  'Pre-commercial, governance niche')}
    </div>`;
}

function cmLandscapeHtml() {
  return `
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">
      ${COMMERCIAL.competitors.map(c=>`
        <div class="card" style="padding:18px;${c.id==='wired'?'border:2px solid '+c.color+';background:'+c.color+'08':''}">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
            <div style="width:40px;height:40px;border-radius:10px;background:${c.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800">${c.name.charAt(0)}</div>
            <div style="flex:1">
              <div style="font-size:15px;font-weight:700;color:var(--c-text)">${c.name} ${c.id==='wired'?'<span style="font-size:11px;font-weight:600;color:'+c.color+'">— us</span>':''}</div>
              <div style="font-size:11px;color:var(--c-text-3)">${c.vendor} · est. ${c.founded}</div>
            </div>
            <span class="badge" style="background:${c.color}18;color:${c.color}">${c.segment}</span>
          </div>
          <div style="font-size:12px;color:var(--c-text-2);line-height:1.5">${c.tagline}</div>
        </div>`).join('')}
    </div>`;
}

function renderCommercialComparison(el) {
  el.innerHTML = `
    <div style="margin-bottom:28px">${cmKpiCardsHtml()}</div>

    <p style="font-size:13px;color:var(--c-text-2);margin:0 0 20px;line-height:1.5">
      Consolidated view — every capability, price point and positioning note for Wired vs. the leading project-management tools on one page.
    </p>

    <div class="section-title" style="display:flex;align-items:center;gap:8px;margin-bottom:14px">${ico(I.table2,15)} Feature Matrix</div>
    <div id="cm-cmp-matrix" style="margin-bottom:32px"></div>

    <div class="section-title" style="display:flex;align-items:center;gap:8px;margin-bottom:14px">${ico(I.dollar,15)} Pricing</div>
    <div id="cm-cmp-pricing" style="margin-bottom:32px"></div>

    <div class="section-title" style="display:flex;align-items:center;gap:8px;margin-bottom:14px">${ico(I.trendUp,15)} Positioning</div>
    <div id="cm-cmp-positioning" style="margin-bottom:32px"></div>

    <div class="section-title" style="display:flex;align-items:center;gap:8px;margin-bottom:14px">${ico(I.layers,15)} Competitive Landscape</div>
    <div style="margin-bottom:32px">${cmLandscapeHtml()}</div>

    <div class="section-title" style="display:flex;align-items:center;gap:8px;margin-bottom:14px">${ico(I.zap,15)} Why Wired Wins</div>
    ${cmWhyWinsHtml()}
  `;
  renderCommercialMatrix(document.getElementById('cm-cmp-matrix'));
  renderCommercialPricing(document.getElementById('cm-cmp-pricing'));
  renderCommercialPositioning(document.getElementById('cm-cmp-positioning'));
}

function cmWhyWinsHtml() {
  const starFeatures = COMMERCIAL.features.filter(f=>f.star);
  return `
    <div class="card" style="padding:20px">
      <div style="font-size:12px;color:var(--c-text-3);margin-bottom:16px">Capabilities no listed competitor offers natively today</div>
      <div style="display:grid;grid-template-columns:repeat(${starFeatures.length},1fr);gap:12px">
        ${starFeatures.map(f=>`
          <div style="text-align:center;padding:14px;border-radius:10px;border:1px solid var(--c-border);background:#fffbeb">
            <div style="color:#f59e0b;margin-bottom:8px;display:flex;justify-content:center">${ico(I.zap,18)}</div>
            <div style="font-size:12px;font-weight:600;color:var(--c-text);line-height:1.3">${f.name}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderCommercialMatrix(el) {
  const cols = COMMERCIAL.competitors;
  el.innerHTML = `
    <div class="card" style="padding:0;overflow:hidden">
      <div style="display:flex;align-items:center;gap:18px;padding:14px 18px;border-bottom:1px solid var(--c-border);font-size:12px;color:var(--c-text-2)">
        <span><span style="color:#16a34a;font-weight:700">✓</span> Full support</span>
        <span><span style="color:#f59e0b;font-weight:700">~</span> Partial / add-on</span>
        <span><span style="color:#cbd5e1;font-weight:700">–</span> Not available</span>
        <span style="margin-left:auto">${ico(I.zap,12)} = Wired differentiator</span>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table" style="width:100%;border-collapse:collapse">
          <thead>
            <tr>
              <th style="text-align:left;padding:12px 16px;font-size:12px;color:var(--c-text-3);position:sticky;left:0;background:var(--c-surface)">Capability</th>
              ${cols.map(c=>`<th style="text-align:center;padding:12px 10px;font-size:12px;color:${c.id==='wired'?c.color:'var(--c-text-2)'};font-weight:${c.id==='wired'?'700':'600'};${c.id==='wired'?'background:'+c.color+'0d':''}">${c.name}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${COMMERCIAL.features.map(f=>`
              <tr style="border-top:1px solid var(--c-border);${f.star?'background:#fffbeb40':''}">
                <td style="text-align:left;padding:11px 16px;font-size:13px;color:var(--c-text);position:sticky;left:0;background:${f.star?'#fffdf5':'var(--c-surface)'}">
                  ${f.star?'<span style="color:#f59e0b;margin-right:6px">'+ico(I.zap,11)+'</span>':''}${f.name}
                </td>
                ${cols.map(c=>`<td style="text-align:center;padding:11px 10px;${c.id==='wired'?'background:'+c.color+'0d':''}">${cmCell(f[c.id])}</td>`).join('')}
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <p style="font-size:11px;color:var(--c-text-3);margin-top:12px">Assessment is directional and maintained internally for product positioning. Competitor capabilities change frequently — verify before external use.</p>`;
}

function renderCommercialPricing(el) {
  const byId = id => COMMERCIAL.competitors.find(c=>c.id===id);
  el.innerHTML = `
    <div class="card" style="padding:0;overflow:hidden">
      <table class="data-table" style="width:100%;border-collapse:collapse">
        <thead>
          <tr>
            <th style="text-align:left;padding:12px 16px;font-size:12px;color:var(--c-text-3)">Tool</th>
            <th style="text-align:left;padding:12px 16px;font-size:12px;color:var(--c-text-3)">Free tier</th>
            <th style="text-align:left;padding:12px 16px;font-size:12px;color:var(--c-text-3)">Paid range (user/mo)</th>
            <th style="text-align:left;padding:12px 16px;font-size:12px;color:var(--c-text-3)">Tiers</th>
          </tr>
        </thead>
        <tbody>
          ${COMMERCIAL.pricing.map(p=>{
            const c = byId(p.id);
            const range = p.low==null ? '<span style="color:var(--c-text-3)">—</span>'
              : `<span style="font-weight:700;color:var(--c-text)">$${p.low.toFixed(2)} – $${p.high.toFixed(2)}</span>`;
            return `
              <tr style="border-top:1px solid var(--c-border);${p.id==='wired'?'background:'+c.color+'0d':''}">
                <td style="padding:12px 16px">
                  <span style="display:inline-flex;align-items:center;gap:10px">
                    <span style="width:26px;height:26px;border-radius:7px;background:${c.color};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:800">${c.name.charAt(0)}</span>
                    <span style="font-size:13px;font-weight:600;color:var(--c-text)">${c.name}</span>
                  </span>
                </td>
                <td style="padding:12px 16px;font-size:13px;color:var(--c-text-2)">${p.free}</td>
                <td style="padding:12px 16px;font-size:13px">${range}</td>
                <td style="padding:12px 16px;font-size:12px;color:var(--c-text-3)">${p.note}</td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
    <p style="font-size:11px;color:var(--c-text-3);margin-top:12px">Illustrative public list pricing (USD, billed annually) for reference only — actual figures vary by plan, region and negotiation. Wired is pre-commercial; pricing is a strategic input, not yet set.</p>`;
}

function renderCommercialPositioning(el) {
  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">
      <div class="card" style="padding:20px;border-top:3px solid #16a34a">
        <div class="section-title" style="display:flex;align-items:center;gap:8px;margin-bottom:16px"><span style="color:#16a34a">${ico(I.thumbsUp,16)}</span> Where Wired wins</div>
        ${COMMERCIAL.wins.map(w=>`
          <div style="padding:12px 0;border-bottom:1px solid var(--c-border)">
            <div style="font-size:13px;font-weight:600;color:var(--c-text);margin-bottom:3px">${w.title}</div>
            <div style="font-size:12px;color:var(--c-text-2);line-height:1.5">${w.desc}</div>
          </div>`).join('')}
      </div>
      <div class="card" style="padding:20px;border-top:3px solid #ef4444">
        <div class="section-title" style="display:flex;align-items:center;gap:8px;margin-bottom:16px"><span style="color:#ef4444">${ico(I.alertTriangle,16)}</span> Where Wired must catch up</div>
        ${COMMERCIAL.gaps.map(g=>`
          <div style="padding:12px 0;border-bottom:1px solid var(--c-border)">
            <div style="font-size:13px;font-weight:600;color:var(--c-text);margin-bottom:3px">${g.title}</div>
            <div style="font-size:12px;color:var(--c-text-2);line-height:1.5">${g.desc}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="card" style="padding:20px">
      <div class="section-title" style="margin-bottom:10px">Positioning statement</div>
      <p style="font-size:13px;color:var(--c-text-2);line-height:1.6;margin:0">
        For <strong>PMOs and delivery leaders</strong> who need projects to follow process — not just track tasks —
        <strong>Wired</strong> is a <strong>governance-first project-management platform</strong> that bakes policies, approval gates and live health scoring
        into every workflow. Unlike <strong>Jira</strong> (engineering-centric), <strong>Monday/Asana/ClickUp</strong> (flexible but ungoverned work management)
        or <strong>Linear</strong> (pure issue tracking), Wired enforces the rules of delivery automatically, so compliance and oversight are built in rather than bolted on.
      </p>
    </div>`;
}

// --- NOTES ---
const NOTE_COLORS = ['#fef3c7','#dbeafe','#dcfce7','#f3e8ff','#fee2e2','#e0f2fe','#ffffff'];

function saveNotes() {
  try { localStorage.setItem('wiredNotes', JSON.stringify(DATA.notes)); }
  catch (e) { console.error('[saveNotes]', e); }
}
function restoreNotes() {
  let saved;
  try { saved = JSON.parse(localStorage.getItem('wiredNotes') || 'null'); }
  catch (e) { return; }
  if (Array.isArray(saved)) DATA.notes = saved;
}
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function renderNotes() {
  renderTopbar([{ label: 'Notes' }]);
  const el = document.getElementById('content');
  el.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Notes</h1>
        <p class="page-subtitle">Your personal scratchpad — quick notes, reminders and ideas across the workspace</p>
      </div>
      <button class="btn btn-primary" id="notes-add">${ico(I.plus,14)} New note</button>
    </div>
    <div id="notes-grid"></div>`;
  el.querySelector('#notes-add').addEventListener('click', () => {
    const id = DATA.notes.reduce((m,n)=>Math.max(m,n.id),0) + 1;
    DATA.notes.unshift({ id, title:'', body:'', color:'#ffffff', pinned:false, updated: todayStr() });
    saveNotes();
    renderNotesGrid();
    toast('Note added', 'success');
  });
  renderNotesGrid();
}

function renderNotesGrid() {
  const grid = document.getElementById('notes-grid');
  if (!grid) return;
  if (!DATA.notes.length) {
    grid.style.cssText = '';
    grid.innerHTML = `<div class="card" style="padding:48px;text-align:center;color:var(--c-text-3)">
      <div style="margin-bottom:8px;display:flex;justify-content:center">${ico(I.fileText,28)}</div>
      <div style="font-size:14px;font-weight:600;color:var(--c-text-2)">No notes yet</div>
      <div style="font-size:12px">Click "New note" to jot something down.</div>
    </div>`;
    return;
  }
  const sorted = [...DATA.notes].sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0));
  grid.style.cssText = 'display:flex;flex-direction:column;gap:12px;width:100%';
  grid.innerHTML = sorted.map(noteCardHtml).join('');
  grid.querySelectorAll('[data-note-card]').forEach(card => bindNoteCard(card));
}

function noteCardHtml(n) {
  return `<div class="card" data-note-card="${n.id}" style="width:100%;padding:16px 18px;background:${n.color};border:1px solid rgba(0,0,0,0.06);border-left:4px solid ${n.pinned?'#f59e0b':'rgba(0,0,0,0.12)'};display:flex;align-items:flex-start;gap:18px">
    <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:6px">
      <div data-note-title style="font-size:15px;font-weight:700;color:#1e293b;cursor:text;min-height:18px;word-break:break-word"></div>
      <div data-note-body style="font-size:13px;line-height:1.55;color:#334155;cursor:text;white-space:pre-wrap;word-break:break-word;min-height:20px"></div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:4px">
        <div data-note-colors style="display:flex;gap:5px">
          ${NOTE_COLORS.map(c=>`<span data-color="${c}" title="Set color" style="width:14px;height:14px;border-radius:50%;background:${c};border:1.5px solid ${c===n.color?'#475569':'rgba(0,0,0,0.12)'};cursor:pointer"></span>`).join('')}
        </div>
        <span style="font-size:10.5px;color:#94a3b8">Updated ${n.updated}</span>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:4px;flex-shrink:0">
      <button data-note-pin title="${n.pinned?'Unpin':'Pin'}" style="background:none;border:none;cursor:pointer;padding:4px;color:${n.pinned?'#f59e0b':'#94a3b8'};display:flex">${ico(I.flag,16)}</button>
      <button data-note-del title="Delete note" style="background:none;border:none;cursor:pointer;padding:4px;color:#94a3b8;display:flex">${ico(I.trash,16)}</button>
    </div>
  </div>`;
}

function bindNoteCard(card) {
  const id = +card.dataset.noteCard;
  const note = DATA.notes.find(n => n.id === id);
  if (!note) return;

  // Inline-editable title & body (global convention: click to edit, Enter/blur saves, Esc cancels)
  card.querySelector('[data-note-title]').appendChild(
    makeEditableText(note.title, v => { note.title = v; note.updated = todayStr(); saveNotes(); }, 'Untitled note'));
  card.querySelector('[data-note-body]').appendChild(
    makeEditableMultiline(note.body, v => { note.body = v; note.updated = todayStr(); saveNotes(); }, 'Add a note…'));

  card.querySelector('[data-note-pin]').addEventListener('click', () => {
    note.pinned = !note.pinned;
    note.updated = todayStr();
    saveNotes();
    renderNotesGrid();
  });
  card.querySelector('[data-note-del]').addEventListener('click', () => {
    if (DATA.user.settings.confirmDestructive && !confirm('Delete this note?')) return;
    DATA.notes = DATA.notes.filter(n => n.id !== id);
    saveNotes();
    renderNotesGrid();
    toast('Note deleted', 'success');
  });
  card.querySelectorAll('[data-note-colors] [data-color]').forEach(sw => {
    sw.addEventListener('click', () => {
      note.color = sw.dataset.color;
      note.updated = todayStr();
      saveNotes();
      renderNotesGrid();
    });
  });
}

// Inline-editable text (single line) — follows the global data-table editing convention.
function makeEditableText(value, onSave, placeholder) {
  const span = document.createElement('span');
  span.textContent = value || (placeholder || '');
  span.style.cursor = 'text';
  span.style.display = 'inline-block';
  span.style.minWidth = '20px';
  if (!value) span.style.color = '#94a3b8';
  span.onclick = (e) => {
    e.stopPropagation();
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    input.style.cssText = 'border:1px solid #6366f1;border-radius:4px;padding:2px 6px;font-size:inherit;font-weight:inherit;width:100%;box-sizing:border-box;outline:none;';
    span.parentNode.replaceChild(input, span);
    input.focus(); input.select();
    const commit = () => {
      const newVal = input.value.trim();
      value = newVal;
      span.textContent = newVal || (placeholder || '');
      span.style.color = newVal ? '#1e293b' : '#94a3b8';
      if (input.parentNode) input.parentNode.replaceChild(span, input);
      onSave(newVal);
    };
    input.onblur = commit;
    input.onkeydown = (ke) => {
      if (ke.key === 'Enter') { ke.preventDefault(); input.blur(); }
      if (ke.key === 'Escape') { input.value = value; input.blur(); }
    };
  };
  return span;
}

// Inline-editable multiline text — same pattern with a textarea.
function makeEditableMultiline(value, onSave, placeholder) {
  const span = document.createElement('span');
  span.style.cssText = 'cursor:text;white-space:pre-wrap;display:block;min-height:18px;';
  span.textContent = value || (placeholder || '');
  if (!value) span.style.color = '#94a3b8';
  span.onclick = (e) => {
    e.stopPropagation();
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.rows = Math.max(3, (value.match(/\n/g)||[]).length + 2);
    ta.style.cssText = 'border:1px solid #6366f1;border-radius:4px;padding:6px;font:inherit;line-height:1.5;width:100%;box-sizing:border-box;outline:none;resize:vertical;';
    span.parentNode.replaceChild(ta, span);
    ta.focus(); ta.select();
    const commit = () => {
      const newVal = ta.value.trim();
      value = newVal;
      span.textContent = newVal || (placeholder || '');
      span.style.color = newVal ? '#334155' : '#94a3b8';
      if (ta.parentNode) ta.parentNode.replaceChild(span, ta);
      onSave(newVal);
    };
    ta.onblur = commit;
    ta.onkeydown = (ke) => {
      // Enter commits; Shift+Enter inserts a newline. Escape cancels.
      if (ke.key === 'Enter' && !ke.shiftKey) { ke.preventDefault(); ta.blur(); }
      if (ke.key === 'Escape') { ta.value = value; ta.blur(); }
    };
  };
  return span;
}

// --- INIT ---
// Global Escape: close the topmost open dialog/overlay/panel. Checked from
// topmost (most recently opened) to bottommost — the first open one is closed.
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;

  // Inline field editors handle their own Escape (cancel) and take precedence:
  // blur to dismiss the editor before any parent dialog closes.
  const ae = document.activeElement;
  if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA')) { ae.blur(); e.stopPropagation(); return; }

  // 1. Ad-hoc overlays appended to <body> (issue detail, new issue, new view) — topmost.
  const overlays = document.querySelectorAll('body > .app-modal');
  if (overlays.length) { overlays[overlays.length - 1].remove(); e.stopPropagation(); return; }

  // 2. Shared modal overlay (report / risk / PRD modals).
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay && !modalOverlay.classList.contains('hidden')) {
    modalOverlay.classList.add('hidden');
    const box = document.getElementById('modal-box');
    if (box) box.innerHTML = '';
    e.stopPropagation();
    return;
  }

  // 3. Toggled fixed modals (display flex/none).
  for (const id of ['automation-modal', 'action-modal', 'run-modal']) {
    const m = document.getElementById(id);
    if (m && m.style.display !== 'none') { m.style.display = 'none'; e.stopPropagation(); return; }
  }

  // 4. Wizard / template shells.
  const shellOverlay = document.getElementById('wizard-shell') || document.getElementById('wt-overlay');
  if (shellOverlay) { shellOverlay.remove(); e.stopPropagation(); return; }

  // 5. Workflow builder: close the action detail panel first, then the builder itself.
  if (document.getElementById('wf-builder-shell')) {
    const detailClose = document.getElementById('detail-close');
    if (detailClose) { detailClose.click(); e.stopPropagation(); return; }
    const back = document.getElementById('wf-back-btn');
    if (back) { back.click(); e.stopPropagation(); return; }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  restoreUserSettings();
  restoreNotes();
  restorePRDs();
  restoreLocation();
  restoreSidebarState();
  renderSidebar();
  render();
});
