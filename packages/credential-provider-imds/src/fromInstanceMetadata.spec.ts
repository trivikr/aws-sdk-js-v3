import { fromInstanceMetadata } from "./fromInstanceMetadata";
import { httpRequest } from "./remoteProvider/httpRequest";
import {
  fromImdsCredentials,
  isImdsCredentials
} from "./remoteProvider/ImdsCredentials";
import { providerConfigFromInit } from "./remoteProvider/RemoteProviderInit";
import { retry } from "./remoteProvider/retry";
import { ProviderError } from "@aws-sdk/property-provider";

jest.mock("./remoteProvider/httpRequest");
jest.mock("./remoteProvider/ImdsCredentials");
jest.mock("./remoteProvider/retry");
jest.mock("./remoteProvider/RemoteProviderInit");

describe("fromInstanceMetadata", () => {
  const host = "169.254.169.254";
  const mockTimeout = 1000;
  const mockMaxRetries = 3;
  const mockToken = "fooToken";
  const mockProfile = "fooProfile";

  const mockTokenRequestOptions = {
    host,
    path: "/latest/api/token",
    method: "PUT",
    headers: {
      "x-aws-ec2-metadata-token-ttl-seconds": "21600"
    },
    timeout: mockTimeout
  };

  const mockProfileRequestOptions = {
    host,
    path: "/latest/meta-data/iam/security-credentials/",
    timeout: mockTimeout,
    headers: {
      "x-aws-ec2-metadata-token": mockToken
    }
  };

  const mockImdsCreds = Object.freeze({
    AccessKeyId: "foo",
    SecretAccessKey: "bar",
    Token: "baz",
    Expiration: new Date().toISOString()
  });

  const mockCreds = Object.freeze({
    accessKeyId: mockImdsCreds.AccessKeyId,
    secretAccessKey: mockImdsCreds.SecretAccessKey,
    sessionToken: mockImdsCreds.Token,
    expiration: new Date(mockImdsCreds.Expiration)
  });

  beforeEach(() => {
    ((isImdsCredentials as unknown) as jest.Mock).mockReturnValue(true);
    (providerConfigFromInit as jest.Mock).mockReturnValue({
      timeout: mockTimeout,
      maxRetries: mockMaxRetries
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("gets token and profile name to fetch credentials", async () => {
    (httpRequest as jest.Mock)
      .mockResolvedValueOnce(mockToken)
      .mockResolvedValueOnce(mockProfile)
      .mockResolvedValueOnce(JSON.stringify(mockImdsCreds));

    (retry as jest.Mock).mockImplementation((fn: any) => fn());
    (fromImdsCredentials as jest.Mock).mockReturnValue(mockCreds);

    await expect(fromInstanceMetadata()()).resolves.toEqual(mockCreds);
    expect(httpRequest).toHaveBeenCalledTimes(3);
    expect(httpRequest).toHaveBeenNthCalledWith(1, mockTokenRequestOptions);
    expect(httpRequest).toHaveBeenNthCalledWith(2, mockProfileRequestOptions);
    expect(httpRequest).toHaveBeenNthCalledWith(3, {
      ...mockProfileRequestOptions,
      path: `${mockProfileRequestOptions.path}${mockProfile}`
    });
  });

  it("trims profile returned name from IMDS", async () => {
    (httpRequest as jest.Mock)
      .mockResolvedValueOnce(mockToken)
      .mockResolvedValueOnce("   " + mockProfile + "  ")
      .mockResolvedValueOnce(JSON.stringify(mockImdsCreds));

    (retry as jest.Mock).mockImplementation((fn: any) => fn());
    (fromImdsCredentials as jest.Mock).mockReturnValue(mockCreds);

    await expect(fromInstanceMetadata()()).resolves.toEqual(mockCreds);
    expect(httpRequest).toHaveBeenNthCalledWith(3, {
      ...mockProfileRequestOptions,
      path: `${mockProfileRequestOptions.path}${mockProfile}`
    });
  });

  it("passes {} to providerConfigFromInit if init not defined", async () => {
    (retry as jest.Mock)
      .mockResolvedValueOnce(mockProfile)
      .mockResolvedValueOnce(mockCreds);

    await expect(fromInstanceMetadata()()).resolves.toEqual(mockCreds);
    expect(providerConfigFromInit).toHaveBeenCalledTimes(1);
    expect(providerConfigFromInit).toHaveBeenCalledWith({});
  });

  it("passes init to providerConfigFromInit", async () => {
    (retry as jest.Mock)
      .mockResolvedValueOnce(mockProfile)
      .mockResolvedValueOnce(mockCreds);

    const init = { maxRetries: 5, timeout: 1213 };
    await expect(fromInstanceMetadata(init)()).resolves.toEqual(mockCreds);
    expect(providerConfigFromInit).toHaveBeenCalledTimes(1);
    expect(providerConfigFromInit).toHaveBeenCalledWith(init);
  });

  it("passes maxRetries returned from providerConfigFromInit to retry", async () => {
    (retry as jest.Mock)
      .mockResolvedValueOnce(mockProfile)
      .mockResolvedValueOnce(mockCreds);

    await expect(fromInstanceMetadata()()).resolves.toEqual(mockCreds);
    expect(retry).toHaveBeenCalledTimes(2);
    expect((retry as jest.Mock).mock.calls[0][1]).toBe(mockMaxRetries);
    expect((retry as jest.Mock).mock.calls[1][1]).toBe(mockMaxRetries);
  });

  it("throws ProviderError if credentials returned are incorrect", async () => {
    (httpRequest as jest.Mock)
      .mockResolvedValueOnce(mockToken)
      .mockResolvedValueOnce(mockProfile)
      .mockResolvedValueOnce(JSON.stringify(mockImdsCreds));

    (retry as jest.Mock).mockImplementation((fn: any) => fn());
    ((isImdsCredentials as unknown) as jest.Mock).mockReturnValueOnce(false);

    await expect(fromInstanceMetadata()()).rejects.toEqual(
      new ProviderError(
        "Invalid response received from instance metadata service."
      )
    );
    expect(retry).toHaveBeenCalledTimes(2);
    expect(httpRequest).toHaveBeenCalledTimes(3);
    expect(isImdsCredentials).toHaveBeenCalledTimes(1);
    expect(isImdsCredentials).toHaveBeenCalledWith(mockImdsCreds);
    expect(fromImdsCredentials).not.toHaveBeenCalled();
  });

  it("throws Error if httpRequest for profile fails", async () => {
    const mockError = new Error("profile not found");
    (httpRequest as jest.Mock)
      .mockResolvedValueOnce(mockToken)
      .mockRejectedValueOnce(mockError);
    (retry as jest.Mock).mockImplementation((fn: any) => fn());

    await expect(fromInstanceMetadata()()).rejects.toEqual(mockError);
    expect(retry).toHaveBeenCalledTimes(1);
    expect(httpRequest).toHaveBeenCalledTimes(2);
  });

  it("throws Error if httpRequest for credentials fails", async () => {
    const mockError = new Error("creds not found");
    (httpRequest as jest.Mock)
      .mockResolvedValueOnce(mockToken)
      .mockResolvedValueOnce(mockProfile)
      .mockRejectedValueOnce(mockError);
    (retry as jest.Mock).mockImplementation((fn: any) => fn());

    await expect(fromInstanceMetadata()()).rejects.toEqual(mockError);
    expect(retry).toHaveBeenCalledTimes(2);
    expect(httpRequest).toHaveBeenCalledTimes(3);
    expect(fromImdsCredentials).not.toHaveBeenCalled();
  });

  it("throws SyntaxError if httpRequest returns unparseable creds", async () => {
    (httpRequest as jest.Mock)
      .mockResolvedValueOnce(mockToken)
      .mockResolvedValueOnce(mockProfile)
      .mockResolvedValueOnce(".");
    (retry as jest.Mock).mockImplementation((fn: any) => fn());

    await expect(fromInstanceMetadata()()).rejects.toEqual(
      new SyntaxError("Unexpected token . in JSON at position 0")
    );
    expect(retry).toHaveBeenCalledTimes(2);
    expect(httpRequest).toHaveBeenCalledTimes(3);
    expect(fromImdsCredentials).not.toHaveBeenCalled();
  });
});
