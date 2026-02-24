
/**
 * INTERPRETER — VÒNG BÁC SỸ (v1)
 * Mục tiêu:
 * - Luận giải 12 sao của vòng Bác Sỹ theo cung đóng và sao hội.
 * - Dùng dữ liệu STAR_INFO_DB hiện có (snapshot v51) nếu được truyền vào.
 * - Có bộ nhận diện tiểu cách cục (combo) phổ biến.
 *
 * Cách dùng:
 *   import { interpretBacSyRingStar } from "./interpreter_bac_sy_ring_v1";
 *
 *   const res = interpretBacSyRingStar({
 *     star: "Phi Liêm",        // hoặc key chuẩn hóa
 *     palace: "Quan Lộc",
 *     stars: ["Phi Liêm","Bạch Hổ","Thiên Việt","Hỏa Tinh"],
 *     starInfoDb: STAR_INFO_DB // optional
 *   });
 */

// 12 sao Bác Sỹ theo thứ tự vòng (an từ Lộc Tồn, thuận/nghịch theo âm dương)
export const VONG_BAC_SY = [
  "Bác Sỹ",
  "Lực Sỹ",
  "Thanh Long",
  "Tiểu Hao",
  "Tướng Quân",
  "Tấu Thư",
  "Phi Liêm",
  "Hỷ Thần",
  "Bệnh Phù",
  "Đại Hao",
  "Phục Binh",
  "Quan Phủ",
];

// Mô tả "lý tính vòng" ở mức khái quát.
// (Bạn có thể thay thế bằng lý tính chi tiết khi paste thêm.)
const BAC_SY_RING_META = {
  "Bác Sỹ": {
    summary: "Trí tuệ – học hành – y dược – trợ lực cát. Sao đầu vòng.",
    advice: "Tận dụng học vấn, chuyên môn để nâng cung."
  },
  "Lực Sỹ": {
    summary: "Sức mạnh – làm việc nặng – quyền biến – lao lực.",
    advice: "Dùng lực đúng chỗ, tránh cứng quá gãy."
  },
  "Thanh Long": {
    summary: "Hỷ khí – may mắn – tin vui – trợ quý.",
    advice: "Thuận thời mà tiến, giữ tâm sáng."
  },
  "Tiểu Hao": {
    summary: "Hao tán nhỏ – đổi thay nhỏ – chi tiêu vặt.",
    advice: "Tán nhỏ để thông khí; đừng để thành rò rỉ lớn."
  },
  "Tướng Quân": {
    summary: "Uy quyền – nóng nảy – hành động nhanh – quân lệnh.",
    advice: "Mạnh dạn lãnh đạo, nhưng tránh vội vàng."
  },
  "Tấu Thư": {
    summary: "Văn thư – đơn từ – truyền đạt – nói năng.",
    advice: "Được việc nhờ chữ nghĩa; tránh thị phi."
  },
  "Phi Liêm": {
    summary: "Nhanh – sắc – chia cắt – biến cố tốc độ cao.",
    advice: "Làm nhanh nhưng phải chuẩn; tránh hấp tấp."
  },
  "Hỷ Thần": {
    summary: "Hỷ tín – vui mừng – cưới hỏi – lễ lạt.",
    advice: "Đón vui bằng đức; vui quá hóa buông."
  },
  "Bệnh Phù": {
    summary: "Bệnh tật – suy yếu – cần nghỉ – tổn sinh lực.",
    advice: "Ưu tiên hồi phục, tối giản việc nặng."
  },
  "Đại Hao": {
    summary: "Hao tán lớn – biến động tài lực – đổ vỡ.",
    advice: "Giữ nguồn lực, cắt lỗ sớm, tránh tham."
  },
  "Phục Binh": {
    summary: "Tiểu nhân – phục kích – chuyện ngầm – rình rập.",
    advice: "Cẩn thận hậu trường, làm rõ bằng chứng."
  },
  "Quan Phủ": {
    summary: "Cửa quan – kiện tụng – thủ tục – pháp lý.",
    advice: "Đi đường chính danh, giấy tờ rõ ràng."
  },
};

