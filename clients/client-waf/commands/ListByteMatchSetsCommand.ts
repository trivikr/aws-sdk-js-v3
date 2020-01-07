import {
  ServiceInputTypes,
  ServiceOutputTypes,
  WAFClientResolvedConfig
} from "../WAFClient";
import {
  ListByteMatchSetsRequest,
  ListByteMatchSetsResponse
} from "../models/index";
import {
  deserializeAws_json1_1ListByteMatchSetsCommand,
  serializeAws_json1_1ListByteMatchSetsCommand
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

export type ListByteMatchSetsCommandInput = ListByteMatchSetsRequest;
export type ListByteMatchSetsCommandOutput = ListByteMatchSetsResponse;

export class ListByteMatchSetsCommand extends $Command<
  ListByteMatchSetsCommandInput,
  ListByteMatchSetsCommandOutput,
  WAFClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListByteMatchSetsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: WAFClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ListByteMatchSetsCommandInput, ListByteMatchSetsCommandOutput> {
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
    input: ListByteMatchSetsCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_json1_1ListByteMatchSetsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<ListByteMatchSetsCommandOutput> {
    return deserializeAws_json1_1ListByteMatchSetsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
