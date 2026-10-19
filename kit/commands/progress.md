---
description: Where the project stands, from live GitHub and git state, in a few lines (read-only)
---

Report where this project stands. Read only what you need and check live state; do not repeat an earlier report. This command only reads; it works in any session, also before setup.

1. Read `.claude/project.json` (level, setup), the Stage line and the Open decisions of `CLAUDE.md`. If `"setup": false`, say first: "Setup is not done: open "<Project> - Lead" and type /setup. Every other step waits for it."
2. Check: `gh issue list --state open --limit 30` (gate issues first), the open milestone and its progress, `gh pr list`, `gh run list --limit 3`, the last tag (`git describe --tags --abbrev=0`).
3. Reply in at most 10 lines, with links: stage and next gate or milestone · open decisions and the step that needs each · done since the last tag · in progress (issue, session) · blocked or waiting for the owner · CI state · the one next step, as a hand-off block (format in `CLAUDE.md`) when it is in another session.
4. Do not change anything.
