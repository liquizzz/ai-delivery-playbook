#!/usr/bin/env node
// Create the worktree for one role: <parent>/<repo>-wt/<role> on branch role/<role>.
// Run from the main checkout:  node scripts/new-role-worktree.mjs <role>
// Roles: po, lead, dev1, dev2, test, uiux, devops
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROLES = ["po", "lead", "dev1", "dev2", "test", "uiux", "devops"];
const PORTS = { uiux: 5100, dev1: 5201, dev2: 5202, test: 5300 };

const role = (process.argv[2] || "").toLowerCase();
if (!ROLES.includes(role)) {
  console.error(`Usage: node scripts/new-role-worktree.mjs <${ROLES.join("|")}>`);
  process.exit(1);
}

const sh = (cmd, opts = {}) => execSync(cmd, { stdio: ["ignore", "pipe", "pipe"], ...opts }).toString().trim();
const ok = (cmd) => {
  try {
    sh(cmd);
    return true;
  } catch {
    return false;
  }
};

const root = sh("git rev-parse --show-toplevel");
const branch = `role/${role}`;
const wtDir = path.join(path.dirname(root), `${path.basename(root)}-wt`, role);

if (fs.existsSync(wtDir)) {
  console.error(`Worktree folder already exists: ${wtDir}`);
  process.exit(1);
}

ok("git fetch --quiet origin");
if (!ok(`git show-ref --verify --quiet refs/heads/${branch}`)) {
  if (ok(`git show-ref --verify --quiet refs/remotes/origin/${branch}`)) {
    sh(`git branch --track ${branch} origin/${branch}`);
  } else {
    const base = ok("git show-ref --verify --quiet refs/remotes/origin/dev") ? "origin/dev"
      : ok("git show-ref --verify --quiet refs/heads/dev") ? "dev" : "HEAD";
    sh(`git branch ${branch} ${base}`);
    console.log(`Created ${branch} from ${base}`);
  }
}

fs.mkdirSync(path.dirname(wtDir), { recursive: true });
sh(`git worktree add "${wtDir}" ${branch}`);

fs.mkdirSync(path.join(wtDir, ".claude"), { recursive: true });
fs.writeFileSync(path.join(wtDir, ".claude", "role"), `${role}\n`);

const example = path.join(wtDir, ".env.example");
const local = path.join(wtDir, ".env.local");
if (!fs.existsSync(local)) {
  let env = fs.existsSync(example) ? fs.readFileSync(example, "utf8") : "";
  if (PORTS[role]) {
    env = env.replace(/^PORT=.*\n?/m, "");
    env += `${env && !env.endsWith("\n") ? "\n" : ""}PORT=${PORTS[role]}\n`;
  }
  if (env) fs.writeFileSync(local, env);
}

const gitignore = fs.existsSync(path.join(root, ".gitignore")) ? fs.readFileSync(path.join(root, ".gitignore"), "utf8") : "";
for (const entry of [".claude/role", ".env.local"]) {
  if (!gitignore.includes(entry)) console.warn(`Warning: add "${entry}" to .gitignore`);
}

console.log(`
Worktree ready: ${wtDir}
Branch: ${branch}${PORTS[role] ? ` · local port ${PORTS[role]}` : ""}
Next: open a Claude Code session in that folder, title it "<Project> - ${role}", and start with:
  "Read CLAUDE.md and continue as ${role}."`);
