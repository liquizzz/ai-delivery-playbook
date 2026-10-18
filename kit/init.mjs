#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// AI Delivery Playbook by Hai Nguyen (github.com/liquizzz/ai-delivery-playbook)
//
// Set up a project for the AI Delivery Playbook in one command.
//   node <playbook>/kit/init.mjs                      asks: name, folder, level, language, design, description, GitHub
//   node <playbook>/kit/init.mjs <folder> [options]   asks only what the options leave out
// Options: --name "<name>"  --level starter|lite|full  --language <lang>  --docs-language <lang>  --design yes|no
//          --description "<text>"
//          --github private|public|none  --repo <owner/name>  --yes (no questions, defaults)  --force
//
// It creates the folder and a git repo, copies the kit, fills in the project name, level and description,
// writes START-HERE.md (the owner's steps for that level), creates the branches and role worktrees the level
// needs and, only if you choose it, creates the GitHub repo, pushes the branches and sets up the labels.
// Existing files are kept unless --force is given. It never writes secrets.
import { execFileSync, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";
import { LEVELS, LEVEL_ORDER, parseLevel, renderStartHere, setClaudeLevel, slugify, worktreePath, writeProject } from "./scripts/project-level.mjs";

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : undefined;
};
const force = argv.includes("--force");
const yes = argv.includes("--yes");
const valued = new Set(["--name", "--level", "--language", "--docs-language", "--design", "--description", "--github", "--repo"]);
const target = argv.find((a, i) => !a.startsWith("--") && !valued.has(argv[i - 1]));

// 0. Required tools. Docker is required: every part of the product runs in it.
function version(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim().split("\n")[0];
  } catch {
    return null;
  }
}
const missingTools = [];
const nodeMajor = Number(process.versions.node.split(".")[0]);
if (nodeMajor < 20) missingTools.push(`Node.js 20 or newer (found ${process.versions.node}): https://nodejs.org`);
if (!version("git --version")) missingTools.push("Git: https://git-scm.com/downloads");
const docker = version("docker --version");
if (!docker) missingTools.push("Docker (Docker Desktop on Windows and macOS, Docker Engine on Linux): https://docs.docker.com/get-docker/");
else if (!version("docker compose version")) missingTools.push(`Docker Compose v2 (found ${docker}, but "docker compose" does not work): https://docs.docker.com/compose/install/`);
if (missingTools.length) {
  console.error("Cannot set up the project. Install these first, then run init again:\n  - " + missingTools.join("\n  - "));
  process.exit(1);
}
if (!version("docker info --format {{.ServerVersion}}")) {
  console.warn("Warning: Docker is installed but not running. Start Docker before running the project.\n");
}
const hasGh = Boolean(version("gh --version"));
const ghUser = hasGh ? version("gh api user --jq .login") : null;
if (!hasGh) console.warn("Warning: the GitHub CLI (gh) is not installed; install it to connect GitHub (chapter 1).\n");

const kit = path.dirname(fileURLToPath(import.meta.url));
const playbook = path.dirname(kit);

// 1. Questions. Each has a default; Enter accepts it. --yes or a non-interactive run takes the defaults.
// PLAYBOOK_INIT_INTERACTIVE=1 asks the questions even with piped input (used by the kit's tests).
const interactive = !yes && (process.stdin.isTTY || process.env.PLAYBOOK_INIT_INTERACTIVE === "1");
// Lines are read through an iterator, which buffers them, so piped answers are not lost.
const rl = interactive ? readline.createInterface({ input: process.stdin, terminal: false }) : null;
const lines = rl?.[Symbol.asyncIterator]();
async function ask(question, fallback, check = (v) => v) {
  if (!rl) return check(fallback);
  for (;;) {
    process.stdout.write(`${question}${fallback ? ` [${fallback}]` : ""}: `);
    const next = await lines.next();
    if (next.done) {
      console.error("\nNo more input. Stopped; nothing was changed.");
      process.exit(1);
    }
    if (!process.stdin.isTTY) console.log(next.value);
    const answer = next.value.trim() || fallback || "";
    const value = check(answer);
    if (value !== null && value !== undefined && value !== "") return value;
    console.log("  Please answer this one.");
  }
}

