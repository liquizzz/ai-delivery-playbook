# <Project name>

<One paragraph: what the product does, for whom, the success metric.>

AI Delivery Playbook project. Steps for the owner: `START-HERE.md`.
- Level: <Starter / Lite / Full process>. Change it with `node scripts/set-level.mjs <starter|lite|full>`.
- Language: talk to the owner in <language>; write documents in <language>. Code, commits and identifiers stay in English.
- Documents: <plain / polished>.
- Stage: <Foundation, next gate G# / Delivery, milestone vX.Y.Z>.

## Role
Your role is in `.claude/role`; read `.claude/roles/<role>.md` first. Restart: "Read CLAUDE.md and continue as <role>." Flow: owner ↔ PO → Lead → Dev / Test / UI/UX / DevOps. Each role writes only its own paths and pushes only `role/<role>`; the Lead merges and releases.

## Ask the owner before
The morning plan · L2-L3 CRs · scope, priority or date changes · releases to `main`, deployments and rollbacks · accounts, money, secrets, logins, deleting data · extra AI reviews. Never read or create secrets.

## Where things are
Product `docs/product/` (proposal, PRD, stories, CRs, DECs, milestones) · requirements `docs/tech/srs.md` (IDs `FR-xxx`, `NFR-xxx`) · specs `docs/tech/spec/` · ADRs `docs/tech/adr/` · reports `docs/reports/` · document templates `docs/templates/` · your work: `gh issue list --assignee @me`. Read only the section you need.

## Stack and commands
- Stack: <language, framework, database, hosting>
- Install `<install>` · run `<run>` (port in `.env.local`) or `docker compose up --build` · test `<test>` · lint `<lint>`
- Everything runs in Docker; each release tag builds an image. Deployment to servers is the owner's own process.
- New worktree `node scripts/new-role-worktree.mjs <role>` · release (Lead) `node scripts/release.mjs [--write]`

## Rules
- **Ask first, in rounds, then finish.** If a request lacks anything the result needs (template fields, acceptance, scope, priority, milestone, level, approver), ask before doing it: one topic per round, 1-3 short questions, each with 2-4 options and your recommendation first (use the question tool with buttons when you have it). After each round, confirm the answer and go to the next topic, until everything is settled or the owner says "you decide" (then decide the rest and list your assumptions in the report). Group topics that only need a yes into one quick-confirm round. Before writing, summarise all choices for one approval, then do the whole task. Do not ask what has an obvious default: state the assumption. If nothing is missing, say so and start.
- **The owner chooses the stack.** Offer 2-3 options from the lightest to the fullest (dependencies, effort, when each fits), after asking what decides it (UI needs, users, data, growth). Record the choice as an ADR with the rejected options. Only if the owner says "you decide", take the lightest option that meets the requirements.
- **Docs lead code.** SRS and spec are on `dev` before a task starts. Unclear? Ask (Dev/Test → Lead → PO); never deviate silently.
- **Decided means written:** record it in the CR, issue, DEC or ADR as soon as it is decided.
- **One task in progress**, only assigned issues, only your paths.
- **Git:** own worktree; merge `dev` in, never rebase; no force push to `dev`/`staging`/`main`; no `--no-verify`. Commit `<type>(<module>): <summary> (#n)`. Done = push your branch, PR into `dev` with `Closes #n`, send the Lead the link.
- **Change level** L0 display · L1 setting · L2 module logic · L3 core (money, security, personal data, deletes are always L3). Confirm the level against the actual change before testing; test only that scope; raise it if wider, never lower it.
- **Hand-offs** are issue comments: `Hand-off <from> → <to> · #n · Done / Needs changes / Blocked · <branch>@<sha> · L<n> · <module> · done: … · next: … · risks: …`. Messages between sessions only notify, with a link. Unless the owner turned on messages between sessions, end your report with `Next: open "<Project> - <Role>" and paste: "<prompt>"`. The receiving session comments `Started #n` on the issue when it begins; without that comment, the work has not started.
- **Asking the owner to approve a gate or a release:** end with a `For you` block in plain words: what the gate means for the product (one or two sentences); 1-3 things to try or read yourself, each with the expected result and one example of a wrong result; what the owner confirms (does it do what they want); what the evidence already covers, with links (tests, CI runs, review), so the owner need not judge it; open risks. Never ask for approval with "ready" alone.
- **Tokens:** no `/goal` or `/loop` unless the owner asks; short command output; paste only the relevant lines; stop when the step is done.
- **No waiting commands:** never run a command that waits for input. Use the non-interactive form (`gh … --body` or `--body-file`, `--yes`, `CI=1`, `COREPACK_ENABLE_DOWNLOAD_PROMPT=0`, `GIT_EDITOR=true`). If one hangs, stop it and rerun it without the prompt.
- **Commands for the owner** are written for the owner's shell (PowerShell on Windows unless told otherwise), with full paths, one command per block.
- **Report live state:** check CI runs, images, PRs and branches (`gh run list`, `gh pr view`, `git ls-remote`) right before reporting them; never repeat an earlier state as current.
- **Secrets** live in git-ignored `.env*`; `.env.example` holds `CHANGE_ME`.
- <Project hard rules.>
- The Lead logs each finished task in `docs/ai-log.md`.

