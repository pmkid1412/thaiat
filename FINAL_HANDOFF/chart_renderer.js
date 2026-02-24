// chart_renderer.js
// Renders a visual Tử Vi chart as HTML from engine chart data.
// Output is a self-contained HTML string suitable for WebView rendering.

/**
 * Star color classification based on Tử Vi tradition
 */
const STAR_COLORS = {
  // Chính tinh (14 main stars) - dark blue/bold
  'Tử Vi': '#1a237e', 'Thiên Cơ': '#1a237e', 'Thái Dương': '#1a237e',
  'Vũ Khúc': '#1a237e', 'Thiên Đồng': '#1a237e', 'Liêm Trinh': '#1a237e',
  'Thiên Phủ': '#1a237e', 'Thái Âm': '#1a237e', 'Tham Lang': '#1a237e',
  'Cự Môn': '#1a237e', 'Thiên Tướng': '#1a237e', 'Thiên Lương': '#1a237e',
  'Thất Sát': '#c62828', 'Phá Quân': '#c62828',

  // Sát tinh - red
  'Kình Dương': '#c62828', 'Đà La': '#c62828', 'Hỏa Tinh': '#c62828',
  'Linh Tinh': '#c62828', 'Địa Không': '#c62828', 'Địa Kiếp': '#c62828',

  // Cát tinh - green
  'Tả Phù': '#2e7d32', 'Hữu Bật': '#2e7d32', 'Văn Xương': '#2e7d32',
  'Văn Khúc': '#2e7d32', 'Thiên Khôi': '#2e7d32', 'Thiên Việt': '#2e7d32',
  'Lộc Tồn': '#2e7d32', 'Thiên Mã': '#2e7d32',

  // Đào hoa - magenta
  'Đào Hoa': '#ad1457', 'Hồng Loan': '#ad1457', 'Thiên Hỷ': '#ad1457',
  'Thiên Diêu': '#ad1457',

  // Tứ Hóa - orange
  'Hóa Lộc': '#e65100', 'Hóa Quyền': '#e65100', 'Hóa Khoa': '#e65100',
  'Hóa Kỵ': '#b71c1c',
};

const BRIGHTNESS_LABELS = { 'M': 'Miếu', 'V': 'Vượng', 'D': 'Đắc', 'B': 'Bình', 'H': 'Hãm' };
const BRIGHTNESS_COLORS = { 'M': '#2e7d32', 'V': '#1565c0', 'D': '#6a1b9a', 'B': '#555', 'H': '#c62828' };

/**
 * The 12 palaces are arranged in a 4x4 grid (outer ring) with center 2x2 for info.
 * Grid positions (row, col) — 1-indexed CSS grid:
 *   Row 1: Tỵ(1,1)    Ngọ(1,2)    Mùi(1,3)    Thân(1,4)
 *   Row 2: Thìn(2,1)  [center]    [center]    Dậu(2,4)
 *   Row 3: Mão(3,1)   [center]    [center]    Tuất(3,4)
 *   Row 4: Dần(4,1)   Sửu(4,2)    Tý(4,3)     Hợi(4,4)
 */
const CHI_GRID = {
  'Tỵ': { row: 1, col: 1 },
  'Ngọ': { row: 1, col: 2 },
  'Mùi': { row: 1, col: 3 },
  'Thân': { row: 1, col: 4 },
  'Thìn': { row: 2, col: 1 },
  'Dậu': { row: 2, col: 4 },
  'Mão': { row: 3, col: 1 },
  'Tuất': { row: 3, col: 4 },
  'Dần': { row: 4, col: 1 },
  'Sửu': { row: 4, col: 2 },
  'Tý': { row: 4, col: 3 },
  'Hợi': { row: 4, col: 4 },
};

const PALACE_DISPLAY = {
  MENH: 'MỆNH', PHU_MAU: 'PHỤ MẪU', PHUC: 'PHÚC ĐỨC', DIEN: 'ĐIỀN TRẠCH',
  QUAN: 'QUAN LỘC', NO: 'NÔ BỘC', THIEN_DI: 'THIÊN DI', TAT: 'TẬT ÁCH',
  TAI: 'TÀI BẠCH', TU_TUC: 'TỬ TỨC', PHU_THE: 'PHU THÊ', HUYNH_DE: 'HUYNH ĐỆ'
};

