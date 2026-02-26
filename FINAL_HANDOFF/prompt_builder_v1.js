import { getStarBrightness, analyzeMenhCuc, analyzeAmDuong, getTuHoaLuuNien } from './star_brightness_table.js';

/**
 * Determine the "Cách Cục Chính" (main formation) from the Mệnh-Tài-Quan triad.
 */
function detectCachCuc(chart) {
  const menhStars = chart.palaces.MENH?.stars || [];
  const taiStars = chart.palaces.TAI?.stars || [];
  const quanStars = chart.palaces.QUAN?.stars || [];
  const allTriad = [...menhStars, ...taiStars, ...quanStars];

  const has = (name) => allTriad.includes(name);

  if (has("Tham Lang") && has("Thất Sát") && has("Phá Quân")) return "Sát Phá Tham";
  if (has("Thiên Cơ") && has("Thái Âm") && has("Thiên Đồng") && has("Thiên Lương")) return "Cơ Nguyệt Đồng Lương";
  if (has("Cự Môn") && has("Thái Dương")) return "Cự Nhật";
  if (has("Tử Vi") && has("Thiên Phủ")) return "Tử Phủ";
  if (has("Vũ Khúc") && has("Tham Lang")) return "Vũ Tham";
  if (has("Liêm Trinh") && has("Tham Lang")) return "Liêm Tham";
  return null;
}

/**
 * Format palace stars with brightness info
 */
function formatPalaceWithBrightness(chart, key, yearlyAdvice) {
  const p = chart.palaces[key];
  if (!p) return "";

  const MAIN_STARS = [
    "Tử Vi", "Thiên Cơ", "Thái Dương", "Vũ Khúc", "Thiên Đồng", "Liêm Trinh",
    "Thiên Phủ", "Thái Âm", "Tham Lang", "Cự Môn", "Thiên Tướng", "Thiên Lương",
    "Thất Sát", "Phá Quân"
  ];

  let parts = [];

  // Main stars with brightness
  const mainInPalace = (p.stars || []).filter(s => MAIN_STARS.includes(s));
  const auxInPalace = (p.stars || []).filter(s => !MAIN_STARS.includes(s));

  mainInPalace.forEach(s => {
    const b = getStarBrightness(s, p.chi);
    parts.push(b ? `${s} [${b}]` : s);
  });

  // Important aux stars (keep them all for AI to reason about)
  if (auxInPalace.length > 0) {
    parts.push("+ " + auxInPalace.join(", "));
  }

  let text = parts.join(", ");

  // Add Tuần / Triệt
  const isTuan = chart.misc?.tuanTriet?.tuan?.includes(p.chi);
  const isTriet = chart.misc?.tuanTriet?.triet?.includes(p.chi);
  if (isTuan) text += " | ★GẶP TUẦN★";
  if (isTriet) text += " | ★GẶP TRIỆT★";

  // Add Detected Combos
  const interp = yearlyAdvice?.mainStars?.[key];
  if (interp && Array.isArray(interp)) {
    const combos = interp.flatMap(x => x.combos || []);
    if (combos.length > 0) {
      text += `\n    → Cách cục: ${combos.join("; ")}`;
    }
  }

  return text;
}

