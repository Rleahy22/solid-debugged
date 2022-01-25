const reduceObject = (obj: Record<string, any>): Record<string, any> => {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];

    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      return { ...acc, [key]: reduceObject(value) };
    }

    return { ...acc, [key]: typeof value === 'function' ? value() : value };
  }, {});
};

export default reduceObject;
