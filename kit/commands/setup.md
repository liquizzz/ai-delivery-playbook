---
description: Finish the project setup (stack, CLAUDE.md, Docker, CI, milestone); anything can be left for later
---

Finish the setup of this AI Delivery Playbook project. You are the Lead (check `.claude/role`; if not, say which session to open and stop).

1. Read `.claude/project.json` (level, design, humanize) and `CLAUDE.md`.
2. Show the owner this guide and let them answer in their own words (rule "The owner leads" in `CLAUDE.md`):

   > **Setup: what you need to say** (anything can be "later")
   > 1. Do you already have a stack in mind? If yes, which?
   > 2. Does the product have screens? Who uses it, and where (browser, phone, desktop)?
   > 3. What data does it keep, and must it survive a restart?
   > 4. Any hard rules (no external calls, a database you must use, a deadline)?
   > Say "suggest" if you want options.

   Ask only about what is missing. For the stack follow the rule "The stack" in `CLAUDE.md`. Anything the owner leaves for later goes under Open decisions in `CLAUDE.md`, with the step that needs it, plus an issue labelled `decision` (create the label if it is missing).
3. After the owner locks and approves your summary:
   - fill in `CLAUDE.md` (description, stack and commands, hard rules, Stage);
   - if the stack is chosen: fit `docker/app.Dockerfile`, `docker-compose.yml` and `.github/workflows/ci.yml` to it, add its ecosystem to `.github/dependabot.yml`, and on a public repo run `gh variable set CODEQL_LANGUAGES --body "<codeql language>"` **before** you push; if the stack is open, leave these files as they are;
   - if the product has screens, enable `frontend-design@claude-plugins-official` and `ui-ux-pro-max@ui-ux-pro-max-skill` in `.claude/settings.json`;
   - write ADR-001 for the stack with the rejected options (or "open" with what decides it);
   - create milestone v0.1.0 on GitHub (Full: also v0.2.0);
   - commit, merge into `dev`, push.
4. Check live state: `gh run list --limit 3`. If no run exists, tell the owner to open the repo's Actions tab and click "Enable Actions on this repository", then check again.
5. Report in a few lines what was set up and what is still open, then: if you enabled plugins, "Run `/reload-plugins`". End with the next step from `START-HERE.md`.
