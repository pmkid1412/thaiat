import { buildEngineOutput } from "../coreEngineV1.js";

const input = {
    name: "Target User",
    gender: "Nu",
    dob: "2005-10-16",
    tob: "04:00",
    place: "VN",
    timeZone: 7
};

try {
    const result = buildEngineOutput(input);
    const chart = result.chart;
    const yearlyAdvice = result.yearlyAdvice;
    // palaces is part of the chart
    const palaces = chart.palaces;
    const cal = chart.raw.cal;

    console.log("=== LUẬN GIẢI LÁ SỐ TỬ VI ===");
    console.log(`Họ tên: ${input.name}`);
    console.log(`Ngày sinh: ${input.dob} ${input.tob}`);
    console.log(`Âm lịch: ${cal.lunar.day}/${cal.lunar.month}/${cal.lunar.year}`);
    console.log(`Can Chi: Năm ${cal.yearStem} ${cal.yearBranch}, Tháng ${cal.monthStem} ${cal.monthBranch}, Ngày ${cal.dayStem} ${cal.dayBranch}, Giờ ${cal.hourStem} ${cal.hourBranch}`);
    // Check if menhHanh/cucHanh are available in cal or chart.profile
    const menhHanh = chart.profile.menh || cal.menhHanh || "N/A";
    const cucHanh = chart.profile.cuc || cal.cucHanh || "N/A";
    console.log(`Mệnh: ${menhHanh} - Cục: ${cucHanh}`);

    console.log("\n--- CHI TIẾT 12 CUNG ---");
    // Define standard order or just iterate. Palaces in chart.palaces are keyed by code e.g. MENH, PHU_MAU.
    // Let's rely on Object.values which usually preserves insertion order if keys are non-integer, 
    // but better to use the predefined order if possible. 
    // For now, Object.values is fine as build12Palaces constructs them in order.

    Object.values(palaces).forEach(palace => {
        const isMenh = palace.key === "MENH" ? " (MỆNH)" : "";
        const isThan = palace.isThan ? " (THÂN)" : "";
        console.log(`\n[${palace.name}] tại ${palace.chi}${isMenh}${isThan}:`);

        // Main Stars Interpretation
        if (yearlyAdvice.mainStars[palace.key]) {
            yearlyAdvice.mainStars[palace.key].forEach(star => {
                console.log(`  + **${star.starName}**: ${star.summary}`);
                console.log(`    > Lời khuyên: ${star.advice}`);
            });
        } else {
            // Check if it really has no main stars (VCD) or if interpreter missed it
            // We can check palace.stars for main star names
            const hasMainStar = palace.stars.some(s =>
                ["Tử Vi", "Thiên Cơ", "Thái Dương", "Vũ Khúc", "Thiên Đồng", "Liêm Trinh",
                    "Thiên Phủ", "Thái Âm", "Tham Lang", "Cự Môn", "Thiên Tướng", "Thiên Lương",
                    "Thất Sát", "Phá Quân"].includes(s)
            );
            if (!hasMainStar) {
                console.log("  - Vô Chính Diệu (Không có chính tinh)");
            }
        }

        // List other stars (simplistic)
        const otherStars = palace.stars.filter(s =>
            !yearlyAdvice.mainStars[palace.key]?.some(ms => ms.starName === s)
        );
        if (otherStars.length > 0) {
            console.log(`  - Các sao khác: ${otherStars.join(", ")}`);
        }
    });

    console.log("\n--- VÒNG THÁI TUẾ ---");
    if (yearlyAdvice.thaiTue && yearlyAdvice.thaiTue.sections) {
        yearlyAdvice.thaiTue.sections.forEach(sec => {
            console.log(`\n* ${sec.title}:`);
            console.log(sec.body);
        });
    }

} catch (e) {
    console.error("Error:", e);
}