// Chuẩn hóa tên sao (case/ dấu)
const normalize = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[’'"]/g, "")
    .trim();

// map normalize -> tên chuẩn trong vòng
const BAC_SY_NAME_MAP = (() => {
  const map = {};
  for (const n of VONG_BAC_SY) map[normalize(n)] = n;
  // một vài alias hay gặp
  map[normalize("Phục binh")] = "Phục Binh";
  map[normalize("Quan phủ")] = "Quan Phủ";
  return map;
})();

// ===== Combo detector =====
export function detectBacSyCombos(star, starsInPalace = []) {
  const names = starsInPalace.map(normalize);
  const has = (x) => names.includes(normalize(x));
  const combos = [];

  // Phi Liêm
  if (star === "Phi Liêm") {
    if (has("Bạch Hổ")) {
      combos.push({
        key: "HO_MOC_CANH",
        level: "good",
        note: "Phi Liêm gặp Bạch Hổ → 'Hổ mọc cánh': thực quyền, thăng tiến nhanh."
      });
    }
    if (has("Thiên Việt") && has("Hỏa Tinh")) {
      combos.push({
        key: "VIET_HOA_HINH_PHI",
        level: "bad",
        note: "Phi Liêm + Thiên Việt + Hỏa Tinh → 'Việt Hỏa Hình Phi': dễ dính hình pháp/sấm sét, chuyện gấp."
      });
    }
  }

  // Phục Binh
  if (star === "Phục Binh") {
    if (has("Thái Tuế") && has("Hóa Kỵ")) {
      combos.push({
        key: "TUE_KY_PHUC",
        level: "bad",
        note: "Phục Binh + Thái Tuế + Hóa Kỵ → lo buồn, kiện tụng, bị tiểu nhân bủa vây."
      });
    }
    if (has("Thiên Hình")) {
      combos.push({
        key: "BINH_HINH",
        level: "bad",
        note: "Phục Binh gặp Thiên Hình → dễ tranh đấu, dụng hình, bị phục kích."
      });
    }
    if (has("Tướng Quân") && has("Thai")) {
      combos.push({
        key: "THAI_PHUC_VUONG_TUONG",
        level: "mixed",
        note: "Phục Binh + Tướng Quân + Thai → chuyện nam nữ/con cái đến bất ngờ; vừa hỷ vừa lo."
      });
    }
  }

  // Bệnh Phù
  if (star === "Bệnh Phù") {
    if (has("Đào Hoa") || has("Thiên Riêu")) {
      combos.push({
        key: "DAO_RIEU_BENH_PHU",
        level: "bad",
        note: "Bệnh Phù gặp Đào Hoa/Thiên Riêu → suy nhược do tình/sắc/dục."
      });
    }
    if (has("Thiên Hình") || has("Hóa Kỵ") || has("Địa Không")) {
      combos.push({
        key: "BENH_PHU_HINH_KY",
        level: "bad",
        note: "Bệnh Phù gặp Hình/Kỵ/Không → bệnh khó, dễ phong sang hoặc nan y."
      });
    }
  }

  // Hỷ Thần
  if (star === "Hỷ Thần") {
    if (has("Đào Hoa") || has("Hồng Loan") || has("Thiên Hỷ")) {
      combos.push({
        key: "HY_TIN_HON_NHAN",
        level: "good",
        note: "Hỷ Thần hội Đào Hoa/Hồng Loan/Thiên Hỷ → tin vui tình cảm, cưới hỏi."
      });
    }
  }

  // Tấu Thư
  if (star === "Tấu Thư") {
    if (has("Phượng Các")) {
      combos.push({
        key: "TAU_PHUONG",
        level: "good",
        note: "Tấu Thư gặp Phượng Các → khéo nói, thính tai, danh văn."
      });
    }
  }

  // Quan Phủ
  if (star === "Quan Phủ") {
    if (has("Thái Tuế")) {
      combos.push({
        key: "QUAN_PHU_THAI_TUE",
        level: "bad",
        note: "Quan Phủ gặp Thái Tuế → ra cửa công, kiện tụng, thủ tục nặng."
      });
    }
  }

  // Đại Hao / Tiểu Hao
  if (star === "Đại Hao" || star === "Tiểu Hao") {
    if (has("Cự Môn") || has("Thiên Cơ")) {
      combos.push({
        key: "CHUNG_THUY_TRIEU_DONG",
        level: "good",
        note: "Hao gặp Cự Môn/Thiên Cơ → cát cách, hao đi cái ám muội, mở sáng."
      });
    }
    if (has("Lộc Tồn") || has("Hóa Lộc")) {
      combos.push({
        key: "LOC_PHUNG_XUNG_PHA",
        level: "bad",
        note: "Hao gặp Lộc Tồn/Hóa Lộc → lộc bị xung phá, tài dễ tiêu tán."
      });
    }
  }

  // Lực Sỹ
  if (star === "Lực Sỹ") {
    if (has("Kình Dương")) {
      combos.push({
        key: "LY_QUANG_BAT_PHONG",
        level: "mixed",
        note: "Lực Sỹ gặp Kình Dương → có tài mà không gặp thời, lao lực."
      });
    }
  }

  return combos;
}

// ===== Main interpreter =====

/**
 * @param {{
 *   star: string,
 *   palace?: string,
 *   stars?: string[],
 *   starInfoDb?: Record<string, any>
 * }} input
 */
export function interpretBacSyRingStar(input) {
  const starRaw = input?.star || "";
  const palace = input?.palace || "";
  const starsInPalace = input?.stars || [];
  const starInfoDb = input?.starInfoDb || {};

  const starNorm = normalize(starRaw);
  const star = BAC_SY_NAME_MAP[starNorm] || starRaw;

  const ringMeta = BAC_SY_RING_META[star] || { summary: "Đang cập nhật...", advice: "" };
  const info = starInfoDb[star] || {};

  const combos = detectBacSyCombos(star, starsInPalace);

  // gợi ý cát/hung đơn giản
  const goodHits = combos.filter(c => c.level === "good").length;
  const badHits = combos.filter(c => c.level === "bad").length;

  let rating = "neutral";
  if (goodHits > badHits) rating = "good";
  else if (badHits > goodHits) rating = "bad";

  return {
    ring: "Vòng Bác Sỹ",
    starKey: star,
    starName: star,
    palace,
    summary: ringMeta.summary || info.meaning || "Đang cập nhật...",
    coreMeaning: info.meaning ? [info.meaning] : [],
    hanh: info.hanh,
    type: info.type,
    group: info.group || "Vòng Bác Sỹ",
    combos,
    rating,
    advice: ringMeta.advice || info.advice || "",
    origin: info.origin,
    notes: info.notes,
  };
}

export function interpretBacSyRing(chart) {
  // Iterate over all stars in the Bac Sy ring and interpret them if present in the chart
  const results = [];
  // We need to know which palace each star is in.
  // We can iterate over palaces and check for Bac Sy stars.

  if (!chart || !chart.palaces) return [];

  Object.values(chart.palaces).forEach(palace => {
    palace.stars.forEach(star => {
      if (BAC_SY_NAME_MAP[normalize(star)]) {
        results.push(interpretBacSyRingStar({
          star,
          palace: palace.key, // or palace.name if available
          stars: palace.stars
        }));
      }
    });
  });

  return results;
}

export default {
  interpretBacSyRingStar,
  interpretBacSyRing
};
