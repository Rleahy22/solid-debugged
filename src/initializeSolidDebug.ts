import reduceObject from './reduceObject';

const initializeSolidDebug = '_SOLID_DEV_'
  ? () => {
      if (!(window as any).SOLID_DEBUG) {
        (window as any).SOLID_DEBUG = {};
      }

      if (!(window as any).showSolidState) {
        (window as any).showSolidState = () => {
          return reduceObject((window as any).SOLID_DEBUG);
        };
      }
    }
  : () => {};

export default initializeSolidDebug;
