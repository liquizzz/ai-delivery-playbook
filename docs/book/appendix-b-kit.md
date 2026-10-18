# Appendix B — Kit reference

**Purpose:** what `kit/init.mjs` installs in a project, what each part does, and how to change it with Claude.

| Path in the project | What it does |
|---|---|
| `CLAUDE.md` | Shared rules every session reads: roles, your gates, "ask first, then finish", git rules, compact instructions |
| `.claude/roles/<role>.md` | One file per role: mission, inputs and outputs, paths, must-nots, when to ask, daily rhythm, recovery |
| `.claude/role` (per worktree, not committed) | The worktree's role name, read by the hook |
| `.claude/hooks/role-guard.cjs` | Blocks or asks before risky commands and edits, per role (chapter 2) |
| `.claude/hooks/role-guard.test.cjs` | 56 test cases for the hook |
| `.claude/ownership.json` (optional) | Overrides which paths each role may edit |
| `.claude/settings.json` | Registers the hook; shared allow and deny rules |
| `.claude/commands/gate.md` | `/gate G1`…`G6`: checks a gate against the repo and GitHub |
| `.github/ISSUE_TEMPLATE/` | Issue forms: CR, Task, Defect, Design |
| `.github/pull_request_template.md` | PR checklist by change level, L3 safety checks, hand-off |
| `.github/workflows/` | `ci`, `docs-check`, `deploy-design`, `deploy-staging`, `deploy-production` |
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

## Update a project to a newer kit

**Ask** — Lead session:
> Update this project to the latest kit from `<path to playbook>`. Show me what changes first.

**Claude does:** compares the project's kit files with the playbook, lists differences, keeps project-specific edits, applies the update after you agree, runs the tests.

## Licenses

Docs and templates: CC BY 4.0. Kit code: MIT ([kit/LICENSE](../../kit/LICENSE)). Keep the `SPDX-License-Identifier` line when you copy kit files.
