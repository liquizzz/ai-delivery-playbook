// SPDX-License-Identifier: MIT
// AI Delivery Playbook by Hai Nguyen (github.com/liquizzz/ai-delivery-playbook)
// Shared by init.mjs and set-level.mjs: what each level needs, the project record in .claude/project.json,
// the "Level:" line in CLAUDE.md and START-HERE.md rendered from .claude/start-here/<level>.md.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const LEVELS = {
  starter: {
    title: "Starter",
    branches: ["dev"],
    worktrees: ["lead"],
    help: "One session plays PO, Lead and Dev. A first demo or a throw-away POC that only you use.",
    line: "Starter (one session plays PO, Lead and Dev; book chapter 8)",
  },
  lite: {
    title: "Lite",
    branches: ["dev"],
    worktrees: ["po", "lead", "dev1"],
    help: "PO, Lead and one Dev. Most projects: other people use it (an internal tool, a small product).",
    line: "Lite (PO, Lead and Dev1 sessions; book chapter 8)",
  },
  full: {
    title: "Full",
    branches: ["dev", "staging"],
    worktrees: ["po", "lead"],
    help: "PO, Lead, one Dev, plus Test, UI/UX, DevOps when needed. A client, money, security or personal data.",
    line: "Full process (PO and Lead, then Dev, Test, UI/UX and DevOps as needed; book chapter 2)",
  },
};
export const LEVEL_ORDER = ["starter", "lite", "full"];

export function parseLevel(value) {
  const v = String(value || "").trim().toLowerCase();
  if (LEVELS[v]) return v;
  const n = Number(v);
  return Number.isInteger(n) && LEVEL_ORDER[n - 1] ? LEVEL_ORDER[n - 1] : null;
}

export function slugify(name) {
  return String(name).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// The main checkout, even when run from a role worktree.
export function mainCheckout(cwd = process.cwd()) {
  const common = execFileSync("git", ["rev-parse", "--path-format=absolute", "--git-common-dir"], { cwd, stdio: ["ignore", "pipe", "ignore"] })
    .toString().trim();
  return path.dirname(common);
}

export function worktreePath(root, role) {
  return path.join(path.dirname(root), `${path.basename(root)}-wt`, role);
}

export function readProject(dir) {
  const file = path.join(dir, ".claude", "project.json");
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : null;
}

export function writeProject(dir, project) {
  fs.mkdirSync(path.join(dir, ".claude"), { recursive: true });
  fs.writeFileSync(path.join(dir, ".claude", "project.json"), JSON.stringify(project, null, 2) + "\n");
}

// Replace the "- Level:" line of CLAUDE.md. Returns false if the line is missing.
export function setClaudeLevel(dir, level) {
  const file = path.join(dir, "CLAUDE.md");
  if (!fs.existsSync(file)) return false;
  const text = fs.readFileSync(file, "utf8");
  if (!/^- Level: .*$/m.test(text)) return false;
  fs.writeFileSync(file, text.replace(/^- Level: .*$/m, `- Level: ${LEVELS[level].line}. Change it with \`node scripts/set-level.mjs <starter|lite|full>\`.`));
  return true;
}

// Write START-HERE.md from the template of the project's level.
export function renderStartHere(dir, project, root = dir) {
  const template = path.join(dir, ".claude", "start-here", `${project.level}.md`);
  if (!fs.existsSync(template)) return false;
  const [owner, repoName] = project.repo ? project.repo.toLowerCase().split("/") : ["<github-user>", "<repo>"];
  const values = {
    name: project.name,
    repo: project.repo || "(no GitHub repo yet)",
    actions: project.repo ? `https://github.com/${project.repo}/actions` : "your repo's Actions tab on GitHub",
    owner,
    image: `ghcr.io/${owner}/${repoName}-app`,
    main: root,
    po: worktreePath(root, "po"),
    lead: worktreePath(root, "lead"),
    dev1: worktreePath(root, "dev1"),
  };
  const text = fs.readFileSync(template, "utf8").replace(/\{\{(\w+)\}\}/g, (m, k) => (k in values ? values[k] : m));
  fs.writeFileSync(path.join(dir, "START-HERE.md"), text);
  return true;
}
