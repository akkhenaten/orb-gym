# Feature and Workflow Delivery Coverage

Repository 0.22. Read [workflow catalogue](../workflows/README.md), [structured workflows](../workflows/catalogue.json) and [feature register](../workflows/feature-register.json). The catalogue is a populated product-level pipeline set; it is not a count of implemented features, actual delivery cards or fully decomposed atomic requirements.

## Mandatory builder mapping

For every FEAT and WF ID record source/atomic requirement, receiving spec, actor/role/device surface, owning record/state/action, linked module/event/next owner, applicable decision, local acceptance ID/criterion, actual delivery sequence and returned platform card ID. One coherent card may cover several workflows or a workflow may need several cards; retain the many-to-many relationship rather than generating an arbitrary card count.

Add workflow-coverage.csv to the builder's planning outputs. Every workflow must have either planned linked card(s), existing capability verified by actual evidence, blocked decision with owner/next action, or an explicitly source-backed non-implementation disposition. A feature cannot be marked covered merely because a page or module parent card exists. Do not mark unresolved policies as implemented.

Reconcile in both directions: atomic source requirement → feature/workflow → spec → card → acceptance/evidence; every workflow/card → grounded source or justified enabling work. Source context, illustrative examples and unresolved decisions need explicit status rather than disappearing. Preserve stable OG-SRC, OG-REV, FEAT and WF IDs across revisions; new missing subworkflows get new IDs rather than renaming completed work silently.

## Definition of Ready and Done extension

Before a feature card is Ready, specify its workflow steps, actual state transitions/actors/guards, happy/alternative/denied/failure paths, links to owning domains, next-owner/notification, file/audit handling, dependencies and verifiable acceptance. Required open policy/feasibility decisions block affected execution; independent work may proceed. A full launch boundary is not invented by sequencing work.

Done requires actual feature-local evidence plus applicable cross-module acceptance and review. Draft → submitted → approved → verified → paid → closed must not be collapsed into an optimistic generic status. The existing card contract still governs the single global 00, 01, 02… sequence and stable platform IDs. New planning cards remain Backlog; no cards are created by these JSON registers.


Current 0.22 scope: map all 242 OG-SRC, eleven OG-REV and five OG-EXT units through the current twenty feature briefs and 149 workflows for 134 features. DEC-GR-01–07 now specify product routes/defaults; missing tenant values, reviewed content and real provider proof are readiness inputs, not automatic approval. Include extension-source-map.json alongside the original source map. workflow-coverage.csv must link each applicable source/feature/workflow and guard/exception to actual numbered cards and local/cross-module acceptance through AC90. Use source-extension-register.md, gap-resolution-status.md and setup-and-readiness.md before interpreting old review statuses. No live service, account, payment or deployment is authorised by planning files.
