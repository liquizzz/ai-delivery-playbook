# Start here: {{name}}

Level: **Lite**. Three Claude Code sessions: PO (your requests), Lead (SRS, review, release) and Dev1 (builds). Each step is one prompt to one session: paste it, answer the questions round by round (or say "you decide"), check the result, go on.

Done by `init`: the kit, branches `main` and `dev`, GitHub repo {{repo}} with labels and a kanban board, and three worktrees: PO `{{po}}`, Lead `{{lead}}`, Dev1 `{{dev1}}`.

**Gates** are the points where a session stops and you approve before it goes on: G1 proposal, G2 requirements, G3 SRS and plan, G4 built, G5 tested, G6 released. Before each approval, Claude ends with a **For you** block: what the gate means, what to try yourself with the expected result and an example of a wrong one, and what tests and CI already prove. Try those items before you say "Approved". The book explains any step in more depth (chapter numbers in brackets).

## 1. Finish the setup (ch. 1). Session: Lead

**Open** Claude Code desktop in `{{lead}}`, name it "{{name}} - Lead", and paste:
> Read CLAUDE.md and continue as lead. Finish the Lite setup: ask me one topic at a time; I choose the stack from your options. Then fill in CLAUDE.md, the Docker files and CI, and create milestone v0.1.0 on GitHub.

**Claude asks,** one topic per round: what the product needs (screens, users, data), then 2-3 stack options for you to choose from, then commands and hard rules.
**You do:** if the repo is new, open {{actions}} and click **Enable Actions on this repository** if GitHub shows it. Open the board once (GitHub → your profile → Projects) and choose View → Layout → Board.
**You get:** CLAUDE.md, Docker files and CI fitted to your stack, merged into `dev`; ADR-001 for the stack; milestone v0.1.0.

## 2. Open the other two sessions (ch. 2)

Open a session in `{{po}}` named "{{name}} - PO" and one in `{{dev1}}` named "{{name}} - Dev1". In each, paste:
> Read CLAUDE.md and continue as `<po or dev1>`.

## 3. Proposal: gate G1 (ch. 3). Session: PO

> Start phase 1 for `<your idea in two or three sentences>`. Interview me one topic at a time, then draft a one-page proposal.

**You check:** the proposal and its options. Approve or say what to change.

## 4. Requirements: gate G2 (ch. 3). Session: PO

> G1 is approved. Write a short PRD with stories.

**You check:** every story has testable acceptance, and v0.1.0 holds only what you need first. Approve.

## 5. SRS and first milestone: gate G3 (ch. 3). Session: Lead

> G2 is approved. Write the SRS baseline, show me look-and-feel options, and plan milestone v0.1.0 as the thinnest end-to-end slice, with tasks for dev1.

**You do:** open `docs/design/look-and-feel.html` in your browser and pick one of the 2-3 directions.
**You check:** the SRS records the direction you picked, and the milestone is small. Approve.

## 6. Build: gates G4-G5 (ch. 4). Sessions: Dev1, then Lead

Paste into the Lead: "Assign the v0.1.0 tasks." Each time a session hands work to another, its report ends with **Next: open "{{name}} - <Role>" and paste: "…"**. Do exactly that: Dev1 starts its task and comments `Started #n` on the issue; when its PR is open, it tells you to go back to the Lead, who reviews and merges into `dev`. To skip these switches, ask the Lead to message the other sessions itself (ch. 2, section 5).

## 7. Release v0.1.0: gate G6 (ch. 5). Session: Lead

> The milestone is done. Prepare the release and my acceptance test (Lite mode).

**You do:** try the 3-5 scenarios yourself on `dev`, then say "All pass. Approve v0.1.0" or what failed. The Lead asks before pushing `main` and the tag; the tag builds the image `{{image}}:v0.1.0`.

## 8. Run the release in Docker

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

## Any time

| Need | Say or run |
|---|---|
| Where the project stands | PO: "Where are we?" · "Morning brief." |
| A change | PO: "I want `<what, in business terms>`." |
| Restart after closing a session | "Read CLAUDE.md and continue as `<role>`." |
| Change the level | `node scripts/set-level.mjs <starter or full>` in `{{main}}`, then tell the Lead: "We moved to `<level>`. Draft what this level still lacks." |
| Save tokens | `/compact` each session after each gate or milestone |
