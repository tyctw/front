const TAIPEI_OFFSET = "+08:00";
const EXPLICIT_TIME_ZONE_PATTERN = /(Z|[+-]\d{2}:?\d{2})$/i;
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function parseTaipeiDate(value: string | Date) {
  if (value instanceof Date) return new Date(value.getTime());

  const normalized = DATE_ONLY_PATTERN.test(value)
    ? `${value}T00:00:00${TAIPEI_OFFSET}`
    : EXPLICIT_TIME_ZONE_PATTERN.test(value)
      ? value
      : `${value}${TAIPEI_OFFSET}`;

  return new Date(normalized);
}

export function getTaipeiDayBounds(value: string | Date) {
  const date = value instanceof Date ? value : parseTaipeiDate(value);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value || "01";
  const dayStart = parseTaipeiDate(`${getPart("year")}-${getPart("month")}-${getPart("day")}T00:00:00`);

  return {
    start: dayStart,
    end: new Date(dayStart.getTime() + 86400000),
  };
}

export function getNow() {
  if (typeof window === "undefined") return new Date();

  const testDate = new URLSearchParams(window.location.search).get("testDate");
  if (!testDate) return new Date();

  const parsed = parseTaipeiDate(testDate);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}
