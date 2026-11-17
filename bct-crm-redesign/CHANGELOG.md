# Changelog

All notable changes to the BCT CRM V1 redesign prototype (`bct-crm-redesign/`).
Each entry describes what changed since the previous push to `main`. Newest first.

Conventions: pages are static HTML + shared assets in `assets/`. Pages pull the shared assets with a `?v=YYYYMMDDx` cache-buster. Bump the version whenever an asset changes.

---

## 2026-11-17 (2)

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
