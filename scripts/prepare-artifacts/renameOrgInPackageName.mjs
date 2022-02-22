import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const renameOrgInDeps = (obj, orgName) =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key.replace("@aws-sdk", orgName), value]));

export const renameOrgInPackageName = async (workspacePaths, orgName) => {
  for (const workspacePath of workspacePaths) {
    const packageJsonPath = join(workspacePath, "package.json");
    const packageJsonBuffer = await readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonBuffer.toString());

    const { name, dependencies, devDependencies } = packageJson;
    const updatedPackageJson = {
      ...packageJson,
      name: name.replace("@aws-sdk", orgName),
      ...(dependencies && { dependencies: renameOrgInDeps(dependencies, orgName) }),
      ...(devDependencies && { devDependencies: renameOrgInDeps(devDependencies, orgName) }),
    };

    await writeFile(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2).concat(`\n`));
  }
};
