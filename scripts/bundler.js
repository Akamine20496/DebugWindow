import fs from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ZipArchive } from "archiver";

// Project paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const srcDir = path.join(rootDir, "src");
const buildDir = path.join(rootDir, "build");
const distDir = path.join(buildDir, "dist");
const testDir = path.join(buildDir, "test");

// Read configuration from package.json
const packageJson = JSON.parse(
  await fs.readFile(
    path.join(rootDir, "package.json"),
    "utf8"
  )
);

const { name, files } = packageJson.buildConfig;

if (!name || !Array.isArray(files) || files.length === 0) {
  throw new Error(
    "buildConfig must contain a name and at least one file or folder"
  );
}

// Output paths
const folderPath = path.join(testDir, name);
const zipPath = path.join(distDir, `${name}.zip`);

// Copy configured files and folders into a destination
async function copyFiles(destinationDir) {
  for (const item of files) {
    const source = path.resolve(srcDir, item);
    const destination = path.join(destinationDir, item);

    // Check whether the source exists
    await fs.stat(source);

    // Create the destination's parent directory
    await fs.mkdir(path.dirname(destination), {
      recursive: true,
    });

    // Copy file or folder
    await fs.cp(source, destination, {
      recursive: true,
    });
  }
}

// Create a regular folder in the project root
export async function buildFolder() {
  // Remove previous package folder
  await fs.rm(folderPath, {
    recursive: true,
    force: true,
  });

  // Create the package folder
  await fs.mkdir(folderPath, {
    recursive: true,
  });

  await copyFiles(folderPath);

  console.log("Folder created successfully!");
  console.log(`Folder: ${folderPath}`);
}

// Create ZIP archive using Archiver v8
async function createZip(filesToInclude, outputPath) {
  // Ensure output directory exists
  await fs.mkdir(path.dirname(outputPath), {
    recursive: true,
  });

  const output = createWriteStream(outputPath);

  const archive = new ZipArchive({
    zlib: { level: 9 },
  });

  // Wait until the ZIP file is completely written
  const finished = new Promise((resolve, reject) => {
    output.on("close", resolve);
    output.on("error", reject);
    archive.on("error", reject);
  });

  archive.pipe(output);

  for (const item of filesToInclude) {
    const source = path.resolve(srcDir, item);

    // Check whether the source exists
    const stats = await fs.stat(source);

    if (stats.isDirectory()) {
      archive.directory(source, item);
    } else {
      archive.file(source, { name: item });
    }
  }

  await archive.finalize();
  await finished;
}

// Create ZIP in dist
export async function buildZip() {
  await fs.mkdir(distDir, { recursive: true });

  // Remove previous ZIP
  await fs.rm(zipPath, { force: true });

  await createZip(files, zipPath);

  console.log("Bundled successfully!");
  console.log(`ZIP: ${zipPath}`);
}