function getStarColor(name) {
  return STAR_COLORS[name] || '#333';
}

function getStarWeight(name) {
  // Main stars are bold
  const mainStars = ['Tử Vi', 'Thiên Cơ', 'Thái Dương', 'Vũ Khúc', 'Thiên Đồng', 'Liêm Trinh',
    'Thiên Phủ', 'Thái Âm', 'Tham Lang', 'Cự Môn', 'Thiên Tướng', 'Thiên Lương', 'Thất Sát', 'Phá Quân'];
  return mainStars.includes(name) ? 'bold' : 'normal';
}

function renderStarHtml(starName, brightness) {
  const color = getStarColor(starName);
  const weight = getStarWeight(starName);
  let bLabel = '';
  if (brightness && BRIGHTNESS_LABELS[brightness]) {
    const bColor = BRIGHTNESS_COLORS[brightness] || '#555';
    bLabel = `<sup style="color:${bColor};font-size:8px">${brightness}</sup>`;
  }
  return `<span style="color:${color};font-weight:${weight}">${starName}</span>${bLabel}`;
}

/**
 * Render the full Tử Vi chart as self-contained HTML
 * @param {Object} chart - The chart object from buildEngineOutput
 * @param {Object} options - { layout: 'landscape' | 'portrait' }
 * @returns {string} Complete HTML string
 */
