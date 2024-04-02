import { Vector } from './vector';
import { dct, idct } from './dct';

describe('dct', () => {
  it.each<
    [input: Vector, expected: Vector, output: Vector, precision?: number]
  >([
    [
      Uint8ClampedArray.of(127, 127, 127, 127, 127, 127, 127, 127),
      Float64Array.of(359.21, 0, 0, 0, 0, 0, 0, 0),
      new Float64Array(8),
    ],
    [
      Uint8ClampedArray.of(0, 255, 0, 255, 0, 255, 0, 255),
      Float64Array.of(
        360.6244584051392,
        -64.99893633578026,
        0,
        -76.67147308421809,
        0,
        -114.74696844989306,
        0,
        -326.77171958704145,
      ),
      new Float64Array(8),
    ],
    [
      Uint8ClampedArray.of(0, 0x1f, 0x3f, 0x5f, 0x7f, 0x9f, 0xbf, 0xdf),
      Float64Array.of(
        314.30896423742035,
        -205.66394408636273,
        0.46193976625559685,
        -21.134818822774733,
        0.3535533905932766,
        -6.151107803042116,
        0.19134171618211582,
        -1.5249291672999412,
      ),
      new Float64Array(8),
    ],
    [
      Uint8ClampedArray.of(0xdf, 0xbf, 0x9f, 0x7f, 0x5f, 0x3f, 0x1f, 0),
      Float64Array.of(
        314.30896423742035,
        205.66394408636282,
        0.4619397662556235,
        21.134818822774836,
        0.3535533905933068,
        6.151107803042091,
        0.19134171618249063,
        1.5249291673006997,
      ),
      new Float64Array(8),
    ],
  ])('should transform [%s]', (input, expected, output, precision = 2) => {
    dct(input, output);
    output.forEach((val: number, i: number) =>
      expect(val).toBeCloseTo(expected[i], precision),
    );
  });
});

describe('idct', () => {
  it.each<
    [input: Vector, expected: Vector, output: Vector, precision?: number]
  >([
    [
      Uint32Array.of(360, 0, 0, 0, 0, 0, 0, 0),
      Int16Array.of(127, 127, 127, 127, 127, 127, 127, 127),
      new Int16Array(8),
    ],
    [
      Float64Array.of(0, 259, 0, 0, 0, 0, 0, 0),
      Int16Array.of(127, 107, 71, 25, -25, -71, -107, -127),
      new Int16Array(8),
    ],
    [
      Float64Array.of(0, 0, 0, 259, 0, 0, 0, 0),
      Int16Array.of(107, -25, -127, -71, 71, 127, 25, -107),
      new Int16Array(8),
    ],
    [
      Float64Array.of(0, 0, 0, 0, 0, 259, 0, 0),
      Int16Array.of(71, -127, 25, 107, -107, -25, 127, -71),
      new Int16Array(8),
    ],
    [
      Float64Array.of(0, 0, 0, 0, 0, 0, 0, 259),
      Int16Array.of(25, -71, 107, -127, 127, -107, 71, -25),
      new Int16Array(8),
    ],
  ])('should inverse-transform', (input, expected, output, precision = 2) => {
    idct(input, output);
    output.forEach((val: number, i: number) =>
      expect(val).toBeCloseTo(expected[i], precision),
    );
  });
});
