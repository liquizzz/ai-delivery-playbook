# Chapter 8: Lite mode

**Purpose:** run the same process with less ceremony, then move up to Full, or back, without redoing anything. Lite is the starting level: three sessions you direct like a small team.

| Area | Full process | Lite mode |
|---|---|---|
| Sessions | PO, Lead, one Dev, and Test, UI/UX or DevOps when needed (a second Dev when two tasks can run in parallel) | PO, Lead, one Dev |
| Branches | `role/*` → `dev` → `staging` → `main` → `production` | `role/*` → `dev` → `main` |
| Review | Lead reviews every PR | Lead reviews every PR |
| Foundation | Proposal, PRD, data notes, stories, then design, stack, SRS, ADRs, C4, test strategy, eval plan | One-page proposal, short PRD with stories, then design, stack, SRS, ADRs only for real choices |
| Design | UI/UX session at G3 | The Lead runs the look and feel and shows the main screens at G3 |
| Milestones | Buffer and risk table | One milestone; one-line buffer and risk |
| Reports | Morning brief and end of day | Morning brief |
| Testing | L0-L3 with a Test session; regression on staging | L0-L3 by the Dev and CI |
| Release check | Regression and your acceptance | Your acceptance |
| Always kept | | Setup first, gate issues, CR issues, labels, SRS and its revisions, level confirmation, SemVer tags, `role-guard`, hand-off prompts |

There is no single-session level. One session playing every role feels simpler but runs slower, because nothing happens in parallel, and it hides the hand-offs that show you where work stands. With three sessions you direct them like a small team: you hand work over, you see it come back, you approve at the gates.

## 1. Start

**You run:** `node crewbook-build/kit/init.mjs` and choose level `1` (Lite) ([chapter 1](01-setup.md#1-create-the-project)).

**It does:** sets up the kit without `staging`, writes the Lite level in `CLAUDE.md`, creates the Lead's worktree and writes `START-HERE.md` with the Lite steps. The Lead's `/setup` creates the PO's and Dev1's worktrees.

## 2. Foundation

The PO runs G1 and G2 with `/brief`; the Lead runs G3 with `/brief`: design first (the look and feel and the main screens, which you approve), then the stack, then the SRS and milestone v0.1.0 ([chapter 3](03-foundation.md)).

## 3. Build and release

**Ask:** `/build` in the Lead plans the milestone and gives you Dev1's prompt. In Dev1, `/build dev #<n>` to see it running before tests, `/build done #<n>` when the task is finished; the Lead reviews and merges. Then `/release demo` or `/release` in the Lead.

**Claude does:** checks the main journey; sends you the acceptance scenarios; after you confirm them, runs `scripts/release.mjs` and sends the summary; after your approval merges `dev` into `main` and tags it.

**Claude asks before:** pushing `main` and the tag.

## Move up or down

| From → to | When |
|---|---|
| Lite → Full | Money, security or personal data comes in, someone signs off each release, or releases need a staging check |
| Full → Lite | The stakes dropped: nobody signs off each release any more, or the product is parked |

**Ask the Lead:**
> Move this project to `<lite or full>`.

**Claude asks you:** going up, which roles to add now and which missing Foundation documents matter for this product.

**Claude does:** runs `node scripts/set-level.mjs <level>` from its own worktree, then:
- Up: creates the new branches (`staging` for Full) and worktrees and drafts the missing documents.
- Down: deletes nothing; documents, branches, worktrees and history stay. It lists the sessions you can close, and releases go from `dev` to `main`.

Either way `CLAUDE.md`, `.claude/project.json` and `START-HERE.md` are updated and committed.

**Claude asks before:** pushing a new `staging` branch.

> **Token tip:** compact each session after each gate or milestone, and open Test, UI/UX or DevOps only when the Lead proposes them for real work.

Next: [Chapter 9: Token budget](09-token-budget.md).
