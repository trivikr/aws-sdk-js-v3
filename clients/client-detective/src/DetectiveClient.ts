// smithy-typescript generated code
import {
  getHostHeaderPlugin,
  HostHeaderInputConfig,
  HostHeaderResolvedConfig,
  resolveHostHeaderConfig,
} from "@aws-sdk/middleware-host-header";
import { getLoggerPlugin } from "@aws-sdk/middleware-logger";
import { getRecursionDetectionPlugin } from "@aws-sdk/middleware-recursion-detection";
import {
  getUserAgentPlugin,
  resolveUserAgentConfig,
  UserAgentInputConfig,
  UserAgentResolvedConfig,
} from "@aws-sdk/middleware-user-agent";
import { RegionInputConfig, RegionResolvedConfig, resolveRegionConfig } from "@smithy/config-resolver";
import {
  DefaultIdentityProviderConfig,
  getHttpAuthSchemeEndpointRuleSetPlugin,
  getHttpSigningPlugin,
} from "@smithy/core";
import { getContentLengthPlugin } from "@smithy/middleware-content-length";
import { EndpointInputConfig, EndpointResolvedConfig, resolveEndpointConfig } from "@smithy/middleware-endpoint";
import { getRetryPlugin, resolveRetryConfig, RetryInputConfig, RetryResolvedConfig } from "@smithy/middleware-retry";
import { HttpHandlerUserInput as __HttpHandlerUserInput } from "@smithy/protocol-http";
import {
  Client as __Client,
  DefaultsMode as __DefaultsMode,
  SmithyConfiguration as __SmithyConfiguration,
  SmithyResolvedConfiguration as __SmithyResolvedConfiguration,
} from "@smithy/smithy-client";
import {
  AwsCredentialIdentityProvider,
  BodyLengthCalculator as __BodyLengthCalculator,
  CheckOptionalClientConfig as __CheckOptionalClientConfig,
  ChecksumConstructor as __ChecksumConstructor,
  Decoder as __Decoder,
  Encoder as __Encoder,
  EndpointV2 as __EndpointV2,
  HashConstructor as __HashConstructor,
  HttpHandlerOptions as __HttpHandlerOptions,
  Logger as __Logger,
  Provider as __Provider,
  Provider,
  StreamCollector as __StreamCollector,
  UrlParser as __UrlParser,
  UserAgent as __UserAgent,
} from "@smithy/types";

