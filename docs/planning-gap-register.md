# Planning Gap Register

Review r1. These are unresolved details or required planning deliverables, not permission to invent rules. The stated owner role means the person accountable to resolve the item, not a claimed approval. They do not block documentation or backlog creation; they can block particular implementation/release cards. Every item must have a recommendation, consequences, owner, receiving card(s) and resolution evidence in the builder's decision log.

| ID | Gap and required outcome | Accountable role | Gate |
|---|---|---|---|
| GAP01 | Actual Orb Gym project URL/identity, runtime, schema, auth/session isolation, storage and real-time capability. OpenKBS is selected; architecture details are not yet proven. | Platform builder | Technical plan/affected foundations |
| GAP02 | Payment/DD provider, merchant/billing entity model per workspace, settlement/reconciliation, fees, failures, disputes and refund authority. Credentials and merchant funds must not be shared across unrelated companies. | Company owner + builder | Financial integration/release |
| GAP03 | Activation condition: first collection versus another explicit authorised policy; arrears, grace, freeze/cancel, pro-rata, renewals and future/all-gym access consequences. | Company membership/owner | Entitlement/billing rules |
| GAP04 | Facebook-style feature boundary. Posts/media/replies/reactions/polls/events/saves/mentions/location/moderation are specified. Stories, live broadcasts, calls, marketplace, arbitrary sharing and full social-network parity were not individually scoped. Identify additions/options explicitly; do not claim every Facebook feature is delivered. | Product owner | Social specification approval |
| GAP05 | Booking/RSVP commitment, all-or-partial blocks/courses, waitlist offer expiry/priority, cancellation/no-show/waiver terms and coach/gym cancellation remedies. | Company management | Booking/charging rules |
| GAP06 | Hourly PT booking authority (client request/self-book versus coach scheduling), payment timing, billable increments, buffers, recurring appointments and relationship to member eligibility. Rental coach's own sales/CRM stays outside the limited tier. | Company owner/coaching lead | PT-specific rules |
| GAP07 | Rental frequency/fees and employed-coach revenue allocation/earning approval/payroll handoff. Separate customer PT prices, wages, rent and internal allocation. | Owner/finance/HR | Coaching finance |
| GAP08 | POS operational options: split tenders/partial-payment basket treatment, exchanges, manager void/discount rules, offline sales, cash-drawer sessions, supported scanners/terminal/printer and insufficient-stock behaviour. Existing till/stock scope stays included; additional options need disposition, not assumed inclusion. | Retail/finance + builder | POS specification/device release |
| GAP09 | Role/action/field matrix, approval limits, staff delegation ceiling, support access and multi-role/context-switch behaviour. | Owner + platform builder | Access-sensitive features |
| GAP10 | Final screen/route inventory, breakpoint behaviour, exact component states, all preset token bindings/values, contrast and logo reverse/icon variants. Five concept directions are not five completed production design systems. | Product/design + builder | UI implementation/design verification |
| GAP11 | Staff contract/forms/SOP content, PAR-Q version/review/renewal rules, electronic-signature evidence, age eligibility/guardian support and sensitive-data retention/access. No assertion of legal or clinical compliance is made by these documents. | Company HR/management with appropriate review | Real onboarding/HR use |
| GAP12 | Secure payslip upload/import versus payroll calculation; employment/variable earnings, time approvals and payroll provider scope. Full HR record tools are included; payroll filing is not automatically included. | Company HR/finance | Payroll-related integration |
| GAP13 | Messaging/email delivery, branded sender/domain, recovery and invite links, push/SMS scope, location provider and analytics/consent setup. | Company owner + builder | Dependent outbound/public features |
| GAP14 | Metric definitions, currency/tax/rounding, financial basis, shared costs and cross-gym allocations. Profit cannot be certified from incomplete costs. | Owner/finance | Finance report acceptance |
| GAP15 | Measurable load/capacity, file limits, accessibility checks, backup/restore objectives, environment separation, monitoring/incident ownership and rollback. Record proposed targets and evidence; do not claim generic production readiness. | Product owner + builder | Release |
| GAP16 | First release boundary and order. Map all agreed scope now; recommend milestones and identify what each includes. A delivery phase or an unresolved choice must not silently become a scope deletion or an invented commitment that everything launches simultaneously. | Product owner | Release plan approval |

## OG-REV-006 — Required detailed lifecycle decisions

For membership, lead/application, booking, waitlist, PT access, rota, task/case, quote/invoice, payment/refund, stock transfer, template/publication and user/workspace lifecycle: list valid states, actor/action, prerequisites, transition, side effects, owner/next step, notifications, reversal and failure/retry. Reuse shared command rules; separate actual business rules from implementation mechanisms.

## OG-REV-007 — Missing detail must not masquerade as completion

Finance reporting, permissions, notifications and final UI/token mapping must receive explicit specifications and delivery cards. Open choices may remain blocked while independent work proceeds. Keep decision readiness, specification completeness and implemented/tested evidence separate. Do not treat a report generation attachment, an unverified terminal mock or an attractive screen as proof of its underlying workflow.

## Operational decision detail — 0.21

GAP01–GAP16 remain the top-level categories. [DEC-GR-01–07](decisions/operational-decisions.md) expose specific unresolved approval/payment/form/disruption/archive/till/rental-class choices within them. [Feature proposals](proposals/feature-options.md) are separate unapproved scope, not additions silently classed as existing requirements.

## Resolution of product design — 0.22

The categories above retain their history. Use [gap-resolution-status.md](gap-resolution-status.md) for their current dispositions. Seven operational routes are now specified; former capability proposals have defined journeys. Company policy values/reviewed content and actual technical feasibility/testing are required inputs with explicit readiness gates, not unresolved product behaviour to be guessed by the builder.


## Current GAP09 clarification — edition 0.25

[Granular access contract](access/access-model.md) supplies the product role/action/scope/field/override design. The builder now resolves implementation bindings and configured role choices, rather than inventing this hierarchy. Historical gap descriptions are not evidence this product decision remains absent. Runtime verification is still required.
