## In Progress
- [ ] Phase 2: Enhanced Features
  ### Sprint 6: Profile Page + Horoscope Setup
  - [ ] Profile page `/profile` — `GET /users/me` → MeResponseDto (name, email, avatar, userType, proPlanType)
  - [ ] Pro/Free badge + plan info
  - [ ] Horoscope setup form — `POST /horoscopes` (name, solarDateOfBirth, timeOfBirth, timezone, gender)
  - [ ] Show existing horoscope info — `GET /horoscopes` (findOne)
  - [ ] Change password — `POST /users/change-password`
  - [ ] Deploy & verify

  ### Sprint 7: Horoscope Pages
  - [ ] Hub page `/horoscope` with day/month/year tabs
  - [ ] Daily: `GET /horoscopes/day` → `daily_advice` object (all users)
  - [ ] Monthly: `GET /horoscopes/month` → `monthly_advice` (PRO only, 404 for FREE)
  - [ ] Yearly: `GET /horoscopes/year` → `html_report` HTML string (PRO only)
  - [ ] Pro gate: show "Nâng cấp Pro" prompt for locked tabs
  - [ ] Deploy & verify

  ### Sprint 8: Forgot Password + Final Polish
  - [ ] Forgot password page
  - [ ] Download app CTA banners
  - [ ] Footer polish
  - [ ] Deploy & verify
