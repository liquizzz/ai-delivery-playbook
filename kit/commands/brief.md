---
description: Run the next foundation step (Starter brief, or proposal, PRD and SRS) up to the owner's approval
argument-hint: [your idea in your own words]
---

Run the next foundation step of this AI Delivery Playbook project. The owner's idea, if given: **$ARGUMENTS**

1. Read `.claude/project.json` (level, design) and `.claude/role`. Find the next step from the documents' Status fields:

| Level | Next step | Session | Output (template in `docs/templates/`) |
|---|---|---|---|
| Starter | Brief: G1-G3 in one approval | Lead | `docs/product/brief.md`, a one-page `docs/tech/srs.md`, milestone v0.1.0 with its tasks |
| Lite, Full | G1 proposal | PO | `docs/product/proposal.md` (Lite: one page) |
| Lite, Full | G2 requirements | PO | `docs/product/prd.md`, stories (Full: also data notes) |
| Lite, Full | G3 design and SRS | Lead | `docs/tech/srs.md` baseline, ADRs, milestone v0.1.0 and its tasks (Full: also C4, test strategy, eval plan; UI/UX does the screens) |

   If this session is not the one the step needs, say `Next: open "<Project> - <Role>" and paste: "/brief"` and stop.
2. Show the guide for the step and let the owner write in their own words (rule "The owner leads" in `CLAUDE.md`). If the idea was given, treat it as their first answer.

   > **Brief / proposal: what you need to say**
   > 1. Who is it for, and what can they not do today?
   > 2. What must the first version do? (a few lines, in your words)
   > 3. What is out, for now?
   > 4. How will you know it works? (one thing you can check)
   > 5. What data does it keep, and can anything be deleted?
   > Say "suggest" for ideas, "later" for anything you have not decided.

   > **PRD: what you need to say**: the must-haves, the non-goals, and for each must-have what "done" looks like.
   > **SRS (Lead): what you need to say**: anything the SRS must respect (limits, speed, devices, data rules); the Lead drafts the rest from the PRD.

   Ask only what is missing or unclear, then "Anything else? Want me to suggest more?", until the owner says "lock". Use `superpowers:brainstorming` only when they ask for suggestions, and `product-management:write-spec` for the PRD and stories.
3. Look and feel, for a product with screens (skip with a design prototype or a UI/UX session): first ask whether the owner already has a look in mind (a site they like, colours, light or dark). Then `ui-ux-pro-max` finds styles, palettes and fonts that fit, and you show 2-3 directions (theirs first, if they gave one) in `docs/design/look-and-feel.html`. The owner picks, mixes or changes them.
4. Summarise every decision and every call you made yourself, and ask whether it is final. After the owner approves, write the documents from the templates, keep v0.1.0 to a day or two of work, create the task issues and put them on the board in Ready (`node scripts/board-status.mjs <n> Ready`), then check the step's gate with the criteria in `.claude/commands/gate.md`.
5. End with the `For you` block and ask the owner to approve the gate. After "Approved", set the Status field, commit, merge into `dev`, push, and give the next step.
