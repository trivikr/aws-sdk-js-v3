import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export const renameOrgInPackageName = async (workspacePaths, orgName) => {
  for (const workspacePath of workspacePaths) {
    const packageJsonPath = join(workspacePath, "package.json");
    const packageJsonBuffer = await readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonBuffer.toString());
    const updatedPackageJson = { ...packageJson, name: packageJson.name.replace("@aws-sdk", orgName) };
    await writeFile(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2).concat(`\n`));
  }
};
