# Vendor and Contractor

Scope: Only explicitly shared assigned jobs, assets, visits, documents and own organisation/operative context.

| Stage | User action and result | Handoff / boundary |
|---|---|---|
| Onboard | Accept supplier invite; submit required business/credential information and relevant rules. | Required fields/expiry and scope controlled by management. |
| Accept assignment | Accept/decline/clarify and propose authorised visit dates. | Assignment, notification and acceptance remain different states. |
| Quote | Submit versioned scope/line items/evidence and requested variations. | Only authorised gym/company approver decides; changed quote may need fresh approval. |
| Perform work | Attend permitted site, add notes/photos/files and completion submission. | Shared feed with explicit internal/vendor/member audience; scoped operative delegation. |
| Verify and invoice | Management verifies/returns work; supplier submits invoice, resolves discrepancy and views permitted payment status. | Completion, asset service state, approval, invoice and payment stay separate. |
| Close or reopen | Preserve evidence/corrections; revoke obsolete assignment/access without deleting job history. | No unrelated members, HR, supplier jobs or company-wide finances exposed. |

## Navigation and connected specifications

Responsive Jobs/Visits/Updates/Account bottom navigation on tablet/mobile; scoped desktop left nav. Same top-details/lower-feed-and-records card, adapted to compact Details/Activity/Records. Connected specifications: [tasks-assets-contractors](../../spec/tasks-assets-contractors.md), [finance-reports](../../spec/finance-reports.md).

## Shared interruption and recovery rules

Show pending/failed/denied/expired states truthfully. Recheck access on submission and deep links; retain recoverable drafts and selected gym where permitted. Notify only current authorised audiences; read state is not approval. Acceptance cases are in [acceptance-scenarios.md](../acceptance-scenarios.md). Exact policies and providers remain in [planning-gap-register.md](../planning-gap-register.md); these journeys do not resolve them silently.

Detailed [source-to-spec handoffs](../journey-architecture-trace.md) and [exception/recovery branches](../journey-exceptions-and-handoffs.md) form part of this journey. They supplement the full module sources without selecting unresolved policies.

For feature-level detail across these journey stages, read the [workflow catalogue](../workflows/README.md). Actor journeys and feature pipelines are complementary; both must map to implementation and acceptance.

Operational exceptions and unresolved choices are consolidated in the [0.21 review](../reviews/operational-gap-review-0.21.md) and [decision discussion](../decisions/operational-decisions.md). They affect handoffs, not a new customer journey.


## Access clarification 0.25

[Granular access model](../access/access-model.md) specifies company role and individual grants. These controls do not bypass member eligibility, verified guardian relationships, assigned vendor audiences or prohibited self-approval. Current roles and grants are reviewed in context; account type alone is not blanket access.
