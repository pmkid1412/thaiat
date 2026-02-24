// interpreter_truong_sinh_ring_v1.js
// Interpreter layer for Vòng Trường Sinh khởi từ Cục số (Nam phái).
// Depends on STAR_INFO_PATCH_TRUONG_SINH_RING_V1 data patch.
//
// Usage:
//   import { interpretTruongSinhRingStage } from "./interpreter_truong_sinh_ring_v1";
//   const res = interpretTruongSinhRingStage({ stage: "Tuyệt", palace: "Tài Bạch", stars: ["Thiên Mã","Hỏa Tinh"], relation: "MENH_CUC_TUONG_SINH" });

import { STAR_INFO_PATCH_TRUONG_SINH_RING_V1 } from "./star_info_patch_truong_sinh_ring_v1.js";

/** Map short stage names -> data keys */
export const TRUONG_SINH_STAGE_KEY_MAP = {
  "Trường Sinh": "TRUONG_SINH",
  "Tràng Sinh": "TRUONG_SINH",
  "Sinh": "TRUONG_SINH",
  "Bại": "BAI",
  "Mộc Dục": "BAI",
  "Quan Đới": "QUAN_DOI",
  "Đái": "QUAN_DOI",
  "Lâm Quan": "LAM_QUAN",
  "Quan": "LAM_QUAN",
  "Đế Vượng": "DE_VUONG",
  "Vượng": "DE_VUONG",
  "Suy": "SUY",
  "Bệnh": "BENH",
  "Tử": "TU",
  "Mộ": "MO",
  "Tuyệt": "TUYET",
  "Thai": "THAI",
  "Dưỡng": "DUONG"
};

