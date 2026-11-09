# Four Customer Journeys

- [Owner, Admin and Management](owner-management.md)
- [Staff, Managers and Coaches](staff-coaches.md)
- [Member and PT-Only Client](member-pt-client.md)
- [Vendor and Contractor](vendor-contractor.md)

Platform administration is a separate service boundary in ../modules/01-workspaces-and-access.md and ../../spec/workspace-access.md; it is not a fifth customer journey.

Review 0.19 adds the [journey-to-architecture trace](../journey-architecture-trace.md) and [exception/handoff rules](../journey-exceptions-and-handoffs.md).

For feature-level detail across these journey stages, read the [workflow catalogue](../workflows/README.md). Actor journeys and feature pipelines are complementary; both must map to implementation and acceptance.

Operational exceptions and unresolved choices are consolidated in the [0.21 review](../reviews/operational-gap-review-0.21.md) and [decision discussion](../decisions/operational-decisions.md). They affect handoffs, not a new customer journey.

Edition 0.22: trial/guest and guardian/dependent paths are limited member subjourneys; import is a delegated owner/staff workflow and stronger authentication is a shared foundation. The product still has four customer journeys, with platform administration separate.


## Access clarification 0.25

[Granular access model](../access/access-model.md) specifies company role and individual grants. These controls do not bypass member eligibility, verified guardian relationships, assigned vendor audiences or prohibited self-approval. Current roles and grants are reviewed in context; account type alone is not blanket access.
