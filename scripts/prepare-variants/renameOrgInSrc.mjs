import { execSync } from "child_process";

export const renameOrgInSrc = (workspacePaths, orgName) => {
  for (const workspacePath of workspacePaths) {
    for (const fileName of ["package.json", "src"]) {
      execSync(`grep -rl @aws-sdk ${fileName} | xargs -r sed -i 's/@aws-sdk/${orgName}/g'`, { cwd: workspacePath });
    }
  }
};
