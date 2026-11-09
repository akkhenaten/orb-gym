# Motion and overlays

All timings here are proposed product values, not Apple standards or tested performance. Respect reduced motion if OS or app requests it. Financial/workflow completion is independent of animation. No decorative delay blocks an urgent action.

| ID | Trigger and from/to | Timing / interruption | Reduced treatment |
|---|---|---|---|
| MOT-01 | Control hover/press changes semantic surface/border; focus immediate |160ms cubic-bezier(.22,1,.36,1); reversal from current value, no tap queue | Immediate state/focus |
| MOT-02 | Drawer/sheet enters from16px offset and opacity 0 to rest/1 |240ms same curve; reversal uses remaining-distance fraction; controls remain accessible once mounted; close does not cancel submitted command | Immediate placement/removal |
| MOT-03 | Expand gym navigation/section |160ms content-height reveal; retain current selection; reverse current height | Instant expansion |
| MOT-04 | Coach front/back |240ms opacity swap with optional restrained rotation; explicit toggle, no auto-repeat; focus stays toggle | Instant content swap, announce panel |
| MOT-05 | Pane resize | Direct manipulation; no easing; clamp minimums;16px keyboard steps | Same direct response |
| MOT-06 | Theme preview/publication | No full-screen flash; atomic token replacement preserving active field/scroll; no success animation before publication confirms | Immediate replacement |
| MOT-07 | Loading/progress | Determinate when known; otherwise labelled static pending plus optional subtle spinner; no auto-scrolling feed | Static status and progress text |

OVR-01 bounded decision modal: max560px, viewport16px margins, title/impact/decision controls; background inert, initial focus on heading or safe action, Tab contained, Escape cancels only before submitted; outside click does not discard dirty content. Return focus to opener or safe list heading.

OVR-02 contextual nonmodal drawer: default 480px, max min(640px, 90vw), remaining background usable only if no modal requirement; complex record gets addressable full route on small screens. Close via labelled button/Escape; dirty choice Save draft if supported/Discard/Stay. No nonmodal focus trap.

OVR-03 media viewer: viewport-bounded modal; accessible caption/source, fit/zoom/previous/next; return to exact attachment control. Permission loss closes protected content and shows safe access-change notice.

OVR-04 mobile action sheet: max85dvh, scroll body/footer accessible above safe area and virtual keyboard; no mandatory swipe gesture; Close button and standard modal focus behaviour. Nested overlays avoided; advancing to complex workflow replaces sheet with route while preserving origin.

All overlays retain page-level attribution access, clear title, safe close, scroll ownership and focus restoration. Verification must exercise rapid reversals, repeated taps, resize mid-action, reduced motion and keyboard. No device smoothness or screen-reader testing has been executed by creating this catalogue.
