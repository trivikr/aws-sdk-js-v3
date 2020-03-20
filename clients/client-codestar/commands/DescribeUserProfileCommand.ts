import {
  CodeStarClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../CodeStarClient";
import {
  DescribeUserProfileRequest,
  DescribeUserProfileResult
} from "../models/index";
import {
  deserializeAws_json1_1DescribeUserProfileCommand,
  serializeAws_json1_1DescribeUserProfileCommand
} from "../protocols/Aws_json1_1";
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
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  SerdeContext as __SerdeContext
} from "@aws-sdk/types";

export type DescribeUserProfileCommandInput = DescribeUserProfileRequest;
export type DescribeUserProfileCommandOutput = DescribeUserProfileResult &
  __MetadataBearer;

export class DescribeUserProfileCommand extends $Command<
  DescribeUserProfileCommandInput,
  DescribeUserProfileCommandOutput,
  CodeStarClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DescribeUserProfileCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: CodeStarClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<
    DescribeUserProfileCommandInput,
    DescribeUserProfileCommandOutput
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
    input: DescribeUserProfileCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_json1_1DescribeUserProfileCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<DescribeUserProfileCommandOutput> {
    return deserializeAws_json1_1DescribeUserProfileCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
