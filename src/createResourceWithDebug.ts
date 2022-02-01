import { createResource, ResourceFetcher, ResourceFetcherInfo, ResourceReturn } from 'solid-js';

import initializeSolidDebug from './initializeSolidDebug';

if ('_SOLID_DEV_') {
  initializeSolidDebug();
}

export default function createResourceWithDebug<T, S>(
  source: false | S | (() => false | S | null) | null,
  fetcher: ResourceFetcher<S, T>,
  options?: T extends undefined
    ? {
        initialValue?: T;
        name?: string;
        globalRefetch?: boolean;
        onHydrated?: <S, T>(k: S, info: ResourceFetcherInfo<T>) => void;
      }
    : {
        initialValue: T;
        name?: string;
        globalRefetch?: boolean;
        onHydrated?: <S, T>(k: S, info: ResourceFetcherInfo<T>) => void;
      },
): ResourceReturn<T | undefined> {
  const [resource, { mutate, refetch }] = createResource(source, fetcher, options || undefined);

  if ('_SOLID_DEV_') {
    const componentName =
      new Error().stack?.match(/at .*?\n.*? at (.*?) /)?.[1]?.replace('_Hot$$', '') ||
      `component${Math.floor(Math.random() * 1_000_000)}`;
    const key = options?.name || `prop${Math.floor(Math.random() * 1_000_000)}`;

    if (
      (window as any).SOLID_DEBUG?.[componentName] &&
      typeof (window as any).SOLID_DEBUG[componentName] === 'object'
    ) {
      (window as any).SOLID_DEBUG[componentName] = {
        ...(window as any).SOLID_DEBUG[componentName],
        $$Resources: {
          ...((window as any).SOLID_DEBUG[componentName].$$Resources || {}),
          [key]: resource,
        },
      };
    } else {
      (window as any).SOLID_DEBUG[componentName] = {
        $$Resources: {
          [key]: resource,
        },
      };
    }

    (window as any).SOLID_DEBUG[componentName] = {
      ...(window as any).SOLID_DEBUG[componentName],
      $$Resources: {
        ...((window as any).SOLID_DEBUG[componentName].$$Resources || {}),
        [key]: resource,
      },
    };
  }

  return [resource, { mutate, refetch }];
}
