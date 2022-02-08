import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export const deleteFilesWithExtension = async (workspacePaths, distFolderName, extension) => {
  for (const workspacePath of workspacePaths) {
    await execPromise(`find ${workspacePath}/${distFolderName} -name "${extension}" -type f -delete`);
  }
};
