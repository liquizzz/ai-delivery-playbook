# Release: <Project> <version>

Copy to `docs/releases/<version>.md` for each release.

| Field | Value |
|---|---|
| Release date | YYYY-MM-DD |
| Approved by | <human owner> |
| Environment | <staging / production> |

## Before deploy
- [ ] All tasks for this release are `done` on the board; no open CR for this scope
- [ ] Tests pass (unit, integration, end-to-end); eval meets the pass mark: <metric = value>
- [ ] No open high-severity findings
- [ ] Secret check passes; no credentials or client data in the repo or image
- [ ] Configuration and secrets set in the target environment (not in git)
- [ ] Database migrations reviewed; backup taken; rollback steps written
- [ ] Release notes drafted

## Deploy
- [ ] Deploy approved by the human owner
- [ ] Deployed version or image tag: <...>
- [ ] Migrations applied

## After deploy
- [ ] Smoke test of the main journey in production
- [ ] Monitoring and error alerts checked for <30 min>
- [ ] Rollback not needed (or rolled back, reason: <...>)
- [ ] Line added to `docs/ai-log.md`; README status updated

## Release notes
- <user-facing change>
