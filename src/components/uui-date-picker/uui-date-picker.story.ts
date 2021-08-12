import { html } from 'lit-html';
import './index';

export default {
  title: 'Inputs/Date Picker',
  component: 'uui-date-picker',
};

export const Default = () => html`<uui-date-picker></uui-date-picker> `;

export const Locale = () =>
  html`<uui-date-picker locale="pl"></uui-date-picker> `;
