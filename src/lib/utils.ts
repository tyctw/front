import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const rocYear = d.getFullYear() - 1911;
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const weekDay = d.toLocaleDateString('zh-TW', { weekday: 'short' });
  return `${rocYear}.${month}.${day} (${weekDay})`;
}
