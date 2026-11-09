# Founder access clarifications — 0.25

Current explicit founder instructions after repository 0.24. These records supplement the historical 242 OG-SRC blocks and 5 OG-EXT records without rewriting them. Current clarifications govern conflicting earlier terminology.

| ID | Settled direction | Affected records |
|---|---|---|
| OG-ACL-001 | Owner is company-wide across all its gyms. Admin means platform admin, with broad platform-wide oversight and administration. | OG-SRC-0011–0014,0017–0018; WF-SPACE-03,WF-USER-10 |
| OG-ACL-002 | Senior management can cover multiple assigned gyms; junior/local gym management is gym-specific. Specialist roles such as pay administration remain possible. | WF-USER-07,WF-USER-09; staff and owner journeys |
| OG-ACL-003 | Platform admins and company owners can set granular access by user type/role and by particular user. | WF-USER-07; roles/templates, individual grants, effective-access preview |
| OG-ACL-004 | Documentation implements role+individual grants, explicit deny precedence, scope/action/field/approval/delegation controls and audited revocation described in the subsequent discussion. | Implementation deduction preserving prior access/privacy/business rules; policy-contract.json and access acceptance scenarios |

OG-ACL-001–003 are explicit product choices. OG-ACL-004 records the stated implementation contract, not proof that every proposed specialist default was individually approved. Default staff role compositions remain editable proposals for owner setup. This update authorises repository documentation, not live permission changes.

## Terminology and supersession

Earlier references to company administrator mean a company-delegated management/custom role, not the platform-admin role. Do not auto-promote existing company admin labels. Migrate only after a reviewed mapping. Senior management is a permission/scope assignment; not everyone with manager in their job title receives all sensitive records.

Owner authority covers all own-company records/actions, with explicit sensitive permissions seeded into that role; channel projections still protect shared reception displays. An owner cannot reach another company by editing gym scope. Platform admins have the broad oversight described by the founder, and may inspect customer workspaces through the explicit logged privileged context. Earlier scoped-support wording is the access/audit mechanism, not a requirement for each customer to invite platform admins or an owner veto over platform administration. Keep no-silent-impersonation, MFA, real signatures, financial integrity and job self-approval constraints.
