---
description: Check a phase gate (G1–G6) against the repo before asking the human to approve it
argument-hint: <gate, e.g. G3>
---

Check gate **$ARGUMENTS** of the AI Delivery Playbook for this repository.

1. Find the gate's criteria in the table below.
2. For each criterion, look for evidence in the repo (files, tests, board rows). Read the files; do not assume.
3. Report a table: criterion · pass / fail / unclear · evidence (file and line) · what is missing.
4. End with one line: **Ready for approval** or **Not ready**, and the smallest list of actions to get there.
5. Do not change any file. Do not mark the gate as passed: only the human approves a gate.

| Gate | Criteria |
|---|---|
| G1 Proposal locked | `docs/proposal.md` states problem, users, chosen option, scope, out of scope, success metric, timeline and budget, with a lock date; `CLAUDE.md` exists; `.gitignore` covers `.env`; secret-check hook installed in `.git/hooks/pre-commit` |
| G2 Requirements locked | `docs/prd.md` locked with must-haves, non-goals and measurable metrics; `docs/data-notes.md` maps every product field to a real source field; every must-have has at least one story in `docs/stories/` with testable acceptance criteria |
| G3 Design locked | `docs/spec.md` has API, schema and config contracts; every significant decision has an accepted ADR in `docs/adr/`; UI approved in `docs/design/`; `docs/test-strategy.md` and `docs/eval-plan.md` give pass marks for every metric; `docs/roles.md` and `docs/board.md` list every task with an owner role and a done check |
| G4 Build complete | All planned tasks `done` on the board; build, lint and unit tests pass locally (run them) |
| G5 Accepted | Every acceptance criterion covered by a test; the latest eval report meets the pass marks; no open high-severity defects |
| G6 Released | `docs/releases/<version>.md` checklist complete; smoke test recorded |
