import { createStore, SetStoreFunction, Store, StoreNode } from 'solid-js/store';
import initializeSolidDebug from './initializeSolidDebug';

if ('_SOLID_DEV_') {
  initializeSolidDebug();
}

export default function createStoreWithDebug<T extends StoreNode>(
  store: T | Store<T>,
  options?:
    | {
        name?: string | undefined;
      }
    | undefined,
): [get: Store<T>, set: SetStoreFunction<T>] {
  const newStore = createStore(store, options);

  if ('_SOLID_DEV_') {
    const key = options?.name || `$store${Math.floor(Math.random() * 1_000_000)}`;

    if (
      (window as any).SOLID_DEBUG?.$$Store &&
      typeof (window as any).SOLID_DEBUG.$$Store === 'object'
    ) {
      (window as any).SOLID_DEBUG.$$Store = {
        ...(window as any).SOLID_DEBUG.$$Store,
        [key]: store,
      };
    } else {
      (window as any).SOLID_DEBUG.$$Store = {
        [key]: store,
      };
    }

    (window as any).SOLID_DEBUG.$$Store = {
      ...(window as any).SOLID_DEBUG.$$Store,
      [key]: store,
    };
  }

  return newStore;
}
