# Setting up a project

One-time setup for a new project that follows the AI Delivery Playbook. Steps marked **owner** are done by the human.

## 1. Repo and kit
```bash
# in the new project's main checkout (e.g. <projects>/<project>/)
P=<path to ai-delivery-playbook>
cp $P/kit/CLAUDE.md ./CLAUDE.md
mkdir -p .claude && cp -r $P/kit/.claude/roles $P/kit/.claude/hooks $P/kit/.claude/settings.json .claude/
cp -r $P/kit/.github ./.github
mkdir -p scripts && cp $P/kit/scripts/*.mjs scripts/
mkdir -p .claude/commands && cp $P/kit/commands/gate.md .claude/commands/
cp $P/kit/hooks/pre-commit .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
cp $P/templates/changelog.md CHANGELOG.md
mkdir -p docs/product/{cr,dec,stories,milestones} docs/tech/{spec,adr,test-cases,test-reports,ops} docs/reports docs/releases
```
Add to `.gitignore`:
```
.env
.env.*
!.env.example
.claude/role
.claude/settings.local.json
node_modules/
```
Then fill in `CLAUDE.md` (product, stack, commands) and adjust `.claude/ownership.json` if the project's folders differ from the defaults in `role-guard.cjs` (e.g. `{"dev": ["src/", "tests/unit/", "CHANGELOG.md"]}`).

Check the hook: `node .claude/hooks/role-guard.test.cjs`.

## 2. Branches
```bash
git checkout -b dev && git push -u origin dev
git branch staging dev && git push -u origin staging
# main exists; production is created at go-live (1.0.0) from the first live tag:
#   git branch production v1.0.0 && git push -u origin production
```

## 3. Role worktrees
From the main checkout, one per role you open:
```bash
node scripts/new-role-worktree.mjs po
node scripts/new-role-worktree.mjs lead
node scripts/new-role-worktree.mjs dev1
```
Each lands in `<projects>/<project>-wt/<role>/` with `.claude/role` and `.env.local` (port). Open a Claude Code session in each folder, titled `<Project> - <Role>`, and start with "Read CLAUDE.md and continue as <role>."

## 4. GitHub
1. **Owner:** `gh auth login`, then `gh auth refresh -s project` (lets sessions use GitHub Projects).
2. Labels: `node scripts/setup-labels.mjs`.
3. **Board:** create a GitHub Project (Board layout) linked to the repo.
   - Status columns: Backlog · Approved · Ready · In progress · In review · Testing · Done.
   - Custom fields: **Role** (single select: PO, Lead, Dev1, Dev2, Test, UI/UX, DevOps) · **Module** (text) · **Level** (L0, L1, L2, L3) · **Priority** (High, Medium, Low).
   - Workflows: item closed → Done; PR merged → Done.
4. **Milestones:** create the first one (`v0.1.0`) and the next one.
5. **Sub-issues:** tasks are added as sub-issues of their CR (issue page → "Create sub-issue", or `gh` / API).

## 5. Pipelines
1. **Owner:** create the hosting projects (e.g. Cloudflare Pages `<project>-design`, `<project>-staging`, `<project>`) and protect the client links (Cloudflare Access).
2. **Owner:** add secrets in GitHub (Settings → Secrets and variables → Actions): `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, others listed in `docs/tech/ops/`.
3. Replace `<project>` in `.github/workflows/*.yml`; adapt build commands.
4. **Owner:** disable `deploy-production` in the Actions tab until go-live.

## 6. Extra review (optional)
Install the Codex plugin once per machine (owner, in Claude Code):
```
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```
Needs Node 18.18+ and a ChatGPT login (usage counts against the owner's Codex limits). The Lead only proposes a review; the owner asks for it.

## 7. Plan limits (GitHub Free)
Branch protection is not available for private repos on GitHub Free, so the rules are enforced on the machine by `role-guard` and the owner's approval prompts. Actions minutes on Free are limited; keep CI cached.
