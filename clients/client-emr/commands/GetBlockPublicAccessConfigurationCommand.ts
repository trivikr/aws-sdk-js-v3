import {
  EMRClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes
} from "../EMRClient";
import {
  GetBlockPublicAccessConfigurationInput,
  GetBlockPublicAccessConfigurationOutput
} from "../models/index";
import {
  deserializeAws_json1_1GetBlockPublicAccessConfigurationCommand,
  serializeAws_json1_1GetBlockPublicAccessConfigurationCommand
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

export type GetBlockPublicAccessConfigurationCommandInput = GetBlockPublicAccessConfigurationInput;
export type GetBlockPublicAccessConfigurationCommandOutput = GetBlockPublicAccessConfigurationOutput;

export class GetBlockPublicAccessConfigurationCommand extends $Command<
  GetBlockPublicAccessConfigurationCommandInput,
  GetBlockPublicAccessConfigurationCommandOutput,
  EMRClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetBlockPublicAccessConfigurationCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: EMRClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<
    GetBlockPublicAccessConfigurationCommandInput,
    GetBlockPublicAccessConfigurationCommandOutput
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
    input: GetBlockPublicAccessConfigurationCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_json1_1GetBlockPublicAccessConfigurationCommand(
      input,
      context
    );
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<GetBlockPublicAccessConfigurationCommandOutput> {
    return deserializeAws_json1_1GetBlockPublicAccessConfigurationCommand(
      output,
      context
    );
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
