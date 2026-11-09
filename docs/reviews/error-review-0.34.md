# Fourth review — role-to-journey usability, 0.34

7November2026. Reviewed0.33 against intended actor journeys and starting role matrix. Findings concern proposed specification/defaults, not a claim these roles were issued or the app was deployed.

| ID | Severity | Finding | Correction |
|---|---|---|---|
| REV4-01 | High | Cleaner/vendor operative templates could submit evidence but not pass the required start-work transition because it used broad work.edit. | Narrow work.start_assigned and own-assigned starting grants; no generic edit/verification expansion. |
| REV4-02 | High | Limited member asset reporting was described but SubmitTask required internal work.create and no separate reporting permission/field schema existed. | work.report_fault route with actual permitted asset/gym scope, trusted queue/audience, input allowlist and own-report projection. |
| REV4-03 | Medium | Some limited-user templates lacked own profile/inbox/security preferences, and normal staff lacked prerequisite own SOP/contract self-service defaults. | Explicit source-scoped self-service baseline/matrix with current actual assignment, pre-activation prerequisite access and retained wider delegated rules; no broad HR/member privileges. |
| REV4-04 | Medium | Guardian/staff actor routes were corrected for acceptance but not offer decline/request withdrawal. | Consistent exact relationship routes and all-of cancellation/other-person rights; no payer-only or generic self fallback. |
| REV4-05 | Medium | Validators checked valid permission IDs but did not compare representative starting personas to their required action sequence. | Add role-journey assertions, preserved delegated-scope checks and focused field/response negative probes. |

Earlier review corrections remain. Transition count 233 and 149 WF/134 feature IDs are unchanged; two permission definitions added, current 232. The current self-service contract governs starting defaults but cannot override explicit individual denial or actual source/identity/field constraints.

Evidence: twelve documentation validators in standalone checkout and controlled mutations in fourth-review-validation.json. These do not test a live actor, API, private file, employment/onboarding form, QR asset page or provider. Actual implementation acceptance remains receiving OpenKBS work; no all-errors-eliminated claim.
