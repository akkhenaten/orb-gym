# Orb Gym application

Runtime implementation of the Orb Gym specification in `../repo/Orb_Gym_Repository`.
This directory was previously a reserved boundary; it now holds working code.

## Chosen technical layout

| Decision | Choice | Why |
|---|---|---|
| Runtime | Node 22+, ESM JavaScript, zero dependencies | The app must run wherever OpenKBS places it without an install step failing |
| Database | SQLite via built-in `node:sqlite` | Real transactions and constraints with no native build; swap the driver for Postgres without touching the engine |
| Schema | Generated from the spec by `tools/compile-spec` | 78 entities and 233 transitions cannot be hand-typed without drift |
| Writes | One trusted command endpoint | Every state change must pass the transition table, so no ad-hoc write route can bypass it |
| Money | Integer minor units in `*_minor` columns | `field-contract.json` forbids float money |

## Commands

```bash
node tools/compile-spec/compile.mjs      # schema, transitions, permissions, enums
node tools/compile-spec/compile-ui.mjs   # screens, themes, screen commands, cards
node tools/compile-spec/compile-notify.mjs # notification events
node tools/compile-spec/derive-relationships.mjs # relationship overlay + gaps
node tools/compile-spec/compile-commercial.mjs   # commercial policy registry
node --test                                                     # 15 acceptance tests
node src/server.mjs                                             # http://localhost:8787
```

## What is generated, never hand-written

`generated/` holds the projection of the specification:

- `schema.sql` — 78 tables, 459 typed columns, 40 state columns, audit and idempotency tables
- `transitions.mjs` — 233 commands with normalised authorization mode
- `permissions.mjs` — the 232 permission IDs
- `enums.mjs` — 40 state machines and their vocabularies
- `relationships.mjs` — 61 relationship edges plus the 11 entities with no edge at all
- `field-map.json` — every inferred column type, reviewable and overridable
- `compile-report.json` — counts and integrity gaps found while compiling

The compiler exits non-zero on any contract error, so it is a gate: an unknown
permission, a state not in its machine, or an entity without a table stops the build.

## Enforced behaviour

- Authorization modes `permission_all_of`, `verified_source_actor` and `context_routes`
- Individual deny always beats a held grant
- Optimistic concurrency on `expectedVersion`
- Idempotent replay on `operationId` (a retry returns the first outcome, never reapplies)
- Workspace and gym isolation on both commands and reads
- An audit event per accepted command, with the rejected follow-up leaving history intact

## Known limits

- Identity is a development header (`x-actor`), refused under `NODE_ENV=production`
  unless `ORB_ALLOW_DEV_ACTOR=1`. A real identity provider replaces `resolveActor()`.
- 11 entities have no relationship edge in the specification, so they are stored but
  not joinable; they are listed in `generated/relationships.mjs` rather than given
  invented foreign keys.
- The 114 screens are wired to commands: each screen runs the commands bound to it
  and shows the engine's real answer, including refusals. 104 screens have bindings
  (median 14 commands); the other 10 are public or projection surfaces with no
  command. The binding is derived from the shared domain vocabulary because the
  specification declares no screen-to-command edge.
- Notification delivery is a transactional outbox with deduplication, supersede,
  bounded retry with backoff, quiet-hour deferral and a real in-app inbox. Only the
  `in_app` channel has an adapter; every other channel records a failed attempt
  rather than pretending to send, because no provider, sender or credential has
  been selected.
- The specification contains no transition-to-event edge (both `source_id` values
  are single document references), so the engine never auto-fires a notification.
  Callers name the event; domain-adjacent candidates are reported, not applied.
- `external_channels` is prose in the catalogue, not a list, so external channel
  selection cannot be compiled. The prose is preserved per event as a note.
- Relationship orphans are closed by a derived overlay (`docs/derived/relationships-inferred.json`):
  13 edges, each carrying the declared `*_id` field that implies it and no rule prose.
  10 of 11 orphans are linked this way, 12 of the 13 edges are tenant or gym scope.
  `ENT-AuditEvent` cannot be derived (`workspace_id_or_platform` is a union) and is recorded
  as an open decision. 11 entities are also under-specified: their prose names another
  entity they declare no field for, listed as semantic gaps rather than invented columns.
- Commercial policies fail closed. All 11 policies are registered with their 90 required
  fields and none carries a value, because those belong to the tenant. A command declaring
  a `workflowId` governed by an unconfigured policy is refused with `POLICY_UNCONFIGURED`;
  values are recorded per workspace and versioned, and partial submissions are refused with
  the missing fields named. Gating depends on the caller declaring `workflowId`, because the
  specification offers no transition-to-workflow edge.
- Reporting is compiled and partly executable: all 62 metrics and 10 report views are registered,
  each metric is either implemented as real SQL (5 money metrics) or carries the specific reason it
  cannot be computed. Nothing returns zero in place of a value. The pack's own synthetic fixtures
  are reproduced exactly (posted charges 210.00, credits 20.00, net 190.00, collections 200.00,
  refunds 20.00), including the duplicate-callback case where five provider deliveries for four
  payments must still total 200.00.
