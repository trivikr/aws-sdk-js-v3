import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export const addPreReleaseVersionSuffix = async (workspacePaths, prereleaseTag) => {
  for (const workspacePath of workspacePaths) {
    const packageJsonPath = join(workspacePath, "package.json");
    const packageJsonBuffer = await readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonBuffer.toString());
    const updatedPackageJson = { ...packageJson, version: `${packageJson.version}-${prereleaseTag}` };
    await writeFile(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2).concat(`\n`));
  }
};
