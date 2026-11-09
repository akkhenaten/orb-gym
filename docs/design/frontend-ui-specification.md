# Orb Gym frontend experience baseline — 0.23

This is the frontend blueprint for the current product, derived from repository 0.22 and the founder's recorded directions. It specifies intended interfaces, not runnable frontend code, an approved Figma baseline or executed accessibility evidence. Existing product modules, workflows, source extensions and operational decisions remain authoritative for business outcomes. New measurements and completed token mappings are proposed implementation values. Do not import the unrelated Native Orb brand palette or attribution into Orb Gym.

## Read order and authority

Read [screen inventory](screen-inventory.json), [component library](component-library.md), [tokens](theme-tokens.json), [asset manifest](asset-manifest.json), [workflow bindings](workflow-screen-coverage.json), [motion](motion-and-overlays.md) and [design verification](verification-and-decisions.md). Read each linked workflow/spec before implementing its variant. The structured screen inventory is canonical for screen IDs and workflow-action contracts; the tokens file is canonical for proposed resolved values. Generated historical concepts are references only. Every proposed route must be bound to the real router after environment inspection.

## Shells and navigation

Owner desktop: left workspace identity, Overview, Calendar, Feed, expandable gym entries, Add gym, company Finance/Reports, People, Documents, Settings; scoped Orb assistant. Opening a gym expands its Operations, Members/Membership, Staff/Rota, Classes/Coaches, Facilities, Till/Stock, Feed, Documents, Reports and Settings as permitted. Company calendar aggregates all accessible gyms and identifies the source gym. Gym switch retains per-gym list filters but clears stale selected records and rechecks entitlement; drafts offer Save draft/Discard/Stay where actual persistence is supported. No hidden cross-tenant state persists.

Assigned staff see assigned gyms and permitted operations. Managers/supervisors may add staff only within delegated grants. Reception opens Scan or Till quickly. Cleaner sees own shifts/job sheets/evidence, not financial or HR management. Employed coach sees assigned clients, PT, classes and staff tools granted; rental coach sees own agreement/rent, permitted classes and relevant bookings only. Vendor sees Jobs, Visits, Updates and Account, never the whole gym member directory. Platform support is a distinct scoped audited administration context, not a fifth customer journey or invisible owner impersonation.

At tablet/iPad widths, including landscape, use bottom navigation; mobile likewise. Proposed device class: touch/tablet classification plus a user-agent capability override; do not switch a landscape iPad to desktop solely on width. Narrow desktop below 1024 CSS px also uses the compact bottom shell. Desktop left sidebar min/default/max 224/256/320px, arrow-key resize 16px, Home/End bounds and Reset; save per user/device and clamp. Bottom bar includes safe-area padding and never overlays final actions. Owner: Overview/Gyms/Approvals/More. Staff: Home/My Shifts/Tasks/More plus labelled Scan action. Member: Home/Classes/My Bookings/Profile plus always reachable QR pass. Vendor: Jobs/Visits/Updates/Account. More contains every other permitted module and search; navigation is not permission enforcement.

Members are mobile first; staff desktop and mobile; owner desktop first but full responsive access. PT-only home exposes appointments, forms, pass, own receipts/messages/profile; pending membership shows outstanding checklist and contact route, not full gym rights. Trial home exposes its offer, visit window/forms/payment status, own pass and conversion. Guardian uses the member shell with dependent selector and explicit granted Family/Bookings/Profile actions; dependent selection never grants access to other household data. Payer, guardian, participant and collector identities stay distinct.

## Layout and hierarchy

Proposed reference widths: 390, 768, 1024 and 1440 CSS px; verify 320px reflow, 200% text and 400% zoom where applicable. Main content max 1600px, desktop padding 24/mobile 16, spacing4px scale. These are design values to validate, not measured usability findings. Header contains page title, workspace/gym scope, breadcrumb and primary action. Use meaningful blank states rather than mock finance numbers.

Task/case workspace: full-width top details row with reference, title, status, gym/area/asset, owner, due date, original evidence and permitted next action. Below, feed left and record tabs right. If inner content width W >=1008px: separator8px, feed default 60% and min560px, records min360px; resize clamped to both minima, keyboard16px increments. Below this threshold, show Details/Activity/Records tabs with the same record and preserved draft/selected tab. Top row does not become an unrelated modal. Each region has one clear scroll owner; headers remain reachable, no keyboard trap. Required child tasks, verification and dependencies remain visible before completion. Cleaning, maintenance and admin are type variants of this one engine.

