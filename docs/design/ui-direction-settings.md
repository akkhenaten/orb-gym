# Owner-selectable UI direction — 0.35

Source UI-REQ-035: founder's supplied Neumorphic, Glassmorphism and Flat descriptions, 9 November 2026. This is an explicit extension of the existing selectable styles. Flat Studio 02 and Soft Glass 04 keep their stable IDs; Neumorphic 06 is new. The five selectable options, plus deferred Neumorphic06, are enumerated in [style-options.json](style-options.json), with values in [theme-tokens.json](theme-tokens.json) and behaviour in [appearance-settings-contract.json](appearance-settings-contract.json). Original source extracts and five existing comparison images remain historical evidence, not an option limit. No additional style artwork, production frontend or interactive preview was created by this specification change.

## Location, authority and owner journey

Company Settings → Style & Branding → **UI direction** lives on existing SCR-075/CMP-BRAND. Show five single-select cards (Neumorphic06 hidden while deferred), each with name, short explanation and the same miniature dashboard/form sample. Basic Bento 01 remains the default. Style selection is available independently of white-label activation; choosing a style must not activate a logo, publish a landing page or change payment settings. Changing a company style affects its users' shared app direction; it is not a personal profile theme.

1. Owner opens Settings in the current company, sees the published style/version and inherited gym exceptions. Delegated users see only controls allowed by their exact branding permissions. Render a denied state for unauthorised direct routes; enforce permission again at save/publication.
2. Select a direction, then adjust permitted brand colours, approved font choices, surfaces and intensity through validated tokens. Show an unsaved draft marker and affected scope. Switching presets preserves separate logo/legal details and existing valid colour overrides. Revalidate overrides and identify incompatible values; never silently apply an invalid combination or discard the draft.
3. Preview without altering other users: owner dashboard, member home, task card, staff schedule, classes, reception ID/check-in, POS, finance, vendor job, landing and a print-safe document. Use synthetic or actual authorised data; sample roles never grant access to private records. Include light/dark and desktop/tablet/mobile sizes. Gym-specific previews show effective inheritance. The preview is a builder deliverable, not an existing rendered artifact.
4. Save draft or Discard preview. **Publish appearance** validates the complete snapshot and checks expected published version. On success announce the effective version/scope; other sessions adopt it coherently without losing selections, scroll position, forms, booking/payment operations or task evidence. A stale draft requires compare/rebase, never last-write-wins. A failed save retains the working draft; a failed publication retains the last valid published appearance.
5. **Reset to inherited style** in Gym Settings removes that override. Company reset previews Basic 01 before publishing. **Restore previous appearance** publishes a new version referencing a prior valid complete snapshot; audit actor/scope/time/changed fields and version. These actions never roll back bookings, payments, rota or business data.

Company owner manages its whole workspace. Permitted gym-specific overrides follow the existing company policy and branding.edit_gym/publication rights; settings identify inherited versus overridden values and affected gyms. Platform admins act in an explicit audited company context. A company change cannot restyle the platform console, Orb's platform marketing page, another company or another company's emails. Existing individual denies and source guards remain effective.

## Six distinct options

| Option | Complete direction |
|---|---|
| Basic / Bento 01 | Existing cobalt Orb default, modular overview cards, 22px corners and restrained shadows; operational registers remain readable tables. |
| Flat Studio 02 | Solid planes, strong typography and alignment, squared/lightly rounded controls, no decorative elevation, gradients or blur. |
| Minimal Editorial 03 | Warm neutral canvas, serif display headings, generous separation, sans-serif controls and calm card-free lists. |
| Soft Glass / Glassmorphism 04 | Layered frosted navigation, dashboard summary surfaces and noncritical overlays with controlled colourful blurred background forms; operational form/data planes stay solid. |
| Performance Console 05 | Precise dense schedules and ledgers, labelled operational navigation, compact desktop grids and comfortable touch layouts. |
| Neumorphic 06 | Tonal canvas and surfaces, paired light/dark soft shadows, raised panels/controls and inset fields; explicit boundaries and state labels remain visible. |

