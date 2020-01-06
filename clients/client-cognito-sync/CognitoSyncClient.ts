import {
  BulkPublishRequest,
  BulkPublishResponse,
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeIdentityPoolUsageRequest,
  DescribeIdentityPoolUsageResponse,
  DescribeIdentityUsageRequest,
  DescribeIdentityUsageResponse,
  GetBulkPublishDetailsRequest,
  GetBulkPublishDetailsResponse,
  GetCognitoEventsRequest,
  GetCognitoEventsResponse,
  GetIdentityPoolConfigurationRequest,
  GetIdentityPoolConfigurationResponse,
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListIdentityPoolUsageRequest,
  ListIdentityPoolUsageResponse,
  ListRecordsRequest,
  ListRecordsResponse,
  RegisterDeviceRequest,
  RegisterDeviceResponse,
  SetCognitoEventsRequest,
  SetIdentityPoolConfigurationRequest,
  SetIdentityPoolConfigurationResponse,
  SubscribeToDatasetRequest,
  SubscribeToDatasetResponse,
  UnsubscribeFromDatasetRequest,
  UnsubscribeFromDatasetResponse,
  UpdateRecordsRequest,
  UpdateRecordsResponse
} from "./models/index";
import { ClientDefaultValues as __ClientDefaultValues } from "./runtimeConfig";
import {
  EndpointsInputConfig,
  EndpointsResolvedConfig,
  RegionInputConfig,
  RegionResolvedConfig,
  resolveEndpointsConfig,
  resolveRegionConfig
} from "@aws-sdk/config-resolver";
import { getContentLengthPlugin } from "@aws-sdk/middleware-content-length";
import {
  HostHeaderInputConfig,
  HostHeaderResolvedConfig,
  getHostHeaderPlugin,
  resolveHostHeaderConfig
} from "@aws-sdk/middleware-host-header";
import {
  RetryInputConfig,
  RetryResolvedConfig,
  getRetryPlugin,
  resolveRetryConfig
} from "@aws-sdk/middleware-retry";
import {
  AwsAuthInputConfig,
  AwsAuthResolvedConfig,
  getAwsAuthPlugin,
  resolveAwsAuthConfig
} from "@aws-sdk/middleware-signing";
import {
  UserAgentInputConfig,
  UserAgentResolvedConfig,
  getUserAgentPlugin,
  resolveUserAgentConfig
} from "@aws-sdk/middleware-user-agent";
import { HttpHandler as __HttpHandler } from "@aws-sdk/protocol-http";
import {
  Client as __Client,
  SmithyConfiguration as __SmithyConfiguration,
  SmithyResolvedConfiguration as __SmithyResolvedConfiguration
} from "@aws-sdk/smithy-client";
import {
  RegionInfoProvider,
  Credentials as __Credentials,
  Decoder as __Decoder,
  Encoder as __Encoder,
  HashConstructor as __HashConstructor,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  Provider as __Provider,
  StreamCollector as __StreamCollector,
  UrlParser as __UrlParser
} from "@aws-sdk/types";

export type ServiceInputTypes =
  | BulkPublishRequest
  | DeleteDatasetRequest
  | DescribeDatasetRequest
  | DescribeIdentityPoolUsageRequest
  | DescribeIdentityUsageRequest
  | GetBulkPublishDetailsRequest
  | GetCognitoEventsRequest
  | GetIdentityPoolConfigurationRequest
  | ListDatasetsRequest
  | ListIdentityPoolUsageRequest
  | ListRecordsRequest
  | RegisterDeviceRequest
  | SetCognitoEventsRequest
  | SetIdentityPoolConfigurationRequest
  | SubscribeToDatasetRequest
  | UnsubscribeFromDatasetRequest
  | UpdateRecordsRequest;

export type ServiceOutputTypes =
  | __MetadataBearer
  | BulkPublishResponse
  | DeleteDatasetResponse
  | DescribeDatasetResponse
  | DescribeIdentityPoolUsageResponse
  | DescribeIdentityUsageResponse
  | GetBulkPublishDetailsResponse
  | GetCognitoEventsResponse
  | GetIdentityPoolConfigurationResponse
  | ListDatasetsResponse
  | ListIdentityPoolUsageResponse
  | ListRecordsResponse
  | RegisterDeviceResponse
  | SetIdentityPoolConfigurationResponse
  | SubscribeToDatasetResponse
  | UnsubscribeFromDatasetResponse
  | UpdateRecordsResponse;

