# AI Delivery Log

One line per task. Evidence of how AI was used across the lifecycle and where the human stayed in control.

| Date | Phase | Task | AI did | Human did | Rework loops | Time |
|---|---|---|---|---|---|---|
| 2026-10-11 | 1 Planning | Scaffold playbook: process, PRD / ADR / user story templates | Drafted process table, gates and three templates | Set scope (week-1 plan), reviews and edits pending | 0 | 0.5h |
| 2026-10-12 | 1 Planning | Life cycle by SDLC phases | Restructured the process into 7 SDLC phases run as Waterfall for 1–2 week projects, with gates G1–G6, lock-once change control and the phase in which each role session opens; agent-team guide | Set the phase model and the rule that short projects lock each phase once | 0 | 1h |
| 2026-10-12 | 1 Planning | Templates, Claude Code kit, worked example | Wrote proposal, data notes, spec, C4, test strategy, eval plan, roles, board, release checklist and case study templates; sample `CLAUDE.md`, `/gate` command, secret-check hook (tested on 8 cases); worked example from the AI article finder project; checked links and diagrams | Reviewed the example timeline; final review pending | 1 (hook false positive on env-var reads, fixed) | 1.5h |
| 2026-10-14 | 1 Planning | Second worked example: EA DCA Hedging (POC) | Moved the trading-bot project onto the playbook's phases, gates, board and kit; wrote the example (black-box rebuild, requirements recovered from real trade history, anonymised third-party account) | Asked for the project to follow the shared playbook and be published as an example; review pending | 1 (a project-specific POC playbook was dropped because it diverged from the shared process) | 1h |
| 2026-10-14 | 1 Planning | Example update: Agile delivery | Renamed the example to "EA Bot trading with AI support"; added the Agile mode (two iterations running phases 2–6) and the time boxes | Chose Agile and the time boxes; set the example name | 0 | 0.2h |
| 2026-10-14 | 2 Requirements | Example update: EA Bot G2 | Added the phase 2 record to the example: structured interview, hedging and pruning rules, data-versus-intent deviations, risk review and CR-01 | Approved G2; review of the example pending | 0 | 0.3h |
| 2026-10-14 | 3 Design | Example update: EA Bot G3 | Added the phase 3 record: architecture questions, six ADRs, two gaps caught as change requests, log format as the Dev/Test contract, three-role team | Approved G3 and the update | 0 | 0.3h |
| 2026-10-15 | 4 Implementation | Example update: EA Bot spec review | Added the phase 4 record so far: Lead review of Dev and Test plans, isolated test environment, the spec review that paused coding and its change request | Approved the update | 0 | 0.3h |
