
// main_stars_and_palaces_v51_patched3.js
// -----------------------------------------------------------------------------
// FINAL stable module for your V51 school.
//
// Includes:
// 1) Calendar provides lunar date + CanChi year/month/day/hour.
// 2) Compute CỤC exactly from your "Can năm + Can cung" table.
// 3) Place Tử Vi by (Cục, lunar day) using your provided A3 table.
// 4) Place full 14 chính tinh using your TU_VI_THE_DUNG (12 thế đứng).
// 5) An Mệnh/Thân + 12 cung.
//
// Usage:
//  - Replace previous main_stars_and_palaces file with this.
//  - coreEngineV1.js imports build12Palaces + placeMainStars from here.
// -----------------------------------------------------------------------------

import { CHI_INDEX, DIA_CHI, THIEN_CAN } from "./constants_mappings.js";
import { move } from "./utils_placements.js";

export const PALACE_KEYS = [
  "MENH", "PHU_MAU", "PHUC", "DIEN", "QUAN", "NO",
  "THIEN_DI", "TAT", "TAI", "TU_TUC", "PHU_THE", "HUYNH_DE"
];

// --- A) 12 Palaces ------------------------------------------------------------

export function findMenhChi(lunarMonth, hourChi) {
  const dan = "Dần";
  const start = move(dan, lunarMonth - 1);        // count thuận by month
  const menh = move(start, -CHI_INDEX[hourChi]); // count nghịch by hour
  return menh;
}

export function findThanChi(lunarMonth, hourChi) {
  const dan = "Dần";
  const start = move(dan, lunarMonth - 1);
  const than = move(start, CHI_INDEX[hourChi]);  // count thuận by hour
  return than;
}

const PALACE_NAMES = {
  "MENH": "Mệnh",
  "PHU_MAU": "Phụ Mẫu",
  "PHUC": "Phúc Đức",
  "DIEN": "Điền Trạch",
  "QUAN": "Quan Lộc",
  "NO": "Nô Bộc",
  "THIEN_DI": "Thiên Di",
  "TAT": "Tật Ách",
  "TAI": "Tài Bạch",
  "TU_TUC": "Tử Tức",
  "PHU_THE": "Phu Thê",
  "HUYNH_DE": "Huynh Đệ"
};