export function buildLLMPrompt(engineOutput, mode = 'full') {
  const { chart, yearlyAdvice } = engineOutput;
  const cal = chart.raw.cal;
  const input = chart.raw.input;

  // --- ANALYSIS DATA ---
  const menhCucAnalysis = analyzeMenhCuc(cal.yearStem, cal.yearBranch, cal.cucNum);
  const amDuongAnalysis = analyzeAmDuong(input?.gender || "Nam", cal.yearStem, chart.palaces.MENH.chi);
  const cachCuc = detectCachCuc(chart);

  // Thân palace
  const thanPalace = Object.values(chart.palaces).find(p => p.isThan);
  const thanInfo = thanPalace
    ? `${thanPalace.name} (${thanPalace.chi})`
    : "Không xác định";

  // Lưu Niên
  const luuNienChi = cal.current?.yearBranch;
  const luuNienPalace = luuNienChi ? Object.values(chart.palaces).find(p => p.chi === luuNienChi) : null;
  const tuHoaLuuNien = cal.current?.yearStem ? getTuHoaLuuNien(cal.current.yearStem) : null;

  // Đại Vận
  const currentAge = cal.current ? (cal.current.lunar.year - cal.lunar.year + 1) : null;
  let daiVanPalace = null;
  if (currentAge) {
    daiVanPalace = Object.values(chart.palaces).find(p => p.ages && currentAge >= p.ages[0] && currentAge <= p.ages[1]);
  }

  // Current year
  const currentYear = cal.current ? `${cal.current.yearStem} ${cal.current.yearBranch}` : "N/A";

  // Profile
  const profile = {
    name: input?.name || "Thân chủ",
    gender: input?.gender === "Nam" ? "Nam" : "Nữ",
    dob: cal.solar.date.toLocaleDateString('vi-VN'),
    lunarDate: `${cal.lunar.day}/${cal.lunar.month}/${cal.lunar.year}`,
    canChi: `${cal.yearStem} ${cal.yearBranch}`,
  };

  // Cục name
  const CUC_NAMES = { 2: "Thủy Nhị Cục", 3: "Mộc Tam Cục", 4: "Kim Tứ Cục", 5: "Thổ Ngũ Cục", 6: "Hỏa Lục Cục" };
  const cucName = CUC_NAMES[cal.cucNum] || `Cục ${cal.cucNum}`;

  // Helper to format a palace
  const fp = (key) => formatPalaceWithBrightness(chart, key, yearlyAdvice);

  // ===================================================================
  // ROLE & TONE
  // ===================================================================
  const roleAndTone = `
# VAI TRÒ
Bạn là một **Chuyên gia Tử Vi Đẩu Số** có kinh nghiệm 30 năm, kết hợp phong cách "Soulful Life Coach". Bạn đọc dữ liệu kỹ thuật từ engine và luận giải thành lời khuyên sâu sắc, thực tế.

# PHONG CÁCH
- Giọng điệu: **Thẳng thắn, sắc bén**, như một thầy tử vi thực thụ, KHÔNG "văn mẫu".
- Phân tích: Dựa trên TƯƠNG TÁC giữa các sao (không liệt kê nghĩa từng sao riêng lẻ).
- Khi gặp TUẦN/TRIỆT: Phải diễn giải tác động cụ thể lên sao chủ cung.
- Khi nói về Miếu/Vượng/Hãm: Phải giải thích ý nghĩa thực tế (không chỉ nói "tốt/xấu").
- Lời khuyên: Cụ thể, hành động được (VD: "Nên kết hôn sau 32 tuổi", "Tránh đầu tư crypto").
- **KHÔNG tự giới thiệu bản thân** (không nói "tôi đã xem qua bộ sao", "với kinh nghiệm 30 năm"...).
- Đi thẳng vào phân tích, không mở đầu sáo rỗng.
`;

  // ===================================================================
  // MODE: LIFETIME (la_so.md format - 4 bước)
  // ===================================================================
  if (mode === 'lifetime') {

    // Build BƯỚC 1: TỔNG QUAN
    let buoc1Data = `
## BƯỚC 1: DỮ LIỆU TỔNG QUAN
- Họ tên: ${profile.name} (${profile.gender})
- Ngày sinh: ${profile.dob} (Âm: ${profile.lunarDate})
- Can Chi năm: ${profile.canChi}`;

    if (menhCucAnalysis) {
      buoc1Data += `
- Mệnh: ${menhCucAnalysis.menhElement} (${menhCucAnalysis.menhFullName}) | Cục: ${cucName}
- Quan hệ Mệnh-Cục: **${menhCucAnalysis.relationship}** → ${menhCucAnalysis.explanation}`;
    } else {
      buoc1Data += `\n- Cục: ${cucName}`;
    }

    if (amDuongAnalysis) {
      buoc1Data += `
- Âm Dương: ${amDuongAnalysis.genderYin} ${profile.gender}, Can ${amDuongAnalysis.yearYin}, Cung Mệnh ${amDuongAnalysis.palaceYin} (${chart.palaces.MENH.chi})
  → ${amDuongAnalysis.explanation}`;
    }

    if (cachCuc) {
      buoc1Data += `\n- Cách cục chính: **${cachCuc}** (Tam hợp Mệnh-Tài-Quan)`;
    }

    buoc1Data += `
- Thân cư: ${thanInfo}`;

    // Build BƯỚC 2: 12 CUNG
    // Helper: mark which palace is Thân
    const thanMark = (key) => thanPalace && chart.palaces[key]?.chi === thanPalace.chi ? ' ★THÂN CƯ TẠI ĐÂY' : '';

    const buoc2Data = `
## BƯỚC 2: DỮ LIỆU 12 CUNG

>>> CHÚ Ý: CHÍNH TINH CỦA MỆNH LÀ ${chart.palaces.MENH.stars?.[0] || 'N/A'} [${chart.palaces.MENH.chi}], KHÔNG PHẢI sao nào khác. <<<
>>> THÂN CƯ tại cung ${thanInfo} — KHÔNG PHẢI cung Thiên Di (${chart.palaces.THIEN_DI?.chi}). Hai cung này KHÁC NHAU, KHÔNG được gộp. <<<

● CUNG MỆNH tại ${chart.palaces.MENH.chi}: ${fp("MENH")}${thanMark("MENH")}
● CUNG THIÊN DI tại ${chart.palaces.THIEN_DI?.chi || "?"}: ${fp("THIEN_DI")}${thanMark("THIEN_DI")}
● CUNG QUAN LỘC tại ${chart.palaces.QUAN?.chi || "?"}: ${fp("QUAN")}${thanMark("QUAN")}
● CUNG TÀI BẠCH tại ${chart.palaces.TAI?.chi || "?"}: ${fp("TAI")}${thanMark("TAI")}
● CUNG PHU THÊ tại ${chart.palaces.PHU_THE?.chi || "?"}: ${fp("PHU_THE")}${thanMark("PHU_THE")}
● CUNG TỬ TỨC tại ${chart.palaces.TU_TUC?.chi || "?"}: ${fp("TU_TUC")}${thanMark("TU_TUC")}
● CUNG TẬT ÁCH tại ${chart.palaces.TAT?.chi || "?"}: ${fp("TAT")}${thanMark("TAT")}
● CUNG ĐIỀN TRẠCH tại ${chart.palaces.DIEN?.chi || "?"}: ${fp("DIEN")}${thanMark("DIEN")}
● CUNG PHÚC ĐỨC tại ${chart.palaces.PHUC?.chi || "?"}: ${fp("PHUC")}${thanMark("PHUC")}
● CUNG PHỤ MẪU tại ${chart.palaces.PHU_MAU?.chi || "?"}: ${fp("PHU_MAU")}${thanMark("PHU_MAU")}
● CUNG HUYNH ĐỆ tại ${chart.palaces.HUYNH_DE?.chi || "?"}: ${fp("HUYNH_DE")}${thanMark("HUYNH_DE")}
● CUNG NÔ BỘC tại ${chart.palaces.NO?.chi || "?"}: ${fp("NO")}${thanMark("NO")}

>>> NHẮC LẠI: Mệnh = ${chart.palaces.MENH.chi} (${chart.palaces.MENH.stars?.[0]}). Thân cư = ${thanInfo}. Thiên Di = ${chart.palaces.THIEN_DI?.chi}. KHÔNG nhầm lẫn. <<<`;

    // Build BƯỚC 3: VẬN HẠN
    let buoc3Data = `\n## BƯỚC 3: DỮ LIỆU VẬN HẠN`;
    if (daiVanPalace) {
      buoc3Data += `
- Đại Hạn hiện tại: **${daiVanPalace.ages[0]} - ${daiVanPalace.ages[1]} tuổi** (tại cung ${daiVanPalace.name} - ${daiVanPalace.chi})
  Sao: ${daiVanPalace.stars.join(", ")}`;
    }
    if (currentAge) {
      buoc3Data += `\n- Tuổi hiện tại: ${currentAge} (Âm lịch)`;
    }
    if (luuNienPalace) {
      buoc3Data += `
- Tiểu Hạn ${cal.current?.year || ""} (${currentYear}): tại cung **${luuNienPalace.name}** (${luuNienPalace.chi})
  Sao gặp: ${luuNienPalace.stars.join(", ")}`;
    }
    if (tuHoaLuuNien) {
      buoc3Data += `
- Tứ Hóa lưu niên (${cal.current?.yearStem}): ${tuHoaLuuNien["Hóa Lộc"]} Lộc, ${tuHoaLuuNien["Hóa Quyền"]} Quyền, ${tuHoaLuuNien["Hóa Khoa"]} Khoa, ${tuHoaLuuNien["Hóa Kỵ"]} Kỵ`;
    }

    // Build PROMPT
    // Extract Mệnh palace info for anti-hallucination anchor
    const menhStars = chart.palaces.MENH.stars?.slice(0, 3).join(', ') || '';
    const menhChi = chart.palaces.MENH.chi;

    return `${roleAndTone}

# DỮ LIỆU KỸ THUẬT (Engine cung cấp - TUYỆT ĐỐI KHÔNG thay đổi)

⚠️ CẢNH BÁO: Mệnh tại cung **${menhChi}** với chính tinh **${menhStars}**. Thân cư **${thanInfo}**.
Bạn PHẢI sử dụng ĐÚNG vị trí cung và tên sao như dữ liệu bên dưới. KHÔNG tự ý thay đổi cung nào đặt ở đâu, sao nào ở cung nào.

${buoc1Data}
${buoc2Data}
${buoc3Data}

# YÊU CẦU ĐẦU RA — CHỈ TRẢ VỀ JSON
Bạn PHẢI trả về DUY NHẤT một JSON block. KHÔNG viết gì ngoài JSON.
Phân tích TƯƠNG TÁC giữa các sao, KHÔNG liệt kê nghĩa từng sao riêng lẻ.
PHẢI đề cập Miếu/Vượng/Hãm khi luận. Lời khuyên cụ thể, hành động được.

## QUY TẮC ĐỊNH DẠNG VĂN BẢN (BẮT BUỘC)
- CHIA ĐOẠN: Mỗi field phân tích phải chia thành 3-5 đoạn ngắn, mỗi đoạn 2-3 câu, cách nhau bằng \n\n
- BÔI ĐẬM: Dùng **từ khóa** để bôi đậm các ý quan trọng, lời khuyên, cảnh báo, con số
  VD: "**Tham Lang Miếu** gặp **Tuần** → giảm tính đào hoa. **Nên kết hôn sau 32 tuổi**."
- KHÔNG viết wall of text liền mạch

\`\`\`json
{
  "tong_quan": "3-5 đoạn, cách nhau \\n\\n. Bôi đậm **từ khóa quan trọng**. 200+ từ.",
  "cung_menh": "Phân tích TƯƠNG TÁC các sao. 3-4 đoạn, **bôi đậm** điểm nhấn. 150+ từ.",
  "cung_than_thien_di": "3-4 đoạn, **bôi đậm**. 150+ từ.",
  "cung_quan_loc": "3-4 đoạn, **bôi đậm**. 150+ từ.",
  "cung_tai_bach": "3-4 đoạn, **bôi đậm**. 150+ từ.",
  "cung_phu_the": "3-4 đoạn, **bôi đậm**. 150+ từ.",
  "cung_tu_tuc": "2-3 đoạn, **bôi đậm**. 100+ từ.",
  "cung_khac": "Phân tích ngắn các cung Tật Ách, Điền Trạch, Phúc Đức, Phụ Mẫu, Huynh Đệ, Nô Bộc. 3-4 đoạn, **bôi đậm**. 200+ từ.",
  "van_han": "Phân tích Đại Hạn + Tiểu Hạn + Tứ Hóa lưu niên. 3-4 đoạn, **bôi đậm**. 200+ từ.",
  "tong_ket": "Đánh giá cốt lõi + 3 điểm yếu + lời khuyên. 3-4 đoạn, **bôi đậm**. 200+ từ."
}
\`\`\`

QUAN TRỌNG:
- CHỈ trả về JSON block duy nhất, KHÔNG viết gì trước hoặc sau
- KHÔNG lặp lại tên cung, tên sao, vị trí chi trong JSON — engine đã có sẵn
- Tập trung vào PHÂN TÍCH Ý NGHĨA, không mô tả lại dữ liệu
- Phân tích TƯƠNG TÁC giữa các sao (VD: "Tham Lang gặp Tuần → giảm tính đào hoa")
- Lời khuyên cụ thể (VD: "Tránh đầu tư crypto", "Nên kết hôn sau 32 tuổi")
- BẮT BUỘC chia đoạn và bôi đậm theo quy tắc ở trên
`;
  }

  // ===================================================================
  // MODE: DAILY
  // ===================================================================
  if (mode === 'daily') {
    return `${roleAndTone}
DỮ LIỆU: ${profile.name} (${profile.gender}), ${profile.canChi}, Mệnh ${chart.palaces.MENH.chi}, ${cucName}
NGÀY: ${cal.lunar.day}/${cal.lunar.month}/${cal.lunar.year} (${cal.dayStem} ${cal.dayBranch})

# YÊU CẦU: Trả về DUY NHẤT một JSON block. KHÔNG thêm bất kỳ text nào trước hoặc sau JSON. KHÔNG giới thiệu. KHÔNG giải thích.
## QUY TẮC ĐỊNH DẠNG: Chia nội dung advice thành 2-3 đoạn ngắn, cách nhau \n\n. Bôi đậm **từ khóa quan trọng** và **lời khuyên**.
\`\`\`json
{
  "daily_advice": {
    "date": "${new Date().toISOString().split('T')[0]}",
    "energy_score": 8,
    "finance_bar": "▮▮▮▮▯▯",
    "love_bar": "▮▮▮▮▮▯",
    "health_bar": "▮▮▮▯▯▯",
    "daily_quest": "(viết 1-2 câu nhiệm vụ trong ngày)",
    "advice": {
      "work": "(2-3 đoạn, cách \\n\\n, **bôi đậm** ý chính)",
      "love": "(2-3 đoạn, cách \\n\\n, **bôi đậm** ý chính)",
      "health": "(1-2 đoạn, **bôi đậm** ý chính)"
    }
  }
}
\`\`\`
`;
  }

  // ===================================================================
  // MODE: MONTHLY
  // ===================================================================
  if (mode === 'monthly') {
    const currentMonth = cal.current?.lunar?.month || 1;
    const currentSolarMonth = (cal.current?.date || new Date()).getMonth() + 1;
    return `${roleAndTone}
DỮ LIỆU: ${profile.name} (${profile.gender}), ${profile.canChi}, Mệnh ${chart.palaces.MENH.chi}, ${cucName}
THÁNG: ${currentMonth} Âm lịch (${currentYear})

# YÊU CẦU: Trả về DUY NHẤT một JSON block. KHÔNG thêm bất kỳ text nào trước hoặc sau JSON. KHÔNG giới thiệu. KHÔNG giải thích.
Luận giải ĐẦY ĐỦ cho tháng ${currentMonth} Âm lịch (tối thiểu 200 từ mỗi mục advice).

## ĐỘ DÀI (QUAN TRỌNG NHẤT)
- Mỗi field work/love: TỐI THIỂU 300 từ (khoảng 15-20 câu). PHẢI viết dài, chi tiết, có ví dụ.
- Field health: TỐI THIỂU 150 từ (khoảng 8-10 câu).
- KHÔNG ĐƯỢC viết ngắn. Nếu nội dung dưới 200 từ = THẤT BẠI.

## QUY TẮC ĐỊNH DẠNG (BẮT BUỘC)
- CHIA ĐOẠN: Mỗi field advice phải chia thành 3-4 đoạn ngắn, mỗi đoạn 2-3 câu, cách nhau bằng \n\n
- BÔI ĐẬM: Dùng **từ khóa** để bôi đậm các ý quan trọng, lời khuyên, cảnh báo
  VD: "Tháng này **tài chính biến động mạnh**, cần **tránh vay nợ** và **hạn chế đầu tư mới**.\n\nTuy nhiên, **cuối tháng** sẽ có cơ hội tốt..."
- KHÔNG viết wall of text liền mạch. Phải ngắt đoạn.

\`\`\`json
{
  "monthly_advice": [{
    "month": ${currentMonth},
    "solar_month": ${currentSolarMonth},
    "theme": "(chủ đề tháng)",
    "affirmation": "(câu khẳng định tích cực)",
    "advice": {
      "work": "(3-4 đoạn, cách nhau \\n\\n, **bôi đậm** ý chính. 200+ từ)",
      "love": "(3-4 đoạn, cách nhau \\n\\n, **bôi đậm** ý chính. 200+ từ)",
      "health": "(2-3 đoạn, cách nhau \\n\\n, **bôi đậm** ý chính. 100+ từ)"
    }
  }]
}
\`\`\`
`;
  }

  // ===================================================================
  // MODE: FULL (backward compatible)
  // ===================================================================
  return buildLLMPrompt(engineOutput, 'lifetime');
}
