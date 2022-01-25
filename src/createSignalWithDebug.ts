import { Accessor, createSignal, Setter } from 'solid-js';
import initializeSolidDebug from './initializeSolidDebug';

if ('_SOLID_DEV_') {
  initializeSolidDebug();
}

export default function createSignalWithDebug<T>(
  initialValue: T,
  options?:
    | {
        equals?: false | ((prev: any, next: any) => boolean) | undefined;
        name?: string | undefined;
        internal?: boolean | undefined;
      }
    | undefined,
): [get: Accessor<T>, set: Setter<T>] {
  const [value, setValue] = createSignal(initialValue, options);

  if ('_SOLID_DEV_') {
    const componentName =
      new Error().stack?.match(/at .*?\n.*? at (.*?) /)?.[1] ||
      `component${Math.random() * 1_000_000}`;
    const key = options?.name || `prop${Math.floor(Math.random() * 1_000_000)}`;

    if (
      (window as any).SOLID_DEBUG?.[componentName] &&
      typeof (window as any).SOLID_DEBUG[componentName] === 'object'
    ) {
      (window as any).SOLID_DEBUG[componentName] = {
        ...(window as any).SOLID_DEBUG[componentName],
        [key]: value,
      };
    } else {
      (window as any).SOLID_DEBUG[componentName] = {
        [key]: value,
      };
    }

    (window as any).SOLID_DEBUG[componentName] = {
      ...(window as any).SOLID_DEBUG[componentName],
      [key]: value,
    };
  }

  return [value, setValue];
}
