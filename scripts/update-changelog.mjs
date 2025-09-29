#!/usr/bin/env node
import fs from "fs";
import path from "path";

const tag = process.env.TAG; // e.g. "v2.0.73"
if (!tag || !/^v\d+\.\d+\.\d+(-.*)?$/.test(tag)) {
  console.error("❌ TAG env missing or invalid. Expected like v2.0.73");
  process.exit(1);
}
const version = tag.replace(/^v/, "");
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const repoRoot = process.cwd();
const changelogPath = path.join(repoRoot, "CHANGELOG.md");
const notesFile = path.join(repoRoot, `RELEASE_NOTES_${tag}.md`);
const fallbackTemplate = (v, d) => `## [${v}] - ${d}
### ✨ Added
- _Describe new features._

### 🔄 Changed
- _Describe changes._

### 🐞 Fixed
- _Describe fixes._

### 🛠 DevOps
- _Build/CI/monitoring notes._

`;

let existing = "";
if (fs.existsSync(changelogPath)) {
  existing = fs.readFileSync(changelogPath, "utf-8");
} else {
  existing = `# 📜 Changelog — IO Beats Player

All notable changes to this project will be documented in this file.
This project follows Semantic Versioning (https://semver.org/).

`;
}

let newSection = "";
if (fs.existsSync(notesFile)) {
  // Use the release notes file content under the new heading
  const body = fs.readFileSync(notesFile, "utf-8").trim();
  // Keep only the markdown body (remove a leading H1 if present)
  const cleaned = body.replace(/^# .*\n+/, "");
  newSection = `\n## [${version}] - ${today}\n${cleaned}\n`;
} else {
  newSection = "\n" + fallbackTemplate(version, today);
}

// Avoid duplicating if section already exists
if (existing.includes(`## [${version}] -`)) {
  console.log(`ℹ️ Changelog already contains ${version}. Skipping.`);
  process.exit(0);
}

// Insert after the header line(s)
let updated = existing;
const headerMarker = /^(# .*\n(?:.*\n)*?)(?:\n## |\n$)/m; // capture header block
const match = existing.match(headerMarker);

if (match) {
  // Insert newSection after header block
  const headerBlock = match[1];
  updated = existing.replace(headerBlock, headerBlock + newSection + "\n");
} else {
  // Fallback: prepend
  updated = newSection + "\n" + existing;
}

fs.writeFileSync(changelogPath, updated);
console.log(`✅ CHANGELOG.md updated with ${version}`);
