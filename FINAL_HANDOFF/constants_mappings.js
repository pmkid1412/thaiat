// constants/mappings.js
// All placement mappings you provided so far.

export const THIEN_CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
export const DIA_CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
export const CHI_INDEX = Object.fromEntries(DIA_CHI.map((c, i) => [c, i]));
export const CAN_INDEX = Object.fromEntries(THIEN_CAN.map((c, i) => [c, i]));

// Lộc Tồn positions by Can year
export const LOC_TON_POS_BY_CAN = {
  "Giáp": "Dần",
  "Ất": "Mão",
  "Bính": "Tỵ",
  "Đinh": "Ngọ",
  "Mậu": "Tỵ",
  "Kỷ": "Ngọ",
  "Canh": "Thân",
  "Tân": "Dậu",
  "Nhâm": "Hợi",
  "Quý": "Tý",
};
// Kình Dương always before Lộc Tồn (clockwise), Đà La after (clockwise)
export const KINH_DUONG_OFFSET_FROM_LOC_TON = 1; // Tiền Kình (Forward)
export const DA_LA_OFFSET_FROM_LOC_TON = -1; // Hậu Đà (Backward)

// Quốc Ấn: LocTon palace =1, count clockwise to 9
export const QUOC_AN_OFFSET_FROM_LOC_TON = 8;
// Đường Phù: LocTon palace =1, count counter-clockwise to 8
export const DUONG_PHU_OFFSET_FROM_LOC_TON = -7;

// Thiên Khôi (Dương quý nhân) & Thiên Việt (Âm quý nhân)
export const KHOI_VIET_BY_CAN = {
  "Giáp": { khoi: "Sửu", viet: "Mùi" },
  "Ất": { khoi: "Tý", viet: "Thân" },
  "Bính": { khoi: "Hợi", viet: "Dậu" },
  "Đinh": { khoi: "Dậu", viet: "Hợi" },  // SSOT: khoi=DAU, viet=HOI
  "Mậu": { khoi: "Sửu", viet: "Mùi" },
  "Kỷ": { khoi: "Tý", viet: "Thân" },
  "Canh": { khoi: "Sửu", viet: "Mùi" },
  "Tân": { khoi: "Ngọ", viet: "Dần" },
  "Nhâm": { khoi: "Mão", viet: "Tỵ" },
  "Quý": { khoi: "Tỵ", viet: "Mão" },  // SSOT: khoi=TI, viet=MAO
};

// Tứ Hóa by Can year (Lộc, Quyền, Khoa, Kỵ)
export const TU_HOA_BY_CAN = {
  "Giáp": { loc: "Liêm Trinh", quyen: "Phá Quân", khoa: "Vũ Khúc", ky: "Thái Dương" },
  "Ất": { loc: "Thiên Cơ", quyen: "Thiên Lương", khoa: "Tử Vi", ky: "Thái Âm" },
  "Bính": { loc: "Thiên Đồng", quyen: "Thiên Cơ", khoa: "Văn Xương", ky: "Liêm Trinh" },
  "Đinh": { loc: "Thái Âm", quyen: "Thiên Đồng", khoa: "Thiên Cơ", ky: "Cự Môn" },
  "Mậu": { loc: "Tham Lang", quyen: "Thái Âm", khoa: "Hữu Bật", ky: "Thiên Cơ" },
  "Kỷ": { loc: "Vũ Khúc", quyen: "Tham Lang", khoa: "Thiên Lương", ky: "Văn Khúc" },
  "Canh": { loc: "Thái Dương", quyen: "Vũ Khúc", khoa: "Thái Âm", ky: "Thiên Đồng" },
  "Tân": { loc: "Cự Môn", quyen: "Thái Dương", khoa: "Văn Khúc", ky: "Văn Xương" },
  "Nhâm": { loc: "Thiên Lương", quyen: "Tử Vi", khoa: "Tả Phù", ky: "Vũ Khúc" },  // SSOT fix: khoa=TA_PHU (was Thiên Phủ)
  "Quý": { loc: "Phá Quân", quyen: "Cự Môn", khoa: "Thái Âm", ky: "Tham Lang" },
};

