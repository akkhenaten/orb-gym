# Application shell, profile and selectable branding

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[01-workspaces-and-access.md](../docs/modules/01-workspaces-and-access.md); [08-design-branding-documents-pages.md](../docs/modules/08-design-branding-documents-pages.md); [09-navigation-calendar-ai.md](../docs/modules/09-navigation-calendar-ai.md); [12-access-navigation-and-notifications.md](../docs/modules/12-access-navigation-and-notifications.md)

Relevant source blocks: OG-SRC-0020, OG-SRC-0021, OG-SRC-0029, OG-SRC-0127, OG-SRC-0128, OG-SRC-0129, OG-SRC-0130, OG-SRC-0131, OG-SRC-0132, OG-SRC-0133, OG-SRC-0134, OG-SRC-0135, OG-SRC-0136, OG-SRC-0137, OG-SRC-0138, OG-SRC-0139, OG-SRC-0140, OG-SRC-0141, OG-SRC-0142, OG-SRC-0143, OG-SRC-0144, OG-SRC-0145, OG-SRC-0146, OG-SRC-0147, OG-SRC-0148, OG-SRC-0149, OG-SRC-0150, OG-SRC-0151, OG-SRC-0152, OG-SRC-0153, OG-SRC-0154, OG-SRC-0161, OG-SRC-0162, OG-SRC-0163, OG-SRC-0164, OG-SRC-0165, OG-SRC-0166, OG-SRC-0167, OG-SRC-0168, OG-SRC-0169, OG-SRC-0170, OG-SRC-0171, OG-SRC-0172, OG-SRC-0197, OG-SRC-0204. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Company configures a full UI preset, logo/icon, colours and details; previews, saves and publishes through Company Settings. Gyms inherit or apply permitted overrides. Users control personal avatar/name/notification and light/dark/system preferences. Preserve context/drafts when switching modes or resizing.

## Authoritative records and lifecycle

Versioned theme/brand assets, workspace/gym configuration and personal preferences. Default Basic 01/Orb Gym identity persists until explicit white-label activation; disable/rollback restores defaults without rewriting issued documents. Style selection and white-label activation must have separate explicit states.

## Controls and connected consequences

Five complete styles across all modules/journeys. Desktop left nav, iPad/tablet/mobile bottom including landscape. Exact mandatory footer on every app/public page. Company icon changes Orb’s icon under the approved policy; name stays Orb. Branding cannot alter billing entity, privileges or required accessibility.

## Decisions and dependencies

Produce complete token/component/state/preset/mode bindings, final routes/layouts and approved icon/reverse logo assets. GAP09–10 apply. Existing source values and proposed mappings must not be relabelled approved production tokens.

## Acceptance and implementation completion

Planned cross-module criteria: AC04, AC05, AC06, AC07, AC51, AC52 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Feature pipelines — repository 0.20

[User Management, Accounts and Permissions](../docs/workflows/user.md), [Landing Pages and Public Content](../docs/workflows/land.md), [Documents, Templates and Signed/Issued Records](../docs/workflows/doc.md), [Calendar, Dashboard and Notifications](../docs/workflows/cal.md), [Selectable UI, Branding and Responsive Experience](../docs/workflows/design.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Operational exception review — edition 0.21

- [WF-USER-11 — Personal identity versus company-specific person records](../docs/workflows/user.md#wf-user-11)
- [WF-LAND-11 — Published page loses an approved source record](../docs/workflows/land.md#wf-land-11)

Keep these subflows linked to the existing feature/source record. Read [operational decisions](../docs/decisions/operational-decisions.md); Current product routes/defaults are specified; exact tenant values/modes requiring setup and real provider proof must satisfy readiness before activation. Local planned acceptance was extended through AC70.

## Connected completed gap capabilities — 0.22

[trials-guests](trials-guests.md), [juniors-guardians](juniors-guardians.md), [privileged-auth-recovery](privileged-auth-recovery.md). Apply the same source records, grants and activation/readiness gates; no duplicated account/task/financial truth or automatic privileges.


## Current UI direction extension — 0.35

The five-style settings and component contract in docs/design/ui-direction-settings.md, style-options.json and appearance-settings-contract.json extends the existing five directions with Neumorphic06 and develops Flat02/Glass04. Five styles are selectable with ten light/dark mappings; Neumorphic06 retains its two mappings but is deferred (founder decision, 9 Nov 2026). Earlier five-style references/images record the prior baseline. Existing workflows, permission/source rules and business behaviour remain unchanged. Style selection does not activate white labelling; published scope, reduced-effects fallbacks, print-safe outputs and immutable issued snapshots follow that contract.
