# Chapter 3: Foundation (phases 1-3)

**Purpose:** turn an idea into an approved proposal, approved requirements and an approved design with an SRS baseline, before any product code is written. Runs once per project.

| Phase | Output | Gate you pass |
|---|---|---|
| 1 Planning | `docs/product/proposal.md` | G1 problem, users, option, scope, metric, timeline, budget agreed |
| 2 Requirements | `docs/product/prd.md`, `data-notes.md`, `stories/` | G2 must-haves, non-goals, metrics fixed; fields mapped to real data; a testable story per must-have |
| 3 Design | `design/` (look and feel, screens), the stack ADR (architecture decision record), `docs/tech/srs.md` baseline, ADRs, C4 (architecture diagrams), test strategy, eval plan (how AI features are measured), first milestone | G3 design approved before the stack; stack ADR; SRS with FR/NFR IDs; test pass marks; board ready |

Rules: proposal before PRD · real data during requirements · design before stack · no production code before G3 · UI flows first, then contracts, then back end · test plan before code · the first milestone is one thin end-to-end slice. Each gate has its issue (label `gate`), and the gate's commits name it.

## 1. Write the proposal (phase 1)

**What it does:** decides what to build, for whom, and whether it is worth it.

**Ask the PO:**
> /next `<idea in two or three sentences>`

Start wherever you like. If you name a product to copy or beat, the PO tries it in the browser first and reports how it works, its strengths and its weaknesses. It checks facts it can check, such as the libraries a live site loads.

**Claude asks you:**
1. Who has the problem, and what does it cost them today?
2. Who are the users and other stakeholders?
3. One measurable success metric, with a target.
4. Constraints: data location, existing systems, compliance, hosting.
5. Budget and deadline.
6. What is clearly out of scope?
7. Material to read, yours or a client's (paths or links)?

**Claude does:** drafts `docs/product/proposal.md` ([template](../../templates/proposal.md)) with two or three options (effort, cost, risk) and a recommendation; asks the Lead to check the effort of each option; sends you the options side by side.

**You check:** choose an option; adjust scope, budget, dates.

## 2. Pass a gate

**What it does:** confirms a phase is complete before the next starts. Works for G1-G6.

**Ask the session that owns the phase** (PO for G1-G2, Lead for G3-G6):
> Check G1 and tell me if it is ready for my approval.

**Claude does:** runs `/gate G1` with the criteria for your level (Lite or Full), reports each criterion as pass / fail / unclear with evidence, and the smallest list of fixes. When the gate is ready, it adds a **For you** block in plain words: what the gate means for the product, one to three things to try or read yourself (each a link, with the expected result and an example of a wrong one), what you are confirming, and what tests, CI and review already prove, with links.

**You check:** try the items in the For you block. You judge whether the product does what you want; the evidence covers the technical part, so you do not have to judge an ADR or a test report yourself. Then reply "G1 approved" (or what is wrong). The session records the approval date and closes the gate's issue. An item that waits for someone outside the team, such as a table description from the client, can be approved later when it has an issue and a due date.

## 3. Write the requirements (phase 2)

**What it does:** fixes exactly what the product must do, on real data.

**Ask the PO:**
> /next

**Claude asks you:**
1. Business rules you already know (statuses, permissions, calculations).
2. Where the real data is and how the team may read it (read-only copy, export, sample).
3. Which nice-to-haves can wait.
4. Non-functional needs: speed, availability, security, monthly cost.
5. Who confirms the business rules?

**Claude does:** drafts `docs/product/prd.md`; with the Lead, analyses the real data into `docs/product/data-notes.md` (counts and structure only, never real records); writes one story per must-have with Given/When/Then criteria; records each business decision as a DEC.

**You check:** must-haves and non-goals; open questions answered; then pass G2 (step 2). From now on every change to requirements is a CR.

## 4. Design, stack and SRS (phase 3)

**What it does:** shows you what you will get, then decides how to build it and writes the SRS everyone will work from. Design comes before the stack, because anyone can judge screens and few people can judge a stack.

**Ask the Lead:**
> /next

**Claude asks you:**
1. Whether you have a look in mind: a site you like, colours, light or dark.
2. Any technology that is required or ruled out.
3. Pass marks for AI features (if any), such as accuracy or latency.
4. Scope of the first milestone (proposed: the thinnest end-to-end slice of must-have 1).

**Claude does,** in this order:
1. **Design:** for a product with screens, 2-3 named look-and-feel directions in `design/look-and-feel.html`, then every main screen and state in the one you pick (Full: the Lead proposes the UI/UX session for this and gives you its prompt; Lite: the Lead does it). Meanwhile the Lead writes the flows, data and integrations. You approve the design; with a prototype it is tagged `design-v1` ([chapter 7](07-frontend-projects.md)).
2. **Stack:** 2-3 options that fit the design and the requirements, from the lightest to the fullest; the one you pick is installed once on your machine before it is written down as an ADR with the rejected options. Docker and CI are fitted to it, so `docker compose up --build` starts the project.
3. **SRS and plan:** `docs/tech/srs.md` version `0.0.0` ([template](../../templates/srs.md)) with FR/NFR IDs, data, interfaces, Revision History and traceability; the ADRs; at Full also C4 diagrams, the test strategy and the eval plan; milestone `v0.1.0` with its tasks in Ready.

**You check:** the design, the stack choice and the first milestone; then pass G3 (step 2). The Lead then proposes the sessions the milestone needs and gives you a prompt for each. The delivery loop starts.

## The SRS, in short

- Describes the system as it is now; versioned with every release.
- Stable IDs (`FR-021`, `NFR-004`) never reused, each with its origin (`CR-12, since v1.4.0`); removed requirements move to a "Removed" table.
- Revision History and traceability matrix (requirement ↔ CR ↔ issue ↔ test).

To understand the product at any version, ask the Lead: "What does the system do about `<topic>`, and since which version?" It answers from the SRS.

> **Token tip:** write what you already know in your first answer; Claude then asks only about the gaps, which saves rounds. A real decision now still saves rework later. Attach the material you have up front, and compact the PO and Lead after each gate.

Next: [Chapter 4: The delivery loop](04-delivery-loop.md).
