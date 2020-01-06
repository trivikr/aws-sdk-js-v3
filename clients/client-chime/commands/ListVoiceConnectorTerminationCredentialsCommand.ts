import {
  ChimeClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../ChimeClient";
import {
  ListVoiceConnectorTerminationCredentialsRequest,
  ListVoiceConnectorTerminationCredentialsResponse
} from "../models/index";
import {
  deserializeAws_restJson1_1ListVoiceConnectorTerminationCredentialsCommand,
  serializeAws_restJson1_1ListVoiceConnectorTerminationCredentialsCommand
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

export type ListVoiceConnectorTerminationCredentialsCommandInput = ListVoiceConnectorTerminationCredentialsRequest;
export type ListVoiceConnectorTerminationCredentialsCommandOutput = ListVoiceConnectorTerminationCredentialsResponse;

export class ListVoiceConnectorTerminationCredentialsCommand extends $Command<
  ListVoiceConnectorTerminationCredentialsCommandInput,
  ListVoiceConnectorTerminationCredentialsCommandOutput,
  ChimeClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(
    readonly input: ListVoiceConnectorTerminationCredentialsCommandInput
  ) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: ChimeClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<
    ListVoiceConnectorTerminationCredentialsCommandInput,
    ListVoiceConnectorTerminationCredentialsCommandOutput
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
    input: ListVoiceConnectorTerminationCredentialsCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1_1ListVoiceConnectorTerminationCredentialsCommand(
      input,
      context
    );
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<ListVoiceConnectorTerminationCredentialsCommandOutput> {
    return deserializeAws_restJson1_1ListVoiceConnectorTerminationCredentialsCommand(
      output,
      context
    );
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
