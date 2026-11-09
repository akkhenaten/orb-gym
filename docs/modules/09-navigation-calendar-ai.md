# navigation calendar ai

Detailed extracted scope from baseline 0.17. Read with product-architecture.md and decisions-and-open-items.md. Each source reference is traceable; no requirement is removed by this grouping.

# Owner control workspace and navigation

<!-- OG-SRC-0038 -->
The dashboard provides Overview, Calendar and Feed tabs. Overview shows role-appropriate operational summaries; Calendar consolidates permitted scheduled work; Feed provides the Facebook-style community/announcement experience. The member Home foregrounds next booking and QR pass alongside these views. Gym-level dashboards use the same modules filtered to that gym.

<!-- OG-SRC-0039 -->
| Left navigation | Contents |
|---|---|
| Dashboard | Portfolio performance, today’s operations, exceptions and approvals. |
| Feed | Company/gym announcements and permitted community activity. |
| Company tools | Combined rota, people, finance/reporting, approvals, Documents, landing-page management and settings. |
| First gym expandable button | Configured gym name/logo and local modules. |
| Additional gym expandable buttons | Each configured gym’s name/logo and local modules. |
| Add gym | Authorised creation and configuration of another gym. |

<!-- OG-SRC-0040 -->
Each expanded gym contains Dashboard/Calendar/Feed, User management, Staff and HR, Classes, Coaching, Members, Membership management, Facilities, POS/Till, Finance/Reports, Documents, Landing-page management and Settings, subject to company/gym scope and RBAC. Company-level views aggregate authorised records rather than duplicating gym modules. The same module definitions power every gym; permissions change available records and commands, not the underlying source of truth. The current company, gym and module remain visible in the heading.

<!-- OG-SRC-0041 -->
The owner’s dashboard highlights missing opening checks, unfilled shifts, payment exceptions, unresolved incidents, overdue work and approvals. Each exception links to the underlying records, responsible person and next action. Show data freshness and distinguish unknown information from confirmed completion.

<!-- OG-SRC-0042 -->
Financial views separate membership charges, money collected, POS sales, refunds, expenses and staffing costs. Profit requires defined and sufficiently complete costs; incomplete income data must not be labelled profit.

# Shared calendar and navigation contract

<!-- OG-SRC-0195 -->
The role-filtered calendar aggregates staff shifts, classes, courses, bookings, job-sheet occurrences, contractor visits, maintenance appointments, meetings, one-to-ones and task deadlines. Each event retains a link to its authoritative record. Moving a calendar entry invokes that module’s permission, conflict and notification rules; it must not bypass rota publishing or class-change approval.

<!-- OG-SRC-0196 -->
Owners can filter company/gym/person/type. Staff see own shifts and delegated gym schedules; private HR event titles and absence reasons are concealed from unauthorised viewers. Members see published classes, their bookings and member-facing events, not staff rotas or contractor details. Contractors see their appointments and assigned deadlines. Handle timezone, recurrence edits, cancelled instances and stale updates consistently.

<!-- OG-SRC-0197 -->
Desktop uses the left sidebar with company tools and expandable gym buttons. iPad/tablet and mobile use a gym switcher and bottom navigation: management Overview/Gyms/Approvals/More; staff Home/My Shifts/Tasks/More; members Home/Classes/My Bookings/Profile; contractors Jobs/Visits/Updates/Account. These are the baseline destination map, with relevant Feed and Calendar views within Home/Dashboard and other modules accessible through More or gym navigation. Members have an always-accessible QR-pass action; staff have an authorised scan action. Local card tabs are distinct from global bottom navigation. Preserve selected gym, record, filters and drafts through resizing and navigation.

# AI responsibilities

<!-- OG-SRC-0181 -->
For management, AI acts as an operations assistant over authorised business information. It can answer questions, summarise handovers, identify missing cover, propose rota changes, highlight repeated faults, analyse class utilisation and explain financial exceptions.

<!-- OG-SRC-0182 -->
For staff and members, AI mainly supports background organisation, prompts and relevant summaries. A chat interface is not required for ordinary tasks.

<!-- OG-SRC-0183 -->
AI answers link to supporting records, state the period analysed and identify missing data. Routine supported actions may execute under the owner's clear instruction and existing authority. Financial, access, contract, externally published and consequential scheduling actions follow their defined approval rules; an existing authorised automation is not re-approved on every run. Models cannot grant permissions, create signatures or bypass approval.

<!-- OG-SRC-0184 -->
Photograph analysis can flag possible issues and help organise evidence; it does not prove cleaning quality, fitness to participate or legal compliance. Separate AI proposals, staff statements and human verification. Record model/prompt versions and source record versions for consequential outputs.

<!-- OG-SRC-0185 -->
Use role-scoped retrieval and task-specific tools. Uploaded documents and comments are untrusted data. Restrict HR, health and financial information even when the user can access ordinary gym operations.


