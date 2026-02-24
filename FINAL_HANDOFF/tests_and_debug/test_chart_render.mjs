import { buildEngineOutput } from '../coreEngineV1.js';
import { renderChart } from '../chart_renderer.js';
import fs from 'fs';

// Test with 2016 data
const result = buildEngineOutput({
    name: 'Test 2016', gender: 'Nam',
    dob: '2016-06-26', calendarType: 'solar',
    hour: 14, minute: 0, timeZone: 7
});

const html = renderChart(result.chart);
fs.writeFileSync('test_2016_chart.html', html, 'utf8');
console.log('Chart HTML written:', html.length, 'chars → test_2016_chart.html');

// Also test with Nam 1976
const result2 = buildEngineOutput({
    name: 'Nam', gender: 'Nam',
    dob: '1976-01-04', calendarType: 'solar',
    hour: 20, minute: 0, timeZone: 7
});

const html2 = renderChart(result2.chart);
fs.writeFileSync('nam_1976_chart.html', html2, 'utf8');
console.log('Chart HTML written:', html2.length, 'chars → nam_1976_chart.html');
