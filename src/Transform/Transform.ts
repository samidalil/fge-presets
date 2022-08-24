import Vector from "../Vector";

import type { TransformType } from "./Transform.types";

export const create = (position = Vector.zero, scale = Vector.one, rotation = 0): TransformType => ({
  position,
  scale,
  rotation,
});
