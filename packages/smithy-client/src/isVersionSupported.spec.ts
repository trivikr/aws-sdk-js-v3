import { isVersionSupported } from "./isVersionSupported";

describe(isVersionSupported.name, () => {
  describe.each(["v12.0.0", "v12.1.0", "v12.1.1"])("version: %s", (nodeVersion) => {
    describe(`returns true for version ${nodeVersion}`, () => {
      const getPreviousMajorVersion = (major: number) => (major === 0 ? 0 : major - 1);

      const getPreviousMinorVersion = ([major, minor]: [number, number]) =>
        minor === 0 ? [getPreviousMajorVersion(major), 9] : [major, minor - 1];

      const getPreviousPatchVersion = ([major, minor, patch]: [number, number, number]) =>
        patch === 0 ? [...getPreviousMinorVersion([major, minor]), 9] : [major, minor, patch - 1];

      const [major, minor, patch] = nodeVersion.replace(/^v/, "").split(".").map(Number);
      it.each([
        ...(minor > 0 && [getPreviousMajorVersion(major) + ".x"]),
        ...(patch > 0 &&
          [[...getPreviousMinorVersion([major, minor])], [getPreviousMajorVersion(major), 0]].map((arr) =>
            arr.join(".").concat(".x")
          )),
        ...[
          [major, minor, patch],
          getPreviousPatchVersion([major, minor, patch]),
          [...getPreviousMinorVersion([major, minor]), 0],
          [getPreviousMajorVersion(major), 0, 0],
        ].map((arr) => arr.join(".")),
      ])(`supported version: %s`, (supportedVersion) => {
        expect(isVersionSupported(nodeVersion, supportedVersion)).toEqual(true);
        expect(isVersionSupported(nodeVersion, `v${supportedVersion}`)).toEqual(true);
      });
    });

    describe(`returns false for version ${nodeVersion}`, () => {
      const [major, minor, patch] = nodeVersion.replace(/^v/, "").split(".").map(Number);
      it.each([
        ...(minor === 0 && [major, major + 1].map((version) => version.toString().concat(".x"))),
        ...(patch === 0 && [[major, minor].join(".").concat(".x")]),
        ...[
          [major, minor + 1],
          [major + 1, 0],
        ].map((arr) => arr.join(".").concat(".x")),
        ...[
          [major, minor, patch + 1],
          [major, minor + 1, 0],
          [major + 1, 0, 0],
        ].map((arr) => arr.join(".")),
      ])(`supported version: %s`, async (supportedVersion) => {
        expect(isVersionSupported(nodeVersion, supportedVersion)).toEqual(false);
        expect(isVersionSupported(nodeVersion, `v${supportedVersion}`)).toEqual(false);
      });
    });
  });
});
