# Document composition, forms and issued history

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[08-design-branding-documents-pages.md](../docs/modules/08-design-branding-documents-pages.md); [04-staff-hr-and-rotas.md](../docs/modules/04-staff-hr-and-rotas.md)

Relevant source blocks: OG-SRC-0125, OG-SRC-0126, OG-SRC-0127, OG-SRC-0128, OG-SRC-0129, OG-SRC-0130, OG-SRC-0131, OG-SRC-0132, OG-SRC-0133, OG-SRC-0134, OG-SRC-0171, OG-SRC-0192. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Authorised user composes reusable templates with controlled static content and typed company/gym/person/transaction/job fields, previews and validates, submits review and publishes a version. Owning membership/HR/finance module issues/signs the resulting document through its own command; template editing alone does not issue an invoice or signature.

## Authoritative records and lifecycle

Template/version/type/variables, review/publication, source references, generated document/snapshot and signature/acknowledgement evidence. Consume Company Settings brand; freeze issued content/data/brand/template. Later logo/profile/template changes do not modify old contracts/receipts.

## Controls and connected consequences

Provide variable picker/required-field validation and truthful unresolved values. Restrict template/edit/publish/issue and sensitive documents independently. Document title/public download link never bypasses audience controls. Default and company/gym brand inheritance apply to new documents under configured billing identity.

## Decisions and dependencies

Final template/legal/safety content, signature mechanism and retention need GAP11 and configured integrations. No legal approval is inferred from publication. Implement preview/export fidelity, private delivery and version preservation with evidence.

## Acceptance and implementation completion

Planned cross-module criteria: AC05, AC20, AC28, AC43, AC49 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Feature pipelines — repository 0.20

[Landing Pages and Public Content](../docs/workflows/land.md), [Documents, Templates and Signed/Issued Records](../docs/workflows/doc.md), [Selectable UI, Branding and Responsive Experience](../docs/workflows/design.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Operational exception review — edition 0.21

- [WF-LAND-11 — Published page loses an approved source record](../docs/workflows/land.md#wf-land-11)

Keep these subflows linked to the existing feature/source record. Read [operational decisions](../docs/decisions/operational-decisions.md); Current product routes/defaults are specified; exact tenant values/modes requiring setup and real provider proof must satisfy readiness before activation. Local planned acceptance was extended through AC70.

Connected operational handoff: [WF-MEM-09 — New forms or policy versions affecting existing members](../docs/workflows/mem.md#wf-mem-09). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-USER-11 — Personal identity versus company-specific person records](../docs/workflows/user.md#wf-user-11). Apply its current authority/decision/record boundaries; it does not invent a new policy.

## Connected completed gap capabilities — 0.22

[trials-guests](trials-guests.md), [juniors-guardians](juniors-guardians.md), [imports-reconciliation](imports-reconciliation.md). Apply the same source records, grants and activation/readiness gates; no duplicated account/task/financial truth or automatic privileges.


## Document and form catalogue — 0.29

Use the [current document contract](../docs/documents/document-contract.md) with DCT type catalogue, typed fields, declarative layouts, content-readiness gates and planned acceptance. Upload/form/acknowledgement/signature/issued financial snapshot remain distinct. Company-reviewed legal/health/safety wording and actual original documents remain required inputs; placeholders do not become approved content. Owning source commands control issue/sign/review/payment, and historical issued/signed data/brand versions stay frozen.


## Current UI direction extension — 0.35

The five-style settings and component contract in docs/design/ui-direction-settings.md, style-options.json and appearance-settings-contract.json extends the existing five directions with Neumorphic06 and develops Flat02/Glass04. Five styles are selectable with ten light/dark mappings; Neumorphic06 retains its two mappings but is deferred (founder decision, 9 Nov 2026). Earlier five-style references/images record the prior baseline. Existing workflows, permission/source rules and business behaviour remain unchanged. Style selection does not activate white labelling; published scope, reduced-effects fallbacks, print-safe outputs and immutable issued snapshots follow that contract.
