# Release v<X.Y.Z>: <Project>

Save as `docs/releases/vX.Y.Z.md`. Prepared by the Lead; the summary at the top is what the owner reads to approve.

## Release summary
> **v<X.Y.Z>** (from v<A.B.C>) · <MAJOR / MINOR / PATCH> · CRs: <CR-12, CR-15> · Defects fixed: <#88, #91> · SRS: <§3.2, §5.1> changed · Tests: <regression passed> · Owner acceptance: <passed n/n> · Extra review: <none / Codex: n findings, x fixed, y rejected> · Risks: <...> · Buffer used: <½ day>
>
> **Approve / Approve and deploy / Reject**

| Field | Value |
|---|---|
| Milestone | <vX.Y.Z> |
| Release approved | <YYYY-MM-DD, by the owner> |
| Deployment approved | <YYYY-MM-DD, by the owner / not yet (before 1.0.0)> |
| Breaking | <No / Yes: upgrade steps and rollback in `docs/tech/spec/CR-<n>-*.md`> |

## Before the release (Lead)
- [ ] Every milestone issue is Done or moved to the next milestone with a note
- [ ] `dev` merged into `staging`; full regression passed (`docs/tech/test-reports/vX.Y.Z.md`); eval meets pass marks: <metric = value>
- [ ] No open `sev:high` or `sev:medium` defects (or accepted by the owner: <#>)
- [ ] Owner acceptance: the owner tried each scenario on staging and confirmed it

## Owner acceptance scenarios (PO writes, owner tries on staging)
| # | Scenario (plain steps) | Expected | Owner result |
|---|---|---|---|
| 1 | <Log in as … → do … → see …> | <...> | <ok / problem: …> |
| 2 | <...> | <...> | <...> |
- [ ] `release` script run: version computed from labels, `CHANGELOG.md` finalised, SRS version and Revision History updated
- [ ] Secret check passes; no credentials or client data in the repo or build
- [ ] Migrations reviewed; backup plan and rollback steps written (breaking or L3 data changes)

## Release (after the owner approves)
- [ ] `staging` merged into `main`; tag `vX.Y.Z` pushed; GitHub release created from the changelog

## Deployment (after the owner approves; from 1.0.0)
- [ ] `production` moved to tag `vX.Y.Z`; pipeline green
- [ ] Migrations applied
- [ ] Smoke test of the main journey passed
- [ ] Errors and monitoring checked for <30 min>

## Rollback (only if needed, owner approves)
- [ ] Previous tag <vA.B.C> redeployed through the production pipeline (manual run)
- [ ] Defect `sev:high` opened; fix planned as hotfix <vX.Y.(Z+1)>
- [ ] Recorded in the daily report and `CHANGELOG.md`

## After
- [ ] Milestone closed on GitHub; next milestone set as running
- [ ] Line added to `docs/ai-log.md`; README status updated
