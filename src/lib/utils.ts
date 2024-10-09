import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentYear() {
  return dayjs().year();
}

export function getDaysInMonth(year: number, month: number) {
  const noDays = dayjs(new Date(year, month, 0)).date();
  return Array.from({ length: noDays }, (_, i) => {
    return i + 1;
    // return `${year}/${month}/${(i + 1).toString().padStart(2, '0')}`;
  });
}

export function getWeekRanges(year: number, month: number) {
  const result = [];
  const daysInMonth = dayjs.utc().year(year).month(month).daysInMonth();
  let week = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = dayjs.utc().year(year).month(month).date(day);
    const dayOfWeek = date.day();

    if (dayOfWeek === 1 && week.length) {
      result.push(week);
      week = [];
    }

    week.push(day);

    if (dayOfWeek === 0 || day === daysInMonth) {
      result.push(week);
      week = [];
    }
  }

  return result;
}
