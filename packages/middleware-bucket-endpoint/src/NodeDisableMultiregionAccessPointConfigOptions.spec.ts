import { booleanSelector, SelectorType } from "@smithy/util-config-provider";
import { afterEach, describe, expect, test as it, vi } from "vitest";

import {
  NODE_DISABLE_MULTIREGION_ACCESS_POINT_CONFIG_OPTIONS,
  NODE_DISABLE_MULTIREGION_ACCESS_POINT_ENV_NAME,
  NODE_DISABLE_MULTIREGION_ACCESS_POINT_INI_NAME,
} from "./NodeDisableMultiregionAccessPointConfigOptions";

vi.mock("@smithy/util-config-provider");

describe("NODE_USE_ARN_REGION_CONFIG_OPTIONS", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const test = (func: Function, obj: Record<string, string>, key: string, type: SelectorType) => {
    it.each([true, false, undefined])("returns %s", (output) => {
      vi.mocked(booleanSelector).mockReturnValueOnce(output);
      expect(func(obj)).toEqual(output);
      expect(booleanSelector).toBeCalledWith(obj, key, type);
    });

    it("throws error", () => {
      const mockError = new Error("error");
      vi.mocked(booleanSelector).mockImplementationOnce(() => {
        throw mockError;
      });
      expect(() => {
        func(obj);
      }).toThrow(mockError);
    });
  };

  describe("calls booleanSelector for environmentVariableSelector", () => {
    const env: { [NODE_DISABLE_MULTIREGION_ACCESS_POINT_ENV_NAME]: any } = {} as any;
    const { environmentVariableSelector } = NODE_DISABLE_MULTIREGION_ACCESS_POINT_CONFIG_OPTIONS;
    test(environmentVariableSelector, env, NODE_DISABLE_MULTIREGION_ACCESS_POINT_ENV_NAME, SelectorType.ENV);
  });

  describe("calls booleanSelector for configFileSelector", () => {
    const profileContent: { [NODE_DISABLE_MULTIREGION_ACCESS_POINT_INI_NAME]: any } = {} as any;
    const { configFileSelector } = NODE_DISABLE_MULTIREGION_ACCESS_POINT_CONFIG_OPTIONS;
    test(configFileSelector, profileContent, NODE_DISABLE_MULTIREGION_ACCESS_POINT_INI_NAME, SelectorType.CONFIG);
  });

  it("returns false for default", () => {
    const { default: defaultValue } = NODE_DISABLE_MULTIREGION_ACCESS_POINT_CONFIG_OPTIONS;
    expect(defaultValue).toEqual(false);
  });
});
