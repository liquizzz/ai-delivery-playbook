# Appendix D: Process checklist

**Purpose:** every step of the process in order, so nothing is skipped. Each row says which session does it, what it produces, and how it is checked.

**Ask the Lead** (or the PO during G1-G2), any time:
> Where are we? Check the project against Appendix D and list anything skipped.

**Claude does:** checks each row against the repo and GitHub, marks done / in progress / missing, and proposes the smallest list of steps to catch up.

## Foundation (once)

| # | Step | Session | Output | Check |
|---|---|---|---|---|
| 1 | Create the project (`init.mjs`) | You | Kit, branches, the Lead's worktree, repo, `START-HERE.md` | Report shows no warnings |
| 2 | Finish the setup (first, before any other session; asks you nothing) | Lead | `CLAUDE.md`, labels, board, milestones, gate issues G1-G3, the PO's worktree (Lite: also Dev1's) | `"setup": true`; CI ran; board visible on GitHub |
| 3 | Open the PO | You | The PO's session, opened by the Lead or from the setup's prompt | It answers with its role and the next step |
| 4 | Picture the project: one-page proposal and screen sketches (an old system: its functions with keep, drop or redo) | PO | `docs/product/proposal.md`, `docs/product/screens/` | You approved them: G1 and G2 in one approval |
| 5 | PRD, data notes, stories, the SRS's functional part, written from what you approved | PO (+ Lead) | `docs/product/`, `docs/tech/srs.md` | G2 checks |
| 6 | How we build it: the solution design with the look and feel | Lead; look and feel by UI/UX (Lite: Lead) | `docs/tech/solution-design.md`, `design/look-and-feel.html`; with a prototype, tag `design-v1` | You approved it (G3) |
| 7 | ADRs and the stack, from the solution design | Lead | Stack ADR with rejected options; Docker and CI fitted; design plugins for a product with screens | Stack installed; `docker compose up --build` starts |
| 8 | SRS baseline, C4, test strategy, eval plan (Full) | Lead | `docs/tech/` | Part of G3 |
| 9 | First milestone plan | Lead | `docs/product/milestones/v0.1.0.md`, issues | G3 |

## Every milestone

| # | Step | Session | Output | Check |
|---|---|---|---|---|
| 10 | CR for each functional change (a technical one is an ADR) | Lead | CR issue → `docs/product/cr/`, row in `docs/product/changes.md` | The client's approval recorded; you for L2-L3 |
| 11 | SRS and spec before code | Lead | `docs/tech/srs.md`, `docs/tech/spec/` | Merged into `dev` |
| 12 | Tasks | Lead | Sub-issues with level, estimate | Definition of Ready |
| 13 | Build | Dev | PR with `Closes #n`, confirmed level | CI green, Lead review |
| 14 | Test by confirmed level | Dev (Test too with `/auto testing on`) | Result on the issue | Level line on the issue |
| 15 | Merge | Lead | Squash merge into `dev` | Definition of Done; G4 when all tasks are done |
| 16 | Regression, then the PO's acceptance, on `staging` | Test (Lite: Dev1), then PO | `docs/tech/test-reports/vX.Y.Z.md`, `docs/product/handover/vX.Y.Z.md` section 1 | G5 |
| 17 | Owner acceptance | PO picks, you try on `staging` | Scenarios in `docs/releases/vX.Y.Z.md` | Every scenario confirmed by you |
| 18 | Handover | PO writes, you send | `docs/product/handover/vX.Y.Z.md` | Delivered, changes, what the client prepares, accepted risks |
| 19 | Release, no new tests | Lead | `CHANGELOG.md`, SRS revision, `docs/releases/vX.Y.Z.md`, tag of the accepted `staging` commit | G6, your approval |
| 20 | Log | Lead | Lines in `docs/ai-log.md` and actual AI times in the milestone file | Once per milestone |

## When needed

| Step | Session | Chapter |
|---|---|---|
| Hotfix | Lead | [5](05-releases.md) |
| Rollback | Lead | [5](05-releases.md) |
| Go live (1.0.0) | Lead | [5](05-releases.md) |
| Trace a change | Lead | [6](06-continuity.md) |
| Move from Lite to Full | Lead | [8](08-lite-mode.md) |

In Lite, Dev1 runs the regression in step 16, the Lead draws the look and feel in step 6, and step 8 has no C4, test strategy or eval plan. Step 17 (your acceptance) is never skipped.
