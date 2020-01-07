import {
  SFNClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../SFNClient";
import { SendTaskFailureInput, SendTaskFailureOutput } from "../models/index";
import {
  deserializeAws_json1_0SendTaskFailureCommand,
  serializeAws_json1_0SendTaskFailureCommand
} from "../protocols/Aws_json1_0";
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

export type SendTaskFailureCommandInput = SendTaskFailureInput;
export type SendTaskFailureCommandOutput = SendTaskFailureOutput;

export class SendTaskFailureCommand extends $Command<
  SendTaskFailureCommandInput,
  SendTaskFailureCommandOutput,
  SFNClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: SendTaskFailureCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: SFNClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<SendTaskFailureCommandInput, SendTaskFailureCommandOutput> {
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
    input: SendTaskFailureCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_json1_0SendTaskFailureCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<SendTaskFailureCommandOutput> {
    return deserializeAws_json1_0SendTaskFailureCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
