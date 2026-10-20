# Chapter 9: Token budget

**Purpose:** get the product built for a reasonable cost. Most token waste comes from sessions that run without a reason, contexts that grow too large and work that is checked more than it needs.

## The biggest costs, and what to do

| Cost driver | Do this |
|---|---|
| `/goal` and `/loop`: the session keeps working or re-checking on its own and re-reads its context every cycle | Avoid them. Give one clear prompt per step and let the session finish and stop. If you must use `/loop`, use a long interval (hours, not minutes), a clear stop condition, and stop it the same day |
| Too many open sessions: each one holds its own context | Open the minimum team (PO, Lead, one Dev). Open Test, UI/UX, DevOps only when there is work; close any session idle for a day |
| Large contexts: a long session re-sends everything on every turn | Compact after each task or hand-off ([chapter 6](06-continuity.md)). Start a fresh session (restart sentence) instead of carrying a huge one |
| Reading whole documents: the SRS and specs grow with every release | Ask for the section you need: "read §3.2 of the SRS", "read the spec of CR-12" |
| Long pasted logs | Paste only the error and a few lines around it |
| Many small questions | Answer the open decisions in one reply; in interviews, say "you decide" for topics you do not care about |
| Over-testing | Test by change level ([chapter 4](04-delivery-loop.md)); full regression only before a release |
| Extra AI reviews | Only for L3, money, security or data, and before a release; you decide each time |
| Strong model everywhere | Use the strongest model for the Lead (design, review); a cheaper, faster model is often enough for Dev and Test on routine tasks. Change it in the session's model setting |
| Skills | A skill loads its instructions only when a session uses it. The kit names one skill per task and leaves out the subagent skills, which multiply the cost; do not add others to a role file without a reason |
| Plugins you do not use | Each plugin adds a fixed cost to every session. Check it with `claude plugin details <plugin>` ("Projected token cost") and disable what the project does not need with `claude plugin disable <plugin>` |
| Verbose command output | Ask sessions for short output (`--quiet`, `git log --oneline`); an output-filtering CLI proxy, which shortens command output before the session reads it, helps further |

## Habits that keep cost low

1. Give one prompt per step and let the session stop when the step is done.
2. Close sessions that are idle. Their work is in issues, documents and git, so nothing is lost.
3. Compact at natural breaks, never in the middle of a fix.
4. Keep `CLAUDE.md` and the role files short, because every session reads them each time it starts.
5. Start at Lite and move to Full only when the stakes call for it ([chapter 8](08-lite-mode.md)). Open a role only when the Lead proposes it for work that is ready to start: fewer open sessions means less context to pay for.
6. Plan before you build. A clear CR and spec prevent rework, and rework is where tokens are wasted most.

## Check what you spend

**Ask any session** at the end of a day:
> How much context are you holding, and should I compact or restart you?

**Claude does:** reports its context size and recommends compacting or restarting with the restart sentence.

**You check:** your plan's usage page once a day during the first week, to learn what a milestone costs; then once a week.

> **Token tip:** if a milestone costs much more than the last one, ask the Lead: "Why did v0.4.0 cost more than v0.3.0?" The usual answers are a long-running session, a `/loop`, or rework from an unclear CR.

Next: [Appendix A: Templates](appendix-a-templates.md).
