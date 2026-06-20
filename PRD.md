# Wired — Product Requirements Document
## Professional Project Management Platform
**Version:** 1.0 | **Date:** June 2026 | **Status:** Approved for UX Phase

---

## 1. Executive Summary

Wired is a professional project management platform built around structured, policy-driven delivery. Unlike open-canvas tools, Wired guides project managers through a **structured setup wizard**, enforces **consistent project governance**, and delegates routine decisions to an **automation engine** — keeping humans in authority via a **supervisory approval queue**.

Phase 1 scope: complete UX design and interactive front-end prototype.

---

## 2. Problem Statement

| Challenge | Impact | Frequency |
|-----------|--------|-----------|
| Inconsistent project setup | Missing critical info causes downstream rework | Every new project |
| Reactive risk management | Issues escalate before PM is aware | Weekly |
| Routine decision overload | Low-stakes decisions consume strategic time | Daily |
| Status update fatigue | Manual updates lead to stale project data | Daily |

**Root causes:**
- No standardized intake process for new projects
- No policy engine to delegate routine decisions
- No guided review cadence for existing projects
- Approval workflows are ad-hoc, not systematic

---

## 3. User Personas

### Alex — The Project Manager (Primary)
- Manages 3–6 simultaneous projects
- Goals: On-time delivery, proactive risk management, clear team direction
- Pain points: Context switching, manual status updates, unclear escalation paths
- Tech comfort: High

### Jordan — The Team Member (Secondary)
- Engineer / Designer / Analyst assigned to tasks
- Goals: Clear ownership, unambiguous priorities, minimal interruption
- Pain points: Task overload, changing priorities
- Tech comfort: High

### Sam — The Executive Sponsor (Tertiary)
- Sponsors 2–3 projects, needs high-level visibility
- Goals: Budget control, risk visibility, delivery confidence
- Pain points: Unreliable status reports, late escalation, surprise overruns
- Tech comfort: Medium

---

## 4. Product Vision & Goals

> *Wired transforms project management from reactive firefighting into structured, policy-driven delivery — where routine work is automated, exceptions are surfaced for human judgment, and every project starts with a complete blueprint.*

### Phase 1 Goals
| Goal | Success Metric |
|------|---------------|
| G1: Reduce project setup time | Wizard completion < 10 min |
| G2: Centralize decision points | All pending actions visible in one queue |
| G3: No-code automation | PMs define policies without engineering |
| G4: Structured project review | Walkthrough completion > 70%/week per project |

---

## 5. Feature Requirements

### 5.1 Navigation Shell — P0
- Persistent sidebar: Dashboard, Projects, Approvals (with badge), Policies, Team, Analytics
- Collapsible to icon-only mode
- User profile + settings at bottom
- Top bar: breadcrumbs, global search, notification bell, user avatar dropdown

### 5.2 Dashboard — P0
**KPI Tiles:** Active Projects, Pending Approvals, Team Members, Overdue Tasks

**Recent Projects grid:** project card with name, status badge, health score, progress bar, PM avatar

**Pending Approvals widget:** top 3 items with inline approve/reject + "View all" link

**Activity feed:** chronological log across all projects, filterable

### 5.3 Project List — P0
- Toggle: Card Grid | Table List
- Search + filters: Status, Type, Priority, PM, Date Range
- Sort by: Name, Created, Health, Due Date
- Row/card actions: View, Edit, Archive

**Status values:** Planning | Active | At Risk | On Hold | Completed | Archived

**Health Score:** 0–100 composite score. See §5.11 for full algorithm.
- Green ≥ 75 | Amber 50–74 | Red < 50
- Displays **N/A** until the project has at least one milestone and one task defined

### 5.4 New Project Wizard — P0
5-step linear wizard with left-panel step navigator:

| Step | Name | Key Fields |
|------|------|-----------|
| 1 | Project Basics | Name*, Description, Type, Priority, Tags |
| 2 | Team & Stakeholders | PM (auto), Team Members + Roles, Stakeholders |
| 3 | Timeline & Milestones | Start Date, End Date, Milestone builder |
| 4 | Budget & Policies | Total Budget, Allocations, Automation Policies |
| 5 | Review & Launch | Full summary, validation checklist, Launch / Save Draft |