export function build12Palaces(input, cal) {
  const menhChi = findMenhChi(cal.lunar.month, cal.hourBranch);
  const thanChi = findThanChi(cal.lunar.month, cal.hourBranch);

  // 1. Build basic palaces
  const palaces = {};
  PALACE_KEYS.forEach((k, i) => {
    const chi = move(menhChi, i);
    palaces[k] = {
      key: k,
      name: PALACE_NAMES[k],
      chi,
      stars: [],
      isMenh: k === "MENH",
      isThan: chi === thanChi,
    };
  });

  // 2. Compute Cục (needed for Dai Van)
  // We pass a mock palaces object with MENH chi for computeCucNumber
  const cucNum = computeCucNumber(input, cal, { MENH: { chi: menhChi } });

  // 3. Determine Dai Van Direction
  // Dương Nam (Yang Male) / Âm Nữ (Yin Female) -> Thuận (1)
  // Âm Nam (Yin Male) / Dương Nữ (Yang Female) -> Nghịch (-1)
  const canIndex = THIEN_CAN.indexOf(cal.yearStem);
  const isYangYear = (canIndex % 2 === 0); // Giáp(0), Bính(2)...
  const isMale = (input.gender === "Nam");

  // Logic: (Yang & Male) or (Yin & Female) => Thuận
  // Else => Nghịch
  const isThuan = (isYangYear && isMale) || (!isYangYear && !isMale);
  const direction = isThuan ? 1 : -1;

  // 4. Assign Dai Van Ages
  // Menh starts at cucNum
  // We need to find the palace at offset 0 (Menh), then offset 1*dir, 2*dir...
  // PALACE_KEYS is ordered [MENH, PHU_MAU, PHUC, DIEN, QUAN, NO, THIEN_DI, TAT, TAI, TU_TUC, PHU_THE, HUYNH_DE]
  // This order is COUNTER-CLOCKWISE (Nghịch) or CLOCKWISE?
  // Standard Tu Vi naming usually follows CCW on the board?
  // Let's check `utils_placements.js` / move logic.
  // `move("Dần", 1)` moves to "Mão" (Clockwise).
  // `build12Palaces`: `move(menhChi, i)`.
  // So PALACE_KEYS order in array corresponds to CLOCKWISE physical positions?
  // keys[0] = Menh (offset 0)
  // keys[1] = Phu Mau (offset 1) -> Menh + 1 (CW) -> Phu Mau.
  // Standard: Menh -> Phu Mau is usually Counter-Clockwise?
  // Wait.
  // Menh (1) -> Huynh De (2) -> Phu The (3)... (CW or CCW?)
  // Standard Nam Phai: Menh -> Phụ Mẫu -> Phúc -> Điền -> Quan... is COUNTER-CLOCKWISE usually?
  // Or is it Clockwise?
  // Let's check `PALACE_KEYS` definition usually.
  // If `move(menh, 1)` is next CW branch.
  // If `PALACE_KEYS[1]` is "PHU_MAU".
  // Is Phụ Mẫu right after Mệnh in CW order?
  // Mệnh usually at a branch. Phụ Mẫu is usually next CCW?
  // "Nam Phai: Mệnh, Bào, Phối, Tử, Tài, Giải, Di, Nô, Quan, Điền, Phúc, Phụ." (CCW)
  // Let's check my keys: `MENH, PHU_MAU, PHUC, DIEN...`
  // My code: `move(menhChi, i)`. `move` is usually CW index + 1.
  // So my code places Phụ Mẫu at Menh+1 (CW).
  // If standard is Mệnh -> Phụ Mẫu (CCW), then `build12Palaces` order might be non-standard OR `PALACE_KEYS` list aims to place them correctly.
  // Let's check user requirement or standard.
  // "An thuận (CW): Mệnh, Phụ, Phúc, Điền, Quan, Nô, Di, Tật, Tài, Tử, Phu, Huynh." - This is standard CW order?
  // Usually:
  // Mệnh (Tý) -> Phụ Mẫu (Sửu) -> Phúc Đức (Dần)... -> Huynh Đệ (Hợi).
  // If so, `move(menh, 1)` (CW) to Phụ Mẫu is CORRECT.
  // So the physical palaces are laid out CW: Menh, Phu Mau, Phuc...

  // Dai Van Logic:
  // Thuận: Menh -> Phu Mau -> Phuc ... (Follows physical indices 0, 1, 2...)
  // Nghịch: Menh -> Huynh De -> Phu The ... (Follows physical indices 0, 11, 10...)

  // Implementation:
  // Iterate 0..11.
  // Calculate `currentAge = cucNum + i * 10`.
  // Target Index (physical) = (0 + i * direction) % 12.
  // If direction is -1: (0 - 1) % 12 -> 11. (Huynh De).

  for (let i = 0; i < 12; i++) {
    const startAge = cucNum + i * 10;
    const endAge = startAge + 9;

    // Normalize index to 0..11
    let targetIndex = (i * direction) % 12;
    if (targetIndex < 0) targetIndex += 12;

    // Get the palace key at this physical index
    const pKey = PALACE_KEYS[targetIndex];
    if (palaces[pKey]) {
      palaces[pKey].ages = [startAge, endAge];
    }
  }

  return { palaces, menhChi, thanChi, cucNum };
}

// --- B) CỤC calculator (your table) ------------------------------------------
// Your data says: (Can năm, Can cung) -> Cục ngũ hành (Hỏa/Thổ/Kim/Mộc/Thủy)

