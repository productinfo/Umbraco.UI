import { property, state, query } from 'lit/decorators';
import { LitElement, html, css } from 'lit';
import { OverlayPosition } from '../uui-overlay/uui-overlay.element';

/**
 *  @element uui-tooltip
 */

export class UUITooltipElement extends LitElement {
  static styles = [
    css`
      :host {
      }
    `,
  ];

  @property({ type: String }) position: OverlayPosition = 'topRight';
  @property({ type: Boolean })
  open = false;

  render() {
    return html`
      <div>
        <uui-overlay
          .margin=${10}
          .open=${this.open}
          .overlayPos=${this.position}
        >
          <slot name="parent" slot="parent"></slot>
          <slot name="overlay" slot="overlay"></slot>
        </uui-overlay>
      </div>
    `;
  }
}
