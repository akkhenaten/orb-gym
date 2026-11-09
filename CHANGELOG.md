# 0.36 — five selectable UI presets confirmed

Founder confirmed five selectable UI presets on 9 November 2026. The original five (basic-01, flat-02, editorial-03, glass-04, console-05) remain the selectable set. Neumorphic06 is retained with full token definitions but marked selectable:false and status:deferred, because no rendered application or visual reference exists for it. docs/design/style-options.json is authoritative; validate_ui_styles.py now asserts five selectable presets and the ten matching light/dark theme modes, and reports deferred presets separately. This resolves the five-versus-six conflict: the preserved 0.17 source text ("all five presets") now agrees with the current contract, so no provenance re-baseline is required. All other 0.35 content is unchanged.

## Builder handover (same edition)

`HANDOVER.md` is the builder entry point, linked from README.md, BUILD_BRIEF.md and AGENTS.md. It records the
owner's 9 November 2026 implementation authority (one complete app, not slices; deployment, live providers and
policy changes still unauthorised), which supersedes the planning-only 0.35 brief and the "no implementation
authorised" wording; both are retained for provenance. It states the merge rule (`npm run check`), what is
generated, the proposal protocol, the deliberate refusals that must not be "fixed", a do-not list, the six open
owner decisions and builder-owned priorities.

Enforcement, not just prose: derived transitions now need an `approval` record; the core compiler skips any
`proposed` transition unless `ORB_ALLOW_PROPOSED=1`. `npm run compile` runs the whole pipeline in dependency order
(`build-all.mjs`); `npm run gates` and `npm run check` added. `validate_handover.py` checks the entry links, that every
path HANDOVER.md names exists, that its counts match the compiler, and that no current document describes six
selectable presets. That last check found 22 stale "six presets" statements across 15 unpinned files (including
"Show six single-select cards" in ui-direction-settings.md); all are corrected to five selectable with Neumorphic06
deferred.

Reproducibility defect found by the first `npm run check`: eight compilers stamped wall-clock `generated_at`, so every compile drifted 8+ manifest hashes and a builder could never pass the merge rule. `build-clock.mjs` now uses `SOURCE_DATE_EPOCH` or a fixed marker; two consecutive compiles are byte-identical across all generated and derived files, and a test asserts no wall time. A second location defect was found by unpacking the release zip elsewhere and running `npm run check` there: `compile-report.json` embedded the absolute build path, so any fresh clone failed its first check. It is now repo-relative, and `validate_handover.py` rejects any generated or derived file containing the build path. 123 app tests and 19 gates pass.

## Live records UI (same edition, includes a correction)

Correction: an earlier status note said there was no UI runtime. That was wrong. `app/src/ui.mjs` already served
114 screens under the five selectable presets with a command console. The real gap was data: screens showed
contracts but no records, and commands needed a typed record ID.

`app/src/records.mjs` adds the data plane: screen tables are derived from bound commands, rows list inside one
workspace with the transitions valid from their current state, and actions carry the row version. Generic record
creation is a dev-fixture path behind `ORB_DEV=1`, because the spec has no creation commands; outside dev it is
refused with `CREATION_COMMAND_ABSENT`. `compile-ui.mjs` now binds derived overlay transitions, which previously
compiled but were unreachable from any screen; `VoidCustomerCharge` and `VoidCreditNote` now bind to six finance
screens. The binding test asserts every compiled command (233 source plus 2 derived) is reachable. 121 app tests
and 18 gates pass.

## Void-before-reference policy (same edition, owner-approved)

