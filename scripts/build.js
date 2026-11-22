import { buildZip } from "./bundler.js";

try {
  await buildZip();
} catch (error) {
  console.error("Failed to build:", error);
  process.exitCode = 1;
}
