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

## 1. Set up the project

**What it does:** installs the kit (shared `CLAUDE.md`, role files, guard hook, issue forms, workflows, scripts, Docker files), creates the docs folders and the `dev` and `staging` branches, and fills in `CLAUDE.md` for your product.

**Ask:** open a Claude Code session in the new project folder, which becomes the main checkout, and say:
> Set up this folder as a project with the AI Delivery Playbook kit at `<path to playbook>`. Read `<path to playbook>/docs/book/01-setup.md` first. Before changing anything, ask me everything you need in one numbered list, with a proposed answer for each. Then do the whole setup and report.

**Claude asks you:**
1. Product name and one-paragraph description (who it is for, the success metric).
2. Stack (languages, frameworks, database).
3. Full process, Lite mode or Starter mode (chapter 8)?
4. Front-end product with a design prototype? (keeps or removes the design pipeline)
5. Folder layout if not `app/`, `tests/`, `design/` (sets the paths each role may edit).
6. Project hard rules (client data, read-only sources, compliance).
7. Install, run, test and lint commands, if they exist yet.

**Claude does:**
- runs `kit/init.mjs` on the folder;
- fills in `CLAUDE.md`; writes `.claude/ownership.json` if your folders differ; removes workflows you do not need;
- runs the guard and release tests;
- commits and reports what it created.

**You check:** the report (tests pass) and `CLAUDE.md`.

## 2. Connect GitHub

**What it does:** creates the repo, labels, board and first milestones.

**Ask in the same session:**
> Connect this project to GitHub: repo, branches, labels, board and the first two milestones. Ask me what you need first.

**Claude asks you:**
1. Repo owner and name; private or public?
2. Create the repo now with `gh`, or do you create it yourself?
3. Names of the first two milestones (proposed: `v0.1.0`, `v0.2.0`).

**Claude does:** creates or connects the repo, pushes `main`, `dev`, `staging`, runs `scripts/setup-labels.mjs`, creates the GitHub Project (columns Backlog · Approved · Ready · In progress · In review · Testing · Done; fields Role, Module, Level, Priority) and the milestones.

**You check:** the board on GitHub.

**Claude asks before:** creating the repo, pushing `main`.

## 3. Open the PO and Lead sessions

**What it does:** gives the PO and the Lead their own worktree and session.

**Ask in the same session:**
> Create the worktrees for po and lead.

**Claude does:** runs `scripts/new-role-worktree.mjs` for each; each worktree lands in `<projects>/<project>-wt/<role>/` on `role/<role>`.

**You do:** open a new Claude Code session in each worktree folder, titled `<Project> - PO` and `<Project> - Lead`, and say:
> Read CLAUDE.md and continue as po.

**You check:** each session answers with its role, current state and next step. Close the setup session; from now on you work through the PO.

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