const norm = (s = "") =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Heuristic combo detector based on patch + user's phú */
export function detectTruongSinhCombos(stageKey, stars = []) {
  const S = stars.map(norm);
  const has = (name) => S.includes(norm(name));
  const hasAny = (arr) => arr.some(has);

  const combos = [];

  // --- Global combos independent of stage ---
  if (has("loc ton") || has("hoa loc")) combos.push({ key: "LOC", level: "good", note: "Có Lộc tinh hội, dễ kích hoạt tài lộc của giai đoạn." });
  if (hasAny(["hoa ky", "hoa kỵ", "hóa kỵ"])) combos.push({ key: "KY", level: "bad", note: "Hóa Kỵ hội, làm nặng mặt thị phi/trở ngại của giai đoạn." });
  if (hasAny(["dia khong", "dia kiep", "khong", "kiep", "khong kiep"])) combos.push({ key: "KHONG_KIEP", level: "bad", note: "Không/Kiếp hội, tăng biến động, phá tán hoặc cực đoan." });

  // --- Stage-specific combos ---
  if (stageKey === "MO") {
    if (hasAny(["pha quan", "phá quân"])) combos.push({ key: "PHA_MO", level: "good", note: "Phá Quân ứng chữ Mộ: quét dọn cuối chu kỳ, dọn đường tái sinh." });
    if (hasAny(["hoa loc", "hóa lộc", "hoa loc"])) combos.push({ key: "LOC_MO", level: "bad", note: "Hóa Lộc gặp Mộ: lộc bị tàng, khó phát." });
    if (hasAny(["thai duong", "thái dương", "nhat"])) combos.push({ key: "MO_NHAT", level: "bad", note: "Mộ tinh ngộ Nhật: ứng thân phụ nan toàn." });
  }

  if (stageKey === "TUYET") {
    if (hasAny(["thien ma", "thiên mã"])) combos.push({ key: "MA_TUYET", level: "bad", note: "Mã Tuyệt: mã cùng đường, bôn ba lao khổ." });
    if (hasAny(["hoa tinh", "hỏa tinh"])) combos.push({ key: "TUYET_HOA", level: "good", note: "Tuyệt Hỏa: chí khí anh hùng, hiên ngang (nếu mệnh/cục trợ)." });
    if (hasAny(["tu sat", "thất sát"]) && hasAny(["hoa tinh", "hỏa tinh"])) combos.push({ key: "TU_SAT_HOA_TUYET", level: "bad", note: "Tử/Sát + Hỏa ở Tuyệt: sát khí cực nặng; cần cát cứu để hóa đại tướng." });
  }

  if (stageKey === "THAI") {
    if (hasAny(["khinh duong", "kình dương", "da la", "đà la", "linh tinh", "linh tinh", "hoa tinh", "hỏa tinh", "dia khong", "dia kiep", "khong kiep", "thien hinh", "thiên hình"])) {
      combos.push({ key: "THAI_SAT_BAI", level: "bad", note: "Thai hội sát bại tinh: ấp ủ mầm họa / sản nạn (Tuần/Triệt có thể dập)." });
    }
    if (hasAny(["dao hoa", "đào hoa", "hong loan", "hồng loan"])) combos.push({ key: "THAI_DAO", level: "warn", note: "Thai gặp Đào/Hồng: tiền dâm hậu thú, dễ có 'sản phẩm' trước cưới." });
    if (has("kiep sat") || has("kiếp sát")) combos.push({ key: "THAI_KIEP_SAT", level: "bad", note: "Thai phùng Kiếp Sát: tu phòng sinh sản/gián đoạn tử cung." });
    if (hasAny(["tu vi", "tử vi", "thien phu", "thiên phủ"])) combos.push({ key: "THAI_TU_PHU", level: "good", note: "Thai hội Tử Phủ/quý tinh: thai tốt, con quý." });
  }

  if (stageKey === "BENH") {
    if (hasAny(["liem trinh", "liêm trinh"])) combos.push({ key: "BENH_LIEM", level: "good", note: "Bệnh–Tử quy bản vị Liêm Trinh: nếu đắc địa/hợp mệnh → thanh liêm, chấn chỉnh." });
    if (hasAny(["song hao", "dai hao", "tieu hao", "tuế phá", "tue pha", "hinh ky", "hình kỵ"])) combos.push({ key: "BENH_SUY_TAN", level: "bad", note: "Bệnh hội các sao suy tàn/hao/kỵ: thời suy càng suy, dễ vỡ." });
  }

  if (stageKey === "TU") {
    if (hasAny(["sat", "thất sát", "pha quan", "phá quân", "tham lang", "tham lang"])) combos.push({ key: "TU_SAT_PHA_THAM", level: "warn", note: "Tử gặp Sát-Phá-Tham/cách khai sáng: có thể 'vật cực tắc phản' nếu mệnh vượng." });
  }

  if (stageKey === "BAI") {
    if (hasAny(["hoa cai", "hoa cái"])) combos.push({ key: "BAI_HOA_CAI", level: "warn", note: "Mộc Dục + Hoa Cái: dễ hoang dâm/đa cảm nếu thiếu tiết chế." });
  }

  if (stageKey === "DUONG") {
    if (hasAny(["hy than", "hỷ thần", "thien hy", "thiên hỷ", "phu thê"])) combos.push({ key: "DUONG_HY", level: "good", note: "Dưỡng hội Hỷ tinh tại Tử Tức: sinh quý tử/điềm thêm đinh." });
  }

  return combos;
}

/**
 * Interpret a Trường Sinh ring stage (Cục số).
 * @param {Object} input
 * @param {string} input.stage - stage name (e.g., "Tuyệt") or key (e.g., "TUYET")
 * @param {string} [input.palace] - Cung chức năng (e.g., "Tài Bạch")
 * @param {string[]} [input.stars] - star names in that palace
 * @param {string} [input.relation] - Menh/Cuc relation ("MENH_CUC_TUONG_SINH"|"MENH_CUC_TY_HOA"|"MENH_SINH_CUC"|"MENH_KHAC_CUC"|"CUC_KHAC_MENH")
 * @returns {Object}
 */
