import {
  AmplifyClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../AmplifyClient";
import { GetArtifactUrlRequest, GetArtifactUrlResult } from "../models/index";
import {
  deserializeAws_restJson1_1GetArtifactUrlCommand,
  serializeAws_restJson1_1GetArtifactUrlCommand
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
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  SerdeContext as __SerdeContext
} from "@aws-sdk/types";

export type GetArtifactUrlCommandInput = GetArtifactUrlRequest;
export type GetArtifactUrlCommandOutput = GetArtifactUrlResult &
  __MetadataBearer;

export class GetArtifactUrlCommand extends $Command<
  GetArtifactUrlCommandInput,
  GetArtifactUrlCommandOutput,
  AmplifyClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetArtifactUrlCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: AmplifyClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<GetArtifactUrlCommandInput, GetArtifactUrlCommandOutput> {
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
    input: GetArtifactUrlCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1_1GetArtifactUrlCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<GetArtifactUrlCommandOutput> {
    return deserializeAws_restJson1_1GetArtifactUrlCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
