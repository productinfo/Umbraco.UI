/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-empty-function */
import { walk } from 'estree-walker';
import postcss from 'postcss';
import * as fs from 'fs/promises';
import path from 'path';
import { parse, stringify } from 'postcss-values-parser';

import postcssCustomProperties from 'postcss-custom-properties';
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

      // await postcssCustomProperties.process(
      //   cssFile,
      //   { from: CSS_PATH, to: './css-test.css' },
      //   {
      //     importFrom: [CSS_PATH],
      //     exportTo: customProperties,
      //   } /*, processOptions, pluginOptions */
      // );

      const cssResult = await postcss([
        postcssCustomProperties({
          importFrom: [CSS_PATH],
          exportTo: customProperties,
        }),
      ]).process(cssFile, { from: CSS_PATH, to: './css-test.css' });

      for (const key in customProperties.customProperties) {
        const valueNode = parse(customProperties.customProperties[key]);
        const onlyVars = valueNode.nodes.filter(node => node.isVar)
        if (onlyVars.length === 1) {
           
          const keyToFind = onlyVars[0].params.trim().substring(1, onlyVars[0].params.length-1);

          customProperties.customProperties[key] = customProperties.customProperties[keyToFind];

          //console.log(key, customProperties.customProperties[key])

        }
        //if (valueNode.nodes[0].isVar) console.log(key, valueNode);
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
    console.log(properties);

     
    //   //console.log(properties);
     },
    async transform(code) {
      // console.log(
      //   'your custom properties',
      //   properties.customProperties['--uui-color-cocoa-brown-dark']
      // );

      const ast = this.parse(code);

      walk(ast, {
        enter(node, parent, prop, index) {
          if (
            node.type === 'TaggedTemplateExpression' &&
            parent.type === 'ArrayExpression'
          ) {
            if (node.tag.name === 'css') {
              // /.replace('\n', '')
              //console.log('NODE',node, 'PARENT',parent, 'PROP', prop, 'INDEX', index)
              let css = node.quasi.quasis[0].value.raw;
              //console.log(node.quasi.quasis[0].value.raw)
              postcss.parse(css);
            }
            // console.log(css)
          }
        },
      });
    },
  };
}
