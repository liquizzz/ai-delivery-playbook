# CR-<n>: <Short title>

Save as `docs/product/cr/CR-<n>-<slug>.md`. The CR is drafted and approved as GitHub issue `#<n>` (CR template); when it is approved the PO exports the issue to this file and commits it. Later changes are made on the issue first, then re-exported with a line in "Amendments".

| Field | Value |
|---|---|
| Issue | `#<n>` |
| Type | `type:feature` / `type:change` / `type:fix` |
| Breaking | No / Yes (from 1.0.0 only, compared with production) |
| Priority | High / Medium / Low |
| Milestone | <vX.Y.Z> |
| Approved by | <PO / owner (L2–L3)>, YYYY-MM-DD |
| Spec | `docs/tech/spec/CR-<n>-<slug>.md` (Lead) |

## Context
<Why this change is needed; who has the problem.>

## Business request
<In business language, not technical design.>

## Acceptance criteria
- Given <...> When <...> Then <...>
- Given <...> When <...> Then <...>

## Out of scope
- <...>

## Decisions and rejected options
| Option | Why rejected |
|---|---|
| <...> | <...> |

Related decisions: <DEC-n>

## Amendments
| Date | Change | Approved by |
|---|---|---|
| YYYY-MM-DD | <...> | <...> |

## Delivered
<Released in vX.Y.Z on YYYY-MM-DD (filled in after release).>
