# Ordered Delivery Card Index

Actual OpenKBS Board cards for project `87a09cc8b697` (Orb Gym), created 9 November 2026 from the compiled
sequence in `app/generated/cards.mjs` (human-readable form: [../board-index.md](../board-index.md)). 156 cards:
22 parent, 134 implementation; numbers 00–155 unique and contiguous; all created in **Backlog**. Card bodies
follow [card-template.md](card-template.md) and [../board-card-contract.md](../board-card-contract.md).

**Ordering limitation.** `docs/workflows/feature-register.json` has no `depends_on` field, so the order is
declared domain precedence (foundations first, parent before children), not a proven dependency sort. Parents are
rollups, not blockers for their children. Adding `depends_on` to the feature register would allow a real sort.

**Board sort.** The board lists cards newest-first, which is the exact reverse of the sequence (verified with
`openkbs board show`). The CLI has no reorder or relationship command, so this table is the explicit ordered
delivery queue and parent/child links are recorded in each card body.

**Decision blockers** refer to HANDOVER.md "Open owner decisions": 1 creation commands (every implementation
card), 2 identity provider, 3 live providers, 4 SM-DOCUMENT PARTIALLY_SIGNED, 5 ENT-AuditEvent relationship,
6 void permission. Workflow-level GAP references are listed in each card body.

No card is implemented, reviewed or deployed on the strength of this index.

