import {
  ServiceInputTypes,
  ServiceOutputTypes,
  WAFRegionalClientResolvedConfig
} from "../WAFRegionalClient";
import {
  DeleteRateBasedRuleRequest,
  DeleteRateBasedRuleResponse
} from "../models/index";
import {
  deserializeAws_json1_1DeleteRateBasedRuleCommand,
  serializeAws_json1_1DeleteRateBasedRuleCommand
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

export type DeleteRateBasedRuleCommandInput = DeleteRateBasedRuleRequest;
export type DeleteRateBasedRuleCommandOutput = DeleteRateBasedRuleResponse;

export class DeleteRateBasedRuleCommand extends $Command<
  DeleteRateBasedRuleCommandInput,
  DeleteRateBasedRuleCommandOutput,
  WAFRegionalClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: DeleteRateBasedRuleCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: WAFRegionalClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<
    DeleteRateBasedRuleCommandInput,
    DeleteRateBasedRuleCommandOutput
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
    input: DeleteRateBasedRuleCommandInput,
    context: SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_json1_1DeleteRateBasedRuleCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: SerdeContext
  ): Promise<DeleteRateBasedRuleCommandOutput> {
    return deserializeAws_json1_1DeleteRateBasedRuleCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
