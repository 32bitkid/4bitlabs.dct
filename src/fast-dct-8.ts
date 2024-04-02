import { Vector } from './vector';

const C = [0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => Math.cos((Math.PI / 16) * i));
const [S0, S1, S2, S3, S4, S5, S6, S7] = C.map((val, i) =>
  i === 0 ? 1 / (2 * Math.SQRT2) : 1 / (4 * val),
);

const [A1, A2, A3, A4, A5] = [C[4], C[2] - C[6], C[4], C[6] + C[2], C[6]];

export function dct(vIn: Vector, vOut: Vector) {
  const v0 = vIn[0] + vIn[7];
  const v1 = vIn[1] + vIn[6];
  const v2 = vIn[2] + vIn[5];
  const v3 = vIn[3] + vIn[4];
  const v4 = vIn[3] - vIn[4];
  const v5 = vIn[2] - vIn[5];
  const v6 = vIn[1] - vIn[6];
  const v7 = vIn[0] - vIn[7];

  const v8 = v0 + v3;
  const v9 = v1 + v2;
  const v10 = v1 - v2;
  const v11 = v0 - v3;
  const v12 = -v4 - v5;
  const v13 = (v5 + v6) * A3;
  const v14 = v6 + v7;

  const v15 = v8 + v9;
  const v16 = v8 - v9;
  const v17 = (v10 + v11) * A1;
  const v18 = (v12 + v14) * A5;

  const v19 = -v12 * A2 - v18;
  const v20 = v14 * A4 - v18;

  const v21 = v17 + v11;
  const v22 = v11 - v17;
  const v23 = v13 + v7;
  const v24 = v7 - v13;

  const v25 = v19 + v24;
  const v26 = v23 + v20;
  const v27 = v23 - v20;
  const v28 = v24 - v19;

  vOut[0] = S0 * v15;
  vOut[1] = S1 * v26;
  vOut[2] = S2 * v21;
  vOut[3] = S3 * v28;
  vOut[4] = S4 * v16;
  vOut[5] = S5 * v25;
  vOut[6] = S6 * v22;
  vOut[7] = S7 * v27;
}

export function idct(vIn: Vector, vOut: Vector) {
  const v15 = vIn[0] / S0;
  const v26 = vIn[1] / S1;
  const v21 = vIn[2] / S2;
  const v28 = vIn[3] / S3;
  const v16 = vIn[4] / S4;
  const v25 = vIn[5] / S5;
  const v22 = vIn[6] / S6;
  const v27 = vIn[7] / S7;

  const v19 = (v25 - v28) / 2;
  const v20 = (v26 - v27) / 2;
  const v23 = (v26 + v27) / 2;
  const v24 = (v25 + v28) / 2;

  const v7 = (v23 + v24) / 2;
  const v11 = (v21 + v22) / 2;
  const v13 = (v23 - v24) / 2;
  const v17 = (v21 - v22) / 2;

  const v8 = (v15 + v16) / 2;
  const v9 = (v15 - v16) / 2;

  const v18 = (v19 - v20) * A5;
  const v12 = (v19 * A4 - v18) / (A2 * A5 - A2 * A4 - A4 * A5);
  const v14 = (v18 - v20 * A2) / (A2 * A5 - A2 * A4 - A4 * A5);

  const v6 = v14 - v7;
  const v5 = v13 / A3 - v6;
  const v4 = -v5 - v12;
  const v10 = v17 / A1 - v11;

  const v0 = (v8 + v11) / 2;
  const v1 = (v9 + v10) / 2;
  const v2 = (v9 - v10) / 2;
  const v3 = (v8 - v11) / 2;

  vOut[0] = (v0 + v7) / 2;
  vOut[1] = (v1 + v6) / 2;
  vOut[2] = (v2 + v5) / 2;
  vOut[3] = (v3 + v4) / 2;
  vOut[4] = (v3 - v4) / 2;
  vOut[5] = (v2 - v5) / 2;
  vOut[6] = (v1 - v6) / 2;
  vOut[7] = (v0 - v7) / 2;
}
