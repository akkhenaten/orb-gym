# Documents, Templates and Signed/Issued Records

Repository 0.21. 4 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[08-design-branding-documents-pages.md](../modules/08-design-branding-documents-pages.md); [04-staff-hr-and-rotas.md](../modules/04-staff-hr-and-rotas.md)

[documents](../../spec/documents.md); [shell-settings-branding](../../spec/shell-settings-branding.md)

Planned cross-module acceptance: AC05, AC20, AC28, AC43, AC49. Decision references: GAP09, GAP10, GAP11, GAP13. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Template composer with typed variable picker/preview/publication; issued private document list/view/signature or acknowledgement action.

Template draft/review/published/revised/archived; generated/issued/delivered and signed/acknowledged records separate.

Authorised template author/reviewer → owning HR/membership/finance module → intended recipient/signatory → retained issued-record owner.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-DOC-01

**FEAT-DOC-01 — Template composition and controlled variables**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised designer/HR/finance composes document |
| Preconditions | Document type, static reviewed text, typed variables and edit grant |
| Ordered journey / checkpoints | Draft → add fields/layout → validate required values → preview with source data → review → publish version |
| Source records / result / handoff | Reusable contract/member/form/invoice/letter/report/SOP template; Settings provides brand |
| Exception / decision branch | Do not fill missing dynamic data with fiction; publication is not legal approval or issuing a financial record |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC20, AC28, AC43, AC49 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-DOC-02

**FEAT-DOC-02 — Generate and issue source-owned document**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Owning module user requests contract/receipt/report |
| Preconditions | Approved template, exact person/transaction/gym/entity data and issue permission |
| Ordered journey / checkpoints | Select source → resolve data/brand → preview → issue through owning command → freeze snapshot → deliver privately/permitted |
| Source records / result / handoff | Generated record retains source/data/template/brand version and stable identity |
| Exception / decision branch | Template editor cannot forge invoice/signature; generation/delivery failure distinguish pending/issued/delivered |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC20, AC28, AC43, AC49 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-DOC-03

**FEAT-DOC-03 — Signature, acknowledgement and revision**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Intended signatory/staff acknowledges version |
| Preconditions | Correct identity, required document version and supported signing flow |
| Ordered journey / checkpoints | View → sign/acknowledge → retain actor/time/content evidence → revise only with new version/appropriate re-ack |
| Source records / result / handoff | Signed/acknowledged record separate from published template; old evidence unchanged |
| Exception / decision branch | No profile/logo/template update rewrites signatures; exact signature/provider/process and legal content need review |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC20, AC28, AC43, AC49 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-DOC-04

**FEAT-DOC-04 — Document access, archive and regeneration**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Owner/member/staff/vendor accesses permitted record |
| Preconditions | Current record/field/file permissions and retention state |
| Ordered journey / checkpoints | List/search → authorise private delivery → view/download → correct/reissue if permitted → archive under policy |
| Source records / result / handoff | Issued history preserved; reprint and draft regeneration distinct |
| Exception / decision branch | Expired/revoked links and async exports recheck access; deleting template does not delete signed records |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC20, AC28, AC43, AC49 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.


## Document and form catalogue — 0.29

Use the [current document contract](../documents/document-contract.md) with DCT type catalogue, typed fields, declarative layouts, content-readiness gates and planned acceptance. Upload/form/acknowledgement/signature/issued financial snapshot remain distinct. Company-reviewed legal/health/safety wording and actual original documents remain required inputs; placeholders do not become approved content. Owning source commands control issue/sign/review/payment, and historical issued/signed data/brand versions stay frozen.
