# Setu / AICTE Prototype

This version preserves the existing Setu workflow and adds two prototype capabilities:

1. Role-based React login for the existing Institution Coordinator, AICTE Processing Officer, and Student/Public personas.
2. Public Institution Approval Map showing institution approval status, course, approval cycle, and AI readiness score.

## Demo accounts

- Institution Coordinator: `institution` / `institution123`
- AICTE Processing Officer: `officer` / `officer123`
- Student/Public: `student` / `student123`

## Routes

- `/` existing Setu landing page
- `/login` new role-based login
- `/dashboard` institution coordinator dashboard
- `/vault` compliance vault
- `/scrutiny` AI pre-scrutiny
- `/control` officer control desk
- `/evaluators` evaluator matching
- `/verify` public course verification
- `/map` public institution approval map

## Run

```bash
npm install
npm run dev
```

The map uses React + Leaflet and OpenStreetMap tiles. Internet access is required for the live basemap. The institution records are prototype data stored in `src/lib/setu-data.ts` and can later be replaced by the existing FastAPI/MongoDB endpoint without changing the map UI.

## Important

The approval scores shown on the map are prototype AI/readiness scores, not official AICTE scores. The prototype deliberately keeps final approval with an authorised human officer.
