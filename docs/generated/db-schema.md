# Generated DB Schema

This document is the human-readable summary of the application schema. Regenerate it whenever the real database schema changes.

## Planned Tables

### users
- id
- social_provider
- social_provider_user_id
- display_name
- locale
- created_at
- deleted_at

### saju_profiles
- id
- user_id
- birth_date_encrypted
- birth_time_encrypted
- calendar_mode
- gender
- label
- created_at

### compatibility_profiles
- id
- user_id
- primary_profile_id
- partner_birth_date_encrypted
- partner_birth_time_encrypted
- partner_calendar_mode
- partner_gender
- created_at

### reports
- id
- user_id
- report_type
- source_profile_id
- compatibility_profile_id
- status
- preview_text
- structured_traits_json
- full_interpretation_text
- llm_provider
- llm_model
- created_at

### purchases
- id
- user_id
- report_id
- provider
- provider_payment_id
- amount
- currency
- status
- refunded_at
- created_at

### access_logs
- id
- user_id
- route
- ip_hash
- user_agent
- created_at

### inquiries
- id
- user_id
- category
- title
- body
- status
- created_at

### admin_actions
- id
- admin_user_id
- action_type
- target_type
- target_id
- created_at

## Notes
- Birth-related fields require column-level encryption
- Logs must not store raw birth date or birth time
- Payment records must follow Korean legal retention requirements
- Preview generation now persists a report row before payment so history and detail screens have a stable id
