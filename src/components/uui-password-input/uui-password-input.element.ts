import { LitElement, html, css } from 'lit';
import { property, query, state } from 'lit/decorators';
import { UUITextFieldElement } from '../uui-textfield/uui-textfield.element';
import { UUITextFieldEvent } from '../uui-textfield/UUITextFieldEvent';

/**
 *  @element uui-password-input
 */

export class UUIPasswordInput extends UUITextFieldElement {
  static styles = [
    ...UUITextFieldElement.styles,
    css`
      :host {
        display: inline-block;
      }
      .container {
        display: flex;
        flex-direction: column;
      }
      .password-toggle {
        display: flex;
        margin-left: auto;
        cursor: pointer;
        font-size: var(--uui-size-small);
        color: var(--uui-color-dusty-grey);
      }
      .password-toggle:hover {
        color: var(--uui-color-cocoa-black);
      }
      .password-toggle-icon {
        line-height: 0;
        margin: auto;
        margin-right: 6px;
      }
    `,
  ];

  @query('input') _textField: any;

  @state()
  private showPassword = false;

  @property({ type: Object })
  toggleText = { showText: 'Show password', hideText: 'Hide Password' };

  firstUpdated() {
    this._textField.type = 'password';
  }

  private onShowPasswordToggle() {
    this.showPassword = !this.showPassword;

    this.showPassword
      ? (this._textField.type = 'text')
      : (this._textField.type = 'password');

    const options = {
      detail: this.showPassword,
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('password-toggle', options));
  }

  render() {
    return html`
      ${super.render()}
      <span class="password-toggle" @click=${this.onShowPasswordToggle}>
        ${html`<uui-icon
          class="password-toggle-icon"
          .name=${this.showPassword ? 'eye-closed' : 'eye-open'}
        />`}
        ${this.showPassword
          ? this.toggleText.hideText
          : this.toggleText.showText}
      </span>
    `;
  }
}
