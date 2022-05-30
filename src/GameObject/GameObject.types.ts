import type { AnyState } from "fge";

export type GameObjectId = string;

export type GameObject<D extends AnyState> = {
  readonly data: D;
  readonly id: GameObjectId;
  readonly name: string;
  readonly parentId: GameObjectId;
};
