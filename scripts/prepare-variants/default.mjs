// Preparing default variant for testing in `@trivikr-test` org.
import { getDepToCurrentVersionHash } from "../update-versions/getDepToCurrentVersionHash.mjs";
import { updateVersions } from "../update-versions/updateVersions.mjs";
import { getWorkspacePaths } from "../utils/getWorkspacePaths.mjs";
import { addPreReleaseVersionSuffix } from "./addPreReleaseVersionSuffix.mjs";
import { renameOrgInSrc } from "./renameOrgInSrc.mjs";
import { replaceMarkdown } from "./replaceMarkdown.mjs";
import { updateEsVersionInBrowserConfig } from "./updateEsVersionInBrowserConfig.mjs";

const esVersion = process.argv[2];

const workspacePaths = getWorkspacePaths();
await replaceMarkdown(workspacePaths);

if (esVersion) {
  await addPreReleaseVersionSuffix(workspacePaths, esVersion);
  await updateEsVersionInBrowserConfig(workspacePaths, esVersion);
}

updateVersions(getDepToCurrentVersionHash());

renameOrgInSrc(workspacePaths, "@trivikr-test");