## Skills
Use the skill named for each task, every time; do not swap it for another. For work not listed, pick the skill that fits.

| Task | Skill |
|---|---|
| Interview the owner: stack, proposal or brief, architecture options, an unclear request | `superpowers:brainstorming` |
| Market or competitor context for a proposal | `product-management:competitive-brief` |
| PRD and stories | `product-management:write-spec`, on the template in `docs/templates/` |
| Milestone into tasks | `superpowers:writing-plans` |
| Every document: proposal, brief, PRD, SRS, ADR, CR, spec, test report, release notes, changelog | Documents polished: `humanizer` after the draft, before the commit. Documents plain: no humanizer; write short sentences, no filler |
| Update for a client | `product-management:stakeholder-update`, then `humanizer` if documents are polished |
| Owner says "Polish documents from now on" (or the opposite) | Lead: set `humanize` in `.claude/project.json`, add or remove `"humanizer@humanizer": true` under `enabledPlugins` in `.claude/settings.json`, update the Documents line above, commit, and tell the owner to run `/reload-plugins` |
| Look and feel, once per product with screens, before the first UI task | `ui-ux-pro-max`: search styles, palettes and font pairs that fit the product type and its users; show 2-3 directions side by side in one static page `docs/design/look-and-feel.html` (the main screen in each); the owner picks one in a question round |
| UI work | `frontend-design`, following the chosen look and feel (setup enables `frontend-design` and `ui-ux-pro-max` in `.claude/settings.json` when the product has screens); with a design prototype also `ui-ux-pro-max`; `figma` when the design lives in Figma |
| Code a task | L2-L3: `superpowers:test-driven-development`; L1: unit test the change; L0: build and look |
| Library, framework or tool syntax | `context7` |
| Bug, defect, red CI, hotfix | `superpowers:systematic-debugging` |
| Before saying done, opening a PR, merging or releasing | `superpowers:verification-before-completion` |
| PR review | `code-review`; for L3 also `security-review` |
| Check that the app runs | `run` |
| Long session or end of day | `claude-mem:handoff` |

Never use `superpowers:using-git-worktrees`, `finishing-a-development-branch`, `subagent-driven-development`, `dispatching-parallel-agents` or `executing-plans`: the kit's worktrees, merge rules and one session per role replace them.

## Compact instructions
Keep: role; current issue (number, status, next step); branch and last commit; decisions and reasons; items waiting for the owner; open risks; role-specific items from your role file. Drop command output, file contents already read, rejected options. After compacting, re-run your role file's recovery steps.
