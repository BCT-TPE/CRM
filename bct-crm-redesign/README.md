# BCT CRM · Dashboard and Sales redesign

Redesign of the CRM V1 classic pages, following the old CRMpulse information architecture with the visual language of the BCT AI CRM prototype (`../bct-crm-ui/`). All companies, people and numbers are fictional; nothing is connected to a real system.

## Pages

| Page | File | What it answers |
|---|---|---|
| Pipeline & forecast | `pipeline.html` | Will we hit target? Where is open pipeline, what is stuck? |
| Sales performance | `performance.html` | How did we do? Bookings vs target, win / loss, attainment by team and salesperson |
| Sales initiatives | `initiatives.html` | Every prospect, lead and opportunity: list, kanban and lifecycle funnel views |
| Sales initiative record | `initiative.html?id=SI-2026-0024` | One initiative: stage, line items, contacts, activities, tasks, stage history, attachments, next steps. Every row on the other pages opens it |
| Sales initiative record · edit | `initiative.html?id=SI-2026-0024&mode=edit` | The same record with every field editable; locked fields show why |
| New sales initiative | `initiative-new.html` | Create a prospect, lead or opportunity; shows what each status needs before it can be created |
| Activities | `activities.html` | Every call, meeting, visit and email, newest first: log one, see the week at a glance, filter by type, purpose and period |
| Tasks | `tasks.html` | Follow-ups for anyone (sales, presales, delivery, finance, legal): my tasks, ones I gave, team overdue, due this week; quick add, complete, edit |
| Accounts | `accounts.html` | Every customer and prospect organisation: lifecycle, owner, open pipeline, customer value, last interaction, what needs attention |
| Contacts | `contacts.html` | People at each account, by account or as a list; accounts without an active decision maker; contact details beside the list |
| Sales targets | `targets.html` | Quarterly booking targets per dimension (geography, region, salesperson, SBU, practice, offering, technology, vertical) against closed won; edit a row's targets |
| Pipeline (archived layout) | `pipeline_archieve.html` | The first Pipeline layout, kept for reference |

Every page works from 1440 down to a 390 px phone. What changes at each width, and why, is in `RWD.md` (Traditional Chinese).

Design system: `design-system/index.html` (tokens in `design-system/tokens.css`).

## How to open

Open any page in Chrome or Edge, or run a local server from this folder:

```bash
python3 -m http.server 5174
```

then go to `http://localhost:5174/pipeline.html`.

## Files

- `assets/crm-data.js` — shared demo data, so numbers match across pages
- `assets/crm.css`, `assets/crm.js` — shell (sidebar, menus, tooltips) and the type, spacing and colour rules (top of `crm.css`)
- `assets/dashboard.css` — dashboard components shared by Pipeline and Performance
- `design-system/tokens.css` — every value (type, colour, radius, shadow, spacing); loaded first by every page
- `assets/theme-v2.css` — blue-glass theme (`body.v2`) used by every page except the archived Pipeline
- `assets/responsive.css` — breakpoints for every page
- `assets/region-map.js` — dot map generated from world-atlas 110m (ISC licence)
- `assets/fonts/` — Inter (OFL)
- `CHANGELOG.md` — what changed in each push to `main`
- `RWD.md` — responsive behaviour per breakpoint and the fixes behind it (Traditional Chinese)
- `DESIGN.md` — the settled design rules to follow when editing these pages (Traditional Chinese)
