import esbuild from 'rollup-plugin-esbuild';
import typescript2 from 'rollup-plugin-typescript2';
//import dts from 'rollup-plugin-dts';

export const UUIProdConfig = ({ entryPoints = [], bundles = [] }) => {
  return [
    ...entryPoints.map(name => {
      return {
        input: `src/${name}.ts`,
        output: {
          file: `./out/${name}.mjs`,
          format: 'es',
        },
        plugins: [
          typescript2({
            tsconfigOverride: {
              compilerOptions: { 
                paths: {
                  "@umbraco-ui/uui-avatar/*": [
                    "packages/uui-avatar/out/*"
                  ],
                  "@umbraco-ui/uui-avatar-group/*": [
                    "packages/uui-avatar-group/out/*"
                  ],
                  "@umbraco-ui/uui-base/*": [
                    "packages/uui-base/out/*"
                  ],
                  "@umbraco-ui/uui-breadcrumbs/*": [
                    "packages/uui-breadcrumbs/out/*"
                  ],
                  "@umbraco-ui/uui-button/*": [
                    "packages/uui-button/out/*"
                  ],
                  "@umbraco-ui/uui-checkbox/*": [
                    "packages/uui-checkbox/out/*"
                  ],
                  "@umbraco-ui/uui-loader/*": [
                    "packages/uui-loader/out/*"
                  ],
                  "@umbraco-ui/uui-table/*": [
                    "packages/uui-table/out/*"
                  ],
                  "@umbraco-ui/uui-tag/*": [
                    "packages/uui-tag/out/*"
                  ],
                  "@umbraco-ui/uui-textfield/*": [
                    "packages/uui-textfield/out/*"
                  ],
                  "@umbraco-ui/uui-toggle/*": [
                    "packages/uui-toggle/out/*"
                  ],
                  "@umbraco-ui/uui-loader-bar/*": [
                    "packages/uui-loader-bar/out/*"
                  ],
                  "@umbraco-ui/uui-loader-circle/*": [
                    "packages/uui-loader-circle/out/*"
                  ]
                }
              },
            },
            clean: true,
          }),
          esbuild(),
        ],
      };
    }),
    ...bundles.map(name => {
      return {
        input: `src/${name}.ts`,
        output: {
          dir: './out/dist',
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
