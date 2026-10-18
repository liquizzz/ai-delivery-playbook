# Chapter 8 — Lite mode

**Purpose:** run the same process with less ceremony for a POC, an internal tool or a weekend build, and move to the full process without redoing anything.

| Area | Full process | Lite mode |
|---|---|---|
| Sessions | PO, Lead, Dev1–2, Test, UI/UX, DevOps | PO, Lead, one Dev |
| Branches | `role/*` → `dev` → `staging` → `main` → `production` | `role/*` → `dev` → `main` |
| Foundation | Proposal, PRD, data notes, stories, SRS, ADRs, C4, test strategy, eval plan | One-page proposal, short PRD with stories, **SRS** (kept), ADRs only for real choices |
| Milestones | Buffer and risk table | One milestone at a time; one-line buffer and risk |
| Reports | Morning brief and end of day | Morning brief only |
| Testing | L0–L3 with a Test session; regression on staging | L0–L3 by the Dev and CI; the Lead checks the main journey before release |
| Kept as is | | CR issues, labels, SRS revisions, SemVer, `role-guard`, hand-offs, restart sentence |

## 1. Start in Lite mode

**Ask** — in the setup prompt of chapter 1, answer "Lite mode" to question 3.

**Claude does:** sets up the kit without `staging` and the deploy workflows you do not need; writes "Lite mode" in `CLAUDE.md`; creates only the po, lead and dev1 worktrees.

## 2. Release in Lite mode

**Ask** — Lead session:
> The milestone is done. Prepare the release (Lite mode).

**Claude does:** checks the main journey; runs `scripts/release.mjs`; sends you the summary; after your approval merges `dev` into `main` and tags it.

**Claude asks before:** pushing `main` and the tag.

## 3. Move to the full process

Move when any of these becomes true: a client or real users depend on it · money, security or personal data is involved · more than one Dev is needed · releases need a staging check.

**Ask** — Lead session:
> Move this project from Lite mode to the full process.

**Claude asks you:** which roles to add now (Test, UI/UX, DevOps), and which missing Foundation documents matter for this product.

**Claude does:** creates `staging` and the new worktrees, adds the deploy workflows, drafts the missing documents, updates `CLAUDE.md`, and the PO starts the end-of-day report.

> **Token tip:** Lite mode is the cheapest way to a demo: three sessions, no staging, one report a day.

Next: [Chapter 9 — Token budget](09-token-budget.md).
