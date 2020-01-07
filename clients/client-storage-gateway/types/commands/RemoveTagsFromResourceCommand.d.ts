import { ServiceInputTypes, ServiceOutputTypes, StorageGatewayClientResolvedConfig } from "../StorageGatewayClient";
import { RemoveTagsFromResourceInput, RemoveTagsFromResourceOutput } from "../models/index";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type RemoveTagsFromResourceCommandInput = RemoveTagsFromResourceInput;
export declare type RemoveTagsFromResourceCommandOutput = RemoveTagsFromResourceOutput & __MetadataBearer;
export declare class RemoveTagsFromResourceCommand extends $Command<RemoveTagsFromResourceCommandInput, RemoveTagsFromResourceCommandOutput, StorageGatewayClientResolvedConfig> {
    readonly input: RemoveTagsFromResourceCommandInput;
    constructor(input: RemoveTagsFromResourceCommandInput);
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: StorageGatewayClientResolvedConfig, options?: __HttpHandlerOptions): Handler<RemoveTagsFromResourceCommandInput, RemoveTagsFromResourceCommandOutput>;
    private serialize;
    private deserialize;
}
