import type { Vector } from './vector.js';

export interface DiscreteCosineTransformation {
  transform(vIn: Vector, vOut: Vector): void;
  inverse(vIn: Vector, vOut: Vector): void;
}
