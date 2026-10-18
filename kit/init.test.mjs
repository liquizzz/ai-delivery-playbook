#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// AI Delivery Playbook by Hai Nguyen (github.com/liquizzz/ai-delivery-playbook)
// Tests init.mjs (with flags and with answers to its questions) and scripts/set-level.mjs on temporary folders.
// Run:  node kit/init.test.mjs      (needs git, Docker and Docker Compose, like init itself; never touches GitHub)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const kit = path.dirname(fileURLToPath(import.meta.url));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "playbook-init-"));
let failed = 0;
let passed = 0;
const check = (label, cond) => {
  if (cond) passed++;
  else {
    failed++;
    console.log(`FAIL ${label}`);
  }
};
const node = (args, opts = {}) => execFileSync("node", args, { stdio: ["pipe", "pipe", "pipe"], ...opts }).toString();
const git = (dir, ...args) => execFileSync("git", args, { cwd: dir }).toString().trim();
const branches = (dir) => git(dir, "branch", "--format=%(refname:short)").split(/\r?\n/).sort().join(",");
const read = (...p) => fs.readFileSync(path.join(...p), "utf8");
const wt = (dir, role) => path.join(path.dirname(dir), `${path.basename(dir)}-wt`, role);

try {
  // 1. Starter with flags
  const a = path.join(tmp, "tiny-todo");
  node([path.join(kit, "init.mjs"), a, "--name", "Tiny Todo", "--level", "starter", "--description", "A one-page todo list.", "--yes"]);
  check("starter: branches main and dev only", branches(a) === "dev,main,role/lead");
  check("starter: lead worktree only", fs.existsSync(wt(a, "lead")) && !fs.existsSync(wt(a, "po")));
  check("starter: role file in worktree", read(wt(a, "lead"), ".claude", "role").trim() === "lead");
  check("starter: project.json", JSON.parse(read(a, ".claude", "project.json")).level === "starter");
  check("starter: CLAUDE.md name, description, level", /^# Tiny Todo$/m.test(read(a, "CLAUDE.md")) && read(a, "CLAUDE.md").includes("A one-page todo list.") && /^- Level: Starter /m.test(read(a, "CLAUDE.md")));
  check("starter: START-HERE.md filled in", read(a, "START-HERE.md").includes("# Start here: Tiny Todo") && read(a, "START-HERE.md").includes(wt(a, "lead")) && !/\{\{\w+\}\}/.test(read(a, "START-HERE.md")));
  check("starter: START-HERE.md committed", git(a, "ls-files", "START-HERE.md") === "START-HERE.md" && git(a, "status", "--porcelain") === "");
  check("starter: compose project name", read(a, "docker-compose.yml").includes("name: tiny-todo"));

  // 2. Lite through the questions (name, folder, level, description, GitHub, confirm)
  const b = path.join(tmp, "my-shop");
  node([path.join(kit, "init.mjs")], { cwd: tmp, input: "My Shop\n\n2\nA tiny shop.\nnone\nyes\n", env: { ...process.env, PLAYBOOK_INIT_INTERACTIVE: "1" } });
  check("lite: folder from the suggested name", fs.existsSync(path.join(b, "CLAUDE.md")));
  check("lite: po, lead and dev1 worktrees", ["po", "lead", "dev1"].every((r) => fs.existsSync(wt(b, r))));
  check("lite: no staging", !branches(b).includes("staging"));

  // 3. Answering "no" changes nothing
  node([path.join(kit, "init.mjs")], { cwd: tmp, input: "Nope\n\n\n\nnone\nno\n", env: { ...process.env, PLAYBOOK_INIT_INTERACTIVE: "1" } });
  check("no: nothing created", !fs.existsSync(path.join(tmp, "nope")));

  // 4. Full with flags
  const c = path.join(tmp, "big-one");
  node([path.join(kit, "init.mjs"), c, "--level", "full", "--yes"]);
  check("full: staging branch", branches(c).includes("staging"));
  check("full: name from folder", /^# big-one$/m.test(read(c, "CLAUDE.md")));

  // 5. set-level from the Starter lead worktree: up to lite, up to full, down to starter
  const lead = wt(a, "lead");
  const setLevel = (level) => node([path.join("scripts", "set-level.mjs"), level], { cwd: lead });
  setLevel("lite");
  check("up to lite: po and dev1 worktrees", fs.existsSync(wt(a, "po")) && fs.existsSync(wt(a, "dev1")));
  check("up to lite: files updated in the worktree", JSON.parse(read(lead, ".claude", "project.json")).level === "lite" && /^- Level: Lite /m.test(read(lead, "CLAUDE.md")) && read(lead, "START-HERE.md").includes("Level: **Lite**"));
  check("up to lite: START-HERE.md points at the main checkout's worktrees", read(lead, "START-HERE.md").includes(wt(a, "dev1")));
  setLevel("full");
  check("up to full: staging created", branches(a).includes("staging"));
  const down = setLevel("starter");
  check("down to starter: worktrees kept", fs.existsSync(wt(a, "po")) && fs.existsSync(wt(a, "dev1")));
  check("down to starter: unused sessions listed", down.includes("No longer used at this level: po, dev1"));
  check("down to starter: staging kept", branches(a).includes("staging"));
  check("same level: nothing to do", setLevel("starter").includes("Already at level Starter"));
  let refused = false;
  try {
    setLevel("huge");
  } catch {
    refused = true;
  }
  check("unknown level refused", refused);
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

console.log(`${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
