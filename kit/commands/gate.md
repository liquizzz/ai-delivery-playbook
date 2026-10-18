---
description: Check a gate (G1–G6) against the repo and GitHub before asking the owner to approve it
argument-hint: <gate, e.g. G3 or G5 v1.4.0>
---

Check gate **$ARGUMENTS** of the AI Delivery Playbook for this repository.

1. Find the gate's criteria in the table below. G4–G6 apply to a milestone: use the version given, or the running milestone.
2. For each criterion, look for evidence in the repo and on GitHub (`gh issue list`, `gh pr list`, `gh run list`). Read the files and run the checks; do not assume.
3. Report a table: criterion · pass / fail / unclear · evidence (file and line, issue, run) · what is missing.
4. End with one line: **Ready for approval** or **Not ready**, and the smallest list of actions to get there.
5. Do not change any file. Do not mark the gate as passed: only the owner approves a gate.

| Gate | Criteria |
|---|---|
| G1 Proposal approved | `docs/product/proposal.md` states problem, users, chosen option, scope, out of scope, success metric, timeline and budget, with an approval date; `CLAUDE.md`, `.claude/` (roles, hook, settings), `.github/` and `scripts/` in place; `.gitignore` covers `.env*`, `.claude/role`; secret-check hook installed; `docker compose version` works and `docker compose up --build` starts the project; `node .claude/hooks/role-guard.test.cjs` passes |
| G2 Requirements approved | `docs/product/prd.md` approved with must-haves, non-goals and measurable metrics; `docs/product/data-notes.md` maps every product field to a real source field; every must-have has a story in `docs/product/stories/` with testable acceptance criteria |
| G3 Design approved | `docs/tech/srs.md` baseline: every must-have covered by FR IDs, NFRs with targets, Revision History and traceability matrix present; every significant decision has an accepted ADR in `docs/tech/adr/`; UI approved (`design-v1` tag); `docs/tech/test-strategy.md` and `docs/tech/eval-plan.md` give pass marks; labels, board and first milestone exist on GitHub; `dev` and `staging` branches exist |
| G4 Milestone built | Every issue in the milestone is closed or moved with a note; every merged PR has `Closes #n`, a change level and green CI; SRS and `CHANGELOG.md` "Unreleased" updated for every `type:*` issue |
| G5 Milestone accepted | `dev` merged into `staging`; `docs/tech/test-reports/vX.Y.Z.md` shows full regression passed and eval pass marks met; no open `sev:high` or `sev:medium` defects (or accepted by the owner) |
| G6 Released | `scripts/release.mjs` run; `CHANGELOG.md` and SRS Revision History show vX.Y.Z; `docs/releases/vX.Y.Z.md` complete, with every owner acceptance scenario confirmed and the owner's approval; tag `vX.Y.Z` on `main`; after 1.0.0, `production` at the tag and smoke test recorded |
