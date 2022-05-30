import type { GameObject, GameObjectId, Transform } from "../types";

export type Scene = {
  readonly hierarchy: SceneHierarchy;
  readonly objects: readonly SceneObject[];
};

export type SceneHierarchy = {
  readonly childrenIdsById: Record<GameObjectId, readonly GameObjectId[]>;
  readonly parentByChildId: Record<GameObjectId, GameObjectId>;
  readonly rootId: GameObjectId;
};

export type SceneObject = GameObject<SceneObjectConstraint>;

export type SceneObjectConstraint = {
  readonly transform: Transform;
};
