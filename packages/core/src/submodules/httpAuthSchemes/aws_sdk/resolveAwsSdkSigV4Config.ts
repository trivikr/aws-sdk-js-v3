import { setCredentialFeature } from "@aws-sdk/core/client";
import type { AttributedAwsCredentialIdentity, MergeFunctions } from "@aws-sdk/types";
import {
  doesIdentityRequireRefresh,
  isIdentityExpired,
  memoizeIdentityProvider,
  normalizeProvider,
} from "@smithy/core";
import { SignatureV4, SignatureV4CryptoInit, SignatureV4Init } from "@smithy/signature-v4";
import {
  AuthScheme,
  AwsCredentialIdentity,
  AwsCredentialIdentityProvider,
  ChecksumConstructor,
  HashConstructor,
  MemoizedProvider,
  Provider,
  RegionInfo,
  RegionInfoProvider,
  RequestSigner,
} from "@smithy/types";

/**
 * @public
 */
export interface AwsSdkSigV4AuthInputConfig {
  /**
   * The credentials used to sign requests.
   */
  credentials?: AwsCredentialIdentity | AwsCredentialIdentityProvider;

  /**
   * The signer to use when signing requests.
   */
  signer?: RequestSigner | ((authScheme?: AuthScheme) => Promise<RequestSigner>);

  /**
   * Whether to escape request path when signing the request.
   */
  signingEscapePath?: boolean;

  /**
   * An offset value in milliseconds to apply to all signing times.
   */
  systemClockOffset?: number;

  /**
   * The region where you want to sign your request against. This
   * can be different to the region in the endpoint.
   */
  signingRegion?: string;

  /**
   * The injectable SigV4-compatible signer class constructor. If not supplied,
   * regular SignatureV4 constructor will be used.
   *
   * @internal
   */
  signerConstructor?: new (options: SignatureV4Init & SignatureV4CryptoInit) => RequestSigner;
}

/**
 * @internal
 */
export interface AwsSdkSigV4PreviouslyResolved {
  credentialDefaultProvider?: (input: any) => MemoizedProvider<AwsCredentialIdentity>;
  region: string | Provider<string>;
  sha256: ChecksumConstructor | HashConstructor;
  signingName?: string;
  regionInfoProvider?: RegionInfoProvider;
  defaultSigningName?: string;
  serviceId: string;
  useFipsEndpoint: Provider<boolean>;
  useDualstackEndpoint: Provider<boolean>;
}

/**
 * @internal
 */
export interface AwsSdkSigV4AuthResolvedConfig {
  /**
   * Resolved value for input config {@link AwsSdkSigV4AuthInputConfig.credentials}
   * This provider MAY memoize the loaded credentials for certain period.
   */
  credentials: MergeFunctions<AwsCredentialIdentityProvider, MemoizedProvider<AwsCredentialIdentity>>;
  /**
   * Resolved value for input config {@link AwsSdkSigV4AuthInputConfig.signer}
   */
  signer: (authScheme?: AuthScheme) => Promise<RequestSigner>;
  /**
   * Resolved value for input config {@link AwsSdkSigV4AuthInputConfig.signingEscapePath}
   */
  signingEscapePath: boolean;
  /**
   * Resolved value for input config {@link AwsSdkSigV4AuthInputConfig.systemClockOffset}
   */
  systemClockOffset: number;
}

/**
 * @internal
 */
