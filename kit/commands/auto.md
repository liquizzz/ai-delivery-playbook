---
description: Show or switch what runs without the owner (/auto, /auto merge on|off, /auto relay on|off); both start on
argument-hint: merge on|off | relay on|off
---

Automation: **$ARGUMENTS**. Works in any session; the settings apply to every session of the project at once.

1. Without an argument, run `node scripts/crew-settings.mjs status` and report both switches in two lines. Stop.
2. With `merge on|off` or `relay on|off`, run `node scripts/crew-settings.mjs <merge|relay> <on|off>`. Anything else: show the usage line from the description and stop.
3. Reply in a few lines, in the owner's language:
   - **merge on** (the default): after its review (`code-review`) and green CI, the Lead merges L0-L2 PRs into `dev` without asking and reports each merge in one line. L3 PRs, gates, releases to `main`, deployments and rollbacks still wait for the owner.
   - **merge off:** the Lead asks the owner before every merge into `dev`.
   - **relay on** (the default): at the end of a step, each session sends the next session its one-line prompt itself and names it in one line of its recap. The receiving session reads the issue and the documents, so a message costs little beyond the work itself. Work runs on until a gate, an L3 PR, a release or a question only the owner can answer. The receiving session must be open; if it is closed, the sender shows the hand-off block instead.
   - **relay off:** sessions end with a hand-off block for the owner to paste; `/send` sends one block.