**UX requirements:**
- Progress indicator in sidebar (step number + percentage)
- Save as Draft available at any step
- Field values persist across step navigation
- Inline validation with error messages
- Keyboard nav: Tab between fields, Enter to confirm

### 5.5 Project Detail — P0
**Header:** Project name, status badge (clickable), health score, progress bar, Owner, Due date, Budget used

**Tabs:** Overview | Tasks | Timeline | Budget | Team | Policies | Activity

| Tab | Content |
|-----|---------|
| Overview | Summary stats, upcoming milestones (3), recent activity (5), team avatars, risk summary |
| Tasks | Table: name, assignee, status, priority, due date; filters; inline Add Task |
| Timeline | Visual Gantt-style view with milestone markers and today marker |
| Budget | Total / Spent / Remaining tiles; category breakdown; burn chart |
| Team | Roster, roles, allocation %, workload indicator |
| Policies | Active policies (inherited + custom); Add Policy shortcut |
| Activity | Chronological event log; filter by type, date, member |

### 5.6 Project Walkthrough — P0

#### Overview

The walkthrough is a structured review session a PM runs periodically (recommended weekly) against a single project. It is triggered via the **"Run Walkthrough"** button on the Project Detail header.

The walkthrough opens as a **full-screen overlay modal** (not a drawer — it requires focus). It has a left-panel step navigator and a main content area. Navigation is linear: Back / Next buttons; no step can be jumped to by clicking the navigator (steps must be completed or skipped in order).

---

#### Overlay Structure

```
┌──────────────────────────────────────────────────────────┐
│  [X] Exit                          Project: Alpha Launch  │
├────────────┬─────────────────────────────────────────────┤
│ Step nav   │  Step content area                          │
│            │                                             │
│ ● 1 Status │  [Step title]                               │
│ ○ 2 Risk   │  [Fields / inputs]                          │
│ ○ 3 Team   │                                             │
│ ○ 4 Miles  │                                             │
│ ○ 5 Budget │                                             │
│ ○ 6 Actions│                          [Skip] [Next →]   │
└────────────┴─────────────────────────────────────────────┘
```

- Completed steps show a checkmark (●✓); skipped steps show a dash (●–)
- Exiting mid-walkthrough shows a confirmation dialog: "Save progress and exit?" → saves a draft walkthrough resumable within 24h, after which it is discarded
- Progress is auto-saved after each step so a page refresh does not lose answers

---

#### Skip Behavior

Any step can be skipped. When the PM clicks **Skip**:

1. A small inline reason field appears (free text, optional, max 200 chars)
2. Clicking **Confirm Skip** marks the step as skipped and advances to the next step
3. Skipped steps are recorded in the Activity log with the reason (or "No reason given")
4. The walkthrough can be submitted with any number of skipped steps
5. Skipped steps do not contribute data to that walkthrough's health score recalculation — the score is recalculated using only the data from completed steps

---

#### Step Definitions

---

**Step 1 — Status Update**

*Purpose: Capture the PM's overall assessment of project health.*

| Field | Type | Required |
|-------|------|----------|
| Overall status | Radio: On Track / At Risk / Off Track | Yes |
| Status notes | Textarea (max 500 chars) | No |
| Health score weights override | Collapsible panel — 4 sliders (see §5.11) | No |

The current health score (computed) is displayed read-only alongside the PM's subjective status selection, so the PM can see both signals side-by-side.

If **Off Track** is selected, a banner appears: *"You may want to flag risks in Step 2 and create recovery actions in Step 6."* (informational only — no branching).

---

**Step 2 — Risk Review**

*Purpose: Surface and update project risks.*

Displays a read-only table of all open risks for this project (columns: Description, Severity, Owner, Opened date).

| Field | Type | Required |
|-------|------|----------|
| Are there new risks? | Toggle Yes / No | Yes |
| New risk entries | Inline form — Description, Severity (High/Med/Low), Owner | If Yes |
| Any existing risks resolved? | Multi-select checkboxes on open risk rows | No |
| Risk notes | Textarea (max 500 chars) | No |

