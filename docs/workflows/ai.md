# Orb Assistant and Background Insights

Repository 0.21. 3 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[09-navigation-calendar-ai.md](../modules/09-navigation-calendar-ai.md); [08-design-branding-documents-pages.md](../modules/08-design-branding-documents-pages.md)

[ai-operations](../../spec/ai-operations.md); [finance-reports](../../spec/finance-reports.md)

Planned cross-module acceptance: AC32, AC34, AC46. Decision references: GAP01, GAP09, GAP13, GAP14, GAP15. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Owner Orb assistant/report panel and role-scoped insight/review cards; normal app commands remain available if AI fails.

AI requested/running/proposal/review/approved command/executed/partial/failed outcomes distinct from authoritative business-record states.

Authorised requesting owner → Orb scoped tools → existing business approver when required → receiving module/assigned human reviewer.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-AI-01

**FEAT-AI-01 — Sourced owner analysis and reporting**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Owner asks Orb a question/report across permitted gyms |
| Preconditions | Current actor scope, relevant records/period and configured model tools |
| Ordered journey / checkpoints | Retrieve scoped evidence → analyse → show sources/period/gaps → explain recommendation → link underlying records |
| Source records / result / handoff | AI suggestion/report distinguished from verified facts, staff statements and approvals |
| Exception / decision branch | Missing data or provider error is disclosed; uploaded content cannot instruct broader access or invent source evidence |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC32, AC34, AC46 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-AI-02

**FEAT-AI-02 — Authorised execution and approval handoff**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Owner clearly requests supported operational action |
| Preconditions | Same business command authority as normal app, scoped records and operation ID |
| Ordered journey / checkpoints | Prepare action → check existing authority → execute routine permitted command or request applicable decision → return result links |
| Source records / result / handoff | Audit contains actor/gym/source/command/outcome; partial success/retry protection explicit |
| Exception / decision branch | AI cannot approve its own financial/access/signature/publication/consequential schedule action outside established authority; no unrestricted DB writes |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC32, AC34, AC46 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-AI-03

**FEAT-AI-03 — Background image/retention/operations suggestions**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Orb organises permitted photos/data or flags exception |
| Preconditions | Authorised sources, model/version trace and appropriate human owner |
| Ordered journey / checkpoints | Analyse → label candidate issue/classification → show evidence → human reviews → creates/updates permitted task/action |
| Source records / result / handoff | Photo/retention insight links source and review; staff/member prompts need not require universal chat UI |
| Exception / decision branch | No automatic proof of cleaning/safety/fitness/legal compliance; no unsolicited offer/message/discount; ordinary tools work if AI fails |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC32, AC34, AC46 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.
