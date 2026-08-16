export type GoldenRow = {
  label: string;
  value: string;
  updated: string;
};

export const goldenRecord: GoldenRow[] = [
  { label: "Faculty count", value: "84", updated: "2 days ago" },
  { label: "Laboratories", value: "12", updated: "6 days ago" },
  { label: "Library capacity", value: "400 seats", updated: "3 weeks ago" },
  { label: "Sanctioned intake", value: "540 students", updated: "1 month ago" },
  { label: "Built-up area", value: "18,240 sq.m", updated: "4 months ago" },
  { label: "Fire safety certificate", value: "Expired Mar 2025", updated: "Today" },
];

export type College = {
  id: string;
  name: string;
  city: string;
  course: string;
  intake: string;
  status: "approved" | "conditional";
  since: string;
  accreditation: string;
  history: { year: string; state: "ok" | "warn"; note?: string }[];
};

export const colleges: College[] = [
  {
    id: "vjti",
    name: "Veermata Jijabai Technical Institute",
    city: "Mumbai, Maharashtra",
    course: "B.Tech Computer Engineering",
    intake: "2026–27",
    status: "approved",
    since: "1887",
    accreditation: "NBA Tier-I, NAAC A++",
    history: [
      { year: "2024", state: "ok" },
      { year: "2025", state: "ok" },
      { year: "2026", state: "ok" },
    ],
  },
  {
    id: "srec",
    name: "Sri Ramakrishna Engineering College",
    city: "Coimbatore, Tamil Nadu",
    course: "B.E. Mechanical Engineering",
    intake: "2026–27",
    status: "approved",
    since: "1994",
    accreditation: "NBA Tier-I, NAAC A",
    history: [
      { year: "2024", state: "ok" },
      { year: "2025", state: "warn", note: "Renewed late — lab certificate filed in August." },
      { year: "2026", state: "ok" },
    ],
  },
  {
    id: "gnit",
    name: "Guru Nanak Institute of Technology",
    city: "Hyderabad, Telangana",
    course: "B.Tech Electronics & Communication",
    intake: "2026–27",
    status: "approved",
    since: "2001",
    accreditation: "NBA Tier-II, NAAC A",
    history: [
      { year: "2024", state: "ok" },
      { year: "2025", state: "ok" },
      { year: "2026", state: "ok" },
    ],
  },
  {
    id: "biet",
    name: "Bhilai Institute of Engineering & Technology",
    city: "Durg, Chhattisgarh",
    course: "B.Tech Civil Engineering",
    intake: "2026–27",
    status: "conditional",
    since: "1986",
    accreditation: "NBA Tier-II, NAAC B++",
    history: [
      { year: "2024", state: "ok" },
      { year: "2025", state: "ok" },
      { year: "2026", state: "warn", note: "Intake reduced by 30 seats pending faculty hiring." },
    ],
  },
  {
    id: "kiit",
    name: "Kalinga Institute of Industrial Technology",
    city: "Bhubaneswar, Odisha",
    course: "B.Tech Information Technology",
    intake: "2026–27",
    status: "approved",
    since: "1997",
    accreditation: "NBA Tier-I, NAAC A++",
    history: [
      { year: "2024", state: "ok" },
      { year: "2025", state: "ok" },
      { year: "2026", state: "ok" },
    ],
  },
];

export type Application = {
  id: string;
  institution: string;
  specialization: string;
  region: string;
  daysLeft: number;
  discrepancy?: string;
};

export const applications: Application[] = [
  {
    id: "APP-2291",
    institution: "Bhilai Institute of Engineering & Technology",
    specialization: "Civil Engineering",
    region: "East Zone",
    daysLeft: 4,
    discrepancy: "Intake number doesn't match AISHE record",
  },
  {
    id: "APP-2288",
    institution: "Sri Ramakrishna Engineering College",
    specialization: "Mechanical Engineering",
    region: "South Zone",
    daysLeft: 9,
  },
  {
    id: "APP-2284",
    institution: "Guru Nanak Institute of Technology",
    specialization: "Electronics & Communication",
    region: "South Zone",
    daysLeft: 12,
  },
  {
    id: "APP-2279",
    institution: "Kalinga Institute of Industrial Technology",
    specialization: "Information Technology",
    region: "East Zone",
    daysLeft: 15,
  },
];

