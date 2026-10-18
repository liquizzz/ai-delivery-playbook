# How to run

Three steps from nothing to a project you can work on. You do not need to read the book first: the project you create has its own `START-HERE.md` with every next step as a prompt to paste.

## 0. Once per machine

Install the Claude Code desktop app, Git, Node.js 20+, Docker (running) and the GitHub CLI. Then, in a terminal:

```bash
gh auth login
```

```bash
gh auth refresh -s project
```

In any Claude Code session, install the five plugins listed in [chapter 1](docs/book/01-setup.md#you-do-this-yourself-once) and run `/reload-plugins`.

## 1. Clone the playbook

Clone it next to where your projects live, for example in `~/Projects` or `E:\Projects`:

```bash
git clone https://github.com/liquizzz/ai-delivery-playbook.git
```

## 2. Create your project

From the same folder, run:

```bash
node ai-delivery-playbook/kit/init.mjs
```

It asks five questions. Press Enter to take the suggestion:

| Question | Suggestion | Note |
|---|---|---|
| 1. Project name | | Any name, for example "Tiny Todo" |
| 2. Folder | `./tiny-todo` | Made from the name |
| 3. Level | `starter` | `starter`: one session, for a first demo. `lite`: PO, Lead, Dev. `full`: all six roles. Change it any time with `node scripts/set-level.mjs <level>` |
| 4. One-line description | | Optional; Claude fills in the rest later |
| 5. GitHub repo | `private`, as `<you>/tiny-todo` | `none` to skip; connect later |

It then installs the kit, creates the branches and the role worktrees for your level, creates and pushes the GitHub repo if you said so, and writes `START-HERE.md`.

## 3. Follow START-HERE.md

Open `START-HERE.md` in your new project. Each step tells you which session to open, the prompt to paste, what Claude will ask, and what you get. In Starter mode it goes: setup → proposal → requirements → SRS and first milestone → build → release `v0.1.0` → run it in Docker.

When you want to know why a step works the way it does, the [book](README.md#the-book) has a chapter for it.
