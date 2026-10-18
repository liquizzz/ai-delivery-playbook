# AI Delivery Playbook

**A book and a kit for building real products with Claude Code** — one human (the owner) and a team of Claude Code sessions (PO, Lead, Dev, Test, UI/UX, DevOps) that plan, build, test and release with clear roles, written requirements and the owner's approval at every gate.

- **What you get:** a step-by-step book of prompts ("ask this session this; it will ask you these questions; then it does this"), copy-ready templates, and a tested kit (shared `CLAUDE.md`, role files, a guard hook, issue forms, workflows, scripts) installed with one command.
- **What it gives you:** small releases every few days, an always-current SRS, a versioned changelog, and sessions that can restart without losing work.
- **Built for:** Claude Code desktop, GitHub, Node.js. GitHub Free is enough.

## Start here

1. Read [Chapter 0 — Introduction](docs/book/00-introduction.md) (5 minutes).
2. Follow [Chapter 1 — Setup](docs/book/01-setup.md): open a Claude Code session in an empty folder and paste the setup prompt. It asks you a few questions, then installs everything.
3. Talk to the PO session from then on.

## The book

| | Chapter | Use it to |
|---|---|---|
| 0 | [Introduction](docs/book/00-introduction.md) | Understand the model, the principles and how prompts work in this book |
| 1 | [Setup](docs/book/01-setup.md) | Start a project, connect GitHub, open the first sessions |
| 2 | [The team](docs/book/02-the-team.md) | Know who does what, how code moves, what the guardrails block |
| 3 | [Foundation](docs/book/03-foundation.md) | Get the proposal, requirements and design approved (G1–G3) |
| 4 | [The delivery loop](docs/book/04-delivery-loop.md) | Ask for changes, run the morning plan, keep the milestone on date |
| 5 | [Releases](docs/book/05-releases.md) | Release, go live, hotfix, roll back |
| 6 | [Continuity](docs/book/06-continuity.md) | Restart, compact and switch machines without losing work |
| 7 | [Front-end projects](docs/book/07-frontend-projects.md) | Show design rounds to the client while the product is built |
| 8 | [Lite mode](docs/book/08-lite-mode.md) | Run a smaller version for POCs and small tools |
| A | [Templates](docs/book/appendix-a-templates.md) | See every document the sessions fill in |
| B | [Kit reference](docs/book/appendix-b-kit.md) | See what the kit installs and how to change it |
| C | [FAQ and troubleshooting](docs/book/appendix-c-faq.md) | Fix common problems |

## A day with the team

```text
09:30  You → PO      "Morning brief."            PO lists yesterday, the plan and 3 decisions.
09:40  You → PO      "1 yes, 2 next milestone, 3 yes."
       PO → Lead     CRs approved → Lead updates the SRS and spec, creates tasks.
       Lead → Devs   Devs build, open PRs; Lead reviews and merges; Test checks.
14:00  You → PO      "I want users to export reports as CSV."
       PO → You      Asks 4 questions → you answer → CR opened, fits in the buffer.
18:00  PO → You      End-of-day report: done, blocked, buffer left.
Day 3  Lead → You    "v0.4.0 ready: 2 CRs, regression passed. Approve?"  →  "Approve and deploy."
```

## Repository

| Path | Contents |
|---|---|
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
