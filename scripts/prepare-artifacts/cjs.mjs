import { getDepToCurrentVersionHash } from "../update-versions/getDepToCurrentVersionHash.mjs";
import { getWorkspacePaths } from "../update-versions/getWorkspacePaths.mjs";
import { updateVersions } from "../update-versions/updateVersions.mjs";
import { addBuildMetadataVersionSuffix } from "./addBuildMetadataVersionSuffix.mjs";
import { deleteFilesWithExtension } from "./deleteFilesWithExtension.mjs";
import { deleteNotNodeDeps } from "./deleteNotNodeDeps.mjs";
import { deleteNotNodeEntriesInPackageJson } from "./deleteNotNodeEntriesInPackageJson.mjs";
import { updateFilesInPackageJson } from "./updateFilesInPackageJson.mjs";

// In release automation, the steps need to be run for all workspace just once.
// After that the steps needs to be only for the packages which need to be published.
const workspacePaths = getWorkspacePaths();
const buildMetadata = "cjs";

await addBuildMetadataVersionSuffix(workspacePaths, buildMetadata);

updateVersions(getDepToCurrentVersionHash());

await deleteNotNodeEntriesInPackageJson(workspacePaths);

await deleteFilesWithExtension(workspacePaths, "dist-cjs", "*.browser.js");
await deleteFilesWithExtension(workspacePaths, "dist-cjs", "*.native.js");

await updateFilesInPackageJson(workspacePaths, ["dist-cjs"]);

await deleteNotNodeDeps(workspacePaths);
