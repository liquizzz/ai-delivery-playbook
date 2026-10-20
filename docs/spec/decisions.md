# Decisions: AI Delivery Playbook

The decision log for the playbook itself (the book and the kit). Each row records what was decided, why, and what was rejected, so a later change can see what it overturns. The requirements that follow from these decisions are in [srs.md](srs.md).

**How to use it:** add a row the day a decision is made, with the next free ID. A decision that replaces an earlier one says so in its Status, and the earlier row gets "Superseded by DEC-0NN". Rows are never deleted. Decisions that come from a trial project are written without client names or details.

**Status values:** Active · Superseded by DEC-0NN · Open (not decided yet).

## Process and model

| ID | Date | Decision | Why | Rejected | Status |
|---|---|---|---|---|---|
| DEC-001 | 2026-10-18 | Seven phases with six gates (G1-G6): a foundation run once (proposal, requirements, design) and a delivery loop per milestone (build, test, release), then maintenance | A skipped step must be visible, and every phase ends where the owner approves | Free-form prompting with no fixed steps | Active |
| DEC-002 | 2026-10-18 | One owner directs a team of Claude Code sessions, one per role, each in its own git worktree on `role/<role>`; only the Lead merges | Sessions never edit the same files, and every change reaches `dev` through a reviewed path | One shared folder for all sessions; subagents inside one session (the superpowers worktree and subagent skills are banned in the kit) | Active |
| DEC-003 | 2026-10-18 | Every business change is a CR issue, and the SRS always describes the system as it is now, versioned with each release | The owner and a new session can find what the system does and since when | Requirements written once and left to drift | Active |
| DEC-004 | 2026-10-18 | Change levels L0-L3; test exactly the confirmed level; money, security, personal data and deletes are always L3; a level can be raised, never lowered | Testing effort follows risk, which keeps cost down without skipping checks | One test bar for every change | Active |
| DEC-005 | 2026-10-18 | The version number comes from issue labels (SemVer); each release tag builds a Docker image; where it runs in production is the owner's choice | Releases are reproducible and can be rolled back by tag | Host-specific deploy workflows in the kit | Active |
| DEC-006 | 2026-10-18 | Docker is required: init stops when `docker` or `docker compose` is missing | Every part of the product runs the same way on any machine | Docker as an option | Active |
| DEC-007 | 2026-10-19 | Process first: the playbook keeps strict control (gates, CI per task, owner approvals) and has no fast mode; a fast prototype tool would be a separate project | The value is a controlled, traceable delivery; speed-only use dilutes it | A "just build it" mode inside the kit | Active |
| DEC-008 | 2026-10-18 | One Dev session is the default at every level; a second only for owners who already split work across developers | Five or more sessions are hard for one owner to follow | Several Devs by default | Active |
| DEC-009 | 2026-10-19 | The standards the steps follow are named in Appendix E: ISO/IEC/IEEE 29148 for the SRS, ISO/IEC 25010 rows for NFRs, 29119-3 for the test strategy, plus Dependabot, CodeQL, an SBOM and a build attestation for each image | Owners can show clients which standard a step follows; the security checks are free on GitHub | Claiming compliance with a full standard | Active |

## Levels and audience

| ID | Date | Decision | Why | Rejected | Status |
|---|---|---|---|---|---|
| DEC-010 | 2026-10-18 | Three levels: Starter (one session), Lite (PO, Lead, Dev), Full (adds Test, UI/UX, DevOps, staging) | A first demo needed the fewest steps | | Superseded by DEC-012 |
| DEC-011 | 2026-10-20 | The audience is freelancers and team leads who deliver projects for clients; agencies are out of scope for now | The kit is built for one owner; client delivery uses every part of it (proposal, CR, DEC, For you, demo release) | Agencies with several people and their own tools; solo builders who want speed | Active |
| DEC-012 | 2026-10-20 | Starter is removed; Lite is the minimum for everyone, students included; `--level starter` maps to Lite | One session doing every role runs slower (nothing in parallel) and hides the hand-offs; three sessions give the real experience of directing a team | Keeping Starter for students or as a one-hour try-out | Active |
| DEC-013 | 2026-10-20 | Keep the name "AI Delivery Playbook" for now; pick a distinctive brand name, tagline and SEO keywords (Claude Code, client projects, freelance) after the round-3 fixes and one or two more worked examples | The space is crowded ("Claude Code playbook", agent-team kits); a launch with known bugs loses the first users | Renaming now; calling it a boilerplate (it has no app code and chooses no stack) | Open |

## The owner and the sessions

