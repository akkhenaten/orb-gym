# Privileged Authentication and Recovery

Repository 0.22. Product capability specified from OG-EXT-004; no runnable implementation or executed evidence is claimed. It remains within the existing four customer journeys, not an additional isolated product.

## Behaviour and records

Use the selected identity provider's supported authenticators and recovery, with a preference for stronger phishing-resistant options where feasible; do not build a custom authentication system or choose a vendor from this document. Platform minimums require owner/platform-admin MFA and appropriate step-up for configured sensitive actions before privileged production use. Company policy can extend requirements to staff/finance roles but cannot silently weaken platform minimums. Members' optional factor support depends on provider capability. A verified MFA challenge is not permission to approve a refund or read HR fields. Lost-factor/sole-owner recovery, session expiry/revocation, alternate permitted recovery and break-glass accountability are part of acceptance, not a later support improvisation. No real credentials/factors/accounts are changed by this design.

The detailed [module](../docs/modules/16-privileged-auth-and-recovery.md) and [workflows](../docs/workflows/auth.md) contain every defined feature's actor, preconditions, ordered checkpoints, source result/handoff and exception. Common identity, company/gym/field/action scope, typed evidence, versioned issued documents, money/access/booking records and audit/retry rules are reused. No second ledger, account store or independent task engine is introduced.

## Readiness and current authority

Use [setup-and-readiness.md](../docs/setup-and-readiness.md), [policy settings contract](../docs/policy-settings-contract.json) and [operational rules](../docs/decisions/operational-decisions.md). Company-specific rates, age eligibility, reviewed content, exact access windows and real provider features are explicit required inputs. A disabled/draft/holding/setup-restricted view is a deliberate state, not a missing workflow or successful activation.

## UI and integration

Use the same tokens, company/gym branding, exact footer and desktop-left/tablet-mobile-bottom navigation. Trial users receive limited own-visit/pass/profile views. Guardians use member-context dependent selection and scoped Family/Bookings/Profile tools; choosing a dependent never grants access to another guardian or person. Staff import and security configuration are delegated company/platform tools. Exact routes/component bindings/auth/API/data/events and device/provider capabilities are completed from actual project inspection.

## Implementation and acceptance

Planned local criteria: AC86, AC87, AC88, AC89; common tenant/identity/receipt/attendance/access/retry/backup/responsive tests still apply. Complete state/actor/guard/field tables, ownership/notifications, API/events, migration/rollback/privacy and actual evidence requirements before implementation. Map OG-EXT-004, every FEAT/WF and acceptance to real numbered delivery cards in one global 00, 01, 02… prerequisite order. No arbitrary one-card-per-workflow rule. Do not claim reviewed legal/safety wording or configured provider support from these files.

## Initial owner security setup

A verified new owner has only the limited bootstrap route needed to establish their own workspace/onboarding context, enrol supported authentication/recovery and complete personal setup. That route cannot grant privileged customer data, financial execution, global user export or support impersonation before required assurance. Legitimate separate member self-service may remain available under its own role. Define and test this boundary in the chosen provider so mandatory MFA does not create an impossible first-enrolment or sole-owner recovery loop.

Apply the [logical data, field-grant and reporting extension](../docs/data-extension-contracts.md) when completing entities, permissions, metrics and recovery. These are shared responsibilities, not a second account/task/financial engine.


## Current granular access clarification — 0.25

Read the [access model](../docs/access/access-model.md) and its source clarification, role/action/field catalogues, individual allow/deny policy, editable template matrix and planned access scenarios. Admin means platform admin; owner covers all own-company gyms, senior management covers assigned multiple gyms and local management is gym-specific. Owner/platform admin can grant by role/user type and individual. Explicit scoped individual deny prevails over a matching role allow. Earlier company administrator wording means delegated company management, never platform privilege. Existing business, privacy, self-approval and authentication guards remain. The detailed product permission contract is specified; actual schema/command bindings, configured tenant roles and enforcement evidence remain builder work.