All five selectable options change coherent semantic/component tokens, typography, spacing, corners, elevation, surfaces and feedback. They retain the same module availability, route structure, RBAC, operations, data and source truth. Desktop left navigation and tablet/iPad/mobile bottom navigation, including landscape, remain the agreed shell. Reflow never moves necessary actions out of reach.

## Neumorphic 06 rules

- **Buttons:** secondary/neutral controls use paired raised highlights/shadows. Pressing changes to inset depth with at most 1px translation; keyboard activation has equivalent feedback. Primary financial/submit actions retain clear solid brand fill and readable action text. Loading, selected, disabled and dangerous actions use explicit labels/icons/colour/borders as appropriate; shadows alone never identify state. Error/success is confirmed only from actual operation outcome.
- **Display cards:** same-family tonal fill on the canvas, 20px corner baseline and soft opposing shadows. Use depth sparingly to separate summary groups; do not nest many raised cards inside each other or replace tables/ledgers with decorative tiles. List row and section boundaries remain clear when shadows disappear.
- **Inputs:** subtly inset field surface with persistent visible 1px boundary, external label, placeholder separate from entered value, helper/error text and visible focus outline. Focus is a distinct 2px ring with 2px offset, not an intensified shadow. Selected checkboxes/radios/switches also have their real checked state and icon/label. Preserve password visibility, validation and input semantics.
- **Raised icons:** restrained decorative highlight on coherent existing vector icons; icon-only actions retain labels/tooltips and visible focus. Do not emboss private-status badges into illegibility. Approved original company and Orb artwork are not redrawn, recoloured or distorted to simulate depth.
- **Progress/sliders/toggles:** pill-shaped recessed tracks and raised thumbs may express touchability, with explicit progress values, minimum/maximum/current labels as relevant, selected position and keyboard/touch support. Never represent an unknown payment/upload outcome as completed. Status indication and slider position survive removal of shadows.
- **Light/dark:** use mode-specific canvas, shadow and highlight values; dark is not inversion. Noninteractive panels must not acquire button hover/pressed treatment. Reduced effects/forced colours use solid boundaries and ordinary focus with all decoration removed.

## Glassmorphism 04 rules

- **Backgrounds:** soft static radial colour/bokeh forms behind the outer shell, landing hero or empty decorative zones. Brand-derived colours are validated in both modes. No photos or personal uploads used as background without approval; no automatic external image dependency. Decorative gradients do not carry meaning and are not continuously animated.
- **Foreground frost and gloss:** tokenised translucent fill, restrained border/highlight, 16px blur baseline and limited shadow establish the layered glass treatment. Use explicit solid fallback for unsupported blur, reduced transparency/effects, forced colours, printing and low-performance contexts. Do not rely on blur to conceal private information.
- **Cards/panels:** dashboard summaries may use frosted outer shells with solid readable text/data planes. Forms, tables, finance, payment fields, medical/HR text and operational evidence use opaque surfaces. Check contrast against the actual composed image/gradient and worst permitted backdrop, not just the base hex colour.
- **Controls:** selected primary actions retain solid brand fill; glass treatment may appear on neutral button shells with visible outline, hover and pressed state. No transparent hit area whose boundary disappears into the background; input fields stay solid.
- **Modals/dialogues:** optional frosted decorative frame/backdrop with opaque content area. Maintain scrim, focus containment, labelled title, proper close/dirty-state handling and focus return. Sensitive underlying content must not leak through the frame; permission-restricted records never render behind it.
- **Icons/logos:** subtle gloss may be applied to decorative icon containers, not to original logo artwork or status meaning. Logo uses its approved background/variant with readable spacing and no unapproved glass derivative.

## Flat Studio 02 rules

- Simple direct hierarchy, ample section whitespace, clear sans-serif type, readable weights and tabular numbers. Existing Arial/system fallback is retained; optional font choices require approved availability/licensing. The founder's examples do not mean new Lato/Aller/Museo fonts are bundled or licensed.
- Bold validated brand accents for primary actions and active navigation; semantic danger/warning/success stay distinct and labelled. Backgrounds and content planes are solid; no decorative gradients, translucency, embossing, blur or shadows. Fields/buttons use clear outlines and 0–4px corners.
- Simple geometric line icons from the existing family; minimal optional illustrations are decorative, approved assets, not needed for any task. Selected/hover/pressed/disabled/focus states use changes in fill/border/text, not depth.
- Flat is fully responsive across all journeys; do not copy a consumer app's navigation or reduce desktop operational density to a mobile feed. Table columns and touch targets follow the shared responsive rules.