The PM can add multiple new risks via an **"+ Add another risk"** link. Risks added here are created immediately on submit of this step (not deferred to Step 6).

---

**Step 3 — Team Check**

*Purpose: Identify capacity issues, blockers, and team health signals.*

| Field | Type | Required |
|-------|------|----------|
| Is any team member over capacity? | Toggle Yes / No | Yes |
| Over-capacity members | Multi-select from project roster | If Yes |
| Are there any blockers? | Toggle Yes / No | Yes |
| Blocker descriptions | Repeatable text entries (max 3) | If Yes |
| Team notes | Textarea (max 500 chars) | No |

Each blocker entry has: Description (text) + Blocked task (searchable dropdown of project tasks) + Owner (team member picker).

---

**Step 4 — Milestone Review**

*Purpose: Assess milestone adherence and flag slippages.*

Displays all project milestones in a table (columns: Name, Planned Date, Status, Days Variance).

| Field | Type | Required |
|-------|------|----------|
| Any milestone dates need adjustment? | Toggle Yes / No | Yes |
| Date adjustments | Inline date pickers on milestone rows | If Yes |
| Any milestones to mark complete? | Checkboxes on milestone rows | No |
| Milestone notes | Textarea (max 500 chars) | No |

Date adjustments made here update the milestone directly. The milestone's original date is preserved as `original_date` for variance tracking and health score history.

---

**Step 5 — Budget Review**

*Purpose: Validate spend against plan and flag forecast concerns.*

Displays read-only: Total Budget | Planned Spend (elapsed ratio) | Actual Spend | Variance % | S_budget score.

| Field | Type | Required |
|-------|------|----------|
| Is spend on track? | Radio: Yes / Concern / Off Track | Yes |
| Forecasted total spend | Number input (pre-filled with actual spend) | No |
| Budget notes | Textarea (max 500 chars) | No |

If forecasted total exceeds total budget, an inline warning appears: *"Forecast exceeds budget by $X."* This is informational — it may trigger policy actions post-walkthrough if a Budget Warning policy is active.

---

**Step 6 — Action Items**

*Purpose: Review auto-generated suggested tasks and confirm which to create.*

The system pre-generates suggested action items based on signals from Steps 1–5:

| Signal Source | Suggested Action |
|--------------|-----------------|
| Status = Off Track | "Schedule recovery planning meeting" |
| New High/Critical risk added | "Assign risk mitigation owner for: [risk description]" |
| Team member over capacity | "Review workload for: [member name]" |
| Blocker logged | "Resolve blocker: [description]" — assigned to blocker owner |
| Milestone date slipped | "Communicate timeline change to stakeholders" |
| Budget = Off Track | "Schedule budget review with sponsor" |

Each suggested task is shown as an editable card with:
- Title (pre-filled, editable)
- Assignee (pre-filled from context, changeable)
- Due date (default: today + 3 days, changeable)
- Checkbox to include / exclude from creation

The PM can also **add custom tasks** via a "+ Add task" button at the bottom of the list.

Clicking **Complete Walkthrough** creates all checked tasks and finalizes the walkthrough.

---

#### Post-Walkthrough Effects

Executed immediately on "Complete Walkthrough":

1. **Health score recalculated** using answers from completed steps (§5.11)
2. **Checked action items created** as real tasks on the project's task list, tagged `source: walkthrough`
3. **Risks** added in Step 2 are persisted; resolved risks are closed
4. **Milestone dates** adjusted in Step 4 are saved with original date preserved
5. **Walkthrough record logged** in the project's Activity feed:
   - Timestamp, PM name, steps completed vs. skipped, health score before/after
6. **Policy engine re-evaluated** against the updated project state — any matching policies fire immediately (e.g. a Budget Warning policy may trigger if Step 5 flagged off-track spend)

---

#### Walkthrough Frequency & Reminders

- Recommended cadence: weekly (configurable per project in Project Settings)
- If no walkthrough has been run in N days (default: 7), the Project Detail header shows a **"Walkthrough due"** banner
- The "No project update" policy template (§5.8) fires a notification to the PM after the same threshold
- Walkthrough history is visible on the Activity tab, filterable by type = Walkthrough

