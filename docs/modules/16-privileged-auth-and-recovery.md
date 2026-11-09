# Privileged Authentication and Recovery

Repository 0.22 · extension OG-EXT-004. Capability is now specified in the product documentation following the request to fill the gaps. Its tenant settings and real implementation remain subject to setup readiness and evidence.

All-user account foundation with mandatory owner/platform-admin privileged controls

Use the selected identity provider's supported authenticators and recovery, with a preference for stronger phishing-resistant options where feasible; do not build a custom authentication system or choose a vendor from this document. Platform minimums require owner/platform-admin MFA and appropriate step-up for configured sensitive actions before privileged production use. Company policy can extend requirements to staff/finance roles but cannot silently weaken platform minimums. Members' optional factor support depends on provider capability. A verified MFA challenge is not permission to approve a refund or read HR fields. Lost-factor/sole-owner recovery, session expiry/revocation, alternate permitted recovery and break-glass accountability are part of acceptance, not a later support improvisation. No real credentials/factors/accounts are changed by this design.

[Setup and readiness](../setup-and-readiness.md), [current operational rules](../decisions/operational-decisions.md) and [workflow catalogue](../workflows/README.md) govern activation. Full feature pipelines are in [AUTH](../workflows/auth.md).

## Initial owner security setup

A verified new owner has only the limited bootstrap route needed to establish their own workspace/onboarding context, enrol supported authentication/recovery and complete personal setup. That route cannot grant privileged customer data, financial execution, global user export or support impersonation before required assurance. Legitimate separate member self-service may remain available under its own role. Define and test this boundary in the chosen provider so mandatory MFA does not create an impossible first-enrolment or sole-owner recovery loop.
