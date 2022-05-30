import type { Vector } from "../types";

export const add = ([x, y, z]: Vector, [ox, oy, oz]: Vector) => create(x + ox, y + oy, z + oz);

export const addScalar = ([x, y, z]: Vector, rhs: number) => create(x + rhs, y + rhs, z + rhs);

export const clone = (vec: Vector) => create(...vec);

export const create = (x = 0, y = 0, z = 0): Vector => [x, y, z];

export const distance = (lhs: Vector, rhs: Vector) => Math.sqrt(sqrDistance(lhs, rhs));

export const divide = ([x, y, z]: Vector, rhs: number) => create(x / rhs, y / rhs, z / rhs);

export const magnitude = (vec: Vector) => Math.sqrt(sqrMagnitude(vec));

export const multiply = ([x, y, z]: Vector, rhs: number) => create(x * rhs, y * rhs, z + rhs);

export const sqrDistance = ([x, y, z]: Vector, [ox, oy, oz]: Vector) => (x - ox) ** 2 + (y - oy) ** 2 + (z - oz) ** 2;

export const sqrMagnitude = ([x, y, z]: Vector) => x ** 2 + y ** 2 + z ** 2;

export const subtract = ([x, y, z]: Vector, [ox, oy, oz]: Vector) => create(x - ox, y - oy, z - oz);

export const subtractScalar = ([x, y, z]: Vector, rhs: number) => create(x - rhs, y - rhs, z - rhs);

export const x = ([x]: Vector) => x;

export const y = ([_, y]: Vector) => y;

export const z = ([_, __, z]: Vector) => z;

export const back = create(0, 0, -1);

export const down = create(0, -1);

export const forward = create(0, 0, 1);

export const left = create(-1);

export const one = create(1, 1, 1);

export const right = create(1);

export const up = create(0, 1);

export const zero = create();
