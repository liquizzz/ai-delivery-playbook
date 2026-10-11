# AI-Driven Delivery Process

From business idea to production, with AI agents (Claude Code) doing most of the production work and a human owning every decision.

## Principles

1. **Human owns the decision, AI owns the draft.** AI produces options, documents, code and tests. A human approves anything that changes scope, architecture, cost or risk.
2. **Every stage ends at a gate.** A gate is a short checklist. Nothing moves forward until the gate passes.
3. **Artifacts over chat.** Every decision lives in a file in the repo (PRD, story, ADR), not in a chat transcript. The AI reads those files as context in later stages.
4. **Small, verifiable steps.** Each task is small enough that its output can be reviewed in minutes.
5. **Log the process.** Every task gets a line in `docs/ai-log.md`: what the AI did, where the human intervened, how many rework loops.

## Overview

```
Idea → Discovery → PRD → Stories → Architecture → Tasks → Build → Test → Review → Release
         G1         G2      G3        G4 (ADR/C4)    G5      G6      G7      G8       G9
```

| # | Stage | AI does | Human does | Output | Gate |
|---|---|---|---|---|---|
| 1 | **Discovery** | Interviews the human with structured questions; drafts personas, current vs. future process, assumptions, open questions | Supplies domain knowledge; challenges assumptions; decides what problem is worth solving | `docs/discovery.md` | **G1** Problem, users and success metric stated in one sentence each |
| 2 | **PRD** | Drafts PRD from discovery; proposes must-have / nice-to-have split; flags risks | Cuts scope; sets success metrics and non-goals | `docs/prd.md` ([template](../templates/prd.md)) | **G2** Must-have list fits the time box; non-goals are explicit |
| 3 | **Stories** | Breaks PRD into user stories with Given/When/Then acceptance criteria; spots gaps and edge cases | Prioritises; rejects stories that don't serve a must-have | `docs/stories/*.md` ([template](../templates/user-story.md)) | **G3** Every must-have maps to ≥1 story; every story has testable AC |
| 4 | **Architecture** | Proposes 2–3 options with trade-offs; drafts C4 context/container diagrams and ADRs | Chooses the option; signs off on cost and operability | `docs/adr/NNNN-*.md` ([template](../templates/adr.md)), `docs/c4.md` | **G4** Each significant decision has an accepted ADR |
| 5 | **Tasks** | Splits stories into tasks of ≤ 2h of agent work, ordered by dependency | Reviews order and size | Issues / `docs/tasks.md` | **G5** Each task names its story and its "done" check |
| 6 | **Build** | Writes code and tests per task, following `CLAUDE.md` conventions | Reviews diffs; stops drift from the ADRs | Code + tests | **G6** Builds, lints and tests pass locally |
| 7 | **Test** | Generates test cases from AC; runs unit/integration/e2e; reports failures | Exploratory test of the main journey; decides what is "good enough" | Test report in PR | **G7** All AC covered by an automated or recorded manual test |
| 8 | **Review** | First-pass code review (correctness, security, simplicity) | Final review; merges | Merged PR | **G8** No open high-severity findings |
| 9 | **Release** | Updates changelog and docs; runs the release checklist; drafts release notes | Approves deploy; checks production | Deployed version + notes | **G9** Release checklist complete; smoke test passes in production |

After release: write the case study (problem → solution → process → result) from the PRD, ADRs and AI log.

## Where the human stays in control

- **Scope** — only the human adds or removes must-haves (G2, G3).
- **Architecture** — only the human accepts an ADR (G4).
- **Merge and deploy** — only the human merges to `main` and approves a production release (G8, G9).
- **Secrets and data** — the AI never handles real credentials or real customer data; all sample data is synthetic.

## Claude Code setup (per project)

- `CLAUDE.md` at the repo root: product summary, stack, conventions, commands, links to PRD and ADRs.
- Keep the PRD, stories and ADRs in `docs/` so the agent loads them as context.
- One task per session or branch; clear context between unrelated tasks.

## Time boxes

| Project type | Discovery → Stories | Architecture | Build → Release |
|---|---|---|---|
| Weekend POC (~8h) | 1h | 0.5h (1–2 ADRs) | 6.5h |
| Flagship (8 weeks) | 1 week | 1 week | 6 weeks |
