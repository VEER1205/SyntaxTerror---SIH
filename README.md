# 🛡️ SAARTHI — AICTE Technical Education Approval & Compliance Portal

> **Smart India Hackathon (SIH) Prototype**  
> *Connecting Institutions, AI Pre-Scrutiny, Visiting Committees, and Public Records into One Unified National Desk.*

---

## 📌 Problem Statement

Technical educational institutions across India currently undergo lengthy, multi-step annual approval cycles for new courses, intake variations, and extension of approvals (EoA). Key challenges faced by the regulatory ecosystem include:

1. **Redundant Regulatory Submissions**: Institutions repeatedly submit duplicate physical and digital proofs to **AICTE**, **NBA**, and **NAAC**.
2. **Manual Document Scrutiny Bottlenecks**: Processing officers spend hundreds of manual hours catching missing faculty declarations, land use seal discrepancies, or building safety certificate variances.
3. **Sub-optimal Visiting Committee Assignment**: Deploying expert evaluators to institutional campuses often lacks automated domain matching and geographic travel radius optimization.
4. **Lack of Public Verification**: Students and parents lack an instant, tamper-proof portal to verify whether an engineering or technical course is approved with its exact sanctioned intake.

---

## 🚀 The Saarthi Solution

**Saarthi** (*derived from "guide / navigator"*) bridges institutions, AI pre-scrutiny engines, processing officers, visiting evaluators, and the public into a single transparent approval ecosystem.

```
       ┌───────────────────────────────────────────────────────────┐
       │                 INSTITUTION REGISTRATION                  │
       └─────────────────────────────┬─────────────────────────────┘
                                     │
                                     ▼
       ┌───────────────────────────────────────────────────────────┐
       │             GOLDEN RECORD COMPLIANCE VAULT                │
       │           (One proof for AICTE, NBA & NAAC)               │
       └─────────────────────────────┬─────────────────────────────┘
                                     │
                                     ▼
       ┌───────────────────────────────────────────────────────────┐
       │              AUTOMATED AI PRE-SCRUTINY ENGINE             │
       │          (OCR & Computer Vision Defect Detection)         │
       └─────────────────────────────┬─────────────────────────────┘
                                     │
                                     ▼
       ┌───────────────────────────────────────────────────────────┐
       │            SMART EVALUATOR MATCHING & VISIT               │
       │       (Domain Fit + Geographic Radius Optimization)       │
       └─────────────────────────────┬─────────────────────────────┘
                                     │
                                     ▼
       ┌───────────────────────────────────────────────────────────┐
       │            STATUTORY APPROVAL & PUBLIC GIS RECORD         │
       └───────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features & User Desks

### 🏢 1. Institution Coordinator Workspace (`/dashboard`, `/vault`, `/scrutiny`)
- **Readiness Score Ring**: Live application readiness percentage calculated from checklist completion, land norms, faculty ratio, and lab infrastructure.
- **✦ AI Next-Best-Action**: Intelligent recommendation card advising the coordinator on high-impact steps (e.g., *"Upload signed faculty declaration to gain +12% readiness"*).
- **Golden Record Vault**: Master repository for land use certificates, occupancy proofs, and building safety plans hashed with SHA-256 integrity.
- **AI Pre-Scrutiny Audit Inspector**: Automated document OCR scanner flagging signature mismatches, expired safety seals, or building floor plan variances prior to formal submission.

### ⚖️ 2. AICTE Officer Control Desk (`/control`, `/evaluators`)
- **Regional Processing Analytics**: Live monitoring of incoming applications across Zonal desks (East, South, North, West).
- **Turnaround & Risk Triage**: Application categorization by risk level (*High Risk*, *Needs Review*, *Verified*) to prioritize officer workload.
- **Smart Evaluator Matcher**: AI algorithm ranking visiting committee experts based on:
  - Subject Matter Expertise (e.g., Civil Engg, Robotics, Computer Science)
  - Workload balance & availability dates
  - Geographic travel distance (km radius optimization)

### 🌐 3. Public Verification & GIS Map (`/verify`, `/map`)
- **Public Course Authenticity Lookup**: Search any approved technical college in India by institution name, city, or course. View verified intake capacity and approval cycle history.
- **Interactive GIS Map**: Leaflet-powered national GIS map visualizing approved institutions, conditional approvals, and regional density.

---

## 🎨 Visual Identity & Layered Design System

Saarthi uses a custom **Modern Institutional Emerald** design system tailored for government/education SaaS products:

- **Primary Emerald**: `#087F5B` (Brand identity, active navigation, key CTAs)
- **Dark Emerald**: `#075A43` (Hover states & dark accents)
- **Soft Green Surface**: `#EAF5F1` (Selected states & active pills)
- **Secondary Surface**: `#F1F6F3` (Section backgrounds)
- **App Canvas**: `#F7F8F6` (Warm off-white background eliminating plain flat white)
- **Card Container**: `#FFFFFF` with `#E2E6E3` subtle borders and `shadow-sm`

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Framework** | React 19, TanStack Start (`@tanstack/react-start`), Vite 8 |
| **Styling** | Tailwind CSS v4 with custom `@theme inline` design tokens |
| **Animations** | Motion (`framer-motion`), Tailwind Animate CSS |
| **Charts & GIS** | Recharts, Leaflet GIS (`react-leaflet` / `leaflet`) |
| **Icons & UI** | Lucide React, Radix UI Primitives, Sonner Toasts |
| **Language** | TypeScript |

