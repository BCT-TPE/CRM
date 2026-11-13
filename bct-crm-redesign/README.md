# BCT CRM · Dashboard and Sales redesign

Redesign of the CRM V1 classic pages, following the old CRMpulse information architecture with the visual language of the BCT AI CRM prototype (`../bct-crm-ui/`). All companies, people and numbers are fictional; nothing is connected to a real system.

## Pages

| Page | File | What it answers |
|---|---|---|
| Pipeline & forecast | `pipeline.html` | Will we hit target? Where is open pipeline, what is stuck? |
| Sales performance | `performance.html` | How did we do? Bookings vs target, win / loss, attainment by team and salesperson |
| Sales initiatives | `initiatives.html` | Every prospect, lead and opportunity: list, kanban and funnel views |

Activities and Tasks are next. Desktop only (1440 px).

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
- `assets/region-map.js` — dot map generated from world-atlas 110m (ISC licence)
- `assets/fonts/` — Inter (OFL)
