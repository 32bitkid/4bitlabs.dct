import { FloatVector, IntegerVector } from './vector';
import { dct, idct } from './fast-dct-8';

type Vec = IntegerVector | FloatVector;

describe('dct', () => {
  it.each<[input: Vec, expected: Vec, output: Vec, precision?: number]>([
    [
      Uint8ClampedArray.of(127, 127, 127, 127, 127, 127, 127, 127),
      Float64Array.of(359.21, 0, 0, 0, 0, 0, 0, 0),
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
  it.each<[input: Vec, expected: Vec, output: Vec, precision?: number]>([
    [
      Float64Array.of(359, 0, 0, 0, 0, 0, 0, 0),
      Uint8ClampedArray.of(127, 127, 127, 127, 127, 127, 127, 127),
      new Uint8ClampedArray(8),
    ],
  ])('should inverse-transform', (input, expected, output, precision = 2) => {
    idct(input, output);
    output.forEach((val: number, i: number) =>
      expect(val).toBeCloseTo(expected[i], precision),
    );
  });
});
