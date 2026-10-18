# Running a project as an AI agent team

How one owner runs a project with a team of Claude Code sessions: who does what, how work moves, how code reaches production, and how nothing is lost when a session restarts. Read with [process.md](process.md). The files to copy into a project are in [kit/](../kit/).

## 1. Roles

Each role is a separate Claude Code desktop session titled `<Project> - <Role>` (no sub-agents: the owner talks to each session directly, approves inside it, and sessions run for a long time). Work flows **owner ↔ PO → Lead → team**.

| Role | Reports to | Main work | Always open? |
|---|---|---|---|
| **PO** (Product Owner) | Owner | Decides plan, priority and business logic with the owner; writes CRs and DECs; runs milestones; morning brief; contact point for UI/UX | Yes |
| **Lead** | PO | Turns CRs into SRS, spec and ADRs; creates and assigns tasks; reviews and merges; releases; does small DevOps work | Yes |
| **Dev** (Dev1, Dev2) | Lead | Builds tasks with unit tests | At least one |
| **Test** | Lead | Test cases, change-level testing, regression, defects | When there is testing to do |
| **UI/UX** | PO (Lead coordinates hand-off to Dev) | Prototype in `design/`, design tokens; never writes product code | Always for front-end projects, in rounds otherwise |
| **DevOps** | Lead | CI/CD, hosting, scripts | For larger infrastructure work |

The **minimum team** is PO + Lead + one Dev. Other roles open when their work starts. Each role has a role file in `.claude/roles/<role>.md` ([kit/.claude/roles/](../kit/.claude/roles/)): mission, inputs and outputs, what it owns, what it must not do, when to stop and ask, daily rhythm, recovery and compaction notes.

### Who owns which paths

