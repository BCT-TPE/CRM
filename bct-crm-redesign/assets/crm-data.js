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
  { id: 'SI-2026-0044', name: 'Desert – Asset Monitoring AMC', acc: 'Desert Industrial Holdings', owner: 'Omar Haddad', team: 'Middle East Enterprise', result: 'won', value: 0.35e6, closed: '2026-10-15' },
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

// ---- Tasks (CRM V1 §7): follow-ups for anyone, linked to an account and usually a sales initiative ----
// Cross-functional owners (§7.5): presales, delivery, finance and legal sit outside the sales teams.
const FUNC = { 'John Mathew': 'Presales', 'Ravi Shankar': 'Delivery', 'Neha Gupta': 'Finance', 'Lakshmi Pillai': 'Legal', 'Suresh Menon': 'Sales head' };
const funcOf = (p) => FUNC[p] || (PERSON_TEAM[p] ? 'Sales' : 'Sales');
// [id, title, initiative, assigned to, assigned by, status, due (days from TODAY; null = no date), source activity, completed (days from TODAY)]
// status: ns = not started, ip = in progress, done = completed, cxl = cancelled
const TASK_ROWS = [
  ['0010', 'Credit check', 'SI-2026-0029', 'Neha Gupta', 'Suresh Menon', 'ns', -13],
  ['0019', 'Send meeting minutes', 'SI-2026-0014', 'Priya Sharma', 'Priya Sharma', 'ns', -13, 'ACT-2026-0037'],
  ['0028', 'Update BoQ', 'SI-2026-0021', 'Daniel Tan', 'Suresh Menon', 'ns', -13],
  ['0002', 'Solution architecture review', 'SI-2026-0018', 'John Mathew', 'Suresh Menon', 'ip', -12],
  ['0020', 'Arrange reference call', 'SI-2026-0038', 'Ahmed Al-Mansoori', 'Suresh Menon', 'ip', -12],
  ['0012', 'Send meeting minutes', 'SI-2026-0024', 'Vikram Iyer', 'Suresh Menon', 'ip', -11, 'ACT-2026-0021'],
  ['0004', 'Contract redlines', 'SI-2026-0025', 'Lakshmi Pillai', 'Suresh Menon', 'ns', -10],
  ['0022', 'Prepare commercial proposal', 'SI-2026-0014', 'Ravi Shankar', 'Suresh Menon', 'ns', -10],
  ['0014', 'Update BoQ', 'SI-2026-0019', 'Daniel Tan', 'Suresh Menon', 'ip', -9],
  ['0006', 'Arrange reference call', 'SI-2026-0011', 'Omar Haddad', 'Suresh Menon', 'ip', -8],
  ['0024', 'Credit check', 'SI-2026-0030', 'Neha Gupta', 'Suresh Menon', 'ip', -8],
  ['0007', 'Update BoQ', 'SI-2026-0021', 'Daniel Tan', 'Daniel Tan', 'ns', -7, 'ACT-2026-0013'],
  ['0016', 'Solution architecture review', 'SI-2026-0016', 'John Mathew', 'Suresh Menon', 'ns', -7],
  ['0025', 'Contract redlines', 'SI-2026-0025', 'Lakshmi Pillai', 'Ahmed Al-Mansoori', 'ns', -7, 'ACT-2026-0049'],
  ['0008', 'Prepare commercial proposal', 'SI-2026-0032', 'Ravi Shankar', 'Suresh Menon', 'ip', -6],
  ['0026', 'Send meeting minutes', 'SI-2026-0027', 'Ananya Reddy', 'Suresh Menon', 'ip', -6],
  ['0018', 'Contract redlines', 'SI-2026-0022', 'Lakshmi Pillai', 'Suresh Menon', 'ip', -5],
  ['0031', 'Confirm the budget owner', 'SI-2026-0043', ME, ME, 'ns', -3],
  ['0032', 'Send capability deck', 'SI-2026-0041', ME, ME, 'ip', 1, 'ACT-2026-0052'],
  ['0033', 'Intro call with the IT head', 'SI-2026-0040', ME, 'Suresh Menon', 'ns', 5],
  ['0034', 'Draft data governance scope', 'SI-2026-0043', 'John Mathew', ME, 'ns', 2],
  ['0035', 'Check delivery capacity for Q1', 'SI-2026-0040', 'Ravi Shankar', ME, 'ns', 9],
  ['0036', 'Share migration plan', 'SI-2026-0033', 'Daniel Tan', 'Daniel Tan', 'ns', 0, 'ACT-2026-0044'],
  ['0037', 'Negotiate payment terms', 'SI-2026-0025', 'Ahmed Al-Mansoori', 'Ahmed Al-Mansoori', 'ip', 2],
  ['0038', 'Get PO signed', 'SI-2026-0027', 'Ananya Reddy', 'Suresh Menon', 'ns', 3],
  ['0039', 'Legal review of the MSA', 'SI-2026-0024', 'Lakshmi Pillai', 'Vikram Iyer', 'ns', 6],
  ['0040', 'Finalise proposal pricing', 'SI-2026-0016', 'Neha Gupta', 'Ahmed Al-Mansoori', 'ns', 8],
  ['0041', 'Plan the migration workshop', 'SI-2026-0029', 'John Mathew', 'Karthik Menon', 'ns', null],
  ['0042', 'Collect reference letters', 'SI-2026-0022', 'Ahmed Al-Mansoori', 'Ahmed Al-Mansoori', 'ns', null],
  ['0005', 'Send revised commercial terms', 'SI-2026-0024', 'Vikram Iyer', 'Vikram Iyer', 'done', -6, 'ACT-2026-0021', -5],
  ['0009', 'Solution demo for security team', 'SI-2026-0032', 'John Mathew', 'Ananya Reddy', 'done', -10, null, -11],
  ['0011', 'Credit check', 'SI-2026-0028', 'Neha Gupta', 'Suresh Menon', 'done', -15, null, -14],
  ['0015', 'Scope workshop with CIO', 'SI-2026-0019', 'Mei Lin Wong', 'Mei Lin Wong', 'done', -20, 'ACT-2026-0005', -19],
  ['0017', 'Share capability deck', 'SI-2026-0040', ME, ME, 'done', -9, null, -9],
  ['0021', 'Contract review with legal', 'SI-2026-0021', 'Lakshmi Pillai', 'Daniel Tan', 'done', -4, null, -3],
  ['0003', 'Prepare demo environment', 'SI-2026-0011', 'Ravi Shankar', 'Omar Haddad', 'cxl', -18],
  ['0013', 'Arrange reference call', 'SI-2026-0029', 'Ahmed Al-Mansoori', 'Ananya Reddy', 'cxl', -10, 'ACT-2026-0025']
];
const TASK_STATUS = { ns: 'Not started', ip: 'In progress', done: 'Completed', cxl: 'Cancelled' };
const TASKS = TASK_ROWS.map(([n, title, si, to, by, st, due, act, doneIn]) => {
  const o = INITS.find(x => x.id === si) || {};
  const d = (k) => k == null ? null : new Date(TODAY.getTime() + k * 864e5).toISOString().slice(0, 10);
  return { id: 'TSK-2026-' + n, title, si: o.id || null, siName: o.name || '', acc: o.acc || '', to, by, status: st, due: d(due), act: act || null, done: d(doneIn) };
});
const taskOpen = (t) => t.status === 'ns' || t.status === 'ip';
const taskLate = (t) => taskOpen(t) && t.due && new Date(t.due) < TODAY; // §7.7: due date passed, not completed or cancelled

