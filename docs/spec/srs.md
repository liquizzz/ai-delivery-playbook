# Software Requirements Specification: AI Delivery Playbook

The requirements of the playbook itself: what `kit/init.mjs` and the kit it installs must do, and what the book promises. Structure follows the playbook's own [SRS template](../../templates/srs.md). The reasons behind each requirement are in [decisions.md](decisions.md) (DEC-0NN).

**Version:** 0.2 · **Status:** First draft; describes `main` after the side-session rule (2026-10-20) · **Last updated:** 2026-10-20

## Revision history
Newest first. A change to the kit or the book that changes behaviour adds a row here in the same commit.

| SRS version | Commit | Date | Decisions | Sections changed | Summary |
|---|---|---|---|---|---|
| 0.2 | (this commit) | 2026-10-20 | DEC-049 | §3.4, §8 | No side sessions for another role's work (FR-062) |
| 0.1 | d280151 | 2026-10-20 | DEC-001 to DEC-048 | All | First written, from the state after the round-3 fixes |

## 1. Introduction

### 1.1 Purpose and scope
The AI Delivery Playbook lets one owner deliver a real software project with a team of Claude Code sessions, under a fixed process with gates the owner approves. It has two parts:
- **The kit** (`kit/`, MIT): `init.mjs` and the files it installs into a project (project `CLAUDE.md`, role files, hooks, slash commands, scripts, GitHub workflows and forms, Docker files, document templates, `START-HERE.md`).
- **The book** (`docs/book/`, CC BY 4.0): why each step works the way it does, as prompts, and the templates in `templates/`.

Out of scope: teaching programming; choosing or running production servers (each release is a Docker image the owner runs where they like); a fast prototype mode (DEC-007); teams of several people with their own tools (DEC-011).

### 1.2 Definitions
The book's glossary ([chapter 0](../book/00-introduction.md#words)) applies. In addition:

| Term | Meaning |
|---|---|
| Project | A repository created by `init.mjs` |
| Main checkout | The project folder init creates; it stays on `main` |
| Role worktree | `<project>-wt/<role>` on branch `role/<role>`, one per session |
| Setup | The Lead's `/setup` step; `"setup"` in `.claude/project.json` records whether it is done |
| Gate issue | The GitHub issue of a foundation gate (G1, G2, G3), label `gate` |
| Hand-off block | The end of a report: the session to open and its prompt alone in a code block |

### 1.3 References
- Decisions: [decisions.md](decisions.md) · Book: [docs/book/](../book/) · How to run: [HOW-TO-RUN.md](../../HOW-TO-RUN.md) · Standards map: [Appendix E](../book/appendix-e-standards.md)

## 2. Overall description

### 2.1 Users and roles

| Role | Can do |
|---|---|
| Owner | A person with an IT background who delivers for clients, most often a freelancer or team lead (DEC-011). Runs init, opens sessions, answers guides, approves gates and releases, runs owner-only commands (secrets, Docker) |
| PO session | Proposal, PRD, stories, data notes, CRs, DECs, reports; pushes `role/po` |
| Lead session | Setup, design and stack at G3, SRS, ADRs, specs, task planning, reviews, merges, releases; the only role that merges |
| Dev session(s) | Code and tests for assigned tasks; pushes `role/devN` |
| Test, UI/UX, DevOps sessions | Full level only, opened by the Lead when there is work |

### 2.2 Operating environment
- Claude Code desktop with the plugins of DEC-042; Git; Node.js 20 or newer; Docker with Docker Compose v2; the GitHub CLI (`gh`) signed in, with the `project` scope for the board.
- Windows (PowerShell, CRLF files), macOS and Linux. Only Windows has been tried on real projects so far.
- GitHub for issues, PRs, Actions, the board and the image registry (`ghcr.io`); the free plan is enough.

### 2.3 Look and feel
n/a: the playbook has no screens. Products made with it get a look-and-feel round at G3 (FR-043).

### 2.4 Constraints and assumptions
- Everything in the repo is written in English; owner-facing session output uses the owner's language (DEC-018, DEC-045).
- No real client data or internal numbers in the repo (DEC-046).
- Sessions do not run by themselves: the owner opens them, and they pick up work from issues (DEC-035).

## 3. Functional requirements

