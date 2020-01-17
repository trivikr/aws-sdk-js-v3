import * as _smithy from "@aws-sdk/smithy-client";
import { MetadataBearer as $MetadataBearer } from "@aws-sdk/types";

export interface AssumeRoleRequest {
  __type?: "AssumeRoleRequest";
  /**
   *
   *          <p>The duration, in seconds, of the role session. The value can range from 900 seconds (15
   *          minutes) up to the maximum session duration setting for the role. This setting can have a
   *          value from 1 hour to 12 hours. If you specify a value higher than this setting, the
   *          operation fails. For example, if you specify a session duration of 12 hours, but your
   *          administrator set the maximum session duration to 6 hours, your operation fails. To learn
   *          how to view the maximum value for your role, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html#id_roles_use_view-role-max-session">View the
   *             Maximum Session Duration Setting for a Role</a> in the
   *             <i>IAM User Guide</i>.</p>
   *          <p>By default, the value is set to <code>3600</code> seconds. </p>
   *          <note>
   *             <p>The <code>DurationSeconds</code> parameter is separate from the duration of a console
   *             session that you might request using the returned credentials. The request to the
   *             federation endpoint for a console sign-in token takes a <code>SessionDuration</code>
   *             parameter that specifies the maximum length of the console session. For more
   *             information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_enable-console-custom-url.html">Creating a URL
   *                that Enables Federated Users to Access the AWS Management Console</a> in the
   *                <i>IAM User Guide</i>.</p>
   *          </note>
   *
   */
  DurationSeconds?: number;

  /**
   *
   *          <p>A unique identifier that might be required when you assume a role in another account. If
   *          the administrator of the account to which the role belongs provided you with an external
   *          ID, then provide that value in the <code>ExternalId</code> parameter. This value can be any
   *          string, such as a passphrase or account number. A cross-account role is usually set up to
   *          trust everyone in an account. Therefore, the administrator of the trusting account might
   *          send an external ID to the administrator of the trusted account. That way, only someone
   *          with the ID can assume the role, rather than everyone in the account. For more information
   *          about the external ID, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html">How to Use an External ID
   *             When Granting Access to Your AWS Resources to a Third Party</a> in the
   *             <i>IAM User Guide</i>.</p>
   *          <p>The regex used to validate this parameter is a string of
   *     characters consisting of upper- and lower-case alphanumeric characters with no spaces.
   *     You can also include underscores or any of the following characters: =,.@:/-</p>
   *
   */
  ExternalId?: string;

  /**
   *
   *          <p>An IAM policy in JSON format that you want to use as an inline session policy.</p>
   *          <p>This parameter is optional. Passing policies to this operation returns new
   *          temporary credentials. The resulting session's permissions are the intersection of the
   *          role's identity-based policy and the session policies. You can use the role's temporary
   *          credentials in subsequent AWS API calls to access resources in the account that owns
   *          the role. You cannot use session policies to grant more permissions than those allowed
   *          by the identity-based policy of the role that is being assumed. For more information, see
   *             <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">Session
   *             Policies</a> in the <i>IAM User Guide</i>.</p>
   *          <p>The plain text that you use for both inline and managed session policies can't exceed
   *          2,048 characters. The JSON policy characters can be any ASCII character from the space
   *          character to the end of the valid character list (\u0020 through \u00FF). It can also
   *          include the tab (\u0009), linefeed (\u000A), and carriage return (\u000D)
   *          characters.</p>
   *
   *          <note>
   *             <p>An AWS conversion compresses the passed session policies and session tags into a
   *             packed binary format that has a separate limit. Your request can fail for this limit
   *             even if your plain text meets the other requirements. The <code>PackedPolicySize</code>
   *             response element indicates by percentage how close the policies and tags for your
   *             request are to the upper size limit.
   *             </p>
   *          </note>
   *
   */
  Policy?: string;

  /**
   *
   *          <p>The Amazon Resource Names (ARNs) of the IAM managed policies that you want to use as
   *          managed session policies. The policies must exist in the same account as the role.</p>
   *          <p>This parameter is optional. You can provide up to 10 managed policy ARNs. However, the
   *          plain text that you use for both inline and managed session policies can't exceed 2,048
   *          characters. For more information about ARNs, see <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html">Amazon Resource Names (ARNs) and AWS
   *             Service Namespaces</a> in the AWS General Reference.</p>
   *
   *          <note>
   *             <p>An AWS conversion compresses the passed session policies and session tags into a
   *             packed binary format that has a separate limit. Your request can fail for this limit
   *             even if your plain text meets the other requirements. The <code>PackedPolicySize</code>
   *             response element indicates by percentage how close the policies and tags for your
   *             request are to the upper size limit.
   *             </p>
   *          </note>
   *
   *          <p>Passing policies to this operation returns new
   *          temporary credentials. The resulting session's permissions are the intersection of the
   *          role's identity-based policy and the session policies. You can use the role's temporary
   *          credentials in subsequent AWS API calls to access resources in the account that owns
   *          the role. You cannot use session policies to grant more permissions than those allowed
   *          by the identity-based policy of the role that is being assumed. For more information, see
   *             <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">Session
   *             Policies</a> in the <i>IAM User Guide</i>.</p>
   *
   */
  PolicyArns?: Array<PolicyDescriptorType>;

  /**
   *
   *          <p>The Amazon Resource Name (ARN) of the role to assume.</p>
   *
   */
  RoleArn: string | undefined;

  /**
   *
   *          <p>An identifier for the assumed role session.</p>
   *          <p>Use the role session name to uniquely identify a session when the same role is assumed
   *          by different principals or for different reasons. In cross-account scenarios, the role
   *          session name is visible to, and can be logged by the account that owns the role. The role
   *          session name is also used in the ARN of the assumed role principal. This means that
   *          subsequent cross-account API requests that use the temporary security credentials will
   *          expose the role session name to the external account in their AWS CloudTrail logs.</p>
   *          <p>The regex used to validate this parameter is a string of characters
   *     consisting of upper- and lower-case alphanumeric characters with no spaces. You can
   *     also include underscores or any of the following characters: =,.@-</p>
   *
   */
  RoleSessionName: string | undefined;

  /**
   *
   *          <p>The identification number of the MFA device that is associated with the user who is
   *          making the <code>AssumeRole</code> call. Specify this value if the trust policy of the role
   *          being assumed includes a condition that requires MFA authentication. The value is either
   *          the serial number for a hardware device (such as <code>GAHT12345678</code>) or an Amazon
   *          Resource Name (ARN) for a virtual device (such as
   *             <code>arn:aws:iam::123456789012:mfa/user</code>).</p>
   *          <p>The regex used to validate this parameter is a string of characters
   *     consisting of upper- and lower-case alphanumeric characters with no spaces. You can
   *     also include underscores or any of the following characters: =,.@-</p>
   *
   */
  SerialNumber?: string;

