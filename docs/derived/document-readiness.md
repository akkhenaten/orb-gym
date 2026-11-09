# Document template readiness

34 template types, 52 typed fields, 34 declarative layouts.

Binding reality: 1 field source resolves to a generated column, 51 are prose, so values arrive as a validated caller payload.

Issuance: content approved = false, signature provider tested = false. Drafts render and are marked `DRAFT — UNREVIEWED CONTENT — NOT FOR ISSUE`; issue is refused while either flag is false or a required field is missing.

| Template | Name | Representation | Gate | Fields |
| --- | --- | --- | --- | --- |
| `DCT-001` | PAR-Q questionnaire | interactive_form | health_review | 7 |
| `DCT-002` | Emergency contact form | interactive_form | controlled_content | 6 |
| `DCT-003` | House rules acknowledgement | acknowledgement | safety_review | 4 |
| `DCT-004` | Membership agreement | signed_document | legal_review | 6 |
| `DCT-005` | Membership change or freeze confirmation | issued_document | legal_review | 5 |
| `DCT-006` | PT client onboarding form | interactive_form | health_review | 7 |
| `DCT-007` | Hourly PT service terms | signed_document | legal_review | 6 |
| `DCT-008` | Trial or guest terms acknowledgement | acknowledgement | legal_review | 5 |
| `DCT-009` | Guardian authority and action-right review | reviewed_form | authority_review | 6 |
| `DCT-010` | Dependent activity consent | signed_document | authority_and_safety_review | 6 |
| `DCT-011` | Staff employment contract | signed_document | legal_review | 5 |
| `DCT-012` | Staff onboarding details | interactive_form | controlled_content | 4 |
| `DCT-013` | Staff emergency contact form | interactive_form | controlled_content | 5 |
| `DCT-014` | Staff policy or SOP acknowledgement | acknowledgement | safety_or_hr_review | 5 |
| `DCT-015` | Training or qualification evidence | protected_upload | credential_review | 4 |
| `DCT-016` | One-to-one meeting record | restricted_record | controlled_hr_content | 3 |
| `DCT-017` | Disciplinary case correspondence | restricted_record | legal_or_hr_review | 4 |
| `DCT-018` | Approved timesheet statement | issued_document | source_verified | 4 |
| `DCT-019` | Payslip delivery | protected_upload | payroll_source_review | 3 |
| `DCT-020` | Rental coach agreement | signed_document | legal_review | 5 |
| `DCT-021` | Coach credential evidence | protected_upload | credential_review | 4 |
| `DCT-022` | Supplier onboarding form | reviewed_form | supplier_review | 4 |
| `DCT-023` | Contractor quote | protected_upload_or_source_document | commercial_review | 4 |
| `DCT-024` | Contractor variation | protected_upload_or_source_document | commercial_review | 4 |
| `DCT-025` | Contractor visit or job sheet | issued_document_or_form | controlled_operational_content | 4 |
| `DCT-026` | Work completion evidence form | interactive_form | verification_review | 4 |
| `DCT-027` | Supplier invoice submission | protected_upload_or_source_document | finance_review | 4 |
| `DCT-028` | Customer invoice or charge statement | issued_document | finance_review | 5 |
| `DCT-029` | Customer receipt | issued_snapshot | source_verified | 6 |
| `DCT-030` | Credit or refund confirmation | issued_snapshot | source_verified | 5 |
| `DCT-031` | Management report export | scoped_report | source_verified | 5 |
| `DCT-032` | Operational letter | issued_document | purpose_review | 5 |
| `DCT-033` | Transactional notification layout | communication_template | purpose_review | 4 |
| `DCT-034` | Approved public policy or rules page | public_projection | legal_or_safety_review | 4 |
