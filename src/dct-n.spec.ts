import { Vector } from './vector';
import { createDctOfN } from './dct-n';

describe('8-element DCT', () => {
  const dct8 = createDctOfN(8);

  describe('ii', () => {
    it.each<
      [input: Vector, expected: Vector, output: Vector, precision?: number]
    >([
      [
        Uint8ClampedArray.of(127, 127, 127, 127, 127, 127, 127, 127),
        Float64Array.of(359.21, 0, 0, 0, 0, 0, 0, 0),
        new Float64Array(8),
      ],
    ])('should transform [%s]', (input, expected, output, precision = 2) => {
      dct8.transform(input, output);
      output.forEach((val: number, i: number) =>
        expect(val).toBeCloseTo(expected[i], precision),
      );
    });
  });

  describe('iii', () => {
    it.each<
      [input: Vector, expected: Vector, output: Vector, precision?: number]
    >([
      [
        Float64Array.of(359, 0, 0, 0, 0, 0, 0, 0),
        Uint8ClampedArray.of(127, 127, 127, 127, 127, 127, 127, 127),
        new Uint8ClampedArray(8),
      ],
    ])('should inverse-transform', (input, expected, output, precision = 2) => {
      dct8.inverse(input, output);
      output.forEach((val: number, i: number) =>
        expect(val).toBeCloseTo(expected[i], precision),
      );
    });
  });
});
