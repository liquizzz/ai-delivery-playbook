# Start here: {{name}}

Level: **Lite**. Three Claude Code sessions: PO (your requests), Lead (SRS, review, release) and Dev1 (builds). Each step is one command in one session. Claude shows a short guide of what it needs; you answer in your own words, say "later" for anything you have not decided, "suggest" when you want ideas, and "lock" when you are done. Claude sums up, you approve, then it writes. Type `/` in a session to see the kit's commands.

Done by `init`: the kit, branches `main` and `dev`, GitHub repo {{repo}} with labels and a kanban board, and three worktrees: PO `{{po}}`, Lead `{{lead}}`, Dev1 `{{dev1}}`.

**Gates** are the points where a session stops and you approve before it goes on: G1 proposal, G2 requirements, G3 SRS and plan, G4 built, G5 tested, G6 released. Before each approval, Claude ends with a **For you** block: what the gate means, what to try yourself with the expected result and an example of a wrong one, and what tests and CI already prove. Try those items before you say "Approved". The book explains any step in more depth (chapter numbers in brackets).

## 1. Finish the setup (ch. 1). Session: Lead

**Open** Claude Code desktop in `{{lead}}`, name it "{{name}} - Lead", and type `/setup`.

**You say:** whether you already have a stack, whether the product has screens and who uses it, what data it keeps, any hard rules. "Later" is fine; Claude lists what is still open.
**You do:** if the repo is new, open {{actions}} and click **Enable Actions on this repository** if GitHub shows it. Open the board once (GitHub → your profile → Projects), choose View → Layout → Board, and click **Save**.
**You get:** CLAUDE.md, Docker files and CI fitted to your stack, merged into `dev`; ADR-001 for the stack; milestone v0.1.0. If Claude enabled the design plugins, run `/reload-plugins`.

## 2. Open the other two sessions (ch. 2)

Open a session in `{{po}}` named "{{name}} - PO" and one in `{{dev1}}` named "{{name}} - Dev1". Each one knows its role when it starts.

## 3. Proposal: gate G1 (ch. 3). Session: PO

Type `/brief <your idea, in your own words>`. Then say who it is for, what the first version must do, what is out, and how you will know it works; the PO asks only about what is missing.

**You check:** the proposal and its options. Approve or say what to change.

## 4. Requirements: gate G2 (ch. 3). Session: PO

Type `/brief` again: it goes on to the PRD and stories.

**You check:** every story has testable acceptance, and v0.1.0 holds only what you need first. Approve.

## 5. SRS and first milestone: gate G3 (ch. 3). Session: Lead

Type `/brief`: the Lead writes the SRS baseline and plans milestone v0.1.0 as the thinnest end-to-end slice. For screens it asks whether you have a look in mind, then shows 2-3 directions.

**You do:** open `docs/design/look-and-feel.html` in your browser and pick, mix or change a direction.
**You check:** the SRS records the direction you picked, and the milestone is small. Approve.

## 6. Build: gates G4-G5 (ch. 4). Sessions: Dev1, then Lead

Type `/build` in the Lead: it assigns the v0.1.0 tasks to Dev1. In Dev1, `/build dev #<n>` codes and runs a task quickly (no tests, no merge, pushed to `role/dev1`); `/build done #<n>` makes the tests for its level green and opens a PR. Only the Lead merges into `dev`. Each time a session hands work to another, its report ends with **Next: open "{{name}} - <Role>" and paste: "…"**. Do exactly that. To skip these switches, ask the Lead to message the other sessions itself (ch. 2, section 5).

## 7. Release v0.1.0: gate G6 (ch. 5). Session: Lead

Type `/release demo` to show it to someone without publishing, or `/release` to publish.

**You do:** try the 3-5 scenarios yourself on `dev` (one at a narrow window when there are screens), then say "All pass" or what failed. The Lead asks before pushing `main` and the tag; the tag builds the image `{{image}}:v0.1.0`.

## 8. Run the release in Docker

From the published image (if the repo is private, log in once first: `gh auth refresh -s read:packages`, then `gh auth token | docker login ghcr.io -u {{owner}} --password-stdin`):
```
cd {{main}}
git checkout main
git pull
$env:IMAGE_TAG="v0.1.0"; docker compose up --no-build -d app
```
On macOS or Linux, the last line is `IMAGE_TAG=v0.1.0 docker compose up --no-build -d app`.

From source:
```
cd {{main}}
git checkout v0.1.0
$env:IMAGE_TAG="v0.1.0"; docker compose up --build -d app
```
Open http://localhost:3000. Stop with `docker compose down`, then `git checkout main`.

## Any time

| Need | Type or run |
|---|---|
| Where the project stands, and what is still open | `/status` (any session) · PO: "Morning brief." |
| A change | PO: `/change <what, in business terms>` |
| Is a gate ready? | `/gate <G1-G6>` |
| Restart after closing a session | "Read CLAUDE.md and continue as `<role>`." |
| Change the level | `node scripts/set-level.mjs <starter or full>` in `{{main}}`, then tell the Lead: "We moved to `<level>`. Draft what this level still lacks." |
| Save tokens | `/compact` each session after each gate or milestone |
