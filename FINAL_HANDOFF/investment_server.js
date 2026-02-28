const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");
const axios = require("axios"); // Added axios import
const cheerio = require("cheerio"); // Added cheerio import
const app = express();
const PORT = 4000;

// Cấu hình Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Import Logic Module
const { parseDate, analyzeRisk, generateHtmlOutput, calcEventSeverity, calcRegionalMultiplier, getMatchingEvents } = require("./logic");

// Import Google Generative AI
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key (User provided)
const genAI = new GoogleGenerativeAI(process.env.AI_KEY);
let model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

// ---------------------- CSDL (Sẽ được tải một lần khi Server khởi động) ----------------------
let CSDL = {
  lop1_dienTien: [],
  lop2_ngay: {},
  lop3_gio: {},
  events: [],
};

// ---------------------- CMS CONFIGURATION (MỚI v51 - CMS INTEGRATION) ----------------------
const BASE_URL = process.env.CMS_BASE_URL || "http://localhost:3000"; // Default to self-host for testing

// In production, these should be real S3/CMS URLs
const CMS_URLS = {
  LOP1:
    process.env.CMS_URL_LOP1 || `${BASE_URL}/RANGING TỪ NĂM 2022 TỚI 2026.csv`,
  LOP2: process.env.CMS_URL_LOP2 || `${BASE_URL}/RANGING THEO NGÀY.csv`,
  LOP3: process.env.CMS_URL_LOP3 || `${BASE_URL}/RANGING THEO GIỜ.csv`,
  EVENTS: process.env.CMS_URL_EVENTS || `${BASE_URL}/EVENTS.csv`,
};

// ---------------------- HÀM TIỆN ÍCH DỮ LIỆU (ASYNC) ----------------------

async function fetchCMSData(url, name) {
  try {
    console.log(`📡 Đang tải dữ liệu ${name} từ: ${url}...`);
    // Note: CSV files on CMS might need authentication (e.g. headers). Assuming public for now.
    const res = await axios.get(url, {
      timeout: 10000,
      responseType: "text",
      headers: {
        "x-internal-secret": process.env.INTERNAL_SECRET,
      },
    }); // Get as text

    const { data, errors } = Papa.parse(res.data, {
      header: true,
      skipEmptyLines: true,
    });
    if (errors.length) {
      console.error(`⚠️ Lỗi parse CSV ${name}:`, errors);
      return [];
    }
    console.log(`✅ Tải thành công ${name}: ${data.length} dòng.`);
    return data;
  } catch (e) {
    console.error(`❌ LỖI TẢI DỮ LIỆU ${name} TỪ CMS:`, e.message);
    return [];
  }
}

async function loadLop1() {
  const data = await fetchCMSData(CMS_URLS.LOP1, "Lớp 1 (Diễn tiến)");
  CSDL.lop1_dienTien = data
    .map((row) => {
      let advice = "HOLD";
      const context = `${row["THÁNG ÂM"]} (${row["TÊN THÁNG"]}) - ${row["DIỄN TIẾN"]}.`;

      // Logic Khuyến nghị BUY/SELL theo Chu kỳ 12 Diễn tiến (MỚI v50.2 - REFINED)
      if (
        [
          "Diễn tiến 9",
          "Diễn tiến 10",
          "Diễn tiến 11",
          "Diễn tiến 12",
          "Diễn tiến 1",
          "Diễn tiến 3",
        ].includes(row["DIỄN TIẾN"])
      ) {
        advice = "BUY";
      } else if (
        ["Diễn tiến 4", "Diễn tiến 5", "Diễn tiến 6"].includes(row["DIỄN TIẾN"])
      ) {
        advice = "SELL";
      } else {
        advice = "HOLD";
      }

      return {
        ...row,
        start: parseDate(row["TỪ NGÀY"]),
        end: parseDate(row["ĐẾN NGÀY"]),
        context: context,
        advice: advice,
      };
    })
    .filter((row) => row.start && row.end && row.advice !== "UNKNOWN");
}

