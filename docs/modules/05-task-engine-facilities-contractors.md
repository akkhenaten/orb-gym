# task engine facilities contractors

Detailed extracted scope from baseline 0.17. Read with product-architecture.md and decisions-and-open-items.md. Each source reference is traceable; no requirement is removed by this grouping.

# Recurring work and gym operations

<!-- OG-SRC-0095 -->
Cleaning staff and authorised supervisors can schedule recurring tasks and group them into job sheets within their delegated scope. Reusable templates generate distinct dated occurrences. The same mechanism supports opening, closing, safety checks and equipment inspections.

<!-- OG-SRC-0096 -->
| Record | Purpose |
|---|---|
| Job-sheet template | Instructions, tasks, recurrence, expected duration and evidence requirements. |
| Scheduled job sheet | Gym/area, assigned staff, due time and progress. |
| Individual task | Completion state, notes, photographs, exceptions and review. |
| Follow-up action | Fault, shortage or issue requiring another responsible person. |

<!-- OG-SRC-0097 -->
Tasks support complete, partial, blocked and not completed outcomes. Record staff-reported completion separately from manager verification. Require evidence selectively; capture photographs and notes against the exact task. A job sheet showing eight completed and two outstanding cannot appear fully complete.

<!-- OG-SRC-0098 -->
Preserve occurrence history when a recurring template changes. Schedule recurrence in the gym’s timezone and prevent duplicate generation during retries or daylight-saving changes.

<!-- OG-SRC-0099 -->
Facilities and equipment maintenance follow the asset and job-card workflow below. Incidents and handovers connect to accountable actions with an owner, due date, status and review history.

# Equipment assets and maintenance

<!-- OG-SRC-0100 -->
Prepaid PT packages and session-bundle balances remain excluded. Hourly PT appointments, PT-only onboarding/access, coach-specific rates and explicitly agreed internal revenue allocations are included by later founder decisions. Rental coaches may also run authorised classes. This replaces the earlier broader PT exclusion.

<!-- OG-SRC-0101 -->
Orb Gym includes a compact facilities and maintenance module for equipment breakdowns, technical faults and premises issues. A fault becomes an accountable job with evidence, contractor assignment, approvals, costs and verified resolution.

## Asset register and QR access

<!-- OG-SRC-0102 -->
Each asset has a stable ID, gym/area, name, category, manufacturer/model, serial number where available, photographs, operating status, documents and service history. Optional purchase details, warranty and service information connect costs and maintenance to the correct equipment. Keep location history when moving an asset between gyms.

<!-- OG-SRC-0103 -->
Authorised staff can create assets and print QR labels. Scanning opens the asset record and role-permitted actions: report a fault, see existing issues, view instructions, or change operating status. QR labels identify assets; they do not confer edit rights or expose private records. Members can receive a limited authenticated reporting view without contractor quotes, internal notes or financial details. Provide manual asset lookup and readable references if a label is damaged.

<!-- OG-SRC-0104 -->
Asset states include available, restricted use, out of service and retired. An authorised person records state changes and reasons. Reporting a fault does not automatically certify equipment safe or unsafe; urgent concerns can be escalated and equipment taken out of service by designated roles. Existing open faults are shown during reporting to reduce duplicate jobs.

## Job card and activity feed

<!-- OG-SRC-0105 -->
The desktop job workspace has a top issue summary with gym/location, linked asset, original report, photographs, priority, owner and current status. Below it, the left column is the chronological activity feed and the right column contains organised record tabs. Photographs open in an in-app viewer with zoom. On mobile, Summary, Activity and Records become accessible views of the same job.

<!-- OG-SRC-0106 -->
The feed is the source of the job’s recorded activity: updates, messages, photos, attachments, mentions, quotations, approval requests, decisions, visits, invoices and completion submissions. Financial and approval actions are structured events, not conclusions inferred from free-text messages.

<!-- OG-SRC-0107 -->
| Record tab | Contents |
|---|---|
| Quotes and approvals | Submitted quote versions, requests, decisions, approved limits and variations. |
| Attachments | Original photographs, documents, certificates and other evidence. |
| Decisions | Authorised decisions, reasons, actor, date and the exact records considered. |
| Tasks and visits | Assignments, appointments, dependencies and follow-up actions. |
| Costs and invoices | Estimates, approved commitments, invoices, payments and credits. |
| Asset and history | Asset details, previous faults, repairs, warranty and servicing. |

<!-- OG-SRC-0108 -->
Tabs are views of the same structured records linked from feed events, not independent copies. One attachment or decision keeps one identity. Editing an ordinary post cannot alter a recorded financial approval. Mentions use a permitted people picker and create scoped notifications; tagging a contractor never grants access. Separate internal, contractor-visible and member-visible discussion and attachment audiences.

## Assignment approval and completion

<!-- OG-SRC-0109 -->
Recommended job stages: reported → triaged → assigned → awaiting quote/approval where needed → scheduled → in progress → completion submitted → verified closed. Waiting for parts, access or information is an explicit blocked reason; cancellation and reopening preserve history.

<!-- OG-SRC-0110 -->
Contractors receive only assigned jobs and necessary asset/location information. They can acknowledge, propose visits, add updates/photos, submit quotes and invoices, and supply completion evidence. Assignment, notification delivery and contractor acceptance remain distinct.

<!-- OG-SRC-0111 -->
Quotes carry supplier, scope, line items, net/tax/gross where relevant, validity, attachments and version. A quote requiring approval creates a pending approval record and management alert. Only an authorised approver can approve/reject; retain reasons. Revised scope or amount produces a variation/new version and any required new approval. AI can extract a draft from a document but cannot approve it.

