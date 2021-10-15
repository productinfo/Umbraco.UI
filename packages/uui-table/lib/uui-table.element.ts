import { css, html, LitElement } from 'lit';

/**
 *  Recreation of native table and it's child elements. `<uui-table>` is a parent element to `<uui-table-head>` `<and uui-table-row>`. To make it fully accessible remember to add aria-label and aria-describedby.
 *  @element uui-table
 *  @slot for uui-table-head and uui-table-row elements. Make a table out of them.
 */
export class UUITableElement extends LitElement {
  static styles = [
    css`
      :host {
        display: table;
        width: 100%;
        box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.1);
        border-radius: var(--uui-size-border-radius, 3px);
        background-color: var(--uui-interface-surface, #fefefe);
        cursor: default;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'table');
  }

  render() {
    return html`<slot></slot>`;
  }
}