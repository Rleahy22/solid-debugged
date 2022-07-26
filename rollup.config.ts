import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  typescript(),
  replace({
    _SOLID_DEV_: process.env.NODE_ENV === 'production' ? '' : 'VALUE',
    preventAssignment: true,
  }),
];

export default [
  {
    input: './index.ts',
    output: [
      {
        file: 'dist/solidDebugged.cjs',
        format: 'cjs',
      },
      {
        file: 'dist/solidDebugged.js',
        format: 'es',
      },
    ],
    plugins: [
      typescript(),
      replace({
        _SOLID_DEV_: '',
        preventAssignment: true,
      }),
    ],
  },
  {
    input: './index.ts',
    output: [
      {
        file: 'dist/dev.cjs',
        format: 'cjs',
      },
      {
        file: 'dist/dev.js',
        format: 'es',
      },
    ],
    plugins,
  },
];
