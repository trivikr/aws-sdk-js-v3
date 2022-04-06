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
  const { version } = packageJson;

  // Skip publishing private packages.
  if (packageJson?.private === true) {
    continue;
  }

  // Comment this if block, if releasing default version while testing
  if (version.indexOf("-") < 0) {
    continue;
  }

  const tag = version.indexOf("-") > -1 ? version.substring(version.indexOf("-") + 1) : undefined;

  // https://docs.npmjs.com/adding-dist-tags-to-packages
  const npmPublishCommand = `npm publish${tag ? ` --tag ${tag}` : ``}`;
  // npm token is set in ~/.npmrc
  try {
    const response = await execPromise(npmPublishCommand, {
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
