# Reliability

## Critical Path Priority
1. Login
2. Payment
3. Saju calculation
4. Result retrieval

## Failure Policies
- If payment succeeds but report generation fails, refund the payment
- If the Llama API is unavailable, retry through OpenAI fallback
- If external calendar conversion fails, surface a recoverable input error and do not charge

## Monitoring Scope
- Application errors
- Payment failures
- API latency
- LLM cost and latency
- User funnel drop-off

## Operational Baseline
- Sentry is required in all deployed environments
- Track report generation as a multi-step workflow so failures are attributable
- Keep retries bounded to avoid duplicate charges or duplicate reports

## Data Retention
- Access logs retained for 90 days
- Payment records retained according to Korean legal requirements
- Account deletion removes non-required user data immediately
