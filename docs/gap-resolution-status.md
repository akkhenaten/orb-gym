# Gap Resolution and Remaining Inputs — 0.22

7 November 2026. The request was to fill the gaps in the product design. DEC-GR-01–07 are now specified product routes/defaults with required company-policy settings. The four former capability proposals have complete feature journeys/specs and are included as optional/configurable capabilities. This does not invent tenant values or claim implementation.

| Gap category | Product-design resolution | Remaining input/evidence |
|---|---|---|
| GAP01 actual platform/runtime | Capability matrix and trusted boundary requirements defined. | Builder must inspect actual project/auth/database/files/jobs; no project URL or runtime is available here. |
| GAP02 payments/DD | Setup/collection/activation/reversal/refund/reconciliation and merchant boundaries specified. | Real adapter/merchant verification and sandbox outcomes; no credentials selected. |
| GAP03 membership/access | Separate identity/membership/payment/entry/booking, explicit policy publication and review-first exception handling. | Company prices/grace/rights/current forms and qualifying payment rules before a plan is sold. |
| GAP04 community scope | Named posts/media/replies/reactions/mentions/polls/events/saves/moderation/location inventory retained. | Stories/live/calls/marketplace are outside the described scope unless separately requested. |
| GAP05 booking/disruption | Holds/waitlist/series/attendance/cancellation and manager-led material-change acceptance/resolution routes. | Company thresholds/cutoffs/financial terms, tested concurrency and UI states. |
| GAP06 hourly PT | Default and per-coach rate precedence/versioning, client/appointment/pass/upgrade routes specified; prepaid bundles excluded. | Actual rates/increments/buffers/terms and real booking/payment capability. |
| GAP07 rental/earnings | External collection default, optional fully configured included/gym-collected rental classes; employee wages/allocation remain separate. | Real agreements/prices/share/issuer/refund/settlement and payroll boundary. |
| GAP08 till | Sale/stock/tender/receipt/refund/reconciliation/failure recovery and authorised remedy defined. | Device/provider proof and policy values; full offline/split-tender/exchange options not silently claimed implemented. |
| GAP09 permissions/approval | Four journeys, scoped delegation, backup-within-current-authority, child/guardian grants and private company person records. | Actual action/field matrix, limits and current grants verified against implementation. |
| GAP10 design | Five style rules, responsive nav, token/component contract, configurable company/gym branding and ready/draft publication. | Exact completed token bindings/layouts/rendered contrast/accessibility evidence, not proved by concept pictures. |
| GAP11 forms/age/privacy | Versioned forms/applicability; optional configured junior/guardian service; private-by-default relationship/data paths. | Reviewed jurisdiction-specific content/eligibility/authority process/retention, provided by appropriate company reviewers. |
| GAP12 HR/payroll | Full HR record tools, timesheets/earnings review and secure payslip import/delivery. | Actual payroll provider/import integration; statutory calculation/filing is not automatically included. |
| GAP13 communications/domains | Scoped event/recipient/channel/deep-link/retry, current in-app queues and sender capability gates. | Verified outbound domains/providers/maps and configured channel/timing policy. |
| GAP14 finance/metrics | Separate debts/collections/allocations/costs, no double-counting and owned unmatched-money reconciliation. | Currency/tax/rounding/accounting basis/cost attribution and metric definitions verified from real sources. |
| GAP15 reliability/security | Version/idempotent commands, interruption/restore/runbooks; provider-supported privileged MFA/recovery path. | Real tests and agreed measurable capacity/performance/backup/recovery/accessibility targets. |
| GAP16 release | Full source/extension/feature/workflow/spec/card mapping required; dependency-numbered plan before build. | OpenKBS proposes release boundaries/sequence; user reviews actual plan. No scope silently removed. |

## What “filled” means

Product capability, operational route, responsible actor, required setup, exception/handoff and acceptance are now written for the identified gaps. Real company values, professional content review, provider feasibility and executed implementation remain explicitly required. A configuration gate with a named field/owner is a completed product rule; a blank hidden behind a generic TODO is not. Missing runtime/provider evidence remains a genuine technical dependency, not a claim that all project work is finished.

The existing four journeys remain: owner/management, staff/coaches, member (including guardian/dependent/trial limited contexts) and contractor. Platform admin is separate. New capability records reuse existing data/permission/document/payment/task foundations. Nothing in this edition configures a real account/provider, sends messages, collects money or deploys an app.

The current [data/permission/reporting extension](data-extension-contracts.md) specifies trial grants, dependent/guardian relationships, import provenance, auth assurance, readiness ownership and beneficiary-versus-payer reporting.


## GAP09 update — 0.25

Role hierarchy, owner/platform scope, senior/local management, logical permission vocabulary, field bundles, individual overrides, conflict precedence, delegation, effective-access UI and revocation routes are now specified in [access model](access/access-model.md). Editable non-owner role compositions are starting proposals; tenant setup chooses their actual grants and limits. Remaining technical gap: map every permission to real API/schema/files/search/exports/jobs/AI and execute denied/concurrency/revocation tests. Static contract checks do not close runtime enforcement. Other gap categories keep their existing status.


## GAP13 update — 0.26

The event/recipient/channel/deep-link/privacy/reminder/escalation/stop-state contract is now specified in [communications](notifications/notification-contract.md), with canonical event inventory and planned acceptance cases. Automated timing values, channel/provider/sender evidence and actual runtime delivery/retry tests remain setup/build work. This closes the missing product specification, not production integration.


## GAP14 update — 0.27

The [reporting contract](reporting/metric-contract.md) now supplies exact logical definitions, source/date/scope/freshness/missing-data and drilldown rules for metric/report views, with synthetic reconciliation. Company accounting/tax/currency/attribution/valuation inputs and actual schema/state/history queries remain required; runtime data/source completeness and financial calculations must be verified. No statutory accounts or payroll functionality is implied.


## Shared logical record/lifecycle update — 0.28

[Shared model and transitions](data/lifecycle-contract.md) now supplies core entities/relationships, orthogonal state dimensions and guarded commands with downstream/failure/repeat/audit rules, linked to all 149 workflows. This narrows product-level GAP01/03/05/08/15/16 planning detail; it does not close actual runtime/provider/schema/concurrency/recovery evidence. The specialised access/communications/reporting/extension records remain required. Exact provider mappings and setup inputs stay receiving work.


## Document/form readiness refinement — 0.29

The [document/form contract](documents/document-contract.md) now specifies existing-scope type inventory, source-bound typed fields/layouts, completion/review/signing/applicability and correction/delivery rules. This narrows missing GAP11 and Documents implementation detail; actual company-reviewed content, signature/render/file capabilities, retention choices and runtime evidence remain required. No approved legal/medical template content is supplied by inference.


## Consolidated setup and handoff — 0.30

The [setup hub](setup/setup-hub.md) now brings current policy/document/notification/report/readiness into one resumable company/gym journey with independent capability gates and delegated owners. Current product scope is usable for OpenKBS detailed planning; remaining actual project/provider/company content/configuration/evidence inputs are finite in [remaining inputs](delivery/remaining-inputs.csv). See [handoff audit](reviews/handoff-audit-0.30.md). This is not all gaps closed or production readiness.
