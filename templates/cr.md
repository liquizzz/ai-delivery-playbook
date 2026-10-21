# CR-<n>: <Short title>

Save as `docs/product/cr/CR-<n>-<slug>.md` and add a row to `docs/product/changes.md`. The CR is drafted and approved as GitHub issue `#<n>` (CR template); when it is approved the Lead exports the issue to this file and commits it with the SRS update. Later changes are made on the issue first, then re-exported with a line in "Amendments".

| Field | Value |
|---|---|
| Issue | `#<n>` |
| Type | `type:feature` / `type:change` / `type:fix` |
| Breaking | No / Yes (from 1.0.0 only, compared with production) |
| Priority | High / Medium / Low |
| Milestone | <vX.Y.Z> |
| Requested by | <client contact>, <email / chat / meeting>, YYYY-MM-DD, <link> |
| Impact | AI time <…> · date <unchanged / moves to …> · price <…> |
| Billed | Yes / No (included in the contract) |
| Client approval | <name>, YYYY-MM-DD, <link to the message> |
| Approved by | <owner (L2-L3)>, YYYY-MM-DD |
| Spec | `docs/tech/spec/CR-<n>-<slug>.md` |

## Context
<Why this change is needed; who has the problem.>

## Business request
<In business language, not technical design. Only functional changes are CRs: a technical change is an ADR.>

## Scope before and after
- Before: <what the client had agreed to>
- After: <what it becomes>

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