---

## 📁 Repository Structure

```
SyntaxTerror---SIH/
├── Frontend/
│   ├── public/
│   │   ├── favicon.png         # Official AICTE emblem favicon
│   │   └── aicte-logo.png      # AICTE emblem asset
│   ├── src/
│   │   ├── components/
│   │   │   ├── setu/
│   │   │   │   ├── saarthi-logo.tsx     # Official Saarthi emblem & header component
│   │   │   │   ├── network-visual.tsx   # 3-Column Saarthi Approval Network visualizer
│   │   │   │   ├── dashboard-shell.tsx  # Unified application sidebar & topbar layout
│   │   │   │   ├── primitives.tsx       # StatTile, ScoreRing, TonePill, AiRecommendationCard
│   │   │   │   └── workflow-map.tsx     # 12-Stage approval pipeline visualizer
│   │   │   └── ui/                     # Radix UI primitives & buttons
│   │   ├── lib/
│   │   │   ├── setu-data.ts            # Prototype dataset & mock records
│   │   │   └── auth.ts                 # Role authentication helper (Coordinator, Officer, Student)
│   │   ├── routes/
│   │   │   ├── index.tsx               # Landing Page & Hero Network Visualizer
│   │   │   ├── login.tsx               # Role Selection & Login Desk
│   │   │   ├── dashboard.tsx           # Institution Coordinator Dashboard
│   │   │   ├── vault.tsx               # Golden Record Compliance Vault
│   │   │   ├── scrutiny.tsx            # AI Pre-Scrutiny & OCR Inspection
│   │   │   ├── control.tsx             # AICTE Officer Control Desk
│   │   │   ├── evaluators.tsx          # Smart Evaluator Matching
│   │   │   ├── verify.tsx              # Public Course Verification
│   │   │   └── map.tsx                 # Interactive Institution GIS Map
│   │   └── styles.css                  # Design tokens, surface hierarchy & network animations
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## ⚡ Quickstart Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Installation
Clone the repository and install frontend dependencies:
```bash
git clone https://github.com/VEER1205/SyntaxTerror---SIH.git
cd SyntaxTerror---SIH/Frontend
npm install
```

### 2. Run Locally (Dev Server)
Start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:8080/  (or http://localhost:8084/)
```

### 3. Demo Credentials

| Role | Desk | Username | Password |
| :--- | :--- | :--- | :--- |
| **Institution Coordinator** | `/dashboard` | `institution` | `institution123` |
| **AICTE Officer** | `/control` | `officer` | `officer123` |
| **Student / Public** | `/verify` / `/map` | `student` | `student123` |

---

## 🏗️ Production Build

To build the production bundle:
```bash
cd Frontend
npm run build
```
The output will be generated in `.output/public` and `.output/server`.

---

## 🗺️ Future Roadmap & Extensions

1. **DigiLocker & Aadhaar e-Sign API Integration**: Direct retrieval of land titles and university affiliation letters directly from government vaults.
2. **AICTE Approval Handbook LLM Fine-Tuning**: Natural language Q&A interface allowing institution administrators to query complex Approval Process Handbook clauses.
3. **Live Evaluator Geofencing**: Mobile GPS check-in during visiting committee campus inspections.
4. **Blockchain Audit Ledger**: Storing final approval certificates on an immutable blockchain ledger for tamper-proof verification.

---

## 📜 License & Credits

Built for **Smart India Hackathon (SIH)** by Team **SyntaxTerror**.  
All India Council for Technical Education (AICTE), Ministry of Education, Government of India.
