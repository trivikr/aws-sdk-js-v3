import { getWorkspacePaths } from "../utils/getWorkspacePaths.mjs";
import { renameOrgInPackageName } from "./renameOrgInPackageName.mjs";

const workspacePaths = getWorkspacePaths();
await renameOrgInPackageName(workspacePaths, "@trivikr-test");
