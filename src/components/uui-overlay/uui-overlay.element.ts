import { property, query, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';

export type OverlayPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'botLeft'
  | 'botCenter'
  | 'botRight'
  | 'leftTop'
  | 'leftCenter'
  | 'leftBot'
  | 'rightTop'
  | 'rightCenter'
  | 'rightBot';

/**
 *  @element uui-avatar
 */

export class UUIOverlayElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
      }
      .container {
        position: absolute;
        background: red;
      }
      .bot {
        bottom: 0;
      }
      .top {
        top: 0;
      }
      .left {
        left: 0;
      }
      .right {
        right: 0;
      }
    `,
  ];

  @property({ type: String }) position: OverlayPosition = 'botLeft';

  @state() parent: Element | undefined | null;
  @state() top = false;

  firstUpdated() {
    this.parent = this.shadowRoot?.host.previousElementSibling;
  }

  getPosition() {
    const dropdown = this.shadowRoot?.querySelector('.container');
    const dropdownRight = dropdown ? dropdown.getBoundingClientRect().right : 0;
    const dropdownLeft = dropdown ? dropdown.getBoundingClientRect().left : 0;

    if (dropdownRight > window.innerWidth) {
      console.log('IM OUT TO THE RIGHT');
    }

    if (dropdownLeft < 0) {
      console.log('IM OUT TO THE LEFT');
    }

    const parent = this.parent?.getBoundingClientRect();

    if (this.top) {
      return `top: ${0}px`;
    } else {
      const parentHeight = parent ? parent.height : 0;
      return `bottom: ${parentHeight}px`;
    }
  }

  render() {
    return html`
      <div
        @click=${() => (this.top = !this.top)}
        class="container"
        style="${this.getPosition()}"
      >
        <slot></slot>
      </div>
    `;
  }
}