export type Evaluator = {
  id: string;
  name: string;
  affiliation: string;
  match: number;
  distanceKm: number;
  workload: number;
  available: string;
};

export const evaluatorsByApp: Record<string, Evaluator[]> = {
  "APP-2291": [
    { id: "e1", name: "Dr. Anjali Deshmukh", affiliation: "NIT Raipur", match: 92, distanceKm: 38, workload: 2, available: "18 Aug" },
    { id: "e2", name: "Prof. S. Venkataraman", affiliation: "IIT Bhubaneswar", match: 84, distanceKm: 260, workload: 1, available: "21 Aug" },
    { id: "e3", name: "Dr. Meera Nair", affiliation: "VNIT Nagpur", match: 76, distanceKm: 310, workload: 3, available: "29 Aug" },
  ],
  "APP-2288": [
    { id: "e4", name: "Dr. Karthik Subramanian", affiliation: "Anna University", match: 95, distanceKm: 42, workload: 1, available: "17 Aug" },
    { id: "e5", name: "Prof. R. Balaji", affiliation: "PSG Tech", match: 88, distanceKm: 12, workload: 3, available: "26 Aug" },
    { id: "e6", name: "Dr. Fatima Sheikh", affiliation: "NIT Trichy", match: 71, distanceKm: 190, workload: 2, available: "24 Aug" },
  ],
  "APP-2284": [
    { id: "e7", name: "Dr. Priya Ranganathan", affiliation: "IIIT Hyderabad", match: 90, distanceKm: 9, workload: 2, available: "19 Aug" },
    { id: "e8", name: "Prof. Arvind Kulkarni", affiliation: "COEP Pune", match: 79, distanceKm: 560, workload: 1, available: "23 Aug" },
    { id: "e9", name: "Dr. Nikhil Rao", affiliation: "NIT Warangal", match: 74, distanceKm: 145, workload: 4, available: "2 Sep" },
  ],
  "APP-2279": [
    { id: "e10", name: "Dr. Sumitra Behera", affiliation: "NIT Rourkela", match: 93, distanceKm: 310, workload: 1, available: "16 Aug" },
    { id: "e11", name: "Prof. Debashish Mohanty", affiliation: "IIIT Bhubaneswar", match: 86, distanceKm: 6, workload: 3, available: "27 Aug" },
    { id: "e12", name: "Dr. Ritu Agarwal", affiliation: "IIT Kharagpur", match: 80, distanceKm: 380, workload: 2, available: "20 Aug" },
  ],
};

export const spring = { type: "spring" as const, stiffness: 300, damping: 30 };

/* ── AI pre-scrutiny, journey and officer intelligence ─────────────────── */

export type Tone = "ok" | "warn" | "risk" | "neutral";

export const readiness = {
  score: 86,
  verdict: "Good to proceed",
  note: "Three findings should be reviewed before submission.",
  metrics: [
    { label: "Document completeness", value: 92 },
    { label: "Compliance indicators", value: 84 },
    { label: "Data consistency", value: 91 },
  ],
};

export const journey = [
  { label: "Submitted", meta: "Aug 11", state: "done" as const },
  { label: "AI verification", meta: "Completed", state: "done" as const },
  { label: "Scrutiny", meta: "Current stage", state: "current" as const },
  { label: "Evaluator assignment", meta: "Pending", state: "todo" as const },
  { label: "Final decision", meta: "Pending", state: "todo" as const },
];

export type Finding = {
  id: string;
  tone: Tone;
  title: string;
  detail: string;
  why: string;
  confidence: string;
};

