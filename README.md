# AI Delivery Playbook

> I take products from business idea to production — end to end — using AI-driven development.

A practical, reusable process for delivering software with AI agents (Claude Code) across the whole lifecycle: discovery, requirements, architecture, code, testing, release. AI drafts; a human decides at every gate.

## The process in one picture

```
Idea → Discovery → PRD → Stories → Architecture → Tasks → Build → Test → Review → Release
         G1         G2      G3        G4 (ADR/C4)    G5      G6      G7      G8       G9
```

- **AI owns the draft** — discovery notes, PRD, stories, ADR options, code, tests, docs.
- **Human owns the decision** — scope, architecture, merge, deploy.
- **Every stage ends at a gate** — a short checklist that must pass before moving on.
- **Every task is logged** — what AI did, where the human stepped in, how much rework.

Full process: [docs/process.md](docs/process.md)

## Templates

| Template | Used at stage |
|---|---|
| [PRD](templates/prd.md) | 2 · PRD |
| [User story + acceptance criteria](templates/user-story.md) | 3 · Stories |
| [Architecture Decision Record](templates/adr.md) | 4 · Architecture |
| C4 diagrams, test strategy, release checklist, case study | _coming next_ |

## Projects built with this playbook

| Project | What it proves | Status |
|---|---|---|
| Product Listing Generator (POC-1) | Idea → deployed AI app in one weekend | Planned (Oct 2026) |
| AI article finder for a news site | Retrieval-only AI (RAG search), evaluation, data kept in-country | In progress (private client) |
| News site frontend modernization | Legacy ASP.NET WebForms → ASP.NET Core, strangler fig | Planned (private client) |

## Roadmap

- [x] Process with gates, PRD / ADR / user story templates
- [ ] C4, test strategy, release checklist, case study templates
- [ ] Claude Code kit: sample `CLAUDE.md`, slash commands per stage, hooks
- [ ] Refined after POC-1 and the news-site projects

## License

[![CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

This playbook and its templates are licensed under [Creative Commons Attribution 4.0 International](LICENSE). You may use, adapt and share them, including commercially, as long as you give credit: "AI Delivery Playbook by Hai Nguyen (github.com/liquizzz/ai-delivery-playbook)".
