# Controlled Import and Existing-Gym Onboarding

Repository 0.22 · extension OG-EXT-003. Capability is now specified in the product documentation following the request to fill the gaps. Its tenant settings and real implementation remain subject to setup readiness and evidence.

Owner/admin/staff journey: delegated import operator and independent authorised reviewer where configured

Start with controlled file-based import, not invented provider integrations. Formats/entity scope and exact mappings are defined in the technical plan; CSV can be an initial supported input only with validation, encoding/type handling and private staging. Preserve data ownership, privacy, source identity and batch provenance. Imported rows are untrusted inputs. Never import permanent passwords or treat a bank/card/mandate reference as a working payment method. Do not auto-transfer financial contracts/signatures. Opening balances require finance review and a distinct imported-history label. No record activates until current verified identity, onboarding, role/payment and approval gates apply. Matching/quarantine is reversible before commit; after commit use source-domain corrections/compensating actions. No promise of undoing externally completed effects.

[Setup and readiness](../setup-and-readiness.md), [current operational rules](../decisions/operational-decisions.md) and [workflow catalogue](../workflows/README.md) govern activation. Full feature pipelines are in [IMPORT](../workflows/import.md).

Existing original signed agreements/receipts and their source evidence may be retained as protected imported copies with provenance and review status. Import must not fabricate a new signature, issue a misleading replacement receipt or mark old terms valid without the required review. A verified original may satisfy a current evidence requirement only under its explicit applicability rule. Any real payment-mandate migration is a separately authorised, provider-supported process, never a consequence of uploading a reference in a file.
