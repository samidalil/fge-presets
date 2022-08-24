import type { AnyState } from "fge";

export type GameObjectIdType = string;

export type GameObjectType<D extends AnyState> = {
  readonly data: D;
  readonly id: GameObjectIdType;
  readonly name: string;
  readonly parentId: GameObjectIdType;
};
