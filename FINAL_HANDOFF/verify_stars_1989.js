import { buildEngineOutput } from "./coreEngineV1.js";

// Test case 2: Nguyễn Việt Phương
// Solar 24/1/1990 = Lunar 28/12/1989 (Kỷ Tỵ), 6:30 (giờ Mão), Nam
const input = {
    name: "Nguyễn Việt Phương",
    gender: "Nam",
    dob: "1989-12-28",
    tob: "06:30",
    calendarType: "lunar",
    timeZone: 7
};
const output = buildEngineOutput(input);
const p = output.chart.palaces;
const cal = output.chart.raw.cal;

console.log("=== THÔNG TIN CƠ BẢN ===");
console.log("Cục:", output.profile?.cuc, "(expected: Hỏa Lục Cục)");
console.log("Mệnh Chi:", p.MENH?.chi, "(expected: Tuất)");
console.log("Can năm:", cal.yearStem, "(expected: Kỷ)");
console.log("Chi năm:", cal.yearBranch, "(expected: Tỵ)");
console.log("Lunar:", JSON.stringify(cal.lunar));

// Build star position map
const all = {};
for (const [k, v] of Object.entries(p)) {
    (v.stars || []).forEach(s => { all[s] = v.chi; });
}

// Expected from reference chart (tuviphucso.com)
const refMain = {
    MENH: { chi: "Tuất", stars: ["Tham Lang"] },
    HUYNH_DE: { chi: "Dậu", stars: ["Thái Âm"] },
    PHU_THE: { chi: "Thân", stars: ["Tử Vi", "Thiên Phủ"] },
    TU_TUC: { chi: "Mùi", stars: ["Thiên Cơ"] },
    TAI: { chi: "Ngọ", stars: ["Phá Quân"] },
    TAT: { chi: "Tỵ", stars: ["Thái Dương"] },
    THIEN_DI: { chi: "Thìn", stars: ["Vũ Khúc"] },
    NO: { chi: "Mão", stars: ["Thiên Đồng"] },
    QUAN: { chi: "Dần", stars: ["Thất Sát"] },
    DIEN: { chi: "Sửu", stars: ["Thiên Lương"] },
    PHUC: { chi: "Tý", stars: ["Liêm Trinh", "Thiên Tướng"] },
    PHU_MAU: { chi: "Hợi", stars: ["Cự Môn"] },
};

const mainStarNames = ["Tử Vi", "Thiên Cơ", "Thái Dương", "Vũ Khúc", "Thiên Đồng", "Liêm Trinh", "Thiên Phủ", "Thái Âm", "Tham Lang", "Cự Môn", "Thiên Tướng", "Thiên Lương", "Thất Sát", "Phá Quân"];

console.log("\n=== 14 CHÍNH TINH ===");
let mainPass = true;
for (const [k, ref] of Object.entries(refMain)) {
    const actual = p[k];
    if (!actual) { console.log("❌", k, "MISSING"); mainPass = false; continue; }
    const chiOk = actual.chi === ref.chi;
    const aStar = (actual.stars || []).filter(s => mainStarNames.includes(s)).sort();
    const rStar = ref.stars.sort();
    const starsOk = JSON.stringify(aStar) === JSON.stringify(rStar);
    const ok = chiOk && starsOk;
    if (!ok) mainPass = false;
    console.log(ok ? "✅" : "❌", k.padEnd(12), "Chi:", actual.chi, chiOk ? "✓" : "✗(→" + ref.chi + ")", "Stars:", aStar.join(",") || "VCD", starsOk ? "✓" : "✗(→" + rStar.join(",") + ")");
}
console.log(mainPass ? "→ ALL 14 MAIN STARS: ✅ PASS" : "→ MAIN STARS: ❌ FAIL");

// Expected subsidiary stars from the reference chart
const refSubs = {
    "Lộc Tồn": "Ngọ",
    "Kình Dương": "Mùi",
    "Đà La": "Tỵ",
    "Tả Phù": "Mão",
    "Hữu Bật": "Hợi",
    "Văn Xương": "Mùi",
    "Văn Khúc": "Ngọ",
    "Thiên Khôi": "Tý",
    "Thiên Việt": "Thân",
    "Hỏa Tinh": "Tý",
    "Linh Tinh": "Sửu",
    "Địa Không": "Thân",
    "Địa Kiếp": "Dần",
    "Thiên Mã": "Hợi",
    "Hóa Lộc": "Thìn",  // Vũ Khúc
    "Hóa Quyền": "Tuất",  // Tham Lang
    "Hóa Khoa": "Sửu",   // Thiên Lương
    "Đào Hoa": "Ngọ",
    "Hồng Loan": "Tuất",
    "Thiên Hỷ": "Thìn",
    "Cô Thần": "Thân",
    "Quả Tú": "Thìn",
    "Phá Toái": "Dậu",
    "Thiên Hình": "Tý",
    "Long Trì": "Dậu",
    "Phượng Các": "Tỵ",
    "Nguyệt Đức": "Tuất",
    "Thiên Đức": "Dần",
    "Thai Phụ": "Thân",
    "Phong Cáo": "Tỵ",  // from image: at top-left with TAT
};

console.log("\n=== PHỤ TINH SO SÁNH ===");
let subPass = true;
for (const [starName, expected] of Object.entries(refSubs)) {
    const actual = all[starName] || "MISSING";
    const ok = actual === expected;
    if (!ok) subPass = false;
    console.log(ok ? "✅" : "❌", starName.padEnd(18), "got:", actual.padEnd(6), ok ? "" : "expected: " + expected);
}
console.log(subPass ? "→ ALL SUBSIDIARY STARS: ✅ PASS" : "→ SUBSIDIARY STARS: ❌ SOME FAIL");

// Truong Sinh ring
console.log("\n=== VÒNG TRƯỜNG SINH ===");
const tsStars = ["Trường Sinh", "Mộc Dục", "Quan Đới", "Lâm Quan", "Đế Vượng", "Suy", "Bệnh", "Tử", "Mộ", "Tuyệt", "Thai", "Dưỡng"];
for (const s of tsStars) {
    console.log(s.padEnd(15), "tại:", all[s] || "MISSING");
}