Reception: scan area and outcome beside the identity card when W>=900px; stacked below. Photo on left within card, name/details/outcome right. Display advisory and blocking alerts separately, with a next permitted action and reason. Private PAR-Q, HR/disciplinary or full finance data never appears on a shared reception screen. Explicit Entry and Exit controls; duplicate event feedback references the original event. Occupancy is recorded visits with stale/unknown labels, not a guaranteed emergency count.

Till: catalogue/scan area left and sticky basket right if W>=960px; below, Product/Basket steps with visible total and item count. Scan feedback names product/quantity; duplicate accidental tender submission disabled while pending. Unknown payment outcome presents Check original payment, never a new charge as ordinary retry. Refund and stock return are separate choices. Receipt preview identifies immutable issuer, sale and brand version. Print cancellation does not cancel sale. Anonymous receipt sharing requires an actual permitted destination, not a member-app assumption.

Calendar: retain day/week/list on small screens; dense month view has accessible agenda alternative. Date/time show gym timezone, and ambiguous daylight-saving choices require explicit offset/date context. Dragging, if implemented, shows proposed move/conflicts then source-module validation; provide Edit time form alternative. Rota, leave, class/PT conflicts and travel remain source-owned. Sensitive staff absence reasons are not on member calendars. Booked, RSVP, attended and gym visit have different labels.

## Shared state contract STATE-01

Every screen uses loading with labelled progress and stable heading; empty with an authorised next step; filtered-empty with Clear filters; partial with missing-data notice; failed with scoped retry; denied with safe return; stale with Review latest; offline with honest read/write limitations. Never promise offline queue/storage unless implemented and tested. Pending command disables only duplicate activation, preserves context and remains discoverable if panel closes. Uncertain financial save is not failed payment. Confirmed outcome appears only from authoritative result. Conflict presents latest version plus safe comparison, never auto-replays an approval.

Show form errors inline and in focusable linked summary after submit; validate basic format on blur without announcing every keystroke. Required and optional fields are named. Dirty form offers Save draft only when supported, Discard or Stay; browser refresh recovery is not promised by a UI spec. Session expiry preserves only actually safe stored work, offers Sign in again, and rechecks intended destination/grants. Revoked permission mid-edit shows Your access has changed and safe return, without leaking latest protected values.

## Critical workflow surfaces and consequences

Signup: public gym/offer entry or verified staff invitation -> identity check -> applicable profile/PAR-Q/emergency/rules -> pending checklist -> membership review/payment setup -> actual approval/entitlement. Copy: Your application is with the gym. You can finish your details here. A mandate setup, screenshot or submitted payment is never labelled paid. Existing PT/trial identity converts without a duplicate account. Junior and trial capability controls remain disabled until their readiness contracts are complete.

Class booking: show gym/coach/timezone, capacity, entitlement, exact price and accepted cancellation/no-show policy version. Book once returns pending then confirmed or waitlist/full. Course/block booking reports the exact accepted scope; no silent partial success. Coach register includes expected, attended, absent, corrected and reviewer evidence; no-show is a reviewed outcome on profile. Class disruption offers only the accepted policy routes; do not silently transfer a paid customer.

Facilities: report -> triage -> assigned work -> quote/variation decision where required -> evidence -> verification -> invoice/reconciliation. Quotes and decisions use typed records from activity; tabs expose those same records. Audience selector precedes posting; @mentions suggest only visible authorised people, use an ID binding and never grant access. Vendor cannot approve own quote or management verification. Asset unavailability and member notice have separate publication authority from job closure.

HR: invite -> gym/role grants -> contract/training/availability -> rota -> actual attendance -> reviewed timesheet/payslip evidence -> leaver reassignment/archive. Private one-to-one/disciplinary fields require separate grants. Payslip upload/import is not a payroll engine. Rehire is a review route, not unconditional restoration.

