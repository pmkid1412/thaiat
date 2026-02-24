// utils/placements.js
import {
  DIA_CHI, CHI_INDEX, LOC_TON_POS_BY_CAN, KHOI_VIET_BY_CAN, TU_HOA_BY_CAN,
  THIEN_QUAN_PHUC_BY_CAN, LUU_NIEN_VAN_TINH_BY_CAN, THIEN_TRU_BY_CAN, LUU_HA_BY_CAN,
  THAI_TUE_RING, TUONG_TINH_BY_CHI, DUC_KHONG_BASES, LONG_TRI_BASE, PHUONG_CAC_BASE,
  HONG_LOAN_THIEN_HY_BY_CHI, THIEN_KHOC_HU_BY_CHI, CO_THAN_QUA_TU_BY_GROUP,
  PHA_TOAI_BY_GROUP, TA_HUU_BASES, THIEN_DIA_GIAI_BASES, THIEN_HINH_DIEU_BY_MONTH,
  TUAN_KHONG_BY_YEAR_STEM_BRANCH_GROUP, TRIET_KHONG_BY_CAN,
  DIA_KIEP_BASE, DIA_KHONG_BASE, HOA_LINH_BASE_BY_TAM_HOP, BAC_SY_RING,
  KINH_DUONG_OFFSET_FROM_LOC_TON, DA_LA_OFFSET_FROM_LOC_TON, QUOC_AN_OFFSET_FROM_LOC_TON, DUONG_PHU_OFFSET_FROM_LOC_TON
} from "./constants_mappings.js";

export const move = (startChi, offset) => {
  const idx = CHI_INDEX[startChi];
  return DIA_CHI[(idx + offset + 1200) % 12];
};

export const countFromBaseToYear = (baseChi, yearChi, clockwise = true) => {
  const base = CHI_INDEX[baseChi], y = CHI_INDEX[yearChi];
  if (clockwise) return (y - base + 12) % 12;
  return (base - y + 12) % 12;
};

// Utility functions for star checking
export const uniqStars = (arr) => [...new Set(arr)];
export const hasAll = (list, subset) => subset.every(s => list.includes(s));
export const hasAny = (list, subset) => subset.some(s => list.includes(s));
export const overlapCount = (list1, list2) => list1.filter(x => list2.includes(x)).length;

// Lộc Tồn + Kình/Đà/Quốc Ấn/Đường Phù
export function placeLocTonSet(canYear) {
  const loc = LOC_TON_POS_BY_CAN[canYear];
  if (!loc) return {};
  return {
    "Lộc Tồn": loc,
    "Kình Dương": move(loc, KINH_DUONG_OFFSET_FROM_LOC_TON),
    "Đà La": move(loc, DA_LA_OFFSET_FROM_LOC_TON),
    "Quốc Ấn": move(loc, QUOC_AN_OFFSET_FROM_LOC_TON),
    "Đường Phù": move(loc, DUONG_PHU_OFFSET_FROM_LOC_TON),
  };
}

// Khôi Việt
export function placeKhoiViet(canYear) {
  const kv = KHOI_VIET_BY_CAN[canYear];
  if (!kv) return {};
  return { "Thiên Khôi": kv.khoi, "Thiên Việt": kv.viet };
}

// Tứ hóa labels attached to main stars
export function getTuHoaMap(canYear) {
  return TU_HOA_BY_CAN[canYear] || {};
}

// Thiên Quan/Phúc (by Can)
export function placeThienQuanPhuc(canYear) {
  const d = THIEN_QUAN_PHUC_BY_CAN[canYear];
  if (!d) return {};
  return { "Thiên Quan": d.quan.split(" ")[1], "Thiên Phúc": d.phuc };
}

// Lưu niên văn tinh / thiên trù / lưu hà
export function placeYearlySingles(canYear) {
  return {
    "Lưu Niên Văn Tinh": LUU_NIEN_VAN_TINH_BY_CAN[canYear],
    "Thiên Trù": THIEN_TRU_BY_CAN[canYear],
    "Lưu Hà": LUU_HA_BY_CAN[canYear],
  };
}

