import { AppStreamClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../AppStreamClient";
import { UntagResourceRequest, UntagResourceResponse } from "../models/index";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type UntagResourceCommandInput = UntagResourceRequest;
export declare type UntagResourceCommandOutput = UntagResourceResponse & __MetadataBearer;
export declare class UntagResourceCommand extends $Command<UntagResourceCommandInput, UntagResourceCommandOutput, AppStreamClientResolvedConfig> {
    readonly input: UntagResourceCommandInput;
    constructor(input: UntagResourceCommandInput);
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: AppStreamClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UntagResourceCommandInput, UntagResourceCommandOutput>;
    private serialize;
    private deserialize;
}