Two derived transitions in `docs/derived/state-overlay.json`, compiled through the same checks as source rows and
tagged `source: 'derived'` (report counts: 233 source, 2 derived). `VoidCustomerCharge` is refused while any
`payment_allocation.charge_or_invoice_id` or `credit_note.charge_or_invoice_id` references the charge; such charges
are corrected by credit note. `VoidCreditNote` carries a recorded `guard_gap` because no entity references credit
notes. Both require `finance.reconcile` and a `void_reason`; the engine gained declarative `no_referencing_rows`
guards evaluated inside the commit transaction and writes the reason and source into the audit detail.
Reachability is now computed from transitions rather than asserted: charges POSTED|VOID fully reachable, credit
notes ISSUED|VOID reachable, DRAFT unreachable. 113 app tests and 18 gates pass.

## State constraints and charge/credit overlay (same edition, includes corrections)

Corrections to earlier entries in this edition:
- No charge state machine exists. `VOID` appears only as `VOIDED` on SM-SALE (TR-112). Charges and credit
  notes have no machine and no transitions at all.
- The "22 entities with machines but no status field" finding is a catalogue omission only. The compiler
  already projected a managed `status` column for all 40 machine-backed tables.
- The `refunds` metric was bound to MET-FIN-06 (collection reversals). It is now MET-FIN-05 (refunds), and the
  reporting compiler rejects any binding whose catalogue label does not describe the metric's SQL.

Changes: every machine-backed `status` column now carries `CHECK (status IN (...))` from its machine, so
storage refuses impossible states (an engine test that seeded `NOT_A_REAL_STATE` now asserts the refusal and
uses a real wrong state for the INVALID_STATE path). `derive-state-overlay.mjs` writes
`docs/derived/state-overlay.json`, giving ENT-CustomerCharge `POSTED|VOID` and ENT-CreditNote `DRAFT|ISSUED|VOID`
with each state quoted verbatim from MET-FIN-01/02 and refused if it would shadow a source machine. Posted
charges, posted credits and net charge activity now execute against those columns; VOID/DRAFT records are
excluded and tested. Because no source transition reaches either entity, VOID and DRAFT are unreachable in
normal operation: recorded as an owner decision. `validate_state_overlay.py` checks all 42 constrained
columns. 105 app tests and 18 gates pass.

## Capability and integration runtimes (same edition)

`compile-capabilities.mjs` projects all 22 capabilities with their seven-state contracts. `app/src/capabilities.mjs`
evaluates state per call from supplied evidence and explicitly refuses an editable readiness flag, which the pack
forbids ("no editable is_ready boolean"); `ready` and `enabled` are separated so complete evidence without an
exercised service can never read as live. `app/src/integrations.mjs` authenticates inbound provider events with
HMAC-SHA256 over timestamp and body, a constant-time comparison and a replay window, refuses entirely when no
secret is configured, and stores each event id once so a delivery retry is a duplicate rather than a second
effect. POS sales validate balance in integer minor units with no implicit quantity multiplication; live
collection is refused while CAP-POS is not enabled and again with `LIVE_TILL_PROVIDER_UNTESTED` when it is. A
gate asserts the POS sale can never report success. 98 app tests and 17 gates pass.

## Document rendering engine (same edition)

`compile-documents.mjs` projects 34 template types, 52 typed fields and 34 declarative layouts, verifies that
all 162 template payload bindings resolve to the field catalogue, and records that only 1 of 52 field sources
resolves to a generated column. `app/src/documents.mjs` renders drafts against an allowlisted, type-checked
payload: unknown fields are refused, type families are enforced, absent optional fields stay absent, and
`protected_*` references are withheld from the body. Rendering is deterministic (sorted-key SHA-256 over the
rendered body, stable under payload key reordering). Issue is refused while the pack records content as
unapproved and the signature provider as untested, and the refusal names each blocking axis. A gate keeps the
runtime from ever claiming an approval the pack does not record. 77 app tests and 16 gates pass.

## Reporting engine (same edition)

