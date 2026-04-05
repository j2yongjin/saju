# Quality Score

## Weighted Rubric
- Calculation accuracy: 10
- Interpretation consistency: 20
- UX quality: 30
- Response speed: 10
- Security: 20
- Observability: 10

## Scoring Guide
- 90 to 100: production quality, low known risk
- 75 to 89: acceptable with targeted follow-up
- 60 to 74: limited release only
- Below 60: not shippable

## Metric Intent
- Calculation accuracy: correct saju derivation and stable rule outputs
- Interpretation consistency: similar inputs yield coherent narrative style and structure
- UX quality: mobile usability, paywall clarity, and result readability
- Response speed: acceptable end-to-end latency for preview, payment confirmation, and result delivery
- Security: encryption, masking, deletion handling, and permission boundaries
- Observability: visibility into errors, payment failures, latency, LLM usage, and funnel drop-off

## Release Gate
- No release if security or payment flows regress
- No release if required integration tests are missing for affected critical paths
