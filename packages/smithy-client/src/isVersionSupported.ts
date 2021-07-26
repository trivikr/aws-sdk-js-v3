export const isVersionSupported = (version: string, supportedVersion: string): boolean => {
  const [supportedMajorVersion = 0, supportedMinorVersion = 0, supportedPatchVersion = 0] = supportedVersion
    .replace("v", "")
    .split(".")
    .map(Number);
  const [majorVersion = 0, minorVersion = 0, patchVersion = 0] = version.replace("v", "").split(".").map(Number);
  return (
    majorVersion > supportedMajorVersion ||
    (majorVersion === supportedMajorVersion && minorVersion > supportedMinorVersion) ||
    (majorVersion === supportedMajorVersion &&
      minorVersion === supportedMinorVersion &&
      patchVersion >= supportedPatchVersion)
  );
};
