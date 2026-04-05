# New User Onboarding

## Goal
Get a first-time user from landing page to a trusted preview and then into payment for a full report.

## Entry Flow
1. User lands on home page
2. User starts saju input
3. User enters birth date, birth time, solar/lunar mode, and gender
4. System calculates saju structure
5. User sees a one-paragraph preview
6. User proceeds to payment for full report
7. Paid result is generated and saved in history

## Design Constraints
- Keep form friction low on mobile
- Explain why each input is required
- Show clear value before the paywall
- Avoid surprise upsells during checkout

## Failure Handling
- If calculation input is invalid, explain the correction needed
- If payment succeeds and report fails, issue refund
- If report generation is delayed, show status and do not duplicate payment