Landing and branding: add gym creates draft public entry from gym Settings, not automatic private-data publication. Approved public changes sync published projections with source/version/status. Coach card shows approved photo/name, specialities/fees on click/keyboard/touch reverse. Use visible View details and Back; no hover dependency. Company brand controls own appearance; Documents composes templates consuming published brand. Issued documents/receipts retain original snapshots. Assistant remains named Orb, using approved company icon when white-labelled. Footer remains Orb Gym - powered by orbsolutions.co.uk on every page.

## Theme and appearance settings

Default Basic01; Flat02, Editorial03, Glass04, Console05 and Neumorphic06 are complete alternative directions, not colour swatches. See [preset rules](preset-rules.md). Company Settings edits a draft of preset, approved fonts, button/icon/text/background/hero accents, logos/details. Explicit white-label activation is separate from uploading logo or changing style. Preview company and inherited/permitted gym overrides across member home, task, finance, till, landing and document in both modes. Show affected scope and invalid tokens, then Publish when authorised. Save conflict reloads/diffs drafts; failure retains published version. Rollback restores one complete prior version; disabling white label restores Orb identity without deleting tenant originals.

Personal Profile owns avatar/name/contact fields, notification channels/events and light/dark/system preference. System is initial theme fallback; personal explicit mode wins only its appearance, not brand. Persist to account after sign-in; pre-auth theme may use safe local preference. Reduced motion is enabled if OS or app requests it. Missing corporate dark palette is a labelled proposed adaptation. AI guideline extraction pre-fills source/page-labelled suggestions; low confidence, missing fonts and conflicts need editable review. Manual entry always available; unreadable file cannot erase working settings.

## Content, tables, search and reports

Dates use UK-readable formats with timezone where scheduled; currency uses actual transaction currency, not hard-coded pounds across all tenants. Long names wrap, IDs can copy, dates and amounts are not ellipsised without accessible full values. Tables prioritise name/reference/status/next action; optional columns move to detail. Horizontal scrolling preserves comparisons where essential (rota, finance); never silently omit values. Sorting uses labelled buttons and announced direction; select page versus all filtered results explicitly. Bulk actions show eligible/skipped counts and require per-record server checks. Filter/search state lives in scoped URL or equivalent safe state; browser Back restores it.

Reports identify period, scope, source freshness and exclusions; charts have units, legend, labelled values and table alternative. No data is not zero. Exports run with current grants, retain selection scope and protect private fields; progress/error/download expiry states are visible. Global search covers only permitted records; an old bookmarked inaccessible result returns denied without private preview.

Notifications show source, gym, time, delivery/read/ack status and a deep link. Reading is not task completion or signed acknowledgement. Muted preferences never suppress mandatory in-app workflow state. Unavailable email integration is shown truthfully; no claim message sent merely because it was queued.

## Accessibility and verification target

Target WCAG2.2 AA as a build acceptance goal, not a compliance claim. Keyboard order follows content order; focus is visible in all modes and not hidden by sticky bars. Modals trap focus and return it; nonmodal panels do not. Every input has a programmatic label; status meaning includes text/icon; error summary links fields; progress announcements avoid repetitive scans. Initial touch target proposal44px. Icon-only actions require names. Verify actual focus/contrast/reflow with final fonts and company overrides; inspect touch/keyboard, reduced transparency/motion and screen reader behaviour. The token checker verifies selected text pairs only, not full WCAG compliance.


Token metadata and permitted editing are indexed in [token catalogue](token-catalogue.json); regenerate it from theme-tokens.json after changes. The role/device availability matrix is [here](role-device-matrix.md).


## Dashboard comparison references — 0.24

Use the [five dashboard concepts](../../assets/ui-dashboard-comparisons/README.md) to compare the same owner surface across Basic01, Flat02, Editorial03, Glass04 and Console05. Basic01 remains default; all five are company-selectable. Images are visual references; written rules, tokens and supplied master artwork govern generated deviations. The folder README lists known differences. Both modes and responsive behaviour still require implementation verification.


## Current granular access clarification — 0.25

Read the [access model](../access/access-model.md) and its source clarification, role/action/field catalogues, individual allow/deny policy, editable template matrix and planned access scenarios. Admin means platform admin; owner covers all own-company gyms, senior management covers assigned multiple gyms and local management is gym-specific. Owner/platform admin can grant by role/user type and individual. Explicit scoped individual deny prevails over a matching role allow. Earlier company administrator wording means delegated company management, never platform privilege. Existing business, privacy, self-approval and authentication guards remain. The detailed product permission contract is specified; actual schema/command bindings, configured tenant roles and enforcement evidence remain builder work.


