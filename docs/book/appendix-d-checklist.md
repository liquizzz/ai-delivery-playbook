# Appendix D: Process checklist

**Purpose:** every step of the process in order, so nothing is skipped. Each row says which session does it, what it produces, and how it is checked.

**Ask the PO,** any time:
> Where are we? Check the project against Appendix D and list anything skipped.

**Claude does:** checks each row against the repo and GitHub, marks done / in progress / missing, and proposes the smallest list of steps to catch up.

## Foundation (once)

| # | Step | Session | Output | Check |
|---|---|---|---|---|
| 1 | Create the project (`init.mjs`) | You | Kit, branches, the Lead's worktree, repo, `START-HERE.md` | Report shows no warnings |
| 2 | Finish the setup (first, before any other session) | Lead | `CLAUDE.md`, labels, board, milestones, gate issues G1-G3, the PO's worktree (Lite: also Dev1's) | `"setup": true`; CI ran; board visible on GitHub |
| 3 | Open the PO | You | The PO's session, from the setup's prompt | It answers with its role and the next step |
| 4 | Proposal | PO | `docs/product/proposal.md` | G1 |
| 5 | PRD, data notes, stories | PO (+ Lead) | `docs/product/` | G2 |
| 6 | Design: look and feel, main screens, flows (before the stack) | UI/UX and Lead (Lite: Lead) | `design/look-and-feel.html`, screens in `design/`; with a prototype, tag `design-v1` | You approved the design |
| 7 | Stack | Lead | Stack ADR with rejected options; Docker and CI fitted | Stack installed; `docker compose up --build` starts |
| 8 | SRS baseline, ADRs, C4, test strategy, eval plan | Lead | `docs/tech/` | Part of G3 |
| 9 | First milestone plan | PO + Lead | `docs/product/milestones/v0.1.0.md`, issues | G3 |

## Every milestone

| # | Step | Session | Output | Check |
|---|---|---|---|---|
| 10 | CR for each request | PO | CR issue → `docs/product/cr/` | Approved (PO, or you for L2-L3) |
| 11 | SRS and spec before code | Lead | `docs/tech/srs.md`, `docs/tech/spec/` | Merged into `dev` |
| 12 | Tasks | Lead | Sub-issues with level, estimate | Definition of Ready |
| 13 | Build | Dev | PR with `Closes #n`, confirmed level | CI green, Lead review |
| 14 | Test by confirmed level | Dev / Test | Result on the issue | Level line on the issue |
| 15 | Merge | Lead | Squash merge into `dev` | Definition of Done; G4 when all tasks are done |
| 16 | Regression on staging | Test | `docs/tech/test-reports/vX.Y.Z.md` | G5 |
| 17 | Owner acceptance | PO writes, you try | Scenarios in `docs/releases/vX.Y.Z.md` | Every scenario confirmed by you |
| 18 | Release | Lead | `CHANGELOG.md`, SRS revision, `docs/releases/vX.Y.Z.md`, tag | G6, your approval |
| 19 | Log | Lead | Line in `docs/ai-log.md` | One line per finished task |

## When needed

| Step | Session | Chapter |
|---|---|---|
| Hotfix | Lead | [5](05-releases.md) |
| Rollback | Lead | [5](05-releases.md) |
| Go live (1.0.0) | Lead | [5](05-releases.md) |
| Trace a change | Lead | [6](06-continuity.md) |
| Move from Lite to Full | Lead | [8](08-lite-mode.md) |

In Lite there is no staging, so step 16 does not apply. Step 6 is done by the Lead, and step 17 (your acceptance) is never skipped.
