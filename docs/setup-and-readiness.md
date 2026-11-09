# Company Setup and Service Readiness

Repository 0.22. Missing operational values are explicit setup requirements rather than hidden decisions left to the builder. Keep separate states **disabled → draft/incomplete → ready for review → published/enabled → suspended/archived**, with versioned actor/time/history. A readiness failure explains exactly what is missing and who may fix it. A staff setup page can remain accessible while a public service is unpublished.

## Publication / activation gates

| Capability | Required values / verification | Behaviour while incomplete |
|---|---|---|
| Company/gym base | Workspace/owner, legal/display identity, gym timezone/address/contact and scoped roles; public fields explicitly selected. | Draft management workspace; no false public booking or payment promise. |
| Paid membership | Plan/version, participating gyms, amount/currency, reviewed agreements/forms/reviewer, billing/merchant/provider, qualifying payment/approval and reversal/arrears/access/booking policy. | Member onboarding/holding available; no active paid entitlement merely from payment-method setup. |
| Classes/courses/PT | Eligible people/roles, capacity/resources/coaches, recurrence/availability, booking/hold/waitlist, cancellation/no-show/material-change/financial treatment, price or explicit inclusion, billable increment/rate precedence for PT. | Draft/unbookable configuration with exact missing fields; no guessed penalties or duration. |
| Rental-coach class | Explicit external/included/gym-collected mode; responsible service party; any price, fee/share, issuer, refund/settlement setup. | Default external-collection mode only when its public terms/booking rules are ready; gym collection unavailable without merchant/policy proof. |
| Trial/guest offer | Enabled gyms/purpose, time/visit scope, eligibility/guardian rule, price or explicit zero/free, forms/house rules, reviewer, cancellation/no-show and access/expiry policy. | Disabled/unpublished. Normal membership/PT-only service remains independent. |
| Junior services | Gym/activity age eligibility, reviewed guardian/form/authority process, permitted relationship grants, biller/booker/signatory/contact/collection rules, staff safeguarding role and communication/privacy policy. | Disabled/unpublished; no independent junior signup/login/social defaults inferred. |
| Task/approval type | Owning queue/role, reviewer/backup/escalation, applicable limits, evidence/review rule, due/recurrence/notification policy and current authorised delegates. | Draft template or owned blocked item; never auto-approve or imply verification. |
| POS/stock | Gym products/price/currency/tax treatment, tender/terminal/scanner/printer capability, stock availability, discount/refund/void authority, shift/reconciliation and failure recovery. | Stock/catalogue preparation possible; unverified tender/device mode cannot be advertised as live collection. |
| Staff HR | Role/gym, required content/training/credentials, contract/payslip/document access and authorised review/retention/export boundary. | Pending/onboarding; verified permissions separate from staff profile or course tick. |
| Landing/branding | Approved public source records, validated media/logo/links, selected theme/override scope, exact footer, publication owner. | Last valid published content or draft; logo upload does not itself enable white label. |
| Outbound channels | Verified sender/provider/domain, recipient scope, permitted preference categories and retry ownership. | In-app current status/queues remain truthful; no claimed delivered email or configured push/SMS. |
| Import | Staff permission, authorised source/format/schema mapping, dry-run/matching rules, quarantine/review owner, batch scope/rollback plan and opening-balance review. | Staging only; no live activation, invitation, payment or provider migration. |
| Privileged auth | Supported provider/factors, owner/platform-admin enrolment, step-up/session revocation and tested lost-factor/sole-owner recovery route. | Restricted setup/recovery route; financial/admin actions fail closed until requirements are met. |

## Configuration ownership and precision

Company policy values are versioned records, not environment variables or hard-coded guessed defaults. Separate platform minimum controls from allowed company/gym overrides. Display currencies/tax/rounding and effective dates explicitly; issued financial/signed records freeze accepted versions. Membership, entry eligibility, payment state and person identity remain distinct.

For each policy field record type, owner role, permitted scope, current value/version, validation, required-when condition, affected workflow, publication evidence and change impact. policy-settings-contract.json contains the initial machine-readable inventory. It is a specification inventory, not a running validation engine or completed tenant configuration.

Publishing a policy version must preview affected future/live records and choose explicit applicability. In-progress/issued/signed records are not rewritten. Where a human action is required, the queue retains an accountable next owner rather than pretending lack of configuration is a successful automation. A pending decision is not permission to collect money or expand access.

## Required setup values are not closed technical feasibility

The actual OpenKBS project/runtime/auth/payment/device/domain/map/payroll integrations must be inspected. Reviewed form/contract wording, applicable jurisdiction and measured recovery/capacity/accessibility targets remain required inputs. This specification supplies a concrete place, owner and guard for those inputs; it does not certify their correctness or make the service ready for production without them.

## Initial owner security setup

A verified new owner has only the limited bootstrap route needed to establish their own workspace/onboarding context, enrol supported authentication/recovery and complete personal setup. That route cannot grant privileged customer data, financial execution, global user export or support impersonation before required assurance. Legitimate separate member self-service may remain available under its own role. Define and test this boundary in the chosen provider so mandatory MFA does not create an impossible first-enrolment or sole-owner recovery loop.

The current [data/permission/reporting extension](data-extension-contracts.md) specifies trial grants, dependent/guardian relationships, import provenance, auth assurance, readiness ownership and beneficiary-versus-payer reporting.


## Current setup and handoff — 0.30

Start with CURRENT_BASELINE.md at repository root and the current BUILD_BRIEF.md. The [setup hub](setup/setup-hub.md) combines resumable scoped sections, responsibility delegation, capability-specific current gates and new-gym inheritance. Optional/missing setup does not create a global block or bypass source requirements. Remaining inputs and actual OpenKBS evidence are enumerated in docs/delivery/remaining-inputs.csv and the current handoff audit. Current brief is planning/cards only, not build/deployment authority.
