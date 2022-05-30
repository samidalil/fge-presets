import type { Vector } from "../types";

export type Transform = {
  readonly position: Vector;
  readonly rotation: number;
  readonly scale: Vector;
};
