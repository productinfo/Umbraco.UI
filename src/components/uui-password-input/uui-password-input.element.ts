import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators';
import { UUITextFieldEvent } from '../uui-textfield/UUITextFieldEvent';

/**
 *  @element uui-password-input
 */

export class UUIPasswordInput extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
      }
      .container {
        display: flex;
        flex-direction: column;
      }
      input {
        display: inline-block;
        height: 30px;
        padding: 3px 6px 1px 6px;
        font-family: inherit;
        font-size: 15px;
        color: inherit;
        border-radius: 0;
        box-sizing: border-box;
        background-color: var(
          --uui-text-field-background-color,
          var(--uui-interface-surface)
        );
        border: 1px solid
          var(--uui-text-field-border-color, var(--uui-interface-border));
        width: 100%;
        outline: none;
      }
      input:hover {
        border-color: var(
          --uui-text-field-border-color-hover,
          var(--uui-interface-border-hover)
        );
      }
      input:focus {
        border-color: var(
          --uui-text-field-border-color-focus,
          var(--uui-interface-border-focus)
        );
      }
      :host([invalid]) {
        border-color: var(--uui-color-danger-background);
      }

      input[type='color'] {
        width: 30px;
        padding: 0;
        border: none;
      }

      input[disabled] {
        background-color: var(
          --uui-text-field-background-color-disabled,
          var(--uui-interface-surface-disabled)
        );
        border: 1px solid
          var(
            --uui-text-field-border-color-disabled,
            var(--uui-interface-border-disable)
          );

        color: var(--uui-interface-contrast-disabled);
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

  static readonly formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
  }

  @state()
  private _value: FormDataEntryValue = '';

  @state()
  private showPassword = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Object })
  toggleText = { showText: 'Show password', hideText: 'Hide Password' };

  @property({ type: Boolean, reflect: true })
  private valid = true;

  @property()
  get value() {
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
    /*
        this.valid = !!this.value;
        if (this.valid) {
          this._internals.setValidity({});
        } else {
          this._internals.setValidity({ customError: true }, 'Cannot be empty');
        }
        */
    this._internals.setFormValue(this._value);
  }

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new UUITextFieldEvent(UUITextFieldEvent.INPUT));
  }

  private onChange() {
    this.dispatchEvent(new UUITextFieldEvent(UUITextFieldEvent.CHANGE));
  }

  private onKeyup() {
    this.dispatchEvent(new UUITextFieldEvent(UUITextFieldEvent.KEYUP));
  }

  private onShowPasswordToggle() {
    this.showPassword = !this.showPassword;
    const options = {
      detail: this.showPassword,
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('password-toggle', options));
  }

  render() {
    return html`
      <div class="container">
        <input
          type="${this.showPassword ? 'text' : 'password'}"
          value=${this.value}
          aria-label="Password"
          ?disabled=${this.disabled}
          @input=${this.onInput}
          @change=${this.onChange}
          @keyup=${this.onKeyup}
        />
        <span class="password-toggle" @click=${this.onShowPasswordToggle}>
          ${html`<uui-icon
            class="password-toggle-icon"
            .name=${this.showPassword ? 'eye-closed' : 'eye-open'}
          />`}
          ${this.showPassword
            ? this.toggleText.hideText
            : this.toggleText.showText}
        </span>
      </div>
    `;
  }
}
