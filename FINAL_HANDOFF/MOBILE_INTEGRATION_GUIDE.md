# Hướng Dẫn Tích Hợp Mobile — Lá Số + Luận Giải Tử Vi

> **Cập nhật:** 24/02/2026 — Engine v12  
> **Áp dụng cho:** Flutter mobile app tích hợp backend Tử Vi API

---

## Tổng Quan Kiến Trúc

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────┐
│  Flutter App  │────▶│  Backend (Node)   │────▶│  Gemini API  │
│              │◀────│  /horoscopes/*    │◀────│  (AI luận)   │
│  - WebView   │     │  server_engine.js │     └──────────────┘
│  - Parse JSON│     │  + chart_renderer │
└──────────────┘     └──────────────────┘
```

**2 output chính:**
1. **Lá số (Chart HTML)** — Bảng lưới 4×4 dọc (portrait), hiển thị 12 cung, sao, Tuần/Triệt → render bằng WebView
2. **Luận giải AI (HTML Report)** — Phân tích sâu 4 bước từ Gemini → parse thành sections

---

## 1. Input Parameters

Mọi request gửi JSON body với các field sau:

```json
{
  "name": "Nguyễn Văn A",
  "gender": "Nam",          // "Nam" hoặc "Nữ"
  "dob": "1969-12-25",      // format YYYY-MM-DD
  "calendarType": "solar",  // "solar" = dương lịch, "lunar" = âm lịch
  "hour": 18,               // 0-23
  "minute": 0,              // 0-59
  "timeZone": 7,            // GMT offset (VN = 7)
  "mode": "lifetime",       // "lifetime" | "daily" | "monthly"
  "isLeapMonth": false      // chỉ dùng khi calendarType = "lunar"
}
```

---

## 2. API Modes & Response

### Mode `lifetime` — Luận giải trọn đời

**Response:**
```json
{
  "success": true,
  "mode": "lifetime",
  "html_report": "<html>...luận giải AI 4 bước...</html>",
  "data": { /* raw engine chart data */ }
}
```

### Mode `daily` — Luận giải ngày

**Response:**
```json
{
  "success": true,
  "mode": "daily",
  "data": { /* JSON analysis */ }
}
```

### Mode `monthly` — Luận giải tháng

**Response:**
```json
{
  "success": true,
  "mode": "monthly",
  "data": { /* JSON analysis */ }
}
```

---

## 3. Lá Số (Visual Chart) — WebView

### Cách hoạt động

Engine trả raw `data` chứa toàn bộ thông tin lá số. Backend sử dụng `chart_renderer.js` để render HTML bảng lưới **dạng dọc (portrait)** — phù hợp cho mobile.

**Backend gọi:**
```javascript
import { renderChart } from './chart_renderer.js';

// Dọc (portrait) — MẶC ĐỊNH cho mobile
const chartHtml = renderChart(chart, { layout: 'portrait' });

// Ngang (landscape) — cho web/tablet
const chartHtml = renderChart(chart); // hoặc { layout: 'landscape' }
```

**Mobile app có 2 cách:**
1. **Cách 1 (Recommended):** Backend thêm field `chart_html` trong response → app dùng WebView hiển thị trực tiếp
2. **Cách 2:** App nhận `data` JSON → tự render bằng Flutter GridView

> **Lưu ý:** Layout `portrait` giữ nguyên UI lưới 4×4 nhưng tỷ lệ dọc — full-width, cell cao hơn (140px), tối ưu cho màn hình điện thoại.

### Cấu trúc Chart HTML

```html
<div class="chart-grid">
  <!-- 12 ô ngoài = 12 cung, bố trí CSS Grid 4×4 -->
  <div class="cell" style="grid-row:1;grid-column:1;">  <!-- Tỵ -->
    <div class="cell-header">
      <span class="dai-van">105-114</span>
      <span class="palace-name">PHÚC ĐỨC</span>
      <span class="chi-label">Tỵ</span>
    </div>
    <div class="main-stars"><!-- Chính tinh, in đậm --></div>
    <div class="aux-stars"><!-- Phụ tinh --></div>
    <div class="cell-footer">
      <!-- Badge THÂN, Tuần, Triệt nếu có -->
    </div>
  </div>
  <!-- ...11 cell khác... -->

  <!-- Ô giữa 2×2: thông tin cá nhân -->
  <div class="center" style="grid-row:2/4;grid-column:2/4;">
    <div class="center-title">LÁ SỐ TỬ VI</div>
    <table class="info-table">...</table>
    <div class="center-meta">Cục, Mệnh, Thân cư</div>
    <div class="center-tuHoa">Tứ Hóa</div>
  </div>
