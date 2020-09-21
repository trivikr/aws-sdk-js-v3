import { isBinary } from "./isBinary";

describe("binary", () => {
  const buffer = new ArrayBuffer(64);
  const arr = [...Array(64).keys()];
  const addPointOne = (num: number) => num + 0.1;
  [
    buffer,
    new Blob([new Uint8Array(buffer)]),
    Buffer.from(buffer),
    new DataView(buffer),
    new Int8Array(arr),
    new Uint8Array(arr),
    new Uint8ClampedArray(arr),
    new Int16Array(arr),
    new Uint16Array(arr),
    new Int32Array(arr),
    new Uint32Array(arr),
    new Float32Array(arr.map(addPointOne)),
    new Float64Array(arr.map(addPointOne)),
    new BigInt64Array(arr.map(BigInt)),
    new BigUint64Array(arr.map(BigInt)),
  ].forEach((data) => {
    it(`returns true for binary: ${data.constructor.name}`, () => {
      expect(isBinary(data)).toEqual(true);
    });
  });

  // @ts-expect-error BigInt literals are not available when targeting lower than ES2020.
  [null, true, false, 1, 1.01, 1n, "string"].forEach((data) => {
    it(`returns false for not-binary: ${data}`, () => {
      expect(isBinary(data)).toEqual(false);
    });
  });
});
