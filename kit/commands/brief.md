---
description: Run the next foundation step (G1 proposal, G2 requirements, G3 design, stack and SRS) up to the owner's approval
argument-hint: [your idea in your own words]
---

Run the next foundation step of this AI Delivery Playbook project. The owner's idea, if given: **$ARGUMENTS**

1. Read `.claude/project.json` (level, design, setup) and `.claude/role`. If setup is not done, say "Setup is not done: open "<Project> - Lead" and type /setup" and stop. Find the next step from the documents' Status fields:

| Next step | Session | Output (template in `docs/templates/`) |
|---|---|---|
| G1 proposal | PO | `docs/product/proposal.md` (Lite: one page) |
| G2 requirements | PO | `docs/product/prd.md`, stories (Full: also data notes) |
| G3 design, stack and SRS | Lead | a) the approved design; b) the stack ADR; c) `docs/tech/srs.md` baseline, ADRs, milestone v0.1.0 and its tasks (Full: also C4, test strategy, eval plan) |

   If this session is not the one the step needs, end with the hand-off block for that session (prompt: `/brief`) and stop. Work under the gate's issue (label `gate`): move it to In progress, and name it in every commit.
2. Show the guide for the step and let the owner write in their own words, in any order (rule "The owner leads" in `CLAUDE.md`). If the idea was given, treat it as their first answer.

   > **Proposal: what you need to say**
   > 1. Who is it for, and what can they not do today?
   > 2. What must the first version do? (a few lines, in your words)
   > 3. What is out, for now?
   > 4. How will you know it works? (one thing you can check)
   > 5. What data does it keep, and can anything be deleted?
   > 6. Constraints: systems it must work with, budget, traffic, deadline, a product you want to copy or beat.
   > Say "suggest" for ideas, "later" for anything you have not decided.

   > **PRD: what you need to say**: the must-haves, the non-goals, and for each must-have what "done" looks like.
   > **G3 (Lead): what you need to say**: whether you have a look in mind (a site you like, colours, light or dark), and anything the system must respect (limits, speed, devices, data rules). The Lead drafts the rest from the PRD.

   When the owner names a product to copy or beat, try it first (Skills table in `CLAUDE.md`). Check facts the owner gives when it is cheap. Ask only what is missing or unclear, then "Anything else? Want me to suggest more?"; before inviting "lock", show the gate checklist with ✅ and ⚠️. Use `superpowers:brainstorming` only when they ask for suggestions. Technical ideas from the PO are marked "for the Lead to confirm at G3" and posted on the G3 issue.
3. **G3 runs in three parts, in this order** (rule "Design first, stack after" in `CLAUDE.md`):
   a. **Design the client can see.** For a product with screens, the look and feel (2-3 named directions in `design/look-and-feel.html`, the owner picks) and every main screen and state. Full: propose the UI/UX session for this; on the owner's OK create its worktree from your own (`node scripts/new-role-worktree.mjs uiux`) open a design issue (`role:uiux`) under G3 and hand it over with the hand-off block. Lite: do it yourself. Meanwhile the Lead writes the flows, the data and the integrations. The owner approves the design (with a prototype: tag `design-v1`). Without screens, the design is the flows, data and interfaces.
   b. **Stack:** 2-3 options that fit the design and the NFRs; install the chosen one once on the owner's machine; ADR with the rejected options; fit Docker, CI, Dependabot (and CodeQL on a public repo) to it, so `docker compose up --build` starts the project.
   c. **SRS and plan:** the SRS baseline (Full: also C4, test strategy, eval plan), milestone v0.1.0 as the thinnest end-to-end slice (a day or two of work), the task issues in Ready (`node scripts/board-status.mjs <n> Ready`).
4. After "lock", ask the one question from "The owner leads" (final, or review first), then write the documents from the templates and check the step's gate with `.claude/commands/gate.md`. An item that waits for someone else (for example a table description from the client) may be approved later: give it an issue, a due date and the step that needs it.
5. Ask for approval in the fixed form (gate table, `For you` block with links, then the question). After "Approved": set the Status field, close the gate's issue, commit, merge into `dev` (Lead) or open the PR for the Lead (PO), push.
6. End with the next step as a hand-off block. After G2: the Lead (`/brief`). After G3: propose the team the milestone needs (Lite: Dev1 is there; Full: Dev1, and Test); on the owner's OK create the worktrees from your own (`node scripts/new-role-worktree.mjs <role>`) and give one hand-off block per new session, then `/build` in the Lead.
