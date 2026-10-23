# Chapter 8: Lite mode

**Purpose:** run the same process with less ceremony, then move up to Full, or back, without redoing anything. Lite is the starting level: three sessions you direct like a small team.

| Area | Full process | Lite mode |
|---|---|---|
| Sessions | PO, Lead, one Dev, and Test, UI/UX or DevOps when needed (a second Dev when two tasks can run in parallel) | PO, Lead (also design and DevOps), one Dev (also the Test work) |
| Branches | `role/*` → `dev` → `staging` → `main` → `production` | Same |
| Review | Lead reviews every PR | Lead reviews every PR |
| Foundation | One-page proposal and screen sketches, then PRD, data notes, stories; solution design, then ADRs, SRS, C4, test strategy, eval plan | One-page proposal and screen sketches, then PRD, stories; solution design, then ADRs, SRS; no C4, test strategy or eval plan |
| Design | The PO's screen sketches at G1-G2; the UI/UX session draws the look and feel at G3 | The PO's screen sketches at G1-G2; the Lead draws the look and feel at G3 |
| Milestones | Buffer and risk table | One milestone; one-line buffer and risk |
| Reports | `/progress`; `/progress report` saves one | Same |
| Testing | L0-L3 by the Dev and CI; at the end of the milestone Test's regression on `staging`, then the PO's acceptance there (`/auto testing on` adds a check of each merged task) | L0-L3 by the Dev and CI; at the end of the milestone Dev1's regression on `staging`, then the PO's acceptance there |
| Release check | Your scenarios on `staging` and the PO's handover; the release adds no tests | Same |
| Always kept | | Setup first, gate issues, CR issues, labels, SRS and its revisions, level confirmation, SemVer tags, `role-guard`, hand-off prompts |

There is no single-session level. One session playing every role feels simpler but runs slower, because nothing happens in parallel, and it hides the hand-offs that show you where work stands. With three sessions you direct them like a small team: you hand work over, you see it come back, you approve at the gates.

## 1. Start

**You run:** `node crewbook-build/kit/init.mjs` and choose level `1` (Lite) ([chapter 1](01-setup.md#1-create-the-project)).

**It does:** sets up the kit with `dev` and `staging`, writes the Lite level in `CLAUDE.md`, creates the Lead's worktree and writes `START-HERE.md` with the Lite steps. The Lead's `/setup` creates the PO's and Dev1's worktrees.

## 2. Foundation

Two approvals, both with `/next` ([chapter 3](03-foundation.md)). The PO pictures the project (G1 and G2): a one-page proposal and grey screen sketches you approve, then the PRD, the stories and the functional part of the SRS, written without asking you again. From G3 on you work with the Lead: one solution design with the look and feel you approve, then the ADRs, the SRS baseline, Docker and CI and milestone v0.1.0 with its tasks.

## 3. Build and release

**Ask:** `/build` in the Lead plans the milestone and gives you Dev1's prompt. In Dev1, `/build try #<n>` to see it running before tests, `/build done #<n>` when the task is finished; the Lead reviews and merges. Then `/release demo` or `/release` in the Lead.

**Claude does:** merges `dev` into `staging`; Dev1 runs the regression there; the PO tries every acceptance criterion on `staging` and opens a defect for each failure; the Lead sends you 3-5 of those scenarios; after you confirm them, the PO writes the handover for the client and the Lead runs `scripts/release.mjs` and sends the summary; after your approval it merges the accepted `staging` commit into `main` and tags it, with no new tests.

**Claude asks before:** pushing `main` and the tag.

## Move up or down

| From → to | When |
|---|---|
| Lite → Full | Money, security or personal data comes in, someone signs off each release, or the work needs its own Test, UI/UX or DevOps session |
| Full → Lite | The stakes dropped: nobody signs off each release any more, or the product is parked |

**Ask the Lead:**
> Move this project to `<lite or full>`.

**Claude asks you:** going up, which roles to add now and which missing Foundation documents matter for this product.

**Claude does:** runs `node scripts/set-level.mjs <level>` from its own worktree, then:
- Up: creates any missing branch and the new worktrees and drafts the missing documents.
- Down: deletes nothing; documents, branches, worktrees and history stay. It lists the sessions you can close; Dev1 takes over the Test work.

Either way `CLAUDE.md`, `.claude/project.json` and `START-HERE.md` are updated and committed.

**Claude asks before:** pushing a new branch.

> **Token tip:** compact each session after each gate or milestone, and open Test, UI/UX or DevOps only when the Lead proposes them for real work.

Next: [Chapter 9: Token budget](09-token-budget.md).
