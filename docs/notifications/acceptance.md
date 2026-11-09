# Planned notification acceptance

Not executed runtime tests. Existing AC criteria remain unchanged; these focused cases supplement WF-CAL-03/04 and each event's source workflows.

| ID | Required outcome |
|---|---|
| NOT-AC01 | One committed source event produces one logical event/recipient/channel/reminder-slot outcome despite duplicate callbacks/jobs. |
| NOT-AC02 | Failed/uncommitted booking or payment command cannot send confirmed success. |
| NOT-AC03 | Cancelled booking cancels future reminders; its old link shows current cancellation without accepting old action. |
| NOT-AC04 | Reassigned task stops former assignee reminders and resolves new eligible recipient; unassigned work remains in authorised owner queue. |
| NOT-AC05 | Individual deny or revoked gym scope suppresses pending delivery, search preview, protected link and delegated AI reminder access. |
| NOT-AC06 | Guardian payer-only relationship never receives private signer/collector action without matching verified rights. |
| NOT-AC07 | Provider accepted/unknown/delivered evidence remains distinct; out-of-order callback cannot fabricate read/completion. |
| NOT-AC08 | Read/dismiss/mark-all-read does not approve quote, accept shift, sign document, record attendance or close task. |
| NOT-AC09 | Email/push mute preserves current required in-app/source action; outreach preference remains independently enforced. |
| NOT-AC10 | Unknown notification submission reconciles original provider reference; retry cannot charge/refund/book/sell again. |
| NOT-AC11 | Permanent delivery failure creates an authorised operator issue; no infinite retry loop through broken channel. |
| NOT-AC12 | Waitlist reminder/late delivery cannot extend capacity hold or accept expired offer. |
| NOT-AC13 | Private health/HR/pay contents and other recipients never appear in generic external previews or unsafe debug exports. |
| NOT-AC14 | No configured reminder/escalation time means automation stays off, not guessed intervals or hidden missing owner. |
| NOT-AC15 | Already-authorised backup receives escalation within existing power; none available leaves owned blocked queue, no autoapproval. |
| NOT-AC16 | Theme/white-label changes use current published branding; receipt links preserve original issued snapshot. |
| NOT-AC17 | Policy update conflict requires current diff/rereview; failed publication retains previous policy and schedule. |
| NOT-AC18 | Source due/timezone/recurrence update invalidates obsolete reminder slots; DST/clock/repeated execution tested against configured semantics. |
| NOT-AC19 | First-time invite/recovery works without requiring signed-in inbox or pre-verified email; public response does not enumerate account existence. |
| NOT-AC20 | Unsupported push/SMS/email capability is visibly unavailable; fake enabled toggle cannot count as delivery proof. |
| NOT-AC21 | Inbox filters/deep links work with desktop left and tablet/mobile bottom navigation, keyboard, long text, both modes and denied targets. |
| NOT-AC22 | Timing/quiet-hours/digest changes do not silently change source deadline, legal terms or acceptance meaning. |
| NOT-AC23 | New contact destination is checked before send; already delivered external content is not falsely claimed recalled. |
| NOT-AC24 | A genuine provider payment event remains source truth even when notification fails; reconciliation/reporting remains intact. |

Builder evidence must record actual event payload/source transition, intended resolved recipients, suppressed recipients/reasons, provider references/test result and relevant business state before/after. Use synthetic accounts/data, not real customer HR/health messages.
