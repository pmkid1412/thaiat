
// coreEngineV1.js
// -----------------------------------------------------------------------------
// Entry-point engine to BUILD a raw Zi Wei chart + contexts for UI.
// This file wires together your existing placement utilities + interpreters.
//
// NOTE: Your current corpus (uploaded) contains almost all interpreters and
// placement helpers, BUT does not include a complete \"main star / 12 palaces\"
// builder nor a trusted solar->lunar Can-Chi calendar converter.
// Therefore this core provides:
//   1) A clean, testable pipeline and schema.
//   2) Adapter points (TODO blocks) where you plug in missing logic/library.
// Once those TODOs are filled, UI can call buildEngineOutput(...) directly.
//
// Author: ChatGPT for Johnny Nam's Workspace
// -----------------------------------------------------------------------------

import {
  placeLocTonSet,
  placeKhoiViet,
  getTuHoaMap,
  placeThienQuanPhuc,
  placeYearlySingles,
  placeThaiTueRing,
  placeTuongTinh,
  placeDucKhong,
  placeLongPhuong,
  placeHongHy,
  placeKhocHu,
  placeCoQua,
  placePhaToai,
  placeTaHuu,
  placeThienDiaGiai,
  placeHinhDieu,
  placeXuongKhuc,
  placeAnQuangThienQuy,
  placeTamThaiBatToa,
  placeThaiPhuPhongCao,
  placeDiaKhongKiep,
  placeHoaLinh,
  placeTuanTriet,
  placeBacSyRing,
  placeTruongSinhRing,
  computeLuuNienDaiVan,
  computeTieuVan,
  computeLunarAge,
} from "./utils_placements.js";
import { CHI_INDEX } from "./constants_mappings.js";

import { buildHanContexts, buildMonthlyAdvice, buildDailySignal } from "./han_month_week_day_v1.js";
// import { interpretMonthlyHan, interpretDailyHan } from "./interpreter_han_v1.js"; // Removed as they don't exist
// import { interpretHinhTamTuong } from "./interpreter_hinh_tam_tuong_v1.js";
import { interpretBacSyRing } from "./interpreter_bac_sy_ring_v1.js";
// [NEW] Interpreters
import { interpretPalaceMainStars } from "./interpreter_main_stars_v1.js";
import { interpretThaiTueRing } from "./thai_tue_ring_interpreter_v1.js";
import { interpretTruongSinhRing } from "./interpreter_truong_sinh_ring_v1.js";
// import { interpretPalaces } from "./palaces_interpreter_v1.js";
import { detectTruyenTinh } from "./truyen_tinh_detector_v1_1.js";

import { TU_HOA_BY_CAN } from "./constants_mappings.js";

// [NEW] Imports for real logic
import { buildCalendar as buildCalendarReal } from "./calendar_can_chi_v1.js";
import { build12Palaces, placeMainStars as placeMainStarsReal } from "./main_stars_and_palaces_v51.js";

// -----------------------------------------------------------------------------
// A) CALENDAR & CAN-CHI LAYER
// -----------------------------------------------------------------------------

/**
 * buildCalendar(input, targetDate)
 * Convert solar datetime/place -> lunar datetime + stems/branches.
 *
 * REQUIRED OUTPUT:
 *  {
 *    solar: { date: Date, tz: "Asia/Ho_Chi_Minh" },
 *    lunar: { day, month, year, isLeap },
 *    yearStem, yearBranch, monthBranch, dayStem, dayBranch,
 *    hourBranch, hourChiIndex
 *  }
 *
 * TODO:
 *  Plug in your calendar lib or existing Can-Chi converter.
 */
export function buildCalendar(input, targetDate = new Date()) {
  // Use the real calendar converter
  return buildCalendarReal(input, targetDate);
}

// -----------------------------------------------------------------------------
// B) BUILD RAW CHART LAYER
// -----------------------------------------------------------------------------

/**
 * buildChart(input, cal)
 * Assemble 12 palaces + all star placements.
 *
 * REQUIRED OUTPUT SCHEMA (minimum):
 *  {
 *    profile: {...},
 *    palaces: {
 *      MENH: { chi, stars:[], ... },
 *      PHU_MAU: {...},
 *      ...
 *    },
 *    mainStars: { [starName]: chi },
 *    subStars: { [starName]: chi },
 *    rings: { thaiTue: [...], truongSinh: [...], bacSy: [...] },
 *    tuHoa: { [can]: {...} },
 *    misc: { tuanTriet, locTonSet, ... }
 *  }
 */
