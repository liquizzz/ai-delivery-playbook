# Recording script: habit tracker (Lite)

The plan for recording the habit tracker example from an empty folder to a released v0.1.0. It lists what to say to each session, what to capture and how to keep private details out of the shots. The finished example (walkthrough, screenshots, a short video) goes in this folder.

## The project

| Item | Choice |
|---|---|
| Product | A habit tracker for one person: add a habit, tick it off for today, see the current streak and the last 7 days. Works on a phone. Data stays in the browser, no account |
| Level | Lite (PO, Lead, Dev1) |
| Working language | English, so the screenshots read for everyone. A Vietnamese run can follow later as a second example |
| Repo | A new public repo, for example `crewbook-example-habit-tracker`, so readers can open every issue, PR and release |
| Design prototype | Yes (the product has screens) |
| Documents | Plain |
| v0.1.0 | Add, rename and delete a habit; tick today; streak; 7-day view; works at phone width |
| Time | About one day: 2-3 hours of sessions, the rest for waiting, captures and notes |

## Before you start

1. **Screens:** record one 16:9 screen (2560×1440 here, exported at 1080p) with Claude Code desktop maximised and its zoom at about 125%, so the text stays readable after the export. Keep this sheet, `prompts.md` and your notes on the second screen, which is not recorded. Open the browser (GitHub, the app) on the recorded screen. One theme for the whole run.
2. **Privacy:** hide or close anything personal before each capture:
   - the sidebar's other sessions and projects (collapse the sidebar or use a clean profile);
   - your email, avatar and account menu;
   - notifications (Windows: Focus on);
   - terminals that ever showed a key or token.
   The habit tracker needs no secrets. If a step asks for one, stop the recording first.
3. **Tools:** OBS Studio records the whole run as video (Display Capture of the recorded screen, 1440p, MKV, start and stop with a hotkey). Xbox Game Bar records one app window at a time, so it misses the switches between Claude, the terminal and the browser. Clipchamp (built into Windows) trims the clips and speeds up the waits. Take the ★ screenshots with `Win+Shift+S` as you go; any you miss can be cut from the video afterwards. Screenshots stitched together by AI would look like a slideshow and lose the proof that the run really happened, so they serve only for a short preview GIF.
4. **Names:** screenshots `NN-step-what.png` (for example `03-g1-proposal-checklist.png`), video clips `clip-NN-step.mp4`, in one folder outside the repo. I pick and crop them afterwards.
5. **Clock:** note the start and end time of each step in a text file; the walkthrough uses them.

## What to say

Every message, including the answers to the guides, is in [prompts.md](prompts.md), ready to copy. The steps below are the outline. Prompts are written out so the run can be repeated. Answer follow-up questions in your own words; that is part of what the example shows. When a session ends with a prompt for another session, use that prompt and ignore the one here.

### 0. init (terminal)

```bash
node crewbook-build/kit/init.mjs
```

Answers: name `Habit Tracker`, folder of your choice, level `1` (Lite), language `English`, design prototype `yes`, documents `plain`, description "A habit tracker for one person that works on a phone", GitHub `yes`, public.

### 1. Setup (Lead)

Open the folder `<project>-wt/lead`, name the session "Habit Tracker - Lead", type `/setup`. When the guide asks:

> No platform or database is required. It has screens, used by one person on a phone or a laptop. It keeps habits and the days they were done, only in the browser. Hard rule: no account and no server-side data.

Do the GitHub steps it lists (enable Actions, board layout), then `/reload-plugins` if asked.

### 2. Proposal, G1 (PO)

Open `<project>-wt/po`, name it "Habit Tracker - PO":

```
/next A habit tracker for one person. I add a few habits, tick them off each day and see my streak. I mostly use it on my phone. Nothing leaves the browser.
```

When it asks: say "suggest" once, to show how suggestions work, then pick what you like. Type "lock", choose "Show me the summary", approve.

### 3. Requirements, G2 (PO)

```
/next
```

Keep v0.1.0 to the list in "The project". Type "later" for one item (for example reminders) to show how an open decision is parked. Lock and approve.

### 4. Design, stack and plan, G3 (Lead)

```
/next
```

