---
description: Finish the project setup (constraints, CLAUDE.md, gate issues, milestone, the team's folders); comes first, anything can be left for later
---

Finish the setup of this Crewbook project. You are the Lead (check `.claude/role`; if not, say which session to open and stop). Setup comes before any other step: until it is done, the other sessions wait.

1. Read `.claude/project.json` (level, design, humanize) and `CLAUDE.md`.
2. Show the owner this guide and let them answer in their own words (rule "The owner leads" in `CLAUDE.md`):

   > **Setup: what you need to say** (anything can be "later")
   > 1. Do you or your client require a platform, language or database? (If not, the stack is chosen at G3, after the design.)
   > 2. Does the product have screens? Who uses it, and where (browser, phone, desktop)?
   > 3. What data does it keep, and must it survive a restart?
   > 4. Any hard rules (no external calls, systems it must work with, a deadline)?
   > Say "suggest" if you want options.

   Ask only about what is missing. Do not ask for a stack: follow the rule "Design first, stack after" in `CLAUDE.md`. Anything else the owner leaves for later goes under Open decisions in `CLAUDE.md`, with the step that needs it, plus an issue labelled `decision`.
3. After the owner locks and confirms:
   - fill in `CLAUDE.md`: description, hard rules, Stage ("Foundation, next gate G1"), and the Stack line (the stack the owner or their client requires, or "chosen at G3, after the design");
   - only if the owner or their client requires a stack: fit `docker/app.Dockerfile`, `docker-compose.yml` and `.github/workflows/ci.yml` to it, add its ecosystem to `.github/dependabot.yml`, write ADR-0001 for it, and on a public repo run `gh variable set CODEQL_LANGUAGES --body "<codeql language>"` **before** you push;
   - if the product has screens, enable `frontend-design@claude-plugins-official` and `ui-ux-pro-max@ui-ux-pro-max-skill` in `.claude/settings.json`;
   - create milestone v0.1.0 on GitHub (Full: also v0.2.0) and one issue per foundation gate, labelled `gate`, in Backlog on the board: "G1 Proposal", "G2 Requirements", "G3 Design, stack and SRS". Foundation commits name their gate's issue;
   - if the project's language (the Language line in `CLAUDE.md`, `language` in `.claude/project.json`) is not English, rewrite `START-HERE.md` in that language; keep commands, paths, code blocks, links and session names in English and explain in that language what each command does (`scripts/set-level.mjs` renders it again in English and tells the owner to ask you to rewrite it, so do it again then);
   - set `"setup": true` in `.claude/project.json`;
   - commit, merge into `dev`, push.
4. From your own worktree, create the team's folders: `node scripts/new-role-worktree.mjs po` (Lite: also `dev1`). Full: UI/UX joins at G3 for the screens, Dev and Test when G3 is approved.
5. Check live state: `gh run list --limit 3`. If no run exists, tell the owner to open the repo's Actions tab and click "Enable Actions on this repository", then check again.
6. Report in a few lines what was set up and what is still open, with links; if you enabled plugins, "Run `/reload-plugins`". End with the hand-off block for the PO (format in `CLAUDE.md`), for example:

   **Next:** open "<Project> - PO" (folder `<po worktree>`) and paste:
   ```
   /brief <your idea, in your own words>
   ```