### 3.1 Project creation (`kit/init.mjs`)
| ID | Requirement | Origin | Acceptance |
|---|---|---|---|
| FR-001 | Init shall check Node.js 20+, Git, Docker and Docker Compose before changing anything, stop with install links if one is missing, and warn if Docker is not running or `gh` is missing | DEC-006 | Run without Docker on PATH: exits 1, nothing created |
| FR-002 | Init shall ask eight questions, each with a one-line hint and a default taken with Enter (name, folder, level, language, design prototype, polished documents, description, GitHub repo), confirm before acting, and accept flags or `--yes` instead | DEC-018 | Piped answers create the project; "no" at the confirmation creates nothing |
| FR-003 | Init shall offer the levels Lite (default) and Full; `--level starter` shall map to Lite | DEC-012 | `--level starter` gives `"level": "lite"` |
| FR-004 | Init shall create `main` and `dev` (Full: also `staging`), commit the kit, and create only the Lead's worktree, with `"setup": false` in `.claude/project.json` | DEC-026 | Branches `dev,main,role/lead`; no `po` or `dev1` worktree |
| FR-005 | Init shall install the project `CLAUDE.md` (name, description, level, language and documents lines filled), role files, hooks, settings, slash commands, START-HERE templates, `.github/`, scripts, document templates in `docs/templates/`, Docker files, the docs folders, `docs/ai-log.md`, `README.md`, `.env.example` and `.gitignore` lines | DEC-002, DEC-044 | Files present; START-HERE has no unfilled `{{…}}` |
| FR-006 | Init shall leave out the design pipeline (design service, image workflow, Dockerfile) unless the owner asked for a design prototype, and leave out the humanizer plugin unless documents are polished | DEC-042 | Default run has no `design:` service and no humanizer plugin |
| FR-007 | When the owner chooses a GitHub repo, init shall create it, push the branches, create the labels and the board, turn on Dependabot alerts and fixes (and secret scanning with push protection on a public repo), and tell the owner to open the Actions tab once | DEC-009, DEC-034 | Repo, labels and board exist; report lists the Actions check |
| FR-008 | Init shall install the secret-check pre-commit hook | DEC-038 | A staged line with a credential pattern blocks the commit |
| FR-009 | Init shall keep existing files unless `--force` is given, and never write secrets | | Second run lists "Kept existing" |
| FR-010 | Init's last lines shall name the Lead's folder, the session name and `/setup`, and say setup comes first | DEC-026 | Report text |

### 3.2 Levels (`scripts/set-level.mjs`, `scripts/project-level.mjs`)
| ID | Requirement | Origin | Acceptance |
|---|---|---|---|
| FR-011 | Lite shall use PO, Lead and Dev1 sessions and release from `dev` to `main` | DEC-012 | START-HERE Lite; release from `dev` |
| FR-012 | Full shall add `staging` and, when there is work, Test, UI/UX and DevOps sessions | DEC-001 | `staging` exists at Full |
| FR-013 | `set-level.mjs <lite|full>` shall move a project up or down, create the branches and (once setup is done) the worktrees of the level, delete nothing, list sessions no longer used, and update `project.json`, the Level line and START-HERE; `starter` shall mean Lite | DEC-012, DEC-040 | Up to Full creates `staging`; down keeps it and says so |

### 3.3 Roles, guard and session start
| ID | Requirement | Origin | Acceptance |
|---|---|---|---|
| FR-014 | Each worktree shall hold its role in `.claude/role`, and each role shall have a role file with its mission, work, skills, paths, limits and Recovery steps | DEC-002 | Role files in `.claude/roles/` |
| FR-015 | The `role-guard` hook shall block pushes to branches other than the role's own (the Lead excepted), force pushes to `dev`, `staging` and `main`, `--no-verify`, merges by roles other than the Lead, and edits outside the role's paths; it shall open an approval prompt for the Lead's pushes to `main` or `production`, tags, releases and workflow runs; wrapped and nested commands shall be checked too | DEC-002 | `role-guard.test.cjs` |
| FR-016 | The session-start hook shall tell each session its role, its skills, the owner-leads rule and to run its Recovery steps; tell a session in the main checkout to move to a worktree; and, while `"setup": false`, tell every role except the Lead to do nothing but say "Setup is not done" and allow only `/progress` | DEC-026, DEC-041 | `init.test.mjs` session-start checks |

