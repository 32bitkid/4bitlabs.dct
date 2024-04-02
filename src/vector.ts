export type IntegerVector =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array;

export type FloatVector = Float32Array | Float64Array;

export type Vector = number[] | IntegerVector | FloatVector;
