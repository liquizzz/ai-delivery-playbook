# Spec CR-<n>: <CR title>

Save as `docs/tech/spec/CR-<n>-<slug>.md`. Written by the Lead from an approved CR, merged into `dev` together with the SRS update **before** any task is assigned. The SRS (`docs/tech/srs.md`) stays the single description of the whole system; this spec holds the technical detail of one change.

| Field | Value |
|---|---|
| CR | `#<n>` · `docs/product/cr/CR-<n>-<slug>.md` |
| Milestone | <vX.Y.Z> |
| SRS sections changed | <§3.2, §5.1> |
| Requirements | <FR-021 (new), FR-008 (changed), NFR-004> |
| Change level | <L0–L3, highest of its tasks> |
| Breaking | <No / Yes (from 1.0.0): see section 7> |
| Status | Draft / Merged into dev |

## 1. Summary
<What changes and why, in 3–5 sentences, in technical terms.>

## 2. Behaviour
<Per screen or flow: inputs, states, outputs, messages. Link `design/` screens.>

## 3. Contracts
### 3.1 API
| Method and path | Request | Response | Errors |
|---|---|---|---|
| `<POST /api/...>` | <fields and types> | <fields and types> | <status codes and bodies> |

### 3.2 Data
<New or changed tables, columns, indexes; migration steps.>

### 3.3 Configuration
| Key | Type | Default | Notes |
|---|---|---|---|
| `<APP_...>` | <...> | <...> | <...> |

## 4. Processing logic
<Rules, jobs or algorithms, step by step. Reference FR IDs.>

## 5. Tasks
| Issue | Role | Module | Level | Estimate | Confidence |
|---|---|---|---|---|---|
| #<n> | Dev1 | <auth> | L2 | 1 day | High |
| #<n> | Test | <auth> | — | ½ day | High |

## 6. Test notes
<Scenarios Test must cover (by FR ID), edge cases, data needed.>

## 7. Upgrade and rollback (required when breaking)
- Upgrade steps: <data migration, settings, who does what>
- Rollback: <how to return to the previous version, including data>

## 8. Decisions
| ADR | Decision |
|---|---|
| `docs/tech/adr/NNNN-<slug>.md` | <...> |
