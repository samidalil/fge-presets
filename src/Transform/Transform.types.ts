import type { VectorType } from "../types";

export type TransformType = {
  readonly position: VectorType;
  readonly rotation: number;
  readonly scale: VectorType;
};