  /**
   *
   *          <p>A list of session tags that you want to pass. Each session tag consists of a key name
   *          and an associated value. For more information about session tags, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html">Tagging AWS STS
   *             Sessions</a> in the <i>IAM User Guide</i>.</p>
   *          <p>This parameter is optional. You can pass up to 50 session tags. The plain text session
   *          tag keys can’t exceed 128 characters, and the values can’t exceed 256 characters. For these
   *          and additional limits, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-limits.html#reference_iam-limits-entity-length">IAM
   *             and STS Character Limits</a> in the <i>IAM User Guide</i>.</p>
   *
   *          <note>
   *             <p>An AWS conversion compresses the passed session policies and session tags into a
   *             packed binary format that has a separate limit. Your request can fail for this limit
   *             even if your plain text meets the other requirements. The <code>PackedPolicySize</code>
   *             response element indicates by percentage how close the policies and tags for your
   *             request are to the upper size limit.
   *             </p>
   *          </note>
   *
   *          <p>You can pass a session tag with the same key as a tag that is already attached to the
   *          role. When you do, session tags override a role tag with the same key. </p>
   *          <p>Tag key–value pairs are not case sensitive, but case is preserved. This means that you
   *          cannot have separate <code>Department</code> and <code>department</code> tag keys. Assume
   *          that the role has the <code>Department</code>=<code>Marketing</code> tag and you pass the
   *             <code>department</code>=<code>engineering</code> session tag. <code>Department</code>
   *          and <code>department</code> are not saved as separate tags, and the session tag passed in
   *          the request takes precedence over the role tag.</p>
   *          <p>Additionally, if you used temporary credentials to perform this operation, the new
   *          session inherits any transitive session tags from the calling session. If you pass a
   *          session tag with the same key as an inherited tag, the operation fails. To view the
   *          inherited tags for a session, see the AWS CloudTrail logs. For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/session-tags.html#id_session-tags_ctlogs">Viewing Session Tags in CloudTrail</a> in the
   *          <i>IAM User Guide</i>.</p>
   *
   */
  Tags?: Array<Tag>;

  /**
   *
   *          <p>The value provided by the MFA device, if the trust policy of the role being assumed
   *          requires MFA (that is, if the policy includes a condition that tests for MFA). If the role
   *          being assumed requires MFA and if the <code>TokenCode</code> value is missing or expired,
   *          the <code>AssumeRole</code> call returns an "access denied" error.</p>
   *          <p>The format for this parameter, as described by its regex pattern, is a sequence of six
   *          numeric digits.</p>
   *
   */
  TokenCode?: string;

  /**
   *
   *          <p>A list of keys for session tags that you want to set as transitive. If you set a tag key
   *          as transitive, the corresponding key and value passes to subsequent sessions in a role
   *          chain. For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html#id_session-tags_role-chaining">Chaining Roles
   *             with Session Tags</a> in the <i>IAM User Guide</i>.</p>
   *          <p>This parameter is optional. When you set session tags as transitive, the session policy
   *          and session tags packed binary limit is not affected.</p>
   *          <p>If you choose not to specify a transitive tag key, then no tags are passed from this
   *          session to any subsequent sessions.</p>
   *
   */
  TransitiveTagKeys?: Array<string>;
}

export namespace AssumeRoleRequest {
  export function isa(o: any): o is AssumeRoleRequest {
    return _smithy.isa(o, "AssumeRoleRequest");
  }
}

/**
 *
 *          <p>Contains the response to a successful <a>AssumeRole</a> request, including
 *       temporary AWS credentials that can be used to make AWS requests. </p>
 *
 */
export interface AssumeRoleResponse extends $MetadataBearer {
  __type?: "AssumeRoleResponse";
  /**
   *
   *          <p>The Amazon Resource Name (ARN) and the assumed role ID, which are identifiers that you
   *          can use to refer to the resulting temporary security credentials. For example, you can
   *          reference these credentials as a principal in a resource-based policy by using the ARN or
   *          assumed role ID. The ARN and ID include the <code>RoleSessionName</code> that you specified
   *          when you called <code>AssumeRole</code>. </p>
   *
   */
  AssumedRoleUser?: AssumedRoleUser;

  /**
   *
   *          <p>The temporary security credentials, which include an access key ID, a secret access key,
   *          and a security (or session) token.</p>
   *          <note>
   *             <p>The size of the security token that STS API operations return is not fixed. We
   *         strongly recommend that you make no assumptions about the maximum size.</p>
   *          </note>
   *
   */
  Credentials?: Credentials;

  /**
   *
   *          <p>A percentage value that indicates the packed size of the session policies and session
   *       tags combined passed in the request. The request fails if the packed size is greater than 100 percent,
   *       which means the policies and tags exceeded the allowed space.</p>
   *
   */
  PackedPolicySize?: number;
}

export namespace AssumeRoleResponse {
  export function isa(o: any): o is AssumeRoleResponse {
    return _smithy.isa(o, "AssumeRoleResponse");
  }
}

export interface AssumeRoleWithSAMLRequest {
  __type?: "AssumeRoleWithSAMLRequest";
  /**
   *
   *          <p>The duration, in seconds, of the role session. Your role session lasts for the duration
   *          that you specify for the <code>DurationSeconds</code> parameter, or until the time
   *          specified in the SAML authentication response's <code>SessionNotOnOrAfter</code> value,
   *          whichever is shorter. You can provide a <code>DurationSeconds</code> value from 900 seconds
   *          (15 minutes) up to the maximum session duration setting for the role. This setting can have
   *          a value from 1 hour to 12 hours. If you specify a value higher than this setting, the
   *          operation fails. For example, if you specify a session duration of 12 hours, but your
   *          administrator set the maximum session duration to 6 hours, your operation fails. To learn
   *          how to view the maximum value for your role, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html#id_roles_use_view-role-max-session">View the
   *             Maximum Session Duration Setting for a Role</a> in the
   *             <i>IAM User Guide</i>.</p>
   *          <p>By default, the value is set to <code>3600</code> seconds. </p>
   *          <note>
   *             <p>The <code>DurationSeconds</code> parameter is separate from the duration of a console
   *             session that you might request using the returned credentials. The request to the
   *             federation endpoint for a console sign-in token takes a <code>SessionDuration</code>
   *             parameter that specifies the maximum length of the console session. For more
   *             information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_enable-console-custom-url.html">Creating a URL
   *                that Enables Federated Users to Access the AWS Management Console</a> in the
   *                <i>IAM User Guide</i>.</p>
   *          </note>
   *
   */
  DurationSeconds?: number;