`compile-reporting.mjs` projects all 62 metrics and 10 report views and pairs each metric with an
implementation status, so a report can never present an unimplemented metric as a zero.
`app/src/reporting.mjs` executes five money metrics as SQL over the generated tables and reproduces the
pack's synthetic fixtures exactly, including deduplication by `provider_reference` so repeated provider
callbacks do not inflate collections. 21 metrics carry the specific blocking reason and 2 are unavailable
by design. This addresses the pack's own `actual_schema_queries_tested: false` for a defined subset.
New finding: `customer_charge` and `credit_note` declare no state column, so posted-versus-void is undecidable
(this entry originally said a charge state machine declares `VOID`; that was wrong, see the correction below); the engine detects this at runtime and refuses to
return a number. A gate keeps every metric classified. 67 app tests and 15 gates pass.

## Relationship overlay and commercial policy gate (same edition)

The 11 orphaned entities are addressed without inventing schema: `derive-relationships.mjs` reads each orphan's
declared `*_id` fields and emits 13 evidence-backed edges (`docs/derived/relationships-inferred.json`), each naming
the field that implies it and carrying no rule prose; source rows are never modified or duplicated. 10 orphans are
linked, `ENT-AuditEvent` is recorded as an open decision, and 11 entities are reported as under-specified because
their prose names entities they declare no field for. Commercial policy is now a fail-closed gate: all 11 policies
and their 90 required fields are registered with no values, `_policy_setting` stores tenant values per workspace
with versioning, and a command declaring a governed `workflowId` is refused with `POLICY_UNCONFIGURED` until its
policies are complete. Two new gates make this durable (15 total). 57 app tests pass.

## Command wiring and notification delivery (same edition)

Screens now execute commands: `generated/screen-commands.mjs` binds 233 commands across 104 screens by shared
domain vocabulary (median 14 per screen), and each screen runs them against the real engine. Notification delivery
is implemented as a transactional outbox (`app/src/notify.mjs`): `_notification_outbox`, `_notification_attempt`,
`_notification_inbox` and `_notification_preference` are generated tables; the engine enqueues inside the command's
transaction so a rolled-back command cannot leave a sent notification; deduplication, supersede, bounded retry with
backoff, quiet-hour deferral and per-channel consent are enforced. 46 app tests pass. Recorded gaps: the
specification has no transition-to-event edge, and `external_channels` is prose rather than a list, so no event is
auto-fired and external channels are unconfigured by design. A real defect was caught and fixed here: treating the
prose channel field as an array produced 77 bogus delivery attempts per notification.

## UI shell and delivery board (same edition)

`app/tools/compile-spec/compile-ui.mjs` now compiles the interface and the OpenKBS delivery index from the
design and workflow contracts: 114 screens with unique routes (`generated/screens.mjs`), five selectable presets
as ten light/dark modes (`generated/theme.mjs`), and the OG-REV-011 numbered index of 156 cards
(`generated/cards.mjs`, `docs/board-index.md`). The service renders every screen under any preset at `/app`.
27 app tests pass, including OG-REV-011 contiguity, parent-before-child ordering, prerequisite ordering and
preset differentiation. Recorded limitation: `feature-register.json` has no dependency field, so the card
sequence is a declared domain order, not a derived dependency sort. Screens render their contract but are not
yet wired to commands; notification delivery and integrations remain unbuilt.

## Application runtime (same edition)

`app/` is no longer a reserved boundary. It now holds a working service compiled from this specification: a spec compiler (`app/tools/compile-spec/compile.mjs`) projects the entity, relationship, state-machine, transition and permission contracts into SQLite schema and executable tables, and `app/src/engine.mjs` enforces the three authorization modes, individual deny precedence, optimistic concurrency, idempotent operation replay, workspace/gym isolation and audit. 78 tables, 459 typed columns, 233 commands, 232 permissions, 40 state machines. 15 acceptance tests pass. Identity is still a development header and no screens, notification delivery or integrations exist yet.

# 0.35 — 9 November 2026

