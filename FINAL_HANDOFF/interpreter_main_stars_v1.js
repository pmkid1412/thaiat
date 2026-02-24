/**
 * INTERPRETER — CHÍNH TINH (v1 MVP)
 * 
 * Provides summary and advice for the 14 Main Stars (Chính tinh).
 * This data is based on standard Nam Phai Tu Vi knowledge.
 */

const MAIN_STARS_META = {
    "Tử Vi": {
        summary: "Đế tinh, quyền uy, lãnh đạo, phúc thọ. Chủ về quản lý, đứng đầu, che chở.",
        advice: "Nên rèn luyện khả năng lãnh đạo, giữ uy tín. Tránh độc đoán. Hợp với vai trò quản lý, dẫn dắt."
    },
    "Thiên Cơ": {
        summary: "Thiện tinh, trí tuệ, mưu lược, khéo léo. Chủ về suy nghĩ, tính toán, thủ công.",
        advice: "Phát huy sở trường tư duy, tham mưu. Cẩn trọng chứng đau đầu hoặc lo âu thái quá."
    },
    "Thái Dương": {
        summary: "Quyền tinh, danh vọng, trí tuệ, quang minh. Tượng mặt trời, chủ quan lộc, đàn ông.",
        advice: "Sống quang minh chính đại, cống hiến cho cộng đồng. Hợp các ngành chính trị, giáo dục, công chúng."
    },
    "Vũ Khúc": {
        summary: "Tài tinh, quả tú, quyết đoán, tài chính. Chủ về tiền bạc, cô độc, hành động dứt khoát.",
        advice: "Tập trung làm kinh tế, quản lý tài chính. Cần mở lòng hơn để tránh cô độc."
    },
    "Thiên Đồng": {
        summary: "Phúc tinh, hiền lành, thay đổi, hưởng thụ. Chủ về phúc đức, trẻ con, sự thay đổi.",
        advice: "Sống hòa đồng, tích đức hành thiện. Tránh 'đứng núi này trông núi nọ'."
    },
    "Liêm Trinh": {
        summary: "Đào hoa tinh, tù tinh, quy tắc, nóng nảy. Chủ về pháp luật, tình cảm, sự ràng buộc.",
        advice: "Giữ kỷ luật, tuân thủ pháp luật. Kiểm soát cảm xúc nóng giận và chuyện tình cảm."
    },
    "Thiên Phủ": {
        summary: "Tài tinh, kho lộc, che chở, thận trọng. Chủ về tiền bạc (kho), sự ổn định, bảo thủ.",
        advice: "Quản lý tài sản chắc chắn, duy trì sự ổn định. Tránh quá thực dụng hoặc hưởng thụ."
    },
    "Thái Âm": {
        summary: "Phú tinh, tài lộc, tình cảm, bất động sản. Tượng mặt trăng, chủ điền sản, phụ nữ.",
        advice: "Giữ tinh thần nhẹ nhàng, tinh tế. Hợp các ngành nghệ thuật, tài chính, bất động sản."
    },
    "Tham Lang": {
        summary: "Đào hoa tinh, dục vọng, khéo léo, tín ngưỡng. Chủ về tham vọng, giao tiếp, tâm linh.",
        advice: "Biết kiềm chế dục vọng, tu dưỡng đạo đức. Hợp kinh doanh, ngoại giao hoặc tu tập."
    },
    "Cự Môn": {
        summary: "Ám tinh, ngôn ngữ, thị phi, nghiên cứu. Chủ về mồm miệng, tranh luận, nghi ngờ.",
        advice: "Dùng lời nói kiếm tiền (luật sư, giáo viên). Cẩn trọng thị phi, tránh đa nghi."
    },
    "Thiên Tướng": {
        summary: "Ấn tinh, quyền uy, trung thành, phục vụ. Chủ về bút ấn, sự trợ giúp, uy nghi.",
        advice: "Hợp vai trò phò tá, quản lý hành chính. Giữ chữ tín và lòng trung thành."
    },
    "Thiên Lương": {
        summary: "Ấm tinh, thọ tinh, thầy thuốc, nguyên tắc. Chủ về sự che chở, giải ách, người già.",
        advice: "Làm việc thiện, giáo dục, y tế. Sống gương mẫu, tránh quá khắt khe nguyên tắc."
    },
    "Thất Sát": {
        summary: "Sát tinh, uy quyền, dũng mãnh, hình khắc. Chủ về đoạt quyền, chiến đấu, sự mất mát.",
        advice: "Rèn luyện bản lĩnh, dũng cảm đối mặt khó khăn. Cần kiềm chế sự hiếu thắng."
    },
    "Phá Quân": {
        summary: "Hao tinh, tiên phong, phá cũ xây mới, hao tán. Chủ về sự thay đổi, phu thê, hao hụt.",
        advice: "Dám thay đổi, đột phá. Cẩn trọng quản lý tài sản để tránh hao tán vô ích."
    }
};

