# Start here: {{name}}

Level: **Full process**. You talk mostly to the PO; the Lead runs the team (Dev, Test, UI/UX, DevOps sessions) and releases. Each step is one command in one session: type it, answer the questions round by round (or say "you decide"), check the result, go on. Type `/` in a session to see the kit's commands.

Done by `init`: the kit, branches `main`, `dev` and `staging`, GitHub repo {{repo}} with labels and a kanban board, and two worktrees: PO `{{po}}`, Lead `{{lead}}`.

**Gates** are the points where a session stops and you approve before it goes on: G1 proposal, G2 requirements, G3 design and SRS, G4 built, G5 accepted on `staging`, G6 released. Before each approval, Claude ends with a **For you** block: what the gate means, what to try yourself with the expected result and an example of a wrong one, and what tests and CI already prove. Try those items before you say "Approved". Appendix D of the book lists every step with its check.

## 1. Finish the setup (ch. 1). Session: Lead

**Open** Claude Code desktop in `{{lead}}`, name it "{{name}} - Lead", and type `/setup`.

**You do:** if the repo is new, open {{actions}} and click **Enable Actions on this repository** if GitHub shows it. Open the board once (GitHub → your profile → Projects) and choose View → Layout → Board.

## 2. Open the PO session (ch. 1)

Open a session in `{{po}}` named "{{name}} - PO". It knows its role when it starts.

## 3. Proposal: gate G1 (ch. 3). Session: PO

Type `/brief <your idea in two or three sentences>`. It ends with the gate check and the For you block. Approve.

## 4. Requirements: gate G2 (ch. 3). Session: PO

Type `/brief` again: PRD, data notes and stories.

## 5. Design and SRS: gate G3 (ch. 3). Session: Lead

Type `/brief`: SRS baseline, architecture, test strategy and the first milestone; the Lead asks UI/UX for the main screens.

## 6. Add the team (ch. 2). Session: Lead

> We need dev1, test and uiux for milestone v0.1.0. Prepare them.

One Dev is enough for most milestones; add `dev2` only if you already split work across developers. Open one session per worktree the Lead creates; each knows its role when it starts. Then type `/build` in the Lead. From then on, each report that hands work over ends with **Next: open "{{name}} - <Role>" and paste: "…"**; the receiving session comments `Started #n` on the issue. To skip these switches, ask the Lead to message the other sessions itself (ch. 2, section 5).

## 7. Every day (ch. 4). Session: PO

"Morning brief." before 10:00 · `/change <what>` for changes · `/status` any time · "End-of-day report."

## 8. Release: gates G5-G6 (ch. 5). Session: Lead

Type `/release`.

The Test session runs the regression on `staging`; you try 3-5 scenarios yourself, then approve. The Lead asks before pushing `main` and the tag; the tag builds the image `{{image}}:v0.1.0`.

## 9. Run the release in Docker

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

| Need | Type or run |
|---|---|
| Where the project stands | `/status` |
| Is a gate ready? | `/gate <G1-G6>` |
| Restart after closing a session | "Read CLAUDE.md and continue as `<role>`." |
| Fewer roles | `node scripts/set-level.mjs lite` in `{{main}}`. Documents and history stay. |
| No step skipped | Book Appendix D: process checklist |
