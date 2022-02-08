import { getWorkspacePaths } from "../update-versions/getWorkspacePaths.mjs";
import { addPreReleaseVersionSuffix } from "./addPreReleaseVersionSuffix.mjs";
import { updatePackageJsonVersion } from "./updatePackageJsonVersion.mjs";

const workspacePaths = getWorkspacePaths();
const prereleaseTag = "test";

// TODO: Bumping version will be done by lerna in prod version of this test script.
// We're bumping just to have same version for all packages.
const version = process.argv[process.argv.length - 1].replace("v", "");
await updatePackageJsonVersion(workspacePaths, version);

// TODO: Adding prerelease version will not be required in prod version of this test script.
// The prerelease version is being added to that it doesn't interfere with stable versions.
await addPreReleaseVersionSuffix(workspacePaths, prereleaseTag);
