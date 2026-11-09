# Decisions and Open Items

Baseline 0.17 · 6 November 2026

## Settled directions

- Product is Orb Gym: multi-company workspace platform; owner creates multiple gyms; separate platform administration.
- Four customer journeys: owner/admin/management; scoped staff; member including PT-only limited access; vendor/contractor. Rental coaches have a limited role with authorised class tools.
- Default UI is Orb Gym Basic 01 using Orb Solutions design; five selectable presets are tokenised and support light/dark; Neumorphic06 is tokenised but deferred and not selectable.
- Desktop left navigation; iPad/tablet and mobile bottom navigation, including tablet landscape. Content pane count adapts independently.
- Company Settings owns brand/style/company details; Gym Settings provides permitted local overrides and public content. Documents composes templates and consumes published brand configuration.
- Orb Gym default remains until explicit white-label publication. Every page displays “Orb Gym - powered by orbsolutions.co.uk”.
- AI assistant name is Orb. Icon is Orb Gym by default and approved company mark when white labelled. AI tools follow trusted commands/RBAC.
- Cleaning/maintenance/admin share one engine, with grouped tasks, parent/children, dependencies, typed feed, evidence, approvals and audit trail.
- Hourly employed-coach PT and PT-only onboarding/access are included. Prepaid PT packages/session bundles remain excluded. Historic blanket PT exclusions do not exclude the later confirmed hourly PT journeys.
- Rental-coach commercial terms differ from employed-coach wages/hourly customer prices/internal allocations; do not collapse those into one rate.
- Screenshots are reference only. Primal and Valkyrie are demonstration gyms, not seeded production customer records.

## Open choices to investigate

Identity provider; exact OpenKBS hosting/runtime configuration; payment/DD and terminal integration; printer support; maps/place search; email/domain setup; accounting and payroll interfaces; storage privacy and retention; real commercial terms; booking hold duration and cancellation/no-show policies; who approves sensitive actions; age/guardian scope; workload and restore targets.

Prepare a recommendation with alternatives and consequences for each material choice. Use reversible configuration for ordinary business settings; never hard-code guessed rates or thresholds.

## Source authority

Current founder decisions override superseded conversation wording. Detailed extracted module files and architecture export describe the same baseline. Requirement register supplies source references. Builder-authored specs/plans cannot silently change product scope. Raise a conflict with exact file/section/source IDs and a recommended resolution.

The original source architecture is included in full; generated-image figures/logos/sample dates are not approved data. The active product implementation will use approved logo bytes. No file in this pack is authority to use real customer/health/payment data during development.


## Review r1 clarification

OpenKBS is the selected builder; actual runtime/integration choices are still open. Use the exact mandatory footer rather than older generic attribution wording. Hourly employed-coach PT is included; prepaid PT packages/session bundles are excluded. Soft Glass 04 and the old iOS-inspired Soft summary are one preset. See planning-gap-register.md for the full owned decision list and review-report.md for corrections.

All agreed product scope must be mapped. The first-release boundary is not yet approved: phasing must not silently remove features or invent a simultaneous launch commitment. This handoff revision corrects working documents; it does not claim the live Page or any app was updated.

## Confirmed founder decision — handoff r2

Every delivery card is numbered in a single logical sequence: 00, 01, 02 and onwards. Prerequisites precede dependent work. This applies to parent and child cards and all delivery references; stable OpenKBS IDs remain separate. See OG-REV-011. This is settled, not an open design choice.

## Operational review 0.21

Source-grounded exception handoffs were clarified, preserving existing business intent and IDs. All recommendations in [operational-decisions.md](decisions/operational-decisions.md) and [feature-options.md](proposals/feature-options.md) are PROPOSED/OPEN. They do not override settled decisions or count as approval. Prepaid PT packages remain excluded.

## Current gap-fill instruction — 0.22

The latest instruction to fill the gaps is expressed in [OG-EXT-001–005](source-extension-register.md). Current DEC-GR-01–07 product routes/defaults are [specified](decisions/operational-decisions.md), not left as earlier proposed alternatives. Trial/guest, junior/guardian, import and privileged-auth capabilities have concrete optional/configurable journeys. Exact tenant inputs and actual technical capabilities remain [setup/readiness requirements](setup-and-readiness.md). This supersedes only old proposal/undefined-path status; historical source wording/IDs are retained. It does not add prepaid PT packages or authorise real provider/account/payment/deployment changes.


## Current granular access clarification — 0.25

Read the [access model](access/access-model.md) and its source clarification, role/action/field catalogues, individual allow/deny policy, editable template matrix and planned access scenarios. Admin means platform admin; owner covers all own-company gyms, senior management covers assigned multiple gyms and local management is gym-specific. Owner/platform admin can grant by role/user type and individual. Explicit scoped individual deny prevails over a matching role allow. Earlier company administrator wording means delegated company management, never platform privilege. Existing business, privacy, self-approval and authentication guards remain. The detailed product permission contract is specified; actual schema/command bindings, configured tenant roles and enforcement evidence remain builder work.