### 3.4 Working with the owner (project `CLAUDE.md`)
| ID | Requirement | Origin | Acceptance |
|---|---|---|---|
| FR-017 | Each step that needs the owner shall show a "what you need to say" guide and let the owner answer in their own words, in any order | DEC-015, DEC-016 | Guides in `/setup` and `/brief` |
| FR-018 | Sessions shall ask only about what is missing, one topic at a time, offer options with a recommendation and free text, and suggest only when the owner says "suggest" (with `superpowers:brainstorming`) | DEC-015 | Trial transcripts |
| FR-019 | Before inviting "lock", a session shall show a checklist of what the owner said and what is still its assumption; after "lock" it shall ask once "final, or review first?" and write only on "final" or after the reviewed summary is approved | DEC-016 | Trial transcripts |
| FR-020 | "Later" shall put a choice under Open decisions in `CLAUDE.md` with the step that needs it and open a `decision` issue; "you decide" shall settle the rest and list the assumptions | DEC-017 | Open decisions section; `decision` label |
| FR-021 | Sessions shall check facts the owner gives when it is cheap, and try a product the owner names in the browser before analysing it | DEC-021 | Skills table row |
| FR-022 | A session that proposes another role's work shall mark it for that role to confirm and post it on that role's issue | DEC-022 | `CLAUDE.md` rule |
| FR-062 | A session shall never start a side session for another role's work; the work goes to that role's session through a hand-off block, and the session-start hook repeats this rule | DEC-049 | `init.test.mjs` side-session check |
| FR-023 | Sessions shall talk to the owner in the language set at init and write commands for the owner's shell | DEC-018, DEC-039 | `CLAUDE.md` Language line |

### 3.5 Setup (`/setup`)
| ID | Requirement | Origin | Acceptance |
|---|---|---|---|
| FR-024 | `/setup` shall run only in the Lead and come before every other step | DEC-026 | Other roles wait (FR-016) |
| FR-025 | `/setup` shall ask for constraints (a stack the client requires, screens and users, data, hard rules) and not for a stack choice | DEC-027 | `setup.md` guide |
| FR-026 | After the owner confirms, `/setup` shall fill in `CLAUDE.md`, fit Docker and CI only for a required stack, enable the design plugins for a product with screens, create milestone v0.1.0 (Full: also v0.2.0) and the G1-G3 gate issues, set `"setup": true`, merge into `dev` and push | DEC-026, DEC-029 | Gate issues and milestone on GitHub |
| FR-027 | `/setup` shall then create the PO's worktree (Lite: also Dev1's) from the Lead's worktree, check that CI ran, and end with the PO's hand-off block | DEC-026, DEC-036 | PO worktree exists after setup |

### 3.6 Foundation (`/brief`)
| ID | Requirement | Origin | Acceptance |
|---|---|---|---|
| FR-028 | `/brief` shall find the next foundation step from the documents' Status fields and send the owner to the right session if this is the wrong one | DEC-001 | `brief.md` table |
| FR-029 | G1: the PO shall write `docs/product/proposal.md` (Lite: one page) | DEC-001 | Gate G1 |
| FR-030 | G2: the PO shall write the PRD, one story per must-have with testable acceptance and, at Full, the data notes mapped to real fields | DEC-001 | Gate G2 |
| FR-031 | G3 shall run design, then stack, then SRS: the look and feel (2-3 named directions in `design/look-and-feel.html`) and the main screens approved first (Full: by a UI/UX session the Lead proposes; Lite: by the Lead); then 2-3 stack options that fit, the chosen one installed once and recorded as an ADR, Docker and CI fitted; then the SRS baseline (Full: C4, test strategy, eval plan) and milestone v0.1.0 with its tasks in Ready | DEC-027, DEC-028 | Gate G3 |
| FR-032 | After G3 the Lead shall propose the sessions the milestone needs and create their worktrees on the owner's OK | DEC-008 | Hand-off blocks for the new sessions |
| FR-033 | Foundation work shall happen under the gate's issue, and commits shall name it | DEC-029 | Commit messages |

