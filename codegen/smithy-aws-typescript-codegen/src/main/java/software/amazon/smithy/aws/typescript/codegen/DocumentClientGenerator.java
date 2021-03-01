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
import software.amazon.smithy.codegen.core.CodegenException;
import software.amazon.smithy.codegen.core.Symbol;
import software.amazon.smithy.codegen.core.SymbolProvider;
import software.amazon.smithy.model.Model;
import software.amazon.smithy.model.knowledge.OperationIndex;
import software.amazon.smithy.model.shapes.CollectionShape;
import software.amazon.smithy.model.shapes.MapShape;
import software.amazon.smithy.model.shapes.MemberShape;
import software.amazon.smithy.model.shapes.OperationShape;
import software.amazon.smithy.model.shapes.ServiceShape;
import software.amazon.smithy.model.shapes.Shape;
import software.amazon.smithy.model.shapes.StructureShape;
import software.amazon.smithy.model.traits.IdempotencyTokenTrait;
import software.amazon.smithy.model.traits.StreamingTrait;
import software.amazon.smithy.typescript.codegen.ApplicationProtocol;
import software.amazon.smithy.typescript.codegen.integration.ProtocolGenerator;
import software.amazon.smithy.typescript.codegen.integration.RuntimeClientPlugin;
import software.amazon.smithy.typescript.codegen.TypeScriptSettings;
import software.amazon.smithy.typescript.codegen.TypeScriptWriter;
import software.amazon.smithy.utils.OptionalUtils;

final class DocumentClientGenerator implements Runnable {
    static final String CLIENT_CONFIG_SECTION = "client_config";
    static final String CLIENT_PROPERTIES_SECTION = "client_properties";
    static final String CLIENT_CONSTRUCTOR_SECTION = "client_constructor";
    static final String CLIENT_DESTROY_SECTION = "client_destroy";

    private final TypeScriptSettings settings;
    private final Model model;
    private final ServiceShape service;
    private final SymbolProvider symbolProvider;
    private final TypeScriptWriter writer;
    private final Symbol symbol;

    DocumentClientGenerator(
            TypeScriptSettings settings,
            Model model,
            SymbolProvider symbolProvider,
            TypeScriptWriter writer
    ) {
        this.settings = settings;
        this.model = model;
        this.service = settings.getService(model);
        this.symbolProvider = symbolProvider;
        this.writer = writer;

        symbol = symbolProvider.toSymbol(service);
    }

    static String getResolvedConfigTypeName(Symbol symbol) {
        return symbol.getName() + "ResolvedConfig";
    }

    @Override
    public void run() {
        String serviceName = "DynamoDBDocumentClient";
        String configType = serviceName + "ResolvedConfig";
        String originalServiceName = symbol.getName();
        String originalConfigType = getResolvedConfigTypeName(symbol);
        String serviceInputTypes= "ServiceInputTypes";
        String serviceOutputTypes= "ServiceOutputTypes";

        // Add required imports.
        writer.addImport(originalServiceName, originalServiceName, "@aws-sdk/client-dynamodb");
        writer.addImport(originalConfigType, originalConfigType, "@aws-sdk/client-dynamodb");
        writer.addImport(serviceInputTypes, serviceInputTypes, "@aws-sdk/client-dynamodb");
        writer.addImport(serviceOutputTypes, serviceOutputTypes, "@aws-sdk/client-dynamodb");
        writer.addImport("Client", "__Client", "@aws-sdk/smithy-client");
        
        writer.addImport("unmarshallOptions", "unmarshallOptions", "@aws-sdk/util-dynamodb");

        addConfiguration(configType, originalConfigType);

        writer.openBlock("export class $L extends __Client<$T, $L, $L, $L> {", "}",
            serviceName, ApplicationProtocol.createDefaultHttpApplicationProtocol().getOptionsType(),
            serviceInputTypes, serviceOutputTypes, configType, () -> {

            addClientProperties(configType);
            addClientConstructor();
            writer.write("");
            // generateStaticFactoryFrom();
            // generateDestroy();
        });
    }

	private void addClientProperties(String configType) {
        writer.pushState(CLIENT_PROPERTIES_SECTION);
        writer.write("readonly config: $L;\n", configType);
        writer.popState();
	}

	private void addClientConstructor() {
        writer.openBlock("protected constructor(client: $L, translateConfig?: TranslateConfig){", "}",
            symbol.getName(), () -> {
                writer.pushState(CLIENT_CONSTRUCTOR_SECTION);
                writer.write("super(client.config);");
                writer.write("this.config = client.config;");
                writer.write("this.config.translateConfig = translateConfig;");
                writer.write("this.middlewareStack = client.middlewareStack;");
                writer.popState();
            });
	}

	private void addConfiguration(String configType, String originalConfigType) {
        writer.pushState(CLIENT_CONFIG_SECTION);
        writer.openBlock("export type TranslateConfig = {", "}", () -> {
            addTranslateConfigOption("marshallOptions");
            addTranslateConfigOption("unmarshallOptions");
        });
        writer.write("");
        writer.openBlock("export type $L = $L & {", "};", configType, originalConfigType, () -> {
            writer.write("translateConfig?: TranslateConfig;");
        });
        writer.write("");
        writer.popState();
	}

	private void addTranslateConfigOption(String translateOption) {
        writer.addImport(translateOption, translateOption, "@aws-sdk/util-dynamodb");
        writer.write("${1L}?: ${1L};", translateOption);
	}

    
}