if (interactive) console.log("AI Delivery Playbook: new project. Each question has a suggestion in [brackets]: press Enter to take it.");
// A question with a one-line hint under its title.
const topic = (title, hint) => interactive && console.log(`
${title}
   ${hint}`);

topic("1. Project name", "Any name, for example Tiny Todo. It suggests the folder and the repo name.");
const name = flag("name") || (target && !interactive ? path.basename(path.resolve(target)) : undefined)
  || (await ask("   Name", target ? path.basename(path.resolve(target)) : ""));
if (!name) {
  console.error("Give the project a name: node init.mjs <folder> or --name \"<name>\".");
  process.exit(1);
}
const slug = slugify(name) || "project";
const parent = path.resolve(process.cwd()) === playbook ? path.dirname(playbook) : process.cwd();
if (!target) topic("2. Where to create the project", "A new folder for its code and documents. The role worktrees go next to it, in <folder>-wt.");
const dest = path.resolve(target || (await ask("   Folder", path.join(parent, slug))));

let level = parseLevel(flag("level"));
if (!level) {
  topic("3. Level of process", "How many Claude sessions work on it. Change it any time with: node scripts/set-level.mjs <level>");
  if (interactive) LEVEL_ORDER.forEach((l, i) => console.log(`     ${i + 1}  ${l.padEnd(8)} ${LEVELS[l].help}`));
  level = await ask("   Level (1, 2 or 3)", "1", parseLevel);
}

topic("4. Your working language", "The sessions talk to you in it. For example English or Vietnamese.");
const language = flag("language") || (await ask("   Language", "English"));
let docsLanguage = flag("docs-language") || "English";
if (!flag("docs-language") && !/^english$/i.test(language)) {
  docsLanguage = await ask(`   Documents in English or ${language}`, "English");
}

let design = flag("design");
if (!design) {
  topic("5. Separate design prototype", "yes: a design/ folder and image the client reviews before the app is built (chapter 7). no: Claude designs inside the app.");
  design = await ask("   Design prototype? yes or no", "no", (v) => (/^(y|yes|n|no)$/i.test(v) ? v.toLowerCase()[0] : null));
}
design = /^y/i.test(design);

topic("6. One-line description (optional)", "Who it is for and what it does. Claude asks for the rest later.");
const description = flag("description") ?? (await ask("   Description", "", (v) => v || " ")).trim();

let github = flag("github");
let repo = flag("repo");
if (!github) {
  if (!ghUser) {
    if (interactive) console.log(`
7. GitHub repo: skipped (${hasGh ? "run gh auth login first" : "gh is not installed"}). The Lead connects it later.`);
    github = "none";
  } else {
    topic("7. GitHub repo", "private (only you see it), public, or none to connect later. It pushes the branches and creates the labels.");
    github = await ask("   Create it now? private, public or none", interactive ? "private" : "none",
      (v) => (["private", "public", "none"].includes(v.toLowerCase()) ? v.toLowerCase() : null));
  }
}
if (!["private", "public", "none"].includes(github)) {
  console.error("--github must be private, public or none.");
  process.exit(1);
}
if (github !== "none" && !repo && !ghUser) {
  console.error("Cannot create the GitHub repo: run gh auth login first, or pass --repo <owner/name>.");
  process.exit(1);
}
if (github !== "none" && !repo) repo = await ask("   Repo name", `${ghUser}/${slug}`);
if (github === "none") repo = undefined;

if (interactive) {
  console.log(`
About to set up:
  ${name} in ${dest}
  Level: ${LEVELS[level].title}
  Language: ${language} (documents: ${docsLanguage})
  Design prototype: ${design ? "yes" : "no"}
  GitHub: ${repo ? `${repo} (${github}), branches pushed, labels created` : "none"}`);
  const go = await ask("Go ahead? yes or no", "yes");
  if (!/^y/i.test(go)) {
    console.log("Stopped. Nothing was changed.");
    process.exit(0);
  }
}
rl?.close();

// 2. Set up
const created = [];
const kept = [];
const sh = (cmd) => execSync(cmd, { cwd: dest, stdio: ["ignore", "pipe", "pipe"] }).toString().trim();
const run = (file, args) => execFileSync(file, args, { cwd: dest, stdio: ["ignore", "pipe", "pipe"] }).toString().trim();
const ok = (cmd) => {
  try {
    sh(cmd);
    return true;
  } catch {
    return false;
  }
};

