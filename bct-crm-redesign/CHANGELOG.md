# Changelog

All notable changes to the BCT CRM V1 redesign prototype (`bct-crm-redesign/`).
Each entry describes what changed since the previous push to `main`. Newest first.

Conventions: pages are static HTML + shared assets in `assets/`. Pages pull the shared assets with a `?v=YYYYMMDDx` cache-buster. Bump the version whenever an asset changes.

---

## 2026-11-25 (fifth push)

### Changed
- README: Home and Customer orders added to the page list; the local address opens Home.

---

## 2026-11-25 (fourth push) · `16b3f19`

**Accounts, Contacts and Customer orders are open** in the menu (Customer orders: Sales Manager and up), and the account names on Tasks link to Accounts again. The `?customers=on` preview switch is gone. Cache-busters: `crm.css?v=20261125g`, `crm.js?v=20261125h` (all pages that load them).

### Added
- **Customer orders** (`orders.html`, old CRMpulse `/orders`): status cards (Current: all, Draft, Open, Completed, Cancelled; Historical on its own white card) that filter one register, drafts first; search, order date, totals; order panel (progress, won vs order value, PO fields, Save draft, Confirm order, Mark completed, Cancel order with a reason) and Register historical order. `?open=ORD-...` opens an order. The old waiting cards, status tabs and collapsed history became the status cards.
- **New account** and **New contact / Edit contact** side panels (old AccountFormDrawer / ContactFormDrawer): duplicate checks with "Create anyway", title / email checks, who holds each role, Save & add another, fields locked for salespeople.
- `CRM.openPanel(values, draw, title)` and `CRM.form` (`fld`, `pick`, `inp`, `head`, `put`): shared side-panel forms. Use `put()` to refresh a part of a panel while typing: redrawing unchanged HTML could swallow the click on a footer button.

### Changed
- **Contacts**: "Show only no active decision maker" toggle in the filter bar instead of the warning strip; details slide in from the right at 1100px and below; Log call / Log meeting open the Log activity panel filled in; old title / department rules.
- **Phones, every list page**: the pager count sits on its own line above the page buttons, both centred. Text links inside Tasks and Activities rows are 40px tall.
- **Phones, Accounts and Customer orders**: totals come first, above the cards. A page with a single filter keeps it in row 2 (`data-keep`) instead of a one-item panel.
- Colour thresholds are written under the list (Accounts: over 60 days; Customer orders: over 30 days).

### Fixed
- Historical orders: the second status chip was cut off; orders without a date sorted last.

---

## 2026-11-25 (third push) · `3ac39bb`

Home only (page-level CSS in `home.html`; no shared asset changed).

### Changed
- **Home**: cards end on one line above 1180px. The last card of the shorter column grows to the other column's bottom edge (Salesperson: Orders awaiting confirmation; Sales Manager: Team activity this week), and Strategic accounts gone quiet ends with Largest deals (Sales Head). Single-column widths keep content height.

---

## 2026-11-25 (second push) · `d3e7956`

Accounts, Contacts and Customer orders are **hidden for this hand-over**; fixes on the visible pages. Cache-busters: `crm.css?v=20261125d`, `crm.js?v=20261125e`, `crm-data.js?v=20261125b`, `responsive.css?v=20261125c` (all pages that load them).

### Changed
- **The Customers group is hidden**: its three menu entries are disabled (`CUSTOMERS_ON` in `crm.js`) and the account name on Tasks is plain text. The page files stay in the repo as work in progress. To preview them, open any page once with `?customers=on` (kept in that browser; `?customers=off` hides them again).
- **Activities More filters** has Clear and Done, as on the other pages.
- **Home**: four won deals wait for a PO ($525.0K, was six / $711.5K): `PO_RECEIVED` in `crm-data.js`.
- Shared styles moved out of single pages into `crm.css`: side-panel forms (`.tf`), filter toggles (`.ftog`), list totals (`.tbl.totals`).
- `CRM.confirm` takes an optional text `field`, which an action may require (`needsText`).

### Fixed
- On phones, a checkbox toggle inside the filter panel (Tasks "Show completed and cancelled") now counts in the filter badge.

### Work in progress (hidden)
- `contacts.html`, `orders.html` (new) and `accounts.html`, with `ORDERS` in `crm-data.js`. Account customer value now counts confirmed orders only.

---

## 2026-11-25 · `4327d59`

Third design review (desktop 6 items, phone 5 items), **Accounts and Contacts back in the sidebar**, Accounts rebuilt to match old CRMpulse, and role switching on every page. Cache-busters: `crm.css?v=20261125a`, `crm.js?v=20261125b`, `crm-data.js?v=20261124e`, `responsive.css?v=20261125b` (all pages that load them).