import {
  defaultDetectiveHttpAuthSchemeParametersProvider,
  HttpAuthSchemeInputConfig,
  HttpAuthSchemeResolvedConfig,
  resolveHttpAuthSchemeConfig,
} from "./auth/httpAuthSchemeProvider";
import { AcceptInvitationCommandInput, AcceptInvitationCommandOutput } from "./commands/AcceptInvitationCommand";
import {
  BatchGetGraphMemberDatasourcesCommandInput,
  BatchGetGraphMemberDatasourcesCommandOutput,
} from "./commands/BatchGetGraphMemberDatasourcesCommand";
import {
  BatchGetMembershipDatasourcesCommandInput,
  BatchGetMembershipDatasourcesCommandOutput,
} from "./commands/BatchGetMembershipDatasourcesCommand";
import { CreateGraphCommandInput, CreateGraphCommandOutput } from "./commands/CreateGraphCommand";
import { CreateMembersCommandInput, CreateMembersCommandOutput } from "./commands/CreateMembersCommand";
import { DeleteGraphCommandInput, DeleteGraphCommandOutput } from "./commands/DeleteGraphCommand";
import { DeleteMembersCommandInput, DeleteMembersCommandOutput } from "./commands/DeleteMembersCommand";
import {
  DescribeOrganizationConfigurationCommandInput,
  DescribeOrganizationConfigurationCommandOutput,
} from "./commands/DescribeOrganizationConfigurationCommand";
import {
  DisableOrganizationAdminAccountCommandInput,
  DisableOrganizationAdminAccountCommandOutput,
} from "./commands/DisableOrganizationAdminAccountCommand";
import {
  DisassociateMembershipCommandInput,
  DisassociateMembershipCommandOutput,
} from "./commands/DisassociateMembershipCommand";
import {
  EnableOrganizationAdminAccountCommandInput,
  EnableOrganizationAdminAccountCommandOutput,
} from "./commands/EnableOrganizationAdminAccountCommand";
import { GetInvestigationCommandInput, GetInvestigationCommandOutput } from "./commands/GetInvestigationCommand";
import { GetMembersCommandInput, GetMembersCommandOutput } from "./commands/GetMembersCommand";
import {
  ListDatasourcePackagesCommandInput,
  ListDatasourcePackagesCommandOutput,
} from "./commands/ListDatasourcePackagesCommand";
import { ListGraphsCommandInput, ListGraphsCommandOutput } from "./commands/ListGraphsCommand";
import { ListIndicatorsCommandInput, ListIndicatorsCommandOutput } from "./commands/ListIndicatorsCommand";
import { ListInvestigationsCommandInput, ListInvestigationsCommandOutput } from "./commands/ListInvestigationsCommand";
import { ListInvitationsCommandInput, ListInvitationsCommandOutput } from "./commands/ListInvitationsCommand";
import { ListMembersCommandInput, ListMembersCommandOutput } from "./commands/ListMembersCommand";
import {
  ListOrganizationAdminAccountsCommandInput,
  ListOrganizationAdminAccountsCommandOutput,
} from "./commands/ListOrganizationAdminAccountsCommand";
import {
  ListTagsForResourceCommandInput,
  ListTagsForResourceCommandOutput,
} from "./commands/ListTagsForResourceCommand";
import { RejectInvitationCommandInput, RejectInvitationCommandOutput } from "./commands/RejectInvitationCommand";
import { StartInvestigationCommandInput, StartInvestigationCommandOutput } from "./commands/StartInvestigationCommand";
import {
  StartMonitoringMemberCommandInput,
  StartMonitoringMemberCommandOutput,
} from "./commands/StartMonitoringMemberCommand";
import { TagResourceCommandInput, TagResourceCommandOutput } from "./commands/TagResourceCommand";
import { UntagResourceCommandInput, UntagResourceCommandOutput } from "./commands/UntagResourceCommand";
import {
  UpdateDatasourcePackagesCommandInput,
  UpdateDatasourcePackagesCommandOutput,
} from "./commands/UpdateDatasourcePackagesCommand";
import {
  UpdateInvestigationStateCommandInput,
  UpdateInvestigationStateCommandOutput,
} from "./commands/UpdateInvestigationStateCommand";
import {
  UpdateOrganizationConfigurationCommandInput,
  UpdateOrganizationConfigurationCommandOutput,
} from "./commands/UpdateOrganizationConfigurationCommand";
import {
  ClientInputEndpointParameters,
  ClientResolvedEndpointParameters,
  EndpointParameters,
  resolveClientEndpointParameters,
} from "./endpoint/EndpointParameters";
import { getRuntimeConfig as __getRuntimeConfig } from "./runtimeConfig";
import { resolveRuntimeExtensions, RuntimeExtension, RuntimeExtensionsConfig } from "./runtimeExtensions";

export { __Client };

/**
 * @public
 */
export type ServiceInputTypes =
  | AcceptInvitationCommandInput
  | BatchGetGraphMemberDatasourcesCommandInput
  | BatchGetMembershipDatasourcesCommandInput
  | CreateGraphCommandInput
  | CreateMembersCommandInput
  | DeleteGraphCommandInput
  | DeleteMembersCommandInput
  | DescribeOrganizationConfigurationCommandInput
  | DisableOrganizationAdminAccountCommandInput
  | DisassociateMembershipCommandInput
  | EnableOrganizationAdminAccountCommandInput
  | GetInvestigationCommandInput
  | GetMembersCommandInput
  | ListDatasourcePackagesCommandInput
  | ListGraphsCommandInput
  | ListIndicatorsCommandInput
  | ListInvestigationsCommandInput
  | ListInvitationsCommandInput
  | ListMembersCommandInput
  | ListOrganizationAdminAccountsCommandInput
  | ListTagsForResourceCommandInput
  | RejectInvitationCommandInput
  | StartInvestigationCommandInput
  | StartMonitoringMemberCommandInput
  | TagResourceCommandInput
  | UntagResourceCommandInput
  | UpdateDatasourcePackagesCommandInput
  | UpdateInvestigationStateCommandInput
  | UpdateOrganizationConfigurationCommandInput;

