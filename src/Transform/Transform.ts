import Vector from "../Vector";

import type { Transform } from "./Transform.types";

export const create = (position = Vector.zero, scale = Vector.one, rotation = 0): Transform => ({
  position,
  scale,
  rotation,
});
