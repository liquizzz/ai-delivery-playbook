# Roles and parallel sessions: <Project name>

Process: [AI Delivery Playbook, agent team](https://github.com/liquizzz/ai-delivery-playbook/blob/main/docs/agent-team.md).
All sessions work in `<checkout path>` on branch `main` (one worktree per role: <yes / no>).

## Roles
| Role | Session title | Owns (may write) | Opened at phase | Main outputs |
|---|---|---|---|---|
| Lead | `<Project>` | `CLAUDE.md`, `README.md`, `docs/proposal.md`, `docs/prd.md`, `docs/data-notes.md`, `docs/stories/`, `docs/spec.md`, `docs/c4.md`, `docs/adr/`, `docs/test-strategy.md`, `docs/eval-plan.md`, `docs/roles.md`, `docs/board.md`, `docs/ai-log.md`, `docs/case-study.md` | 1 | PRD, spec, ADRs, plan, board |
| UI/UX | `<Project> - UI/UX` | `<paths>` | 3 | <...> |
| Dev | `<Project> - Dev` | `<paths>` | 4 | <...> |
| DevOps | `<Project> - DevOps` | `<paths>` | 4 | <...> |
| Test | `<Project> - Test` | `<paths>` | 4 | <...> |

Shared, read by all: `docs/proposal.md`, `docs/prd.md`, `docs/spec.md`, `docs/adr/`.
Open sessions now: <Lead, ...>

## Rules for every session
1. Write only to the paths your role owns. Need a change elsewhere? Add a request on the board.
2. Stay on `main`. Never switch branches, rebase, reset or stash in the shared checkout.
3. Your first task is your own detailed plan from the approved spec, posted on the board.
4. Commit only when the human asks, and only your own paths. Run `git pull --ff-only` before pushing.
5. The spec and ADRs are the contract. If something is wrong or missing, raise it on the board; do not deviate silently.
6. Locked documents and contracts change only through a CR approved by the human; new ideas go to the next-phase backlog.
7. The secret-check hook runs on every commit. Example files hold placeholders only.
8. Report status on the board; only the Lead updates the README status and the AI log.
9. <project hard rules, e.g. client data stays in the client's environment; read-only access to source databases>
