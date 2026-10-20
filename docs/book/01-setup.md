# Chapter 1: Setup

**Purpose:** go from an empty folder to a project with the kit installed, GitHub ready, the setup done and the PO's session ready to open.

## You do this yourself (once)

These involve your machine, accounts or secrets:
- Install the Claude Code desktop app, Git, Node.js 20+, the GitHub CLI (`gh`), Docker and, for front-end products, pnpm. Docker is required: `kit/init.mjs` stops if `docker` or `docker compose` is missing, and warns if Docker is installed but not running. Check with `docker compose version`.
- Clone Crewbook: Build: `git clone https://github.com/liquizzz/crewbook-build.git`.
- Sign in to GitHub in a terminal: `gh auth login`, then `gh auth refresh -s project`.
- Install the Claude Code plugins the kit uses, once per machine, by typing these in any Claude Code session:

| Plugin | Why the kit needs it | Install |
|---|---|---|
| superpowers | Planning, test-first work, debugging and checking before saying "done" | `/plugin install superpowers@claude-plugins-official` |
| code-review | The Lead's PR reviews, and the fallback when Codex is unavailable | `/plugin install code-review@claude-plugins-official` |
| claude-mem | Memory across sessions, so a restarted session finds its context | `/plugin marketplace add thedotmack/claude-mem` then `/plugin install claude-mem@thedotmack` |
| context7 | Current library documentation for Dev sessions | `/plugin install context7@claude-plugins-official` |
| humanizer | Only if you want polished documents (init question 6): each document reads like a person wrote it | `/plugin marketplace add blader/humanizer` then `/plugin install humanizer@humanizer` |
| frontend-design | Products with screens: screens that look designed, in the look and feel you picked | `/plugin install frontend-design@claude-plugins-official` |
| ui-ux-pro-max | Products with screens: searches styles, palettes and fonts for the look-and-feel options | `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` then `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill` |

