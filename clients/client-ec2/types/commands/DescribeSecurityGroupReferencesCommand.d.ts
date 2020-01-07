import { EC2ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../EC2Client";
import { DescribeSecurityGroupReferencesRequest, DescribeSecurityGroupReferencesResult } from "../models/index";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export declare type DescribeSecurityGroupReferencesCommandInput = DescribeSecurityGroupReferencesRequest;
export declare type DescribeSecurityGroupReferencesCommandOutput = DescribeSecurityGroupReferencesResult & __MetadataBearer;
export declare class DescribeSecurityGroupReferencesCommand extends $Command<DescribeSecurityGroupReferencesCommandInput, DescribeSecurityGroupReferencesCommandOutput, EC2ClientResolvedConfig> {
    readonly input: DescribeSecurityGroupReferencesCommandInput;
    constructor(input: DescribeSecurityGroupReferencesCommandInput);
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: EC2ClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DescribeSecurityGroupReferencesCommandInput, DescribeSecurityGroupReferencesCommandOutput>;
    private serialize;
    private deserialize;
}
