#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// AI Delivery Playbook by Hai Nguyen (github.com/liquizzz/ai-delivery-playbook)
// Change the project's level of process, up or down:  node scripts/set-level.mjs <starter|lite|full>
// Run it in the main checkout or a role worktree. Up: creates the branches and worktrees the level needs.
// Down: deletes nothing; it lists the sessions you no longer need. Both update .claude/project.json,
// the "Level:" line in CLAUDE.md and START-HERE.md in the current checkout; commit those as usual.
// It never pushes.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { LEVELS, LEVEL_ORDER, mainCheckout, parseLevel, readProject, renderStartHere, setClaudeLevel, worktreePath, writeProject } from "./project-level.mjs";

const level = parseLevel(process.argv[2]);
if (!level) {
  console.error("Usage: node scripts/set-level.mjs <starter|lite|full>");
  process.exit(1);
}

const git = (args, cwd) => execFileSync("git", args, { cwd, stdio: ["ignore", "pipe", "pipe"] }).toString().trim();
const has = (args, cwd) => {
  try {
    git(args, cwd);
    return true;
  } catch {
    return false;
  }
};

const here = git(["rev-parse", "--show-toplevel"]);
const root = mainCheckout(here);
const project = readProject(here) || { name: path.basename(root), level: null, repo: null };
const from = project.level;
if (from === level) {
  console.log(`Already at level ${LEVELS[level].title}. Nothing to do.`);
  process.exit(0);
}

const done = [];
// Branches the level needs (staging starts from main: it holds what is about to be released)
for (const b of LEVELS[level].branches) {
  if (!has(["show-ref", "--verify", "--quiet", `refs/heads/${b}`], root)) {
    git(["branch", b, b === "staging" ? "main" : "HEAD"], root);
    done.push(`created branch ${b} (push it: git push -u origin ${b})`);
  }
}
// Worktrees the level needs
for (const role of LEVELS[level].worktrees) {
  if (fs.existsSync(worktreePath(root, role))) continue;
  execFileSync("node", [path.join(root, "scripts", "new-role-worktree.mjs"), role], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
  done.push(`created worktree ${role}: ${worktreePath(root, role)}`);
}
// Worktrees the level no longer uses: kept, only listed (the full process can use every role)
const unused = level === "full" ? [] : LEVEL_ORDER.flatMap((l) => LEVELS[l].worktrees).concat(["dev2", "test", "uiux", "devops"])
  .filter((r, i, all) => all.indexOf(r) === i && !LEVELS[level].worktrees.includes(r) && fs.existsSync(worktreePath(root, r)));

project.level = level;
writeProject(here, project);
const claude = setClaudeLevel(here, level);
const start = renderStartHere(here, project, root);
done.push(`updated .claude/project.json${claude ? ", CLAUDE.md" : ""}${start ? ", START-HERE.md" : ""}`);

const up = !from || LEVEL_ORDER.indexOf(level) > LEVEL_ORDER.indexOf(from);
console.log(`Level: ${from ? LEVELS[from].title : "(not set)"} → ${LEVELS[level].title}\n  ${done.join("\n  ")}`);
if (!claude) console.warn('Warning: CLAUDE.md has no "- Level:" line; add one by hand.');
if (unused.length) {
  console.log(`\nNo longer used at this level: ${unused.join(", ")}. Close those sessions; their branches and worktrees are kept.`);
  console.log(`Remove a worktree later with: git worktree remove "${worktreePath(root, unused[0])}"`);
}
if (level !== "full" && has(["show-ref", "--verify", "--quiet", "refs/heads/staging"], root)) {
  console.log("The staging branch is kept but no longer used: releases now go from dev to main.");
}
console.log(`\nNext: commit these changes on your branch and merge them as usual.${up
  ? ` Then tell the Lead: "We moved to ${LEVELS[level].title}. Draft what this level still lacks." and open a session in each new worktree.`
  : " Every document and all history stay as they are."}`);
