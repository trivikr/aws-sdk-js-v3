"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Aws_restJson1_1_1 = require("../protocols/Aws_restJson1_1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
class DeleteFlowCommand extends smithy_client_1.Command {
    // Start section: command_properties
    // End section: command_properties
    constructor(input) {
        // Start section: command_constructor
        super();
        this.input = input;
        // End section: command_constructor
    }
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(middleware_serde_1.getSerdePlugin(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const handlerExecutionContext = {
            logger: {}
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restJson1_1_1.serializeAws_restJson1_1DeleteFlowCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restJson1_1_1.deserializeAws_restJson1_1DeleteFlowCommand(output, context);
    }
}
exports.DeleteFlowCommand = DeleteFlowCommand;
//# sourceMappingURL=DeleteFlowCommand.js.map