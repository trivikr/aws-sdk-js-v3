import {
  DLMClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../DLMClient";
import {
  GetLifecyclePolicyRequest,
  GetLifecyclePolicyResponse
} from "../models/index";
import {
  deserializeAws_restJson1_1GetLifecyclePolicyCommand,
  serializeAws_restJson1_1GetLifecyclePolicyCommand
} from "../protocols/Aws_restJson1_1";
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

export type GetLifecyclePolicyCommandInput = GetLifecyclePolicyRequest;
export type GetLifecyclePolicyCommandOutput = GetLifecyclePolicyResponse;

export class GetLifecyclePolicyCommand extends $Command<
  GetLifecyclePolicyCommandInput,
  GetLifecyclePolicyCommandOutput,
  DLMClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetLifecyclePolicyCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: DLMClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<GetLifecyclePolicyCommandInput, GetLifecyclePolicyCommandOutput> {
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
    input: GetLifecyclePolicyCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1_1GetLifecyclePolicyCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<GetLifecyclePolicyCommandOutput> {
    return deserializeAws_restJson1_1GetLifecyclePolicyCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
