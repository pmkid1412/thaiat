
// han_month_week_day_v1.js
// Daily/Weekly/Monthly advice layer for MVP (ngôn ngữ đời thường)
// This module does NOT compute placements itself; it consumes timeline objects
// produced by core engine (Đại vận / Tiểu vận / Lưu niên / Lưu nguyệt / Lưu nhật).
//
// Expected input shapes are duck-typed and optional.
// You can integrate with any engine by providing the adapters described below.

import { DIA_CHI, CHI_INDEX } from "./constants_mappings.js";

const LEVEL_SCORE = { info: 0, low: 1, neutral: 2, warn: 3, danger: 4, good: -1 };
const DEFAULT_WEEK_LABELS = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];

function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

function scoreFromWarnings(warnings = []) {
  let s = 0;
  for (const w of warnings) {
    const lv = (w && (w.level || w.riskLevel || w.severity)) || "neutral";
    s += LEVEL_SCORE[lv] ?? 0;
  }
  return s;
}

function pickTone(score) {
  if (score >= 5) return "danger";
  if (score >= 3) return "warn";
  if (score >= 1) return "neutral";
  if (score <= -1) return "good";
  return "info";
}

function friendlySummary(tone) {
  switch (tone) {
    case "good": return "Tháng này khá thuận, dễ có cơ hội tốt.";
    case "neutral": return "Tháng này nhìn chung ổn, cứ đi đều là đẹp.";
    case "warn": return "Tháng này có vài điểm nhạy cảm, nên cẩn trọng hơn bình thường.";
    case "danger": return "Tháng này khá căng, ưu tiên an toàn và tránh quyết định liều.";
    default: return "Tháng này bình thường, giữ nhịp là được.";
  }
}

function getCategorizedAdvice(tone) {
  switch (tone) {
    case "good":
      return {
        health: "Sức khỏe ổn định, tinh thần phấn chấn.",
        work: "Công việc thuận lợi, nên tranh thủ mở rộng hoặc chốt hợp đồng.",
        love: "Tình cảm hài hòa, dễ có tin vui hoặc cuộc gặp gỡ thú vị."
      };
    case "neutral":
      return {
        health: "Sức khỏe bình thường, chú ý giữ nhịp sinh hoạt.",
        work: "Công việc đều đều, cứ làm theo kế hoạch cũ là ổn.",
        love: "Tình cảm bình ổn, không có biến động lớn."
      };
    case "warn":
      return {
        health: "Chú ý đi lại, tránh làm việc quá sức gây mệt mỏi.",
        work: "Cẩn trọng giấy tờ, tránh tranh cãi với đồng nghiệp/đối tác.",
        love: "Dễ có hiểu lầm nhỏ, nên nhường nhịn để giữ hòa khí."
      };
    case "danger":
      return {
        health: "Đề phòng va chạm xe cộ hoặc bệnh cũ tái phát.",
        work: "Ưu tiên an toàn, không nên quyết định việc lớn hay đầu tư mạo hiểm.",
        love: "Dễ có xung đột gay gắt, cần kiềm chế cái tôi tối đa."
      };
    default:
      return {
        health: "Giữ gìn sức khỏe, ăn uống điều độ.",
        work: "Làm việc cẩn thận, tránh sai sót nhỏ.",
        love: "Dành thời gian quan tâm đến người thân."
      };
  }
}

/**
 * Build monthly advice.
 *
 * @param {Object} yearContext - duck-typed object for the year.
 *   Suggested fields:
 *     - months: Array<MonthContext>
 *     - getMonth(i): MonthContext
 * MonthContext suggested fields:
 *     - index (1-12)
 *     - warnings: Array
 *     - goodTags: Array<string>
 *     - badTags: Array<string>
 *     - dauEffect: { phaseBias: "nua_dau"|"nua_sau", phucWhen: boolean }
 *
 * @returns {Array} list of month advice objects
 */
export function buildMonthlyAdvice(yearContext) {
  const months = yearContext?.months
    || (typeof yearContext?.getMonth === "function"
      ? Array.from({ length: 12 }, (_, i) => yearContext.getMonth(i + 1))
      : []);

  const out = [];
  for (let i = 0; i < months.length; i++) {
    const m = months[i] || {};
    const idx = m.index || (i + 1);
    const warnings = m.warnings || [];
    const score = scoreFromWarnings(warnings);
    const tone = pickTone(score);
    out.push({
      index: idx,
      tone,
      score,
      summary: friendlySummary(tone),
      summary: friendlySummary(tone),
      advice: getCategorizedAdvice(tone),
      goodTags: m.goodTags || [],
      badTags: m.badTags || [],
      dauEffect: m.dauEffect || null,
      rawWarnings: warnings
    });
  }
  return out;
}

