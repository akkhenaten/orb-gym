# Access acceptance scenarios — planned, not executed

These supplement AC01/02/03/37/38 and the existing USER/SPACE/AUTH checks without renumbering them. Tests here are product acceptance intentions; documentation validation cannot establish server enforcement.

| ID | Scenario and required outcome |
|---|---|
| ACL-AC01 | Owner can manage every own-company gym including a newly added gym; guessed foreign-company IDs are denied without metadata leak. |
| ACL-AC02 | Platform admin can select another workspace for authorised audited inspection; company owner cannot assign platform-admin status. |
| ACL-AC03 | Senior manager assigned gymsA/B has no gymC scope; local managerA cannot gain B by changing URL, filter, export or AI prompt. |
| ACL-AC04 | ManagerA/coachB same identity can coachB but cannot publish B rota using managerA action combined with coachB gym scope. |
| ACL-AC05 | Role allows refund inA; individual deny refundA defeats it. RefundB remains governed by its own independent scope, not blanket deny. |
| ACL-AC06 | Individual allow adds export only for gymA and approved fields; it cannot reveal B data or full HR without field allowance. |
| ACL-AC07 | Local manager can issue delegated staff invitation but cannot select owner/senior/platform or widen scope beyond delegation. |
| ACL-AC08 | Payroll template permits intended pay projection while denying disciplinary, unrelated health, refunds and branding unless separately granted. |
| ACL-AC09 | Owner/admin reception shared display still uses restricted card projection rather than revealing private health/HR. |
| ACL-AC10 | Vendor can submit assigned quote/evidence but cannot approve own quote by direct command or individually overridden role. |
| ACL-AC11 | Rental coach cannot see employed-coach whole CRM/payroll; permitted class register is scoped to own assigned class. |
| ACL-AC12 | Guardian payer grant does not automatically permit form signature, collection or unrelated household records. |
| ACL-AC13 | Member/PT/trial permission edit does not manufacture paid/approved/current pass; workflow eligibility still checked. |
| ACL-AC14 | Simultaneous role-template edits produce conflict/diff and rereview, not silent overwrite. |
| ACL-AC15 | Revocation mid-session denies next protected query/export/AI command and rechecks pending work; original audit remains. |
| ACL-AC16 | Revoked user following stale file/deep link receives safe denied state; downloaded/offline bytes are not falsely claimed erased. |
| ACL-AC17 | Removing or denying the final owner's recovery-critical access is blocked pending controlled ownership/recovery route. |
| ACL-AC18 | An expired individual grant no longer allows action, and derived calendar/search counts exclude forbidden records. |
| ACL-AC19 | Access inspector shows contributing role/override/scope and policy version without leaking hidden record contents. |
| ACL-AC20 | Failed or repeated permission save leaves one authoritative version/audit outcome; actual business guard failure is not labelled permission success. |
| ACL-AC21 | Admin/owner cannot expose provider/factor secrets or sign a contract as a customer through broad access. |
| ACL-AC22 | Genuine payment callback still records provider truth after staff revocation under integration authority; no replayed sale or destroyed history. |

Execute against direct API/commands and UI, searches/files/events/background jobs/exports/AI, and role changes under concurrency. Verify permissions screens on desktop left navigation and tablet/mobile bottom navigation in both modes. Record actual evidence in OpenKBS delivery access-matrix.md and verification-plan.md.
