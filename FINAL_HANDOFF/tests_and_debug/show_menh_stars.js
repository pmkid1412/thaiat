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
    const menh = result.chart.palaces.MENH;

    console.log(`=== CUNG MỆNH (${menh.chi}) ===`);
    console.log("Danh sách toàn bộ sao:");
    console.log(menh.stars.join(", "));
    console.log(`Tổng cộng: ${menh.stars.length} sao`);
} catch (e) {
    console.error(e);
}
