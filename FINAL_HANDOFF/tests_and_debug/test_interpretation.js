import { buildEngineOutput } from "../coreEngineV1.js";

const input = {
    name: "Test User Interpretation",
    gender: "Nam",
    dob: "1984-01-01", // Giap Ty
    tob: "12:00",
    place: "VN",
    timeZone: 7
};

try {
    const result = buildEngineOutput(input);
    const { yearlyAdvice } = result;

    console.log("=== MAIN STARS INTERPRETATION (SAMPLE) ===");
    if (yearlyAdvice.mainStars && yearlyAdvice.mainStars.MENH) {
        console.log("Mệnh Stars:", JSON.stringify(yearlyAdvice.mainStars.MENH, null, 2));
    } else {
        console.log("No main stars found in MENH or MENH not interpreted.");
        console.log("Keys in mainStars:", Object.keys(yearlyAdvice.mainStars || {}));
    }

    console.log("\n=== RINGS INTERPRETATION (SAMPLE) ===");
    console.log("Thai Tue Ring Sections:", yearlyAdvice.thaiTue?.sections?.length || 0);
    if (yearlyAdvice.thaiTue?.sections?.[0]) {
        console.log("First Section Title:", yearlyAdvice.thaiTue.sections[0].title);
    }

    console.log("Bac Sy Ring Items:", yearlyAdvice.bacSy?.length || 0);
    if (yearlyAdvice.bacSy?.[0]) {
        console.log("First Bac Sy Star:", yearlyAdvice.bacSy[0].starName, "-", yearlyAdvice.bacSy[0].summary);
    }

} catch (e) {
    console.error("Error:", e);
}
