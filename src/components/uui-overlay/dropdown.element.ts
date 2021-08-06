import { property, query, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';
/**
 *  @element dropdown-test
 */

export class DropdownTest extends LitElement {
  static styles = [
    css`
      .container {
        width: 200px;
      }
      .dropdown {
        display: block;
        border: 1px solid black;
        height: 50px;
        padding: 12px;
      }
    `,
  ];

  @state() open = false;

  render() {
    return html`
      <div class="container">
        <div class="dropdown" @click=${() => (this.open = !this.open)}>
          I WILL OPEN THE DROPDOWN
        </div>
        <uui-overlay .open=${this.open}>
          <div
            style="height: 200px; width: 100px; padding: 10px; margin: 10px; border-radius: 10px; border: 1px solid black; background: #ffffff;"
          >
            I am a dropdown
            <button>jeg er en knap</button>
          </div>
        </uui-overlay>
      </div>
    `;
  }
}
