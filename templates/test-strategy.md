# Test strategy: <Project name>

| Field | Value |
|---|---|
| Spec | `docs/spec.md` |
| Status | Draft / Approved (G3) |
| Last updated | YYYY-MM-DD |

## 1. What must be true to release
<The acceptance criteria and non-functional targets that decide acceptance (G5), in 3–5 bullets.>

## 2. Test levels
| Level | Scope | Tool | Data | Runs | Owner role |
|---|---|---|---|---|---|
| Unit | Functions and modules | <...> | Synthetic | Every commit | Dev |
| Integration | Database, jobs, external calls | <...> | Synthetic rows in a local copy | Before merge | Test |
| End-to-end | Main user journeys in a browser | <...> | Seeded test data | Before release | Test |
| Load | p95 latency, error rate under load | <...> | Synthetic requests | Before release | Test |
| Evaluation | Quality of AI output | `docs/eval-plan.md` | Eval set | Every model or prompt change | Test |

## 3. Traceability
| Story | Acceptance criterion | Test (file or manual script) | Status |
|---|---|---|---|
| <US-001> | <AC1> | <tests/e2e/...> | <pass / fail / pending> |

## 4. AI-generated tests
- Agents write tests from acceptance criteria before the code (TDD).
- A human reviews each new test for intent: does it check the behaviour the AC describes, not just the current code?

## 5. Environments and test data
- <where each level runs; how test data is created and cleaned up; no real personal data>

## 6. Defects
| Severity | Definition | Blocks release? |
|---|---|---|
| High | <data loss, security, main journey broken> | Yes |
| Medium | <feature wrong, workaround exists> | Decided by the owner |
| Low | <cosmetic> | No |
