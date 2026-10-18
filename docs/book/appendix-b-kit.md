# Appendix B — Kit reference

**Purpose:** what `kit/init.mjs` installs in a project, what each part does, and how to change it with Claude.

| Path in the project | What it does |
|---|---|
| `CLAUDE.md` | Shared rules every session reads: roles, your gates, "ask first, then finish", git rules, compact instructions |
| `.claude/roles/<role>.md` | One file per role: mission, inputs and outputs, paths, must-nots, when to ask, daily rhythm, recovery |
| `.claude/role` (per worktree, not committed) | The worktree's role name, read by the hook |
| `.claude/hooks/role-guard.cjs` | Blocks or asks before risky commands and edits, per role (chapter 2) |
| `.claude/hooks/role-guard.test.cjs` | 78 test cases for the hook, including wrapped and nested commands |
| `.claude/ownership.json` (optional) | Overrides which paths each role may edit |
| `.claude/settings.json` | Registers the hook; shared allow and deny rules |
| `.claude/commands/gate.md` | `/gate G1`…`G6`: checks a gate against the repo and GitHub |
| `.github/ISSUE_TEMPLATE/` | Issue forms: CR, Task, Defect, Design |
| `.github/pull_request_template.md` | PR checklist by change level, L3 safety checks, hand-off |
| `.github/workflows/` | **Templates** — `ci`, `docs-check`, `deploy-design`, `deploy-staging`, `deploy-production` — written for a pnpm front end on Cloudflare Pages, with `<project>` placeholders. Adapt them before the first deploy (chapter 1, step 4); for other stacks see below |
| `scripts/new-role-worktree.mjs` | Creates a role's worktree, branch, role file and local port |
| `scripts/setup-labels.mjs` | Creates the labels |
| `scripts/release.mjs` | Computes the version from labels; updates `CHANGELOG.md` and the SRS |
| `scripts/release.test.mjs` | Tests the release script without GitHub |
| `.git/hooks/pre-commit` | Blocks commits with `.env` files or credential-like values |

## Change the kit for one project

**Ask** — Lead session:
> `<what you want to change>`, e.g. "Dev also owns the `db/` folder" or "Allow the Test role to run the e2e workflow".

**Claude asks you:** which roles it affects and whether the change should go back to the playbook too.

**Claude does:** edits `.claude/ownership.json`, the role file or the hook; runs the hook tests and adds a case for the change; commits.

**Claude asks before:** nothing, unless the change touches a gate (pushing `main`, releases), which it will not loosen without you saying so explicitly.

## Pipelines for another stack

**What it does:** replaces the front-end workflow templates with pipelines for your stack (API server, database, containers, a VPS or another cloud).

**Ask** — Lead session (or DevOps):
> Our stack is `<stack>`. Redesign the CI/CD workflows for it, keeping the same branch rules: CI on PRs and dev, staging from staging, production from production with a manual tag rollback.

**Claude asks you:**
1. Where each environment runs (host, region) and how it is reached.
2. Build, test and migration commands; how the database is migrated and backed up.
3. Secrets the pipelines need (names only) and who creates them.
4. Health check URL or command for the smoke test.

**Claude does:** rewrites `.github/workflows/`, keeps `deploy-production` disabled until go-live, writes deploy and rollback steps and secret names in `docs/tech/ops/`, runs CI on a test PR.

**Claude asks before:** running any workflow.

## Update a project to a newer kit

**Ask** — Lead session:
> Update this project to the latest kit from `<path to playbook>`. Show me what changes first.

**Claude does:** compares the project's kit files with the playbook, lists differences, keeps project-specific edits, applies the update after you agree, runs the tests.

## Licenses

Docs and templates: CC BY 4.0. Kit code: MIT ([kit/LICENSE](../../kit/LICENSE)). Keep the `SPDX-License-Identifier` line when you copy kit files.
