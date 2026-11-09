# Reliability, Data Lifecycle and Release

Repository 0.21. 4 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[10-data-integration-and-verification.md](../modules/10-data-integration-and-verification.md); [01-workspaces-and-access.md](../modules/01-workspaces-and-access.md)

[recovery-release](../../spec/recovery-release.md)

Planned cross-module acceptance: AC01, AC35, AC36, AC37, AC38, AC54, AC55. Decision references: GAP01, GAP11, GAP15, GAP16. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Truthful local/server/upload/recovery states, technical planning evidence, backups/runbooks and explicit deployment/release status.

Draft versus committed, queued/retried/failed work, migration/restore validation and planning/build/deploy/release gates remain separate.

User/record owner → authorised operator/builder → appropriate review/release owner; no production action authorised by writing a workflow.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-RELEASE-01

**FEAT-RELEASE-01 — Drafts, files and interruption recovery**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | User edits/uploads or loses session/network |
| Preconditions | Scoped current record, upload validation and truthful client/server state |
| Ordered journey / checkpoints | Local draft → pending sync/upload → committed saved or failed → reauthorise/resume → preserve recoverable context |
| Source records / result / handoff | Separate local/server/evidence states and safe media delivery, not assumed full offline app |
| Exception / decision branch | Resize/rotation/session expiry cannot manufacture success or bypass revoked grants; selected file limits/private delivery require actual design |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC35, AC36, AC37, AC38, AC54, AC55 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-RELEASE-02

**FEAT-RELEASE-02 — Durable jobs, migrations and backup restore**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Builder/operator plans authorised technical change/recovery |
| Preconditions | Actual project/configuration, synthetic test environment and agreed targets |
| Ordered journey / checkpoints | Version/plan → backup/checkpoint → migrate or restore → reconcile records/files/pending jobs → validate → rollback/resolve |
| Source records / result / handoff | Identity/payment/bookings/issued files/audit remain consistent; monitoring has next owner |
| Exception / decision branch | Do not claim exactly-once transport or recovery proof from backup toggle; real environment changes require later implementation authority |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC35, AC36, AC37, AC38, AC54, AC55 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-RELEASE-03

**FEAT-RELEASE-03 — Retention, export and eligible deletion**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised owner/operator reviews data lifecycle |
| Preconditions | Domain-specific obligations, private field scope and approved retention/export process |
| Ordered journey / checkpoints | Request → assess eligible scope/holds → export or archive/restrict → authorised deletion/anonymisation → audit |
| Source records / result / handoff | Account/employment/membership/workspace state changes differ; history preserved where required |
| Exception / decision branch | No generic cascade deletion of signatures/financial/health records; policies unchosen remain blocked, not invented legal periods |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC35, AC36, AC37, AC38, AC54, AC55 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-RELEASE-04

**FEAT-RELEASE-04 — Delivery planning and release verification**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Builder turns source/feature workflows into implementation plan |
| Preconditions | Actual project inspection, source/feature trace and open decisions identified |
| Ordered journey / checkpoints | Decompose → dependency graph → numbered 00/01/02… cards → approve plan → later authorised build → evidence/review → release decision |
| Source records / result / handoff | Stable real board IDs plus sequence; parent rollup distinct from blockers; deployment separate from Done/release |
| Exception / decision branch | No arbitrary card count, fake IDs or planned-tests-as-passed; unresolved decisions block affected work without deleting scope |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC35, AC36, AC37, AC38, AC54, AC55 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.
