# Chapter 2: The team

**Purpose:** know which session does what, how code moves to production, and what stops a session from overstepping.

## Roles

| Role | Talk to it when you want to | Reports to | Open |
|---|---|---|---|
| PO | Ask for something, change priorities, see progress | You | Always |
| Lead | Ask about design, quality or a release | PO | Always |
| Dev (1-2) | Rarely; the Lead assigns its work | Lead | When tasks are ready |
| Test | Rarely; the Lead assigns its work | Lead | When there is testing |
| UI/UX | Review a design round | PO | Front-end products |
| DevOps | Rarely; hosting and pipelines | Lead | Larger infrastructure work |

The minimum team is PO + Lead + one Dev. Each role follows its file in `.claude/roles/` ([kit](../../kit/.claude/roles/)).

| Role | Writes | Pushes |
|---|---|---|
| PO | `docs/product/`, `docs/reports/` | `role/po` |
| Lead | `docs/tech/`, `docs/releases/`, `CHANGELOG.md`, `CLAUDE.md`, `docs/ai-log.md`; merges | every branch (`main`, `production`, tags need you) |
| Dev | `app/` or source folders, unit tests | `role/dev1` (`role/dev2` only if you add a second Dev) |
| Test | `tests/`, `docs/tech/test-cases/`, `docs/tech/test-reports/` | `role/test` |
| UI/UX | `design/`, `packages/tokens/` | `role/uiux` |
| DevOps | `.github/workflows/`, `infra/`, `scripts/`, `docs/tech/ops/` | `role/devops` |

**Branches:** `role/<role>` → `dev` (daily integration) → `staging` (release candidate, regression, client demo) → `main` (released, tagged) → `production` (live, from go-live). One worktree per role; nobody rebases or force-pushes `dev`, `staging` or `main`.

## 1. Add a team member

**What it does:** opens a Dev, Test, UI/UX or DevOps session when there is work for it. The Lead proposes it: UI/UX at the start of G3 for a product with screens, Dev and Test when G3 is approved, any role when a task needs one. You can also ask.

**Ask the Lead:**
> We need a dev1 for the tasks in milestone v0.1.0. Prepare it.

**Claude asks you:** only if it is unclear which role you need and which tasks it should take first.

**Claude does:** creates the worktree `<project>-wt/dev1` on `role/dev1` with its local port and the secrets you set; assigns the first Ready issues to it; ends with the folder and the prompt in a box.

**You do:** open a session in that folder titled `<Project> - Dev1` and paste the prompt. The session knows its role when it starts.

**You check:** the session lists its assigned issues and starts the first one.

## 2. How a task moves (nothing to ask)

- The Dev commits on its branch, pushes, opens a PR into `dev` with `Closes #n` and sends the Lead the link.
- The Lead reviews first, before any other work (no PR waits more than half a day), and squash-merges.
- The issue closes and the board moves the card to Done.

**You check:** "PRs waiting" in the end-of-day report.

## 3. Ask for an independent review

**What it does:** gets a second opinion from another model on a risky change.

**Ask the Lead.** It proposes a review (label `codex-review` or `claude-review`) for L3 changes, anything touching money, security or user data, and before a release. You can also ask for one at any time:
> Run the review you proposed on PR #42.

**Claude asks you:** Codex adversarial review, Codex standard review or Claude `/code-review`? (proposed: adversarial for L3)

**Claude does:** runs the review, posts the findings on the PR, fixes or rejects each with a reason, reports the counts.

**You check:** the summary. If Codex is out of quota, Claude says so and offers `/code-review`. A missing review never blocks a PR.

## 4. Guardrails (always on)

The `role-guard` hook ([kit](../../kit/.claude/hooks/role-guard.cjs)) checks every command and file edit in every session:

| Blocked for everyone | Blocked for non-Lead roles | The Lead asks you first |
|---|---|---|
| Force push to `dev`, `staging`, `main`; `--no-verify`; `gh secret`; editing real `.env` files | Pushing any branch but their own; merging PRs; releases; running workflows; editing paths they do not own | Pushing `main` or `production`; pushing tags; GitHub releases; running a workflow by hand |

A blocked session sees the reason and changes course. An approval request appears as a prompt in the Lead session. The hook also sees through wrappers and nested shells (`rtk git push`, `env … git push`, `bash -c "git push …"`, `powershell -Command "…"`) and refuses encoded PowerShell. These rules catch mistakes, but a determined person could get around them. On GitHub Free, private repos cannot use branch protection; on a paid plan, also protect `main` and `production` on GitHub.

## 5. How automatic it is

**What it does:** the team is semi-automatic on purpose: sessions do the work and pick it up from issues, but you decide when sessions run and you approve every release. Raise the level only as far as you are comfortable.

| Level | What happens on its own | What you still do |
|---|---|---|
| 1 Default | Each open session takes its assigned issues, works, hands off on the issue and reports | Open and close sessions; answer the morning brief; approve releases |
| 2 Sessions message each other | The Lead notifies a session when it assigns work; the PO notifies the Lead when a CR is approved (Claude Code desktop can send messages between local sessions) | Open sessions; approve |
| 3 Lead opens sessions | The Lead starts a session for a role when work is Ready (Claude Code desktop can start sessions) | Accept each new session; approve |
| 4 Timers (`/loop`, `/goal`) | A session re-checks or keeps working on its own | Not recommended: every cycle costs tokens even when there is nothing to do |

At level 1 you carry the work between sessions, and every hand-off tells you how: the report ends with the session to open and a short prompt alone in a box, which you copy with one click and paste there. The receiving session comments `Started #n` on the issue when it begins, so the board shows whether it really picked the work up. An issue comment alone does not start a closed session.

**Ask the Lead,** to move to level 2 or 3 (the recommended maximum):
> From now on, message the receiving session when you assign work, and open the session yourself if it is not running.

**Claude asks you:** which roles it may open on its own; whether to ask you before each new session (proposed: yes).

Limits: sessions do not wake up on GitHub events by themselves; a closed session does nothing until opened; approvals always wait for you; every running session uses tokens.

> **Token tip:** levels 2-3 add almost no cost: a message only wakes a session when there is real work. Avoid level 4; if you try it, use a long interval and stop it the same day ([chapter 9](09-token-budget.md)).

Next: [Chapter 3: Foundation](03-foundation.md).
