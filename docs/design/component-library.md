# Shared component rules — 0.23

The [machine catalogue](component-catalogue.json) is the component ID source. All screens consume these shared components and the [theme tokens](theme-tokens.json); no module invents its own untokenised visual system. STATE-01 in the [master](frontend-ui-specification.md) applies throughout.

| Component | Variants and interaction contract |
|---|---|
| CMP-SHELL / CMP-FOOTER | Owner, assigned staff, member/limited/guardian, vendor and distinct support context. Exact attribution on public/auth/error pages too. Preserve context during responsive reflow. |
| CMP-FORM | Text/email/phone/password/number/currency/date/time/select/multiselect/checkbox/radio/switch/file and signature capture only where supported. Field schema derives from workflow/policy settings; never infer legal or medical questions. Label/help/error; requiredness; dirty state; explicit save. Parent-option changes show dependent consequences before clearing submitted content. |
| CMP-TABLE | Reference/name/status/gym/owner/due/next-action base order; scope-specific financial/attendance fields. 40px desktop row min, touch actions44px. No arbitrary visible-row selection implying whole dataset. Readable full-value detail; server-sort/page as appropriate. |
| CMP-CALENDAR | Rota/classes/PT/tasks source colours plus text labels. Keyboard date navigation; event list alternative; edit conflict preview. Repeating edits state one/future/series scope and preserve historical records. |
| CMP-ITEM / CMP-FEED / CMP-RECORDS | One cleaning/maintenance/admin item form; type-specific fields. Details top, activity left, records right; mobile tabs. Composer adds note/media/typed approval/quote/invoice; typed record owns status and version. Audit includes actor/time/action; amendments preserve originals. |
| CMP-MEDIA / CMP-UPLOAD | Protected viewer and progress/retry/quarantine/error states. Alt description or caption; zoom controls named. Escape returns focus. Unsupported type has approved download route, no blank preview pretending to work. |
| CMP-RECEPTION / CMP-QR | Photo-left ID outcome; explicit Entry/Exit; stale/denied/expired/duplicate states. Unknown scan no private lookup until authorised. Camera denied gives manual authorised lookup; asset QR lookup cannot grant member entry. |
| CMP-TILL / CMP-RECEIPT | Product barcode/search, quantity, price override grants, basket, tender and reconciliation. Confirmed/failed/unknown distinct. Receipt is immutable record preview; share/print/reprint with truthful delivery. |
| CMP-BRAND / CMP-COACH | Token-bound previews; source values distinct from proposed adaptations. Coach card flip is explicit toggle and reduced-motion immediate swap, with stable focus. |
| CMP-ASSISTANT | Orb name; scoped source citations/record links; proposed command preview; grants and normal approvals. Result remains linked to source workflow; no invented completion. |
| CMP-OVERLAY / CMP-NOTIFICATION | Modal decision versus contextual drawer/sheet. Toasts never sole financial/recovery evidence; important outcomes persist in record/inbox. |

Buttons: primary, secondary, text, danger, icon; normal/hover/focus/pressed/disabled/busy. Use one primary per action region. Disabled controls include an accessible reason where relevant; hide actions that reveal forbidden data. Busy shows action-specific text (Saving…, Checking payment…) and prevents duplicate submission while other permitted work remains usable. Destructive business actions use explicit names and policy-backed impact previews, not ambiguous OK.

Forms and tokens: base body 16/line 1.5, labels 14, headings 28; documented density may change operational tables but not member touch access. Font fallback cannot change field meaning or hide total/next action. All foreground/background/outline/shadow/motion choices bind semantic aliases; literal colours only in the central token definitions or documented print-paper context. Disabled, selected, hover, danger and focus remain different in every preset.

Not all forms have identical fields: every screen's workflow_action_variants provides entry guard, checkpoints, exact authoritative outcome, exception and source. Builder must turn those into field/action schemas in its implementation plan and link actual permission IDs, not reuse a generic submit screen for every workflow.


## Current UI direction extension — 0.35

The five-style settings and component contract in docs/design/ui-direction-settings.md, style-options.json and appearance-settings-contract.json extends the existing five directions with Neumorphic06 and develops Flat02/Glass04. Five styles are selectable with ten light/dark mappings; Neumorphic06 retains its two mappings but is deferred (founder decision, 9 Nov 2026). Earlier five-style references/images record the prior baseline. Existing workflows, permission/source rules and business behaviour remain unchanged. Style selection does not activate white labelling; published scope, reduced-effects fallbacks, print-safe outputs and immutable issued snapshots follow that contract.
