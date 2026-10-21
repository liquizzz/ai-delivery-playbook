---
description: Run the next foundation step (G1 proposal, G2 requirements, G3 design, stack and SRS) up to the owner's approval
argument-hint: [your idea in your own words]
---

Run the next foundation step of this Crewbook project. The owner's idea, if given: **$ARGUMENTS**

1. Read `.claude/project.json` (level, design, setup) and `.claude/role`. If setup is not done, say "Setup is not done: open "<Project> - Lead" and type /setup" and stop. Find the next step from the documents' Status fields:

| Next step | Session | Output (template in `docs/templates/`) |
|---|---|---|
| G1 proposal | PO | `docs/product/proposal.md` (Lite: one page) |
| G2 requirements | PO | `docs/product/prd.md`, stories, the functional part of `docs/tech/srs.md` (sections 1-3, one `FR-xxx` per requirement) (Full: also data notes) |
| G3 design, stack and SRS | Lead | a) the approved design; b) the stack ADR; c) the SRS completed (NFR targets, architecture, traceability), ADRs, milestone v0.1.0 and its tasks (Full: also C4, test strategy, eval plan) |

   If this session is not the one the step needs, end with the hand-off block for that session (prompt: `/next`) and stop. Work under the gate's issue (label `gate`): move it to In progress, and name it in every commit.
2. Show the guide for the step and let the owner write in their own words, in any order (rule "The owner leads" in `CLAUDE.md`). If the idea was given, treat it as their first answer.

   > **Proposal: what you need to say**
   > 1. Who is it for, and what can they not do today?
   > 2. What must the first version do? (a few lines, in your words)
   > 3. What is out, for now?
   > 4. How will you know it works? (one thing you can check)
   > 5. What data does it keep, and can anything be deleted?
   > 6. Constraints: systems it must work with, budget, traffic, deadline, a product you want to copy or beat.
   > Say "suggest" for ideas, "later" for anything you have not decided.

   > **PRD: what you need to say**
   > 1. The must-haves: what the first version cannot ship without.
   > 2. For each must-have, what "done" looks like (something you can try and see).
   > 3. The non-goals: what you will not build now, and why.
   > 4. How you will measure success (a number or a check, with a target).
   > 5. Where the data comes from: typed in, imported, or an existing system.
   > Say "suggest" for ideas, "later" for anything you have not decided.

   > **G3 (Lead): what you need to say**
   > 1. Do you have a look in mind? A site you like, colours, light or dark.
   > 2. Which devices it must work on (phone, desktop, both).
   > 3. Limits the system must respect: speed, number of users, data rules, systems it must work with.
   > 4. Anything the stack must or must not use (if you or your client require it).
   > The Lead drafts the rest from the PRD. Say "suggest" for ideas, "later" for anything you have not decided.

   When the owner names a product to copy or beat, try it first (Skills table in `CLAUDE.md`). Check facts the owner gives when it is cheap. Ask only what is missing or unclear, then "Anything else? Want me to suggest more?"; before inviting "lock", show the gate checklist with ✅ and ⚠️. Use `superpowers:brainstorming` only when they ask for suggestions. Technical ideas from the PO are marked "for the Lead to confirm at G3" and posted on the G3 issue.
3. **G3 runs in three parts, in this order** (rule "Design first, stack after" in `CLAUDE.md`):
   a. **Design the client can see.** For a product with screens, the look and feel (2-3 named directions in `design/look-and-feel.html`, the owner picks) and every main screen and state. Full: propose the UI/UX session for this; on the owner's OK create its worktree from your own (`node scripts/new-role-worktree.mjs uiux`), open a design issue (`role:uiux`) under G3 and hand it over with the hand-off block. Meanwhile the Lead writes the flows, the data and the integrations. Full: the owner approves the design (with a prototype: tag `design-v1`) before the stack. Without screens, the design is the flows, data and interfaces.
   **Lite:** do it yourself, inside the one G3 approval. First ask whether the owner already has screens (images, Figma, sketches) or the product has none. Existing screens: they are the design; draw only what is missing. No screens: go on to the flows, data and interfaces. Otherwise show 2-3 directions; the owner picks one, which is a choice and not an approval, and you draw the main screens in it. The design is approved with the stack, the SRS and the plan.
   b. **Stack:** 2-3 options that fit the design and the NFRs; install the chosen one once on the owner's machine; ADR with the rejected options; fit Docker, CI, Dependabot (and CodeQL on a public repo) to it, so `docker compose up --build` starts the project. Keep the image small: a multi-stage build, then a static server (`nginx:alpine`, `caddy`) for a static app, or a `-slim` or `-alpine` runtime for an app with a back end, with layer caching in CI. Make the `app` healthcheck in `docker-compose.yml` work in that image (a `/health` route when there is a back end; `curl` or the runtime itself when the image has no `wget`), so `node scripts/run.mjs` knows when the app is up. Write `.claude/ownership.json` for the stack's folders (start from the defaults in `.claude/hooks/role-guard.cjs`; for example `backend/` and `widget/` for dev, `eval/` for test), so no Dev or Test is blocked on its first write. For each outside service the product calls (an AI model, a payment or search API), make one live call with the key the owner will use and record what works and what that plan blocks (rate limits, missing features) in the ADR.
   c. **SRS and plan:** complete the PO's SRS into the baseline (NFRs with targets, section 2.3 design, traceability) (Full: also C4, test strategy, eval plan), milestone v0.1.0 as the thinnest end-to-end slice, estimated in AI time (rule "Estimates" in `CLAUDE.md`), the task issues in Ready (`node scripts/board-status.mjs <n> Ready`).
4. After "lock", ask the one question from "The owner leads" (final, or review first), then write the documents from the templates and check the step's gate with `.claude/commands/gate.md`. An item that waits for someone else (for example a table description from the client) may be approved later: give it an issue, a due date and the step that needs it.
5. Ask for approval in the fixed form (gate table, `For you` block with links, then the question). After "Approved": set the Status field, close the gate's issue, commit, merge into `dev` (Lead) or open the PR for the Lead (PO), push.
6. End with the next step as a hand-off block. After G2: the Lead (`/next`). After G3: propose the team the milestone needs (Lite: Dev1 is there; Full: Dev1, and Test for the regression at the end of the milestone); on the owner's OK create the worktrees from your own (`node scripts/new-role-worktree.mjs <role>`) and open each new session for the owner (rule "Opening sessions" in `CLAUDE.md`), or give its hand-off block, then `/build` in the Lead.
