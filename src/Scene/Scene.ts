import { patch } from "fge";

import GameObject from "../GameObject";
import Transform from "../Transform";
import type { Scene, SceneObject } from "../types";

export const add = (scene: Scene, sceneObject: SceneObject, parent?: SceneObject) =>
  sceneObject.id in scene.hierarchy.parentByChildId
    ? null
    : unsafeAdd(scene, sceneObject, parent);

export const create = (root = GameObject.create("root", { transform: Transform.create() })): Scene => ({
  hierarchy: {
    childrenIdsById: { [root.id]: [] },
    parentByChildId: { [root.id]: "" },
    rootId: root.id,
  },
  objects: [root],
});

export const instantiate = (scene: Scene, prefab: SceneObject, parent?: SceneObject) =>
  add(scene, GameObject.clone(prefab), parent);

export const remove = (scene: Scene, sceneObject: SceneObject) =>
  sceneObject.id !== scene.hierarchy.rootId
    && sceneObject.id in scene.hierarchy.parentByChildId
    ? unsafeRemove(scene, sceneObject)
    : null;

export const unsafeAdd = (scene: Scene, sceneObject: SceneObject, parent?: SceneObject) => {
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

export const unsafeRemove = (scene: Scene, sceneObject: SceneObject): Scene => {
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
