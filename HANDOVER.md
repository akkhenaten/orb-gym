# Builder handover: Orb Gym 0.36

Read this first. It supersedes the planning-only "Requested next work" in BUILD_BRIEF.md and the
"no implementation authorised" wording in AGENTS.md, both of which predate the owner's decision below.

## Authority (9 November 2026)

The owner has authorised **implementation of one complete working application** in this repository,
targeting the OpenKBS runtime. It is not delivered slice by slice. That authority covers code, tests,
compilers and documentation inside this repository.

It does **not** authorise: deployment, configuring live providers, sending real messages, taking or
refunding real payments, issuing legal or medical documents, or changing business policy. Those need
their own owner decision and evidence gate.

The specification under `docs/` is the single source of truth. Code is generated from it; it is not a
reference you may reinterpret.

## What already exists

`app/` is a working Node 24 ESM service on `node:sqlite` with **zero runtime dependencies**. Keep it that way.

| Surface | State | Where |
|---|---|---|
| Schema | 78 tables, 459 typed columns, 40 machine state columns with `CHECK (status IN ...)` | `app/generated/schema.sql` |
| Commands | 233 source transitions + 2 derived (void policy) = 235 commands, 232 permissions, 0 ambiguous | `app/src/engine.mjs` |
| Engine guarantees | authorisation, tenant/gym isolation, idempotent replay by operation id, optimistic concurrency (`expectedVersion`), audit row per transition, declarative guards evaluated inside the commit | `app/src/engine.mjs` |
| UI | 114 screens, 5 selectable presets x light/dark, live records panel per screen with only state-valid actions | `app/src/ui.mjs`, `app/src/records.mjs` |
| Notifications | transactional outbox, dedup, supersede, retry, quiet hours; `in_app` adapter only | `app/src/notify.mjs` |
| Reporting | 62 metrics, 10 views; 5 money metrics run real SQL and match the pack fixtures; 21 need field mapping; 2 unavailable by design | `app/src/reporting.mjs` |
| Documents | 34 templates, 52 fields; drafts render, issue is always refused | `app/src/documents.mjs` |
| Commercial policy | 11 policies, 90 tenant-supplied fields, fail-closed gate | `app/src/policies.mjs` |
| Capabilities | 22 capabilities, 7-state contract, readiness computed from evidence | `app/src/capabilities.mjs` |
| Integrations | HMAC-verified inbound events, replay window, provider-event dedup; POS sale validation | `app/src/integrations.mjs` |

## Commands

```
cd app
npm run compile   # whole pipeline in dependency order (tools/compile-spec/build-all.mjs)
npm test          # node --test, all app tests
npm run gates     # every scripts/validate_*.py
npm run check     # all three; this is the merge rule
npm start         # production-shaped server
npm run dev       # ORB_DEV=1: enables dev fixture creation
```

Compiles are byte-reproducible: no compiler reads the wall clock (`app/tools/compile-spec/build-clock.mjs`;
set `SOURCE_DATE_EPOCH` to stamp a release). If a compile changes a file, the spec or a compiler changed.

The SQLite file lives outside the repository (`ORB_DB`, default under the OS temp directory) so runtime
state never changes the manifest.

## Merge rule

A change lands only if `npm run check` passes and `repository-manifest.json` is re-baselined to match
the tree exactly. A gate that fails is information about the spec or the code. Do not weaken it to pass.

## Generated versus hand-written

- `app/generated/**` is compiler output. **Never edit it.** Change the compiler in
  `app/tools/compile-spec/` or the spec in `docs/`, then run `npm run compile`. A hand edit is silently
  overwritten by the next compile.
- `docs/derived/**` is also generated (by the `derive-*` compilers). It carries additions the source does
  not contain, each with its evidence. Source files under `docs/data/` are never modified to hold them.
- `app/src/**` and `app/test/**` are hand-written runtime and tests.
- `docs/baselines/source-integrity.json` byte-pins preserved source files. Do not edit a pinned file.

## Proposals, not inventions

