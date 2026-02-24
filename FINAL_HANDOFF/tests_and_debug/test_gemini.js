// test_gemini.js — Test AI interpretation with Gemini API
// API key is passed via GEMINI_API_KEY environment variable only
import { buildEngineOutput } from "../coreEngineV1.js";
import { buildLLMPrompt } from "../prompt_builder_v1.js";

async function main() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("❌ GEMINI_API_KEY not set. Pass via environment variable.");
        process.exit(1);
    }

    // 1. Build chart (Kỷ Tỵ 1989, giờ Mão, Nam — lunar input)
    const input = {
        name: "Nguyễn Việt Phương",
        gender: "Nam",
        dob: "1989-12-28",
        tob: "06:30",
        calendarType: "lunar",
        timeZone: 7
    };

    const targetDate = new Date("2026-06-01");
    const result = buildEngineOutput(input, targetDate);
    console.log("✅ Engine: Cục =", result.profile?.cuc, "| Mệnh =", result.chart.palaces.MENH.chi);

    // 2. Build prompt (lifetime mode = 4-step la_so.md format)
    const prompt = buildLLMPrompt(result, 'lifetime');
    console.log("✅ Prompt: Generated", prompt.length, "characters");

    // 3. Call Gemini API
    console.log("⏳ Calling Gemini API...\n");

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.8,
                    maxOutputTokens: 16384,
                }
            })
        }
    );

    if (!response.ok) {
        const err = await response.text();
        console.error("❌ API Error:", response.status, err);
        process.exit(1);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        console.error("❌ No text in response:", JSON.stringify(data, null, 2));
        process.exit(1);
    }

    const finishReason = data.candidates?.[0]?.finishReason;
    console.log("=".repeat(70));
    console.log("✅ GEMINI RESPONSE (" + text.length + " chars) | finishReason:", finishReason);
    console.log("=".repeat(70));
    console.log(text);
    console.log("=".repeat(70));
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