  /**
   *
   *          <p>An IAM policy in JSON format that you want to use as an inline session policy.</p>
   *          <p>This parameter is optional. Passing policies to this operation returns new
   *          temporary credentials. The resulting session's permissions are the intersection of the
   *          role's identity-based policy and the session policies. You can use the role's temporary
   *          credentials in subsequent AWS API calls to access resources in the account that owns
   *          the role. You cannot use session policies to grant more permissions than those allowed
   *          by the identity-based policy of the role that is being assumed. For more information, see
   *             <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">Session
   *             Policies</a> in the <i>IAM User Guide</i>. </p>
   *          <p>The plain text that you use for both inline and managed session policies can't exceed
   *          2,048 characters. The JSON policy characters can be any ASCII character from the space
   *          character to the end of the valid character list (\u0020 through \u00FF). It can also
   *          include the tab (\u0009), linefeed (\u000A), and carriage return (\u000D)
   *          characters.</p>
   *          <note>
   *             <p>An AWS conversion compresses the passed session policies and session tags into a
   *             packed binary format that has a separate limit. Your request can fail for this limit
   *             even if your plain text meets the other requirements. The <code>PackedPolicySize</code>
   *             response element indicates by percentage how close the policies and tags for your
   *             request are to the upper size limit.
   *             </p>
   *          </note>
   *
   */
  Policy?: string;

  /**
   *
   *          <p>The Amazon Resource Names (ARNs) of the IAM managed policies that you want to use as
   *          managed session policies. The policies must exist in the same account as the role.</p>
   *          <p>This parameter is optional. You can provide up to 10 managed policy ARNs. However, the
   *          plain text that you use for both inline and managed session policies can't exceed 2,048
   *          characters. For more information about ARNs, see <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html">Amazon Resource Names (ARNs) and AWS
   *             Service Namespaces</a> in the AWS General Reference.</p>
   *          <note>
   *             <p>An AWS conversion compresses the passed session policies and session tags into a
   *             packed binary format that has a separate limit. Your request can fail for this limit
   *             even if your plain text meets the other requirements. The <code>PackedPolicySize</code>
   *             response element indicates by percentage how close the policies and tags for your
   *             request are to the upper size limit.
   *             </p>
   *          </note>
   *
   *          <p>Passing policies to this operation returns new
   *          temporary credentials. The resulting session's permissions are the intersection of the
   *          role's identity-based policy and the session policies. You can use the role's temporary
   *          credentials in subsequent AWS API calls to access resources in the account that owns
   *          the role. You cannot use session policies to grant more permissions than those allowed
   *          by the identity-based policy of the role that is being assumed. For more information, see
   *             <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">Session
   *             Policies</a> in the <i>IAM User Guide</i>.</p>
   *
   */
  PolicyArns?: Array<PolicyDescriptorType>;

  /**
   *
   *          <p>The Amazon Resource Name (ARN) of the SAML provider in IAM that describes the
   *          IdP.</p>
   *
   */
  PrincipalArn: string | undefined;

  /**
   *
   *          <p>The Amazon Resource Name (ARN) of the role that the caller is assuming.</p>
   *
   */
  RoleArn: string | undefined;

  /**
   *
   *          <p>The base-64 encoded SAML authentication response provided by the IdP.</p>
   *          <p>For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/create-role-saml-IdP-tasks.html">Configuring a Relying Party and
   *             Adding Claims</a> in the <i>IAM User Guide</i>. </p>
   *
   */
  SAMLAssertion: string | undefined;
}

export namespace AssumeRoleWithSAMLRequest {
  export function isa(o: any): o is AssumeRoleWithSAMLRequest {
    return _smithy.isa(o, "AssumeRoleWithSAMLRequest");
  }
}

/**
 *
 *          <p>Contains the response to a successful <a>AssumeRoleWithSAML</a> request,
 *       including temporary AWS credentials that can be used to make AWS requests. </p>
 *
 */
export interface AssumeRoleWithSAMLResponse extends $MetadataBearer {
  __type?: "AssumeRoleWithSAMLResponse";
  /**
   *
   *          <p>The identifiers for the temporary security credentials that the operation
   *          returns.</p>
   *
   */
  AssumedRoleUser?: AssumedRoleUser;

  /**
   *
   *          <p> The value of the <code>Recipient</code> attribute of the
   *             <code>SubjectConfirmationData</code> element of the SAML assertion. </p>
   *
   */
  Audience?: string;

  /**
   *
   *          <p>The temporary security credentials, which include an access key ID, a secret access key,
   *          and a security (or session) token.</p>
   *          <note>
   *             <p>The size of the security token that STS API operations return is not fixed. We
   *         strongly recommend that you make no assumptions about the maximum size.</p>
   *          </note>
   *
   */
  Credentials?: Credentials;

  /**
   *
   *          <p>The value of the <code>Issuer</code> element of the SAML assertion.</p>
   *
   */
  Issuer?: string;

  /**
   *
   *          <p>A hash value based on the concatenation of the <code>Issuer</code> response value, the
   *          AWS account ID, and the friendly name (the last part of the ARN) of the SAML provider in
   *          IAM. The combination of <code>NameQualifier</code> and <code>Subject</code> can be used
   *          to uniquely identify a federated user. </p>
   *          <p>The following pseudocode shows how the hash value is calculated:</p>
   *          <p>
   *             <code>BASE64 ( SHA1 ( "https://example.com/saml" + "123456789012" + "/MySAMLIdP" ) )</code>
   *          </p>
   *
   */
  NameQualifier?: string;

  /**
   *
   *
   *          <p>A percentage value that indicates the packed size of the session policies and session
   *       tags combined passed in the request. The request fails if the packed size is greater than 100 percent,
   *       which means the policies and tags exceeded the allowed space.</p>
   *
   *
   */
  PackedPolicySize?: number;

  /**
   *
   *          <p>The value of the <code>NameID</code> element in the <code>Subject</code> element of the
   *          SAML assertion.</p>
   *
   */
  Subject?: string;

  /**
   *
   *          <p> The format of the name ID, as defined by the <code>Format</code> attribute in the
   *             <code>NameID</code> element of the SAML assertion. Typical examples of the format are
   *             <code>transient</code> or <code>persistent</code>. </p>
   *          <p> If the format includes the prefix
   *             <code>urn:oasis:names:tc:SAML:2.0:nameid-format</code>, that prefix is removed. For
   *          example, <code>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</code> is returned as
   *             <code>transient</code>. If the format includes any other prefix, the format is returned
   *          with no modifications.</p>
   *
   */
  SubjectType?: string;
}

export namespace AssumeRoleWithSAMLResponse {
  export function isa(o: any): o is AssumeRoleWithSAMLResponse {
    return _smithy.isa(o, "AssumeRoleWithSAMLResponse");
  }
}

