import nock from "nock";
import { httpGet } from "./httpGet";
// import { ProviderError } from "@aws-sdk/property-provider";

describe("httpGet", () => {
  const host = "https://amazon.com";
  const path = "/";

  it("should respond with a promise fulfilled with the http response", async () => {
    const expectedResponse = "foo bar baz";
    nock(host).get(path).reply(200, expectedResponse);

    expect((await httpGet({ host, path })).toString("utf8")).toEqual(
      expectedResponse
    );
  });

  // it("should reject the promise with a non-terminal error if a 404 status code is received", async () => {
  //   addMatcher("/fizz", "buzz");

  //   await httpGet(`http://localhost:${port}/foo`).then(
  //     () => {
  //       throw new Error("The promise should have been rejected");
  //     },
  //     (err: any) => {
  //       expect((err as ProviderError).tryNextLink).toBe(true);
  //     }
  //   );
  // });

  // it("should reject the promise with a non-terminal error if the remote server cannot be contacted", async () => {
  //   server.close();

  //   await httpGet(`http://localhost:${port}/foo`).then(
  //     () => {
  //       throw new Error("The promise should have been rejected");
  //     },
  //     (err: any) => {
  //       expect((err as ProviderError).tryNextLink).toBe(true);
  //     }
  //   );
  // });
});
