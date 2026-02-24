import { buildEngineOutput } from "../coreEngineV1.js";

const input = {
    name: "User",
    gender: "Nu",
    dob: "2005-10-16",
    tob: "04:00",
    place: "VN",
    timeZone: 7
};

try {
    const res = buildEngineOutput(input);
    console.log("Cục identified:", res.profile.cuc);
    console.log("Raw cucNum:", res.chart.raw.cal.cucNum);
} catch (e) { console.error(e); }