// Vòng Thái Tuế (start at year Chi, clockwise)
export function placeThaiTueRing(yearChi) {
  const start = CHI_INDEX[yearChi];
  const res = {};
  THAI_TUE_RING.forEach((name, i) => {
    res[name] = DIA_CHI[(start + i) % 12];
  });
  return res;
}

// Vòng Tướng Tinh
export function placeTuongTinh(yearChi) {
  const d = TUONG_TINH_BY_CHI[yearChi];
  return d ? {
    "Thiên Mã": d.thienMa, "Đào Hoa": d.daoHoa, "Hoa Cái": d.hoaCai,
    "Kiếp Sát": d.kiepSat, "Tướng Tinh": d.tuongTinh
  } : {};
}

// Nguyệt Đức / Thiên Đức / Thiên Không
export function placeDucKhong(yearChi) {
  const res = {};
  const yearIdx = CHI_INDEX[yearChi];
  res["Nguyệt Đức"] = move(DUC_KHONG_BASES.nguyetDucBase, yearIdx);
  res["Thiên Đức"] = move(DUC_KHONG_BASES.thienDucBase, yearIdx);
  res["Thiên Không (Đức)"] = move(DUC_KHONG_BASES.thienKhongBase, yearIdx);
  return res;
}

// Long Trì / Phượng Các
export function placeLongPhuong(yearChi) {
  const yearIdx = CHI_INDEX[yearChi];
  return {
    "Long Trì": move(LONG_TRI_BASE, yearIdx),
    "Phượng Các": move(PHUONG_CAC_BASE, -yearIdx),
  };
}

// Hồng Loan / Thiên Hỷ
export function placeHongHy(yearChi) {
  const d = HONG_LOAN_THIEN_HY_BY_CHI[yearChi];
  return d ? { "Hồng Loan": d.hong, "Thiên Hỷ": d.hy } : {};
}

// Thiên Khốc / Thiên Hư
export function placeKhocHu(yearChi) {
  const d = THIEN_KHOC_HU_BY_CHI[yearChi];
  return d ? { "Thiên Khốc": d.khoc, "Thiên Hư": d.hu } : {};
}

// Cô Thần / Quả Tú
export function placeCoQua(yearChi) {
  const g = CO_THAN_QUA_TU_BY_GROUP.find(x => x.years.includes(yearChi));
  return g ? { "Cô Thần": g.coThan, "Quả Tú": g.quaTu } : {};
}

// Phá Toái
export function placePhaToai(yearChi) {
  const g = PHA_TOAI_BY_GROUP.find(x => x.years.includes(yearChi));
  return g ? { "Phá Toái": g.phaToai } : {};
}

// Tả Phù / Hữu Bật by month
export function placeTaHuu(month) {
  const taOff = (month - 1); // from Thìn cw
  const huuOff = -(month - 1); // from Tuất ccw
  return {
    "Tả Phù": move(TA_HUU_BASES.taPhuBase, taOff),
    "Hữu Bật": move(TA_HUU_BASES.huuBatBase, huuOff),
  };
}

// Thiên Giải / Địa Giải by month
export function placeThienDiaGiai(month) {
  const off = month - 1;
  return {
    "Thiên Giải": move(THIEN_DIA_GIAI_BASES.thienGiaiBase, off),
    "Địa Giải": move(THIEN_DIA_GIAI_BASES.diaGiaiBase, off),
  };
}

// Thiên Hình / Thiên Diêu by month (direct table)
export function placeHinhDieu(month) {
  const d = THIEN_HINH_DIEU_BY_MONTH[month];
  return d ? { "Thiên Hình": d.thienHinh, "Thiên Diêu": d.thienDieu } : {};
}

// Văn Xương / Văn Khúc by hour
export function placeXuongKhuc(hourChiIndex) {
  // Văn Xương: Khởi Tuất, nghịch đến giờ sinh. (Tý=Tuất, Sửu=Dậu...)
  // Văn Khúc: Khởi Thìn, thuận đến giờ sinh. (Tý=Thìn, Sửu=Tỵ...)

  // Note: hourChiIndex 0 for Tý, 1 for Sửu...

  // Xương: Base Tuất, move CCW by hourChiIndex (using move with negative offset)
  const xuong = move("Tuất", -hourChiIndex);

  // Khúc: Base Thìn, move CW by hourChiIndex
  const khuc = move("Thìn", hourChiIndex);

  return {
    "Văn Xương": xuong,
    "Văn Khúc": khuc,
  };
}