export function interpretTruongSinhRingStage(input = {}) {
  const { stage, palace = "", stars = [], relation = "" } = input;
  const stageKey = STAR_INFO_PATCH_TRUONG_SINH_RING_V1[stage]?.key
    ? stage
    : (TRUONG_SINH_STAGE_KEY_MAP[stage] || stage || "");

  const data = STAR_INFO_PATCH_TRUONG_SINH_RING_V1[stageKey];
  if (!data) {
    return {
      stageKey,
      palace,
      stars,
      summary: "Chưa có dữ liệu lý tính cho giai đoạn này.",
      advice: "Bổ sung lý tính vào patch Trường Sinh."
    };
  }

  const combos = detectTruongSinhCombos(stageKey, stars);
  const goodCombos = combos.filter(c => c.level === "good");
  const badCombos = combos.filter(c => c.level === "bad");
  const warnCombos = combos.filter(c => c.level === "warn");

  // Relation tone helper
  let relationNote = "";
  switch (relation) {
    case "MENH_CUC_TUONG_SINH":
    case "CUC_SINH_MENH":
      relationNote = "Mệnh–Cục tương sinh: sinh lực ăn khớp bối cảnh, thuận lợi hơn trung bình.";
      break;
    case "MENH_CUC_TY_HOA":
    case "TY_HOA":
      relationNote = "Mệnh–Cục tỷ hòa: lực và bối cảnh gần nhau, dễ tự chủ.";
      break;
    case "MENH_SINH_CUC":
      relationNote = "Mệnh sinh Cục: hao lực nuôi bối cảnh, cần tiết chế để không kiệt.";
      break;
    case "MENH_KHAC_CUC":
      relationNote = "Mệnh khắc Cục: tốn sức khắc chế hoàn cảnh, thắng thì được quyền.";
      break;
    case "CUC_KHAC_MENH":
      relationNote = "Cục khắc Mệnh: bối cảnh áp chế, phải chọn hướng đúng để giảm tổn hại.";
      break;
    default:
      relationNote = "";
  }

  // Build narrative
  const summary = data.coreMeaning?.[0] || data.meaning?.summary || data.name;
  const core = data.coreMeaning || data.meaning?.detail?.split(". ").filter(Boolean) || [];
  const goodWhen = [...(data.goodWhen || []), ...goodCombos.map(c => c.note)];
  const badWhen = [...(data.badWhen || []), ...badCombos.map(c => c.note)];

  // Advice: start from patch advice if any, else infer
  let advice = "";
  if (data.advice) advice = data.advice;
  else if (stageKey === "TRUONG_SINH") advice = "Tận dụng cơ hội lúc khởi đầu, làm đúng nền tảng.";
  else if (stageKey === "BAI") advice = "Giữ nề nếp, tránh phóng túng và chọn nơi an toàn.";
  else if (stageKey === "QUAN_DOI") advice = "Dùng tuổi trẻ để học – rèn – tích lũy, tránh kiêu cuồng.";
  else if (stageKey === "LAM_QUAN") advice = "Chớ khoe khoang; tập trung gây dựng sự nghiệp khi thời thế đang cho trái ngọt.";
  else if (stageKey === "DE_VUONG") advice = "Biết đủ biết dừng; thịnh mà tham sẽ sinh họa.";
  else if (stageKey === "SUY") advice = "Tích lũy kinh nghiệm/tài lực, đừng cố cưỡng thịnh.";
  else if (stageKey === "BENH") advice = "Chấn chỉnh, cần kiệm, sửa cũ đổi mới; tránh buông thả.";
  else if (stageKey === "TU") advice = "Thu liễm, nghiệm thu, khép việc cũ để chuẩn bị phản chuyển.";
  else if (stageKey === "MO") advice = "Chôn việc cũ, dọn sạch, giữ kín cái cần giữ.";
  else if (stageKey === "TUYET") advice = "Cải cách tận gốc, dứt khoát đổi chu kỳ; nếu không sẽ bị diệt.";
  else if (stageKey === "THAI") advice = "Ủ mầm đúng cách; giữ sạch sát khí, chăm đường sinh nở/đường học.";
  else if (stageKey === "DUONG") advice = "Lùi một bước để dưỡng lực; dùng nhu thắng cương.";
  else advice = "Luận theo cung chức và sao hội.";

  return {
    stageKey,
    stageName: data.name,
    palace,
    stars,
    summary,
    coreMeaning: core,
    relationNote,
    goodWhen,
    badWhen,
    combos,
    warnCombos,
    advice,
    aphorisms: data.aphorisms || [],
    notes: data.notes || []
  };
}

export function interpretTruongSinhRing(chart) {
  const results = [];
  if (!chart || !chart.palaces) return [];

  Object.values(chart.palaces).forEach(palace => {
    palace.stars.forEach(star => {
      if (TRUONG_SINH_STAGE_KEY_MAP[star]) {
        results.push(interpretTruongSinhRingStage({
          stage: star,
          palace: palace.key,
          stars: palace.stars
        }));
      }
    });
  });
  return results;
}

export default {
  interpretTruongSinhRingStage,
  interpretTruongSinhRing
};
