# Feature Specification Briefs

Repository edition 0.22. These twenty populated briefs define product behaviour and connected boundaries from the complete architecture/module sources. They are draft receiving-builder specifications, not a claim of an inspected runtime, finished API/schema or approved unresolved business policy. Source module detail remains authoritative; do not use these briefs to omit it.

OpenKBS must inspect the actual project and complete per-feature technical design, permission/state matrices, integration choices, migrations/recovery, UI/token binding and verification before the affected implementation card is Ready. Preserve settled rules, source IDs and all explicit open decisions. Every card links its spec and uses global 00, 01, 02… numbering; filenames below are not delivery sequence assignments.

| Specification | Primary detailed modules | Planned acceptance |
|---|---|---|
| [Workspace, identity and platform administration](workspace-access.md) | 01 | AC01, AC02, AC03, AC37, AC38 |
| [Application shell, profile and selectable branding](shell-settings-branding.md) | 01, 08, 09, 12 | AC04, AC05, AC06, AC07, AC51, AC52 |
| [Member joining, membership lifecycle and retention](onboarding-membership.md) | 02 | AC08, AC09, AC10, AC12, AC32, AC38, AC39 |
| [Classes, RSVP, blocks/courses and registers](classes-courses-attendance.md) | 03 | AC15, AC16, AC17, AC18, AC40 |
| [Rental coaches, employed coaches and hourly PT](coaching-pt.md) | 03 | AC11, AC12, AC13, AC14, AC17, AC41 |
| [Staff HR, contracts, training and rota](staff-hr-rota.md) | 04, 03 | AC19, AC20, AC42, AC43 |
| [Shared task engine, assets and contractor work](tasks-assets-contractors.md) | 05 | AC21, AC22, AC23, AC24, AC25, AC44 |
| [POS, payments, live stock and receipts](pos-stock.md) | 06, 02 | AC26, AC27, AC28, AC47 |
| [Community, communications, queries and feedback](feed-feedback-cases.md) | 07, 05 | AC23, AC31, AC48, AC53 |
| [Document composition, forms and issued history](documents.md) | 08, 04 | AC05, AC20, AC28, AC43, AC49 |
| [Platform marketing, company/gym pages and coach cards](public-pages.md) | 08, 03 | AC29, AC30, AC50 |
| [Portfolio finances, operational reports and analytics](finance-reports.md) | 11, 10 | AC25, AC41, AC45, AC46 |
| [Shared calendar, scheduled work and notifications](calendar-notifications.md) | 09, 12 | AC17, AC19, AC33, AC42, AC48, AC51 |
| [Orb owner assistant and background insights](ai-operations.md) | 09, 08 | AC32, AC34, AC46 |
| [Reliability, privacy, migration and release verification](recovery-release.md) | 10 | AC01, AC35, AC36, AC38, AC54, AC55 |
| [Reception, entry/exit and live occupancy](reception-entry-exit.md) | 01, 03, 10 | AC01, AC09–12, AC18–19, AC32–33, AC35, AC38 |

For complete journey handoffs and exception branches, read the [architecture trace](../docs/journey-architecture-trace.md) and [exceptions](../docs/journey-exceptions-and-handoffs.md). The reception brief is a distinct receiving implementation scope already contained in the product sources; this is not a new module request.

## Feature pipelines

All twenty briefs now link their receiving [feature pipelines](../docs/workflows/README.md). The catalogue describes 149 primary/exception product workflows for 134 features across 21 domains with conditions, checkpoints, handoffs and alternatives. OpenKBS must complete technical transitions and map FEAT/WF/source IDs to numbered delivery cards and acceptance. A module parent or visible page alone does not prove feature coverage.

## Four completed gap capabilities — 0.22

| Specification | Source extension | Workflow domain | Planned acceptance |
|---|---|---|---|
| [Trials/guests](trials-guests.md) | OG-EXT-001 | TRIAL | AC71–74 |
| [Juniors/guardians](juniors-guardians.md) | OG-EXT-002 | JUNIOR | AC75–80 |
| [Imports/reconciliation](imports-reconciliation.md) | OG-EXT-003 | IMPORT | AC81–85 |
| [Privileged auth/recovery](privileged-auth-recovery.md) | OG-EXT-004 | AUTH | AC86–89 |

Together with the sixteen existing briefs, twenty specifications cover 134 declared product features and 149 primary/exception workflows. [AC90](../docs/acceptance-scenarios.md) checks required setup/publication gates. The tenant values and actual technical capabilities remain required inputs, not guessed defaults.
