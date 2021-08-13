import { html } from 'lit-html';
import './index';

export default {
  title: 'Inputs/Date Picker',
  component: 'uui-date-picker',
};

export const Default = () => html`<uui-date-picker></uui-date-picker> `;

export const PositionTest = () =>
  html`<div
    style="width: 100%; height:100vh; display: grid; place-items: end end"
  >
    <uui-date-picker></uui-date-picker>
  </div> `;

export const AltFormat = () =>
  html`<uui-date-picker
    altInput
    .placeholder=${'Choose date'}
  ></uui-date-picker> `;
