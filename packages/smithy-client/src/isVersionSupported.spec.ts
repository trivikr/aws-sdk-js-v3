import { isVersionSupported } from "./isVersionSupported";

describe(isVersionSupported.name, () => {
  describe.each(["12.0.0", "12.1.0", "12.1.1"])("version: %s", (supportedVersion) => {
    describe(`returns false for Node.js <${supportedVersion}`, () => {
      const getPreviousMajorVersion = (major: number) => (major === 0 ? 0 : major - 1);

      const getPreviousMinorVersion = ([major, minor]: [number, number]) =>
        minor === 0 ? [getPreviousMajorVersion(major), 9] : [major, minor - 1];

      const getPreviousPatchVersion = ([major, minor, patch]: [number, number, number]) =>
        patch === 0 ? [...getPreviousMinorVersion([major, minor]), 9] : [major, minor, patch - 1];

      const [major, minor, patch] = supportedVersion.split(".").map(Number);
      it.each(
        [
          getPreviousPatchVersion([major, minor, patch]),
          [...getPreviousMinorVersion([major, minor]), 0],
          [getPreviousMajorVersion(major), 0, 0],
        ].map((arr) => `v${arr.join(".")}`)
      )(`%s`, (version) => {
        expect(isVersionSupported(version, supportedVersion)).toEqual(false);
        expect(isVersionSupported(version, `v${supportedVersion}`)).toEqual(false);
      });
    });

    describe(`returns true for Node.js >=${supportedVersion}`, () => {
      const [major, minor, patch] = supportedVersion.split(".").map(Number);
      it.each(
        [
          [major, minor, patch],
          [major, minor, patch + 1],
          [major, minor + 1, 0],
          [major + 1, 0, 0],
        ].map((arr) => `v${arr.join(".")}`)
      )(`%s`, async (version) => {
        expect(isVersionSupported(version, supportedVersion)).toEqual(true);
        expect(isVersionSupported(version, `v${supportedVersion}`)).toEqual(true);
      });
    });
  });

  describe.each(["11", "12", "13"])("version: %s", (supportedVersion) => {
    describe(`returns false for Node.js <${supportedVersion}`, () => {
      it.each([(Number(supportedVersion) - 1).toString()])(`%s`, (version) => {
        expect(isVersionSupported(version, supportedVersion)).toEqual(false);
        expect(isVersionSupported(version, `v${supportedVersion}`)).toEqual(false);
      });
    });

    describe(`returns true for Node.js >=${supportedVersion}`, () => {
      it.each([supportedVersion, (Number(supportedVersion) + 1).toString()])(`%s`, (version) => {
        expect(isVersionSupported(version, supportedVersion)).toEqual(true);
        expect(isVersionSupported(version, `v${supportedVersion}`)).toEqual(true);
      });
    });
  });
});
