import { mkdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";

const routes = ["guide", "schedule", "about", "articles", "articles/after-results", "articles/how-to-check", "articles/admitted", "articles/not-admitted", "articles/result-day", "articles/registration-documents", "articles/continued-enrollment", "articles/admission-status", "articles/result-question", "articles/withdrawal", "articles/new-student"];
const distDir = "dist";
const entry = join(distDir, "index.html");

for (const route of routes) {
  const target = join(distDir, route, "index.html");
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(entry, target);
}
