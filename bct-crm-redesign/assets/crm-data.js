/* =====================================================================
   BCT CRM redesign — shared demo data (FY26-27, today = 13 Nov 2026). Used by every page so numbers agree across pages.
   Shaped after the old CRMpulse demo. Every number on a page is computed from these records.
   ===================================================================== */
const TODAY = new Date('2026-11-13');
const FY_START = new Date('2026-04-01'), FY_END = new Date('2027-03-31');
const Q_RANGE = { 1: ['2026-04-01', '2026-06-30'], 2: ['2026-07-01', '2026-09-30'], 3: ['2026-10-01', '2026-12-31'], 4: ['2027-01-01', '2027-03-31'] };
const CUR_Q = 3;

const STAGES = [ // funnel code → configured Opportunity sub-stages, default probability
  { id: 'oi', code: 'L3', name: 'Opportunity identification', prob: 20 },
  { id: 'cm', code: 'L3', name: 'Client meeting / scope discussion', prob: 25 },
  { id: 'sd', code: 'L3', name: 'Solution development', prob: 35 },
  { id: 'pp', code: 'L2', name: 'Proposal preparation', prob: 50 },
  { id: 'ps', code: 'L2', name: 'Proposal submission', prob: 60 },
  { id: 'cn', code: 'L1', name: 'Commercial negotiation', prob: 75 },
  { id: 'cf', code: 'L1', name: 'Contract finalization', prob: 90 }
];
const CODE_INFO = {
  L3: { label: 'Early stage', cat: 'Pipeline', cls: 'c-pipe' },
  L2: { label: 'Proposal stage', cat: 'Best case', cls: 'c-best' },
  L1: { label: 'Negotiation / contract', cat: 'Commit', cls: 'c-commit' }
};
// FY targets. Company target = sum of geography targets ($14.40M). Team and salesperson targets are set independently
// (requirement 10.6: overlapping targets are never added together).
const TEAMS = {
  'APAC Sales': { geo: 'APAC', people: ['Daniel Tan', 'Mei Lin Wong', 'Gaurav Shrotriya'], target: 1.10e6 },
  'India Enterprise': { geo: 'India', people: ['Priya Sharma', 'Karthik Menon'], target: 2.20e6 },
  'India Strategic Accounts': { geo: 'India', people: ['Vikram Iyer', 'Ananya Reddy'], target: 1.10e6 },
  'Middle East Enterprise': { geo: 'Middle East', people: ['Omar Haddad', 'Ahmed Al-Mansoori'], target: 1.10e6 },
  'Middle East Strategic Accounts': { geo: 'Middle East', people: [], target: 1.10e6 }
};
const PERSON_TARGET = { 'Daniel Tan': 0.55e6, 'Mei Lin Wong': 0.55e6, 'Priya Sharma': 1.10e6, 'Karthik Menon': 1.10e6, 'Vikram Iyer': 0.55e6, 'Ananya Reddy': 0.55e6, 'Omar Haddad': 0.55e6, 'Ahmed Al-Mansoori': 0.55e6 };
const ME = 'Gaurav Shrotriya';
const PERSON_TEAM = Object.fromEntries(Object.entries(TEAMS).flatMap(([t, v]) => v.people.map(p => [p, t])));
const GEO_TARGET = { 'APAC': 2.8e6, 'India': 5.6e6, 'Middle East': 6.0e6 };
const COMPANY_TARGET = 14.4e6;

