# Prompts: habit tracker (Lite)

Every prompt for the recorded run, in order. Each box is one message: copy it with the box's copy button and paste it into the session named above it. When a session asks something this sheet does not cover, answer in your own words; when a session ends with its own prompt for another session, use that prompt in place of the one here.

Owner's answers stay the same in every run, so the example can be repeated.

## 0. init (terminal)

```bash
node crewbook-build/kit/init.mjs
```

| Question | Answer |
|---|---|
| Project name | `Habit Tracker` |
| Folder | Enter (the suggestion) |
| Level | `1` |
| Language | `English` |
| Design prototype | `y` |
| Polished documents | `n` |
| Description | `A habit tracker for one person that works on a phone` |
| GitHub repo | `y`, public, name `crewbook-example-habit-tracker` |

## 1. Setup: session "Habit Tracker - Lead"

```
/setup
```

When it shows the setup guide:

```
No platform, language or database is required: choose what fits after the design.
It has screens. One person uses it, mostly on a phone, sometimes on a laptop.
It keeps a list of habits and the days each one was done. The data stays in the browser: no account, no server-side storage.
Hard rules: works offline after the first load, and nothing is sent anywhere.
```

If it asks anything else: answer briefly. When it lists the GitHub steps, do them, then:

```
Done: Actions enabled and the board saved.
```

If it turned on the design plugins:

```
/reload-plugins
```

## 2. Proposal, G1: session "Habit Tracker - PO"

```
/next A habit tracker for one person. I add a few habits, tick them off each day and see my streak, so I keep going. I mostly use it on my phone. Nothing leaves the browser.
```

When it shows the guide or asks who it is for and why:

```
It is for me and people like me who want to build two or three small habits, like reading or a walk. Paper lists and big apps both failed me: paper gets lost, and big apps want an account and send reminders I ignore. Success: I open it every day for a month. First release: as soon as the basics work.
```

To show suggestions:

```
suggest
```

Pick what you like, for example:

```
Keep the 7-day view and the streak. Reminders: later.
```

When it asks "Anything else?":

```
No. lock
```

When it asks whether it is final:

```
Show me the summary
```

After you read the summary and its approval request (gate table and For you block):

```
Approved
```

## 3. Requirements, G2: session PO

```
/next
```

When it asks what v0.1.0 holds:

```
v0.1.0 holds only: add, rename and delete a habit; tick today; the current streak; the last 7 days per habit; works at phone width. Reminders, statistics and export come later.
```

When it proposes acceptance criteria:

```
Looks right. lock
```

```
Final, write it
```

After the approval request:

```
Approved
```

## 4. Design, stack and plan, G3: session Lead

```
/next
```

When it asks whether you already have screens or a look in mind:

```
No screens yet. Calm and friendly, light background, one accent colour, big tap targets. Show me options.
```

When the 2-3 directions are on the page (use the letter of the one you like):

```
B, but make the tick button bigger.
```

The main screens follow in the direction you picked; they are approved with the rest of G3 below.

When it shows the stack options:

```
Take the lightest option that meets the design and works offline.
```

After the SRS and milestone v0.1.0, and the one approval request for the design, stack and plan:

```
Approved
```

## 5. Build: sessions Lead and "Habit Tracker - Dev1"

In the Lead:

```
/build
```

Open `<project>-wt/dev1` as "Habit Tracker - Dev1" when the Lead asks. The Lead sends Dev1 each prompt and merges each L0-L2 PR after its review and green CI; its recap names what it sent and merged. If it asks you to merge an L3 PR:

```
Merge it
```

Once, while Dev1 runs `/build try`, ask it:

```
Start the app so I can see it.
```

A change during the build, in the PO:

```
/change Show a small flame next to a streak of 7 days or more.
```

When the PO gives the level and the cost:

```
Approved, add it to v0.1.0.
```

## 6. Release: session Lead

```
/release demo
```

Try each scenario it lists, one at phone width. When they work:

```
All pass
```

Then:

```
/release
```

```
All pass
```

When it asks before pushing `main` and the tag:

```
Yes, release v0.1.0
```

## 7. Run the release (terminal)

In the project's main folder:

```bash
node scripts/run.mjs v0.1.0
```

It opens http://localhost:3000 by itself when the app is ready. Stop it with `node scripts/run.mjs --stop`.

## Any time

| Situation | Say |
|---|---|
| You want a status | `/progress` |
| A session asks something you have not decided | `later` |
| You want ideas | `suggest` |
| A session shows a prompt block for another session (that session was closed) | Open it and paste the prompt, as given |
| A session closed | Open it again in the same folder and type `Continue.` |
