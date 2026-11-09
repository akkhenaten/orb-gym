# Delivery Priorities and Planning Constraints

This is a dependency-led delivery brief, not an implementation plan or an instruction to build immediately.

1. Inventory the existing project, infrastructure configuration, board and code. Preserve unrelated work. Confirm this is the Orb Gym project; do not repurpose the Opulence/Orb Security project shown only as a reference.
2. Establish workspace identity, tenancy isolation, platform-admin boundary and action/field/gym RBAC. Data/API access rules precede live customer flows.
3. Establish the fully tokenised application shell, default Orb Gym Basic, all preset contracts, profile, Settings, responsive navigation and brand inheritance. Map delivery of the four alternative presets rather than forgetting them.
4. Define shared domain foundations before parallel module work: person identity; money/payment ledger; evidence; audit/events; calendar projection; resource booking; shared task/card engine; document/template versioning.
5. Deliver complete journeys in bounded increments: owner setup; member application→payment/approval→entry; class/PT booking→attendance; staff invitation→rota→duty; contractor fault→approval→verification/invoice.
6. Complete POS/stock, HR detail, landing-page management, feed/cases/feedback, documents and retention against the full requirement map. Their ordering may vary by proven dependencies.
7. Add Orb analysis/execution over working commands, with source links, permission checks and idempotency. Task execution must not be implemented by direct unrestricted database access.
8. Run cross-module tests and deployment/recovery validation. No placeholder or mock provider flow may be counted as production complete.

Every requirement must be covered by a phase/card or an explicit unresolved decision. A staged plan is not permission to remove agreed scope. The first-release boundary must be proposed and approved explicitly; it is not yet a commitment to launch all features simultaneously. Builder chooses technical implementation after inspecting actual project capabilities. Use synthetic test records.

Separate specification approval, implementation-plan approval and build/deployment authority. Approving Spec does not authorise Build in this engagement; follow explicit mode instructions, even if the Studio UI normally advances automatically.


Review r1: include finance/report definitions, access/navigation/notification matrices, complete token deliverables and the platform capability matrix. Address the planning-gap register per affected card rather than blocking all independent planning.

Revision r2: OG-REV-011 requires a single dependency-ordered sequence of delivery cards from 00, 01, 02 onward. Follow docs/board-card-contract.md for title format, parent/child handling, stable platform IDs, ordering checks and subsequent changes. Include sequence numbers alongside board IDs in all delivery mappings.
