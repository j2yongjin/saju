# AGENTS.md

This file is the short map for contributors and coding agents. Detailed facts live in `ARCHITECTURE.md` and `docs/`.

## Read Order
1. `PRODUCT_SENSE.md`
2. `ARCHITECTURE.md`
3. `SECURITY.md`
4. `RELIABILITY.md`
5. `PLANS.md`
6. Relevant document under `docs/`

## Guardrails
- Do not change database schema manually without updating `docs/generated/db-schema.md`.
- Do not print or persist full birth date or birth time in logs.
- Do not modify payment logic without tests.
- Keep interpretation boundaries: rule engine calculates saju, LLM only writes narrative interpretation.
- Exclude investment, medical, and legal advice from user-facing output.

## Required Tests
- Integration tests are mandatory for login, payment, and saju calculation changes.
- Run impacted tests before proposing merge.

## Documentation Rules
- Product changes update `docs/product-specs/`.
- Design changes update `DESIGN.md`, `FRONTEND.md`, or `docs/design-docs/`.
- Architecture or data changes update `ARCHITECTURE.md` and generated schema docs.
- Each PR should have one execution plan in `docs/exec-plans/active/` and move it to `completed/` when done.
