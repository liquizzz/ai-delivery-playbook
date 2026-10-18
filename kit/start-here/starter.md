# Start here: {{name}}

Level: **Starter**. One Claude Code session plays PO, Lead and Dev. Each step is one prompt: paste it, answer Claude's questions in one reply, check the result, go to the next step. The book explains any step in more depth (chapter numbers in brackets).

Done by `init`: the kit, branches `main` and `dev`, GitHub repo {{repo}}, and the Lead worktree `{{lead}}`.

## 1. Finish the setup (ch. 1)

**Open** Claude Code desktop in `{{lead}}` and name the session "{{name}} - Lead". Use this one session for every step below.

**Paste:**
> Read CLAUDE.md and continue as lead. Finish the Starter setup: ask me the stack and commands, then fill in CLAUDE.md and the Docker files, and create milestone v0.1.0 on GitHub.

**Claude asks:** stack, run and test commands, hard rules.
**You get:** CLAUDE.md and the Docker files fitted to your stack; milestone v0.1.0.

## 2. Proposal: gate G1 (ch. 3)

**Paste:**
> Start phase 1 for `<your idea in two or three sentences>`. Interview me, then draft a one-page proposal.

**Claude asks:** who it is for, the problem, the success metric, limits.
**You check:** the proposal and its options. Say "Approved" or what to change.

## 3. Requirements: gate G2 (ch. 3)

**Paste:**
> Proposal approved. Write a short PRD with stories.

**You check:** the stories cover what you want in v0.1.0. Approve.

## 4. SRS and first milestone: gate G3 (ch. 3)

**Paste:**
> Write the SRS baseline and plan milestone v0.1.0 as the thinnest end-to-end slice (screen → logic → data).

**You check:** the milestone is small (a few days at most). Approve.

## 5. Build (ch. 4)

**Paste:**
> Build milestone v0.1.0.

**Claude does:** a CR and tasks on GitHub, code on `role/lead`, tests by change level, merges into `dev`.
**You check:** Claude's report: what was built, the level of each change, tests passing.

## 6. Release v0.1.0 (ch. 5)

**Paste:**
> Milestone v0.1.0 is done. Prepare the release and my acceptance test (Starter mode).

**Claude gives you:** 3-5 scenarios and how to start the app.
**You do:** try the scenarios yourself, then approve. Claude asks before pushing `main` and the tag `v0.1.0`.

## 7. Run the release in Docker (ch. 1, section 4)

**Paste:**
> Show me how to run v0.1.0 in Docker on this machine, from the tag and from the published image.

**You get:** the commands, usually `git checkout v0.1.0` then `docker compose up --build` (from source), or `IMAGE_TAG=v0.1.0 docker compose up --no-build` (the image GitHub built from the tag). Open the app in a browser and try one scenario again.

## 8. Prove the loop (optional, ch. 6)

Close the session. Open a new one in `{{lead}}` and paste:
> Read CLAUDE.md and continue as lead. Small change: `<one small fix>`.

**You check:** the new session finds everything from the record alone and releases the fix as v0.1.1.

## Any time

| Need | Say or run |
|---|---|
| Where the project stands | "Where are we?" |
| A change | "I want `<what, in business terms>`." |
| Restart after closing a session | "Read CLAUDE.md and continue as lead." |
| More roles (real users, a second developer, personal data) | `node scripts/set-level.mjs lite` in `{{main}}`, then tell the Lead: "We moved to Lite. Draft what this level still lacks." |
| Save tokens | `/compact` after each milestone |