/**
 * @public
 */
export type ServiceOutputTypes =
  | AcceptInvitationCommandOutput
  | BatchGetGraphMemberDatasourcesCommandOutput
  | BatchGetMembershipDatasourcesCommandOutput
  | CreateGraphCommandOutput
  | CreateMembersCommandOutput
  | DeleteGraphCommandOutput
  | DeleteMembersCommandOutput
  | DescribeOrganizationConfigurationCommandOutput
  | DisableOrganizationAdminAccountCommandOutput
  | DisassociateMembershipCommandOutput
  | EnableOrganizationAdminAccountCommandOutput
  | GetInvestigationCommandOutput
  | GetMembersCommandOutput
  | ListDatasourcePackagesCommandOutput
  | ListGraphsCommandOutput
  | ListIndicatorsCommandOutput
  | ListInvestigationsCommandOutput
  | ListInvitationsCommandOutput
  | ListMembersCommandOutput
  | ListOrganizationAdminAccountsCommandOutput
  | ListTagsForResourceCommandOutput
  | RejectInvitationCommandOutput
  | StartInvestigationCommandOutput
  | StartMonitoringMemberCommandOutput
  | TagResourceCommandOutput
  | UntagResourceCommandOutput
  | UpdateDatasourcePackagesCommandOutput
  | UpdateInvestigationStateCommandOutput
  | UpdateOrganizationConfigurationCommandOutput;

/**
 * @public
 */
export interface ClientDefaults extends Partial<__SmithyConfiguration<__HttpHandlerOptions>> {
  /**
   * The HTTP handler to use or its constructor options. Fetch in browser and Https in Nodejs.
   */
  requestHandler?: __HttpHandlerUserInput;

  /**
   * A constructor for a class implementing the {@link @smithy/types#ChecksumConstructor} interface
   * that computes the SHA-256 HMAC or checksum of a string or binary buffer.
   * @internal
   */
  sha256?: __ChecksumConstructor | __HashConstructor;

  /**
   * The function that will be used to convert strings into HTTP endpoints.
   * @internal
   */
  urlParser?: __UrlParser;

  /**
   * A function that can calculate the length of a request body.
   * @internal
   */
  bodyLengthChecker?: __BodyLengthCalculator;

  /**
   * A function that converts a stream into an array of bytes.
   * @internal
   */
  streamCollector?: __StreamCollector;

  /**
   * The function that will be used to convert a base64-encoded string to a byte array.
   * @internal
   */
  base64Decoder?: __Decoder;

  /**
   * The function that will be used to convert binary data to a base64-encoded string.
   * @internal
   */
  base64Encoder?: __Encoder;

  /**
   * The function that will be used to convert a UTF8-encoded string to a byte array.
   * @internal
   */
  utf8Decoder?: __Decoder;

  /**
   * The function that will be used to convert binary data to a UTF-8 encoded string.
   * @internal
   */
  utf8Encoder?: __Encoder;

  /**
   * The runtime environment.
   * @internal
   */
  runtime?: string;

  /**
   * Disable dynamically changing the endpoint of the client based on the hostPrefix
   * trait of an operation.
   */
  disableHostPrefix?: boolean;

  /**
   * Unique service identifier.
   * @internal
   */
  serviceId?: string;

  /**
   * Enables IPv6/IPv4 dualstack endpoint.
   */
  useDualstackEndpoint?: boolean | __Provider<boolean>;

  /**
   * Enables FIPS compatible endpoints.
   */
  useFipsEndpoint?: boolean | __Provider<boolean>;

  /**
   * The AWS region to which this client will send requests
   */
  region?: string | __Provider<string>;

  /**
   * Setting a client profile is similar to setting a value for the
   * AWS_PROFILE environment variable. Setting a profile on a client
   * in code only affects the single client instance, unlike AWS_PROFILE.
   *
   * When set, and only for environments where an AWS configuration
   * file exists, fields configurable by this file will be retrieved
   * from the specified profile within that file.
   * Conflicting code configuration and environment variables will
   * still have higher priority.
   *
   * For client credential resolution that involves checking the AWS
   * configuration file, the client's profile (this value) will be
   * used unless a different profile is set in the credential
   * provider options.
   *
   */
  profile?: string;

