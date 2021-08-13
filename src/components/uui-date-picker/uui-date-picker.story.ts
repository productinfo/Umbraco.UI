import { html } from 'lit-html';
import './index';

export default {
  title: 'Inputs/Date Picker',
  component: 'uui-date-picker',
};

export const Default = () => html`<uui-date-picker></uui-date-picker> `;

export const Labeled = () =>
  html`<uui-date-picker label="Birthday"></uui-date-picker>`;

export const Disabled = () =>
  html`<uui-date-picker label="Birthday" disabled></uui-date-picker>`;

export const Range = () =>
  html`<uui-date-picker label="Birthday" mode="range"></uui-date-picker>`;

export const Multiple = () =>
  html`<uui-date-picker label="Birthday" mode="multiple"></uui-date-picker>`;

export const AltFormat = () =>
  html`<uui-date-picker
    altInput
    .placeholder=${'Choose date'}
  ></uui-date-picker> `;
