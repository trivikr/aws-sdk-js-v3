import {
  AssociateServiceQuotaTemplateRequest,
  AssociateServiceQuotaTemplateResponse,
  DeleteServiceQuotaIncreaseRequestFromTemplateRequest,
  DeleteServiceQuotaIncreaseRequestFromTemplateResponse,
  DisassociateServiceQuotaTemplateRequest,
  DisassociateServiceQuotaTemplateResponse,
  GetAWSDefaultServiceQuotaRequest,
  GetAWSDefaultServiceQuotaResponse,
  GetAssociationForServiceQuotaTemplateRequest,
  GetAssociationForServiceQuotaTemplateResponse,
  GetRequestedServiceQuotaChangeRequest,
  GetRequestedServiceQuotaChangeResponse,
  GetServiceQuotaIncreaseRequestFromTemplateRequest,
  GetServiceQuotaIncreaseRequestFromTemplateResponse,
  GetServiceQuotaRequest,
  GetServiceQuotaResponse,
  ListAWSDefaultServiceQuotasRequest,
  ListAWSDefaultServiceQuotasResponse,
  ListRequestedServiceQuotaChangeHistoryByQuotaRequest,
  ListRequestedServiceQuotaChangeHistoryByQuotaResponse,
  ListRequestedServiceQuotaChangeHistoryRequest,
  ListRequestedServiceQuotaChangeHistoryResponse,
  ListServiceQuotaIncreaseRequestsInTemplateRequest,
  ListServiceQuotaIncreaseRequestsInTemplateResponse,
  ListServiceQuotasRequest,
  ListServiceQuotasResponse,
  ListServicesRequest,
  ListServicesResponse,
  PutServiceQuotaIncreaseRequestIntoTemplateRequest,
  PutServiceQuotaIncreaseRequestIntoTemplateResponse,
  RequestServiceQuotaIncreaseRequest,
  RequestServiceQuotaIncreaseResponse
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
  Provider as __Provider,
  StreamCollector as __StreamCollector,
  UrlParser as __UrlParser
} from "@aws-sdk/types";

export type ServiceInputTypes =
  | AssociateServiceQuotaTemplateRequest
  | DeleteServiceQuotaIncreaseRequestFromTemplateRequest
  | DisassociateServiceQuotaTemplateRequest
  | GetAWSDefaultServiceQuotaRequest
  | GetAssociationForServiceQuotaTemplateRequest
  | GetRequestedServiceQuotaChangeRequest
  | GetServiceQuotaIncreaseRequestFromTemplateRequest
  | GetServiceQuotaRequest
  | ListAWSDefaultServiceQuotasRequest
  | ListRequestedServiceQuotaChangeHistoryByQuotaRequest
  | ListRequestedServiceQuotaChangeHistoryRequest
  | ListServiceQuotaIncreaseRequestsInTemplateRequest
  | ListServiceQuotasRequest
  | ListServicesRequest
  | PutServiceQuotaIncreaseRequestIntoTemplateRequest
  | RequestServiceQuotaIncreaseRequest;

export type ServiceOutputTypes =
  | AssociateServiceQuotaTemplateResponse
  | DeleteServiceQuotaIncreaseRequestFromTemplateResponse
  | DisassociateServiceQuotaTemplateResponse
  | GetAWSDefaultServiceQuotaResponse
  | GetAssociationForServiceQuotaTemplateResponse
  | GetRequestedServiceQuotaChangeResponse
  | GetServiceQuotaIncreaseRequestFromTemplateResponse
  | GetServiceQuotaResponse
  | ListAWSDefaultServiceQuotasResponse
  | ListRequestedServiceQuotaChangeHistoryByQuotaResponse
  | ListRequestedServiceQuotaChangeHistoryResponse
  | ListServiceQuotaIncreaseRequestsInTemplateResponse
  | ListServiceQuotasResponse
  | ListServicesResponse
  | PutServiceQuotaIncreaseRequestIntoTemplateResponse
  | RequestServiceQuotaIncreaseResponse;

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

export type ServiceQuotasClientConfig = Partial<
  __SmithyConfiguration<__HttpHandlerOptions>
> &
  ClientDefaults &
  RegionInputConfig &
  EndpointsInputConfig &
  AwsAuthInputConfig &
  RetryInputConfig &
  UserAgentInputConfig &
  HostHeaderInputConfig;

export type ServiceQuotasClientResolvedConfig = __SmithyResolvedConfiguration<
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
 *          <p> Service Quotas is a web service that you can use to manage many of your AWS service
 *       quotas. Quotas, also referred to as limits, are the maximum values for a resource, item, or
 *       operation. This guide provide descriptions of the Service Quotas actions that you can call
 *       from an API. For the Service Quotas user guide, which explains how to use Service Quotas from
 *       the console, see <a href="https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html">What is Service Quotas</a>. </p>
 *
 *          <note>
 *             <p>AWS provides SDKs that consist of libraries and sample code for programming languages
 *         and platforms (Java, Ruby, .NET, iOS, Android, etc...,). The SDKs provide a convenient way
 *         to create programmatic access to Service Quotas and AWS. For information about the AWS SDKs,
 *         including how to download and install them, see the <a href="https://docs.aws.amazon.com/aws.amazon.com/tools">Tools for Amazon Web Services</a> page.</p>
 *          </note>
 *
 */
export class ServiceQuotasClient extends __Client<
  __HttpHandlerOptions,
  ServiceInputTypes,
  ServiceOutputTypes,
  ServiceQuotasClientResolvedConfig
> {
  readonly config: ServiceQuotasClientResolvedConfig;

  constructor(configuration: ServiceQuotasClientConfig) {
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
