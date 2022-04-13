import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export const generateEsmWrapper = async (workspacePaths, distFolderName) => {
  for (const workspacePath of workspacePaths) {
    await execPromise(
      `gen-esm-wrapper ${workspacePath}/${distFolderName}/index.js ${workspacePath}/${distFolderName}/index.mjs`
    );
  }
};