  /**
   * The provider populating default tracking information to be sent with `user-agent`, `x-amz-user-agent` header
   * @internal
   */
  defaultUserAgentProvider?: Provider<__UserAgent>;

  /**
   * Default credentials provider; Not available in browser runtime.
   * @deprecated
   * @internal
   */
  credentialDefaultProvider?: (input: any) => AwsCredentialIdentityProvider;

  /**
   * Value for how many times a request will be made at most in case of retry.
   */
  maxAttempts?: number | __Provider<number>;

  /**
   * Specifies which retry algorithm to use.
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-smithy-util-retry/Enum/RETRY_MODES/
   *
   */
  retryMode?: string | __Provider<string>;

  /**
   * Optional logger for logging debug/info/warn/error.
   */
  logger?: __Logger;

  /**
   * Optional extensions
   */
  extensions?: RuntimeExtension[];

  /**
   * The {@link @smithy/smithy-client#DefaultsMode} that will be used to determine how certain default configuration options are resolved in the SDK.
   */
  defaultsMode?: __DefaultsMode | __Provider<__DefaultsMode>;
}

/**
 * @public
 */
export type DetectiveClientConfigType = Partial<__SmithyConfiguration<__HttpHandlerOptions>> &
  ClientDefaults &
  UserAgentInputConfig &
  RetryInputConfig &
  RegionInputConfig &
  HostHeaderInputConfig &
  EndpointInputConfig<EndpointParameters> &
  HttpAuthSchemeInputConfig &
  ClientInputEndpointParameters;
/**
 * @public
 *
 *  The configuration interface of DetectiveClient class constructor that set the region, credentials and other options.
 */
export interface DetectiveClientConfig extends DetectiveClientConfigType {}

/**
 * @public
 */
export type DetectiveClientResolvedConfigType = __SmithyResolvedConfiguration<__HttpHandlerOptions> &
  Required<ClientDefaults> &
  RuntimeExtensionsConfig &
  UserAgentResolvedConfig &
  RetryResolvedConfig &
  RegionResolvedConfig &
  HostHeaderResolvedConfig &
  EndpointResolvedConfig<EndpointParameters> &
  HttpAuthSchemeResolvedConfig &
  ClientResolvedEndpointParameters;
/**
 * @public
 *
 *  The resolved configuration interface of DetectiveClient class. This is resolved and normalized from the {@link DetectiveClientConfig | constructor configuration interface}.
 */
export interface DetectiveClientResolvedConfig extends DetectiveClientResolvedConfigType {}