export interface AssumeRoleWithWebIdentityRequest {
  __type?: "AssumeRoleWithWebIdentityRequest";
  /**
   *
   *          <p>The duration, in seconds, of the role session. The value can range from 900 seconds (15
   *          minutes) up to the maximum session duration setting for the role. This setting can have a
   *          value from 1 hour to 12 hours. If you specify a value higher than this setting, the
   *          operation fails. For example, if you specify a session duration of 12 hours, but your
   *          administrator set the maximum session duration to 6 hours, your operation fails. To learn
   *          how to view the maximum value for your role, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html#id_roles_use_view-role-max-session">View the
   *             Maximum Session Duration Setting for a Role</a> in the
   *             <i>IAM User Guide</i>.</p>
   *          <p>By default, the value is set to <code>3600</code> seconds. </p>
   *          <note>
   *             <p>The <code>DurationSeconds</code> parameter is separate from the duration of a console
   *             session that you might request using the returned credentials. The request to the
   *             federation endpoint for a console sign-in token takes a <code>SessionDuration</code>
   *             parameter that specifies the maximum length of the console session. For more
   *             information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_enable-console-custom-url.html">Creating a URL
   *                that Enables Federated Users to Access the AWS Management Console</a> in the
   *                <i>IAM User Guide</i>.</p>
   *          </note>
   *
   */
  DurationSeconds?: number;

  /**
   *
   *          <p>An IAM policy in JSON format that you want to use as an inline session policy.</p>
   *          <p>This parameter is optional. Passing policies to this operation returns new
   *          temporary credentials. The resulting session's permissions are the intersection of the
   *          role's identity-based policy and the session policies. You can use the role's temporary
   *          credentials in subsequent AWS API calls to access resources in the account that owns
   *          the role. You cannot use session policies to grant more permissions than those allowed
   *          by the identity-based policy of the role that is being assumed. For more information, see
   *             <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">Session
   *             Policies</a> in the <i>IAM User Guide</i>.</p>
   *          <p>The plain text that you use for both inline and managed session policies can't exceed
   *          2,048 characters. The JSON policy characters can be any ASCII character from the space
   *          character to the end of the valid character list (\u0020 through \u00FF). It can also
   *          include the tab (\u0009), linefeed (\u000A), and carriage return (\u000D)
   *          characters.</p>
   *          <note>
   *             <p>An AWS conversion compresses the passed session policies and session tags into a
   *             packed binary format that has a separate limit. Your request can fail for this limit
   *             even if your plain text meets the other requirements. The <code>PackedPolicySize</code>
   *             response element indicates by percentage how close the policies and tags for your
   *             request are to the upper size limit.
   *             </p>
   *          </note>
   *
   */
  Policy?: string;

  /**
   *
   *          <p>The Amazon Resource Names (ARNs) of the IAM managed policies that you want to use as
   *          managed session policies. The policies must exist in the same account as the role.</p>
   *          <p>This parameter is optional. You can provide up to 10 managed policy ARNs. However, the
   *          plain text that you use for both inline and managed session policies can't exceed 2,048
   *          characters. For more information about ARNs, see <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html">Amazon Resource Names (ARNs) and AWS
   *             Service Namespaces</a> in the AWS General Reference.</p>
   *          <note>
   *             <p>An AWS conversion compresses the passed session policies and session tags into a
   *             packed binary format that has a separate limit. Your request can fail for this limit
   *             even if your plain text meets the other requirements. The <code>PackedPolicySize</code>
   *             response element indicates by percentage how close the policies and tags for your
   *             request are to the upper size limit.
   *             </p>
   *          </note>
   *
   *          <p>Passing policies to this operation returns new
   *          temporary credentials. The resulting session's permissions are the intersection of the
   *          role's identity-based policy and the session policies. You can use the role's temporary
   *          credentials in subsequent AWS API calls to access resources in the account that owns
   *          the role. You cannot use session policies to grant more permissions than those allowed
   *          by the identity-based policy of the role that is being assumed. For more information, see
   *             <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">Session
   *             Policies</a> in the <i>IAM User Guide</i>.</p>
   *
   */
  PolicyArns?: Array<PolicyDescriptorType>;

  /**
   *
   *          <p>The fully qualified host component of the domain name of the identity provider.</p>
   *          <p>Specify this value only for OAuth 2.0 access tokens. Currently
   *             <code>www.amazon.com</code> and <code>graph.facebook.com</code> are the only supported
   *          identity providers for OAuth 2.0 access tokens. Do not include URL schemes and port
   *          numbers.</p>
   *          <p>Do not specify this value for OpenID Connect ID tokens.</p>
   *
   */
  ProviderId?: string;

  /**
   *
   *          <p>The Amazon Resource Name (ARN) of the role that the caller is assuming.</p>
   *
   */
  RoleArn: string | undefined;

  /**
   *
   *          <p>An identifier for the assumed role session. Typically, you pass the name or identifier
   *          that is associated with the user who is using your application. That way, the temporary
   *          security credentials that your application will use are associated with that user. This
   *          session name is included as part of the ARN and assumed role ID in the
   *             <code>AssumedRoleUser</code> response element.</p>
   *          <p>The regex used to validate this parameter is a string of characters
   *     consisting of upper- and lower-case alphanumeric characters with no spaces. You can
   *     also include underscores or any of the following characters: =,.@-</p>
   *
   */
  RoleSessionName: string | undefined;

  /**
   *
   *          <p>The OAuth 2.0 access token or OpenID Connect ID token that is provided by the identity
   *          provider. Your application must get this token by authenticating the user who is using your
   *          application with a web identity provider before the application makes an
   *             <code>AssumeRoleWithWebIdentity</code> call. </p>
   *
   */
  WebIdentityToken: string | undefined;
}

export namespace AssumeRoleWithWebIdentityRequest {
  export function isa(o: any): o is AssumeRoleWithWebIdentityRequest {
    return _smithy.isa(o, "AssumeRoleWithWebIdentityRequest");
  }
}

/**
 *
 *          <p>Contains the response to a successful <a>AssumeRoleWithWebIdentity</a>
 *       request, including temporary AWS credentials that can be used to make AWS requests. </p>
 *
 */
export interface AssumeRoleWithWebIdentityResponse extends $MetadataBearer {
  __type?: "AssumeRoleWithWebIdentityResponse";
  /**
   *
   *          <p>The Amazon Resource Name (ARN) and the assumed role ID, which are identifiers that you
   *          can use to refer to the resulting temporary security credentials. For example, you can
   *          reference these credentials as a principal in a resource-based policy by using the ARN or
   *          assumed role ID. The ARN and ID include the <code>RoleSessionName</code> that you specified
   *          when you called <code>AssumeRole</code>. </p>
   *
   */
  AssumedRoleUser?: AssumedRoleUser;