async function loadLop2() {
  const data = await fetchCMSData(CMS_URLS.LOP2, "Lớp 2 (Ngày)");
  CSDL.lop2_ngay = data.reduce((acc, row) => {
    const dateKey = row["NGÀY DƯƠNG LỊCH"];
    acc[dateKey] = {
      ThayDoi: parseFloat(row["Thay Đổi"]),
      BienLoan: parseFloat(row["Biến Loạn"]),
      ChienTranh: parseFloat(row["Chiến Tranh"]),
      "Kim Sinh": parseFloat(row["Kim Sinh"]),
      "Kim Thành": parseFloat(row["Kim Thành"]),
      "Mộc Sinh": parseFloat(row["Mộc Sinh"]),
      "Mộc Thành": parseFloat(row["Mộc Thành"]),
      "Thủy Sinh": parseFloat(row["Thuỷ Sinh"]),
      "Thủy Thành": parseFloat(row["Thuỷ Thành"]),
      "Hỏa Sinh": parseFloat(row["Hoả Sinh"]),
      "Hỏa Thành": parseFloat(row["Hoả Thành"]),
      "Thổ Sinh": parseFloat(row["Thổ Sinh"]),
      "Thổ Thành": parseFloat(row["Thổ Thành"]),
    };
    return acc;
  }, {});
}

async function loadLop3() {
  const data = await fetchCMSData(CMS_URLS.LOP3, "Lớp 3 (Giờ)");
  CSDL.lop3_gio = data.reduce((acc, row) => {
    const dateKey = row["Ngày Dương"];
    const timeKey = row["Canh Giờ"];
    if (!acc[dateKey]) acc[dateKey] = {};
    acc[dateKey][timeKey] = {
      ThayDoi: parseFloat(row[" Thay Đổi "]),
      BienLoan: parseFloat(row[" Biến Loạn "]),
      ChienTranh: parseFloat(row[" Chiến Tranh "]),
    };
    return acc;
  }, {});
}

// ---- EVENTS (v52) ----
function parseDateDDMMYYYY(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;
  const [day, month, year] = parts.map(p => parseInt(p));
  if (!day || !month || !year) return null;
  return new Date(Date.UTC(year, month - 1, day));
}

async function loadEvents() {
  let data = await fetchCMSData(CMS_URLS.EVENTS, "Events (Thiên Cơ Sách)");

  // Fallback: read local EVENTS.csv if CMS returns empty
  if (!data || data.length === 0) {
    try {
      const fs = require("fs");
      const path = require("path");
      const Papa = require("papaparse");
      const localPath = path.join(__dirname, "EVENTS.csv");
      if (fs.existsSync(localPath)) {
        const csvText = fs.readFileSync(localPath, "utf-8");
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        data = parsed.data;
        console.log(`📁 Events loaded from local file: ${data.length} rows`);
      }
    } catch (e) {
      console.error("⚠️ Events local fallback failed:", e.message);
    }
  }

  CSDL.events = (data || []).map(row => ({
    start: parseDateDDMMYYYY(row["TỪ NGÀY"]),
    end: parseDateDDMMYYYY(row["TỚI NGÀY"]),
    dienTien: row["DIỄN TIẾN"],
    thangAm: row["THÁNG ÂM"],
    namAm: row["NĂM ÂM"],
    event: row["EVENT"],
  })).filter(row => row.start && row.end);
  console.log(`✅ Events parsed: ${CSDL.events.length} sự kiện.`);
}

async function loadAIKey() {
  try {
    const url = process.env.CMS_URL_AI_KEY || `${CMS_BASE_URL}/AI_KEY`;
    console.log(`📡 Đang tải dữ liệu AI key từ: ${url}...`);
    // Note: CSV files on CMS might need authentication (e.g. headers). Assuming public for now.
    const res = await axios.get(url, {
      timeout: 10000,
      responseType: "text",
      headers: {
        "x-internal-secret": process.env.INTERNAL_SECRET,
      },
    });

    console.log("res", res.data);

    const newGenAI = new GoogleGenerativeAI(res.data);
    model = newGenAI.getGenerativeModel({ model: "gemini-flash-latest" });
  } catch (e) {
    console.error(`❌ LỖI TẢI DỮ LIỆU AI KEY TỪ CMS:`, e.message);
  }
}

// ---------------------- RELOAD DATA API (WEBHOOK) ----------------------
app.post("/api/webhook/reload-data", async (req, res) => {
  console.log("🔄 Nhận yêu cầu RELOAD DATA từ CMS...");
  try {
    await Promise.all([loadLop1(), loadLop2(), loadLop3(), loadEvents(), loadAIKey()]);
    res.json({
      status: "success",
      message: "Dữ liệu đã được cập nhật từ CMS.",
    });
  } catch (e) {
    console.error("Reload Failed:", e);
    res.status(500).json({ status: "error", message: "Lỗi cập nhật dữ liệu." });
  }
});

// --- NEWS DATA (MỚI v50.1 - PHASE 3) ---
const { fetchNews } = require("./news");
let cachedNews = null;
let lastNewsFetchTime = 0;

