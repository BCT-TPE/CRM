# BCT CRM V1 · Design system

The standard for the CRM redesign pages. The blue-glass theme (v2) is the standard.

- `tokens.css`: every value — type, colour, gradients, radius, shadow, spacing, layout, motion.
- `index.html`: the visual reference. Swatches read their values from `tokens.css`, and components are drawn with the product classes, so the page always matches the code.

## Rules for pages and shared CSS

1. Load `design-system/tokens.css` before `assets/crm.css`.
2. Use `var(--…)` for every font size, colour, radius and shadow. No px font sizes, no raw hex.
3. If a value is missing, add a token to `tokens.css` first, then use it.
4. Semi-transparent colours use `color-mix(in srgb, var(--token) N%, transparent)` or a `--glass-…` token.
5. Check before handing over:

```bash
node ~/.claude/skills/prototype-polish/scripts/check-tokens.cjs --tokens=design-system/tokens.css pipeline.html initiatives.html assets/*.css --strict
```

## Type

| Token | Size | Use |
|---|---|---|
| `--text-2xs` | 11 | badges, counts, stage codes |
| `--text-xs` | 12 | captions, labels, table headers, legends |
| `--text-sm` | 14 | body, rows, controls, menus |
| `--text-md` | 15 | card titles |
| `--text-lg` | 16 | zone titles, small figures |
| `--text-xl` | 20 | panel titles, mid figures |
| `--text-2xl` | 24 | KPI tile figures |
| `--text-3xl` | 28 | KPI card figures |
| `--text-4xl` | 34 | page titles, header KPIs, ring value |
| `--text-5xl` | 40 | hero number |
| `--text-display` | 48 | the one forecast number per page |

## Radius

`--radius-2xs` 2 · `--radius-xs` 4 · `--radius-sm` 6 · `--radius-md` 8 · `--radius-control` 10 · `--radius-lg` 12 · `--radius-card` 16 · `--radius-xl` 24 · `--radius-pill` 999 · `--radius-full` 50%.
`--r-card` is the old name of `--radius-card`; it is kept as an alias so older code still works. Use `--radius-card`.

## Shared components (crm.js / crm.css)

Use these instead of building a new one. They are drawn on `index.html`.

| Component | How | Rules |
|---|---|---|
| Custom select | any `.select select` | Never the native select. |
| Date picker | any `<input type="date">` (made by `CRM.enhanceSelects`) | Never the browser's picker. Close dates (`data-f="close"` or `data-dt="quarter"`) offer the fiscal quarter ends; other dates offer Tomorrow and Next week. |
| Date format | `CRM.date(d)` → `18 Nov 2026`; `CRM.date(d, false)` → `18 Nov` | One format on every page. Fixed month names (no "Sept"). |
| Toast | `CRM.toast(text, kind)` | Top centre, white glass. `kind`: `warn` needs attention (red !), `ok` done (green ✓), `info` default (blue i). |
| Confirm dialog | `CRM.confirm({ title, body, actions })` → the chosen `value`, or `null` | Short, general wording, no field lists. Destructive choice `kind: 'quiet'` (red text, left); main choice `kind: 'primary'`. Esc and outside click = keep editing. |
| Leave guard | `CRM.guardLeave(isDirty, ask)`, `CRM.leave(url)` | Ask before leaving a page with unsaved input: links, Cancel, the browser's back button; reload / close gets the browser's prompt. |
| Text field | `.in` | 40px high, 10px radius. Shared in `crm.css` since 18 Nov 2026. |

**Required fields:** create and save buttons are never disabled. Pressing one with something missing shows `Please complete all required fields.` (warn toast), marks each missing field in red with a line under it, and scrolls to the first. The mark clears as the field is filled.

## Responsive

Designed at 1440. `assets/responsive.css` makes every page work down to a 390 px phone:

| Width | What changes |
|---|---|
| ≤ 1360 | Header KPIs drop under the greeting; the filter row wraps |
| ≤ 1180 | Small cards in pairs, wide ones full width |
| ≤ 1100 | Sidebar becomes the icon rail; page padding 24px; tables scroll sideways with the first column pinned; on the record and new-initiative pages the right rail moves under the form |
| ≤ 768 | Sidebar becomes a drawer behind a top bar; every card full width; filter row stops sticking |
| ≤ 480 | 16px padding; header KPIs 2 × 2; forms one column; the save / create bar shows the status above two full-width buttons (Cancel is the back link) |

## Values merged on 17 Nov 2026

Moving the pages onto tokens snapped values that were not in the scale to the nearest step:

- Font size 13 → 12 for the sidebar "CRM" label; 13 → 14 on the record and new-initiative pages (field labels, back link, key facts), matching the 14px body; 18 → 20 (preview title); 10 → 11; 36 → 34 (header KPIs).
- Radius 1 → 2, 3 → 4, 5 → 6, 9 → 10, 14 → 12, 18 → 16.
- Near-identical colours merged: three grays for placeholders into `--t4`; the cyan text tints into `--cyan-text`; gross-pipeline grays into `--chart-pipe-soft`.

New tokens for the record pages: `--warn-soft` and `--warn-text` (longest stretch in stage history), `--primary-disabled`, and `--shadow-up` (sticky save and create bars).

Every page except `pipeline_archieve.html` (kept for reference) passes `check-tokens.cjs --strict`.
