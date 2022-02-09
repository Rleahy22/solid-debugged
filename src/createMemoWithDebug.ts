import { createMemo } from 'solid-js';
import { EffectFunction } from 'solid-js/types/reactive/signal';
import initializeSolidDebug from './initializeSolidDebug';

if ('_SOLID_DEV_') {
  initializeSolidDebug();
}

export default function createMemoWithDebug<T>(
  fn: EffectFunction<T | undefined, T>,
  value?: T,
  options?: { name?: string; equals?: false | ((prev: T, next: T) => boolean) },
): () => T {
  const returnValue = createMemo(fn, value, options);

  if ('_SOLID_DEV_') {
    const componentName =
      new Error().stack?.match(/at .*?\n.*? at (.*?) /)?.[1]?.replace('_Hot$$', '') ||
      `component${Math.floor(Math.random() * 1_000_000)}`;
    const key = options?.name || `$memo${Math.floor(Math.random() * 1_000_000)}`;

    if (
      (window as any).SOLID_DEBUG?.[componentName] &&
      typeof (window as any).SOLID_DEBUG[componentName] === 'object'
    ) {
      (window as any).SOLID_DEBUG[componentName] = {
        ...(window as any).SOLID_DEBUG[componentName],
        [key]: returnValue,
      };
    } else {
      (window as any).SOLID_DEBUG[componentName] = {
        [key]: returnValue,
      };
    }

    (window as any).SOLID_DEBUG[componentName] = {
      ...(window as any).SOLID_DEBUG[componentName],
      [key]: returnValue,
    };
  }

  return returnValue;
}
