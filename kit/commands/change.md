---
description: Turn an owner request into a CR with its level, SRS update and tasks
argument-hint: <what you want, in business terms>
---

The owner wants: **$ARGUMENTS**

1. Read `.claude/project.json` (level) and `.claude/role`. Starter: the Lead does all of this. Lite and Full: the PO writes the CR and the Lead does the SRS, spec and tasks; if this session is the wrong one, say `Next: open "<Project> - <Role>" and paste: "/change <request>"` and stop.
2. If the request lacks what the CR needs (scope, acceptance, priority, milestone), ask one topic per round with options, your recommendation first (`superpowers:brainstorming`). A defect in what was released goes through the Defect form instead.
3. Open the CR issue (CR form) with testable acceptance and a proposed change level (money, security, personal data, deletes: always L3). L2-L3 CRs need the owner's approval before work starts.
4. Lead: update `docs/tech/srs.md` (FR/NFR, origin, Revision History "Unreleased", traceability) and, if needed, a spec in `docs/tech/spec/`; merge into `dev`; create the tasks in the milestone.
5. Report the CR number, its level, the SRS sections changed and the next step (`/build` or the Dev session).
