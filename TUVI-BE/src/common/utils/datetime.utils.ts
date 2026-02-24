export class DateTimeUtil {
  static convertToVNTime(date: Date): string {
    return date.toLocaleDateString('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh',
    });
  }

  static formatDate(date: Date): string {
    const pad = (n) => (n < 10 ? '0' + n : n);

    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      ' ' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds())
    );
  }

  static isLessThan(date1: string, date2: string): boolean {
    return new Date(date1) < new Date(date2);
  }

  static convertToLocalString(date: Date): string {
    return date.toLocaleString('en-CA', { hour12: false }).replace(',', '');
  }

  static getCurrentLocalTimeString(): string {
    return new Date().toLocaleTimeString('en-US', { hour12: false });
  }

  static getCurrentLocalDateTime(): string {
    return new Date().toLocaleString('en-US', { hour12: false });
  }

  static addMonths(dateData: Date | string, additionalMonths: number): string {
    let date: Date;
    if (typeof dateData === 'string') {
      date = new Date(dateData);
    } else {
      date = dateData;
    }
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const target = new Date(
      year,
      month + additionalMonths,
      day,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    );

    const expectedMonth = (month + additionalMonths) % 12;
    const normalizedExpectedMonth =
      expectedMonth < 0 ? expectedMonth + 12 : expectedMonth;

    if (target.getMonth() !== normalizedExpectedMonth) {
      return this.convertToLocalString(
        new Date(
          year,
          month + additionalMonths + 1,
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
        ),
      );
    }

    return this.convertToLocalString(target);
  }

  static convertTimeUtcToLocal(date: Date): string {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const timeString = date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
    });

    return `${year}-${month + 1}-${day} ${timeString}`;
  }

  static getFirstDayOfMonthString(yearStr: string, monthStr: string): string {
    const year = Number(yearStr);
    const month = Number(monthStr) - 1;
    const firstDay = new Date(Date.UTC(year, month, 1));

    return firstDay.toISOString().slice(0, 10);
  }

  static getLastDayOfMonthString(yearStr: string, monthStr: string): string {
    const year = Number(yearStr);
    const month = Number(monthStr);
    const lastDay = new Date(Date.UTC(year, month, 0));

    return lastDay.toISOString().slice(0, 10);
  }

  static getUserLocalDate(offset: number): {
    year: number;
    month: number;
    day: number;
  } {
    // offset: "+7" → 7, "-6.5" → -6.5
    const nowUtc = new Date();

    // convert offset to ms
    const localTime = new Date(nowUtc.getTime() + offset * 60 * 60 * 1000);

    const year = localTime.getUTCFullYear();
    const month = localTime.getUTCMonth() + 1;
    const day = localTime.getUTCDate();

    return { year, month, day };
  }

  static daysBetweenDates(startDate: Date, endDate: Date): number {
    // Strip the time portion
    const start = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
    );
    const end = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
    );

    // Calculate difference in milliseconds
    const diffTime = end.getTime() - start.getTime();

    // Convert milliseconds to days
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