</div>
```

### Bố trí 12 cung trên Grid

```
 Hàng 1: Tỵ(1,1)    Ngọ(1,2)    Mùi(1,3)    Thân(1,4)
 Hàng 2: Thìn(2,1)  [TRUNG TÂM] [TRUNG TÂM] Dậu(2,4)
 Hàng 3: Mão(3,1)   [TRUNG TÂM] [TRUNG TÂM] Tuất(3,4)
 Hàng 4: Dần(4,1)   Sửu(4,2)    Tý(4,3)     Hợi(4,4)
```

### Màu sắc sao

| Loại sao | Màu | Ví dụ |
|----------|-----|-------|
| Chính tinh (14 sao) | Xanh dương đậm `#1a237e`, **in đậm** | Tử Vi, Thiên Cơ, Thiên Phủ... |
| Sát tinh | Đỏ `#c62828` | Thất Sát, Phá Quân, Kình Dương, Đà La, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp |
| Cát tinh | Xanh lá `#2e7d32` | Tả Phù, Hữu Bật, Văn Xương, Văn Khúc, Lộc Tồn, Thiên Mã |
| Đào hoa | Hồng `#ad1457` | Đào Hoa, Hồng Loan, Thiên Hỷ, Thiên Diêu |
| Tứ Hóa (Lộc/Quyền/Khoa) | Cam `#e65100` | Hóa Lộc, Hóa Quyền, Hóa Khoa |
| Hóa Kỵ | Đỏ đậm `#b71c1c` | Hóa Kỵ |
| Phụ tinh khác | Xám `#333` | Các sao còn lại |

### Markers đặc biệt

| Marker | Hiển thị | Ý nghĩa |
|--------|---------|---------|
| `THÂN` | Badge cam nền trắng | Cung có Thân cư |
| `Triệt` | Badge đỏ nhạt | Cung gặp Triệt Không |
| `Tuần` | Badge vàng | Cung gặp Tuần Không |

### Flutter WebView — Hiển thị Chart

```dart
import 'package:webview_flutter/webview_flutter.dart';

class ChartWebView extends StatelessWidget {
  final String chartHtml;

  const ChartWebView({required this.chartHtml});

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    return SizedBox(
      // Portrait chart tỷ lệ ~1:1.2 (width:height)
      height: screenWidth * 1.2,
      child: WebViewWidget(
        controller: WebViewController()
          ..setJavaScriptMode(JavaScriptMode.disabled)
          ..loadHtmlString(chartHtml),
      ),
    );
  }
}

// Usage:
ChartWebView(chartHtml: response['chart_html'])
```

---

## 4. Luận Giải AI (Lifetime Report) — Parse HTML

### Cấu trúc HTML Report

