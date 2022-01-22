import { Accessor, createSignal, Setter } from 'solid-js';

if ('_SOLID_DEV_') {
  (window as any).SOLID_DEBUG = {};
}

export function createSignalWithDebug<T>(
  initialValue: any,
  options?:
    | {
        equals?: false | ((prev: any, next: any) => boolean) | undefined;
        name?: string | undefined;
        internal?: boolean | undefined;
      }
    | undefined,
  key?: string,
  context?: string,
): [get: Accessor<T>, set: Setter<T>] {
  const [value, setValue] = createSignal(initialValue, options);

  if ('_SOLID_DEV_') {
    if (!key) {
      key = new Error().stack?.match(/at .*?\n.*? at (.*?) /)?.[1] || Math.random().toString();
    }

    if (context) {
      if (
        (window as any).SOLID_DEBUG.context &&
        typeof (window as any).SOLID_DEBUG.context === 'object'
      ) {
        (window as any).SOLID_DEBUG = {
          ...(window as any).SOLID_DEBUG,
          [context]: {
            ...(window as any)['SOLID_DEBUG']['context'],
            [key]: value,
          },
        };
      } else {
        (window as any).SOLID_DEBUG['context'] = {
          [key]: value,
        };
      }
    } else {
      (window as any).SOLID_DEBUG = {
        ...(window as any).SOLID_DEBUG,
        [key]: value,
      };
    }
  }

  return [value, setValue];
}