### 5.7 Approval Queue — P0

#### Overview

The Approval Queue is the central hub where all automated actions that require human authorization are held before execution. Items are generated by policies with "Require approval" enabled (§5.8) and by walkthrough action item suggestions.

Accessible via the **Approvals** sidebar item (with live pending-count badge) and the Dashboard pending approvals widget.

---

#### Urgency Levels

Every approval item has an urgency level: **Critical** or **Normal**. The system calculates it automatically; the PM can override it at any time.

**System-calculated urgency rules (Critical if any condition is met):**

| Condition | Rationale |
|-----------|-----------|
| Project health score < 50 (Red) | Project already in critical state |
| Triggering risk severity = High or Critical | High-impact risk exposure |
| Task is > 5 days overdue | Significant delivery slip |
| Milestone missed and project is At Risk or Off Track | Schedule and status both degraded |
| Budget variance > 20% | Material financial overrun |

All other items default to **Normal**.

**PM override:** A urgency toggle (Critical / Normal) is available in the item's expanded detail panel. Override is logged in the item's audit trail with timestamp and actor.

---

#### Queue Layout — Pending View

Two-column layout: item list (left, ~40%) + detail panel (right, ~60%). Selecting an item loads its detail without leaving the page.

**List column — item card:**
```
[●] [CRITICAL] Alpha Launch                     2h ago
    Create recovery task: Milestone missed
    Policy: Milestone Slip  ·  Project Type: Engineering
    [Approve]  [Reject]
```

- Red left border for Critical items; grey for Normal
- Critical items always float to the top of the list regardless of creation time
- Within each urgency group, sorted by creation time (oldest first)
- Bulk select checkboxes on each card; "Select all" at top of list
- Inline **Approve** and **Reject** buttons on the card for one-click decisions without opening detail panel

**Filters (above list):**
- Urgency: All / Critical / Normal
- Project: searchable dropdown
- Policy: searchable dropdown
- Action type: all action types from §5.8

---

#### Detail Panel

Opens when an item card is selected. Divided into three sections:

**Context section:**
- Project name + health score + status badge
- Policy name + scope level + trigger that fired
- Triggering entity (task name / milestone name / risk description)
- Full policy definition summary (trigger → condition → action)
- Timestamp policy fired

**Action section:**
- Action type label (e.g. "Create Task", "Change Project Status")
- Editable action parameters (see Modify flow below)
- PM note field (free text, max 500 chars) — optional, attached to the decision record

**Decision buttons:**
`[Approve]`  `[Reject]`  — full-width, stacked, at bottom of panel

---

#### Modify Flow

The PM can edit action parameters directly in the detail panel before approving. This combines parameter editing with a decision note.

**Editable fields per action type:**

| Action Type | Editable Parameters |
|-------------|-------------------|
| Create task | Title, Assignee, Due date, Priority |
| Change task status | Target status value |
| Change project status | Target status value |
| Escalate to sponsor | Notification message text |
| Notify PM / assignee | Notification message text |

Edited fields are highlighted with a blue left border to signal they differ from the policy's original values. The approval record stores both the original parameters and the modified values.

A PM note can be added regardless of whether parameters were edited — it is attached to the History record and visible to anyone who views the item in History.

Approving a modified item executes the action with the PM's modified parameters, not the original policy parameters.

---

#### Bulk Actions

Checkboxes on item cards enable multi-select. Bulk action bar appears above the list when ≥ 1 item is selected:

`[n selected]  [Approve all]  [Reject all]  [Clear selection]`

- Bulk approve: executes all selected items with their original (unmodified) policy parameters
- Bulk reject: rejects all selected items; a single shared reason field appears before confirming
- Bulk actions are not available for modification — items requiring parameter changes must be actioned individually
- Bulk actions are logged individually in History (each item gets its own record)

---

#### Reject Flow

Whether rejecting a single item or in bulk:

