import { buildFolder } from "./bundler.js";

try {
  await buildFolder();
} catch (error) {
  console.error("Failed to prebuild:", error);
  process.exitCode = 1;
}
