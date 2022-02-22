import { exec } from "child_process";
import { readFile } from "fs/promises";
import { basename, join } from "path";
import { promisify } from "util";

import { getWorkspacePaths } from "../utils/getWorkspacePaths.mjs";

const execPromise = promisify(exec);
const workspacePaths = getWorkspacePaths().filter((workspacePath) => !basename(workspacePath).startsWith("aws-"));

for (const workspacePath of workspacePaths) {
  const packageJsonPath = join(workspacePath, "package.json");
  const packageJsonBuffer = await readFile(packageJsonPath);
  const { version } = JSON.parse(packageJsonBuffer.toString());
  const tag = version.substring(version.indexOf("+") + 1);

  // https://docs.npmjs.com/adding-dist-tags-to-packages
  const npmPublishCommand = `npm publish${tag ? ` --tag ${tag}` : ``}`;
  await execPromise(npmPublishCommand, { cwd: workspacePath });
}
