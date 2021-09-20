/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-empty-function */
import { extractAssignedNames } from '@rollup/pluginutils';
import { walk } from 'estree-walker';

export default function addFallbackValues (options = {}) {
    const { hook = 'buildEnd' } = options
    return {
      name: 'add-fallback-values',
      async transform (code) {
        // eslint-disable-next-line no-undef
        
        
        const ast = this.parse(code);

        walk(ast, {
          enter(node, parent) {
            if (node.type === "TemplateElement" && parent.type === 'TemplateLiteral') {
              console.log('NODE',node.value)
              // do something with the declared names
              // e.g. for `const {x, y: z} = ...` => declaredNames = ['x', 'z']
            }
          }
        });

      }
    }
  }