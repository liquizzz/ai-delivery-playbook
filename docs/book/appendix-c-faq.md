# Appendix C: FAQ and troubleshooting

**Purpose:** quick answers to the questions and problems that come up most.

## Working with sessions

**A session starts work without asking anything, and gets it wrong.**
Say: "Stop. Follow 'ask first, in rounds, then finish' in CLAUDE.md: ask me what you need, then redo it." Check that `CLAUDE.md` still contains that rule.

**A session asks too many questions.**
Say "you decide" for the topics you do not care about; it settles them, lists its assumptions, and keeps asking only about the rest. The stack is the one decision it will not take for you unless you say so.

**A session forgot what it was doing.**
Say "Read CLAUDE.md and continue as `<role>`." If it still drifts, ask the Lead: "Post the current state of #42 on the issue", then restart the session.

**Two sessions edited the same thing.**
That should not happen: each role has its own worktree and paths. Ask the Lead: "Check which paths each role touched in the last day and fix the overlap." Review `.claude/ownership.json`.

**I want to talk to Dev directly.**
You can, but tell the PO afterwards, or the plan and the issue will not match. Better: ask the PO, which routes it through the Lead.

## Guardrails

**"[role-guard] Role "dev1" may only push role/dev1".**
Working as intended: only the Lead pushes shared branches. The Dev should open a PR and send the Lead the link.

**"[role-guard] No role found in .claude/role".**
The session runs outside a role worktree. Ask in the main checkout: "Create the worktree for `<role>`", then open the session there.

**"Role X does not own <path>".**
Either the work belongs to another role (ask through the issue), or the project's folders differ from the defaults. Ask the Lead: "Add `<path>` to `<role>` in ownership.json."

**I approved a prompt by mistake.**
Approval prompts only cover pushes of `main` / `production`, tags, releases and workflow runs. Ask the Lead: "Undo the last release step" (revert, delete the tag, or redeploy the previous tag).

## Process

**Do I really need an SRS for a small change?**
Yes. Even a one-line requirement change updates the SRS, so the SRS stays true. For L0 display changes with no requirement change, the SRS is untouched.

**The milestone keeps growing.**
Ask the PO: "What did we take into this milestone, and what is the buffer left?" Move anything that does not fit to the next milestone.

**A client asks for a change by email.**
Paste it to the PO: "Client request: …". It becomes a CR like any other.

**The owner is away for a few days.**
Tell the PO: "I am away until `<date>`. Keep working on approved items only; queue every decision for my return." Nothing that needs you will happen; work continues on what is already approved.

## Tools

**`init.mjs` says Docker is missing.**
Docker is required. Install Docker Desktop (Windows, macOS) or Docker Engine with the Compose plugin (Linux), check `docker compose version`, then run init again. If it says Docker is not running, start Docker Desktop.

**Codex review fails or is out of quota.**
The Lead reports it; reply "use /code-review instead" or "skip".

**`gh` says it lacks the `project` scope.**
Run `gh auth refresh -s project` yourself in a terminal.

**GitHub Actions minutes run out (GitHub Free).**
Ask DevOps or the Lead: "Reduce CI minutes: cache dependencies and skip workflows for docs-only changes."