// Vòng Trường Sinh (Nam Phái)
export function placeTruongSinhRing(cucNum, isThuan = true) {
  // 2: Thủy, 3: Mộc, 4: Kim, 5: Thổ, 6: Hỏa
  // Thủy (2) -> Thân
  // Mộc (3) -> Hợi
  // Kim (4) -> Tỵ
  // Thổ (5) -> Thân (theo Thủy)
  // Hỏa (6) -> Dần

  let startChi = "";
  switch (cucNum) {
    case 2: startChi = "Thân"; break;
    case 3: startChi = "Hợi"; break;
    case 4: startChi = "Tỵ"; break;
    case 5: startChi = "Thân"; break;
    case 6: startChi = "Dần"; break;
    default: return {};
  }

  const stages = [
    "Trường Sinh", "Mộc Dục", "Quan Đới", "Lâm Quan", "Đế Vượng", "Suy",
    "Bệnh", "Tử", "Mộ", "Tuyệt", "Thai", "Dưỡng"
  ];

  const out = {};
  stages.forEach((stage, i) => {
    // isThuan = true -> Clockwise (+i)
    // isThuan = false -> Counter-Clockwise (-i)
    const offset = isThuan ? i : -i;
    out[stage] = move(startChi, offset);
  });
  return out;
}



// Ân Quang / Thiên Quý by day relative to Xương/Khúc
export function placeAnQuangThienQuy(day, vanXuongPos, vanKhucPos) {
  const aq = move(vanXuongPos, day - 1); // count cw from Xương as day1 to day
  const tq = move(vanKhucPos, -(day - 1)); // count ccw from Khúc as day1 to day
  return {
    "Ân Quang": move(aq, -1),
    "Thiên Quý": move(tq, -1),
  };
}

// Tam Thai / Bát Toạ by day from Tả/Hữu
export function placeTamThaiBatToa(day, taPhuPos, huuBatPos) {
  return {
    "Tam Thai": move(taPhuPos, day - 1),
    "Bát Toạ": move(huuBatPos, -(day - 1)),
  };
}

// Thai Phụ / Phong Cáo from Văn Khúc +/-3
export function placeThaiPhuPhongCao(vanKhucPos) {
  return {
    "Thai Phụ": move(vanKhucPos, +2),
    "Phong Cáo": move(vanKhucPos, -2),
  };
}

// Địa Kiếp / Địa Không by hour (base Hợi)
export function placeDiaKhongKiep(hourChiIndex) {
  // Rule: Khởi Hợi là giờ Tý.
  // Địa Kiếp: Thuận (Clockwise)
  // Địa Không: Nghịch (Counter-Clockwise)
  // Example: Hour Tý (idx 0) -> Offset 0 -> At Hợi.
  // Example: Hour Sửu (idx 1) -> Offset 1 -> Kiếp at Tý, Không at Tuất.

  return {
    "Địa Kiếp": move(DIA_KIEP_BASE, hourChiIndex),
    "Địa Không": move(DIA_KHONG_BASE, -hourChiIndex),
  };
}

// Hỏa Tinh / Linh Tinh
export function placeHoaLinh(yearChi, hourChiIndex, isThuanCuc) {
  const b = HOA_LINH_BASE_BY_TAM_HOP.find(x => x.years.includes(yearChi));
  if (!b) return {};
  if (isThuanCuc) {
    // Dương Nam, Âm Nữ: Hỏa Thuận, Linh Nghịch
    return {
      "Hỏa Tinh": move(b.hoaBase, hourChiIndex),
      "Linh Tinh": move(b.linhBase, -hourChiIndex),
    };
  } else {
    // Âm Nam, Dương Nữ: Hỏa Nghịch, Linh Thuận
    return {
      "Hỏa Tinh": move(b.hoaBase, -hourChiIndex),
      "Linh Tinh": move(b.linhBase, hourChiIndex),
    };
  }
}

