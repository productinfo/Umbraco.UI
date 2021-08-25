import { html } from 'lit-html';
import '.';

export default {
  title: 'Misc/Overlay',
  component: 'uui-overlay',
};

export const Default = () => {
  const element = html`
    <!-- <div style="position: fixed; top: 0; left: 0; width: 50vw; height: 100vh; pointer-events: none; background: #ff000033"></div>
  <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 50vh; pointer-events: none; background: #0000ff1a"></div> -->
    <h1>Scroll to find me</h1>
    <div style="padding: 1500px">
      <dropdown-test></dropdown-test>
    </div>
  `;
  return element;
};
