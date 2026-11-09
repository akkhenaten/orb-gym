# Default role usability and limited actor routes — 0.34

Role templates are editable starting proposals, not live issued customer grants. This review checks whether their stated default journeys are usable without broadening authority. Current source, relationship, field, lifecycle, actual assurance and individual-deny rules always govern.

## Assigned work execution

A cleaner or contractor operative could view/post/upload/submit evidence but StartAssignedWork required work.edit, which their templates did not include. They therefore lacked a required OPEN -> IN_PROGRESS step. Use work.start_assigned for actual current eligible assigned/delegated work and prerequisites. It permits neither generic task editing/assignment nor verification/closure/spend. Defaults include the own-assigned start action for appropriate worker roles; actual owner may configure more restrictive rules explicitly. Required child/dependency/credential/permit conditions still block unsafe starts.

## Limited asset fault reporting

The original product allows a limited authenticated member asset-reporting view, but shared SubmitTask required internal work.create. Add work.report_fault and an exact limited reporter route. Scanning an asset QR still grants nothing. Actual permitted reporter sees only approved identity/instructions/own-report status and can supply description/appropriate asset/area/evidence. Server/source resolves current gym/context, type, triage queue and internal audience. It rejects private owner, parent/dependency, quote/invoice/cost/approval inputs. Do not grant internal work.create or general asset/task edit merely so a member can report a broken item. The report uses the existing typed engine and actual responsible queue, not a separate duplicate maintenance system.

## Basic account and staff self-service

self-service-contract.json defines explicit own-scope baseline for safe profile/preferences/security/inbox, including pending/PT/trial/vendor contexts, without active membership requirements. The starting matrix now reflects it. Global identity security/contact verification uses the supported provider and is separate from company-specific profile access; a company role cannot take over another company or another identity.

Actual own staff onboarding/current employment gets access to intended contract/payslip/SOP and own shift/leave/time actions where source applies. Intended contract/SOP action must be reachable before full employment activation when it is a prerequisite, otherwise onboarding loops. This is not broad HR, colleague pay/disciplinary records, payroll approval, active staff rights for rental-only coaches, or continued live operations after leaving. Actual recipient/assignment, field/source/retention and individual-deny rules still apply. Retained leaver access remains separately permitted; no blanket forever access.

Previously proposed wider HR/pay/people/rota grants are preserved, not replaced with own-only access. Owner/admin and delegated manager scopes stay as already specified. An individual restriction can intentionally remove a default capability; show the resulting missing grant/blocker rather than silently adding it back.

## All booking response routes

Accepted booking/offer previously had explicit self/guardian/staff routes, but DeclineOffer and WithdrawBookingRequest still used one generic cancellation check. They now select actual actor relation too: self requires classes.cancel_booking; verified dependent requires family.book plus classes.cancel_booking and actual specific relationship; staff-other requires classes.book_other plus classes.cancel_booking. Payer-only/contact-only relationships do not become booking authority. Decline/withdraw releases capacity once, checks current actual deadline/source version, and never invents a refund or deletes an already confirmed booking. Unknown relation denies, not falls back to self.

## Validation and implementation boundary

New persona checks compare template/base grants with selected source actions and preserved delegated rules, plus limited-report field and booking-response guards. They are illustrative specification checks with assumed source scope, not a deployed policy engine or actual browser journey. OpenKBS must still test source field/assignment/purpose/identity/relationship/private file/API and explicit denial behaviour.
