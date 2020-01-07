import { ServiceInputTypes, ServiceOutputTypes, WAFClientResolvedConfig } from "../WAFClient";
import { DeleteGeoMatchSetRequest, DeleteGeoMatchSetResponse } from "../models/index";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DeleteGeoMatchSetCommandInput = DeleteGeoMatchSetRequest;
export declare type DeleteGeoMatchSetCommandOutput = DeleteGeoMatchSetResponse & __MetadataBearer;
export declare class DeleteGeoMatchSetCommand extends $Command<DeleteGeoMatchSetCommandInput, DeleteGeoMatchSetCommandOutput, WAFClientResolvedConfig> {
    readonly input: DeleteGeoMatchSetCommandInput;
    constructor(input: DeleteGeoMatchSetCommandInput);
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: WAFClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteGeoMatchSetCommandInput, DeleteGeoMatchSetCommandOutput>;
    private serialize;
    private deserialize;
}
