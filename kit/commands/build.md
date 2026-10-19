---
description: Build work. "/build dev" = quick, no tests, no merge. "/build done" = tests at the task's level, then merge. No argument = plan the milestone's tasks.
argument-hint: dev [#n] | done [#n] | [milestone]
---

Build: **$ARGUMENTS**

Read `.claude/project.json` (level), `.claude/role` and the Open decisions in `CLAUDE.md`. If a decision the work needs is still open (for example the stack), ask for it now and record it; ask nothing else. If setup or the foundation (G1-G3) is not approved yet, say so and stop.

**`/build dev [#n]`: quick build.** For when the owner wants to see something fast.
- Take the given issue, or the next Ready one assigned to you. Comment `Started #n` the first time and run `node scripts/board-status.mjs <n> "In progress"`.
- Write the code, run it, show the owner how to see it (the command or the URL). No tests, no merge.
- Commit `<type>(<module>): <summary> (#n)` and push `role/<role>`. The issue stays In progress.
- Report in two or three lines.

**`/build done [#n]`: build that merges.** For a task that is finished.
- Confirm the task's change level against the actual change (raise it if the change is wider, never lower it).
- Make the tests for that level green, and only that level: L0 build and look; L1 a unit test for the change; L2 module tests (`superpowers:test-driven-development`); L3 also integration and edge cases, and `security-review`.
- Run `superpowers:verification-before-completion`.
- Push `role/<role>`, open a PR into `dev` with `Closes #n` and the level, run `node scripts/board-status.mjs <n> "In review"`, and end with the hand-off block for the Lead (prompt: `Review the PR for #<n>.`). The Lead reviews (`code-review`, plus `security-review` for L3), merges, and when CI on `dev` is green closes the issue (`gh issue close <n>`: `Closes #n` only fires on `main`) and moves it to Done. A red `dev` is fixed first (`superpowers:systematic-debugging`).

**`/build [milestone]` (Lead): plan the milestone.** Split what is still too big with `superpowers:writing-plans`, set each task's level, role and estimate, assign it, put it in Ready on the board. Each role that gets work needs its worktree: if one is missing, propose it, and on the owner's OK create it from your own worktree (`node scripts/new-role-worktree.mjs <role>`). End with one hand-off block per session that starts (prompt: `/build dev #<n>`).

When every issue of the milestone is closed, the next step is `/release demo` or `/release`.
