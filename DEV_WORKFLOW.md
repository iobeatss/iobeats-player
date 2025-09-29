# 🎧 iO Beats Player — Development & Release Workflow

This document describes the standard workflow for versioning, changelogs, release notes, and publishing new versions of the iO Beats Player.

---

## 🔖 Versioning
- We follow **Semantic Versioning (SemVer)**:  
  - **MAJOR** → incompatible changes  
  - **MINOR** → new features (backward compatible)  
  - **PATCH** → bug fixes & small improvements  

Example: `2.0.73`  
- `2` = major (IO Beats Player 2.x)  
- `0` = minor  
- `73` = patch  

---

## 🚀 Release Steps

### 1. Prepare Release Branch
```bash
git checkout -b release/X.Y.Z
git pull origin main
