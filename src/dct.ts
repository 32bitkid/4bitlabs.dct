import { type Vector } from './vector';

export function dct(vIn: Vector, vOut: Vector) {
  const N = vIn.length;
  const sqrt2_n = Math.sqrt(2 / N);

  let sum: number;
  for (let k = 0; k < N; k++) {
    sum = 0;
    for (let n = 0; n < N; n++) {
      sum += vIn[n] * Math.cos((Math.PI * (n + 0.5) * k) / N);
    }
    const s = k === 0 ? 1 / Math.SQRT2 : 1;
    vOut[k] = s * sqrt2_n * sum;
  }
}

export function idct(vIn: Vector, vOut: Vector) {
  const N = vIn.length;
  const sqrt2_n = Math.sqrt(2 / N);

  let sum: number;
  for (let n = 0; n < N; n++) {
    sum = 0;
    for (let k = 0; k < N; k++) {
      const s = k === 0 ? Math.SQRT1_2 : 1;
      sum += s * vIn[k] * Math.cos((Math.PI * (n + 0.5) * k) / N);
    }
    vOut[n] = sqrt2_n * sum;
  }
}
