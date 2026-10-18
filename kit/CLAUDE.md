# <Project name>

<One paragraph: what the product does, for whom, the success metric.>

AI Delivery Playbook project. Steps for the owner: `START-HERE.md`.
- Level: <Starter / Lite / Full process>. Change it with `node scripts/set-level.mjs <starter|lite|full>`.
- Stage: <Foundation, next gate G# / Delivery, milestone vX.Y.Z>.

## Role
Your role is in `.claude/role`; read `.claude/roles/<role>.md` first. Restart: "Read CLAUDE.md and continue as <role>." Flow: owner ↔ PO → Lead → Dev / Test / UI/UX / DevOps. Each role writes only its own paths and pushes only `role/<role>`; the Lead merges and releases.

## Ask the owner before
The morning plan · L2-L3 CRs · scope, priority or date changes · releases to `main`, deployments and rollbacks · accounts, money, secrets, logins, deleting data · extra AI reviews. Never read or create secrets.

## Where things are
Product `docs/product/` (proposal, PRD, stories, CRs, DECs, milestones) · requirements `docs/tech/srs.md` (IDs `FR-xxx`, `NFR-xxx`) · specs `docs/tech/spec/` · ADRs `docs/tech/adr/` · reports `docs/reports/` · your work: `gh issue list --assignee @me`. Read only the section you need.

## Stack and commands
- Stack: <language, framework, database, hosting>
- Install `pnpm install` · run `pnpm dev` (port in `.env.local`) or `docker compose up --build` · test `<...>` · lint `<...>`
- Everything runs in Docker; each release tag builds an image. Deployment to servers is the owner's own process.
- New worktree `node scripts/new-role-worktree.mjs <role>` · release (Lead) `node scripts/release.mjs [--write]`

## Rules
- **Ask first, then finish.** If a request lacks anything the result needs (template fields, acceptance, scope, priority, milestone, level, approver), ask all questions in one numbered list with a proposed answer each, wait, then do the whole task. If nothing is missing, say so and start.
- **Docs lead code.** SRS and spec are on `dev` before a task starts. Unclear? Ask (Dev/Test → Lead → PO); never deviate silently.
- **Decided means written:** record it in the CR, issue, DEC or ADR as soon as it is decided.
- **One task in progress**, only assigned issues, only your paths.
- **Git:** own worktree; merge `dev` in, never rebase; no force push to `dev`/`staging`/`main`; no `--no-verify`. Commit `<type>(<module>): <summary> (#n)`. Done = push your branch, PR into `dev` with `Closes #n`, send the Lead the link.
- **Change level** L0 display · L1 setting · L2 module logic · L3 core (money, security, personal data, deletes are always L3). Confirm the level against the actual change before testing; test only that scope; raise it if wider, never lower it.
- **Hand-offs** are issue comments: `Hand-off <from> → <to> · #n · Done / Needs changes / Blocked · <branch>@<sha> · L<n> · <module> · done: … · next: … · risks: …`. Messages between sessions only notify, with a link.
- **Tokens:** no `/goal` or `/loop` unless the owner asks; short command output; paste only the relevant lines; stop when the step is done.
- **Secrets** live in git-ignored `.env*`; `.env.example` holds `CHANGE_ME`.
- <Project hard rules.>
- The Lead logs each finished task in `docs/ai-log.md`.

## Compact instructions
Keep: role; current issue (number, status, next step); branch and last commit; decisions and reasons; items waiting for the owner; open risks; role-specific items from your role file. Drop command output, file contents already read, rejected options. After compacting, re-run your role file's recovery steps.
