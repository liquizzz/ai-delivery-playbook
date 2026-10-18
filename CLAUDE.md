If the parent workspace has its own `CLAUDE.md` (`../CLAUDE.md`), read it first.

# ai-delivery-playbook

Public playbook for AI-driven product delivery (idea → production with one owner and Claude Code role sessions).

- Everything in this repo is written in English.
- `docs/process.md` is the core: Foundation (phases 1–3) and the Delivery loop (milestones, phases 4–6), gates G1–G6, CRs, versions and releases, daily rhythm. Keep it readable in 10 minutes.
- `docs/agent-team.md` is the team operating model: roles and paths, git and guardrails, GitHub tracking, DoR/DoD, WIP, change-level testing, continuity, machines, front-end pipelines.
- `docs/examples/` (added later) holds worked examples from real projects. Clients are named "the client"; no client names, domains or internal numbers.
- Phase numbers (1–7), gate IDs (G1–G6), role names, branch names, label names and change levels (L0–L3) must match across README, process, agent-team, templates and kit.
- `templates/` holds copy-ready documents. Keep placeholders in `<angle brackets>`. Refer to project files as code paths (`docs/tech/srs.md`), not links, so templates have no broken links.
- `kit/` holds what is copied into a project: `CLAUDE.md`, `.claude/` (roles, `role-guard` hook, settings), `.github/`, `scripts/`, `/gate`, the secret-check hook and `github-setup.md`. Re-run `node kit/.claude/hooks/role-guard.test.cjs` after changing the hook, and the secret-check cases after changing `kit/hooks/pre-commit`.
- Licenses: docs and templates are CC BY 4.0 (`LICENSE`); everything in `kit/` is MIT (`kit/LICENSE`). New code files in `kit/` start with the `SPDX-License-Identifier: MIT` line and the credit line (after the shebang, if any).
- Log every task in `docs/ai-log.md`.
- No real client data or internal numbers from any employer or client.
- Commit/push only when the user asks.
