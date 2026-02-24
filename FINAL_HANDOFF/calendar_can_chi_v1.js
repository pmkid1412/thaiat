
// calendar_can_chi_v1.js
// -----------------------------------------------------------------------------
// Solar -> Lunar (Vietnamese) conversion + Can-Chi computation.
// Reference: Ho Ngoc Duc "amlich.js" algorithm (public domain style).
// This module has NO external dependencies.
// -----------------------------------------------------------------------------

import { THIEN_CAN, DIA_CHI, CAN_INDEX, CHI_INDEX } from "./constants_mappings.js";

// === Julian day helpers ===
function INT(d) { return Math.floor(d); }

function jdFromDate(dd, mm, yy) {
  const a = INT((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
  if (jd < 2299161) {
    jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
  }
  return jd;
}

function jdToDate(jd) {
  let a, b, c;
  if (jd > 2299160) { // After 5/10/1582, Gregorian calendar
    a = jd + 32044;
    b = INT((4 * a + 3) / 146097);
    c = a - INT((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = INT((4 * c + 3) / 1461);
  const e = c - INT((1461 * d) / 4);
  const m = INT((5 * e + 2) / 153);
  const day = e - INT((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * INT(m / 10);
  const year = b * 100 + d - 4800 + INT(m / 10);
  return [day, month, year];
}

function getNewMoonDay(k, timeZone) {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 -= 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 -= 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 += 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 -= 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 -= 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 += 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  const deltaT = (T < -11)
    ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
    : -0.000278 + 0.000265 * T + 0.000262 * T2;
  const JdNew = Jd1 + C1 - deltaT;
  return INT(JdNew + 0.5 + timeZone / 24);
}

function getSunLongitude(jdn, timeZone) {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - Math.PI * 2 * INT(L / (Math.PI * 2));
  return INT(L / Math.PI * 6); // 0..11
}

function getLunarMonth11(yy, timeZone) {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = INT(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitude(nm, timeZone);
  if (sunLong >= 9) nm = getNewMoonDay(k - 1, timeZone);
  return nm;
}

function getLeapMonthOffset(a11, timeZone) {
  const k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);
  return i - 1;
}

export function solarToLunar(dd, mm, yy, timeZone = 7) {
  const dayNumber = jdFromDate(dd, mm, yy);
  const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) monthStart = getNewMoonDay(k, timeZone);

  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }

  const lunarDay = dayNumber - monthStart + 1;
  const diff = INT((monthStart - a11) / 29);
  let lunarMonth = diff + 11;
  let lunarLeap = false;

  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapOff) {
      lunarMonth = diff + 10;
      if (diff === leapOff) lunarLeap = true;
    }
  }
  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;

  return [lunarDay, lunarMonth, lunarYear, lunarLeap];
}

export function lunarToSolar(lunarDay, lunarMonth, lunarYear, lunarLeap, timeZone = 7) {
  // Iterative search for Solar Date corresponding to Lunar Date.
  // Approximation: Solar Date is roughly Lunar Date + 1 month.
  // We search from (LunarYear, LunarMonth - 1, LunarDay) - 15 days to + 45 days.

  // Start checking from a safe estimated solar date
  // Note: Javascript Date month is 0-indexed.
  const estimatedSolarMonth = lunarMonth - 1;
  let checkDate = new Date(lunarYear, estimatedSolarMonth, lunarDay);
  checkDate.setDate(checkDate.getDate() - 20); // Start 20 days earlier

  // Limit search to 60 days (enough to cover leap months and shifts)
  for (let i = 0; i < 90; i++) {
    const d = checkDate.getDate();
    const m = checkDate.getMonth() + 1;
    const y = checkDate.getFullYear();

    const [ld, lm, ly, leap] = solarToLunar(d, m, y, timeZone);

    if (ld === lunarDay && lm === lunarMonth && ly === lunarYear && !!leap === !!lunarLeap) {
      return [d, m, y];
    }

    // Move to next day
    checkDate.setDate(checkDate.getDate() + 1);
  }

  // Fallback if not found (should not happen for valid lunar dates)
  return null;
}

// === Can-Chi computation ===
export function getCanChiYear(lunarYear) {
  const can = THIEN_CAN[(lunarYear + 6) % 10]; // 1984 Giáp Tý => +6
  const chi = DIA_CHI[(lunarYear + 8) % 12];
  return { can, chi };
}

export function getCanChiMonth(lunarYear, lunarMonth) {
  // Month stem depends on year stem
  const yearCanIndex = (lunarYear + 6) % 10;
  const can = THIEN_CAN[(yearCanIndex * 2 + lunarMonth + 2) % 10];
  const chi = DIA_CHI[(lunarMonth + 1) % 12]; // month1= Dần
  return { can, chi };
}

export function getCanChiDay(jdn) {
  const can = THIEN_CAN[(jdn + 9) % 10];
  const chi = DIA_CHI[(jdn + 1) % 12];
  return { can, chi };
}

export function getHourChiFromSolarHour(hour) {
  // 0-1 Tý, 1-3 Sửu, ..., 21-23 Hợi
  const idx = INT(((hour + 1) % 24) / 2);
  return DIA_CHI[idx];
}

export function buildCalendar(input, targetDate = new Date()) {
  const timeZone = input.timeZone !== undefined ? input.timeZone : 7; // Default to VN (UTC+7)
  const [y, m, d] = input.dob.split("-").map(Number);
  let hh, mm;
  if (input.hour !== undefined) {
    hh = Number(input.hour);
    mm = Number(input.minute || 0);
  } else if (input.tob) {
    [hh, mm] = input.tob.split(":").map(Number);
  } else {
    hh = 0;
    mm = 0;
  }
  const isLunar = input.calendarType === 'lunar';

  let ld, lm, ly, leap;
  let solarD, solarM, solarY;
  let jdn;

  if (isLunar) {
    // Input IS lunar: use directly
    ld = d;
    lm = m;
    ly = y;
    leap = 0; // Assume non-leap month unless specified

    // Convert lunar → solar for JDN and Can-Chi day
    const solarResult = lunarToSolar(ld, lm, ly, leap, timeZone);
    if (!solarResult) {
      // Fallback: approximate solar date (lunar + ~30 days shift)
      console.warn(`lunarToSolar failed for ${ld}/${lm}/${ly}, using approximate solar date`);
      solarD = d;
      solarM = m + 1;
      solarY = y;
      if (solarM > 12) { solarM -= 12; solarY++; }
    } else {
      [solarD, solarM, solarY] = solarResult;
    }
    jdn = jdFromDate(solarD, solarM, solarY);
  } else {
    // Input IS solar: convert to lunar
    solarD = d;
    solarM = m;
    solarY = y;
    jdn = jdFromDate(solarD, solarM, solarY);

    const result = solarToLunar(solarD, solarM, solarY, timeZone);
    ld = result[0];
    lm = result[1];
    ly = result[2];
    leap = result[3];
  }

  const solarDate = new Date(Date.UTC(solarY, solarM - 1, solarD, hh - timeZone, mm, 0));

  const { can: yearCan, chi: yearChi } = getCanChiYear(ly);
  const { chi: monthChi } = getCanChiMonth(ly, lm);
  const { can: dayCan, chi: dayChi } = getCanChiDay(jdn);
  const hourChi = getHourChiFromSolarHour(hh);

  // Compute for targetDate (current time context)
  const tYear = targetDate.getFullYear();
  const tMonth = targetDate.getMonth() + 1;
  const tDay = targetDate.getDate();
  const [tLd, tLm, tLy, tLeap] = solarToLunar(tDay, tMonth, tYear, timeZone);
  const { can: tYearCan, chi: tYearChi } = getCanChiYear(tLy);
  const { can: tMonthCan, chi: tMonthChi } = getCanChiMonth(tLy, tLm);
  const tJdn = jdFromDate(tDay, tMonth, tYear);
  const { can: tDayCan, chi: tDayChi } = getCanChiDay(tJdn);

  return {
    solar: { date: solarDate, tz: "Asia/Ho_Chi_Minh" },
    lunar: { day: ld, month: lm, year: ly, isLeap: leap },
    yearStem: yearCan,
    yearBranch: yearChi,
    monthBranch: monthChi,
    dayStem: dayCan,
    dayBranch: dayChi,
    hourBranch: hourChi,
    hourChiIndex: CHI_INDEX[hourChi],
    jdn,
    // Context for current view (today)
    current: {
      date: targetDate,
      lunar: { day: tLd, month: tLm, year: tLy, isLeap: tLeap },
      yearStem: tYearCan,
      yearBranch: tYearChi,
      monthStem: tMonthCan,
      monthBranch: tMonthChi,
      dayStem: tDayCan,
      dayBranch: tDayChi
    }
  };
}