1. A reason field appears inline (free text, optional, max 300 chars)
2. Clicking **Confirm Reject** closes the item into History with outcome = Rejected
3. The policy that generated the item is **not paused** — it will re-fire if the trigger condition persists and the cooldown has elapsed
4. The rejection reason is stored and visible in History

---

#### History View

Tabular view of all past approval decisions.

Columns: Item Description | Project | Policy | Outcome | Decided by | Decided at | PM Note

- **Outcome values:** Approved | Approved (Modified) | Rejected
- Filters: Outcome, Project, Policy, Date range, Decided by
- Clicking a row expands a read-only detail panel showing the full context, original parameters, modified parameters (if any), and PM note
- No actions available on History items — records are immutable

---

#### Dashboard Widget — Pending Approvals

Shown on the Dashboard (§5.2). Displays the top 3 pending items sorted by urgency then age.

Each widget row:
- Urgency dot (red = Critical, grey = Normal)
- Action description (truncated)
- Project name
- Age
- Inline [Approve] [Reject] buttons

"View all →" link navigates to the full Approval Queue pending view.

### 5.8 Policy Manager — P1

#### Policy List

Table/card view of all policies visible to the current user, across all scope levels.

Columns: Name | Scope | Project Type (if scoped) | Project (if scoped) | Status | Trigger | Last Fired | Actions

- **Status values:** Active | Paused | Draft
- **Row actions:** Toggle Active/Paused, Edit, Duplicate, Delete
- **Filters:** Scope (Global / Type / Project), Status, Trigger type
- Policies inherited from a higher scope level are shown with a lock icon and are read-only at lower levels (can be duplicated and overridden)

---

#### Policy Scope — 3 Levels

Policies operate at three scope levels. All three are independent — multiple policies can match the same event and **all fire independently** (no suppression).

| Level | Applies To | Managed By |
|-------|-----------|-----------|
| **Global** | Every project in the workspace | Workspace admin |
| **Project Type** | All projects of a given type (e.g. Engineering, Marketing, Operations) | Workspace admin |
| **Project** | One specific project | PM of that project |

Project Types are defined in Settings → Project Types. A policy scoped to a type automatically applies to all current and future projects of that type.

When multiple policies fire on the same event, each produces its own entry in the Approval Queue or executes its own action independently. The PM may see multiple approval items for one event — each clearly labeled with the policy name and scope level that generated it.

---

#### Policy Builder

A 4-panel form: **Trigger → Condition → Action → Settings**

---

**Panel 1 — Trigger**

Defines the event that activates the policy.

| Trigger Type | Parameters |
|-------------|-----------|
| Task overdue | N days past due date (default: 1) |
| Budget threshold exceeded | Spend reaches X% of total budget (default: 80%) |
| Milestone missed | Milestone due date passed without completion |
| No project update | No walkthrough or status change in N days (default: 7) |
| Task blocked | Task in Blocked status for N hours (default: 48) |
| Health score drop | Score falls below threshold X (default: 50) |
| Risk opened | A new risk is added with severity = High or Critical |

Each trigger has a **cooldown** setting: minimum time before the same policy fires again on the same entity (default: 24 hours). Prevents notification spam on persistent issues.

---

**Panel 2 — Condition (optional)**

Filters which entities the trigger applies to. All conditions within a panel are AND-combined. The condition panel can be skipped entirely (policy fires on all matching triggers).

| Condition Field | Options |
|----------------|---------|
| Task priority | Any / Critical / High / Medium / Low |
| Task assignee | Any / specific team member(s) |
| Project type | Any / specific type(s) — only available on Global-scope policies |
| Project health | Any / Green / Amber / Red |
| Budget variance | Any / Over plan / Under plan |
| Milestone type | Any / Key Milestone / Checkpoint |

---

**Panel 3 — Action**

Defines the single action executed when trigger + condition match. One action per policy (no chaining).

| Action | Description | Goes to Approval Queue? |
|--------|-------------|------------------------|
| Notify PM | In-app notification + badge on bell icon | No |
| Notify assignee | In-app notification to task assignee | No |
| Notify PM + assignee | Both of the above | No |
| Create task | Auto-create a follow-up task with configurable title template, assignee, due offset | Only if "Require approval" toggled on |
| Change task status | Set task to a new status value | Only if "Require approval" toggled on |
| Change project status | Set project to At Risk / On Hold | Only if "Require approval" toggled on |
| Escalate to sponsor | In-app notification to project's Executive Sponsor | No |
| Require approval | Route the entire action to the Approval Queue for human decision | Always (this IS the queue entry) |

