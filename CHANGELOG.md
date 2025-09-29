# 📜 Changelog — iO Beats Player

All notable changes to this project will be documented in this file.  
This project follows [Semantic Versioning](https://semver.org/).

---

## [2.0.73] - 2025-09-28
### ✨ Added
- Mobile bridge support: **deep links** (`iobeats://…`) and WebView events (play, pause, seek).
- New **Wallet Connect UI** (Web3Modal / RainbowKit).
- Extended analytics tracking (play, pause, complete, wallet events).

### 🔄 Changed
- Improved **HLS streaming** (buffering and CDN latency).
- SEO enhancements: dynamic OG tags, page-specific title/description.
- UI polish: player buttons, error toasts.

### 🐞 Fixed
- Playback resume after losing focus (desktop/mobile).
- NFT metadata loading under slow networks.
- Cache-Control headers for album cover images.

### 🛠 DevOps
- Unified build pipelines (prod/canary).
- Source maps generated for Sentry.
- Structured logs (JSON) for monitoring.

_Compatibility_: Android APK + iOS TestFlight validated with v2.0.73.

---

## [2.0.72] - 2025-09-10
### 🟢 Stable baseline
- First public **stable version** of IO Beats Player 2.x.
- Core playback: MP3 + HLS support.
- NFT integration (ERC-721 albums + metadata).
- Wallet Connect integration.
- Deployed at [open.iobeats.com](https://open.iobeats.com).
