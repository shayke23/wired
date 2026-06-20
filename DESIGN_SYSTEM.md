# Wired — Design System
**Version:** 1.0 | **Date:** June 2026

---

## 1. Design Principles

| Principle | Expression |
|-----------|-----------|
| **Clarity over decoration** | Every visual element earns its place by communicating something |
| **Structured hierarchy** | Typography and spacing guide the eye without needing borders everywhere |
| **Restrained color** | Indigo accent used sparingly — for actions and key signals only |
| **Consistent density** | Tables and lists are information-dense; cards breathe more |

---

## 2. Color Tokens

### Base Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#f8f9fc` | Page background |
| `--color-surface` | `#ffffff` | Cards, panels, modals |
| `--color-surface-raised` | `#f1f3f9` | Hover states, subtle fills, sidebar bg |
| `--color-border` | `#e2e6ef` | Dividers, input borders, table borders |
| `--color-border-strong` | `#c8cfe0` | Active input border, focused elements |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-primary` | `#111827` | Headings, labels, primary body |
| `--color-text-secondary` | `#4b5563` | Subtext, descriptions, table cell values |
| `--color-text-muted` | `#9ca3af` | Placeholders, disabled, timestamps |
| `--color-text-inverse` | `#ffffff` | Text on dark/accent backgrounds |

### Accent — Indigo

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent-50` | `#eef2ff` | Accent background tints |
| `--color-accent-100` | `#e0e7ff` | Hover tints on accent elements |
| `--color-accent-500` | `#6366f1` | Primary buttons, links, active nav |
| `--color-accent-600` | `#4f46e5` | Button hover state |
| `--color-accent-700` | `#4338ca` | Button active/pressed state |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#16a34a` | Health Green, success toasts, completed badges |
| `--color-success-bg` | `#f0fdf4` | Success badge background |
| `--color-warning` | `#d97706` | Health Amber, warning toasts, at-risk badges |
| `--color-warning-bg` | `#fffbeb` | Warning badge background |
| `--color-danger` | `#dc2626` | Health Red, error toasts, critical badges, danger buttons |
| `--color-danger-bg` | `#fef2f2` | Danger badge background |
| `--color-info` | `#2563eb` | Info toasts, informational callouts |
| `--color-info-bg` | `#eff6ff` | Info badge background |

### Neutrals (for UI chrome)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-neutral-50` | `#f9fafb` | Subtlest fills |
| `--color-neutral-100` | `#f3f4f6` | Table row hover, sidebar hover |
| `--color-neutral-200` | `#e5e7eb` | Dividers |
| `--color-neutral-500` | `#6b7280` | Icons, secondary actions |
| `--color-neutral-700` | `#374151` | Strong secondary text |
| `--color-neutral-900` | `#111827` | Same as `--color-text-primary` |

---

## 3. Typography

**Font family:** `Inter`, system-ui, sans-serif (loaded via Google Fonts)

### Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `--text-xs` | 11px | 400 | 1.4 | Timestamps, meta labels |
| `--text-sm` | 13px | 400 | 1.5 | Table cells, secondary body, badges |
| `--text-base` | 14px | 400 | 1.6 | Primary body, form inputs |
| `--text-md` | 15px | 500 | 1.5 | Card titles, tab labels |
| `--text-lg` | 18px | 600 | 1.4 | Section headings, modal titles |
| `--text-xl` | 22px | 700 | 1.3 | Page headings |
| `--text-2xl` | 28px | 700 | 1.2 | KPI tile numbers, hero values |

### Usage rules
- **600+ weight only for headings and labels** — body text stays at 400
- **No italic** in UI chrome — italic reserved for user-generated content quotes only
- **Uppercase sparingly** — only for category labels and table section dividers, at `--text-xs` with `letter-spacing: 0.06em`

---

## 4. Spacing Scale

8px base grid. All spacing values are multiples of 4px.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight inline gaps, icon-to-label |
| `--space-2` | 8px | Badge padding, compact row gaps |
| `--space-3` | 12px | Input padding, list item padding |
| `--space-4` | 16px | Card padding (compact), form field gap |
| `--space-5` | 20px | Standard section gap |
| `--space-6` | 24px | Card padding (standard) |
| `--space-8` | 32px | Between major sections |
| `--space-10` | 40px | Page header to content gap |
| `--space-12` | 48px | Wizard step padding |

---

## 5. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Badges, tags, small chips |
| `--radius-md` | 6px | Buttons, inputs, table cells |
| `--radius-lg` | 8px | Cards, panels, dropdowns |
| `--radius-xl` | 12px | Modals, overlay containers |
| `--radius-full` | 9999px | Avatars, toggle switches, pill badges |

