import { property, query, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';
/**
 *  @element dropdown-test
 */

export class DropdownTest extends LitElement {
  static styles = [
    css`
      .dropdown {
        display: block;
        border: 1px solid black;
        width: 200px;
        height: 50px;
        padding: 12px;
      }
    `,
  ];

  @state() open = false;

  render() {
    return html`
      <div>
        <div class="dropdown" @click=${() => (this.open = !this.open)}>
          I WIL OPEN THE DROPDOWN
        </div>
        <uui-overlay .open=${this.open}>
          <div
            style="padding: 10px; margin: 10px; border-radius: 10px; border: 1px solid black; background: #ffffff; width: 124px; height: 80px"
          >
            I am a dropdown
            <button>jeg er en knap</button>
          </div>
        </uui-overlay>
      </div>
    `;
  }
}
