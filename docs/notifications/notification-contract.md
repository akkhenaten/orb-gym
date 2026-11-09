# Notifications, reminders and escalation — 0.26

Source OG-NOT-001: founder accepted the proposed notification/escalation matrix after repository 0.25. This completes the logical communication contract for OG-REV-005/GAP13 and WF-CAL-03/04. It does not configure a sender, select a provider, send messages, set arbitrary business reminder times or prove delivery.

The [event catalogue](event-catalogue.json) is canonical; [CSV](event-matrix.csv) is generated from it. [Policy settings](policy-settings.json), [templates](template-contract.md) and [planned acceptance](acceptance.md) complete the handoff. Existing workflows own the underlying business transitions; notifications are projections of those transitions and cannot become a second source of truth.

## Trigger and recipient rules

Emit only after the relevant authoritative transition commits, or when a configured milestone is evaluated against the current source state. Record workspace, applicable gym, source ID/material revision/occurrence, event type, actor, time/timezone and recipient purpose. A new feed note is not a quote approval, payment confirmation or completed task. Unrelated edits to a source record do not regenerate an already issued business event.

Resolve recipients from current assignments, specific event role and field/audience grants. The company owner can oversee all company queues but need not receive every operational event by default. Senior manager gets assigned gyms; local manager gets their gym; payroll/HR/coach/vendor/member audiences stay distinct. A guardian receives a dependent notification only through its separately verified matching communication/action grant, not because they paid or share an address. Exclude self-notification for own conversational updates by default; important confirmations/security outcomes remain visible.

Recheck current rights, recipient assignment, contact destination, communication purpose and source validity before each attempted delivery and reminder. A mention is a visible ID reference, not an invitation to hidden records. Resolve groups to authorised recipient identities; never expose the other group recipients in bulk external messages. Do not broadcast private contractor/HR/health details to everyone in a gym.

For changed assignment, cancel pending reminders to the old actor and recompute for the new responsible person. If nobody eligible exists, retain the source action in an authorised owner/operator queue and expose the unassigned responsibility; do not invent a reviewer, grant access or repeatedly send to the former user.

## Channels and preferences

In-app inbox plus visible source action state is the baseline. Required outstanding operational/account states cannot be hidden merely by muting email/push or dismissing a notification. Optional personal alerts can be muted; dismissal and read status are separate from business acknowledgement or completion. Public/first-time verification/recovery has no fictitious logged-in inbox: use actual supported identity flow and issuer/operator diagnostics.

Email is conditional on verified/configured sender capability, supported templates and intended recipient. Identity messages follow the actual auth provider's request/token/rate/expiry behaviour, retaining generic public responses. Initial invitations/verification may go to an intended address not yet proven account-owned; message receipt and successful verification remain distinct. Push is conditional on actual implementation, permission and device subscription. SMS is not a promised baseline capability. Unsupported channels are unavailable with explanation, not fake green toggles.

Personal Profile -> Notifications groups events by bookings/classes, membership/payment, shifts, assigned work/approvals, community, documents and security. For each supported channel show saved preference, device/provider availability and reason a required service action remains visible. Company policy controls which operational reminder/escalation families exist and their configured timing. Personal options cannot redirect another person's payslip or override a source action deadline.

Retention/outreach marketing preference is separate from operational service messages. Determine and record the message purpose before sending; do not label promotional text essential service to bypass preferences. Actual consent/legal wording is company-reviewed setup, not a claim that all outreach is legally required or automatically permitted. Quiet hours/digest apply only when configured and appropriate; no delay of expiring offers/security flows without explicit approved policy. Do not silently turn digest into an acceptance deadline extension.

## Delivery state model

Source event -> logical recipient notification -> per-channel delivery -> attempts. Logical states include current, superseded, cancelled and resolved-source. Read/unread and dismissed are independent metadata. A delivery can be queued, submitting, provider-accepted, delivered-if-evidenced, delivery-unknown, transient-failure, permanent-failure, suppressed, cancelled or expired. Preserve each attempt's provider reference and timestamp; do not overwrite uncertain history with success.

Provider acceptance is not delivery; delivery is not read; read is not required acknowledgement; acknowledgement is not assignment acceptance/attendance/approval/signature/payment/completion. The appropriate source command records that outcome. User-interface copy must name what is known. If the provider cannot prove delivered, retain accepted/unknown. Do not fabricate read tracking for external channels.

Deduplicate by workspace/source material event or occurrence/event type/recipient/purpose/channel/reminder slot. Retry the original logical delivery with bounded configured attempts, preserving original provider references. Provider callback duplicates/out-of-order events cannot duplicate messages or regress a terminal result without explicit reconciliation. If submit outcome is unknown, inspect/reconcile the existing reference before a blind resend. If provider cannot support duplicate-safe reconciliation, expose residual duplicate risk and a controlled operator remedy rather than claiming exactly-once delivery.

