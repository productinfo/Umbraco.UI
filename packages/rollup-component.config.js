import esbuild from 'rollup-plugin-esbuild';
import typescript2 from 'rollup-plugin-typescript2';
//import dts from 'rollup-plugin-dts';
import addFallbackValues from '../tasks/rollup-plugin-fallback'
const packageName = require('./package.json').name.replace('@umbraco-ui/', '');

export const UUIProdConfig = ({
  entryPoints = [],
  bundles = [],
  external = [],
} = options) => {
  return [
    ...entryPoints.map(name => {
      return {
        input: `src/${name}.ts`,
        output: {
          file: `./dist/${name}.mjs`,
          format: 'es',
        },
        plugins: [addFallbackValues(), typescript2({ clean: true }), esbuild()],
      };
    }),
    ...bundles.map(name => {
      return {
        input: `src/${name}.ts`,
        output: {
          dir: './dist',
          format: 'umd',
          sourcemap: true,
        },
        plugins: [esbuild()],
      };
    }),
    /*
    ...bundles.map(name => {
      return {
        input: `${name}.d.ts`,
        output: {
          file: `dist/${name}.d.ts`,
          format: 'es'
        },
        plugins: [dts()]
      }
    }),
    */
  ];
};
