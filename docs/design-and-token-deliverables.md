# Design and Token Delivery Contract

Review r1. Source: all five selectable UI preset rules (Neumorphic06 deferred) and responsive navigation. This is a specification requirement, not a supplied production token library.

## OG-REV-008 — Concrete design outputs

The builder's plan must identify the screens/components, selected variants, token definitions and mode-specific resolved values it will deliver. Use stable preset IDs: basic-01, flat-02, editorial-03, glass-04 and console-05. Soft Glass 04 is the same direction previously summarised as iOS-inspired Soft; it is not a sixth preset.

For each token record ID, type, semantic purpose, scope, source, status (source value/proposed/approved), value or reference, light/dark mapping, permitted company/gym override and validation constraint. Resolve every required token for every preset; do not treat sparse palette examples as complete themes. Define foundation → semantic → component aliases, fonts/fallbacks/assets, typography, spacing, size/density, radii, borders, elevation, motion, focus and all interactive states. The initial Basic source palette remains the visual reference; proposed dark mappings and secondary-preset values still need review.

Map component variants for navigation, calendar, tables, forms, feed/composer, tri-pane item cards, reception ID card, class/register, till, receipt preview, document composer, landing page and coach flip card. Verify loading/empty/error/disabled/focus/selected states and long content. Module-specific hard-coded styles require documented exceptions; appearance changes cannot alter permissions or state transitions.

Personal light/dark/system preference remains separate from company branding. Distinguish configurable style selection from explicit white-label activation. Record the preview/publish/rollback and permitted gym-override behaviour so theme publication cannot accidentally activate an unapproved logo. Provide an opaque fallback for glass and preserve the exact footer in all presets/modes.

Produce a responsive role/screen matrix: owner desktop/mobile, staff desktop/mobile, member mobile, vendor responsive, plus iPad/tablet including landscape. Content panes adapt independently of the mandated bottom navigation on tablets. Define accessible labels, reading/focus order, zoom/reflow, keyboard/touch, reduced motion and media viewer return behaviour. Font licensing/delivery and final reverse/icon logo files are design dependencies to record.

Repository edition 0.18 now includes the five historical visual concept images under assets/ui-concepts/; they were inspected during repository assembly. They are reference-only generated visuals with invented logos, figures, dates and sample identities. The active written rules and supplied master logo take precedence. Exact wireframes/component bindings and an approved Figma baseline remain undelivered; these concepts do not prove responsive/accessibility or complete theme coverage.


## Frontend blueprint addition — repository 0.23

Read the [frontend master](design/frontend-ui-specification.md). The new screen/action inventory, shared components, ten proposed resolved preset/mode mappings, asset/motion catalogues and annotated wireframes extend the 0.22 product baseline. They do not implement the app or prove interactive/accessibility checks. Existing product policies and source IDs are preserved; new visual measurements require receiving-stage verification.


## Current UI direction extension — 0.35

The five-style settings and component contract in docs/design/ui-direction-settings.md, style-options.json and appearance-settings-contract.json extends the existing five directions with Neumorphic06 and develops Flat02/Glass04. Five styles are selectable with ten light/dark mappings; Neumorphic06 retains its two mappings but is deferred (founder decision, 9 Nov 2026). Earlier five-style references/images record the prior baseline. Existing workflows, permission/source rules and business behaviour remain unchanged. Style selection does not activate white labelling; published scope, reduced-effects fallbacks, print-safe outputs and immutable issued snapshots follow that contract.
