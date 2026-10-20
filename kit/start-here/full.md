# Start here: {{name}}

Any session can translate this file for you: ask it in your language. The book explains every step: https://github.com/liquizzz/crewbook-build/tree/main/docs/book

Level: **Full process**. You manage a team of Claude Code sessions: the Lead sets up and runs the team (UI/UX, Dev, Test, DevOps) and releases; after setup you talk mostly to the PO. Each step is one command in one session. Claude shows a short guide of what it needs; you answer in your own words, in any order, say "later" for anything you have not decided, "suggest" when you want ideas, and "lock" when you are done. Claude asks whether it is final, then writes. Type `/` in a session to see the kit's commands.

Done by `init`: the kit, branches `main`, `dev` and `staging`, GitHub repo {{repo}} with labels and a kanban board, and the Lead's folder `{{lead}}`. The Lead creates every other session's folder when it is needed.

**Where the code is:** `dev` holds the work in progress (every merged PR), `staging` the demo for the client, and `main` the latest released version, so until v0.1.0 `main` holds just the kit. To read the code, open the `dev` branch on GitHub.

**Gates** are the points where a session stops and you approve before it goes on: G1 proposal, G2 requirements, G3 design, stack and SRS, G4 built, G5 accepted on `staging`, G6 released. Each approval request shows the gate's checks, then a **For you** block: what the gate means, what to try yourself (with links, the expected result and an example of a wrong one), and what tests and CI already prove. Try those items before you say "Approved". Appendix D of the book lists every step with its check: https://github.com/liquizzz/crewbook-build/blob/main/docs/book/appendix-d-checklist.md

**Hand-offs:** when work moves to another session, the report ends with the session to open and a prompt in its own box. Copy the box with its copy button and paste it into that session.

## 1. Setup ([ch. 1](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/01-setup.md)). Session: Lead

**Open** the Lead: in Claude Code desktop, open a new session, choose the folder `{{lead}}`, name the session "{{name}} - Lead", and type `/setup`. Setup comes first: the Lead finishes it before anyone else works, opens the gate issues (one GitHub issue per gate, where its work is tracked) and milestone v0.1.0 (your first small release), then creates the PO's folder `{{po}}` and gives you the PO's prompt. You do not choose a stack here: it comes at G3, after the design.

**You do:** if the repo is new, open {{actions}} and click **Enable Actions on this repository** if GitHub shows it. Open the board once (GitHub → your profile → Projects), choose View → Layout → Board, and click **Save**.

## 2. Proposal: gate G1 ([ch. 3](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/03-foundation.md)). Session: PO

Open a new session in the folder `{{po}}`, name it "{{name}} - PO", and type `/next <your idea, in your own words>`. Start wherever you like: who it is for, a product you want to copy, your systems, budget and deadline. The PO tries a product you name, checks facts it can check, asks only about what is missing, and shows a checklist of what is settled before you lock.

**You check:** the proposal and its options. Approve or say what to change.

## 3. Requirements: gate G2 ([ch. 3](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/03-foundation.md)). Session: PO

Type `/next` again: PRD, data notes and stories.

**You check:** every story has testable acceptance, and v0.1.0 holds only what you need first. Approve.

## 4. Design, stack and SRS: gate G3 ([ch. 3](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/03-foundation.md)). Session: Lead, with UI/UX

Type `/next` in the Lead. It works in this order:
1. **Design:** for screens, the Lead proposes the UI/UX session and gives you its prompt. UI/UX shows 2-3 named look-and-feel directions, then every main screen and state in the one you pick; the Lead writes the flows, data and integrations. You approve the design (tag `design-v1`): this is what you show the client.
2. **Stack:** 2-3 options that fit the design and the requirements, installed once on your machine before you choose.
3. **SRS and plan:** the SRS baseline (the first approved list of requirements, each with an ID), architecture, test strategy and milestone v0.1.0 as the thinnest end-to-end slice (the smallest version that works from start to finish).

## 5. The team and the build: gate G4 ([ch. 2](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/02-the-team.md), [ch. 4](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/04-delivery-loop.md)). Session: Lead

When G3 is approved, the Lead proposes the sessions the milestone needs (usually Dev1 and Test), creates their folders when you agree, and gives one prompt per session. One Dev is enough for most milestones; add `dev2` only if you already split work across developers. Then `/build` in the Lead assigns the tasks. Open each session the Lead asks for; the Lead sends it its prompt, so you never type the Dev commands yourself. `/build try #<n>` shows you a task working quickly, and `/build done #<n>` adds its tests and sends it to the Lead, who merges it. The receiving session comments `Started #n` on the issue. When the Lead asks for changes the card goes back to In progress; after the merge an L1-L3 task waits in Testing until the Test session checks it. Anything in In review is waiting for the Lead or for your merge. When every task of the milestone is merged with green CI and tested, the milestone is built (G4). By default the sessions pass these prompts to each other by themselves and the Lead merges L0-L2 changes after its review and green CI; each recap says what was sent and merged, and L3 changes, gates and releases still wait for you. `/auto` shows both switches; `/auto relay off` and `/auto merge off` hand them back to you (then paste each prompt, or type `/send` in the session that gave it) ([ch. 2, section 5](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/02-the-team.md#5-how-automatic-it-is)).

## 6. Every day ([ch. 4](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/04-delivery-loop.md)). Session: PO

`/change <what>` for changes · `/progress` any time to see where things stand; `/progress report` in the PO or the Lead also saves it in `docs/reports/`.

## 7. Release: gates G5-G6 ([ch. 5](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/05-releases.md)). Session: Lead

Type `/release demo` to show it to a client without publishing, or `/release` to publish.

The Test session runs the regression on `staging`; you try 3-5 scenarios yourself from the link or command the Lead gives you (one at a narrow window when there are screens), then approve. The Lead asks before pushing `main` and the tag; the tag builds the image `{{image}}:v0.1.0`.

## 8. Run the release in Docker

In the folder `{{main}}`:
```
node scripts/run.mjs v0.1.0
```
It checks that Docker is running and port 3000 is free, downloads the release image (logging in to GitHub's registry for you when the repo is private), starts the app, waits until it answers and opens http://localhost:3000. `node scripts/run.mjs` alone runs the latest release, and `node scripts/run.mjs dev` the build being worked on. Stop it with `node scripts/run.mjs --stop`. If it asks for read access, run `gh auth refresh -s read:packages` once and try again.

## Any time

| Need | Type or run |
|---|---|
| Where the project stands | `/progress` (any session) |
| Send a hand-off prompt without switching | `/send` in the session that gave it |
| What runs without you | `/auto` (any session): `/auto relay on|off` (sessions pass prompts), `/auto merge on|off` (the Lead merges L0-L2) |
| Is a gate ready? | `/gate <G1-G6>` |
| A secret (an API key, a password) | `node scripts/set-secret.mjs <NAME>` in `{{main}}`: paste the value when asked; it is not shown and never goes in the chat |
| Restart after closing a session | Open a new session in the same folder; it knows its role and finds where it stopped |
| Fewer roles | `node scripts/set-level.mjs lite` in `{{lead}}`. Documents and history stay. |
| No step skipped | Book Appendix D, the process checklist: https://github.com/liquizzz/crewbook-build/blob/main/docs/book/appendix-d-checklist.md |