// Thiên Quan, Thiên Phúc by Can year
export const THIEN_QUAN_PHUC_BY_CAN = {
  "Giáp": { quan: "Tân Mùi", phuc: "Dậu" },
  "Ất": { quan: "Canh Thìn", phuc: "Thân" },
  "Bính": { quan: "Quý Tỵ", phuc: "Tý" },
  "Đinh": { quan: "Nhâm Dần", phuc: "Hợi" },
  "Mậu": { quan: "Ất Mão", phuc: "Mão" },
  "Kỷ": { quan: "Giáp Tuất", phuc: "Dần" },
  "Canh": { quan: "Đinh Hợi", phuc: "Ngọ" },
  "Tân": { quan: "Bính Thân", phuc: "Tỵ" },
  "Nhâm": { quan: "Kỷ Dậu", phuc: "Ngọ" },
  "Quý": { quan: "Mậu Ngọ", phuc: "Tỵ" },
};

// Lưu Niên Văn Tinh by Can year
export const LUU_NIEN_VAN_TINH_BY_CAN = {
  "Giáp": "Tỵ", "Ất": "Ngọ", "Bính": "Thân", "Đinh": "Ngọ", "Mậu": "Thân", "Kỷ": "Dậu", "Canh": "Hợi", "Tân": "Tý", "Nhâm": "Dần", "Quý": "Mão"
};

// Thiên Trù by Can year
export const THIEN_TRU_BY_CAN = {
  "Giáp": "Tỵ", "Ất": "Ngọ", "Bính": "Tỵ", "Đinh": "Ngọ", "Mậu": "Thân", "Kỷ": "Dậu", "Canh": "Hợi", "Tân": "Tý", "Nhâm": "Dần", "Quý": "Mão"
};

// Lưu Hà by Can year
export const LUU_HA_BY_CAN = {
  "Giáp": "Dậu", "Ất": "Tuất", "Bính": "Mùi", "Đinh": "Thân", "Mậu": "Tỵ", "Kỷ": "Ngọ", "Canh": "Mão", "Tân": "Thìn", "Nhâm": "Hợi", "Quý": "Dần"
};

// Vòng Thái Tuế order (starting from Chi year, clockwise)
export const THAI_TUE_RING = [
  "Thái Tuế", "Thiếu Dương", "Tang Môn", "Thiếu Âm", "Quan Phù", "Tử Phù",
  "Tuế Phá", "Long Đức", "Bạch Hổ", "Phúc Đức", "Điếu Khách", "Trực Phù"
];

// Vòng Tướng Tinh (Thiên Mã, Đào Hoa, Hoa Cái, Kiếp Sát, Tướng Tinh)
export const TUONG_TINH_BY_CHI = {
  "Tý": { thienMa: "Dần", daoHoa: "Dậu", hoaCai: "Thìn", kiepSat: "Tỵ", tuongTinh: "Tý" },
  "Sửu": { thienMa: "Hợi", daoHoa: "Ngọ", hoaCai: "Sửu", kiepSat: "Dần", tuongTinh: "Dậu" },
  "Dần": { thienMa: "Thân", daoHoa: "Mão", hoaCai: "Tuất", kiepSat: "Hợi", tuongTinh: "Ngọ" },
  "Mão": { thienMa: "Tỵ", daoHoa: "Tý", hoaCai: "Mùi", kiepSat: "Thân", tuongTinh: "Mão" },
  "Thìn": { thienMa: "Dần", daoHoa: "Dậu", hoaCai: "Thìn", kiepSat: "Tỵ", tuongTinh: "Tý" },
  "Tỵ": { thienMa: "Hợi", daoHoa: "Ngọ", hoaCai: "Sửu", kiepSat: "Dần", tuongTinh: "Dậu" },
  "Ngọ": { thienMa: "Thân", daoHoa: "Mão", hoaCai: "Tuất", kiepSat: "Hợi", tuongTinh: "Ngọ" },
  "Mùi": { thienMa: "Tỵ", daoHoa: "Tý", hoaCai: "Mùi", kiepSat: "Thân", tuongTinh: "Mão" },
  "Thân": { thienMa: "Dần", daoHoa: "Dậu", hoaCai: "Thìn", kiepSat: "Tỵ", tuongTinh: "Tý" },
  "Dậu": { thienMa: "Hợi", daoHoa: "Ngọ", hoaCai: "Sửu", kiepSat: "Dần", tuongTinh: "Dậu" },
  "Tuất": { thienMa: "Thân", daoHoa: "Mão", hoaCai: "Tuất", kiepSat: "Hợi", tuongTinh: "Ngọ" },
  "Hợi": { thienMa: "Tỵ", daoHoa: "Tý", hoaCai: "Mùi", kiepSat: "Thân", tuongTinh: "Mão" },
};

// Nguyệt Đức / Thiên Đức / Thiên Không (count from base palaces)
export const DUC_KHONG_BASES = {
  nguyetDucBase: "Tỵ",  // base palace treated as year Tý, count clockwise to year chi
  thienDucBase: "Dậu",
  thienKhongBase: "Sửu"
};

