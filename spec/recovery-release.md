# Reliability, privacy, migration and release verification

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[10-data-integration-and-verification.md](../docs/modules/10-data-integration-and-verification.md)

Relevant source blocks: OG-SRC-0186, OG-SRC-0187, OG-SRC-0188, OG-SRC-0189, OG-SRC-0190, OG-SRC-0191, OG-SRC-0192, OG-SRC-0193, OG-SRC-0194, OG-SRC-0225, OG-SRC-0226, OG-SRC-0227, OG-SRC-0228, OG-SRC-0229, OG-SRC-0230, OG-SRC-0231, OG-SRC-0232, OG-SRC-0233, OG-SRC-0234, OG-SRC-0235, OG-SRC-0238, OG-SRC-0239, OG-SRC-0240, OG-SRC-0241, OG-SRC-0242. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Plan and verify real tenant-safe runtime, provider boundaries, event/backfill migrations and recovery before production. Draft/autosave/upload/session states distinguish local versus durable saved data; resize/rotation and retries preserve recoverable context. Full offline operation is not agreed.

## Authoritative records and lifecycle

Versioned commands/events/outbox, retry/failure state, evidence/database backup, migration/checkpoint, monitoring/incident ownership and release evidence. Capacity/entitlement/stock changes are transactional. Avoid obsolete events overriding newer state; do not claim exactly-once transport.

## Controls and connected consequences

Backups cover both database and files and restore reconciles pending charges/bookings/jobs and issued histories. Deactivation/archive/deletion and retention are explicit authorised processes. No real sensitive data in development. Tests report actual environment/build/inputs/results and remaining gaps; attractive pages/deployment alone do not satisfy acceptance.

## Decisions and dependencies

GAP01, GAP11, GAP15–16 require actual project inspection, retention/export/privacy roles, measurable performance/capacity/file/recovery targets and explicit first-release boundary. Numbered plan/card verification follows OG-REV-011; build/deployment/release approval remain distinct.

## Acceptance and implementation completion

Planned cross-module criteria: AC01, AC35, AC36, AC38, AC54, AC55 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Feature pipelines — repository 0.20

[Reliability, Data Lifecycle and Release](../docs/workflows/release.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Connected completed gap capabilities — 0.22

[imports-reconciliation](imports-reconciliation.md), [privileged-auth-recovery](privileged-auth-recovery.md). Apply the same source records, grants and activation/readiness gates; no duplicated account/task/financial truth or automatic privileges.


## Current setup and handoff — 0.30

Start with CURRENT_BASELINE.md at repository root and the current BUILD_BRIEF.md. The [setup hub](../docs/setup/setup-hub.md) combines resumable scoped sections, responsibility delegation, capability-specific current gates and new-gym inheritance. Optional/missing setup does not create a global block or bypass source requirements. Remaining inputs and actual OpenKBS evidence are enumerated in docs/delivery/remaining-inputs.csv and the current handoff audit. Current brief is planning/cards only, not build/deployment authority.
