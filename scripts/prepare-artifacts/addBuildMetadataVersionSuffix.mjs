import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export const addBuildMetadataVersionSuffix = async (workspacePaths, buildMetadata) => {
  for (const workspacePath of workspacePaths) {
    const packageJsonPath = join(workspacePath, "package.json");
    const packageJsonBuffer = await readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonBuffer.toString());
    const updatedPackageJson = { ...packageJson, version: `${packageJson.version}+${buildMetadata}` };
    await writeFile(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2).concat(`\n`));
  }
};
