# Crewbook: Build

**You bring the idea. Your AI team ships the software.**

A step-by-step Claude Code playbook and starter kit for building high-quality software from zero, whether you have written code for years or never written a line. You lead a crew of Claude Code sessions (PO, Lead, Dev) the way you would lead a real team, and nothing moves forward until you approve it. One command sets up your project. From then on every session knows its role, picks the right skill for each task, asks you only what it needs and keeps token use down.

Crewbook: Build is the first playbook in the Crewbook series.

**[Start a project in 5 minutes: How to run](HOW-TO-RUN.md)** (once Claude Code, Git, Node.js, Docker and the GitHub CLI are installed)

```bash
git clone https://github.com/liquizzz/crewbook-build.git
```

```bash
node crewbook-build/kit/init.mjs
```

The first time, install the tools listed in How to run (once per machine). Then answer eight short questions (Enter takes each suggestion) and open the `START-HERE.md` it writes into your project. Every next step there is one short command to type, such as `/setup`, `/brief <your idea>`, `/build dev`, `/build done` or `/release`, and each hand-off ends with a prompt you copy with one click.

## What you get: a Claude Code agent team in one command

| You get | How |
|---|---|
| A ready project in one command | `init.mjs` creates the folder, git branches, the Lead's worktree, the GitHub repo (private or public) with labels and a kanban board, CI and Docker image builds, and `START-HERE.md`; the Lead's `/setup` then opens the gate issues and the other roles' worktrees |
| A small team that knows its job | Every project starts with three sessions: PO (your requests), Lead (design, stack, review, release) and one Dev. Test, UI/UX and DevOps join only for high-stakes work. Each role has a role file with its rules and paths; a guard hook blocks risky commands and edits outside the role |
| The right skill for each task, chosen in advance | Interviews use brainstorming, code uses test-first development, failures use systematic debugging, nothing is called done without a verification step, and the Lead reviews every change. Documents for a client can get a humanizer pass, which you turn on at init or later. A hook reminds each session at start, so you never name a skill |
| You lead, Claude keeps the process | Each step shows a short guide; you answer in your own words, in any order, Claude asks only about gaps and suggests only when you ask; "later" parks a decision until a step needs it. A product you name is tried in the browser, and facts you give are checked |
| Design before stack | The client sees the look and feel and the main screens at G3; the stack is chosen after, to fit the approved design |
| Lower token cost | Tests sized to the change (levels L0 to L3), no `/goal` or `/loop`, compact rules per role, short hand-off prompts, and roles opened only when there is work for them |
| Quality you can check | Gates you approve, each with a For you block of things to try and links to the evidence, a requirements document kept current with every change, CI on every push, and your own acceptance test before each release |
| Room to grow | `node scripts/set-level.mjs` moves a project from Lite (three sessions) to Full (adds Test, UI/UX, DevOps and a staging check), or back, without redoing anything |
| Releases you can run anywhere | Each version tag builds a Docker image; you run it, or roll back, by tag |

## What you still decide

