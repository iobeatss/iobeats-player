#!/bin/bash
set -e

if [ -z "$VERSION" ]; then
  echo "❌ Please set VERSION first, e.g.: VERSION=2.0.74 ./scripts/mk-notes.sh"
  exit 1
fi

TAG="v$VERSION"
NOTES="RELEASE_NOTES_${TAG}.md"

# Template par défaut
cat > "$NOTES" <<EOF
# IO Beats Player $TAG — Release Notes

## 🚀 What's New
- _Describe new features here_

## 🐛 Fixes
- _List bug fixes here_

## 📦 Assets
- Web build (\`.zip\`) automatically attached
- (Optional) Mobile builds if enabled

---

_Reminder: If this is a Release Candidate (RC), please test thoroughly before tagging Stable._
EOF

echo "✅ Created $NOTES"
