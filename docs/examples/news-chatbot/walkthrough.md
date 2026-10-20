# Walkthrough: news chatbot (Full level)

A real, small project run with the kit, recorded step by step as it happens. The client is a regional newspaper; names, domains and internal numbers are left out. Each step has two views: what the owner did and what the AI did, and what an observer noticed (findings for the kit are tagged R3-n).

**Product:** an AI chatbot widget embedded in the newspaper's website. It answers readers in Vietnamese from the paper's own articles, with sources, and refuses or redirects sensitive questions.
**Level:** Full (PO, Lead, then Dev, Test, UI/UX). **Owner:** one person with an IT background, working in Vietnamese. **Repo:** private.

| Step | Session | Time | Result |
|---|---|---|---|
| 0. init | terminal | a few minutes | Repo, branches, board, Lead and PO worktrees |
| 1. Setup | Lead | 4 min | Project description, stack left open (decision issue #1), UI plugins on, CI green |
| 2. Proposal (G1) | PO | about 80 min to "lock", plus the gate fix | `proposal.md`, DEC-001 to DEC-007, approved |
| 3. Requirements (G2) | PO | about 10 min, data notes 35 min later | PRD, 15 stories, data notes, DEC-008, approved |
| 4. Design and SRS (G3) | Lead | about 40 min, paused | Stack, SRS, ADRs, C4, test strategy, 11 tasks; waiting for the screen design |
| 5. Screen design (#11) | UI/UX | about 26 min | 3 directions, B chosen, all widget screens and a clickable demo (PR #25) |
| 6. Design fixes and wording | UI/UX, PO | about 30 min at night, 15 min next morning | Review fixes pushed; label, refusal wording and helpline locked (PR #26, #27) |
| 7. G3 approval | Lead | about 25 min, the approval itself 3 min | Sync redesigned, one Dev kept, `design-v1` tagged, stage Delivery, Dev1 and Test worktrees |
| 8. Estimate in AI time | Lead | about 3 min | v0.1.0 from 12 developer days to 11 h of AI time (15.5 h with buffer) |
| 9. First tasks (#12, #13, #21) | Dev1, Test, Lead | about 70 min | Backend scaffold and AI provider layer merged after review; eval sets and harness in progress |
| 10. Free AI key limits | Dev1, Lead | about 10 min | Model switched; a paid key left as a decision for v1.0.0 |

## 0. init

**Owner:** ran `node kit/init.mjs`, chose Full, Vietnamese as the working language, and a private GitHub repo.
**AI:** none yet; init is a script.
**Observer:** the owner opened the PO session and typed `/status` before running `/setup` in the Lead. `/status` is also a built-in Claude Code command, so the owner got two different reports (R3-2). The project's status report noticed the empty stack but said setup could run "in parallel" (R3-3). Decision: setup must come first, enforced by init and a hook.

## 1. Setup (Lead)

**Owner:** opened "AI Chatbot - Lead" and typed `/setup`. Answered the short guide: the chatbot talks to readers in Vietnamese; the stack is "decide later".
**AI:** asked one clarifying question, summarised, waited for "enough", then opened decision issue #1 for the stack, wrote the project description and Open decisions in `CLAUDE.md`, turned on the UI plugins, pushed, and checked that CI on `dev` was green.
**Observer:** four minutes. "Decide later" worked as designed: an issue labelled `decision`, a line under Open decisions, and the step went on.

## 2. Proposal, gate G1 (PO)

**Owner:** typed `/brief`. Instead of answering the guide's five questions in order, worked constraints first:
1. "Make it like a chatbot that another newspaper already runs. Study it first and tell me its strengths and weaknesses."
2. Described the existing system: a legacy ASP.NET WebForms site, SQL Server with a read-only replica, two front-end servers behind DNS load balancing, room for one more Linux server, no GPU.
3. Gave a fixed monthly ceiling for running costs, the traffic (tens of thousands of page views a day) and the deadline (a demo in two weeks), and how the widget must be embedded (one `div`, one script, an `init` call, no clash with the old page).
4. Asked the PO to reconsider the feature list with all of that known.
5. Proposed their own design (search the paper first, then official sources; what counts as sensitive) and asked the PO to critique it.
6. Set four goals: answer from the paper's articles; outside the paper, answer only with an official source; over 80% correct, "better to block wrongly than to miss"; never produce a judgement that could be screenshotted and quoted as the paper's view.
7. Chose option A for streaming (stream only sentences already checked against the source), asked for a full summary, then typed "lock".

**AI:**
- Tested the reference chatbot in the built-in browser: six questions, desktop and mobile, API timing. Found that it forgets context and confidently answers off-topic, takes 10-15 seconds, and returns empty bubbles for "today's news".
- Used `superpowers:brainstorming` only when the owner asked for suggestions; offered three solution options from lightest to most self-hosted; looked up official model prices and estimated cost per question and per month.
- Checked the owner's facts on the live site when asked: the site runs Bootstrap 3, not 4, and the whole page sits inside one WebForms `<form>`, so pressing Enter in the widget would reload the page. Turned these into embed rules.
- Pushed back where it mattered: sending ten full articles costs four to six times more tokens; keyword search is needed for names and document numbers; daily sync is too slow for news; a public chat API can be abused and prompted to misbehave; streaming every word conflicts with the "no unchecked text on screen" goal.
- Wrote each decision as soon as it was made (DEC-001 to DEC-007: AI provider, chat history, sensitive content, article sync, search and relevance, answer integrity, UI direction) and posted the technical constraints on the Lead's issue for G3.
- Before "lock", checked the content against the G1 criteria on request and listed its own assumptions; after "lock", wrote `proposal.md` and ran the gate check.

**Outcome:** the gate failed on one technical item, "`docker compose up --build` starts the project", because no app exists while the stack is undecided (R3-13). The owner asked the Lead for a throwaway app (issue #2, PR #4), then re-ran `/gate G1` in the PO and approved. PR #5 (proposal and DECs) merged into `dev`; the Stage line now says "Foundation, next gate G2".

**Observer:**
- About 80 minutes from `/brief` to "lock". The owner considers this normal for a real project. It produced a proposal the Lead can design from without asking again.
- Owners with an IT background tend to start from a reference product and their constraints, not from users and goals. The guide should accept any order and map the answers back to the gate items before "lock" (R3-4, R3-10).
- The PO did part of the Lead's work (search design, widget isolation). Useful, but it should be marked "for the Lead to confirm at G3" (R3-5).
- Hands-on testing of a reference product beat a web-search table of competitors (R3-6).
- All DEC commits referenced issue #1, the stack decision, because foundation steps have no issue of their own (R3-9).
- After "lock" the PO should ask once: "Is this final, or do you want to review it first?" (R3-12).
- Hand-offs: the PO ended with `Next: open "ai-chatbot - Lead" and paste: "…"`. The owner finds copy-paste prompts cheap and easy to follow. Later the sessions also messaged each other through the desktop app, and the owner still approved every merge (R3-14).
- `Closes #n` in a PR into `dev` does not close the issue, because GitHub only does that on the default branch; the Lead closed #2 by hand (R3-16).

## 3. Requirements, gate G2 (PO)

**Owner:** compacted the PO session with a note ("G1 is done, keep the proposal and the next step"), then answered the PRD guide in one message: every v0.1.0 feature is a must-have; "propose what done means"; anything new becomes a feature or a CR; the project is fixed-fee, so log effort only. Agreed to the proposed done criteria and typed "lock". Approved the PRD and stories, and left the data notes for later, when the client sends the article table.
**AI:** recorded the fixed-fee rule as DEC-008, kept the running-cost ceiling as a technical constraint and said that was its own call, proposed done criteria for each of the 15 features, summarised what the owner decided apart from what it assumed, then wrote the PRD, 15 user stories and a draft of the data notes. Opened issue #6 for the missing table description. Later, with the Lead's measurements from the client's database backup, it mapped every product field to a real column and asked the owner three remaining questions (for example: only published articles).
**Outcome:** PRD and stories approved about ten minutes after the step started; data notes approved about 35 minutes later. Stage: "Foundation, next gate G3".
**Observer:**
- G2 was fast because G1 had settled the scope, the constraints and the decisions.
- A partial approval (PRD and stories now, data notes when the input arrives) worked through an issue with a due date. The kit has no wording for it yet (R3-20).
- The PO asked for approval at G1 and G2 without the **For you** block and admitted it both times (R3-19).
- While the Lead worked, the owner asked the PO to help get a free AI API key. The PO refused to handle the key and gave a prompt-based command, but the owner typed the key into the command and sent a screenshot, so the key reached the transcript. The PO noticed and told the owner to replace the key. The PO and the Lead then disagreed on where the key lives (`.env.local` or `.env`), and the Lead wrote its own copy script. The kit needs one secret script and one place (R3-21).

## 4. Design and SRS, gate G3 (Lead)

**Owner:** typed `/brief` in the Lead. Approved a summary that offered three stacks (Node and TypeScript, Python, .NET), after the Lead had installed the chosen one (Python) on the owner's machine. Could not open the Lead's local links and asked for a link that works. When the Lead asked for G3 approval, stopped it: "Not approved. Do the UI, task #11, first."
**AI:** offered the stacks with dependencies, effort and when each fits; tried Python on the owner's machine (one driver install failed, the second attempt worked); restored the client's database backup locally, read-only, to measure the article data; wrote the SRS, five ADRs, C4, a test strategy and an eval plan; split v0.1.0 into 11 tasks under a CR-baseline issue and put them in Ready; opened a decision issue for the production server. To make the summary readable on another device, it published it as a private claude.ai page. After the owner's stop, it paused G3 with the documents in an open PR, created the UI/UX worktree, posted the hand-off on #11 and gave the prompt for the new session.
**Outcome so far:** G3 waits for the screen design (#11, tag `design-v1`); backend tasks can start in parallel.
**Observer:**
- The kit put the stack before the design, so the design became a build task (#11) after the stack was chosen. From the owner's experience, clients need a detailed design to talk about and cannot judge a stack, so the design must come first. Decision for the kit: G3 runs design, then stack, then SRS (R3-23).
- The Lead proposed the UI/UX session only after the owner asked; nothing in the kit makes it propose the team (R3-15).
- Local file links did not open for the owner; a private web page did. Pages that carry client details need the owner's OK (R3-18, R3-24).
- The main checkout stays on `main` with the scripts from init, so a worktree created from there missed a fix made on `dev` (R3-25).

## 5. Screen design, task #11 (UI/UX)

**Owner:** opened "AI Chatbot - UI/UX" in the new worktree and asked for two or three look-and-feel directions. Picked direction B, chose the first of the proposed greeting texts, and locked it.
**AI:** used `ui-ux-pro-max` and `frontend-design` with the brand rules from DEC-007 (a robot mascot, the paper's logo, red, Roboto). Built one page with three directions side by side in about nine minutes, checked it on desktop and phone, and fixed overflow and contrast problems before reporting. After the choice: design tokens for B, every widget screen and state (closed, open, progress, answer with sources, refusal, error, phone) and a clickable demo on a local port; checked at three widths with no console errors; opened a PR into `dev` and handed off to the Lead.
**Outcome:** about 26 minutes from the first prompt to a full, clickable prototype. G3 waits for the owner's approval of the design and the `design-v1` tag.
**Observer:**
- The owner was very impressed: a complete set of screens, well beyond what they would have produced alone. This is what the client needs to see before anyone talks about the stack (R3-23).
- The kit names `docs/design/look-and-feel.html`, but the role guard only lets UI/UX write to `design/` (R3-27).
- The owner looked at the page while the AI was still fixing it and thought a direction had disappeared. Show the page only after the self-check, and give each direction a stable name (R3-28).

## 6. Design fixes and wording (UI/UX, PO)

**Owner:** pasted the Lead's review of PR #25 (three small fixes) into the PO session by mistake, asking it to "continue as UI/UX". Then locked the AI label and the two refusal sentences in the PO. Next morning ran the prototype, approved the design in the UI/UX session and asked it to pass the open items to the PO: a national helpline in place of the paper's hotline, no vector logo for now, base colours as chosen.
**AI:** the PO did not redirect the owner. It started a side session for the fixes, which committed them on the UI/UX branch but could not push, because the guard lets a PO session push only `role/po`. The owner opened the UI/UX session, which pushed in two minutes and told the Lead. The PO wrote each locked wording as a DEC and opened a docs PR (#26, #27) within a minute or two of each "lock". It flagged that the helpline's official name is narrower than its use here and left the call to the owner. UI/UX checked every locked wording against the DECs word for word, filled in the helpline button, checked the phone links and told the Lead.
**Observer:**
- A side session runs with the sender's role and cannot push another role's branch. Decision for the kit: hand the work over with a hand-off block (R3-32).
- PR #26 was locked in the PO but approved in the Lead, so the owner switched sessions only to say yes.
- Both sessions needed a compact after about an hour of active work.

## 7. G3 approval (Lead)

**Owner:** asked for a short list of what was left before G3. Revisited the article sync: one script with an initial and an incremental mode, batches of 500, the CMS never hard-deletes, only recent articles. Asked whether search needs the AI model at all, and chose one main article plus two related ones per answer. When the Lead asked whether to cut a story or move the date, answered "AI codes very fast": keep the date, one Dev, no cut. Then approved G3.
**AI:** listed the G3 items as confirm, risks, open but not blocking, and already locked. Explained full-text search against embeddings, then updated the sync ADR, the SRS and the sync task. Recorded the one-Dev decision with a daily check and a warning date. On approval it set the five ADRs to Accepted and the SRS to approved, merged the G3 documents (#23) and the design (#25), built the design image, tagged `design-v1`, closed the stack and design issues and moved the stage to Delivery. It then created the Dev1 and Test worktrees with their secrets, posted hand-offs on #12 and #21 and gave the owner one prompt per new session.
**Observer:**
- From "approve" to the tag took about three minutes. The first merge failed on a short commit SHA and worked with the full one.
- This time the Lead proposed the Dev and Test sessions itself, right after G3 (R3-15).
- There was no **For you** block before the approval; the owner's own tasks (add the AI key, open two sessions) were spread through the reply (R3-19).
- The Lead's recaps and closing questions stayed in English for a Vietnamese-speaking owner (R3-33).

## 8. Estimate in AI time (Lead)

**Owner:** rejected the G3 plan's estimate of 12 developer days against 8 working days, since AI sessions do the work.
**AI:** re-estimated v0.1.0 in AI time with a fixed size per change level: 11 hours of AI work (15.5 with the buffer), about 3 hours of the owner's time, and the client's waits listed apart. Added an "actual AI time" column to the milestone (PR #29, merged after the owner's OK).
**Observer:** the first real tasks took 20 minutes against 30 (#12) and 18 minutes against an hour (#13), review fixes included. Decision for the kit: estimate in AI time from the start, in three parts, and recalibrate from the actual times (R3-34).

## 9. First tasks (Dev1, Test, Lead)

**Owner:** opened "AI Chatbot - Dev1" and "AI Chatbot - Test" and pasted the Lead's prompts: `/build dev #12`, later "do #13: `/build dev #13` then `/build done #13`". Asked Test to start with the eval sets for sensitive and adversarial questions. Approved each merge in the Lead.
**AI:**
- **Dev1, #12 (backend scaffold, L1):** the guard blocked the first write to `backend/`, because the kit's default paths did not fit the Python layout chosen at G3. Dev1 stopped and posted a Blocked hand-off with a proposed ownership file, and the Lead merged one in three minutes. Dev1 then built the scaffold, the schema, the widget shell, Docker and CI. It switched the database settings to separate variables because a generated password can contain `@`, checked a fresh Docker volume and opened PR #32. The Lead's review found three fixes, one of them a test that could drop the schema of any database it pointed at. Dev1 fixed them test first in two minutes. Merged and closed with "AI time 20 min".
- **Dev1, #13 (AI provider layer, L2):** looked up the SDK with `context7`, wrote tests first and added a fake provider for work without a key (PR #34). The review found six fixes, the main one about official-source snippets built from pages the filter had dropped. Dev1 wrote 13 failing tests, then the fixes, and 69 tests passed. Merged in 18 minutes.
- **Test, #21:** wrote 30 adversarial and 34 sensitive cases and a harness that measures answer time, p95 and the scores with the standard library only. The guard blocked `eval/` as well; Test parked the files in its own folder, asked the Lead and moved them once allowed. It asked the Lead for two fields the API must return before two of the metrics can be measured.
**Observer:**
- Both sessions stopped at a guard block and asked the Lead; neither tried to get around it. The ownership paths should be set when the stack is chosen at G3, before any Dev starts (R3-35).
- The guard read `2>` in a `2>&1` redirect as a branch name and refused a push three times (R3-36). The secret check flagged ordinary code that reads a password from an environment variable, and Dev1 renamed the variables to get past it (R3-37).
- The AI key was in the main checkout's `.env` and missing from the Dev1 worktree, so the live tests were skipped until the owner asked how to copy it (R3-38).
- Between tasks the sessions waited for the owner to paste the next prompt; every hand-off ran through the owner.
- Each review found real bugs, and the fixes took minutes.

## 10. Free AI key limits (Dev1, Lead)

**Owner:** asked whether the free key was unusable.
**AI:** Dev1's live check found that the default model hung or returned errors while streaming, and that the web-search tool is not available on the free key. It compared streaming across pinned models and proposed one that works. The Lead accepted the model as a technical call and offered three options for official sources: a paid key, a programmable search service, or the free key for the demo. The owner kept the free key, and the paid key became a decision issue for v1.0.0.
**Observer:** the free-tier risk was listed at G3, but only a live call showed which features it blocks. A short live check of each outside service belongs in G3 (R3-39).

## Where it stands

Two of the ten v0.1.0 tasks are merged (#12, #13). The sync task (#14) and the eval work (#21) are in progress, and `/release demo` has not run yet. The walkthrough continues with the rest of the build, the demo release and the client's acceptance.
