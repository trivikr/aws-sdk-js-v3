import { HttpRequest } from "@aws-sdk/protocol-http";
import { SignatureV4 } from "./signer";

describe("signer", () => {
  const mockPresignedRequest = "mockPresignedRequest";
  const mockSignedRequest = "mockSignedRequest";

  const presign = jest.fn().mockResolvedValue(mockPresignedRequest);
  const sign = jest.fn().mockResolvedValue(mockSignedRequest);

  const headers = {
    "x-amz-foo": "foo",
    bar: "bar",
    host: "aws.amazon.com"
  };
  const body = "body";
  const method = "method";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("presign", () => {
    it("without options", async () => {
      const request = { headers, body, method };
      const sigV4 = new SignatureV4({ signer: { sign, presign } as any });
      const result = await sigV4.presign(request as any);

      expect(result).toStrictEqual(mockPresignedRequest);
      expect(sign).not.toHaveBeenCalled();
      expect(presign).toHaveBeenCalledTimes(1);
      expect(presign).toHaveBeenCalledWith(request, {});
    });

    it("with options", () => {});
  });

  describe("sign", () => {
    it("calls presign when HttpRequest.isInstance returns true", () => {});

    it("calls sign when HttpRequest.isInstance returns false", () => {});
  });
});