**Action templates** for "Create task" include a title template with variables: `{{project_name}}`, `{{task_name}}`, `{{assignee}}`, `{{days_overdue}}`, `{{milestone_name}}`.

Example: `"Follow up: {{task_name}} is {{days_overdue}} days overdue — {{assignee}}"`

---

**Panel 4 — Settings**

| Setting | Options / Default |
|---------|------------------|
| Policy name | Free text, required |
| Scope | Global / Project Type / Project |
| Project Type (if type-scoped) | Dropdown of defined types |
| Project (if project-scoped) | Searchable project picker |
| Status on save | Active / Draft (default: Draft) |
| Require approval | Toggle — if on, action routes to queue before executing |
| Cooldown | Hours between repeat fires on same entity (default: 24h, min: 1h) |

---

#### Conflict & Co-firing Behavior

When multiple policies match the same event:

- All fire independently — no deduplication or suppression
- Each creates its own approval item or notification
- Each approval item displays its source policy name and scope level
- The PM can act on them individually or in bulk

This is intentional: a Global policy and a Project policy may prescribe different responses, and the PM deserves visibility into both.

---

#### Policy Inheritance & Read-Only Rules

- Project-scoped policies are only visible on the project's Policies tab
- Type-scoped and Global policies appear on a project's Policies tab as **inherited** (with scope badge), read-only
- A PM can **duplicate** an inherited policy and save a project-scoped version — the inherited one still fires independently
- Only workspace admins can edit or delete Global and Type-scoped policies

---

#### Policy Templates (5 pre-built)

Available when creating a new policy via "Start from template." Pre-fill all four panels; user can customize before saving.

| Template | Scope | Trigger | Condition | Action |
|---------|-------|---------|-----------|--------|
| Overdue Alert | Global | Task overdue 1 day | Priority = High or Critical | Notify PM + assignee |
| Budget Warning | Global | Budget threshold 80% | — | Notify PM; require approval for further spend changes |
| Milestone Slip | Global | Milestone missed | — | Escalate to sponsor + create recovery task (approval required) |
| Status Reminder | Global | No project update 7 days | — | Notify PM |
| Risk Escalation | Global | Task blocked 48h | Priority = Critical | Notify PM; change project status to At Risk (approval required) |

### 5.9 Team Management — P1
**Members view:** directory table with Avatar, Name, Role, Email, Projects, Status
**Invite member flow**
**Workload view:** per-member workload bar (tasks/capacity), red = over capacity

### 5.10 Analytics — P2
- Portfolio health grid (all active projects, traffic light)
- Milestone adherence trend chart (placeholder)
- Budget variance by project
- Approval resolution time
- Task completion velocity

### 5.11 Health Score Algorithm — P0

#### Overview

The Health Score is a single 0–100 number that reflects overall project delivery confidence. It is a weighted average of four component scores. Default weights are equal (25% each) and are configurable at two levels:

| Level | Where | Scope |
|-------|-------|-------|
| Global default | Settings → Health Score Weights | Applies to all projects unless overridden |
| Per-project override | Project Walkthrough → Step 1 (Status Update) | Overrides global for that project only |

Weight constraints: all four weights must sum to 100%. The UI enforces this with a live sum indicator and prevents saving if they don't balance.

---

#### Data Readiness Gate

The score is only computed — and displayed — when **all three** of the following are true:

1. The project has at least **1 milestone** defined
2. The project has at least **1 task** defined
3. The project has a **start date** set

Until the gate is met, display **"N/A"** in all health score fields (project card, header, dashboard tile). Show a tooltip: *"Health score available once milestones and tasks are added."*

---

#### Component Scores

Each component produces a value between 0 and 100. The final score is:

```
Health Score = (W_task × S_task) + (W_milestone × S_milestone) + (W_budget × S_budget) + (W_risk × S_risk)
```

