---
description: Build a milestone. Starter builds it here; Lite and Full assign the tasks to Dev
argument-hint: [milestone, e.g. v0.1.0]
---

Build milestone **$ARGUMENTS** (none given: the open milestone with the lowest version). You are the Lead.

1. Read `.claude/project.json` (level) and the milestone's issues (`gh issue list --milestone <v> --state open`). If the foundation is not approved yet, say so and stop.
2. **Starter:** take the tasks one at a time. For each: comment `Started #n`, confirm its change level against the actual change, code it on `role/lead` with tests for that level (L2-L3: `superpowers:test-driven-development`), run the tests locally, commit `<type>(<module>): <summary> (#n)`, merge into `dev`, push, check `gh run list --branch dev --limit 1`, and close the issue only when that run is green. A red `dev` is fixed before the next task (`superpowers:systematic-debugging`).
3. **Lite, Full:** split anything still too big with `superpowers:writing-plans`, set each task's level, role and estimate, assign them to `dev1` (Full: also Test and UI/UX where needed), move them to Ready, then end with `Next: open "<Project> - Dev1" and paste: "Read CLAUDE.md and continue as dev1. Work on #<n>."` Review each PR when it comes (`code-review`, plus `security-review` for L3) and merge into `dev`.
4. Before reporting, run `superpowers:verification-before-completion`. Report: built, level of each change, tests and CI runs (live state), what is left. When the milestone is done, the next step is `/release`.