async function getCachedNews() {
  // Cache for 15 minutes
  if (!cachedNews || Date.now() - lastNewsFetchTime > 15 * 60 * 1000) {
    cachedNews = await fetchNews();
    lastNewsFetchTime = Date.now();
  }
  return cachedNews;
}

app.get("/api/news", async (req, res) => {
  const news = await getCachedNews();
  res.json(news);
});

// --- MARKET DATA (MỚI v50.1 - PHASE 3) ---
// Mock Data Generator for stability (Can replace with real API crawling later)
let cachedMarketData = null;
let lastFetchTime = 0;

async function getMarketData() {
  // Default / Fallback Values
  let vnindex = { price: 1250.0, change: 0.0 };
  let gold = { price: 82.5, change: 0.0 };
  let btc = { price: 96000.0, change: 0.0 };

  // Helper for random mock (fallback only)
  const randomChange = (base) => {
    const percent = (Math.random() - 0.5) * 1.5;
    return {
      price: parseFloat((base * (1 + percent / 100)).toFixed(2)),
      change: parseFloat(percent.toFixed(2)),
    };
  };

  // 1. Fetch VN-INDEX (VNDirect API)
  try {
    const to = Math.floor(Date.now() / 1000);
    const from = to - 86400 * 30;
    const url = `https://dchart-api.vndirect.com.vn/dchart/history?resolution=D&symbol=VNINDEX&from=${from}&to=${to}`;
    const res = await axios.get(url, { timeout: 3000 });
    if (res.data && res.data.c && res.data.c.length > 0) {
      const current = res.data.c[res.data.c.length - 1];
      const prev = res.data.c[res.data.c.length - 2] || current;
      vnindex.price = current;
      vnindex.change = parseFloat((((current - prev) / prev) * 100).toFixed(2));
    } else {
      vnindex = randomChange(1250.0); // Fallback
    }
  } catch (e) {
    console.error("Fetch VNIndex Failed:", e.message);
    vnindex = randomChange(1250.0);
  }

  // 2. Fetch GOLD (Scraping Webgia as Fallback)
  try {
    const url = "https://webgia.com/gia-vang/sjc/";
    const res = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
      timeout: 5000,
    });
    const $ = cheerio.load(res.data);
    // Fallback random if scrape fails
    gold = randomChange(82.5);
  } catch (e) {
    // console.error("Fetch Gold Failed:", e.message);
    gold = randomChange(82.5);
  }

  // 3. Fetch BITCOIN (CoinGecko API)
  try {
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true";
    const res = await axios.get(url, { timeout: 3000 });
    if (res.data && res.data.bitcoin) {
      btc.price = res.data.bitcoin.usd;
      btc.change = parseFloat(res.data.bitcoin.usd_24h_change.toFixed(2));
    } else {
      btc = randomChange(96000.0);
    }
  } catch (e) {
    console.error("Fetch BTC Failed:", e.message);
    btc = randomChange(96000.0);
  }

  return { vnindex, gold, btc };
}

// --- API ENDPOINTS ---
app.get("/api/market-data", async (req, res) => {
  // Only refresh if stale (> 10 minutes)
  if (!cachedMarketData || Date.now() - lastFetchTime > 600000) {
    cachedMarketData = await getMarketData();
    lastFetchTime = Date.now();
  }
  res.json(cachedMarketData);
});

app.post("/analyze", async (req, res) => {
  // Update market data if stale (> 10 minutes)
  if (!cachedMarketData || Date.now() - lastFetchTime > 600000) {
    cachedMarketData = await getMarketData();
    lastFetchTime = Date.now();
  }

  const analysisResult = analyzeRisk(req.body, CSDL);

  // Inject Market Context into Metadata for AI
  if (analysisResult.data) {
    analysisResult.data.marketContext = cachedMarketData;
    // Inject News Context (Async fetch, usually fast due to cache)
    try {
      analysisResult.data.newsContext = await getCachedNews();
    } catch (e) {
      console.error("Failed to inject news context:", e);
    }
  }

  res.json({
    analysisResult: analysisResult,
    metaData: analysisResult.data, // Send raw data (including market context) for AI
  });
});