/**
 * <p>Detective uses machine learning and purpose-built visualizations to help you to
 *          analyze and investigate security issues across your Amazon Web Services (Amazon Web Services) workloads. Detective automatically extracts time-based events such
 *          as login attempts, API calls, and network traffic from CloudTrail and Amazon Virtual Private Cloud (Amazon VPC) flow logs. It also extracts findings detected by
 *             Amazon GuardDuty.</p>
 *          <p>The Detective API primarily supports the creation and management of behavior
 *          graphs. A behavior graph contains the extracted data from a set of member accounts, and is
 *          created and managed by an administrator account.</p>
 *          <p>To add a member account to the behavior graph, the administrator account sends an
 *          invitation to the account. When the account accepts the invitation, it becomes a member
 *          account in the behavior graph.</p>
 *          <p>Detective is also integrated with Organizations. The organization
 *          management account designates the Detective administrator account for the
 *          organization. That account becomes the administrator account for the organization behavior
 *          graph. The Detective administrator account is also the delegated administrator
 *          account for Detective in Organizations.</p>
 *          <p>The Detective administrator account can enable any organization account as a
 *          member account in the organization behavior graph. The organization accounts do not receive
 *          invitations. The Detective administrator account can also invite other accounts to
 *          the organization behavior graph.</p>
 *          <p>Every behavior graph is specific to a Region. You can only use the API to manage
 *          behavior graphs that belong to the Region that is associated with the currently selected
 *          endpoint.</p>
 *          <p>The administrator account for a behavior graph can use the Detective API to do
 *          the following:</p>
 *          <ul>
 *             <li>
 *                <p>Enable and disable Detective. Enabling Detective creates a new
 *                behavior graph.</p>
 *             </li>
 *             <li>
 *                <p>View the list of member accounts in a behavior graph.</p>
 *             </li>
 *             <li>
 *                <p>Add member accounts to a behavior graph.</p>
 *             </li>
 *             <li>
 *                <p>Remove member accounts from a behavior graph.</p>
 *             </li>
 *             <li>
 *                <p>Apply tags to a behavior graph.</p>
 *             </li>
 *          </ul>
 *          <p>The organization management account can use the Detective API to select the
 *          delegated administrator for Detective.</p>
 *          <p>The Detective administrator account for an organization can use the Detective API to do the following:</p>
 *          <ul>
 *             <li>
 *                <p>Perform all of the functions of an administrator account.</p>
 *             </li>
 *             <li>
 *                <p>Determine whether to automatically enable new organization accounts as member
 *                accounts in the organization behavior graph.</p>
 *             </li>
 *          </ul>
 *          <p>An invited member account can use the Detective API to do the following:</p>
 *          <ul>
 *             <li>
 *                <p>View the list of behavior graphs that they are invited to.</p>
 *             </li>
 *             <li>
 *                <p>Accept an invitation to contribute to a behavior graph.</p>
 *             </li>
 *             <li>
 *                <p>Decline an invitation to contribute to a behavior graph.</p>
 *             </li>
 *             <li>
 *                <p>Remove their account from a behavior graph.</p>
 *             </li>
 *          </ul>
 *          <p>All API actions are logged as CloudTrail events. See <a href="https://docs.aws.amazon.com/detective/latest/userguide/logging-using-cloudtrail.html">Logging Detective API Calls with CloudTrail</a>.</p>
 *          <note>
 *             <p>We replaced the term "master account" with the term "administrator account". An
 *             administrator account is used to centrally manage multiple accounts. In the case of
 *                Detective, the administrator account manages the accounts in their behavior
 *             graph.</p>
 *          </note>
 * @public
 */
export class DetectiveClient extends __Client<
  __HttpHandlerOptions,
  ServiceInputTypes,
  ServiceOutputTypes,
  DetectiveClientResolvedConfig
> {
  /**
   * The resolved configuration of DetectiveClient class. This is resolved and normalized from the {@link DetectiveClientConfig | constructor configuration interface}.
   */
  readonly config: DetectiveClientResolvedConfig;

  constructor(...[configuration]: __CheckOptionalClientConfig<DetectiveClientConfig>) {
    const _config_0 = __getRuntimeConfig(configuration || {});
    super(_config_0 as any);
    this.initConfig = _config_0;
    const _config_1 = resolveClientEndpointParameters(_config_0);
    const _config_2 = resolveUserAgentConfig(_config_1);
    const _config_3 = resolveRetryConfig(_config_2);
    const _config_4 = resolveRegionConfig(_config_3);
    const _config_5 = resolveHostHeaderConfig(_config_4);
    const _config_6 = resolveEndpointConfig(_config_5);
    const _config_7 = resolveHttpAuthSchemeConfig(_config_6);
    const _config_8 = resolveRuntimeExtensions(_config_7, configuration?.extensions || []);
    this.config = _config_8;
    this.middlewareStack.use(getUserAgentPlugin(this.config));
    this.middlewareStack.use(getRetryPlugin(this.config));
    this.middlewareStack.use(getContentLengthPlugin(this.config));
    this.middlewareStack.use(getHostHeaderPlugin(this.config));
    this.middlewareStack.use(getLoggerPlugin(this.config));
    this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
    this.middlewareStack.use(
      getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
        httpAuthSchemeParametersProvider: defaultDetectiveHttpAuthSchemeParametersProvider,
        identityProviderConfigProvider: async (config: DetectiveClientResolvedConfig) =>
          new DefaultIdentityProviderConfig({
            "aws.auth#sigv4": config.credentials,
          }),
      })
    );
    this.middlewareStack.use(getHttpSigningPlugin(this.config));
  }

  /**
   * Destroy underlying resources, like sockets. It's usually not necessary to do this.
   * However in Node.js, it's best to explicitly shut down the client's agent when it is no longer needed.
   * Otherwise, sockets might stay open for quite a long time before the server terminates them.
   */
  destroy(): void {
    super.destroy();
  }
}