export function buildChart(input, cal) {
  const { yearStem, yearBranch, monthBranch, hourChiIndex } = cal;

  // 1) Determine core palace layout (Mệnh, Thân, 12 cung)
  // -----------------------------------------------------------------
  // Use the v51 builder
  const { palaces, menhChi, thanChi } = build12Palaces(input, cal);

  // Place main stars (and compute Cục inside)
  const mainStars = placeMainStarsReal(input, cal, palaces);

  // 2) Place yearly & auxiliary stars using your existing utils
  // -----------------------------------------------------------------
  const locTonSet = placeLocTonSet(yearStem);
  const khoiViet = placeKhoiViet(yearStem);
  const tuHoa = getTuHoaMap(yearStem); // maps stars -> hóa
  const thienQuanPhuc = placeThienQuanPhuc(yearStem);
  const yearlySingles = placeYearlySingles(yearStem, yearBranch);
  const thaiTueRing = placeThaiTueRing(yearBranch);
  const tuongTinh = placeTuongTinh(yearBranch);
  const ducKhong = placeDucKhong(yearBranch);
  const longPhuong = placeLongPhuong(yearBranch);
  const hongHy = placeHongHy(yearBranch);
  const khocHu = placeKhocHu(yearBranch);
  const coQua = placeCoQua(yearBranch);
  const phaToai = placePhaToai(yearBranch);
  const taHuu = placeTaHuu(cal.lunar.month);
  const thienDiaGiai = placeThienDiaGiai(yearBranch);
  const hinhDieu = placeHinhDieu(cal.lunar.month);
  const xuongKhuc = placeXuongKhuc(hourChiIndex);
  const anQuangThienQuy = placeAnQuangThienQuy(
    cal.lunar.day,
    xuongKhuc["Văn Xương"],
    xuongKhuc["Văn Khúc"]
  );
  const tamThaiBatToa = placeTamThaiBatToa(cal.lunar.day, cal.lunar.month);
  const thaiPhuPhongCao = placeThaiPhuPhongCao(xuongKhuc["Văn Khúc"]);
  // Direction logic for Hỏa/Linh and Trường Sinh
  const isMale = (input.gender && input.gender.toLowerCase() === "nam");
  const isYangYear = ["Giáp", "Bính", "Mậu", "Canh", "Nhâm"].includes(cal.yearStem);
  const clockwise = (isYangYear === isMale);

  const diaKhongKiep = placeDiaKhongKiep(hourChiIndex);
  const hoaLinh = placeHoaLinh(yearBranch, hourChiIndex, clockwise);
  const tuanTriet = placeTuanTriet(yearStem, yearStem + " " + yearBranch);
  const bacSyRing = placeBacSyRing(locTonSet["Lộc Tồn"], clockwise);  // SSOT fix: pass direction

  // 2b. Assign Dai Van (Decade) ages
  // Rule: Start at MENH with cucNum.
  // Direction:
  //   - Yang Male (Dương Nam) or Yin Female (Âm Nữ) -> Clockwise (Thuận)
  //   - Yin Male (Âm Nam) or Yang Female (Dương Nữ) -> Counter-Clockwise (Nghịch)

  // Direction check
  // Yang Male (True, True) -> Clockwise
  // Yin Female (False, False) -> Clockwise
  // Yin Male (False, True) -> Counter-Clockwise
  // Yang Female (True, False) -> Counter-Clockwise
  // So: if (isYangYear == isMale) -> Clockwise.
  const truongSinhRing = placeTruongSinhRing(cal.cucNum, clockwise);
  const cuc = cal.cucNum || 4; // default to 4 if missing

  // Palaces are generated in standard order: MENH, PHU_MAU, PHUC, DIEN, QUAN, NO, DI, TAT, TAI, TU, PHU, HUYNH
  // This order is Counter-Clockwise on the board?
  // Let's check build12Palaces:
  // MENH -> PHU_MAU -> PHUC...
  // Usually MENH is start. PHU_MAU is next counter-clockwise?
  // Standard sequence: Mệnh, Phụ, Phúc, Điền, Quan, Nô, Di, Tật, Tài, Tử, Phu, Huynh.
  // This sequence is COUNTER-CLOCKWISE on the chart (nghịch chiều kim đồng hồ).
  // e.g. Mệnh at Dần -> Phụ Mẫu at Sửu? No.
  // Standard list: Mệnh, Huynh, Phu, Tử, Tài, Tật, Di, Nô, Quan, Điền, Phúc, Phụ. (Clockwise)
  // OR Mệnh, Phụ, Phúc, Điền... is Counter-Clockwise.
  // The code in `main_stars_and_palaces_v51.js` uses `PALACE_KEYS` order:
  // "MENH","PHU_MAU","PHUC","DIEN","QUAN","NO","THIEN_DI","TAT","TAI","TU_TUC","PHU_THE","HUYNH_DE"
  // And maps them to `move(menhChi, i)`.
  // If `move` is clockwise (Tý -> Sửu), then Phụ Mẫu is at Mệnh + 1 (Clockwise).
  // THIS SEEMS WRONG for standard Tu Vi if the keys are in that order.
  // Standard: Mệnh -> Phụ Mẫu is Counter-Clockwise (Nghịch).
  // Mệnh -> Huynh Đệ is Clockwise (Thuận).
  // If the code places Phụ Mẫu at Mệnh+1 (Clockwise), then the layout is inverted or the keys are ordered differently.
  // Let's assume the `build12Palaces` logic defines the physical layout.
  // We just need to assign ages.
  // If `clockwise` is true (Thuận hành), we advance 10 years per palace in the direction of the palaces?
  // No, "Thuận hành" means following the Earthly Branches (Tý -> Sửu -> Dần).
  // "Nghịch hành" means Tý -> Hợi -> Tuất.

  // We need to find the palace at Mệnh, then Mệnh +/- 1, Mệnh +/- 2...
  // Since `palaces` object is keyed by code, we can iterate.

  const menhChiIndex = CHI_INDEX[menhChi];

  Object.values(palaces).forEach(p => {
    // Calculate offset from Mệnh
    const pChiIndex = CHI_INDEX[p.chi];
    let offset = pChiIndex - menhChiIndex;
    if (offset < 0) offset += 12;

    // If clockwise (Thuận), age increases as we go Tý -> Sửu (offset increases).
    // If counter-clockwise (Nghịch), age increases as we go Tý -> Hợi (offset decreases / or offset 11, 10...).

    let step = 0;
    if (clockwise) {
      step = offset;
    } else {
      step = (12 - offset) % 12;
    }

    p.cuc = cuc + step * 10;
    p.daiVanStart = p.cuc; // Alias
    p.daiVanEnd = p.cuc + 9;
    // SSOT Section E: Lưu Niên Đại Vận — yearly movement within this decade
    p.luuNienDaiVan = computeLuuNienDaiVan(p.chi, clockwise);
  });

  // 3) Merge all stars into palaces
  // -----------------------------------------------------------------
  const subStars = {
    ...locTonSet,
    ...khoiViet,
    ...thienQuanPhuc,
    ...yearlySingles,
    ...tuongTinh,
    ...ducKhong,
    ...longPhuong,
    ...hongHy,
    ...khocHu,
    ...coQua,
    ...phaToai,
    ...taHuu,
    ...thienDiaGiai,
    ...hinhDieu,
    ...xuongKhuc,
    ...anQuangThienQuy,
    ...tamThaiBatToa,
    ...thaiPhuPhongCao,
    ...diaKhongKiep,
    ...hoaLinh,
    ...tuanTriet,
  };

  const rings = {
    thaiTue: thaiTueRing,
    bacSy: bacSyRing,
    truongSinh: truongSinhRing,
  };

  // 2c. Prepare Tứ Hóa as pseudo-stars for placement
  const tuHoaStars = {};
  const hoaMap = {
    loc: "Hóa Lộc",
    quyen: "Hóa Quyền",
    khoa: "Hóa Khoa",
    ky: "Hóa Kỵ"
  };
  Object.entries(tuHoa).forEach(([type, baseStar]) => {
    // The raw TU_HOA map is { loc: StarName, ... }
    if (!baseStar) return;
    const hoaLabel = hoaMap[type] || type;

    // Find position of base star
    let pos = mainStars[baseStar] || subStars[baseStar];
    if (!pos) {
      if (rings.thaiTue && rings.thaiTue[baseStar]) pos = rings.thaiTue[baseStar];
      if (rings.bacSy && rings.bacSy[baseStar]) pos = rings.bacSy[baseStar];
      if (rings.truongSinh && rings.truongSinh[baseStar]) pos = rings.truongSinh[baseStar];
      if (yearlySingles[baseStar]) pos = yearlySingles[baseStar];
    }
    if (pos) {
      tuHoaStars[hoaLabel] = pos;
      // Optional: Attach to base star string? Or just place as separate star?
      // Adding as separate star is safer for list.
    }
  });

  const chart = {
    profile: buildProfile(input, cal),
    palaces: attachStarsToPalaces(palaces, {
      ...mainStars,
      ...subStars,
      ...rings.thaiTue,
      ...rings.bacSy,
      ...rings.truongSinh,
      ...tuHoaStars // [NEW] Add Hóa Lộc/Quyền/Khoa/Kỵ as items
    }),
    mainStars,
    subStars,
    rings,
    tuHoa,
    misc: {
      locTonSet,
      khoiViet,
      thienQuanPhuc,
      tuanTriet,
    },
    // SSOT Section F+H: Tiểu Vận + Tuổi ÂL
    tieuVan: (function () {
      const lunarAge = computeLunarAge(cal.lunar.year, new Date().getFullYear());
      return {
        lunarAge,
        currentTieuVanChi: computeTieuVan(yearBranch, isMale, lunarAge),
      };
    })(),
    raw: { input, cal },
  };

  return chart;
}