Every retry revalidates source, recipient, rights, current destination and policy; invalid work suppresses/cancels. Retrying notification never retries a payment, refund, stock mutation, booking or signed action. Notification provider failure does not undo a confirmed business transaction. Permanent failure/unsupported required identity delivery creates a current actionable operator issue; provider outage must not trigger recursive notifications through the same broken channel forever.

## Reminders, escalation and stop conditions

No hard-coded intervals, retry counts, grace periods, quiet hours or escalation deadlines are invented. Company settings supplies the applicable values/owner; auth/invitation token behaviour respects the inspected provider and configured product policy. Until configured, automated reminders/escalations remain off while current in-app/source action remains visible. Missing required first-time identity delivery blocks actual onboarding rather than pretending in-app notices replace verification.

Reminder scheduler keys off source due date/timezone and occurrence identity, not last screen view. Reschedule/cancel/reassign/version change invalidates obsolete reminder jobs. Evaluate actual source state at execution. Read/unread affects display, not a business-required reminder's validity; completed applicable acknowledgement can stop its own action prompt. Repeated job execution does not resend the same configured slot. Define timezone/DST handling in the actual implementation; preview future fire times during policy setup.

Escalation goes to a configured responsible queue/manager or already-authorised backup. It never assigns more approval authority, approves a quote, collects money, makes a medical decision or grants entry. Owner-unavailable fallback follows existing DEC-GR-01; no backup means an owned blocked queue. Capacity-limited waitlist offer expiration follows the source offer, not a notification delivery callback. Missed external delivery does not silently extend an offer or change the paid remedy.

Stop conditions are explicit per event: cancellation, completion, fulfilled requirement, reassignment, revoked rights, source revision replacement, offer/token expiry, agreement ending or reviewed withdrawal. Preserve history rather than deleting prior delivered notices. Previously delivered external messages cannot be recalled reliably; protected links check current source and show current outcome. A static receipt notice links its issued snapshot, but an expired booking link cannot reopen its old acceptance action.

## Settings and operator workspace

Company Settings -> Communications owns event families, supported channels, purpose, reminder schedules, escalation targets, timing/timezone, retry policy and safe approved copy. Grant notifications.configure_policy/manage_templates separately from role administration. Preview recipient examples and future schedule; show affected gyms, channel readiness, invalid targets and version diff. Save with expected version; failure retains published policy. Enable automation only after required values and capabilities are verified. No separate confirmation for every routine configured notice.

Notification centre has All/Unread/Action needed filters, gym/type/date and permitted record links. Open marks read separately; explicit Acknowledge invokes source requirement if applicable. Mark all read is scoped to the chosen filter and never mass-completes work. Unavailable target provides safe return without private preview.

Delivery monitor is private to authorised operators: logical event/recipient (minimised), workspace/gym, provider/channel, status/failure reason/attempts, next configured attempt, related source and current eligibility. Retry action is permission checked and deduplicated. Safe diagnostic exports omit token/payslip/health content. Logs retain reason for suppression/cancellation and who changed policy/destination. Contact corrections never update already issued document snapshots.

## Ownership and trusted boundaries

Business module owns event truth/eligibility. Access service owns audience and field filtering. Communications owns notification/policy/attempt status. Provider adapter owns external reference/evidence mapping; it cannot authorise a business decision. Profile owns personal channel choices; company settings owns operational policy. Exact provider framework/schema/jobs/outbox/invalidation mechanisms are OpenKBS inspection/implementation choices.

Logical records: NotificationEvent, RecipientNotification, ChannelDelivery, DeliveryAttempt, NotificationPreference, CommunicationPolicyVersion, ReminderOccurrence and EscalationCase. Commands: publish policy, resolve recipient, queue current delivery, record provider evidence, retry eligible delivery, mark read, dismiss and request source acknowledgement. Consequential changes use current permissions, expected versions and auditable idempotent operation references. Retention/backup/export rules follow the company-approved data policy; no arbitrary duration introduced.

## Handoff and closure

Product behaviour is specified; real sender/auth/email/push support, company timing/purpose choices, actual routes/field guards and executed delivery tests remain required. OpenKBS expands event IDs -> exact transitions -> recipient queries/channel templates -> source/deep links -> implementation cards -> provider/denied/retry tests in screen-and-notification-matrix.md and verification-plan.md. All cards retain global 00,01,02… numbering and real returned IDs. No live message is authorised by this document.


## Recovery-path corrections — 0.33

Read docs/data/recovery-path-contract.md at repository root. Current source grant restoration, actual full/partial/discrepancy transfer resolution, provider late-failure/configured retry and separate training submit/review authority override earlier incomplete transition examples. Actual source evidence/policy/current permission and all prior business guards still apply. No extra provider capability or automatic unreviewed service activation is promised.