// Long Trì / Phượng Các
export const LONG_TRI_BASE = "Thìn"; // base = year Tý, count clockwise
export const PHUONG_CAC_BASE = "Tuất"; // base = year Tý, count counter-clockwise

// Hồng Loan / Thiên Hỷ by Chi year (your final reversed table)
export const HONG_LOAN_THIEN_HY_BY_CHI = {
  "Tý": { hong: "Mão", hy: "Dậu" },
  "Sửu": { hong: "Dần", hy: "Thân" },
  "Dần": { hong: "Sửu", hy: "Mùi" },
  "Mão": { hong: "Tý", hy: "Ngọ" },
  "Thìn": { hong: "Hợi", hy: "Tỵ" },
  "Tỵ": { hong: "Tuất", hy: "Thìn" },
  "Ngọ": { hong: "Dậu", hy: "Mão" },
  "Mùi": { hong: "Thân", hy: "Dần" },
  "Thân": { hong: "Mùi", hy: "Sửu" },
  "Dậu": { hong: "Ngọ", hy: "Tý" },
  "Tuất": { hong: "Tỵ", hy: "Hợi" },
  "Hợi": { hong: "Thìn", hy: "Tuất" },
};

// Thiên Khốc / Thiên Hư
export const THIEN_KHOC_HU_BY_CHI = {
  "Tý": { khoc: "Ngọ", hu: "Ngọ" },
  "Sửu": { khoc: "Tỵ", hu: "Mùi" },
  "Dần": { khoc: "Thìn", hu: "Thân" },
  "Mão": { khoc: "Mão", hu: "Dậu" },
  "Thìn": { khoc: "Dần", hu: "Tuất" },
  "Tỵ": { khoc: "Sửu", hu: "Hợi" },
  "Ngọ": { khoc: "Tý", hu: "Tý" },
  "Mùi": { khoc: "Hợi", hu: "Sửu" },
  "Thân": { khoc: "Tuất", hu: "Dần" },
  "Dậu": { khoc: "Dậu", hu: "Mão" },
  "Tuất": { khoc: "Thân", hu: "Thìn" },
  "Hợi": { khoc: "Mùi", hu: "Tỵ" },
};

// Cô Thần / Quả Tú by group
export const CO_THAN_QUA_TU_BY_GROUP = [
  { years: ["Dần", "Mão", "Thìn"], coThan: "Tỵ", quaTu: "Sửu" },
  { years: ["Tỵ", "Ngọ", "Mùi"], coThan: "Thân", quaTu: "Thìn" },
  { years: ["Thân", "Dậu", "Tuất"], coThan: "Hợi", quaTu: "Mùi" },
  { years: ["Hợi", "Tý", "Sửu"], coThan: "Dần", quaTu: "Tuất" },
];

// Phá Toái by year group
export const PHA_TOAI_BY_GROUP = [
  { years: ["Dần", "Thân", "Tỵ", "Hợi"], phaToai: "Dậu" },
  { years: ["Tý", "Ngọ", "Mão", "Dậu"], phaToai: "Tỵ" },
  { years: ["Thìn", "Tuất", "Sửu", "Mùi"], phaToai: "Sửu" },
];

// Tả Phù / Hữu Bật by month
export const TA_HUU_BASES = { taPhuBase: "Thìn", huuBatBase: "Tuất" }; // taPhu count cw, huuBat count ccw

// Thiên Giải / Địa Giải by month
export const THIEN_DIA_GIAI_BASES = { thienGiaiBase: "Thân", diaGiaiBase: "Mùi" };

// Thiên Hình / Thiên Diêu by month (table)
export const THIEN_HINH_DIEU_BY_MONTH = {
  1: { thienHinh: "Dậu", thienDieu: "Sửu" },
  2: { thienHinh: "Tuất", thienDieu: "Dần" },
  3: { thienHinh: "Hợi", thienDieu: "Mão" },
  4: { thienHinh: "Tý", thienDieu: "Thìn" },
  5: { thienHinh: "Sửu", thienDieu: "Tỵ" },
  6: { thienHinh: "Dần", thienDieu: "Ngọ" },
  7: { thienHinh: "Mão", thienDieu: "Mùi" },
  8: { thienHinh: "Thìn", thienDieu: "Thân" },
  9: { thienHinh: "Tỵ", thienDieu: "Dậu" },
  10: { thienHinh: "Ngọ", thienDieu: "Tuất" },
  11: { thienHinh: "Mùi", thienDieu: "Hợi" },
  12: { thienHinh: "Thân", thienDieu: "Tý" },
};

