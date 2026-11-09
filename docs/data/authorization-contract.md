# Transition authorisation schema — 0.32

This resolves conflicting primary/alternate permission wording from earlier editions. The authorization object in transitions.json is canonical for all 233 transitions (verified: every transition row carries one). The nullable permission_id is only a single-permission search index; neither it, a role label nor a SYSTEM string is a sufficient policy engine. Actor/source/record/field/assurance/version/business guards remain mandatory.

## Three modes

permission_all_of: every requires_all grant applies in the same actual workspace/gym/source context. Respect individual deny and delegation, independent-review/actual signer/terms/current state. Do not OR the grants or combine different scopes. PT service disruption management and cancellation are distinct from booking; refund is another authority and actual financial operation.

context_routes: resolve selector from trusted source type, actual actor/participant relationship and current record, never a client-chosen least restrictive route. Exactly one supported context is used. Each permission_holder route requires all its grants plus always_requires_all and its source/relationship guards. Unsupported/unmapped context denies until the actual owning action is mapped; supplier-quote permission never becomes a universal decision right. There is no hidden default permission as an additional veto or bypass.

verified_source_actor: only the named supported actual subject/provider/owning service and its verified proof can execute. This is not a general service-account exemption. Provider facts require authenticated matching operation/issuer/amount evidence. Actual subject forms/invitation flows require the intended identity/action-specific relation. Internal workers require current service authority and the exact accepted source operation/policy, not arbitrary user-supplied truth.

For a verified_source_service context route, parent_permission_evidence identifies the correctly authorised parent workflow at its actual acceptance/decision. A list of possible parent routes is not an AND requirement. Current source status/published policy/eligibility still governs new effects. Committed historical contract/signature/approval/provider facts remain retained when a staff member later leaves; do not invalidate every past decision because its reviewer no longer has a current role. Pending uncommitted human-delegated work must still recheck current initiator grants, while genuine late provider financial facts are ingested under their own service authority.

## Explicit corrected boundaries

Mandate setup is SM-SETUP. It is not SubmitPaymentAttempt. Manual customer collection requires finance.collect_customer_payment plus exact legitimate charge/issuer/amount/collection authority. Till uses pos.sell within supported tender/source rules. Self-service checkout is a source-bound service workflow with actual payer consent and fixed accepted price; it is not a buyer granting themselves finance administration. Recurring collection requires actual accepted collection authority/current policy, supported mandate/provider and unique source operation.

Dependent booking uses family.book and independently verified book rights. Dependent paying additionally uses family.pay_for_dependent and verified pay rights/actual payer consent. Neither makes an adult the attendee or authorises another guardian's instrument. Membership/PT/trial service grants issue only from their actual approved governing source and current eligibility; the shared grant record is not a direct set-active backdoor.

PT booking alone cannot open/resolve a service-management disruption or cancel a confirmed appointment. coaching.manage_service_disruption controls management impact/cover/material acceptance; coaching.cancel_appointment controls source cancellation and own/assigned/verified-dependent scope. A manager-led cancellation/remedy uses both as required, with financial refund execution independently controlled.

Tenant scope is independent of lifecycle. New operational commands require applicable active/readiness state; current authorised retained-history reads, closure/payment resolution/reconciliation/recovery and genuine provider evidence can operate in their explicit process even for suspended/archived context. No broad active_workspace check should hide retained contracts, receipts, debt or audit. These exceptions never reopen a gym, grant member entry or remove workspace/field isolation.

## Receiving implementation

Map this typed contract to actual API/query/service policy and provider adapters. Unknown selector/source actor/proof/required field denies with an owned safe next action. Test positive AND negative routes, role revocation during pending action, archive retained access, payer/guardian separation, source actor proof and actual concurrent unique effects. Document validators prove references/rule presence, not runtime authorisation or legally valid payment consent.
