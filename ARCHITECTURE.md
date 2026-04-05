# Architecture

## Product Context
- Service name: `Dongyangui Sinbiroun Unmyeong` (`동양의신비로운 운명`)
- Product type: paid fortune content app
- Primary users: general users, then couple compatibility users
- Core promise: AI-assisted saju, romance, and career insights in one product

## Stack
- Frontend: Next.js + React
- Backend: FastAPI
- Database: PostgreSQL
- Deployment: Docker Compose based single deployment
- LLM: external Llama API, with OpenAI as fallback
- Payments: Toss Payments
- Auth: social login, priority order `Kakao -> Google -> Apple`
- Error monitoring: Sentry

## System Boundaries
1. Web App
   - Mobile-first Next.js application
   - Handles landing pages, saju input, preview, checkout, paid reports, and history
2. Core API
   - FastAPI service for auth, user records, report orchestration, payments, and admin APIs
3. Fortune Engine
   - Rule-based saju calculation using external calendar/lunar libraries
   - Single source of truth for stems, branches, and derived structures
4. Interpretation Gateway
   - Prepares structured inputs for external Llama API
   - Restricts output scope to narrative explanation only
   - Falls back to OpenAI when Llama API is unavailable

## Domain Rules
- Required inputs: birth date, birth time, solar/lunar mode, gender
- Compatibility flow collects the second person's corresponding inputs
- Free users can see a one-paragraph summary preview
- Everything beyond the basic preview is paid content
- Paid products start with `basic saju`; compatibility is a separate paid path
- Output categories: personality, romance, compatibility, career, wealth, health caution, major luck cycles
- Health content must remain at lifestyle caution level and must not become medical advice

## Content Generation Boundary
- Rule engine handles calculation and structured traits
- LLM handles natural-language interpretation only
- Hard filters remove investment, medical, and legal advice
- Prompting should be data-forward and modern in tone, while visual design stays rooted in traditional East Asian aesthetics

## Data Model Principles
- Store user inputs, generated interpretations, payment records, and access logs
- Apply data minimization by collecting only fields necessary for saju, account, payment, and support flows
- Delete user data on account deletion except records retained for legal obligations such as payment evidence
- Encrypt the database and use column-level encryption for birth data
- Mask birth date and birth time in logs

## Reliability Decisions
- Critical path priority: login, payment, saju calculation, result retrieval
- Payment success with report failure leads to refund workflow
- Llama outage triggers OpenAI fallback

## Operational Notes
- Use generated schema docs as the data reference for contributors
- Keep admin capabilities simple at first: content management, payment lookup, user inquiry handling, category management
