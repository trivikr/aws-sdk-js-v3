import { existsSync } from "fs";
import { join } from "path";

import { getDepToCurrentVersionHash } from "../update-versions/getDepToCurrentVersionHash.mjs";
import { updateVersions } from "../update-versions/updateVersions.mjs";
import { getWorkspacePaths } from "../utils/getWorkspacePaths.mjs";
import { addPreReleaseVersionSuffix } from "./addPreReleaseVersionSuffix.mjs";
import { deleteFilesWithExtension } from "./deleteFilesWithExtension.mjs";
import { deleteNotNodeDeps } from "./deleteNotNodeDeps.mjs";
import { deleteNotNodeEntriesInPackageJson } from "./deleteNotNodeEntriesInPackageJson.mjs";
import { renameOrgInPackageName } from "./renameOrgInPackageName.mjs";
import { replaceMarkdown } from "./replaceMarkdown.mjs";
import { updateFilesInPackageJson } from "./updateFilesInPackageJson.mjs";

// In release automation, the steps need to be run for all workspace just once.
// After that the steps needs to be only for the packages which need to be published.
const distFolderName = "dist-cjs";
const workspacePaths = getWorkspacePaths().filter((workspacePath) => existsSync(join(workspacePath, distFolderName)));
const prerelease = "node.cjs";

await addPreReleaseVersionSuffix(workspacePaths, prerelease);

updateVersions(getDepToCurrentVersionHash());

await deleteNotNodeEntriesInPackageJson(workspacePaths);

await deleteFilesWithExtension(workspacePaths, distFolderName, "*.browser.js");
await deleteFilesWithExtension(workspacePaths, distFolderName, "*.native.js");

await updateFilesInPackageJson(workspacePaths, [distFolderName]);

await deleteNotNodeDeps(workspacePaths);
await replaceMarkdown(workspacePaths);

// Renaming org in package name is not needed in production script.
// This is added for testing published packages with `@trivikr-test` org.
await renameOrgInPackageName(workspacePaths, "@trivikr-test");
