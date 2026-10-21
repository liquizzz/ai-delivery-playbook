# Milestone v<X.Y.Z>

Save as `docs/product/milestones/vX.Y.Z.md`. Owned by the Lead: the plan, the estimates, the items taken in, the risk table and what the client must prepare. One milestone is running at a time; one more is "next".

| Field | Value |
|---|---|
| Status | Next / Running / Released on YYYY-MM-DD |
| Started | YYYY-MM-DD |
| Committed release date | YYYY-MM-DD |
| GitHub milestone | <link> |

## Scope
| CR | Title | Type | Level | Priority |
|---|---|---|---|---|
| #<n> | <...> | type:feature | L2 | High |

## Estimate and buffer
In AI time, never in human developer days (rule "Estimates" in `CLAUDE.md`).

| Item | Value |
|---|---|
| AI working time: sum of task estimates | <6 h> |
| Risk buffer on AI time (+15% certain / +25% L2 or medium confidence / +40% L3 or new work) | <1.5 h> |
| Sessions working in parallel | <2 (Dev1, Test)> |
| Owner's time (reviews, acceptance, approvals) | <2 h> |
| Outside waits (what, from whom, by when) | <client sample data, by YYYY-MM-DD> |
| **Committed release date** | **<YYYY-MM-DD>** |
| Speed used (AI time per task, L0 / L1 / L2 / L3) | <15 min / 30 min / 1 h / 2 h, or this project's measured numbers> |

## Items taken in during the milestone
| Date | Item | Level | Cost (AI time) | Decided by | Buffer left |
|---|---|---|---|---|---|
| YYYY-MM-DD | #<n> <...> | L1 | 30 min | Lead (owner for price or date) | <1 h> |

## Moved to the next milestone
| Item | Reason | Date |
|---|---|---|
| #<n> | <...> | YYYY-MM-DD |

## Risks
| Risk | Likelihood | Impact | Response | Watcher | Status |
|---|---|---|---|---|---|
| <Broker API changes format> | Medium | <2 h of AI time, or a day of waiting> | <Adapter first, sample data> | Lead | Open |

Status `Accepted` means the owner chose to ship with the risk; the handover lists it for the client.

## What the client must prepare
What the technical decisions (ADRs) need from the client before or at deployment; the handover lists it.

| Item | From | Needed by |
|---|---|---|
| <A server with 4 CPU and 8 GB RAM> | <ADR-0006> | <v1.0.0 deployment> |

## Result
<Filled in at release: version, date, buffer used, estimated and actual AI time per level, what moved out, lessons.>