export const findings: Finding[] = [
  {
    id: "f1",
    tone: "risk",
    title: "Faculty count mismatch",
    detail: "Application says 25 · Declaration lists 23",
    why: "The extracted faculty count was compared across the application form and the signed declaration. A difference of two records was detected.",
    confidence: "94%",
  },
  {
    id: "f2",
    tone: "warn",
    title: "Infrastructure needs review",
    detail: "Submitted lab dimensions differ from the visual estimate",
    why: "Vision analysis of the uploaded laboratory photograph estimated ~1,080 sq.ft against a submitted 1,200 sq.ft.",
    confidence: "89%",
  },
  {
    id: "f3",
    tone: "risk",
    title: "Faculty declaration missing",
    detail: "The latest signed declaration is not in this submission",
    why: "The mandatory document checklist for a new-institution application expects a signed faculty declaration dated within 90 days.",
    confidence: "100%",
  },
];

export const visionMetrics = [
  { label: "Submitted area", value: "1,200 sq.ft", tone: "neutral" as Tone },
  { label: "AI estimated area", value: "≈ 1,080 sq.ft", tone: "warn" as Tone },
  { label: "Submitted equipment", value: "45 computers", tone: "neutral" as Tone },
  { label: "Detected equipment", value: "42 computers", tone: "warn" as Tone },
  { label: "AI confidence", value: "89%", tone: "neutral" as Tone },
];

export const trackingEvents = [
  { title: "Application submitted", meta: "Aug 11 · Completed", state: "done" as const },
  { title: "AI preliminary verification", meta: "Aug 11 · Completed", state: "done" as const },
  { title: "Document scrutiny", meta: "Aug 12 · Current stage", state: "current" as const },
  { title: "Evaluator assignment", meta: "Pending", state: "todo" as const },
  { title: "Infrastructure inspection", meta: "Pending", state: "todo" as const },
  { title: "Final decision", meta: "Pending", state: "todo" as const },
];

export const officerStats = [
  { label: "Total applications", value: "1,248", delta: "This cycle", tone: "neutral" as Tone },
  { label: "Pending scrutiny", value: "326", delta: "Needs attention", tone: "warn" as Tone },
  { label: "AI flagged", value: "48", delta: "Requires review", tone: "risk" as Tone },
  { label: "Avg. processing", value: "14.2d", delta: "↓ 18% predicted", tone: "ok" as Tone },
];

export const bottlenecks = [
  { label: "Infrastructure verification", value: "High", tone: "risk" as Tone },
  { label: "Document scrutiny", value: "Medium", tone: "warn" as Tone },
  { label: "Evaluator capacity", value: "Healthy", tone: "ok" as Tone },
];

export const bottleneckAdvice =
  "Allocating four more evaluators to infrastructure verification is predicted to cut delay by ~4 days.";

export const appRisk: Record<string, { risk: number; compliance: number }> = {
  "APP-2291": { risk: 72, compliance: 61 },
  "APP-2288": { risk: 31, compliance: 86 },
  "APP-2284": { risk: 18, compliance: 94 },
  "APP-2279": { risk: 24, compliance: 88 },
};

/* ── Dashboard: workflow, charts, activity ─────────────────────────────── */

export type StageState = "done" | "current" | "todo";

export type WorkflowStage = {
  id: string;
  label: string;
  meta: string;
  state: StageState;
  detail: string;
};

