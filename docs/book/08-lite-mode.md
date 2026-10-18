# Chapter 8: Starter and Lite modes

**Purpose:** run the same process with less ceremony, then move up without redoing anything. Starter mode uses one session for a first demo; Lite mode uses three for a small product.

| Area | Full process | Lite mode | Starter mode |
|---|---|---|---|
| Sessions | PO, Lead, Dev1-2, Test, UI/UX, DevOps | PO, Lead, one Dev | One session playing PO, Lead and Dev |
| Branches | `role/*` → `dev` → `staging` → `main` → `production` | `role/*` → `dev` → `main` | `role/lead` → `dev` → `main` |
| Review | Lead reviews every PR | Lead reviews every PR | No second reviewer; you look at the demo |
| Foundation | Proposal, PRD, data notes, stories, SRS, ADRs, C4, test strategy, eval plan | One-page proposal, short PRD with stories, SRS, ADRs only for real choices | Same as Lite |
| Milestones | Buffer and risk table | One milestone; one-line buffer and risk | One milestone at a time |
| Reports | Morning brief and end of day | Morning brief | None; ask "Where are we?" when you need it |
| Testing | L0-L3 with a Test session; regression on staging | L0-L3 by the Dev and CI | L0-L3 by the session; main journey before release |
| Release check | Regression + your acceptance | Your acceptance | Your acceptance |
| Always kept | | | CR issues, labels, SRS and its revisions, level confirmation, SemVer tags, `role-guard`, restart sentence |

## Starter mode

**What it does:** gets a first demo out fastest. One session does everything, but every change still goes through a CR, the SRS, tests by level, your acceptance and a version tag, so the demo can grow into a real product later.

**Use it for:** a first demo or a throw-away POC only. Move to Lite as soon as real users depend on it, a second developer is needed, or money, security or personal data is involved.

### 1. Start

**You run:** `node <path to playbook>/kit/init.mjs` and choose level `starter` ([chapter 1](01-setup.md#1-create-the-project)).

**It does:** creates `main` and `dev` only (images build from `dev` and release tags), writes the Starter level in `CLAUDE.md`, creates only the `lead` worktree (the Lead's permissions cover all paths) and writes `START-HERE.md` with the Starter steps.

**You do:** open one session in the `lead` worktree and follow `START-HERE.md`. Its first prompt finishes the setup (stack, Docker files, milestone).

### 2. Work

Use the same prompts as the rest of the book, all in the one session: proposal and PRD (chapter 3), "I want …" for changes (chapter 4). The session opens the CR, updates the SRS, builds on `role/lead`, confirms the level and tests, then merges into `dev` itself.

### 3. Release

**Ask:**
> The milestone is done. Prepare the release and my acceptance test (Starter mode).

**Claude does:** checks the main journey; writes 3-5 acceptance scenarios and tells you how to run the app (locally or a preview link); after you confirm them, runs `scripts/release.mjs` and sends the summary; after your approval merges `dev` into `main` and tags it.

**Claude asks before:** pushing `main` and the tag.

## Lite mode

**What it does:** the full roles in miniature: a PO for your requests, a Lead who writes the SRS and reviews, one Dev who builds.

### 1. Start

**You run:** `node <path to playbook>/kit/init.mjs` and choose level `lite`.

**It does:** sets up the kit without `staging`; writes the Lite level in `CLAUDE.md`; creates the po, lead and dev1 worktrees; writes `START-HERE.md` with the Lite steps.

### 2. Release

**Ask the Lead:**
> The milestone is done. Prepare the release and my acceptance test (Lite mode).

**Claude does:** checks the main journey; sends you the acceptance scenarios; after you confirm them, runs `scripts/release.mjs` and sends the summary; after your approval merges `dev` into `main` and tags it.

**Claude asks before:** pushing `main` and the tag.

## Move up or down

| From → to | When |
|---|---|
| Starter → Lite | Real users, a second developer, or money, security or personal data |
| Lite → Full | A client depends on it, releases need a staging check, or more roles are needed |
| Full → Lite → Starter | The stakes dropped: the client left, the product is parked, or it is back to a demo |

**Ask the Lead:**
> Move this project to `<starter, lite or full>`.

**Claude asks you:** going up, which roles to add now and which missing Foundation documents matter for this product.

**Claude does:** runs `node scripts/set-level.mjs <level>`. Up: it creates the new branches (`staging` for Full) and worktrees; Claude drafts the missing documents and hands the PO role to a new PO session if there was none. Down: nothing is deleted; documents, branches, worktrees and history stay; it lists the sessions you can close and releases go from `dev` to `main`. Either way `CLAUDE.md`, `.claude/project.json` and `START-HERE.md` are updated and committed.

**Claude asks before:** pushing a new `staging` branch.

> **Token tip:** Starter is the cheapest path to a first demo (one session, no reports). Compact it after each milestone; it carries every role's context.

Next: [Chapter 9: Token budget](09-token-budget.md).