Then run `/reload-plugins`. Optional plugins (Figma, Codex review, product-management for the PO…) are listed in [Appendix B](appendix-b-kit.md#plugins). You do not pick skills: the kit's `CLAUDE.md` names the skill for each task, and every session uses it. Every plugin adds to each session's context, so install only what the project uses ([chapter 9](09-token-budget.md)).

## 1. Create the project

**What it does:** installs the kit (shared `CLAUDE.md`, role files, guard hook, issue forms, workflows, scripts, Docker files, document templates in `docs/templates/`), creates the docs folders, the branches and the Lead's worktree, optionally creates the GitHub repo, and writes `START-HERE.md`: your next steps as commands to type (`/setup`, `/next`, `/build try`, `/build done`, `/release`).

**You run,** in a terminal:
1. Go to your projects folder, the one that holds `crewbook-build`, with `cd <your projects folder>`. The Claude Code Terminal panel opens in your home folder, so this step applies there too.
2. Run init:
```
node crewbook-build/kit/init.mjs
```

**It asks you,** each question with a one-line hint (Enter takes the suggestion):
1. Project name.
2. Where to create the project (a new folder, suggested from the name).
3. Level: `1` (Lite) or `2` (Full) ([chapter 0](00-introduction.md#choose-the-level-of-process)). You can change it later.
4. Your working language, and the language for documents if it is not English.
5. A separate design prototype that someone reviews before the app is built ([chapter 7](07-frontend-projects.md))? Suggested: no.
6. Polished documents? Suggested: no. Yes gives every document a humanizer pass: it reads better and costs more tokens, so it pays off when other people read the documents. Tell the Lead "Polish documents from now on" to turn it on later.
7. One-line description (optional).
8. Create the GitHub repo now: `private` (suggested, as `<you>/<name>`), `public` or `none`.

**It does:** creates `main` and `dev` (and `staging` for the full process), writes your language into `CLAUDE.md`, leaves out the design pipeline unless you asked for it, commits the kit, creates the Lead's worktree in `<projects>/<project>-wt/lead/` (setup creates the others), marks the setup as not done yet; if you chose a repo, creates it, pushes the branches and creates the labels and the kanban board (`scripts/setup-board.mjs`).

**You check:** the report, then open `START-HERE.md` in the project. If init created a repo, open its Actions tab on GitHub: a new repo may show **Enable Actions on this repository**, and nothing runs until you click it.

For scripts or CI: `node crewbook-build/kit/init.mjs <folder> --name "<name>" --level lite --github none --yes` asks nothing.

## 2. Finish the setup

**What it does:** fits `CLAUDE.md` to your project, opens the gate issues and milestones on GitHub, and creates the PO's folder (Lite: also Dev1's). Setup comes first: until it is done, any other session only tells you to finish it.

**Ask:** open a Claude Code session in the `lead` worktree, titled `<Project> - Lead`, and type:
> /setup

**You say,** following the short guide Claude shows (anything can be "later"; it goes under Open decisions in `CLAUDE.md` and is asked again only when a step needs it):
1. Whether a platform, language or database is required (by you, a client or a system it must work with). You do not choose a stack here: it comes at G3, after you approve the design ([chapter 3](03-foundation.md#4-design-stack-and-srs-phase-3)).
2. Whether the product has screens, who uses it and where.
3. What data it keeps, and whether it must survive a restart.
4. Hard rules: data you must protect, systems it must work with, a deadline.

**Claude does:**
- fills in `CLAUDE.md`; fits Docker and CI only if a stack is required; enables the design plugins for a product with screens;
- creates the repo, labels and board if init did not, milestone v0.1.0, and one issue per foundation gate (G1, G2, G3);
- marks the setup done, merges into `dev`, checks that CI ran on GitHub;
- creates the PO's worktree (Lite: also Dev1's) and ends with the PO's prompt in a box to copy.

**You check:** the report, `CLAUDE.md` and the board on GitHub.

**Claude asks before:** creating the repo, pushing `main`.

## 3. Open the next session

**You do:** open a session in the folder the report names, titled `<Project> - PO`, and paste the prompt from the box. A session knows its role when it starts and finds where the work stands by itself; after a restart, open a new session in the same folder.

## Change the level later

**You run,** in the Lead's worktree: `node scripts/set-level.mjs <lite|full>`. Going up creates the branches and worktrees the level needs; going down deletes nothing and lists the sessions you can close. Then ask the Lead to commit it and, when going up, "Draft what this level still lacks." ([chapter 8](08-lite-mode.md#move-up-or-down)).

## Secrets

**You run,** once per secret (an API key, a database password): `node scripts/set-secret.mjs <NAME>`, then paste the value when asked. It is not shown; it goes into the git-ignored `.env.local` of every checkout, and new worktrees get it too. Never paste a secret into a session or send a screenshot of a terminal that shows one.

## 4. Run it with Docker

**What it does:** makes every part of the product run in Docker, on your machine and anywhere else you choose. The kit installs `docker-compose.yml`, `docker/design.Dockerfile` and `docker/app.Dockerfile`; the `image-design` and `image-app` workflows build images into GitHub's container registry (`ghcr.io`).

**Ask the Lead:**
> Fit the Docker setup to our stack and check that it runs. Ask me what you need first.

**Claude asks you:**
1. Which services the product needs (web app, API, database, worker).
2. Build and start commands for each.
3. Environment variables each service needs (names only).

**Claude does:** adapts `docker-compose.yml` and the Dockerfiles, replaces `<owner>` and `<project>`, runs `docker compose up --build` and checks each service starts, writes the variable names in `docs/tech/ops/`.

**You do:** set each secret with `node scripts/set-secret.mjs <NAME>`.

**You check:** `docker compose up` starts the product on your machine.

Until go-live everything runs on your machine. Before go-live the Lead suggests where to run the images and writes the deployment notes; each release is a versioned image you can run or roll back by tag ([chapter 5](05-releases.md#2-go-live-first-production-release)).

## Optional: a second-opinion reviewer

**You do:** in any session, install the Codex plugin once per machine:
```
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```
It uses your ChatGPT login and Codex limits; Claude's `/code-review` is the fallback. Usage: chapter 2.

> **Token tip:** compact the Lead after setup; open other roles only when the Lead proposes them for work that is ready to start.

Next: [Chapter 2: The team](02-the-team.md).