export function renderChart(chart, options = {}) {
  const layout = options.layout || 'landscape'; // 'portrait' for vertical mobile
  const isPortrait = layout === 'portrait';
  const cal = chart.raw?.cal || {};
  const input = chart.raw?.input || {};
  const CUC_NAMES = { 2: 'Thủy Nhị Cục', 3: 'Mộc Tam Cục', 4: 'Kim Tứ Cục', 5: 'Thổ Ngũ Cục', 6: 'Hỏa Lục Cục' };

  // Build palace cells
  let palaceCells = '';
  Object.entries(chart.palaces).forEach(([key, pal]) => {
    const pos = CHI_GRID[pal.chi];
    if (!pos) return;

    const palName = PALACE_DISPLAY[key] || key;
    const isThan = pal.isThan;
    const isMenh = key === 'MENH';
    const daiVan = pal.daiVanStart != null ? `${pal.daiVanStart}-${pal.daiVanEnd}` : '';

    // Separate main stars and auxiliary stars
    const mainStarNames = ['Tử Vi', 'Thiên Cơ', 'Thái Dương', 'Vũ Khúc', 'Thiên Đồng', 'Liêm Trinh',
      'Thiên Phủ', 'Thái Âm', 'Tham Lang', 'Cự Môn', 'Thiên Tướng', 'Thiên Lương', 'Thất Sát', 'Phá Quân'];

    const stars = pal.stars || [];
    const mainStars = stars.filter(s => mainStarNames.includes(typeof s === 'string' ? s : s.name));
    const auxStars = stars.filter(s => !mainStarNames.includes(typeof s === 'string' ? s : s.name));

    const mainHtml = mainStars.map(s => {
      const name = typeof s === 'string' ? s : s.name;
      const b = typeof s === 'object' ? s.brightness : null;
      return renderStarHtml(name, b);
    }).join(' ');

    const auxHtml = auxStars.map(s => {
      const name = typeof s === 'string' ? s : s.name;
      return renderStarHtml(name, null);
    }).join(' ');

    // Triệt / Tuần markers
    let markers = '';
    const triet = chart.misc?.tuanTriet?.['Triệt Không'] || '';
    const tuan = chart.misc?.tuanTriet?.['Tuần Không'] || '';
    if (triet.includes(pal.chi)) markers += '<span class="marker triet">Triệt</span>';
    if (tuan.includes(pal.chi)) markers += '<span class="marker tuan">Tuần</span>';

    palaceCells += `
    <div class="cell" style="grid-row:${pos.row};grid-column:${pos.col};">
      <div class="cell-header">
        <span class="dai-van">${daiVan}</span>
        <span class="palace-name ${isMenh ? 'menh' : ''} ${isThan ? 'than' : ''}">${palName}</span>
        <span class="chi-label">${pal.chi}</span>
      </div>
      <div class="main-stars">${mainHtml}</div>
      <div class="aux-stars">${auxHtml}</div>
      <div class="cell-footer">
        ${isThan ? '<span class="than-badge">THÂN</span>' : ''}
        ${markers}
      </div>
    </div>`;
  });

  // Center info panel
  const thanPalace = Object.values(chart.palaces).find(p => p.isThan);
  const cucName = CUC_NAMES[cal.cucNum] || '';
  const menhStar = chart.palaces.MENH?.stars?.[0] || '';
  const menhStarName = typeof menhStar === 'string' ? menhStar : menhStar.name || '';

  // Tứ Hóa
  let tuHoaHtml = '';
  if (chart.tuHoa) {
    const hoaMap = { loc: 'Lộc', quyen: 'Quyền', khoa: 'Khoa', ky: 'Kỵ' };
    tuHoaHtml = Object.entries(chart.tuHoa).map(([k, v]) => `${hoaMap[k] || k}: ${v}`).join(' | ');
  }

  const centerHtml = `
  <div class="center" style="grid-row:2/4;grid-column:2/4;">
    <div class="center-title">LÁ SỐ TỬ VI</div>
    <table class="info-table">
      <tr><td>Họ tên:</td><td><b>${input.name || 'N/A'}</b></td></tr>
      <tr><td>Năm:</td><td>${cal.lunar?.year || ''} [${cal.yearStem || ''} ${cal.yearBranch || ''}]</td></tr>
      <tr><td>Tháng:</td><td>${cal.lunar?.month || ''}</td></tr>
      <tr><td>Ngày:</td><td>${cal.lunar?.day || ''}</td></tr>
      <tr><td>Giờ sinh:</td><td>${cal.hourBranch || ''} (${input.hour || ''}:${String(input.minute || 0).padStart(2, '0')})</td></tr>
      <tr><td>Giới tính:</td><td>${input.gender || 'Nam'}</td></tr>
    </table>
    <div class="center-meta">
      <div>Cục: <b>${cucName}</b></div>
      <div>Mệnh tại <b>[${chart.palaces.MENH?.chi}]</b> — Chủ tinh: <b>${menhStarName}</b></div>
      <div>Thân cư: <b>${thanPalace ? thanPalace.name + ' (' + thanPalace.chi + ')' : 'N/A'}</b></div>
    </div>
    <div class="center-tuHoa">${tuHoaHtml}</div>
  </div>`;

  // Full HTML
  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0">
<title>Lá Số Tử Vi - ${input.name || ''}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background: #f5f0e8;
    display: flex; justify-content: center; align-items: ${isPortrait ? 'flex-start' : 'center'};
    min-height: 100vh; padding: ${isPortrait ? '4px' : '8px'};
  }
  .chart-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, auto);
    gap: 0;
    max-width: ${isPortrait ? '100%' : '720px'};
    width: 100%;
    border: 2px solid #8b4513;
    background: #fff;
  }
  .cell {
    border: 1px solid #c9a96e;
    padding: ${isPortrait ? '5px 4px' : '4px 5px'};
    min-height: ${isPortrait ? '140px' : '100px'};
    display: flex;
    flex-direction: column;
    background: #fffdf5;
    position: relative;
    overflow: hidden;
  }
  .cell-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
    border-bottom: 1px solid #e8d8b8;
    padding-bottom: 2px;
  }
  .palace-name {
    font-size: ${isPortrait ? '9px' : '10px'};
    font-weight: 600;
    color: #5d4037;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .palace-name.menh {
    color: #c62828;
    font-weight: 800;
    font-size: ${isPortrait ? '10px' : '11px'};
  }
  .palace-name.than {
    color: #e65100;
    font-weight: 800;
  }
  .chi-label {
    font-size: 9px;
    color: #8d6e63;
    font-weight: 500;
  }
  .dai-van {
    font-size: 8px;
    color: #999;
    font-style: italic;
  }
  .main-stars {
    font-size: ${isPortrait ? '11px' : '11px'};
    line-height: ${isPortrait ? '1.6' : '1.5'};
    flex: 0 0 auto;
    margin-bottom: 2px;
  }
  .main-stars span { font-weight: bold; }
  .aux-stars {
    font-size: ${isPortrait ? '9px' : '9px'};
    line-height: ${isPortrait ? '1.6' : '1.5'};
    flex: 1;
    color: #555;
  }
  .cell-footer {
    display: flex;
    gap: 3px;
    margin-top: auto;
  }
  .than-badge {
    background: #e65100;
    color: #fff;
    font-size: 8px;
    font-weight: 700;
    padding: 1px 4px;
    border-radius: 2px;
  }
  .marker {
    font-size: 7px;
    font-weight: 700;
    padding: 1px 3px;
    border-radius: 2px;
  }
  .marker.triet { background: #ffcdd2; color: #b71c1c; }
  .marker.tuan { background: #fff9c4; color: #f57f17; }

  /* Center panel */
  .center {
    border: 1px solid #c9a96e;
    background: linear-gradient(135deg, #fffdf5 0%, #f5efe3 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  .center-title {
    font-size: 16px;
    font-weight: 800;
    color: #8b4513;
    letter-spacing: 2px;
    margin-bottom: 8px;
    text-align: center;
  }
  .info-table {
    font-size: 10px;
    border-collapse: collapse;
    margin-bottom: 6px;
  }
  .info-table td {
    padding: 1px 6px 1px 0;
    vertical-align: top;
  }
  .info-table td:first-child {
    color: #8d6e63;
    font-weight: 500;
    white-space: nowrap;
  }
  .center-meta {
    font-size: 9px;
    text-align: center;
    color: #5d4037;
    margin-top: 4px;
    line-height: 1.6;
  }
  .center-tuHoa {
    font-size: 8px;
    color: #e65100;
    margin-top: 4px;
    text-align: center;
    font-weight: 500;
  }

  @media (max-width: 400px) {
    .main-stars { font-size: 9px; }
    .aux-stars { font-size: 7px; }
    .palace-name { font-size: 8px; }
    .cell { min-height: 80px; padding: 2px 3px; }
    .center-title { font-size: 13px; }
    .info-table { font-size: 8px; }
  }
</style>
</head>
<body>
<div class="chart-grid">
${palaceCells}
${centerHtml}
</div>
</body>
</html>`;
}


/**
 * Render the Tử Vi chart as a VERTICAL scrollable layout (mobile-friendly)
 * Palace order: Mệnh first, then clockwise from Mệnh chi
 */
export function renderChartVertical(chart, options = {}) {
  const cal = chart.raw?.cal || {};
  const input = chart.raw?.input || {};
  const CUC_NAMES = { 2: 'Thủy Nhị Cục', 3: 'Mộc Tam Cục', 4: 'Kim Tứ Cục', 5: 'Thổ Ngũ Cục', 6: 'Hỏa Lục Cục' };
  const thanPalace = Object.values(chart.palaces).find(p => p.isThan);
  const cucName = CUC_NAMES[cal.cucNum] || '';
  const menhStar = chart.palaces.MENH?.stars?.[0] || '';
  const menhStarName = typeof menhStar === 'string' ? menhStar : menhStar.name || '';

  const mainStarNames = ['Tử Vi', 'Thiên Cơ', 'Thái Dương', 'Vũ Khúc', 'Thiên Đồng', 'Liêm Trinh',
    'Thiên Phủ', 'Thái Âm', 'Tham Lang', 'Cự Môn', 'Thiên Tướng', 'Thiên Lương', 'Thất Sát', 'Phá Quân'];

  // Tứ Hóa
  let tuHoaItems = '';
  if (chart.tuHoa) {
    const hoaMap = { loc: 'Lộc', quyen: 'Quyền', khoa: 'Khoa', ky: 'Kỵ' };
    tuHoaItems = Object.entries(chart.tuHoa).map(([k, v]) => {
      const label = hoaMap[k] || k;
      const color = k === 'ky' ? '#e74c3c' : '#e67e22';
      return `<span class="tu-hoa-item"><span class="tu-hoa-label" style="color:${color}">Hóa ${label}</span> ${v}</span>`;
    }).join('');
  }

  // Tuần / Triệt
  const trietArr = chart.misc?.tuanTriet?.['Triệt Không'] || [];
  const tuanArr = chart.misc?.tuanTriet?.['Tuần Không'] || [];

  // Palace order: important palaces first, then the rest
  const PALACE_ORDER = ['MENH', 'THIEN_DI', 'QUAN', 'TAI', 'PHU_THE', 'TU_TUC', 'TAT', 'DIEN', 'PHUC', 'PHU_MAU', 'HUYNH_DE', 'NO'];

  let palaceCards = '';
  PALACE_ORDER.forEach((key) => {
    const pal = chart.palaces[key];
    if (!pal) return;

    const palName = PALACE_DISPLAY[key] || key;
    const isThan = pal.isThan;
    const isMenh = key === 'MENH';
    const daiVan = pal.daiVanStart != null ? `${pal.daiVanStart}–${pal.daiVanEnd} tuổi` : '';

    const stars = pal.stars || [];
    const mainStars = stars.filter(s => mainStarNames.includes(typeof s === 'string' ? s : s.name));
    const auxStars = stars.filter(s => !mainStarNames.includes(typeof s === 'string' ? s : s.name));

    const mainHtml = mainStars.map(s => {
      const name = typeof s === 'string' ? s : s.name;
      return renderStarHtml(name, null);
    }).join(' &nbsp; ');

    const auxHtml = auxStars.map(s => {
      const name = typeof s === 'string' ? s : s.name;
      return renderStarHtml(name, null);
    }).join(' &nbsp; ');

    // Badges
    let badges = '';
    if (isThan) badges += '<span class="badge badge-than">THÂN</span>';
    if (isMenh) badges += '<span class="badge badge-menh">MỆNH</span>';
    if (trietArr.includes(pal.chi)) badges += '<span class="badge badge-triet">Triệt</span>';
    if (tuanArr.includes(pal.chi)) badges += '<span class="badge badge-tuan">Tuần</span>';

    palaceCards += `
    <div class="v-card ${isMenh ? 'v-card-menh' : ''} ${isThan ? 'v-card-than' : ''}">
      <div class="v-card-head">
        <div class="v-card-title">
          <span class="v-palace-name">${palName}</span>
          <span class="v-chi">(${pal.chi})</span>
          ${badges}
        </div>
        <span class="v-dai-van">${daiVan}</span>
      </div>
      ${mainHtml ? `<div class="v-main-stars">${mainHtml}</div>` : ''}
      ${auxHtml ? `<div class="v-aux-stars">${auxHtml}</div>` : ''}
    </div>`;
  });

  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lá Số Tử Vi - ${input.name || ''}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: #0f0f14;
    color: #e8e6e3;
    padding: 12px;
    -webkit-font-smoothing: antialiased;
  }

  /* Header Card */
  .v-header {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 12px;
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 4px 24px rgba(0,0,0,0.3);
  }
  .v-header-title {
    font-size: 18px;
    font-weight: 800;
    color: #f0c27f;
    letter-spacing: 1.5px;
    text-align: center;
    margin-bottom: 14px;
    text-transform: uppercase;
  }
  .v-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 16px;
    font-size: 13px;
  }
  .v-info-item {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .v-info-label { color: #8b8fa3; font-weight: 500; }
  .v-info-value { color: #e8e6e3; font-weight: 600; text-align: right; }
  .v-info-value.highlight { color: #f0c27f; }

  .v-meta {
    text-align: center;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .v-meta-line {
    font-size: 12px;
    color: #8b8fa3;
    margin-bottom: 3px;
  }
  .v-meta-line b { color: #e8e6e3; }

  .v-tu-hoa {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  .tu-hoa-item {
    font-size: 11px;
    color: #ccc;
    background: rgba(255,255,255,0.05);
    padding: 3px 8px;
    border-radius: 6px;
  }
  .tu-hoa-label { font-weight: 700; }

  .v-tuan-triet {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 8px;
    font-size: 11px;
    color: #8b8fa3;
  }

  /* Palace Cards */
  .v-card {
    background: #1a1a24;
    border-radius: 12px;
    padding: 14px 16px;
    margin-bottom: 8px;
    border: 1px solid rgba(255,255,255,0.06);
    transition: all 0.2s;
  }
  .v-card-menh {
    border-left: 3px solid #e74c3c;
    background: linear-gradient(90deg, rgba(231,76,60,0.08) 0%, #1a1a24 30%);
  }
  .v-card-than {
    border-left: 3px solid #e67e22;
    background: linear-gradient(90deg, rgba(230,126,34,0.08) 0%, #1a1a24 30%);
  }
  .v-card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .v-card-title { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .v-palace-name {
    font-size: 14px;
    font-weight: 700;
    color: #e8e6e3;
    letter-spacing: 0.5px;
  }
  .v-chi {
    font-size: 12px;
    color: #8b8fa3;
    font-weight: 500;
  }
  .v-dai-van {
    font-size: 11px;
    color: #555;
    font-weight: 500;
  }

  /* Badges */
  .badge {
    font-size: 9px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .badge-menh { background: rgba(231,76,60,0.2); color: #e74c3c; }
  .badge-than { background: rgba(230,126,34,0.2); color: #e67e22; }
  .badge-triet { background: rgba(231,76,60,0.15); color: #e57373; }
  .badge-tuan { background: rgba(255,235,59,0.15); color: #fdd835; }

  /* Stars */
  .v-main-stars {
    font-size: 14px;
    line-height: 1.8;
    margin-bottom: 4px;
  }
  .v-aux-stars {
    font-size: 11px;
    line-height: 1.7;
    color: #777;
  }
</style>
</head>
<body>

<div class="v-header">
  <div class="v-header-title">☰ Lá Số Tử Vi</div>
  <div class="v-info-grid">
    <div class="v-info-item">
      <span class="v-info-label">Họ tên</span>
      <span class="v-info-value highlight">${input.name || 'N/A'}</span>
    </div>
    <div class="v-info-item">
      <span class="v-info-label">Giới tính</span>
      <span class="v-info-value">${input.gender || 'Nam'}</span>
    </div>
    <div class="v-info-item">
      <span class="v-info-label">Năm sinh</span>
      <span class="v-info-value">${cal.yearStem || ''} ${cal.yearBranch || ''}</span>
    </div>
    <div class="v-info-item">
      <span class="v-info-label">ÂL</span>
      <span class="v-info-value">${cal.lunar?.day || ''}/${cal.lunar?.month || ''}/${cal.lunar?.year || ''}</span>
    </div>
    <div class="v-info-item">
      <span class="v-info-label">Giờ sinh</span>
      <span class="v-info-value">${cal.hourBranch || ''} (${input.hour || ''}:${String(input.minute || 0).padStart(2, '0')})</span>
    </div>
    <div class="v-info-item">
      <span class="v-info-label">Cục</span>
      <span class="v-info-value highlight">${cucName}</span>
    </div>
  </div>
  <div class="v-meta">
    <div class="v-meta-line">Mệnh tại <b>[${chart.palaces.MENH?.chi}]</b> — Chủ tinh: <b>${menhStarName}</b></div>
    <div class="v-meta-line">Thân cư: <b>${thanPalace ? thanPalace.name + ' (' + thanPalace.chi + ')' : 'N/A'}</b></div>
  </div>
  <div class="v-tu-hoa">${tuHoaItems}</div>
  <div class="v-tuan-triet">
    <span>Tuần: <b style="color:#fdd835">${tuanArr.join(', ') || '—'}</b></span>
    <span>Triệt: <b style="color:#e57373">${trietArr.join(', ') || '—'}</b></span>
  </div>
</div>

${palaceCards}

</body>
</html>`;
}
