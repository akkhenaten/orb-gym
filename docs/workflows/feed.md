# Community, Queries, Feedback and Case Work

Repository 0.21. 5 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[07-community-cases-and-feedback.md](../modules/07-community-cases-and-feedback.md); [05-task-engine-facilities-contractors.md](../modules/05-task-engine-facilities-contractors.md)

[feed-feedback-cases](../../spec/feed-feedback-cases.md); [tasks-assets-contractors](../../spec/tasks-assets-contractors.md)

Planned cross-module acceptance: AC23, AC31, AC48, AC53. Decision references: GAP04, GAP09, GAP11, GAP13. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Dashboard Feed tab and same scoped global Feed; typed composer, media viewer, moderation queue and shared case card.

Draft/upload pending/published/corrected/moderated content; feedback/case assigned/in progress/awaiting response/resolved/reopened as specified.

Authorised poster/member → permitted audience/moderator → assigned query/service owner → response/decision/closure owner.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-FEED-01

**FEAT-FEED-01 — Post, media, links and audience**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised member/staff publishes community content |
| Preconditions | Selected company/gym/class/group audience and permitted media |
| Ordered journey / checkpoints | Compose post → choose audience/location if deliberate → attach → validate/upload → publish → edit/correct under policy |
| Source records / result / handoff | Same post identity drives permitted feed views; media opens in app |
| Exception / decision branch | Pending upload not falsely published; staff/internal/private documents never leak through reused feed |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC23, AC31, AC48, AC53 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-FEED-02

**FEAT-FEED-02 — Reactions, replies and mentions**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Permitted reader interacts with a post/case |
| Preconditions | Current record access and mentionable people |
| Ordered journey / checkpoints | React/comment/threaded reply → resolve @user ID → display accent link → notify → continue conversation |
| Source records / result / handoff | Reply/reaction/mention with explicit audience; access checked again on links |
| Exception / decision branch | Mention never adds a recipient to private scope; read delivery not approval; deleted/revoked targets handled safely |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC23, AC31, AC48, AC53 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-FEED-03

**FEAT-FEED-03 — Polls, events, saves and location**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised user creates supported interactive content |
| Preconditions | Scoped audience, deliberate place/device permission and defined event options |
| Ordered journey / checkpoints | Create/vote/RSVP/save → persist owned action → show permitted outcome → follow source event |
| Source records / result / handoff | Community interaction separate from booked class capacity; location has manual fallback |
| Exception / decision branch | Maps/provider details remain open; stories/live/calls/marketplace not silently included by Facebook-style wording |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC23, AC31, AC48, AC53 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-FEED-04

**FEAT-FEED-04 — Moderation, report and post-to-case**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | User reports issue; authorised moderator/manager triages |
| Preconditions | Original audience and source evidence retained |
| Ordered journey / checkpoints | Report → review/assign → restrict/correct/respond per authority → link case if needed → resolve/reopen |
| Source records / result / handoff | Moderation/case record and original link; role-specific notifications |
| Exception / decision branch | No broadening visibility when converting post; private complaint not automatically public review; retention/edit decisions explicit |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC23, AC31, AC48, AC53 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-FEED-05

**FEAT-FEED-05 — Member query and multi-format feedback**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Member submits question/rating/media or replies to service team |
| Preconditions | Own context, relevant class/gym/service and chosen permitted audience |
| Ordered journey / checkpoints | Create case/feedback → details/photos → assign owner → activity/decision/attachment tabs → action → resolution → review/reopen |
| Source records / result / handoff | Shared case engine with original evidence, typed decisions and feedback history |
| Exception / decision branch | Staff private notes never become member replies; casual comment cannot approve spend; published stars/review moderated distinctly |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC23, AC31, AC48, AC53 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.
