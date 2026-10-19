# Start here: {{name}}

Level: **Full process**. You talk mostly to the PO; the Lead runs the team (Dev, Test, UI/UX, DevOps sessions) and releases. Each step is one command in one session. Claude shows a short guide of what it needs; you answer in your own words, say "later" for anything you have not decided, "suggest" when you want ideas, and "lock" when you are done. Claude sums up, you approve, then it writes. Type `/` in a session to see the kit's commands.

Done by `init`: the kit, branches `main`, `dev` and `staging`, GitHub repo {{repo}} with labels and a kanban board, and two worktrees: PO `{{po}}`, Lead `{{lead}}`.

**Gates** are the points where a session stops and you approve before it goes on: G1 proposal, G2 requirements, G3 design and SRS, G4 built, G5 accepted on `staging`, G6 released. Before each approval, Claude ends with a **For you** block: what the gate means, what to try yourself with the expected result and an example of a wrong one, and what tests and CI already prove. Try those items before you say "Approved". Appendix D of the book lists every step with its check.

## 1. Finish the setup (ch. 1). Session: Lead

**Open** Claude Code desktop in `{{lead}}`, name it "{{name}} - Lead", and type `/setup`.

**You do:** if the repo is new, open {{actions}} and click **Enable Actions on this repository** if GitHub shows it. Open the board once (GitHub → your profile → Projects), choose View → Layout → Board, and click **Save**.

## 2. Open the PO session (ch. 1)

Open a session in `{{po}}` named "{{name}} - PO". It knows its role when it starts.

## 3. Proposal: gate G1 (ch. 3). Session: PO

Type `/brief <your idea, in your own words>`. The PO asks only about what is missing, sums up for your approval, writes the proposal, and ends with the gate check and the For you block. Approve.

## 4. Requirements: gate G2 (ch. 3). Session: PO

Type `/brief` again: PRD, data notes and stories.

## 5. Design and SRS: gate G3 (ch. 3). Session: Lead

Type `/brief`: SRS baseline, architecture, test strategy and the first milestone; the Lead asks UI/UX for the main screens.

## 6. Add the team (ch. 2). Session: Lead

> We need dev1, test and uiux for milestone v0.1.0. Prepare them.

One Dev is enough for most milestones; add `dev2` only if you already split work across developers. Open one session per worktree the Lead creates; each knows its role when it starts. Then type `/build` in the Lead. Each Dev uses `/build dev #<n>` to code and run a task quickly (no tests, no merge) and `/build done #<n>` to make the tests for its level green and open a PR; only the Lead merges into `dev`. From then on, each report that hands work over ends with **Next: open "{{name}} - <Role>" and paste: "…"**; the receiving session comments `Started #n` on the issue. To skip these switches, ask the Lead to message the other sessions itself (ch. 2, section 5).

## 7. Every day (ch. 4). Session: PO

"Morning brief." before 10:00 · `/change <what>` for changes · `/status` any time · "End-of-day report."

## 8. Release: gates G5-G6 (ch. 5). Session: Lead

Type `/release demo` to show it to a client without publishing, or `/release` to publish.

The Test session runs the regression on `staging`; you try 3-5 scenarios yourself (one at a narrow window when there are screens), then approve. The Lead asks before pushing `main` and the tag; the tag builds the image `{{image}}:v0.1.0`.

## 9. Run the release in Docker

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
| Where the project stands | `/status` |
| Is a gate ready? | `/gate <G1-G6>` |
| Restart after closing a session | "Read CLAUDE.md and continue as `<role>`." |
| Fewer roles | `node scripts/set-level.mjs lite` in `{{main}}`. Documents and history stay. |
| No step skipped | Book Appendix D: process checklist |
