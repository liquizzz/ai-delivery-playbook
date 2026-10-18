#!/usr/bin/env node
// Prepare a release (Lead). Computes the next version from the labels of the milestone's closed issues,
// then updates CHANGELOG.md and the SRS version and Revision History. It does not tag or push:
// the Lead does that after the owner approves.
//
//   node scripts/release.mjs [--milestone "v1.4.0"]          dry run: shows what would change
//   node scripts/release.mjs [--milestone "v1.4.0"] --write  applies the changes
//
// Rules: breaking → MAJOR (from 1.0.0; before 1.0.0 → MINOR) · type:feature or type:change → MINOR · only type:fix → PATCH.
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const args = process.argv.slice(2);
const write = args.includes("--write");
const msIndex = args.indexOf("--milestone");
const gh = (...a) => execFileSync("gh", a, { stdio: ["ignore", "pipe", "inherit"] }).toString();
const git = (...a) => execFileSync("git", a, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
const today = new Date().toISOString().slice(0, 10);

// 1. Milestone
let milestone = msIndex >= 0 ? args[msIndex + 1] : null;
if (!milestone) {
  const open = JSON.parse(gh("api", "repos/{owner}/{repo}/milestones?state=open&sort=due_on&direction=asc"));
  if (!open.length) throw new Error("No open milestone. Pass --milestone.");
  milestone = open[0].title;
}

// 2. Issues
const issues = JSON.parse(gh("issue", "list", "--milestone", milestone, "--state", "closed", "--limit", "500", "--json", "number,title,labels"));
const has = (i, l) => i.labels.some((x) => x.name === l);
const features = issues.filter((i) => has(i, "type:feature"));
const changes = issues.filter((i) => has(i, "type:change"));
const fixes = issues.filter((i) => has(i, "type:fix"));
const breaking = issues.filter((i) => has(i, "breaking"));
if (!features.length && !changes.length && !fixes.length) throw new Error(`No closed type:* issues in milestone ${milestone}.`);

// 3. Version
const tags = git("tag", "--list", "v*").split("\n").filter((t) => /^v\d+\.\d+\.\d+$/.test(t));
const parse = (t) => t.slice(1).split(".").map(Number);
tags.sort((a, b) => { const [x, y] = [parse(a), parse(b)]; return x[0] - y[0] || x[1] - y[1] || x[2] - y[2]; });
const last = tags.length ? tags[tags.length - 1] : "v0.0.0";
let [maj, min, pat] = parse(last);
let bump;
if (breaking.length && maj >= 1) { bump = "MAJOR"; maj++; min = 0; pat = 0; }
else if (breaking.length || features.length || changes.length) { bump = "MINOR"; min++; pat = 0; }
else { bump = "PATCH"; pat++; }
const version = `${maj}.${min}.${pat}`;

// 4. Changelog section
const line = (i) => `- ${i.title} (#${i.number})`;
const section = [
  `## [${version}] - ${today}`,
  ...(features.length ? ["### Added", ...features.map(line)] : []),
  ...(changes.length ? ["### Changed", ...changes.map(line)] : []),
  ...(fixes.length ? ["### Fixed", ...fixes.map(line)] : []),
  ...(breaking.length && maj >= 1 ? ["### Breaking", ...breaking.map((i) => `${line(i)}: see upgrade steps in the spec`)] : []),
].join("\n");

let changelog = fs.existsSync("CHANGELOG.md") ? fs.readFileSync("CHANGELOG.md", "utf8") : "# Changelog\n\n## [Unreleased]\n";
const unreleased = /## \[Unreleased\]\n([\s\S]*?)(?=\n## \[|$)/.exec(changelog);
const unreleasedBody = unreleased ? unreleased[1].trim() : "";
const versionBlock = unreleasedBody ? `## [${version}] - ${today}\n${unreleasedBody}` : section;
changelog = unreleased
  ? changelog.replace(unreleased[0], `## [Unreleased]\n\n${versionBlock}\n`)
  : changelog.replace(/^(# Changelog.*\n)/, `$1\n## [Unreleased]\n\n${versionBlock}\n`);

// 5. SRS
const srsPath = "docs/tech/srs.md";
let srs = fs.existsSync(srsPath) ? fs.readFileSync(srsPath, "utf8") : null;
const crs = issues.filter((i) => has(i, "cr")).map((i) => `CR-${i.number}`).join(", ") || "—";
if (srs) {
  srs = srs.replace(/\*\*Version:\*\* [^ ·\n]+/, `**Version:** ${version}`).replace(/\*\*Last updated:\*\* [^ ·\n]+/, `**Last updated:** ${today}`);
  if (/^\| Unreleased \|.*$/m.test(srs)) {
    srs = srs.replace(/^\| Unreleased \| [^|]* \| [^|]* \|(.*)$/m, `| Unreleased | — | — | | | |\n| ${version} | v${version} | ${today} |$1`);
  } else {
    srs = srs.replace(/(<!-- revision-history -->\n\|[^\n]*\n\|[-| ]*\n)/, `$1| ${version} | v${version} | ${today} | ${crs} | <sections> | <summary> |\n`);
  }
}

// 6. Output
console.log(`Milestone ${milestone}: ${issues.length} closed issues (${features.length} feature, ${changes.length} change, ${fixes.length} fix, ${breaking.length} breaking)`);
console.log(`Version: ${last} → v${version} (${bump})${maj < 1 && breaking.length ? " · breaking ignored before 1.0.0" : ""}`);
if (milestone !== `v${version}`) console.log(`Note: milestone "${milestone}" ≠ computed v${version}. Rename the milestone if needed.`);
console.log(`\n${versionBlock}\n`);
if (!srs) console.log(`Warning: ${srsPath} not found; SRS not updated.`);

if (write) {
  fs.writeFileSync("CHANGELOG.md", changelog);
  if (srs) fs.writeFileSync(srsPath, srs);
  console.log("Written: CHANGELOG.md" + (srs ? `, ${srsPath}` : ""));
  console.log(`After the owner approves:\n  git checkout main && git merge --no-ff staging && git tag v${version} && git push origin main v${version}\n  gh release create v${version} --title v${version} --notes-file <section>`);
} else {
  console.log("Dry run. Add --write to apply.");
}
