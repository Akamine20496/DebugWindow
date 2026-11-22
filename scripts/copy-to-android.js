import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// Project paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Read configuration from package.json
const packageJson = JSON.parse(
  await fs.readFile(path.join(rootDir, "package.json"), "utf8")
);

const { packageName, name } = packageJson.buildConfig;

if (!packageName || !name) {
  console.error("Missing buildConfig.packageName or buildConfig.name");
  process.exit(1);
}

const sourcePath = path.join(rootDir, "src");
const destinationPath = `/sdcard/Android/data/${packageName}/files/mods/${name}`;

if (!sourcePath) {
  console.error("Missing sourcePath");
  process.exit(1);
}

// Run adb and create folder in the mods folder if it doesn't exist (it gets skipped if existing)
const mkdirResult = spawnSync(
  "adb",
  [
    "shell",
    "mkdir",
    "-p",
    destinationPath
  ],
  { stdio: "inherit" }
);

if (mkdirResult.error) {
  console.error("Failed to run adb mkdir:", mkdirResult.error.message);
  process.exit(1);
}

if ((mkdirResult.status ?? 1) !== 0) {
  process.exit(mkdirResult.status ?? 1);
}

// Run adb and push every item inside src/ directly into destinationPath
const entries = await fs.readdir(sourcePath);

for (const entry of entries) {
  const srcItem = path.join(sourcePath, entry);
  const result = spawnSync(
    "adb",
    [
      "push",
      "-p",
      "--sync",
      srcItem,
      destinationPath
    ],
    { stdio: "inherit" }
  );

  if (result.error) {
    console.error(`Failed to push ${entry}:`, result.error.message);
    process.exitCode = 1;
    break;
  }

  if ((result.status ?? 1) !== 0) {
    process.exitCode = result.status ?? 1;
    break;
  }
}
