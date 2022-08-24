import type { GameObjectIdType, GameObjectType, TransformType } from "../types";

export type SceneType = {
  readonly hierarchy: SceneHierarchyType;
  readonly objects: readonly SceneObjectType[];
};

export type SceneHierarchyType = {
  readonly childrenIdsById: Record<GameObjectIdType, readonly GameObjectIdType[]>;
  readonly parentByChildId: Record<GameObjectIdType, GameObjectIdType>;
  readonly rootId: GameObjectIdType;
};

export type SceneObjectType = GameObjectType<SceneObjectConstraintType>;

export type SceneObjectConstraintType = {
  readonly transform: TransformType;
};
