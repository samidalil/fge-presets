import { patch } from "fge";

import GameObject from "../GameObject";
import Transform from "../Transform";
import type { SceneObjectType, SceneType } from "../types";

export const add = (scene: SceneType, sceneObject: SceneObjectType, parent?: SceneObjectType) =>
  sceneObject.id in scene.hierarchy.parentByChildId
    ? null
    : unsafeAdd(scene, sceneObject, parent);

export const create = (root = GameObject.create("root", { transform: Transform.create() })): SceneType => ({
  hierarchy: {
    childrenIdsById: { [root.id]: [] },
    parentByChildId: { [root.id]: "" },
    rootId: root.id,
  },
  objects: [root],
});

export const instantiate = (scene: SceneType, prefab: SceneObjectType, parent?: SceneObjectType) =>
  add(scene, GameObject.clone(prefab), parent);

export const remove = (scene: SceneType, sceneObject: SceneObjectType) =>
  sceneObject.id !== scene.hierarchy.rootId
    && sceneObject.id in scene.hierarchy.parentByChildId
    ? unsafeRemove(scene, sceneObject)
    : null;

export const unsafeAdd = (scene: SceneType, sceneObject: SceneObjectType, parent?: SceneObjectType) => {
  const parentId = parent ? parent.id : scene.hierarchy.rootId;

  return patch(scene, {
    hierarchy: {
      childrenIdsById: {
        [parentId]: [...scene.hierarchy.childrenIdsById[parentId], sceneObject.id],
        [sceneObject.id]: [],
      },
      parentByChildId: { [sceneObject.id]: parentId },
    },
    objects: scene.objects.concat(sceneObject),
  });
};

export const unsafeRemove = (scene: SceneType, sceneObject: SceneObjectType): SceneType => {
  const parentId = scene.hierarchy.parentByChildId[sceneObject.id];
  const { [sceneObject.id]: _, ...parentByChildId } = scene.hierarchy.parentByChildId;

  return ({
    hierarchy: {
      childrenIdsById: {
        ...scene.hierarchy.childrenIdsById,
        [parentId]: scene.hierarchy.childrenIdsById[parentId].filter(id => id !== sceneObject.id),
      },
      parentByChildId,
      rootId: scene.hierarchy.rootId,
    },
    objects: scene.objects.filter(object => object.id === sceneObject.id),
  });
};