---

## 6. Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Inputs on focus, subtle card lift |
| `--shadow-md` | `0 2px 8px rgba(0,0,0,0.08)` | Cards, dropdowns |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.10)` | Modals, overlays |
| `--shadow-focus` | `0 0 0 3px rgba(99,102,241,0.25)` | Focus ring on interactive elements |

---

## 7. Component Specs

### 7.1 Buttons

Three sizes × five variants.

**Sizes:**

| Size | Height | Padding H | Font |
|------|--------|-----------|------|
| SM | 28px | 10px | `--text-sm` 500 |
| MD | 34px | 14px | `--text-base` 500 |
| LG | 40px | 18px | `--text-md` 600 |

**Variants:**

| Variant | Background | Text | Border | Hover bg |
|---------|-----------|------|--------|---------|
| Primary | `--color-accent-500` | white | none | `--color-accent-600` |
| Secondary | white | `--color-text-primary` | `--color-border` | `--color-surface-raised` |
| Ghost | transparent | `--color-accent-500` | none | `--color-accent-50` |
| Danger | `--color-danger` | white | none | `#b91c1c` |
| Icon-only | transparent | `--color-neutral-500` | none | `--color-neutral-100` |

All buttons: `border-radius: --radius-md`, `transition: background 150ms ease`.
Disabled state: `opacity: 0.45`, `cursor: not-allowed`.
Focus: `box-shadow: --shadow-focus`.

---

### 7.2 Inputs

| State | Border | Background | Shadow |
|-------|--------|-----------|--------|
| Default | `--color-border` | white | none |
| Hover | `--color-border-strong` | white | none |
| Focus | `--color-accent-500` | white | `--shadow-focus` |
| Error | `--color-danger` | `--color-danger-bg` | none |
| Disabled | `--color-border` | `--color-neutral-50` | none |

Height: 34px (MD). Padding: 0 `--space-3`. Font: `--text-base`. Radius: `--radius-md`.
Error message: `--text-sm`, `--color-danger`, appears below input with 4px gap.
Label: `--text-sm` 500, `--color-text-primary`, 6px above input.

---

### 7.3 Badges

Used for status, priority, health, and scope labels.

**Status badges:**

| Status | Background | Text color |
|--------|-----------|-----------|
| Planning | `--color-neutral-100` | `--color-neutral-700` |
| Active | `--color-info-bg` | `--color-info` |
| At Risk | `--color-warning-bg` | `--color-warning` |
| On Hold | `--color-neutral-100` | `--color-neutral-700` |
| Completed | `--color-success-bg` | `--color-success` |
| Archived | `--color-neutral-100` | `--color-text-muted` |

**Priority badges:**

| Priority | Background | Text |
|----------|-----------|------|
| Critical | `#fef2f2` | `#991b1b` |
| High | `#fff7ed` | `#c2410c` |
| Medium | `--color-warning-bg` | `--color-warning` |
| Low | `--color-neutral-100` | `--color-neutral-500` |

**Health badges:**

| Level | Background | Text | Dot color |
|-------|-----------|------|-----------|
| Green (≥75) | `--color-success-bg` | `--color-success` | `--color-success` |
| Amber (50–74) | `--color-warning-bg` | `--color-warning` | `--color-warning` |
| Red (<50) | `--color-danger-bg` | `--color-danger` | `--color-danger` |
| N/A | `--color-neutral-100` | `--color-text-muted` | — |

All badges: `border-radius: --radius-sm`, padding `2px 8px`, `--text-sm` 500.

---

### 7.4 Cards

**Project card (grid view):**
- Background: `--color-surface`
- Border: 1px `--color-border`
- Radius: `--radius-lg`
- Shadow: `--shadow-md`
- Padding: `--space-6`
- Hover: `box-shadow: --shadow-lg`, `border-color: --color-accent-100`
- Transition: 150ms ease

**KPI tile:**
- Background: `--color-surface`
- Border: 1px `--color-border`
- Radius: `--radius-lg`
- Padding: `--space-6`
- Value: `--text-2xl`, `--color-text-primary`
- Label: `--text-sm`, `--color-text-secondary`

---

### 7.5 Tables