## Tokens, branding and records

Token groups include semantic colours, typography, shape, spacing, size, motion, component aliases and new effects. Effects cover card/raised/pressed/input/icon shadows, glass tint/border/blur, decorative backdrop, opaque fallback, control boundaries, focus and reduced-effect mapping. Use these tokens throughout shared components, overlays, graphs, tabs, sliders and toggles; no module-local colour/shadow constants. All five selectable options have light/dark mappings; Neumorphic06 retains its mappings while deferred. Runtime theme variables and component variants are OpenKBS implementation work.

Identity precedence remains Orb default → published company identity after explicit white-label activation → permitted gym identity override. Style publication does not activate white labelling. Company logo/colours and legal invoice details remain independently sourced. Assistant is named **Orb** and uses the approved company icon under the existing rule. Every app/public page retains **Orb Gym - powered by orbsolutions.co.uk**.

New landing pages inherit effective company/gym style and approved logos/details; public projections still require approved source data and existing publication rules. No private guideline/social/internal upload becomes a public download. Document templates use approved branding and typography with solid print-safe treatment. Historical issued/signed documents and receipts retain their original brand/template/data version. Glass, bokeh and embossed controls are not printed into invoices, payslips or signed forms.

## Personal preferences and graceful fallback

Profile → Appearance keeps light/dark/system and adds **Visual effects: Auto / Full / Reduced**. Auto follows OS preferences/capability; Full never overrides forced colours, reduced transparency, reduced motion or the user's explicit reduction. Reduced removes decorative blur/gradients/paired shadows, keeping the selected style's core typography, spacing and solid surfaces. Reduced motion separately removes animated transitions; it does not itself change business outcomes or automatically remove all static styling.

Use a solid fallback when backdrop-filter is unsupported, rendering performance is inadequate or composited contrast cannot be validated. In reduced effects/forced colours, show semantic control boundaries, labels and system-appropriate colours. Selection, task state and navigation remain unchanged. A tenant's decorative preference cannot override these needs. Preview does not prove assistive-technology support; test actual implementation.

## Builder acceptance — authored, not executed app tests

| ID | Required outcome |
|---|---|
| UI35-01 | Owner selects any of the five selectable presets in SCR-075; save/preview does not change other sessions; only authorised successful publication does. |
| UI35-02 | Company direction reaches owner/staff/member/vendor modules and inherited gyms; permitted gym override/reset has exact scope; platform/other company remains unchanged. |
| UI35-03 | All five selectable styles render in light/dark at desktop, iPad portrait/landscape and mobile, preserving left/bottom shell and current form/task context. |
| UI35-04 | Neumorphic buttons/cards/fields/icons/sliders/toggles have the described raised/inset treatment and usable non-shadow states. |
| UI35-05 | Glass backgrounds/frost/cards/controls/dialogues/icon containers use approved effects; operational text stays opaque; unsupported/reduced transparency has a complete solid fallback. |
| UI35-06 | Flat uses solid sans-serif planes/controls/icons, valid state colours and clear form/ledger hierarchy without glass/depth artifacts. |
| UI35-07 | User colour/font changes are validated across actual composed surfaces and all interaction states; inaccessible/invalid draft cannot publish and last valid appearance remains. |
| UI35-08 | Mode/effect preferences, keyboard focus, 44px touch targets, forced colours, reduced motion/transparency and screen reader semantics work in rendered components. |
| UI35-09 | Logo/white-label activation stays separate; Orb name/icon/footer rules survive all styles; historical issued records retain their snapshots and new print outputs stay readable. |
| UI35-10 | Stale/concurrent publish, interrupted upload, missing font/logo, unauthorised gym override, rollback and failed save preserve valid configuration and business data. |

Receiving-stage work: add to existing numbered settings/token/shared-component delivery cards, then cover representative portal screens and integration/visual tests. OpenKBS prepares detailed implementation steps after inspecting its actual project; this update creates no live board cards and authorises no deployment. No full-app build or interactive visual/accessibility assessment occurred here.