export const resolveAwsSdkSigV4Config = <T>(
  config: T & AwsSdkSigV4AuthInputConfig & AwsSdkSigV4PreviouslyResolved
): T & AwsSdkSigV4AuthResolvedConfig => {
  let isUserSupplied = false;
  // Normalize credentials
  let credentialsProvider: AwsCredentialIdentityProvider | undefined;
  if (config.credentials) {
    isUserSupplied = true;
    credentialsProvider = memoizeIdentityProvider(config.credentials, isIdentityExpired, doesIdentityRequireRefresh);
  }
  if (!credentialsProvider) {
    // credentialDefaultProvider should always be populated, but in case
    // it isn't, set a default identity provider that throws an error
    if (config.credentialDefaultProvider) {
      credentialsProvider = normalizeProvider(
        config.credentialDefaultProvider(
          Object.assign({}, config as any, {
            parentClientConfig: config,
          })
        )
      );
    } else {
      credentialsProvider = async () => {
        throw new Error("`credentials` is missing");
      };
    }
  }

  const boundCredentialsProvider = async (options: Record<string, any> | undefined) =>
    credentialsProvider!({ ...options, callerClientConfig: config });

  // Populate sigv4 arguments
  const {
    // Default for signingEscapePath
    signingEscapePath = true,
    // Default for systemClockOffset
    systemClockOffset = config.systemClockOffset || 0,
    // No default for sha256 since it is platform dependent
    sha256,
  } = config;

  // Resolve signer
  let signer: (authScheme?: AuthScheme) => Promise<RequestSigner>;
  if (config.signer) {
    // if signer is supplied by user, normalize it to a function returning a promise for signer.
    signer = normalizeProvider(config.signer);
  } else if (config.regionInfoProvider) {
    // This branch is for endpoints V1.
    // construct a provider inferring signing from region.
    signer = () =>
      normalizeProvider(config.region)()
        .then(
          async (region) =>
            [
              (await config.regionInfoProvider!(region, {
                useFipsEndpoint: await config.useFipsEndpoint(),
                useDualstackEndpoint: await config.useDualstackEndpoint(),
              })) || {},
              region,
            ] as [RegionInfo, string]
        )
        .then(([regionInfo, region]) => {
          const { signingRegion, signingService } = regionInfo;
          // update client's singing region and signing service config if they are resolved.
          // signing region resolving order: user supplied signingRegion -> endpoints.json inferred region -> client region
          config.signingRegion = config.signingRegion || signingRegion || region;
          // signing name resolving order:
          // user supplied signingName -> endpoints.json inferred (credential scope -> model arnNamespace) -> model service id
          config.signingName = config.signingName || signingService || config.serviceId;

          const params: SignatureV4Init & SignatureV4CryptoInit = {
            ...config,
            credentials: boundCredentialsProvider,
            region: config.signingRegion,
            service: config.signingName,
            sha256,
            uriEscapePath: signingEscapePath,
          };
          const SignerCtor = config.signerConstructor || SignatureV4;
          return new SignerCtor(params);
        });
  } else {
    // This branch is for endpoints V2.
    // Handle endpoints v2 that resolved per-command
    // TODO: need total refactor for reference auth architecture.
    signer = async (authScheme?: AuthScheme) => {
      authScheme = Object.assign(
        {},
        {
          name: "sigv4",
          signingName: config.signingName || config.defaultSigningName!,
          signingRegion: await normalizeProvider(config.region)(),
          properties: {},
        },
        authScheme
      );

      const signingRegion = authScheme.signingRegion;
      const signingService = authScheme.signingName;
      // update client's singing region and signing service config if they are resolved.
      // signing region resolving order: user supplied signingRegion -> endpoints.json inferred region -> client region
      config.signingRegion = config.signingRegion || signingRegion;
      // signing name resolving order:
      // user supplied signingName -> endpoints.json inferred (credential scope -> model arnNamespace) -> model service id
      config.signingName = config.signingName || signingService || config.serviceId;

      const params: SignatureV4Init & SignatureV4CryptoInit = {
        ...config,
        credentials: boundCredentialsProvider,
        region: config.signingRegion,
        service: config.signingName,
        sha256,
        uriEscapePath: signingEscapePath,
      };

      const SignerCtor = config.signerConstructor || SignatureV4;
      return new SignerCtor(params);
    };
  }

  return Object.assign(config, {
    systemClockOffset,
    signingEscapePath,
    credentials: isUserSupplied
      ? async (options: Record<string, any> | undefined) =>
          boundCredentialsProvider!(options).then((creds: AttributedAwsCredentialIdentity) =>
            setCredentialFeature(creds, "CREDENTIALS_CODE", "e")
          )
      : boundCredentialsProvider!,
    signer,
  });
};

/**
 * @internal
 * @deprecated renamed to {@link AwsSdkSigV4AuthInputConfig}
 */
export interface AWSSDKSigV4AuthInputConfig extends AwsSdkSigV4AuthInputConfig {}

/**
 * @internal
 * @deprecated renamed to {@link AwsSdkSigV4PreviouslyResolved}
 */
export interface AWSSDKSigV4PreviouslyResolved extends AwsSdkSigV4PreviouslyResolved {}

/**
 * @internal
 * @deprecated renamed to {@link AwsSdkSigV4AuthResolvedConfig}
 */
export interface AWSSDKSigV4AuthResolvedConfig extends AwsSdkSigV4AuthResolvedConfig {}

/**
 * @internal
 * @deprecated renamed to {@link resolveAwsSdkSigV4Config}
 */
export const resolveAWSSDKSigV4Config = resolveAwsSdkSigV4Config;
