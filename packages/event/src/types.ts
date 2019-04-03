export type Listener<A extends unknown[], R> = A extends [infer A1, infer A2, infer A3]
  ? (a1: A1, a2: A2, a3: A3) => R
  : A extends [infer A1, infer A2]
  ? (a1: A1, a2: A2) => R
  : A extends [infer A1]
  ? (a1: A1) => R
  : A extends unknown[]
  ? (...args: A) => R
  : never;

export type Scope = string;
