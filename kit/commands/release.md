---
description: Prepare a release and the owner's acceptance test, then tag it after approval
argument-hint: [version, e.g. v0.1.0]
---

Prepare release **$ARGUMENTS** (none given: the milestone that is done). You are the Lead.

1. Read `.claude/project.json` (level). Check gate G4 for the milestone with the criteria in `.claude/commands/gate.md`; if it is not ready, report what is missing and stop.
2. Full: merge `dev` into `staging` and ask the Test session for the regression (`Next: open "<Project> - Test" and paste: …`). Starter and Lite: the owner tests on `dev`.
3. Give the owner 3-5 acceptance scenarios in plain words (steps, expected result, one example of a wrong result) and the commands to start the build in Docker, written for the owner's shell. Wait for "All pass. Approve <version>" or the failures; turn each failure into a defect and fix it first.
4. After approval: run `node scripts/release.mjs --write`, write `docs/releases/<version>.md`, update `CHANGELOG.md` and the SRS revision row, and check gate G6 the same way, ending with the `For you` block. Ask once more, then merge into `main` (Full: from `staging`, Starter and Lite: from `dev`), tag, `git push origin main <version>`, `gh release create`.
5. Check live state (`gh run list --limit 3`): the tag builds the image `ghcr.io/<owner>/<repo>-app:<version>` with its SBOM. Report the image and how to run it (step "Run the release in Docker" in `START-HERE.md`).
