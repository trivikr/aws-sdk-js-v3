import { HttpRequest } from "@aws-sdk/protocol-http";
import {
  Command,
  FinalizeHandler,
  FinalizeHandlerArguments,
  FinalizeHandlerOutput,
  FinalizeRequestHandlerOptions,
  HandlerExecutionContext,
  MetadataBearer,
  Pluggable,
} from "@aws-sdk/types";

import { getCacheKey } from "./getCacheKey";
import { EndpointDiscoveryClientResolvedConfig } from "./resolveEndpointDiscoveryClientConfig";
import { updateDiscoveredEndpointInCache } from "./updateDiscoveredEndpointInCache";

export const endpointDiscoveryMiddlewareOptions: FinalizeRequestHandlerOptions = {
  name: "endpointDiscoveryMiddleware",
  step: "finalizeRequest",
  tags: ["ENDPOINT_DISCOVERY"],
  override: true,
};

export type EndpointDiscoveryMiddlewareConfig = {
  isDiscoveredEndpointRequired: boolean;
  endpointDiscoveryId?: string;
};

export const endpointDiscoveryMiddleware = (
  config: EndpointDiscoveryClientResolvedConfig,
  middlewareConfig: EndpointDiscoveryMiddlewareConfig
) => <Output extends MetadataBearer = MetadataBearer>(
  next: FinalizeHandler<any, Output>,
  context: HandlerExecutionContext
): FinalizeHandler<any, Output> => async (
  args: FinalizeHandlerArguments<any>
): Promise<FinalizeHandlerOutput<Output>> => {
  const { client } = config;
  const { endpointDiscoveryCommandCtor } = client?.config;
  const { isDiscoveredEndpointRequired, endpointDiscoveryId } = middlewareConfig;
  const { commandName } = context;

  if (isDiscoveredEndpointRequired === true) {
    // call await on Endpoint Discovery API utility so that function blocks
    // till discovered endpoint is updated in cache
    await updateDiscoveredEndpointInCache(config, {
      commandName,
      endpointDiscoveryCommandCtor,
      endpointDiscoveryId,
    });
  } else if (isDiscoveredEndpointRequired === false) {
    // Do not call await await on Endpoint Discovery API utility so that function
    // does not block, the command will use discovered endpoint, if available.
    updateDiscoveredEndpointInCache(config, {
      commandName,
      endpointDiscoveryCommandCtor,
      endpointDiscoveryId,
    });
  }

  const { request } = args;
  const cacheKey = await getCacheKey(commandName, client?.config, { endpointDiscoveryId });
  if (cacheKey && HttpRequest.isInstance(request)) {
    const endpoints = client?.config.endpointCache.get(cacheKey);
    if (endpoints && endpoints.length > 0) {
      request.hostname = endpoints[0].Address;
    }
  }

  return next(args);
};

export const getEndpointDiscoveryCommandPlugin = (
  pluginConfig: EndpointDiscoveryClientResolvedConfig,
  middlewareConfig: EndpointDiscoveryMiddlewareConfig
): Pluggable<any, any> => ({
  applyToStack: (commandStack) => {
    commandStack.add(endpointDiscoveryMiddleware(pluginConfig, middlewareConfig), endpointDiscoveryMiddlewareOptions);
  },
});
