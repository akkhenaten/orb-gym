# Shared data and lifecycle contract — 0.28

Source OG-DATA-001: founder accepted the proposed shared logical records, relationships and transition work after repository 0.27. Existing242 OG-SRC, 11 OG-REV and 5 OG-EXT units remain preserved. This elaborates cross-module architecture; it does not choose an ORM/database, configure services or implement application code.

Use [entities](entity-catalogue.json), [relationships](relationships.json), [field semantics](field-contract.json), [state dimensions](state-machines.json), [transitions](transitions.json), [workflow map](workflow-record-map.json), [diagrams](relationship-diagrams.md) and [planned checks](acceptance.md). Their stable ENT/REL/SM/TR IDs are planning anchors. Existing role permissions, operational decisions, 91 notification events and 62 metric definitions still govern meaning. Actual schema keys, provider-state adapters, transaction design and migrations are receiving implementation work.

## Orthogonal facts

Identity login, company person account access, role grants, employment, membership service, payment setup, payment attempt, entitlement, booking and actual attendance are separate dimensions. No universal status such as active or completed changes them all. A dependent can have a company person without a fake login/email. An employee can leave while remaining a member. One account can be a manager in gymA and coach in gymB without combining those privileges. Company owner covers all company gyms; platform admin is separately assigned and audited.

Payment mandate ACTIVE is not cash collection. A confirmed attempt remains an evidenced historical attempt when a later refund/chargeback occurs; append separate signed money/credit/allocation facts and an owned adverse-payment review under DEC-GR-02. Do not mutate a successful payment into a fake failure that erases the original receipt. Review-first means no automatic membership cancellation, refund or new charge unless a separately published exact automation policy authorises it. Login for account/payment resolution remains distinct from service entitlement.

Booking confirmed is not attended, gym entry is not class/PT attendance, published shift is not actual clock time, completion submission is not verified completion, asset restored is not task closed, invoice verified is not supplier paid, notification accepted is not delivered/read/acknowledged, and template published is not actual signature. Public page and company brand publication are independently versioned; issued receipts/documents keep original snapshots. A rate edit cannot reprice past sessions.

## Scope, records and relationships

Workspace is the customer data boundary. CompanyPerson holds private company-specific profile/HR/health links; Identity holds minimal authentication linkage. Customer rows and reference joins enforce workspace even when UUIDs are globally unique. Gym-owned records include applicable gym and legal issuer where relevant; company-wide rows need explicit authorised scope. Source polymorphic links validate allowlisted entity type, ID, matching scope and required version. Never trust a file/QR/reference just because it resolves.

One source record can be linked to many task/group/asset views without copying evidence, invoice value or stock movements. Task grouping is organisational; parent/child is hierarchical; dependency is an acyclic prerequisite. Neither creates inherited approval or duplicated commercial records. Member participant, booking actor, payer, signatory and guardian are explicit separate relationships. Course/block has explicit occurrence joins. Payment allocation and gym/cost allocation preserve source sum/currency and are not new cash.

The catalogue names core shared records. More detailed child/join/adapter records already named by specialised notifications/reporting/access/import specifications remain required; this is not a direction to flatten them into blobs. OpenKBS produces a complete concrete schema/ER mapping with every required record and join, including preferences, channel attempts, policy/readiness, export/file grants and source-specific records. It must map any specialised name to a genuine owned table/document/value object, not silently discard it because this core catalogue uses a broader label.

## Initial creation and append-only facts

A record's initial state is created only by its owning authorised source command. Workspace ONBOARDING and owner grant commit together under retry-safe onboarding. Person/application creation matches existing identity/company person or starts verified review; PT/trial upgrade reuses linkage. Invitation ISSUED requires intended scope/destination and supported token flow; not a pass. Class/task/template DRAFT creates no public service, work completion or signature. Membership PENDING_ACTIVATION creates no active service grant.