The kit does not teach programming, and it does not replace your judgement: you still decide what is right for the business ([chapter 0](docs/book/00-introduction.md#what-this-book-does-not-do)). It needs Claude Code desktop, GitHub (the free plan is enough), Node.js and Docker. Where the Docker images run in production is up to you ([chapter 1](docs/book/01-setup.md#4-run-it-with-docker)). The team does not run by itself: you open the sessions ([chapter 2](docs/book/02-the-team.md#5-how-automatic-it-is)).

The book explains why each step works the way it does, as prompts: what to say to which session, what it asks you back, and what it does. Read it when you want the reasons: [Chapter 0](docs/book/00-introduction.md) takes 5 minutes, [Appendix D](docs/book/appendix-d-checklist.md) checks that no step was skipped, and [Chapter 9](docs/book/09-token-budget.md) covers cost.

## The book

| | Chapter | Use it to |
|---|---|---|
| 0 | [Introduction](docs/book/00-introduction.md) | Understand the model, the principles and how prompts work in this book |
| 1 | [Setup](docs/book/01-setup.md) | Start a project, connect GitHub, open the first sessions |
| 2 | [The team](docs/book/02-the-team.md) | Know who does what, how code moves, what the guardrails block |
| 3 | [Foundation](docs/book/03-foundation.md) | Get the proposal, requirements and design approved (G1-G3) |
| 4 | [The delivery loop](docs/book/04-delivery-loop.md) | Ask for changes, run the morning plan, keep the milestone on date |
| 5 | [Releases](docs/book/05-releases.md) | Release, go live, hotfix, roll back |
| 6 | [Continuity](docs/book/06-continuity.md) | Restart, compact, trace a change, switch machines without losing work |
| 7 | [Front-end projects](docs/book/07-frontend-projects.md) | Show design rounds to the client while the product is built |
| 8 | [Lite mode](docs/book/08-lite-mode.md) | Run with three sessions; move to Full and back |
| 9 | [Token budget](docs/book/09-token-budget.md) | Keep cost under control; avoid `/goal` and `/loop` |
| A | [Templates](docs/book/appendix-a-templates.md) | See every document the sessions fill in |
| B | [Kit reference](docs/book/appendix-b-kit.md) | See what the kit installs and how to change it |
| C | [FAQ and troubleshooting](docs/book/appendix-c-faq.md) | Fix common problems |
| D | [Process checklist](docs/book/appendix-d-checklist.md) | Check that no step was skipped |
| E | [Standards map](docs/book/appendix-e-standards.md) | See which standard each step follows and what is left out |

## From idea to release in seven steps

The [Quick start in chapter 0](docs/book/00-introduction.md#quick-start-from-idea-to-demo) walks through a whole project in seven steps, from an empty folder to a tested, tagged demo.

## FAQ

**Can I build an app with Claude Code if I can't code?**
Yes. You describe what you want, answer the sessions' questions and approve each gate; the sessions write the code, the tests and the documents. You do need to install a few tools once and type short commands such as `/brief` and `/build dev`. [How to run](HOW-TO-RUN.md) walks through each one.

**How is this different from vibe coding?**
Vibe coding ships whatever the last prompt produced. In Crewbook every change has a requirement, a review by the Lead, tests sized to the change and a gate you approve, so the tenth feature is as solid as the first.

**How is it different from Claude Code agent teams or spec-driven kits?**
Each role (PO, Lead, Dev, and Test, UI/UX or DevOps when needed) runs in its own session and git worktree, and a guard hook keeps it inside its role. The process covers the whole delivery: proposal, requirements (SRS), design, build, release, change requests and rollback, with six gates (G1 to G6).

**What stack does it use?**
Any. The Lead proposes a stack after you approve the design, and you choose.

**What does it cost?**
A Claude subscription that includes Claude Code, and GitHub (the free plan is enough). [Chapter 9](docs/book/09-token-budget.md) shows how the kit keeps token use down.

## Repository

| Path | Contents |
|---|---|
| [HOW-TO-RUN.md](HOW-TO-RUN.md) | From clone to your first project in three steps |
| [docs/book/](docs/book/) | The book |
| [templates/](templates/) | Documents the sessions fill in |
| [kit/](kit/) | Files installed into a project by `kit/init.mjs` |
| [docs/spec/](docs/spec/) | The playbook's own SRS and decision log |
| [docs/ai-log.md](docs/ai-log.md) | Log of how this playbook itself was built with AI |

## License

[![CC BY 4.0](https://img.shields.io/badge/Docs-CC%20BY%204.0-lightgrey.svg)](LICENSE) [![MIT](https://img.shields.io/badge/Kit%20code-MIT-blue.svg)](kit/LICENSE)

| Part | License |
|---|---|
| Docs and templates (`README.md`, `docs/`, `templates/`) | [Creative Commons Attribution 4.0 International](LICENSE) |
| Kit (`kit/`: hooks, scripts, workflows, settings, role files) | [MIT](kit/LICENSE) |

You may use, adapt and share both, including commercially. Please give credit: "Crewbook by Hai Nguyen (github.com/liquizzz/crewbook-build)". Code files carry an `SPDX-License-Identifier: MIT` line; keep it when you copy them.
