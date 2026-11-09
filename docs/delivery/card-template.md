# Delivery Card Template

Template only: no actual board card or number is assigned here. Replace placeholders using the approved dependency order and actual returned OpenKBS ID.

Title: **NN — Concrete delivery outcome** (NN starts at 00 for the first actual delivery card).

| Field | Required content |
|---|---|
| Sequence / stable board ID / kind | Global numeric order; returned platform ID; parent/implementation/decision/verification. |
| Objective | User trigger and concrete outcome. |
| Source | OG-SRC/OG-REV/atomic IDs and exact repository paths. |
| Scope | Included/excluded behaviour, journeys, roles and company/gym boundary. |
| Current state | Inspected actual capability and evidence; no assumed backend. |
| Specification/plan | Spec and implementation-plan paths/sections. |
| Data and commands | Owning records, state transitions, trusted action/field rules and connected effects. |
| Dependencies | Actual predecessor IDs/numbers; parent/children; blocked decisions and accountable role/next action. |
| Integration and recovery | Provider boundaries, migration/rollback, failed/pending/retry/concurrency handling. |
| Acceptance | Success, negative access, failure/retry and relevant role/device checks. |
| Evidence and state | Required versus executed evidence, review, remaining gaps and deployment/release state. |

Follow ../board-card-contract.md for all numbering, rollup, reordering, Ready/Done and card creation rules. Examples in documents do not create cards. New planning cards stay Backlog; preserve unrelated existing work.
