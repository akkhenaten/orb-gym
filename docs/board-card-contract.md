# Delivery Board Card Contract

OpenKBS Board is the development board. It is not Orb Gym's customer operational task engine.

Create one parent card per coherent delivery area with smaller independently testable child cards. Use discovered supported card types/columns and exact returned IDs. Labels proposed: foundation, access, design, membership, staff, classes, coaching, facilities, contractor, finance, pos, community, publishing, ai, verification. Adapt to actual supported board controls.

## Required card body

- Card title, objective and user outcome.
- Source file paths, architecture baseline and OG-SRC references; atomic requirement IDs introduced by the specification.
- Included behaviour and exclusions; exact affected journey(s), roles and scope.
- Existing-code findings and reusable shared components/services.
- File path for bounded feature specification and implementation plan.
- Data/state transitions and server-side permissions.
- Dependency/parent/related card IDs and blocking decisions.
- Integrations, migration/backfill and recovery implications.
- Acceptance checks: success, denied access, duplicate/retry, failure and responsive behaviour as relevant.
- Validation evidence links, remaining gaps and review outcome.
- Deployment state recorded separately from implementation completion.

## Workflow

Backlog: scoped but not started. In Progress: actively implementing an authorised scope. Review: implementation and evidence ready. Done: required checks and review accepted. Use an explicit blocked field/link/comment with owner and next action instead of pretending work is in progress.

During planning, newly created delivery cards stay Backlog (or equivalent discovered column); preserve existing card states and record actual verified capability/delta work. Do not mark implemented, run builders or deploy.

Search existing cards first; reuse matching IDs and preserve unrelated work. Link parent/child and blocks/blocked-by using supported board relationships. Do not create both relationship directions blindly if the platform already supplies inverse links. Long description edits use the documented checkout/edit/save flow. Track requirements-to-cards in docs/delivery/requirements-coverage.csv.

A parent cannot be declared done while required children or linked acceptance checks remain open. Do not equate an attractive screen, successful deployment or AI claim with accepted behaviour.


Source traceability includes OG-REV-001 through OG-REV-011 as well as OG-SRC references. Use the Definition of Ready and Done in platform-evidence-and-delivery-gates.md. Do not put blockers only in chat: each affected card links its unresolved decision and accountable role.


## OG-REV-011 — Mandatory card numbering and logical sequence

Founder instruction: all Orb Gym delivery cards are numbered 00, 01, 02 and so on in logical delivery order.

1. Use one global sequence for the Orb Gym delivery plan, starting at 00. Every parent and child delivery card has its own unique number. Do not restart at 00 per module or use unnumbered delivery cards. Card titles use `00 — Clear delivery outcome`, `01 — Clear delivery outcome`, `02 — Clear delivery outcome`, etc. These are format examples, not a prescribed feature plan. Use a minimum of two digits; continue to 100 and beyond if required. Sort numerically rather than alphabetically.
2. Inspect/decompose the complete scope and dependency graph before assigning numbers or creating cards. Order executable work so every prerequisite is before the work that depends on it. Resolve or explicitly flag circular dependencies; numbering cannot make a dependency cycle valid. Parallel-ready cards may have adjacent numbers, with independence stated. A lower number alone does not grant execution authority.
3. Apply the existing priorities: project validation and foundations precede dependent workflows; tenancy/access and tokenised shell precede module use; shared services precede consumers; integrations and end-to-end verification precede the release they validate. The exact card count and detailed order are prepared by OpenKBS from actual findings. Do not number cards in the order the founder happened to mention modules.
4. Parent/group cards appear before their children in the index. Parentage is a rollup relationship, not an instruction for the parent to be completed before a child starts. Record real blockers separately. Dependent work waits for the applicable verified prerequisite or group completion, as specified. Keep all cards globally numbered even if grouping requires a non-contiguous set of child numbers.
5. Delivery numbers are human-readable sequence labels, separate from stable OpenKBS card IDs. Every index, specification, requirement mapping and dependency reference records both, for example `03 / <actual returned card ID>`. Never invent platform IDs. Add sequence number and card kind (parent/implementation/decision/verification) to the coverage/index outputs.
6. Create the new delivery cards in sequence and apply native board ordering where supported. Verify the resulting order rather than assuming creation order controls display. If the board cannot enforce ordering, keep numbered titles and make docs/delivery/card-index.md the explicit ordered delivery queue; report the UI limitation.
7. During initial planning, the sequence must be unique and contiguous from 00 to the final card, with no accidental gaps/duplicates. Preserve unrelated board cards. Reused Orb Gym cards retain their stable platform IDs and actual state; bring their title/sequence into the agreed plan without recreating them or claiming completed work is pending.
8. After work starts, preserve completed/in-progress card numbers and stable platform IDs. A later prerequisite must not be appended after its unstarted dependent merely to avoid reordering. Revise the unstarted sequence where needed, update every affected reference and record old number → new number → unchanged platform ID in the plan change log. If the change conflicts with already-started work, surface a remediation/dependency decision instead of falsifying history. Cancelled cards retain an explicit historical disposition; do not silently recycle their identifiers.
9. Before handing over, validate the dependency order, numbering, parent/child mapping, actual board IDs and file references. Report duplicates, missing numbers, unresolved cycles, blocked decisions and any board-sort limitations. A blocked card remains visibly blocked; independent authorised work may proceed without pretending the blocker is resolved.

## Feature workflow requirement — edition 0.20

Each feature implementation card must list covered FEAT/WF IDs from docs/workflows/catalogue.json and the relevant pipeline source. Include actual steps/states/actors/guards, alternative/denied/failure paths, owning records/linked modules, next owner/notification, evidence/audit rules and local acceptance. Follow docs/delivery/workflow-coverage.md. A card that only names a screen/module is not sufficient. Keep source grounding and real IDs alongside 00, 01, 02… numbering.


Current 0.22 scope: map all 242 OG-SRC, eleven OG-REV and five OG-EXT units through the current twenty feature briefs and 149 workflows for 134 features. DEC-GR-01–07 now specify product routes/defaults; missing tenant values, reviewed content and real provider proof are readiness inputs, not automatic approval. Include extension-source-map.json alongside the original source map. workflow-coverage.csv must link each applicable source/feature/workflow and guard/exception to actual numbered cards and local/cross-module acceptance through AC90. Use source-extension-register.md, gap-resolution-status.md and setup-and-readiness.md before interpreting old review statuses. No live service, account, payment or deployment is authorised by planning files.
