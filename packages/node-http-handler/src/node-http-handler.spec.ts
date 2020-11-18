import { Agent as hAgent } from "http";
import { Agent as hsAgent } from "https";

import { NodeHttpHandler, NodeHttpOptions } from "./node-http-handler";

jest.mock("http");
jest.mock("https");

describe("NodeHttpHandler", () => {
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
        (hAgent as any).mockImplementation((params: any) => params);
        (hsAgent as any).mockImplementation((params: any) => params);
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
    it("destroys httpAgent and httpsAgent", () => {});
  });

  describe("handle", () => {
    describe("abortSignal", () => {
      it("throws error if already aborted", () => {});

      it("destroys request and throws error in onabort", () => {});
    });

    describe("buildQueryString", () => {
      it("passes request.query if present", () => {});

      it("passes empty hash if request.query not present", () => {});
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
