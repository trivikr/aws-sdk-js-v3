import { HttpRequest } from "@aws-sdk/protocol-http";

import { writeGetObjectResponseEndpointMiddleware } from "./write-get-object-response-endpoint";

describe("writeGetObjectResponseEndpointMiddlewareOptions", () => {
  const mockNextHandler = jest.fn();
  const mockConfig = { runtime: "node" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each(["s3.amazonaws.com", "s3-external-1.amazonaws.com"])(
    "should not update context for global endpoints %s",
    async (hostname) => {
      const context = {} as any;
      const handler = writeGetObjectResponseEndpointMiddleware(mockConfig)(mockNextHandler, context);
      await handler({
        request: new HttpRequest({ hostname }),
        input: {},
      });
      expect(mockNextHandler.mock.calls.length).toBe(1);
      expect(context).toEqual({});
      mockNextHandler.mockClear();
    }
  );

  it.each(["s3.us-west-2.amazonaws.com", "s3.us-east-1.amazonaws.com", "s3.cn-northeast-1.amazonaws.com.cn"])(
    "should update context for regional endpoints",
    async (hostname) => {
      const context = {} as any;
      const handler = writeGetObjectResponseEndpointMiddleware(mockConfig)(mockNextHandler, context);
      await handler({
        request: new HttpRequest({ hostname }),
        input: {},
      });
      expect(mockNextHandler.mock.calls.length).toBe(1);
      expect(context).toMatchObject({ signing_service: "s3-object-lambda" });
      expect(mockNextHandler.mock.calls[0][0].request.headers["transfer-encoding"]).toBe("chunked");
      mockNextHandler.mockClear();
    }
  );

  it("should update context for custom endpoints", async () => {
    const context = {} as any;
    const handler = writeGetObjectResponseEndpointMiddleware({ ...mockConfig, isCustomEndpoint: true })(
      mockNextHandler,
      context
    );
    await handler({
      request: new HttpRequest({ hostname: "my-endpoint.com" }),
      input: {
        RequestRoute: "route",
      },
    });
    expect(mockNextHandler.mock.calls.length).toBe(1);
    expect(mockNextHandler.mock.calls[0][0].request.hostname).toBe("route.my-endpoint.com");
    expect(mockNextHandler.mock.calls[0][0].request.headers["transfer-encoding"]).toBe("chunked");
    expect(context).toMatchObject({ signing_service: "s3-object-lambda" });
    mockNextHandler.mockClear();
  });

  it("should not prepend requestRoute parameter if disableHostPrefix is set", async () => {
    mockRegionProvider.mockResolvedValueOnce("us-west-2");
    const handler = writeGetObjectResponseEndpointMiddleware({ ...mockConfig, disableHostPrefix: true })(
      mockNextHandler,
      {} as any
    );
    await handler({
      request: new HttpRequest({ hostname: "s3.us-west-2.amazonaws.com" }),
      input: {
        RequestRoute: "route",
      },
    });
    expect(mockNextHandler.mock.calls.length).toBe(1);
    expect(mockNextHandler.mock.calls[0][0].request.hostname).toBe("s3-object-lambda.us-west-2.amazonaws.com");
  });

  it("should not set chunked encoding if content-length is already set", async () => {
    const context = {} as any;
    const handler = writeGetObjectResponseEndpointMiddleware({ ...mockConfig })(mockNextHandler, context);
    const headers = { "content-length": "123" };
    await handler({
      request: new HttpRequest({ hostname: "s3.us-west-2.amazonaws.com", headers }),
      input: {
        RequestRoute: "route",
      },
    });
    expect(mockNextHandler.mock.calls.length).toBe(1);
    expect(mockNextHandler.mock.calls[0][0].request.headers).toEqual(headers);
  });

  it("should not set the chunked encoding for non Node.js runtime", async () => {
    const context = {} as any;
    const handler = writeGetObjectResponseEndpointMiddleware({ ...mockConfig, runtime: "browser" })(
      mockNextHandler,
      context
    );
    await handler({
      request: new HttpRequest({ hostname: "s3.us-west-2.amazonaws.com" }),
      input: {
        RequestRoute: "route",
      },
    });
    expect(mockNextHandler.mock.calls.length).toBe(1);
    expect(mockNextHandler.mock.calls[0][0].request.headers["transfer-encoding"]).not.toBeDefined();
  });
});
