import { type DiscreteCosineTransformation } from './discrete-cosine-transformation';
import { createDctOfN } from './dct-n';
import * as fast from './fast-dct-8';

export { dct, idct } from './dct';
export { createDctOfN };

export const DCT8 = createDctOfN(8);
export const FastDCT8: DiscreteCosineTransformation = {
  transform: fast.dct,
  inverse: fast.idct,
};
