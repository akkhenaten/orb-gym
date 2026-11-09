# Specified Operational Rules — Edition 0.22

7 November 2026. Following the founder's instruction to fill the gaps, the rules below are now the concrete product design for the builder to implement and review. This specifies application behaviour and configuration gates; it does not claim the founder supplied each customer's commercial terms, that a provider is configured or that software is implemented. The previous PROPOSED recommendations are preserved in history/operational-decisions-v0.21.md.

Status for DEC-GR-01–07: **DESIGN_SPECIFIED**. Company-specific inputs: **SETUP_REQUIRED** where identified. Runtime/evidence: **NOT_IMPLEMENTED / NOT_VERIFIED**. Read [setup readiness](../setup-and-readiness.md) and [source extensions](../source-extension-register.md). Reviewed legal/safety content and external feasibility remain explicit receiving work.

## DEC-GR-01 — Missing task owner or approver

Every approval type has a configured owner role, permitted backup role/person, limits, conflict rules and escalation owner. If the assigned person is unavailable or loses the grant, keep the request pending/blocked and route it to an already authorised backup; otherwise escalate to the authorised company owner/management queue. Routing never grants the recipient additional permission. Do not auto-approve on a deadline or through a mention. Contractor self-approval of its quote remains prohibited.

The replacement reviewer must inspect current scope, amount, quote validity/version and supporting evidence before deciding. Retain original/new assignees and reasons. Company setup supplies applicable limits, deadline/escalation intervals and eligible delegates. If nobody currently has authority, the task remains owned and blocked until an authorised grant/decision is made. This is visible on the dashboard, not lost in an inbox.

## DEC-GR-02 — Payment reversal or late failure

Default operational mode is **review first**: authenticated adverse payment events update the financial history, create an owned finance/Membership exception and identify affected rights/bookings/earnings. They never silently cancel membership, refund, retry collection or remove access. An authorised actor must use the normal source command, or a separately published explicit company automation policy must permit the exact action.

Before selling a paid plan, company setup must specify access/booking treatment during review, arrears/grace rules or manual-review mode, review ownership/deadline, contact channel and permitted collection/refund authority. No duration or monetary threshold is invented here. A manual-review setting is an actual configured choice, not an absence of policy. Member login for permitted account/payment resolution remains separate from active use. Do not erase the original receipt or count adjustments as new revenue.

## DEC-GR-03 — New forms or policies for existing people

New applications use the current required published version. A material revision must declare its affected cohort, effective date, review/acknowledgement requirement, reviewer and impact on existing rights/bookings before it is applied to current members. Publishing a template alone never changes entitlement. Existing valid evidence remains retained.

The product supports future-applications-only, at-renewal, before-a-specified-activity and targeted-review applicability. The publisher selects the appropriate mode and any required reviewed terms; there is no blanket annual PAR-Q period or automatic fitness conclusion. Outstanding reviews appear on the person's checklist and responsible queue. Restrictions arise only from the explicitly configured/authorised rule and show an intelligible next step.

## DEC-GR-04 — Published rota or confirmed-service disruption

A coach, room, equipment, gym, qualification or availability change creates an owned impact case for the actual affected shifts/occurrences/appointments. Default is manager-led resolution, not silent substitution or automatic cancellation. Show affected people, paid/booked states, series exceptions and viable cover/resources. Validate qualifications, rota overlap, travel and capacity before offering a replacement.

Material service changes require the configured member response/acceptance step; the conservative product default requires acceptance before transferring an existing booking into a materially different service. Company setup defines what changes are material, reply/offer timing and cancellation/refund/credit rules using reviewed terms. Missing setup blocks that automated transition. Original capacity is not freed/consumed twice; any revised hold expires under the explicit policy. An unanswered offer remains owned, not treated as consent.

Finance acts on the existing charge/refund authority. Notifications, booking changes, attendance registers, coach allocation and public timetable must reconcile. Staff private absence reasons never appear in member messages. Approved leave/cover request alone is not a published rota amendment or proof of presence.

## DEC-GR-05 — Archive a gym with obligations

Use a mandatory impact checklist: future membership/PT/class rights and bookings, staff/cover, open tasks/contractors, visits, assets/stock, public pages, balances and issued records. Every item must be resolved or explicitly retained with an accountable owner/next action under the chosen closure plan. Outstanding invoices need not disappear or be falsely paid to make an archive look complete.

Stop new public promotion/booking according to the authorised effective closure, then apply domain-specific transfer/reschedule/cancel/access/financial actions. Ownership/retention and applicable terms remain required company setup. No automatic employee/contract transfer, refund, all-gym entitlement expansion or cascade deletion is implied. Retain history and restricted finance/evidence access; confirm remaining gyms' valid rights are unaffected. Partial execution shows unresolved obligations.

## DEC-GR-06 — Confirmed tender, broken fulfilment or unmatched money

Retain the original operation, provider/tender and source charge IDs. If the UI, stock commit or receipt fails, query/reconcile the existing transaction; never recapture because the screen timed out. Keep the exception assigned to till/finance. Default remediation is an authorised operator decision between valid fulfilment and an approved financial remedy; there is no automatic substitution or refund.

Unmatched/excess money stays explicitly unallocated until an authorised allocation/refund/adjustment is selected. Do not invent customer credit, new revenue or negative stock. Partial/duplicate/wrong-entity/currency allocations are version-checked and corrected through traceable adjustments. Company setup supplies discount/void/refund rights, any limits, stock-availability rule, permitted tender/device behaviour and accounting/rounding treatment. Receipt delivery/reprint is separate from financial completion.

## DEC-GR-07 — Rental-coach class collection modes

The product supports explicit per-arrangement/class collection modes. The default independent-rental mode is **coach collects externally**: Orb Gym handles the authorised booking/access/register and the gym's rent; it does not collect the coach's class revenue, create employee earnings or promise an in-app payout. Public terms name the responsible service/payment party. External payment references remain clearly recorded versus verified where applicable.

Company management can instead configure **gym-included/free** or **gym-collected paid class** where its approved commercial and merchant setup supports that mode. Gym collection requires a named legal issuer/merchant, price/inclusion/fee-share version, applicable refund responsibility, reconciliation and any coach amount-owed/settlement treatment. Missing setup prevents that mode being published/sold. It is not an automatic payment-splitting/banking product; actual settlement/payment adapters require separately verified capability and existing financial authority.

Historic bookings/receipts keep their accepted mode and issuer. A rental class never inherits the employed-coach allocation/wage rules by role label. Private external client CRM remains excluded from the rental tier. Prepaid PT packages/session bundles remain excluded throughout.

## Closure status

The seven product paths are specified. Their required company settings are in setup-and-readiness.md and policy-settings-contract.json. Exact prices, dates/age bands, legal/safety wording, configured limits and real provider capabilities are setup/technical inputs, not silently chosen values. No unresolved recommendation is relabelled as a legal approval or production test.
