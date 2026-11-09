# Contributing to Orb Gym

Follow AGENTS.md. Every behavioural change links a source requirement, feature specification and numbered delivery card. Initial work is documentation/planning only; implementation follows explicit scope authorisation.

Before changing a feature, inspect its real current state and dependencies. State the user-visible outcome, access/state changes, affected source IDs, compatibility/migration effects and verification. Update related documents and CHANGELOG as part of the same change. Do not create a second source of branding, attendance, finance or approval truth.

Use small reviewable changes. Preserve existing work; do not overwrite another project's configuration or use the reference customer gyms as production seed records. The builder selects branch/build/test conventions after inspecting the repository integration. No remote repository, branch policy or CI pipeline is configured by this scaffold.

Run python3 scripts/validate_repository.py for documentation updates. Future app checks must test meaningful outcomes including denied access, failure/retry and cross-module effects, with synthetic data. A UI screenshot alone is insufficient. Use the pull-request template and record checks actually performed and known limitations.
