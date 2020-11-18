import { HttpRequest } from "@aws-sdk/protocol-http";
import { buildQueryString } from "@aws-sdk/querystring-builder";
import { Agent as hAgent, request as hRequest } from "http";
import { Agent as hsAgent, request as hsRequest } from "https";

import { getTransformedHeaders } from "./get-transformed-headers";
import { NodeHttpHandler, NodeHttpOptions } from "./node-http-handler";
import { setConnectionTimeout } from "./set-connection-timeout";
import { setSocketTimeout } from "./set-socket-timeout";
import { writeRequestBody } from "./write-request-body";

jest.mock("@aws-sdk/querystring-builder");
jest.mock("http");
jest.mock("https");
jest.mock("./get-transformed-headers");
jest.mock("./set-connection-timeout");
jest.mock("./set-socket-timeout");
jest.mock("./write-request-body");

describe("NodeHttpHandler", () => {
  const hRequestOn = jest.fn();
  const hRequestDestroy = jest.fn();
  const hsRequestOn = jest.fn();
  const hsRequestDestroy = jest.fn();

  const getMockResponse = () => ({
    statusCode: 200,
    headers: {},
    body: "body",
  });

  const getMockRequestOptions = () => ({
    method: "GET",
    protocol: "http:",
    hostname: "localhost",
    path: "/",
    headers: {},
  });

  beforeEach(() => {
    (hRequest as jest.Mock).mockReturnValue({
      on: hRequestOn,
      destroy: hRequestDestroy,
    });
    (hsRequest as jest.Mock).mockReturnValue({
      on: hsRequestOn,
      destroy: hsRequestDestroy,
    });
    (getTransformedHeaders as jest.Mock).mockImplementation((headers) => headers);
    (buildQueryString as jest.Mock).mockImplementation((query) => query);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    describe("timeouts", () => {
      const verifyTimeouts = (httpHandler: NodeHttpHandler, httpOptions: NodeHttpOptions) => {
        expect((httpHandler as any).connectionTimeout).toStrictEqual(httpOptions.connectionTimeout);
        expect((httpHandler as any).socketTimeout).toStrictEqual(httpOptions.socketTimeout);
      };

      it("sets if passed", () => {
        const httpOptions = {
          connectionTimeout: 100,
          socketTimeout: 100,
        };
        verifyTimeouts(new NodeHttpHandler(httpOptions), httpOptions);
      });

      it("doesn't set if not passed", () => {
        const httpOptions = {};
        verifyTimeouts(new NodeHttpHandler(httpOptions), httpOptions);
      });
    });

    describe("agents", () => {
      const verifyAgents = (httpHandler: NodeHttpHandler, httpOptions: NodeHttpOptions) => {
        expect((httpHandler as any).httpAgent).toStrictEqual(httpOptions.httpAgent);
        expect((httpHandler as any).httpsAgent).toStrictEqual(httpOptions.httpsAgent);
      };

      const verifyAgentMockCalls = (agentOptions: any) => {
        expect(hAgent).toHaveBeenCalledTimes(1);
        expect(hAgent).toHaveBeenCalledWith(agentOptions);
        expect(hsAgent).toHaveBeenCalledTimes(1);
        expect(hsAgent).toHaveBeenCalledWith(agentOptions);
      };

      beforeEach(() => {
        (hAgent as jest.Mock).mockImplementation((params: any) => params);
        (hsAgent as jest.Mock).mockImplementation((params: any) => params);
      });

      it("sets if passed", () => {
        const agentOptions = { timeout: 100 };
        const httpOptions = {
          httpAgent: new hAgent(agentOptions),
          httpsAgent: new hsAgent(agentOptions),
        };
        verifyAgentMockCalls(agentOptions);
        verifyAgents(new NodeHttpHandler(httpOptions), httpOptions);
        verifyAgentMockCalls(agentOptions);
      });

      it("creates new agents if not passed", () => {
        const agentOptions = { keepAlive: true };
        const httpHandler = new NodeHttpHandler({});
        verifyAgentMockCalls(agentOptions);
        verifyAgents(httpHandler, {
          httpAgent: new hAgent(agentOptions),
          httpsAgent: new hsAgent(agentOptions),
        });
      });
    });
  });

  describe("destroy", () => {
    it("destroys httpAgent and httpsAgent", () => {
      const hAgentDestroy = jest.fn();
      const hsAgentDestroy = jest.fn();
      (hAgent as jest.Mock).mockImplementation(() => ({ destroy: hAgentDestroy }));
      (hsAgent as jest.Mock).mockImplementation(() => ({ destroy: hsAgentDestroy }));

      const httpHandler = new NodeHttpHandler();
      expect(hAgentDestroy).not.toHaveBeenCalled();
      expect(hsAgentDestroy).not.toHaveBeenCalled();
      httpHandler.destroy();
      expect(hAgentDestroy).toHaveBeenCalledTimes(1);
      expect(hsAgentDestroy).toHaveBeenCalledTimes(1);
    });
  });

  describe("handle", () => {
    describe("abortSignal", () => {
      const mockResponse = getMockResponse();

      it("throws error if already aborted, and prevents additional work", async () => {
        const httpHandler = new NodeHttpHandler();
        // Mock already aborted abortSignal from AbortController.
        const abortSignal = { aborted: true, onabort: jest.fn() };

        await expect(httpHandler.handle(new HttpRequest(getMockRequestOptions()), { abortSignal })).rejects.toEqual(
          Object.assign(new Error("Request aborted"), { name: "AbortError" })
        );

        expect(hRequest).not.toHaveBeenCalled();
        expect(abortSignal.onabort).not.toHaveBeenCalled();
      });

      describe("onabort", () => {
        it("throws error if onabort called before response", async () => {
          const httpHandler = new NodeHttpHandler();
          // Mock abortSignal from AbortController.
          const abortSignal = { aborted: false, onabort: () => {} };

          const handlePromise = httpHandler.handle(new HttpRequest(getMockRequestOptions()), { abortSignal });

          // Mock abort called before request returned a response.
          abortSignal.onabort();
          abortSignal.aborted = true;
          // Callback to resolve the response after abort.
          (hRequest as jest.Mock).mock.calls[0][1](mockResponse);

          await expect(handlePromise).rejects.toEqual(
            Object.assign(new Error("Request aborted"), { name: "AbortError" })
          );

          expect(hRequest).toHaveBeenCalled();
          expect(hRequestOn).toHaveBeenCalled();
          expect(hRequestDestroy).toHaveBeenCalled();
        });

        it("returns if onabort called after response", async () => {
          const httpHandler = new NodeHttpHandler();
          // Mock abortSignal from AbortController.
          const abortSignal = { aborted: false, onabort: () => {} };

          const handlePromise = httpHandler.handle(new HttpRequest(getMockRequestOptions()), { abortSignal });
          // Callback to resolve the response before abort.
          (hRequest as jest.Mock).mock.calls[0][1](mockResponse);
          // Mock abort called after request returned a response.
          abortSignal.onabort();
          abortSignal.aborted = true;

          await expect(handlePromise).resolves.toEqual({
            response: { statusCode: mockResponse.statusCode, headers: mockResponse.headers, body: mockResponse },
          });

          expect(hRequest).toHaveBeenCalled();
          expect(hRequestOn).toHaveBeenCalled();
          expect(hRequestDestroy).toHaveBeenCalled();
        });

        it("doesn't get called if request if abortSignal is not aborted", async () => {
          const httpHandler = new NodeHttpHandler();
          // Mock abortSignal from AbortController.
          const abortSignal = { aborted: false, onabort: () => {} };

          const handlePromise = httpHandler.handle(new HttpRequest(getMockRequestOptions()), { abortSignal });
          // Callback to resolve the response.
          (hRequest as jest.Mock).mock.calls[0][1](mockResponse);

          await expect(handlePromise).resolves.toEqual({
            response: { statusCode: mockResponse.statusCode, headers: mockResponse.headers, body: mockResponse },
          });

          expect(hRequest).toHaveBeenCalled();
          expect(hRequestOn).toHaveBeenCalled();
          expect(hRequestDestroy).not.toHaveBeenCalled();
        });
      });
    });

    describe("buildQueryString", () => {
      const mockResponse = getMockResponse();

      it("passes request.query if present", async () => {
        const httpHandler = new NodeHttpHandler();
        const requestOptions = {
          ...getMockRequestOptions(),
          query: { key: "value" },
        };

        const handlePromise = httpHandler.handle(new HttpRequest(requestOptions), {});
        // Callback to resolve the response.
        (hRequest as jest.Mock).mock.calls[0][1](mockResponse);

        await expect(handlePromise).resolves.toEqual({
          response: { statusCode: mockResponse.statusCode, headers: mockResponse.headers, body: mockResponse },
        });
        expect(buildQueryString).toHaveBeenCalled();
        expect(buildQueryString).toHaveBeenCalledWith(requestOptions.query);
      });

      it("passes empty hash if request.query not present", async () => {
        const httpHandler = new NodeHttpHandler();
        const handlePromise = httpHandler.handle(new HttpRequest(getMockRequestOptions()), {});
        // Callback to resolve the response.
        (hRequest as jest.Mock).mock.calls[0][1](mockResponse);

        await expect(handlePromise).resolves.toEqual({
          response: { statusCode: mockResponse.statusCode, headers: mockResponse.headers, body: mockResponse },
        });
        expect(buildQueryString).toHaveBeenCalled();
        expect(buildQueryString).toHaveBeenCalledWith({});
      });
    });

    describe("request", () => {
      describe("path", () => {
        it("appends queryString if present", () => {});

        it("uses request.path is queryString not present", () => {});
      });

      describe("agent", () => {
        it("uses httpAgent for http protocol", () => {});

        it("uses httpsAgent for https protocol", () => {});
      });

      describe("function", () => {
        it("uses http in http protocol", () => {});

        it("uses https in https protocol", () => {});
      });

      it("rejects on error", () => {});

      it("sets connectionTimeout", () => {});

      it("sets socketTimeout", () => {});

      it("writes request body", () => {});
    });

    describe("response", () => {
      it("returns response.statusCode if present", () => {});

      it("returns -1 if response.statusCode is not present", () => {});
    });
  });
});