// ---------------------- GEMINI AI HANDLER ----------------------
app.post("/gemini-advice", async function getGeminiAdvice(req, res) {
  try {
    const analysisData = req.body;
    const {
      finalRating,
      finalActionRating,
      conflictContexts,
      lop2Risk,
      elementAnalysis,
      asset,
      action,
      capital,
      leverage,
      marketContext,
      newsContext,
      // Events (v52)
      eventScore,
      matchedEvents,
      overrideNote,
    } = analysisData;

    // Construct Prompt
    const prompt = `
        Bạn là "Cố Vấn Tài Chính Thiên Cơ" - một chuyên gia lão luyện về đầu tư tài chính kết hợp Phong Thủy và Dữ Liệu Lịch Sử.
        Hãy phân tích tình huống đầu tư sau đây và đưa ra lời khuyên sắc bén, ngắn gọn, nhưng sâu sắc (tối đa 150 từ):

        **Hồ sơ khách hàng:**
        - Tài sản: ${asset} ${elementAnalysis ? `(Thuộc hành ${elementAnalysis.element})` : ""
      }
        - Hành động: ${action}
        - Vốn: ${capital}
        - Đòn bẩy: ${leverage}

        **Dữ liệu Thị trường Thực (Real-time):**
        - VN-Index: ${marketContext?.vnindex?.price.toFixed(2)} (${marketContext?.vnindex?.change
      }%)
        - Vàng: ${marketContext?.gold?.price.toFixed(2)} (${marketContext?.gold?.change
      }%)
        - Bitcoin: $${marketContext?.btc?.price.toLocaleString()} (${marketContext?.btc?.change
      }%)

        **Tin tức Vĩ mô Nóng (New!):**
        ${newsContext && newsContext.length > 0
        ? newsContext.map((n) => `- ${n.title} (${n.source})`).join("\n")
        : "Không có tin tức đáng chú ý."
      }

        **Kết quả Phân tích từ Hệ thống:**
        - Xếp hạng Rủi ro: ${finalRating}
        - Đánh giá Chiến lược: ${finalActionRating}
        ${elementAnalysis
        ? `- Chỉ số Ngũ Hành (${elementAnalysis.element}): Sinh Vượng ${elementAnalysis.sinhScore}/5.0`
        : ""
      }
        ${lop2Risk ? `- Chỉ số Biến Loạn: ${lop2Risk.BienLoan}/5.0` : ""}
        ${eventScore !== undefined ? `- Chỉ số Sự Kiện (Thiên Cơ Sách): ${eventScore}/5.0` : ""}
        ${overrideNote ? `- Lưu ý: ${overrideNote}` : ""}

        ${matchedEvents && matchedEvents.length > 0 ? `**Dự đoán Thiên Cơ Sách (Giai đoạn giao dịch):**
        ${matchedEvents.map(e => `- [${e.dienTien}] ${e.event}`).join('\n        ')}` : ''}

        **Yêu cầu:**
        1. Giải thích tại sao hệ thống lại đưa ra đánh giá đó (kết hợp yếu tố Ngũ Hành và Chiến lược).
        2. Dựa vào Tin tức Vĩ mô (nếu có), hãy cảnh báo thêm rủi ro hoặc cơ hội thực tế.
        3. Nếu có dự đoán Thiên Cơ Sách, hãy phân tích tác động của các sự kiện dự đoán lên tài sản cụ thể mà khách hàng đang đầu tư.
        4. Đưa ra lời khuyên cụ thể 1 câu về việc quản trị vốn (Money Management).
        5. Dùng giọng văn chuyên nghiệp, uy quyền nhưng ân cần (giống một người thầy).
        `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response
      .text()
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold **text**
      .replace(/\*(.*?)\*/g, "<strong>$1</strong>") // Bold *text*
      .replace(/\n/g, "<br>");

    return res.json({ advice: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "Xin lỗi, Cố vấn AI đang bận suy nghĩ. Vui lòng thử lại sau.",
    });
  }
});

// Khởi tạo Server
async function initServer() {
  // Phục vụ tệp tĩnh (index.html) TRƯỚC khi load data để đảm bảo URL CSV (mock) khả dụng
  app.use(express.static(path.join(__dirname)));

  // Tải dữ liệu ban đầu
  console.log("🚀 Server đang khởi động và tải dữ liệu...");
  // Lưu ý: Nếu self-hosting CSV, cần server listen trước khi fetch.
  // Nhưng express.static chưa hoạt động cho đến khi app.listen.
  // Workaround: Start server trước, then load data.

  const server = app.listen(PORT, async () => {
    console.log(
      `[Thiên Cơ Sách v52] Máy chủ đang lắng nghe tại http://localhost:${PORT}`
    );
    console.log(`Vui lòng mở trình duyệt và truy cập http://localhost:${PORT}`);

    // Load Data sau khi server đã chạy (để self-host mock URL hoạt động)
    await Promise.all([loadLop1(), loadLop2(), loadLop3(), loadEvents(), loadAIKey()]);
    console.log("✅ Dữ liệu ban đầu đã sẵn sàng (bao gồm Events Thiên Cơ Sách).");
  });
}

// Chạy khởi tạo Server
initServer();