### Added
- **Accounts** (old CRMpulse fields): More filters (account status, lifecycle, engagement, region), totals row, customer-value note, Lead / Opportunity lifecycles, engagement note, Today / Yesterday / Never, red "No interaction" flag. Accounts waiting for approval are listed as Fresh with their actions disabled and the reason given. `crm-data.js`: `status`, `engagement`, `region`, `FRESH_ACCOUNTS` (kept apart from `ACCOUNTS`, so no other page counts them).
- `activities.html?log=<account>` opens the Log activity panel with that account (Accounts' pencil button, as in old CRMpulse).
- `CRM.dots(text)`: "a · b · c" as segments that never break inside. `.ck40`: 40×40 tap area around a 16px checkbox (Home, Tasks). `.nb`: names that never break.

### Changed
- **The demo user is a Sales Head** (was Administrator). "View as" switches Salesperson / Sales Manager / Sales Head on every page and is kept for all pages and open tabs; Administrator stays disabled.
- Role rules from old CRMpulse: an activity is editable only by its creator within 7 days ("Read only" / "Locked after 7 days"; Administrator always); only Sales Manager and up can change Sales owner (locked for a salesperson on the record and the new-initiative page).
- **Accounts**: 8px between group cards and between row buttons; the whole row is clickable (toast: there is no account page yet); prospects exclude accounts with an open lead or opportunity.
- **Home**: list cards are as tall as their content, in two independently flowing columns (replaces equal-height rows). Deals show the amount on the right and tags under the description. By salesperson / By sales team: won is red below today's pace (as on Sales performance), the total row follows the same colours, thresholds are written under the table, 64px rows without pointer or hover; on phones the total comes first, then one row per person. Team activity shows units and what Low means. "Ahead of target" when ahead.
- **Compact filter bar** (Pipeline, Sales performance below 1280px) starts from the left, Export stays far right. Filters moved into More filters use the panel's style (label above, square box).
- **Tooltips** only on mouse hover and keyboard focus; a tap on a button or link opens none. Dotted-line definitions still open on tap.
- Phones: Notifications opens inside the drawer; full-screen side panels have no rounded corners.

### Fixed
- Page subtitles never start a line with "·".
- By sales team at 1280px: "Middle East Strategic Accounts" ran under the Target figure.

---

## 2026-11-24 · `1a294b6`

New **Home** page (the first page after sign-in, three views by role) and the fixes from the second design review (desktop 10 items, phone 15 items). Cache-busters: `crm.css?v=20261124k`, `crm.js?v=20261124k`, `crm-data.js?v=20261124d`, `dashboard.css?v=20261124b`, `theme-v2.css?v=20261124b`, `responsive.css?v=20261124m` (all pages that load them).

### Added
- **`home.html`** (requirement "CRMpulse Home page – by role"). Salesperson: quota / forecast, my tasks and follow-ups, deals needing attention, orders awaiting PO confirmation, quiet accounts, colleagues' activity on my accounts. Sales Manager: quota | Waiting on you (account approvals), By salesperson table, then a 2×2 of team overdue tasks, deals, team activity this week and quiet accounts. Sales Head / Administrator: company quota, By sales team table, largest deals needing attention, strategic accounts gone quiet, with "Waiting on you" KPIs in the header. Cards in one row are equal height; lists show at most 4 rows.
- Home has **no links that change page** for now. Header actions (New initiative, New contact, New task, Log activity) and row buttons (Log activity, Confirm PO, Review) show a toast saying what they would open. Ticking a task keeps it in the list as done, with Undo in the toast.
- **View as** select in the profile menu (Salesperson / Sales Manager / Sales Head; Administrator disabled). It only works on Home (`localStorage` `crm-home-role`); every other page is fixed to Administrator and the select is disabled. Sidebar entries are gated by role (orders and targets: manager and up; structure: head and up; admin and users: Administrator).
- `crm-data.js`: `APPROVALS`, `DRAFT_ORDERS`, Gaurav's own quota ($0.55M) and initiatives, two quiet accounts (`QUIET_FIX`), colleague activities, and activity notes that vary by type and purpose (one long note to test wrapping).
- `CRM.toast(msg, kind, { label, fn })`: an action button (Undo) that stays 5 s. Also `CRM.riseIn()` (shared page entrance), `CRM.refreshTaskBadge()` and `CRM.user`.
- `<option data-short="…">`: a shorter label for a closed select (Tasks "Who should do it?" shows the name only; the menu still shows "name · function").

### Changed
- **Greeting moved to Home.** Pipeline & forecast's title is the page name again. The header pill is gone on every page (Home included); "Updated hh:mm" ends the subtitle.
- **Activities**: Log no longer saves straight away. The inline "Log what happened" composer is removed; the "Log activity" header button opens the full side panel (old ActivityFormDrawer fields: type, context, date, attendees, purpose, follow-up task). The filter bar sits directly under the title, like the other list pages, with the summary tiles below it. Closing a panel with input asks first. Non-admin roles see "Locked after 7 days".
- **Tasks**: Undo after ticking a task; discard confirmation on the task panel; `?q=` (also matches the source activity) and `?new=1`; the account name links to `accounts.html?q=`.
- **Export** sits at the end of the filter bar on Sales initiatives, Pipeline and Sales performance, as a secondary button: text when it fits, icon with a tooltip (`data-tip`) when it does not.
- **Compact filter bar** on phones, and at ≤1279 px on Pipeline / Sales performance: row 1 never scrolls sideways; 4+ option segments become a select; other filters move into More filters with a count badge. Tasks gets a Filters panel on phones. On phones a hairline and 24 px separate the bar from the header.
- **Phone tap sizes**: list rows 44 px (nav items, select options, checkbox rows); Clear is a 40 px button; notification links and card links are 40 px high; Won / Lost bars have a 40 px hit area with 8 px between them.
- **Phone shell**: the top-bar avatar opens the account menu (name, role, email, View as, Sign out); the drawer keeps only Notifications pinned at the bottom and scrolls; after scrolling, the top bar shows the page name.
- Quarter charts: amounts on one fixed row; each label row switches to a compact form together when one cell does not fit. Definition underlines only under the text. Pipeline Q3 progress minis use the same two columns as the legend above.

### Fixed
- iPhone Safari background: the gradient is a fixed `body.v2::before` layer instead of `background-attachment: fixed`.
- Hover styles no longer stick after a tap on touch devices (`@media (hover: hover)` / `(hover: none)`).
- Select menus stay 16 px inside the window (measured with `clientWidth`); menus inside a scrolling popover no longer close themselves on scroll.

---

## 2026-11-23 (second push) · `8dc5219`

Layout fixes found while reviewing on desktop and phones. Cache-busters: `crm.css?v=20261123j`, `crm.js?v=20261123m`, `dashboard.css?v=20261123d`, `responsive.css?v=20261123k` (all pages that load them).

### Changed
- **Tasks opens on My open tasks for every role**, Administrator included (old CRMpulse opened managers on Team overdue; overridden by design decision). Activities still opens on Everyone.
- **Phone page-header actions** (Sales initiatives: Export to Excel + New sales initiative; Tasks: New task): full width, split evenly; under 360px they stack. Once the filter bar is stuck they reappear as 40×40 icon buttons at the end of row 1 (`.f-acts`, built in `compactFilters`; each icon clicks the real button).
- **Pipeline mix on phones (≤480px)**: two columns (Commit | Best case, then Pipeline); "$x weighted" and "n deals" never break inside, only after the "·".
- **Activities timeline on phones**: the coloured type icon (24px) is back, before the date; no connecting line.
- **More filters on phones (≤480px)**: every page's popover is full width with 16px gutters, centred.

### Fixed
- **Quarter charts (Pipeline, Sales performance)**: plot / baseline / labels share subgrid rows in `dashboard.css` (`.qchart`), so a quarter whose label wraps to more lines no longer drops its baseline. Performance's page-level copy of the rule was removed.
- **Leftover chevron columns**: chevrons were removed earlier but their 14px grid column (+ gap) stayed, leaving an empty strip on the right. Removed from `.row`, `.tm-r` (By sales team), Why we lost (`.lr`) and the Attainment table (`c-chev` column and its empty cells; Avg deal gets the width).
- **Activities More filters** opened rightwards (`left: 0`) and ran off the screen on phones; it now opens leftwards like the other pages.
- **More filters kept in view**: an open popover is re-placed when the filter bar sticks or unsticks (the header icons move the More filters button). Its height is capped at the room left in the window: it scrolls on its own (`overscroll-behavior: contain`, the page never scrolls), Clear / Done stay pinned at its bottom, and its scrollbar is always visible (a 4px line with rounded ends). Select menus inside it are pinned to the window (`pinPop`), open upward when there is no room below, and picking a value no longer closes the popover.
- **Phones at 342px**: "New sales initiative" overflowed half the width and widened the page by 17px, which pushed popovers off-centre.

---

## 2026-11-23 · `6a022ed`

Review pass against the design team's prototype checklist, a sidebar/profile sync with old CRMpulse, and a WCAG AA contrast pass. Cache-busters: `tokens.css?v=20261123a`, `crm.css?v=20261123e`, `crm.js?v=20261123e`, `dashboard.css?v=20261123a`, `responsive.css?v=20261123g` (all pages that load them, including the out-of-scope ones).

### Added
- **`DESIGN.md`** (Traditional Chinese): the settled rules for anyone (or any AI) editing these pages: source priority, sizes (40px controls, 32px switch options, 64px rows, 14px select text), row-click tables, button order, filter-bar fallbacks, sidebar/role rules, colours, don'ts, decisions kept as they are, and the checks to run after a change.
- **Role-gated sidebar** (old `menu-config.ts`): entries can carry a role; Setup gains **Administration** and **Users** for `ADMIN` only (greyed, not built this round).
- **Tasks badge** in the sidebar (old `TaskBadge`): my open tasks, a 20px blue circle (`.nav-n`), on the icon's corner when the rail is collapsed; `CRM.refreshTaskBadge()` redraws it after a task is completed, added or reassigned on Tasks.

### Changed
- **Demo user signs in as Administrator** (`USER` in `crm.js`, exposed as `CRM.user` with `assigning` / `oversight`). Defaults follow old CRMpulse: Activities opens on **Everyone** (`defaultWho`), Tasks opens on **Team overdue** when anything is overdue (`defaultView`).
- **Profile menu = old ProfileMenu**: name, email (`gaurav.shrotriya@example.com`), Sign out. Removed the assistant sources (Outlook / Teams / SharePoint), Daily brief, Help and the OneLogin line. The sidebar shows the role (Administrator) under the name instead of "Sales · ACAP".
- **Row click only**: Tasks and Sales initiatives rows open on click (and Enter); the pencil column is gone from both. Links and the checkbox inside a Tasks row keep their own action. Initiatives' edit-mode shortcut is reached through the record page's Edit button.
- **Button order**: side panels, popovers and dialogs align their buttons right with the primary one last: Tasks panel `Cancel` `Save`, Pipeline / Performance drill `Close` `Open N in Sales initiatives`, More filters `Clear` `Done`, confirm dialog `Discard` `Keep editing` `Save` (the quiet/destructive action no longer sits alone on the left). Page-header actions stay right on phones too.
- **14px select labels**: filter-bar prefixes (`.select .lbl`: Assignee, Team, Fiscal year, Owner, Purpose, Period, Expected close, Sort) and the group headings in every More filters popover (`.pop h4`) go from 12px to 14px; Activities' heading override (600 / `--t2`) is removed so all match.
- **Record page tabs**: 32px options in a 40px bar, like the other switches.
- **Contrast (WCAG AA)**: `--t3` `#6b6e70` → `#65686a` and `--danger` `#c2412d` → `#bf3e2a` so captions and red figures reach 4.5:1 on the blue canvas and tinted cards; search placeholders use `--t3` (was `--t4`, 3.2:1).
- **Activities tiles**: notes wrap (subgrid keeps the rows aligned) and two were shortened: "All contacted recently", "From the last 30 days".

### Fixed
- **Filter bar wrapping at 1280–1460px**: ≤1480px More filters and Export become 40×40 icon buttons (label kept for screen readers); on desktop the search shrinks 260 → 180px before the bar wraps. Activities' custom range + Reset no longer runs off the edge (it crushed the search to 48px at 1440). Known: Pipeline / Performance still wrap at 1280 once Reset shows (~20px short).
- **Record page at 769–1100px**: the back bar kept the 40px negative margins and scrolled the page sideways by 16px; it now follows `--pad-page` like the filter bar.

---

## 2026-11-20 (docs) · `0999596`

### Added
- **`RWD.md`**: the responsive work of today's two pushes in one place (Traditional Chinese, for the design team): breakpoints, what overflowed and how it was fixed, the phone filter bar, tables as card lists on phones, alignment and the 40px tap height, the record-page fixes, how it was checked, and what is still open. Linked from the README.

---

## 2026-11-20 (second push) · `ee7007b`

### Tap targets at every width
- The 40px height for everything you tap (buttons, selects, search, segmented switches, tabs, chips, pager and icon buttons) now applies on desktop too, not only on phones, and also inside the phone top bar, side panels (`.drill`) and popovers (`.pop`). Icon-only buttons are 40×40. The More filters "Done" button lost its inline `height: 32px` (Pipeline, Sales performance, Sales initiatives). Tiles, chart columns, table rows and cards stay content-sized.

### Tasks
- No underline on hover for the task title or the initiative link in a row (the row already highlights).
- Header spacing: the phone-only Sort select that `prepTables` inserts before the table is hidden on desktop but stopped `.card > .tbl-wrap:first-child` from matching, so the thead got extra top space again. `crm.css` now also matches `.tbl-sort:first-child + .tbl-wrap`; phones (Sort visible) keep no pull-up.

### Sales initiative record (`initiative.html`), phones
- Tab row keeps its scroll position when a tab is chosen (the page re-renders), and only the row scrolls to show the chosen tab, never the page.
- Summary stepper: every step as a dot across the width (no sideways scroll, so the bar lines up with the dots again), step names hidden, one caption under the bar ("Step 2 of 4 · Initial contact", "Closed won", "Closed lost · after …").
- Stage journey (Stage history): steps and bar share one width (`max(100%, n × 100px)`) and scroll together; up to 3 stages fit without scrolling.
- Activity timeline: date on its own line above the entry; type / purpose tags never break inside a chip.
- Buying committee: Call / Log activity move under the person.
- Line items: the Total row is a plain row under the item cards.
- Tab row on every width: `.rec-tabs` gap 0, `.rtab` padding 0 14px.

### Activities, phones
- The edit button sits in the card's top-right corner (it wrapped onto the second line once it became 40px); the title keeps 44px clear for it.

### Cache-busters
- `crm.css` 20261120a, `responsive.css` 20261120y (others unchanged since the first push today).

---

## 2026-11-20 · `5205e78`

Scope of this round: the five Dashboards + Sales pages (Pipeline & forecast, Sales performance, Sales initiatives, Activities, Tasks). Accounts, Contacts and Sales targets stay in the repo but are out of the nav again.

### Data and logic (aligned with CRMpulse)
- **Needs attention = CRMpulse `attention_flags`** (`assets/crm-data.js` `attention()`): no next step, expected close passed, more than 30 days in the stage, open more than 90 days. Dropped the extra "no close date" rule; Sales initiatives now uses the same function instead of its own (which counted overdue follow-ups). Tooltips updated to match.
- **Shared record facts** in `crm-data.js`: `createdOf()`, `openDays()` and `recMeta()` (lead type, lead source, business category, last stage change). The list and the record page now derive these the same way; all 42 records were checked against `initiative.html`.
- **Duplicate ID fixed:** the demo closed deal "Desert – Asset Monitoring AMC" was `SI-2026-0038`, the same ID as Al Noor – Disaster Recovery on Cloud. It is now `SI-2026-0044`.
- **Region:** every Lotus Retail India initiative sells into India North on the record page too (was India West on three of them, while `sellOf()` and Sales targets used India North).

### Sales initiatives
- **More filters = CRMpulse's 13 fields**, as selects in two columns: Sub-stage, Funnel code, State (7 options; no demo record is on hold or discontinued), Owner, Geography, Region (follows Geography), Lead type, Lead source, Business category, SBU, Practice / service line, Technology, Vertical.
- **Sort select** with CRMpulse's six options (Recently updated, Value, Expected close, Stage, Longest in stage, Name), default Recently updated. Column-header sorting still works and stays in sync.
- **Row edit button** (pencil) opens `initiative.html?id=…&mode=edit`; disabled with a reason on closed records.
- Stage cell: lifecycle bar and "N days in stage" on one line, so rows are 64px like every other table.

### Activities
- Period filter gains **Custom range…** with From / To date pickers (inclusive, either end optional).
- Mine / My teams / Everyone moved from the page header into the filter bar, and the filter bar sits right under the header, as on the other pages.
- Timeline icons are **coloured by activity type**, one hue each (visit, call, virtual meeting, email, messaging, internal meeting, event, other). Matching follows CRMpulse `activityTypeStyle()`. New tokens `--act-*` in `design-system/tokens.css`.
- Summary tiles share row heights (subgrid), so a wrapped label never pushes one figure down. Third tile renamed "Accounts idle 30+ days".

### Tasks
- Scope-tile notes shortened to fit one line ("Given to others", "Oldest N days", "N done in 30 days", "None assigned"); tiles share row heights (subgrid).

### Sales performance
- Bookings-by-quarter chart: plot / baseline / labels are shared rows (subgrid), so all four baselines line up when labels wrap.
- Table rows 64px (were 60–66px).

### Shell and shared
- Sidebar: Accounts, Contacts and Sales targets are greyed out again with "Not part of this redesign round". The collapsed / expanded state now also syncs live across open tabs (`storage` event).
- Selects inside cards get a hairline border (they were white on white).
- Copy tightened site-wide (subtitles, card notes, tooltips, form help) without changing meaning.
- Contacts detail panel (kept, out of nav): last 3 interactions, sub-stage on open initiatives (max 5), inactive decision-maker note, Call / Meeting disabled for inactive contacts.

### Responsive (≤1100 / ≤768)
- **Header KPIs:** four equal columns ≤1100, 2×2 ≤768 (the desktop min-widths overflowed between 769 and 1100); labels may wrap.
- **Filter bar on phones** (`crm.js` `compactFilters`): sticky under the 56px top bar, at most two rows: search + More filters (+ Export) on row 1, the rest in a sideways-scrolling row with a fade. Pages without search get one row. Controls are flat (no shadow: the scroll row clipped it into a hard line). Menus and date pickers opened from the scroll row are moved to `<body>` while open (`pinPop`), so the row's mask / the bar's blur can't clip them.
- **Sticky detection** (`watchSticky`) is scroll-based and works for any sticky `top`, not only 0.
- **Tables on phones become card lists** (`crm.js` `prepTables` + `responsive.css`): every cell gets its column name as `data-label`; Stage, Next step, Owner and Assigned to take the full width; row actions sit in the top-right corner; a Sort select replaces the hidden header row (not added where the card already has one).
- Pinned first column (769–1100): header now has a solid background (theme-v2 made it transparent, so scrolled headers showed through).
- Tabs are one sideways-scrolling row on phones.
- Sales initiatives list bar on phones: summary on its own row, then need attention + Sort side by side, then the view switch.
- Pipeline "Days in stage": on phones the dots take the dot map's exact size and spacing (`syncAgeDots`, measured from the map).
- **Every tap target is 40px high on phones** (buttons, selects, search, segmented switches, tabs, chips, pager and icon buttons; was 30–40px).
- Header to filter bar is 12px on phones; on the Sales pages subtitle → action buttons is 12px too.
- Activities composer Log button label centred when full width.

### Cache-busters
- `tokens.css` 20261120c, `crm.css` 20261119c, `crm.js` 20261120h, `crm-data.js` 20261120b, `dashboard.css` 20261120a, `theme-v2.css` 20261120a, `responsive.css` 20261120w.

---

## 2026-11-19 · `c00bb2d`

### Added
- **`accounts.html`: Accounts page.** It follows the CRMpulse `/accounts` layout:
  - **Scope tiles:** all accounts, customers, prospects, strategic, need attention.
  - **Filters:** search (name, code, HQ), owner, geography.
  - **Table:** the same table as Sales initiatives, with a pager. Columns:
    - Account: Strategic tag, then ID · type · vertical · geography, plus attention chips such as "Won deal with a draft order · confirm the PO" and "No interaction for N days".
    - Lifecycle
    - Owner
    - Open pipeline
    - Customer value
    - Last interaction
    - Quick actions: edit, and + new sales initiative, which opens `initiative-new.html?acc=…` with the account preselected.
- **`contacts.html`: Contacts page.** It follows the CRMpulse `/contacts` layout:
  - **Filters:** search, role, status, and a By account / List toggle.
  - **Warning banner:** shows how many accounts have no active decision maker, with "Show only these".
  - **By account view:** one card per account, with a "Decision maker" or "Needs a decision maker" tag.
  - **List view:** a sortable table.
  - **Detail panel:** sticky, beside the list, for the selected contact. It has an icon-only Edit button, role, status and ID chips, Email / Call / Meeting buttons with icons, contact fields, a department check note, and the initiatives at this account.
  - Both views page 20 contacts at a time.
- **`tasks.html`: Tasks, rebuilt to match CRMpulse `/tasks`** (checked against the old app and its `tasks-view`, `task-quick-add` and `task-board`). It is visible again in the sidebar, and the record page's Tasks tab links to it.
  - **Five view tiles:** my open tasks, assigned by me, team overdue, due this week, all open.
    - The selected tile has a midnight outline. Team overdue turns red when anything is overdue.
    - A salesperson opens on My open tasks. With none open, the page shows the finished ones instead, with the CRMpulse note.
  - **No quick-add row** (CRMpulse has one). It repeated New task and couldn't link an account or initiative, so tasks added there had no record. New task is the one way in. Its form starts with due tomorrow and you as assignee, so a simple task is still title + Create.
  - **Filters:** search title or number, assignee, and "Show completed and cancelled".
  - **List:** the same table as the other list pages, not CRMpulse's grouped list. It has a fixed layout, 64px rows, and sortable headers (task, assigned to, status, due; due by default, so overdue comes first). It pages 10 at a time. Open tasks come first, then completed and cancelled when "Show completed and cancelled" is on. Columns:
    - **Task:** a checkbox to complete (completed and cancelled tasks are final). Then the title, which opens the task form, with the number, the initiative (or account) link and "from ACT-…" under it.
    - **Assigned to:** avatar and name, with the function and "by" under them.
    - **Status:** a badge.
    - **Due:** the date, with days overdue, Today or "In N days" under it, red when overdue.
    - **Edit.**
  - **Task form** (stands in for CRMpulse's task drawer). It is a side panel that slides in from the right, the same `.drill` panel as the Pipeline / Performance drill-downs: a header with a label, title and close button, a scrolling body, and a footer with the primary button then Cancel. Esc closes it.
    - **New task:** opens it with due tomorrow and you as assignee, plus account and sales initiative (both optional; picking an initiative sets the account), what needs doing, who should do it, when it is due, and details.
    - **Existing task:** clicking its title or the edit button opens it filled, with the status as a segmented control.
    - **Cancelling:** requires "Why is it cancelled?". **Completing:** takes an optional outcome.
    - **Completed and cancelled tasks:** open read-only, with their outcome or reason.
    - **Validation:** missing fields are marked in red, with a message under each.
  - **Consistent with the other list pages:**
    - The filter bar sits under the header, above the tiles.
    - The scope tiles are the tinted card of tiles used on Accounts and Sales initiatives, and the selected tile is white.
    - Overdue tasks show red text only; the red row tint is gone.
    - "Show completed and cancelled" is a filter-bar pill toggle, not a native checkbox.
  - The earlier version's extras are gone: the status and due filters, the status menu, and the table with pager.
- **`activities.html`: Activities** (CRM V1 §6). It mirrors CRMpulse `/activities`, checked against the old app running locally and its source:
  - Mine / My teams / Everyone. The demo user is a salesperson, so the page opens on Mine.
  - **"Log what happened" composer:**
    - Type chips.
    - Context: account or sales initiative, with a picker.
    - A "what happened" field and Log, which adds the activity to the timeline.
    - The CRMpulse note about logging from the record.
  - **Four tiles:**
    - This week.
    - Last 30 days.
    - Accounts with no interaction in 30 days: amber when there are any.
    - Follow-ups created, counted from tasks with a source activity.
  - Type chips with counts.
  - **Filters:** search, purpose, and period (last 60 days by default, this week, this month, this quarter, any time). More filters holds owner and context.
  - **Timeline:** grouped this week / last week / by month. Each entry shows:
    - Date, weekday and time, plus the type icon.
    - Subject and purpose tag, then the ID and an edit button.
    - The account, the initiative link, "by" and the follow-up task count.
    - The note.
- **`ACTIVITIES`** in `crm-data.js`: 48 activities, about 41 in the last 60 days, with the CRMpulse type and purpose lists.
  - Every source activity that `TASKS` points to exists, with the same account and initiative.
  - Lotus – ERP Upgrade keeps its two CRMpulse activities.
  - The record page's Activities tab now reads from this list.
  - Accounts' "Last interaction" is now the latest activity for that account, so the two pages agree. No account is quiet for more than 60 days now, so the "No interaction for N days" chip doesn't show.
- **`targets.html`: Sales targets & allocation** (CRM V1 §10). It follows the CRMpulse `/targets` layout:
  - **Filters:** fiscal year (FY26-27; FY27-28 is planned and not started yet) and search.
  - **Dimension tabs:** geography, region, salesperson, SBU, practice / service line, offering, technology, vertical.
  - **Table:** Q1–Q4 targets, each with closed won and the % of that quarter's target. The current quarter is shaded, and future quarters show "Not started". Then the annual target, achieved and %. % is green at 90% and above, amber at 50% and above, red below 50%. The table has a pager.
  - **Edit per row:** a dialog with the four quarterly targets in $K and a live annual total. Changes are kept for the session.
  - Each dimension is planned on its own, and targets are never added across dimensions.
- **Target data** in `crm-data.js`:
  - `TARGET_DIMS` and `targetRows(dim, fy)`.
  - `sellOf(o)`: the same SBU, practice, technology, offering, vertical and region rules as the record page.
  - **Where the numbers come from:**
    - Geography and salesperson use the existing `GEO_TARGET` and `PERSON_TARGET`, so they match Sales performance.
    - Region splits its geography's target.
    - The other dimensions split `COMPANY_TARGET` by FY26-27 won + open opportunity value, rounded to $50K.
    - Quarterly target = annual ÷ 4.
    - FY27-28 = FY26-27 + 15%.
- **Shared data** in `crm-data.js`:
  - `ACCOUNTS`: 19 accounts, one per company in the initiatives. Derived from the initiatives: owner, lifecycle, open pipeline, customer value, recent wins, last interaction.
  - `CONTACTS`: 63 contacts, generated with the same name generator as the record page's Contacts tab, so a person keeps the same name. Three decision makers are inactive.
  - Helpers: `ROLES`, `hasDM`.
- `initiative-new.html` reads `?acc=` to preselect the account.
- **Sales-owner photos** in `assets/people/`.
  - **From the manager's prototype set:** Gaurav, Omar Haddad, Ahmed Al-Mansoori, Karthik Menon and Vikram Iyer. Prototype photos were renamed to these fictional people.
  - **AI-generated portraits:** Daniel Tan, Mei Lin Wong, Priya Sharma and Ananya Reddy (Gemini image model, 256px webp).
  - `CRM.avatar(name)` shows the photo when there is one (`.av.ph`), and initials otherwise (contacts, cross-functional staff). Owner avatars on every page pick this up.
- **Contact portraits** in `assets/people/contacts/CON-….webp`. They are AI-generated, one per contact ID, because the demo reuses some names across accounts. `CRM.avatar(name, contactId)` uses one only when the ID is in `CONTACT_PHOTOS` (`crm-data.js`), so missing files are never requested. 26 of 63 are done; the image quota ran out, and the rest show initials until they are generated. They are used on the Contacts page and the record page's Contacts tab.
- **Contacts, account card header:** even 12px top and bottom, and a 48px minimum height. `.grp-card .grp-h` overrides the dashboard's `.grp-h:first-child { padding-top: 0 }`.

### Changed
- **Pipeline Target & forecast row:**
  - At 1440, the Q3 forecast bar now sits on the same baseline as the quarter bars in "Bookings vs target". Above 1360px the forecast legend's top margin is 32px, set in `pipeline.html`.
  - The Q3 progress ring is centred vertically between the heading and the minis (`.ring-card .ring { margin: auto }`). This also applies on Sales performance.
- **Timeline** (Activities page and the record page's Activities tab):
  - **Period blocks:** this week / last week / by month. Each block has a 16px / 600 heading with a count, and 28px between blocks (no rule). The record page used to show one "PAST" label.
  - **Spacing:** 16px between the type tabs and the first heading.
  - **Activities:** the "Showing N of N" footer was removed. CRMpulse loads the feed in pages; here every match shows at once, so the two numbers were always the same.
  - **Connector line:** inside a block it now runs from dot centre to dot centre (2px), so it no longer breaks between entries. It stops at the end of a block.
  - **Fewer line breaks:** the date column is 96px, left-aligned and doesn't wrap. It shows "31 Oct Sat" (the weekday in grey), then the time on the line below.
  - **Phones (Activities):** the date sits on one line above the card. The card header puts title + edit on the first line, then purpose + ID.
- **Type sizes follow the design-system scale on every page** (`--text-*`). A scan of all 11 page states now finds no size off the scale, and each role has one size:
  - Page titles 34px.
  - Page subtitles, table cells and body text 14px.
  - Table headers 12px.
  - Card titles 15px / 600. The Contacts detail name was 16px.
  - Scope-tile figures 28px / 400. Tasks and Activities tiles were 24px / 500.
  - Tile labels 12px.
  - Form labels 14px / 500.
  - `crm.css` now sets `small { font-size: var(--text-xs) }`, so a bare `<small>` no longer renders at the browser's 83%. It was 11.67px under Sales performance's loss reasons.
  - The archived Pipeline's inline 14px is now `var(--text-sm)`.
- **One tab style, used one way.** Tabs are the `.tabs .tab` pills (midnight when selected, count in `.tab-n`). They sit at the top of the card whose content they filter, as on Pipeline's "Deals to act on".
  - Now used for: Activities type filter (it moved into the timeline card), the record page's Activities tab, and Sales targets dimensions (custom spacing dropped).
  - `body.v2 .tabs` wraps when there are many.
  - The composer's type chips on Activities stay chips: they pick a value, they don't filter.
- **Card spacing unified at `--pad-card`** (24px, 16px on phones):
  - Activities summary tiles: were 16/18px.
  - Tasks view tiles and quick add: were 14/16px.
  - Activities timeline card: no longer has an 8px top.
  - Row lists that run edge to edge (Tasks groups, Contacts account cards) inset their rows by `--pad-card` (were 20px).
  - Tiles inside a card (Accounts, Sales initiatives lifecycle) use 16px, so with the card's 8px they line up at 24px.
  - A table that opens its card (Tasks, Accounts, Contacts list) pulls up by the header cell's 10px top padding (`.card > .tbl-wrap:first-child`). Its header labels now sit 24px from the card top, the same as from the left.
- **Activities:** "Log what happened" now sits on its own line above the type chips.
- **Buttons are now three kinds, plus links.** One block at the end of `theme-v2.css` defines them, and the design-system page says the same.
  - **Primary** (`.btn.primary`): midnight fill, white text.
  - **Secondary** (`.btn`): white, 1px `--line-2` border, ink text, and a darker border on hover. It looks the same on the page canvas, white cards, tinted cards, dialogs and the sticky bars. Only on the canvas does it carry `--shadow-card`. This replaces four variants: translucent white with shadow on the canvas, soft blue on white cards, white glass on tinted cards, soft blue in dialogs.
  - **Ghost** (`.btn.ghost`): no fill or border, `--t2` text, soft fill on hover. `.btn.quiet` is the red ghost in dialogs.
  - **Disabled:** one rule for all buttons. The page-level copies in `initiative.html` and `initiative-new.html` were removed.
  - **Link** (`.link`, plus content links: record meta, account name, contact panel initiatives, task "related to"): deep blue, weight 500, underlined on hover.
- **Sidebar:** Activities, Tasks, Accounts, Contacts and Sales targets are live links.
- **Pager:** the 2px `margin-top` was removed (`crm.css`, all pages).
- Cache-busters: `crm.css` is now `?v=20261119c`, `theme-v2.css` is `?v=20261119d`, `crm-data.js` is `?v=20261119f`, and `crm.js` is `?v=20261119h`.

---

## 2026-11-18 (4) · `6190f7d` · units and page labels (Candace)

### Changed
- **Money units (K, M):** one rule everywhere. They sit on the baseline, about half the number's size, grey, 2px from the number. Before, header KPIs raised the unit to the top with an 8px gap, and card figures left it floating mid-height.
  - Header KPIs (`.v2-kv`): unit 16px on 34px (14 on 28 on phones). `.v2-kv` now aligns on the baseline; its badge keeps to the top (`.v2-kv .v2-badge { align-self: flex-start }`).
  - Hero number (`.big`): unit 24px on 48px, 20 on 40. Card figure (`.mid`): unit 14px on 28px.
- **Page label pill** (`.v2-eyebrow`) is the page's name: Sales performance (was "Dashboards") and Sales initiatives (was "Sales"). Pipeline already said "Pipeline & forecast".
- **Design system:** the unit and page-label rules are on `index.html` (Header KPIs) and in `README.md`.
- Cache-busters: `crm.css` `?v=20261118h`, `theme-v2.css` `?v=20261118i`, `responsive.css` `?v=20261118g`.

### Open
- On Sales performance and Sales initiatives the pill now repeats the page title right under it. Proposed: drop the pill on pages whose title is the page name (keep "Updated"). Not decided.

---

## 2026-11-18 (3) · `12aaff7` · forms, toast, date picker (Candace)

### Added
- **Leave without saving asks first** (`CRM.confirm`, `CRM.guardLeave` in `crm.js`, `.dlg` in `crm.css`).
  - **Record edit mode:** Cancel, the back link, the sidebar or the browser's back button with unsaved changes opens "Save changes?": Discard · Keep editing · Save. Save only leaves when validation passes.
  - **New initiative:** leaving with anything entered opens "Discard this initiative?": Discard · Keep editing.
  - Reload or closing the tab gets the browser's own prompt. With no changes, pages leave without asking.
- **Date picker** (`enhanceDate` in `crm.js`, `.dt-*` in `crm.css`): every `<input type="date">` becomes a field button and a calendar popover in the select's style. The input stays the data source, so page code is unchanged.
  - Shortcuts: expected close dates offer the ends of this and next fiscal quarter; follow-up and task due dates offer Tomorrow and Next week.
  - Keyboard: arrows move the day, PageUp / PageDown change month, Enter picks, Esc closes. Opens upward or scrolls into view when there is no room.
  - "Today" is the demo's `TODAY` (13 Nov 2026), so it agrees with the overdue flags.
- **Line items empty state** (`initiative.html`): "No line items yet" with an "Add line items" button. Existing demo records all have items, so it shows only for a new opportunity.
- **Design system:** toast, confirm dialog, text field, date picker, required fields and the empty state with an action are on `design-system/index.html`; `README.md` has a shared-components table.

### Changed
- **One date format:** `18 Nov 2026`, or `18 Nov` without the year (`CRM.date`). Replaces `06-Jul-2026` on the record page and fixes "Sept" (Chrome's en-GB month name). `fmtDate` in `crm-data.js` and the list's follow-up dates use it.
- **Toast:** top centre, white glass with an icon by kind: `warn` (red !), `ok` (green ✓), `info` (blue i, default). Under the top bar on phones. `CRM.toast(text, kind)`; saved, added and exported messages use `ok`, check-the-fields and nothing-to-export use `warn`.
- **New initiative bottom bar:** Create initiative is always clickable. With required fields missing it shows "Please complete all required fields.", marks each missing field in red and scrolls to the first; marks clear as fields are filled. If SBU is missing, the folded "Classification, team & notes" section opens. The "3 required items left · …" text is gone (the rail checklist still shows it). "Create & add line items" is removed: line items are added on the record after it exists.
- **Q3 progress ring (Pipeline):** no background rings inside the % ring or between it and its ticks.
- **Text field `.in`** is now in `crm.css` as well, so the design system and the date picker share it. The copies in `initiative.html` and `initiative-new.html` are identical and can be removed.
- Cache-busters: `crm.css` `?v=20261118g`, `crm.js` `?v=20261118f`, `crm-data.js` `?v=20261118a`, `theme-v2.css` `?v=20261118h`, `responsive.css` `?v=20261118f`. `design-system/index.html` now loads the current versions.

### Fixed
- **Record edit:** after typing in a field, the first click on Cancel or Save did nothing (the bar was redrawn on blur). One click works now.
- **Required dropdowns** (Account, SBU) now get the red border, not only the red line under them.
- Phone save bar: the status-line rule in `responsive.css` now only applies to bars that have a status (`.dot + * + span`), not to the new-initiative bar.

---

## 2026-11-18 · `a96d55e`

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
