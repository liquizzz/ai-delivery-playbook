# Chapter 0: Introduction

**Purpose:** build a working product or demo with Claude Code quickly, without skipping a step, and with every step recorded so it can be fixed or changed later.

## Who this book is for

This book is for people with some technical background who deliver software, most of all freelancers and team leads who build projects for clients. You direct the Claude Code sessions the way you would direct a small team, and every decision a client may ask about is written down. You can read code, use a terminal, and you know what git and GitHub are. You decide what to build and approve the results; Claude Code sessions do the planning documents, code, tests and releases.

**What you need to know:** run a command in a terminal; what a git branch and a commit are; how to open a GitHub repo and read an issue or a pull request; how to start and stop containers with Docker. Everything else (worktrees, hooks, pipelines) is set up and run by Claude.

| Your experience | What this book gives you |
|---|---|
| No programming, git or terminal yet | A map of the work, but learn the basics first; the book does not teach them |
| You can run a project, use git and read an error | A framework to build a small working product or MVP |
| You are an experienced developer | A standard way to hand work to AI and keep it under control |
| You do not know where or how you will deploy | Outside the scope of this book: decide your hosting first |

## What this book does not do

- It does not teach programming. It teaches how to direct Claude Code to build, test and release software.
- It does not replace your judgement. Several AI roles do not make an independent check: if the PO misunderstands you, the Lead, Dev and Test can follow the same mistake. The process makes misunderstandings visible early (every role writes down what it understood), and you try the product yourself before each release ([chapter 5](05-releases.md)).
- It does not guarantee a correct, secure or stable product if gates, tests or your acceptance are skipped.
- It does not choose or run your servers. Everything runs in Docker and each release is a versioned image; where it runs in production is your decision and your setup.
- It does not run by itself. You open the sessions; they pick up work from issues ([chapter 2](02-the-team.md#5-how-automatic-it-is)).

## Quick start: from idea to demo

Lite ([chapter 8](08-lite-mode.md)) is the starting level: three sessions, PO, Lead and Dev1, that you direct like a small team. You run one command, then each step is one slash command the kit installs; Claude asks what it needs, then does the whole step. When work moves to another session, the report ends with the session to open and a prompt in a box you copy with one click. The project gets the same steps in its own `START-HERE.md` ([How to run](../../HOW-TO-RUN.md)).

| # | Session | Type | You get |
|---|---|---|---|
| 1 | Terminal, then Lead | Run `node <path>/kit/init.mjs`, open a session in the `lead` worktree and type `/setup` | Repo, kit, branches, the gate issues, and the PO's and Dev1's folders ([ch. 1](01-setup.md)) |
| 2 | PO | `/brief <idea>`, then `/brief` again | The proposal (G1), then the PRD and stories (G2) ([ch. 3](03-foundation.md)) |
| 3 | Lead | `/brief` | A design you approve, then the stack, the SRS and the v0.1.0 tasks (G3) ([ch. 3](03-foundation.md)) |
| 4 | Dev1 | `/build dev #<n>` while you look, `/build done #<n>` per finished task | Code you can try at once; then tests at each task's level and a PR the Lead merges ([ch. 4](04-delivery-loop.md)) |
| 5 | Lead | `/release` | Scenarios you try, then tagged v0.1.0 and its Docker image ([ch. 5](05-releases.md)) |
| 6 | Terminal | The commands in the "Run the release in Docker" step of `START-HERE.md` | v0.1.0 running in Docker on your machine |
| 7 | PO, then Dev1 | Prove the loop: close the sessions, open new ones, `/change <one fix>` | The fix as CR, task and v0.1.1, picked up from the record alone |

If the new sessions in step 7 pick up the fix without you explaining anything, keep building. Move to Full when money, security or personal data comes in, or when a client signs off each release.

## The model

```mermaid
flowchart LR
  O(["Owner<br/>(you)"]) <--> PO["PO session"]
  PO --> Lead["Lead session"]
  Lead --> Dev["Dev session"]
  Lead -.-> Test["Test session"]
  Lead -.-> DevOps["DevOps session"]
  PO -.-> UX["UI/UX session"]
```

Solid lines are the three sessions most projects run (Lite). Dotted ones join at Full, only when there is work for them.

You are the owner. You talk mostly to the PO, decide at a few gates and approve every release. Each role is a separate Claude Code session with its own git worktree and role file. The work is written down in GitHub issues, repo documents and git, so a skipped step shows up, and any change can be traced and fixed later.

## Principles

1. You decide; AI drafts and builds.
2. Every phase ends at a gate that only you pass.
3. Every change is a CR and updates the always-current SRS.
4. Write each decision down as soon as it is made.
5. Requirements and spec are merged before any code for them starts.
6. Test what the change level requires, no more and no less.
7. Spend tokens only where they add value ([chapter 9](09-token-budget.md)).

## The life cycle

```mermaid
flowchart LR
  subgraph F["Foundation (once)"]
    P1["1 Planning"] --> P2["2 Requirements"] --> P3["3 Design"]
  end
  subgraph L["Delivery loop (every milestone)"]
    P4["4 Implementation"] --> P5["5 Testing"] --> P6["6 Release"]
  end
  P3 --> P4
  P6 -->|next milestone| P4
  P6 --> P7["7 Maintenance"]
  P7 -->|"CR, hotfix"| P4
```

The full list of steps, in order, with a check for each: [Appendix D: Process checklist](appendix-d-checklist.md).

## Choose the level of process

Pick the level by what is at stake: a three-day project that handles money still needs Full. Most projects run on Lite.

| Level | Sessions | Use when |
|---|---|---|
| [Lite](08-lite-mode.md), the starting level | Three: PO, Lead, Dev | Any client project or product other people use |
| Full | PO, Lead, Dev, and Test, UI/UX or DevOps when there is work for them | A client, money, security or personal data, even for a short project |
| No process needed | | A one-off script or a spike you will throw away |

There is no single-session level: one session playing every role runs slower than three sessions working side by side, and it hides the hand-offs you need to see. One Dev session is the default at every level. Add a second (`dev2`) only if you already split and manage work across developers; five or more sessions are hard for one owner to follow.

## How each task is written in this book

> **What it does:** why you would do it.
>
> **Ask:** the session to talk to and a prompt to copy.
>
> **Claude asks you:** the topics the session will ask about before it starts, one round at a time.
>
> **Claude does:** what the session then does on its own, in full.
>
> **You check:** what you read or decide.
>
> **Claude asks before:** actions that open an approval prompt for you.

Every session follows "the owner leads; Claude keeps the process" from the kit's `CLAUDE.md`. Each step shows a short guide of what it needs from you, and you answer in your own words, in any order: start from a product you want to copy or from your constraints if that is how you think. Claude asks only about what is missing, suggests ideas only when you say "suggest", and before you lock shows a checklist of what you settled and what is still its assumption. After you say "lock" it asks once whether that is final or you want to review it, then writes. Say "later" for anything you have not decided: it is listed under Open decisions and asked again only when a step needs it. Say "you decide" and Claude settles the rest, listing its calls so you can change them.

> **Token tip** boxes in each chapter show where cost adds up and how to avoid it.

## Chapters

| Chapter | Use it to |
|---|---|
| [1 Setup](01-setup.md) | Start a project and open the first sessions |
| [2 The team](02-the-team.md) | Know which session does what and how work moves |
| [3 Foundation](03-foundation.md) | Get proposal, requirements and design approved |
| [4 The delivery loop](04-delivery-loop.md) | Ask for changes, run the day, test by level |
| [5 Releases](05-releases.md) | Release, deploy, hotfix, roll back |
| [6 Continuity](06-continuity.md) | Restart, compact, trace a change, switch machines |
| [7 Front-end projects](07-frontend-projects.md) | Show design to the client while the product is built |
| [8 Lite mode](08-lite-mode.md) | Run with three sessions; move to Full and back |
| [9 Token budget](09-token-budget.md) | Keep cost under control |
| Appendices | [A Templates](appendix-a-templates.md) · [B Kit](appendix-b-kit.md) · [C FAQ](appendix-c-faq.md) · [D Process checklist](appendix-d-checklist.md) · [E Standards map](appendix-e-standards.md) |

## Words

| Term | Meaning |
|---|---|
| Owner | You: the human who decides scope, priorities and releases |
| Session | One Claude Code desktop conversation playing one role (PO, Lead, Dev, Test, UI/UX, DevOps) |
| Worktree | A separate folder of the same git repo, one per role, so sessions never edit the same files |
| Branch | A line of work in git. `role/<role>` per role; `dev` (integration) → `staging` (release candidate) → `main` (released) → `production` (live) |
| Issue | A GitHub item that tracks one piece of work: a CR, a task, a defect or a design round |
| Label | A tag on an issue, e.g. `type:feature`, `L2`, `sev:high`; labels drive the version number and the testing |
| PR (pull request) | A request to merge a branch into another, e.g. `role/dev1` → `dev`. It shows the code changes, runs the checks (CI) and is where the Lead reviews. Every change reaches `dev` through a PR that says `Closes #n` |
| CI | Automatic checks that run on every PR: lint, type check, tests, build |
| Merge | Applying a reviewed PR to the target branch; only the Lead merges |
| CR (change request) | A GitHub issue describing one business change (feature, change or fix), approved before any work starts |
| SRS | Software Requirements Specification: the always-current description of what the system does, with numbered requirements (`FR-xxx`, `NFR-xxx`) and a revision history |
| Spec | The technical detail of one CR: behaviour, contracts, data, tasks |
| DEC / ADR | A recorded business / technical decision, with the options that were rejected and why |
| Milestone | The next release: a few CRs, shipped within days |
| Change level | How deep a task changes the system; it decides how much testing is required: |
| L0 Display | Only look, text or layout; no data or logic. *Button colour, typo, spacing, anything in `design/`.* Test: build and a quick look |
| L1 Setting | A default, name, configuration value or message; the logic stays the same. *Page size 10 → 20, a new label text.* Test: the changed spot |
| L2 Module logic | New or changed business logic inside one module. *A new filter, a new validation rule.* Test: that module's scenarios |
| L3 Core | Shared code, data structure, login and permissions, money, security, personal data, deleting data, or several modules at once. *A schema change, position sizing, a new role.* Test: core scenarios, related modules and part of the regression |
| Regression | Re-running the important test scenarios of the whole product, on `staging`, before a release |
| Version (SemVer) | `MAJOR.MINOR.PATCH`, e.g. `v1.4.0`, computed from the issue labels |
| Tag | A fixed name for one version in git; every release on `main` has one |
| Docker image | A packaged, runnable copy of one part of the product (`app`, `design`), built per folder and tagged with the version, e.g. `app:v1.4.0` |
| Registry | Where the images are stored; the kit uses GitHub's (`ghcr.io`) |
| Gate | A checklist you pass at the end of a phase (G1-G6); `/gate` checks it first |
| Hotfix / Rollback | An urgent fix to production / putting the previous version back live |
| Compact | Shrinking a session's context (`/compact`) so it stays fast and cheap |
| Token | The unit Claude usage is measured and paid in |
