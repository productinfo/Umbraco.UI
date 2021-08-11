import { LitElement, html, css } from 'lit';
import flatpickr from 'flatpickr';
import { query } from 'lit/decorators';
import { pickerStyle } from './flatpicker-style';
/**
 *  @element uui-date-picker
 *  @description - pick a date
 */
export class UUIDatePickerElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        width: 300px;
      }
    `,
    pickerStyle,
  ];

  firstUpdated() {
    this._picker = flatpickr(this.pickerParent, {
      appendTo: this.pickerParent,
    });
  }

  private _picker: any;

  @query('#picker-parent')
  pickerParent: any;

  render() {
    return html`<div id="picker-parent">open date picker</div>
      <slot></slot>`;
  }
}
