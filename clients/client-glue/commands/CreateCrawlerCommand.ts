import {
  GlueClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../GlueClient";
import { CreateCrawlerRequest, CreateCrawlerResponse } from "../models/index";
import {
  deserializeAws_json1_1CreateCrawlerCommand,
  serializeAws_json1_1CreateCrawlerCommand
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

export type CreateCrawlerCommandInput = CreateCrawlerRequest;
export type CreateCrawlerCommandOutput = CreateCrawlerResponse;

export class CreateCrawlerCommand extends $Command<
  CreateCrawlerCommandInput,
  CreateCrawlerCommandOutput,
  GlueClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateCrawlerCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: GlueClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<CreateCrawlerCommandInput, CreateCrawlerCommandOutput> {
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
    input: CreateCrawlerCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_json1_1CreateCrawlerCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<CreateCrawlerCommandOutput> {
    return deserializeAws_json1_1CreateCrawlerCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