// Tuần Không by 6 Giáp groups (you gave 6 blocks)
export const TUAN_KHONG_BY_YEAR_STEM_BRANCH_GROUP = [
  { years: ["Giáp Tý", "Ất Sửu", "Bính Dần", "Đinh Mão", "Mậu Thìn", "Kỷ Tỵ", "Canh Ngọ", "Tân Mùi", "Nhâm Thân", "Quý Dậu"], tuan: ["Tuất", "Hợi"] },
  { years: ["Giáp Tuất", "Ất Hợi", "Bính Tý", "Đinh Sửu", "Mậu Dần", "Kỷ Mão", "Canh Thìn", "Tân Tỵ", "Nhâm Ngọ", "Quý Mùi"], tuan: ["Thân", "Dậu"] },
  { years: ["Giáp Thân", "Ất Dậu", "Bính Tuất", "Đinh Hợi", "Mậu Tý", "Kỷ Sửu", "Canh Dần", "Tân Mão", "Nhâm Thìn", "Quý Tỵ"], tuan: ["Ngọ", "Mùi"] },
  { years: ["Giáp Ngọ", "Ất Mùi", "Bính Thân", "Đinh Dậu", "Mậu Tuất", "Kỷ Hợi", "Canh Tý", "Tân Sửu", "Nhâm Dần", "Quý Mão"], tuan: ["Thìn", "Tỵ"] },
  { years: ["Giáp Thìn", "Ất Tỵ", "Bính Ngọ", "Đinh Mùi", "Mậu Thân", "Kỷ Dậu", "Canh Tuất", "Tân Hợi", "Nhâm Tý", "Quý Sửu"], tuan: ["Dần", "Mão"] },
  { years: ["Giáp Dần", "Ất Mão", "Bính Thìn", "Đinh Tỵ", "Mậu Ngọ", "Kỷ Mùi", "Canh Thân", "Tân Dậu", "Nhâm Tuất", "Quý Hợi"], tuan: ["Tý", "Sửu"] },
];

// Triệt Không by Can year
export const TRIET_KHONG_BY_CAN = {
  "Giáp": ["Thân", "Dậu"],
  "Kỷ": ["Thân", "Dậu"],
  "Ất": ["Ngọ", "Mùi"],
  "Canh": ["Ngọ", "Mùi"],
  "Bính": ["Thìn", "Tỵ"],
  "Tân": ["Thìn", "Tỵ"],
  "Đinh": ["Dần", "Mão"],
  "Nhâm": ["Dần", "Mão"],
  "Mậu": ["Tý", "Sửu"],
  "Quý": ["Tý", "Sửu"],
};

// Địa Kiếp / Địa Không by hour (base Hợi as Tý)
export const DIA_KIEP_BASE = "Hợi"; // count cw to hour for Kiếp
export const DIA_KHONG_BASE = "Hợi"; // count ccw to hour for Không

// Hỏa Tinh / Linh Tinh bases by year tam hợp
export const HOA_LINH_BASE_BY_TAM_HOP = [
  { years: ["Dần", "Ngọ", "Tuất"], hoaBase: "Sửu", linhBase: "Mão" },
  { years: ["Thân", "Tý", "Thìn"], hoaBase: "Dần", linhBase: "Tuất" },
  { years: ["Hợi", "Mão", "Mùi"], hoaBase: "Dậu", linhBase: "Tuất" },
  { years: ["Tỵ", "Dậu", "Sửu"], hoaBase: "Mão", linhBase: "Tuất" },
];

// Bác Sỹ ring order (starting from Bác Sỹ at Lộc Tồn, direction by gender/yin-yang)
export const BAC_SY_RING = [
  "Bác Sỹ", "Lực Sỹ", "Thanh Long", "Tiểu Hao", "Tướng Quân", "Tấu Thư",
  "Phi Liêm", "Hỷ Thần", "Bệnh Phù", "Đại Hao", "Phục Binh", "Quan Phủ"
];

// Chi Nhị Hợp (Lục Hợp)
export const CHI_NHI_HOP = {
  "Tý": "Sửu", "Sửu": "Tý",
  "Dần": "Hợi", "Hợi": "Dần",
  "Mão": "Tuất", "Tuất": "Mão",
  "Thìn": "Dậu", "Dậu": "Thìn",
  "Tỵ": "Thân", "Thân": "Tỵ",
  "Ngọ": "Mùi", "Mùi": "Ngọ"
};