| ID | Date | Decision | Why | Rejected | Status |
|---|---|---|---|---|---|
| DEC-014 | 2026-10-18 | Ask the owner in rounds: one topic per round, options with a recommendation | One long numbered list of questions was hard to answer | | Superseded by DEC-015 |
| DEC-015 | 2026-10-19 | The owner leads: each step shows a short "what you need to say" guide, the owner writes in their own words, Claude asks only about gaps, suggests only on "suggest", and writes after "lock" | The owner could not state their own view through AI-written menus | Menus only; Claude deciding when it has enough | Active, refined by DEC-016 |
| DEC-016 | 2026-10-20 | The owner may answer in any order (from a reference product or constraints); before "lock" Claude shows a checklist (owner said it / assumption or missing); after "lock" it asks once: final, or review first | IT-experienced owners start from constraints; a full summary right after one they just read wastes time | Forcing the guide's order; always repeating the summary | Active |
| DEC-017 | 2026-10-19 | "Decide later" is allowed: the choice goes under Open decisions in the project's `CLAUDE.md` with the step that needs it, plus an issue labelled `decision` | Owners rarely know everything at setup; a step asks only when it needs the answer | Blocking a step until everything is decided | Active |
| DEC-018 | 2026-10-18 | The working language is chosen at init; sessions talk to the owner in it and documents use the chosen document language; code, commits and identifiers stay English | Owners work best in their own language | English only | Active |
| DEC-050 | 2026-10-20 | The owner's language covers everything the owner reads, including the end-of-turn recap, the next-step box, questions and button labels; only code, commits, paths and commands stay English; the session-start hook names the language | In round 3 the Lead wrote its recap and approval question in English for a Vietnamese-speaking owner | Language only for chat replies | Active |
| DEC-019 | 2026-10-18 | Every approval request ends with a For you block: what the gate means, what to try (expected and wrong result), what the owner confirms, what the evidence covers | "Ready" alone gives the owner nothing to check | Approval on the session's word | Active, refined by DEC-020 |
| DEC-020 | 2026-10-20 | Approval requests have a fixed form: the gate table, then the For you block with links, then the question | The block was skipped twice in round 3 | Leaving the format to each session | Active |
| DEC-021 | 2026-10-20 | Claude checks facts the owner gives when it is cheap, and tries a product the owner names in the browser before analysing it | A hands-on test found more than a web-search table, and a live check corrected a wrong library version | Taking the owner's facts as given | Active |
| DEC-022 | 2026-10-20 | A session that proposes work of another role marks it "for the <role> to confirm" and posts it on that role's issue | The PO did part of the Lead's design work during G1 | Silent cross-role decisions | Active |
| DEC-023 | 2026-10-20 | Everything the owner must look at is a clickable link; a page outside GitHub (for example a claude.ai artifact) needs the owner's OK | Relative paths could not be opened; a published page may hold client details | Plain paths; publishing pages by default | Active |
| DEC-024 | 2026-10-20 | A session shows a page only after checking it itself, and names each option with a stable name and letter | The owner saw a page change while looking and thought an option had gone | Showing work in progress | Active |

## Setup, design and stack

| ID | Date | Decision | Why | Rejected | Status |
|---|---|---|---|---|---|
| DEC-025 | 2026-10-18 | The owner chooses the stack; Claude offers 2-3 options from lightest to fullest and installs the pick once before writing it down | A heavy stack was proposed for a tiny app; one option failed to install on Windows | Claude picking the stack | Active, refined by DEC-027 |
| DEC-026 | 2026-10-20 | Setup comes first and is enforced: init creates only the Lead's worktree with `"setup": false`; until `/setup` is done, the session-start hook makes every other role wait; `/setup` creates the other worktrees | An owner opened the PO before setup and the status report said setup could run in parallel | Tolerating any order | Active |
| DEC-027 | 2026-10-20 | Design before stack: setup asks only for a stack the client requires; G3 runs design (look and feel, main screens, flows), then the stack that fits it, then the SRS; `docker compose up` is checked at G3, not G1 | Clients need a design they can see; few can judge a stack. In round 3 the stack came first and the design became a build task | Choosing the stack at setup | Active |
| DEC-028 | 2026-10-18 | Every product with screens gets a look-and-feel round: 2-3 directions on one page, the owner picks one | Screens looked generic without a chosen direction | | Active; moved to the start of G3 by DEC-027 |
| DEC-029 | 2026-10-20 | Foundation gates have issues (G1, G2, G3, label `gate`) opened by setup, and foundation commits name them | Round 3 commits pointed at the stack decision issue | Commits with no issue | Active |

## Building and releasing

