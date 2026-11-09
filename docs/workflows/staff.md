# Staff Management, HR and Rota

Repository 0.21. 16 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[04-staff-hr-and-rotas.md](../modules/04-staff-hr-and-rotas.md); [03-classes-coaches-and-attendance.md](../modules/03-classes-coaches-and-attendance.md)

[staff-hr-rota](../../spec/staff-hr-rota.md); [calendar-notifications](../../spec/calendar-notifications.md)

Planned cross-module acceptance: AC03, AC19, AC20, AC42, AC43. Decision references: GAP09, GAP11, GAP12, GAP13, GAP15. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Staff profile, private HR records, rota/availability, own documents, clocking and authorised management reviews. Member duty/team is a separate published projection.

Employment invited/onboarding/active/restricted/left-archived/reactivated/eligible deletion; shifts draft/published/changed; requests pending/approved/declined and actuals pending/approved as relevant.

Company admin/delegated manager → staff/coach → manager/HR reviewer; finance receives only authorised approved inputs.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-STAFF-01

**FEAT-STAFF-01 — Staff creation and invitation**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Company admin or delegated gym manager/supervisor adds staff |
| Preconditions | Permitted gym/role and verified intended email context |
| Ordered journey / checkpoints | Create pending staff assignment → send permitted invite → accept/link identity → complete onboarding → activate assigned tools |
| Source records / result / handoff | One identity with effective employment/gym assignments and inviter history |
| Exception / decision branch | Cannot assign another gym or privileges above delegation; resend/expiry uses controlled invitation lifecycle |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-02

**FEAT-STAFF-02 — Staff profile and restricted records**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Staff/authorised HR updates permitted details |
| Preconditions | Record ownership, field sensitivity and assigned gym/company context |
| Ordered journey / checkpoints | View own/permitted profile → edit allowed fields/avatar/emergency details → validate → save → audit |
| Source records / result / handoff | Public team fields separate from private contacts, pay, health and HR notes |
| Exception / decision branch | Staff cannot edit their own roles, pay authority or professional verification by changing profile text |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-03

**FEAT-STAFF-03 — Contract composition and signing**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised HR prepares employment document |
| Preconditions | Reviewed template or uploaded version and correct signatory/brand/entity |
| Ordered journey / checkpoints | Draft → preview/review → issue → staff signs/acknowledges → retain evidence → amend with new version |
| Source records / result / handoff | Source HR contract plus immutable content/data/template/brand and signature history |
| Exception / decision branch | Template publication is not legal approval or a signature; correction never rewrites an earlier signed agreement |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-04

**FEAT-STAFF-04 — Training and qualifications**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Manager assigns training or records a required credential |
| Preconditions | Assigned role/requirement, course/content version and expiry rules |
| Ordered journey / checkpoints | Assign → notify → complete/submit evidence → verify where required → record certification → flag expiry/renewal |
| Source records / result / handoff | Person qualification/training ledger informs authorised deployment and conflict checks |
| Exception / decision branch | Expired/unverified qualification remains visible; policy defines restrictions and reviewer; completion checkbox alone need not certify competence |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-05

**FEAT-STAFF-05 — SOP and instruction acknowledgement**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Management publishes SOP/assignment instructions |
| Preconditions | Approved document version and target role/gym audience |
| Ordered journey / checkpoints | Publish version → assign → staff reads → acknowledges → retain time/version → reissue material revision |
| Source records / result / handoff | Required acknowledgement and own staff document access; training links preserved |
| Exception / decision branch | Read/delivery differs from acknowledgement; new version cannot replace proof of an old signed/read version |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-06

**FEAT-STAFF-06 — Payslip delivery and payroll handoff**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised HR/finance uploads/imports payslip or approved inputs |
| Preconditions | Correct person/period, private delivery and selected payroll boundary |
| Ordered journey / checkpoints | Upload/import → validate assignment → make available privately → notify permitted recipient → correction/version if necessary |
| Source records / result / handoff | Restricted payslip/history and approved timesheet/earnings handoff, not automatically payroll calculation |
| Exception / decision branch | Wrong-person file is not public; payroll tax calculation/filing is outside assumed scope until explicitly decided |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-07

**FEAT-STAFF-07 — Staff secure messages**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Staff/manager sends work/HR communication |
| Preconditions | Defined recipients and sensitivity, current role access |
| Ordered journey / checkpoints | Compose → attach permitted files → send → deliver/read as supported → reply → retain under policy |
| Source records / result / handoff | Work/HR conversation remains in its authorised audience; links to related records |
| Exception / decision branch | A general team chat cannot expose disciplinary/pay material; read receipt is not agreement or approval |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-08

**FEAT-STAFF-08 — Disciplinary record and follow-up**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised HR/manager records a restricted case |
| Preconditions | Participant/grant scope, reason and applicable company process |
| Ordered journey / checkpoints | Open record → add evidence/notes → arrange review → record authorised outcome → assign actions → close/review |
| Source records / result / handoff | Restricted participants, linked meeting/documents and auditable corrections |
| Exception / decision branch | Workflow records the chosen process without inventing employment law, sanction or general-manager access rights |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-09

**FEAT-STAFF-09 — One-to-one and development actions**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised staff/manager schedules private review |
| Preconditions | Permitted participants and agenda/record sensitivity |
| Ordered journey / checkpoints | Schedule → discuss/add notes → record agreed/recorded outcomes → assign follow-ups → review/close |
| Source records / result / handoff | Private event/details, notes/files and linked development tasks |
| Exception / decision branch | Public calendar must conceal sensitive title/content; a participant’s note is not automatically a formal decision |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-10