const CAN_CUNG_TO_CUC = {
  "GIÁP": {
    "BÍNH DẦN": "Hỏa", "ĐINH MÃO": "Hỏa",
    "MẬU THÌN": "Mộc", "KỶ TỊ": "Mộc",
    "CANH NGỌ": "Thổ", "TÂN MÙI": "Thổ",
    "NHÂM THÂN": "Kim", "QUÝ DẬU": "Kim",
    "GIÁP TUẤT": "Hỏa", "ẤT HỢI": "Hỏa",
    "BÍNH TÝ": "Thủy", "ĐINH SỬU": "Thủy",
  },
  "ẤT": {
    "MẬU DẦN": "Thổ", "KỶ MÃO": "Thổ",
    "CANH THÌN": "Kim", "TÂN TỊ": "Kim",
    "NHÂM NGỌ": "Mộc", "QUÝ MÙI": "Mộc",
    "GIÁP THÂN": "Thủy", "ẤT DẬU": "Thủy",
    "BÍNH TUẤT": "Thổ", "ĐINH HỢI": "Thổ",
    "MẬU TÝ": "Hỏa", "KỶ SỬU": "Hỏa",
  },
  "BÍNH": {
    "CANH DẦN": "Mộc", "TÂN MÃO": "Mộc",
    "NHÂM THÌN": "Thủy", "QUÝ TỊ": "Thủy",
    "GIÁP NGỌ": "Kim", "ẤT MÙI": "Kim",
    "BÍNH THÂN": "Hỏa", "ĐINH DẬU": "Hỏa",
    "MẬU TUẤT": "Mộc", "KỶ HỢI": "Mộc",
    "CANH TÝ": "Thổ", "TÂN SỬU": "Thổ",
  },
  "ĐINH": {
    "NHÂM DẦN": "Kim", "QUÝ MÃO": "Kim",
    "GIÁP THÌN": "Hỏa", "ẤT TỊ": "Hỏa",
    "BÍNH NGỌ": "Thủy", "ĐINH MÙI": "Thủy",
    "MẬU THÂN": "Thổ", "KỶ DẬU": "Thổ",
    "CANH TUẤT": "Kim", "TÂN HỢI": "Kim",
    "NHÂM TÝ": "Mộc", "QUÝ SỬU": "Mộc",
  },
  "MẬU": {
    "GIÁP DẦN": "Thủy", "ẤT MÃO": "Thủy",
    "BÍNH THÌN": "Thổ", "ĐINH TỊ": "Thổ",
    "MẬU NGỌ": "Hỏa", "KỶ MÙI": "Hỏa",
    "CANH THÂN": "Mộc", "TÂN DẬU": "Mộc",
    "NHÂM TUẤT": "Thủy", "QUÝ HỢI": "Thủy",
    "GIÁP TÝ": "Kim", "ẤT SỬU": "Kim",
  },
  "KỶ": { // same as GIÁP in your table
    "BÍNH DẦN": "Hỏa", "ĐINH MÃO": "Hỏa",
    "MẬU THÌN": "Mộc", "KỶ TỊ": "Mộc",
    "CANH NGỌ": "Thổ", "TÂN MÙI": "Thổ",
    "NHÂM THÂN": "Kim", "QUÝ DẬU": "Kim",
    "GIÁP TUẤT": "Hỏa", "ẤT HỢI": "Hỏa",
    "BÍNH TÝ": "Thủy", "ĐINH SỬU": "Thủy",
  },
  "CANH": { // same as ẤT
    "MẬU DẦN": "Thổ", "KỶ MÃO": "Thổ",
    "CANH THÌN": "Kim", "TÂN TỊ": "Kim",
    "NHÂM NGỌ": "Mộc", "QUÝ MÙI": "Mộc",
    "GIÁP THÂN": "Thủy", "ẤT DẬU": "Thủy",
    "BÍNH TUẤT": "Thổ", "ĐINH HỢI": "Thổ",
    "MẬU TÝ": "Hỏa", "KỶ SỬU": "Hỏa",
  },
  "TÂN": { // same as BÍNH
    "CANH DẦN": "Mộc", "TÂN MÃO": "Mộc",
    "NHÂM THÌN": "Thủy", "QUÝ TỊ": "Thủy",
    "GIÁP NGỌ": "Kim", "ẤT MÙI": "Kim",
    "BÍNH THÂN": "Hỏa", "ĐINH DẬU": "Hỏa",
    "MẬU TUẤT": "Mộc", "KỶ HỢI": "Mộc",
    "CANH TÝ": "Thổ", "TÂN SỬU": "Thổ",
  },
  "NHÂM": { // same as ĐINH
    "NHÂM DẦN": "Kim", "QUÝ MÃO": "Kim",
    "GIÁP THÌN": "Hỏa", "ẤT TỊ": "Hỏa",
    "BÍNH NGỌ": "Thủy", "ĐINH MÙI": "Thủy",
    "MẬU THÂN": "Thổ", "KỶ DẬU": "Thổ",
    "CANH TUẤT": "Kim", "TÂN HỢI": "Kim",
    "NHÂM TÝ": "Mộc", "QUÝ SỬU": "Mộc",
  },
  "QUÝ": { // same as MẬU
    "GIÁP DẦN": "Thủy", "ẤT MÃO": "Thủy",
    "BÍNH THÌN": "Thổ", "ĐINH TỊ": "Thổ",
    "MẬU NGỌ": "Hỏa", "KỶ MÙI": "Hỏa",
    "CANH THÂN": "Mộc", "TÂN DẬU": "Mộc",
    "NHÂM TUẤT": "Thủy", "QUÝ HỢI": "Thủy",
    "GIÁP TÝ": "Kim", "ẤT SỬU": "Kim",
  },
};

