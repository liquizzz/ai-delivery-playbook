# Start here: {{name}}

Level: **Starter**. One Claude Code session plays PO, Lead and Dev. Each step is one prompt: paste it, answer Claude's questions round by round (or say "you decide"), check the result, go to the next step.

Done by `init`: the kit, branches `main` and `dev`, GitHub repo {{repo}} with labels and a kanban board, and the Lead worktree `{{lead}}`.

**Gates** are the points where Claude stops and you approve before it goes on. The book has six (G1-G6); Starter joins G1-G3 into one approval of the brief. The book explains any step in more depth (chapter numbers in brackets).

## 1. Finish the setup (ch. 1)

**Open** Claude Code desktop in `{{lead}}` and name the session "{{name}} - Lead". Use this one session for every step below.

**Paste:**
> Read CLAUDE.md and continue as lead. Finish the Starter setup: ask me one topic at a time; I choose the stack from your options. Then fill in CLAUDE.md, the Docker files and CI, and create milestone v0.1.0 on GitHub.

**Claude asks,** one topic per round: what the product needs (screens, users, data), then 2-3 stack options for you to choose from, then commands and hard rules.
**You do:** if the repo is new, open {{actions}} and click **Enable Actions on this repository** if GitHub shows it; Claude then checks that CI ran. Open the kanban board once (GitHub → your profile → Projects) and choose View → Layout → Board.
**You get:** CLAUDE.md, Docker files and CI fitted to your stack; ADR-001 for the stack; milestone v0.1.0.

## 2. Brief: gate G1-G3 (ch. 8)

**Paste:**
> Start the Starter brief for `<your idea in two or three sentences>`. Interview me one topic at a time, then write the brief, a one-page SRS and the v0.1.0 plan.

**Claude asks,** one topic per round: who it is for and the problem, the success metric, the stories for v0.1.0 (the thinnest slice: screen → logic → data), what is out of scope, data and deletes.
**You check:** `docs/product/brief.md`: the stories have testable acceptance, and v0.1.0 is small (a day or two of work). Say "Approved" or what to change.

## 3. Build: gates G4-G5 (ch. 4)

**Paste:**
> Build milestone v0.1.0.

**Claude does:** opens the CR and its tasks on GitHub, builds each task on `role/lead` with tests for its change level, commits with the issue number, and merges into `dev` when CI is green. No pull requests in Starter.
**You check:** the report: what was built, the level of each change, tests and CI passing.

## 4. Release v0.1.0: gate G6 (ch. 5)

**Paste:**
> Milestone v0.1.0 is done. Prepare the release and my acceptance test (Starter mode).

**Claude gives you:** 3-5 scenarios and the commands to start `dev` in Docker.
**You do:** try every scenario yourself, then say "All pass. Approve v0.1.0" or what failed. Claude asks once more before pushing `main` and the tag `v0.1.0`; the tag builds the image `{{image}}:v0.1.0`.

## 5. Run the release in Docker

From source, in a terminal:
```
cd {{main}}
git pull
git checkout v0.1.0
docker compose up --build -d app
```
Open http://localhost:3000. Stop with `docker compose down`, then `git checkout main`.

From the published image (private repo: log in once):
```
gh auth refresh -s read:packages
gh auth token | docker login ghcr.io -u {{owner}} --password-stdin
cd {{main}}
$env:IMAGE_TAG="v0.1.0"; docker compose up --no-build -d app
```
On macOS or Linux, the last line is `IMAGE_TAG=v0.1.0 docker compose up --no-build -d app`.

## 6. Prove the loop (optional, ch. 6)

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