```
<body>
  <!-- BƯỚC 1: Tổng Quan -->
  <div class='section'>
    <h2>BƯỚC 1: TỔNG QUAN LÁ SỐ</h2>
    <p>...phân tích tổng quan...</p>
  </div>

  <!-- BƯỚC 2: 12 Cung (7 palace blocks) -->
  <div class='section'>
    <h2>BƯỚC 2: LUẬN GIẢI 12 CUNG</h2>
    <div class='palace'>
      <h3>Cung Mệnh (Mão)</h3>
      <div class='stars'>Thiên Phủ, Lộc Tồn...</div>
      <div class='analysis'>...phân tích AI...</div>
    </div>
    <!-- 6 palace blocks nữa -->
  </div>

  <!-- BƯỚC 3: Vận Hạn -->
  <div class='section'>
    <h2>BƯỚC 3: VẬN HẠN</h2>
    <p>...phân tích vận hạn...</p>
  </div>

  <!-- BƯỚC 4: Tổng Kết -->
  <div class='section'>
    <h2>BƯỚC 4: TỔNG KẾT & LỜI KHUYÊN</h2>
    <p>...tổng kết, 3 điểm yếu, lời khuyên...</p>
  </div>
</body>
```

### CSS Selectors

| Selector | Nội dung | Mô tả |
|----------|----------|-------|
| `div.section` | Container cho mỗi bước | Luôn có 4 sections |
| `div.section h2` | Tiêu đề bước | "BƯỚC 1: ..." |
| `div.section > p` | Phân tích (bước 1, 3, 4) | Chứa HTML `<b>`, `<br>` |
| `div.palace` | Container cho mỗi cung | 7 palaces ở bước 2 |
| `div.palace h3` | Tên cung | "Cung Mệnh (Mão)" |
| `div.palace div.stars` | Sao trong cung | Phân cách bằng dấu phẩy |
| `div.palace div.analysis` | AI luận cung | Chứa HTML |

### 7 Palace Blocks (thứ tự cố định)

| # | Tên | Key |
|---|-----|-----|
| 1 | Cung Mệnh | `menh` |
| 2 | Cung Thiên Di | `thien_di` |
| 3 | Cung Quan Lộc | `quan_loc` |
| 4 | Cung Tài Bạch | `tai_bach` |
| 5 | Cung Phu Thê | `phu_the` |
| 6 | Cung Tử Tức | `tu_tuc` |
| 7 | Các cung khác | `cung_khac` |

### Flutter Parse Code

```dart
import 'package:html/parser.dart' as htmlParser;
import 'package:html/dom.dart';

class PalaceData {
  final String name;      // "Cung Mệnh (Mão)"
  final String stars;     // "Thiên Phủ, Lộc Tồn..."
  final String analysis;  // "...phân tích AI..."

  PalaceData({required this.name, required this.stars, required this.analysis});
}

class LifetimeReport {
  final String tongQuan;
  final List<PalaceData> palaces;
  final String vanHan;
  final String tongKet;

  LifetimeReport({
    required this.tongQuan,
    required this.palaces,
    required this.vanHan,
    required this.tongKet,
  });

  factory LifetimeReport.fromHtml(String htmlString) {
    final document = htmlParser.parse(htmlString);
    final sections = document.querySelectorAll('div.section');

    String tongQuan = sections.isNotEmpty
        ? sections[0].querySelector('p')?.innerHtml ?? '' : '';

    List<PalaceData> palaces = [];
    if (sections.length > 1) {
      for (var node in sections[1].querySelectorAll('div.palace')) {
        palaces.add(PalaceData(
          name: node.querySelector('h3')?.text ?? '',
          stars: node.querySelector('div.stars')?.text ?? '',
          analysis: node.querySelector('div.analysis')?.innerHtml ?? '',
        ));
      }
    }

    String vanHan = sections.length > 2
        ? sections[2].querySelector('p')?.innerHtml ?? '' : '';

    String tongKet = sections.length > 3
        ? sections[3].querySelector('p')?.innerHtml ?? '' : '';

    return LifetimeReport(
      tongQuan: tongQuan,
      palaces: palaces,
      vanHan: vanHan,
      tongKet: tongKet,
    );
  }
}
```

```yaml
# pubspec.yaml
dependencies:
  html: ^0.15.4
  webview_flutter: ^4.0.0
```

---

## 5. Raw Chart Data (JSON)

Khi cần tự render chart trên Flutter (thay vì WebView), dùng field `data` từ response:

```json
{
  "data": {
    "chart": {
      "palaces": {
        "MENH": {
          "chi": "Mão",
          "name": "Mệnh",
          "isThan": false,
          "daiVanStart": 5,
          "daiVanEnd": 14,
          "stars": ["Thiên Phủ", "Lộc Tồn", "Tướng Tinh", ...]
        },
        "TAI": {
          "chi": "Hợi",
          "isThan": true,    // ← Thân cư tại đây
          "daiVanStart": 45,
          "daiVanEnd": 54,
          "stars": [...]
        },
        "THIEN_DI": {
          "chi": "Dậu",      // ← Thiên Di RIÊNG BIỆT với Thân
          "isThan": false,
          "stars": ["Vũ Khúc", "Thất Sát", ...]
        }
        // ...9 cung khác
      },
      "mainStars": {
        "Tử Vi": "Sửu",
        "Thiên Phủ": "Mão",
        // ...12 sao khác
      },
      "tuHoa": {
        "loc": "Thiên Cơ",
        "quyen": "Thiên Lương",
        "khoa": "Tử Vi",
        "ky": "Thái Âm"
      },
      "misc": {
        "tuanTriet": {
          "Tuần Không": ["Tý", "Sửu"],
          "Triệt Không": ["Ngọ", "Mùi"]
        }
      }
    }
  }
}
```

### Palace Keys

| Key | Tên cung | Key | Tên cung |
|-----|---------|-----|---------|
| `MENH` | Mệnh | `TAI` | Tài Bạch |
| `PHU_MAU` | Phụ Mẫu | `TU_TUC` | Tử Tức |
| `PHUC` | Phúc Đức | `PHU_THE` | Phu Thê |
| `DIEN` | Điền Trạch | `HUYNH_DE` | Huynh Đệ |
| `QUAN` | Quan Lộc | `THIEN_DI` | Thiên Di |
| `NO` | Nô Bộc | `TAT` | Tật Ách |

---

## 6. Flow Tích Hợp Hoàn Chỉnh

```
User nhập thông tin
       ↓
┌─────────────────────┐
│ POST /horoscopes    │
│ mode: "lifetime"    │
└─────────────────────┘
       ↓
Backend xử lý:
  1. buildEngineOutput() → raw chart
  2. renderChart()       → chart_html (lá số visual)
  3. callGemini()        → AI luận giải
  4. buildHtmlReport()   → html_report
       ↓
Response JSON:
  {
    chart_html:   "<!DOCTYPE>...",  // WebView cho lá số
    html_report:  "<html>...",     // Parse cho luận giải
    data:         { chart: ... }   // Raw data nếu cần
  }
       ↓
Flutter App:
  Tab 1: "Lá Số"    → WebView(chartHtml)
  Tab 2: "Luận Giải" → Parse html_report → ListView
```

---

## 7. Lưu Ý Quan Trọng

1. **Thân ≠ Thiên Di:** Thân cư bất kỳ cung nào (check `isThan: true`), Thiên Di luôn ở key `THIEN_DI`. Không gộp 2 cung này.

2. **Tuần/Triệt là array:** `["Tý", "Sửu"]` — luôn có đúng 2 chi. Check cung nào gặp bằng `tuanTriet["Tuần Không"].includes(palace.chi)`.

3. **html_report chứa HTML tags:** Dùng WebView hoặc Flutter `HtmlWidget` (package `flutter_html`) để render, không dùng plain `Text`.

4. **chart_html responsive:** Tự co dãn theo viewport. Set WebView width = screen width, height ~500dp.

5. **API key quản lý bởi backend:** Mobile KHÔNG cần gửi Gemini API key. Backend tự lấy từ DB.

6. **Timeout:** Mode `lifetime` cần gọi Gemini → response time 15-60s. Mobile nên hiện loading animation.

7. **Fallback:** Nếu Gemini API lỗi, `html_report` = null nhưng `chart_html` vẫn có (không cần AI). Mobile nên hiển thị lá số trước, luận giải load sau.