### 3.7 Gates (`/gate`)
| ID | Requirement | Origin | Acceptance |
|---|---|---|---|
| FR-034 | `/gate <G1-G6>` shall check each criterion for the project's level and design flag against the repo and GitHub, report pass, fail or unclear with evidence, and change nothing | DEC-001 | `gate.md` |
| FR-035 | G1 shall not require a running app; G3 shall require the approved design before the stack ADR and `docker compose up --build` to start the project | DEC-027 | `gate.md` table |
| FR-036 | An approval request shall have the gate table, a For you block with links, then the question | DEC-019, DEC-020 | `CLAUDE.md` rule |
| FR-037 | An item waiting for someone outside the team may be approved later with an issue, a due date and the step that needs it | DEC-033 | `gate.md` "Approved later" |
| FR-038 | Only the owner passes a gate; the session records the approval date and closes the gate's issue | DEC-001, DEC-029 | Status field and closed issue |

### 3.8 Delivery (`/build`, `/change`, board)
| ID | Requirement | Origin | Acceptance |
|---|---|---|---|
| FR-039 | `/build` in the Lead shall split the milestone into tasks with level, role and estimate, put them in Ready, create any missing worktree on the owner's OK, and end with one hand-off block per session that starts | DEC-030, DEC-040 | `build.md` |
| FR-040 | `/build dev [#n]` shall code and run the task with no tests and no merge, commit `<type>(<module>): <summary> (#n)`, push the role branch and keep the issue In progress | DEC-030 | `build.md` |
| FR-041 | `/build done [#n]` shall confirm the change level against the diff (raise, never lower), make the tests for that level green, run verification, open a PR into `dev` with `Closes #n` and the level, and move the issue to In review | DEC-004, DEC-030 | PR template fields |
| FR-042 | The Lead shall review every PR (`code-review`, plus `security-review` for L3), merge into `dev`, and when CI on `dev` is green close the issue and move it to Done | DEC-031 | Closed issue in Done |
| FR-043 | `/change <request>` shall turn a request into a CR with testable acceptance and a proposed level; L2-L3 CRs need the owner's approval; the Lead updates the SRS and spec before tasks are assigned | DEC-003, DEC-004 | `change.md` |
| FR-044 | `scripts/board-status.mjs <n> "<column>"` shall move an issue on the project board | DEC-034 | Card moves |
| FR-045 | An alignment edit to an approved document shall be L0 with a note in the PR; any other change goes through a CR | DEC-032 | `CLAUDE.md` rule |

### 3.9 Release (`/release`, `scripts/release.mjs`)
| ID | Requirement | Origin | Acceptance |
|---|---|---|---|
| FR-046 | `/release` shall check G4, run the full tests (Full: regression on `staging` by Test), start the image CI built, and give the owner 3-5 acceptance scenarios with expected and wrong results, one at a narrow window for products with screens | DEC-030 | `release.md` |
| FR-047 | `/release demo` shall stop after acceptance, with no tag | DEC-030 | No tag created |
| FR-048 | `release.mjs` shall compute the version from the issue labels (SemVer, breaking ignored before 1.0), write the CHANGELOG version block and the SRS revision row and status, keep CRLF or LF line endings, and warn when the changelog was not updated | DEC-005 | `release.test.mjs` |
| FR-049 | After the owner's approval the Lead shall merge into `main` (Full: from `staging`; Lite: from `dev`), tag, push and create the GitHub release; the tag shall build `ghcr.io/<owner>/<repo>-app:<version>` with an SBOM and, on a public repo, a build attestation | DEC-005, DEC-009 | `image-app.yml` |

### 3.10 Hand-offs and reports
| ID | Requirement | Origin | Acceptance |
|---|---|---|---|
| FR-050 | Work changing hands shall get a hand-off comment on the issue in the fixed format, and the receiving session shall comment `Started #n` | DEC-035 | Issue comments |
| FR-051 | A report that hands work over shall end with the session to open, its folder, and a short prompt alone in a code block, nothing after it | DEC-036 | Kit commands use the block |
| FR-052 | `/progress` shall report, read-only and from live state, the stage, open decisions, work done since the last tag, work in progress, what waits for the owner, CI, and the next step; before setup it shall say setup is not done | DEC-037 | `progress.md` |
| FR-053 | Every file, issue, PR, run and board mentioned to the owner shall be a clickable link; a page outside GitHub needs the owner's OK | DEC-023 | `CLAUDE.md` rule |
| FR-054 | Sessions shall check live state before reporting it, never run commands that wait for input, and show a page only after checking it themselves | DEC-024, DEC-039 | `CLAUDE.md` rules |