| Sequence / board ID | Kind | Title | Parent | Prerequisites | Spec | Decision blocker | State/evidence |
|---|---|---|---|---|---|---|---|
| 00 / 9CaIdgh8 | parent | Foundations: repository validation and build integrity | — | — | docs/board-card-contract.md | — | Backlog; no evidence executed |
| 01 / SxpzldBC | parent | Identity, tenancy and access | — | 00 / 9CaIdgh8 | — | 2 | Backlog; no evidence executed |
| 02 / ccIiN80d | implementation | Privileged role policy and factor enrolment | 01 / SxpzldBC | — | docs/workflows/auth.md#wf-auth-01<br>spec/privileged-auth-recovery.md | 1, 2 | Backlog; no evidence executed |
| 03 / Ipv6Urq0 | implementation | Sign-in and sensitive-action step-up | 01 / SxpzldBC | — | docs/workflows/auth.md#wf-auth-02<br>spec/privileged-auth-recovery.md | 1, 2 | Backlog; no evidence executed |
| 04 / p9ndisMy | implementation | Lost factor and sole-owner recovery | 01 / SxpzldBC | — | docs/workflows/auth.md#wf-auth-03<br>spec/privileged-auth-recovery.md | 1, 2 | Backlog; no evidence executed |
| 05 / ugFNP1W2 | implementation | Role change, compromise and revocation | 01 / SxpzldBC | — | docs/workflows/auth.md#wf-auth-04<br>spec/privileged-auth-recovery.md | 1, 2 | Backlog; no evidence executed |
| 06 / UvrPBdG2 | parent | Data import and migration | — | 00 / 9CaIdgh8 | — | 3 | Backlog; no evidence executed |
| 07 / IzOHhw98 | implementation | Authorised source and mapping setup | 06 / UvrPBdG2 | — | docs/workflows/import.md#wf-import-01<br>spec/imports-reconciliation.md | 1, 3 | Backlog; no evidence executed |
| 08 / 2BdI3if3 | implementation | Staging, validation and duplicate matching | 06 / UvrPBdG2 | — | docs/workflows/import.md#wf-import-02<br>spec/imports-reconciliation.md | 1, 3 | Backlog; no evidence executed |
| 09 / SK8jdGH1 | implementation | Preview approval and controlled commit | 06 / UvrPBdG2 | — | docs/workflows/import.md#wf-import-03<br>spec/imports-reconciliation.md | 1, 3 | Backlog; no evidence executed |
| 10 / kDFcSntw | implementation | Post-import invitations, balances and activation | 06 / UvrPBdG2 | — | docs/workflows/import.md#wf-import-04<br>spec/imports-reconciliation.md | 1, 3 | Backlog; no evidence executed |
| 11 / W3bKzlhf | implementation | Import repair, compensation and audit | 06 / UvrPBdG2 | — | docs/workflows/import.md#wf-import-05<br>spec/imports-reconciliation.md | 1, 3 | Backlog; no evidence executed |
| 12 / dOfE7ptN | parent | Public site and landing | — | 00 / 9CaIdgh8 | — | — | Backlog; no evidence executed |
| 13 / LljIuPZv | implementation | Platform landing and owner signup | 12 / dOfE7ptN | — | docs/workflows/land.md#wf-land-01<br>spec/documents.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 14 / gGAEfxKG | implementation | New gym creates public-page draft | 12 / dOfE7ptN | — | docs/workflows/land.md#wf-land-02<br>spec/documents.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 15 / uIkzSUyo | implementation | Gym details, facilities and socials | 12 / dOfE7ptN | — | docs/workflows/land.md#wf-land-03<br>spec/documents.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 16 / UYdbwntX | implementation | Brand guidelines and AI-assisted extraction | 12 / dOfE7ptN | — | docs/workflows/land.md#wf-land-04<br>spec/documents.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 17 / oTLBLJWR | implementation | Page composition, section order and preview | 12 / dOfE7ptN | — | docs/workflows/land.md#wf-land-05<br>spec/documents.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 18 / 3a37hiQL | implementation | Public membership prices and deals | 12 / dOfE7ptN | — | docs/workflows/land.md#wf-land-06<br>spec/documents.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 19 / LRuC5o33 | implementation | Public timetable and class joining links | 12 / dOfE7ptN | — | docs/workflows/land.md#wf-land-07<br>spec/documents.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 20 / 3nIeYhBx | implementation | Staff and coach flip cards | 12 / dOfE7ptN | — | docs/workflows/land.md#wf-land-08<br>spec/documents.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 21 / TnV80Jv1 | implementation | Lead enquiry and member joining from site | 12 / dOfE7ptN | — | docs/workflows/land.md#wf-land-09<br>spec/documents.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 22 / CgRcKxnt | implementation | Publish rollback, rename and archive | 12 / dOfE7ptN | — | docs/workflows/land.md#wf-land-10<br>spec/classes-courses-attendance.md<br>spec/coaching-pt.md<br>spec/documents.md<br>spec/onboarding-membership.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 23 / hwy2fCdP | parent | Workspace and gym setup | — | 00 / 9CaIdgh8 | — | 2, 5 | Backlog; no evidence executed |
| 24 / DEghGysj | implementation | Owner self-service workspace creation | 23 / hwy2fCdP | — | docs/workflows/space.md#wf-space-01<br>spec/workspace-access.md | 1, 2, 5 | Backlog; no evidence executed |
| 25 / Cr3gfU1z | implementation | Add gym and portfolio configuration | 23 / hwy2fCdP | — | docs/workflows/space.md#wf-space-02<br>spec/workspace-access.md | 1, 2, 5 | Backlog; no evidence executed |
| 26 / ktvsjHpq | implementation | Platform service console and support | 23 / hwy2fCdP | — | docs/workflows/space.md#wf-space-03<br>spec/workspace-access.md | 1, 2, 5 | Backlog; no evidence executed |
| 27 / qVsPyWBo | implementation | Ownership transfer, suspension and workspace closure | 23 / hwy2fCdP | — | docs/workflows/space.md#wf-space-04<br>spec/classes-courses-attendance.md<br>spec/coaching-pt.md<br>spec/finance-reports.md<br>spec/onboarding-membership.md<br>spec/pos-stock.md<br>spec/public-pages.md<br>spec/staff-hr-rota.md<br>spec/tasks-assets-contractors.md<br>spec/workspace-access.md | 1, 2, 5 | Backlog; no evidence executed |
| 28 / vNTqlBRZ | parent | Design system, branding and publication | — | 00 / 9CaIdgh8 | — | — | Backlog; no evidence executed |
| 29 / TA3F2loD | implementation | Select complete style and company brand | 28 / vNTqlBRZ | — | docs/workflows/design.md#wf-design-01<br>spec/documents.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 30 / 8XahR8fu | implementation | Gym inheritance, overrides and brand rollback | 28 / vNTqlBRZ | — | docs/workflows/design.md#wf-design-02<br>spec/documents.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 31 / UOdQONSI | implementation | Personal mode and all-role responsive navigation | 28 / vNTqlBRZ | — | docs/workflows/design.md#wf-design-03<br>spec/documents.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 32 / gL77wU6h | implementation | Theme component verification and publication | 28 / vNTqlBRZ | — | docs/workflows/design.md#wf-design-04<br>spec/documents.md<br>spec/public-pages.md<br>spec/shell-settings-branding.md | 1 | Backlog; no evidence executed |
| 33 / 6sZULON5 | parent | Release, rollout and feature gating | — | 00 / 9CaIdgh8 | — | 5 | Backlog; no evidence executed |
| 34 / 1DTUcunh | implementation | Drafts, files and interruption recovery | 33 / 6sZULON5 | — | docs/workflows/release.md#wf-release-01<br>spec/recovery-release.md | 1, 5 | Backlog; no evidence executed |
| 35 / sqNGpjxw | implementation | Durable jobs, migrations and backup restore | 33 / 6sZULON5 | — | docs/workflows/release.md#wf-release-02<br>spec/recovery-release.md | 1, 5 | Backlog; no evidence executed |
| 36 / Y6pgNV1y | implementation | Retention, export and eligible deletion | 33 / 6sZULON5 | — | docs/workflows/release.md#wf-release-03<br>spec/recovery-release.md | 1, 5 | Backlog; no evidence executed |
| 37 / ot9JrJBB | implementation | Delivery planning and release verification | 33 / 6sZULON5 | — | docs/workflows/release.md#wf-release-04<br>spec/recovery-release.md | 1, 5 | Backlog; no evidence executed |
| 38 / mXnfzfeB | parent | Member and account self-service | — | 00 / 9CaIdgh8 | — | 2, 3 | Backlog; no evidence executed |
| 39 / 1aLkKXd2 | implementation | Create user in correct journey | 38 / mXnfzfeB | — | docs/workflows/user.md#wf-user-01<br>spec/onboarding-membership.md<br>spec/shell-settings-branding.md<br>spec/workspace-access.md | 1, 2, 3 | Backlog; no evidence executed |
| 40 / vb3hWbGP | implementation | Invitation, resend, expiry and revocation | 38 / mXnfzfeB | — | docs/workflows/user.md#wf-user-02<br>spec/onboarding-membership.md<br>spec/shell-settings-branding.md<br>spec/workspace-access.md | 1, 2, 3 | Backlog; no evidence executed |
| 41 / cQmVoCFh | implementation | First login and temporary credential replacement | 38 / mXnfzfeB | — | docs/workflows/user.md#wf-user-03<br>spec/onboarding-membership.md<br>spec/shell-settings-branding.md<br>spec/workspace-access.md | 1, 2, 3 | Backlog; no evidence executed |
| 42 / bwb4qGFV | implementation | Sign-in, sign-out and recovery | 38 / mXnfzfeB | — | docs/workflows/user.md#wf-user-04<br>spec/onboarding-membership.md<br>spec/shell-settings-branding.md<br>spec/workspace-access.md | 1, 2, 3 | Backlog; no evidence executed |
| 43 / 3OOY5u2i | implementation | Profile, avatar and contact management | 38 / mXnfzfeB | — | docs/workflows/user.md#wf-user-05<br>spec/documents.md<br>spec/onboarding-membership.md<br>spec/shell-settings-branding.md<br>spec/staff-hr-rota.md<br>spec/workspace-access.md | 1, 2, 3 | Backlog; no evidence executed |
| 44 / 74aZFehO | implementation | Notification and appearance preferences | 38 / mXnfzfeB | — | docs/workflows/user.md#wf-user-06<br>spec/onboarding-membership.md<br>spec/shell-settings-branding.md<br>spec/workspace-access.md | 1, 2, 3 | Backlog; no evidence executed |
| 45 / Ia9Snum9 | implementation | Gym assignments and role delegation | 38 / mXnfzfeB | — | docs/workflows/user.md#wf-user-07<br>spec/onboarding-membership.md<br>spec/shell-settings-branding.md<br>spec/workspace-access.md | 1, 2, 3 | Backlog; no evidence executed |
| 46 / w5aGOA9s | implementation | Account restrict, archive, reactivate and eligible delete | 38 / mXnfzfeB | — | docs/workflows/user.md#wf-user-08<br>spec/onboarding-membership.md<br>spec/shell-settings-branding.md<br>spec/workspace-access.md | 1, 2, 3 | Backlog; no evidence executed |
| 47 / rqrKxYMt | implementation | Explicit workspace and gym switching | 38 / mXnfzfeB | — | docs/workflows/user.md#wf-user-09<br>spec/onboarding-membership.md<br>spec/shell-settings-branding.md<br>spec/workspace-access.md | 1, 2, 3 | Backlog; no evidence executed |
| 48 / PyrDYJv1 | implementation | User search, exports and privileged support | 38 / mXnfzfeB | — | docs/workflows/user.md#wf-user-10<br>spec/onboarding-membership.md<br>spec/shell-settings-branding.md<br>spec/workspace-access.md | 1, 2, 3 | Backlog; no evidence executed |
| 49 / dg2w2s19 | parent | Membership and billing | — | 00 / 9CaIdgh8 | — | 3 | Backlog; no evidence executed |
| 50 / d9MVPHVz | implementation | Joining routes and sales pipeline | 49 / dg2w2s19 | — | docs/workflows/mem.md#wf-mem-01<br>spec/onboarding-membership.md | 1, 3 | Backlog; no evidence executed |
| 51 / IePb1Tgo | implementation | PAR-Q, emergency contacts and agreements | 49 / dg2w2s19 | — | docs/workflows/mem.md#wf-mem-02<br>spec/coaching-pt.md<br>spec/documents.md<br>spec/onboarding-membership.md<br>spec/reception-entry-exit.md | 1, 3 | Backlog; no evidence executed |
| 52 / HXcYZRrv | implementation | Plans, prices and single/all-gym entitlement | 49 / dg2w2s19 | — | docs/workflows/mem.md#wf-mem-03<br>spec/onboarding-membership.md | 1, 3 | Backlog; no evidence executed |
| 53 / gqkehuhN | implementation | Payment setup, review and activation | 49 / dg2w2s19 | — | docs/workflows/mem.md#wf-mem-04<br>spec/classes-courses-attendance.md<br>spec/coaching-pt.md<br>spec/finance-reports.md<br>spec/onboarding-membership.md<br>spec/reception-entry-exit.md | 1, 3 | Backlog; no evidence executed |
| 54 / G0eyPBmI | implementation | Renewal, freeze, cancellation and reinstatement | 49 / dg2w2s19 | — | docs/workflows/mem.md#wf-mem-05<br>spec/onboarding-membership.md | 1, 3 | Backlog; no evidence executed |
| 55 / KpsPXh6p | implementation | Member records, receipts and self-service | 49 / dg2w2s19 | — | docs/workflows/mem.md#wf-mem-06<br>spec/onboarding-membership.md | 1, 3 | Backlog; no evidence executed |
| 56 / 2uxQGG7i | implementation | Retention indicators and reviewed outreach | 49 / dg2w2s19 | — | docs/workflows/mem.md#wf-mem-07<br>spec/onboarding-membership.md | 1, 3 | Backlog; no evidence executed |
| 57 / fNnxYdYf | parent | Junior and guardian journeys | — | 00 / 9CaIdgh8 | — | 3 | Backlog; no evidence executed |
| 58 / PHISRmMz | implementation | Junior programme setup | 57 / fNnxYdYf | — | docs/workflows/junior.md#wf-junior-01<br>spec/juniors-guardians.md | 1, 3 | Backlog; no evidence executed |
| 59 / rbSHFSCz | implementation | Guardian invitation and authority review | 57 / fNnxYdYf | — | docs/workflows/junior.md#wf-junior-02<br>spec/juniors-guardians.md | 1, 3 | Backlog; no evidence executed |
| 60 / XzskFDLl | implementation | Junior membership, forms and billing | 57 / fNnxYdYf | — | docs/workflows/junior.md#wf-junior-03<br>spec/juniors-guardians.md | 1, 3 | Backlog; no evidence executed |
| 61 / Qp8NtNsd | implementation | Dependent booking, pass and attendance | 57 / fNnxYdYf | — | docs/workflows/junior.md#wf-junior-04<br>spec/juniors-guardians.md | 1, 3 | Backlog; no evidence executed |
| 62 / TwswZzUa | implementation | Junior privacy, communications and safeguarding | 57 / fNnxYdYf | — | docs/workflows/junior.md#wf-junior-05<br>spec/juniors-guardians.md | 1, 3 | Backlog; no evidence executed |
| 63 / GTw0AmVK | implementation | Age-band or guardian relationship transition | 57 / fNnxYdYf | — | docs/workflows/junior.md#wf-junior-06<br>spec/juniors-guardians.md | 1, 3 | Backlog; no evidence executed |
| 64 / 3qIIItgD | parent | Classes, courses and sessions | — | 00 / 9CaIdgh8 | — | — | Backlog; no evidence executed |
| 65 / Z7Uynzl3 | implementation | Class definition and publication | 64 / 3qIIItgD | — | docs/workflows/class.md#wf-class-01<br>spec/classes-courses-attendance.md<br>spec/feed-feedback-cases.md | 1 | Backlog; no evidence executed |
| 66 / YnDCl3Rb | implementation | Single and last-minute booking | 64 / 3qIIItgD | — | docs/workflows/class.md#wf-class-02<br>spec/classes-courses-attendance.md<br>spec/feed-feedback-cases.md<br>spec/onboarding-membership.md | 1 | Backlog; no evidence executed |
| 67 / p3GFNP2v | implementation | Regular block or course enrolment | 64 / 3qIIItgD | — | docs/workflows/class.md#wf-class-03<br>spec/classes-courses-attendance.md<br>spec/feed-feedback-cases.md | 1 | Backlog; no evidence executed |
| 68 / xygBSTk9 | implementation | Waitlist and offered place | 64 / 3qIIItgD | — | docs/workflows/class.md#wf-class-04<br>spec/classes-courses-attendance.md<br>spec/feed-feedback-cases.md | 1 | Backlog; no evidence executed |
| 69 / djjLpOdc | implementation | Cancel, reschedule and no-show rules | 64 / 3qIIItgD | — | docs/workflows/class.md#wf-class-05<br>spec/classes-courses-attendance.md<br>spec/coaching-pt.md<br>spec/feed-feedback-cases.md<br>spec/finance-reports.md<br>spec/staff-hr-rota.md<br>spec/tasks-assets-contractors.md | 1 | Backlog; no evidence executed |
| 70 / TXsNaUTh | implementation | Class register and feedback | 64 / 3qIIItgD | — | docs/workflows/class.md#wf-class-06<br>spec/classes-courses-attendance.md<br>spec/feed-feedback-cases.md | 1 | Backlog; no evidence executed |
| 71 / UEQe7FQL | parent | Coaching and PT | — | 00 / 9CaIdgh8 | — | 3 | Backlog; no evidence executed |
| 72 / YzGW7Q6x | implementation | Coach arrangement setup and credential review | 71 / UEQe7FQL | — | docs/workflows/coach.md#wf-coach-01<br>spec/coaching-pt.md<br>spec/finance-reports.md<br>spec/staff-hr-rota.md | 1, 3 | Backlog; no evidence executed |
| 73 / HvoF7meC | implementation | Rental coach rent and resources | 71 / UEQe7FQL | — | docs/workflows/coach.md#wf-coach-02<br>spec/classes-courses-attendance.md<br>spec/coaching-pt.md<br>spec/finance-reports.md<br>spec/staff-hr-rota.md | 1, 3 | Backlog; no evidence executed |
| 74 / LoZ9PKJ8 | implementation | Employed coach default/override PT rates | 71 / UEQe7FQL | — | docs/workflows/coach.md#wf-coach-03<br>spec/coaching-pt.md<br>spec/finance-reports.md<br>spec/staff-hr-rota.md | 1, 3 | Backlog; no evidence executed |
| 75 / MaISSPU7 | implementation | PT appointment, delivery and earnings allocation | 71 / UEQe7FQL | — | docs/workflows/coach.md#wf-coach-04<br>spec/coaching-pt.md<br>spec/finance-reports.md<br>spec/staff-hr-rota.md | 1, 3 | Backlog; no evidence executed |
| 76 / 5alFOZn8 | implementation | Coach invite and PT-only pass | 71 / UEQe7FQL | — | docs/workflows/coach.md#wf-coach-05<br>spec/coaching-pt.md<br>spec/finance-reports.md<br>spec/staff-hr-rota.md | 1, 3 | Backlog; no evidence executed |
| 77 / jxX7eQNy | implementation | PT-only membership upgrade and coach change | 71 / UEQe7FQL | — | docs/workflows/coach.md#wf-coach-06<br>spec/coaching-pt.md<br>spec/finance-reports.md<br>spec/staff-hr-rota.md | 1, 3 | Backlog; no evidence executed |
| 78 / k1vS2pPY | parent | Trials and onboarding offers | — | 00 / 9CaIdgh8 | — | 3 | Backlog; no evidence executed |
| 79 / e3AYB4m9 | implementation | Trial offer setup and publication | 78 / k1vS2pPY | — | docs/workflows/trial.md#wf-trial-01<br>spec/trials-guests.md | 1, 3 | Backlog; no evidence executed |
| 80 / O1Zx4YRD | implementation | Guest application, review and pass issue | 78 / k1vS2pPY | — | docs/workflows/trial.md#wf-trial-02<br>spec/trials-guests.md | 1, 3 | Backlog; no evidence executed |
| 81 / 6APy79Qu | implementation | Trial entry and activity attendance | 78 / k1vS2pPY | — | docs/workflows/trial.md#wf-trial-03<br>spec/trials-guests.md | 1, 3 | Backlog; no evidence executed |
| 82 / ReF3p0Hv | implementation | Guest expiry, cancellation and membership upgrade | 78 / k1vS2pPY | — | docs/workflows/trial.md#wf-trial-04<br>spec/trials-guests.md | 1, 3 | Backlog; no evidence executed |
| 83 / WbvtnKqL | parent | Entry, check-in and attendance | — | 00 / 9CaIdgh8 | — | — | Backlog; no evidence executed |
| 84 / lrosx1IT | implementation | Scan or member lookup and ID card | 83 / WbvtnKqL | — | docs/workflows/entry.md#wf-entry-01<br>spec/classes-courses-attendance.md<br>spec/onboarding-membership.md<br>spec/reception-entry-exit.md | 1 | Backlog; no evidence executed |
| 85 / DyabGV0i | implementation | Explicit entry and recorded gym visit | 83 / WbvtnKqL | — | docs/workflows/entry.md#wf-entry-02<br>spec/classes-courses-attendance.md<br>spec/onboarding-membership.md<br>spec/reception-entry-exit.md | 1 | Backlog; no evidence executed |
| 86 / PxD1Wv8p | implementation | Exit, forgotten checkout and correction | 83 / WbvtnKqL | — | docs/workflows/entry.md#wf-entry-03<br>spec/classes-courses-attendance.md<br>spec/onboarding-membership.md<br>spec/reception-entry-exit.md | 1 | Backlog; no evidence executed |
| 87 / lf5O6To7 | implementation | Class/PT attendance at reception boundary | 83 / WbvtnKqL | — | docs/workflows/entry.md#wf-entry-04<br>spec/classes-courses-attendance.md<br>spec/onboarding-membership.md<br>spec/reception-entry-exit.md | 1 | Backlog; no evidence executed |
| 88 / hpvylZ4l | parent | Tasks, assets and contractors | — | 00 / 9CaIdgh8 | — | 3 | Backlog; no evidence executed |
| 89 / 1YjSd1qC | implementation | Common task creation and triage | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-01<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 90 / 1HfdGUIj | implementation | Cleaning job-sheet template | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-02<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 91 / WqfHyCNZ | implementation | Cleaning execution and proof | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-03<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 92 / KWQhPG8X | implementation | Cleaning verification and remedial follow-up | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-04<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 93 / Pc6Y1ZPF | implementation | Maintenance fault and asset scan | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-05<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 94 / hV00dB0X | implementation | Contractor assignment and visits | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-06<br>spec/tasks-assets-contractors.md<br>spec/workspace-access.md | 1, 3 | Backlog; no evidence executed |
| 95 / 6Sn48EYV | implementation | Quote and variation approval | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-07<br>spec/staff-hr-rota.md<br>spec/tasks-assets-contractors.md<br>spec/workspace-access.md | 1, 3 | Backlog; no evidence executed |
| 96 / eEGvrpsY | implementation | Work completion and asset restoration | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-08<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 97 / ZPgXtY2B | implementation | Administrative task journey | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-09<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 98 / 5LThWeQI | implementation | Parent and child task management | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-10<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 99 / j7pvn2Om | implementation | Grouping and joined job sheets | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-11<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 100 / U5wdS2H3 | implementation | Dependencies and blocked work | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-12<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 101 / gXEjh67R | implementation | Recurring schedule changes and overdue work | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-13<br>spec/calendar-notifications.md<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 102 / JdICBdqA | implementation | Card feed, attachments and structured tabs | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-14<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 103 / Va94thG3 | implementation | Invoice, cost allocation and payment | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-15<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 104 / ZvCcroYp | implementation | Reopen, cancel and retain task history | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-16<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 105 / nPaNBmmS | implementation | Member equipment announcement | 88 / hpvylZ4l | — | docs/workflows/task.md#wf-task-17<br>spec/tasks-assets-contractors.md | 1, 3 | Backlog; no evidence executed |
| 106 / hsXCCKpn | parent | Staff, HR and rota | — | 00 / 9CaIdgh8 | — | 3, 4 | Backlog; no evidence executed |
| 107 / Jf3NFeqf | implementation | Staff creation and invitation | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-01<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 108 / ztMlWOe3 | implementation | Staff profile and restricted records | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-02<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 109 / ha2a6vSj | implementation | Contract composition and signing | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-03<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 110 / e1vENF5Y | implementation | Training and qualifications | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-04<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 111 / Apdp0nlh | implementation | SOP and instruction acknowledgement | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-05<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 112 / C72W8q5V | implementation | Payslip delivery and payroll handoff | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-06<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 113 / IJZ7T3Es | implementation | Staff secure messages | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-07<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 114 / S9xAHjqu | implementation | Disciplinary record and follow-up | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-08<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 115 / aKhcKcmF | implementation | One-to-one and development actions | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-09<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 116 / AVK8NMa5 | implementation | Availability, leave and sickness | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-10<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 117 / ed1OTtEW | implementation | Draft and publish rota | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-11<br>spec/calendar-notifications.md<br>spec/classes-courses-attendance.md<br>spec/coaching-pt.md<br>spec/staff-hr-rota.md<br>spec/tasks-assets-contractors.md | 1, 3, 4 | Backlog; no evidence executed |
| 118 / 2tqyt3QM | implementation | Shift swaps and cover requests | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-12<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 119 / Zdknzwax | implementation | Clocking, corrections and timesheets | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-13<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 120 / v2r8g0tn | implementation | Published team and current duty | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-14<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 121 / AsIR5HVx | implementation | Staff suspension, leaving, archive and return | 106 / hsXCCKpn | — | docs/workflows/staff.md#wf-staff-15<br>spec/calendar-notifications.md<br>spec/staff-hr-rota.md | 1, 3, 4 | Backlog; no evidence executed |
| 122 / eZ1RJwY9 | parent | Calendar and resource booking | — | 00 / 9CaIdgh8 | — | 3 | Backlog; no evidence executed |
| 123 / 0AoI2wee | implementation | Dashboard and cross-gym calendar drilldown | 122 / eZ1RJwY9 | — | docs/workflows/cal.md#wf-cal-01<br>spec/calendar-notifications.md<br>spec/shell-settings-branding.md | 1, 3 | Backlog; no evidence executed |
| 124 / OWNTcdSq | implementation | Edit scheduled item and recurrence | 122 / eZ1RJwY9 | — | docs/workflows/cal.md#wf-cal-02<br>spec/calendar-notifications.md<br>spec/shell-settings-branding.md | 1, 3 | Backlog; no evidence executed |
| 125 / lOkpBGao | implementation | Notification routing and acknowledgement | 122 / eZ1RJwY9 | — | docs/workflows/cal.md#wf-cal-03<br>spec/calendar-notifications.md<br>spec/shell-settings-branding.md | 1, 3 | Backlog; no evidence executed |
| 126 / z75s2ntl | implementation | Failed delivery and personal channel changes | 122 / eZ1RJwY9 | — | docs/workflows/cal.md#wf-cal-04<br>spec/calendar-notifications.md<br>spec/shell-settings-branding.md | 1, 3 | Backlog; no evidence executed |
| 127 / 4V7qAAYk | parent | Point of sale and retail | — | 00 / 9CaIdgh8 | — | 3, 6 | Backlog; no evidence executed |
| 128 / HMzT7Hrs | implementation | Product catalogue and barcode setup | 127 / 4V7qAAYk | — | docs/workflows/pos.md#wf-pos-01<br>spec/finance-reports.md<br>spec/pos-stock.md | 1, 3, 6 | Backlog; no evidence executed |
| 129 / 8mGFRvnZ | implementation | Receive live stock and adjustments | 127 / 4V7qAAYk | — | docs/workflows/pos.md#wf-pos-02<br>spec/finance-reports.md<br>spec/pos-stock.md | 1, 3, 6 | Backlog; no evidence executed |
| 130 / 1FruiMAT | implementation | Basket and confirmed tender sale | 127 / 4V7qAAYk | — | docs/workflows/pos.md#wf-pos-03<br>spec/finance-reports.md<br>spec/pos-stock.md | 1, 3, 6 | Backlog; no evidence executed |
| 131 / FobTLcI8 | implementation | One-off description sale | 127 / 4V7qAAYk | — | docs/workflows/pos.md#wf-pos-04<br>spec/finance-reports.md<br>spec/pos-stock.md | 1, 3, 6 | Backlog; no evidence executed |
| 132 / qIqzEyJC | implementation | Print, share and member-app receipt | 127 / 4V7qAAYk | — | docs/workflows/pos.md#wf-pos-05<br>spec/finance-reports.md<br>spec/pos-stock.md | 1, 3, 6 | Backlog; no evidence executed |
| 133 / SIMxrbie | implementation | Refund, void and return to stock | 127 / 4V7qAAYk | — | docs/workflows/pos.md#wf-pos-06<br>spec/finance-reports.md<br>spec/pos-stock.md | 1, 3, 6 | Backlog; no evidence executed |
| 134 / xuQuOVjX | implementation | Stock transfer, count and low-stock review | 127 / 4V7qAAYk | — | docs/workflows/pos.md#wf-pos-07<br>spec/finance-reports.md<br>spec/pos-stock.md | 1, 3, 6 | Backlog; no evidence executed |
| 135 / QoWUGEvV | implementation | Till shift and financial reconciliation | 127 / 4V7qAAYk | — | docs/workflows/pos.md#wf-pos-08<br>spec/finance-reports.md<br>spec/pos-stock.md | 1, 3, 6 | Backlog; no evidence executed |
| 136 / 280stznB | parent | Finance, reporting and reconciliation | — | 00 / 9CaIdgh8 | — | 3, 6 | Backlog; no evidence executed |
| 137 / d5kohi7b | implementation | Financial source reconciliation | 136 / 280stznB | — | docs/workflows/fin.md#wf-fin-01<br>spec/coaching-pt.md<br>spec/finance-reports.md<br>spec/onboarding-membership.md<br>spec/pos-stock.md<br>spec/tasks-assets-contractors.md | 1, 3, 6 | Backlog; no evidence executed |
| 138 / 7xMyvhO6 | implementation | Portfolio and gym financial oversight | 136 / 280stznB | — | docs/workflows/fin.md#wf-fin-02<br>spec/finance-reports.md | 1, 3, 6 | Backlog; no evidence executed |
| 139 / kyHEvpVm | implementation | Operational report and analytic review | 136 / 280stznB | — | docs/workflows/fin.md#wf-fin-03<br>spec/finance-reports.md | 1, 3, 6 | Backlog; no evidence executed |
| 140 / 171Gt8Np | implementation | Export, AI report and optional scheduled delivery | 136 / 280stznB | — | docs/workflows/fin.md#wf-fin-04<br>spec/finance-reports.md | 1, 3, 6 | Backlog; no evidence executed |
| 141 / zph3J6tb | parent | Documents, signing and evidence | — | 00 / 9CaIdgh8 | — | 3, 4 | Backlog; no evidence executed |
| 142 / Mms0X72q | implementation | Template composition and controlled variables | 141 / zph3J6tb | — | docs/workflows/doc.md#wf-doc-01<br>spec/documents.md<br>spec/shell-settings-branding.md | 1, 3, 4 | Backlog; no evidence executed |
| 143 / HVw8udBu | implementation | Generate and issue source-owned document | 141 / zph3J6tb | — | docs/workflows/doc.md#wf-doc-02<br>spec/documents.md<br>spec/shell-settings-branding.md | 1, 3, 4 | Backlog; no evidence executed |
| 144 / Bqtajacg | implementation | Signature, acknowledgement and revision | 141 / zph3J6tb | — | docs/workflows/doc.md#wf-doc-03<br>spec/documents.md<br>spec/shell-settings-branding.md | 1, 3, 4 | Backlog; no evidence executed |
| 145 / Q3PgxDYx | implementation | Document access, archive and regeneration | 141 / zph3J6tb | — | docs/workflows/doc.md#wf-doc-04<br>spec/documents.md<br>spec/shell-settings-branding.md | 1, 3, 4 | Backlog; no evidence executed |
| 146 / tfVxozym | parent | Community feed and cases | — | 00 / 9CaIdgh8 | — | — | Backlog; no evidence executed |
| 147 / IFSw6rHb | implementation | Post, media, links and audience | 146 / tfVxozym | — | docs/workflows/feed.md#wf-feed-01<br>spec/feed-feedback-cases.md<br>spec/tasks-assets-contractors.md | 1 | Backlog; no evidence executed |
| 148 / BhbGqw5c | implementation | Reactions, replies and mentions | 146 / tfVxozym | — | docs/workflows/feed.md#wf-feed-02<br>spec/feed-feedback-cases.md<br>spec/tasks-assets-contractors.md | 1 | Backlog; no evidence executed |
| 149 / 8xc90NSw | implementation | Polls, events, saves and location | 146 / tfVxozym | — | docs/workflows/feed.md#wf-feed-03<br>spec/feed-feedback-cases.md<br>spec/tasks-assets-contractors.md | 1 | Backlog; no evidence executed |
| 150 / dcmc18NT | implementation | Moderation, report and post-to-case | 146 / tfVxozym | — | docs/workflows/feed.md#wf-feed-04<br>spec/feed-feedback-cases.md<br>spec/tasks-assets-contractors.md | 1 | Backlog; no evidence executed |
| 151 / 84yRgWVX | implementation | Member query and multi-format feedback | 146 / tfVxozym | — | docs/workflows/feed.md#wf-feed-05<br>spec/feed-feedback-cases.md<br>spec/tasks-assets-contractors.md | 1 | Backlog; no evidence executed |
| 152 / BlfvmTOw | parent | Assisted features | — | 00 / 9CaIdgh8 | — | — | Backlog; no evidence executed |
| 153 / zexVorHG | implementation | Sourced owner analysis and reporting | 152 / BlfvmTOw | — | docs/workflows/ai.md#wf-ai-01<br>spec/ai-operations.md<br>spec/finance-reports.md | 1 | Backlog; no evidence executed |
| 154 / CDGm4vZ5 | implementation | Authorised execution and approval handoff | 152 / BlfvmTOw | — | docs/workflows/ai.md#wf-ai-02<br>spec/ai-operations.md<br>spec/finance-reports.md | 1 | Backlog; no evidence executed |
| 155 / lNoCH6kj | implementation | Background image/retention/operations suggestions | 152 / BlfvmTOw | — | docs/workflows/ai.md#wf-ai-03<br>spec/ai-operations.md<br>spec/finance-reports.md | 1 | Backlog; no evidence executed |
