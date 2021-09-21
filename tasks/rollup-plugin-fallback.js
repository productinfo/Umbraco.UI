/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-empty-function */
import { walk } from 'estree-walker';
import postcss from 'postcss';
import * as fs from 'fs/promises';
import path from 'path';
import parse from 'postcss-values-parser'

import postcssCustomProperties from 'postcss-custom-properties';
// import{ plugin as postCssAdvancedVariables} from 'postcss-advanced-variables'
// import * as colorFuncvions from 'postcss-color-function'

export default function addFallbackValues (options = {}) {
    const { hook = 'buildEnd' } = options
    
    let properties = null;

    const processMainCSS =  async () => {


      const CSS_PATH = path.resolve('../../out-css/style/index.css');
        console.log('processing main css...');

        try {
          const customProperties = { customProperties: {} }

          const cssFile = await fs.readFile(CSS_PATH, 'utf8');
          
          const cssResult = await postcss([postcssCustomProperties({
            importFrom: [CSS_PATH],
            exportTo: customProperties
          })])
            .process(cssFile, { from: CSS_PATH, to: './css-test.css' })
          
          return customProperties;

        } catch (err) {
          console.log(err)
        }

    }
    

    return {
      name: 'add-fallback-values',
      async buildStart (){
        console.log('buildStart');
        properties = await processMainCSS();
        //console.log(properties);
      },
      async transform (code) {

        //console.log('your custom properties',properties)

        const ast = this.parse(code);

        walk(ast, {
          enter(node, parent, prop, index) {
            if (node.type === "TaggedTemplateExpression" && parent.type === "ArrayExpression") {

              if (node.tag.name === 'css') {
                // /.replace('\n', '')
                //console.log('NODE',node, 'PARENT',parent, 'PROP', prop, 'INDEX', index)
                 let css = node.quasi.quasis[0].value.raw;
                //console.log(node.quasi.quasis[0].value.raw)
                postcss.parse(css);
              }
              // console.log(css)

            }
          }
        });

      }
    }
  }