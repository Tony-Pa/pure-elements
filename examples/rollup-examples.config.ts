import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import scss from 'rollup-plugin-scss';
import template from 'rollup-plugin-html-literals';

export default [
  {
    input: `examples/index.ts`,
    output: [{ file: 'examples/js/main.js', format: 'iife' }],
    watch: {
      include: ['src/**', 'examples/**'],
    },
    plugins: [
      scss({
        outputStyle: 'compressed',
        output: false,
      }),
      template(),
      typescript({ sourceMap: false }),
      terser(),
// @ts-ignore
      process.argv.includes('-w') && serve(['dist', 'examples']),
    ],
  },
];
