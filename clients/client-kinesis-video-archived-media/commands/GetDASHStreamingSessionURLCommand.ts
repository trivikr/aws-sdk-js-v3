import {
  KinesisVideoArchivedMediaClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../KinesisVideoArchivedMediaClient";
import {
  GetDASHStreamingSessionURLInput,
  GetDASHStreamingSessionURLOutput
} from "../models/index";
import {
  deserializeAws_restJson1_1GetDASHStreamingSessionURLCommand,
  serializeAws_restJson1_1GetDASHStreamingSessionURLCommand
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

export type GetDASHStreamingSessionURLCommandInput = GetDASHStreamingSessionURLInput;
export type GetDASHStreamingSessionURLCommandOutput = GetDASHStreamingSessionURLOutput;

export class GetDASHStreamingSessionURLCommand extends $Command<
  GetDASHStreamingSessionURLCommandInput,
  GetDASHStreamingSessionURLCommandOutput,
  KinesisVideoArchivedMediaClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetDASHStreamingSessionURLCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: KinesisVideoArchivedMediaClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<
    GetDASHStreamingSessionURLCommandInput,
    GetDASHStreamingSessionURLCommandOutput
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
    input: GetDASHStreamingSessionURLCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1_1GetDASHStreamingSessionURLCommand(
      input,
      context
    );
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<GetDASHStreamingSessionURLCommandOutput> {
    return deserializeAws_restJson1_1GetDASHStreamingSessionURLCommand(
      output,
      context
    );
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
