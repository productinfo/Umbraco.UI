import { query, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';
import { OverlayPosition } from './uui-overlay.element';
/**
 *  @element dropdown-test
 */

export class DropdownTest extends LitElement {
  static styles = [
    css`
      #container {
        width: 200px;
      }
      #dropdown {
        display: block;
        border: 1px solid black;
        height: 50px;
        padding: 12px;
      }
      #buttons {
        position: fixed;
        top: 0;
        left: 0;
        margin: 12px;
      }
      #buttons span {
        margin: 0 12px;
      }
    `,
  ];

  @query('#dropdown') dropdown?: HTMLElement;
  @state() open = false;
  @state() overlayPos: OverlayPosition = 'topRight';

  render() {
    return html`
      <div id="container">
        <div id="buttons">
          <button @click=${() => (this.overlayPos = 'topLeft')}>
            Top Left
          </button>
          <button @click=${() => (this.overlayPos = 'topCenter')}>
            Top Center
          </button>
          <button @click=${() => (this.overlayPos = 'topRight')}>
            Top Right
          </button>
          <span> | </span>
          <button @click=${() => (this.overlayPos = 'botLeft')}>
            Bot Left
          </button>
          <button @click=${() => (this.overlayPos = 'botCenter')}>
            Bot Center
          </button>
          <button @click=${() => (this.overlayPos = 'botRight')}>
            Bot Right
          </button>
          <span> | </span>
          <button @click=${() => (this.overlayPos = 'leftTop')}>
            Left Top
          </button>
          <button @click=${() => (this.overlayPos = 'leftCenter')}>
            Left Center
          </button>
          <button @click=${() => (this.overlayPos = 'leftBot')}>
            Left Bot
          </button>
          <span> | </span>
          <button @click=${() => (this.overlayPos = 'rightTop')}>
            Right Top
          </button>
          <button @click=${() => (this.overlayPos = 'rightCenter')}>
            Right Center
          </button>
          <button @click=${() => (this.overlayPos = 'rightBot')}>
            Right Bot
          </button>
        </div>
        <div id="dropdown" @click=${() => (this.open = !this.open)}>
          I WILL OPEN THE DROPDOWN
        </div>
        <uui-overlay
          .open=${this.open}
          .parent=${this.dropdown}
          .overlayPos=${this.overlayPos}
        >
          <div
            style="height: 200px; width: 211.2px; padding: 10px; border-radius: 10px; border: 1px solid black; background: #ffffff;"
          >
            I am a dropdown
            <button>jeg er en knap</button>
          </div>
        </uui-overlay>
      </div>
    `;
  }
}
