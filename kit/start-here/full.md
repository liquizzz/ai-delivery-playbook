# Start here: {{name}}

Level: **Full process**. You talk mostly to the PO; the Lead runs the team (Dev, Test, UI/UX, DevOps sessions) and releases. Each step is one prompt to one session: paste it, answer the questions in one reply, check the result, go on. The book explains any step in more depth (chapter numbers in brackets).

Done by `init`: the kit, branches `main`, `dev` and `staging`, GitHub repo {{repo}}, and two worktrees: PO `{{po}}`, Lead `{{lead}}`.

## 1. Finish the setup (ch. 1). Session: Lead

**Open** Claude Code desktop in `{{lead}}`, name it "{{name}} - Lead", and paste:
> Read CLAUDE.md and continue as lead. Finish the setup: ask me the stack and commands, then fill in CLAUDE.md and the Docker files, and create the board and milestones v0.1.0 and v0.2.0 on GitHub.

## 2. Open the PO session (ch. 1)

Open a session in `{{po}}` named "{{name}} - PO" and paste:
> Read CLAUDE.md and continue as po.

## 3. Proposal: gate G1 (ch. 3). Session: PO

> Start phase 1 for `<your idea in two or three sentences>`. Interview me, then draft the proposal.

Then: "Check G1 and tell me if it is ready for my approval." Approve.

## 4. Requirements: gate G2 (ch. 3). Session: PO

> G1 is approved. Start phase 2: PRD, data analysis and stories.

## 5. Design and SRS: gate G3 (ch. 3). Session: Lead

> G2 is approved. Start phase 3: SRS baseline, architecture, test strategy and the first milestone. Ask UI/UX for the main screens.

## 6. Add the team (ch. 2). Session: Lead

> We need dev1, test and uiux for milestone v0.1.0. Prepare them.

Open one session per worktree the Lead creates, each with "Read CLAUDE.md and continue as `<role>`."

## 7. Every day (ch. 4). Session: PO

"Morning brief." before 10:00 · "I want `<change>`." for changes · "End-of-day report."

## 8. Release (ch. 5). Session: Lead

> Milestone v0.1.0 is done. Prepare the release and my acceptance test.

The Test session runs the regression on `staging`; you try 3-5 scenarios yourself, then approve. The Lead asks before pushing `main` and the tag.

## 9. Run the release in Docker (ch. 1, section 4). Session: Lead

> Show me how to run v0.1.0 in Docker on this machine, from the tag and from the published image.

## Any time

| Need | Say or run |
|---|---|
| Where the project stands | PO: "Where are we?" |
| Restart after closing a session | "Read CLAUDE.md and continue as `<role>`." |
| Fewer roles | `node scripts/set-level.mjs lite` in `{{main}}`. Documents and history stay. |
| No step skipped | Book Appendix D: process checklist |
