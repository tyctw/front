export function getNow() {
  if (typeof window === "undefined") return new Date();

  const testDate = new URLSearchParams(window.location.search).get("testDate");
  if (!testDate) return new Date();

  const parsed = new Date(testDate);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}
