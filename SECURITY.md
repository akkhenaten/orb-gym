# Security and Sensitive Data

Current status: product/planning repository; no working security implementation has been verified. This document states required boundaries and reporting conduct, not a security certification.

Never commit secrets, real member health questionnaires, staff HR/disciplinary/pay data, private evidence, payment credentials or production database dumps. Keep public assets separate from protected uploads. .env.example contains blank proposed configuration, not credentials. Hosting/provider controls must be verified in the actual project.

Enforce company/gym/role/field scope on trusted requests, background jobs, AI retrieval, exports, private file delivery and real-time audiences. Customer ownership does not grant platform support unrestricted routine access. Use explicit temporary support scope and audit. Invite, entry-pass, asset-label and public URL tokens have different trust contracts.

For a suspected exposure, report privately to the designated repository/platform owner through an agreed private channel. No public security address or response SLA has been configured. Do not post credentials, exploit-sensitive details or personal data in public issues or board cards. Preserve relevant evidence with restricted access; do not alter live systems without authority.

The technical plan must define authentication/session/recovery, file validation/private delivery, sensitive-field access, monitoring, credential management, data retention/export/deletion, backup/restore and incident ownership before real data is used. Exact policies remain tracked in docs/planning-gap-register.md.
