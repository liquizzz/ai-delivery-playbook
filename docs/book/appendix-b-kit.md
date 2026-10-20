# Appendix B: Kit reference

**Purpose:** what `kit/init.mjs` installs in a project, what each part does, and how to change it with Claude.

| Path in the project | What it does |
|---|---|
| `CLAUDE.md` | Shared rules every session reads: roles, your gates, "the owner leads", Open decisions, build modes, git rules, compact instructions |
| `.claude/roles/<role>.md` | One file per role: mission, inputs and outputs, paths, must-nots, when to ask, daily rhythm, recovery |
| `.claude/role` (per worktree, not committed) | The worktree's role name, read by the hook |
| `.claude/hooks/role-guard.cjs` | Blocks or asks before risky commands and edits, per role (chapter 2). It also sees through wrappers and nested shells (`rtk git push`, `env … git push`, `bash -c "git push …"`, `powershell -Command "…"`) and refuses encoded PowerShell |
| `.claude/hooks/role-guard.test.cjs` | 80 test cases for the hook, including wrapped and nested commands |
| `.claude/hooks/session-start.cjs` | Runs when a session starts, resumes or is compacted: tells Claude its role, its role's skills, and to ask you in rounds, so you never type it |
| `.claude/ownership.json` (optional) | Overrides which paths each role may edit |
| `.claude/settings.json` | Registers the hook; shared allow and deny rules; the minimum plugin set |
| `.claude/commands/` | The steps as slash commands, so the owner types a word and the session follows the full prompt ([Commands](#commands)). Each reads the level from `.claude/project.json` |
| `.github/ISSUE_TEMPLATE/` | Issue forms: CR, Task, Defect, Design |
| `.github/pull_request_template.md` | PR checklist by change level, L3 safety checks, hand-off |
| `.github/workflows/` | `ci` (builds the app image until setup adds the stack's lint and tests), `docs-check`, `codeql` (public repos, once setup sets `CODEQL_LANGUAGES`), `image-app` (each release tag also gets an SBOM and, on public repos, a provenance attestation), and `image-design` with a design prototype only: checks on every PR, Docker images built into `ghcr.io` |
| `.github/dependabot.yml` | Security fixes only, one grouped PR per ecosystem, no version-bump PRs; setup adds the stack's ecosystem. Standards behind these checks: [Appendix E](appendix-e-standards.md) |
| `docs/templates/` | The document templates (proposal, PRD, SRS, CR, ADR, test cases, release checklist…), so every session fills in the same structure |
| `docker-compose.yml`, `docker/*.Dockerfile`, `.dockerignore` | Runs every part in Docker; examples for a pnpm workspace, adapted to your stack in chapter 1, step 4 |
| `START-HERE.md` | The owner's steps for the project's level, as commands to type; rewritten by `set-level.mjs` |
| `.claude/project.json`, `.claude/start-here/` | The project's name, level and repo; the `START-HERE.md` template for each level |
| `scripts/set-level.mjs` | Changes the level (lite, full) up or down: branches, worktrees, `CLAUDE.md`, `START-HERE.md`; deletes nothing |
| `scripts/set-secret.mjs` | The owner sets one secret: hidden input, written to the git-ignored `.env.local` of every checkout; new worktrees copy it |
| `scripts/project-level.mjs` | What each level needs; shared by `init.mjs` and `set-level.mjs` |
| `scripts/new-role-worktree.mjs` | Creates a role's worktree, branch, role file and local port |
| `scripts/setup-labels.mjs` | Creates the labels |
| `scripts/setup-board.mjs` | Creates the kanban board: a GitHub Project linked to the repo, with columns Backlog · Approved · Ready · In progress · In review · Testing (used at Full) · Done and fields Role, Module, Level, Priority |
| `scripts/crew-settings.mjs` | Settings shared by every session, kept in the repo's git folder (nothing to commit): messages on or off, and the hand-off tips, shown three times at most |
| `scripts/board-status.mjs` | Moves an issue, or a PR with no task issue, to a board column (`node scripts/board-status.mjs 12 "In progress"`); the commands call it as work moves |
| `scripts/release.mjs` | Computes the version from labels; updates `CHANGELOG.md` and the SRS (either line ending) |
| `scripts/release.test.mjs` | Tests the release script without GitHub |
| `.git/hooks/pre-commit` | Blocks commits with `.env` files or credential-like values |

## Commands

| Command | What it does |
|---|---|
| `/setup` | First step: constraints, `CLAUDE.md`, gate issues, milestone, the team's worktrees |
| `/next <idea>` | The next foundation step up to its gate; G3 is design, then stack, then SRS |
| `/build try` | Quick: no tests, no merge |
| `/build done` | Tests at the task's level, then a PR the Lead merges |
| `/release demo` | Full checks, no tag |
| `/release [version]` | A tagged version and its image |
| `/change <request>` | A CR with its level and SRS update |
| `/progress` | Live state in ten lines |
| `/gate G1`…`G6` | Checks a gate against the repo and GitHub |
| `/send` | Sends the prompt of the last hand-off block to the session it names |
| `/relay on` / `/relay off` | Sessions pass prompts to each other by themselves, or stop; shared by every session |

## Plugins

The kit's `.claude/settings.json` declares the minimum set, so Claude Code offers to install it when a session opens the project and every role uses the same plugins.

| Plugin | Marketplace (`/plugin marketplace add …`) | Who uses it | Level |
|---|---|---|---|
| superpowers | `anthropics/claude-plugins-official` (built in) | All roles | Required |
| code-review | built in | Lead | Required |
| claude-mem | `thedotmack/claude-mem` | All roles | Required |
| context7 | built in | Dev, Lead, DevOps | Required |
| frontend-design | built in | UI/UX, Dev on front ends | Products with screens (setup enables it) |
| ui-ux-pro-max | `nextlevelbuilder/ui-ux-pro-max-skill` | UI/UX; the Lead at Lite | Products with screens (setup enables it) |
| figma | `anthropics/knowledge-work-plugins` | UI/UX | Only if the design lives in Figma |
| codex | `openai/codex-plugin-cc` | Lead | Optional: independent review (chapter 2) |
| product-management | `anthropics/knowledge-work-plugins` | PO | Optional: `write-spec`, `competitive-brief` and `stakeholder-update` for a PO who wants them; adds about 850 tokens and several connectors to each session |
| humanizer | `blader/humanizer` | Every role that writes documents | Only with polished documents (init question 6) |

### Skills by task

The kit's `CLAUDE.md` has a Skills table, and each role file names its own skills, so you never choose one. In short: interviews use `superpowers:brainstorming`; the PRD and stories follow the templates; milestone planning uses `superpowers:writing-plans`; L2-L3 code uses `superpowers:test-driven-development`; failures use `superpowers:systematic-debugging`; every "done", PR, merge and release passes `superpowers:verification-before-completion`; the Lead reviews with `code-review`, adding `security-review` for L3; the look-and-feel options come from `ui-ux-pro-max` and screens are built with `frontend-design`; with polished documents, every document gets a `humanizer` pass. The superpowers skills for worktrees, branch finishing and subagents are not used, because the kit's own worktrees and merge rules replace them.

Install a plugin with `/plugin install <name>@<marketplace>`, then `/reload-plugins`. Each plugin adds its skill list to every session's context, and claude-mem also adds context at each session start, so leave out what the project does not use. To see what a plugin costs, run `claude plugin details <plugin>` in a terminal: it lists the plugin's skills, agents and hooks and its projected token cost per session (the Codex plugin, for example, adds about 450 tokens). To add a project-specific plugin for the whole team, ask the Lead: "Add `<plugin>` to the project's plugin list."

## Change the kit for one project

**Ask the Lead:**
> `<what you want to change>`, e.g. "Dev also owns the `db/` folder" or "Allow the Test role to run the e2e workflow".

**Claude asks you:** which roles it affects and whether the change should go back to Crewbook: Build too.

**Claude does:** edits `.claude/ownership.json`, the role file or the hook; runs the hook tests and adds a case for the change; commits.

**Claude asks before:** nothing, unless the change touches a gate (pushing `main`, releases), which it will not loosen without you saying so explicitly.

## Docker for another stack

**What it does:** replaces the example Dockerfiles with ones for your stack (API server, database, worker, another language) while keeping one image per part and the per-folder builds.

**Ask the Lead** (or DevOps):
> Our stack is `<stack>`. Rewrite the Docker setup and image workflows for it, keeping one image per part and builds only when that part changes.

**Claude asks you:**
1. The services and how they talk to each other.
2. Build, test and migration commands; how the database is migrated and backed up.
3. Environment variables each service needs (names only).
4. A health check URL or command for the smoke test.

**Claude does:** rewrites `docker-compose.yml`, `docker/` and the `image-*` workflows; writes run, migration and rollback commands and variable names in `docs/tech/ops/`; runs `docker compose up --build` and CI on a test PR.

**Claude asks before:** running any workflow by hand.

## Update a project to a newer kit

**Ask the Lead:**
> Update this project to the latest kit from `<path to crewbook-build>`. Show me what changes first.

**Claude does:** compares the project's kit files with Crewbook: Build, lists differences, keeps project-specific edits, applies the update after you agree, runs the tests.

## Licenses

Docs and templates: CC BY 4.0. Kit code: MIT ([kit/LICENSE](../../kit/LICENSE)). Keep the `SPDX-License-Identifier` line when you copy kit files.
