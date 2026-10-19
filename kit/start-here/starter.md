# Start here: {{name}}

Level: **Starter**. One Claude Code session plays PO, Lead and Dev. Each step is one command. Claude shows a short guide of what it needs; you answer in your own words, say "later" for anything you have not decided, "suggest" when you want ideas, and "lock" when you are done. Claude sums up, you approve, then it writes. Type `/` in the session to see the kit's commands.

Done by `init`: the kit, branches `main` and `dev`, GitHub repo {{repo}} with labels and a kanban board, and the Lead worktree `{{lead}}`.

**Gates** are the points where Claude stops and you approve before it goes on. The book has six (G1-G6); Starter joins G1-G3 into one approval of the brief. Before each approval, Claude ends with a **For you** block: what the gate means, what to try yourself with the expected result and an example of a wrong one, and what tests and CI already prove. Try those items before you say "Approved". The book explains any step in more depth (chapter numbers in brackets).

## 1. Finish the setup (ch. 1)

**Open** Claude Code desktop in `{{lead}}` and name the session "{{name}} - Lead". Use this one session for every step below.

**Type:** `/setup`

**You say:** whether you already have a stack, whether the product has screens and who uses it, what data it keeps, any hard rules. "Later" is fine for any of them; Claude lists what is still open and asks again only when a step needs it.
**You do:** if the repo is new, open {{actions}} and click **Enable Actions on this repository** if GitHub shows it; Claude then checks that CI ran. Open the kanban board once (GitHub → your profile → Projects), choose View → Layout → Board, and click **Save**.
**You get:** CLAUDE.md, Docker files and CI fitted to your stack (or left for later); ADR-001; milestone v0.1.0. If Claude enabled the design plugins, run `/reload-plugins`.

## 2. Brief: gate G1-G3 (ch. 8)

**Type:** `/brief <your idea, in your own words>`

**You say:** who it is for, what v0.1.0 must do, what is out, how you will know it works, what data it keeps. Claude asks only about what is missing. For a product with screens it asks whether you have a look in mind, then shows 2-3 directions in `docs/design/look-and-feel.html`: open it in your browser and pick, mix or change.
**You check:** the summary before Claude writes, then `docs/product/brief.md`: the stories have testable acceptance, the look is yours, and v0.1.0 is small (a day or two of work). Say "Approved" or what to change.

## 3. Build (ch. 4)

| Type | When | What happens |
|---|---|---|
| `/build dev` | You want to see it quickly | Claude codes the next task, runs it and shows you how to look. No tests, no merge; the code is pushed to `role/lead` |
| `/build done` | The task is finished | Claude confirms its change level, makes the tests for that level green, merges into `dev`, and closes the issue when CI on `dev` is green |

Use `/build dev` as often as you like, then `/build done` once per task. Only `/build done` puts code into `dev`.
**You check:** the board moves each task from Ready to In progress to Done.

## 4. Release v0.1.0: gate G6 (ch. 5)

**Type:** `/release demo` to show it to someone without publishing, or `/release` to publish.

**Claude gives you:** 3-5 scenarios (one at a narrow window when there are screens) and the commands to start `dev` in Docker.
**You do:** try every scenario yourself, then say "All pass" or what failed. For `/release`, Claude asks once more before pushing `main` and the tag `v0.1.0`; the tag builds the image `{{image}}:v0.1.0`.

## 5. Run the release in Docker

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

## 6. Prove the loop (optional, ch. 6)

Close the session. Open a new one in `{{lead}}`: it reads the record and tells you where the project stands. Type `/change <one small change>`, then `/build dev`, `/build done` and `/release`.

**You check:** the new session finds everything from the record alone and releases the change.

## Any time

| Need | Type or run |
|---|---|
| Where the project stands, and what is still open | `/status` |
| A change | `/change <what, in business terms>` |
| A bug in what was released | Describe it, starting with "Defect:" |
| Is a gate ready? | `/gate <G1-G6>` |
| Restart after closing a session | "Read CLAUDE.md and continue as lead." |
| Other people start using it | `node scripts/set-level.mjs lite` in `{{main}}`, then tell the Lead: "We moved to Lite. Draft what this level still lacks." A client, money, security or personal data: use `full` instead |
| Save tokens | `/compact` after each milestone |