// Open opportunities (Pipeline & forecast)
const OPPS = [
  { id: 'SI-2026-0024', name: 'Lotus – ERP Upgrade', acc: 'Lotus Retail India', owner: 'Vikram Iyer', team: 'India Strategic Accounts', st: 'cn', value: 1.40e6, prob: 75, close: '2026-12-14', days: 15, open: 130, next: true },
  { id: 'SI-2026-0019', name: 'Pacific – Infrastructure Managed Services', acc: 'Pacific Health Systems', owner: 'Mei Lin Wong', team: 'APAC Sales', st: 'cm', value: 1.40e6, prob: 25, close: null, days: 107, open: 188, next: true },
  { id: 'SI-2026-0021', name: 'Singapore – Identity & Access Management', acc: 'Singapore Metro Bank', owner: 'Daniel Tan', team: 'APAC Sales', st: 'cf', value: 0.90e6, prob: 90, close: '2026-12-19', days: 44, open: 110, next: true },
  { id: 'SI-2026-0032', name: 'Deccan – Identity & Access Management', acc: 'Deccan Manufacturing Ltd', owner: 'Ananya Reddy', team: 'India Strategic Accounts', st: 'sd', value: 0.90e6, prob: 35, close: '2027-01-18', days: 27, open: 132, next: true },
  { id: 'SI-2026-0011', name: 'Desert – Data Platform Modernization', acc: 'Desert Industrial Holdings', owner: 'Omar Haddad', team: 'Middle East Enterprise', st: 'oi', value: 0.65e6, prob: 20, close: '2027-04-13', days: 107, open: 210, next: false },
  { id: 'SI-2026-0033', name: 'Straits – Cloud Migration', acc: 'Straits Energy Pte Ltd', owner: 'Daniel Tan', team: 'APAC Sales', st: 'sd', value: 0.40e6, prob: 35, close: '2027-03-14', days: 15, open: 40, next: true },
  { id: 'SI-2026-0014', name: 'Bharat – ERP Upgrade', acc: 'Bharat Steel Works', owner: 'Priya Sharma', team: 'India Enterprise', st: 'sd', value: 0.25e6, prob: 35, close: '2027-05-23', days: 134, open: 170, next: false },
  { id: 'SI-2026-0016', name: 'ABC – GenAI Assistant', acc: 'ABC Bank', owner: 'Ahmed Al-Mansoori', team: 'Middle East Enterprise', st: 'pp', value: 0.25e6, prob: 50, close: '2027-02-22', days: 134, open: 160, next: true },
  { id: 'SI-2026-0025', name: 'Riyadh – Infrastructure Managed Services', acc: 'Riyadh Petrochemicals', owner: 'Ahmed Al-Mansoori', team: 'Middle East Enterprise', st: 'cn', value: 0.18e6, prob: 75, close: '2027-01-23', days: 27, open: 60, next: true },
  { id: 'SI-2026-0028', name: 'Emirates Logistics Hub – Data Platform Modernization', acc: 'Emirates Logistics Hub', owner: 'Omar Haddad', team: 'Middle East Enterprise', st: 'ps', value: 0.18e6, prob: 60, close: '2027-02-10', days: 68, open: 80, next: true },
  { id: 'SI-2026-0022', name: 'Oman – Identity & Access Management', acc: 'Oman Energy Corporation', owner: 'Ahmed Al-Mansoori', team: 'Middle East Enterprise', st: 'ps', value: 0.15e6, prob: 60, close: '2027-03-05', days: 96, open: 120, next: true },
  { id: 'SI-2026-0027', name: 'Kaveri – Data Platform Modernization', acc: 'Kaveri Pharma', owner: 'Ananya Reddy', team: 'India Strategic Accounts', st: 'cf', value: 0.12e6, prob: 90, close: '2026-12-22', days: 52, open: 95, next: true },
  { id: 'SI-2026-0029', name: 'Sundaram – Cloud Migration', acc: 'Sundaram Healthcare', owner: 'Karthik Menon', team: 'India Enterprise', st: 'ps', value: 0.12e6, prob: 70, close: '2026-12-11', days: 92, open: 85, next: true },
  { id: 'SI-2026-0018', name: 'Gulf – ERP Upgrade', acc: 'Gulf National Bank', owner: 'Ahmed Al-Mansoori', team: 'Middle East Enterprise', st: 'ps', value: 0.0896e6, prob: 60, close: '2027-03-20', days: 101, open: 140, next: true },
  { id: 'SI-2026-0030', name: 'Indus – Application Support', acc: 'Indus Finance Corporation', owner: 'Priya Sharma', team: 'India Enterprise', st: 'pp', value: 0.08e6, prob: 50, close: '2026-12-24', days: 27, open: 70, next: true }
];

