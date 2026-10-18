# How to run

From nothing to a project you can work on, in about ten minutes. You do not need to read the book first: the project you create gets its own `START-HERE.md`, with every next step as a prompt to paste.

Steps 0 to 2 happen in a terminal. You need a Claude Code session only from step 3.

## 0. Once per machine

Install the Claude Code desktop app, Git, Node.js 20+, Docker (and start it) and the GitHub CLI. Then sign in to GitHub and allow the CLI to create boards:

```bash
gh auth login
```

```bash
gh auth refresh -s project
```

In any Claude Code session, install the five plugins listed in [chapter 1](docs/book/01-setup.md#you-do-this-yourself-once), then run `/reload-plugins`.

## 1. Clone the playbook

Open a terminal: PowerShell or Terminal on your computer, or the Terminal panel in Claude Code. The panel opens in your home folder, so go first to the folder where your projects live (create it if needed):

```bash
cd E:\Projects
```

```bash
git clone https://github.com/liquizzz/ai-delivery-playbook.git
```

## 2. Create your project

In the same terminal and folder:

```bash
node ai-delivery-playbook/kit/init.mjs
```

It asks seven questions, each with a one-line hint. Press Enter to take the suggestion in brackets.

| # | Question | Suggestion | Note |
|---|---|---|---|
| 1 | Project name | | Any name, for example "Tiny Todo" |
| 2 | Where to create the project | `./tiny-todo` | A new folder; init creates it |
| 3 | Level | `1` (starter) | Starter: one session, for a first demo. Lite: PO, Lead, Dev. Full: all six roles. Change it any time |
| 4 | Working language | `English` | The sessions talk to you in it; you also choose the language of the documents |
| 5 | Separate design prototype | `no` | Yes only if a client reviews a design before the app is built |
| 6 | One-line description | | Optional; Claude asks for the rest later |
| 7 | GitHub repo | `private`, as `<you>/tiny-todo` | `none` to connect later |

Then it installs the kit, creates the branches and the role worktrees for your level, creates and pushes the GitHub repo with its labels and kanban board, and writes `START-HERE.md`.

Read the "Please check" lines at the end of its report. On a new repo, open its Actions tab on GitHub once: if it shows **Enable Actions on this repository**, click it, or CI and the Docker images never run.

## 3. Follow START-HERE.md

Open `START-HERE.md` in your new project folder. Its first step tells you which folder to open in Claude Code (a worktree next to the project, such as `tiny-todo-wt\lead`) and the prompt to paste. Each later step names the session, the prompt, what Claude asks you, and what you get.

In Starter mode it goes: setup, brief (your one approval before code), build, release `v0.1.0` after you try it yourself, then run it in Docker.

When you want to know why a step works the way it does, the [book](README.md#the-book) has a chapter for it.