// ---- Accounts and contacts (CRM V1 customers): one account per company in INITS; contacts use the same
// generator as the record page's Contacts tab (initiative.html), so a person has the same name and role on both pages.
const _hash = (x) => { let h = 0; for (const c of x) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
const _pick = (arr, x) => arr[_hash(x) % arr.length];
const ACC_VERT = [[/Retail|Lotus|Al Noor/, 'Retail'], [/Health|Sundaram/, 'Healthcare'], [/Bank|Finance/, 'Banking'], [/Kaveri|Pharma/, 'Pharma'], [/Steel|Manufactur|Industrial/, 'Manufacturing'], [/Energy|Petro/, 'Energy'], [/Logistics/, 'Logistics'], [/Facilit/, 'Facilities']];
const HQ = { India: ['Mumbai', 'Bengaluru', 'Chennai', 'New Delhi'], 'Middle East': ['Dubai', 'Abu Dhabi', 'Riyadh', 'Muscat'], APAC: ['Singapore', 'Kuala Lumpur', 'Jakarta'] };
const STRATEGIC = ['ABC Bank', 'Desert Industrial Holdings', 'Lotus Retail India', 'Singapore Metro Bank'];
const ACCOUNTS = [...new Set(INITS.map(o => o.acc))].sort().map((name, i) => {
  const its = INITS.filter(o => o.acc === name), top = its.slice().sort((a, b) => b.value - a.value)[0];
  const geo = TEAMS[top.team].geo, won = its.filter(o => o.kind === 'won');
  const lastWon = won.map(o => o.close).sort().pop();
  const quiet = name === 'Gulf National Bank' ? 74 : 3 + _hash(name + 'i') % 58; // days since the last activity
  return {
    id: 'ACC-2026-' + String(i + 1).padStart(4, '0'), name, geo, hq: _pick(HQ[geo], name),
    type: /Bank|Finance|Retail|Pte|Ltd|Pharma|Logistics|Facilities/.test(name) && !/Gulf|Oman|Deccan/.test(name) ? 'Private' : /Oman|Gulf|Deccan/.test(name) ? 'Government' : 'PSU',
    vertical: (ACC_VERT.find(([re]) => re.test(name)) || [0, 'Enterprise'])[1],
    owner: top.owner, team: top.team, strategic: STRATEGIC.includes(name),
    lifecycle: won.length ? 'Customer' : 'Prospect',
    pipeline: its.filter(o => o.kind === 'open' && o.status === 'Opportunity').reduce((t, o) => t + o.value, 0),
    openAny: its.some(o => o.kind === 'open'),
    value: won.reduce((t, o) => t + o.value, 0),
    last: quiet, lastDate: new Date(TODAY.getTime() - quiet * 864e5).toISOString().slice(0, 10),
    draftOrder: !!(lastWon && (TODAY - new Date(lastWon)) / 864e5 <= 45), // recently won: the order is still a draft
    inits: its.map(o => o.id)
  };
});
ACCOUNTS.forEach(a => { a.attn = [a.draftOrder ? 'Won deal with a draft order · confirm the PO' : '', a.last > 60 ? `No interaction for ${a.last} days` : ''].filter(Boolean); });
const ROLES = ['Decision maker', 'Commercial contact', 'Technical evaluator', 'Influencer'];
const C_FIRST = ['Arjun', 'Meera', 'Rahul', 'Sara', 'Khalid', 'Lina', 'Wei Ling', 'Farah', 'Nikhil', 'Huda'], C_LAST = ['Patel', 'Nair', 'Kapoor', 'Haddad', 'Rahman', 'Chen', 'Salem', 'Menon', 'Al-Farsi', 'Lim'];
const CONTACTS = [];
ACCOUNTS.forEach(a => {
  const nm = (k) => `${_pick(C_FIRST, a.name + k)} ${_pick(C_LAST, k + a.name)}`;
  const dom = a.name.replace(/^Al /, '').split(' ')[0].toLowerCase() + '.example';
  const its = INITS.filter(o => o.acc === a.name);
  const ix = Math.max(...its.map(o => o.kind === 'open' ? (o.status === 'Prospect' ? 0 : o.status === 'Lead' ? 1 : { L3: 2, L2: 3, L1: 4 }[o.code]) : 4));
  const add = (n, title, dept, role, extra = {}) => { if (CONTACTS.some(c => c.acc === a.name && c.n === n)) return;
    CONTACTS.push({ id: 'CON-2026-' + String(CONTACTS.length + 1).padStart(4, '0'), n, title, dept, role, acc: a.name, accId: a.id,
      email: n.toLowerCase().replace(/[^a-z]+/g, '.') + '@' + dom, mobile: _hash(n + 'm') % 3 ? `+${a.geo === 'India' ? 91 : a.geo === 'APAC' ? 65 : 971} ${5 + _hash(n) % 4}${String(_hash(n + 'p')).slice(0, 3)} ${String(_hash(n + 'q')).slice(0, 4)}` : '', office: _hash(n + 'o') % 2 ? '' : 'Ext. ' + (2000 + _hash(n) % 800), status: 'Active', ...extra }); };
  if (a.name === 'Lotus Retail India') add('Arjun Patel', 'Head of data', 'IT', 'Decision maker');
  else if (ix === 0) add(nm('a'), _pick(['IT Manager', 'Head of operations'], a.name), _pick(['IT', 'Operations'], a.name), 'Influencer');
  else add(nm('a'), _pick(['CIO', 'CTO', 'Head of IT', 'CFO'], a.name), 'IT', 'Decision maker');
  if (ix >= 3) add(nm('b'), _pick(['Procurement lead', 'Finance controller'], a.name), _pick(['Procurement', 'Finance'], a.name), 'Influencer');
  add(nm('c'), _pick(['Head of infrastructure', 'Business relationship manager', 'Head of retail tech', 'VP operations'], a.name), 'Business', 'Commercial contact');
  if (_hash(a.name + 'd') % 2) add(nm('d'), _pick(['Head of security', 'Enterprise architect', 'IT manager'], a.name), 'IT', 'Technical evaluator');
});
// Decision makers who have left: their account now needs a new one
['Gulf National Bank', 'Oman Energy Corporation', 'Kaveri Pharma'].forEach(acc => { const c = CONTACTS.find(x => x.acc === acc && x.role === 'Decision maker'); if (c) c.status = 'Inactive'; });
// Contacts with a portrait in assets/people/contacts (AI-generated; the rest show initials until they are generated)
const CONTACT_PHOTOS = new Set(['CON-2026-0001', 'CON-2026-0002', 'CON-2026-0003', 'CON-2026-0004', 'CON-2026-0005', 'CON-2026-0006', 'CON-2026-0007', 'CON-2026-0008', 'CON-2026-0009', 'CON-2026-0010', 'CON-2026-0011', 'CON-2026-0012', 'CON-2026-0013', 'CON-2026-0014', 'CON-2026-0015', 'CON-2026-0016', 'CON-2026-0017', 'CON-2026-0018', 'CON-2026-0019', 'CON-2026-0021', 'CON-2026-0022', 'CON-2026-0023', 'CON-2026-0024', 'CON-2026-0026', 'CON-2026-0028', 'CON-2026-0039']);
const hasDM = (acc) => CONTACTS.some(c => c.acc === acc && c.role === 'Decision maker' && c.status === 'Active');
function ageBucket(d) { return d <= 30 ? 0 : d <= 60 ? 1 : d <= 90 ? 2 : 3; }
const AGE_NAMES = ['0–30 days', '31–60 days', '61–90 days', 'Over 90 days'];
// Needs attention = CRMpulse initiatives.attention_flags: no next step, expected close passed,
// more than 30 days in the stage, open more than 90 days (open records only)
function attention(o) {
  if (o.kind && o.kind !== 'open') return [];
  const r = [], open = openDays(o);
  if (!o.next) r.push('No next step');
  if (o.close && new Date(o.close) < TODAY) r.push('Close date passed');
  if (o.days > 30) r.push(`${o.days} days in ${o.code || 'stage'}`);
  if (open > 90) r.push(`Open ${open} days`);
  return r;
}
// Record facts shared by the Sales initiatives list (filters, sort) and the record page (initiative.html details())
const _DAY = 864e5;
function createdOf(o) {
  if (o.id === 'SI-2026-0024') return new Date('2026-07-06');
  return o.kind === 'open' || !o.kind ? new Date(TODAY.getTime() - (o.open || (o.days || 10) + 12) * _DAY) : new Date(new Date(o.close).getTime() - (80 + _hash(o.id) % 70) * _DAY);
}
function openDays(o) { return Math.round((TODAY - createdOf(o)) / _DAY); }
function recMeta(o) {
  const lotus = o.id === 'SI-2026-0024', existing = INITS.some(x => x.acc === o.acc && x.id !== o.id && x.kind === 'won');
  const firstOfGroup = [PRE_STAGES.Prospect[0], PRE_STAGES.Lead[0], STAGES[0].name].includes(o.sub);
  const created = createdOf(o);
  return {
    leadType: lotus || existing ? 'Existing account new lead' : 'New account new lead',
    source: lotus ? 'Event / conference' : _pick(['Event / conference', 'Referral', 'Website', 'Partner', 'Outbound'], o.id),
    category: lotus ? 'New customer – new business' : existing ? 'Existing customer – new business' : 'New customer – new business',
    // last stage change: the date the current stage was entered (record page "Last modified")
    updated: lotus ? '2026-10-29' : o.kind !== 'open' ? o.close : (firstOfGroup ? created : new Date(TODAY.getTime() - o.days * _DAY)).toISOString().slice(0, 10)
  };
}
const fmtDate = (d) => CRM.date(d); // "18 Nov 2026", shared with the date picker (crm.js)
const pct = (a, b) => b ? Math.round(a / b * 100) : null;
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));


