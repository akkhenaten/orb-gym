# Orb Gym Repository Review — Edition 0.19

7 November 2026. Reviewed the actual stored v0.18 ZIP (87 files) against the supplied gym-app discussion and retained source baseline. No GitHub Orb Gym repository was available from the current account repository-list page or focused connector search. This review therefore concerns the downloadable repository; it is not a claim to have inspected remote commits or changed GitHub.

## Outcome

The four customer journeys and core architecture are captured: multi-company/multi-gym ownership, scoped staff/HR/rota, member onboarding/payment/entitlement, limited PT and two coach models, contractors, classes/attendance, shared hierarchical facilities/task/case engine, assets/quotes/costs, POS/stock, feed/feedback, Documents, landing pages, finance/reporting, Orb, configurable branding and responsive navigation. Platform administration is separate. No core module from the discussion was found entirely absent.

The repository remains a product/planning baseline. Its feature files are product-backed briefs, not finished runtime specifications. Role/action/field matrices, concrete schema/API/events, final UI/token bindings, provider/device configuration, exact policies, actual numbered delivery cards and executed application evidence still require OpenKBS planning and later implementation. Full app/production readiness is not established by this review.

## Findings and applied corrections

| ID | Finding | Action / outcome |
|---|---|---|
| R01 | Reception photo-left ID card, entry/exit and occupancy were present in module sources but lacked their own feature brief; related requirements mapped mainly to classes/access. | Added spec/reception-entry-exit.md and source/spec mappings, explicit scan/visit/entitlement/PT/class boundaries and exception checks. |
| R02 | Four journey guides were accurate but cross-module handoffs and alternate branches were distributed across long files. | Added journey-architecture-trace.md and journey-exceptions-and-handoffs.md; linked them from journeys/specs/instructions. |
| R03 | Class feedback was detailed in source OG-SRC-0061 but not explicit in the class feature brief; mapped feedback handling could be overlooked. | Added the feedback handoff to class/community briefs and cross-linked the source map, retaining private/public audience/moderation rules. |
| R04 | Journey guides referred to specs and acceptance/gaps as plain, sometimes contextually incomplete paths. | Converted these into correct clickable relative links and added source/acceptance navigation. |
| R05 | Architecture opening described reviewed handoff r1 even though current repository used r2; asset review limitations included older statements. | Clarified current repository/source/review lineage and marked earlier audit limitations as historical; did not rewrite immutable original source blocks. |
| R06 | Historical generated UI concepts show sample logos/metrics and older generic attribution. | Verified they are explicitly reference-only and that current logo, exact footer and written design/branding rules take precedence. No change to settled branding behaviour. |
| R07 | All-source indexing might be mistaken for completed atomic/card coverage. | Retained explicit block-level status and no actual card IDs; receiving builder must decompose and prove coverage. |

## Settled decisions verified

Company can select a full UI style and upload its logo/colours with permitted gym overrides; default Orb Gym Basic remains until white-label activation. All five directions and light/dark/system rules remain. Settings owns branding, Documents composes templates; Orb name is fixed with approved company icon. Exact page footer is Orb Gym - powered by orbsolutions.co.uk. Desktop uses left nav; tablet/iPad/mobile uses bottom nav including landscape. Cleaning/maintenance/admin use one engine with groups/children/dependencies. Hourly employed-coach PT is included; prepaid packages/bundles are excluded. Delivery cards use one global 00, 01, 02… sequence in prerequisite order with stable actual platform IDs separate.

## Remaining owned planning gaps

GAP01–GAP16 remain open where not previously settled. These cover real project/auth/runtime, payment/DD/merchant configuration and activation policies, social feature boundary, booking/cancellation/waitlist rules, PT/rent/earnings terms, advanced POS/device options, detailed permission matrix, final design/token values, reviewed HR/health forms/age/retention, payroll interface, outbound channels/domains/maps, accounting/metrics and measurable release/recovery targets. They are not missing product categories and cannot be silently turned into approved values. An unresolved first-release boundary is separate from full agreed scope.

## Evidence and limits

Initial v0.18 hashes and documentation checks passed for 242 OG-SRC blocks, 11 OG-REV units, 253 block-level mappings, fifteen feature briefs, four journeys, 55 planned acceptance cases, 181 local Markdown targets and the unchanged logo. Edition 0.19 adds the reception brief and cross-module trace; final repository validation records its current counts. These are document checks, not executed acceptance tests. The current review does not certify a Figma design, real UI, hardware integration, security, finance or legal/clinical compliance.

The live architecture Page and GitHub have not been edited. Revised working files preserve the original r2 handoff ZIP and original source history. Next step is ingest this edition into the correct Orb Gym project, inspect actual capabilities and prepare full technical specifications plus numbered delivery cards before build authorisation.
