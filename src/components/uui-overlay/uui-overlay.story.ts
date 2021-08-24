import { html } from 'lit-html';
import '.';

export default {
  title: 'Misc/Overlay',
  component: 'uui-overlay',
};

export const Default = () => {
  const element = html`
    <h1>Scroll to find me</h1>
    <div style="padding: 1500px">
      <dropdown-test></dropdown-test>
    </div>
  `;
  return element;
};
