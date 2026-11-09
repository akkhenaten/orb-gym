# Shared relationship diagrams

These diagrams show selected critical relationships, not every concrete table. See the canonical relationships.json for all listed core links and specialised contracts for further joins.

## Person, payer and participant

```mermaid
flowchart TD
    I["Login identity"] --> P["Company person"]
    P --> M["Membership beneficiary"]
    P --> G["Verified guardian rights"]
    M --> E["Purpose-bound entitlement"]
    G --> B["Dependent booking action"]
    E --> B
```

The person receiving service can differ from payer, booking actor and signer. Guardian relationship is not automatic membership or collection authority. Private company records remain distinct under one login.

## Commercial truth

```mermaid
flowchart TD
    Q["Quote version"] --> D["Independent decision"]
    D --> C["Approved commitment"]
    C --> V["Verified invoice lines"]
    V --> A["Payment allocations"]
    P["Confirmed money movement"] --> A
```

Approval is not an invoice or cash. Invoice consumption reduces open commitment; allocated payments settle invoice balance without duplicating expense.

## Task and asset independence

```mermaid
flowchart TD
    T["Typed task occurrence"] --> S["Submitted evidence"]
    S --> V["Verification decision"]
    V --> C["Operational closure"]
    T --> A["Linked asset"]
    A --> R["Explicit service restoration"]
```

Task closure does not automatically restore equipment or pay its supplier. Groups, children and dependencies preserve individual evidence and unique financial links.
