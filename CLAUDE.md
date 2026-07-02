# Wired — Project Conventions

## Cards — light visible border

All card surfaces (e.g. `.policy-card`) must have a light but clearly visible border so they read as distinct panels against the light page background (`--c-bg: #F1F5F9`).

- Use a `1px solid` Slate border at `#94A3B8` (Tailwind slate-400 — `rgb(148, 163, 184)`).
- This is intentionally darker than the design-system tokens `--c-border` (#E2E8F0) and `--c-border-2` (#CBD5E1), which are too faint to be visible on the light background.

```css
.policy-card {
  background: var(--c-surface);
  border: 1px solid #94A3B8;
  border-radius: var(--r-lg);
  padding: var(--sp-5);
}
```