Visit OPEN requires an actual authorised accepted Entry command, current purpose-bound service eligibility and one duplicate-safe visit/event identity; Exit is a separate event, never alternating toggle guesses. Scan failure creates explicit denied/unknown event, not OPEN visit. PaymentAttempt CREATED and RefundRequest REQUESTED reference exact original source/issuer/amount and do not create cash. A Sale starts DRAFT and tender/fulfilment progresses under its original operation. IssuedDocument ISSUED requires a frozen reviewed template/data/brand/issuer snapshot, not an editable live view. ChannelDelivery QUEUED requires actual committed source notification and resolved current recipient, not a speculative success message.

Financial movements, signed allocation corrections, asset status intervals, stock movements, actual attendance corrections, audit events and issued/signature evidence are facts with source identity/history. Do not edit them through an arbitrary set-status endpoint. Append traceable correction/compensation under the owning authority; preserve originals. Supplier invoice settlement can be derived from verified invoice, credits and confirmed allocations rather than duplicating an editable paid checkbox. Quote changes after acceptance require actual variation/commitment review; a new upload cannot silently replace an approved amount.

## Transition contract

Each TR record specifies source/destination, exact command, current actor/action scope, guards, changes/downstream effects, version/repeat/failure/audit rules. Storage labels are normalised design deductions; actual provider/UI adapters may use different names only if meanings stay mapped and tested. Undocumented from/to combinations are denied until an owning specification explicitly adds them. Initial creation and append-only facts are deliberately not represented as fake status transitions.

A permission identifier is not sole authority: field/record/gym, subject/assignment, independent approval, assurance, applicable reviewed policy and source state also apply. Some source commands have typed permission variants. A class self-book grant never permits staff booking arbitrary members; trial/pass issuance uses trial source authority, not a random membership toggle. Quote approval does not approve every decision type. View-health permission cannot accept or reject health evidence: membership.review_health_evidence is distinct and does not confer clinical competence. PT booking is separate from coaching.record_delivery.

Guard validation occurs again at consequential commit, not only when a form opens. Expected source/policy/version plus retry operation identity prevents stale approval, double capture, duplicate capacity/stock and cross-scope command reuse. A rejected guard makes no side effect and returns denied/conflict/setup-required with safe next action. Same operation/payload returns original result; same key with changed payload conflicts. A client timeout is not proof of non-commit. Never retry a provider capture/refund or source movement merely because receipt/UI failed.

## Transaction and cross-module boundaries

Workspace+first owner, booking/reservation/uniqueness, payment allocation limits, till fulfilment/stock-effect uniqueness and grant policy publication require actual trusted consistency boundaries. A shared application does not imply separate microservices. OpenKBS selects suitable real transactions/constraints/locking/jobs after project inspection and proves those invariants. Do not claim distributed provider side effects are one atomic database transaction.

Authoritative source changes and durable downstream work must be recorded so restart cannot lose notifications/required projections. Delivery may be retried/duplicated; source effect IDs and version checks prevent repeated business mutation. Calendar/dashboard/metrics/public projections are derived. They show source version/as-of/freshness and pending/failed currentness rather than authorising through stale cached state.

On membership freeze/cancel/restriction, eligibility checks must consider the current governing service/policy at command time, even if a derived grant/cache has not refreshed. Do not admit someone through an old entitlement while asynchronous revocation is pending. Retain owned impact work for future bookings/billing/form requirements/notifications; exact effects follow configured terms, not an invented universal refund or cancelled class. Likewise, source permission revocation is checked at file/job/export/AI delivery/commit. Previously downloaded/offline bytes cannot be guaranteed erased.

Cross-module partial failure is an explicit owned state. Confirmed tender plus missing stock/receipt enters reconciliation, queries original provider operation and permits authorised valid fulfilment or financial remedy (DEC-GR-06). A remedy closes the financial recovery only after actual source evidence; never mark stock delivered because refund was requested. Supplier invoice/quote/task status, equipment availability and public notice reconcile through separate authorised commands. Gym archive carries an obligations checklist; unresolved retained debt must have owner/next action, not forced fake payment/cascade deletion.