Owner-selectable five-style UI catalogue: add Neumorphic06, expand Glass04 and Flat02 from founder direction, add appearance settings/publication/effects contract and proposed tokens for twelve modes. Preserve existing style IDs, workflow/source behaviour and original supplied artwork. Added UI-style documentation validator; rendered frontend/preview/accessibility tests remain implementation work.

# 0.34 — Role-to-journey review

Corrected assigned-worker start, limited member fault reporting, missing narrow self-service/default staff prerequisites and offer-decline/request-withdraw actor routes. Preserved existing wider delegated defaults and all previous source/authority/recovery fixes. Added persona checks; no live grants/provider/app changes.

# 0.33 — Recovery-path error review

Corrected suspended service-right restoration, transfer full/partial/exception/adjusted/cancel paths, accepted/unknown delivery failure and configured retry, and credential submit/review separation, definitive failed-tender draft recovery and pre-approval applicant withdrawal. Added 16 guarded transitions, 2 transfer outcomes and 2 explicit permissions; source/WF/feature IDs preserved. Added targeted recovery checks and synthetic quantity/status propositions; no app/provider/live operations.

# 0.32 — Second semantic error review

Separated tenant/lifecycle access, replaced conflicting default/alternate guards with canonical typed authorization on 217 transitions, split manual collection/guardian pay/PT disruption/cancellation authority, and fixed nested-manifest inventory checking. Prior public/signature/Basic typography corrections preserved. No application/provider/live permissions changed.

# 0.31 — Semantic error review and corrections

Corrected 17 unbound screens and public/auth access mode, all-required-signers/partial signature handling, guardian/staff cancellation permission variants, paired canonical operations and Basic body-weight mismatch. Replaced skipped sibling-source checks with portable integrity anchors, tightened manifest inventory and added cross-contract regressions. Existing source bodies/features/workflow IDs preserved; no live app operations.

# 0.30 — Unified setup hub and finite planning handoff

Added16 resumable setup sections, 22 capability readiness entries, new-gym inheritance, delegation/source-evidence records and 20 planned cases. Added three setup screens/permissions. Consolidated CURRENT_BASELINE and current BUILD_BRIEF, archived prior accumulated brief, and recorded finite handoff audit with 13 remaining input/evidence groups. Original product scope preserved. No app build/deployment/provider setup/live operations.

# 0.29 — Document and form catalogue

Added document/form type inventory, typed field bindings, declarative layouts, content-readiness gates, completion/review/signature/source-issue/correction rules and 24 planned checks. Own-signature starting template permission explicitly constrained to actual signatory/verified authority. Source scope/UI/access/notification/metric/lifecycle catalogues preserved. No approved legal/medical wording invented and no production issue/signature/provider configured.

# 0.28 — Shared logical data and lifecycle contract

Added core ENT/REL records, independent SM state dimensions and TR command/guard/effect/recovery contracts, full existing-workflow mapping, field/command dictionaries, diagrams and 28 planned cases. Explicit evidence-review and PT-delivery permissions added to avoid treating read/booking access as mutation authority. Source product scope and existing UI/access/notification/reporting work preserved. No database/API implementation or live operation.

# 0.27 — Metric definitions and report reconciliation

Added precise logical metric/report catalogues and CSV, cutoff/date/beneficiary/gym/currency rules, source drilldowns, completeness and AI/export contract. Included worked synthetic cash/debt/allocation/member/attendance/stock examples and 24 planned checks. Added two report setting/drilldown screens and reporting-basis permission. Original product scope, roles, notifications, styles/assets preserved. No application implementation, financial/tax policy selection or provider configuration.

# 0.26 — Notification and escalation specification

Added event-by-event communication catalogue/CSV, recipient and privacy rules, per-channel delivery states, configurable reminder/escalation/stop conditions, safe template examples, company/personal settings, five communication permissions and 24 planned acceptance cases. Three screen definitions added. Source business workflows, granular role model and five UI comparison images preserved. No live message/provider configuration or application deployment.

