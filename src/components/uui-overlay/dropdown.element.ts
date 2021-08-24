import { query, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';
import { OverlayPosition } from './uui-overlay.element';
import { UUIOverlayEvent } from './UUIOverlayEvent';
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
  @state() overlayPos: OverlayPosition = 'leftTop';

  renderButtons() {
    return html`<div id="buttons">
      <button @click=${() => (this.overlayPos = 'topLeft')}>Top Left</button>
      <button @click=${() => (this.overlayPos = 'topCenter')}>
        Top Center
      </button>
      <button @click=${() => (this.overlayPos = 'topRight')}>Top Right</button>
      <span> | </span>
      <button @click=${() => (this.overlayPos = 'botLeft')}>Bot Left</button>
      <button @click=${() => (this.overlayPos = 'botCenter')}>
        Bot Center
      </button>
      <button @click=${() => (this.overlayPos = 'botRight')}>Bot Right</button>
      <span> | </span>
      <button @click=${() => (this.overlayPos = 'leftTop')}>Left Top</button>
      <button @click=${() => (this.overlayPos = 'leftCenter')}>
        Left Center
      </button>
      <button @click=${() => (this.overlayPos = 'leftBot')}>Left Bot</button>
      <span> | </span>
      <button @click=${() => (this.overlayPos = 'rightTop')}>Right Top</button>
      <button @click=${() => (this.overlayPos = 'rightCenter')}>
        Right Center
      </button>
      <button @click=${() => (this.overlayPos = 'rightBot')}>Right Bot</button>
    </div>`;
  }

  renderParent() {
    return html` <div
      slot="parent"
      id="dropdown"
      @click=${() => (this.open = !this.open)}
    >
      I WILL OPEN THE DROPDOWN
    </div>`;
  }

  renderContent() {
    return html` <div
      slot="overlay"
      style="height: 150px; width: 300px; padding: 10px; border-radius: 10px; border: 1px solid black; background: white;"
    >
      I am a dropdown overlay
      <button>jeg er en knap</button>
      <p>lorem aksjd sadsadkas jdsald asd sad</p>
      <img />
      <input placeholder="I AM INPUT" />
    </div>`;
  }

  render() {
    return html`
      <div id="container">
        ${this.renderButtons()}
        <uui-overlay
          .open=${this.open}
          .overlayPos=${this.overlayPos}
          .margin=${8}
          use-clamp
          @change=${(e: UUIOverlayEvent) => (this.open = e.target.open)}
        >
          ${this.renderParent()} ${this.renderContent()}
        </uui-overlay>
      </div>
    `;
  }
}