<!-- OG-SRC-0112 -->
On completion, the contractor submits work notes and evidence. The manager verifies or returns the submission. Closing the job and returning the asset to service are separate explicit decisions; one repair may leave another fault outstanding. Capture temporary repairs, further work and any required specialist evidence. Retain a full correction/reopening trail.

## Maintenance finances and announcements

<!-- OG-SRC-0113 -->
Link financial records to company, gym, job, supplier and asset where applicable. Show quoted estimate, approved commitment, invoiced amount and paid amount separately; do not count them all as expenditure. Match invoices to approved work, record partial payments, credits and variations, and flag discrepancies. Payment recording/reconciliation follows the chosen finance integration; adding an invoice attachment alone does not prove payment.

<!-- OG-SRC-0114 -->
Owner reporting can show spend by gym/asset/category/supplier, repeat breakdowns, downtime and outstanding commitments. Distinguish repair expense from replacement purchase according to the configured accounting treatment rather than assuming a classification.

<!-- OG-SRC-0115 -->
Taking an asset out of service can prepare a member announcement identifying the gym/equipment, restriction and alternatives. An authorised person confirms publication unless an explicit automation policy is later approved. Publish only safe public information, not quotes or internal discussion. When service is restored, prompt a corresponding update and resolve the active notice. Link related class/room restrictions for review without cancelling bookings silently.

<!-- OG-SRC-0116 -->
Acceptance cases: scan a label and report a fault; assign a contractor; receive a quote and obtain approval; reject an unauthorised approval; handle a variation; record invoice/payment without double counting; verify repair and asset status; publish and clear a member notice; preserve evidence and permissions across desktop/mobile.

# Common facilities and case card engine

<!-- OG-SRC-0200 -->
Cleaning, maintenance and administrative tasks share one item/card engine and form schema, with type-specific fields and lifecycle rules. Each item holds company/gym, category, requester, owner, priority, due/scheduled dates, location, optional asset, description and evidence. Templates support recurrence, checklists, required notes/photos, assignment and completion review. A grouped job sheet retains each child task’s proof and status.

<!-- OG-SRC-0201 -->
Tasks have stable references and one authoritative history across all three categories. A task can have child tasks, each with its own assignee, dates, status, evidence and verification. Prevent circular parent/child relationships. Group independent tasks into a job sheet/work package without duplicating them; separately link related tasks and explicit blocking dependencies. Grouping, parentage and dependency are distinct relationships. Joining tasks preserves original references, feeds and audit trails rather than flattening or deleting them.

<!-- OG-SRC-0202 -->
Parent/group progress is derived from child states with visible counts. Required incomplete or unverified children prevent a fully completed parent; waived/cancelled children require an authorised reason. Parent closure cannot silently close children. Each task retains responsibility and financial links; aggregate costs once per underlying financial record to avoid counting the same invoice through several tasks. Shared rollups respect each viewer’s permissions.

<!-- OG-SRC-0203 -->
Log creation, assignment, grouping/ungrouping, parent changes, dependencies, evidence, decisions, status changes, verification and reopening with actor/time/reason. Recurring templates generate distinct occurrences and child tasks, preserving previous cycles. Notifications and calendar entries refer to the underlying task rather than creating copies.

<!-- OG-SRC-0204 -->
Navigation rule: desktop uses the left sidebar; iPad/tablet and mobile use bottom navigation, including tablet landscape. Adapt content panes to available space independently of navigation placement. Keep role destinations consistent, support safe areas/soft keyboards, and preserve gym context, drafts and selection on resize/rotation. Larger tablets can show two content panes with the bottom bar retained; narrow desktop windows collapse content/sidebar appropriately. Provide equivalent access to all permitted modules through More/gym selection. Verify parent/child progress, grouped evidence, audit history, nonduplicated costs and responsive navigation across all four journeys.

<!-- OG-SRC-0205 -->
Desktop card structure: the top row contains issue/task details, asset/location, owner/status and original evidence. The second row has two visually distinct but accessible columns: left is the live activity feed and composer; right is the organised record panel. Tokenised surfaces separate columns in light/dark mode; colour is not the only identifying cue. Compact tablet/mobile uses Details/Activity/Records views of the same item.

<!-- OG-SRC-0206 -->
The composer supports notes, replies, attachments, permitted @mentions, decision requests, quotes, invoices, assignment changes and completion evidence. Each structured update can include notes and attachments. Right-side tabs include Attachments, Decisions/Approvals, Quotes, Invoices/Costs and Audit trail, with Tasks/Asset history where relevant. These are projections of the original typed records/events, not copied interpretations. Audit history includes who changed what, when and why; corrections append history. AI may suggest classification but cannot turn a casual comment into an approved spend or decision.

<!-- OG-SRC-0207 -->
Member queries and feedback use the same case foundation with appropriate forms and visibility. Feedback supports stars, text, photos and files; distinguish a public review from a private complaint. Staff internal notes never appear in member replies. Closing records resolution; reopening preserves the previous outcome. Image/file viewing happens in app with zoom and navigation.

# Vendor and contractor journey

<!-- OG-SRC-0208 -->
Management creates or invites a supplier organisation/contact, assigns job/site scope and shares necessary documents. Contractor onboarding records company details and any required credentials/expiry, with acceptance of relevant instructions. Contractor users can accept/decline assignments, request clarification, propose visits, update work, submit versioned quotes/variations, invoices and completion evidence. Managers approve costs and verify closure.

<!-- OG-SRC-0209 -->
Contractors see only explicitly shared assigned work, not member lists, staff HR, company-wide spending or unrelated jobs. Supplier administrators may allocate their own operatives only within granted scope. Access can be revoked without deleting job evidence. Notifications, assignment acceptance, quote approval, payment and completion verification remain separate states.


