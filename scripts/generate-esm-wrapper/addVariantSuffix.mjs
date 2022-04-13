import { readFile, writeFile } from "fs/promises";
import { basename, join } from "path";

const getUpdatedDeps = (deps, packageNamesToAddSuffix, variantSuffix) =>
  Object.fromEntries(
    Object.entries(deps).map(([dep, version]) => [
      packageNamesToAddSuffix.includes(dep) ? `${dep}-${variantSuffix}` : dep,
      version,
    ])
  );

export const addVariantSuffix = async (workspacePaths, variantSuffix) => {
  const packageNamesToAddSuffix = workspacePaths.map((workspacePath) => basename(workspacePath));
  for (const workspacePath of workspacePaths) {
    const packageJsonPath = join(workspacePath, "package.json");
    const packageJsonBuffer = await readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonBuffer.toString());
    const updatedPackageJson = {
      ...packageJson,
      name: `${packageJson.name}-${variantSuffix}`,
      ...(packageJson.dependencies && {
        dependencies: getUpdatedDeps(packageJson.dependencies, packageNamesToAddSuffix, variantSuffix),
      }),
      ...(packageJson.devDependencies && {
        devDependencies: getUpdatedDeps(packageJson.devDependencies, packageNamesToAddSuffix, variantSuffix),
      }),
    };
    await writeFile(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2).concat(`\n`));
  }
};
