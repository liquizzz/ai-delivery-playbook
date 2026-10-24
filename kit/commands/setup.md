---
description: Finish the project setup (CLAUDE.md, gate issues, milestone, the team's folders) without questions; comes first
---

Finish the setup of this Crewbook project. You are the Lead (check `.claude/role`; if not, say which session to open and stop). Setup comes before any other step: until it is done, the other sessions wait. Setup asks the owner nothing: the idea and the constraints come at G1, the stack at G3.

1. Read `.claude/project.json` (level, design, humanize) and `CLAUDE.md`. **Plugins first:** check your own skill list for `superpowers:`, `code-review`, `claude-mem` and `context7` skills (and `humanizer` when `humanize` is true). If any is missing, run `node scripts/plugins.mjs` (it installs what `.claude/settings.json` enables, or prints the `/plugin install` lines to paste), tell the owner to type `/reload-plugins` and then `/setup` again, and stop.
2. Set up:
   - fill in `CLAUDE.md`: the description from init (or "given at G1"), Stage ("Foundation, next gate G1") and the Stack line ("chosen at G3, in the solution design");
   - create milestone v0.1.0 on GitHub (Full: also v0.2.0) and one issue per foundation gate, labelled `gate`, in Backlog on the board: "G1 Proposal", "G2 Requirements", "G3 Design, stack and SRS". Foundation commits name their gate's issue;
   - if the project's language (the Language line in `CLAUDE.md`, `language` in `.claude/project.json`) is not English, rewrite `START-HERE.md` in that language; keep commands, paths, code blocks, links and session names in English and explain in that language what each command does (`scripts/set-level.mjs` renders it again in English and tells the owner to ask you to rewrite it, so do it again then);
   - in Claude Code desktop: if your own session's title is not "<Project> - Lead", rename it (`set_session_title`); if it is in no sidebar group, create one named after the project and file yourself in it (`create_group`, then `move_sessions` with `self`), so every session opened later joins the same group;
   - set `"setup": true` in `.claude/project.json`;
   - commit, merge into `dev`, push.
3. From your own worktree, create the team's folders: `node scripts/new-role-worktree.mjs po` (Lite: also `dev1`). Full: UI/UX joins at G3 for the look and feel, Dev and Test when G3 is approved (Test writes the test cases while Dev builds).
4. Check live state: `gh run list --limit 3`. If no run exists, tell the owner to open the repo's Actions tab and click "Enable Actions on this repository", then check again.
5. Report in a few lines what was set up, with links. Then open the PO's session for the owner (rule "Opening sessions" in `CLAUDE.md`, first message `/next`, which asks for the idea); if the owner opens it themselves, end with the hand-off block for the PO (format in `CLAUDE.md`), for example:

   **Next:** open "<Project> - PO" (folder `<po worktree>`) and paste:
   ```
   /next <your idea, in your own words>
   ```
