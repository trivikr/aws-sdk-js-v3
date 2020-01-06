import {
  ServiceInputTypes,
  ServiceOutputTypes,
  WorkDocsClientResolvedConfig
} from "../WorkDocsClient";
import {
  InitiateDocumentVersionUploadRequest,
  InitiateDocumentVersionUploadResponse
} from "../models/index";
import {
  deserializeAws_restJson1_1InitiateDocumentVersionUploadCommand,
  serializeAws_restJson1_1InitiateDocumentVersionUploadCommand
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

export type InitiateDocumentVersionUploadCommandInput = InitiateDocumentVersionUploadRequest;
export type InitiateDocumentVersionUploadCommandOutput = InitiateDocumentVersionUploadResponse;

export class InitiateDocumentVersionUploadCommand extends $Command<
  InitiateDocumentVersionUploadCommandInput,
  InitiateDocumentVersionUploadCommandOutput,
  WorkDocsClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: InitiateDocumentVersionUploadCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: WorkDocsClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<
    InitiateDocumentVersionUploadCommandInput,
    InitiateDocumentVersionUploadCommandOutput
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
    input: InitiateDocumentVersionUploadCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1_1InitiateDocumentVersionUploadCommand(
      input,
      context
    );
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<InitiateDocumentVersionUploadCommandOutput> {
    return deserializeAws_restJson1_1InitiateDocumentVersionUploadCommand(
      output,
      context
    );
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
