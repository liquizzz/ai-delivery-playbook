#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// AI Delivery Playbook by Hai Nguyen (github.com/liquizzz/ai-delivery-playbook)
//
// Set up a project for the AI Delivery Playbook in one command.
//   node <playbook>/kit/init.mjs <project folder> [--force]
//
// It creates the folder and a git repo if needed, copies the kit (CLAUDE.md, .claude/, .github/, scripts/,
// /gate command, secret-check hook, docker-compose.yml and docker/), creates the docs folders and CHANGELOG.md, updates .gitignore and
// creates the dev and staging branches. Existing files are kept unless --force is given.
// It never pushes, never touches GitHub settings and never writes secrets.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const force = args.includes("--force");
const target = args.find((a) => !a.startsWith("--"));
if (!target) {
  console.error("Usage: node <playbook>/kit/init.mjs <project folder> [--force]");
  process.exit(1);
}

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
if (!version("gh --version")) console.warn("Warning: the GitHub CLI (gh) is not installed; you need it to connect GitHub (chapter 1).\n");

const kit = path.dirname(fileURLToPath(import.meta.url));
const playbook = path.dirname(kit);
const dest = path.resolve(target);
const created = [];
const kept = [];

const sh = (cmd) => execSync(cmd, { cwd: dest, stdio: ["ignore", "pipe", "pipe"] }).toString().trim();
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

// 1. Folder and git repo
fs.mkdirSync(dest, { recursive: true });
if (!ok("git rev-parse --is-inside-work-tree")) {
  sh("git init -b main");
  created.push("(git repo, branch main)");
}

// 2. Kit files
copyFile(path.join(kit, "CLAUDE.md"), "CLAUDE.md");
copyDir(path.join(kit, ".claude", "roles"), path.join(".claude", "roles"));
copyDir(path.join(kit, ".claude", "hooks"), path.join(".claude", "hooks"));
copyFile(path.join(kit, ".claude", "settings.json"), path.join(".claude", "settings.json"));
copyFile(path.join(kit, "commands", "gate.md"), path.join(".claude", "commands", "gate.md"));
copyDir(path.join(kit, ".github"), ".github");
copyDir(path.join(kit, "scripts"), "scripts");
copyFile(path.join(playbook, "templates", "changelog.md"), "CHANGELOG.md");
copyFile(path.join(kit, "docker", "docker-compose.yml"), "docker-compose.yml");
copyFile(path.join(kit, "docker", "design.Dockerfile"), path.join("docker", "design.Dockerfile"));
copyFile(path.join(kit, "docker", "app.Dockerfile"), path.join("docker", "app.Dockerfile"));
copyFile(path.join(kit, "docker", ".dockerignore"), ".dockerignore");

// 3. Docs folders
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

// 4. .gitignore
const ignorePath = path.join(dest, ".gitignore");
const ignore = fs.existsSync(ignorePath) ? fs.readFileSync(ignorePath, "utf8") : "";
const needed = [".env", ".env.*", "!.env.example", ".claude/role", ".claude/settings.local.json", "node_modules/", "dist/"];
const missing = needed.filter((l) => !ignore.split(/\r?\n/).includes(l));
if (missing.length) {
  fs.writeFileSync(ignorePath, `${ignore}${ignore && !ignore.endsWith("\n") ? "\n" : ""}# AI Delivery Playbook\n${missing.join("\n")}\n`);
  created.push(`.gitignore (+${missing.length} lines)`);
}

// 5. Secret-check git hook
const hookOut = path.join(dest, ".git", "hooks", "pre-commit");
if (!fs.existsSync(hookOut) || force) {
  fs.copyFileSync(path.join(kit, "hooks", "pre-commit"), hookOut);
  try { fs.chmodSync(hookOut, 0o755); } catch {}
  created.push(".git/hooks/pre-commit");
} else kept.push(".git/hooks/pre-commit");

// 6. First commit and branches
if (!ok("git rev-parse --verify HEAD")) {
  sh("git add -A");
  sh('git commit -m "Set up AI Delivery Playbook kit"');
  created.push("(first commit)");
}
for (const b of ["dev", "staging"]) {
  if (!ok(`git show-ref --verify --quiet refs/heads/${b}`)) {
    sh(`git branch ${b}`);
    created.push(`(branch ${b})`);
  }
}

// 7. Report
console.log(`AI Delivery Playbook kit set up in ${dest}\n`);
console.log(`Created (${created.length}):\n  ${created.join("\n  ")}`);
if (kept.length) console.log(`\nKept existing (${kept.length}, use --force to overwrite):\n  ${kept.join("\n  ")}`);
console.log(`
Next steps (chapter 1 of the book):
  1. Fill in CLAUDE.md (product, stack, commands); adjust .claude/ownership.json if your folders differ;
     adapt docker-compose.yml and docker/*.Dockerfile to the stack (replace <owner> and <project>).
  2. node .claude/hooks/role-guard.test.cjs        (checks the guardrails)
  3. Commit, create the GitHub repo, push main, dev and staging.
  4. gh auth refresh -s project ; node scripts/setup-labels.mjs ; create the board and the first milestone.
  5. node scripts/new-role-worktree.mjs po   (then lead, dev1 …) and open one Claude Code session per worktree.`);
