import 'dotenv/config';
import fs from 'fs';
import { buildEngineOutput } from "./coreEngineV1.js";
import { buildCalendar, lunarToSolar } from "./calendar_can_chi_v1.js";
import { buildLLMPrompt } from "./prompt_builder_v1.js";
import { callGemini } from "./gemini_service_v1.js";
import { callOpenAI } from "./openai_service_v1.js";

// Default test data
let input = {
    name: "Lê Quốc Chính",
    gender: "Nam",
    day: 22,
    month: 6,
    year: 1988,
    hour: 5,
    minute: 0,
    timeZone: 7,
    calendarType: "solar" // 'solar' or 'lunar'
};

// Check for CLI input (JSON string)
if (process.argv[2]) {
    try {
        // Log to stderr so it doesn't pollute stdout
        console.error(">>> Reading input from CLI argument...");
        const cliInput = JSON.parse(process.argv[2]);
        input = { ...input, ...cliInput };
        console.error(`>>> Input received for: ${input.name}`);
    } catch (e) {
        console.error("!!! Error parsing CLI input JSON:", e.message);
        console.error("Usage: node server_engine.js '<json_string>'");
        process.exit(1);
    }
}

async function run() {
    try {
        console.error("Running engine with input:", input);

        // Ensure dob exists
        if (!input.dob && input.day && input.month && input.year) {
            input.dob = `${input.year}-${String(input.month).padStart(2, '0')}-${String(input.day).padStart(2, '0')}`;
        }

        // 1. Pre-process Date of Birth
        let solarDob = input.dob;
        if (input.calendarType === 'lunar') {
            const [y, m, d] = input.dob.split('-').map(Number);
            const solarResult = lunarToSolar(d, m, y, input.isLeapMonth || false, input.timeZone);
            if (solarResult) {
                const [sd, sm, sy] = solarResult;
                solarDob = `${sy}-${String(sm).padStart(2, '0')}-${String(sd).padStart(2, '0')}`;
                console.error(`Converted Lunar ${input.dob} (Leap: ${input.isLeapMonth}) -> Solar ${solarDob}`);
            } else {
                throw new Error("Invalid Lunar Date provided.");
            }
        }

        // 2. Build Calendar Context (using Solar DOB - must set calendarType to 'solar')
        const calInput = { ...input, dob: solarDob, calendarType: 'solar' };
        const cal = buildCalendar(calInput);

        const result = buildEngineOutput(calInput);

        // 5. LLM Prompt Generation
        const mode = input.mode || 'full'; // 'daily', 'monthly', 'lifetime', 'full'
        console.error(`>>> Generating prompt for mode: ${mode}`);
        const prompt = buildLLMPrompt(result, mode);
        console.error("(Prompt created, length: " + prompt.length + " chars)");

        // 6. Call AI API (Gemini primary, OpenAI backup — auto-switch on failure)
        const geminiKey = process.env.GEMINI_API_KEY;
        const openaiKey = process.env.OPENAI_API_KEY;
        const aiProvider = process.env.AI_PROVIDER || 'gemini';

        let finalResponse = {
            success: false,
            mode: mode,
            html_report: null,
            data: null
        };

        // Build provider list: default first, then fallback
        const providers = [];
        if (aiProvider === 'openai') {
            if (openaiKey) providers.push({ name: 'openai', call: () => callOpenAI(prompt, openaiKey) });
            if (geminiKey) providers.push({ name: 'gemini', call: () => callGemini(prompt, geminiKey) });
        } else {
            if (geminiKey) providers.push({ name: 'gemini', call: () => callGemini(prompt, geminiKey) });
            if (openaiKey) providers.push({ name: 'openai', call: () => callOpenAI(prompt, openaiKey) });
        }

        let aiResponse = null;
        let usedProvider = null;

        for (const provider of providers) {
            try {
                console.error(`       CALLING ${provider.name.toUpperCase()} API...`);
                aiResponse = await provider.call();
                usedProvider = provider.name;
                console.error(`>>> Received response from ${provider.name}.`);
                break;
            } catch (err) {
                console.error(`⚠️ ${provider.name} failed: ${err.message}`);
            }
        }

        if (aiResponse) {
            finalResponse.ai_provider = usedProvider;

            // --- RESPONSE PROCESSING BASED ON MODE ---

            if (mode === 'daily' || mode === 'monthly') {
                // Expecting JSON only
                const jsonMatch = aiResponse.match(/```json([\s\S]*?)```/);
                if (jsonMatch && jsonMatch[1]) {
                    try {
                        const jsonData = JSON.parse(jsonMatch[1]);
                        finalResponse.success = true;
                        finalResponse.data = jsonData;
                        // For convenience, we can also return a simple HTML snippet if needed, 
                        // but for API cost optimization, raw JSON is best.
                    } catch (e) {
                        console.error("Error parsing JSON:", e);
                        finalResponse.error = "Invalid JSON from AI";
                        finalResponse.raw_response = aiResponse;
                    }
                } else {
                    finalResponse.error = "No JSON found in response";
                    finalResponse.raw_response = aiResponse;
                }
            }
            else if (mode === 'lifetime') {
                // TEMPLATE-BASED APPROACH: Parse JSON from Gemini, build HTML with engine data
                // Step 1: Strip markdown code fences if present (```json ... ```)
                let cleanedResponse = aiResponse.trim();
                if (cleanedResponse.startsWith('```')) {
                    cleanedResponse = cleanedResponse.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
                }

                let analysisJson = null;

                // Step 2: Try parsing the cleaned response directly
                try {
                    analysisJson = JSON.parse(cleanedResponse.trim());
                } catch (e) {
                    console.error("Direct JSON parse failed, trying regex extraction:", e.message);
                    // Step 3: Fallback - try regex extraction
                    const jsonMatch = aiResponse.match(/```json([\s\S]*?)```/);
                    if (jsonMatch && jsonMatch[1]) {
                        try {
                            analysisJson = JSON.parse(jsonMatch[1].trim());
                        } catch (e2) {
                            console.error("Regex JSON parse also failed:", e2.message);
                        }
                    }
                    // Step 4: Last resort - try raw response
                    if (!analysisJson) {
                        try {
                            analysisJson = JSON.parse(aiResponse.trim());
                        } catch (e3) {
                            console.error("Raw JSON parse failed");
                        }
                    }
                }

                if (analysisJson) {
                    // Helper: convert analysis text to HTML paragraphs
                    const toHtml = (text) => {
                        if (!text) return '';
                        return text
                            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                            .replace(/\*(.*?)\*/g, '<i>$1</i>')
                            .replace(/\n/g, '<br>');
                    };

                    // Helper: format palace stars for header display
                    const formatStars = (palaceKey) => {
                        const p = result.chart?.palaces?.[palaceKey];
                        if (!p || !p.stars) return '';
                        return p.stars.slice(0, 8).join(', ');
                    };

                    const p = result.chart?.palaces || {};
                    const profile = result.chart?.profile || {};
                    const thanPalace = Object.values(p).find(pp => pp.isThan);

                    // Build HTML report with ENGINE DATA as immutable headers
                    const finalHtml = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <title>Báo Cáo Tử Vi - ${profile.name || ''}</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 900px; margin: 0 auto; padding: 20px; }
                        h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
                        h2 { color: #2980b9; margin-top: 30px; border-left: 5px solid #3498db; padding-left: 10px; }
                        h3 { color: #16a085; border-bottom: 1px dashed #16a085; padding-bottom: 5px; display: inline-block; }
                        .section { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-bottom: 20px; }
                        .palace { margin-bottom: 25px; padding: 15px; border-left: 4px solid #e67e22; background: #fdf5e6; border-radius: 4px; }
                        .palace h3 { color: #d35400; border-bottom: none; margin-bottom: 5px; }
                        .palace .stars { color: #7f8c8d; font-style: italic; margin-bottom: 10px; font-size: 0.9em; }
                        .analysis { margin-top: 8px; }
                        strong, b { color: #d35400; font-weight: 700; }
                    </style>
                </head>
                <body>

                <div class='section'>
                <h2>BƯỚC 1: TỔNG QUAN LÁ SỐ</h2>
                <p>${toHtml(analysisJson.tong_quan || '')}</p>
                </div>

                <div class='section'>
                <h2>BƯỚC 2: LUẬN GIẢI 12 CUNG</h2>

                <div class='palace'>
                <h3>Cung Mệnh (${p.MENH?.chi || '?'})</h3>
                <div class='stars'>${formatStars('MENH')}</div>
                <div class='analysis'>${toHtml(analysisJson.cung_menh || '')}</div>
                </div>

                <div class='palace'>
                <h3>Cung Thân / Thiên Di (${thanPalace?.chi || p.THIEN_DI?.chi || '?'})</h3>
                <div class='stars'>${formatStars('THIEN_DI')}</div>
                <div class='analysis'>${toHtml(analysisJson.cung_than_thien_di || '')}</div>
                </div>

                <div class='palace'>
                <h3>Cung Quan Lộc (${p.QUAN?.chi || '?'})</h3>
                <div class='stars'>${formatStars('QUAN')}</div>
                <div class='analysis'>${toHtml(analysisJson.cung_quan_loc || '')}</div>
                </div>

                <div class='palace'>
                <h3>Cung Tài Bạch (${p.TAI?.chi || '?'})</h3>
                <div class='stars'>${formatStars('TAI')}</div>
                <div class='analysis'>${toHtml(analysisJson.cung_tai_bach || '')}</div>
                </div>

                <div class='palace'>
                <h3>Cung Phu Thê (${p.PHU_THE?.chi || '?'})</h3>
                <div class='stars'>${formatStars('PHU_THE')}</div>
                <div class='analysis'>${toHtml(analysisJson.cung_phu_the || '')}</div>
                </div>

                <div class='palace'>
                <h3>Cung Tử Tức (${p.TU_TUC?.chi || '?'})</h3>
                <div class='stars'>${formatStars('TU_TUC')}</div>
                <div class='analysis'>${toHtml(analysisJson.cung_tu_tuc || '')}</div>
                </div>

                <div class='palace'>
                <h3>Các cung khác</h3>
                <div class='stars'>Tật Ách (${p.TAT?.chi || '?'}) | Điền Trạch (${p.DIEN?.chi || '?'}) | Phúc Đức (${p.PHUC?.chi || '?'}) | Phụ Mẫu (${p.PHU_MAU?.chi || '?'}) | Huynh Đệ (${p.HUYNH_DE?.chi || '?'}) | Nô Bộc (${p.NO?.chi || '?'})</div>
                <div class='analysis'>${toHtml(analysisJson.cung_khac || '')}</div>
                </div>

                </div>

                <div class='section'>
                <h2>BƯỚC 3: VẬN HẠN</h2>
                <p>${toHtml(analysisJson.van_han || '')}</p>
                </div>

                <div class='section'>
                <h2>BƯỚC 4: TỔNG KẾT & LỜI KHUYÊN</h2>
                <p>${toHtml(analysisJson.tong_ket || '')}</p>
                </div>

                </body>
                </html>
                `;
                    finalResponse.success = true;
                    finalResponse.html_report = finalHtml;
                } else {
                    finalResponse.error = "Could not parse Gemini JSON response for lifetime mode";
                    finalResponse.raw_response = aiResponse;
                }
            }
            else {
                // MODE: FULL (Legacy/Default)
                // 1. Extract JSON block first
                const jsonMatchForApp = aiResponse.match(/```json([\s\S]*?)```/);

                // 2. Remove JSON block from report content
                let reportContent = aiResponse;
                const splitMarker = "## PHẦN 2";
                if (reportContent.includes(splitMarker)) {
                    reportContent = reportContent.split(splitMarker)[0];
                } else {
                    reportContent = reportContent.replace(/```json[\s\S]*?```/, '');
                }

                // 3. Process Code Blocks
                const codeBlocks = [];
                let processedReportContent = reportContent.replace(/```(\w*)\s*([\s\S]*?)```/g, (match, lang, code) => {
                    codeBlocks.push({ lang, code });
                    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
                });

                // 4. Markdown to HTML
                let htmlBody = processedReportContent
                    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold
                    .replace(/\*(.*?)\*/g, '<i>$1</i>')     // Italic
                    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')   // H1
                    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')  // H2
                    .replace(/^### (.*?)$/gm, '<h3>$1</h3>') // H3
                    .replace(/^- (.*?)$/gm, '<li>$1</li>')   // List items
                    .replace(/\n/g, '<br>');                 // Newlines

                // 5. Restore code blocks
                htmlBody = htmlBody.replace(/__CODE_BLOCK_(\d+)__/g, (match, index) => {
                    const block = codeBlocks[index];
                    const safeCode = block.code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    return `<pre style="background:#f4f4f4; padding:15px; border-radius:5px; border:1px solid #ddd; overflow-x:auto; font-family:Consolas, monospace; white-space:pre;"><code>${safeCode}</code></pre>`;
                });

                // 6. Wrap sections
                const parts = htmlBody.split('<h2>');
                let structuredHtml = parts[0];

                // 7. Generate HTML for TAB 1 & TAB 2 from JSON
                let additionalHtml = "";
                if (jsonMatchForApp && jsonMatchForApp[1]) {
                    try {
                        const aiData = JSON.parse(jsonMatchForApp[1]);

                        // Merge AI Data into Result
                        if (aiData.daily_advice) {
                            result.dailyAdvice = { ...result.dailyAdvice, ...aiData.daily_advice };
                            if (!result.dailyAdvice.display_date) {
                                result.dailyAdvice.display_date = new Date().toLocaleDateString('vi-VN');
                            }
                        }
                        if (aiData.monthly_advice && Array.isArray(aiData.monthly_advice)) {
                            aiData.monthly_advice.forEach(aiMonth => {
                                const targetIndex = aiMonth.month || aiMonth.lunar_month || aiMonth.index;
                                if (targetIndex) {
                                    const existing = result.monthlyAdvice.find(m => m.index === targetIndex);
                                    if (existing) {
                                        Object.assign(existing, aiMonth);
                                    } else {
                                        result.monthlyAdvice.push(aiMonth);
                                    }
                                }
                            });
                        }

                        // Generate HTML
                        if (aiData.daily_advice) {
                            const d = aiData.daily_advice;
                            additionalHtml += `
                                <h2>TAB 1: HÔM NAY (${d.display_date || d.date})</h2>
                                <div class='section'>
                                    <h3>⚡ Năng Lượng Ngày: ${d.energy_score}/10</h3>
                                    <div class='bar-container'><span class='bar-label'>Tiền bạc:</span> <span class='bar-visual'>${d.finance_bar}</span></div>
                                    <div class='bar-container'><span class='bar-label'>Tình cảm:</span> <span class='bar-visual'>${d.love_bar}</span></div>
                                    <div class='bar-container'><span class='bar-label'>Sức khỏe:</span> <span class='bar-visual'>${d.health_bar}</span></div>
                                    
                                    <div class='quest-box'>
                                        <strong>🎯 NHIỆM VỤ HÔM NAY (DAILY QUEST):</strong><br>
                                        "${d.daily_quest}"
                                    </div>
                                    
                                    <div class='advice-detail'>
                                        <p class='advice-item'><strong>💼 Công việc:</strong> ${d.advice.work}</p>
                                        <p class='advice-item'><strong>❤️ Tình cảm:</strong> ${d.advice.love}</p>
                                        <p class='advice-item'><strong>🥗 Sức khỏe:</strong> ${d.advice.health}</p>
                                    </div>
                                </div>
                            `;
                        }

                        if (aiData.monthly_advice && aiData.monthly_advice.length > 0) {
                            const m = aiData.monthly_advice[0];
                            additionalHtml += `
                                <h2>TAB 2: THÁNG ${m.lunar_month} (ÂM) - THÁNG ${m.solar_month} (DƯƠNG)</h2>
                                <div class='section'>
                                    <h3>🌟 Chủ đề: "${m.theme}"</h3>
                                    <div class='affirmation-box'>
                                        "${m.affirmation}"
                                    </div>
                                    
                                    <div class='advice-detail'>
                                        <p class='advice-item'><strong>💼 Sự nghiệp:</strong> ${m.advice.work}</p>
                                        <p class='advice-item'><strong>❤️ Tình cảm:</strong> ${m.advice.love}</p>
                                        <p class='advice-item'><strong>🥗 Sức khỏe:</strong> ${m.advice.health}</p>
                                    </div>
                                </div>
                            `;
                        }

                    } catch (e) {
                        console.error("Error parsing JSON for HTML generation:", e);
                    }
                }

                structuredHtml += additionalHtml;

                for (let i = 1; i < parts.length; i++) {
                    const part = parts[i];
                    const closeTagIndex = part.indexOf('</h2>');
                    if (closeTagIndex !== -1) {
                        const title = part.substring(0, closeTagIndex);
                        const content = part.substring(closeTagIndex + 5);
                        structuredHtml += `<h2>${title}</h2><div class='section'>${content}</div>`;
                    } else {
                        structuredHtml += `<h2>${part}`;
                    }
                }

                // Final HTML with CSS
                const finalHtml = `
                    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                    <head>
                        <meta charset='utf-8'>
                        <title>Báo Cáo Tử Vi</title>
                        <style>
                            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                            h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
                            h2 { color: #2980b9; margin-top: 30px; border-left: 5px solid #3498db; padding-left: 10px; }
                            h3 { color: #16a085; border-bottom: 1px dashed #16a085; padding-bottom: 5px; display: inline-block; }
                            .section { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-bottom: 20px; }
                            strong, b { color: #d35400; font-weight: 700; }
                            .highlight { background-color: #fff3cd; padding: 2px 5px; border-radius: 3px; font-weight: bold; }
                            .quest-box { background-color: #e8f6f3; padding: 15px; border: 2px dashed #1abc9c; border-radius: 10px; margin-top: 10px; }
                            .affirmation-box { background-color: #fef9e7; padding: 15px; border-left: 5px solid #f1c40f; font-style: italic; font-size: 1.1em; }
                            ul { list-style-type: none; padding-left: 0; }
                            li { margin-bottom: 10px; }
                            .quote-box { background-color: #f0f0f0; padding: 15px; border-radius: 5px; font-style: italic; text-align: center; margin-top: 20px; }
                        </style>
                    </head>
                    <body>
                    ${structuredHtml}
                    </body>
                    </html>
                `;

                finalResponse.success = true;
                finalResponse.html_report = finalHtml;
                finalResponse.data = result;
            }

        } else if (providers.length === 0) {
            console.error("No AI API keys configured.");
            finalResponse.error = "No AI API keys configured (GEMINI_API_KEY or OPENAI_API_KEY)";
        } else {
            console.error("All AI providers failed.");
            finalResponse.error = "All AI providers failed";
        }

        // OUTPUT TO STDOUT
        console.log(JSON.stringify(finalResponse));

    } catch (e) {
        console.error("Error running engine:", e);
        console.log(JSON.stringify({ success: false, error: e.message }));
    }
}

run();
