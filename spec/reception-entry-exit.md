# Reception, Member Passes and Live Occupancy

Status: populated product specification brief, repository edition 0.20. Derived from the already specified feature; no new access, payment or device policy is approved. No runtime test is claimed.

## Product sources

[Workspace/reception source](../docs/modules/01-workspaces-and-access.md), [class/coach/presence source](../docs/modules/03-classes-coaches-and-attendance.md) and [cross-module contracts](../docs/modules/10-data-integration-and-verification.md).

Primary sources: OG-SRC-0062, OG-SRC-0063, OG-SRC-0064, OG-SRC-0065, OG-SRC-0199. Connected rules: OG-SRC-0025, OG-SRC-0045, OG-SRC-0046, OG-SRC-0068, OG-SRC-0069, OG-SRC-0070, OG-SRC-0071, OG-SRC-0072, OG-SRC-0073, OG-SRC-0074 and OG-SRC-0075.

## Member and reception journey

The member opens their pass or, under a separately configured option, scans an entry/exit checkpoint with their authenticated phone. Reception can scan the member pass on an authorised device and use permitted manual lookup. Resolve the identity, selected gym, current entry entitlement and intended entry/exit action before recording a visit event. A scan itself must not activate a membership or charge a payment.

On the staff screen show the photo-left ID card and name/membership/entry outcome to the right. Highlight payment problems, missing onboarding/induction or a request to speak to staff. Distinguish advice from an actual entry restriction; do not turn a free-text note into an access rule. Offer permitted profile/payment/query/attendance actions. Clear the previous person's card for the next scan and do not display the full PAR-Q, HR or private financial details on a shared reception screen.

## Records, states and cross-module consequences

Use the same identity/profile, membership/PT access grant and gym context as the owning modules. A scan event and a visit are distinct records; entry opens a visit, explicit exit closes it and duplicate scans return a truthful known outcome. Do not alternate entry/exit on each repeated scan. An administratively closed forgotten checkout is identified separately from confirmed departure, retaining reason/actor/history.

The live gym register shows who is recorded inside, arrival and permitted identification fields. Owner oversight spans permitted gyms. Occupancy is an operational record with freshness/capture limitations; it is not guaranteed physical presence or an emergency headcount. Attendance correction updates derived history/retention/reporting without deleting the original event.

Class and PT registers are independent: arrival at the gym does not prove attendance at a particular class. An instructor opens the correct occurrence and records attendance there. QR types have separate contracts: an asset label identifies an asset; a coach signup invitation is not an entry pass; a PT-only personal pass must satisfy its authorised gym/time/appointment conditions. Expired/revoked/cancelled grants cannot create new entry. Identity linking/upgrades preserve historical visits rather than issuing a duplicate account.

## Exceptions and outstanding choices

Unknown/invalid pass: offer permitted lookup or a helpful error; disclose no unrelated record. Missing/expired entitlement: show the relevant holding/payment/support route while preserving ordinary login where permitted. Uncertain scan/network failure: distinguish pending from committed and reconcile before retrying; do not invent a confirmed visit. Manual override/correction requires existing delegated authority, reason and audit.

GAP01, GAP02–03, GAP06, GAP09, GAP11, GAP13 and GAP15 contain actual project/device/pass-security/buffer/access/payment choices. A static QR alone does not prove physical presence. Entry hardware, anti-sharing and proximity validation are technical decisions, not already implemented controls. No physical door integration or full offline mode is implied.

## Acceptance and implementation completion

Use AC01, AC09, AC10, AC11, AC12, AC18, AC19, AC32, AC33, AC35 and AC38 from [acceptance criteria](../docs/acceptance-scenarios.md). Add local tests for photo-left rendering, field redaction, advisory versus restriction, duplicate entry/exit, forgotten checkout correction, PT expiry/revocation, membership freeze, manual lookup and shared-screen clearing.

Before the implementation card is Ready, specify actual device/checkpoint flow, token validity/revocation and trusted endpoints; event/visit schema and idempotency/version constraints; field/action permissions; pending/denied/failed UI states; responsive staff Scan/member Pass access and executed-evidence requirements. Link real card IDs and global sequence numbers after OpenKBS planning. See [AGENTS](../AGENTS.md), [membership](onboarding-membership.md), [classes](classes-courses-attendance.md), [coaching](coaching-pt.md) and [gaps](../docs/planning-gap-register.md).

## Feature pipelines — repository 0.20

[Reception, QR Access and Occupancy](../docs/workflows/entry.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

Connected operational handoff: [WF-MEM-08 — Payment reversal or late failure after membership activation](../docs/workflows/mem.md#wf-mem-08). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-MEM-09 — New forms or policy versions affecting existing members](../docs/workflows/mem.md#wf-mem-09). Apply its current authority/decision/record boundaries; it does not invent a new policy.

## Connected completed gap capabilities — 0.22

[trials-guests](trials-guests.md), [juniors-guardians](juniors-guardians.md). Apply the same source records, grants and activation/readiness gates; no duplicated account/task/financial truth or automatic privileges.

Apply the [logical data, field-grant and reporting extension](../docs/data-extension-contracts.md) when completing entities, permissions, metrics and recovery. These are shared responsibilities, not a second account/task/financial engine.
