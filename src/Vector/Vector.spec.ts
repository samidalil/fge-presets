import test from "ava";

import { add, addScalar, clone, create, divide, multiply, subtract, subtractScalar, x, y, z, zero } from "./Vector";

test("create returns an array with 3 default elements equal to 0", (t) => {
  t.deepEqual(create(), [0, 0, 0]);
  t.deepEqual(create(), zero);
});

test("Creates a vector with different components", (t) => {
  t.deepEqual(create(1, 2, 3), [1, 2, 3])
});

test("Vector component getters are usable", (t) => {
  const v = create(1, 2, 3);

  t.deepEqual([x(v), y(v), z(v)], [1, 2, 3])
});

test("Vector addition", (t) => {
  const a1 = [1, 2, 3] as const;
  const a2 = [2, 4, 8] as const;

  const v1 = create(...a1);
  const v2 = create(...a2);

  t.deepEqual(add(v1, v2), [a1[0] + a2[0], a1[1] + a2[1], a1[2] + a2[2]]);
});

test("Vector subtraction", (t) => {
  const a1 = [1, 2, 3] as const;
  const a2 = [2, 4, 8] as const;

  const v1 = create(...a1);
  const v2 = create(...a2);

  t.deepEqual(subtract(v1, v2), [a1[0] - a2[0], a1[1] - a2[1], a1[2] - a2[2]]);
});

test("Vector addition with scalar", (t) => {
  const a = [1, 2, 3] as const;
  const scalar = 2;

  const v = create(...a);

  t.deepEqual(addScalar(v, scalar), [a[0] + scalar, a[1] + scalar, a[2] + scalar]);
});

test("Vector subtraction with scalar", (t) => {
  const a = [1, 2, 3] as const;
  const scalar = 2;

  const v = create(...a);

  t.deepEqual(subtractScalar(v, scalar), [a[0] - scalar, a[1] - scalar, a[2] - scalar]);
});

test("Vector multiplication with scalar", (t) => {
  const a = [1, 2, 3] as const;
  const scalar = 2;

  const v = create(...a);

  t.deepEqual(multiply(v, scalar), [a[0] * scalar, a[1] * scalar, a[2] * scalar]);
});

test("Vector division with scalar", (t) => {
  const a = [1, 2, 3] as const;
  const scalar = 2;

  const v = create(...a);

  t.deepEqual(divide(v, scalar), [a[0] / scalar, a[1] / scalar, a[2] / scalar]);
});

test("Cloning a vector creates another reference", (t) => {
  const v = create();

  t.is(v, v);
  t.not(v, clone(v));
});
