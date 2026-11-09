# Configuration Inventory

## Separation of responsibilities

| Configuration | Authoritative owner | Examples |
|---|---|---|
| Deployment/runtime secrets | Protected environment/secret manager | Database connection, signing/session secret, provider credentials; exact keys depend on actual runtime. |
| Workspace settings | Company/gym configuration records | Logo/icon, UI preset/colours, contact/legal identity, business policies and public content. |
| Personal preferences | User profile | Avatar, permitted name/contact, notification options, light/dark/system preference. |
| Versioned commercial rules | Owning domain | Membership/offer versions, hourly customer PT prices, rental terms and coach allocation rules. |
| Issued history | Immutable/versioned record snapshot | Signed agreement, invoice/receipt/template/brand version used at issue. |

.env.example uses illustrative blank names only. It is not an OpenKBS configuration file or a claim these variables are configured/required verbatim. Inspect actual automatic injections and runtime instructions before implementation; never copy secrets into the repository or expose server variables to the browser. No openkbs.json is invented without a real project.

## Integration decisions to complete

Authentication/session recovery and company scoping; private storage/file validation; transactional database and durable jobs; tenant-safe real-time messages; DD/card payments, merchant ownership and callbacks; POS terminal/scanner/printer; verified email sender/domain; optional push/SMS and locations/maps; accounting/payroll; AI tool/model execution and costs. Record chosen service, exact variables, public/server boundary, permission/rotation, sandbox/production separation and verification evidence in the platform capability matrix.

The retained platform notes were researched on 6 November 2026; they are not fresh project configuration evidence. Verify current official provider documentation when making technical decisions. Company-specific merchants, domains and branding are separate capabilities; sharing a workspace UI does not prove those integrations are correctly isolated.


## Notification and escalation contract — 0.26

Read the [current notification contract](notifications/notification-contract.md) and canonical event catalogue, generated CSV, policy settings, safe templates and planned acceptance checks. Resolve exact event recipients/source transitions and stop conditions in OpenKBS planning. Owner/company and platform-admin scope follows the current docs/access contract, superseding old generic company-admin wording. No arbitrary reminder intervals or unsupported channels are approved. Personal preferences do not erase required source actions; delivered/read/acknowledged/completed remain distinct. No live delivery is configured or authorised by this file.


## Dashboard and reporting definitions — 0.27

Use the [metric/reporting contract](reporting/metric-contract.md) with canonical metric/report catalogues, source maps, setup inputs, synthetic worked reconciliation and planned acceptance. Figures and Orb use identical definitions and scope. Charges/credits/collections/refunds/reversals/allocations/costs are separate. Overlapping gym membership rows cannot be summed as company distinct people. Missing costs/basis are unavailable/incomplete, not zero/profit. Old generic report-catalogue-to-be-prepared wording now means OpenKBS maps the supplied product catalogue to actual schema/providers/queries and verifies it; do not replace settled definitions silently.


## Document and form catalogue — 0.29

Use the [current document contract](documents/document-contract.md) with DCT type catalogue, typed fields, declarative layouts, content-readiness gates and planned acceptance. Upload/form/acknowledgement/signature/issued financial snapshot remain distinct. Company-reviewed legal/health/safety wording and actual original documents remain required inputs; placeholders do not become approved content. Owning source commands control issue/sign/review/payment, and historical issued/signed data/brand versions stay frozen.