function copyFile(from, to) {
  const out = path.join(dest, to);
  const shown = to.split(path.sep).join("/");
  if (fs.existsSync(out) && !force) return kept.push(shown);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.copyFileSync(from, out);
  created.push(shown);
}

function copyDir(from, to) {
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const rel = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, rel);
    else copyFile(src, rel);
  }
}

// 2a. Folder and git repo
fs.mkdirSync(dest, { recursive: true });
if (!ok("git rev-parse --is-inside-work-tree")) {
  sh("git init -b main");
  created.push("(git repo, branch main)");
}

// 2b. Kit files
copyFile(path.join(kit, "CLAUDE.md"), "CLAUDE.md");
copyDir(path.join(kit, ".claude", "roles"), path.join(".claude", "roles"));
copyDir(path.join(kit, ".claude", "hooks"), path.join(".claude", "hooks"));
copyFile(path.join(kit, ".claude", "settings.json"), path.join(".claude", "settings.json"));
copyFile(path.join(kit, "commands", "gate.md"), path.join(".claude", "commands", "gate.md"));
copyDir(path.join(kit, "start-here"), path.join(".claude", "start-here"));
copyDir(path.join(kit, ".github"), ".github");
if (!design && created.includes(".github/workflows/image-design.yml")) {
  fs.rmSync(path.join(dest, ".github", "workflows", "image-design.yml"));
  created.splice(created.indexOf(".github/workflows/image-design.yml"), 1);
}
copyDir(path.join(kit, "scripts"), "scripts");
copyFile(path.join(playbook, "templates", "changelog.md"), "CHANGELOG.md");
copyDir(path.join(playbook, "templates"), path.join("docs", "templates"));
copyFile(path.join(kit, "docker", "docker-compose.yml"), "docker-compose.yml");
if (design) copyFile(path.join(kit, "docker", "design.Dockerfile"), path.join("docker", "design.Dockerfile"));
copyFile(path.join(kit, "docker", "app.Dockerfile"), path.join("docker", "app.Dockerfile"));
copyFile(path.join(kit, "docker", ".dockerignore"), ".dockerignore");

// 2c. Name, description, level
const fill = (rel, edit) => {
  const file = path.join(dest, rel);
  if (!created.includes(rel)) return;
  fs.writeFileSync(file, edit(fs.readFileSync(file, "utf8")));
};
fill("CLAUDE.md", (t) => t.replace("# <Project name>", `# ${name}`)
  .replace(/^<One paragraph: what the product does.*$/m, (line) => description || line)
  .replace(/^- Language: .*$/m, `- Language: talk to the owner in ${language}; write documents in ${docsLanguage}. Code, commits and identifiers stay in English.`));
setClaudeLevel(dest, level);
const owner = repo ? repo.split("/")[0].toLowerCase() : null;
const project = repo ? repo.split("/")[1].toLowerCase() : slug;
fill("docker-compose.yml", (t) => {
  if (!design) t = t.replace(/ *# design:start[\s\S]*?# design:end\r?\n/, "");
  t = t.replaceAll("<project>", project);
  return owner ? t.replaceAll("<owner>", owner) : t;
});
writeProject(dest, { name, level, repo: repo || null, language, docsLanguage, design });
renderStartHere(dest, { name, level, repo }, dest);
created.push(".claude/project.json", "START-HERE.md");

// 2d. Docs folders
const folders = [
  "docs/product/cr", "docs/product/dec", "docs/product/stories", "docs/product/milestones",
  "docs/tech/spec", "docs/tech/adr", "docs/tech/test-cases", "docs/tech/test-reports", "docs/tech/ops",
  "docs/reports", "docs/releases",
];
for (const f of folders) {
  const dir = path.join(dest, f);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, ".gitkeep"), "");
    created.push(`${f}/`);
  }
}
const log = path.join(dest, "docs", "ai-log.md");
if (!fs.existsSync(log)) {
  fs.writeFileSync(log, "# AI Delivery Log\n\nOne line per task: what AI did, where the human stepped in, how much rework.\n\n| Date | Phase | Task | AI did | Human did | Rework loops | Time |\n|---|---|---|---|---|---|---|\n");
  created.push("docs/ai-log.md");
}
const envExample = path.join(dest, ".env.example");
if (!fs.existsSync(envExample)) {
  fs.writeFileSync(envExample, "# Copy to .env.local (done by new-role-worktree). Real values are filled in by the owner.\nPORT=3000\n");
  created.push(".env.example");
}

