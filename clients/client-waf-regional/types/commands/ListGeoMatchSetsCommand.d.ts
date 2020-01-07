import { ServiceInputTypes, ServiceOutputTypes, WAFRegionalClientResolvedConfig } from "../WAFRegionalClient";
import { ListGeoMatchSetsRequest, ListGeoMatchSetsResponse } from "../models/index";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type ListGeoMatchSetsCommandInput = ListGeoMatchSetsRequest;
export declare type ListGeoMatchSetsCommandOutput = ListGeoMatchSetsResponse & __MetadataBearer;
export declare class ListGeoMatchSetsCommand extends $Command<ListGeoMatchSetsCommandInput, ListGeoMatchSetsCommandOutput, WAFRegionalClientResolvedConfig> {
    readonly input: ListGeoMatchSetsCommandInput;
    constructor(input: ListGeoMatchSetsCommandInput);
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: WAFRegionalClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListGeoMatchSetsCommandInput, ListGeoMatchSetsCommandOutput>;
    private serialize;
    private deserialize;
}
