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
        border: 1px solid #e788;
      }
    `,
    pickerStyle,
  ];

  firstUpdated() {
    if (this.pickerInput)
      this._picker = flatpickr(this.pickerInput, {
        appendTo: this.pickerParent,
        positionElement: this.pickerParent,
        onChange: this.setDate,
        allowInput: true,
        enableTime: true,
        defaultDate: new Date(),
        // eslint-disable-next-line @typescript-eslint/camelcase
        time_24hr: true,
      });
  }

  private setDate(selectedDates: Date[], dateStr: string, instance: any) {
    console.log(selectedDates, dateStr, instance);
    if (this.pickerInput) this.pickerInput.value = dateStr;
  }

  private _picker: any;

  @query('#picker-parent')
  pickerParent: any;

  @query('#picker-input')
  pickerInput?: HTMLInputElement;

  render() {
    return html`<div id="picker-parent">
      <input id="picker-input" type="text" />
    </div>`;
  }
}
