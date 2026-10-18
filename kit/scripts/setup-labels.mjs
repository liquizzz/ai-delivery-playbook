#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// AI Delivery Playbook by Hai Nguyen (github.com/liquizzz/ai-delivery-playbook)
// Create or update the playbook's GitHub labels in the current repo (needs the gh CLI).
// Run:  node scripts/setup-labels.mjs
import { execFileSync } from "node:child_process";

const LABELS = [
  ["cr", "1d76db", "Change request (parent issue)"],
  ["type:feature", "0e8a16", "New capability; bumps MINOR"],
  ["type:change", "fbca04", "Changed behaviour; bumps MINOR"],
  ["type:fix", "d93f0b", "Fix only; bumps PATCH"],
  ["breaking", "b60205", "From 1.0.0: breaks what runs in production; bumps MAJOR"],
  ["L0", "c5def5", "Change level: display"],
  ["L1", "bfd4f2", "Change level: setting"],
  ["L2", "7fa7e0", "Change level: module logic"],
  ["L3", "3e6fb0", "Change level: core, money, security, data"],
  ["role:dev", "5319e7", "Dev task"],
  ["role:test", "5319e7", "Test task"],
  ["role:uiux", "5319e7", "UI/UX task"],
  ["role:devops", "5319e7", "DevOps task"],
  ["defect", "e11d21", "Defect"],
  ["sev:high", "b60205", "Blocks a release; hotfix in production"],
  ["sev:medium", "f9a03f", "Blocks a release unless the owner accepts it"],
  ["sev:low", "fef2c0", "Does not block a release"],
  ["blocked", "000000", "Waiting on something outside the team"],
  ["needs-owner", "ff7619", "Waiting for the owner's decision"],
  ["codex-review", "ededed", "Lead proposes a Codex review; the owner decides"],
  ["claude-review", "ededed", "Lead proposes a Claude /code-review; the owner decides"],
];

for (const [name, color, description] of LABELS) {
  execFileSync("gh", ["label", "create", name, "--color", color, "--description", description, "--force"], { stdio: "inherit" });
}
console.log(`${LABELS.length} labels ready.`);
