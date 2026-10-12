# Spec: <Project name>

| Field | Value |
|---|---|
| PRD | `docs/prd.md` |
| Data notes | `docs/data-notes.md` |
| UX | `docs/design/` |
| Status | Draft / Approved (G3) |
| Last updated | YYYY-MM-DD |

## 1. Overview
<What the system does, in 3–5 sentences. Link the C4 container diagram.>

## 2. User-facing behaviour
<One subsection per screen or flow from the approved UX: inputs, states, outputs, copy.>

## 3. Interface contracts
### 3.1 API
| Method and path | Request | Response | Errors |
|---|---|---|---|
| `<POST /api/...>` | <fields and types> | <fields and types> | <status codes and bodies> |

### 3.2 Data schema
<Tables or collections owned by this product, with types and indexes.>

### 3.3 Configuration keys
| Key | Type | Default | Owner role |
|---|---|---|---|
| `<APP_...>` | <...> | <...> | <...> |

## 4. Processing logic
<Jobs, pipelines, ranking or business rules, step by step.>

## 5. Non-functional requirements
| Attribute | Target | How we verify |
|---|---|---|
| Performance | <e.g. p95 < 1.5 s> | <load test> |
| Availability | <...> | <...> |
| Security | <...> | <...> |
| Cost | <...> | <...> |

## 6. Architecture decisions
| ADR | Decision | Status |
|---|---|---|
| `docs/adr/0001-<slug>.md` | <...> | Accepted |

## 7. Out of scope
- <taken from the PRD non-goals>