// ---- Sales targets by dimension (CRM V1 §10): each dimension is planned on its own; targets are never added
// across dimensions. Geography and salesperson use the targets the dashboards already use (GEO_TARGET,
// PERSON_TARGET); the other dimensions split the company target by each value's share of FY26-27 won + open
// opportunity value, rounded to $50K. Quarterly target = annual ÷ 4, as on Sales performance.
const SALES_REGION = { India: ['India North', 'India West', 'India South'], 'Middle East': ['UAE', 'KSA', 'Oman'], APAC: ['Singapore', 'Malaysia', 'Indonesia'] };
function sellOf(o) { // same rules as the record page (initiative.html selling())
  const off = o.name.split(' – ').slice(1).join(' – ') || o.name, m = (re) => re.test(off);
  const sbu = m(/ERP|SAP|Application|POS|Portal|App/) ? 'Enterprise applications' : m(/Cloud|Infrastructure|Network|Recovery|Service Desk/) ? 'Cloud & infrastructure' : m(/Identity|Security|Fraud/) ? 'Cybersecurity' : 'Data & AI';
  const practice = { 'Enterprise applications': 'Application services', 'Cloud & infrastructure': 'Cloud services', 'Cybersecurity': 'Security services', 'Data & AI': 'Data services' }[sbu];
  const tech = m(/ERP|SAP/) ? 'SAP' : m(/Cloud|Recovery/) ? 'AWS' : m(/Identity/) ? 'Okta' : m(/GenAI/) ? 'Azure OpenAI' : m(/Data|Analytics|Warehouse|Lake/) ? 'Databricks' : m(/Infrastructure|Network/) ? 'VMware' : m(/Support|Service Desk/) ? 'ServiceNow' : 'Other';
  const geo = TEAMS[o.team].geo;
  return { geography: geo, region: o.acc === 'Lotus Retail India' ? 'India North' : _pick(SALES_REGION[geo], o.acc), salesperson: o.owner,
    sbu, practice, offering: off, technology: tech, vertical: (ACC_VERT.find(([re]) => re.test(o.acc)) || [0, 'Enterprise'])[1] };
}
const TARGET_DIMS = [['geography', 'Geography'], ['region', 'Region'], ['salesperson', 'Salesperson'], ['sbu', 'SBU'], ['practice', 'Practice / service line'], ['offering', 'Offering'], ['technology', 'Technology'], ['vertical', 'Vertical']];
function targetRows(dim, fy = '2627') {
  const won = INITS.filter(o => o.kind === 'won' && o.fy === fy), open = INITS.filter(o => o.kind === 'open' && o.status === 'Opportunity');
  const vals = [...new Set([...won, ...open].map(o => sellOf(o)[dim]))];
  if (dim === 'geography') vals.splice(0, vals.length, ...Object.keys(GEO_TARGET));
  if (dim === 'salesperson') Object.keys(PERSON_TARGET).forEach(p => { if (!vals.includes(p)) vals.push(p); });
  const weight = (v) => [...won, ...open].filter(o => sellOf(o)[dim] === v).reduce((t, o) => t + o.value, 0);
  const total = vals.reduce((t, v) => t + weight(v), 0) || 1;
  const r50 = (x) => Math.max(0.2e6, Math.round(x / 0.05e6) * 0.05e6);
  return vals.map(v => {
    let annual = dim === 'geography' ? GEO_TARGET[v] : dim === 'salesperson' ? (PERSON_TARGET[v] ?? null)
      : dim === 'region' ? r50(GEO_TARGET[SALES_REGION_GEO[v]] * weight(v) / ([...won, ...open].filter(o => sellOf(o).geography === SALES_REGION_GEO[v]).reduce((t, o) => t + o.value, 0) || 1))
      : r50(COMPANY_TARGET * weight(v) / total);
    if (fy !== '2627' && annual) annual = Math.round(annual * 1.15 / 0.05e6) * 0.05e6; // next FY plan: +15%
    const ach = [1, 2, 3, 4].map(q => won.filter(o => o.q === q && sellOf(o)[dim] === v).reduce((t, o) => t + o.value, 0));
    return { name: v, annual, q: annual == null ? [null, null, null, null] : [0, 1, 2, 3].map(() => annual / 4), ach };
  }).sort((a, b) => (b.annual || 0) - (a.annual || 0) || a.name.localeCompare(b.name));
}
const SALES_REGION_GEO = Object.fromEntries(Object.entries(SALES_REGION).flatMap(([g, rs]) => rs.map(r => [r, g])));


