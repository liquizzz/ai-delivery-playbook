---
description: Finish the project setup for its level (stack, CLAUDE.md, Docker, CI, milestone)
---

Finish the setup of this AI Delivery Playbook project. You are the Lead (check `.claude/role`; if not, say which session to open and stop).

1. Read `.claude/project.json` (level, design, humanize) and `CLAUDE.md`.
2. Interview the owner with `superpowers:brainstorming`, one topic per round, following "Ask first, in rounds, then finish": what the product needs (screens, users, data, growth), then 2-3 stack options from the lightest to the fullest (dependencies, effort, when each fits). The owner chooses the stack; never bundle it into "as proposed". Then commands and hard rules.
3. Summarise all choices for one approval, then:
   - fill in `CLAUDE.md` (description, stack and commands, hard rules, Stage);
   - fit `docker/app.Dockerfile`, `docker-compose.yml` and `.github/workflows/ci.yml` to the stack, and add its ecosystem to `.github/dependabot.yml`;
   - on a public repo, `gh variable set CODEQL_LANGUAGES --body "<codeql language>"`;
   - if the product has screens, enable `frontend-design@claude-plugins-official` and `ui-ux-pro-max@ui-ux-pro-max-skill` in `.claude/settings.json`;
   - write ADR-001 for the stack with the rejected options;
   - create milestone v0.1.0 on GitHub (Full: also v0.2.0);
   - commit, merge into `dev`, push.
4. Check live state: `gh run list --limit 3`. If no run exists, tell the owner to open the repo's Actions tab and click "Enable Actions on this repository", then check again.
5. Report what was set up, then: if you enabled plugins, "Run `/reload-plugins`". End with the next step from `START-HERE.md`.
