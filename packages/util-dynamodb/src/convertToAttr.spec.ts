import { convertToAttr } from "./convertToAttr";
import { isBinary } from "./isBinary";

jest.mock("./isBinary");

describe("convertToAttr", () => {
  beforeEach(() => {
    (isBinary as jest.Mock).mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("null", () => {
    it(`returns for null`, () => {
      expect(convertToAttr(null)).toEqual({ NULL: true });
    });
  });

  describe("boolean", () => {
    [true, false].forEach((bool) => {
      it(`returns for boolean: ${bool}`, () => {
        expect(convertToAttr(bool)).toEqual({ BOOL: bool });
      });
    });
  });

  describe("number", () => {
    [1, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER].forEach((num) => {
      it(`returns for number (integer): ${num}`, () => {
        expect(convertToAttr(num)).toEqual({ N: num.toString() });
      });
    });

    [1.01, Math.PI, Math.E, Number.MIN_VALUE, Number.EPSILON].forEach((num) => {
      it(`returns for number (floating point): ${num}`, () => {
        expect(convertToAttr(num)).toEqual({ N: num.toString() });
      });
    });

    [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY].forEach((num) => {
      it(`throws for number (special numeric value): ${num}`, () => {
        expect(() => {
          convertToAttr(num);
        }).toThrowError(`Special numeric value ${num} is not allowed`);
      });
    });

    [Number.MAX_SAFE_INTEGER + 1, Number.MAX_VALUE].forEach((num) => {
      it(`throws for number greater than Number.MAX_SAFE_INTEGER: ${num}`, () => {
        expect(() => {
          convertToAttr(num);
        }).toThrowError(`Number ${num} is greater than Number.MAX_SAFE_INTEGER. Use BigInt.`);
      });
    });

    [Number.MIN_SAFE_INTEGER - 1].forEach((num) => {
      it(`throws for number lesser than Number.MIN_SAFE_INTEGER: ${num}`, () => {
        expect(() => {
          convertToAttr(num);
        }).toThrowError(`Number ${num} is lesser than Number.MIN_SAFE_INTEGER. Use BigInt.`);
      });
    });
  });

  describe("bigint", () => {
    const maxSafe = BigInt(Number.MAX_SAFE_INTEGER);
    [
      // @ts-expect-error BigInt literals are not available when targeting lower than ES2020.
      1n,
      // @ts-expect-error BigInt literals are not available when targeting lower than ES2020.
      maxSafe * 2n,
      // @ts-expect-error BigInt literals are not available when targeting lower than ES2020.
      maxSafe * -2n,
      BigInt(Number.MAX_VALUE),
      BigInt("0x1fffffffffffff"),
      BigInt("0b11111111111111111111111111111111111111111111111111111"),
    ].forEach((num) => {
      it(`returns for bigint: ${num}`, () => {
        expect(convertToAttr(num)).toEqual({ N: num.toString() });
      });
    });
  });

  describe("binary", () => {
    const data = new Uint8Array([...Array(64).keys()]);
    it(`returns for binary`, () => {
      (isBinary as jest.Mock).mockReturnValue(true);
      expect(convertToAttr(data)).toEqual({ B: data });
    });
  });

  describe("list", () => {
    const arr = [...Array(4).keys()];
    const uint8Arr = new Uint32Array(arr);
    const biguintArr = new BigUint64Array(arr.map(BigInt));

    // List without binary
    [
      [
        [null, false],
        [{ NULL: true }, { BOOL: false }],
      ],
      [
        [1.01, BigInt(1), "one"],
        [{ N: "1.01" }, { N: "1" }, { S: "one" }],
      ],
    ].forEach(([input, output]) => {
      it(`testing list: ${input}`, () => {
        // @ts-ignore
        expect(convertToAttr(input)).toEqual({ L: output });
      });
    });

    // List with binary
    [
      [
        [uint8Arr, biguintArr],
        [{ B: uint8Arr }, { B: biguintArr }],
      ],
    ].forEach(([input, output]) => {
      it(`testing list: ${input}`, () => {
        (isBinary as jest.Mock).mockReturnValue(true);
        // @ts-ignore
        expect(convertToAttr(input)).toEqual({ L: output });
      });
    });
  });

  describe("set", () => {
    it("number set", () => {
      const set = new Set([1, 2, 3]);
      expect(convertToAttr(set)).toEqual({ NS: Array.from(set).map((num) => num.toString()) });
    });

    it("bigint set", () => {
      // @ts-expect-error BigInt literals are not available when targeting lower than ES2020.
      const set = new Set([1n, 2n, 3n]);
      expect(convertToAttr(set)).toEqual({ NS: Array.from(set).map((num) => num.toString()) });
    });

    it("binary set", () => {
      (isBinary as jest.Mock).mockReturnValue(true);
      const set = new Set([new ArrayBuffer(4), new ArrayBuffer(8), new ArrayBuffer(16)]);
      expect(convertToAttr(set)).toEqual({ BS: Array.from(set) });
    });

    it("string set", () => {
      const set = new Set(["one", "two", "three"]);
      expect(convertToAttr(set)).toEqual({ SS: Array.from(set) });
    });

    it("throws error for empty set", () => {
      expect(() => {
        convertToAttr(new Set());
      }).toThrowError(`Please pass a non-empty set`);
    });

    it("thows error for unallowed set", () => {
      expect(() => {
        convertToAttr(new Set([true, false]));
      }).toThrowError(`Only Number Set (NS), Binary Set (BS) or String Set (SS) are allowed.`);
    });
  });

  describe("map", () => {
    const arr = [...Array(4).keys()];
    const uint8Arr = new Uint32Array(arr);
    const biguintArr = new BigUint64Array(arr.map(BigInt));

    // Map without binary
    [
      [
        { a: null, b: false },
        { a: { NULL: true }, b: { BOOL: false } },
      ],
      [
        { a: 1.01, b: BigInt(1), c: "one" },
        { a: { N: "1.01" }, b: { N: "1" }, c: { S: "one" } },
      ],
    ].forEach(([input, output]) => {
      it(`testing map: ${input}`, () => {
        expect(convertToAttr(input)).toEqual({ M: output });
      });
    });

    // Map with binary
    [
      [
        { a: uint8Arr, b: biguintArr },
        { a: { B: uint8Arr }, b: { B: biguintArr } },
      ],
    ].forEach(([input, output]) => {
      it(`testing map: ${input}`, () => {
        (isBinary as jest.Mock).mockReturnValue(true);
        expect(convertToAttr(input)).toEqual({ M: output });
      });
    });
  });

  describe("string", () => {
    ["", "string", "'single-quote'", '"double-quote"'].forEach((str) => {
      it(`returns for string: ${str}`, () => {
        expect(convertToAttr(str)).toEqual({ S: str });
      });
    });
  });

  describe(`unsupported type`, () => {
    class FooObj {
      constructor() {
        // @ts-ignore
        this.foo = "foo";
      }
    }

    // ToDo: Serialize ES6 class objects as string https://github.com/aws/aws-sdk-js-v3/issues/1535
    [undefined, new Date(), new FooObj()].forEach((data) => {
      it(`throws for: ${String(data)}`, () => {
        expect(() => {
          // @ts-ignore Argument is not assignable to parameter of type 'NativeAttributeValue'
          convertToAttr(data);
        }).toThrowError(`Unsupported type passed: ${String(data)}`);
      });
    });
  });

  describe("convertEmptyValues set to true", () => {
    const convertEmptyValues = true;

    it(`returns null for Set`, () => {
      expect(convertToAttr(new Set(), { convertEmptyValues })).toEqual({ NULL: true });
    });

    it(`returns null for String`, () => {
      expect(convertToAttr("", { convertEmptyValues })).toEqual({ NULL: true });
    });

    it(`returns null for Binary`, () => {
      (isBinary as jest.Mock).mockReturnValue(true);
      expect(convertToAttr(new Uint8Array(), { convertEmptyValues })).toEqual({ NULL: true });
    });
  });
});
