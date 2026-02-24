import { buildEngineOutput } from "../coreEngineV1.js";
import { buildLLMPrompt } from "../prompt_builder_v1.js";
import { lunarToSolar } from "../calendar_can_chi_v1.js";

async function main() {
    console.log(">>> DEMO: Lập lá số và Chuẩn bị nội dung cho Gemini...\n");

    // 1. INPUT (1989 Case)
    const input = {
        name: "User 1989",
        gender: "Nam",
        dob: "1989-12-28", // Lunar
        tob: "06:30",
        place: "VN",
        timeZone: 7,
        calendarType: "lunar"
    };

    // Convert Lunar to Solar for engine
    let solarDob = input.dob;
    if (input.calendarType === 'lunar') {
        const [y, m, d] = input.dob.split('-').map(Number);
        const solarResult = lunarToSolar(d, m, y, false, 7);
        if (solarResult) {
            const [sd, sm, sy] = solarResult;
            solarDob = `${sy}-${String(sm).padStart(2, '0')}-${String(sd).padStart(2, '0')}`;
            console.log(`[Input] Âm lịch: ${input.dob} -> Dương lịch: ${solarDob}`);
        }
    }

    // 2. ENGINE EXECUTION (Target Year 2026 - Bính Ngọ)
    const targetDate = new Date("2026-06-01"); // Mid-year 2026
    const result = buildEngineOutput({ ...input, dob: solarDob }, targetDate);
    console.log(`[Engine] Đã tính toán lá số cho năm 2026. Lưu niên: ${result.chart.raw.cal.current.yearStem} ${result.chart.raw.cal.current.yearBranch}`);

    // 3. PROMPT GENERATION (Combine with Gemini)
    // We use the 'lifetime' mode for a full report
    const mode = 'lifetime';
    console.log(`[Prompt] Đang tạo prompt cho chế độ: ${mode}...`);
    const prompt = buildLLMPrompt(result, mode);

    console.log("\n==================================================================");
    console.log(">>> NỘI DUNG PROMPT SẼ GỬI ĐẾN GEMINI (Preview):");
    console.log("==================================================================\n");
    console.log(prompt);
    console.log("\n==================================================================");

    // 4. GEMINI INTEGRATION (Simulation)
    console.log("\n[Gemini] Để tạo nội dung, hệ thống sẽ gọi:");
    console.log(`   callGemini(prompt, process.env.GEMINI_API_KEY)`);
    console.log("-> Kết quả trả về từ Gemini sẽ là nội dung luận giải chi tiết (Markdown/HTML).");

}

main();
