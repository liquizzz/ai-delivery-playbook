---
description: Turn an owner request into a CR with its level, SRS update and tasks
argument-hint: <what you want, in business terms>
---

The owner wants: **$ARGUMENTS**

1. Read `.claude/project.json` (level) and `.claude/role`. The PO writes the CR and the Lead does the SRS, spec and tasks; if this session is the wrong one, end with the hand-off block for the right one (prompt: `/change <request>`) and stop.
2. Follow "The owner leads" in `CLAUDE.md`. The CR needs: what changes for the user, how to check it is done, how urgent it is, and which version it goes in. Ask only for what the request does not say; suggest only if the owner asks. A defect in what was released goes through the Defect form instead (`type:fix`, `defect` and a severity).
3. Open the CR issue (CR form) with testable acceptance and a proposed change level (money, security, personal data, deletes: always L3), and put it in Backlog (`node scripts/board-status.mjs <n> Backlog`). L2-L3 CRs need the owner's approval before work starts; after it, move the CR to Approved.
4. Lead: update `docs/tech/srs.md` (FR/NFR, origin, Revision History "Unreleased", traceability) and, if needed, a spec in `docs/tech/spec/`; merge into `dev`; create the tasks in the milestone.
5. Report in a few lines, with links: the CR, its level, the SRS sections changed, and the next step as a hand-off block (prompt: `/build dev #<n>` for the Dev session).