Default weights: `W_task = W_milestone = W_budget = W_risk = 0.25`

---

**S_task — Task Completion Rate**

Measures how many non-overdue tasks are on track relative to the current project elapsed ratio.

```
elapsed_ratio    = days_since_start / total_project_days          (capped 0–1)
expected_done    = round(total_tasks × elapsed_ratio)
actual_done      = count of tasks with status = Completed
S_task           = min(100, round((actual_done / expected_done) × 100))
                   → 100 if expected_done = 0 (project just started)
```

Overdue penalty: for each task past its due date, subtract 5 points from `S_task`, minimum 0.

---

**S_milestone — Milestone Adherence**

Measures how well the project is hitting scheduled milestones.

```
past_milestones     = milestones whose due date ≤ today
on_time_milestones  = past milestones completed on or before their due date
S_milestone         = round((on_time_milestones / past_milestones) × 100)
                    → 100 if no past milestones yet
```

A milestone completed within 2 days after its due date counts as **0.5** (partial credit) rather than 0.

---

**S_budget — Budget Variance**

Measures how closely actual spend tracks the planned burn rate.

```
elapsed_ratio   = days_since_start / total_project_days        (capped 0–1)
planned_spend   = total_budget × elapsed_ratio
actual_spend    = sum of all recorded spend to date
variance_pct    = (actual_spend - planned_spend) / total_budget × 100

S_budget = 100                          if variance_pct ≤ 5%   (within tolerance)
         = 100 − (variance_pct − 5) × 4  if 5% < variance_pct ≤ 30%
         = 0                            if variance_pct > 30%
         → floor at 0
```

Under-spend (negative variance) is not penalized — it scores 100.

---

**S_risk — Risk Severity Ratio**

Measures open risk exposure relative to total project task volume. This approach scales naturally: larger projects can absorb more risk.

```
weighted_risk_exposure = (count_high × 3) + (count_medium × 1.5) + (count_low × 0.5)
                         where counts = open (unresolved) risks by severity level

risk_capacity          = total_tasks × 0.5     (each task "absorbs" half a risk unit)

ratio                  = weighted_risk_exposure / risk_capacity   (capped at 1.0)

S_risk                 = round((1 − ratio) × 100)
                       → 100  if no open risks
                       → 0    if ratio ≥ 1.0
```

Resolved/accepted risks are excluded from the count.

---

#### Score Recalculation Triggers

The health score is recalculated automatically whenever any of the following change:

- A task status changes or due date is updated
- A milestone is marked complete or its date is modified
- A budget spend entry is added or edited
- A risk is opened, updated, or resolved
- Walkthrough Step 1 (Status Update) is completed
- Project weights are changed in Settings or Walkthrough

Recalculation is synchronous and happens on the backend before the API response returns the updated project object. The UI reflects the new score immediately without a separate refresh.

---

#### Display Rules

| Context | Display |
|---------|---------|
| Project card (grid) | Colored circle with score number |
| Project list (table) | Colored badge `75 ●` |
| Project detail header | Large score + color label (Healthy / At Risk / Critical) |
| Dashboard KPI tile | Portfolio average (mean of all non-N/A active projects) |
| Walkthrough summary | Before vs. after comparison |

Color mapping: Green `#27ae60` ≥ 75 | Amber `#f39c12` 50–74 | Red `#e74c3c` < 50

---

#### Settings UI — Health Score Weights

Location: **Settings → Project Defaults → Health Score Weights**

- Four numeric sliders (0–100, step 5), labeled with factor name
- Live sum display: turns red if ≠ 100%
- "Reset to defaults" button (restores 25/25/25/25)
- Changes take effect on next score recalculation for all projects using global weights

Per-project override is surfaced in **Walkthrough Step 1** as a collapsible "Customize weights for this project" panel. Once a project has custom weights, a chip reading "Custom weights" appears in the Project Detail header beside the health score.

---

## 6. User Flows

### UF-01: Create New Project
```
Dashboard → "New Project"
→ Wizard Step 1 (Basics) → Step 2 (Team) → Step 3 (Timeline)
→ Step 4 (Budget/Policies) → Step 5 (Review)
→ Launch → Success screen → Project Detail (new project)
```