**FEAT-STAFF-10 — Availability, leave and sickness**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Staff submits availability/leave or manager records absence |
| Preconditions | Staff assignment, dates/type and authorised review route |
| Ordered journey / checkpoints | Submit/record → review → approve/decline where required → update availability → assess affected shifts/classes |
| Source records / result / handoff | Availability/absence records separate from published rota and public duty view |
| Exception / decision branch | Absence reasons stay private; approval rules and staffing response are configurable, not inferred from the request |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-11

**FEAT-STAFF-11 — Draft and publish rota**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised manager schedules recurring staff/management cover |
| Preconditions | Current assignments, availability, qualification, gym timezone and staffing requirements |
| Ordered journey / checkpoints | Draft shifts → check overlaps/travel/classes/PT → resolve conflicts → publish → notify/acknowledge |
| Source records / result / handoff | Versioned planned shift assignments and company/gym calendar; future edits preserve old versions |
| Exception / decision branch | Draft request is not current public duty; understaffed/unfilled/conflicting shifts remain exceptions with owner |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-12

**FEAT-STAFF-12 — Shift swaps and cover requests**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Staff/manager seeks replacement |
| Preconditions | Existing published shift, eligible replacement and approval rights |
| Ordered journey / checkpoints | Request → candidate response → conflict/qualification review → approve → publish replacement → notify |
| Source records / result / handoff | Original and replacement history; affected classes/PT/tasks reviewed |
| Exception / decision branch | No silent reassignment on message acceptance; travel/multiple gym overlap and unfilled cover must be resolved explicitly |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-13

**FEAT-STAFF-13 — Clocking, corrections and timesheets**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Staff clocks actual attendance; manager reviews period |
| Preconditions | Current person/gym/shift context and permitted device flow |
| Ordered journey / checkpoints | Clock in/out → capture actuals/breaks → flag missed punches → reasoned correction → approve timesheet → export inputs |
| Source records / result / handoff | Actual work distinct from planned shift; approved payroll-ready data traceable |
| Exception / decision branch | Rota alone does not prove presence; failed/duplicate clock event and overtime/rounding need explicit policy/technical treatment |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-14

**FEAT-STAFF-14 — Published team and current duty**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Manager publishes staff role/profile; members view remotely |
| Preconditions | Approved member-facing fields and selected entitled gym |
| Ordered journey / checkpoints | Publish profile/lead assignment → show scheduled versus confirmed team → update clock-out/cover → remove leaver |
| Source records / result / handoff | Current duty view exposes responsible staff without private rota/absence/pay details |
| Exception / decision branch | Unconfirmed presence labelled; no continuous location tracking or public future HR schedule |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-15

**FEAT-STAFF-15 — Staff suspension, leaving, archive and return**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Management ends/changes employment access |
| Preconditions | Effective date, future assignments/tasks/classes, retained obligations and role authority |
| Ordered journey / checkpoints | Review → restrict/revoke → reassign future work → archive history → retention review; rehire explicitly regrants |
| Source records / result / handoff | Employment lifecycle separate from account/member state; private records retained under policy |
| Exception / decision branch | Reactivation does not restore every old role automatically; sole owner needs transfer/closure rather than orphaning company |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC03, AC19, AC20, AC42, AC43 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-STAFF-16

**FEAT-STAFF-11 — Leave, qualification change or departure after rota publication**

Exception/lifecycle subflow of WF-STAFF-11; review finding GR03. Existing source-grounded behaviour is clarified; new policy alternatives are not approved.

| Contract | Required behaviour |
|---|---|
| Actors/trigger | Authorised manager schedules recurring staff/management cover |
| Preconditions | Published shifts/classes/PT/tasks and current approved availability/credential/employment change, with restricted HR scope. |
| Authoritative outcome/handoff | Identify affected work, assign a resolution owner and validate replacements; publish authorised changes and update truthful duty/attendance projections. |
| Exception/policy boundary | A leave request is not approved leave; approved leave is not replacement cover; a public rota is not proof of attendance. Credential expiry consequences are chosen company rules. |

Business checkpoints below describe behaviour, not mandatory API enum spellings. Each decision uses current delegated authority.

| Actor | Before/after checkpoint | Guard/action | Record and next owner | Failure/return path |
|---|---|---|---|---|
| HR/rota owner | Published work → new availability/qualification event | Confirm actual effective change and permitted impact scope | Linked exception list for shifts/classes/PT/tasks; management owner | Unapproved request does not silently rewrite a published rota |
| Manager | Uncovered/conflicted → cover proposal | Check assignment, credential, time, travel and resource conflicts | Eligible replacement or unresolved cover case | Do not reveal private reasons or treat an accepted message as formal shift publication |
| Authorised scheduler | Proposal → published amendment | Apply source rota/class/PT change with history and required notices | Changed assignments; current duty view indicates confirmed/unconfirmed state | No replacement leaves an explicit unfilled responsible action, not false full coverage |
| Manager/timesheet owner | Amendment → verified operational outcome | Review actual attendance and any booking/earnings consequences | Separate actual hours/attendance and linked resolution outcomes | Do not pay solely from revised planned shifts or mark members attended automatically |

Planned acceptance: AC03, AC19, AC20, AC42, AC43, AC60. Operational decisions: DEC-GR-04. See [decision discussion](../decisions/operational-decisions.md).
