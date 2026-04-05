# Plans

## Execution Policy
- One PR maps to one execution plan document
- Active plans live in `docs/exec-plans/active/`
- Completed plans move to `docs/exec-plans/completed/`
- Tech debt is tracked separately in `docs/exec-plans/tech-debt-tracker.md`

## Definition Of Done
- Product behavior is reflected in the relevant spec
- Architecture and security docs are updated if impacted
- Required integration tests pass for login, payment, and saju calculation when touched
- Monitoring, failure handling, and rollback notes are documented for risky changes

## Initial Milestones
1. Foundation setup
2. Saju calculation and interpretation pipeline
3. Payment and paid report gating
4. History, admin, and support tools
5. Localization and production hardening
