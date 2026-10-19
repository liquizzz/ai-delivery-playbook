---
description: Run the next foundation step (Starter brief, or proposal, PRD and SRS) up to the owner's approval
argument-hint: [your idea in two or three sentences]
---

Run the next foundation step of this AI Delivery Playbook project. Idea from the owner, if given: **$ARGUMENTS**

1. Read `.claude/project.json` (level, design) and `.claude/role`. Find the next step from the documents' Status fields:

| Level | Next step | Session | Output (template in `docs/templates/`) |
|---|---|---|---|
| Starter | Brief: G1-G3 in one approval | Lead | `docs/product/brief.md`, a one-page `docs/tech/srs.md`, milestone v0.1.0 with its tasks |
| Lite, Full | G1 proposal | PO | `docs/product/proposal.md` (Lite: one page) |
| Lite, Full | G2 requirements | PO | `docs/product/prd.md`, stories (Full: also data notes) |
| Lite, Full | G3 design and SRS | Lead | `docs/tech/srs.md` baseline, ADRs, milestone v0.1.0 and its tasks (Full: also C4, test strategy, eval plan; UI/UX does the screens) |

   If this session is not the one the step needs, say `Next: open "<Project> - <Role>" and paste: "/brief"` and stop. If the step needs an idea and none was given, ask for it first.
2. Interview the owner with `superpowers:brainstorming`, one topic per round: who it is for and the problem, the success metric, the stories for v0.1.0 (the thinnest slice: screen, logic, data), out of scope, data and deletes. For a product with screens, also the look and feel: `ui-ux-pro-max` finds styles, palettes and fonts that suit it, and you show 2-3 directions in `docs/design/look-and-feel.html` for the owner to pick (skip if there is a design prototype or UI/UX does it). Use `product-management:write-spec` for the PRD and stories.
3. Summarise the choices for one approval, write the documents from the templates, keep v0.1.0 to a day or two of work, then check the step's gate with the criteria in `.claude/commands/gate.md`.
4. End with the `For you` block and ask the owner to approve. After "Approved", set the Status field, commit, merge into `dev`, push, and give the next step.