/** The end-to-end approval workflow, from registration to decision. */
export const workflow: WorkflowStage[] = [
  {
    id: "w1",
    label: "Register & select application",
    meta: "Aug 04",
    state: "done",
    detail: "Institution profile verified against AISHE. Application type: extension of approval.",
  },
  {
    id: "w2",
    label: "Fill application",
    meta: "Aug 07",
    state: "done",
    detail: "38 of 38 mandatory fields completed. Golden Record auto-filled 26 of them.",
  },
  {
    id: "w3",
    label: "Upload documents",
    meta: "Aug 09",
    state: "done",
    detail: "14 documents uploaded. OCR extracted text from 14 of 14.",
  },
  {
    id: "w4",
    label: "AI pre-audit",
    meta: "OCR · missing docs · compliance · consistency",
    state: "done",
    detail: "3 findings raised. 1 document missing, 1 mismatch, 1 infrastructure variance.",
  },
  {
    id: "w5",
    label: "Fix & re-upload",
    meta: "1 item open",
    state: "current",
    detail: "Faculty declaration still pending. Re-upload reruns the pre-audit automatically.",
  },
  {
    id: "w6",
    label: "Infrastructure AI verification",
    meta: "Queued",
    state: "todo",
    detail: "Vision analysis of lab, library and built-up area photographs against submitted values.",
  },
  {
    id: "w7",
    label: "Final submission",
    meta: "Pending",
    state: "todo",
    detail: "Locks the record and sends it to AICTE preliminary screening.",
  },
  {
    id: "w8",
    label: "AICTE preliminary screening",
    meta: "Pending",
    state: "todo",
    detail: "Officer-side triage using AI risk and compliance scores.",
  },
  {
    id: "w9",
    label: "Smart evaluator matching",
    meta: "Pending",
    state: "todo",
    detail: "Ranked by specialisation match, travel radius, workload and availability.",
  },
  {
    id: "w10",
    label: "Human evaluator visit",
    meta: "Pending",
    state: "todo",
    detail: "Physical verification always stays with the evaluator. AI only prepares the ground.",
  },
  {
    id: "w11",
    label: "AI-assisted report",
    meta: "Pending",
    state: "todo",
    detail: "Report drafted from evaluator notes; branches to correction or final review.",
  },
  {
    id: "w12",
    label: "AICTE decision",
    meta: "Approved · Correction · Rejected",
    state: "todo",
    detail: "Three outcomes. Corrections return to the institution with plain-language reasons.",
  },
];

export const decisionSplit = [
  { label: "Approved", value: 68, tone: "ok" as Tone },
  { label: "Correction", value: 24, tone: "warn" as Tone },
  { label: "Rejected", value: 8, tone: "risk" as Tone },
];

/** Readiness score trend across the current application cycle. */
export const readinessTrend = [
  { week: "W1", score: 42, findings: 11 },
  { week: "W2", score: 51, findings: 9 },
  { week: "W3", score: 58, findings: 8 },
  { week: "W4", score: 67, findings: 6 },
  { week: "W5", score: 74, findings: 5 },
  { week: "W6", score: 81, findings: 4 },
  { week: "W7", score: 86, findings: 3 },
];

export const stageLoad = [
  { stage: "Screening", count: 412 },
  { stage: "Scrutiny", count: 326 },
  { stage: "Matching", count: 214 },
  { stage: "Visit", count: 168 },
  { stage: "Decision", count: 128 },
];

export const processingTrend = [
  { month: "Mar", days: 22.4 },
  { month: "Apr", days: 21.1 },
  { month: "May", days: 19.6 },
  { month: "Jun", days: 17.8 },
  { month: "Jul", days: 16.1 },
  { month: "Aug", days: 14.2 },
];

export const coordinatorStats = [
  { label: "Application readiness", value: "86%", delta: "↑ 12 this week", tone: "ok" as Tone },
  { label: "Open findings", value: "3", delta: "1 blocking", tone: "warn" as Tone },
  { label: "Documents verified", value: "14/15", delta: "OCR complete", tone: "neutral" as Tone },
  { label: "Days to deadline", value: "26", delta: "Cycle 2026–27", tone: "neutral" as Tone },
];

export const activity = [
  { title: "Lab certificate re-read by OCR", meta: "12 min ago", tone: "neutral" as Tone },
  { title: "NAAC flagged an expiry in 12 days", meta: "1 hour ago", tone: "warn" as Tone },
  { title: "Faculty list matched across all three bodies", meta: "Yesterday", tone: "ok" as Tone },
  { title: "Fire safety certificate marked expired", meta: "2 days ago", tone: "risk" as Tone },
];
