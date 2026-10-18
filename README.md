# AI Delivery Playbook

A kit and a book for building real products with Claude Code. One command sets up your project, and from then on every Claude session already knows its role, which skills to use for each task, how to ask you questions and how to keep token use down. You decide and approve; you do not have to tune Claude Code yourself first.

**[Start a project in 5 minutes: How to run](HOW-TO-RUN.md)**

```bash
git clone https://github.com/liquizzz/ai-delivery-playbook.git
```

```bash
node ai-delivery-playbook/kit/init.mjs
```

The first time, install the tools listed in How to run (once per machine). Then answer seven short questions (Enter takes each suggestion) and open the `START-HERE.md` it writes into your project. Every next step there is one prompt to paste.

## What the kit sets up for you

| You get | How |
|---|---|
| A ready project in one command | `init.mjs` creates the folder, git branches, a worktree per role, the private GitHub repo with labels and a kanban board, CI and Docker image builds, and `START-HERE.md` |
| Sessions that know their job | Each role (PO, Lead, Dev, Test, UI/UX, DevOps) has a role file with its rules and paths; a guard hook blocks risky commands and edits outside the role |
| The right skill for each task, chosen in advance | Interviews use brainstorming, code uses test-first development, failures use systematic debugging, nothing is called done without a verification step, the Lead reviews every change, and every document gets a humanizer pass. A hook reminds each session at start, so you never name a skill |
| Questions you can answer quickly | One topic per round, two to four options with a recommendation first; say "you decide" to let Claude settle the rest |
| Lower token cost | Tests sized to the change (levels L0 to L3), no `/goal` or `/loop`, compact rules per role, and Starter mode: one session and a one-page brief for a first demo |
| Quality you can check | Gates you approve, a requirements document kept current with every change, CI on every push, and your own acceptance test before each release |
| Room to grow | `node scripts/set-level.mjs` moves a project from Starter to Lite to the full six-role team, or back, without redoing anything |
| Releases you can run anywhere | Each version tag builds a Docker image; you run it, or roll back, by tag |

## What it is not

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
| 8 | [Starter and Lite modes](docs/book/08-lite-mode.md) | Start with one session for a demo; three for a small product |
| 9 | [Token budget](docs/book/09-token-budget.md) | Keep cost under control; avoid `/goal` and `/loop` |
| A | [Templates](docs/book/appendix-a-templates.md) | See every document the sessions fill in |
| B | [Kit reference](docs/book/appendix-b-kit.md) | See what the kit installs and how to change it |
| C | [FAQ and troubleshooting](docs/book/appendix-c-faq.md) | Fix common problems |
| D | [Process checklist](docs/book/appendix-d-checklist.md) | Check that no step was skipped |

## How a project goes

The [Quick start in chapter 0](docs/book/00-introduction.md#quick-start-from-idea-to-demo) walks through a whole project in seven prompts, from an empty folder to a tested, tagged demo.

## Repository

| Path | Contents |
|---|---|
| [HOW-TO-RUN.md](HOW-TO-RUN.md) | From clone to your first project in three steps |
| [docs/book/](docs/book/) | The book |
| [templates/](templates/) | Documents the sessions fill in |
| [kit/](kit/) | Files installed into a project by `kit/init.mjs` |
| [docs/ai-log.md](docs/ai-log.md) | Log of how this playbook itself was built with AI |

## Worked example

A complete sample project built by following this book will be linked here.

## License

[![CC BY 4.0](https://img.shields.io/badge/Docs-CC%20BY%204.0-lightgrey.svg)](LICENSE) [![MIT](https://img.shields.io/badge/Kit%20code-MIT-blue.svg)](kit/LICENSE)

| Part | License |
|---|---|
| Docs and templates (`README.md`, `docs/`, `templates/`) | [Creative Commons Attribution 4.0 International](LICENSE) |
| Kit (`kit/`: hooks, scripts, workflows, settings, role files) | [MIT](kit/LICENSE) |

You may use, adapt and share both, including commercially. Please give credit: "AI Delivery Playbook by Hai Nguyen (github.com/liquizzz/ai-delivery-playbook)". Code files carry an `SPDX-License-Identifier: MIT` line; keep it when you copy them.
