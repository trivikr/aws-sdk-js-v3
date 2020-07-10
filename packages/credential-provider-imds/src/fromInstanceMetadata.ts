import { CredentialProvider } from "@aws-sdk/types";
import {
  RemoteProviderInit,
  providerConfigFromInit
} from "./remoteProvider/RemoteProviderInit";
import { httpRequest } from "./remoteProvider/httpRequest";
import {
  fromImdsCredentials,
  isImdsCredentials
} from "./remoteProvider/ImdsCredentials";
import { retry } from "./remoteProvider/retry";
import { ProviderError } from "@aws-sdk/property-provider";
import { RequestOptions } from "http";

const IMDS_IP = "169.254.169.254";
const IMDS_PATH = "/latest/meta-data/iam/security-credentials/";

/**
 * Creates a credential provider that will source credentials from the EC2
 * Instance Metadata Service
 */
export const fromInstanceMetadata = (
  init: RemoteProviderInit = {}
): CredentialProvider => {
  const { timeout, maxRetries } = providerConfigFromInit(init);
  return async () => {
    return getCredentials(maxRetries, { timeout });
  };
};

const getCredentials = async (maxRetries: number, options: RequestOptions) => {
  const profile = (
    await retry<string>(async () => getProfile(options), maxRetries)
  ).trim();

  return retry(
    async () => getCredentialsFromProfile(profile, options),
    maxRetries
  );
};

const getProfile = async (options: RequestOptions) =>
  (
    await httpRequest({ ...options, host: IMDS_IP, path: IMDS_PATH })
  ).toString();

const getCredentialsFromProfile = async (
  profile: string,
  options: RequestOptions
) => {
  const credsResponse = JSON.parse(
    (
      await httpRequest({
        ...options,
        host: IMDS_IP,
        path: IMDS_PATH + profile
      })
    ).toString()
  );

  if (!isImdsCredentials(credsResponse)) {
    throw new ProviderError(
      "Invalid response received from instance metadata service."
    );
  }

  return fromImdsCredentials(credsResponse);
};