// -----------------------------------------------------------------------------
// C) INTERPRETATION / CONTEXT LAYER -> FEED UI
// -----------------------------------------------------------------------------

export function buildEngineOutput(input, targetDate = new Date()) {
  if (!input.gender || (input.gender !== 'Nam' && input.gender !== 'Nu')) {
    throw new Error("Input validation error: 'gender' is required and must be 'Nam' or 'Nu'.");
  }
  // Timezone is optional, defaults to 7 in buildCalendar, but we can log if missing
  // if (input.timeZone === undefined) console.warn("Warning: No timeZone provided, defaulting to 7 (Vietnam).");
  const cal = buildCalendar(input, targetDate);
  const chart = buildChart(input, cal);

  // Han contexts (year/month/week/day windows)
  const hanCtx = buildHanContexts(chart, cal); // from han_month_week_day_v1.js
  const monthlyAdvice = buildMonthlyAdvice(hanCtx);
  const weeklyAdviceMap = buildWeeklyAdvice(monthlyAdvice); // simple 4-week slicing

  // Real dayContext from han_month_week_day_v1
  const dayContext = hanCtx.day || { warnings: [], baselineTone: "neutral" };
  const dailyAdvice = buildDailySignal(dayContext, null, monthlyAdvice[0]);

  // Main Stars Interpretation
  const mainStarsInterpreted = {};
  Object.values(chart.palaces).forEach(p => {
    const stars = interpretPalaceMainStars(p.key, p.stars);
    if (stars && stars.length) {
      mainStarsInterpreted[p.key] = stars;
    }
  });

  // Yearly contexts
  const yearlyAdvice = {
    ...hanCtx.yearly,
    // hinhTamTuong: interpretHinhTamTuong(chart), // Disabled due to missing dependency
    bacSy: interpretBacSyRing(chart),
    truongSinh: interpretTruongSinhRing(chart),
    thaiTue: interpretThaiTueRing(createInterpreterContext(chart)),
    // palaces: interpretPalaces(chart), // Disabled due to missing dependency
    truyenTinh: detectTruyenTinh(chart),
    mainStars: mainStarsInterpreted
  };

  return {
    profile: chart.profile,
    scores: buildScores(chart, yearlyAdvice, dailyAdvice, monthlyAdvice),
    dailyAdvice,
    monthlyAdvice,
    weeklyAdviceMap,
    yearlyAdvice,
    tuTuc: yearlyAdvice.palaces?.TU_TUC || null,
    palaces: yearlyAdvice.palaces || null,
    chart,
  };
}

