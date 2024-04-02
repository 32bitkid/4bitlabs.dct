import type { Vector } from './vector';

export interface DiscreteCosineTransformation {
  transform(vIn: Vector, vOut: Vector): void;
  inverse(vIn: Vector, vOut: Vector): void;
}
