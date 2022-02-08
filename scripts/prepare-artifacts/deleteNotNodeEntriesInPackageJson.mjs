import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export const deleteNotNodeEntriesInPackageJson = async (workspacePaths) => {
  for (const awsDepPath of workspacePaths) {
    const packageJsonPath = join(awsDepPath, "package.json");
    const packageJsonBuffer = await readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonBuffer.toString());
    ["types", "modules", "browser", "react-native"].forEach((keyToDelete) => {
      delete packageJson[keyToDelete];
    });
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2).concat(`\n`));
  }
};