/**
 * Build weekly advice inside a month.
 * Strategy (MVP):
 *  - Inherit month tone.
 *  - If dauEffect.phaseBias exists, increase sensitivity in first/second half.
 *  - If month has rawWarnings with "danger/warn", spread them to biased weeks.
 */
export function buildWeeklyAdvice(monthAdvice) {
  const weeks = [];
  const baseTone = monthAdvice.tone;
  const baseScore = monthAdvice.score || 0;
  const phaseBias = monthAdvice.dauEffect?.phaseBias; // "nua_dau" or "nua_sau"

  for (let w = 0; w < 4; w++) {
    let s = baseScore;

    if (phaseBias === "nua_dau" && w < 2) s += 1;
    if (phaseBias === "nua_sau" && w >= 2) s += 1;

    // If there are very heavy warnings, add a bit more intensity to biased weeks
    if (monthAdvice.rawWarnings?.some(x => (x.level || x.riskLevel) === "danger")) {
      if ((phaseBias === "nua_dau" && w < 2) || (phaseBias === "nua_sau" && w >= 2)) s += 1;
    }

    const tone = pickTone(s);
    weeks.push({
      index: w + 1,
      label: DEFAULT_WEEK_LABELS[w],
      tone,
      summary: (tone === "good") ? "Tuần này khá thuận, làm gì cũng dễ trôi."
        : (tone === "warn") ? "Tuần này nhạy cảm hơn, nên đi chậm chắc."
          : (tone === "danger") ? "Tuần này căng, ưu tiên an toàn."
            : "Tuần này bình thường, giữ nhịp là ổn.",
      advice: getCategorizedAdvice(tone)
    });
  }

  return weeks;
}

/**
 * Build daily signal for a specific date.
 *
 * @param {Object} dayContext - duck-typed object for that day
 *    Suggested fields:
 *      - warnings: Array
 *      - baselineTone: "good"|"neutral"|"warn"|"danger"
 * @param {Object} weekAdvice - optional
 * @param {Object} monthAdvice - optional
 */
export function buildDailySignal(dayContext = {}, weekAdvice = null, monthAdvice = null) {
  const warnings = dayContext.warnings || [];
  const dayScore = scoreFromWarnings(warnings);

  let s = dayScore;

  // inherit baseline from week/month if present
  const baseTone = dayContext.baselineTone || weekAdvice?.tone || monthAdvice?.tone;
  if (baseTone === "good") s -= 1;
  if (baseTone === "warn") s += 1;
  if (baseTone === "danger") s += 2;

  const tone = pickTone(s);

  const signal =
    tone === "good" ? "✅ Thuận"
      : tone === "warn" ? "⚠️ Cẩn trọng"
        : tone === "danger" ? "⚠️⚠️ Rất căng"
          : "🟰 Bình thường";

  const summary =
    tone === "good" ? "Hôm nay khá thuận, phù hợp làm việc quan trọng."
      : tone === "warn" ? "Hôm nay dễ phát sinh va chạm hoặc sai sót nhỏ."
        : tone === "danger" ? "Hôm nay căng, ưu tiên an toàn và kiềm chế."
          : "Hôm nay bình thường, làm việc theo nhịp là ổn.";

  return {
    tone,
    signal,
    summary,
    advice: getCategorizedAdvice(tone),
    rawWarnings: warnings
  };
}