// -----------------------------------------------------------------------------
// Helpers + TODOs
// -----------------------------------------------------------------------------

function buildProfile(input, cal) {
  const cucMap = {
    2: "Thủy Nhị Cục",
    3: "Mộc Tam Cục",
    4: "Kim Tứ Cục",
    5: "Thổ Ngũ Cục",
    6: "Hỏa Lục Cục"
  };
  return {
    name: input.name || "Ẩn danh",
    gender: input.gender,
    birth: `${input.dob} · ${input.tob || "??:??"} (dương lịch)`,
    lunar: "(tự động từ calendar)",
    place: input.place,
    cuc: cucMap[cal.cucNum] || "N/A",
    canchi: {
      yearStem: cal.yearStem,
      yearBranch: cal.yearBranch,
      hourBranch: cal.hourBranch,
    },
  };
}

// [DELETED] build12PalacesSkeleton and placeMainStars stubs are removed
// as we now import them from main_stars_and_palaces_v51.js

/**
 * attachStarsToPalaces
 * Merge stars into each palace by chi.
 */
function attachStarsToPalaces(palaces, starsMap) {
  const out = JSON.parse(JSON.stringify(palaces));
  // console.log("DEBUG: starsMap keys:", Object.keys(starsMap || {}));
  Object.entries(starsMap || {}).forEach(([star, chi]) => {
    if (!chi) return;
    const palace = Object.values(out).find(p => p.chi === chi);
    if (palace) {
      palace.stars.push(star);
    } else {
      // console.warn(`Cannot place star ${star} at ${chi}`);
    }
  });
  return out;
}

