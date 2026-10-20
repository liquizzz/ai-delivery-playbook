# Release v<X.Y.Z>: <Project>

Save as `docs/releases/vX.Y.Z.md`. Prepared by the Lead; the summary at the top is what the owner reads to approve.

## Release summary
> **v<X.Y.Z>** (from v<A.B.C>) · <MAJOR / MINOR / PATCH> · CRs: <CR-12, CR-15> · Defects fixed: <#88, #91> · SRS: <§3.2, §5.1> changed · Tests: <regression passed> · Owner acceptance: <passed n/n> · Extra review: <none / Codex: n findings, x fixed, y rejected> · Risks: <...> · Buffer used: <1 h of AI time>
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
- [ ] Owner acceptance: the owner tried each scenario on the `:staging` image and confirmed it
- [ ] `release` script run: version computed from labels, `CHANGELOG.md` finalised, SRS version and Revision History updated
- [ ] Secret check passes; no credentials or client data in the repo or images
- [ ] Migrations reviewed; backup plan and rollback steps written (breaking or L3 data changes)

## Owner acceptance scenarios (PO writes, owner tries on the staging image)
| # | Scenario (plain steps) | Expected | Owner result |
|---|---|---|---|
| 1 | <Log in as … → do … → see …> | <...> | <ok / problem: …> |
| 2 | <...> | <...> | <...> |

## Release (after the owner approves)
- [ ] `staging` merged into `main`; tag `vX.Y.Z` pushed; GitHub release created from the changelog

## Deployment (done by the owner; from 1.0.0)
- [ ] Image `ghcr.io/<owner>/<project>-app:vX.Y.Z` built by `image-app`
- [ ] Owner deployed it with their own setup; `production` branch moved to tag `vX.Y.Z`
- [ ] Migrations applied
- [ ] Smoke test of the main journey passed
- [ ] Errors and monitoring checked for <30 min>

## Rollback (only if needed, owner approves)
- [ ] Owner ran the previous image <vA.B.C> (e.g. `IMAGE_TAG=vA.B.C docker compose up -d`); data changes checked against the rollback plan
- [ ] Defect `sev:high` opened; fix planned as hotfix <vX.Y.(Z+1)>
- [ ] Recorded in `CHANGELOG.md`

## After
- [ ] Milestone closed on GitHub; next milestone set as running
- [ ] Line added to `docs/ai-log.md`; README status updated
