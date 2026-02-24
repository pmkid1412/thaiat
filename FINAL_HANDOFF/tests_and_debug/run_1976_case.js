import { buildEngineOutput } from "../coreEngineV1.js";

async function main() {
    const input = {
        name: "User 1976",
        gender: "Nam",
        dob: "1976-01-04",
        tob: "20:00",
        place: "VN",
        timeZone: 7
    };

    try {
        const res = buildEngineOutput(input);
        const cal = res.chart.raw.cal;
        const profile = res.profile;
        console.log(`\n=== KẾT QUẢ 1976 (NAM) ===`);
        console.log(`Dương lịch: ${profile.birth}`);
        console.log(`Âm lịch: ${cal.lunar.day}/${cal.lunar.month}/${cal.lunar.year}`);
        console.log(`Can Chi: Năm ${cal.yearStem} ${cal.yearBranch}, Tháng ${cal.monthBranch}, Giờ ${cal.hourBranch}`);
        console.log(`Cục: ${profile.cuc} (Cục số: ${res.chart.raw.cal.cucNum})`);
        console.log(`Mệnh tại: ${res.chart.palaces.MENH.chi}`);

        console.log("\n--- ĐẠI VẬN ---");
        ["MENH", "PHU_MAU", "PHUC", "DIEN", "QUAN", "NO", "THIEN_DI", "TAT", "TAI", "TU_TUC", "PHU_THE", "HUYNH_DE"].forEach(key => {
            const p = res.chart.palaces[key];
            if (p.ages) {
                console.log(`[${p.name} - ${p.chi}]: ${p.ages[0]} - ${p.ages[1]}`);
            }
        });

    } catch (e) {
        console.error(e);
    }
}

main();
