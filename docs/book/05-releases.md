# Chapter 5 — Releases

**Purpose:** ship each milestone as a numbered, approved version, and get back fast when something goes wrong.

**Version rules:** `MAJOR.MINOR.PATCH`, computed from the labels of the milestone's closed issues: any `breaking` → MAJOR (from 1.0.0) · any `type:feature`/`type:change` → MINOR · only `type:fix` → PATCH. Before go-live versions are `0.x.y`. Every merge into `main` is a version. **Breaking** = something that works in production stops working the same way (data migration, changed API or core flow, different business result); it needs upgrade steps and a rollback plan in its spec.

## 1. Release a milestone

**What it does:** turns a finished milestone into an approved version with an updated changelog and SRS.

**Ask** — Lead session:
> Milestone `v1.4.0` is done. Prepare the release.

**Claude asks you:** only if something is open — unfinished issues (move them or wait?), open medium defects (accept or fix first?).

**Claude does:**
- merges `dev` into `staging`; asks Test for the full regression and waits for the report;
- runs `scripts/release.mjs` (version from labels; `CHANGELOG.md` and SRS Revision History updated);
- writes `docs/releases/v1.4.0.md` ([template](../../templates/release-checklist.md)) and sends you the summary:
  > **v1.4.0** (from v1.3.2) · MINOR · CR-12, CR-15 · Fixed: #88, #91 · SRS §3.2, §5.1 · Regression passed · Codex: 3 findings, 2 fixed · Risks: … · Buffer used: ½ day → **Approve / Approve and deploy / Reject**

**You check:** the summary; reply **Approve**, **Approve and deploy** or **Reject** (with a reason).

**Claude asks before:** pushing `main`, pushing the tag, creating the GitHub release, moving `production`.

## 2. Go live (first production release)

**What it does:** creates `production`, turns on deployment and declares 1.0.0.

**Ask** — Lead session:
> We are ready to go live. Prepare it.

**Claude asks you:** which version goes live; the go-live time; who does the smoke test with you.

**Claude does:** creates `production` from the chosen tag; tells you to enable the `deploy-production` workflow; watches the deployment and runs the smoke test; marks the next release as `1.0.0`.

**You check:** the smoke test result.

**Claude asks before:** pushing `production`.

## 3. Hotfix

**What it does:** fixes a serious production defect outside the milestone.

**Ask** — Lead session (or the PO routes it):
> Production defect: `<what happens>`. Hotfix it.

**Claude asks you:** steps to reproduce, who is affected, severity (proposed), workaround if any.

**Claude does:** opens a `sev:high` defect; branches `hotfix/*` from `production`; a Dev fixes; Test checks the area and core scenarios; prepares `vX.Y.(Z+1)`; after your approval merges into `production` and `main`, then back into `staging` and `dev`.

**You check:** the fix summary; approve the release.

## 4. Roll back

**What it does:** puts the previous version back live in minutes.

**Ask** — Lead session:
> Roll back production to the previous version.

**Claude asks you:** confirm the target version (proposed: the last tag before the current one) and the reason.

**Claude does:** redeploys that tag through the production pipeline; opens a `sev:high` defect for the fix; records the rollback in the daily report and `CHANGELOG.md`.

**You check:** production works again.

**Claude asks before:** running the deploy workflow; moving the `production` branch (only if the old version must stay live for a long time).

> **Token tip:** run the full regression once per release, on `staging`, not after every merge. Close the Test session when the report is written.

Next: [Chapter 6 — Continuity](06-continuity.md).
