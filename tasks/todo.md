## Completed

### Session 2026-03-01 (PM)
- [x] Fix: Mobile login page layout — remove fixed GoogleLogin width, responsive padding (`7b5166d`)
- [x] Feat: Replace store buttons with badge images (appstore.png, googleplay.png), Google Play link, App Store "coming soon" popup (`05d0bef`)
- [x] Feat: Highlight "Lời khuyên hành động cụ thể" in Tổng quan tab with amber gradient background (`4dd8fce`)
- [x] Feat: Inline content lock — free users see 30% article preview with upgrade CTA (`4d3cfea`)
- [x] Fix: Equal height for related prediction cards (`47c7742`)

### Session 2026-03-01 (AM)
- [x] Fix: Luận giải font 16px, AbortController for tab switching, cache tab data (`d619114`)
- [x] Fix: Per-tab proLocked tracking, handle cached 404 responses, prevent blank tabs (`0c28f94`)
- [x] Fix: Profile page — remove button next to free label, birth hour dropdown, horoscope card display after update
- [x] Fix: Date input sync between horoscope page and profile page (calendar picker)

### Sprint 6 (Done)
- [x] Profile page `/profile`
- [x] Pro/Free badge + plan info
- [x] Horoscope setup form
- [x] Show existing horoscope info
- [x] Change password
- [x] Upgrade Pro button (profile + header)

### Sprint 7 (Done)
- [x] Hub page `/horoscope` with day/month/year tabs
- [x] Daily horoscope (all users)
- [x] Monthly horoscope (PRO only, lock for FREE)
- [x] Yearly horoscope (PRO only, lock for FREE)
- [x] Pro gate: show "Nâng cấp Pro" for locked tabs
- [x] Inline horoscope edit form on horoscope page

### Sprint 8 (Done)
- [x] Forgot password page
- [x] Download app CTA banners → real badge images
- [x] Footer polish
- [x] StoreButtons shared component

## In Progress
- [ ] Phase 3: Content & Monetization
  - [x] Inline content lock (30% preview for free users)
  - [ ] Verify content lock on production with free account
  - [ ] SEO: meta tags for prediction articles
