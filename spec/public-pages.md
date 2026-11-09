# Platform marketing, company/gym pages and coach cards

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[08-design-branding-documents-pages.md](../docs/modules/08-design-branding-documents-pages.md); [03-classes-coaches-and-attendance.md](../docs/modules/03-classes-coaches-and-attendance.md)

Relevant source blocks: OG-SRC-0031, OG-SRC-0032, OG-SRC-0033, OG-SRC-0034, OG-SRC-0035, OG-SRC-0036, OG-SRC-0037, OG-SRC-0053, OG-SRC-0054, OG-SRC-0055, OG-SRC-0056, OG-SRC-0067, OG-SRC-0155, OG-SRC-0156, OG-SRC-0157, OG-SRC-0158, OG-SRC-0159, OG-SRC-0160, OG-SRC-0173, OG-SRC-0174, OG-SRC-0175. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Default platform landing markets Orb Gym with owner signup/sign-in. Company pages present their approved gyms/logos/services and member joining. Adding a gym creates a linked draft page/card; after explicit public status, approved Settings data updates pages automatically. Gym page uses approved plans/offers, classes and coach/staff flip cards.

## Authoritative records and lifecycle

Public gym/coach projection, page/section/version, public status, approved media/social URLs, metadata/slug/redirect and content changes. Upload/guideline extraction is a reviewed suggestion, preserves manual edits and never publishes private files. Company white-label activation is independent of merely adding a logo.

## Controls and connected consequences

Flip cards have photo/name/role front and approved specialities/fees/services behind, usable by tap/keyboard/reduced motion. CTAs preserve gym/offer/service context. Public output excludes HR/payroll/rent/internal client/member records. Gym unpublish/archive/rename handles old links; invalid updates retain last valid projection.

## Decisions and dependencies

Domain/search/analytics/map/sender integration and public-asset rights require GAP10, GAP13. Do not publish customer gyms on central platform marketing automatically. Exact footer remains. Existing memberships/receipts are not affected by public page edits.

## Acceptance and implementation completion

Planned cross-module criteria: AC29, AC30, AC50 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Feature pipelines — repository 0.20

[Landing Pages and Public Content](../docs/workflows/land.md), [Selectable UI, Branding and Responsive Experience](../docs/workflows/design.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Operational exception review — edition 0.21

- [WF-LAND-11 — Published page loses an approved source record](../docs/workflows/land.md#wf-land-11)

Keep these subflows linked to the existing feature/source record. Read [operational decisions](../docs/decisions/operational-decisions.md); Current product routes/defaults are specified; exact tenant values/modes requiring setup and real provider proof must satisfy readiness before activation. Local planned acceptance was extended through AC70.

Connected operational handoff: [WF-SPACE-05 — Archive one gym without abandoning its obligations](../docs/workflows/space.md#wf-space-05). Apply its current authority/decision/record boundaries; it does not invent a new policy.

## Connected completed gap capabilities — 0.22

[trials-guests](trials-guests.md), [juniors-guardians](juniors-guardians.md). Apply the same source records, grants and activation/readiness gates; no duplicated account/task/financial truth or automatic privileges.


## Current UI direction extension — 0.35

The five-style settings and component contract in docs/design/ui-direction-settings.md, style-options.json and appearance-settings-contract.json extends the existing five directions with Neumorphic06 and develops Flat02/Glass04. Five styles are selectable with ten light/dark mappings; Neumorphic06 retains its two mappings but is deferred (founder decision, 9 Nov 2026). Earlier five-style references/images record the prior baseline. Existing workflows, permission/source rules and business behaviour remain unchanged. Style selection does not activate white labelling; published scope, reduced-effects fallbacks, print-safe outputs and immutable issued snapshots follow that contract.
