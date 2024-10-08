// smithy-typescript generated code
import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";

import { ElasticInferenceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../ElasticInferenceClient";
import { commonParams } from "../endpoint/EndpointParameters";
import { DescribeAcceleratorOfferingsRequest, DescribeAcceleratorOfferingsResponse } from "../models/models_0";
import {
  de_DescribeAcceleratorOfferingsCommand,
  se_DescribeAcceleratorOfferingsCommand,
} from "../protocols/Aws_restJson1";

/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link DescribeAcceleratorOfferingsCommand}.
 */
export interface DescribeAcceleratorOfferingsCommandInput extends DescribeAcceleratorOfferingsRequest {}
/**
 * @public
 *
 * The output of {@link DescribeAcceleratorOfferingsCommand}.
 */
export interface DescribeAcceleratorOfferingsCommandOutput
  extends DescribeAcceleratorOfferingsResponse,
    __MetadataBearer {}

/**
 * <p>
 *             Describes the locations in which a given accelerator type or set of types is present in a given region.
 *         </p>
 *          <p>
 *             February 15, 2023: Starting April 15, 2023, AWS will not onboard new customers to Amazon Elastic Inference (EI), and will help current customers migrate their workloads to options that offer better price and performance.
 *             After April 15, 2023, new customers will not be able to launch instances with Amazon EI accelerators in Amazon SageMaker, Amazon ECS, or Amazon EC2.
 *             However, customers who have used Amazon EI at least once during the past 30-day period are considered current customers and will be able to continue using the service.
 *         </p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ElasticInferenceClient, DescribeAcceleratorOfferingsCommand } from "@aws-sdk/client-elastic-inference"; // ES Modules import
 * // const { ElasticInferenceClient, DescribeAcceleratorOfferingsCommand } = require("@aws-sdk/client-elastic-inference"); // CommonJS import
 * const client = new ElasticInferenceClient(config);
 * const input = { // DescribeAcceleratorOfferingsRequest
 *   locationType: "region" || "availability-zone" || "availability-zone-id", // required
 *   acceleratorTypes: [ // AcceleratorTypeNameList
 *     "STRING_VALUE",
 *   ],
 * };
 * const command = new DescribeAcceleratorOfferingsCommand(input);
 * const response = await client.send(command);
 * // { // DescribeAcceleratorOfferingsResponse
 * //   acceleratorTypeOfferings: [ // AcceleratorTypeOfferingList
 * //     { // AcceleratorTypeOffering
 * //       acceleratorType: "STRING_VALUE",
 * //       locationType: "region" || "availability-zone" || "availability-zone-id",
 * //       location: "STRING_VALUE",
 * //     },
 * //   ],
 * // };
 *
 * ```
 *
 * @param DescribeAcceleratorOfferingsCommandInput - {@link DescribeAcceleratorOfferingsCommandInput}
 * @returns {@link DescribeAcceleratorOfferingsCommandOutput}
 * @see {@link DescribeAcceleratorOfferingsCommandInput} for command's `input` shape.
 * @see {@link DescribeAcceleratorOfferingsCommandOutput} for command's `response` shape.
 * @see {@link ElasticInferenceClientResolvedConfig | config} for ElasticInferenceClient's `config` shape.
 *
 * @throws {@link BadRequestException} (client fault)
 *  <p>
 *             Raised when a malformed input has been provided to the API.
 *         </p>
 *
 * @throws {@link InternalServerException} (server fault)
 *  <p>
 *             Raised when an unexpected error occurred during request processing.
 *         </p>
 *
 * @throws {@link ResourceNotFoundException} (client fault)
 *  <p>
 *             Raised when the requested resource cannot be found.
 *         </p>
 *
 * @throws {@link ElasticInferenceServiceException}
 * <p>Base exception class for all service exceptions from ElasticInference service.</p>
 *
 * @public
 */
export class DescribeAcceleratorOfferingsCommand extends $Command
  .classBuilder<
    DescribeAcceleratorOfferingsCommandInput,
    DescribeAcceleratorOfferingsCommandOutput,
    ElasticInferenceClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >()
  .ep(commonParams)
  .m(function (this: any, Command: any, cs: any, config: ElasticInferenceClientResolvedConfig, o: any) {
    return [
      getSerdePlugin(config, this.serialize, this.deserialize),
      getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
  })
  .s("EC2MatterhornCfSoothsayerApiGatewayLambda", "DescribeAcceleratorOfferings", {})
  .n("ElasticInferenceClient", "DescribeAcceleratorOfferingsCommand")
  .f(void 0, void 0)
  .ser(se_DescribeAcceleratorOfferingsCommand)
  .de(de_DescribeAcceleratorOfferingsCommand)
  .build() {
  /** @internal type navigation helper, not in runtime. */
  protected declare static __types: {
    api: {
      input: DescribeAcceleratorOfferingsRequest;
      output: DescribeAcceleratorOfferingsResponse;
    };
    sdk: {
      input: DescribeAcceleratorOfferingsCommandInput;
      output: DescribeAcceleratorOfferingsCommandOutput;
    };
  };
}
