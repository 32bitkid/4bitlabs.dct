import { createDctOfN } from './dct-n.js';
import type { DiscreteCosineTransformation } from './discrete-cosine-transformation.js';
import * as fast from './fast-dct-8.js';

export { dct, idct } from './dct.js';
export { createDctOfN };

export const DCT8 = createDctOfN(8);
export const FastDCT8: DiscreteCosineTransformation = {
  transform: fast.dct,
  inverse: fast.idct,
};
