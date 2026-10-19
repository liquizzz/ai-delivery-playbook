#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// AI Delivery Playbook by Hai Nguyen (github.com/liquizzz/ai-delivery-playbook)
//
// SessionStart hook: when a session starts, resumes, is cleared or compacted, it reminds Claude of its role,
// the skills it must use and how to ask the owner, so the owner never has to type it.
// It reads .claude/role and the role file's Skills line. It never blocks: any error prints nothing.
const fs = require("fs");
const path = require("path");

function findRoot(start) {
  let dir = path.resolve(start);
  for (;;) {
    if (fs.existsSync(path.join(dir, ".claude", "role")) || fs.existsSync(path.join(dir, "CLAUDE.md"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

// The role file's skills: a "**Skills** …" line, or the line after a "## Skills" heading.
function roleSkills(file) {
  if (!fs.existsSync(file)) return "";
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  const bold = lines.find((l) => l.startsWith("**Skills**"));
  if (bold) return bold.replace(/^\*\*Skills\*\*\s*/, "");
  const i = lines.findIndex((l) => /^##\s+Skills\s*$/.test(l));
  return i >= 0 ? (lines[i + 1] || "").trim() : "";
}

function reminder(cwd) {
  const root = findRoot(cwd);
  if (!root) return "";
  const roleFile = path.join(root, ".claude", "role");
  if (!fs.existsSync(roleFile)) {
    return "AI Delivery Playbook: this folder has no role (.claude/role). If this is the project's main checkout, tell the owner to open the session in a role worktree as START-HERE.md says, and do not start project work here.";
  }
  const role = fs.readFileSync(roleFile, "utf8").trim().toLowerCase();
  const family = role.replace(/\d+$/, "");
  const roleDoc = `.claude/roles/${family}.md`;
  const skills = roleSkills(path.join(root, roleDoc));
  return [
    `AI Delivery Playbook: you are the ${role} session. Read CLAUDE.md and ${roleDoc} before any work.`,
    "Use the skill the Skills table in CLAUDE.md names for each task, every time, without waiting for the owner to ask.",
    skills ? `Your role's skills: ${skills}` : "",
    "The owner leads: show the step's short guide, let them answer in their own words, ask only about gaps, suggest only when asked, write after they lock and approve; talk in the language CLAUDE.md sets.",
  ].filter(Boolean).join(" ");
}

try {
  let input = {};
  try {
    input = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
  } catch {}
  const text = reminder(process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd());
  if (text) process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: text } }));
} catch {}
process.exit(0);
