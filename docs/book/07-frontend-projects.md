# Chapter 7 — Front-end projects

**Purpose:** show the client each design round the same day, without exposing unfinished product code.

**Layout:** one repo, pnpm workspace — `design/` (UI/UX prototype), `packages/tokens/` (shared design tokens), `app/` (product code). Use a second repo only if an outside partner makes the design or the client must see the design repo.

**Pipelines (split by folder):**

| Workflow | Runs on | Result |
|---|---|---|
| `ci` | Every PR, push to `dev` | Lint, type check, tests, build |
| `deploy-design` | Push to **`dev`** touching `design/` or `packages/tokens/` | "Staging design" link for the client |
| `deploy-staging` | Push to `staging` touching `app/` or `packages/tokens/` | Staging product |
| `deploy-production` | Push to `production`; manual run with a tag (rollback) | Production, off until 1.0.0 |

Design deploys from `dev`, so a new round reaches the client as soon as it is merged, while `staging` only gets product code that is ready for regression. Local dev servers use fixed ports: UI/UX 5100 · Dev1 5201 · Dev2 5202 · Test 5300.

## 1. Run a design round

**What it does:** turns client needs into a clickable prototype the client can open.

**Ask** — PO session:
> Start a design round for `<screens or flow>`.

**Claude asks you:**
1. Which screens and states (empty, loading, error) are in this round?
2. Brand inputs: colours, fonts, logo, reference sites.
3. Devices to support first (mobile, desktop).
4. Who on the client side reviews, and by when?

**Claude does:** the PO opens a Design issue and hands it to UI/UX; UI/UX builds the screens in `design/`, pushes and opens a PR; the Lead merges it through the fast lane (L0, no Test); the design link updates; the PO sends you the link.

**You check:** the screens, before they go to the client.

## 2. Process client feedback

**Ask** — PO session:
> Client feedback on the design: `<paste or summarise>`.

**Claude asks you:** which comments to accept, defer or reject, when they conflict or change business rules (each with a proposal).

**Claude does:** records the feedback on the Design issue; UI/UX makes the next round; business-rule changes become CRs.

## 3. Approve the design

**Ask** — PO session:
> The client approved the design.

**Claude does:** the Lead tags `design-vN`; UI/UX writes the hand-off for Dev (screens, states, tokens, behaviour); the Lead creates the build tasks in `app/` for the next milestone; you are reminded to pause `deploy-design`.

**You check:** the build tasks in the next milestone.

Next: [Chapter 8 — Lite mode](08-lite-mode.md).
