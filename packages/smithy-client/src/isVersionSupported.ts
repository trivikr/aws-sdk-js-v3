/**
 * Returns if the given version is supported.
 *
 * @param version The node version SDK is running on.
 * @param supportedVersion The minimum supported node version.
 */
export const isVersionSupported = (version: string, supportedVersion: string): boolean => {
  const [supportedMajorVersion = 0, supportedMinorVersion = 0, supportedPatchVersion = 0] = supportedVersion
    .replace(/^v/, "")
    .split(".")
    .map(Number);
  const [majorVersion = 0, minorVersion = 0, patchVersion = 0] = version
    .replace(/^v/, "")
    .replace(/x$/, "0")
    .split(".")
    .map(Number);
  // console.log({
  //   version,
  //   supportedVersion,
  //   supportedMajorVersion,
  //   supportedMinorVersion,
  //   supportedPatchVersion,
  //   majorVersion,
  //   minorVersion,
  //   patchVersion,
  // });
  return (
    majorVersion > supportedMajorVersion ||
    (majorVersion === supportedMajorVersion && minorVersion > supportedMinorVersion) ||
    (majorVersion === supportedMajorVersion &&
      minorVersion === supportedMinorVersion &&
      patchVersion >= supportedPatchVersion)
  );
};