## Notification and escalation contract — 0.26

Read the [current notification contract](../notifications/notification-contract.md) and canonical event catalogue, generated CSV, policy settings, safe templates and planned acceptance checks. Resolve exact event recipients/source transitions and stop conditions in OpenKBS planning. Owner/company and platform-admin scope follows the current docs/access contract, superseding old generic company-admin wording. No arbitrary reminder intervals or unsupported channels are approved. Personal preferences do not erase required source actions; delivered/read/acknowledged/completed remain distinct. No live delivery is configured or authorised by this file.


## Dashboard and reporting definitions — 0.27

Use the [metric/reporting contract](../reporting/metric-contract.md) with canonical metric/report catalogues, source maps, setup inputs, synthetic worked reconciliation and planned acceptance. Figures and Orb use identical definitions and scope. Charges/credits/collections/refunds/reversals/allocations/costs are separate. Overlapping gym membership rows cannot be summed as company distinct people. Missing costs/basis are unavailable/incomplete, not zero/profit. Old generic report-catalogue-to-be-prepared wording now means OpenKBS maps the supplied product catalogue to actual schema/providers/queries and verifies it; do not replace settled definitions silently.


## Shared records and lifecycle contract — 0.28

Read the [current shared model](../data/lifecycle-contract.md) and its ENT/REL/SM/TR catalogues, workflow-record map, typed field/command contracts, transition CSV and planned acceptance. This supplies logical record/state/guard/effect/recovery design; OpenKBS must map actual schema/provider status/API/concurrency and evidence. Independent account/employment/membership/payment/entitlement/booking/attendance/task/asset/invoice/publication states cannot be collapsed. No arbitrary status editor or guessed business input is authorised. Original source extracts remain retained.


## Document and form catalogue — 0.29

Use the [current document contract](../documents/document-contract.md) with DCT type catalogue, typed fields, declarative layouts, content-readiness gates and planned acceptance. Upload/form/acknowledgement/signature/issued financial snapshot remain distinct. Company-reviewed legal/health/safety wording and actual original documents remain required inputs; placeholders do not become approved content. Owning source commands control issue/sign/review/payment, and historical issued/signed data/brand versions stay frozen.


## Current setup and handoff — 0.30

Start with CURRENT_BASELINE.md at repository root and the current BUILD_BRIEF.md. The [setup hub](../setup/setup-hub.md) combines resumable scoped sections, responsibility delegation, capability-specific current gates and new-gym inheritance. Optional/missing setup does not create a global block or bypass source requirements. Remaining inputs and actual OpenKBS evidence are enumerated in docs/delivery/remaining-inputs.csv and the current handoff audit. Current brief is planning/cards only, not build/deployment authority.


## Error corrections — 0.31

Public approved-projection pages require no customer role to read; signup/sign-in/recovery use supported identity flows rather than existing workspace grants. Sessions/security is authenticated self. Every screen now has stage-appropriate bidirectional workflow bindings. Basic Manrope body weight is 500 in both modes, matching the source; token catalogue must match canonical values.


## Actor journey/default corrections — 0.34

Read docs/access/role-journey-contract.md at repository root. Work start is separate from task edit; limited authenticated fault report is separate from internal work creation. Safe own-account/staff-source prerequisites remain accessible under exact source/assignment/field/deny guards without widening HR/private work. Booking decline/withdraw uses actual self/guardian/staff relation routes.


## Current UI direction extension — 0.35

The five-style settings and component contract in docs/design/ui-direction-settings.md, style-options.json and appearance-settings-contract.json extends the existing five directions with Neumorphic06 and develops Flat02/Glass04. Five styles are selectable with ten light/dark mappings; Neumorphic06 retains its two mappings but is deferred (founder decision, 9 Nov 2026). Earlier five-style references/images record the prior baseline. Existing workflows, permission/source rules and business behaviour remain unchanged. Style selection does not activate white labelling; published scope, reduced-effects fallbacks, print-safe outputs and immutable issued snapshots follow that contract.
