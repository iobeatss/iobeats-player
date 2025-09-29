# 🎧 iO Beats Player — Release Notes v2.0.73
**Date:** 2025-09-28  
**Status:** Release Candidate → preparing for mobile launch  

---

## 🚀 What’s New
- **Mobile Bridge**  
  - Deep link support (`iobeats://player?track=...`)  
  - WebView events integration (play, pause, seek)  
- **Wallet Connect**  
  - Refreshed UI with Web3Modal / RainbowKit  
  - Faster and more reliable wallet connections  
- **Analytics**  
  - Extended event tracking (play, pause, complete, wallet connect)  

---

## 🛠 Improvements
- Optimized **HLS streaming** (buffering + CDN latency).  
- SEO upgrades: dynamic OG tags + per-page meta.  
- UI polish: player buttons, error handling, notifications.  

---

## 🐞 Fixes
- Playback resume after focus loss (desktop + mobile).  
- NFT metadata stability under slow networks.  
- Corrected cache headers for album cover images.  

---

## ⚙️ DevOps
- Unified build pipelines for canary → production.  
- Added **Sentry sourcemaps** for debugging.  
- Structured JSON logs for monitoring & transparency.  

---

## 📱 Mobile Compatibility
- **Android APK**: bundled with this release.  
- **iOS TestFlight**: link provided in release notes.  
- Deep link testing confirmed for Android + iOS.  

---

## ✅ QA Checklist
- Playback HLS/MP3 verified across browsers (Chrome, Safari, Firefox, Edge).  
- Wallet connect/disconnect tested.  
- NFT Buy/Mint/Play flow validated with sandbox contracts.  
- Lighthouse score ≥ 90 (SEO + performance).  
- Deep links & WebView tested on Android/iOS.  

---

## 📦 Artifacts
- `player-2.0.73.zip` (web build)  
- `IOBeats-2.0.73.apk` (Android)  
- iOS TestFlight link  
- `CHANGELOG.md`  

---

> ⚠️ Rollback plan: revert to **tag v2.0.72** if major issues are detected.