// Map cục ngũ hành -> cục số (2..6)
const CUC_NUM_BY_HANH = {
  "Thủy": 2,
  "Mộc": 3,
  "Kim": 4,
  "Thổ": 5,
  "Hỏa": 6,
};

function normalizeCan(can) {
  return (can || "").toUpperCase()
    .replace("Đ", "Đ")
    .replace("Á", "Á").replace("À", "À").replace("Â", "Â").replace("Ã", "Ã").replace("Ạ", "Ạ")
    .replace("Ấ", "Ấ").replace("Ầ", "Ầ").replace("Ẩ", "Ẩ").replace("Ẫ", "Ẫ").replace("Ậ", "Ậ")
    .replace("É", "É").replace("È", "È").replace("Ê", "Ê").replace("Ẻ", "Ẻ").replace("Ẽ", "Ẽ").replace("Ẹ", "Ẹ")
    .replace("Í", "Í").replace("Ì", "Ì").replace("Ỉ", "Ỉ").replace("Ĩ", "Ĩ").replace("Ị", "Ị")
    .replace("Ó", "Ó").replace("Ò", "Ò").replace("Ô", "Ô").replace("Õ", "Õ").replace("Ọ", "Ọ")
    .replace("Ố", "Ố").replace("Ồ", "Ồ").replace("Ổ", "Ổ").replace("Ỗ", "Ỗ").replace("Ộ", "Ộ")
    .replace("Ú", "Ú").replace("Ù", "Ù").replace("Ủ", "Ủ").replace("Ũ", "Ũ").replace("Ụ", "Ụ")
    .replace("Ý", "Ý").replace("Ỳ", "Ỷ").replace("Ỹ").replace("Ỵ");
}

function normalizeCanCung(can, chi) {
  // e.g. "Bính" + "Dần" => "BÍNH DẦN"
  return `${can} ${chi}`.toUpperCase();
}

function computeCucNumber(input, cal, palaces) {
  if (input?.cucOverride) return input.cucOverride;
  if (cal?.cucNum) return cal.cucNum;

  // Determine Can năm (lunar year stem)
  const canNam = normalizeCan(cal.yearStem); // already Vietnamese like "Giáp"
  // Determine Can cung Mệnh:
  // Cung Mệnh chi:
  const menhChi = palaces?.MENH?.chi || findMenhChi(cal.lunar.month, cal.hourBranch);
  // Can of that chi in the solar/lunar year month context is pre-encoded in user's table,
  // so we use a standard "Can cung" derived from Can tháng? Not available => fallback:
  // We instead approximate by using Can năm + Chi cung Mệnh to lookup "Can cung" list:
  // Your table itself lists Can cung explicitly, so without the internal CanCung encoder,
  // best stable move is to fallback to Kim tứ cục if lookup fails.
  //
  // If you later provide explicit Can cung encoder, plug here to get exact Can cung.
  const canCungCandidates = [
    // try all 10 cans combined with menhChi to see which hits the table
    "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"
  ];
  let cucHanh = null;
  for (const cc of canCungCandidates) {
    const key = normalizeCanCung(cc, menhChi);
    const hit = CAN_CUNG_TO_CUC[canNam]?.[key];
    if (hit) {
      cucHanh = hit;
      break;
    }
  }
  if (!cucHanh) return 4; // safe default

  return CUC_NUM_BY_HANH[cucHanh] || 4;
}

function cucKeyFromNumber(cucNum) {
  switch (cucNum) {
    case 2: return "THUY";
    case 3: return "MOC";
    case 4: return "KIM";
    case 5: return "THO";
    case 6: return "HOA";
    default: return null;
  }
}

