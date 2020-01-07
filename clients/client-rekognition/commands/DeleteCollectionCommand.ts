import {
  RekognitionClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../RekognitionClient";
import {
  DeleteCollectionRequest,
  DeleteCollectionResponse
} from "../models/index";
import {
  deserializeAws_json1_1DeleteCollectionCommand,
  serializeAws_json1_1DeleteCollectionCommand
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

export type DeleteCollectionCommandInput = DeleteCollectionRequest;
export type DeleteCollectionCommandOutput = DeleteCollectionResponse;

export class DeleteCollectionCommand extends $Command<
  DeleteCollectionCommandInput,
  DeleteCollectionCommandOutput,
  RekognitionClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DeleteCollectionCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: RekognitionClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<DeleteCollectionCommandInput, DeleteCollectionCommandOutput> {
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
    input: DeleteCollectionCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_json1_1DeleteCollectionCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<DeleteCollectionCommandOutput> {
    return deserializeAws_json1_1DeleteCollectionCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
