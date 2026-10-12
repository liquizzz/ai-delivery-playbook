# Running a project as an AI agent team

How several Claude Code sessions work on one repo without overwriting each other's files or decisions. Used with [process.md](process.md).

## 1. Roles and ownership

Each role is one Claude Code session with a fixed title. A role **writes only to the paths it owns**; everything else is read-only for it. The Lead writes `docs/roles.md` from the [template](../templates/roles.md) in phase 3.

| Role | Typical paths owned | Opened at |
|---|---|---|
| Lead | `CLAUDE.md`, `README.md`, `docs/proposal.md`, `docs/prd.md`, `docs/data-notes.md`, `docs/stories/`, `docs/spec.md`, `docs/c4.md`, `docs/adr/`, `docs/test-strategy.md`, `docs/eval-plan.md`, `docs/roles.md`, `docs/board.md`, `docs/ai-log.md`, `docs/case-study.md` | Phase 1 |
| UI/UX | `docs/design/`, front-end folder, demo host page | Phase 3 |
| Dev | `src/`, `sql/`, `config/`, `tests/unit/`, package manifest, `.env.example` | Phase 4 |
| DevOps | `.github/`, `deploy/`, `docker-compose.yml`, `Dockerfile*`, data restore scripts, `docs/releases/` | Phase 4 |
| Test | `tests/integration/`, `tests/e2e/`, `tests/load/`, `eval/` | Phase 4 |

Shared and read by all: proposal, PRD, spec, ADRs. Only the Lead edits them, and only through the gate or an approved CR.

## 2. Which sessions run in which phase

| Phase | Lead | UI/UX | Dev | DevOps | Test |
|---|---|---|---|---|---|
| 1 Planning and Discovery | ● proposal, repo setup | | | | |
| 2 Requirements and Analysis | ● PRD, data analysis, stories | | | | |
| 3 Design | ● spec, ADRs, test strategy, eval plan, plan | ● UI design | | | |
| 4 Implementation | ○ board, reviews | ● front end | ● back end | ● environments, data copy | ● test suites, eval set |
| 5 Testing | ○ reviews | ○ fixes | ○ fixes | | ● test and eval runs |
| 6 Deployment | ○ reviews | | | ● release | ○ smoke test |
| 7 Maintenance | ● case study, backlog | | ○ fixes | ● scheduled jobs | |

● active · ○ light involvement (reviews, answers, fixes)

## 3. Opening a session

1. The phase has started (its previous gate passed).
2. The role is listed in `docs/roles.md` with its owned paths.
3. The first prompt points to the locked documents: "Read `CLAUDE.md`, `docs/roles.md`, the spec and the ADRs. You are the <Role>."
4. The session's first task is its own detailed plan, written from the approved spec and posted on the board. It builds nothing before the plan is on the board.

## 4. Hand-offs

A hand-off is a row on the board, written by the producing role, saying what is ready and where.

| From → To | Hand-off | Unblocks |
|---|---|---|
| DevOps → Dev, Test | Local environment and data copy ready, read-only login | Back-end build, integration tests |
| Dev → UI/UX, Test | Endpoint or schema implemented per the contract | Wiring, API and integration tests |
| UI/UX → Test | Front end wired to the real API | End-to-end tests |
| Dev → DevOps | Versions fixed, pipeline settled | Full data runs, deployment |
| Test → Lead | Test and eval report | Acceptance (G5) |

## 5. Git rules in a shared checkout

1. **One branch (`main`) for short projects.** No branch switching, rebase, reset or stash in a shared checkout: it would change files under other sessions. For longer projects, give each role its own `git worktree` and merge through pull requests.
2. **Stage only your own paths:** `git add <owned paths>`, never `git add -A` or `git commit -a`.
3. **Commit only when the human asks.** Before pushing, run `git pull --ff-only`; if it fails, stop and ask the Lead.
4. **Secret check on every commit** ([kit/hooks/pre-commit](../kit/hooks/pre-commit)). Example files hold placeholders such as `CHANGE_ME`, never working values.

## 6. The board

`docs/board.md` ([template](../templates/board.md)) is the only channel between roles. It has six parts:

1. **Day plan:** current phase, open sessions, top tasks (Lead, start of day).
2. **Tasks per role:** each role edits only its own section. Status: `todo` · `doing` · `blocked` · `review` · `done`.
3. **Questions and hand-offs:** with an ID per role (D1, T1, U1…), each with a proposed answer.
4. **Change requests:** `CR-NN` with impact, decided by the human in the daily review.
5. **Next-phase backlog:** ideas raised after a gate; not built in this project.
6. **Decision log and closed items:** one line per decision with date and ID, so every role reads the current rule in one place.
