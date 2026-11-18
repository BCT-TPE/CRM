# Changelog

All notable changes to the BCT CRM V1 redesign prototype (`bct-crm-redesign/`).
Each entry describes what changed since the previous push to `main`. Newest first.

Conventions: pages are static HTML + shared assets in `assets/`. Pages pull the shared assets with a `?v=YYYYMMDDx` cache-buster. Bump the version whenever an asset changes.

---

## 2026-11-18 (2)

### Changed
- **Q3 forecast bar (Pipeline):** the unfilled part up to the target uses a lighter hatch. It is the new `--grad-hatch-soft` token (`#e8eff9` / `#d9e4f4`), so it no longer looks like the solid "Pipeline" segment beside it. The pipeline mix keeps `--grad-hatch`.
- Cache-busters: `tokens.css` is now `?v=20261118b` and `theme-v2.css` is `?v=20261118e`.

---

## 2026-11-18 · `842ff95`

### Changed
- **Pipeline "Q3 progress" card:** the four minis now share the Q3 forecast legend's rhythm: an 18px label line, a 2px gap, then the value, with 14px between rows. At 1440, "Closed won" lines up with "Weighted forecast", and the values line up too.
  - **Labels on one line:** labels stay on one line (`.minis.one-line`, Pipeline only).
  - **New order:** "Open deals in quarter" now comes before "Coverage". Weighted forecast and open deals share the wide column, and gap and coverage the narrow one.
  - **1181–1360:** the card is too narrow, so labels wrap again (`responsive.css`).
- **Q3 forecast bar (Pipeline):** the unfilled part up to the target is now hatched (`--grad-hatch`, the same pattern as "Pipeline" in the pipeline mix). Before, it was translucent white and disappeared on the tinted card. Segments are now separated by a 2px white inset seam instead of a gap.
- **Tinted card gradients:** `--grad-tint` and `--grad-ring` now end in light blue (`#f1f7ff`, `#f2f9fe`) instead of near-white. White items near the bottom of a tinted card now stay visible, for example the "Set next step & follow-up" button and the read-only boxes in Next steps.
- **Header KPIs (Pipeline, Sales performance):** switching quarters no longer shifts the KPI row.
  - **Fixed slots:** each KPI slot has a fixed `min-width`, set to the widest non-empty value on that page (`.kpis-pipe` and `.kpis-perf`, set by nth-child).
  - **Empty state:** when every value is empty (`$0`, `0` or `N/A`, badges ignored), JS adds `.is-empty` and the slots collapse, so the empty state isn't spread out.
  - **Mobile:** below the mobile breakpoint, the 2-column KPI grid resets `min-width`.
- **Collapsed sidebar:** when the sidebar is collapsed and the filter bar is stuck, the page name now leads the bar, so you can tell which page you are on. How it works:
  - `CRM.watchSticky` sets `data-page` from the active nav item.
  - `.filters::before` shows it with `body.side-collapsed .filters.stuck`.
  - It is hidden on mobile, where the top bar already shows the brand.
