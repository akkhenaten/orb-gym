# staff hr and rotas

Detailed extracted scope from baseline 0.17. Read with product-architecture.md and decisions-and-open-items.md. Each source reference is traceable; no requirement is removed by this grouping.

# Staff HR contracts and rotas

<!-- OG-SRC-0090 -->
Staff profiles include photo, contact/emergency details, employment assignments, qualifications, training, document history and restricted HR records. Contracts may be uploaded or prepared from controlled templates, reviewed, signed and amended through versioned records. Template content and legal review are separate delivery dependencies. Full HR scope includes payslips, secure messages, mandatory training, SOP/assignment acknowledgements, disciplinary cases, one-to-ones and development actions. Staff can see their own permitted documents; supervisors/managers receive explicitly delegated HR access. General staff-directory access never grants access to disciplinary or pay records. Payslips may be securely uploaded or imported; payroll calculation, tax submissions and payroll-provider integration are separate capabilities requiring definition. Training records track assignments, completion, certificates and expiry; SOPs retain versions and acknowledgement history. Disciplinary and one-to-one records use restricted participants, notes, attachments, follow-up dates and auditable outcomes.

<!-- OG-SRC-0091 -->
Full rota functionality covers recurring shifts, availability, leave, sickness, breaks, cover requests, shift swaps, management cover, cross-gym assignments, publishing and acknowledgement. Check overlaps, qualification requirements, travel between locations and configured staffing levels. Instructor allocations connect the staff rota to the class timetable.

<!-- OG-SRC-0092 -->
Clock-in/out records actual attendance separately from planned shifts. Managers correct missed punches with reasons and approve timesheets. Payroll-ready exports or integrations are a later integration decision.

<!-- OG-SRC-0093 -->
| Staff stage | Behaviour |
|---|---|
| Invited/onboarding | Account and documents prepared; assigned access remains controlled. |
| Active | Staff tools available for current roles and gym assignments. |
| Suspended | Specified access restricted with reason and review. |
| Left/archived | Access revoked, future work reassigned and records retained. |
| Rehired/reactivated | Deliberate review of assignments, qualifications and access. |
| Eligible deletion | Separate retention review and authorised removal/anonymisation. |

<!-- OG-SRC-0094 -->
Leaving staff must not remain assigned to future classes or opening shifts unnoticed. Reactivation does not automatically restore every historical permission. Sole workspace owners cannot be removed without ownership transfer or an authorised closure process.


