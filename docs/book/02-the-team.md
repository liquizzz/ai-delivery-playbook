# Chapter 2 — The team

**Purpose:** know which session does what, how code moves to production, and what stops a session from overstepping.

## Roles

| Role | Talk to it when you want to | Reports to | Open |
|---|---|---|---|
| **PO** | Ask for something, change priorities, see progress | You | Always |
| **Lead** | Ask about design, quality or a release | PO | Always |
| **Dev** (1–2) | Rarely; the Lead assigns its work | Lead | When tasks are ready |
| **Test** | Rarely; the Lead assigns its work | Lead | When there is testing |
| **UI/UX** | Review a design round | PO | Front-end products |
| **DevOps** | Rarely; hosting and pipelines | Lead | Larger infrastructure work |

The minimum team is PO + Lead + one Dev. Each role follows its file in `.claude/roles/` ([kit](../../kit/.claude/roles/)).

| Role | Writes | Pushes |
|---|---|---|
| PO | `docs/product/`, `docs/reports/` | `role/po` |
| Lead | `docs/tech/`, `docs/releases/`, `CHANGELOG.md`, `CLAUDE.md`, `docs/ai-log.md`; merges | every branch (`main`, `production`, tags need you) |
| Dev | `app/` or source folders, unit tests | `role/dev1`, `role/dev2` |
| Test | `tests/`, `docs/tech/test-cases/`, `docs/tech/test-reports/` | `role/test` |
| UI/UX | `design/`, `packages/tokens/` | `role/uiux` |
| DevOps | `.github/workflows/`, `infra/`, `scripts/`, `docs/tech/ops/` | `role/devops` |

**Branches:** `role/<role>` → `dev` (daily integration) → `staging` (release candidate, regression, client demo) → `main` (released, tagged) → `production` (live, from go-live). One worktree per role; nobody rebases or force-pushes `dev`, `staging` or `main`.

## 1. Add a team member

**What it does:** opens a Dev, Test, UI/UX or DevOps session when there is work for it.

**Ask** — Lead session:
> We need a dev1 for the tasks in milestone v0.1.0. Prepare it.

**Claude asks you:** only if unclear — which role and which tasks it will take first.

**Claude does:** creates the worktree `<project>-wt/dev1` on `role/dev1` with its local port; assigns the first Ready issues to it; tells you the folder to open.

**You do:** open a session in that folder titled `<Project> - Dev1` and say "Read CLAUDE.md and continue as dev1."

**You check:** the session lists its assigned issues and starts the first one.

## 2. How a task moves (nothing to ask)

- The Dev commits on its branch, pushes, opens a PR into `dev` with `Closes #n` and sends the Lead the link.
- The Lead reviews first, before any other work (no PR waits more than half a day), and squash-merges.
- The issue closes and the board moves the card to Done.

**You check:** "PRs waiting" in the end-of-day report.

## 3. Ask for an independent review

**What it does:** gets a second opinion from another model on a risky change.

**Ask** — Lead session (it proposes one with the label `codex-review` or `claude-review` for L3, money, security, user data, or before a release):
> Run the review you proposed on PR #42.

**Claude asks you:** Codex adversarial review, Codex standard review or Claude `/code-review`? (proposed: adversarial for L3)

**Claude does:** runs the review, posts the findings on the PR, fixes or rejects each with a reason, reports the counts.

**You check:** the summary. If Codex is out of quota, Claude says so and offers `/code-review`. A missing review never blocks a PR.

## 4. Guardrails (always on)

The `role-guard` hook ([kit](../../kit/.claude/hooks/role-guard.cjs)) checks every command and file edit in every session:

| Blocked for everyone | Blocked for non-Lead roles | The Lead asks you first |
|---|---|---|
| Force push to `dev`, `staging`, `main`; `--no-verify`; `gh secret`; editing real `.env` files | Pushing any branch but their own; merging PRs; releases; running workflows; editing paths they do not own | Pushing `main` or `production`; pushing tags; GitHub releases; running a workflow (deploy, rollback) |

A blocked session sees the reason and changes course. An approval request appears as a prompt in the Lead session. These rules stop mistakes; they are not a security boundary.

Next: [Chapter 3 — Foundation](03-foundation.md).