- **Record pages** (`initiative.html`, `initiative-new.html): the back row ("‹ Sales initiatives · SI-…") is now a sticky top bar, `.back-bar`.
  - It turns glass when the page is scrolled. `crm.js` adds `body.scrolled`, because these pages re-render `#main`.
  - The right rails now stick at `top: 56px` so they clear the bar.
  - On mobile it sits under the 56px top bar.
- **Native tooltips removed:** the `title` attributes on truncated table text are gone (initiative subtitle, stage, next step). The "Changed" dot uses `aria-label` instead.
- **Table sort icons:** unsorted columns now show the same ↑ arrow as the sorted column, faded (opacity .45, .8 on hover), instead of ↕.
- **Sales initiatives list, stage column:** the lifecycle dashes now have a tooltip and can be focused. The tooltip shows:
  - "Lifecycle · step N of 13"
  - The three groups (prospect 3, lead 3, opportunity 7), with the current group marked
  - The now and next sub-stages
  - A one-line key

  The dashes also have a taller hit area, padding 6px above, and an `aria-label`.
- **New token:** `--grad-hatch` in `design-system/tokens.css`. `.mp-b.c-pipe` now uses it.
- Cache-busters: `tokens.css`, `crm.css`, `crm.js` and `dashboard.css` are now `?v=20261118a`, `theme-v2.css` is `?v=20261118d`, and `responsive.css` is `?v=20261118d`.

---

## 2026-11-17 · `11ca384` · design system and responsive (Candace)

### Added
- **`design-system/`:** `tokens.css` (type, colour, gradients, radius, shadow, spacing, layout, motion), `index.html` (visual reference drawn with the product classes) and `README.md`.
- **`assets/responsive.css`:** breakpoints at 1360, 1180, 1100, 768 and 480, loaded by every page. On the record and new-initiative pages the right rail moves under the form at ≤1100, forms go to one column at ≤480, and the save / create bar shows the status above two full-width buttons.
- **`crm.js`:** on pages that load `responsive.css`, the sidebar becomes the icon rail at ≤1100 and a drawer behind a top bar at ≤768. Filter popovers stay inside the window when the filter row wraps.

### Changed
- Every page loads `design-system/tokens.css` before `crm.css`. The `:root` block in `crm.css` and the token overrides in `body.v2` moved there; the v2 values are now the standard.
- Every page except `pipeline_archieve.html` and all shared CSS use tokens only: no px font sizes, raw colours, radii or shadows (`check-tokens.cjs --strict` passes). New tokens: `--warn-soft`, `--warn-text`, `--primary-disabled`, `--shadow-up`.
- Off-scale values snapped: font size 13 → 12 in the sidebar, 13 → 14 on the record and new-initiative pages (field labels, back link, key facts), 18 → 20, 10 → 11, 36 → 34 (header KPIs); radius 1 → 2, 3 → 4, 5 → 6, 9 → 10, 14 → 12, 18 → 16. At 1440 the only visible change is the header KPI size.
- The search field styles moved from `initiatives.html` to `crm.css`.
- `pipeline_archieve.html` keeps its pre-v2 palette with a small override in its head.
- Cache-busters: every shared asset is `?v=20261117dt`.

### Fixed
- Custom select menus on the record edit page and the new-initiative form were cut off by the next card or the sticky bar. An open menu now brings its card forward and opens upward when there is no room below.
- Edit mode: the "Edit line items" button is 40px, the same height as the fields beside it.
- Sales performance: the "In progress" and "Below target" legend swatches were gray while the bars are blue (`--chart-under`); they now match.

### Not changed
- Dates still use `en-GB` formatting, which shows September as "Sept".

---

## 2026-11-17 · `c0f47fb`

### Changed
- **Sales initiatives lifecycle:** the decorative › arrows between prospects, leads and opportunities in the Open card were removed. They carried no data and read as conversion or as clickable. The flow order is still stated in the section subtitle.
- **Sales initiatives lifecycle:** the vertical divider between "All open" and the three statuses was removed. The "All open" label already says it is the total.

---

## 2026-11-17 · `7a6ba67`

### Added
- **`initiative-new.html`: new sales initiative form.** It mirrors CRMpulse `/initiatives/new` and has six numbered sections:
  1. Status and sub-stage
  2. Account and ownership
  3. Value and forecast
  4. Next step
  5. Qualification (BANT)
  6. Classification, team and notes. This section can be collapsed.

  Other parts of the page:
  - **Right rail:** a live preview card (tinted), plus a "Needed to create a …" checklist.
  - **Sticky create bar** with Cancel, Create & add line items, and Create initiative.

  Required items depend on the status:
  - **Prospect or lead:** name, approved account, owner, SBU.
  - **Opportunity:** adds need and estimated value.

  Behaviour:
  - The sub-stage sets the default probability.
  - The initiative name is filled in from account + offering until the user edits it.
  - A non-USD value also shows its USD conversion.
  - The close date shows the forecast quarter.
  - The team is set from the owner, and geography from the team.
  - When required items are missing, the create buttons are disabled, and a tooltip lists the missing items.
- **`initiative.html` edit mode (`?mode=edit`).** View and edit share one skeleton:
  - **View:** values sit in read-only boxes (`.in.in-ro`).
  - **Edit:** the same positions become inputs and custom selects. Locked fields render as disabled inputs, with a lock icon and the reason.

  Other edit-mode behaviour:
  - A sticky save bar shows "N unsaved changes". It expands into a list of what changed, and has Cancel, Discard and Save.
  - Changed fields are marked with a dot.
  - Only the Overview tab is available while editing.
- **Next steps rail card.** It shows the next step and follow-up date, then the stage-gate checklist:
  - **Opportunity:** need, estimated value, expected close date.
  - **Prospect or lead:** account identified, need, estimated value (§5.4, "To convert to an opportunity").
- **`CHANGELOG.md`** (this file).

### Changed
- **Initiative summary card:**
  - The chevron stepper was replaced with numbered stage dots and a 4px progress bar (`.steps2`). Stage history and the status label were removed.
  - Key facts are now equal-width columns, with the value column wider. Labels align to the top and values to the bottom.
  - In edit mode, probability and expected close become inputs in place. Value is locked, with an "Edit line items" link. The read-only facts (Funnel code, Created, Open for) align with the input row.
- **Initiative tabs:** equal-width tabs.
- **Overview layout:** at most two fields per row in both view and edit.
  - Line items is a button, not an input.
  - Need, qualification remarks and description are multi-line.
- **Stage history ("The journey so far"):** the road graphic was replaced with the same `.steps2` dots and progress bar as the summary card. Each stage shows its days as a chip, and the longest stretch is highlighted. "Start · created as …" moved below the bar.
- **Activity timeline:** the group label ("Past") now starts in line with the timeline dots, with 16px of space before the first entry.
- **Line items card:** no bottom padding, so the total row closes the card.
- **Tasks tab:** the add-task row uses the shared `.in` inputs and the custom select (`.fsel`). All controls are 40px tall.
- **Secondary buttons on v2 cards:**
  - **White cards:** the button uses a soft blue fill.
  - **Tinted cards:** the button matches the header Edit button (translucent white, ink text).
- **Segmented toggles inside white cards** (Road/List, List/Kanban/Funnel): flat `#f4f7fc` track, no border.
- **Kanban columns** use the same `#f4f7fc` background.
- **Kanban cards** use the same border (white, 95% opacity) and `--shadow-card` as page cards. On hover, only the border darkens.
- **Shadows unified:** every white object on the page canvas now uses `--shadow-card`:
  - Cards
  - Initiative tab bar
  - Filter selects, segmented toggles, buttons, and the search field
  - Controls inside a card stay flat, because the card carries the shadow.
  - The search field became a white pill, like the filter selects.
- **Sticky save / create bar:** the top border was replaced with an upward shadow.
- **New initiative form:** the selected status card is white with a midnight border. The preview rows have no dividers.
- **v2 page background** is lighter (base `#f9fbfe`, softer radial tints), so tinted cards stand out.
- **Pipeline "Q3 progress" ring card:** teal changed to light sky blue (background, concentric rings, active ticks `#0a7cc4`).
- **Sentence case** across UI copy, toasts and notifications. Proper nouns stay capitalised, and stage names are lower-cased mid-sentence.
- **Navigation:** the "New sales initiative" button on `initiatives.html` now opens `initiative-new.html`. It used to show a toast.
- **Cache-busters bumped:** `theme-v2.css?v=20261117j`, `crm.js?v=20261117a`.

### Fixed
- Disabled buttons in the v2 theme now render as disabled.
- Edit-mode facts no longer wrap. Previously "Expected close" and the created date could each break onto two lines.

---

## 2026-11-16 · `680edc9`

### Added
- v2 blue-glass theme (`assets/theme-v2.css`, scoped to `body.v2`). It is applied to Pipeline & forecast, Sales performance, Sales initiatives and the initiative page.
- `initiative.html`: the record page below the Sales initiatives list. Every list, kanban, funnel and table row links to it.
- Sales initiatives lifecycle funnel: drop-off columns with "reached / here now / % moved on", KPI tiles and a band list.
- `pipeline_archieve.html`: the previous Pipeline layout, kept for reference.

### Changed
- `--r-card` is 16px site-wide. Body text is 14px (was 13px).
- All selects use the shared custom menu (`CRM.enhanceSelects`).