Say you have no screens yet, pick one of the 2-3 look-and-feel directions and ask for one change to it. Choose the lightest stack it offers. Approve the design, the SRS and milestone v0.1.0 together, once.

### 5. Build (Lead, Dev1)

In the Lead: `/build`. Open `<project>-wt/dev1`, name it "Habit Tracker - Dev1", when the Lead asks. The Lead sends Dev1 its prompts and merges every PR by itself after its review; capture one recap line that says what it sent and merged. Once, during a `/build try`, open the running app to show a task working before its tests.

Try one change mid-build, to show the change flow. In the Lead:

```
/change Show a small flame next to a streak of 7 days or more.
```

### 6. Release (Lead)

```
/release demo
```

The Lead merges `dev` into `staging`; Dev1 runs the regression and the PO accepts every criterion on `staging` (say yes when the Lead offers to open the PO). Try the scenarios the Lead lists, one of them at phone width. Then:

```
/release
```

The PO writes the handover. Approve the push to `main` and the tag: the Lead releases the accepted `staging` commit with no new tests.

### 7. Run the release

In the main folder, `node scripts/run.mjs v0.1.0`: it checks Docker, pulls the image, waits until the app answers and opens the browser. Capture the terminal and the app (shot 23).

## Shot list

Screenshots marked ★ go in the walkthrough; the rest are back-ups. Video clips are short; long waits are cut or sped up.

| # | Step | Capture | Type |
|---|---|---|---|
| 01 | 0 | init's questions with your answers ★ | screenshot |
| 02 | 0 | init's last lines: created, next step | screenshot |
| 03 | 0 | `START-HERE.md` open, top half ★ | screenshot |
| 04 | 1 | `/setup` guide and your answer | screenshot |
| 05 | 1 | GitHub board with the gate issues ★ | screenshot |
| 06 | 2 | `/next` guide "What you need to say" ★ | screenshot |
| 07 | 2 | A follow-up question with options | screenshot |
| 08 | 2 | The checklist before "lock" (✅ / ⚠️) ★ | screenshot |
| 09 | 2 | Approval request: gate table and For you block ★ | screenshot |
| 10 | 2 | A hand-off ending with the prompt in its own box ★ | screenshot |
| 11 | 3 | PRD stories with acceptance criteria | screenshot |
| 12 | 3 | "later" parked under Open decisions | screenshot |
| 13 | 4 | `look-and-feel.html`: the 2-3 directions side by side ★ | screenshot |
| 14 | 4 | The main screens in the chosen direction, desktop and phone ★ | screenshot |
| 15 | 4 | Stack options with effort and fit | screenshot |
| 16 | 4 | Milestone v0.1.0 tasks in AI time ★ | screenshot |
| 17 | 5 | Board with tasks moving across columns ★ | screenshot |
| 18 | 5 | The app running during `/build try` | screenshot |
| 19 | 5 | A PR with the Lead's review and green CI ★ | screenshot |
| 20 | 5 | `/change` in the Lead, the CR it writes and its row in `docs/product/changes.md` | screenshot |
| 21 | 6 | The PO's acceptance on `staging` and the scenarios to try ★ | screenshot |
| 21b | 6 | `docs/product/handover/v0.1.0.md` | screenshot |
| 22 | 6 | The GitHub release v0.1.0 and the image ★ | screenshot |
| 23 | 7 | The app on a phone-width window ★ | screenshot |
| C1 | 0-1 | init and `/setup`, about 1 min | video |
| C2 | 2 | `/next` from idea to "lock", sped up, about 1 min | video |
| C3 | 4 | Picking the look and feel, about 1 min | video |
| C4 | 5 | From `/build` to the merged PR, sped up, about 1 min | video |
| C5 | 6-7 | Release and the app running, about 1 min | video |

## After the run

Send me the times, the screenshots and the video. Then I:
1. read the four session transcripts;
2. write `walkthrough.md` in this folder in the format of the news chatbot example: a table of steps with time and result, then for each step what the owner did, what the AI did and what an observer noticed, with the ★ screenshots in place;
3. cut the five clips from the video and list the edits for Clipchamp;
4. list what the run showed about the kit, as findings to fix.
Each screenshot and clip is checked for private details and goes into the repo only after you approve it.