// ---- Activities (CRM V1 §6): every call, meeting, visit and email, logged against an account or a sales initiative.
// Types and purposes are the configured lists from CRMpulse (sentence case). Activities that tasks point to
// (TASKS[].act) exist with the same account and initiative; the rest are spread over the last ~90 days.
const ACT_TYPES = ['Customer / prospect visit', 'Phone call', 'Virtual meeting', 'Email', 'Messaging', 'Internal meeting', 'Event / conference', 'Other'];
const ACT_PURPOSES = ['Introduction', 'Discovery / requirements', 'Solution presentation', 'Proposal discussion', 'Negotiation', 'Relationship building', 'Follow-up', 'Internal review'];
const ACT_SUBJECT = { 'Customer / prospect visit': 'Visit with', 'Phone call': 'Call with', 'Virtual meeting': 'Online meeting with', 'Email': 'Email with', 'Messaging': 'Messages with', 'Internal meeting': 'Internal meeting about', 'Event / conference': 'Met at an event:', 'Other': 'Note on' };
const ACTIVITIES = (() => {
  const out = [], used = new Set();
  const at = (days, hour) => { const d = new Date(TODAY.getTime() - days * 864e5); return `${d.toISOString().slice(0, 10)}T${String(hour).padStart(2, '0')}:00`; }; // local wall-clock time
  const contactAt = (acc, k) => { const cs = CONTACTS.filter(c => c.acc === acc && c.status === 'Active'); return cs.length ? cs[_hash(acc + k) % cs.length].n : null; };
  const add = (id, o, acc, days, hour, k, note) => {
    if (used.has(id)) return; used.add(id);
    const type = ACT_TYPES[_hash(id + k) % 7], purpose = ACT_PURPOSES[_hash(k + id) % 8], who = contactAt(acc, k);
    const owner = o ? o.owner : (ACCOUNTS.find(a => a.name === acc) || {}).owner;
    out.push({ id, d: at(days, hour), type, purpose, acc, si: o ? o.id : null, siName: o ? o.name : '', owner, who: who ? [who] : [],
      t: `${ACT_SUBJECT[type]} ${who || acc}`, note: note || 'Discussed scope, timelines and next steps.' });
  };
  // the ones tasks were created from
  TASKS.filter(t => t.act).forEach(t => { const o = INITS.find(x => x.id === t.si);
    const before = t.due ? Math.max(1, Math.round((TODAY - new Date(t.due)) / 864e5) + 3) : 5;
    add(t.act, o, t.acc, Math.max(1, before), 10 + _hash(t.act) % 6, 'task'); });
  // Lotus – ERP Upgrade keeps the two activities CRMpulse shows on its record
  const lotus = INITS.find(o => o.id === 'SI-2026-0024');
  const l1 = out.find(a => a.id === 'ACT-2026-0021'); if (l1) Object.assign(l1, { d: '2026-11-10T17:24', type: 'Messaging', purpose: 'Relationship building', who: [], t: 'Messages with Lotus Retail India – relationship building', note: '' });
  out.push({ id: 'ACT-2026-0014', d: '2026-07-11T16:00', type: 'Event / conference', purpose: 'Follow-up', acc: lotus.acc, si: lotus.id, siName: lotus.name, owner: lotus.owner, who: ['Arjun Patel'], t: 'Follow-up – Lotus Retail India', note: 'Discussed scope, timelines and next steps.' }); used.add('ACT-2026-0014');
  // the rest: open initiatives and some account-only touches
  let n = 1;
  const next = () => { while (used.has('ACT-2026-' + String(n).padStart(4, '0'))) n++; return 'ACT-2026-' + String(n++).padStart(4, '0'); };
  INITS.filter(o => o.kind === 'open').forEach((o, i) => {
    add(next(), o, o.acc, 1 + _hash(o.id) % 40, 9 + _hash(o.id + 'h') % 8, 'a');
    if (i % 2 === 0) add(next(), o, o.acc, 35 + _hash(o.id + 'b') % 50, 9 + _hash(o.id + 'g') % 8, 'b');
  });
  ACCOUNTS.filter((a, i) => i % 3 === 0).forEach(a => add(next(), null, a.name, Math.min(a.last, 88), 11 + _hash(a.name) % 5, 'acc'));
  return out.sort((a, b) => b.d.localeCompare(a.d));
})();
const actTasks = (id) => TASKS.filter(t => t.act === id).length;
// Last interaction on Accounts = the latest activity for that account, so Accounts and Activities agree
ACCOUNTS.forEach(a => {
  const last = ACTIVITIES.filter(x => x.acc === a.name).map(x => x.d.slice(0, 10)).sort().pop();
  if (last) { a.lastDate = last; a.last = Math.round((TODAY - new Date(last)) / 864e5); }
  a.attn = [a.draftOrder ? 'Won deal with a draft order · confirm the PO' : '', a.last > 60 ? `No interaction for ${a.last} days` : ''].filter(Boolean);
});
