# Sensitive field and audience bundles

Role/action permission is necessary but insufficient. Field access follows purpose, record scope, explicit allowance and channel. These logical bundles must be mapped to real schema fields by OpenKBS. An individual deny can further restrict any bundle within its stated scope.

| Bundle | Contents | Intended access and restrictions |
|---|---|---|
| FLD-PUBLIC | Approved gym/coach bio/photo/specialities/public fees, public timetable/offers | Publicly published projection only; excludes payroll, rent, internal earnings, client names and unpublished drafts |
| FLD-PROFILE-SELF | Own editable contact/avatar/preferences | Authenticated subject; protected role/company/payment fields are not self-editable |
| FLD-RECEPTION | Photo, display name, applicable pass/membership outcome, gym, visit and necessary advisory/restriction reason | Authorised reception/scan projection; owner/admin shared-screen context also uses this limited projection |
| FLD-MEMBERSHIP | Application status, plan/entitlement, relevant own payment/receipt history | Owner/admin or delegated membership/finance grants and relevant self projection; not entire health form |
| FLD-HEALTH | PAR-Q responses, sensitive supporting content and authorised safety review | Owner/admin full authority or specific delegated health-review/assigned-purpose grant; other staff receive minimum approved instruction rather than questionnaire |
| FLD-HR | Employment/contact/contract records | Owner/admin or delegated scoped HR; own self-service where specified |
| FLD-HR-RESTRICTED | Disciplinary/one-to-one/private employment notes | Separate explicit bundle; gym assignment or payroll access alone does not disclose |
| FLD-PAY | Payslip, pay rate, approved timesheet/payroll export | Owner/admin or scoped payroll grant; employee sees own issued records; no unrelated employee pay |
| FLD-FINANCE | Ledger, reconciliation, charges, costs and merchant references | Owner/admin or scoped finance grants; reception sees only required sale/payment outcome, never provider secrets |
| FLD-PT | Assigned appointment, applicable forms/instructions and own client service records | Employed coach assigned client access; rental coach only its explicitly shared permitted records, not whole member CRM |
| FLD-WORK-SHARED | Assigned task/job/asset details and intentionally shared feed/evidence | Vendor/operative assignments and audience controls; excludes internal deliberations and unrelated contractors |
| FLD-DECISION | Quote/variation/approval and permitted invoice evidence | Separate requester/submitter/reviewer projections; seeing a quote does not grant approval |
| FLD-GUARDIAN | Verified dependent information covered by specific relationship rights | Payer/booker/signer/collector/communication rights independently checked; no blanket family access |
| FLD-ACCESS | Roles, scoped grants, individual exceptions and change audit | Company owner/platform admin and explicitly delegated access administrator; safe self effective-access explanation |
| FLD-SECRET | Password/factor secrets, payment credentials/provider keys | Never plaintext in ordinary UI, exports, files or AI, even for owner/admin. Admin power operates controlled configuration/rotation, not disclosure of unrecoverable secrets. |

Private message/task audiences are not automatically widened by a mention. Public feed membership is not permission to read private cases. Owner/admin authorised inspection must remain explicit and audited; inspection does not forge a user message/signature. Static exports retain their original permitted provenance; future download requests require current rights.
