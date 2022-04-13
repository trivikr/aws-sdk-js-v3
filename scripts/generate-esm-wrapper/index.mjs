import { existsSync } from "fs";
import { join } from "path";

import { getDepToCurrentVersionHash } from "../update-versions/getDepToCurrentVersionHash.mjs";
import { updateVersions } from "../update-versions/updateVersions.mjs";
import { getWorkspacePaths } from "../utils/getWorkspacePaths.mjs";
import { addVariantSuffix } from "./addVariantSuffix.mjs";
import { renameOrgInPackageName } from "./renameOrgInPackageName.mjs";
import { updateFilesInPackageJson } from "./updateFilesInPackageJson.mjs";

// In release automation, the steps need to be run for all workspace just once.
// After that the steps needs to be only for the packages which need to be published.
// List of all workspaces which ship node artifacts is needed for addVariantSuffix though.
const distFolderName = "dist-cjs";
const workspacePaths = getWorkspacePaths().filter((workspacePath) => existsSync(join(workspacePath, distFolderName)));

// The variant suffix is not needed in production script.
// This is added for testing publishined packahes with `@trivikr-test` org.
await addVariantSuffix(workspacePaths, "esm");

updateVersions(getDepToCurrentVersionHash());

await updateFilesInPackageJson(workspacePaths, [distFolderName]);

// Renaming org in package name is not needed in production script.
// This is added for testing published packages with `@trivikr-test` org.
await renameOrgInPackageName(workspacePaths, "@trivikr-test");
