/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-empty-function */
import { walk } from 'estree-walker';
import postcss from 'postcss';
import * as fs from 'fs/promises';
import path from 'path';
import * as postCssValueParser from 'postcss-values-parser';

import postcssCustomProperties from 'postcss-custom-properties';
import postcssCustomPropertiesFallback from 'postcss-custom-properties-fallback';
// import{ plugin as postCssAdvancedVariables} from 'postcss-advanced-variables'
// import * as colorFuncvions from 'postcss-color-function'

export default function addFallbackValues(options = {}) {
  const { hook = 'buildEnd' } = options;

  let properties = null;

  const extractCustomProperties = async () => {
    const CSS_PATH = path.resolve('../../out-css/style/index.css');
    console.log('processing main css...');

    try {
      const customProperties = { customProperties: {} };

      const cssFile = await fs.readFile(CSS_PATH, 'utf8');

      const cssResult = await postcss([
        postcssCustomProperties({
          importFrom: [CSS_PATH],
          exportTo: customProperties,
        }),
      ]).process(cssFile, { from: CSS_PATH, to: './css-test.css' });

      for (const key in customProperties.customProperties) {
        const valueNode = postCssValueParser.parse(
          customProperties.customProperties[key]
        );
        const onlyVars = valueNode.nodes.filter(node => node.isVar);
        if (onlyVars.length === 1) {
          const keyToFind = onlyVars[0].params
            .trim()
            .substring(1, onlyVars[0].params.length - 1);

          customProperties.customProperties[key] =
            customProperties.customProperties[keyToFind];
        }
      }

      return customProperties;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    name: 'add-fallback-values',
    async buildStart() {
      console.log('buildStart');
      properties = await extractCustomProperties();
    },
    async transform(code) {
      const ast = this.parse(code);

      //add filter   https://github.com/rollup/plugins/tree/master/packages/pluginutils#createfilter

      walk(ast, {
        enter(node, parent, prop, index) {
          //TODO refactor so it starts at the property definition with identifieer styles
          if (
            node.type === 'TaggedTemplateExpression' &&
            parent.type === 'ArrayExpression'
          ) {
            if (node.tag.name === 'css') {
              let cssString = node.quasi.quasis[0].value.raw;

              postcss([
                postcssCustomPropertiesFallback({ importFrom: properties }),
              ])
                .process(cssString)
                .then(result => {
                  node.quasi.quasis[0].value.raw = result.css;
                  node.quasi.quasis[0].value.cooked = result.css;
                  console.log("MY NEW NODE",node.quasi.quasis[0].value.raw)
                  
                });
            }
          }
        },
      });

      // return {
      //   code: ast,

      // };
    },
  };
}
