# `@4bitlabs/dct`

JavaScript/TypeScript implementations of the [<abbr title="discrete cosine transform">DCT</abbr>][wikipedia], with support for [`TypedArrays`][TypedArray].

## DCT-II and DCT-III

```ts
import { dct, idct } from '@4bitlabs/dct';

const signal = Uint8ClampedArray.of(/* data */);

// Calculate DCT-II from signal
const coefficients = new Float64Array(signal.length);
dct(signal, coefficients);

// Reconstruct signal from coefficients with DCT-III
const reconstruction = new Uint8ClampedArray(coefficients.length);
idct(coefficients, reconstruction);
```

## Fixed-length DCTs

The `dct()` and `idct()` will produce an output of the same `length` as the signal `length`. This can be convenient, however
the implementations make no optimizations for the number of elements in the vector provided. If the
number of elements is known in advance, then you can use `createDctOfN(n)`. For example, to create a 16-element DCT:

```ts
import { createDctOfN } from '@4bitlabs';

const dct16 = createDctOfN(16);

// DCT-II
const coefficients = new Float64Array(16);
dct16.transform(data, coefficients);

// DCT-III
const reconstruction = new Uint8ClampedArray(16);
dct16.inverse(coefficients, reconstruction);
```

## Fast 8-element DCT

An faster, optimized version of an 8-element DCT is available and implements the same interface:

```ts
import { dct, idct } from '@4bitlabs/dct/fast-dtc-8';

const signal = Uint8ClampedArray.of(0, 0, 0, 0, 0, 0, 0, 0);

// DCT-II
const coefficients = new Float64Array(8);
dct(signal, coefficients);

// DCT-III
const reconstruction = new Uint8ClampedArray(8);
idct(coefficients, reconstruction);
```

[wikipedia]: https://en.wikipedia.org/wiki/Discrete_cosine_transform
[TypedArray]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
