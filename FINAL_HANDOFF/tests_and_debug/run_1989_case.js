import { lunarToSolar } from "../calendar_can_chi_v1.js";
import { buildEngineOutput } from "../coreEngineV1.js";

async function main() {
    const ld = 28;
    const lm = 12;
    const ly = 1989;
    const leap = false;
    const tz = 7;
    const gender = "Nam"; // Default assumption

    console.log(`Input Lunar: ${ld}/${lm}/${ly}, Leap: ${leap}, Gender: ${gender}`);

    const solar = lunarToSolar(ld, lm, ly, leap, tz);
    if (!solar) {
        console.error("Cannot convert Lunar date to Solar.");
        return;
    }
    const [sd, sm, sy] = solar;
    // Pad month/day for YYYY-MM-DD
    const sDob = `${sy}-${String(sm).padStart(2, '0')}-${String(sd).padStart(2, '0')}`;
    console.log(`Converted Solar Date: ${sDob}`);

    const input = {
        name: "User 1989",
        gender: gender,
        dob: sDob,
        tob: "06:30",
        place: "VN",
        timeZone: tz
    };

    try {
        const res = buildEngineOutput(input);
        const cal = res.chart.raw.cal;
        const profile = res.profile;
        console.log(`\n=== KẾT QUẢ LUẬN GIẢI ===`);
        console.log(`Họ tên: ${profile.name}`);
        console.log(`Ngày sinh dương lịch: ${profile.birth}`);
        console.log(`Âm lịch: ${cal.lunar.day}/${cal.lunar.month}/${cal.lunar.year}`);
        console.log(`Bát tự: Năm ${cal.yearStem} ${cal.yearBranch}, Tháng ${cal.monthBranch}, Ngày ${cal.dayStem} ${cal.dayBranch}, Giờ ${cal.hourBranch}`);
        console.log(`Cục: ${profile.cuc}`);
        console.log(`Mệnh tại: ${res.chart.palaces.MENH.chi}`);

        console.log("\n--- CÁC CUNG ---");
        ["MENH", "TAI", "QUAN", "THIEN_DI", "PHU_THE", "PHUC", "DIEN", "NO", "TAT", "TU_TUC", "PHU_MAU", "HUYNH_DE"].forEach(key => {
            const p = res.chart.palaces[key];
            const mainStars = res.yearlyAdvice.mainStars[key];
            console.log(`\n[${p.name} - ${p.chi}]`);
            if (p.ages) {
                console.log(`Đại vận: ${p.ages[0]} - ${p.ages[1]}`);
            }
            console.log(`Sao: ${p.stars.join(", ")}`);
            if (mainStars && mainStars.length > 0) {
                console.log("Luận giải chính tinh:");
                mainStars.forEach(ms => {
                    console.log(`  - ${ms.starName}: ${ms.summary}`);
                    if (ms.combos && ms.combos.length > 0) {
                        console.log(`    * Bộ sao kết hợp:`);
                        ms.combos.forEach(c => console.log(`      + ${c}`));
                    }
                    console.log(`    (Lời khuyên: ${ms.advice})`);
                });
            }
        });

    } catch (e) {
        console.error(e);
    }
}

main();
