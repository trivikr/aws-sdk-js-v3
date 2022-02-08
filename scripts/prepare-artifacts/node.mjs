import { getWorkspacePaths } from "../update-versions/getWorkspacePaths.mjs";
import { updatePackageJsonVersion } from "./updatePackageJsonVersion.mjs";

const workspacePaths = getWorkspacePaths();

// TODO: Bumping version will be done by lerna in prod version of this test.
// We're bumping just to have same version for all packages.
const version = process.argv[process.argv.length - 1].replace("v", "");
await updatePackageJsonVersion(workspacePaths, version);