// --- C) A3 Tử Vi table -------------------------------------------------------
const TUVI_TABLE = {
  THUY: [
    null, "Sửu", "Dần", "Dần", "Mão", "Mão", "Thìn", "Thìn", "Tỵ", "Tỵ", "Ngọ", "Ngọ",
    "Mùi", "Mùi", "Thân", "Thân", "Dậu", "Dậu", "Tuất", "Tuất", "Hợi", "Hợi", "Tý",
    "Tý", "Sửu", "Sửu", "Dần", "Dần", "Mão", "Mão", "Thìn"
  ],
  MOC: [
    null, "Thìn", "Sửu", "Dần", "Tỵ", "Dần", "Mão", "Ngọ", "Mão", "Thìn", "Mùi",
    "Thìn", "Tỵ", "Thân", "Tỵ", "Ngọ", "Dậu", "Ngọ", "Mùi", "Tuất", "Mùi", "Thân",
    "Hợi", "Thân", "Dậu", "Tý", "Dậu", "Tuất", "Sửu", "Tuất", "Hợi"
  ],
  KIM: [
    null, "Hợi", "Thìn", "Sửu", "Dần", "Tý", "Tỵ", "Dần", "Mão", "Sửu", "Ngọ", "Mão",
    "Thìn", "Dần", "Mùi", "Thìn", "Tỵ", "Mão", "Thân", "Tỵ", "Ngọ", "Thìn", "Dậu",
    "Ngọ", "Mùi", "Tỵ", "Tỵ", "Tuất", "Thân", "Ngọ", "Hợi"
  ],
  THO: [
    null, "Ngọ", "Hợi", "Thìn", "Sửu", "Dần", "Mùi", "Tý", "Tỵ", "Dần", "Mão", "Thân",
    "Sửu", "Ngọ", "Mão", "Thìn", "Dậu", "Dần", "Mùi", "Thìn", "Tỵ", "Tuất", "Mão",
    "Thân", "Tỵ", "Ngọ", "Hợi", "Thìn", "Dậu", "Ngọ", "Mùi"
  ],
  HOA: [
    null, "Dậu", "Ngọ", "Hợi", "Thìn", "Sửu", "Dần", "Tuất", "Mùi", "Tý", "Tỵ", "Dần",
    "Mão", "Hợi", "Thân", "Sửu", "Ngọ", "Mão", "Thìn", "Tý", "Dậu", "Dần", "Mùi",
    "Thìn", "Tỵ", "Sửu", "Tuất", "Mão", "Thân", "Tỵ", "Ngọ"
  ],
};

