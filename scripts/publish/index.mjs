import { exec } from "child_process";
import { readFile } from "fs/promises";
import { join } from "path";
import { promisify } from "util";

import { getWorkspacePaths } from "../utils/getWorkspacePaths.mjs";

const execPromise = promisify(exec);
const workspacePaths = getWorkspacePaths();

// All workspaces need to be published just once.
// The release automation should publish only the changed workspaces.
for (const workspacePath of workspacePaths) {
  const packageJsonPath = join(workspacePath, "package.json");
  const packageJsonBuffer = await readFile(packageJsonPath);
  const { version } = JSON.parse(packageJsonBuffer.toString());
  const tag = version.indexOf("-") > -1 ? version.substring(version.indexOf("-") + 1) : undefined;

  // https://docs.npmjs.com/adding-dist-tags-to-packages
  const npmPublishCommand = `npm publish${tag ? ` --tag ${tag}` : ``}`;
  // npm token is set in ~/.npmrc
  const response = await execPromise(npmPublishCommand, {
    cwd: workspacePath,
    env: {
      npm_config_registry: "https://registry.npmjs.org/",
      npm_config_access: "public",
      PATH: process.env.PATH,
    },
  });
  console.log(response);
}
