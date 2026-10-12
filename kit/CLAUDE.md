# <Project name>

<One paragraph: what the product does, for whom, and the success metric.>

Delivered with the [AI Delivery Playbook](https://github.com/liquizzz/ai-delivery-playbook). Current phase: <#> · next gate: <G#>.

## Read first
- Proposal: `docs/proposal.md` · PRD: `docs/prd.md` · Spec: `docs/spec.md` · ADRs: `docs/adr/`
- Roles and owned paths: `docs/roles.md` · Board: `docs/board.md`
- Data notes: `docs/data-notes.md` · Test strategy: `docs/test-strategy.md` · Eval plan: `docs/eval-plan.md`

## Stack
- <language, framework, database, hosting>

## Commands
| Task | Command |
|---|---|
| Install | `<...>` |
| Run locally | `<...>` |
| Unit tests | `<...>` |
| Lint | `<...>` |
| Eval | `<...>` |

## Conventions
- The spec and ADRs are the contract. If they are wrong or missing, raise it on the board; do not deviate silently.
- Open a role session only when its phase starts; its first task is its own plan from the approved spec.
- Write tests first (TDD) from the acceptance criteria in `docs/stories/`.
- Write only to the paths your role owns (`docs/roles.md`).
- Locked documents are not changed mid-project: new ideas go to the next-phase backlog; blocking defects go through a CR on the board.

## Hard rules
- Never commit secrets. Real values live in `.env` (git-ignored); `.env.example` holds `CHANGE_ME`.
- <Client data stays in the client's environment; no real records in git, tests, logs or prompts sent to external services.>
- <Read-only access to source systems.>
- Commit and push only when the human asks. Stay on `main`; never rebase, reset or stash in a shared checkout.
- Add one line per finished task to `docs/ai-log.md` (through the Lead).