### 3.11 Secrets
| ID | Requirement | Origin | Acceptance |
|---|---|---|---|
| FR-055 | `scripts/set-secret.mjs <NAME>` shall read the value without showing it, refuse bad names and `PORT`, write `NAME=value` to the git-ignored `.env.local` of the main checkout and every worktree, and never print the value | DEC-038 | `init.test.mjs` set-secret checks |
| FR-056 | `new-role-worktree.mjs` shall give a new worktree `.env.local` with its port and the secrets already set in the main checkout | DEC-038 | `init.test.mjs` worktree check |
| FR-057 | Sessions shall never read, create or ask for secrets, and shall tell the owner to replace a secret that reached the chat | DEC-038 | `CLAUDE.md` rule |

### 3.12 Skills and plugins
| ID | Requirement | Origin | Acceptance |
|---|---|---|---|
| FR-058 | The project `CLAUDE.md` shall name the skill for each task, and ban the superpowers worktree and subagent skills | DEC-041 | Skills table |
| FR-059 | The kit's settings shall enable superpowers, code-review, claude-mem and context7, and humanizer only for polished documents; setup enables frontend-design and ui-ux-pro-max for products with screens | DEC-042 | `init.test.mjs` plugin checks |

### 3.13 This repository
| ID | Requirement | Origin | Acceptance |
|---|---|---|---|
| FR-060 | `.github/workflows/test.yml` shall run the role-guard, release and init tests on every push and pull request | | Green Actions run |
| FR-061 | A change that alters kit behaviour or the book's process shall update this SRS and the decision log in the same commit, and add a line to `docs/ai-log.md` | DEC-048 | Commit contents |

## 4. Data
- `.claude/project.json`: `name`, `level` (`lite` or `full`), `repo`, `language`, `docsLanguage`, `design`, `humanize`, `setup`.
- `.claude/role`: one word, the role of the worktree.
- Project `CLAUDE.md` lines read by scripts and sessions: Level, Language, Documents, Stage, Open decisions, Stack.
- Labels: `cr`, `type:feature`, `type:change`, `type:fix`, `breaking`, `L0`-`L3`, `role:*`, `defect`, `gate`, `decision`, `sev:high`, `sev:medium`, `sev:low`, `blocked`, `needs-owner`, `codex-review`, `claude-review`.
- Board columns: Backlog, Approved, Ready, In progress, In review, Testing, Done.
- `.env.local` (git-ignored): `PORT` per worktree and the owner's secrets.

## 5. External interfaces

| Interface | Direction | Contract | Requirement |
|---|---|---|---|
| GitHub through `gh` | out | repo, labels, issues, PRs, milestones, Projects board, Actions runs, security settings | FR-007, FR-026, FR-042, FR-044 |
| GitHub Actions | in | `ci`, `codeql`, `docs-check`, `image-app`, `image-design` workflows | FR-049 |
| GitHub Container Registry | out | `ghcr.io/<owner>/<repo>-app:<tag>` and `-design` | FR-049 |
| Docker Compose | out | `docker-compose.yml` with `app` (and `design`) services | FR-031, FR-046 |
| Claude Code | in | `CLAUDE.md`, `.claude/settings.json` (hooks, plugins), `.claude/commands/`, `.claude/roles/` | FR-014 to FR-016, FR-058 |

## 6. Non-functional requirements

| ID | Characteristic | Requirement | How verified |
|---|---|---|---|
| NFR-001 | Performance | n/a beyond init finishing in a few minutes on a normal machine | Trials |
| NFR-002 | Reliability | Init can be re-run and keeps existing files; scripts other than init's GitHub step never push; a failed GitHub step leaves a working local project and says how to finish | `init.test.mjs` |
| NFR-003 | Security | Secrets never committed (pre-commit check, `.gitignore`), never shown or printed; role paths and push rules enforced by a hook; owner approval for `main`, tags and releases | `role-guard.test.cjs`, `init.test.mjs` |
| NFR-004 | Usability | A new owner reaches `/setup` in about five minutes once the tools are installed; every next step is one command or one copied prompt; owner-facing text in the owner's language | Trials |
| NFR-005 | Compatibility | Windows (PowerShell, CRLF), macOS and Linux; Node.js 20+; Docker Compose v2 | `release.test.mjs` CRLF cases; CI on Linux; macOS not yet tried |
| NFR-006 | Maintainability | Kit tests: init, role-guard, release; one decision log and this SRS; new code files carry the SPDX and credit lines | CI |
| NFR-007 | Portability | Projects run from the release image with `docker compose up` | `/release` check |
| NFR-008 | Safety | n/a | |
| NFR-009 | Cost (not in 25010) | No `/goal` or `/loop` unless asked; tests sized to the change level; roles opened only for Ready work; short hand-off prompts; compact rules per role | Book chapter 9 |