// Tuần Không / Triệt Không
export function placeTuanTriet(canYear, fullYearName) {
  const tuanBlock = TUAN_KHONG_BY_YEAR_STEM_BRANCH_GROUP.find(b => b.years.includes(fullYearName));
  const tuan = tuanBlock ? tuanBlock.tuan : [];
  const triet = TRIET_KHONG_BY_CAN[canYear] || [];
  return {
    "Tuần Không": tuan,
    "Triệt Không": triet,
  };
}

// Vòng Bác Sỹ (start from Bác Sỹ at Lộc Tồn, direction by isThuanCuc)
export function placeBacSyRing(locTonPos, isThuanCuc) {
  const res = {};
  const start = CHI_INDEX[locTonPos];
  BAC_SY_RING.forEach((name, i) => {
    const idx = isThuanCuc ? (start + i) % 12 : (start - i + 12) % 12;
    res[name] = DIA_CHI[idx];
  });
  return res;
}

// ============================================================
// SECTION E: Lưu Niên Đại Vận (ANSAOTUV_PROD_1 — SSOT)
// Yearly palace within a Đại Vận decade.
// Rule:
//   Năm 1 → tại gốc đại vận
//   Năm 2 → tại cung đối xung
//   Năm 3 → từ cung đối xung lùi 1 cung (nghịch chiều đại vận)
//   Năm 4 → quay lại cung đối xung
//   Năm 5-9 → tiến dần từng cung
//   Năm 10 → quay về cung gốc
// ============================================================
export function computeLuuNienDaiVan(daiVanChi, clockwise) {
  const gocIdx = CHI_INDEX[daiVanChi];
  const doiXungIdx = (gocIdx + 6) % 12;
  const dir = clockwise ? 1 : -1;

  // Each position is an index in DIA_CHI
  const positions = [];
  // Năm 1: gốc
  positions.push(gocIdx);
  // Năm 2: đối xung
  positions.push(doiXungIdx);
  // Năm 3: từ đối xung lùi 1 (nghịch chiều đại vận = -dir)
  positions.push((doiXungIdx - dir + 12) % 12);
  // Năm 4: quay lại đối xung
  positions.push(doiXungIdx);
  // Năm 5-9: tiến dần từng cung (theo chiều đại vận) từ đối xung
  for (let i = 1; i <= 5; i++) {
    positions.push((doiXungIdx + dir * i + 12) % 12);
  }
  // Năm 10: quay về gốc
  positions.push(gocIdx);

  return positions.map((idx, i) => ({
    year: i + 1,
    chi: DIA_CHI[idx],
  }));
}

// ============================================================
// SECTION F: Tiểu Vận (ANSAOTUV_PROD_1 — SSOT)
// Minor fortune cycle by tam hợp of birth year.
// Male → clockwise, Female → counter-clockwise.
// Base:
//   Dần Ngọ Tuất → Thìn
//   Thân Tý Thìn → Tuất
//   Hợi Mão Mùi → Sửu
//   Tỵ Dậu Sửu → Mùi
// ============================================================
const TIEU_VAN_BASE = [
  { years: ["Dần", "Ngọ", "Tuất"], base: "Thìn" },
  { years: ["Thân", "Tý", "Thìn"], base: "Tuất" },
  { years: ["Hợi", "Mão", "Mùi"], base: "Sửu" },
  { years: ["Tỵ", "Dậu", "Sửu"], base: "Mùi" },
];

export function computeTieuVan(yearBranch, isMale, lunarAge) {
  const group = TIEU_VAN_BASE.find(g => g.years.includes(yearBranch));
  if (!group) return null;
  const baseIdx = CHI_INDEX[group.base];
  // Direction: Male → clockwise (thuận), Female → counter-clockwise (nghịch)
  const dir = isMale ? 1 : -1;
  // Start from base at age 1, advance each year
  const offset = (lunarAge - 1) * dir;
  const idx = ((baseIdx + offset) % 12 + 12) % 12;
  return DIA_CHI[idx];
}

// ============================================================
// SECTION H: Tính Tuổi Âm Lịch (ANSAOTUV_PROD_1 — SSOT)
// Tuổi = 1 tại năm sinh âm lịch. Đếm thuận theo bảng 60 Hoa Giáp.
// ============================================================
export function computeLunarAge(birthLunarYear, currentLunarYear) {
  return currentLunarYear - birthLunarYear + 1;
}
