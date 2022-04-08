import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export const addVariantSuffix = async (workspacePaths, variant) => {
  for (const workspacePath of workspacePaths) {
    const packageJsonPath = join(workspacePath, "package.json");
    const packageJsonBuffer = await readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonBuffer.toString());
    const updatedPackageJson = {
      ...packageJson,
      name: `${packageJson.name}-${variant}`,
      ...(packageJson.dependencies && {
        dependencies: Object.fromEntries(
          Object.entries(packageJson.dependencies).map(([dep, version]) => [
            dep.startsWith("@aws-sdk/") ? `${dep}-${variant}` : dep,
            version,
          ])
        ),
      }),
    };
    await writeFile(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2).concat(`\n`));
  }
};