// Closed opportunities (Sales performance). Closed won = booking on the actual close date; Closed lost needs a loss reason.
const LOSS_REASONS = ['Lost to competitor', 'Scope mismatch', 'No decision / deferred', 'No budget'];
const CLOSED = [
  // FY26-27 · won
  { id: 'SI-2026-0003', name: 'Straits – Network Refresh', acc: 'Straits Energy Pte Ltd', owner: 'Daniel Tan', team: 'APAC Sales', result: 'won', value: 0.25e6, closed: '2026-05-21' },
  { id: 'SI-2026-0007', name: 'Singapore – Data Warehouse Support', acc: 'Singapore Metro Bank', owner: 'Mei Lin Wong', team: 'APAC Sales', result: 'won', value: 0.46e6, closed: '2026-08-28' },
  { id: 'SI-2026-0035', name: 'Pacific – Service Desk Extension', acc: 'Pacific Health Systems', owner: 'Daniel Tan', team: 'APAC Sales', result: 'won', value: 0.0565e6, closed: '2026-10-22' },
  { id: 'SI-2026-0002', name: 'Indus – Core Banking Integration', acc: 'Indus Finance Corporation', owner: 'Priya Sharma', team: 'India Enterprise', result: 'won', value: 0.62e6, closed: '2026-06-17' },
  { id: 'SI-2026-0008', name: 'Bharat – SAP S/4 Migration', acc: 'Bharat Steel Works', owner: 'Karthik Menon', team: 'India Enterprise', result: 'won', value: 1.30e6, closed: '2026-09-12' },
  { id: 'SI-2026-0036', name: 'Sundaram – Patient Portal AMC', acc: 'Sundaram Healthcare', owner: 'Priya Sharma', team: 'India Enterprise', result: 'won', value: 0.13e6, closed: '2026-10-30' },
  { id: 'SI-2026-0004', name: 'Lotus – POS Rollout', acc: 'Lotus Retail India', owner: 'Vikram Iyer', team: 'India Strategic Accounts', result: 'won', value: 0.25e6, closed: '2026-05-08' },
  { id: 'SI-2026-0009', name: 'Kaveri – Quality Analytics', acc: 'Kaveri Pharma', owner: 'Ananya Reddy', team: 'India Strategic Accounts', result: 'won', value: 0.42e6, closed: '2026-08-05' },
  { id: 'SI-2026-0037', name: 'Deccan – Plant IoT Pilot', acc: 'Deccan Manufacturing Ltd', owner: 'Ananya Reddy', team: 'India Strategic Accounts', result: 'won', value: 0.10e6, closed: '2026-11-04' },
  { id: 'SI-2026-0001', name: 'Riyadh – SCADA Upgrade', acc: 'Riyadh Petrochemicals', owner: 'Ahmed Al-Mansoori', team: 'Middle East Enterprise', result: 'won', value: 0.45e6, closed: '2026-04-28' },
  { id: 'SI-2026-0005', name: 'Oman – Billing Platform', acc: 'Oman Energy Corporation', owner: 'Omar Haddad', team: 'Middle East Enterprise', result: 'won', value: 0.35e6, closed: '2026-06-10' },
  { id: 'SI-2026-0010', name: 'Gulf – Digital Onboarding', acc: 'Gulf National Bank', owner: 'Ahmed Al-Mansoori', team: 'Middle East Enterprise', result: 'won', value: 0.70e6, closed: '2026-07-19' },
  { id: 'SI-2026-0012', name: 'Emirates Logistics Hub – Fleet Tracking', acc: 'Emirates Logistics Hub', owner: 'Omar Haddad', team: 'Middle East Enterprise', result: 'won', value: 0.55e6, closed: '2026-08-24' },
  { id: 'SI-2026-0013', name: 'ABC – Fraud Analytics', acc: 'ABC Bank', owner: 'Ahmed Al-Mansoori', team: 'Middle East Enterprise', result: 'won', value: 0.35e6, closed: '2026-09-26' },
  { id: 'SI-2026-0038', name: 'Desert – Asset Monitoring AMC', acc: 'Desert Industrial Holdings', owner: 'Omar Haddad', team: 'Middle East Enterprise', result: 'won', value: 0.35e6, closed: '2026-10-15' },
  // FY26-27 · lost (reached = furthest funnel code before it was lost, for the lifecycle funnel)
  { id: 'SI-2026-0006', name: 'Straits – Analytics Platform', acc: 'Straits Energy Pte Ltd', owner: 'Daniel Tan', team: 'APAC Sales', result: 'lost', value: 0.12e6, closed: '2026-06-03', reason: 'No budget' , reached: 'L3' },
  { id: 'SI-2026-0015', name: 'Pacific – Data Lake', acc: 'Pacific Health Systems', owner: 'Mei Lin Wong', team: 'APAC Sales', result: 'lost', value: 0.65e6, closed: '2026-09-18', reason: 'Lost to competitor' , reached: 'L1' },
  { id: 'SI-2026-0017', name: 'Bharat – Customer Portal', acc: 'Bharat Steel Works', owner: 'Priya Sharma', team: 'India Enterprise', result: 'lost', value: 0.40e6, closed: '2026-08-14', reason: 'Scope mismatch' , reached: 'L2' },
  { id: 'SI-2026-0034', name: 'Lotus – Loyalty App', acc: 'Lotus Retail India', owner: 'Vikram Iyer', team: 'India Strategic Accounts', result: 'lost', value: 0.18e6, closed: '2026-10-09', reason: 'No decision / deferred' , reached: 'L3' },
  // FY25-26 · won (for "vs last year")
  { id: 'SI-2025-0041', name: 'Gulf – Branch Network Refresh', acc: 'Gulf National Bank', owner: 'Ahmed Al-Mansoori', team: 'Middle East Enterprise', result: 'won', value: 0.18e6, closed: '2025-11-20' },
  { id: 'SI-2025-0052', name: 'Indus – Loan Origination', acc: 'Indus Finance Corporation', owner: 'Priya Sharma', team: 'India Enterprise', result: 'won', value: 0.36e6, closed: '2026-02-15' }
];

