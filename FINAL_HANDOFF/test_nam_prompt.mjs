/**
 * Test: Generate prompt for Nam's horoscope (Ất Mão 1975)
 * Usage: node test_nam_prompt.mjs
 */
import { buildEngineOutput } from './coreEngineV1.js';
import { buildLLMPrompt } from './prompt_builder_v1.js';
import fs from 'fs';

const input = {
    name: "Nam",
    dob: "1975-12-04",       // YYYY-MM-DD: ngày 4, tháng 12 Âm lịch 1975
    hour: 20,                // giờ Tuất (20:00)
    minute: 0,
    gender: "Nam",
    calendarType: "lunar",
    targetYear: 2026
};

console.log("🔮 Input:", JSON.stringify(input, null, 2));
console.log("─".repeat(60));

const output = buildEngineOutput(input);

// Summary info
const cal = output.chart.raw.cal;
const menh = output.chart.palaces.MENH;
const than = Object.values(output.chart.palaces).find(p => p.isThan);

console.log("\n📋 THÔNG TIN LÁ SỐ:");
console.log(`  Tên: ${input.name}`);
console.log(`  Ngày sinh: ${cal.solar.date.toLocaleDateString('vi-VN')} (ÂL: ${cal.lunar.day}/${cal.lunar.month}/${cal.lunar.year})`);
console.log(`  Can Chi: ${cal.yearStem} ${cal.yearBranch}`);
console.log(`  Cục: ${cal.cucNum}`);
console.log(`  Mệnh tại: ${menh.chi} — Chính tinh: ${menh.stars?.[0] || 'Vô chính diệu'}`);
console.log(`  Thân cư: ${than ? `${than.name} (${than.chi})` : 'N/A'}`);
console.log("─".repeat(60));

// Generate all 3 prompts
const prompts = {
    lifetime: buildLLMPrompt(output, 'lifetime'),
    daily: buildLLMPrompt(output, 'daily'),
    monthly: buildLLMPrompt(output, 'monthly'),
};

// Save lifetime prompt to file
const outputFile = 'tests_and_debug/test_nam_prompt_output.md';
let md = `# Prompt Test — Nam (Ất Mão 1975)\n\n`;
md += `> Generated: ${new Date().toISOString()}\n\n`;

for (const [mode, prompt] of Object.entries(prompts)) {
    md += `## Mode: ${mode.toUpperCase()} (${prompt.length} chars)\n\n`;
    md += "```\n" + prompt + "\n```\n\n";
    md += "---\n\n";
    console.log(`\n✅ ${mode.toUpperCase()} prompt: ${prompt.length} chars`);
}

fs.writeFileSync(outputFile, md, 'utf8');
console.log(`\n📄 Saved to: ${outputFile}`);
console.log("─".repeat(60));

// Print lifetime prompt preview
console.log("\n🔍 LIFETIME PROMPT PREVIEW (first 1500 chars):");
console.log(prompts.lifetime.substring(0, 1500));
console.log("...(truncated)");
