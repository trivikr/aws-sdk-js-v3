import {
  QLDBClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../QLDBClient";
import {
  ListJournalS3ExportsRequest,
  ListJournalS3ExportsResponse
} from "../models/index";
import {
  deserializeAws_restJson1_1ListJournalS3ExportsCommand,
  serializeAws_restJson1_1ListJournalS3ExportsCommand
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

export type ListJournalS3ExportsCommandInput = ListJournalS3ExportsRequest;
export type ListJournalS3ExportsCommandOutput = ListJournalS3ExportsResponse;

export class ListJournalS3ExportsCommand extends $Command<
  ListJournalS3ExportsCommandInput,
  ListJournalS3ExportsCommandOutput,
  QLDBClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListJournalS3ExportsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: QLDBClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<
    ListJournalS3ExportsCommandInput,
    ListJournalS3ExportsCommandOutput
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
    input: ListJournalS3ExportsCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1_1ListJournalS3ExportsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<ListJournalS3ExportsCommandOutput> {
    return deserializeAws_restJson1_1ListJournalS3ExportsCommand(
      output,
      context
    );
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