// Prospects and leads (Sales initiatives). Main status → configured sub-stages (requirement 5.3).
const PRE_STAGES = { Prospect: ['Identified', 'Initial contact', 'Engaged'], Lead: ['Active dialogue', 'Qualification', 'Qualified'] };
const PRE = [
  { id: 'SI-2026-0040', name: 'Qamar – Field Service App', acc: 'Qamar Energy', owner: 'Gaurav Shrotriya', team: 'APAC Sales', status: 'Prospect', sub: 'Identified', value: 0.80e6, prob: 5, close: null, days: 12, next: 'Intro call with the IT head', follow: '2026-11-18' },
  { id: 'SI-2026-0041', name: 'Al Dhafra – Facilities Management', acc: 'Al Dhafra Facilities', owner: 'Gaurav Shrotriya', team: 'APAC Sales', status: 'Prospect', sub: 'Initial contact', value: 0.50e6, prob: 5, close: null, days: 6, next: 'Send capability deck', follow: '2026-11-14' },
  { id: 'SI-2026-0042', name: 'Emirates Steel – SAP S/4 Assessment', acc: 'Emirates Steel', owner: 'Omar Haddad', team: 'Middle East Enterprise', status: 'Prospect', sub: 'Engaged', value: 0.40e6, prob: 10, close: null, days: 34, next: '', follow: null },
  { id: 'SI-2026-0038', name: 'Al Noor – Disaster Recovery on Cloud', acc: 'Al Noor Retail Group', owner: 'Ahmed Al-Mansoori', team: 'Middle East Enterprise', status: 'Lead', sub: 'Qualification', value: 0.1201e6, prob: 15, close: null, days: 15, next: 'Schedule follow-up meeting', follow: '2026-11-18' },
  { id: 'SI-2026-0039', name: 'Lotus – Customer Portal', acc: 'Lotus Retail India', owner: 'Vikram Iyer', team: 'India Strategic Accounts', status: 'Lead', sub: 'Active dialogue', value: 0.40e6, prob: 10, close: null, days: 15, next: 'Schedule follow-up meeting', follow: '2026-11-19' },
  { id: 'SI-2026-0043', name: 'Straits – Data Governance', acc: 'Straits Energy Pte Ltd', owner: 'Gaurav Shrotriya', team: 'APAC Sales', status: 'Lead', sub: 'Qualified', value: 0.08e6, prob: 20, close: '2027-02-15', days: 41, next: 'Confirm the budget owner', follow: '2026-11-10' }
];
// Next step and next follow-up for open opportunities ('' = no next step recorded)
const NEXT = {
  'SI-2026-0024': ['Send revised commercial terms', '2026-11-14'], 'SI-2026-0019': ['Scope workshop with CIO', '2026-11-20'],
  'SI-2026-0021': ['Contract review with legal', '2026-11-13'], 'SI-2026-0032': ['Solution demo for security team', '2026-11-12'],
  'SI-2026-0011': ['', null], 'SI-2026-0033': ['Share migration plan', '2026-11-13'], 'SI-2026-0014': ['', null],
  'SI-2026-0016': ['Finalise proposal pricing', '2026-11-21'], 'SI-2026-0025': ['Negotiate payment terms', '2026-11-15'],
  'SI-2026-0028': ['Follow up on proposal', '2026-11-17'], 'SI-2026-0022': ['Follow up on proposal', '2026-11-09'],
  'SI-2026-0027': ['Get PO signed', '2026-11-16'], 'SI-2026-0029': ['Answer proposal questions', '2026-11-11'],
  'SI-2026-0018': ['Follow up on proposal', '2026-11-25'], 'SI-2026-0030': ['Draft proposal', '2026-11-20']
};
// Account currency for showing the local amount next to USD
const FX = { INR: 83.33, AED: 3.6725, SAR: 3.75, OMR: 0.385 };
function accCurrency(acc, team) {
  if (/Riyadh/.test(acc)) return 'SAR';
  if (/Oman|Qamar/.test(acc)) return 'OMR';
  if (TEAMS[team] && TEAMS[team].geo === 'India') return 'INR';
  if (TEAMS[team] && TEAMS[team].geo === 'Middle East' || /Emirates|Al Dhafra|Al Noor|Gulf|ABC|Desert/.test(acc)) return 'AED';
  return 'USD';
}
function localAmount(usd, cur) {
  if (cur === 'USD') return null;
  const v = usd * FX[cur];
  if (cur === 'INR') return v >= 1e7 ? `₹${(v / 1e7).toFixed(2)} Cr` : `₹${(v / 1e5).toFixed(1)} L`;
  return v >= 1e6 ? `${cur} ${(v / 1e6).toFixed(2)}M` : `${cur} ${(v / 1e3).toFixed(1)}K`;
}

