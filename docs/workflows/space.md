# Workspace, Gym Portfolio and Platform Administration

Repository 0.21. 5 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[01-workspaces-and-access.md](../modules/01-workspaces-and-access.md)

[workspace-access](../../spec/workspace-access.md)

Planned cross-module acceptance: AC01, AC02, AC03, AC37. Decision references: GAP01, GAP09, GAP15, GAP16. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Owner onboarding, company portfolio/gyms and separate platform service console with explicit support context.

Workspace onboarding/active/suspended/archived and ownership transfer; gym operation/public availability and customer membership remain separate.

Owner/company admin → delegated gym management; platform operator owns service lifecycle only under established authority.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-SPACE-01

**FEAT-SPACE-01 — Owner self-service workspace creation**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Verified new owner starts company |
| Preconditions | Account verification and explicit owner journey |
| Ordered journey / checkpoints | Create account → verify → workspace/owner grant atomically → company details → add first gym → resume if interrupted |
| Source records / result / handoff | One workspace with at least one legitimate owner; no fixed product gym-count limit assumed |
| Exception / decision branch | Retry cannot duplicate workspace; actual capacity/commercial limits require evidence and stated terms |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC37 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-SPACE-02

**FEAT-SPACE-02 — Add gym and portfolio configuration**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised owner/admin expands portfolio |
| Preconditions | Existing workspace, gym details and delegated creation right |
| Ordered journey / checkpoints | Create gym → add areas/resources/contacts → assign staff/plans/services → publish permitted operations |
| Source records / result / handoff | Same modules scoped to new gym; public page begins as draft, branding inherits |
| Exception / decision branch | All-gym membership treatment of future gyms must be explicit; gym creation not a data silo/security bypass |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC37 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-SPACE-03

**FEAT-SPACE-03 — Platform service console and support**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Platform admin investigates service/customer request |
| Preconditions | Platform role and audited scoped workspace access |
| Ordered journey / checkpoints | Select workspace/reason → inspect permitted service records → perform authorised support → end temporary grant |
| Source records / result / handoff | Service health/usage/support administration remains separate from customer rota/approvals |
| Exception / decision branch | No silent impersonation, signatures or payment approval; sensitive fields need specific permitted support access |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC37 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-SPACE-04

**FEAT-SPACE-04 — Ownership transfer, suspension and workspace closure**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised owner/platform role changes workspace lifecycle |
| Preconditions | Current owner, outstanding records and agreed service/retention policy |
| Ordered journey / checkpoints | Review obligations → transfer to active owner or explicit suspend/restore/archive → export/retention/delete review |
| Source records / result / handoff | Preserve financial/HR/member/job histories and truthful account/service messages |
| Exception / decision branch | Do not orphan the company or cascade-delete everything from a user-account action; workspace suspension differs from member arrears |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC37 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-SPACE-05

**FEAT-SPACE-04 — Archive one gym without abandoning its obligations**

Exception/lifecycle subflow of WF-SPACE-04; review finding GR09. Existing source-grounded behaviour is clarified; new policy alternatives are not approved.

| Contract | Required behaviour |
|---|---|
| Actors/trigger | Authorised owner/platform role changes workspace lifecycle |
| Preconditions | Gym operational/public status, upcoming bookings/PT/rotas/tasks, stock/assets, active plans and balances; authorised owner. |
| Authoritative outcome/handoff | Present and resolve or deliberately assign every affected obligation before applying allowed archive/transfer effects; retain source histories and other gyms’ valid rights. |
| Exception/policy boundary | Gym archive is not merely hiding a navigation card, cancelling every contract or deleting unpaid invoices. Cross-gym plan entitlement and settlement choices must be explicit. |

Business checkpoints below describe behaviour, not mandatory API enum spellings. Each decision uses current delegated authority.

| Actor | Before/after checkpoint | Guard/action | Record and next owner | Failure/return path |
|---|---|---|---|---|
| Company owner | Active gym → archive proposal | Inventory future services, people, assets/stock, public links and financial obligations | Impact review with exact affected record IDs and accountable owners | Unknown balances/bookings remain visible blockers; no silent data deletion |
| Authorised domain owners | Impact reviewed → selected resolutions | Decide permitted transfer/reschedule/cancel/access/payment actions under their rules | Recorded plan per obligation and unresolved next actions | Owner preference alone does not invent refund, employee transfer or new-gym membership terms |
| Gym/source commands | Plan authorised → scoped status/actions applied | Apply allowed gym/public/record changes and notices idempotently | Gym status, redirect/unpublish, source histories and owned exceptions | Do not remove unrelated gyms or corrupt issued evidence; partial failure reported |
| Company/finance owner | Applied → checked/reconciled | Verify future work, balances, resources and remaining entitlements | Archive evidence and retained access/export under retention policy | Archive may retain outstanding follow-up under explicit ownership, never pretend obligations vanished |

Planned acceptance: AC01, AC02, AC03, AC37, AC66. Operational decisions: DEC-GR-05. See [decision discussion](../decisions/operational-decisions.md).


## Platform and owner scope clarification — edition 0.25

WF-SPACE-03 uses the broad separately administered platform role, explicit audited workspace selection and privileged assurance. Company owners cover all their own current/future gyms and administer granular role/user access; company delegation never creates a platform administrator. See [access model](../access/access-model.md).