## Effective time, recurrence and versioning

Capture business effective time, recorded/ingested time, relevant timezone and source policy version. Recurrence uses a stable template/occurrence key and scope choice one/future/series; do not overwrite prior occurrences with the newest checklist. Staff/class/PT/resource changes validate qualifications/conflicts/travel and expose real affected paid bookings. Material service changes require the existing acceptance/remedy policy. No response to a reminder is consent.

Expired waitlist/hold/source deadlines are enforced by current source time even when scheduler/delivery runs late. Actual delivery does not extend the offer. Scheduled form/plan/brand applicability is explicit; template publication alone does not change existing rights or signed evidence. Policy setup values, age/clinical/legal wording and provider capability remain required inputs, not inferred from a state label.

## Recovery, history and safe migration

Pending/unknown/failed distinguish accepted command, unconfirmed external operation and known failure. Every unresolved case has current accountable owner and original operation/source references. Reconcile before compensating; compensation is a new authorised source fact, not deletion of history or claim that external messages/payments were undone. Import stages/dry-runs never activate membership/mandates or fabricate signatures; committed partial rows need per-row repair with current grants.

Migration from earlier admin labels maps company management separately from platform admin after explicit review. Preserve identities, source IDs, accepted terms, issued snapshots and linked historical allocations. Restore database+private evidence and verify money/capacity/stock/access/recurrence/provider cursors together; do not replay historical captures, invitations or revoked grants. Backup/RPO/RTO/retention targets remain deliberate implementation/setup decisions, not numerical guarantees introduced here.

## Receiving OpenKBS outputs

Produce concrete ER/schema/field/constraint mapping, source status dictionary and command/event contract with real endpoints/provider references. Use workflow-record-map.json to cover every WF checkpoint, meaningful exception and projection/no-state disposition; domain-level links are a starting inventory, not proof of atomic coverage. Link ENT/REL/SM/TR IDs and actual source/permission/notification/metric dependencies to numbered delivery cards and evidence. Any necessary platform constraint changing access, money, offline or service behaviour returns as a product decision.

Run documentation validators, then execute actual permission, concurrency, late-event, failure/recovery/restore and cross-module tests during authorised implementation. This pack creates no runtime schema, service messages, charges or deployment.


## Error corrections — 0.31

Current signing capture requires all actual required parties before aggregate SIGNED; partial capture retains AWAITING_SIGNATURE. Superseded issue retains original signed facts. Staff-other booking cancellation requires both cancel and other-person authority; guardian booking uses verified family.book. Paired quote/decision and offer/booking transitions share the canonical-operations.json owning operation, never independent repeated effects.


## Authorisation corrections — 0.32

Read docs/data/authorization-contract.md at repository root. The transition authorization object is canonical: no default permission alongside alternate routes, no generic SYSTEM bypass, and unknown context denies. Tenant scope and lifecycle are separate; retained histories/reconciliation/recovery remain explicitly permitted where authorised without reopening service. Setup is not collection; booking is not PT management/cancellation or dependent payment authority. Current actual source/business/field/consent guards still apply.


## Recovery-path corrections — 0.33

Read docs/data/recovery-path-contract.md at repository root. Current source grant restoration, actual full/partial/discrepancy transfer resolution, provider late-failure/configured retry and separate training submit/review authority override earlier incomplete transition examples. Actual source evidence/policy/current permission and all prior business guards still apply. No extra provider capability or automatic unreviewed service activation is promised.


## Actor journey/default corrections — 0.34

Read docs/access/role-journey-contract.md at repository root. Work start is separate from task edit; limited authenticated fault report is separate from internal work creation. Safe own-account/staff-source prerequisites remain accessible under exact source/assignment/field/deny guards without widening HR/private work. Booking decline/withdraw uses actual self/guardian/staff relation routes.
