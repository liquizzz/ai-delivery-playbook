# Chapter 2: The team

**Purpose:** know which session does what, how code moves to production, and what stops a session from overstepping.

## Roles

| Role | Talk to it when you want to | Reports to | Open |
|---|---|---|---|
| PO | Ask for something, change priorities, see progress | You | Always |
| Lead | Ask about design, quality or a release | PO | Always |
| Dev (1-2) | Run `/build try` and `/build done` on the tasks the Lead assigns | Lead | When tasks are ready |
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

**Branches:** `role/<role>` → `dev` (daily integration) → `staging` (release candidate, regression, demo) → `main` (released, tagged) → `production` (live, from go-live). One worktree per role; nobody rebases or force-pushes `dev`, `staging` or `main`.

## 1. Add a team member

**What it does:** opens a Dev, Test, UI/UX or DevOps session when there is work for it. The Lead proposes it: UI/UX at the start of G3 for a product with screens, Dev and Test when G3 is approved, any role when a task needs one. You can also ask.

**Ask the Lead:**
> We need a dev1 for the tasks in milestone v0.1.0. Prepare it.

**Claude asks you:** only if it is unclear which role you need and which tasks it should take first.

**Claude does:** creates the worktree `<project>-wt/dev1` on `role/dev1` with its local port and the secrets you set; assigns the first Ready issues to it; ends with the folder and the prompt in a box.

**You do:** open a session in that folder titled `<Project> - Dev1` and paste the prompt. The session knows its role when it starts.

**You check:** the session lists its assigned issues and starts the first one.

## 2. How a task moves (nothing to ask)

- The Dev commits on its branch, pushes, opens a PR into `dev` with `Closes #n` and sends the Lead the link. The card moves to In review.
- The Lead reviews a PR before any other work. When it asks for changes, the card goes back to In progress, and to In review again when the Dev pushes the fixes. Then the Lead squash-merges.
- Full: an L1-L3 task moves to Testing, where the Test session checks it on `dev` against its acceptance criteria. At Lite the Testing column stays empty.
- The issue closes and the card moves to Done. A docs PR with no task issue of its own has its own card: In review while it waits for you, Done when merged.

**You check:** "Waiting for the owner" in `/progress`.

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

A blocked session sees the reason and changes course. An approval request appears as a prompt in the Lead session. The hook also checks wrapped and nested commands ([Appendix B](appendix-b-kit.md)). It catches mistakes, but a determined person could get around it. On GitHub Free, private repos cannot use branch protection; on a paid plan, also protect `main` and `production` on GitHub.

## 5. How automatic it is

**What it does:** the team runs on its own between your decisions: sessions pass the work to each other and the Lead merges routine changes, while you approve the gates, the L3 changes and every release. `/auto` shows both switches; turn either off when you want to follow each step.

| Automation | What happens on its own | What you still do |
|---|---|---|
| 1 By hand (`/auto relay off`, `/auto merge off`) | Each open session takes its assigned issues, works, hands off on the issue and ends with a prompt for the next session | Paste each prompt (or `/send` it); approve every merge, gate and release |
| 2 Default | Each session sends the next one its one-line prompt when a step ends (Claude Code desktop can send messages between local sessions); the Lead merges L0-L2 PRs after its review and green CI | Keep the sessions open; answer the questions sessions ask; approve gates, L3 PRs and releases |
| 3 Lead opens sessions | The Lead starts a session for a role when work is Ready (Claude Code desktop can start sessions) | Accept each new session; approve |
| 4 Timers (`/loop`, `/goal`) | A session re-checks or keeps working on its own | Not recommended: every cycle costs tokens even when there is nothing to do |

At automation 2 every session names in its recap what it sent and what it merged ("Sent to Lead: Review the PR for #46.", "Merged PR #58 (L2), CI green."), so you can read what happened. A message costs little: the prompt is one line and the receiving session reads the issue and the documents, as it would if you pasted it. At automation 1 you carry the work yourself: the report ends with the session to open and a short prompt alone in a box, which you copy with one click and paste there, or send with `/send` from the same session. The first few blocks show a one-line tip about `/send` and `/auto relay on`; it stops once you have used either. The receiving session comments `Started #n` on the issue when it begins, so the board shows whether it really picked the work up. An issue comment alone does not start a closed session.

**Type** `/auto relay off` and `/auto merge off` in any session to go back to automation 1, and `on` to return. **Ask the Lead** for automation 3 (the recommended maximum):
> From now on, open the receiving session yourself if it is not running.

**Claude asks you:** which roles it may open on its own; whether to ask you before each new session (proposed: yes).

Limits: sessions do not wake up on GitHub events by themselves; a closed session does nothing until opened; gates, L3 PRs and releases always wait for you; every running session uses tokens.

> **Token tip:** automation 2 and 3 add almost no cost: a message only wakes a session when there is real work. Avoid automation 4; if you try it, use a long interval and stop it the same day ([chapter 9](09-token-budget.md)).

Next: [Chapter 3: Foundation](03-foundation.md).
