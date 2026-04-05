# MVP Foundation Plan

## Scope
- Initialize Next.js, FastAPI, PostgreSQL, and Docker Compose
- Implement auth, saju input, preview, payment, result history, and support baseline
- Establish security, observability, and test foundations

## Current Status
- Done: monorepo-style `apps/web` and `apps/api` scaffold
- Done: Docker Compose, env example, and root README
- Done: frontend routes for home, input, checkout, result, history, and support
- Done: backend contract routes for health, auth start, preview, report detail, history, and checkout
- Done: API contract tests and Python syntax verification
- Next: real database models and persistence
- Next: Toss Payments integration
- Next: Llama/OpenAI orchestration and guardrail pipeline

## PR Breakdown Rule
- Each implementation PR must have its own execution plan derived from this document

## Initial Risks
- LLM fallback behavior
- Sensitive data handling
- Payment and report state consistency