export function buildHanContexts(chart, cal) {
  // 1. Yearly Context (Lưu Niên)
  // Use current year context if available, otherwise fallback to birth year (which is usually not what we want for predictions, but safe fallback)
  const yearChi = cal.current?.yearBranch || cal.yearBranch;
  const yearCan = cal.current?.yearStem || cal.yearStem;
  const yearNum = cal.current?.lunar?.year || cal.lunar.year;

  const yearPalace = Object.values(chart.palaces).find(p => p.chi === yearChi);
  const yearStars = yearPalace ? yearPalace.stars : [];

  const yearlyWarnings = [];

  // Basic warning logic for Year
  if (yearStars.includes("Thái Tuế")) yearlyWarnings.push({ level: "info", code: "THAI_TUE", reason: "Năm tuổi (Thái Tuế chiếu)", advice: ["Cẩn trọng lời ăn tiếng nói", "Giữ mình"] });
  if (yearStars.includes("Tang Môn") || yearStars.includes("Bạch Hổ")) yearlyWarnings.push({ level: "warn", code: "TANG_HO", reason: "Tang Môn / Bạch Hổ chiếu", advice: ["Chú ý sức khỏe", "Đề phòng tai nạn nhỏ"] });
  if (yearStars.includes("Thiên Khốc") || yearStars.includes("Thiên Hư")) yearlyWarnings.push({ level: "low", code: "KHOC_HU", reason: "Thiên Khốc / Thiên Hư", advice: ["Dễ buồn phiền", "Lo âu"] });
  if (yearStars.includes("Song Hao") || yearStars.includes("Đại Hao") || yearStars.includes("Tiểu Hao")) yearlyWarnings.push({ level: "warn", code: "HAO", reason: "Hao tài tốn của", advice: ["Chi tiêu cẩn thận"] });
  if (yearStars.includes("Địa Không") || yearStars.includes("Địa Kiếp")) yearlyWarnings.push({ level: "danger", code: "KHONG_KIEP", reason: "Không Kiếp chiếu", advice: ["Đề phòng mất mát lớn", "Tránh đầu tư mạo hiểm"] });

  // 2. Monthly Contexts (Lưu Nguyệt)
  // Simple logic: Iterate 12 months.
  // Month 1 starts at... (complex logic depending on Nam Phai/Bac Phai).
  // For MVP, let's assume a simple mapping or just random/placeholder for now if logic is too complex to inline.
  // Or better, use the monthBranch from calendar? No, that's birth month.
  // We need the Chi of the months in the current year.
  // Usually Month 1 = Dần (Tiger) for lunar calendar.
  // Let's assume Month 1 = Dần, Month 2 = Mão, etc. for simplicity in this MVP.

  const months = [];
  const startMonthChiIndex = CHI_INDEX["Dần"]; // 2

  for (let i = 0; i < 12; i++) {
    const monthChiIndex = (startMonthChiIndex + i) % 12;
    const monthChi = DIA_CHI[monthChiIndex];
    const monthPalace = Object.values(chart.palaces).find(p => p.chi === monthChi);
    const monthStars = monthPalace ? monthPalace.stars : [];

    const monthWarnings = [];
    // Copy yearly warnings logic but lower severity or specific checks
    if (monthStars.includes("Địa Không") || monthStars.includes("Địa Kiếp")) monthWarnings.push({ level: "warn", code: "KHONG_KIEP_M", reason: "Tháng có Không Kiếp", advice: ["Cẩn thận tiền bạc"] });
    if (monthStars.includes("Đà La") || monthStars.includes("Kình Dương")) monthWarnings.push({ level: "low", code: "KINH_DA_M", reason: "Tháng có Kình Đà", advice: ["Tránh va chạm"] });

    months.push({
      index: i + 1,
      chi: monthChi,
      warnings: monthWarnings,
      goodTags: monthStars.includes("Thiên Hỷ") ? ["Vui vẻ"] : [],
      badTags: monthStars.includes("Thiên Hình") ? ["Thị phi"] : []
    });
  }

  // 3. Daily Context (Lưu Nhật)
  const dayChi = cal.current?.dayBranch || cal.dayBranch;
  const dayPalace = Object.values(chart.palaces).find(p => p.chi === dayChi);
  const dayStars = dayPalace ? dayPalace.stars : [];
  const dayWarnings = [];

  // Basic warning logic for Day (reuse similar logic to Year/Month but maybe lighter)
  if (dayStars.includes("Không Kiếp") || dayStars.includes("Địa Không") || dayStars.includes("Địa Kiếp")) {
    dayWarnings.push({ level: "warn", code: "KHONG_KIEP_D", reason: "Ngày có Không Kiếp", advice: ["Cẩn thận tiền bạc", "Tránh quyết định lớn"] });
  }
  if (dayStars.includes("Thiên Hình") || dayStars.includes("Quan Phủ")) {
    dayWarnings.push({ level: "warn", code: "HINH_PHU_D", reason: "Ngày có Hình/Phủ", advice: ["Cẩn thận giấy tờ", "Tránh tranh cãi"] });
  }
  if (dayStars.includes("Hóa Kỵ")) {
    dayWarnings.push({ level: "warn", code: "HOA_KY_D", reason: "Ngày có Hóa Kỵ", advice: ["Dễ hiểu lầm", "Thị phi miệng tiếng"] });
  }
  if (dayStars.includes("Lộc Tồn") || dayStars.includes("Hóa Lộc")) {
    // Good stars can reduce bad tone or be used for goodTags
  }

  const dayContext = {
    chi: dayChi,
    stars: dayStars,
    warnings: dayWarnings,
    baselineTone: dayWarnings.length > 0 ? "warn" : "neutral"
  };

  return {
    yearly: {
      year: yearNum,
      can: yearCan,
      chi: yearChi,
      warnings: yearlyWarnings
    },
    months: months,
    day: dayContext
  };
}

export default {
  buildMonthlyAdvice,
  buildWeeklyAdvice,
  buildDailySignal,
  buildHanContexts
};
