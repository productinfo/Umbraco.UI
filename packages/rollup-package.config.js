import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import processLitCSSFallbackValues from '../scripts/rollup-plugin-fallback-values';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { readPackageJson } from '../scripts/modify-pkgjson.mjs';

const processLitCSSOptions = {
  include: ['**/uui-*.ts', '**/*Mixin.ts', '**/*.styles.ts'],
  exclude: ['**/uui-base/lib/events/**'],
  mainStylesPath: '../uui-css/dist/root.css',
  autoprefixerEnv: 'last 1 version',
};

const esbuidOptions = { minify: true };

const createEsModulesConfig = (entryPoints = []) => {
  return [
    ...entryPoints.map(name => {
      return {
        input: `./lib/${name}.ts`,
        output: {
          file: `./lib/${name}.js`,
          format: 'es',
        },
        plugins: [processLitCSSFallbackValues(processLitCSSOptions), esbuild()],
      };
    }),
  ];
};

const createBundleConfig = (bundle, namespace) => {
  const packageJson = readPackageJson('./');
  const bundleName = packageJson.name.replace('@umbraco-ui/', '');

  return bundle
    ? {
        input: `lib/${bundle}.ts`,
        output: {
          file: `./dist/${bundleName}.min.js`,
          format: 'umd',
          sourcemap: true,
          name: namespace
        },
        plugins: [
          nodeResolve(),
          processLitCSSFallbackValues(processLitCSSOptions),
          minifyHTML(),
          esbuild(esbuidOptions),
        ],
      }
    : undefined;
};

export const UUIProdConfig = ({ entryPoints = [], bundle, namespace = '' }) => {
  const esModulesConfig = createEsModulesConfig(entryPoints);
  const bundleConfig = createBundleConfig(bundle, namespace);
  return [...esModulesConfig, bundleConfig].filter(x => x);
};
