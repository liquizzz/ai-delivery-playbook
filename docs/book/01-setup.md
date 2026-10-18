# Chapter 1 — Setup

**Purpose:** go from an empty folder to a project with the kit installed, GitHub ready and the first role sessions open.

## You do this yourself (once)

These involve your machine, accounts or secrets:
- Install the Claude Code desktop app, Git, Node.js 20+, the GitHub CLI (`gh`) and, for front-end products, pnpm.
- Clone the playbook: `git clone https://github.com/liquizzz/ai-delivery-playbook.git`.
- Sign in to GitHub in a terminal: `gh auth login`, then `gh auth refresh -s project`.

## 1. Set up the project

**What it does:** installs the kit (shared `CLAUDE.md`, role files, guard hook, issue forms, workflows, scripts), creates the docs folders and the `dev` and `staging` branches, and fills in `CLAUDE.md` for your product.

**Ask** — open a Claude Code session in the new project folder (it becomes the main checkout):
> Set up this folder as a project with the AI Delivery Playbook kit at `<path to playbook>`. Read `<path to playbook>/docs/book/01-setup.md` first. Before changing anything, ask me everything you need in one numbered list, with a proposed answer for each. Then do the whole setup and report.

**Claude asks you:**
1. Product name and one-paragraph description (who it is for, the success metric).
2. Stack and hosting.
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

**Ask** — same session:
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

**Ask** — same session:
> Create the worktrees for po and lead.

**Claude does:** runs `scripts/new-role-worktree.mjs` for each; each worktree lands in `<projects>/<project>-wt/<role>/` on `role/<role>`.

**You do:** open a new Claude Code session in each worktree folder, titled `<Project> - PO` and `<Project> - Lead`, and say:
> Read CLAUDE.md and continue as po.

**You check:** each session answers with its role, current state and next step. Close the setup session; from now on you work through the PO.

## 4. Before the first deploy

**What it does:** prepares the pipelines and tells you which secrets to add.

**Ask** — Lead session:
> Prepare the deployment pipelines. Ask me what you need first.

**Claude asks you:**
1. Host for the design preview, staging and production (proposed: Cloudflare Pages).
2. Project names on the host; who may open the client links.
3. Build output folders and commands.

**Claude does:** adapts `.github/workflows/`, writes the list of secret **names** in `docs/tech/ops/`.

**You do:** create the hosting projects, add the secrets in GitHub (Settings → Secrets and variables → Actions), keep `deploy-production` disabled until go-live.

**Claude asks before:** running any workflow.

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

Next: [Chapter 2 — The team](02-the-team.md).