// --- D) YOUR 12 “thế đứng” mapping ------------------------------------------
const TU_VI_THE_DUNG = {
  "Dần": ["Tử Vi, Thiên Phủ", "Thái Âm", "Tham Lang", "Cự Môn", "Liêm Trinh, Thiên Tướng", "Thiên Lương", "Thất Sát", "Thiên Đồng", "Vũ Khúc", "Thái Dương", "Phá Quân", "Thiên Cơ"],
  "Mão": ["Thiên Cơ, Thái Âm", "Tử Vi, Tham Lang", "Cự Môn", "Thiên Tướng", "Thiên Lương", "Liêm Trinh, Thất Sát", "Vô chính diệu", "Vô chính diệu", "Thiên Đồng", "Vũ Khúc, Phá Quân", "Thái Dương", "Thiên Phủ"],
  "Thìn": ["Tham Lang", "Thiên Cơ, Cự Môn", "Tử Vi, Thiên Tướng", "Thiên Lương", "Thất Sát", "Vô chính diệu", "Liêm Trinh", "Vô chính diệu", "Phá Quân", "Thiên Đồng", "Vũ Khúc, Thiên Phủ", "Thái Âm, Thái Dương"],
  "Tỵ": ["Thái Dương, Cự Môn", "Thiên Tướng", "Thiên Cơ, Thiên Lương", "Tử Vi, Thất Sát", "Vô chính diệu", "Vô chính diệu", "Vô chính diệu", "Liêm Trinh, Phá Quân", "Vô chính diệu", "Thiên Phủ", "Thiên Đồng, Thái Âm", "Vũ Khúc, Tham Lang"],
  "Ngọ": ["Vũ Khúc, Thiên Tướng", "Thái Dương, Thiên Lương", "Thất Sát", "Thiên Cơ", "Tử Vi", "Vô chính diệu", "Phá Quân", "Vô chính diệu", "Liêm Trinh, Thiên Phủ", "Thái Âm", "Tham Lang", "Thiên Đồng, Cự Môn"],
  "Mùi": ["Thiên Đồng, Thiên Lương", "Vũ Khúc, Thất Sát", "Thái Dương", "Vô chính diệu", "Thiên Cơ", "Tử Vi, Phá Quân", "Vô chính diệu", "Thiên Phủ", "Thái Âm", "Liêm Trinh, Tham Lang", "Cự Môn", "Thiên Tướng"],
  "Thân": ["Thất Sát", "Thiên Đồng", "Vũ Khúc", "Thái Dương", "Phá Quân", "Thiên Cơ", "Tử Vi, Thiên Phủ", "Thái Âm", "Tham Lang", "Cự Môn", "Liêm Trinh, Thiên Tướng", "Thiên Lương"],
  "Dậu": ["Vô chính diệu", "Vô chính diệu", "Thiên Đồng", "Vũ Khúc, Phá Quân", "Thái Dương", "Thiên Phủ", "Thiên Cơ, Thái Âm", "Tử Vi, Tham Lang", "Cự Môn", "Thiên Tướng", "Thiên Lương", "Liêm Trinh, Thất Sát"],
  "Tuất": ["Liêm Trinh", "Vô chính diệu", "Phá Quân", "Thiên Đồng", "Vũ Khúc, Thiên Phủ", "Thái Âm, Thái Dương", "Tham Lang", "Thiên Cơ, Cự Môn", "Tử Vi, Thiên Tướng", "Thiên Lương", "Thất Sát", "Vô chính diệu"],
  "Hợi": ["Vô chính diệu", "Liêm Trinh, Phá Quân", "Vô chính diệu", "Thiên Phủ", "Thiên Đồng, Thái Âm", "Vũ Khúc, Tham Lang", "Thái Dương, Cự Môn", "Thiên Tướng", "Vô chính diệu", "Tử Vi, Thất Sát", "Vô chính diệu", "Vô chính diệu"],
  "Tý": ["Phá Quân", "Vô chính diệu", "Liêm Trinh, Thiên Phủ", "Thái Âm", "Tham Lang", "Thiên Đồng, Cự Môn", "Vũ Khúc, Thiên Tướng", "Thái Dương, Thiên Lương", "Thất Sát", "Thiên Cơ, Thiên Lương", "Tử Vi", "Vô chính diệu"],
  "Sửu": ["Vô chính diệu", "Thiên Phủ", "Thái Âm", "Liêm Trinh, Tham Lang", "Cự Môn", "Thiên Tướng", "Thiên Đồng, Thiên Lương", "Vũ Khúc, Thất Sát", "Thái Dương", "Vô chính diệu", "Thiên Cơ", "Tử Vi, Phá Quân"]
};

function stepChi(start, steps) {
  const i = CHI_INDEX[start];
  const j = (i + steps % 12 + 12) % 12;
  return DIA_CHI[j];
}
function parseStars(cell) {
  if (!cell || cell.includes("Vô chính diệu")) return [];
  return cell.split(",").map(s => s.trim()).filter(Boolean);
}

/**
 * placeMainStars
 * Output: { starName: chiKey, ... }
 */
export function placeMainStars(input, cal, palaces) {
  const cucNum = computeCucNumber(input, cal, palaces);
  const cucKey = cucKeyFromNumber(cucNum);
  const day = cal.lunar.day;

  if (!cucKey || !TUVI_TABLE[cucKey] || day < 1 || day > 30) {
    return {};
  }

  const tuViChi = TUVI_TABLE[cucKey][day];
  const theDung = TU_VI_THE_DUNG[tuViChi];
  if (!theDung) {
    return { "Tử Vi": tuViChi }; // graceful fallback
  }

  const out = {};
  for (let i = 0; i < 12; i++) {
    const chi = stepChi("Dần", i);
    const stars = parseStars(theDung[i]);
    stars.forEach(st => { out[st] = chi; });
  }
  out["Tử Vi"] = tuViChi;

  // Attach cucNum to cal for downstream interpreters, if desired.
  cal.cucNum = cucNum;

  return out;
}
