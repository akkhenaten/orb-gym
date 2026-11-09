# Prompt 1 — Import the Orb Gym Repository

I have attached Orb_Gym_Repository_v0.22.zip. This is the active populated repository structure for Orb Gym, superseding the old handoff-folder packaging instructions. First confirm this is the correct Orb Gym project; reference screenshots of Opulence/Orb Security are not the destination.

Inspect the archive into a staging directory, verify its checksums and preserve its complete contents. It contains one top-level Orb_Gym_Repository folder: place that folder's contents at the project repository root, not an extra nested application folder. Preserve existing code, secret/configuration files and unrelated instructions. If the target already has README/AGENTS or a conflicting runtime layout, compare/merge the relevant documentation and report exact conflicts; do not overwrite blindly. Do not fabricate a package manifest or deploy configuration.

Read root README.md and AGENTS.md, then docs/README.md, all active product/module/journey/specification/decision/design/delivery files. Read history and docs/baselines only as provenance; reading prompt 02 does not authorise executing it. Run python3 scripts/validate_repository.py if supported; otherwise verify with equivalent file/source/hash checks and state the limitation.

Confirm actual stored paths, project identity, complete inventory, source/edition, source ID coverage, unchanged logo and unresolved ingestion conflicts. Be accurate about whether the project automatically reads AGENTS.md; if not, explicitly use it as our supplied builder instruction document. Do not claim automatic platform support you have not inspected.

This step authorises documentation import and read-only inspection only. Do not build/deploy, provision services, send emails, change live data or create cards yet. Wait for the separately issued planning prompt.


Repository0.23 also requires BUILD_BRIEF.md and docs/design/frontend-ui-specification.md with its catalogues. Bind SCR/CMP IDs and workflow action variants into actual route/field permission and card planning. Treat completed token measurements as proposed implementation baselines, not business rules or evidence of a built frontend.


## Dashboard comparison references — 0.24

Use the [five dashboard concepts](../assets/ui-dashboard-comparisons/README.md) to compare the same owner surface across Basic01, Flat02, Editorial03, Glass04 and Console05. Basic01 remains default; all five are company-selectable. Images are visual references; written rules, tokens and supplied master artwork govern generated deviations. The folder README lists known differences. Both modes and responsive behaviour still require implementation verification.


## Current setup and handoff — 0.30

Start with CURRENT_BASELINE.md at repository root and the current BUILD_BRIEF.md. The [setup hub](../docs/setup/setup-hub.md) combines resumable scoped sections, responsibility delegation, capability-specific current gates and new-gym inheritance. Optional/missing setup does not create a global block or bypass source requirements. Remaining inputs and actual OpenKBS evidence are enumerated in docs/delivery/remaining-inputs.csv and the current handoff audit. Current brief is planning/cards only, not build/deployment authority.
