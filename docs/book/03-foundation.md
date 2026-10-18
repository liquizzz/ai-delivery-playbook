# Chapter 3 — Foundation (phases 1–3)

**Purpose:** turn an idea into an approved proposal, approved requirements and an approved design with an SRS baseline, so the delivery loop starts on solid ground. Runs once per project.

| Phase | Output | Gate you pass |
|---|---|---|
| 1 Planning | `docs/product/proposal.md` | **G1** problem, users, option, scope, metric, timeline, budget agreed |
| 2 Requirements | `docs/product/prd.md`, `data-notes.md`, `stories/` | **G2** must-haves, non-goals, metrics fixed; fields mapped to real data; a testable story per must-have |
| 3 Design | `docs/tech/srs.md` baseline, ADRs, C4, `design/`, test strategy, eval plan, first milestone | **G3** SRS with FR/NFR IDs; ADRs accepted; UI approved; test pass marks; board ready |

Rules: proposal before PRD · real data during requirements · no production code before G3 · UI flows first, then contracts, then back end · test plan before code · the first milestone is one thin end-to-end slice.

## 1. Write the proposal (phase 1)

**What it does:** decides what to build, for whom, and whether it is worth it.

**Ask** — PO session:
> Start phase 1 for `<idea in two or three sentences>`. Interview me, then draft the proposal.

**Claude asks you:**
1. Who has the problem, and what does it cost them today?
2. Who are the users and other stakeholders?
3. One measurable success metric, with a target.
4. Constraints: data location, existing systems, compliance, hosting.
5. Budget and deadline.
6. What is clearly out of scope?
7. Client material to read (paths or links)?

**Claude does:** drafts `docs/product/proposal.md` ([template](../../templates/proposal.md)) with two or three options (effort, cost, risk) and a recommendation; asks the Lead to check the effort of each option; sends you the options side by side.

**You check:** choose an option; adjust scope, budget, dates.

## 2. Pass a gate

**What it does:** confirms a phase is complete before the next starts. Works for G1–G6.

**Ask** — the session that owns the phase (PO for G1–G2, Lead for G3–G6):
> Check G1 and tell me if it is ready for my approval.

**Claude does:** runs `/gate G1`, reports each criterion as pass / fail / unclear with evidence, and the smallest list of fixes.

**You check:** the report, then reply "G1 approved" (or ask for the fixes). The session records the approval date.

## 3. Write the requirements (phase 2)

**What it does:** fixes exactly what the product must do, on real data.

**Ask** — PO session:
> G1 is approved. Start phase 2: PRD, data analysis and stories.

**Claude asks you:**
1. Business rules you already know (statuses, permissions, calculations).
2. Where the real data is and how the team may read it (read-only copy, export, sample).
3. Which nice-to-haves can wait.
4. Non-functional needs: speed, availability, security, monthly cost.
5. Who confirms business rules on the client side?

**Claude does:** drafts `docs/product/prd.md`; with the Lead, analyses the real data into `docs/product/data-notes.md` (counts and structure only, never real records); writes one story per must-have with Given/When/Then criteria; records each business decision as a DEC.

**You check:** must-haves and non-goals; open questions answered; then pass **G2** (step 2). From now on every change to requirements is a CR.

## 4. Design and SRS baseline (phase 3)

**What it does:** decides how to build it and writes the SRS everyone will work from.

**Ask** — Lead session:
> G2 is approved. Start phase 3: SRS baseline, architecture, test strategy and the first milestone. Ask UI/UX for the main screens.

**Claude asks you:**
1. Architecture options it found, with a recommendation for each decision (one question per ADR).
2. Any technology you require or forbid.
3. Pass marks for AI features (if any), e.g. accuracy, latency.
4. Scope of the first milestone (proposed: the thinnest end-to-end slice of must-have 1).

**Claude does:**
- writes `docs/tech/srs.md` version `0.0.0` ([template](../../templates/srs.md)): FR/NFR IDs, data, interfaces, Revision History, traceability;
- writes the ADRs and C4 diagrams, the test strategy and the eval plan;
- UI/UX builds the prototype in `design/` (chapter 7); the client approves it, tagged `design-v1`;
- the PO plans milestone `v0.1.0`; the Lead estimates it.

**You check:** the ADR choices, the prototype, the first milestone; then pass **G3** (step 2). The delivery loop starts.

## The SRS, in short

- Describes the system **as it is now**; versioned with every release.
- Stable IDs (`FR-021`, `NFR-004`) never reused, each with its origin (`CR-12, since v1.4.0`); removed requirements move to a "Removed" table.
- Revision History and traceability matrix (requirement ↔ CR ↔ issue ↔ test).

To understand the product at any version, ask the Lead: "What does the system do about `<topic>`, and since which version?" It answers from the SRS.

Next: [Chapter 4 — The delivery loop](04-delivery-loop.md).
