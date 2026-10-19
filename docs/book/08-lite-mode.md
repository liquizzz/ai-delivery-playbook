# Chapter 8: Starter and Lite modes

**Purpose:** run the same process with less ceremony, then move up without redoing anything. Starter mode uses one session for a first demo; Lite mode uses three for a small product.

| Area | Full process | Lite mode | Starter mode |
|---|---|---|---|
| Sessions | PO, Lead, one Dev, and Test, UI/UX or DevOps when needed (a second Dev only for owners who already manage several developers) | PO, Lead, one Dev | One session playing PO, Lead and Dev |
| Branches | `role/*` → `dev` → `staging` → `main` → `production` | `role/*` → `dev` → `main` | `role/lead` → `dev` → `main` |
| Review | Lead reviews every PR | Lead reviews every PR | No PRs: the session runs the tests locally, merges each task into `dev`, and closes it when CI on `dev` is green; you look at the demo |
| Foundation | Proposal, PRD, data notes, stories, SRS, ADRs, C4, test strategy, eval plan | One-page proposal, short PRD with stories, SRS, ADRs only for real choices | One brief (goal, stories with acceptance, out of scope, stack, v0.1.0 plan) and a one-page SRS; one approval passes G1-G3 |
| Milestones | Buffer and risk table | One milestone; one-line buffer and risk | One milestone at a time |
| Reports | Morning brief and end of day | Morning brief | None; ask "Where are we?" when you need it |
| Testing | L0-L3 with a Test session; regression on staging | L0-L3 by the Dev and CI | L0-L3 by the session; main journey before release |
| Release check | Regression + your acceptance | Your acceptance | Your acceptance |
| Always kept | | | CR issues, labels, SRS and its revisions, level confirmation, SemVer tags, `role-guard`, restart sentence |

## Starter mode

**What it does:** gets a first demo out fastest. One session does everything, but every change still goes through a CR, the SRS, tests by level, your acceptance and a version tag, so the demo can grow into a real product later.

**Use it for:** a first demo or a throw-away POC that only you use. Move to Lite as soon as other people use it, and to Full if a client, money, security or personal data is involved ([chapter 0](00-introduction.md#choose-the-level-of-process)).

### 1. Start

**You run:** `node <path to playbook>/kit/init.mjs` and choose level `starter` ([chapter 1](01-setup.md#1-create-the-project)).

**It does:** creates `main` and `dev` only (images build from `dev` and release tags), writes the Starter level in `CLAUDE.md`, creates only the `lead` worktree (the Lead's permissions cover all paths) and writes `START-HERE.md` with the Starter steps.

**You do:** open one session in the `lead` worktree and follow `START-HERE.md`. Its first command, `/setup`, finishes the setup (stack, Docker files, milestone).

### 2. Brief

**Ask:** `/brief <your idea in two or three sentences>`. It runs the same as saying:
> Start the Starter brief for `<your idea>`. Interview me one topic at a time, then write the brief, a one-page SRS and the v0.1.0 plan.

**Claude asks you,** one topic per round: who it is for and the problem, the success metric, the stories for v0.1.0, what is out of scope, data and deletes, then the look and feel: Claude searches styles, colours and fonts that suit the product and shows 2-3 directions in `docs/design/look-and-feel.html` for you to pick from.

**Claude does:** writes `docs/product/brief.md` from `docs/templates/brief.md`, a one-page `docs/tech/srs.md`, and milestone v0.1.0 with its tasks.

**You check:** each story has testable acceptance, the brief records the look you picked, and v0.1.0 is a day or two of work. Your approval passes G1-G3.

### 3. Build

**Ask:** `/build` (the same as "Build milestone v0.1.0.")

**Claude does:** opens the CR and its tasks, builds each task on `role/lead` with tests for its change level, commits with the issue number, runs the tests locally, merges into `dev`, and closes the issue when CI on `dev` is green. Later changes start with "I want …" ([chapter 4](04-delivery-loop.md)).

### 4. Release

**Ask:** `/release` (the same as "The milestone is done. Prepare the release and my acceptance test.")

**Claude does:** checks the main journey; writes 3-5 acceptance scenarios and the commands to start `dev` in Docker; after you confirm them, runs `scripts/release.mjs` and sends the summary; after your approval merges `dev` into `main` and tags it.

**Claude asks before:** pushing `main` and the tag.

## Lite mode

**What it does:** the full roles in miniature: a PO for your requests, a Lead who writes the SRS and reviews, one Dev who builds.

### 1. Start

**You run:** `node <path to playbook>/kit/init.mjs` and choose level `lite`.

**It does:** sets up the kit without `staging`; writes the Lite level in `CLAUDE.md`; creates the po, lead and dev1 worktrees; writes `START-HERE.md` with the Lite steps.

### 2. Release

**Ask the Lead:** `/release`

**Claude does:** checks the main journey; sends you the acceptance scenarios; after you confirm them, runs `scripts/release.mjs` and sends the summary; after your approval merges `dev` into `main` and tags it.

**Claude asks before:** pushing `main` and the tag.

## Move up or down

| From → to | When |
|---|---|
| Starter → Lite | Other people start using it |
| Starter or Lite → Full | A client, money, security or personal data comes in, or releases need a staging check |
| Full → Lite → Starter | The stakes dropped: the client left, the product is parked, or it is back to a demo |

**Ask the Lead:**
> Move this project to `<starter, lite or full>`.

**Claude asks you:** going up, which roles to add now and which missing Foundation documents matter for this product.

**Claude does:** runs `node scripts/set-level.mjs <level>`. Up: it creates the new branches (`staging` for Full) and worktrees; Claude splits a Starter brief into the proposal, PRD and stories, drafts the other missing documents and hands the PO role to a new PO session if there was none. Down: nothing is deleted; documents, branches, worktrees and history stay; it lists the sessions you can close and releases go from `dev` to `main`. Either way `CLAUDE.md`, `.claude/project.json` and `START-HERE.md` are updated and committed.

**Claude asks before:** pushing a new `staging` branch.

> **Token tip:** Starter is the cheapest path to a first demo (one session, no reports). Compact it after each milestone; it carries every role's context.

Next: [Chapter 9: Token budget](09-token-budget.md).
