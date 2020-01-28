import {
  EC2ClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../EC2Client";
import {
  DisableVpcClassicLinkDnsSupportRequest,
  DisableVpcClassicLinkDnsSupportResult
} from "../models/index";
import {
  deserializeAws_ec2DisableVpcClassicLinkDnsSupportCommand,
  serializeAws_ec2DisableVpcClassicLinkDnsSupportCommand
} from "../protocols/Aws_ec2";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import {
  HttpRequest as __HttpRequest,
  HttpResponse as __HttpResponse
} from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  MiddlewareStack,
  SerdeContext,
  HttpHandlerOptions as __HttpHandlerOptions
} from "@aws-sdk/types";

export type DisableVpcClassicLinkDnsSupportCommandInput = DisableVpcClassicLinkDnsSupportRequest;
export type DisableVpcClassicLinkDnsSupportCommandOutput = DisableVpcClassicLinkDnsSupportResult;

export class DisableVpcClassicLinkDnsSupportCommand extends $Command<
  DisableVpcClassicLinkDnsSupportCommandInput,
  DisableVpcClassicLinkDnsSupportCommandOutput,
  EC2ClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DisableVpcClassicLinkDnsSupportCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: EC2ClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<
    DisableVpcClassicLinkDnsSupportCommandInput,
    DisableVpcClassicLinkDnsSupportCommandOutput
  > {
    this.middlewareStack.use(
      getSerdePlugin(configuration, this.serialize, this.deserialize)
    );

    const stack = clientStack.concat(this.middlewareStack);

    const handlerExecutionContext: HandlerExecutionContext = {
      logger: {} as any
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: DisableVpcClassicLinkDnsSupportCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_ec2DisableVpcClassicLinkDnsSupportCommand(
      input,
      context
    );
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<DisableVpcClassicLinkDnsSupportCommandOutput> {
    return deserializeAws_ec2DisableVpcClassicLinkDnsSupportCommand(
      output,
      context
    );
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
