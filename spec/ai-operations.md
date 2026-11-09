# Orb owner assistant and background insights

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[09-navigation-calendar-ai.md](../docs/modules/09-navigation-calendar-ai.md); [08-design-branding-documents-pages.md](../docs/modules/08-design-branding-documents-pages.md)

Relevant source blocks: OG-SRC-0131, OG-SRC-0132, OG-SRC-0133, OG-SRC-0134, OG-SRC-0176, OG-SRC-0177, OG-SRC-0178, OG-SRC-0179, OG-SRC-0180, OG-SRC-0181, OG-SRC-0182, OG-SRC-0183, OG-SRC-0184, OG-SRC-0185, OG-SRC-0211, OG-SRC-0212. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Owner asks Orb for sourced reports, analysis, advice or supported execution across authorised gyms. Orb identifies period/missing data and links evidence. A clear instruction may authorise routine tasks/reports/permitted updates without repeated confirmation; approval-sensitive actions follow the normal business workflow.

## Authoritative records and lifecycle

AI job/proposal, source/model/prompt versions, authorised command/operation ID, execution outcome and review. Retrieval uses current tenant/gym/role/field grants. Uploaded documents/feed content are untrusted data, not instructions that can grant authority.

## Controls and connected consequences

Payments/refunds, signatures/contracts, access/deletion, external publishing and consequential scheduling do not bypass their rules. Retry protection prevents duplicate changes; partial failure is truthful and normal app tools remain usable if AI fails. Photo analysis suggests potential issues, never proves safety, cleaning quality or clinical/legal compliance.

## Decisions and dependencies

Choose model/tool hosting, data handling, cost/limit and evidence evaluation after actual capability inspection. Brand extraction is preview-only until approved; Orb name is fixed and icon follows approved company branding. Staff/member background prompts do not require a universal chat UI.

## Acceptance and implementation completion

Planned cross-module criteria: AC32, AC34, AC46 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Feature pipelines — repository 0.20

[Orb Assistant and Background Insights](../docs/workflows/ai.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.
