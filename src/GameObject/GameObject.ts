import { type AnyState, patch } from "fge";

import type { GameObject } from "../types";

export const clone = <D extends AnyState>(go: GameObject<D>): GameObject<D> => ({
  ...create(`${go.name}-clone`, structuredClone(go.data)),
  parentId: go.parentId,
});

export const create = <D extends AnyState>(name: string, data: D): GameObject<D> => ({
  data,
  id: `${name}-${Date.now()}-${Math.floor(Math.random() * 1e8)}`,
  name,
  parentId: "",
});

export const dataAccessors = <C, K extends string>(property: K) => {
  type DConstraint = {
    readonly [property in K]: C;
  };

  return {
    get: <D extends DConstraint>(go: GameObject<D>) => getData<D, K>(go, property),
    set: <D extends DConstraint>(go: GameObject<D>, data: D[K]) => setData<D, K>(go, property, data),
  };
};

export const getData = <D extends AnyState, K extends keyof D>(go: GameObject<D>, property: K): D[K] => go.data[property];

export const setData = <D extends AnyState, K extends keyof D>(go: GameObject<D>, property: K, data: D[K]): GameObject<D> => ({
  ...go,
  data: {
    ...go.data,
    [property]: patch(go.data[property], data)
  },
});

export const setParent = (go: GameObject<AnyState>, parent: GameObject<AnyState>) => patch(go, { parentId: parent.id });
