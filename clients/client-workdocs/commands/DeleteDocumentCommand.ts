import {
  ServiceInputTypes,
  ServiceOutputTypes,
  WorkDocsClientResolvedConfig
} from "../WorkDocsClient";
import { DeleteDocumentRequest } from "../models/index";
import {
  deserializeAws_restJson1_1DeleteDocumentCommand,
  serializeAws_restJson1_1DeleteDocumentCommand
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
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer
} from "@aws-sdk/types";

export type DeleteDocumentCommandInput = DeleteDocumentRequest;
export type DeleteDocumentCommandOutput = __MetadataBearer;

export class DeleteDocumentCommand extends $Command<
  DeleteDocumentCommandInput,
  DeleteDocumentCommandOutput,
  WorkDocsClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DeleteDocumentCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: WorkDocsClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<DeleteDocumentCommandInput, DeleteDocumentCommandOutput> {
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
    input: DeleteDocumentCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1_1DeleteDocumentCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<DeleteDocumentCommandOutput> {
    return deserializeAws_restJson1_1DeleteDocumentCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
