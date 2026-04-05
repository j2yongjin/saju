# Dongyangui Sinbiroun Unmyeong

Full-stack scaffold for a mobile-first saju and fortune content app.

## Structure
- `apps/web`: Next.js frontend
- `apps/api`: FastAPI backend
- `docs/`: product, design, architecture, and execution docs

## Local Run
1. Copy `.env.example` to `.env`
2. Run `docker compose up --build`
3. Open `http://localhost:3000` for the web app
4. Open `http://localhost:8000/docs` for the backend API docs

## Current State
- Frontend routes and mobile-first UI scaffold are in place
- Backend API contracts for health, auth start, preview, report detail, history, and checkout are in place
- Database and payment integrations are still placeholders

## Read First
- `AGENTS.md`
- `ARCHITECTURE.md`
- `PRODUCT_SENSE.md`
- `SECURITY.md`
