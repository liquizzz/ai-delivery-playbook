# Chapter 4 — The delivery loop

**Purpose:** ship the product in small releases (milestones), turning each request into tested code without losing control of scope or date.

Key rules:
- A milestone holds a few CRs and ships within days. Only one runs at a time; one more is "next".
- The plan is set every morning before 10:00; you decide.
- Each task has a change level that sets its testing: **L0** display · **L1** setting · **L2** logic in one module · **L3** core, money, security, user data, deletes.
- The committed date includes a risk buffer (+15% / +25% / +40%). New work in the day is paid from it; when it is used up, work moves to the next milestone or you move the date.

## 1. Ask for a change

**What it does:** turns any request (feature, change, fix) into an approved CR.

**Ask** — PO session:
> I want `<what, in business terms>`.

**Claude asks you:**
1. Who needs it and why?
2. Acceptance: what must be true when it is done? (it proposes Given/When/Then)
3. Feature, change or fix? Breaking for current users? (from 1.0.0)
4. Priority, and this milestone or the next?
5. Anything explicitly out of scope?

**Claude does:** opens a CR issue with labels and milestone; estimates the level with the Lead; if L0–L1 and within the buffer, approves it; if L2–L3 or a scope change, labels it `needs-owner` and puts it in tomorrow's brief; once approved, exports it to `docs/product/cr/` and hands it to the Lead.

**You check:** approve L2–L3 CRs in the morning brief.

## 2. CR to tasks (nothing to ask)

**Claude does** — Lead session, for each approved CR:
- updates the SRS (FR/NFR, Revision History "Unreleased", traceability) and writes the spec ([template](../../templates/spec.md));
- merges both into `dev` **before** any task starts;
- creates task sub-issues with level, module, estimate, confidence, assignee; moves them to Ready.

A task is **Ready** when its CR is approved, the SRS and spec are on `dev`, it has acceptance criteria linked to `FR-xxx`, nothing blocks it and its assignee is free.

A task is **Done** when it is pushed, its PR (`Closes #n`) passed CI and the Lead's review, tests pass for its level, the SRS and `CHANGELOG.md` are updated, and it is merged into `dev`.

## 3. Morning plan

**What it does:** sets today's work and collects every decision you need to make, once a day.

**Ask** — PO session, before 10:00:
> Morning brief.

**Claude does:** writes `docs/reports/<date>.md` ([template](../../templates/daily-report.md)): yesterday, milestone status and buffer, new items with a proposal for each, today's plan, **decisions needed** as a checklist; pushes it and sends you the link.

**You check:** answer the decisions in one reply, e.g. "1 yes, 2 next milestone, 3 yes". The PO records your answers and passes the plan to the Lead.

## 4. End of day

**Ask** — PO session (or let it run without asking):
> End-of-day report.

**Claude does:** collects the Lead's report into the same file: done, in progress, blocked, items taken in, **buffer left**, PRs waiting, risks.

**You check:** read it; no reply needed unless something is blocked on you.

## 5. Something urgent comes up

**Ask** — PO session:
> `<the new item>` — can we fit it in this milestone?

**Claude asks you:** only what is missing about the item (as in step 1).

**Claude does:** sorts it: defect in testing → this milestone · L0–L1 within the buffer → this milestone · L2–L3 or more than half a day → next milestone, unless you accept a later date · high-severity production defect → hotfix (chapter 5). Tells you the effect on the buffer and the date.

**You check:** accept, defer, or move the date.

## 6. The date is at risk

**Claude does** — PO session, on its own: proposes in order (1) use the buffer, (2) move the lowest-priority CR to the next milestone, (3) move the date.

**You check:** choose. Only you can move the date.

## 7. Test by change level

**What it does:** tests exactly what the change level requires, so small changes cost little and risky ones are covered. The level is **confirmed before** any test starts.

| Level | Dev before the PR | Test after merge |
|---|---|---|
| L0 Display | Build, lint, local look | None now; covered by the milestone regression |
| L1 Setting | + unit tests for the change | Check the changed spot only |
| L2 Module logic | + unit tests; main scenario locally | That module's scenarios (by `FR-xxx`) |
| L3 Core | + integration tests, edge cases | Core scenarios, related modules, part of the regression |

**Claude does** — on its own, for every task:
1. **Confirms the level first.** The tester (Dev before the PR, Test after the merge) reads the task's level and the files actually changed, and writes one line on the issue: *"Level L1 confirmed: only the default page size changed; testing the list page only."*
2. **Raises the level if the change is wider than the label** (e.g. an "L1" that touched shared code or data becomes L3) and tells the Lead; it never lowers a level on its own.
3. **Tests only that scope**, then records the result on the issue.

**Ask** — Lead session, when you doubt a level:
> Is #42 really L1? Show me what changed.

**Claude does:** compares the diff with the level rules and confirms or raises it.

Full regression runs on `staging` before every release, whatever the levels.

> **Token tip:** most tasks are L0–L1. Keeping them at "build + changed spot" is where most testing tokens are saved; do not ask for a full regression after each merge.

Next: [Chapter 5 — Releases](05-releases.md).
