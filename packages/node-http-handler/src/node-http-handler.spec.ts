describe("NodeHttpHandler", () => {
  describe("constructor", () => {
    it("sets agents if passed", () => {});
    it("creates new agents if not passed", () => {});
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
