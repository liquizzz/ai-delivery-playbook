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
  // 1. Lite with flags
  const a = path.join(tmp, "tiny-todo");
  node([path.join(kit, "init.mjs"), a, "--name", "Tiny Todo", "--level", "lite", "--description", "A one-page todo list.", "--yes"]);
  check("lite: branches main and dev", branches(a) === "dev,main,role/lead");
  check("lite: only the Lead's worktree before setup", fs.existsSync(wt(a, "lead")) && !fs.existsSync(wt(a, "po")) && !fs.existsSync(wt(a, "dev1")));
  check("lite: role file in worktree", read(wt(a, "lead"), ".claude", "role").trim() === "lead");
  check("lite: project.json with setup false", JSON.parse(read(a, ".claude", "project.json")).level === "lite" && JSON.parse(read(a, ".claude", "project.json")).setup === false);
  check("lite: CLAUDE.md name, description, level", /^# Tiny Todo$/m.test(read(a, "CLAUDE.md")) && read(a, "CLAUDE.md").includes("A one-page todo list.") && /^- Level: Lite /m.test(read(a, "CLAUDE.md")) && read(a, "CLAUDE.md").includes("set-level.mjs <lite|full>"));
  check("lite: START-HERE.md filled in", read(a, "START-HERE.md").includes("# Start here: Tiny Todo") && read(a, "START-HERE.md").includes(wt(a, "lead")) && !/\{\{\w+\}\}/.test(read(a, "START-HERE.md")));
  check("lite: START-HERE.md committed", git(a, "ls-files", "START-HERE.md") === "START-HERE.md" && git(a, "status", "--porcelain") === "");
  check("lite: compose project name", read(a, "docker-compose.yml").includes("name: tiny-todo"));
  check("lite: no design pipeline by default", !read(a, "docker-compose.yml").includes("design:") && !fs.existsSync(path.join(a, ".github", "workflows", "image-design.yml")) && !fs.existsSync(path.join(a, "docker", "design.Dockerfile")));
  check("lite: English by default", read(a, "CLAUDE.md").includes("- Language: talk to the owner in English; write documents in English."));
  check("lite: core plugins declared, no github MCP or product-management", read(a, ".claude", "settings.json").includes("superpowers@claude-plugins-official") && !read(a, ".claude", "settings.json").includes("github@claude-plugins-official") && !read(a, ".claude", "settings.json").includes("product-management@"));
  check("lite: security checks installed", fs.existsSync(path.join(a, ".github", "dependabot.yml")) && read(a, ".github", "workflows", "codeql.yml").includes("vars.CODEQL_LANGUAGES") && read(a, ".github", "workflows", "image-app.yml").includes("attest-build-provenance"));
  check("lite: NFR rows follow ISO 25010", read(a, "docs", "templates", "srs.md").includes("ISO/IEC 25010") && read(a, "docs", "templates", "srs.md").includes("### 2.4 Constraints"));
  check("lite: plain documents by default, no humanizer plugin", read(a, "CLAUDE.md").includes("- Documents: plain") && !read(a, ".claude", "settings.json").includes("humanizer@humanizer") && JSON.parse(read(a, ".claude", "project.json")).humanize === false);
  check("lite: design plugins left to setup", !read(a, ".claude", "settings.json").includes("ui-ux-pro-max@ui-ux-pro-max-skill\": true") && read(a, "CLAUDE.md").includes("setup enables `frontend-design`"));
  check("design first: look and feel at G3 in design/", read(a, "CLAUDE.md").includes("Design first, stack after") && read(a, "START-HERE.md").includes("design/look-and-feel.html") && read(a, ".claude", "commands", "brief.md").includes("G3 runs in three parts"));
  check("setup: no stack question, opens gate issues and team folders", !read(a, ".claude", "commands", "setup.md").includes("stack in mind") && read(a, ".claude", "commands", "setup.md").includes("label") && read(a, ".claude", "commands", "setup.md").includes("new-role-worktree.mjs po"));
  check("gate: G1 needs no running app, G3 does", read(a, ".claude", "commands", "gate.md").includes("No app is needed yet") && /G3 Design, stack and SRS approved[^\n]*docker compose up --build/.test(read(a, ".claude", "commands", "gate.md")));
  check("lite: skills table in CLAUDE.md", read(a, "CLAUDE.md").includes("## Skills") && read(a, "CLAUDE.md").includes("superpowers:brainstorming") && read(a, "CLAUDE.md").includes("Try it in the browser"));
  const hook = (dir) => {
    const out = execFileSync("node", [path.join(dir, ".claude", "hooks", "session-start.cjs")], { input: "{}", env: { ...process.env, CLAUDE_PROJECT_DIR: dir } }).toString();
    return out ? JSON.parse(out).hookSpecificOutput.additionalContext : "";
  };
  const leadReminder = hook(wt(a, "lead"));
  check("session-start: lead gets role, skills and recovery", leadReminder.includes("you are the lead session") && leadReminder.includes("superpowers:writing-plans") && leadReminder.includes("The owner leads") && leadReminder.includes("Recovery"));
  check("session-start: main checkout is told to use a worktree", hook(a).includes("has no role"));
  check("session-start: registered in settings", read(a, ".claude", "settings.json").includes("session-start.cjs"));
  // A PO worktree made before setup is told to wait; after setup it works.
  node([path.join("scripts", "new-role-worktree.mjs"), "po"], { cwd: wt(a, "lead") });
  const poWaits = hook(wt(a, "po"));
  check("session-start: PO waits until setup is done", poWaits.includes("setup is not done") && poWaits.includes("Tiny Todo - Lead") && !poWaits.includes("Your role's skills"));
  const poProject = JSON.parse(read(wt(a, "po"), ".claude", "project.json"));
  fs.writeFileSync(path.join(wt(a, "po"), ".claude", "project.json"), JSON.stringify({ ...poProject, setup: true }));
  check("session-start: PO works after setup", hook(wt(a, "po")).includes("you are the po session"));
  check("gate: level-aware with owner block", read(a, ".claude", "commands", "gate.md").includes("**Lite level:**") && read(a, ".claude", "commands", "gate.md").includes("For you") && !read(a, ".claude", "commands", "gate.md").includes("Starter"));
  check("no side sessions for another role's work", read(a, "CLAUDE.md").includes("Never start a side session") && hook(wt(a, "lead")).includes("never start a side session"));
  check("CLAUDE.md: hand-off block, For you, links rules", read(a, "CLAUDE.md").includes("Started #n") && read(a, "CLAUDE.md").includes("`For you` block") && read(a, "CLAUDE.md").includes("prompt stands alone in a code block") && read(a, "CLAUDE.md").includes("**Links:**"));
  check("lite: step commands installed, /progress instead of /status", ["setup", "brief", "build", "release", "change", "progress", "gate"].every((c) => fs.existsSync(path.join(a, ".claude", "commands", `${c}.md`))) && !fs.existsSync(path.join(a, ".claude", "commands", "status.md")));
  check("lite: START-HERE uses the commands", ["`/setup`", "`/brief <", "`/build dev", "`/build done", "`/release`", "`/progress`", "set-secret.mjs"].every((c) => read(a, "START-HERE.md").includes(c)) && !read(a, "START-HERE.md").includes("/status"));
  check("lite: no Starter left in the kit", !fs.existsSync(path.join(a, ".claude", "start-here", "starter.md")) && !fs.existsSync(path.join(a, "docs", "templates", "brief.md")) && !/starter/i.test(read(a, "CLAUDE.md")));
  check("lite: START-HERE links Actions and image", read(a, "START-HERE.md").includes("your repo's Actions tab") && read(a, "START-HERE.md").includes("ghcr.io/<github-user>/<repo>-app"));

  // 1b. Secrets: set once, hidden, copied to every checkout and to new worktrees
  const secretOut = node([path.join("scripts", "set-secret.mjs"), "DEMO_API_KEY"], { cwd: wt(a, "lead"), input: "s3cret-value\n" });
  check("set-secret: value never printed", !secretOut.includes("s3cret-value") && secretOut.includes("DEMO_API_KEY set"));
  check("set-secret: written to main checkout and worktrees", [a, wt(a, "lead"), wt(a, "po")].every((d) => read(d, ".env.local").includes("DEMO_API_KEY=s3cret-value")));
  check("set-secret: git-ignored", git(a, "status", "--porcelain") === "" && git(wt(a, "lead"), "status", "--porcelain") === "");
  node([path.join("scripts", "new-role-worktree.mjs"), "dev1"], { cwd: wt(a, "lead") });
  check("new worktree: secrets copied, own port", read(wt(a, "dev1"), ".env.local").includes("DEMO_API_KEY=s3cret-value") && read(wt(a, "dev1"), ".env.local").includes("PORT=5201"));
  let badName = false;
  try {
    node([path.join("scripts", "set-secret.mjs"), "lower-case"], { cwd: wt(a, "lead"), input: "x\n" });
  } catch {
    badName = true;
  }
  check("set-secret: bad name refused", badName);

  // 2. Lite through the questions (name, folder, level, description, GitHub, confirm)
  const b = path.join(tmp, "my-shop");
  // --github none keeps the questions the same whether or not gh is signed in on this machine.
  node([path.join(kit, "init.mjs"), "--github", "none"], { cwd: tmp, input: "My Shop\n\n1\n\n\n\nA tiny shop.\nyes\n", env: { ...process.env, PLAYBOOK_INIT_INTERACTIVE: "1" } });
  check("questions: folder from the suggested name", fs.existsSync(path.join(b, "CLAUDE.md")));
  check("questions: level 1 is Lite", JSON.parse(read(b, ".claude", "project.json")).level === "lite");
  check("questions: no staging", !branches(b).includes("staging"));

  // 3. Answering "no" changes nothing
  node([path.join(kit, "init.mjs"), "--github", "none"], { cwd: tmp, input: "Nope\n\n\n\n\n\n\nno\n", env: { ...process.env, PLAYBOOK_INIT_INTERACTIVE: "1" } });
  check("no: nothing created", !fs.existsSync(path.join(tmp, "nope")));

  // 4. Full with flags; the removed Starter level maps to Lite
  const c = path.join(tmp, "big-one");
  node([path.join(kit, "init.mjs"), c, "--level", "full", "--yes"]);
  check("full: staging branch", branches(c).includes("staging"));
  check("full: name from folder", /^# big-one$/m.test(read(c, "CLAUDE.md")));
  check("full: only the Lead's worktree before setup", fs.existsSync(wt(c, "lead")) && !fs.existsSync(wt(c, "po")));
  const old = path.join(tmp, "old-habit");
  node([path.join(kit, "init.mjs"), old, "--level", "starter", "--yes"]);
  check("starter flag: becomes Lite", JSON.parse(read(old, ".claude", "project.json")).level === "lite");

  // 4b. Language and design prototype
  const d = path.join(tmp, "shop-vn");
  node([path.join(kit, "init.mjs"), d, "--language", "Vietnamese", "--docs-language", "Vietnamese", "--design", "yes", "--humanize", "yes", "--yes"]);
  check("humanize: plugin and CLAUDE.md line", read(d, ".claude", "settings.json").includes("humanizer@humanizer") && read(d, "CLAUDE.md").includes("- Documents: polished"));
  check("language: written to CLAUDE.md", read(d, "CLAUDE.md").includes("talk to the owner in Vietnamese; write documents in Vietnamese."));
  check("design: pipeline kept", read(d, "docker-compose.yml").includes("design:") && fs.existsSync(path.join(d, ".github", "workflows", "image-design.yml")) && fs.existsSync(path.join(d, "docker", "design.Dockerfile")));

  // 5. set-level from the Lite lead worktree: up to full, down to lite; "starter" means lite
  const lead = wt(a, "lead");
  const setLevel = (level) => node([path.join("scripts", "set-level.mjs"), level], { cwd: lead });
  setLevel("full");
  check("up to full: staging created", branches(a).includes("staging"));
  check("up to full: files updated in the worktree", JSON.parse(read(lead, ".claude", "project.json")).level === "full" && /^- Level: Full /m.test(read(lead, "CLAUDE.md")) && read(lead, "START-HERE.md").includes("Level: **Full process**"));
  check("up to full: START-HERE.md points at the main checkout's worktrees", read(lead, "START-HERE.md").includes(wt(a, "po")));
  const down = setLevel("lite");
  check("down to lite: staging kept", branches(a).includes("staging") && down.includes("staging branch is kept"));
  check("same level: nothing to do", setLevel("lite").includes("Already at level Lite"));
  check("starter: refused politely, means lite", setLevel("starter").includes("Already at level Lite"));
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
