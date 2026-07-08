import { mkdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";

const routes = ["guide"];
const distDir = "dist";
const entry = join(distDir, "index.html");

for (const route of routes) {
  const target = join(distDir, route, "index.html");
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(entry, target);
}
