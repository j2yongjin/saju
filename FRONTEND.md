# Frontend

## App Structure
- Framework: Next.js with React
- Primary routes:
  - `/` home
  - `/input` saju input
  - `/checkout` payment
  - `/result/[reportId]` result view
  - `/history` saved reports
  - `/support` 1:1 inquiry board

## Core UI Flows
- Home explains the value proposition and funnels users into the saju input flow
- Input form collects birth date, birth time, solar/lunar mode, and gender
- Compatibility flow adds a second person's input set
- Preview page shows a short summary paragraph and locked premium sections
- Checkout focuses on one-tap simple payment via Toss Payments
- Result page groups sections by category

## State And Data
- Keep client state small and task-oriented
- Fetch report status and payment status from backend APIs
- Persist locale and login session across routes
- Do not expose raw sensitive input values beyond necessary UI contexts

## Internationalization
- Ship Korean first, but all route and copy structures should support English and Chinese
- Avoid embedding business logic in localized strings

## Performance Goals
- Mobile-first page performance
- Fast form transitions
- Skeletons for report generation states
- Clear failure states for payment and report generation
