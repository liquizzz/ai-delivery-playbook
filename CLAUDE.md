If the parent workspace has its own `CLAUDE.md` (`../CLAUDE.md`), read it first.

# ai-delivery-playbook

Public playbook for AI-driven product delivery (idea → production with Claude Code).

- Everything in this repo is written in English.
- `docs/process.md` is the core: the 7 SDLC phases, AI vs. human roles, gates G1–G6, ordering rules. Keep it readable in 5 minutes.
- `docs/agent-team.md` covers role sessions: path ownership, which session opens in which phase, hand-offs, git rules, the board.
- `docs/examples/` holds worked examples from real projects. Clients are named "the client"; no client names, domains or internal numbers.
- Phase numbers (1–7) and gate IDs (G1–G6) must match across README, process, agent-team, examples, templates and kit.
- `templates/` holds copy-ready templates, one or more per phase. Keep placeholders in `<angle brackets>`. Refer to project files as code paths (`docs/prd.md`), not links, so templates have no broken links.
- `kit/` holds the Claude Code kit (sample `CLAUDE.md`, `/gate` command, secret-check hook). Re-run the hook test cases after changing the hook.
- Log every task in `docs/ai-log.md`.
- No real client data or internal numbers from any employer or client.
- Commit/push only when the user asks.
