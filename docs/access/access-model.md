# Granular access model — 0.25

Read [founder clarifications](source-clarifications.md), [roles](role-catalogue.json), [permission vocabulary](permission-catalogue.json), [policy contract](policy-contract.json), [template matrix](role-permission-matrix.csv), [field access](field-access.md) and [planned checks](acceptance.md). These refine GAP09 and existing USER/SPACE/AUTH workflows without adding a fifth customer journey or replacing membership eligibility.

## Roles and scopes

Platform admin is the Orb Solutions service role. It has broad platform oversight/admin powers and can select any customer workspace in an explicit audited privileged context. No customer can grant, impersonate or remove platform-admin status through company settings. Platform actions, broad customer inspection, sensitive exports and permission changes are logged with actor, scope, time and reason. This is product authority, not permission to perform real operations during planning.

Company owner has full authority throughout their company, all current/future company gyms, sensitive areas and permissions administration. The owner does not gain another company's records. Mandatory business guards still apply: current MFA/assurance; no signature substitution; no invented paid status; no supplier approving its own quote; appropriate actor and workflow state for professional decisions. Owner can delegate and edit company role templates and individual permissions. Last-owner removal/closure follows controlled transfer/recovery, not accidental lockout.

Senior management can be assigned several gyms or company scope and selected modules/actions/fields/approval authority. Local manager is one gym per assignment; another gym requires an additional explicit scoped grant. Supervisor, payroll, finance, HR, membership, reception, cleaner and coach templates can be edited by authorised owner/admin. Job title is not an automatic permission. Employed/rental coaches, member/PT/trial, guardian and vendor rights keep the previously specified distinctions.

Four customer journeys persist. One identity may hold several assignments, including manager in gymA and coach in gymB. Evaluate requests in explicit workspace/gym context and union only matching grants. Never combine an action allowed only in gymA with a gymB scope from another grant to manufacture manager rights in gymB. Membership/service eligibility remains separate from staff or admin inspection access.

## Role and individual controls

User-type/role templates provide reusable permission bundles. Individual allow adds an explicitly scoped permission; individual deny removes a permission within its scope even if a role allows it. Deny wins while active. Do not turn a denial at one gym into an unrelated company-wide ban. Removing that deny is a new authorised audited action, not a runtime bypass. Absence of any applicable allow means denied. A role template change affects active assignments using that version according to its publication; preview affected people and exceptions first.

Permissions distinguish view/create/edit/assign/approve/publish/export/archive/delete, record scope, sensitive fields, approval conditions and delegation. View does not imply export/download. Ability to approve does not mean unlimited spend: configured limits/policy and independent-review rules still apply. Unknown approval values mean the affected action is not ready, never infinite authority by fallback. Ability to invite does not imply ability to assign every role. Local manager can delegate only within explicit current grant/delegation ceiling and gym; nobody can self-escalate.

Company-specific access never rewrites global identity, someone else's workspace data or historical signed documents. Changing user type does not silently activate membership or employment. Owners may edit per-person access for members/vendors too, but company activation cannot turn an ineligible pass, unpaid charge or unverified guardian into a valid transaction/relationship by itself.

## Access administration journey

Company Settings -> Roles & Permissions shows role templates, scopes, assignments and audit. Open role -> choose modules -> action toggles -> field bundles -> gym/record scope -> approval/delegation constraints -> review affected users -> explicit Save/publish. Platform admin has a separate platform access console. No company control exposes platform-admin assignment.

Person profile -> Access shows role assignments and individual overrides. Add allow/deny -> select permission(s), scope and fields -> optional actual expiry -> reason -> review effective-access difference -> save once. Inherit means remove that individual override, not add a contradictory allow. Copy role starts a draft; it never copies platform grants or expands source scope by default. Bulk changes identify exact selected users and skipped/ineligible rows and require per-subject authorisation.

Effective access inspector selects person, workspace, gym, record/action and channel. Explain allowed/denied with contributing role/version, individual exception, matched scope and any unsatisfied workflow guard. Ordinary users can see safe explanations of their own access; only authorised access administrators inspect other users. Do not reveal hidden record contents in a denial explanation. Include grant provenance and effective dates in exports only when separately permitted.

On save, compare expected policy version; if changed, show latest diff and require rereview rather than last-write-wins. Validate scope/issuer delegation, last-owner protection and constraints before publishing. A failed save leaves published permissions unchanged. Repeated save uses same operation reference. Success displays updated version/time, not a claim that already downloaded data disappeared.

## Trusted enforcement and lifecycle

Enforce on API/commands, record/field queries, search/counts, file preview/download, calendar, notifications, reports/exports, background jobs, web events and Orb AI tools. A visually hidden button is not enforcement. Recheck current rights at consequential commit and protected delivery. Pending exports or delegated AI commands fail safely or redact/recompute under current rights, with visible owner/status. Provider callbacks use their separate service authority; staff revocation must not erase authentic payment events or replay them as new sales.

Permission revocation invalidates future online requests and active permission projections; queued work is re-evaluated. Close protected live views when changed access is observed. Stale links deny safely. Existing offline/downloaded bytes cannot be remotely erased; builder must document actual cache/file-link expiry and cleanup evidence, not promise instantaneous revocation of disconnected copies. Audit history remains attributed after archive or role removal.

## Logical records and contracts

RoleTemplate: workspace/platform owner, stable ID/version, permission rules, scopes and field bundles. RoleAssignment: subject, template/version, workspace/gym scope, effective/revoked dates, issuer. IndividualOverride: subject, action/field/scope, allow/deny, reason, version/issuer and optional expiry. DelegationConstraint: allowed role/action/scopes and approval limits. AccessChange: before/after, actor, reason, operation ID, target/version/outcome. EffectiveAccessProjection is derived and never the source of authority.

SetRoleTemplate, AssignRole, SetIndividualOverride, RevokeGrant and PublishAccessChange require current actor authority, exact subject/context, expected version and retry identity. Outputs are accepted version/audit reference or explicit denied/conflict/validation outcome. Background refresh cannot extend a grant expiry. Actual schema, policy engine, invalidation, transactions and provider support are OpenKBS implementation choices to inspect and prove.

## Receiving builder work

The product rules are now specified. Bind these logical actions to actual endpoints, entity/field projections and platform support UI. Expand the template matrix into runtime access-matrix.md and map each critical command/negative case to globally numbered delivery cards. Record tenant-specific role compositions and approval limits as setup, not guessed defaults. Test platform and company boundaries separately. This is not proof of runtime security or authorisation configuration.


## Error corrections — 0.31

Verified dependent booking uses family.book, not a guardian pretending to be a self-member. Other-person staff cancellation requires classes.cancel_booking plus classes.book_other, with exact record scope and accepted terms. Role/individual overrides cannot bypass source guards.


## Authorisation corrections — 0.32

Read docs/data/authorization-contract.md at repository root. The transition authorization object is canonical: no default permission alongside alternate routes, no generic SYSTEM bypass, and unknown context denies. Tenant scope and lifecycle are separate; retained histories/reconciliation/recovery remain explicitly permitted where authorised without reopening service. Setup is not collection; booking is not PT management/cancellation or dependent payment authority. Current actual source/business/field/consent guards still apply.


## Actor journey/default corrections — 0.34

Read docs/access/role-journey-contract.md at repository root. Work start is separate from task edit; limited authenticated fault report is separate from internal work creation. Safe own-account/staff-source prerequisites remain accessible under exact source/assignment/field/deny guards without widening HR/private work. Booking decline/withdraw uses actual self/guardian/staff relation routes.
