# Platform Evidence and Delivery Gates

Review r1 · checked 6 November 2026. OpenKBS is selected as the builder. Exact project capabilities have not been inspected because the target project URL has not been supplied.

## Official documentation evidence

Source: https://openkbs.com/docs/cli/ (page states updated 23 October 2026; retrieved during this review).

The current CLI reference documents board discovery/search, card management, edit/save and parent/dependency relationships. It also documents functions, storage, Postgres, MQTT, sites, email and domains. These are documented platform capabilities, not evidence that any specific Orb Gym integration is configured or that a particular project uses every service.

The email section explicitly requires verified custom-domain setup before outbound email works. This creates a dependency for invitation, email-code login/password recovery and notifications if using OpenKBS mail. Merely enabling email is insufficient. The builder must verify sender/domain capability or document an alternative provider, using synthetic tests after separately authorised configuration; no messages are sent during planning.

The CLI provisions/deploys services: documentation storage and board editing must not accidentally trigger deployment. During this planning stage do not run install/update, migrations, service enablement, DNS changes, function/site deployment, payment actions or destructive commands. Inspect existing instructions/configuration and use supported read-only capability discovery; author only documents/specifications and backlog cards.

The exact Studio Spec/Plan/Build automation has not been verified in this target project. Treat no-build as the user's workflow boundary rather than assuming a special CLI mode exists. If the Studio action would start building, save plain specifications/cards and report the limitation.

## OG-REV-009 — Technical capability and integration evidence

Write docs/delivery/platform-capability-matrix.md with requirement, actual project finding, official source/date, proposed implementation, limits/cost drivers, evidence and blocker. Cover auth and tenant isolation, backend transactions, private files, real-time audiences, background/scheduled work, documents/media, email, payments/DD, till devices/printing, domains/maps, payroll/accounting and AI tools. Separate documented support, project configuration, sandbox verification and production verification.

Multi-company customer branding does not itself prove support for per-company sending domains, merchant settlement or public custom domains. Investigate those separately. No production secrets belong in card descriptions, exports or documents.

## OG-REV-010 — Planning and release gates

Definition of Ready for implementation: bounded source-backed requirement; current-state findings; sufficient behaviour/state/access rules; dependencies and unresolved business decisions identified; acceptance criteria; integration/migration/recovery approach; explicit implementation authority. A card can be planned in Backlog while blocked, but must not appear ready for execution if its critical decision is open.

Definition of Done: implementation evidence, relevant permission/failure/retry/responsive checks, review outcome and accurate remaining limitations. Deployment, release approval and verification remain distinct. Preserve pre-existing board states: during planning only newly created cards stay Backlog; do not move previously implemented unrelated/reused cards backwards without evidence or authority. Record verified existing capability and delta work separately.

The plan must include environment separation, synthetic test data, migrations and rollback, private file handling, monitoring/retry ownership, backup/restore checks and operational runbooks. Performance, recovery and accessibility targets require concrete agreed values and evidence rather than unsupported claims. Ingestion hash verification proves bytes, not design approval or app correctness.
