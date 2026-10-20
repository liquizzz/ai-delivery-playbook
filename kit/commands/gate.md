---
description: Check a gate (G1-G6) against the repo and GitHub before asking the owner to approve it
argument-hint: <gate, e.g. G3 or G5 v1.4.0>
---

Check gate **$ARGUMENTS** of the Crewbook process for this repository.

1. Read the level and whether there is a design prototype in `.claude/project.json` (no file: full process). Find the gate's criteria in the table below and apply the notes for the level. G4-G6 apply to a milestone: use the version given, or the running milestone.
2. For each criterion, look for evidence in the repo and on GitHub (`gh issue list`, `gh pr list`, `gh run list`). Read the files and run the checks; do not assume.
3. Report a table: criterion · pass / fail / unclear · evidence (file and line, issue, run) · what is missing.
4. End with one line: **Ready for approval** or **Not ready**, and the smallest list of actions to get there. If ready, add the `For you` block from `CLAUDE.md` (with links), so the owner knows what to try before approving.
5. Do not change any file. Do not mark the gate as passed: only the owner approves a gate.

**No design prototype** (`design: false`): skip the `design-v1` tag in G3; the screens are approved through the look and feel the owner picked (`design/look-and-feel.html`, recorded in SRS section 2.3) and the main screens shown in G3.

**Approved later:** an item that waits for someone outside the team (for example a table description from the client) may be approved after the gate when it has an issue, a due date and the step that needs it. List it under the table as "approved later".

**Lite level:** G1 accepts a one-page proposal (timeline and budget in a line each). G2 needs the PRD and stories with testable acceptance (data notes only when data comes from an existing system). G3 needs the approved design, the stack ADR, the SRS baseline, ADRs for real choices, labels, the board and the first milestone; no C4, test strategy or eval plan, and no `staging` branch. G5: no `staging` and no Test session: CI is green on `dev`, each issue reports its level tests, and no `sev:high` or `sev:medium` defect is open. G6 merges `dev` into `main`.

| Gate | Criteria |
|---|---|
| G1 Proposal approved | `docs/product/proposal.md` states problem, users, chosen option, scope, out of scope, success metric, timeline and budget, with an approval date; `CLAUDE.md`, `.claude/` (roles, hook, settings), `.github/` and `scripts/` in place; `.gitignore` covers `.env*`, `.claude/role`; secret-check hook installed; `docker compose version` works; `node .claude/hooks/role-guard.test.cjs` passes. No app is needed yet: the stack comes at G3 |
| G2 Requirements approved | `docs/product/prd.md` approved with must-haves, non-goals and measurable metrics; when data comes from an existing system, `docs/product/data-notes.md` maps every product field to a real source field; every must-have has a story in `docs/product/stories/` with testable acceptance criteria |
| G3 Design, stack and SRS approved | the design approved before the stack (look and feel and main screens, or flows and interfaces without screens; with a prototype the `design-v1` tag); the stack ADR with rejected options and a live check of each outside service, `.claude/ownership.json` covering the stack's folders, and `docker compose up --build` starts the project; `docs/tech/srs.md` baseline: every must-have covered by FR IDs, NFRs with targets, Revision History and traceability matrix present; every significant decision has an accepted ADR in `docs/tech/adr/`; `docs/tech/test-strategy.md` gives pass marks, and when the product has AI features `docs/tech/eval-plan.md` does too; labels, board and first milestone exist on GitHub; `dev` and `staging` branches exist |
| G4 Milestone built | Every issue in the milestone is closed or moved with a note; every merged PR has `Closes #n`, a change level and green CI; SRS and `CHANGELOG.md` "Unreleased" updated for every `type:*` issue |
| G5 Milestone accepted | `dev` merged into `staging`; `docs/tech/test-reports/vX.Y.Z.md` shows full regression passed (and, with AI features, eval pass marks met); no open `sev:high` or `sev:medium` defects (or accepted by the owner) |
| G6 Released | `scripts/release.mjs` run; `CHANGELOG.md` and SRS Revision History show vX.Y.Z; `docs/releases/vX.Y.Z.md` complete, with every owner acceptance scenario confirmed and the owner's approval; tag `vX.Y.Z` on `main`; after 1.0.0, `production` at the tag and smoke test recorded |