const normalize = (s) => (s || "").trim();

function detectMainStarCombos(starName, allStars) {
    const combos = [];
    const has = (s) => allStars.includes(s);

    // Tham Lang
    if (starName === "Tham Lang") {
        if (has("Hỏa Tinh") || has("Linh Tinh")) {
            combos.push("Tham Linh/Hỏa: Cách 'Phú ông', 'Phát dã như lôi'. Chủ về phát tài nhanh chóng, bất ngờ.");
        }
    }

    // Phá Quân
    if (starName === "Phá Quân") {
        if (has("Lộc Tồn")) {
            combos.push("Lộc Phùng Xung Phá: Có lộc nhưng dễ hao tán, kiếm tiền táo bạo nhưng cần giữ gìn.");
        }
        if (has("Văn Xương") || has("Văn Khúc")) {
            combos.push("Phá Quân Xương Khúc: Đa tài nhưng tình duyên dễ lận đận, hoặc tai nạn sông nước nếu hãm.");
        }
    }

    // Thiên Đồng
    if (starName === "Thiên Đồng") {
        if (has("Lộc Tồn")) {
            combos.push("Thiên Đồng Lộc Tồn: Bạch thủ thành gia - Tay trắng làm nên cơ nghiệp.");
        }
    }

    // Cự Môn
    if (starName === "Cự Môn") {
        if (has("Hỏa Tinh") || has("Linh Tinh")) {
            combos.push("Cự Hỏa/Linh: Dễ gặp thị phi, tai nạn bất ngờ hoặc tranh chấp nóng nảy.");
        }
    }

    // Chung cho mọi sao
    if (has("Địa Không") || has("Địa Kiếp")) {
        combos.push("Hội Không Kiếp: Gian nan, thử thách, hoặc bạo phát bạo tàn (đặc biệt với Sát Phá Tham).");
    }
    if (has("Tả Phù") || has("Hữu Bật")) {
        combos.push("Hội Tả Hữu: Được nhiều người giúp đỡ, có vây cánh.");
    }
    if (has("Thiên Khôi") || has("Thiên Việt")) {
        combos.push("Hội Khôi Việt: Có quý nhân phù trợ, đứng đầu.");
    }

    return combos;
}

/**
 * Interpret a Main Star.
 * @param {string} starName - Raw star name (e.g., "Tử Vi").
 * @param {string} palace - Palace name (e.g., "Mệnh").
 * @param {string[]} allStars - List of all stars in palace.
 */
export function interpretMainStar(starName, palace, allStars = []) {
    const meta = MAIN_STARS_META[normalize(starName)];
    if (!meta) return null;

    const combos = detectMainStarCombos(starName, allStars);

    return {
        starKey: starName,
        starName: starName,
        summary: meta.summary,
        advice: meta.advice,
        palace: palace,
        combos: combos
    };
}

export function interpretPalaceMainStars(palaceKey, starsInPalace) {
    const results = [];
    starsInPalace.forEach(star => {
        // Check key against meta keys
        if (MAIN_STARS_META[star]) {
            results.push(interpretMainStar(star, palaceKey, starsInPalace));
        }
    });
    return results;
}

export default { interpretMainStar, interpretPalaceMainStars };
