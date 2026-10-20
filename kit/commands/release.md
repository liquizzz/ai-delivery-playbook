---
description: Full build and test of the milestone. "/release demo" for a client demo (no tag); "/release" also tags and publishes.
argument-hint: demo | [version, e.g. v0.1.0]
---

Release: **$ARGUMENTS** (no version given: the milestone that is done). You are the Lead.

1. Read `.claude/project.json` (level). Check gate G4 for the milestone with the criteria in `.claude/commands/gate.md`: every issue closed through `/build done`, tests for each level green, CI green on `dev`. If it is not ready, report what is missing and stop.
2. Full: merge `dev` into `staging` and ask the Test session for the regression (hand-off block for "<Project> - Test"). Lite: run the full test suite on `dev` yourself.
3. Start the build the owner will try from the image CI already built: `node scripts/run.mjs dev` (it waits for the healthcheck and opens the browser); `node scripts/run.mjs --source` only if that image is missing. Give the owner the link to open it (or the one command that starts it) and 3-5 acceptance scenarios in plain words (steps, expected result, one example of a wrong result), and for a product with screens always one at a narrow window (about 390 px wide). Commands are for the owner's shell. Wait for "All pass" or the failures; turn each failure into a defect and fix it first.
4. **`/release demo` stops here:** report the image tag and the link or command to show the client. Nothing is tagged.
5. **`/release`:** run `node scripts/release.mjs --write` (it handles both line endings and warns if the changelog was not updated), write `docs/releases/<version>.md`, update `CHANGELOG.md`, the SRS revision row and the Stage line in `CLAUDE.md`. Check gate G6 and ask for the final approval in the fixed form (gate table, `For you` block, question): what will be published, the scenarios the owner passed, the evidence (CI, tests, image), open risks. After "Approved": merge into `main` (Full: from `staging`; Lite: from `dev`), tag, `git push origin main <version>`, `gh release create`.
6. Check live state (`gh run list --limit 3`): the tag builds `ghcr.io/<owner>/<repo>-app:<version>` with its SBOM and, on a public repo, a build attestation. Report in a few lines the image and the one command that runs it: `node scripts/run.mjs <version>`.
