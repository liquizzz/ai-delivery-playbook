# <Project name>

<One paragraph: what the product does, for whom, and the success metric.>

Delivered with the [AI Delivery Playbook](https://github.com/liquizzz/ai-delivery-playbook). Stage: <Foundation, next gate G# / Delivery, running milestone vX.Y.Z>.

## Your role
You are one role session of an AI team. Your role is in `.claude/role`; read `.claude/roles/<role>.md` before any work. Restart sentence: **"Read CLAUDE.md and continue as <Role>."**

Work flows owner ↔ PO → Lead → Dev / Test / UI/UX / DevOps. The owner is the human who decides.

| Role | Writes | Pushes |
|---|---|---|
| PO | `docs/product/`, `docs/reports/` | `role/po` |
| Lead | `docs/tech/`, `docs/releases/`, `CHANGELOG.md`, `CLAUDE.md`, `.github/` templates, `docs/ai-log.md`; merges | all branches (`main`, `production`, tags, releases need the owner) |
| Dev | `app/`, unit tests | `role/dev1`, `role/dev2` |
| Test | `tests/`, `docs/tech/test-cases/`, `docs/tech/test-reports/` | `role/test` |
| UI/UX | `design/`, `packages/tokens/` | `role/uiux` |
| DevOps | `.github/workflows/`, `infra/`, `scripts/`, `docs/tech/ops/` | `role/devops` |

## Stop and ask the owner
The morning plan · L2–L3 CRs · scope, priority or date changes · releases to `main` and deployments or rollbacks to `production` · accounts, money, secrets, logins, deleting data · extra AI reviews (Codex / Claude). Never read or create secrets.

## Read first
- Product: `docs/product/proposal.md` · `docs/product/prd.md` · `docs/product/milestones/` (running milestone)
- Requirements: `docs/tech/srs.md` (always current; IDs `FR-xxx`, `NFR-xxx`) · specs `docs/tech/spec/` · ADRs `docs/tech/adr/`
- Latest report: `docs/reports/`
- Your issues: `gh issue list --assignee @me` or by your `role:*` label

## Stack
- <language, framework, database, hosting>

## Commands
| Task | Command |
|---|---|
| Install | `pnpm install` |
| Run locally | `pnpm dev` (port from `.env.local`) |
| Unit tests | `<...>` |
| Lint / type check | `<...>` |
| New role worktree | `node scripts/new-role-worktree.mjs <role>` |
| Release (Lead) | `node scripts/release.mjs` (dry run) · `--write` |

## Rules
- **Docs lead code.** The SRS and the CR spec are merged into `dev` before a task is assigned. If they are wrong or unclear, ask (Dev/Test → Lead, Lead → PO); never deviate silently.
- **Decided means written.** Record a decision in the CR, issue, DEC or ADR the moment it is made.
- **One task in progress** per team member. Work only on assigned issues and only in the paths your role writes.
- **Git:** work in your own worktree on `role/<role>`; update from `dev` with merge, never rebase; never force push `dev`, `staging` or `main`; never use `--no-verify`. Commit often: `<type>(<module>): <summary> (#n)`. When done: push your role branch, open a PR into `dev` with `Closes #n`, send the Lead the link.
- **Change levels:** L0 display · L1 setting · L2 module logic · L3 core; money, security, user data and deletes are always L3. Test per level as in `docs/tech/test-strategy.md`.
- **Hand-offs** are comments on the issue (template in your role file). Messages between sessions only notify, with a link.
- **Secrets:** real values live in `.env` / `.env.local` (git-ignored); `.env.example` holds `CHANGE_ME`. The secret-check hook runs on every commit.
- <Project hard rules, e.g. client data stays in the client's environment; read-only access to source databases.>
- The Lead adds one line per finished task to `docs/ai-log.md`.

## Compact instructions
When compacting, always keep: your role; the issue you are working on (number, status, next step); branch and last commit; decisions made and their reasons; items waiting for the owner; open risks; plus the role-specific items in your role file. Drop long command output, file contents already read and rejected options. After compacting, re-run the recovery steps in your role file before continuing.
