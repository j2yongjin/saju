# Security

## Core Principles
- Data minimization
- Log masking
- Secret isolation
- Strong deletion handling
- Least privilege for admin actions

## Sensitive Data Rules
- Treat birth date and birth time as sensitive personal data
- Encrypt the database at rest
- Apply column-level encryption to birth-related fields
- Never log full birth date or birth time
- Restrict support and admin views to only the data needed for the task

## Retention And Deletion
- Store user inputs, interpretations, payment records, and access logs only for defined product and legal purposes
- Delete account-linked non-required data immediately after account deletion
- Retain payment records according to Korean legal requirements

## Application Security
- Social login only for MVP
- Validate Toss payment callbacks server-side
- Protect admin endpoints with strict authorization checks
- Keep LLM prompts and responses within scoped templates
- Filter disallowed advice domains: investment, medical, legal

## Logging And Secrets
- Mask sensitive fields in logs and traces
- Store API keys and payment secrets outside the codebase
- Audit configuration changes in deployment environments
