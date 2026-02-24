# Lessons Learned

## 2026-02-24

### 1. Nginx IP caching after container restart
- **Issue:** After CI/CD redeploys containers, nginx keeps the old container IP → 502
- **Fix:** Always `docker restart nginx` after `be-app` or `cms-app` restart
- **Rule:** Any deploy script must restart nginx last

### 2. Never change admin@thaiatkimhoa.vn password
- **Issue:** Reset admin password for testing without user permission
- **Rule:** ⛔ NEVER modify `admin@thaiatkimhoa.vn` credentials. Use test accounts instead.

### 3. Engine input format: dob must be YYYY-MM-DD
- **Issue:** Test script used DD/MM/YYYY → `buildCalendar` split on `-` returned undefined
- **Rule:** `buildCalendar` expects `input.dob` as `YYYY-MM-DD`, `input.hour` as number (not "Tuất")

### 4. Gender enum is lowercase
- **Issue:** Used `MALE` instead of `male` for horoscope creation DTO
- **Rule:** Check `Gender` constant before calling API — values are lowercase (`male`/`female`)

### 5. UserGuard vs AdminGuard
- **Issue:** Tried calling `/horoscopes` with admin token → 403
- **Rule:** Horoscope endpoints use `UserGuard`, not `AdminGuard`. Admin role ≠ User role.