- State columns: every one of the 40 machine-backed tables carries a compiler-managed `status` column
  with a `CHECK (status IN (...))` constraint taken from its machine, so a state outside the vocabulary
  cannot be stored. (The catalogue omits a state field for 22 of them; the compiler already
  compensates, so this is a documentation gap, not a runtime one.)
- Charges and credit notes have no source state machine at all, yet MET-FIN-01 requires "posted
  non-void" charges and MET-FIN-02 "exclude void/draft credits". `docs/derived/state-overlay.json`
  adds the minimum vocabulary those quotations require (`POSTED|VOID`, `DRAFT|ISSUED|VOID`), each
  state cited verbatim and gate-checked. If the overlay is absent, reporting returns UNAVAILABLE
  rather than guessing.
- Void policy (owner-approved): void only before anything references the record; every later
  correction is a credit note. Two derived transitions, tagged `source: 'derived'` and counted
  separately from the 233 source transitions: `DTR-001 VoidCustomerCharge` (POSTED to VOID) refuses with
  `CHARGE_HAS_ALLOCATION` or `CHARGE_HAS_CREDIT` when a `payment_allocation` or `credit_note` points at
  the charge; `DTR-002 VoidCreditNote` (ISSUED to VOID) has no derivable guard because nothing references
  a credit note. Both require `finance.reconcile` (the catalogue has no charge-correction permission;
  none was invented) and a `void_reason`, which is written to the audit event. Guards run inside the
  commit transaction. DRAFT credit notes remain unreachable because no command drafts one.
- Documents render as drafts, never as issued artefacts. All 34 template types, 52 typed fields
  and 34 declarative layouts are compiled; all 162 template payload bindings resolve to the field
  catalogue. A draft carries a visible `DRAFT — UNREVIEWED CONTENT — NOT FOR ISSUE` banner, refuses
  fields outside the template's allowlist, enforces the declared type families, reports absent
  optional fields as absent rather than filling them, and withholds `protected_*` references from
  the body. Issue is refused and names every open axis: content unapproved, signature provider
  untested, template SETUP_REQUIRED, or required fields missing.
- Binding reality: only 1 of 52 field `source` strings resolves to a generated column; the other 51
  are prose ("published Company Settings contact fields"). The renderer therefore takes a validated
  payload and never reads document values out of the database.
- Capability readiness is computed, never stored. All 22 capabilities compile with their declared
  seven-state contract, and evaluation runs per call from supplied evidence and permissions
  (`disabled_optional > blocked > draft > ready > enabled`, with `suspended` and `needs_revalidation`
  overriding). A caller supplying `is_ready` is refused with `NO_EDITABLE_READINESS`, because the pack
  forbids an editable readiness boolean. `ready` means evidence is complete but no service has been
  exercised; `enabled` requires both.
- Inbound provider events are authenticated and idempotent: HMAC-SHA256 over
  `${timestamp}.${rawBody}`, constant-time comparison, 300-second replay window, `NO_SECRET_CONFIGURED`
  when no secret exists, and `INSERT OR IGNORE` on the event id so a retry mutates nothing and a reused
  id with different content is flagged as `same_payload: false`.
- POS: a till sale must balance in integer minor units, where `amount_minor` is the line total and
  quantity is never multiplied implicitly. Live collection is refused twice over: while `CAP-POS` is not
  `enabled`, and again with `LIVE_TILL_PROVIDER_UNTESTED` even when it is, because no till provider or
  receipt device has been exercised. Cash is recorded as a payment method, not as a device integration.
- `feature-register.json` carries no dependency field, so the delivery-card
  sequence is a stable order by declared domain precedence, not a proven
  dependency sort. See `generated/board-report.json`.

## Live records (UI data plane)

Every screen whose bound commands act on a table renders a **Live records** panel: rows from that
table inside the selected workspace, each offering only the transitions whose `from_state` equals the
row's current status. Actions send the row's own version, so a stale tab is refused (INVALID_STATE or
CONFLICT), never silently applied. Derived transitions (the void policy) bind to finance screens
exactly like source rows; reason-bearing commands prompt for `void_reason`.

- `GET /api/records/:table?workspace_id=` lists tenant-scoped rows with `next_actions`; tables outside
  the compiled command set are refused.
- `POST /api/records/:table` creates a **dev fixture** only when `ORB_DEV=1`. Otherwise it returns 403
  `CREATION_COMMAND_ABSENT`, because the spec creates records through source commands and
  `transitions.json` contains none. Fixtures always land in the machine's initial state; `status`,
  `version`, timestamps and `workspace_id` cannot be supplied.
- The panel's actor is a labelled DEV ACTOR whose grants equal each command's requirement. It proves
  wiring, not authorisation policy; denial paths are covered by the engine tests.
