# Controlled Import and Existing-Gym Onboarding

Repository 0.22 · OG-EXT-003. 5 concrete feature workflows; status PRODUCT_DESIGN_SPECIFIED / IMPLEMENTATION_NOT_STARTED.

Owner/admin/staff journey: delegated import operator and independent authorised reviewer where configured

Start with controlled file-based import, not invented provider integrations. Formats/entity scope and exact mappings are defined in the technical plan; CSV can be an initial supported input only with validation, encoding/type handling and private staging. Preserve data ownership, privacy, source identity and batch provenance. Imported rows are untrusted inputs. Never import permanent passwords or treat a bank/card/mandate reference as a working payment method. Do not auto-transfer financial contracts/signatures. Opening balances require finance review and a distinct imported-history label. No record activates until current verified identity, onboarding, role/payment and approval gates apply. Matching/quarantine is reversible before commit; after commit use source-domain corrections/compensating actions. No promise of undoing externally completed effects.

See the [detailed module](../modules/15-import-and-reconciliation.md), [feature specification](../../spec/imports-reconciliation.md), [setup gates](../setup-and-readiness.md) and [source extension](../source-extension-register.md). Common scope/audit/retry/notification/responsive acceptance in [workflow index](README.md) applies to every pipeline.

## WF-IMPORT-01

**FEAT-IMPORT-01 — Authorised source and mapping setup**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Authorised company operator prepares existing data |
| Required setup/preconditions | Permission/authorisation for source, format and selected workspace/gym/entities; no source credentials stored in files |
| Ordered checkpoints | Select import purpose → obtain authorised export → define field/types/ownership mapping → identify sensitive data → plan batch/dry-run |
| Source record/outcome/handoff | Versioned import definition, source provenance and retention/private staging controls |
| Exception or denied path | Initial file-based import does not imply a live legacy API connector or permission to access another platform; no passwords/card secrets imported |

Planned acceptance AC81: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-IMPORT-02

**FEAT-IMPORT-02 — Staging, validation and duplicate matching**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Import operator uploads/maps a batch |
| Required setup/preconditions | Approved mapping, private staged files and scoped matching rules |
| Ordered checkpoints | Stage → validate fields/relations/amounts/versions → match verified existing identities → quarantine conflicts → dry-run impact report |
| Source record/outcome/handoff | Inert rows with proposed creates/links/errors and exact counts; no live rights or notifications |
| Exception or denied path | Ambiguous person/guardian/company match is reviewed, never silently merged; invalid financial/health/signed data not fabricated into trusted records |

Planned acceptance AC82: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-IMPORT-03

**FEAT-IMPORT-03 — Preview approval and controlled commit**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Authorised reviewer approves specific batch scope |
| Required setup/preconditions | Dry-run results, error disposition, source totals and repair/rollback plan |
| Ordered checkpoints | Review rows/changes → approve exact snapshot → commit idempotent batches → capture row provenance → reconcile → report partial success |
| Source record/outcome/handoff | Stable batch/row IDs, auditable source links and controlled source-module writes |
| Exception or denied path | Changed file/mapping requires fresh preview; commit retry cannot duplicate profiles/balances; failure does not claim whole batch succeeded |

Planned acceptance AC83: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-IMPORT-04

**FEAT-IMPORT-04 — Post-import invitations, balances and activation**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Membership/HR/finance reviews imported people and records |
| Required setup/preconditions | Committed source records plus separate verified invite/payment/form/approval requirements |
| Ordered checkpoints | Validate opening balances/history labels → issue separately authorised invitations → verify identity/link → current forms/payment review → activate permitted role/entitlement |
| Source record/outcome/handoff | Imported history marked with provenance; ordinary onboarding gates and finance reconciliations remain authoritative |
| Exception or denied path | No mass-email/activation from a CSV checkbox; imported payment/mandate/signature metadata does not configure a provider, collect money or recreate a legal signature |

Planned acceptance AC84: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-IMPORT-05

**FEAT-IMPORT-05 — Import repair, compensation and audit**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Authorised operator resolves failed/wrong rows |
| Required setup/preconditions | Batch provenance, downstream writes/actions and appropriate domain authority |
| Ordered checkpoints | Inspect per-row outcome → retry safe failed rows → correct/compensate committed records → reconcile totals → retain review evidence |
| Source record/outcome/handoff | Pre-commit staging can be discarded under policy; committed history uses auditable corrections/compensation |
| Exception or denied path | Do not promise rollback can unsend emails, undo payments or erase signed/audited records; dependent real actions need their own authorised resolution |

Planned acceptance AC85: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.