  /**
   *
   *          <p>The intended audience (also known as client ID) of the web identity token. This is
   *          traditionally the client identifier issued to the application that requested the web
   *          identity token.</p>
   *
   */
  Audience?: string;

  /**
   *
   *          <p>The temporary security credentials, which include an access key ID, a secret access key,
   *          and a security token.</p>
   *          <note>
   *             <p>The size of the security token that STS API operations return is not fixed. We
   *         strongly recommend that you make no assumptions about the maximum size.</p>
   *          </note>
   *
   */
  Credentials?: Credentials;

  /**
   *
   *
   *          <p>A percentage value that indicates the packed size of the session policies and session
   *       tags combined passed in the request. The request fails if the packed size is greater than 100 percent,
   *       which means the policies and tags exceeded the allowed space.</p>
   *
   *
   */
  PackedPolicySize?: number;

  /**
   *
   *          <p> The issuing authority of the web identity token presented. For OpenID Connect ID
   *          tokens, this contains the value of the <code>iss</code> field. For OAuth 2.0 access tokens,
   *          this contains the value of the <code>ProviderId</code> parameter that was passed in the
   *             <code>AssumeRoleWithWebIdentity</code> request.</p>
   *
   */
  Provider?: string;

  /**
   *
   *          <p>The unique user identifier that is returned by the identity provider. This identifier is
   *          associated with the <code>WebIdentityToken</code> that was submitted with the
   *             <code>AssumeRoleWithWebIdentity</code> call. The identifier is typically unique to the
   *          user and the application that acquired the <code>WebIdentityToken</code> (pairwise
   *          identifier). For OpenID Connect ID tokens, this field contains the value returned by the
   *          identity provider as the token's <code>sub</code> (Subject) claim. </p>
   *
   */
  SubjectFromWebIdentityToken?: string;
}

export namespace AssumeRoleWithWebIdentityResponse {
  export function isa(o: any): o is AssumeRoleWithWebIdentityResponse {
    return _smithy.isa(o, "AssumeRoleWithWebIdentityResponse");
  }
}

/**
 *
 *          <p>The identifiers for the temporary security credentials that the operation
 *          returns.</p>
 *
 */
export interface AssumedRoleUser {
  __type?: "AssumedRoleUser";
  /**
   *
   *          <p>The ARN of the temporary security credentials that are returned from the <a>AssumeRole</a> action. For more information about ARNs and how to use them in
   *          policies, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html">IAM Identifiers</a> in the
   *             <i>IAM User Guide</i>.</p>
   *
   */
  Arn: string | undefined;

  /**
   *
   *          <p>A unique identifier that contains the role ID and the role session name of the role that
   *          is being assumed. The role ID is generated by AWS when the role is created.</p>
   *
   */
  AssumedRoleId: string | undefined;
}

export namespace AssumedRoleUser {
  export function isa(o: any): o is AssumedRoleUser {
    return _smithy.isa(o, "AssumedRoleUser");
  }
}

/**
 *
 *          <p>AWS credentials for API authentication.</p>
 *
 */
export interface Credentials {
  __type?: "Credentials";
  /**
   *
   *          <p>The access key ID that identifies the temporary security credentials.</p>
   *
   */
  AccessKeyId: string | undefined;

  /**
   *
   *          <p>The date on which the current credentials expire.</p>
   *
   */
  Expiration: Date | undefined;

  /**
   *
   *          <p>The secret access key that can be used to sign requests.</p>
   *
   */
  SecretAccessKey: string | undefined;

  /**
   *
   *          <p>The token that users must pass to the service API to use the temporary
   *          credentials.</p>
   *
   */
  SessionToken: string | undefined;
}

export namespace Credentials {
  export function isa(o: any): o is Credentials {
    return _smithy.isa(o, "Credentials");
  }
}

export interface DecodeAuthorizationMessageRequest {
  __type?: "DecodeAuthorizationMessageRequest";
  /**
   *
   *          <p>The encoded message that was returned with the response.</p>
   *
   *
   */
  EncodedMessage: string | undefined;
}

export namespace DecodeAuthorizationMessageRequest {
  export function isa(o: any): o is DecodeAuthorizationMessageRequest {
    return _smithy.isa(o, "DecodeAuthorizationMessageRequest");
  }
}

/**
 *
 *          <p>A document that contains additional information about the authorization status of a
 *       request from an encoded message that is returned in response to an AWS request.</p>
 *
 */
export interface DecodeAuthorizationMessageResponse extends $MetadataBearer {
  __type?: "DecodeAuthorizationMessageResponse";
  /**
   *
   *          <p>An XML document that contains the decoded message.</p>
   *
   */
  DecodedMessage?: string;
}

export namespace DecodeAuthorizationMessageResponse {
  export function isa(o: any): o is DecodeAuthorizationMessageResponse {
    return _smithy.isa(o, "DecodeAuthorizationMessageResponse");
  }
}

/**
 *
 *         <p>The web identity token that was passed is expired or is not valid. Get a new identity
 *             token from the identity provider and then retry the request.</p>
 *
 */
export interface ExpiredTokenException
  extends _smithy.SmithyException,
    $MetadataBearer {
  __type: "ExpiredTokenException";
  name: "ExpiredTokenException";
  $fault: "client";
  message?: string;
}

export namespace ExpiredTokenException {
  export function isa(o: any): o is ExpiredTokenException {
    return _smithy.isa(o, "ExpiredTokenException");
  }
}

/**
 *
 *          <p>Identifiers for the federated user that is associated with the credentials.</p>
 *
 */
export interface FederatedUser {
  __type?: "FederatedUser";
  /**
   *
   *          <p>The ARN that specifies the federated user that is associated with the credentials. For
   *          more information about ARNs and how to use them in policies, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html">IAM
   *             Identifiers</a> in the <i>IAM User Guide</i>. </p>
   *
   */
  Arn: string | undefined;

  /**
   *
   *          <p>The string that identifies the federated user associated with the credentials, similar
   *          to the unique ID of an IAM user.</p>
   *
   */
  FederatedUserId: string | undefined;
}

export namespace FederatedUser {
  export function isa(o: any): o is FederatedUser {
    return _smithy.isa(o, "FederatedUser");
  }
}

export interface GetAccessKeyInfoRequest {
  __type?: "GetAccessKeyInfoRequest";
  /**
   *
   *          <p>The identifier of an access key.</p>
   *          <p>This parameter allows (through its regex pattern) a string of characters that can
   *          consist of any upper- or lowercase letter or digit.</p>
   *
   */
  AccessKeyId: string | undefined;
}

export namespace GetAccessKeyInfoRequest {
  export function isa(o: any): o is GetAccessKeyInfoRequest {
    return _smithy.isa(o, "GetAccessKeyInfoRequest");
  }
}

