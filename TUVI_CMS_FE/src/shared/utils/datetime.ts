// Timezone-aware helpers: format YYYY-MM-DD in a given IANA timezone
export const getDatePartsInTimeZone = (date: Date, timeZone: string) => {
  const dtf = new Intl.DateTimeFormat("en", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = dtf.formatToParts(date);
  const year = Number(parts.find((p) => p.type === "year")?.value ?? 0);
  const month = Number(parts.find((p) => p.type === "month")?.value ?? 0);
  const day = Number(parts.find((p) => p.type === "day")?.value ?? 0);
  return { year, month, day };
};

export const formatDateParts = (year: number, month: number, day: number) => {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
};

export const addMonthsInTimeZone = (
  date: Date,
  months: number,
  timeZone: string
) => {
  const { year, month, day } = getDatePartsInTimeZone(date, timeZone);
  // month is 1-12; convert to 0-index for math
  const monthIndex = month - 1 + months;
  const targetYear = year + Math.floor(monthIndex / 12);
  const targetMonthIndex = ((monthIndex % 12) + 12) % 12; // ensure positive
  // last day of target month (UTC) using Date UTC trick
  const lastDay = new Date(
    Date.UTC(targetYear, targetMonthIndex + 1, 0)
  ).getUTCDate();
  const targetDay = Math.min(day, lastDay);
  return formatDateParts(targetYear, targetMonthIndex + 1, targetDay);
};
