import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import scss from 'rollup-plugin-scss';
import template from 'rollup-plugin-html-literals';

export default [
  {
    input: `index.ts`,
    output: [{ file: 'js/main.js', format: 'iife', name: 'examples' }],
    watch: {
      include: ['**'],
    },
    plugins: [
      nodeResolve(),
      scss({
        outputStyle: 'compressed',
        output: false,
      }),
      template(),
      typescript({ sourceMap: false }),
      terser(),
      process.argv.includes('-w') && serve(),
    ],
  },
];