## 7. Removed requirements

| ID | Removed in | By | Reason |
|---|---|---|---|
| Starter level (one session, one brief for G1-G3, no PRs) | d280151 | DEC-012 | Slower than three sessions and hides the hand-offs |
| `/status` command | d280151 | DEC-037 | Clashed with Claude Code's `/status`; now `/progress` |
| Stack question at setup | d280151 | DEC-027 | The stack is chosen at G3, after the design |
| `docker compose up` at G1 | d280151 | DEC-027 | No app exists before the stack |
| `docs/design/look-and-feel.html` path | d280151 | DEC-027 | UI/UX may only write `design/` |
| `templates/brief.md` | d280151 | DEC-012 | Only Starter used it |
| Habit Tracker worked example | d280151 | DEC-047 | Made with Starter; to be redone at Lite |
| github MCP and product-management as required plugins | c90aa5d | DEC-042 | Not used; the kit uses `gh` |

## 8. Traceability matrix

| Requirement | Decisions | Kit files | Tests | Status |
|---|---|---|---|---|
| FR-001 to FR-010 | DEC-006, DEC-012, DEC-026 | `kit/init.mjs` | `kit/init.test.mjs` | Delivered |
| FR-011 to FR-013 | DEC-012, DEC-040 | `scripts/set-level.mjs`, `scripts/project-level.mjs` | `kit/init.test.mjs` (set-level) | Delivered |
| FR-014, FR-015 | DEC-002 | `.claude/roles/`, `.claude/hooks/role-guard.cjs` | `role-guard.test.cjs` | Delivered |
| FR-016 | DEC-026, DEC-041 | `.claude/hooks/session-start.cjs` | `kit/init.test.mjs` (session-start) | Delivered |
| FR-017 to FR-023 | DEC-015 to DEC-022 | `kit/CLAUDE.md` | Trial transcripts | Delivered; round 4 to confirm |
| FR-062 | DEC-049 | `kit/CLAUDE.md`, `.claude/hooks/session-start.cjs` | `kit/init.test.mjs` (side sessions) | Delivered |
| FR-024 to FR-027 | DEC-026, DEC-027, DEC-029 | `commands/setup.md`, `scripts/new-role-worktree.mjs`, `scripts/setup-labels.mjs` | `kit/init.test.mjs` (content checks) | Delivered; not yet run on a real project |
| FR-028 to FR-033 | DEC-027 to DEC-029 | `commands/brief.md`, `.claude/roles/lead.md`, `uiux.md` | `kit/init.test.mjs` (content checks) | Delivered; not yet run on a real project |
| FR-034 to FR-038 | DEC-019, DEC-020, DEC-033 | `commands/gate.md`, `kit/CLAUDE.md` | `kit/init.test.mjs` (content checks) | Delivered |
| FR-039 to FR-045 | DEC-004, DEC-030 to DEC-032, DEC-034 | `commands/build.md`, `commands/change.md`, `scripts/board-status.mjs`, `.github/` | Trials | Delivered; board moves not yet verified live |
| FR-046 to FR-049 | DEC-005, DEC-009, DEC-030 | `commands/release.md`, `scripts/release.mjs`, `.github/workflows/image-app.yml` | `release.test.mjs` | Delivered |
| FR-050 to FR-054 | DEC-023, DEC-024, DEC-035 to DEC-037, DEC-039 | `kit/CLAUDE.md`, `commands/progress.md` | `kit/init.test.mjs` (content checks) | Delivered |
| FR-055 to FR-057 | DEC-038 | `scripts/set-secret.mjs`, `scripts/new-role-worktree.mjs`, `hooks/pre-commit` | `kit/init.test.mjs` (set-secret) | Delivered |
| FR-058, FR-059 | DEC-041, DEC-042 | `kit/CLAUDE.md`, `.claude/settings.json` | `kit/init.test.mjs` (plugins) | Delivered |
| FR-060, FR-061 | DEC-048 | `.github/workflows/test.yml`, `CLAUDE.md` | CI | Delivered |
