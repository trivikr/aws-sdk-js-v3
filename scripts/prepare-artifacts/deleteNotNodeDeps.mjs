import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export const deleteNotNodeDeps = async (workspacePaths) => {
  for (const workspacePath of workspacePaths) {
    const packageJsonPath = join(workspacePath, "package.json");
    const packageJsonBuffer = await readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonBuffer.toString());
    const updatedPackageJson = {
      ...packageJson,
      ...(packageJson.dependencies && {
        dependencies: Object.entries(packageJson.dependencies)
          .filter(
            ([key, value]) =>
              !key.endsWith("browser") &&
              !key.endsWith("native") &&
              key !== "fetch-http-handler" &&
              key !== "chunked-blob-reader"
          )
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
      }),
    };
    await writeFile(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2).concat(`\n`));
  }
};
