# CHANGELOG — Tuvi Engine & Backend

---

## [2026-02-24] v9 — Critical Bug Fixes + Template-Based Lifetime

### 🐛 Bug Fixes

#### 1. Hour Branch Parsing (`calendar_can_chi_v1.js`)
- **Vấn đề:** Khi `input.tob` không có (mobile gửi `hour`/`minute` dạng số), engine mặc định giờ = `00:00` (Tý) → sai toàn bộ Mệnh, Cục, 12 cung
- **Fix:** Thêm logic đọc `input.hour` / `input.minute` trước, fallback `input.tob`, cuối cùng mới default `00:00`
- **File:** `calendar_can_chi_v1.js` (lines 197-205)

#### 2. Lunar Double-Conversion (`server_engine.js`)
- **Vấn đề:** Khi input là Âm Lịch, engine convert ÂL→DL nhưng vẫn giữ `calendarType: 'lunar'` → `buildCalendar` convert lần 2 → sai hết
- **Fix:** Set `calendarType: 'solar'` sau khi convert ÂL→DL
- **File:** `server_engine.js` (line 60)
- **Ảnh hưởng:** Tất cả user nhập ngày Âm Lịch đều bị sai trước fix này

#### 3. Gemini AI Hallucination — Template-Based Approach
- **Vấn đề:** Gemini Flash tự ý thay đổi vị trí cung và tên sao (viết Mệnh Hợi/Thiên Phủ khi data ghi Mệnh Tuất/Tham Lang), bất chấp mọi prompt instruction
- **Fix:** Chuyển sang **template-based approach**:
  - `prompt_builder_v1.js`: Yêu cầu Gemini trả JSON (10 field phân tích), KHÔNG viết report
  - `server_engine.js`: Engine tự build HTML template với data cung/sao cố định, chỉ insert phần phân tích AI
- **Kết quả:** Tên cung, vị trí chi, danh sách sao **100% đúng** (engine sinh, AI không thể thay đổi)

### ⚙️ Changes

#### Gemini Temperature (`gemini_service_v1.js`)
- Giảm temperature `0.8 → 0.3` để output ổn định hơn

### 🔓 Backend — Unlock Horoscope API

#### Horoscope Service (`horoscope.service.ts`)
- **Vấn đề:** 6 endpoints bị chặn bởi `throw new InternalServerErrorException('Tính năng đang phát triển')`
- **Fix:** Comment out 6 throws (lines 47, 72, 96, 130, 180, 237)
- **Rebuild:** Docker image rebuilt từ host source
- **Endpoints mở:**
  - `GET /horoscopes` — Lấy thông tin lá số
  - `POST /horoscopes` — Tạo lá số mới
  - `PUT /horoscopes` — Cập nhật lá số
  - `GET /horoscopes/day` — Luận giải ngày
  - `GET /horoscopes/month` — Luận giải tháng
  - `GET /horoscopes/year` — Luận giải trọn đời (lifetime)

---

## Files Changed

| File | Thay đổi |
|------|----------|
| `calendar_can_chi_v1.js` | Fix hour/minute parsing |
| `server_engine.js` | Fix double-conversion + template-based HTML builder |
| `prompt_builder_v1.js` | Chuyển lifetime prompt sang JSON output |
| `gemini_service_v1.js` | Temperature 0.8 → 0.3 |
| `horoscope.service.ts` (VPS) | Unlock 6 API endpoints |
| `MOBILE_INTEGRATION_GUIDE.md` | [NEW] Hướng dẫn mobile parse HTML |

## Verified With

| Lá số | Input | Kết quả |
|-------|-------|---------|
| Nam | DL 4/1/1976, 20:00 | ✅ Mệnh Mão/Thiên Phủ, Thủy/Thổ Ngũ Cục |
| Phương | ÂL 28/12/1989, 06:30 | ✅ Mệnh Tuất/Tham Lang, Mộc/Hỏa Lục Cục |
