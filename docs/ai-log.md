# AI Delivery Log

One line per task. Evidence of how AI was used across the lifecycle and where the human stayed in control.

| Date | Phase | Task | AI did | Human did | Rework loops | Time |
|---|---|---|---|---|---|---|
| 2026-10-18 | Playbook | Team operating model v2 | Reviewed the playbook against the agreed team process; rewrote process (Foundation + milestone loop, CRs, SemVer from labels, releases, rollback, daily rhythm) and agent-team (roles incl. PO, worktrees and branches, push rules, GitHub issues/board, DoR/DoD, WIP, L0–L3 testing, continuity, machines, front-end pipelines); added SRS, CR, DEC, milestone, daily report, test cases, test report and changelog templates; rebuilt the kit (shared CLAUDE.md, six role files, role-guard hook with 56 test cases, settings, issue forms, PR template, five workflows, worktree/labels/release scripts, setup guide, /gate) | Decided every rule of the process in a working session; removed the old examples and reset the repo history; reviews pending | 1 (per-worktree permission files dropped after checking Claude Code docs: role logic moved into the hook) | 3h |
