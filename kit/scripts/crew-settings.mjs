#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Crewbook by Hai Nguyen (github.com/liquizzz/crewbook-build)
// Settings every session of this project shares at once, kept outside git in the repo's common git
// folder (one file for the main checkout and all worktrees; nothing to commit or merge):
//   node scripts/crew-settings.mjs handoff     before a hand-off: prints "messages: on|off" and "tips: show|hide"
//                                               (a "show" counts; tips stop after 3, or once the owner used /send or /relay)
//   node scripts/crew-settings.mjs relay on|off  messages between sessions (/relay)
//   node scripts/crew-settings.mjs learned     the owner knows /send and /relay: no more tips
//   node scripts/crew-settings.mjs status      prints the settings
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const TIPS_LIMIT = 3;
const commonDir = path.resolve(execFileSync("git", ["rev-parse", "--git-common-dir"]).toString().trim());
const file = path.join(commonDir, "crewbook-settings.json");
const read = () => {
  try {
    return { messages: false, tipsShown: 0, learned: false, ...JSON.parse(fs.readFileSync(file, "utf8")) };
  } catch {
    return { messages: false, tipsShown: 0, learned: false };
  }
};
const write = (s) => fs.writeFileSync(file, JSON.stringify(s, null, 2) + "\n");

const [cmd, arg] = process.argv.slice(2);
const s = read();
if (cmd === "handoff") {
  const show = !s.messages && !s.learned && s.tipsShown < TIPS_LIMIT;
  if (show) write({ ...s, tipsShown: s.tipsShown + 1 });
  console.log(`messages: ${s.messages ? "on" : "off"}\ntips: ${show ? "show" : "hide"}`);
} else if (cmd === "relay" && (arg === "on" || arg === "off")) {
  write({ ...s, messages: arg === "on", learned: true });
  console.log(`messages: ${arg}`);
} else if (cmd === "learned") {
  write({ ...s, learned: true });
  console.log("tips: hide");
} else if (cmd === "status") {
  console.log(`messages: ${s.messages ? "on" : "off"}\ntips shown: ${s.tipsShown} of ${TIPS_LIMIT}${s.learned ? " (owner knows /send and /relay)" : ""}`);
} else {
  console.error("Usage: node scripts/crew-settings.mjs handoff | relay on|off | learned | status");
  process.exit(1);
}
