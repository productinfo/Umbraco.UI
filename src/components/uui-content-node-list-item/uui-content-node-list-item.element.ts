import { css, html } from 'lit';
import { property } from 'lit/decorators';
import { UUIBaseListItemElement } from '../uui-base-list-item/uui-base-list-item.element';

/**
 *  @element uui-content-node-list-item
 *  @fires {UUICardEvent} click-title - fires when the list-item title is clicked
 *  @description - List-item component for displaying a content-node.
 */

export class UUIContentNodeListItemElement extends UUIBaseListItemElement {
  static styles = [
    ...UUIBaseListItemElement.styles,
    css`
      :host {
        min-width: 250px;
        width: 100%;
        padding: var(--uui-size-space-2);
      }

      #icon {
        font-size: 1.2em;
        margin-left: var(--uui-size-space-2);
      }

      #open-part {
        align-self: stretch;

        display: flex;
        position: relative;
        font-weight: 700;
        align-items: center;
        cursor: pointer;
      }

      #info {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        height: 100%;
        padding-left: var(--uui-size-space-2);
      }

      #name {
        font-weight: 700;
      }

      #open-part:hover #icon {
        color: var(--uui-interface-contrast-hover);
      }
      #open-part:hover #name {
        text-decoration: underline;
        color: var(--uui-interface-contrast-hover);
      }
      #open-part:hover #url {
        color: var(--uui-interface-contrast-hover);
      }

      slot[name='tag'] {
        flex-grow: 1;

        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    `,
  ];

  @property({ type: String })
  name = '';

  @property({ type: String })
  url = '';

  @property({ type: String })
  icon = '';

  public render() {
    return html`
      <button
        type="button"
        id="open-part"
        tabindex="0"
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}
      >
        <uui-icon id="icon" name=${this.icon}></uui-icon>
        <div id="info">
          <div id="name">${this.name}</div>
          <small id="url">${this.url}</small>
        </div>
      </button>
      <!-- Select border must be right after #open-part -->
      <div id="select-border"></div>

      <slot name="tag"></slot>
      <slot id="actions-container" name="actions"></slot>
    `;
  }
}