const STAGE = Object.fromEntries(STAGES.map(s => [s.id, s]));
function qOf(d) { if (!d) return null; for (const q of [1, 2, 3, 4]) { if (d >= Q_RANGE[q][0] && d <= Q_RANGE[q][1]) return q; } return d > Q_RANGE[4][1] ? 'next' : 'prev'; }
// Financial year (Apr–Mar) and quarter of any date: { fy: '2627', q: 3 }
function fyq(d) { const x = new Date(d), y = x.getFullYear(), m = x.getMonth(); const start = m >= 3 ? y : y - 1; return { fy: String(start % 100).padStart(2, '0') + String((start + 1) % 100).padStart(2, '0'), q: Math.floor(((m + 9) % 12) / 3) + 1 }; }
OPPS.forEach(o => { const s = STAGE[o.st]; o.code = s.code; o.stage = s.name; o.cat = CODE_INFO[s.code].cat; o.w = o.value * o.prob / 100; o.q = qOf(o.close); });
CLOSED.forEach(o => { const f = fyq(o.closed); o.fy = f.fy; o.q = f.q; });
// One list of every Sales initiative (prospect, lead, open and closed opportunity) for the Sales initiatives page.
const ALL_STEPS = [...PRE_STAGES.Prospect, ...PRE_STAGES.Lead, ...STAGES.map(x => x.name)];
const INITS = [
  ...PRE.map(o => ({ ...o, kind: 'open', code: null, w: o.value * o.prob / 100 })),
  ...OPPS.map(o => ({ ...o, kind: 'open', status: 'Opportunity', sub: o.stage, next: NEXT[o.id] ? NEXT[o.id][0] : '', follow: NEXT[o.id] ? NEXT[o.id][1] : null })),
  ...CLOSED.map(o => ({ ...o, kind: o.result, status: 'Opportunity', sub: o.result === 'won' ? 'Closed won' : 'Closed lost', code: o.result === 'won' ? 'L0' : 'Lost', prob: o.result === 'won' ? 100 : 0, w: o.result === 'won' ? o.value : 0, close: o.closed, days: null, next: '', follow: null }))
];
INITS.forEach(o => { o.cur = accCurrency(o.acc, o.team); o.step = ALL_STEPS.indexOf(o.sub); });
function ageBucket(d) { return d <= 30 ? 0 : d <= 60 ? 1 : d <= 90 ? 2 : 3; }
const AGE_NAMES = ['0–30 days', '31–60 days', '61–90 days', 'Over 90 days'];
function attention(o) {
  const r = [];
  if (!o.next) r.push('No next step');
  if (o.close && new Date(o.close) < TODAY) r.push('Close date passed');
  if (!o.close) r.push('No close date');
  if (o.days > 30) r.push(`${o.days} days in ${o.code}`);
  if (o.open > 90) r.push(`Open ${o.open} days`);
  return r;
}
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
const pct = (a, b) => b ? Math.round(a / b * 100) : null;
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
