// smithy-typescript generated code
import { AwsSdkSigV4ASigner, AwsSdkSigV4Signer } from "@aws-sdk/core";
import { SignatureV4MultiRegion } from "@aws-sdk/signature-v4-multi-region";
import { NoOpLogger } from "@smithy/smithy-client";
import { IdentityProviderConfig } from "@smithy/types";
import { parseUrl } from "@smithy/url-parser";
import { fromBase64, toBase64 } from "@smithy/util-base64";
import { fromUtf8, toUtf8 } from "@smithy/util-utf8";

import { defaultEventBridgeHttpAuthSchemeProvider } from "./auth/httpAuthSchemeProvider";
import { defaultEndpointResolver } from "./endpoint/endpointResolver";
import { EventBridgeClientConfig } from "./EventBridgeClient";

/**
 * @internal
 */
export const getRuntimeConfig = (config: EventBridgeClientConfig) => {
  return {
    apiVersion: "2015-10-07",
    base64Decoder: config?.base64Decoder ?? fromBase64,
    base64Encoder: config?.base64Encoder ?? toBase64,
    disableHostPrefix: config?.disableHostPrefix ?? false,
    endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
    extensions: config?.extensions ?? [],
    httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultEventBridgeHttpAuthSchemeProvider,
    httpAuthSchemes: config?.httpAuthSchemes ?? [
      {
        schemeId: "aws.auth#sigv4",
        identityProvider: (ipc: IdentityProviderConfig) => ipc.getIdentityProvider("aws.auth#sigv4"),
        signer: new AwsSdkSigV4Signer(),
      },
      {
        schemeId: "aws.auth#sigv4a",
        identityProvider: (ipc: IdentityProviderConfig) => ipc.getIdentityProvider("aws.auth#sigv4a"),
        signer: new AwsSdkSigV4ASigner(),
      },
    ],
    logger: config?.logger ?? new NoOpLogger(),
    serviceId: config?.serviceId ?? "EventBridge",
    signerConstructor: config?.signerConstructor ?? SignatureV4MultiRegion,
    urlParser: config?.urlParser ?? parseUrl,
    utf8Decoder: config?.utf8Decoder ?? fromUtf8,
    utf8Encoder: config?.utf8Encoder ?? toUtf8,
  };
};
