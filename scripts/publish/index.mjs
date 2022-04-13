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
  const packageJson = JSON.parse(packageJsonBuffer.toString());

  // Skip publishing private packages.
  if (packageJson?.private === true) {
    continue;
  }

  // npm token is set in ~/.npmrc
  try {
    const response = await execPromise("npm publish", {
      cwd: workspacePath,
      env: {
        npm_config_registry: "https://registry.npmjs.org/",
        npm_config_access: "public",
        PATH: process.env.PATH,
      },
    });
    console.log(response);
  } catch (error) {
    // Swallow error as this temporary script tries to publish over existing packages.
    // The release automation will publish only the changed workspaces.
    console.log(error);
  }
}
