import { CloudWatchEventsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudWatchEventsClient";
import { ListRuleNamesByTargetRequest, ListRuleNamesByTargetResponse } from "../models/index";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListRuleNamesByTargetCommandInput = ListRuleNamesByTargetRequest;
export declare type ListRuleNamesByTargetCommandOutput = ListRuleNamesByTargetResponse & __MetadataBearer;
export declare class ListRuleNamesByTargetCommand extends $Command<ListRuleNamesByTargetCommandInput, ListRuleNamesByTargetCommandOutput, CloudWatchEventsClientResolvedConfig> {
    readonly input: ListRuleNamesByTargetCommandInput;
    constructor(input: ListRuleNamesByTargetCommandInput);
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudWatchEventsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListRuleNamesByTargetCommandInput, ListRuleNamesByTargetCommandOutput>;
    private serialize;
    private deserialize;
}
