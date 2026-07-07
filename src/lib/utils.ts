import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseTaipeiDate } from "./now";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  const d = parseTaipeiDate(dateStr);
  const parts = new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(d);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value || "";
  const rocYear = Number(getPart("year")) - 1911;
  const month = getPart("month");
  const day = getPart("day");
  const weekDay = getPart("weekday");
  return `${rocYear}.${month}.${day} (${weekDay})`;
}
