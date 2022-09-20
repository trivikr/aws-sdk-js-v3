// Preparing default variant for testing in `@trivikr-test` org.
import { getDepToCurrentVersionHash } from "../update-versions/getDepToCurrentVersionHash.mjs";
import { updateVersions } from "../update-versions/updateVersions.mjs";
import { getWorkspacePaths } from "../utils/getWorkspacePaths.mjs";
import { renameOrgInSrc } from "./renameOrgInSrc.mjs";
import { replaceMarkdown } from "./replaceMarkdown.mjs";

const workspacePaths = getWorkspacePaths();

updateVersions(getDepToCurrentVersionHash());

await replaceMarkdown(workspacePaths);
renameOrgInSrc(workspacePaths, "@trivikr-test");
