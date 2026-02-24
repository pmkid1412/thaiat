import { buildEngineOutput } from "../coreEngineV1.js";

const input = {
    name: "Test User 2",
    gender: "Nu", // Normalized "Nu" or "Nam"
    dob: "2005-10-16",
    tob: "04:00",
    place: "VN",
    timeZone: 7
};

try {
    const result = buildEngineOutput(input);
    const { palaces } = result.chart;
    const { raw } = result.chart;

    console.log("=== DAI VAN TEST RESULTS ===");
    console.log(`Name: ${result.chart.profile.name}`);
    console.log(`Gender: ${result.chart.profile.gender}`);
    console.log(`Solar: ${input.dob} ${input.tob}`);
    console.log(`Lunar: ${raw.cal.lunar.day}/${raw.cal.lunar.month}/${raw.cal.lunar.year} (Leap: ${raw.cal.lunar.isLeap})`);
    console.log(`Can Chi: Year ${raw.cal.yearStem} ${raw.cal.yearBranch}, Month ${raw.cal.monthStem} ${raw.cal.monthBranch}, Day ${raw.cal.dayStem} ${raw.cal.dayBranch}, Hour ${raw.cal.hourBranch}`);
    console.log(`Cuc: ${raw.cal.cucNum} (${raw.cal.cucNum} Cục)`);

    // Sort by Dai Van start age to see the sequence
    const sorted = Object.values(palaces).sort((a, b) => a.daiVanStart - b.daiVanStart);

    sorted.forEach(p => {
        console.log(`${p.name.padEnd(12)} (${p.chi}): ${p.daiVanStart} - ${p.daiVanEnd}`);
    });

} catch (e) {
    console.error("Error:", e);
}