| ID | Date | Decision | Why | Rejected | Status |
|---|---|---|---|---|---|
| DEC-030 | 2026-10-19 | Build modes: `/build dev` (code and run, no tests, no merge, push the role branch) and `/build done` (tests at the task's level, then a PR); `/release demo` (full checks, no tag) and `/release` (`main` and a tag) | The owner wants to see work fast while every merge stays controlled | A single build mode | Active |
| DEC-051 | 2026-10-20 | Estimates are in AI time, in three parts (AI working time, the owner's time, outside waits), with defaults per level (L0 15 min, L1 30 min, L2 1 h, L3 2 h) recalibrated from each project's actual AI time | In round 3 the Lead estimated v0.1.0 at 12 human developer days (16.8 with buffer) for work AI sessions do in about a day after G3; the templates spoke only of days | Human developer days; a single number mixing AI work and waiting | Active |
| DEC-031 | 2026-10-20 | After merging into `dev` the Lead closes the issue with `gh issue close`, because `Closes #n` only fires on the default branch | Issues stayed open after merging in round 3 | Making `dev` the default branch | Active |
| DEC-032 | 2026-10-20 | An edit that only aligns an approved document with a later approved ADR or DEC is L0 and needs no CR | A data-notes fix after an ADR was correct but had no rule | A CR for every edit of an approved document | Active |
| DEC-033 | 2026-10-20 | A gate item that waits for someone outside the team may be approved later when it has an issue, a due date and the step that needs it | G2 was approved with the data notes pending the client's table description | Holding the whole gate | Active |
| DEC-034 | 2026-10-19 | The kit's board is created by init and moved by `scripts/board-status.mjs`; it is public when the repo is public | The board stayed empty and private in round 2 | Leaving the board to the owner | Active |

## Hand-offs, commands and secrets

| ID | Date | Decision | Why | Rejected | Status |
|---|---|---|---|---|---|
| DEC-035 | 2026-10-18 | Work moves through issue comments (hand-off notes, `Started #n`); messages between sessions only notify; by default the owner carries the next prompt | Cheap in tokens and the owner stays in control | Sessions driving each other; timers (`/goal`, `/loop`) | Active |
| DEC-036 | 2026-10-20 | A hand-off ends with the session to open and the prompt alone in a code block, nothing after it; the prompt is short because the session recovers its state itself | The owner had to find and select the prompt inside the text | Inline prompts | Active |
| DEC-037 | 2026-10-20 | `/status` is renamed `/progress` | It clashed with Claude Code's own `/status` | Keeping the name | Active |
| DEC-038 | 2026-10-20 | Secrets are set by the owner with `scripts/set-secret.mjs` (hidden input, written to the git-ignored `.env.local` of every checkout); sessions never ask for a secret or a screenshot of one | A key reached a transcript through a screenshot; two sessions named two different places | Pasting keys in the chat; one `.env` per session | Active |
| DEC-039 | 2026-10-18 | Commands never wait for input; commands for the owner use the owner's shell; live state is checked before it is reported | Sessions hung on prompts and reported stale CI state in round 1 | | Active |
| DEC-040 | 2026-10-20 | The Lead runs worktree scripts from its own worktree | The main checkout stays on `main` with the scripts from init | Running them from the main checkout | Active |
| DEC-049 | 2026-10-20 | A session never starts a side session (a fork or a new session from itself) for another role's work; it hands the work to that role's session with a hand-off block | In round 3 the PO forked itself to fix a design review: the fork ran in the PO's folder as PO, committed on the UI/UX branch but could not push it, and stayed idle in the sidebar | Side sessions in the sender's folder; letting the guard allow cross-role pushes | Active |

## Skills, plugins and tokens

| ID | Date | Decision | Why | Rejected | Status |
|---|---|---|---|---|---|
| DEC-041 | 2026-10-18 | The kit names one skill per task in a Skills table and a session-start hook reminds each session; the owner never picks skills | Sessions used different skills for the same task | Leaving skills to each session | Active |
| DEC-042 | 2026-10-19 | Plugins the kit enables: superpowers, code-review, claude-mem, context7; humanizer only for polished documents (init question 6); frontend-design and ui-ux-pro-max enabled by setup for products with screens. github MCP dropped (the kit uses `gh`); product-management optional for the PO | Every plugin adds to each session's context; only these were used | The github MCP and product-management as required | Active |
| DEC-043 | 2026-10-19 | Lower token cost is presented as an advantage of the design and not measured for now | Measurements would delay the fixes | Per-step cost measurements | Active |

## The repository

| ID | Date | Decision | Why | Rejected | Status |
|---|---|---|---|---|---|
| DEC-044 | 2026-10-18 | The repo is a book and a kit; docs and templates under CC BY 4.0, the kit under MIT; code files carry the SPDX line and the credit line | Both can be reused, including commercially, with credit | | Active |
| DEC-045 | 2026-10-18 | Everything in the repo is English, and every prose change gets a humanizer pass | The book is public and must not read as AI-written | | Active |
| DEC-046 | 2026-10-18 | Worked examples name clients only as "the client", with no names, domains or internal numbers; screenshots need the user's approval before they go in | The repo is public | | Active |
| DEC-047 | 2026-10-20 | The Habit Tracker example (made with Starter) is removed; a new example is made at Lite later | It showed the weak points it was made to find, and Starter is gone | Keeping it with a note | Active |
| DEC-048 | 2026-10-20 | The playbook has its own SRS (`docs/spec/srs.md`) and this decision log; a change to the kit updates them in the same commit | The playbook asks projects for an always-current SRS and had none itself | Keeping decisions in the AI log and private notes | Active |

## Open decisions

| Topic | What decides it | Needed before |
|---|---|---|
| Brand name, tagline, SEO keywords (DEC-013) | Keyword research for freelancers; name collision check | The public launch |
| Applying the kit to a repo that already has code | A design for init on an existing repo: commit, worktrees, documents from the code, open issues on the board | Using the kit on the user's existing projects |
| The github MCP as an optional plugin | Whether any owner needs it next to `gh` | Next plugin review |
| Running on macOS and on a clean machine | A trial on each | The public launch |
