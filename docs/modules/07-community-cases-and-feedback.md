# community cases and feedback

Detailed extracted scope from baseline 0.17. Read with product-architecture.md and decisions-and-open-items.md. Each source reference is traceable; no requirement is removed by this grouping.

# Feed communications and member experience

<!-- OG-SRC-0122 -->
The member home view combines the next booking, digital pass and outstanding requests with a Facebook-style feed underneath. Posts can target the company, selected gyms, classes or permitted groups. Management navigation retains Dashboard and Feed as separate destinations.

<!-- OG-SRC-0123 -->
Announcements, community posts, comments and reactions require audience rules, moderation and reporting. Public marketing content is separate from member-only feed content. Internal staff posts and sensitive information must never enter the member feed through a reused component.

<!-- OG-SRC-0124 -->
Support targeted booking changes, payment requests, rota notifications and task reminders. Distinguish notification delivery, reading and acceptance. Notification preferences do not suppress essential in-app account state. Marketing permissions and notification channels require configuration before launch.

# Community feed features

<!-- OG-SRC-0217 -->
The Facebook-style experience includes posts, photo galleries/video/files, links, reactions, comments/threaded replies, saved posts, polls, events, pinned announcements, audience filtering/search and reporting/moderation. Typed @mentions resolve an authorised user ID, render as an accent-colour link and notify without granting access. Location attachment supports selected gym/place or permission-based current location with manual fallback; map/place provider and costs remain to be chosen. Posting location is deliberate. A reported problem can become a linked case while preserving source and audience boundaries.


