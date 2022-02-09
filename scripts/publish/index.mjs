import { exec } from "child_process";
import { basename } from "path";
import { promisify } from "util";

import { getWorkspacePaths } from "../utils/getWorkspacePaths.mjs";

const execPromise = promisify(exec);
const workspacePaths = getWorkspacePaths().filter((workspacePath) => !basename(workspacePath).startsWith("aws-"));

for (const workspacePath of workspacePaths) {
  // https://docs.npmjs.com/adding-dist-tags-to-packages
  const npmPublishCommand = `npm publish --tag cjs`;
  console.log({ npmPublishCommand, cwd: workspacePath });
  await execPromise(npmPublishCommand, { cwd: workspacePath });
}
