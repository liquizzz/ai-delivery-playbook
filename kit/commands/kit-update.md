---
description: Bring this project up to the newest Crewbook kit, keeping the project's own files and rules (Lead only)
argument-hint: "[path to a crewbook-build checkout]"
---

Kit update: **$ARGUMENTS**. Only the Lead runs this, in its own worktree. If `.claude/role` is not `lead`, say "Run /kit-update in the Lead session." and stop.

1. **Get the kit.** With a path, use that checkout of crewbook-build and run `git -C <path> pull --ff-only`. Without one, use `~/.crewbook/crewbook-build`: clone `https://github.com/liquizzz/crewbook-build` there the first time, `git pull --ff-only` after that.
2. **Prepare.** Commit or finish your own work first. Merge `dev` into `role/lead`. Open an issue "chore: update the Crewbook kit" (label L1) and put it In progress.
3. **Plan.** Run `node <kit>/kit/update.mjs --dry-run`. Show the owner, in their language and in a few lines: the kit versions (from → to), the kit decisions since their version that change how they work (at most five, in plain words), and what will happen to their files: added, replaced, removed, merged, kept. Name every file listed under "had changes made in this project" or "Kept" and say what that means. Ask: "Update the kit now?"
4. **Update.** On yes, run `node <kit>/kit/update.mjs`. Read `git diff` yourself:
   - each file under "had changes made in this project": put back a project change that the new kit does not cover, and say so;
   - each file under "Kept": compare it with the kit's version and list what the kit added (a new job, a healthcheck) as a suggestion for the owner; change nothing yourself;
   - `CLAUDE.md`: check that the description, Stage, Open decisions, stack lines and the project's own rules and sections are all there;
   - when the report says START-HERE changed and the project is not in English, rewrite `START-HERE.md` in the owner's language from `.claude/start-here/<level>.md`.
5. **Test.** Run the project's tests and `node .claude/hooks/role-guard.test.cjs`. Commit `chore(kit): update Crewbook kit to <version> (#n)` and open a PR into `dev`. A kit update changes how every session works, so it always waits for the owner's OK, even with auto-merge on.
6. **After the merge.** Run `node scripts/plugins.mjs` and `node scripts/setup-labels.mjs` (both only add what is missing), close the issue, and tell every running session: "Merge dev: the kit was updated. Then restart this session." With relay on, send it yourself; otherwise give the owner one hand-off block per session.
