# Start here: {{name}}

Level: **Lite**. Three Claude Code sessions: PO (your requests), Lead (SRS, review, release) and Dev1 (builds). Each step is one prompt to one session: paste it, answer the questions round by round, check the result, go on. The book explains any step in more depth (chapter numbers in brackets).

Done by `init`: the kit, branches `main` and `dev`, GitHub repo {{repo}}, and three worktrees: PO `{{po}}`, Lead `{{lead}}`, Dev1 `{{dev1}}`.

## 1. Finish the setup (ch. 1)

**Open** Claude Code desktop in `{{lead}}`, name it "{{name}} - Lead", and paste:
> Read CLAUDE.md and continue as lead. Finish the Lite setup: ask me one topic at a time; I choose the stack from your options. Then fill in CLAUDE.md, the Docker files and CI, and create milestone v0.1.0 on GitHub.

**Claude asks,** one topic per round: what the product needs (screens, users, data), then 2-3 stack options for you to choose from, then commands and hard rules. Confirm each round, or say "you decide".
**You get:** CLAUDE.md and Docker files fitted to your stack, merged into `dev`; milestone v0.1.0.

## 2. Open the other two sessions (ch. 2)

Open a session in `{{po}}` named "{{name}} - PO" and one in `{{dev1}}` named "{{name}} - Dev1". In each, paste:
> Read CLAUDE.md and continue as `<po or dev1>`.

## 3. Proposal: gate G1 (ch. 3). Session: PO

> Start phase 1 for `<your idea in two or three sentences>`. Interview me, then draft a one-page proposal.

**You check:** the proposal and its options. Approve or say what to change.

## 4. Requirements: gate G2 (ch. 3). Session: PO

> G1 is approved. Write a short PRD with stories.

**You check:** the stories cover v0.1.0. Approve.

## 5. SRS and first milestone: gate G3 (ch. 3). Session: Lead

> G2 is approved. Write the SRS baseline and plan milestone v0.1.0 as the thinnest end-to-end slice, with tasks for dev1.

**You check:** the milestone is small. Approve.

## 6. Build (ch. 4). Sessions: Dev1, then Lead

Dev1 picks up its assigned tasks: "Start your next task." The Lead reviews each PR and merges it into `dev`. You only answer questions they raise.

## 7. Release v0.1.0 (ch. 5). Session: Lead

> The milestone is done. Prepare the release and my acceptance test (Lite mode).

**You do:** try the 3-5 scenarios yourself, then approve. The Lead asks before pushing `main` and the tag.

## 8. Run the release in Docker (ch. 1, section 4). Session: Lead

> Show me how to run v0.1.0 in Docker on this machine, from the tag and from the published image.

## Any time

| Need | Say or run |
|---|---|
| Where the project stands | PO: "Where are we?" · "Morning brief." |
| A change | PO: "I want `<what, in business terms>`." |
| Restart after closing a session | "Read CLAUDE.md and continue as `<role>`." |
| Change the level | `node scripts/set-level.mjs <starter or full>` in `{{main}}`, then tell the Lead: "We moved to `<level>`. Draft what this level still lacks." |
| Save tokens | `/compact` each session after each gate or milestone |
