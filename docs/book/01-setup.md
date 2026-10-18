# Chapter 1: Setup

**Purpose:** go from an empty folder to a project with the kit installed, GitHub ready and the first role sessions open.

## You do this yourself (once)

These involve your machine, accounts or secrets:
- Install the Claude Code desktop app, Git, Node.js 20+, the GitHub CLI (`gh`), Docker and, for front-end products, pnpm. Docker is required: `kit/init.mjs` stops if `docker` or `docker compose` is missing, and warns if Docker is installed but not running. Check with `docker compose version`.
- Clone the playbook: `git clone https://github.com/liquizzz/ai-delivery-playbook.git`.
- Sign in to GitHub in a terminal: `gh auth login`, then `gh auth refresh -s project`.
- Install the minimum Claude Code plugins, once per machine, by typing these in any Claude Code session:

| Plugin | Why the playbook needs it | Install |
|---|---|---|
| superpowers | Planning, test-first work, debugging and checking before saying "done" | `/plugin install superpowers@claude-plugins-official` |
| code-review | The Lead's PR reviews, and the fallback when Codex is unavailable | `/plugin install code-review@claude-plugins-official` |
| github | Issues, PRs and the board from inside a session | `/plugin install github@claude-plugins-official` |
| claude-mem | Memory across sessions, so a restarted session finds its context | `/plugin marketplace add thedotmack/claude-mem` then `/plugin install claude-mem@thedotmack` |
| context7 | Current library documentation for Dev sessions | `/plugin install context7@claude-plugins-official` |

Then run `/reload-plugins`. Plugins for specific roles or projects (UI/UX, Figma, Codex review…) are listed in [Appendix B](appendix-b-kit.md#plugins). Every plugin adds to each session's context, so install only what the project uses ([chapter 9](09-token-budget.md)).

## 1. Create the project

**What it does:** installs the kit (shared `CLAUDE.md`, role files, guard hook, issue forms, workflows, scripts, Docker files), creates the docs folders, the branches and the role worktrees your level needs, optionally creates the GitHub repo, and writes `START-HERE.md`: your next steps as prompts to paste.

**You run,** in a terminal, from the folder where your projects live:
```
node <path to playbook>/kit/init.mjs
```

**It asks you** (Enter takes the suggestion):
1. Project name.
2. Folder (suggested from the name).
3. Level: `starter`, `lite` or `full` ([chapter 0](00-introduction.md#choose-the-level-of-process)). You can change it later.
4. One-line description (optional).
5. Create the GitHub repo now: `private` (suggested, as `<you>/<name>`), `public` or `none`.

**It does:** creates `main` and `dev` (and `staging` for the full process), commits the kit, creates the worktrees (Starter: lead; Lite: po, lead, dev1; Full: po, lead) in `<projects>/<project>-wt/<role>/`; if you chose a repo, creates it, pushes the branches and creates the labels.

**You check:** the report, then open `START-HERE.md` in the project.

For scripts or CI: `node init.mjs <folder> --name "<name>" --level starter --github none --yes` asks nothing.

## 2. Finish the setup

**What it does:** fits `CLAUDE.md`, the guard paths and the Docker files to your stack, and creates the board and first milestones on GitHub.

**Ask:** open a Claude Code session in the `lead` worktree, titled `<Project> - Lead`, and say:
> Read CLAUDE.md and continue as lead. Finish the setup: ask me the stack and commands, then fill in CLAUDE.md and the Docker files, and create the board and the first milestones on GitHub.

**Claude asks you:**
1. Stack (languages, frameworks, database).
2. Front-end product with a design prototype? (keeps or removes the design pipeline)
3. Folder layout if not `app/`, `tests/`, `design/` (sets the paths each role may edit).
4. Project hard rules (client data, read-only sources, compliance).
5. Install, run, test and lint commands, if they exist yet.
6. Names of the first milestones (proposed: `v0.1.0`, `v0.2.0`). If init created no repo: repo owner and name, private or public.

**Claude does:**
- fills in `CLAUDE.md`; writes `.claude/ownership.json` if your folders differ; removes workflows you do not need;
- creates the repo if init did not, runs `scripts/setup-labels.mjs`, creates the GitHub Project (columns Backlog · Approved · Ready · In progress · In review · Testing · Done; fields Role, Module, Level, Priority) and the milestones;
- runs the guard and release tests; commits on `role/lead` and merges into `dev`.

**You check:** the report (tests pass), `CLAUDE.md` and the board on GitHub.

**Claude asks before:** creating the repo, pushing `main`.

## 3. Open the other sessions

**What it does:** gives each role its own session in the worktree init created.

**You do:** open a new Claude Code session in each worktree folder (Lite: po and dev1; Full: po), titled `<Project> - <Role>`, and say:
> Read CLAUDE.md and continue as po.

**You check:** each session answers with its role, current state and next step. From now on you work through the PO (Starter: through the one Lead session).

## Change the level later

**You run,** in the project: `node scripts/set-level.mjs <starter|lite|full>`. Going up creates the branches and worktrees the level needs; going down deletes nothing and lists the sessions you can close. Then ask the Lead to commit it and, when going up, "Draft what this level still lacks." ([chapter 8](08-lite-mode.md#move-up-or-down)).

## 4. Run it with Docker

**What it does:** makes every part of the product run in Docker, on your machine and anywhere else you choose. The kit installs `docker-compose.yml`, `docker/design.Dockerfile` and `docker/app.Dockerfile`; the `image-design` and `image-app` workflows build images into GitHub's container registry (`ghcr.io`).

**Ask the Lead:**
> Fit the Docker setup to our stack and check that it runs. Ask me what you need first.

**Claude asks you:**
1. Which services the product needs (web app, API, database, worker).
2. Build and start commands for each.
3. Environment variables each service needs (names only).

**Claude does:** adapts `docker-compose.yml` and the Dockerfiles, replaces `<owner>` and `<project>`, runs `docker compose up --build` and checks each service starts, writes the variable names in `docs/tech/ops/`.

**You do:** fill in `.env.local` with real values.

**You check:** `docker compose up` starts the product on your machine.

Deploying the images to servers is not covered by this book. You need your own plan for where they run; the release chapter gives you a versioned image for each release and the commands to run or roll back a version ([chapter 5](05-releases.md)).

## Optional: a second-opinion reviewer

**You do:** in any session, install the Codex plugin once per machine:
```
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```
It uses your ChatGPT login and Codex limits; Claude's `/code-review` is the fallback. Usage: chapter 2.

> **Token tip:** close the setup session as soon as PO and Lead are open; open other roles only when their first task is Ready.

Next: [Chapter 2: The team](02-the-team.md).