export interface GetAccessKeyInfoResponse extends $MetadataBearer {
  __type?: "GetAccessKeyInfoResponse";
  /**
   *
   *          <p>The number used to identify the AWS account.</p>
   *
   */
  Account?: string;
}

export namespace GetAccessKeyInfoResponse {
  export function isa(o: any): o is GetAccessKeyInfoResponse {
    return _smithy.isa(o, "GetAccessKeyInfoResponse");
  }
}

export interface GetCallerIdentityRequest {
  __type?: "GetCallerIdentityRequest";
}

export namespace GetCallerIdentityRequest {
  export function isa(o: any): o is GetCallerIdentityRequest {
    return _smithy.isa(o, "GetCallerIdentityRequest");
  }
}

/**
 *
 *          <p>Contains the response to a successful <a>GetCallerIdentity</a> request,
 *          including information about the entity making the request.</p>
 *
 */
export interface GetCallerIdentityResponse extends $MetadataBearer {
  __type?: "GetCallerIdentityResponse";
  /**
   *
   *          <p>The AWS account ID number of the account that owns or contains the calling
   *          entity.</p>
   *
   */
  Account?: string;

  /**
   *
   *          <p>The AWS ARN associated with the calling entity.</p>
   *
   */
  Arn?: string;

  /**
   *
   *          <p>The unique identifier of the calling entity. The exact value depends on the type of
   *          entity that is making the call. The values returned are those listed in the <b>aws:userid</b> column in the <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_variables.html#principaltable">Principal
   *             table</a> found on the <b>Policy Variables</b> reference
   *          page in the <i>IAM User Guide</i>.</p>
   *
   */
  UserId?: string;
}

export namespace GetCallerIdentityResponse {
  export function isa(o: any): o is GetCallerIdentityResponse {
    return _smithy.isa(o, "GetCallerIdentityResponse");
  }
}

export interface GetFederationTokenRequest {
  __type?: "GetFederationTokenRequest";
  /**
   *
   *          <p>The duration, in seconds, that the session should last. Acceptable durations for
   *          federation sessions range from 900 seconds (15 minutes) to 129,600 seconds (36 hours), with
   *          43,200 seconds (12 hours) as the default. Sessions obtained using AWS account root user
   *          credentials are restricted to a maximum of 3,600 seconds (one hour). If the specified
   *          duration is longer than one hour, the session obtained by using root user credentials
   *          defaults to one hour.</p>
   *
   */
  DurationSeconds?: number;

  /**
   *
   *          <p>The name of the federated user. The name is used as an identifier for the temporary
   *          security credentials (such as <code>Bob</code>). For example, you can reference the
   *          federated user name in a resource-based policy, such as in an Amazon S3 bucket policy.</p>
   *          <p>The regex used to validate this parameter is a string of characters
   *     consisting of upper- and lower-case alphanumeric characters with no spaces. You can
   *     also include underscores or any of the following characters: =,.@-</p>
   *
   */
  Name: string | undefined;

  /**
   *
   *          <p>An IAM policy in JSON format that you want to use as an inline session policy.</p>
   *          <p>You must pass an inline or managed <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">session policy</a> to
   *          this operation. You can pass a single JSON policy document to use as an inline session
   *          policy. You can also specify up to 10 managed policies to use as managed session
   *          policies.</p>
   *          <p>This parameter is optional. However, if you do not pass any session policies, then the
   *          resulting federated user session has no permissions.</p>
   *          <p>When you pass session policies, the session permissions are the intersection of the
   *          IAM user policies and the session policies that you pass. This gives you a way to further
   *          restrict the permissions for a federated user. You cannot use session policies to grant
   *          more permissions than those that are defined in the permissions policy of the IAM user.
   *          For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">Session Policies</a> in
   *          the <i>IAM User Guide</i>.</p>
   *          <p>The resulting credentials can be used to access a resource that has a resource-based
   *          policy. If that policy specifically references the federated user session in the
   *             <code>Principal</code> element of the policy, the session has the permissions allowed by
   *          the policy. These permissions are granted in addition to the permissions that are granted
   *          by the session policies.</p>
   *          <p>The plain text that you use for both inline and managed session policies can't exceed
   *          2,048 characters. The JSON policy characters can be any ASCII character from the space
   *          character to the end of the valid character list (\u0020 through \u00FF). It can also
   *          include the tab (\u0009), linefeed (\u000A), and carriage return (\u000D)
   *          characters.</p>
   *          <note>
   *             <p>An AWS conversion compresses the passed session policies and session tags into a
   *             packed binary format that has a separate limit. Your request can fail for this limit
   *             even if your plain text meets the other requirements. The <code>PackedPolicySize</code>
   *             response element indicates by percentage how close the policies and tags for your
   *             request are to the upper size limit.
   *             </p>
   *          </note>
   *
   */
  Policy?: string;

  /**
   *
   *          <p>The Amazon Resource Names (ARNs) of the IAM managed policies that you want to use as a
   *          managed session policy. The policies must exist in the same account as the IAM user that
   *          is requesting federated access.</p>
   *          <p>You must pass an inline or managed <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">session policy</a> to
   *          this operation. You can pass a single JSON policy document to use as an inline session
   *          policy. You can also specify up to 10 managed policies to use as managed session policies.
   *          The plain text that you use for both inline and managed session policies can't exceed 2,048
   *          characters. You can provide up to 10 managed policy ARNs. For more information about ARNs,
   *          see <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html">Amazon
   *             Resource Names (ARNs) and AWS Service Namespaces</a> in the AWS General Reference.</p>
   *          <p>This parameter is optional. However, if you do not pass any session policies, then the
   *          resulting federated user session has no permissions.</p>
   *          <p>When you pass session policies, the session permissions are the intersection of the
   *          IAM user policies and the session policies that you pass. This gives you a way to further
   *          restrict the permissions for a federated user. You cannot use session policies to grant
   *          more permissions than those that are defined in the permissions policy of the IAM user.
   *          For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session">Session Policies</a> in
   *          the <i>IAM User Guide</i>.</p>
   *          <p>The resulting credentials can be used to access a resource that has a resource-based
   *          policy. If that policy specifically references the federated user session in the
   *             <code>Principal</code> element of the policy, the session has the permissions allowed by
   *          the policy. These permissions are granted in addition to the permissions that are granted
   *          by the session policies.</p>
   *          <note>
   *             <p>An AWS conversion compresses the passed session policies and session tags into a
   *             packed binary format that has a separate limit. Your request can fail for this limit
   *             even if your plain text meets the other requirements. The <code>PackedPolicySize</code>
   *             response element indicates by percentage how close the policies and tags for your
   *             request are to the upper size limit.
   *             </p>
   *          </note>
   *
   */
  PolicyArns?: Array<PolicyDescriptorType>;

