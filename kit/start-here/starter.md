# Start here: {{name}}

Level: **Starter**. One Claude Code session plays PO, Lead and Dev. Each step is one command: type it, answer Claude's questions round by round (or say "you decide"), check the result, go to the next step. Type `/` in the session to see the kit's commands.

Done by `init`: the kit, branches `main` and `dev`, GitHub repo {{repo}} with labels and a kanban board, and the Lead worktree `{{lead}}`.

**Gates** are the points where Claude stops and you approve before it goes on. The book has six (G1-G6); Starter joins G1-G3 into one approval of the brief. Before each approval, Claude ends with a **For you** block: what the gate means, what to try yourself with the expected result and an example of a wrong one, and what tests and CI already prove. Try those items before you say "Approved". The book explains any step in more depth (chapter numbers in brackets).

## 1. Finish the setup (ch. 1)

**Open** Claude Code desktop in `{{lead}}` and name the session "{{name}} - Lead". Use this one session for every step below.

**Type:** `/setup`

**Claude asks,** one topic per round: what the product needs (screens, users, data), then 2-3 stack options for you to choose from, then commands and hard rules.
**You do:** if the repo is new, open {{actions}} and click **Enable Actions on this repository** if GitHub shows it; Claude then checks that CI ran. Open the kanban board once (GitHub → your profile → Projects) and choose View → Layout → Board.
**You get:** CLAUDE.md, Docker files and CI fitted to your stack; ADR-001 for the stack; milestone v0.1.0. If Claude enabled the design plugins, run `/reload-plugins`.

## 2. Brief: gate G1-G3 (ch. 8)

**Type:** `/brief <your idea in two or three sentences>`

**Claude asks,** one topic per round: who it is for and the problem, the success metric, the stories for v0.1.0 (the thinnest slice: screen → logic → data), what is out of scope, data and deletes, then the look and feel: Claude searches styles, colours and fonts that suit the product and shows 2-3 directions in `docs/design/look-and-feel.html`.
**You do:** open that file in your browser and pick a direction (or ask for a mix).
**You check:** `docs/product/brief.md`: the stories have testable acceptance, the look and feel is the one you picked, and v0.1.0 is small (a day or two of work). Say "Approved" or what to change.

## 3. Build: gates G4-G5 (ch. 4)

**Type:** `/build`

**Claude does:** builds each task on `role/lead` with tests for its change level, commits with the issue number, runs the tests locally, merges into `dev` and pushes. CI then runs on `dev`; Claude closes the issue only when that run is green. No pull requests in Starter.
**You check:** the report: what was built, the level of each change, tests and CI passing.

## 4. Release v0.1.0: gate G6 (ch. 5)

**Type:** `/release`

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

Close the session. Open a new one in `{{lead}}` and type `/change <one small fix>`, then `/build` and `/release`.

**You check:** the new session finds everything from the record alone and releases the fix as v0.1.1.

## Any time

| Need | Type or run |
|---|---|
| Where the project stands | `/status` |
| A change | `/change <what, in business terms>` |
| Is a gate ready? | `/gate <G1-G6>` |
| Restart after closing a session | "Read CLAUDE.md and continue as lead." |
| Other people start using it | `node scripts/set-level.mjs lite` in `{{main}}`, then tell the Lead: "We moved to Lite. Draft what this level still lacks." A client, money, security or personal data: use `full` instead |
| Save tokens | `/compact` after each milestone |