// 2e. .gitignore
const ignorePath = path.join(dest, ".gitignore");
const ignore = fs.existsSync(ignorePath) ? fs.readFileSync(ignorePath, "utf8") : "";
const needed = [".env", ".env.*", "!.env.example", ".claude/role", ".claude/settings.local.json", "node_modules/", "dist/"];
const missing = needed.filter((l) => !ignore.split(/\r?\n/).includes(l));
if (missing.length) {
  fs.writeFileSync(ignorePath, `${ignore}${ignore && !ignore.endsWith("\n") ? "\n" : ""}# AI Delivery Playbook\n${missing.join("\n")}\n`);
  created.push(`.gitignore (+${missing.length} lines)`);
}

// 2f. Secret-check git hook
const hookOut = path.join(dest, ".git", "hooks", "pre-commit");
if (!fs.existsSync(hookOut) || force) {
  fs.copyFileSync(path.join(kit, "hooks", "pre-commit"), hookOut);
  try { fs.chmodSync(hookOut, 0o755); } catch {}
  created.push(".git/hooks/pre-commit");
} else kept.push(".git/hooks/pre-commit");

// 2g. First commit and the level's branches. An existing repo is not committed for you.
const fresh = !ok("git rev-parse --verify HEAD");
if (fresh) {
  sh("git add -A");
  run("git", ["commit", "-m", `Set up AI Delivery Playbook kit (${LEVELS[level].title})`]);
  created.push("(first commit)");
}
for (const b of LEVELS[level].branches) {
  if (!ok(`git show-ref --verify --quiet refs/heads/${b}`)) {
    sh(`git branch ${b}`);
    created.push(`(branch ${b})`);
  }
}

// 2h. GitHub, only if chosen
const warnings = [];
if (repo) {
  try {
    if (!ok("git remote get-url origin")) {
      run("gh", ["repo", "create", repo, `--${github}`, "--source", ".", "--remote", "origin"]);
      created.push(`(GitHub repo ${repo}, ${github})`);
    }
    run("git", ["push", "-u", "origin", "main", ...LEVELS[level].branches]);
    created.push(`(pushed main, ${LEVELS[level].branches.join(", ")})`);
    run("node", [path.join("scripts", "setup-labels.mjs")]);
    created.push("(GitHub labels)");
  } catch (e) {
    warnings.push(`GitHub step failed: ${String(e.stderr || e.message).trim().split("\n")[0]}. Finish it later with the Lead: "Connect this project to GitHub."`);
  }
}

// 2i. Role worktrees for the level (they start from the committed kit, so only in a fresh repo)
if (!fresh) warnings.push(`Existing repo: commit the kit files, then run node scripts/set-level.mjs ${level} to create the worktrees.`);
for (const role of fresh ? LEVELS[level].worktrees : []) {
  if (fs.existsSync(worktreePath(dest, role))) {
    kept.push(`worktree ${role}`);
    continue;
  }
  try {
    run("node", [path.join("scripts", "new-role-worktree.mjs"), role]);
    created.push(`(worktree ${role}: ${worktreePath(dest, role)})`);
  } catch (e) {
    warnings.push(`Worktree ${role} failed: ${String(e.stderr || e.message).trim().split("\n")[0]}`);
  }
}

// 3. Report
const lead = worktreePath(dest, "lead");
console.log(`\n${name} is set up in ${dest} (level ${LEVELS[level].title}).\n`);
console.log(`Created (${created.length}):\n  ${created.join("\n  ")}`);
if (kept.length) console.log(`\nKept existing (${kept.length}, use --force to overwrite):\n  ${kept.join("\n  ")}`);
if (warnings.length) console.log(`\nWarnings:\n  ${warnings.join("\n  ")}`);
console.log(`
Next: open ${path.join(dest, "START-HERE.md")} and follow it step by step.
Step 1 is: open Claude Code desktop in ${lead} and paste the prompt shown there.`);