# 0.25 — Granular roles and individual permissions

Recorded founder role hierarchy, broad platform administration, company-wide owner scope, senior/local management, specialist templates and role/user overrides. Added action/field/scope/delegation/approval contract, effective-access UI, source mapping, editable template matrix and 22 planned access cases. Preserved five UI concepts, current product workflows and original source blocks. No live permissions, application implementation or deployment.

# 0.24 — Five dashboard comparison references

Added all five newly generated owner dashboard concepts with preset IDs, asset hashes, limitations and source links. Preserved all product/workflow/token definitions; Basic01 remains default and all five styles remain selectable. No app code or live deployment.

# 0.23 — Frontend blueprint

Added structured screen/action and workflow coverage, shared component rules, all five preset light/dark mappings, asset register, annotated wireframes, motion/state contracts, synthetic adverse scenarios and OpenKBS build-planning brief. Preserved 0.22 product scope and unfilled tenant setup values. No app implementation or live configuration.

# Change Log

## Repository edition 0.22 — 7 November 2026

- Completed seven operational designs with explicit defaults, configuration ownership and publication/activation gates.
- Added optional/configurable trials, juniors/guardians, controlled imports and privileged auth/recovery: four modules/specs, nineteen feature workflows and source extensions.
- Preserved original IDs/history and added OG-EXT-001–005 mappings plus acceptance AC71–90.
- Distinguished specified product capabilities from required tenant values, professional content review, real provider configuration and implementation evidence. No app/remote/account/payment actions.


## Repository edition 0.21 — 7 November 2026

- Reviewed actual v0.20 workflow consequences and identified twelve operational gaps/underdefined handoffs.
- Added fifteen source-grounded exception/lifecycle subflows with actor/checkpoint/guard/record/next-owner/failure tables, preserving all 115 feature IDs.
- Added seven proposed operational decisions, four optional feature proposals and planned acceptance AC56–AC70.
- Kept proposed scope/policy separate from accepted product requirements; no provider, membership, payment, supplier or remote app changes.


## Repository edition 0.20 — 7 November 2026

- Added 115 source-backed feature pipelines across seventeen domains, prioritising shared tasks, staff, user management and landing pages.
- Added per-feature actors, prerequisites, ordered checkpoints, authoritative outcomes/handoffs, explicit exception/policy branches and common acceptance/control contracts.
- Linked every feature brief and source index to the workflow catalogue; required workflow-to-card/acceptance mapping from OpenKBS.
- Preserved original source IDs, open policies, four role journeys, sixteen briefs and 00/01/02 delivery sequencing. No app/remote/card changes.


## Repository edition 0.19 — 7 November 2026

- Reviewed v0.18 against the founder discussion; all four journeys/core module categories retained.
- Added a dedicated reception/entry/exit/occupancy brief, journey-to-architecture trace and explicit exception/handoff rules.
- Strengthened class feedback links, corrected journey links and clarified current source/review metadata.
- Reindexed affected sources without inventing cards, policy decisions or runtime verification. No GitHub changes made.

## Repository edition 0.18 — 7 November 2026

- Created the requested repository-ready structure with README, AGENTS, app/assets/public/docs/spec/tests/scripts, configuration examples and contribution/security guidance.
- Retained the complete reviewed r2 architecture and module details, supplied logo, source IDs and previous handoff snapshot.
- Added fifteen populated feature specification briefs, four explicit journey guides, branding/design and configuration references, source mappings and repository-specific builder prompts.
- Preserved mandatory numbered delivery cards 00, 01, 02… in logical prerequisite order.
- No app code, real integrations, OpenKBS cards, GitHub remote or deployment created.

## Source baseline

Architecture 0.17, reviewed handoff 0.17-r2 (6 November 2026). The immutable previous handoff is in docs/baselines/. Historical pack review counts/checks remain evidence of those editions, not current app verification.
