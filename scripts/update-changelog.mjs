#!/usr/bin/env node
// Update CHANGELOG.md with a new version section.
// Usage (local):  TAG=v2.0.74 node scripts/update-changelog.mjs
//        or:     node scripts/update-changelog.mjs v2.0.74
// CI (GitHub Actions): pass TAG from release event (e.g. v2.0.74)

import fs from "fs";
import path from "path";
import url from "url";

const cwd = process.cwd();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tagInput = process.env.TAG || process.argv[2]; // e.g. v2.0.74
if (!tagInput || !/^v\d+\.\d+\.\d+(-[\w.-]+)?$/.test(tagInput)) {
  console.error("❌ Missing or invalid TAG. Expected like: v2.0.74");
  process.exit(1);
}
const version = tagInput.replace(/^v/, "");
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const changelogPath = path.join(cwd, "CHANGELOG.md");
const releaseNotesPath = path.join(cwd, `RELEASE_NOTES_${tagInput}.md`);

function ensureChangelogHeader(text) {
  if (/^#\s+.+/m.test(text)) return text;
  return (
    "# 📜 Changelog — IO Beats Player\n\n" +
    "All notable changes to this project will be documented in this file.\n" +
    "This project follows Semantic Versioning (https://semver.org/).\n\n" +
    text
  );
}

// Build the new section either from release notes file or a fallback template
function buildNewSection() {
  if (fs.existsSync(releaseNotesPath)) {
    let body = fs.readFileSync(releaseNotesPath, "utf-8").trim();
    // Remove a leading H1 if present
    body = body.replace(/^# .*\n+/, "");
    return `## [${version}] - ${today}\n${body}\n`;
  }

  // Fallback skeleton
  return `## [${version}] - ${today}
### ✨ Added
- _Describe new features._

### 🔄 Changed
- _Describe changes._

### 🐞 Fixed
- _Describe bug fixes._

### 🛠 DevOps
- _Build/CI/Monitoring notes._

`;
}

function insertSectionTop(existing, section) {
  // If already present, skip
  if (existing.includes(`## [${version}] -`)) {
    console.log(`ℹ️ CHANGELOG already contains ${version}. Skipping.`);
    return existing;
  }

  // Keep or create header block, then insert section just after it
  const headerRegex = /^(# .*\n(?:.*\n)*?)(?=\n## |\n$)/m; // capture header block at top
  const match = existing.match(headerRegex);

  if (match) {
    const header = match[1];
    const updated = existing.replace(header, header + section + "\n");
    return updated;
  }

  // Fallback: prepend
  return section + "\n" + existing;
}

function run() {
  let changelog = fs.existsSync(changelogPath)
    ? fs.readFileSync(changelogPath, "utf-8")
    : "";

  changelog = ensureChangelogHeader(changelog);

  const newSection = buildNewSection();
  const updated = insertSectionTop(changelog, newSection);

  if (updated === changelog) {
    console.log("No changes written (duplicate or unchanged).");
    return;
  }

  fs.writeFileSync(changelogPath, updated);
  console.log(`✅ CHANGELOG.md updated with ${version}`);
}

run();
