import {
  AutoScalingClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../AutoScalingClient";
import {
  DescribeLifecycleHooksAnswer,
  DescribeLifecycleHooksType
} from "../models/index";
import {
  deserializeAws_queryDescribeLifecycleHooksCommand,
  serializeAws_queryDescribeLifecycleHooksCommand
} from "../protocols/Aws_query";
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

export type DescribeLifecycleHooksCommandInput = DescribeLifecycleHooksType;
export type DescribeLifecycleHooksCommandOutput = DescribeLifecycleHooksAnswer;

export class DescribeLifecycleHooksCommand extends $Command<
  DescribeLifecycleHooksCommandInput,
  DescribeLifecycleHooksCommandOutput,
  AutoScalingClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DescribeLifecycleHooksCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: AutoScalingClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<
    DescribeLifecycleHooksCommandInput,
    DescribeLifecycleHooksCommandOutput
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
    input: DescribeLifecycleHooksCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_queryDescribeLifecycleHooksCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<DescribeLifecycleHooksCommandOutput> {
    return deserializeAws_queryDescribeLifecycleHooksCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
