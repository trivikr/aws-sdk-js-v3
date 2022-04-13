import { readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..", "..");

export const replaceMarkdown = async (workspacePaths) => {
  for (const workspacePath of workspacePaths) {
    const packageJsonPath = join(workspacePath, "package.json");
    const packageJsonBuffer = await readFile(packageJsonPath);
    const { version } = JSON.parse(packageJsonBuffer.toString());
    const versionWithoutTag = version.indexOf("-") > -1 ? version.substring(0, version.indexOf("-")) : version;

    for (const markdownFileName of ["README.md", "CHANGELOG.md"]) {
      const workspaceRelativePath = workspacePath.replace(rootDir, "");
      const markdownLink = `https://github.com/aws/aws-sdk-js-v3/blob/v${versionWithoutTag}${workspaceRelativePath}/${markdownFileName}`;
      const markdownFilePath = join(workspacePath, markdownFileName);
      await writeFile(
        markdownFilePath,
        `Please refer [${markdownFileName}](${markdownLink}) for v${versionWithoutTag}.\n`
      );
    }
  }
};