Where the specification is silent, do not fill the gap in code. Add a proposal to the relevant derived
overlay with `approval: { status: 'proposed' }`, its evidence, and the exact owner question. The core
compiler **skips proposed transitions** (they compile only under `ORB_ALLOW_PROPOSED=1`, tagged) until the
owner changes them to `approved` with a name and date. The void policy (DTR-001, DTR-002) is the worked
example: `app/tools/compile-spec/derive-state-overlay.mjs`.

## Deliberate refusals: these are not bugs

Each of these exists because the specification does not support the answer. Removing one without an
approved overlay is a defect, however much better the demo looks.

| Refusal | Why |
|---|---|
| Metric `UNAVAILABLE` with a reason | field mapping absent; never return 0 for an uncomputable metric |
| `CREATION_COMMAND_ABSENT` (403) | no transition creates a record; generic create is dev-only |
| Document issue refused | content not approved; signature provider untested |
| `POLICY_UNCONFIGURED` | tenant has not supplied the governing commercial policy |
| `CAPABILITY_BLOCKED`, `LIVE_TILL_PROVIDER_UNTESTED` | capability evidence incomplete; no live provider tested |
| `NO_SECRET_CONFIGURED` | inbound provider events cannot be verified without a secret |
| `NO_EDITABLE_READINESS` | the pack forbids an editable readiness flag |
| `CHARGE_HAS_ALLOCATION`, `CHARGE_HAS_CREDIT` | void only before reference; correct by credit note |
| Notifications not fired by commands | no transition-to-event edge exists; callers name events explicitly |
| Non-`in_app` channels fail with "no adapter configured" | no provider, sender or credentials selected |

## Do not

1. Edit `app/generated/` or a byte-pinned source file.
2. Turn an `UNAVAILABLE` metric into a number, or remove any refusal above without an approved overlay.
3. Add a runtime dependency. Node built-ins and `node:sqlite` only.
4. Ship `ORB_DEV=1`, the `x-actor` dev header, or the UI's DEV ACTOR. They prove wiring, not
   authorisation. The server already refuses the dev header under `NODE_ENV=production`.
5. Invent permissions, states, transitions, tenant values, legal or medical text, tax rates or prices.
6. Fire a notification from a command implicitly, or infer a screen-to-command edge beyond the domain rule.
7. Mark a delivery card Done from documentation, structural validators or synthetic arithmetic.
8. Re-introduce Neumorphic06 as selectable. Five presets are selectable; it is deferred.

## Open owner decisions

Bring these to the owner as proposals. Do not implement a guess.

1. **Creation commands.** None of the 233 transitions creates a record; 70 start from an initial state.
   Draft one creation command per entity from the entity catalogue's invariants as `proposed` overlay
   entries. This is the largest gap between this repository and a usable product.
2. **Identity provider and role mapping.** `resolveActor()` in `app/src/server.mjs` is the single seam.
   Build an identity adapter behind it; the provider choice is the owner's.
3. **Providers** for payments, e-signature, POS, email and SMS. Adapters exist as refusals.
4. **SM-DOCUMENT** lacks `PARTIALLY_SIGNED`, which TR-217's effect implies.
5. **ENT-AuditEvent** has no derivable relationship (`workspace_id_or_platform` is a union field).
6. **Void permission.** DTR-001/002 reuse `finance.reconcile`; the catalogue has no charge-correction permission.

## Builder-owned work, in priority order

1. Creation-command proposals (decision 1) and the identity adapter seam (decision 2).
2. Field mappings for the 21 `requires_field_mapping` metrics, each from declared columns only.
3. Real browser verification of the 114 screens under all five presets and both modes, including the
   live records panel and 390px width. Static rendering and syntax checks exist; click-through does not.
4. Map the 51 prose document field `source` strings to columns where the spec allows it; leave the rest
   caller-supplied.

## Known limits

- Screen-to-command binding is derived from the shared domain vocabulary (the spec has no explicit edge).
- The 156-card delivery index (00..155) follows declared domain precedence; `feature-register.json` has no
  dependency field, so prerequisite order cannot be derived.
- No provider, payment, signature, entry device or live channel has been exercised. Nothing here is
  evidence of production readiness.
