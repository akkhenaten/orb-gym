# Selectable UI, Branding and Responsive Experience

Repository 0.21. 4 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[08-design-branding-documents-pages.md](../modules/08-design-branding-documents-pages.md); [12-access-navigation-and-notifications.md](../modules/12-access-navigation-and-notifications.md)

[shell-settings-branding](../../spec/shell-settings-branding.md); [public-pages](../../spec/public-pages.md); [documents](../../spec/documents.md)

Planned cross-module acceptance: AC04, AC05, AC06, AC07, AC30, AC51, AC52. Decision references: GAP09, GAP10. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Company Style & Branding plus delegated gym override, all-role/device/mode previews, personal mode selector and publication/rollback history.

Theme/brand draft/preview/published/rolled back, white label disabled/enabled and personal mode independently stored.

Authorised company editor/designer → publisher → gym override owner where allowed → all consuming app/public/document/assistant surfaces.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-DESIGN-01

**FEAT-DESIGN-01 — Select complete style and company brand**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised company admin chooses one of six UI directions |
| Preconditions | Company Settings, approved logo/icon assets and override permissions |
| Ordered journey / checkpoints | Select preset → edit permitted colours/fonts/surfaces → preview role/device/mode → validate → save draft → deliberate publish |
| Source records / result / handoff | Complete versioned theme/brand; default Basic 01/Orb identity until white-label activation |
| Exception / decision branch | Style selection and white-label activation are distinct; sparse palette is not a complete preset; no token hard-coding per module |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC04, AC05, AC06, AC07, AC30, AC51, AC52 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-DESIGN-02

**FEAT-DESIGN-02 — Gym inheritance, overrides and brand rollback**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised company/gym editor changes local presentation |
| Preconditions | Published company config, allowed local fields and explicit white-label state |
| Ordered journey / checkpoints | Inherit → optionally override permitted gym values → preview/publish → reset/rollback/disable |
| Source records / result / handoff | App/portals/pages/new documents consume one source; issued history stays frozen; Orb uses approved company icon |
| Exception / decision branch | Logo upload alone not activation; a gym logo does not rename Orb or silently switch assistant company identity |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC04, AC05, AC06, AC07, AC30, AC51, AC52 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-DESIGN-03

**FEAT-DESIGN-03 — Personal mode and all-role responsive navigation**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | User changes light/dark/system or device layout |
| Preconditions | Personal preference independent of company brand, active record and draft |
| Ordered journey / checkpoints | Apply mode → resolve tokens → desktop left/iPad-tablet-mobile bottom → preserve context → access remaining modules through More |
| Source records / result / handoff | Every journey and preset has readable controls/focus and exact mandatory footer |
| Exception / decision branch | Tablet landscape still bottom; narrow desktop adapts content; themes cannot alter permissions or lose unsaved recoverable draft |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC04, AC05, AC06, AC07, AC30, AC51, AC52 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-DESIGN-04

**FEAT-DESIGN-04 — Theme component verification and publication**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised designer validates complete preset |
| Preconditions | Resolved token schema/component states and representative datasets/assets |
| Ordered journey / checkpoints | Preview forms/tables/calendar/feed/POS/cards/documents/pages → keyboard/touch/reflow/contrast checks → publish/rollback |
| Source records / result / handoff | Five full styles with light/dark; image concepts reference-only, actual master logo authoritative |
| Exception / decision branch | Unknown values stay proposed; blur needs opaque fallback; accessibility cannot be disabled by branding settings |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC04, AC05, AC06, AC07, AC30, AC51, AC52 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.
