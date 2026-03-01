# Lessons Learned

## 2026-02-25: Events CSV Integration (v52)

### 1. PM2 path stale after directory changes
- **Mistake:** Uploaded files to `/root/app_old/tools/` but PM2 was configured to run from `/root/app/tools/` (which didn't exist).
- **Fix:** Always check `pm2 describe <name>` for `script path` before uploading.
- **Rule:** Verify the exact PM2 execution path before deploying any files.

### 2. Docker rebuild loses manually copied files
- **Mistake:** Copied events CSV into Docker container, but `docker compose up --build` creates a fresh container, losing the file.
- **Fix:** Must re-copy after every rebuild, or better: mount the file as a volume.
- **Rule:** For persistent files in Docker, use volume mounts, not `docker cp`.

### 3. Backend whitelist must be updated in MULTIPLE places
- **Mistake:** Added config to `system-config.constant.ts` but forgot:
  - `getAdminAvailableCodes()` → CMS won't show it
  - `investmentConfigCodes` in `update()` → auto-reload won't trigger
  - `getBaseConfigData()` → new records won't have metadata
  - `getInvestmentToolConfig()` in `tool.service.ts` → API won't serve the file
- **Rule:** When adding a new `SystemConfigCode`, grep for ALL existing codes and add the new one alongside them.

### 4. Nginx caches upstream IPs
- **Mistake:** After Docker rebuild, nginx kept connecting to old container IP → 502.
- **Fix:** `docker restart nginx` after any container rebuild.
- **Rule:** Always restart nginx after rebuilding Docker containers that nginx proxies.

### 5. INTERNAL_SECRET must match between microservice and BE
- **Mistake:** Used dummy `thisisasecret` in PM2 env, but BE uses `Me03OOxTbHGZv6FxgILN2Ikl`.
- **Fix:** Read the actual secret from Docker container's env.
- **Rule:** Always fetch real secrets from running containers, never guess.

### 6. Docker rebuild workflow checklist
- After every `docker compose up --build`:
  1. Restart nginx (`docker restart nginx`) — IPs change
  2. Re-copy any files manually placed in containers (events CSV etc.)
  3. Trigger microservice reload if data files were re-copied
- **Rule:** Create a post-deploy script to automate these steps.

## 2026-03-01: Web Frontend Fixes (Google OAuth, Predictions)

### 7. Backend PaginationDto uses `pageSize`, not `limit`
- **Mistake:** Frontend sent `?limit=12` but backend DTO uses `pageSize`. `forbidNonWhitelisted: true` rejected the request → empty prediction list.
- **Fix:** Changed all `limit` params to `pageSize` in frontend (predictions page, bookmarks page, API client).
- **Rule:** Always check the actual DTO class (`PaginationDto`) before adding query params. Don't assume standard names.

### 8. Docker SSR needs INTERNAL_API_URL for internal network
- **Mistake:** Next.js SSR fetches used `NEXT_PUBLIC_API_URL` (external domain). Docker container can't resolve external domain → SSR returns empty.
- **Fix:** Added `INTERNAL_API_URL=http://app:3000` env var in docker-compose. SSR uses internal URL, client-side still uses public URL.
- **Rule:** Server components inside Docker must use Docker internal network URLs, not external domains.

### 9. ALLOWED_ORIGINS must include web frontend domain
- **Mistake:** Backend CORS `ALLOWED_ORIGINS` only had `api.thaiatkimhoa.vn` and `cms.thaiatkimhoa.vn` → blocked all API calls from `web.thaiatkimhoa.vn`.
- **Fix:** Added `https://web.thaiatkimhoa.vn` to `ALLOWED_ORIGINS` in `.env` on VPS.
- **Rule:** When deploying a new frontend domain, ALWAYS update backend CORS whitelist.

### 10. API response format: always read the actual service method
- **Mistake:** Frontend expected nested structure (`predictionData[0].title`, `predictionStatusData[0].name`) but backend `findByIdConverted` returns flat fields (`title`, `summary`, `domainName` as strings).
- **Fix:** Rewrote detail page to match the actual flat API response.
- **Rule:** Before building frontend, read the backend service method's return statement to know the exact response shape.

### 11. Telegram markdown notifications break on special chars
- **Mistake:** Commit messages with `(`, `)`, `_` break Telegram markdown parsing → CI reports false failure.
- **Fix:** Switched Telegram notifications from `format: markdown` to `format: html`.
- **Rule:** Always use HTML format for Telegram notifications when including dynamic content (commit messages, etc.).

### 12. Backend enum string values are case-sensitive
- **Mistake:** Backend returns `userType: "Pro"` (from `UserTypeName.PRO = 'Pro'`), but frontend checked `=== "PRO"` (all caps) → Pro users always showed as Free.
- **Fix:** Use case-insensitive comparison: `userType?.toLowerCase() === "pro"`.
- **Rule:** ALWAYS read the actual constant value in the backend code (e.g. `UserTypeName.PRO`), don't assume the casing matches the constant name.

### 13. MANDATORY browser self-test after every deploy
- **Mistake:** Deployed new horoscope page and profile page without opening them in a browser → user found issues that visual test would have caught immediately.
- **Fix:** Added Step 14 "🔴 MANDATORY: Browser self-test" to `/dev` workflow.
- **Rule:** After EVERY deploy, open production pages in browser (`browser_subagent`), take screenshots, check console errors, and verify actual data matches expectations. NEVER notify user without doing this first.

## 2026-03-01: Horoscope Tabs, Login Mobile, Content Lock

### 14. GoogleLogin component: never use fixed `width` prop
- **Mistake:** `<GoogleLogin width="360">` overflows on mobile screens (iPhone = 390px minus padding).
- **Fix:** Removed `width` prop entirely — Google renders the button at container width.
- **Rule:** Never set fixed pixel width on third-party OAuth components. Let them be responsive.

### 15. Cached 404 responses fool Axios into thinking success
- **Mistake:** Browser caches a 404 API response. On retry, returns 304 → Axios treats as 2xx success → blank tab content.
- **Fix:** Validate `res.data?.success !== false` even on 2xx responses. Track locked tabs with a `Set<TabType>` instead of a single boolean.
- **Rule:** Always validate the response body, not just the HTTP status. Cache can turn errors into "successes".

### 16. Post-process server HTML with regex for UI enhancements
- **Pattern:** Backend returns HTML content (`html_report`). Frontend needs to highlight specific sections (e.g., "Lời khuyên hành động cụ thể").
- **Solution:** Use `String.replace()` with regex to wrap target content in a styled `<div>`. Apply CSS via global `.advice-highlight` class.
- **Rule:** When you can't change the API HTML structure, post-process it client-side with careful regex. Always use non-greedy `[\s\S]*?` and test with real content.

### 17. HTML truncation — cut at paragraph boundaries, not character count
- **Pattern:** Need to show 30% of an article for free users.
- **Solution:** Parse HTML into block elements (p, div, h1-h6, etc.) via regex, accumulate text length, cut at the paragraph boundary nearest to 30%.
- **Rule:** Never truncate mid-tag or mid-paragraph. Always split by block elements first, then measure text-only length (strip tags for counting).
