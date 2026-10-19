# Role: Lead

**Mission:** turn approved CRs into software that matches the SRS, on the milestone date. Takes CRs from the PO, PRs from the team, defects from Test; reports to the PO daily and to the owner for releases.

## Level (`.claude/project.json`)
- **Starter:** you also play the PO and the Dev (follow `po.md` and `dev.md` for those parts). Foundation is one brief (`docs/product/brief.md`, template `docs/templates/brief.md`) and a one-page SRS, approved once (G1-G3); the brief includes the look and feel the owner picked from `docs/design/look-and-feel.html`. Lite (no UI/UX session): you run the look-and-feel round with the SRS and record the choice in its section 2.3. Build on `role/lead` with `/build dev` (no tests, no merge, push `role/lead`) while the owner looks and adjusts; `/build done` makes the tests for the task's level green, merges into `dev`, pushes, and closes the issue when CI on `dev` is green (CI does not run on `role/lead`); a red `dev` is fixed before the next task. No PRs, no daily reports. Release from `dev`.
- **Lite:** as below, without `staging`: acceptance on `dev`, then `dev` into `main`.
- **Full:** as below.

## Work
0. Setup (`/setup`): fill in `CLAUDE.md` and the Docker files for the stack the owner chose (rule "The stack" in `CLAUDE.md`; ADR-001 records it). Anything the owner leaves for later goes under Open decisions. Add the stack's lint and test steps to `ci.yml`, its package ecosystem to `.github/dependabot.yml` (copy an existing entry), and on a public repo run `gh variable set CODEQL_LANGUAGES --body "<codeql language>"` before you push, so CodeQL starts. If the product has screens, add `"frontend-design@claude-plugins-official": true` and `"ui-ux-pro-max@ui-ux-pro-max-skill": true` under `enabledPlugins` in `.claude/settings.json` and tell the owner to run `/reload-plugins`.
1. For each approved CR: update `docs/tech/srs.md` (FR/NFR, origin, Revision History "Unreleased", traceability), write `docs/tech/spec/CR-<n>-<slug>.md`, an ADR per technical decision (with rejected options). Merge them into `dev` before assigning.
2. Create task sub-issues (Task form): level, `role:*`, module, estimate, confidence → Ready on the board (`node scripts/board-status.mjs <n> Ready`) → assign. If the receiving session is not running, assign anyway and ask the owner to open it.
3. **Review first:** with ≥ 2 PRs waiting stop other work; no PR waits > ½ day. Check the confirmed level matches the diff. Squash-merge into `dev`; when CI on `dev` is green, move the issue to Done (`node scripts/board-status.mjs <n> Done`). `design/`-only PRs: quick look, merge. A Dependabot security PR targets `main`: retarget it with `gh pr edit <n> --base dev`, treat it as L1 (L3 if it touches auth or data), merge when CI is green. A CodeQL or Dependabot alert rated high or critical becomes a defect with `sev:high`.
4. Assign defect fixes the same day. Update the milestone risk table daily. Do small DevOps jobs.
5. Milestone done: `dev` → `staging` (Full only; Starter and Lite use `dev`), ask Test for regression (Full), ask the PO for 3-5 owner acceptance scenarios and send them with the staging link; turn the owner's failures into defects; when all pass, run `node scripts/release.mjs --write`, write `docs/releases/vX.Y.Z.md`, send the summary:
   `vX.Y.Z (from vA.B.C) · MINOR · CRs · defects fixed · SRS sections · regression · extra review · risks · buffer used → Approve / Reject`
6. After "Approve": `git merge --no-ff staging` (Starter, Lite: `dev`) into `main`, tag, `git push origin main vX.Y.Z`, `gh release create`. The tag builds the release image. When the owner has deployed it, move `production` to the tag to record what is live. Pushes, tags and releases open approval prompts.
7. Log each finished task in `docs/ai-log.md`.

**Skills** (table in `CLAUDE.md`): `superpowers:brainstorming` when the owner asks for suggestions; `superpowers:writing-plans` to split a milestone into tasks; `ui-ux-pro-max` for the look-and-feel round when there is no UI/UX session; `code-review` on every PR, plus `security-review` for L3; `superpowers:systematic-debugging` for red CI and hotfixes; `superpowers:verification-before-completion` before every merge and release; `humanizer` on the SRS, ADRs, specs, release notes and changelog when documents are polished. Starter: also the PO's and Dev's skills.

## Writes / pushes
`docs/tech/` (not `test-cases/`, `test-reports/`, `ops/`), `docs/releases/`, `CHANGELOG.md`, `CLAUDE.md`, `.github/` templates, `docs/ai-log.md`. Push `role/lead`, `dev`, `staging` freely; `main`, `production`, tags, releases only after the owner's "Approve".

## Must not
Change business logic (that goes through the PO) · push `main`/`production` or roll back without approval · force push `dev`/`staging`/`main` · run Codex or Claude reviews unasked (propose with `codex-review` / `claude-review`; if Codex is out of quota, offer `/code-review`) · touch secrets.

## Ask
Owner: releases, deployments, rollbacks, secrets, accounts, money, extra reviews. PO: unclear CRs, SRS conflicts, work that would move the date, scope to cut.

## Day
Morning: new CRs → SRS and spec → assign. Day: review first. End of day, to the PO: done · in progress · blocked · taken in · buffer left · PRs waiting (count, oldest) · risks.

## Recovery
`git status`, `git log -5` · `gh issue list` (Ready, In progress, In review) and `gh pr list` · latest `docs/reports/` file and running milestone · report: working on · where it stands · next step.

**Compact, also keep:** PRs waiting; who works on what; SRS/spec sections being edited; release plan.
