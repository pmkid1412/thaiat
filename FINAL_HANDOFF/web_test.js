import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildEngineOutput } from './coreEngineV1.js';
import { lunarToSolar } from './calendar_can_chi_v1.js';
import { buildLLMPrompt } from './prompt_builder_v1.js';
import { renderChartHTML } from './chart_renderer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3456;

// Build a comprehensive interpretation report from engine output
function buildInterpretationReport(output, palaces) {
    const cal = output.chart.raw.cal;
    const chart = output.chart;
    const ya = output.yearlyAdvice;
    const sections = [];

    // --- SECTION 1: BẢN MỆNH ---
    const menhP = palaces.MENH;
    const thanP = Object.values(palaces).find(p => p.isThan);
    const menhInterp = menhP?.mainStarsInterp || [];
    const thanInterp = thanP?.mainStarsInterp || [];

    let s1 = { title: '🌟 BẢN MỆNH (Bạn Là Ai?)', items: [] };
    s1.items.push({ label: 'Mệnh tại', value: `${menhP?.chi} — Chính tinh: ${menhInterp.map(m => m.starName).join(', ') || 'Vô chính diệu'}` });
    menhInterp.forEach(ms => {
        s1.items.push({ label: ms.starName, value: ms.summary, advice: ms.advice, combos: ms.combos });
    });
    if (thanP) {
        s1.items.push({ label: 'Thân tại', value: `${thanP.name} (${thanP.chi}) — Chính tinh: ${thanInterp.map(m => m.starName).join(', ') || 'Vô chính diệu'}` });
        thanInterp.forEach(ms => {
            s1.items.push({ label: `${ms.starName} (Thân)`, value: ms.summary, advice: ms.advice, combos: ms.combos });
        });
    }
    sections.push(s1);

    // --- SECTION 2: SỰ NGHIỆP & TÀI CHÍNH ---
    const quanP = palaces.QUAN;
    const taiP = palaces.TAI;
    let s2 = { title: '💼 SỰ NGHIỆP & TÀI CHÍNH', items: [] };
    if (quanP) {
        const qi = quanP.mainStarsInterp || [];
        s2.items.push({ label: `Quan Lộc (${quanP.chi})`, value: `Chính tinh: ${qi.map(m => m.starName).join(', ') || 'Vô chính diệu'}` });
        qi.forEach(ms => {
            s2.items.push({ label: ms.starName, value: ms.summary, advice: ms.advice, combos: ms.combos });
        });
    }
    if (taiP) {
        const ti = taiP.mainStarsInterp || [];
        s2.items.push({ label: `Tài Bạch (${taiP.chi})`, value: `Chính tinh: ${ti.map(m => m.starName).join(', ') || 'Vô chính diệu'}` });
        ti.forEach(ms => {
            s2.items.push({ label: ms.starName, value: ms.summary, advice: ms.advice, combos: ms.combos });
        });
    }
    sections.push(s2);

    // --- SECTION 3: TÌNH CẢM & GIA ĐẠO ---
    const phuP = palaces.PHU_THE;
    const tuP = palaces.TU_TUC;
    let s3 = { title: '❤️ TÌNH CẢM & GIA ĐẠO', items: [] };
    if (phuP) {
        const pi = phuP.mainStarsInterp || [];
        s3.items.push({ label: `Phu Thê (${phuP.chi})`, value: `Chính tinh: ${pi.map(m => m.starName).join(', ') || 'Vô chính diệu'}` });
        pi.forEach(ms => {
            s3.items.push({ label: ms.starName, value: ms.summary, advice: ms.advice, combos: ms.combos });
        });
    }
    if (tuP) {
        const ui = tuP.mainStarsInterp || [];
        s3.items.push({ label: `Tử Tức (${tuP.chi})`, value: `Chính tinh: ${ui.map(m => m.starName).join(', ') || 'Vô chính diệu'}` });
        ui.forEach(ms => {
            s3.items.push({ label: ms.starName, value: ms.summary, advice: ms.advice, combos: ms.combos });
        });
    }
    sections.push(s3);

    // --- SECTION 4: ĐẠI VẬN ---
    const currentAge = cal.current ? (cal.current.lunar.year - cal.lunar.year + 1) : null;
    let daiVanPalace = null;
    if (currentAge) {
        daiVanPalace = Object.values(palaces).find(p => p.ages && currentAge >= p.ages[0] && currentAge <= p.ages[1]);
    }
    let s4 = { title: '🚀 ĐẠI VẬN HIỆN TẠI', items: [] };
    if (daiVanPalace) {
        const di = daiVanPalace.mainStarsInterp || [];
        s4.items.push({ label: 'Cung Đại Vận', value: `${daiVanPalace.name} (${daiVanPalace.chi}) — ${daiVanPalace.ages[0]} đến ${daiVanPalace.ages[1]} tuổi` });
        s4.items.push({ label: 'Tuổi hiện tại', value: `${currentAge} tuổi (Âm lịch)` });
        s4.items.push({ label: 'Sao trong cung', value: daiVanPalace.stars.join(', ') });
        di.forEach(ms => {
            s4.items.push({ label: ms.starName, value: ms.summary, advice: ms.advice, combos: ms.combos });
        });
    } else {
        s4.items.push({ label: 'Thông tin', value: 'Không xác định được đại vận hiện tại' });
    }
    sections.push(s4);

    // --- SECTION 5: LƯU NIÊN ---
    let s5 = { title: '📅 LƯU NIÊN (Năm Nay)', items: [] };
    if (cal.current) {
        const luuNienChi = cal.current.yearBranch;
        const luuNienPalace = Object.values(palaces).find(p => p.chi === luuNienChi);
        s5.items.push({ label: 'Năm', value: `${cal.current.yearStem} ${cal.current.yearBranch} (${cal.current.year || ''})` });
        if (luuNienPalace) {
            const li = luuNienPalace.mainStarsInterp || [];
            s5.items.push({ label: 'Lưu Niên tại cung', value: `${luuNienPalace.name} (${luuNienPalace.chi})` });
            s5.items.push({ label: 'Sao trong cung', value: luuNienPalace.stars.join(', ') });
            li.forEach(ms => {
                s5.items.push({ label: ms.starName, value: ms.summary, advice: ms.advice, combos: ms.combos });
            });
        }
    }
    sections.push(s5);

    // --- SECTION 6: CÁC CUNG KHÁC ---
    const OTHER_PALACES = ['THIEN_DI', 'DIEN', 'PHUC', 'PHU_MAU', 'HUYNH_DE', 'NO', 'TAT'];
    const PALACE_LABELS = {
        'THIEN_DI': 'Thiên Di', 'DIEN': 'Điền Trạch', 'PHUC': 'Phúc Đức',
        'PHU_MAU': 'Phụ Mẫu', 'HUYNH_DE': 'Huynh Đệ', 'NO': 'Nô Bộc', 'TAT': 'Tật Ách'
    };
    let s6 = { title: '🔮 CÁC CUNG KHÁC', items: [] };
    OTHER_PALACES.forEach(key => {
        const p = palaces[key];
        if (!p) return;
        const pi = p.mainStarsInterp || [];
        if (pi.length > 0) {
            pi.forEach(ms => {
                s6.items.push({
                    label: `${PALACE_LABELS[key]} (${p.chi}) — ${ms.starName}`,
                    value: ms.summary,
                    advice: ms.advice,
                    combos: ms.combos
                });
            });
        }
    });
    sections.push(s6);

    return sections;
}

