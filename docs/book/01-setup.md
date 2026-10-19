# Chapter 1: Setup

**Purpose:** go from an empty folder to a project with the kit installed, GitHub ready and the first role sessions open.

## You do this yourself (once)

These involve your machine, accounts or secrets:
- Install the Claude Code desktop app, Git, Node.js 20+, the GitHub CLI (`gh`), Docker and, for front-end products, pnpm. Docker is required: `kit/init.mjs` stops if `docker` or `docker compose` is missing, and warns if Docker is installed but not running. Check with `docker compose version`.
- Clone the playbook: `git clone https://github.com/liquizzz/ai-delivery-playbook.git`.
- Sign in to GitHub in a terminal: `gh auth login`, then `gh auth refresh -s project`.
- Install the Claude Code plugins the kit uses, once per machine, by typing these in any Claude Code session:

| Plugin | Why the playbook needs it | Install |
|---|---|---|
| superpowers | Planning, test-first work, debugging and checking before saying "done" | `/plugin install superpowers@claude-plugins-official` |
| code-review | The Lead's PR reviews, and the fallback when Codex is unavailable | `/plugin install code-review@claude-plugins-official` |
| github | Issues, PRs and the board from inside a session | `/plugin install github@claude-plugins-official` |
| claude-mem | Memory across sessions, so a restarted session finds its context | `/plugin marketplace add thedotmack/claude-mem` then `/plugin install claude-mem@thedotmack` |
| context7 | Current library documentation for Dev sessions | `/plugin install context7@claude-plugins-official` |
| humanizer | Every document the sessions write reads like a person wrote it | `/plugin marketplace add blader/humanizer` then `/plugin install humanizer@humanizer` |
| product-management | The PO's PRD, market and client-update skills | `/plugin marketplace add anthropics/knowledge-work-plugins` then `/plugin install product-management@knowledge-work-plugins` |
| frontend-design | Screens that look designed, in the look and feel you picked | `/plugin install frontend-design@claude-plugins-official` |
| ui-ux-pro-max | Searches styles, palettes and fonts for the look-and-feel options | `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` then `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill` |

Then run `/reload-plugins`. Plugins for specific projects (Figma, Codex review…) are listed in [Appendix B](appendix-b-kit.md#plugins). You do not pick skills: the kit's `CLAUDE.md` names the skill for each task, and every session uses it. Every plugin adds to each session's context, so install only what the project uses ([chapter 9](09-token-budget.md)).

## 1. Create the project

**What it does:** installs the kit (shared `CLAUDE.md`, role files, guard hook, issue forms, workflows, scripts, Docker files, document templates in `docs/templates/`), creates the docs folders, the branches and the role worktrees your level needs, optionally creates the GitHub repo, and writes `START-HERE.md`: your next steps as prompts to paste.

**You run,** in a terminal (the Claude Code Terminal panel opens in your home folder, so `cd` first), from the folder where your projects live:
```
node <path to playbook>/kit/init.mjs
```

**It asks you,** each question with a one-line hint (Enter takes the suggestion):
1. Project name.
2. Where to create the project (a new folder, suggested from the name).
3. Level: `starter`, `lite` or `full` ([chapter 0](00-introduction.md#choose-the-level-of-process)). You can change it later.
4. Your working language, and the language for documents if it is not English.
5. A separate design prototype the client reviews ([chapter 7](07-frontend-projects.md))? Suggested: no.
6. One-line description (optional).
7. Create the GitHub repo now: `private` (suggested, as `<you>/<name>`), `public` or `none`.

**It does:** creates `main` and `dev` (and `staging` for the full process), writes your language into `CLAUDE.md`, leaves out the design pipeline unless you asked for it, commits the kit, creates the worktrees (Starter: lead; Lite: po, lead, dev1; Full: po, lead) in `<projects>/<project>-wt/<role>/`; if you chose a repo, creates it, pushes the branches and creates the labels and the kanban board (`scripts/setup-board.mjs`).

**You check:** the report, then open `START-HERE.md` in the project. If init created a repo, open its Actions tab on GitHub: a new repo may show **Enable Actions on this repository**, and nothing runs until you click it.

For scripts or CI: `node init.mjs <folder> --name "<name>" --level starter --github none --yes` asks nothing.

## 2. Finish the setup

**What it does:** fits `CLAUDE.md`, the guard paths and the Docker files to your stack, and creates the board and first milestones on GitHub.

**Ask:** open a Claude Code session in the `lead` worktree, titled `<Project> - Lead`, and say:
> Read CLAUDE.md and continue as lead. Finish the setup: ask me one topic at a time; I choose the stack from your options. Then fill in CLAUDE.md, the Docker files and CI, and create the board and the first milestones on GitHub.

**Claude asks you,** one topic per round, confirming each before the next:
1. What decides the stack (screens, users, data, growth), then 2-3 stack options from the lightest to the fullest. You choose; it records the choice as ADR-001.
2. Folder layout if not `app/`, `tests/`, `design/` (sets the paths each role may edit).
3. Project hard rules (client data, read-only sources, compliance).
4. Install, run, test and lint commands, if they exist yet.
5. Names of the first milestones (proposed: `v0.1.0`, `v0.2.0`). If init created no repo: repo owner and name, private or public.

**Claude does:**
- fills in `CLAUDE.md`; writes `.claude/ownership.json` if your folders differ; fits the Dockerfile and the `ci` workflow to the stack;
- creates the repo, labels and board if init did not (`scripts/setup-labels.mjs`, `scripts/setup-board.mjs`), and the milestones;
- runs the guard and release tests; commits on `role/lead`, merges into `dev`, and checks that CI ran on GitHub.

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
