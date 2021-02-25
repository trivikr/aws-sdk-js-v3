/*
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

package software.amazon.smithy.aws.typescript.codegen;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import software.amazon.smithy.codegen.core.Symbol;
import software.amazon.smithy.codegen.core.SymbolProvider;
import software.amazon.smithy.model.Model;
import software.amazon.smithy.model.knowledge.OperationIndex;
import software.amazon.smithy.model.shapes.MemberShape;
import software.amazon.smithy.model.shapes.OperationShape;
import software.amazon.smithy.model.shapes.ServiceShape;
import software.amazon.smithy.model.shapes.Shape;
import software.amazon.smithy.model.shapes.StructureShape;
import software.amazon.smithy.model.traits.StreamingTrait;
import software.amazon.smithy.typescript.codegen.integration.ProtocolGenerator;
import software.amazon.smithy.typescript.codegen.integration.RuntimeClientPlugin;
import software.amazon.smithy.typescript.codegen.TypeScriptSettings;
import software.amazon.smithy.typescript.codegen.TypeScriptWriter;
import software.amazon.smithy.utils.OptionalUtils;

final class DocumentClientCommandGenerator implements Runnable {
    private final TypeScriptSettings settings;
    private final Model model;
    private final ServiceShape service;
    private final OperationShape operation;
    private final SymbolProvider symbolProvider;
    private final TypeScriptWriter writer;
    private final Symbol symbol;
    private final OperationIndex operationIndex;
    private final Symbol inputType;
    private final List<MemberShape> inputMembersWithAttr;
    private final Symbol outputType;
    private final List<MemberShape> outputMembersWithAttr;

    DocumentClientCommandGenerator(
            TypeScriptSettings settings,
            Model model,
            OperationShape operation,
            SymbolProvider symbolProvider,
            TypeScriptWriter writer
    ) {
        this.settings = settings;
        this.model = model;
        this.service = settings.getService(model);
        this.operation = operation;
        this.symbolProvider = symbolProvider;
        this.writer = writer;

        symbol = symbolProvider.toSymbol(operation);
        operationIndex = OperationIndex.of(model);
        inputType = symbol.expectProperty("inputType", Symbol.class);
        inputMembersWithAttr = getMembersWithAttr(operationIndex.getInput(operation));
        outputType = symbol.expectProperty("outputType", Symbol.class);
        outputMembersWithAttr = getMembersWithAttr(operationIndex.getOutput(operation));
    }

    @Override
    public void run() {
        String serviceName = "DynamoDBDocumentClient";
        String configType = serviceName + "ResolvedConfig";

        // Add required imports.
        writer.addImport(configType, configType, serviceName);
        writer.addImport("ServiceInputTypes", "ServiceInputTypes", "@aws-sdk/client-dynamodb");
        writer.addImport("ServiceOutputTypes", "ServiceOutputTypes", "@aws-sdk/client-dynamodb");
        writer.addImport("Command", "$Command", "@aws-sdk/smithy-client");
        writer.addImport("Handler", "Handler", "@aws-sdk/types");
        writer.addImport("MiddlewareStack", "MiddlewareStack", "@aws-sdk/types");
        writer.addImport("marshall", "marshall", "@aws-sdk/util-dynamodb");
        writer.addImport("NativeAttributeValue", "NativeAttributeValue", "@aws-sdk/util-dynamodb");
        writer.addImport("unmarshall", "unmarshall", "@aws-sdk/util-dynamodb");

        addInputAndOutputTypes();

        // String name = symbol.getName();
        // writer.writeShapeDocs(operation);
        // writer.openBlock("export class $L extends $$Command<$T, $T, $L> {", "}", name, inputType, outputType,
        //         configType, () -> {

        //     // Section for adding custom command properties.
        //     writer.write("// Start section: $L", COMMAND_PROPERTIES_SECTION);
        //     writer.pushState(COMMAND_PROPERTIES_SECTION).popState();
        //     writer.write("// End section: $L", COMMAND_PROPERTIES_SECTION);
        //     writer.write("");

        //     generateCommandConstructor();
        //     writer.write("");
        //     generateCommandMiddlewareResolver(configType);
        //     writeSerde();

        //     // Hook for adding more methods to the command.
        //     writer.write("// Start section: $L", COMMAND_BODY_EXTRA_SECTION)
        //             .pushState(COMMAND_BODY_EXTRA_SECTION)
        //             .popState()
        //             .write("// End section: $L", COMMAND_BODY_EXTRA_SECTION);
        // });
    }

    private void generateCommandConstructor() {
        // writer.openBlock("constructor(readonly input: $T) {", "}", inputType, () -> {
        //     // The constructor can be intercepted and changed.
        //     writer.write("// Start section: $L", COMMAND_CONSTRUCTOR_SECTION)
        //             .pushState(COMMAND_CONSTRUCTOR_SECTION)
        //             .write("super();")
        //             .popState()
        //             .write("// End section: $L", COMMAND_CONSTRUCTOR_SECTION);
        // });
    }

    private void generateCommandMiddlewareResolver(String configType) {
        // Symbol serde = TypeScriptDependency.MIDDLEWARE_SERDE.createSymbol("getSerdePlugin");
        // writer.writeDocs("@internal");
        // writer.write("resolveMiddleware(")
        //         .indent()
        //         .write("clientStack: MiddlewareStack<$L, $L>,", "ServiceInputTypes", "ServiceOutputTypes")
        //         .write("configuration: $L,", configType)
        //         .write("options?: $T", applicationProtocol.getOptionsType())
        //         .dedent();
        // writer.openBlock("): Handler<$T, $T> {", "}", inputType, outputType, () -> {
        //     // Add serialization and deserialization plugin.
        //     writer.write("this.middlewareStack.use($T(configuration, this.serialize, this.deserialize));", serde);

        //     // Add customizations.
        //     addCommandSpecificPlugins();

        //     // Resolve the middleware stack.
        //     writer.write("\nconst stack = clientStack.concat(this.middlewareStack);\n");
        //     writer.write("const { logger } = configuration;");
        //     writer.write("const clientName = $S;", symbolProvider.toSymbol(service).getName());
        //     writer.write("const commandName = $S;", symbolProvider.toSymbol(operation).getName());
        //     writer.openBlock("const handlerExecutionContext: HandlerExecutionContext = {", "}", () -> {
        //         writer.write("logger,");
        //         writer.write("clientName,");
        //         writer.write("commandName,");
        //         writer.openBlock("inputFilterSensitiveLog: ", ",", () -> {
        //             OptionalUtils.ifPresentOrElse(operationIndex.getInput(operation),
        //                 input -> writer.writeInline("$T.filterSensitiveLog", symbolProvider.toSymbol(input)),
        //                 () -> writer.writeInline("(input: any) => input"));
        //         });
        //         writer.openBlock("outputFilterSensitiveLog: ", ",", () -> {
        //             OptionalUtils.ifPresentOrElse(operationIndex.getOutput(operation),
        //                 output -> writer.writeInline("$T.filterSensitiveLog", symbolProvider.toSymbol(output)),
        //                 () -> writer.writeInline("(output: any) => output"));
        //         });
        //     });
        //     writer.write("const { requestHandler } = configuration;");
        //     writer.openBlock("return stack.resolve(", ");", () -> {
        //         writer.write("(request: FinalizeHandlerArguments<any>) => ");
        //         writer.write("  requestHandler.handle(request.request as $T, options || {}),",
        //                      applicationProtocol.getRequestType());
        //         writer.write("handlerExecutionContext");
        //     });
        // });
    }

    private void addInputAndOutputTypes() {
        writer.write("");
        writeType(inputType.getName(), operationIndex.getInput(operation), inputMembersWithAttr);
        writeType(outputType.getName(), operationIndex.getOutput(operation), outputMembersWithAttr);
        writer.write("");
    }

    private List<MemberShape> getMembersWithAttr(Optional<StructureShape> optionalShape) {
        List<MemberShape> membersWithAttr = new ArrayList<>();
        if (DocumentClientUtils.containsAttributeValue(model, symbolProvider, optionalShape)) {
            StructureShape shape = optionalShape.get();
            for (MemberShape member : shape.getAllMembers().values()) {
                if (DocumentClientUtils.containsAttributeValue(model, symbolProvider, member, new HashSet<String>())) {
                    membersWithAttr.add(member);
                }
            }
        }
        return membersWithAttr;
    }

    private void writeType(String typeName, Optional<StructureShape> optionalShape, List<MemberShape> membersWithAttr) {
        if (optionalShape.isPresent()) {
            writer.addImport(typeName, "__" + typeName, "@aws-sdk/client-dynamodb");
            String modifiedTypeName = DocumentClientUtils.getModifiedName(typeName);
            if (membersWithAttr.isEmpty()) {
                writer.write("export type $L = __$L;", modifiedTypeName, typeName);
            } else {
                String memberUnionToOmit = membersWithAttr.stream()
                    .map(member -> "'" + symbolProvider.toMemberName(member) + "'")
                    .collect(Collectors.joining(" | "));
                writer.write("export type $L = Omit<__$L, $L>;", modifiedTypeName, typeName, memberUnionToOmit);
            }
        } else {
            // If the input is non-existent, then use an empty object.
            writer.write("export type $L = {}", typeName);
        }
    }
}
