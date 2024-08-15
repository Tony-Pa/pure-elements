import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: `src/index.ts`,
    output: [{ file: 'dist/index.js' }],
    plugins: [
      typescript({ sourceMap: false, declaration: true, declarationDir: 'dist' }),
      terser(),
    ],
  },
];
