import { getDepToCurrentVersionHash } from "../update-versions/getDepToCurrentVersionHash.mjs";
import { getWorkspacePaths } from "../update-versions/getWorkspacePaths.mjs";
import { updateVersions } from "../update-versions/updateVersions.mjs";
import { addBuildMetadataVersionSuffix } from "./addBuildMetadataVersionSuffix.mjs";
import { deleteFilesWithExtension } from "./deleteFilesWithExtension.mjs";
import { deleteNotNodeDeps } from "./deleteNotNodeDeps.mjs";
import { deleteNotNodeEntriesInPackageJson } from "./deleteNotNodeEntriesInPackageJson.mjs";
import { updateFilesInPackageJson } from "./updateFilesInPackageJson.mjs";
import { updatePackageJsonVersion } from "./updatePackageJsonVersion.mjs";

const workspacePaths = getWorkspacePaths();
const buildMetadata = "node-cjs";

// TODO: Bumping version will be done by lerna in prod version of this test script.
// We're bumping just to have same version for all packages.
const version = process.argv[process.argv.length - 1].replace("v", "");
await updatePackageJsonVersion(workspacePaths, version);

await addBuildMetadataVersionSuffix(workspacePaths, buildMetadata);

updateVersions(getDepToCurrentVersionHash());

await deleteNotNodeEntriesInPackageJson(workspacePaths);

await deleteFilesWithExtension(workspacePaths, "dist-cjs", "*.browser.js");
await deleteFilesWithExtension(workspacePaths, "dist-cjs", "*.native.js");

await updateFilesInPackageJson(workspacePaths, ["dist-cjs"]);

await deleteNotNodeDeps(workspacePaths);
