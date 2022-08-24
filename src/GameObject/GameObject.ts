import { type AnyState, patch } from "fge";

import type { GameObjectType } from "../types";

export const clone = <D extends AnyState>(go: GameObjectType<D>): GameObjectType<D> => ({
  ...create(`${go.name}-clone`, structuredClone(go.data)),
  parentId: go.parentId,
});

export const create = <D extends AnyState>(name: string, data: D): GameObjectType<D> => ({
  data,
  id: `${name}-${Date.now()}-${Math.floor(Math.random() * 1e8)}`,
  name,
  parentId: "",
});

export const dataAccessors = <C, K extends string>(property: K) => ({
  get: <D extends { readonly [property in K]: C; }>(go: GameObjectType<D>) => getData<D, K>(go, property),
  set: <D extends { readonly [property in K]: C; }>(go: GameObjectType<D>, data: D[K]) => setData<D, K>(go, property, data),
});

export const getData = <D extends AnyState, K extends keyof D>(go: GameObjectType<D>, property: K): D[K] => go.data[property];

export const setData = <D extends AnyState, K extends keyof D>(go: GameObjectType<D>, property: K, data: D[K]): GameObjectType<D> => ({
  ...go,
  data: {
    ...go.data,
    [property]: patch(go.data[property], data)
  },
});

export const setParent = (go: GameObjectType<AnyState>, parent: GameObjectType<AnyState>) => patch(go, { parentId: parent.id });
