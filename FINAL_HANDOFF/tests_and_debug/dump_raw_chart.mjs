import { buildEngineOutput } from '../coreEngineV1.js';
import { renderChart } from '../chart_renderer.js';
import fs from 'fs';

const INPUT = {
    name: 'Test 1969', gender: 'Nam',
    dob: '1969-12-25', calendarType: 'solar',
    hour: 18, minute: 0, timeZone: 7
};

const result = buildEngineOutput(INPUT);
const chart = result.chart;
const cal = chart.raw.cal;

// Raw data
const CUC_NAMES = { 2: 'Thủy Nhị Cục', 3: 'Mộc Tam Cục', 4: 'Kim Tứ Cục', 5: 'Thổ Ngũ Cục', 6: 'Hỏa Lục Cục' };
const thanPalace = Object.values(chart.palaces).find(p => p.isThan);
const PNAMES = {
    MENH: 'Mệnh', PHU_MAU: 'Phụ Mẫu', PHUC: 'Phúc Đức', DIEN: 'Điền Trạch',
    QUAN: 'Quan Lộc', NO: 'Nô Bộc', THIEN_DI: 'Thiên Di', TAT: 'Tật Ách',
    TAI: 'Tài Bạch', TU_TUC: 'Tử Tức', PHU_THE: 'Phu Thê', HUYNH_DE: 'Huynh Đệ'
};

let md = `# LÁ SỐ TỬ VI — ${INPUT.name} (Raw Engine Data)
> DL: 25/12/1969 — 18:00 — Nam

## Thông tin cơ bản
| Mục | Giá trị |
|-----|--------|
| Ngày sinh DL | 25/12/1969 |
| Ngày sinh ÂL | ${cal.lunar.day}/${cal.lunar.month}/${cal.lunar.year} |
| Can Chi năm | ${cal.yearStem} ${cal.yearBranch} |
| Giờ sinh | ${cal.hourBranch || '?'} (18:00) |
| Cục | ${CUC_NAMES[cal.cucNum] || cal.cucNum} |
| **Cung Mệnh** | **${chart.palaces.MENH.chi}** |
| **Cung Thân cư** | **${thanPalace ? thanPalace.name + ' (' + thanPalace.chi + ')' : 'N/A'}** |

## Tứ Hóa (${cal.yearStem})
| Hóa | Sao |
|-----|-----|
`;
if (chart.tuHoa) Object.entries(chart.tuHoa).forEach(([k, v]) => { md += `| ${k} | ${v} |\n`; });

md += `\n## Tuần / Triệt\n`;
if (chart.misc?.tuanTriet) Object.entries(chart.misc.tuanTriet).forEach(([k, v]) => { md += `- ${k}: ${v}\n`; });

md += `\n## Vị trí 14 Chính Tinh\n| Sao | Cung |\n|-----|------|\n`;
Object.entries(chart.mainStars).forEach(([name, chi]) => { md += `| ${name} | ${chi} |\n`; });

md += `\n## 12 Cung Chi Tiết\n\n`;
Object.entries(chart.palaces).forEach(([key, pal]) => {
    const isThan = pal.isThan ? ' ★THÂN CƯ TẠI ĐÂY' : '';
    const stars = (pal.stars || []).map(s => typeof s === 'string' ? s : (s.name || s)).join(', ');
    const dv = pal.daiVanStart != null ? `${pal.daiVanStart}–${pal.daiVanEnd} tuổi` : '';
    md += `### ${PNAMES[key] || key} (${pal.chi})${isThan}\n- **Đại Vận**: ${dv}\n- **Sao**: ${stars}\n\n`;
});

if (chart.tieuVan) {
    md += `## Tiểu Vận\n- Tuổi ÂL: ${chart.tieuVan.lunarAge}\n- Cung Tiểu Vận: ${chart.tieuVan.currentTieuVanChi}\n`;
}

fs.writeFileSync('test_1969_raw_chart.md', md, 'utf8');
console.log('Raw data:', md.length, 'chars → test_1969_raw_chart.md');

// Visual chart
const html = renderChart(result.chart);
fs.writeFileSync('test_1969_chart.html', html, 'utf8');
console.log('Chart HTML:', html.length, 'chars → test_1969_chart.html');