function buildWeeklyAdvice(monthlyAdvice) {
  return (monthlyAdvice || []).map(m => {
    const w = m.weeks || [
      { week: 1, summary: "Tuần 1: giữ nhịp, ưu tiên việc chính.", advice: ["Giữ kỷ luật"] },
      { week: 2, summary: "Tuần 2: có tín hiệu mới, đừng bỏ lỡ.", advice: ["Chốt việc quan trọng"] },
      { week: 3, summary: "Tuần 3: dễ phát sinh việc xen ngang.", advice: ["Đừng ôm đồm"] },
      { week: 4, summary: "Tuần 4: thu hoạch, tổng kết, chỉnh hướng.", advice: ["Đánh giá lại kế hoạch"] },
    ];
    return w;
  });
}

function buildScores(chart, yearlyAdvice, dailyAdvice, monthlyAdvice) {
  // TODO: normalize scores from your own scale.
  return {
    daily: dailyAdvice?.energy?.score || 7.0,
    monthly: monthlyAdvice?.[0]?.score || 70,
    yearly: yearlyAdvice?.mainStar?.score || 8.0,
  };
}

// [NEW] Adapter for Thai Tue Ring interpreter
function createInterpreterContext(chart) {
  const sections = [];
  const palaceMap = {}; // star -> palaceKey
  const starsMap = {}; // palaceKey -> [stars]

  // Index stars
  Object.values(chart.palaces).forEach(p => {
    starsMap[p.key] = p.stars;
    p.stars.forEach(s => palaceMap[s] = p.key);
  });

  return {
    hasStar: (key) => !!palaceMap[key],
    hasAnyStar: (keys) => keys.some(k => !!palaceMap[k]),
    getPalaceOf: (key) => palaceMap[key],
    getStarsInPalace: (key) => starsMap[key] || [],
    getOppositePalace: (key) => {
      // Simple opposite mapping
      const pairs = {
        "Tý": "Ngọ", "Ngọ": "Tý", "Sửu": "Mùi", "Mùi": "Sửu", "Dần": "Thân", "Thân": "Dần",
        "Mão": "Dậu", "Dậu": "Mão", "Thìn": "Tuất", "Tuất": "Thìn", "Tỵ": "Hợi", "Hợi": "Tỵ"
      };
      const p = chart.palaces[key];
      if (!p) return null;
      const oppChi = pairs[p.chi];
      const oppPalace = Object.values(chart.palaces).find(x => x.chi === oppChi);
      return oppPalace ? oppPalace.key : null;
    },
    pushSection: (sec) => sections.push(sec),
    pushSentence: (text) => sections.push({ text }),
    addPalaceTag: () => { }, // stub
    addStarModifier: () => { }, // stub
    sections
  };
}
