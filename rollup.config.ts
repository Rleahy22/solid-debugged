import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './index.ts',
  output: {
    dir: 'output',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    replace({
      _SOLID_DEV_: process.env.NODE_ENV === 'production' ? '' : 'VALUE',
      preventAssignment: true,
    }),
  ],
};
