import { HttpRequest } from "@aws-sdk/protocol-http";
import {
  BuildHandler,
  BuildHandlerArguments,
  BuildHandlerOutput,
  BuildMiddleware,
  HandlerExecutionContext,
  MetadataBearer,
  Pluggable,
  RelativeMiddlewareOptions,
} from "@aws-sdk/types";

type PreviouslyResolved = {
  runtime: string;
};

type Input = {
  RequestRoute: string | undefined;
};

/**
 * @internal
 */
export const writeGetObjectResponseEndpointMiddleware =
  (config: PreviouslyResolved): BuildMiddleware<any, any> =>
  <Output extends MetadataBearer>(
    next: BuildHandler<Input, Output>,
    context: HandlerExecutionContext
  ): BuildHandler<Input, Output> =>
  async (args: BuildHandlerArguments<Input>): Promise<BuildHandlerOutput<Output>> => {
    const { request } = args;
    if (!HttpRequest.isInstance(request)) return next({ ...args });

    const { hostname } = request;
    if (hostname.endsWith("s3.amazonaws.com") || hostname.endsWith("s3-external-1.amazonaws.com")) {
      return next({ ...args });
    }

    context["signing_service"] = "s3-object-lambda";

    // Set the chunked transfer encoding when content-length cannot be inferred
    // Only set in node because this header is forbidden in browser.
    if (config.runtime === "node" && !request.headers["content-length"]) {
      request.headers["transfer-encoding"] = "chunked";
    }

    return next({ ...args });
  };

/**
 * @internal
 */
export const writeGetObjectResponseEndpointMiddlewareOptions: RelativeMiddlewareOptions = {
  relation: "after",
  toMiddleware: "contentLengthMiddleware",
  tags: ["WRITE_GET_OBJECT_RESPONSE", "S3", "ENDPOINT"],
  name: "writeGetObjectResponseEndpointMiddleware",
  override: true,
};

/**
 * @internal
 */
export const getWriteGetObjectResponseEndpointPlugin = (config: PreviouslyResolved): Pluggable<any, any> => ({
  applyToStack: (clientStack) => {
    clientStack.addRelativeTo(
      writeGetObjectResponseEndpointMiddleware(config),
      writeGetObjectResponseEndpointMiddlewareOptions
    );
  },
});
