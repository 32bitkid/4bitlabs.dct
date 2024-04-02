import type { Vector } from './vector';
import { DiscreteCosineTransformation } from './discrete-cosine-transformation';

export function createDctOfN(N: number): DiscreteCosineTransformation {
  const COS = new Float64Array(N * N).map((_, i) => {
    const k = Math.floor(i / N);
    const n = i % N;
    return Math.cos((Math.PI * (n + 0.5) * k) / N);
  });

  const sqrt2_n = Math.sqrt(2 / N);

  function transform(vIn: Vector, vOut: Vector) {
    let sum: number;
    for (let k = 0; k < N; k++) {
      sum = 0;
      for (let n = 0; n < N; n++) {
        sum += vIn[n] * COS[n + k * N];
      }
      const s = k === 0 ? 1 / Math.SQRT2 : 1;
      vOut[k] = s * sqrt2_n * sum;
    }
  }

  function inverse(vIn: Vector, vOut: Vector) {
    let sum: number;
    for (let n = 0; n < N; n++) {
      sum = 0;
      for (let k = 0; k < N; k++) {
        const s = k === 0 ? Math.SQRT1_2 : 1;
        sum += s * vIn[k] * COS[n + k * N];
      }
      vOut[n] = sqrt2_n * sum;
    }
  }

  return { transform, inverse };
}
