import { readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..", "..");

export const updateEsVersionInBrowserConfig = async (workspacePaths, esVersion) => {
  const tsconfigPath = join(rootDir, "tsconfig.es.json");

  // Update ES Version in root TSConfig
  const tsConfigBuffer = await readFile(tsconfigPath);
  const tsConfig = JSON.parse(tsConfigBuffer.toString());
  const updatedTsConfig = {
    ...tsConfig,
    compilerOptions: {
      ...tsConfig.compilerOptions,
      target: esVersion,
    },
  };
  await writeFile(tsconfigPath, JSON.stringify(updatedTsConfig, null, 2).concat(`\n`));

  // Remove lib from package TSConfig
  for (const workspacePath of workspacePaths) {
    const tsconfigPath = join(workspacePath, "tsconfig.es.json");
    const tsConfigBuffer = await readFile(tsconfigPath);
    const tsConfig = JSON.parse(tsConfigBuffer.toString());
    const { compilerOptions } = tsConfig;
    const updatedTsConfig = {
      ...tsConfig,
      compilerOptions: {
        ...compilerOptions,
        ...(compilerOptions.lib && { lib: getUpdatedLib(compilerOptions.lib, esVersion) }),
      },
    };
    await writeFile(tsconfigPath, JSON.stringify(updatedTsConfig, null, 2).concat(`\n`));
  }
};

/**
 * Remove libs equal or prior to the target ES version
 */
const getUpdatedLib = (lib, esVersion) =>
  lib.filter((libEntry) => {
    if (libEntry === "es5") {
      return false;
    }
    if (!libEntry.toLowerCase().startsWith("es20")) {
      return true;
    }
    const libVersion = libEntry.split(".")[0];
    return getEsYear(libVersion) > getEsYear(esVersion);
  });

const getEsYear = (esVersion) => Number(esVersion.substring(2));
