# Reception, QR Access and Occupancy

Repository 0.21. 4 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[01-workspaces-and-access.md](../modules/01-workspaces-and-access.md); [03-classes-coaches-and-attendance.md](../modules/03-classes-coaches-and-attendance.md)

[reception-entry-exit](../../spec/reception-entry-exit.md); [onboarding-membership](../../spec/onboarding-membership.md); [classes-courses-attendance](../../spec/classes-courses-attendance.md)

Planned cross-module acceptance: AC09, AC10, AC11, AC12, AC18, AC19, AC32, AC35, AC38. Decision references: GAP01, GAP03, GAP06, GAP09, GAP15. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Staff Scan/lookup and photo-left reception ID card; member Pass action; explicit entry/exit and qualified live register.

Scan pending/accepted/denied/error; visit open/confirmed exit/admin closure; member/PT pass status and service attendance independent.

Member/PT client → authorised reception/checkpoint → entitled visit → instructor register for service attendance; manager owns reasoned corrections.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-ENTRY-01

**FEAT-ENTRY-01 — Scan or member lookup and ID card**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Reception scans pass or selects permitted lookup |
| Preconditions | Correct gym, identity/pass type, action and field rights |
| Ordered journey / checkpoints | Resolve person → check current entitlement → show photo-left/name/details → advisory/restriction → permitted action |
| Source records / result / handoff | Reception ID card with payment/onboarding/speak-to-staff flag and next action, no full health/HR leak |
| Exception / decision branch | Clear prior person for next scan; note is not access rule; unknown/revoked pass gives safe lookup/error |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC09, AC10, AC11, AC12, AC18, AC19, AC32, AC35, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-ENTRY-02

**FEAT-ENTRY-02 — Explicit entry and recorded gym visit**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Staff/member uses configured authorised entry flow |
| Preconditions | Active entitled gym or approved PT window and supported checkpoint/device |
| Ordered journey / checkpoints | Validate entry → commit scan/visit → display confirmed outcome → update register/history |
| Source records / result / handoff | Scan separate from visit; source record feeds occupancy/profile/retention |
| Exception / decision branch | Repeated entry returns known state; network/uncertain response stays pending until reconciled; static QR does not prove location |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC09, AC10, AC11, AC12, AC18, AC19, AC32, AC35, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-ENTRY-03

**FEAT-ENTRY-03 — Exit, forgotten checkout and correction**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Member/staff records departure or manager reconciles stale visit |
| Preconditions | Existing open visit, explicit action and correction authority |
| Ordered journey / checkpoints | Exit → close visit; forgotten checkout → investigate → reasoned administrative closure → audit/report correction |
| Source records / result / handoff | Confirmed departure differs from inferred/admin closure; owner sees qualified recorded occupancy |
| Exception / decision branch | Never alternate in/out on repeated scans; stale record is not guaranteed emergency headcount or physical presence |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC09, AC10, AC11, AC12, AC18, AC19, AC32, AC35, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-ENTRY-04

**FEAT-ENTRY-04 — Class/PT attendance at reception boundary**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Instructor/reception follows relevant appointment/register action |
| Preconditions | Correct occurrence/appointment and own attendance permission |
| Ordered journey / checkpoints | Verify permitted service → record gym visit as appropriate → open actual class/PT register → mark/correct service attendance |
| Source records / result / handoff | Separate class/PT attendance links person/profile; receipt remains finance-owned |
| Exception / decision branch | Gym arrival alone cannot auto-complete class attendance; expired/cancelled PT pass cannot admit a new visit |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC09, AC10, AC11, AC12, AC18, AC19, AC32, AC35, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.
