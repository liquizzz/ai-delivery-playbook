// SPDX-License-Identifier: MIT
// AI Delivery Playbook by Hai Nguyen (github.com/liquizzz/ai-delivery-playbook)
//
// Test for release.mjs without GitHub: builds a throw-away repo with a CHANGELOG and an SRS, fakes the gh CLI,
// runs release.mjs for several label mixes and checks the version, CHANGELOG and SRS revision.
// Run:  node scripts/release.test.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const release = path.join(here, "release.mjs");
let failed = 0;
const check = (name, cond) => {
  if (!cond) failed++;
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
};

function scenario(name, { lastTag, issues, srs = true, crlf = false }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "release-test-"));
  const git = (...a) => execFileSync("git", a, { cwd: dir, stdio: "ignore" });
  git("init", "-q", "-b", "main");
  git("config", "user.email", "t@t");
  git("config", "user.name", "t");
  fs.writeFileSync(path.join(dir, "CHANGELOG.md"), "# Changelog\n\n## [Unreleased]\n### Added\n- Login page (CR-12, #42)\n");
  if (srs) {
    fs.mkdirSync(path.join(dir, "docs", "tech"), { recursive: true });
    fs.writeFileSync(path.join(dir, "docs", "tech", "srs.md"),
      "# SRS\n\n**Version:** 0.0.0 · **Status:** Baseline · **Last updated:** 2026-01-01\n\n<!-- revision-history -->\n| SRS version | Release | Date | CRs | Sections changed | Summary |\n|---|---|---|---|---|---|\n| Unreleased | — | — | CR-12 | §3.1 | Login |\n| 0.0.0 | — | 2026-01-01 | — | All | Baseline |\n");
  }
  if (crlf) {
    // A Windows working copy with core.autocrlf=true has CRLF line endings.
    for (const f of ["CHANGELOG.md", ...(srs ? [path.join("docs", "tech", "srs.md")] : [])]) {
      const p = path.join(dir, f);
      fs.writeFileSync(p, fs.readFileSync(p, "utf8").replace(/\n/g, "\r\n"));
    }
  }
  git("add", "-A");
  git("commit", "-q", "-m", "init");
  if (lastTag) git("tag", lastTag);
  const shim = path.join(dir, "gh-shim.mjs");
  fs.writeFileSync(shim, `const a = process.argv.slice(2).join(" ");
if (a.startsWith("api")) console.log(JSON.stringify([{ title: "v-next" }]));
else console.log(${JSON.stringify(JSON.stringify(issues))});`);
  const out = execFileSync(process.execPath, [release, "--write"], { cwd: dir, env: { ...process.env, RELEASE_GH_SHIM: shim } }).toString();
  return {
    out,
    changelog: fs.readFileSync(path.join(dir, "CHANGELOG.md"), "utf8"),
    srs: srs ? fs.readFileSync(path.join(dir, "docs", "tech", "srs.md"), "utf8") : null,
    name,
  };
}

const L = (...names) => names.map((name) => ({ name }));

let r = scenario("first release, feature", { lastTag: null, issues: [{ number: 12, title: "Login", labels: L("cr", "type:feature") }] });
check("feature from v0.0.0 → v0.1.0", r.out.includes("v0.0.0 → v0.1.0 (MINOR)"));
check("changelog: Unreleased kept and version section added", /## \[Unreleased\]\n\n## \[0\.1\.0\] - \d{4}-\d{2}-\d{2}\n### Added\n- Login page/.test(r.changelog));
check("SRS version updated", r.srs.includes("**Version:** 0.1.0"));
check("SRS Unreleased row turned into 0.1.0 and a fresh Unreleased row added", /\| Unreleased \| — \| — \| \| \| \|\n\| 0\.1\.0 \| v0\.1\.0 \| \d{4}-\d{2}-\d{2} \| CR-12 \| §3\.1 \| Login \|/.test(r.srs));

r = scenario("fix only", { lastTag: "v1.3.2", issues: [{ number: 88, title: "Crash", labels: L("defect", "type:fix") }] });
check("fix only from v1.3.2 → v1.3.3", r.out.includes("v1.3.2 → v1.3.3 (PATCH)"));

r = scenario("breaking after 1.0", { lastTag: "v1.4.0", issues: [{ number: 20, title: "New schema", labels: L("cr", "type:change", "breaking") }] });
check("breaking from v1.4.0 → v2.0.0", r.out.includes("v1.4.0 → v2.0.0 (MAJOR)"));

r = scenario("breaking before 1.0", { lastTag: "v0.3.1", issues: [{ number: 21, title: "New schema", labels: L("cr", "type:change", "breaking") }] });
check("breaking ignored before 1.0: v0.3.1 → v0.4.0", r.out.includes("v0.3.1 → v0.4.0 (MINOR)"));

r = scenario("no SRS", { lastTag: "v0.1.0", issues: [{ number: 30, title: "Search", labels: L("cr", "type:feature") }], srs: false });
check("missing SRS is reported, not fatal", r.out.includes("not found; SRS not updated"));

r = scenario("CRLF files", { lastTag: "v0.1.0", issues: [{ number: 31, title: "Export", labels: L("cr", "type:feature") }], crlf: true });
check("CRLF: changelog version block written", /## \[Unreleased\]\r\n\r\n## \[0\.2\.0\] - \d{4}-\d{2}-\d{2}\r\n### Added\r\n- Login page/.test(r.changelog));
check("CRLF: line endings kept", !/[^\r]\n/.test(r.changelog) && !/[^\r]\n/.test(r.srs));
check("CRLF: SRS revision row and status", r.srs.includes("| 0.2.0 | v0.2.0 |") && r.srs.includes("**Status:** Released v0.2.0"));

console.log(failed ? `\n${failed} failed` : "\nAll passed");
process.exit(failed ? 1 : 0);