| Role | Writes | Pushes |
|---|---|---|
| PO | `docs/product/`, `docs/reports/` | `role/po` |
| Lead | `docs/tech/` (except Test and DevOps folders), `docs/releases/`, `CHANGELOG.md`, `CLAUDE.md`, `.github/` templates, `docs/ai-log.md`; merges every branch | Every branch (`main`, `production`, tags and releases need the owner's approval) |
| Dev | `app/` (or the project's source folders), unit tests | `role/dev1`, `role/dev2` |
| Test | `tests/` (integration, end-to-end), `docs/tech/test-cases/`, `docs/tech/test-reports/` | `role/test` |
| UI/UX | `design/`, `packages/tokens/` | `role/uiux` |
| DevOps | `.github/workflows/`, `infra/`, `scripts/`, `docs/tech/ops/` | `role/devops` |

Everything else is read-only for the role. A role that needs a change outside its paths asks through an issue.

## 2. Git

### Branches

| Branch | Purpose | Who moves it |
|---|---|---|
| `role/<role>` | One working branch per role, in its own worktree | That role |
| `dev` | Daily integration; every PR lands here | Lead |
| `staging` | Release candidate of the running milestone; regression; client demo of the product | Lead |
| `main` | Released versions; every merge is tagged `vX.Y.Z` | Lead, after the owner approves the release |
| `production` | What runs live; points at a tag on `main` (exists from go-live) | Lead, after the owner approves the deployment |
| `hotfix/*` | Urgent fix from `production` | Lead |

- **One worktree per role.** Sessions never share a folder (a shared checkout once lost uncommitted work). Layout: `<projects>/<project>/` is the main checkout; `<projects>/<project>-wt/<role>/` holds each role's worktree. Create one with `node scripts/new-role-worktree.mjs <role>`.
- Roles update their branch from `dev` with **merge, never rebase**. No force push on `dev`, `staging` or `main`.

### Task flow
1. The role commits often (no uncommitted work overnight), with messages like `feat(auth): add Google sign-in (#42)` (types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`).
2. When done it pushes `role/<role>`, opens a PR into `dev` from the template with `Closes #42`, waits for CI, and sends the Lead the PR link.
3. The Lead reviews and **squash-merges** into `dev`. The issue closes and the board moves the card to Done.

### Guardrails
Two layers, both in the kit:
- **Hook `role-guard.cjs`** ([kit/.claude/hooks/](../kit/.claude/hooks/)), registered in the shared `.claude/settings.json` as a `PreToolUse` hook for Bash, PowerShell and file edits. It reads the role from `.claude/role` in the worktree (one word, written by `new-role-worktree`, not committed) and:
  - **blocks** pushing any branch other than `role/<own role>` (Lead excepted), force pushes to `dev`/`staging`/`main`, `--no-verify`, PR merges, releases and workflow runs by anyone but the Lead, `gh secret`, edits outside the role's paths (defaults in the hook, per-project override in `.claude/ownership.json`) and edits to real `.env` files;
  - **asks the owner** (an approval prompt) before the Lead pushes `main` or `production`, pushes tags, creates a GitHub release or runs a workflow (production deploy, rollback). The Lead therefore releases with `git merge` and `git push`, not with `gh pr merge` into `main`.
- **Shared permissions** in `.claude/settings.json`: common read-only and commit commands allowed; reading `.env` files, `gh secret`, `rebase`, `reset --hard` and `stash` denied.

The role logic lives in the hook, not in per-worktree `settings.local.json`, because Claude Code may save approvals from any worktree into the main checkout's local settings. These guardrails stop common mistakes; they are not a security boundary. The role files are the other layer. The secret-check git hook ([kit/hooks/pre-commit](../kit/hooks/pre-commit)) still runs on every commit. Hook tests: `node .claude/hooks/role-guard.test.cjs`.

## 3. Tracking work on GitHub

- **Issues:** a CR is a parent issue; tasks are its sub-issues; defects and design work are their own issues. Templates in [kit/.github/ISSUE_TEMPLATE/](../kit/.github/ISSUE_TEMPLATE/) (CR, Task, Defect, Design) and the PR template.
- **Labels** (created by `scripts/setup-labels`): `cr` · `type:feature` · `type:change` · `type:fix` · `breaking` · `L0`–`L3` · `role:dev` · `role:test` · `role:uiux` · `role:devops` · `defect` with `sev:high` / `sev:medium` / `sev:low` · `blocked` · `needs-owner` · `codex-review` · `claude-review`.
- **Board** (GitHub Projects): Backlog → Approved → Ready → In progress → In review → Testing → Done. Custom fields: role, module, change level, priority. Setup: [kit/github-setup.md](../kit/github-setup.md).
- **Milestones:** one GitHub milestone per version.
- Sessions use the `gh` CLI (the owner runs `gh auth refresh -s project` once).

### CR flow
1. The owner discusses a request with the PO.
2. The PO opens a CR issue from the template, with `type:*` (and `breaking` from 1.0.0), priority and milestone.
3. L0–L1 CRs that fit in the buffer: the PO approves. L2–L3 CRs or scope changes: the PO labels `needs-owner` and puts them in the morning brief; the owner decides.
4. Approved: the PO moves the issue to **Approved**, exports it to `docs/product/cr/CR-<n>.md`, pushes, and sends the Lead the link.
5. The Lead updates the SRS and writes the spec, merges both into `dev`, then creates task sub-issues and moves them to **Ready**.

## 4. Definition of Ready and Done

**Ready (before the Lead assigns a task)**
1. The CR is approved (PO, plus the owner for L2–L3), labelled `type:*`, in the running milestone.
2. The SRS and the spec are updated and merged into `dev`.
3. The issue has acceptance criteria (linked to `FR-xxx`), change level, module, assignee, estimate and confidence.
4. Nothing blocks it: dependencies done, accounts, data and secrets available.
5. The assignee has no other task in progress.

*Design fast lane* (changes only in `design/`): a description and an assignee are enough, unless the design changes business logic.

**Done (task)**
1. Committed and pushed to the role branch; unit tests and build pass locally.
2. PR with `Closes #n` opened by the role; reviewed by the Lead.
3. Tests pass for the change level; CI is green.
4. The SRS matches the behaviour; `CHANGELOG.md` "Unreleased" updated.
5. Squash-merged into `dev`; the issue is closed.

**Done (milestone, before the release gate)**
1. Every issue is Done or moved to the next milestone with a note.
2. `dev` merged into `staging`; full regression passes; no open high or medium defects.
3. `release` has run: version computed, `CHANGELOG.md` and SRS Revision History finalised.
4. The release summary is ready (version, bump, CRs, defects, SRS sections, test result, risks, buffer used).
5. Owner approves the release → `main` + tag; owner approves the deployment → `production` (from 1.0.0).

## 5. Work in progress and review

- Each team member has **one task in progress**.
- **Review is the Lead's first priority:** with two or more PRs waiting, the Lead stops other work and reviews; no PR waits more than half a day.
- CRs waiting for a spec are not limited, but only CRs in the running milestone are worked on. Defects are assigned the same day.
- The end-of-day report shows PRs waiting (count, oldest in hours). A Lead often overloaded is a signal to drop a Dev or split out a Reviewer role.

### Extra AI review (optional, chosen by the owner)
- The Lead **proposes** an independent review (labels `codex-review` or `claude-review`) for L3 PRs, anything touching money, security or user data, and before a release. It never runs one on its own.
- When the owner asks, the Lead runs `/codex:review` or `/codex:adversarial-review` ([openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc), uses the owner's ChatGPT plan) or Claude's `/code-review`, posts the result on the PR, and answers each finding (fixed or rejected with a reason).
- If Codex is out of quota, the Lead says so and the owner chooses to skip it or use Claude instead. A missing extra review never blocks a PR.

## 6. Testing by change level

| Level | What changes | Examples | Dev before the PR | Test after merge into `dev` |
|---|---|---|---|---|
| **L0** Display | Look, text, layout; no data or logic; anything only in `design/` | Button colour, typo, spacing | Build and lint; check locally | Covered by the milestone regression |
| **L1** Setting | Defaults, names, configuration, messages; same logic | Page size 10 → 20 | + Unit tests for the change | Check the changed spot |
| **L2** Module logic | New or changed business logic inside one module | New category filter | + Unit tests for the logic; main scenario locally | Module scenarios (by `FR-xxx`) |
| **L3** Core | Shared code, data, auth, **money, security, user data, deletes**, or several modules | Schema change, permissions, position sizing | + Integration tests and edge cases | Core scenarios, related modules, part of the regression |

- The Lead sets the level when creating the task. A Dev may ask to raise it, never lower it. When in doubt, pick the higher level.
- **Full regression** runs on `staging` before every release, on the affected area plus core scenarios before a hotfix, and whenever the owner asks.
- Test cases are written per `FR-xxx` in `docs/tech/test-cases/` and linked from the SRS traceability matrix. Repeated cases are automated over time (Playwright, backtests) and run in CI.
- Without a Test session: L0–L1 rely on the Dev and CI; for L2–L3 the Lead opens a Test session or tests by script and says so in the report.

## 7. Continuity: nothing lives only in a session

### Sources of truth
| Source | Holds |
|---|---|
| GitHub issues and their comments | Assigned work, progress, hand-offs, small decisions |
| Repo documents | Requirements, design, history (SRS, spec, CR, DEC, ADR, reports) |
| Git | Code |
| Messages between sessions | **Notifications only**, with a link; never the only copy of anything |

**Decided means written:** a decision goes into the CR, issue, DEC or ADR the moment it is made.

### Hand-off note (a comment on the issue)
```
## Hand-off: <from role> → <to role>
- Task: #42 <title>
- Status: Done / Needs changes / Blocked
- Commit: role/dev1 @ a1b2c3d
- Level: L2 · Module: auth
- Done: …
- Next for the receiver: …
- Notes / risks: …
```

### Restarting a session
Open with **"Read CLAUDE.md and continue as <Role>."** The session then:
1. Reads `CLAUDE.md` and its role file.
2. Runs `git status` and `git log -5` in its worktree.
3. Lists its issues (`gh issue list`) and reads the last comment on each.
4. PO and Lead also read the latest daily report and the milestone file.
5. Reports in three lines: working on · where it stands · next step.

Team members comment on their issue at each milestone point (started, major part done, blocked, done). Before assigning, the Lead checks that the receiving session is running; if not, it still assigns the issue and asks the owner to open the session.

### Compacting context
- Compact after a task or a hand-off, not in the middle of a fix. Because decisions are already written, compacting then loses nothing important.
- `CLAUDE.md` carries compact instructions (keep role, current issue, branch and last commit, decisions and reasons, items waiting for the owner, open risks; drop long command output and files already read), so a plain `/compact` is enough.
- To drop a side discussion only, use rewind with "Summarize from here".

## 8. Machines and local setup

- **One main machine runs the team** (all sessions and worktrees of a project). A second machine follows and approves: it reads reports and PRs on GitHub and drives the main machine's sessions remotely; it never opens a session for a role that is already running.
- To move the team to another machine: every role pushes, then on the new machine clone, run `new-role-worktree` per role, and open each session with the restart sentence.
- **Local ports** per role, set in each worktree's `.env.local` (created from `.env.example`): UI/UX 5100 · Dev1 5201 · Dev2 5202 · Test 5300. Use **pnpm** so worktrees share one package store. `.env*` files are never committed; the owner fills in real values.

## 9. Front-end projects

- **One repo, pnpm workspace:** `design/` (UI/UX prototype, Tailwind built with pnpm), `packages/tokens/` (shared design tokens; Tailwind v4 `@theme` in CSS), `app/` (product code). `node_modules/` and build output are not committed; the lockfile is.
- **Pipelines are split by folder, not by branch:**

| Workflow | Trigger | Result |
|---|---|---|
| `ci` | PR, push to `dev` | Lint, type check, unit tests, build |
| `docs-check` | PR with a `type:*` label | Warns when the SRS or `CHANGELOG.md` is untouched |
| `deploy-design` | Push to **`dev`** touching `design/**` or `packages/tokens/**` | "Staging design" link for the client |
| `deploy-staging` | Push to `staging` touching `app/**` or `packages/tokens/**` | Staging product |
| `deploy-production` | Push to `production`; manual run with a tag for rollback | Production (off until 1.0.0) |

- Design runs from `dev` so the client sees new design rounds at once without pulling unfinished product code onto `staging`. PRs that touch only `design/` take the **fast lane** (L0, quick Lead look, no Test). Token changes do not.
- Client links are protected (e.g. Cloudflare Access). When the design is approved, tag `design-vN` and pause `deploy-design`.
- Secrets are entered by the owner in GitHub Secrets; DevOps lists their names in `docs/tech/ops/`, never their values.