export interface ClientDefaults
  extends Partial<__SmithyResolvedConfiguration<__HttpHandlerOptions>> {
  /**
   * The HTTP handler to use. Fetch in browser and Https in Nodejs.
   */
  requestHandler?: __HttpHandler;

  /**
   * A constructor for a class implementing the @aws-sdk/types.Hash interface
   * that computes the SHA-256 HMAC or checksum of a string or binary buffer.
   */
  sha256?: __HashConstructor;

  /**
   * The function that will be used to convert strings into HTTP endpoints.
   */
  urlParser?: __UrlParser;

  /**
   * A function that can calculate the length of a request body.
   */
  bodyLengthChecker?: (body: any) => number | undefined;

  /**
   * A function that converts a stream into an array of bytes.
   */
  streamCollector?: __StreamCollector;

  /**
   * The function that will be used to convert a base64-encoded string to a byte array
   */
  base64Decoder?: __Decoder;

  /**
   * The function that will be used to convert binary data to a base64-encoded string
   */
  base64Encoder?: __Encoder;

  /**
   * The function that will be used to convert a UTF8-encoded string to a byte array
   */
  utf8Decoder?: __Decoder;

  /**
   * The function that will be used to convert binary data to a UTF-8 encoded string
   */
  utf8Encoder?: __Encoder;

  /**
   * The string that will be used to populate default value in 'User-Agent' header
   */
  defaultUserAgent?: string;

  /**
   * The runtime environment
   */
  runtime?: string;

  /**
   * The service name with which to sign requests.
   */
  signingName?: string;

  /**
   * Default credentials provider; Not available in browser runtime
   */
  credentialDefaultProvider?: (input: any) => __Provider<__Credentials>;

  /**
   * Provider function that return promise of a region string
   */
  regionDefaultProvider?: (input: any) => __Provider<string>;

  /**
   * Fetch related hostname, signing name or signing region with given region.
   */
  regionInfoProvider?: RegionInfoProvider;
}

export type CognitoSyncClientConfig = Partial<
  __SmithyConfiguration<__HttpHandlerOptions>
> &
  ClientDefaults &
  RegionInputConfig &
  EndpointsInputConfig &
  AwsAuthInputConfig &
  RetryInputConfig &
  UserAgentInputConfig &
  HostHeaderInputConfig;

export type CognitoSyncClientResolvedConfig = __SmithyResolvedConfiguration<
  __HttpHandlerOptions
> &
  Required<ClientDefaults> &
  RegionResolvedConfig &
  EndpointsResolvedConfig &
  AwsAuthResolvedConfig &
  RetryResolvedConfig &
  UserAgentResolvedConfig &
  HostHeaderResolvedConfig;

/**
 *
 *          <fullname>Amazon Cognito Sync</fullname>
 *          <p>Amazon Cognito Sync provides an AWS service and client library that enable cross-device syncing of application-related user data. High-level client libraries are available for both iOS and Android. You can use these libraries to persist data locally so that it's available even if the device is offline. Developer credentials don't need to be stored on the mobile device to access the service. You can use Amazon Cognito to obtain a normalized user ID and credentials. User data is persisted in a dataset that can store up to 1 MB of key-value pairs, and you can have up to 20 datasets per user identity.</p>
 *          <p>With Amazon Cognito Sync, the data stored for each identity is accessible only to
 *          credentials assigned to that identity. In order to use the Cognito Sync service, you need
 *          to make API calls using credentials retrieved with <a href="https://docs.aws.amazon.com/cognitoidentity/latest/APIReference/Welcome.html">Amazon Cognito Identity service</a>.</p>
 *          <p>If you want to use Cognito Sync in an Android or iOS application, you will probably want to
 *          make API calls via the AWS Mobile SDK. To learn more, see the <a href="https://docs.aws.amazon.com/mobile/sdkforandroid/developerguide/cognito-sync.html">Developer Guide for Android</a> and the <a href="https://docs.aws.amazon.com/mobile/sdkforios/developerguide/cognito-sync.html">Developer Guide for iOS</a>.</p>
 *
 */
export class CognitoSyncClient extends __Client<
  __HttpHandlerOptions,
  ServiceInputTypes,
  ServiceOutputTypes,
  CognitoSyncClientResolvedConfig
> {
  readonly config: CognitoSyncClientResolvedConfig;

  constructor(configuration: CognitoSyncClientConfig) {
    let _config_0 = {
      ...__ClientDefaultValues,
      ...configuration
    };
    let _config_1 = resolveRegionConfig(_config_0);
    let _config_2 = resolveEndpointsConfig(_config_1);
    let _config_3 = resolveAwsAuthConfig(_config_2);
    let _config_4 = resolveRetryConfig(_config_3);
    let _config_5 = resolveUserAgentConfig(_config_4);
    let _config_6 = resolveHostHeaderConfig(_config_5);
    super(_config_6);
    this.config = _config_6;
    this.middlewareStack.use(getAwsAuthPlugin(this.config));
    this.middlewareStack.use(getRetryPlugin(this.config));
    this.middlewareStack.use(getUserAgentPlugin(this.config));
    this.middlewareStack.use(getContentLengthPlugin(this.config));
    this.middlewareStack.use(getHostHeaderPlugin(this.config));
  }

  destroy(): void {}
}
