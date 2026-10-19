---
description: Where the project stands, from live GitHub and git state, in a few lines
---

Report where this project stands. Read only what you need and check live state; do not repeat an earlier report.

1. Read `.claude/project.json` (level) and the Stage line of `CLAUDE.md`.
2. Check: `gh issue list --state open --limit 30`, the open milestone and its progress, `gh pr list`, `gh run list --limit 3`, the last tag (`git describe --tags --abbrev=0`).
3. Reply in at most 10 lines: stage and next gate or milestone · done since the last tag · in progress (issue, session) · blocked or waiting for the owner · CI state · the one next step, as a command to run or a session to open.
4. Do not change anything.