### UF-02: Handle an Approval
```
Notification bell / Dashboard widget → Approvals (Pending)
→ Select item → Review context
→ Approve → confirmation toast → next item
   or Reject (with reason) → confirmation → next item
   or Modify → edit params → approve modified
```

### UF-03: Run Project Walkthrough
```
Project Detail → "Run Walkthrough"
→ Overlay opens → Step 1 (Status) → Step 2 (Risk) → Step 3 (Team)
→ Step 4 (Milestones) → Step 5 (Budget) → Step 6 (Actions)
→ Complete → health score updates → logged in Activity → overlay closes
```

### UF-04: Create a Policy
```
Policies page → "New Policy"
→ Choose template OR start blank
→ Configure trigger → condition (optional) → action
→ Toggle approval requirement → set scope
→ Save & Activate → appears in policy list
```

### UF-05: At-Risk Project Response
```
Dashboard (red health card) → Project Detail
→ Overview shows risk indicators → "Run Walkthrough"
→ Walkthrough generates action items → assign to team
→ Policy triggers escalation → item appears in Approvals
```

---

## 7. UX Principles

| Principle | Description |
|-----------|-------------|
| **Guided over Open Canvas** | Wizards and walkthroughs reduce cognitive load and errors |
| **Progressive Disclosure** | Show only what's needed at each stage |
| **Transparent Automation** | Users always see what automated actions are pending |
| **Human Final Authority** | All high-impact automated actions require approval |
| **Context-Rich Decisions** | Approval items include full policy + project context |
| **Consistency** | Shared component library across all screens |

---

## 8. Information Architecture

```
Wired
├── Dashboard
├── Projects
│   ├── All / Active / Completed / Archived
│   ├── [New Project Wizard]
│   │   ├── Step 1: Basics
│   │   ├── Step 2: Team
│   │   ├── Step 3: Timeline
│   │   ├── Step 4: Budget & Policies
│   │   └── Step 5: Review & Launch
│   └── [Project Detail]
│       ├── Overview | Tasks | Timeline | Budget | Team | Policies | Activity
│       └── [Walkthrough Overlay]
├── Approvals
│   ├── Pending
│   └── History
├── Policies
│   ├── All Policies
│   ├── Templates
│   └── [Policy Builder]
├── Team
│   ├── Members
│   └── Workload
└── Analytics
```

---

## 9. Component Library

| Component | Variants |
|-----------|---------|
| Button | Primary, Secondary, Ghost, Danger, Icon-only; SM/MD/LG |
| Input | Text, Number, Date, Textarea, Select, Tags |
| Badge | 6 statuses, 4 priorities, 3 health levels |
| Card | Project, Approval, Policy, KPI tile |
| Table | Sortable, filterable, row actions |
| Tabs | Horizontal strip |
| Progress Bar | Single, segmented |
| Avatar | Single, Group (stacked), initial fallback |
| Modal | Standard, Wizard overlay, Confirmation |
| Toast | Success, Error, Warning, Info |
| Sidebar | Expanded, Collapsed |
| Stepper | Vertical (wizard sidebar) |

---

## 10. Non-Functional Requirements

- **Responsiveness:** Desktop-first (1280px+); functional at 1024px
- **Performance:** Page transitions < 100ms (local rendering, mock data)
- **Accessibility:** Keyboard navigable, ARIA labels, 4.5:1 contrast minimum
- **Browser support:** Chrome, Firefox, Safari, Edge (latest)

---

## 11. Out of Scope — Phase 1

| Item | Phase |
|------|-------|
| Backend API / database | Phase 2 |
| User authentication | Phase 2 |
| Real-time collaboration | Phase 3 |
| Mobile app | Future |
| External integrations (Jira, Slack, GitHub) | Future |
| Email / push notifications | Phase 2 |
| File attachments | Phase 2 |
| Interactive Gantt chart | Phase 2 |
| Time tracking | Future |

---

*Wired — Product Requirements Document v1.0*
*Phase 1: UX Design & Interactive Prototype | June 2026*
