# Start here: {{name}}

Any session can translate this file for you: ask it in your language. The book explains every step: https://github.com/liquizzz/crewbook-build/tree/main/docs/book

Level: **Lite**. Three Claude Code sessions work like a small team you manage: PO (your requests and documents), Lead (design, stack, review, release) and Dev1 (builds). Each step is one command in one session. Claude shows a short guide of what it needs; you answer in your own words, in any order, say "later" for anything you have not decided, "suggest" when you want ideas, and "lock" when you are done. Claude asks whether it is final, then writes. Type `/` in a session to see the kit's commands.

Done by `init`: the kit, branches `main` and `dev`, GitHub repo {{repo}} with labels and a kanban board, and the Lead's folder `{{lead}}`. The Lead's setup creates the PO's and Dev1's folders.

**Gates** are the points where a session stops and you approve before it goes on: G1 proposal, G2 requirements, G3 design, stack and plan, G4 built, G5 tested, G6 released. Each approval request shows the gate's checks, then a **For you** block: what the gate means, what to try yourself (with links, the expected result and an example of a wrong one), and what tests and CI already prove. Try those items before you say "Approved". The book explains any step in more depth (chapter links in parentheses).

**Hand-offs:** when work moves to another session, the report ends with the session to open and a prompt in its own box. Copy the box with its copy button and paste it into that session.

## 1. Setup ([ch. 1](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/01-setup.md)). Session: Lead

**Open** the Lead: in Claude Code desktop, open a new session, choose the folder `{{lead}}`, name the session "{{name}} - Lead", and type `/setup`. Setup comes first: until it is done, the other sessions only tell you to finish it.

**You say:** whether you or your client require a platform or database, whether the product has screens and who uses it, what data it keeps, any hard rules. You do not choose a stack here: that comes at G3, after the design. "Later" is fine; Claude lists what is still open.
**You do:** if the repo is new, open {{actions}} and click **Enable Actions on this repository** if GitHub shows it. Open the board once (GitHub → your profile → Projects), choose View → Layout → Board, and click **Save**.
**You get:** CLAUDE.md filled in, the G1-G3 gate issues (one GitHub issue per gate, where its work is tracked), milestone v0.1.0 (your first small release), the folders for PO `{{po}}` and Dev1 `{{dev1}}`, and the prompt for the PO. If Claude enabled the design plugins, run `/reload-plugins`.

## 2. Proposal: gate G1 ([ch. 3](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/03-foundation.md)). Session: PO

Open a new session in the folder `{{po}}`, name it "{{name}} - PO", and type `/brief <your idea, in your own words>`. Start wherever you like: who it is for, a product you want to copy, your constraints. The PO asks only about what is missing and shows a checklist of what is settled before you lock.

**You check:** the proposal and its options. Approve or say what to change.

## 3. Requirements: gate G2 ([ch. 3](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/03-foundation.md)). Session: PO

Type `/brief` again: it goes on to the PRD and stories.

**You check:** every story has testable acceptance, and v0.1.0 holds only what you need first. Approve.

## 4. Design, stack and plan: gate G3 ([ch. 3](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/03-foundation.md)). Session: Lead

Type `/brief` in the Lead. It works in this order:
1. **Design:** for screens, it asks whether you have a look in mind, shows 2-3 named directions in `design/look-and-feel.html`, then the main screens in the one you pick. You approve the design.
2. **Stack:** 2-3 options that fit the design, installed once on your machine before you choose.
3. **SRS and plan:** the SRS baseline (the first approved list of requirements, each with an ID) and milestone v0.1.0 as the thinnest end-to-end slice (the smallest version that works from start to finish).

**You check:** the design is what you want to show the client, and the milestone is small. Approve.

## 5. Build: gates G4-G5 ([ch. 4](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/04-delivery-loop.md)). Sessions: Dev1, then Lead

Type `/build` in the Lead: it assigns the v0.1.0 tasks and gives you the prompt for Dev1 (folder `{{dev1}}`, session "{{name}} - Dev1"). Paste the prompt the Lead gives you into each Dev session; you never type the Dev commands yourself. `/build dev #<n>` shows you a task working quickly, and `/build done #<n>` adds its tests and sends it to the Lead, who merges it. To skip a switch, type `/pass` in the session that gave the prompt: it sends the prompt there for you. To skip them all, type `/msg on` in any session: the sessions then pass their prompts to each other by themselves (more tokens; you still approve merges and releases), and `/msg off` turns it back ([ch. 2, section 5](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/02-the-team.md#5-how-automatic-it-is)).

## 6. Release v0.1.0: gate G6 ([ch. 5](https://github.com/liquizzz/crewbook-build/blob/main/docs/book/05-releases.md)). Session: Lead

Type `/release demo` to show it to someone without publishing, or `/release` to publish.

**You do:** the Lead gives you a link or one command that starts the build, and 3-5 scenarios to try (one at a narrow window when there are screens). Try them, then say "All pass" or what failed. The Lead asks before pushing `main` and the tag; the tag builds the image `{{image}}:v0.1.0`.

## 7. Run the release in Docker

If the repo is private, log in once first, with these two commands:
```
gh auth refresh -s read:packages
```
```
gh auth token | docker login ghcr.io -u {{owner}} --password-stdin
```

From the published image:
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
| Where the project stands, and what is still open | `/progress` (any session) · PO: "Morning brief." |
| A change | PO: `/change <what, in business terms>` |
| Send a hand-off prompt without switching | `/pass` in the session that gave it |
| Sessions pass prompts by themselves | `/msg on` (any session) · `/msg off` to stop |
| Is a gate ready? | `/gate <G1-G6>` |
| A secret (an API key, a password) | `node scripts/set-secret.mjs <NAME>` in `{{main}}`: paste the value when asked; it is not shown and never goes in the chat |
| Restart after closing a session | Open a new session in the same folder; it knows its role and finds where it stopped |
| Change the level | `node scripts/set-level.mjs full` in `{{lead}}`, then tell the Lead: "We moved to Full. Draft what this level still lacks." |
| Save tokens | `/compact` each session after each gate or milestone |
