// cach_cuc_detector.js
// -----------------------------------------------------------------------------
// Detects major "Cach Cuc" (Patterns) and "Than Cu" (Body Palace).
// This adds depth to the interpretation by identifying the macro-structure of the chart.
// -----------------------------------------------------------------------------

/**
 * detectInsights(chart)
 * @param {Object} chart - The full chart object from coreEngineV1
 * @returns {Object} insights - { thanCu: {...}, patterns: [...] }
 */
export function detectInsights(chart) {
    const menhPalace = Object.values(chart.palaces).find(p => p.code === "MENH");
    if (!menhPalace) return { error: "No MENH palace found" };

    // 1. Detect Than Cu (Body Palace)
    // Than Cu depends on birth hour (chi).
    // Tý/Ngọ: Mệnh
    // Sửu/Mùi: Phúc Đức
    // Dần/Thân: Quan Lộc
    // Mão/Dậu: Thiên Di
    // Thìn/Tuất: Tài Bạch
    // Tỵ/Hợi: Phu Thê
    const hourBranch = chart.raw.cal.hourBranch;
    let thanCode = "MENH";
    let thanMeaning = "Mẫu người hành động theo suy nghĩ, tiền hậu bất nhất hoặc nhất quán tùy sao.";

    switch (hourBranch) {
        case "Tý": case "Ngọ":
            thanCode = "MENH";
            thanMeaning = "Thân Cư Mệnh: Mẫu người tự lập, tin vào bản thân, sướng khổ do mình tự chịu.";
            break;
        case "Sửu": case "Mùi":
            thanCode = "PHUC";
            thanMeaning = "Thân Cư Phúc Đức: Mẫu người coi trọng dòng họ, hưởng phúc tổ tiên, hay lo toan việc gia đình.";
            break;
        case "Dần": case "Thân":
            thanCode = "QUAN";
            thanMeaning = "Thân Cư Quan Lộc: Mẫu người của công việc, coi trọng sự nghiệp và danh vọng.";
            break;
        case "Mão": case "Dậu":
            thanCode = "THIEN_DI";
            thanMeaning = "Thân Cư Thiên Di: Mẫu người hướng ngoại, thích giao tiếp, hay phải đi xa, thành bại do môi trường xã hội.";
            break;
        case "Thìn": case "Tuất":
            thanCode = "TAI";
            thanMeaning = "Thân Cư Tài Bạch: Mẫu người thực tế, coi trọng tài chính, đánh giá mọi việc qua hiệu quả kinh tế.";
            break;
        case "Tỵ": case "Hợi":
            thanCode = "PHU_THE";
            thanMeaning = "Thân Cư Phu Thê: Mẫu người coi trọng gia đình nhỏ, chịu ảnh hưởng lớn từ người phối ngẫu.";
            break;
    }

    // 2. Detect Major Patterns (Cach Cuc) at MENH
    const menhStars = menhPalace.stars || [];
    const patterns = [];

    // Helper to check presence
    const has = (s) => menhStars.includes(s);
    const hasAny = (list) => list.some(s => has(s));
    const count = (list) => list.filter(s => has(s)).length;

    // A. Tu Phu Vu Tuong (Leadership)
    // Core: Tu Vi, Thien Phu, Vu Khuc, Thien Tuong
    if (has("Tử Vi") || has("Thiên Phủ")) {
        const group = ["Tử Vi", "Thiên Phủ", "Vũ Khúc", "Thiên Tướng"];
        if (count(group) >= 1) {
            patterns.push({
                code: "TU_PHU_VU_TUONG",
                name: "Tử Phủ Vũ Tướng",
                desc: "Bộ sao của Lãnh đạo và Quản lý. Bạn có tố chất làm chủ, thích sự ổn định, uy quyền và có khả năng tổ chức."
            });
        }
    }

    // B. Sat Pha Tham (Action/Warrior)
    // Core: That Sat, Pha Quan, Tham Lang
    if (hasAny(["Thất Sát", "Phá Quân", "Tham Lang"])) {
        patterns.push({
            code: "SAT_PHA_THAM",
            name: "Sát Phá Tham",
            desc: "Bộ sao của Hành động và Đột phá. Bạn là người mạnh mẽ, dám nghĩ dám làm, thích thử thách và không ngại thay đổi. Cuộc đời thường có nhiều biến động lớn."
        });
    }

    // C. Co Nguyet Dong Luong (Strategy/Support)
    // Core: Thien Co, Thai Am, Thien Dong, Thien Luong
    if (hasAny(["Thiên Cơ", "Thái Âm", "Thiên Đồng", "Thiên Lương"])) {
        patterns.push({
            code: "CO_NGUYET_DONG_LUONG",
            name: "Cơ Nguyệt Đồng Lương",
            desc: "Bộ sao của Mưu lược và Phúc thiện. Bạn hợp với các công việc văn phòng, tham mưu, giáo dục hoặc y tế. Tính cách ôn hòa, thích sự an toàn."
        });
    }

    // D. Cu Nhat (Public/Speech)
    // Core: Cu Mon, Thai Duong
    if (hasAny(["Cự Môn", "Thái Dương"])) {
        patterns.push({
            code: "CU_NHAT",
            name: "Cự Nhật",
            desc: "Bộ sao của Ngôn ngữ và Tỏa sáng. Bạn có khả năng ăn nói, hùng biện hoặc làm các công việc liên quan đến công chúng, luật pháp, ngoại giao."
        });
    }

    // E. Special: Vo Chinh Dieu (No Main Star)
    const mainStarsList = [
        "Tử Vi", "Thiên Cơ", "Thái Dương", "Vũ Khúc", "Thiên Đồng", "Liêm Trinh",
        "Thiên Phủ", "Thái Âm", "Tham Lang", "Cự Môn", "Thiên Tướng", "Thiên Lương", "Thất Sát", "Phá Quân"
    ];
    const hasMainStar = menhStars.some(s => mainStarsList.includes(s));
    if (!hasMainStar) {
        patterns.push({
            code: "VO_CHINH_DIEU",
            name: "Mệnh Vô Chính Diệu",
            desc: "Mệnh không có chính tinh. Bạn là người khôn ngoan, dễ thích nghi với hoàn cảnh, nhưng đôi khi thiếu sự kiên định hoặc cảm thấy chông chênh, cần nương tựa vào người khác hoặc môi trường."
        });
    }

    return {
        thanCu: {
            code: thanCode,
            meaning: thanMeaning
        },
        patterns: patterns
    };
}