  /**
   *
   *          <p>A list of session tags. Each session tag consists of a key name and an associated value.
   *          For more information about session tags, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html">Passing Session Tags in STS</a> in the
   *             <i>IAM User Guide</i>.</p>
   *          <p>This parameter is optional. You can pass up to 50 session tags. The plain text session
   *          tag keys can’t exceed 128 characters and the values can’t exceed 256 characters. For these
   *          and additional limits, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-limits.html#reference_iam-limits-entity-length">IAM
   *             and STS Character Limits</a> in the <i>IAM User Guide</i>.</p>
   *
   *          <note>
   *             <p>An AWS conversion compresses the passed session policies and session tags into a
   *             packed binary format that has a separate limit. Your request can fail for this limit
   *             even if your plain text meets the other requirements. The <code>PackedPolicySize</code>
   *             response element indicates by percentage how close the policies and tags for your
   *             request are to the upper size limit.
   *             </p>
   *          </note>
   *
   *          <p>You can pass a session tag with the same key as a tag that is already attached to the
   *          user you are federating. When you do, session tags override a user tag with the same key. </p>
   *          <p>Tag key–value pairs are not case sensitive, but case is preserved. This means that you
   *          cannot have separate <code>Department</code> and <code>department</code> tag keys. Assume
   *          that the role has the <code>Department</code>=<code>Marketing</code> tag and you pass the
   *             <code>department</code>=<code>engineering</code> session tag. <code>Department</code>
   *          and <code>department</code> are not saved as separate tags, and the session tag passed in
   *          the request takes precedence over the role tag.</p>
   *
   */
  Tags?: Array<Tag>;
}

export namespace GetFederationTokenRequest {
  export function isa(o: any): o is GetFederationTokenRequest {
    return _smithy.isa(o, "GetFederationTokenRequest");
  }
}

/**
 *
 *          <p>Contains the response to a successful <a>GetFederationToken</a> request,
 *       including temporary AWS credentials that can be used to make AWS requests. </p>
 *
 */
export interface GetFederationTokenResponse extends $MetadataBearer {
  __type?: "GetFederationTokenResponse";
  /**
   *
   *          <p>The temporary security credentials, which include an access key ID, a secret access key,
   *          and a security (or session) token.</p>
   *          <note>
   *             <p>The size of the security token that STS API operations return is not fixed. We
   *         strongly recommend that you make no assumptions about the maximum size.</p>
   *          </note>
   *
   */
  Credentials?: Credentials;

  /**
   *
   *          <p>Identifiers for the federated user associated with the credentials (such as
   *             <code>arn:aws:sts::123456789012:federated-user/Bob</code> or
   *             <code>123456789012:Bob</code>). You can use the federated user's ARN in your
   *          resource-based policies, such as an Amazon S3 bucket policy. </p>
   *
   */
  FederatedUser?: FederatedUser;

  /**
   *
   *
   *          <p>A percentage value that indicates the packed size of the session policies and session
   *       tags combined passed in the request. The request fails if the packed size is greater than 100 percent,
   *       which means the policies and tags exceeded the allowed space.</p>
   *
   *
   */
  PackedPolicySize?: number;
}

export namespace GetFederationTokenResponse {
  export function isa(o: any): o is GetFederationTokenResponse {
    return _smithy.isa(o, "GetFederationTokenResponse");
  }
}

export interface GetSessionTokenRequest {
  __type?: "GetSessionTokenRequest";
  /**
   *
   *          <p>The duration, in seconds, that the credentials should remain valid. Acceptable durations
   *          for IAM user sessions range from 900 seconds (15 minutes) to 129,600 seconds (36 hours),
   *          with 43,200 seconds (12 hours) as the default. Sessions for AWS account owners are
   *          restricted to a maximum of 3,600 seconds (one hour). If the duration is longer than one
   *          hour, the session for AWS account owners defaults to one hour.</p>
   *
   */
  DurationSeconds?: number;

  /**
   *
   *          <p>The identification number of the MFA device that is associated with the IAM user who
   *          is making the <code>GetSessionToken</code> call. Specify this value if the IAM user has a
   *          policy that requires MFA authentication. The value is either the serial number for a
   *          hardware device (such as <code>GAHT12345678</code>) or an Amazon Resource Name (ARN) for a
   *          virtual device (such as <code>arn:aws:iam::123456789012:mfa/user</code>). You can find the
   *          device for an IAM user by going to the AWS Management Console and viewing the user's security
   *          credentials. </p>
   *          <p>The regex used to validate this parameter is a string of
   *     characters consisting of upper- and lower-case alphanumeric characters with no spaces.
   *     You can also include underscores or any of the following characters: =,.@:/-</p>
   *
   */
  SerialNumber?: string;

  /**
   *
   *          <p>The value provided by the MFA device, if MFA is required. If any policy requires the
   *          IAM user to submit an MFA code, specify this value. If MFA authentication is required,
   *          the user must provide a code when requesting a set of temporary security credentials. A
   *          user who fails to provide the code receives an "access denied" response when requesting
   *          resources that require MFA authentication.</p>
   *          <p>The format for this parameter, as described by its regex pattern, is a sequence of six
   *          numeric digits.</p>
   *
   */
  TokenCode?: string;
}

export namespace GetSessionTokenRequest {
  export function isa(o: any): o is GetSessionTokenRequest {
    return _smithy.isa(o, "GetSessionTokenRequest");
  }
}

/**
 *
 *          <p>Contains the response to a successful <a>GetSessionToken</a> request,
 *       including temporary AWS credentials that can be used to make AWS requests. </p>
 *
 */
export interface GetSessionTokenResponse extends $MetadataBearer {
  __type?: "GetSessionTokenResponse";
  /**
   *
   *          <p>The temporary security credentials, which include an access key ID, a secret access key,
   *          and a security (or session) token.</p>
   *          <note>
   *             <p>The size of the security token that STS API operations return is not fixed. We
   *         strongly recommend that you make no assumptions about the maximum size.</p>
   *          </note>
   *
   */
  Credentials?: Credentials;
}

export namespace GetSessionTokenResponse {
  export function isa(o: any): o is GetSessionTokenResponse {
    return _smithy.isa(o, "GetSessionTokenResponse");
  }
}

/**
 *
 *         <p>The request could not be fulfilled because the identity provider (IDP) that
 *             was asked to verify the incoming identity token could not be reached. This is often a
 *             transient error caused by network conditions. Retry the request a limited number of
 *             times so that you don't exceed the request rate. If the error persists, the
 *             identity provider might be down or not responding.</p>
 *
 */
