---
description: Turn messages between sessions on or off (/msg on, /msg off); with no argument, show the setting
argument-hint: on | off
---

Messages between sessions: **$ARGUMENTS**. Works in any session; the setting applies to every session of the project at once.

1. Without an argument, run `node scripts/crew-settings.mjs status` and report it in one line. Stop.
2. With `on` or `off`, run `node scripts/crew-settings.mjs msg <on|off>`.
3. Reply in a few lines, in the owner's language:
   - **On:** at the end of a step, each session sends the next session its prompt by itself, so the owner no longer copies hand-off blocks. Every message starts a turn in the receiving session, so a busy milestone uses more tokens, and the owner sees the other session's work only by opening it. Approvals do not change: merges, gates and releases still wait for the owner in the session that asks. The receiving session must be open; if it is closed, the sender shows the hand-off block instead. `/msg off` turns it back.
   - **Off:** sessions end with a hand-off block again; `/pass` sends one block for the owner.
