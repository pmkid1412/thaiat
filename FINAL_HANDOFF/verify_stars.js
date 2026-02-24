import { buildEngineOutput } from "./coreEngineV1.js";

const input = {
    name: "T",
    gender: "Nam",
    dob: "1975-12-04",
    tob: "20:00",
    calendarType: "lunar",
    timeZone: 7
};
const output = buildEngineOutput(input);
const p = output.chart.palaces;
const all = {};

for (const [k, v] of Object.entries(p)) {
    (v.stars || []).forEach(s => {
        all[s] = v.chi;
    });
}

console.log("=== PHỤ TINH KIỂM TRA ===");
// List of all important subsidiary stars
const starsToCheck = [
    "Tả Phù", "Hữu Bật", "Văn Xương", "Văn Khúc", "Lộc Tồn", "Kình Dương", "Đà La",
    "Hỏa Tinh", "Linh Tinh", "Thiên Khôi", "Thiên Việt", "Địa Không", "Địa Kiếp",
    "Thiên Mã", "Hóa Lộc", "Hóa Quyền", "Hóa Khoa", "Hóa Kỵ", "Đào Hoa", "Hồng Loan",
    "Thiên Hỷ", "Cô Thần", "Quả Tú", "Phá Toái", "Thiên Hình", "Thiên Diêu", "Thai Phụ",
    "Phong Cáo", "Long Trì", "Phượng Các", "Nguyệt Đức", "Thiên Đức", "Thiên Không (Đức)",
    "Lưu Hà", "Thiên Trù", "Kiếp Sát", "Hoa Cái"
];

for (const s of starsToCheck) {
    console.log(s.padEnd(15), "tại:", all[s] || "MISSING");
}

console.log("\n=== VÒNG TRƯỜNG SINH ===");
const truongSinhStars = ["Trường Sinh", "Mộc Dục", "Quan Đới", "Lâm Quan", "Đế Vượng", "Suy", "Bệnh", "Tử", "Mộ", "Tuyệt", "Thai", "Dưỡng"];
for (const s of truongSinhStars) {
    console.log(s.padEnd(15), "tại:", all[s] || "MISSING");
}
