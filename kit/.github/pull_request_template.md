## Link
Closes #

## Change
<!-- What changed, in a few lines -->

## Change level (confirmed against the files changed)
- [ ] L0 display  - [ ] L1 setting  - [ ] L2 module logic  - [ ] L3 core
- Same as the task's label? If wider, say why and tell the Lead:

## Checked
- [ ] Build and lint pass
- [ ] Unit tests (L1+)
- [ ] Main scenario run locally (L2+)
- [ ] Integration tests and edge cases (L3)

## Documents
- [ ] The SRS matches the behaviour (or no requirement changed)
- [ ] `CHANGELOG.md` "Unreleased" updated

## Screenshots (UI changes)

## L3 checklist (required for L3)
- [ ] No secrets or tokens in code, logs or commits
- [ ] Permissions correct; no access opened by accident
- [ ] Deletes and overwrites are confirmed or reversible
- [ ] Money and order logic checked at the edges
- [ ] Extra review proposed? (`codex-review` / `claude-review`, the owner decides)

## Hand-off
- Commit: `role/<role>` @ `<sha>`
- Notes for the reviewer:
