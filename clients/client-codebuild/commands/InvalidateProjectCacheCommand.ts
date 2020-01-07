import {
  CodeBuildClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../CodeBuildClient";
import {
  InvalidateProjectCacheInput,
  InvalidateProjectCacheOutput
} from "../models/index";
import {
  deserializeAws_json1_1InvalidateProjectCacheCommand,
  serializeAws_json1_1InvalidateProjectCacheCommand
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
  SerdeContext,
  HttpHandlerOptions as __HttpHandlerOptions
} from "@aws-sdk/types";

export type InvalidateProjectCacheCommandInput = InvalidateProjectCacheInput;
export type InvalidateProjectCacheCommandOutput = InvalidateProjectCacheOutput;

export class InvalidateProjectCacheCommand extends $Command<
  InvalidateProjectCacheCommandInput,
  InvalidateProjectCacheCommandOutput,
  CodeBuildClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: InvalidateProjectCacheCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: CodeBuildClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<
    InvalidateProjectCacheCommandInput,
    InvalidateProjectCacheCommandOutput
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
    input: InvalidateProjectCacheCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_json1_1InvalidateProjectCacheCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<InvalidateProjectCacheCommandOutput> {
    return deserializeAws_json1_1InvalidateProjectCacheCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
