import { Resource } from 'solid-js';

const reduceResources = (obj: Record<string, Resource<unknown>>): Record<string, any> => {
  return Object.keys(obj).reduce((acc, key) => {
    const resource = obj[key];

    return {
      ...acc,
      [key]: {
        loading: resource.loading,
        error: resource.error,
        [key]: resource(),
      },
    };
  }, {});
};

const reduceObject = (obj: Record<string, any>): Record<string, any> => {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];

    if (key === '$$Resources') {
      return { ...acc, [key]: reduceResources(value) };
    }

    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      return { ...acc, [key]: reduceObject(value) };
    }

    return { ...acc, [key]: typeof value === 'function' ? value() : value };
  }, {});
};

export default reduceObject;
