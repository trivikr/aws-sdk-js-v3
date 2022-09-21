import { exec } from "child_process";
import { promisify } from "util";

import { getWorkspacePaths } from "../utils/getWorkspacePaths.mjs";

const execPromise = promisify(exec);
const workspacePaths = getWorkspacePaths();

// All workspaces need to be published just once.
// The release automation should publish only the changed workspaces.
for (const workspacePath of workspacePaths) {
  // npm token is set in ~/.npmrc
  const response = await execPromise(`npm publish`, {
    cwd: workspacePath,
    env: {
      npm_config_registry: "https://registry.npmjs.org/",
      npm_config_access: "public",
      PATH: process.env.PATH,
    },
  });
  console.log(response);
}
