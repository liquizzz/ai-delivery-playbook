# Appendix D: Process checklist

**Purpose:** every step of the process in order, so nothing is skipped. Each row says which session does it, what it produces, and how it is checked.

**Ask the PO,** any time:
> Where are we? Check the project against Appendix D and list anything skipped.

**Claude does:** checks each row against the repo and GitHub, marks done / in progress / missing, and proposes the smallest list of steps to catch up.

## Foundation (once)

| # | Step | Session | Output | Check |
|---|---|---|---|---|
| 1 | Create the project (`init.mjs`) | Owner | Kit, branches, worktrees, repo, `START-HERE.md` | Report shows no warnings |
| 2 | Finish the setup | Lead | `CLAUDE.md`, Docker files, labels, board, milestones | Guard and release tests pass; board visible on GitHub |
| 3 | Open PO and Lead | You | Two worktrees and sessions | Both answer the restart sentence |
| 4 | Proposal | PO | `docs/product/proposal.md` | G1 |
| 5 | PRD, data notes, stories | PO (+ Lead) | `docs/product/` | G2 |
| 6 | Design round(s) | UI/UX | `design/`, tag `design-v1` | Client approval |
| 7 | SRS baseline, ADRs, C4, test strategy, eval plan | Lead | `docs/tech/` | Part of G3 |
| 8 | First milestone plan | PO + Lead | `docs/product/milestones/v0.1.0.md`, issues | G3 |

## Every milestone

| # | Step | Session | Output | Check |
|---|---|---|---|---|
| 9 | Morning brief and decisions | PO | `docs/reports/<date>.md` | Your answers recorded |
| 10 | CR for each request | PO | CR issue → `docs/product/cr/` | Approved (PO, or you for L2-L3) |
| 11 | SRS and spec before code | Lead | `docs/tech/srs.md`, `docs/tech/spec/` | Merged into `dev` |
| 12 | Tasks | Lead | Sub-issues with level, estimate | Definition of Ready |
| 13 | Build | Dev | PR with `Closes #n`, confirmed level | CI green, Lead review |
| 14 | Test by confirmed level | Dev / Test | Result on the issue | Level line on the issue |
| 15 | Merge | Lead | Squash merge into `dev` | Definition of Done; G4 when all tasks are done |
| 16 | End-of-day report | PO | Same report file | Buffer left shown |
| 17 | Regression on staging | Test | `docs/tech/test-reports/vX.Y.Z.md` | G5 |
| 18a | Owner acceptance | PO writes, you try | Scenarios in `docs/releases/vX.Y.Z.md` | Every scenario confirmed by you |
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

In Lite mode, skip steps 6, 16 and 17 unless the product needs them. In Starter mode, also skip step 3 (one session) and step 9 (no daily report); steps 10-15 are done by the one session, and step 18a (your acceptance) is never skipped.