- Header row: background `--color-surface-raised`, `--text-sm` 600 uppercase, `letter-spacing: 0.05em`, `--color-text-secondary`
- Data row: background white, `--text-sm` 400, `--color-text-primary`
- Row hover: background `--color-neutral-100`
- Row border: 1px bottom `--color-border`
- Cell padding: `--space-3` vertical, `--space-4` horizontal
- Selected row: background `--color-accent-50`, left border 3px `--color-accent-500`
- `table-layout: fixed` when column resizing is active (per global convention)

---

### 7.6 Sidebar Navigation

**Dimensions:** 240px expanded, 56px collapsed.
**Background:** `#1e2130` (dark navy — contrasts with light page bg)
**Transition:** width 200ms ease

| State | Text | Icon | Background |
|-------|------|------|-----------|
| Default | `#9ca3af` | `#6b7280` | transparent |
| Hover | `#e5e7eb` | `#9ca3af` | `rgba(255,255,255,0.06)` |
| Active | `#ffffff` | `--color-accent-500` | `rgba(99,102,241,0.15)` |

Active item: left border 3px `--color-accent-500`.
Nav item height: 40px. Padding: 0 `--space-4`. Radius: `--radius-md`.
Section labels: `--text-xs` uppercase, `#4b5563`, `--space-4` left padding.

**Badge (pending count):** background `--color-danger`, text white, `--radius-full`, min-width 18px, height 18px, `--text-xs` 600.

---

### 7.7 Modals & Overlays

**Standard modal:**
- Backdrop: `rgba(0,0,0,0.45)` blur `2px`
- Container: `--color-surface`, `--radius-xl`, `--shadow-lg`
- Width: 480px (SM) / 640px (MD) / 800px (LG)
- Header: 20px bottom border `--color-border`, padding `--space-6`
- Body: padding `--space-6`
- Footer: 20px top border `--color-border`, padding `--space-4 --space-6`
- Close [X]: top-right, icon button variant

**Walkthrough overlay:**
- Full screen (100vw × 100vh)
- Background: `--color-surface`
- Left nav panel: 220px, background `--color-surface-raised`, border-right `--color-border`
- No backdrop (it IS the screen)

---

### 7.8 Toasts

Appear top-right, stack vertically with 8px gap. Auto-dismiss after 4s. Slide in from right.

| Variant | Left border | Icon color | Background |
|---------|------------|-----------|-----------|
| Success | `--color-success` | `--color-success` | white |
| Error | `--color-danger` | `--color-danger` | white |
| Warning | `--color-warning` | `--color-warning` | white |
| Info | `--color-info` | `--color-info` | white |

Width: 320px. Padding: `--space-4`. Radius: `--radius-lg`. Shadow: `--shadow-lg`.
Title: `--text-sm` 600. Message: `--text-sm` 400 `--color-text-secondary`.

---

### 7.9 Avatars

| Size | Diameter | Font size |
|------|----------|-----------|
| XS | 20px | 9px |
| SM | 28px | 11px |
| MD | 36px | 14px |
| LG | 48px | 18px |

Shape: `--radius-full`.
Fallback (no image): background `--color-accent-100`, text `--color-accent-600`, initials (first + last initial).
Group stack: `-8px` left offset per avatar, white 2px border.

---

### 7.10 Progress Bars

Height: 6px. Radius: `--radius-full`. Track: `--color-neutral-200`.

Fill color maps to health:
- Green (≥75): `--color-success`
- Amber (50–74): `--color-warning`
- Red (<50): `--color-danger`
- Neutral (no health context): `--color-accent-500`

---

## 8. Iconography

**Library:** Lucide Icons (MIT license, consistent stroke weight)
**Default size:** 16px in nav and tables; 20px in headings and buttons; 24px in empty states
**Stroke width:** 1.5px
**Color:** inherits from parent text color unless specified

---

## 9. Motion

| Property | Value |
|----------|-------|
| Default transition | `150ms ease` |
| Modal open/close | `200ms ease-out` (scale + fade) |
| Sidebar collapse | `200ms ease` (width) |
| Toast slide-in | `250ms ease-out` (translateX) |
| Row hover | `100ms ease` |

No animation on data changes (table rows, score updates) — instant update signals reliability.

---

## 10. Layout Grid

**Page shell:**
- Sidebar: 240px fixed left (56px collapsed)
- Top bar: 56px fixed top
- Content area: `calc(100vw - 240px)` wide, starts at 56px top
- Content max-width: 1400px, centered within content area
- Content padding: `--space-8` all sides

**Dashboard grid:** 4-column KPI tiles, 2-column below (projects + approvals widget)
**Project list:** full-width table or 3-column card grid
**Wizard:** left panel 260px + right content flex

---

*Wired — Design System v1.0 | June 2026*
