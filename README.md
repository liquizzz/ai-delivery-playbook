# AI Delivery Playbook

A book and a kit for building real products with Claude Code. You (the owner) open a few Claude Code sessions, each playing one role: PO, Lead, Dev, Test, UI/UX or DevOps. They write the requirements, build, test and release, and they stop for your approval at each gate. For a first demo, one session is enough (Starter mode); you add roles when the project needs them.

The book is written as prompts: what to say to which session, the questions it will ask you back, and what it does after you answer. Next to the book are copy-ready templates and a tested kit (a shared `CLAUDE.md`, role files, a guard hook, issue forms, workflows and scripts) that one command installs into a new project.

What you end up with is a working product, built quickly, where the requirements, code and documents stay in step. You try each release yourself before it ships, deployments are easy to run and to roll back, and every decision and change can be traced later.

The book does not teach programming, and it does not replace your judgement: you still decide what is right for the business ([chapter 0](docs/book/00-introduction.md#what-this-book-does-not-do)). It needs Claude Code desktop, GitHub (the free plan is enough), Node.js and Docker. Everything runs in Docker, and each release is a versioned image. Where those images run in production is up to you: the book is for people who already know how they will deploy ([chapter 1](docs/book/01-setup.md#4-run-it-with-docker)). The team does not run by itself: you open the sessions ([chapter 2](docs/book/02-the-team.md#5-how-automatic-it-is)).

## Start here

In a terminal, from the folder where your projects live:

```bash
git clone https://github.com/liquizzz/ai-delivery-playbook.git
```

```bash
node ai-delivery-playbook/kit/init.mjs
```

Answer its seven questions (Enter takes each suggestion), then open the `START-HERE.md` it writes into your new project: every next step is one prompt to paste into Claude Code. [How to run](HOW-TO-RUN.md) has the one-time machine setup and what each question means.

Read the book when you want the reasons behind a step: [Chapter 0](docs/book/00-introduction.md) takes 5 minutes, [Appendix D](docs/book/appendix-d-checklist.md) checks that no step was skipped, and [Chapter 9](docs/book/09-token-budget.md) keeps cost down.

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
