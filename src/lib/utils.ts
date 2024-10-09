import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';

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

  let date = dayjs(new Date(year, month, 1)).clone();

  if (date.day() !== 1) {
    result.push([date.date()]);
    date = date.subtract(date.day() - 1, 'day');
  }

  while (date.month() === month || date.month() === month - 1) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = date.add(i, 'day');
      if (currentDay.month() === month) {
        week.push(currentDay.date());
      }
    }
    if (week.length > 0) {
      result.push(week);
    }
    date = date.add(7, 'day');
  }

  console.log('🚀 ~ getWeekRanges ~ result:', result);

  return result;
}
