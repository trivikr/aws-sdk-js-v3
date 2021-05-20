import { LRUCache } from "@aws-sdk/lru-cache";

import { Endpoint } from "./Endpoint";
import { EndpointCache } from "./EndpointCache";

jest.mock("@aws-sdk/lru-cache");

describe(EndpointCache.name, () => {
  let endpointCache;
  const capacity = 100;
  const key = "key";

  const now = Date.now();
  const mockSet = jest.fn();
  const mockDelete = jest.fn();
  const mockGet = jest.fn();
  const mockHas = jest.fn();
  const mockClear = jest.fn();

  const mockEndpoints = [
    { Address: "addressA", CachePeriodInMinutes: 1 },
    { Address: "addressB", CachePeriodInMinutes: 2 },
  ];

  const getEndpointsWithExpiry = (endpoints: Endpoint[]) =>
    endpoints.map(({ Address = "", CachePeriodInMinutes = 1 }) => ({
      Address,
      Expires: now + CachePeriodInMinutes * 60 * 1000,
    }));

  const getMaxCachePeriodInMins = (endpoints: Endpoint[]) =>
    Math.max(...endpoints.map((endpoint) => endpoint.CachePeriodInMinutes));

  beforeEach(() => {
    ((LRUCache as unknown) as jest.Mock).mockReturnValueOnce({
      set: mockSet,
      get: mockGet,
      delete: mockDelete,
      has: mockHas,
      clear: mockClear,
    });
    endpointCache = new EndpointCache(capacity);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("passes capacity to LRUCache", () => {
    expect(LRUCache).toHaveBeenCalledTimes(1);
    expect(LRUCache).toHaveBeenCalledWith(capacity);
  });

  describe("get", () => {
    beforeEach(() => {
      mockHas.mockReturnValue(true);
      const endpointsWithExpiry = getEndpointsWithExpiry(mockEndpoints);
      mockGet.mockReturnValue(endpointsWithExpiry);
      jest.spyOn(Date, "now").mockImplementation(() => now);
    });

    const verifyHasAndGetCalls = () => {
      expect(mockHas).toHaveBeenCalledTimes(1);
      expect(mockHas).toHaveBeenCalledWith(key);
      expect(mockGet).toHaveBeenCalledTimes(1);
      expect(mockGet).toHaveBeenCalledWith(key);
    };

    it("returns undefined if cache doesn't have key", () => {
      mockHas.mockReturnValueOnce(false);
      expect(endpointCache.get(key)).toBeUndefined();
      expect(mockHas).toHaveBeenCalledTimes(1);
      expect(mockHas).toHaveBeenCalledWith(key);
      expect(mockGet).not.toHaveBeenCalled();
    });

    it("returns undefined if cache has empty array", () => {
      mockHas.mockReturnValueOnce(true);
      mockGet.mockReturnValue([]);
      expect(endpointCache.get(key)).toBeUndefined();
      verifyHasAndGetCalls();
      expect(mockDelete).toHaveBeenCalledTimes(1);
      expect(mockDelete).toHaveBeenCalledWith(key);
    });

    it("returns undefined if cache returns undefined for key", () => {
      mockGet.mockReturnValueOnce(undefined);
      expect(endpointCache.get(key)).toBeUndefined();
      verifyHasAndGetCalls();
      expect(mockSet).not.toHaveBeenCalled();
    });

    it("returns undefined if endpoints have expired", () => {
      const maxCachePeriod = getMaxCachePeriodInMins(mockEndpoints);
      jest.spyOn(Date, "now").mockImplementation(() => now + (maxCachePeriod + 1) * 60 * 1000);
      expect(endpointCache.get(key)).toBeUndefined();
      verifyHasAndGetCalls();
      expect(mockDelete).toHaveBeenCalledTimes(1);
      expect(mockDelete).toHaveBeenCalledWith(key);
    });

    describe("getEndpoint", () => {
      it("returns one of the un-expired endpoints", () => {
        expect(mockEndpoints.map((endpoint) => endpoint.Address)).toContain(endpointCache.getEndpoint(key));
        verifyHasAndGetCalls();
        expect(mockSet).not.toHaveBeenCalled();
      });

      it("returns un-expired endpoint", () => {
        jest.spyOn(Date, "now").mockImplementation(() => now + 90 * 1000);
        expect(endpointCache.getEndpoint(key)).toEqual(mockEndpoints[1].Address);
        verifyHasAndGetCalls();
        expect(mockSet).not.toHaveBeenCalled();
      });

      [0, 1].forEach((index) => {
        it(`returns un-expired endpoint at index ${index}`, () => {
          jest.spyOn(Math, "floor").mockImplementation(() => index);
          expect(mockEndpoints.map((endpoint) => endpoint.Address)).toContain(endpointCache.getEndpoint(key));
          verifyHasAndGetCalls();
          expect(mockSet).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("set", () => {
    beforeEach(() => {
      jest.spyOn(Date, "now").mockImplementation(() => now);
    });

    it("converts CachePeriodInMinutes to Expires before caching", () => {
      endpointCache.set(key, mockEndpoints);
      expect(mockSet).toHaveBeenCalledTimes(1);
      expect(mockSet).toHaveBeenCalledWith(
        key,
        mockEndpoints.map(({ Address, CachePeriodInMinutes }) => ({
          Address,
          Expires: now + CachePeriodInMinutes * 60 * 1000,
        }))
      );
    });
  });

  it("delete", () => {
    endpointCache.delete(key);
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(key);
  });

  describe("has", () => {
    it.each([false, true])("returns value cache.has call: %p", (expected) => {
      mockHas.mockReturnValueOnce(expected);
      expect(endpointCache.has(key)).toEqual(expected);
      expect(mockHas).toHaveBeenCalledTimes(1);
      expect(mockHas).toHaveBeenCalledWith(key);
    });
  });

  it("clear", () => {
    endpointCache.clear();
    expect(mockClear).toHaveBeenCalledTimes(1);
  });
});