export interface IDPCommunicationErrorException
  extends _smithy.SmithyException,
    $MetadataBearer {
  __type: "IDPCommunicationErrorException";
  name: "IDPCommunicationErrorException";
  $fault: "client";
  message?: string;
}

export namespace IDPCommunicationErrorException {
  export function isa(o: any): o is IDPCommunicationErrorException {
    return _smithy.isa(o, "IDPCommunicationErrorException");
  }
}

/**
 *
 *         <p>The identity provider (IdP) reported that authentication failed. This might be because
 *             the claim is invalid.</p>
 *         <p>If this error is returned for the <code>AssumeRoleWithWebIdentity</code> operation, it
 *             can also mean that the claim has expired or has been explicitly revoked. </p>
 *
 */
export interface IDPRejectedClaimException
  extends _smithy.SmithyException,
    $MetadataBearer {
  __type: "IDPRejectedClaimException";
  name: "IDPRejectedClaimException";
  $fault: "client";
  message?: string;
}

export namespace IDPRejectedClaimException {
  export function isa(o: any): o is IDPRejectedClaimException {
    return _smithy.isa(o, "IDPRejectedClaimException");
  }
}

/**
 *
 *         <p>The error returned if the message passed to <code>DecodeAuthorizationMessage</code>
 *             was invalid. This can happen if the token contains invalid characters, such as
 *             linebreaks. </p>
 *
 */
export interface InvalidAuthorizationMessageException
  extends _smithy.SmithyException,
    $MetadataBearer {
  __type: "InvalidAuthorizationMessageException";
  name: "InvalidAuthorizationMessageException";
  $fault: "client";
  message?: string;
}

export namespace InvalidAuthorizationMessageException {
  export function isa(o: any): o is InvalidAuthorizationMessageException {
    return _smithy.isa(o, "InvalidAuthorizationMessageException");
  }
}

/**
 *
 *         <p>The web identity token that was passed could not be validated by AWS. Get a new
 *             identity token from the identity provider and then retry the request.</p>
 *
 */
export interface InvalidIdentityTokenException
  extends _smithy.SmithyException,
    $MetadataBearer {
  __type: "InvalidIdentityTokenException";
  name: "InvalidIdentityTokenException";
  $fault: "client";
  message?: string;
}

export namespace InvalidIdentityTokenException {
  export function isa(o: any): o is InvalidIdentityTokenException {
    return _smithy.isa(o, "InvalidIdentityTokenException");
  }
}

/**
 *
 *         <p>The request was rejected because the policy document was malformed. The error message
 *             describes the specific error.</p>
 *
 */
export interface MalformedPolicyDocumentException
  extends _smithy.SmithyException,
    $MetadataBearer {
  __type: "MalformedPolicyDocumentException";
  name: "MalformedPolicyDocumentException";
  $fault: "client";
  message?: string;
}

export namespace MalformedPolicyDocumentException {
  export function isa(o: any): o is MalformedPolicyDocumentException {
    return _smithy.isa(o, "MalformedPolicyDocumentException");
  }
}

/**
 *
 *         <p>The request was rejected because the total packed size of the session policies and
 *             session tags combined was too large. An AWS conversion compresses the session policy
 *             document, session policy ARNs, and session tags into a packed binary format that has a
 *             separate limit. The error message indicates by percentage how close the policies and
 *             tags are to the upper size limit. For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html">Passing Session Tags in STS</a> in
 *             the <i>IAM User Guide</i>.</p>
 *         <p>You could receive this error even though you meet other defined session policy and
 *             session tag limits. For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_enable-regions.html">IAM and STS Entity
 *                 Character Limits</a> in the <i>IAM User Guide</i>.</p>
 *
 */
export interface PackedPolicyTooLargeException
  extends _smithy.SmithyException,
    $MetadataBearer {
  __type: "PackedPolicyTooLargeException";
  name: "PackedPolicyTooLargeException";
  $fault: "client";
  message?: string;
}

export namespace PackedPolicyTooLargeException {
  export function isa(o: any): o is PackedPolicyTooLargeException {
    return _smithy.isa(o, "PackedPolicyTooLargeException");
  }
}

/**
 *
 *          <p>A reference to the IAM managed policy that is passed as a session policy for a role
 *          session or a federated user session.</p>
 *
 */
export interface PolicyDescriptorType {
  __type?: "PolicyDescriptorType";
  /**
   *
   *          <p>The Amazon Resource Name (ARN) of the IAM managed policy to use as a session policy
   *          for the role. For more information about ARNs, see <a href="https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html">Amazon Resource Names (ARNs) and AWS
   *             Service Namespaces</a> in the <i>AWS General Reference</i>.</p>
   *
   */
  arn?: string;
}

export namespace PolicyDescriptorType {
  export function isa(o: any): o is PolicyDescriptorType {
    return _smithy.isa(o, "PolicyDescriptorType");
  }
}

/**
 *
 *         <p>STS is not activated in the requested region for the account that is being asked to
 *             generate credentials. The account administrator must use the IAM console to activate STS
 *             in that region. For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_enable-regions.html">Activating and
 *                 Deactivating AWS STS in an AWS Region</a> in the <i>IAM User
 *                 Guide</i>.</p>
 *
 */
export interface RegionDisabledException
  extends _smithy.SmithyException,
    $MetadataBearer {
  __type: "RegionDisabledException";
  name: "RegionDisabledException";
  $fault: "client";
  message?: string;
}

export namespace RegionDisabledException {
  export function isa(o: any): o is RegionDisabledException {
    return _smithy.isa(o, "RegionDisabledException");
  }
}

/**
 *
 *          <p>You can pass custom key-value pair attributes when you assume a role or federate a user.
 *          These are called session tags. You can then use the session tags to control access to
 *          resources. For more information, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html">Tagging AWS STS Sessions</a> in the
 *             <i>IAM User Guide</i>.</p>
 *
 */
export interface Tag {
  __type?: "Tag";
  /**
   *
   *          <p>The key for a session tag.</p>
   *          <p>You can pass up to 50 session tags. The plain text session tag keys can’t exceed 128
   *          characters. For these and additional limits, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-limits.html#reference_iam-limits-entity-length">IAM
   *             and STS Character Limits</a> in the <i>IAM User Guide</i>.</p>
   *
   */
  Key: string | undefined;

  /**
   *
   *          <p>The value for a session tag.</p>
   *          <p>You can pass up to 50 session tags. The plain text session tag values can’t exceed 256
   *          characters. For these and additional limits, see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-limits.html#reference_iam-limits-entity-length">IAM
   *             and STS Character Limits</a> in the <i>IAM User Guide</i>.</p>
   *
   */
  Value: string | undefined;
}

export namespace Tag {
  export function isa(o: any): o is Tag {
    return _smithy.isa(o, "Tag");
  }
}
