# Commercial policy readiness

11 policies are declared by the contract and none carries a value.

| Policy | Owner | Required fields | Required when | Status |
| --- | --- | --- | --- | --- |
| `approval.routing` | authorised management | 7 | before approval template/service publication | SETUP_REQUIRED |
| `membership.payment_and_reversal` | membership and finance | 10 | before paid plan publication | SETUP_REQUIRED |
| `forms.applicability` | authorised publisher and reviewer | 7 | before applying material revision to existing people | SETUP_REQUIRED |
| `service.disruption` | authorised scheduling management | 7 | before bookable service publication | SETUP_REQUIRED |
| `gym.closure` | company owner | 8 | before archive execution | SETUP_REQUIRED |
| `till.reconciliation` | finance and retail management | 7 | before live till mode | SETUP_REQUIRED |
| `rental.class_commercial_mode` | company coaching and finance | 8 | before class publication | SETUP_REQUIRED |
| `trial.offer` | membership management | 10 | before trial activation | SETUP_REQUIRED |
| `junior.programme` | authorised management and safeguarding lead | 9 | before junior service activation | SETUP_REQUIRED |
| `import.batch` | authorised administrator | 9 | before import commit | SETUP_REQUIRED |
| `auth.privileged` | platform/security owner and authorised company owner | 8 | before production privileged access | SETUP_REQUIRED |

Values are supplied per workspace through `POST /api/policies/:policy_id/values` and are never generated.

Enforcement: A command that declares a workflow governed by an unconfigured policy is REFUSED with POLICY_UNCONFIGURED. Values are supplied per workspace and cannot come from the specification.

Limitation: The specification has no transition-to-workflow edge, so gating applies only when the caller declares the workflow context.
