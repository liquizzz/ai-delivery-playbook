# Chapter 6 — Continuity

**Purpose:** close, compact or move any session and have it continue within a minute, without retelling anything.

**Why it works:** work lives in GitHub issues (tasks, hand-offs, small decisions), repo documents (SRS, specs, CRs, DECs, ADRs, reports) and git (code). Messages between sessions only notify, with a link. Every decision is written down the moment it is made.

## 1. Restart a session

**What it does:** brings a closed or confused session back to its work.

**Ask** — open a session in the role's worktree:
> Read CLAUDE.md and continue as `<role>`.

**Claude does:** reads `CLAUDE.md` and its role file; checks `git status` and recent commits; lists its issues and reads the last comment on each (PO and Lead also read the latest report and milestone file); reports in three lines: working on · where it stands · next step.

**You check:** the three lines match what you expect. If not, say what is wrong; the session corrects from the issue.

## 2. Hand work to another role (nothing to ask)

**Claude does:** whenever work changes hands, the sender posts a hand-off note on the issue:
```
## Hand-off: <from> → <to>
- Task: #42 <title> · Status: Done / Needs changes / Blocked
- Commit: role/dev1 @ a1b2c3d · Level: L2 · Module: auth
- Done: … · Next for the receiver: … · Notes / risks: …
```
Team members also comment when they start, finish a major part, get blocked or finish.

## 3. Compact a long session

**What it does:** frees context without losing the thread.

**Ask** — in the session, after it finishes a task (not in the middle of a fix):
> Save your state to the issue, then I will compact.

**Claude does:** writes any unwritten decision or progress to the issue or document, commits and pushes its branch, confirms.

**You do:** type `/compact`. The compact instructions in `CLAUDE.md` keep role, current issue, branch and last commit, decisions, items waiting for you and open risks. To drop only a side discussion, use rewind → "Summarize from here".

## 4. Work from a second machine

**What it does:** lets you follow and approve while away from the main machine.

**You do:** read reports and PRs on GitHub (web or mobile); drive the main machine's sessions remotely (Remote Control / claude.ai). Never open a second session for a role that is already running.

## 5. Move the team to another machine

**Ask** — PO session on the old machine:
> We are moving the team to another machine. Get every role ready.

**Claude does:** asks each running session to commit and push its branch; lists the worktrees to recreate.

**You do:** on the new machine clone the repo, open one session in the main checkout and ask:
> Recreate the worktrees for `<roles>`.

Then open each role's session with the restart sentence. Fill in each `.env.local` yourself.

Next: [Chapter 7 — Front-end projects](07-frontend-projects.md).