const server = http.createServer((req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

    // Serve HTML
    if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
        const html = fs.readFileSync(path.join(__dirname, 'web_test.html'), 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
        return;
    }

    // API: Calculate
    if (req.method === 'POST' && req.url === '/api/calculate') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const input = JSON.parse(body);
                console.log('>>> Input:', input);

                // Pass input directly to engine — buildCalendar handles calendarType='lunar' natively
                const engineInput = { ...input };
                const output = buildEngineOutput(engineInput);

                // Build prompt preview
                const prompt = buildLLMPrompt(output, 'lifetime');

                // Format palaces for frontend
                const palaces = {};
                const PALACE_ORDER = ["MENH", "HUYNH_DE", "PHU_THE", "TU_TUC", "TAI", "TAT", "THIEN_DI", "NO", "QUAN", "DIEN", "PHUC", "PHU_MAU"];
                PALACE_ORDER.forEach(key => {
                    const p = output.chart.palaces[key];
                    if (!p) return;
                    const mainStars = output.yearlyAdvice.mainStars[key] || [];
                    palaces[key] = {
                        name: p.name,
                        chi: p.chi,
                        ages: p.ages || null,
                        stars: p.stars,
                        isThan: p.isThan || false,
                        mainStarsInterp: mainStars.map(ms => ({
                            starName: ms.starName,
                            summary: ms.summary,
                            advice: ms.advice,
                            combos: ms.combos || []
                        }))
                    };
                });

                // Build full interpretation report
                const report = buildInterpretationReport(output, palaces);

                // Render visual chart HTML
                const targetYear = input.targetYear || (output.chart.raw.cal.current?.year) || new Date().getFullYear();
                const chartHTML = renderChartHTML(output, targetYear);

                const cal = output.chart.raw.cal;
                const menhChi = output.chart.palaces.MENH?.chi || '';
                const isLunar = input.calendarType === 'lunar';
                const birthLabel = isLunar
                    ? `${input.dob} (âm lịch) → ${cal.solar.date.toLocaleDateString('vi-VN')} (dương lịch)`
                    : cal.solar.date.toLocaleDateString('vi-VN');

                const profile = {
                    ...output.profile,
                    menh: menhChi,
                    birth: `${birthLabel} · ${input.tob || ''}`,
                };

                const response = {
                    success: true,
                    profile,
                    palaces,
                    report,
                    chartHTML,
                    promptPreview: prompt.substring(0, 3000) + (prompt.length > 3000 ? '\n...(truncated)' : ''),
                    promptFull: prompt,       // full prompt for browser Gemini call
                    promptLength: prompt.length
                };

                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(response));
            } catch (e) {
                console.error('Error:', e);
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: e.message }));
            }
        });
        return;
    }

    res.writeHead(404);
    res.end('Not found');
});

server.listen(PORT, () => {
    console.log(`\n🌟 Tử Vi Test UI đang chạy tại: http://localhost:${PORT}\n`);
});
