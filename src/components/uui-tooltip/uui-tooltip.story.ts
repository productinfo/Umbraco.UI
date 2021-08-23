import { html } from 'lit-html';
import '.';

export default {
  title: 'Misc/Tooltip',
  component: 'uui-tooltip',
};

const renderButton = () => {
  return html` <uui-button look="primary" label="Open" slot="parent">
  </uui-button>`;
};

const renderIcon = () => {
  return html`
    <div
      slot="parent"
      style="width: 32px; height: 32px; border-radius: 100%; border: 2px solid #3544b1; display: flex; align-items: center; justify-content: center;"
    >
      <uui-icon
        name="info"
        style="color: #3544b1; pointer-events: none"
      ></uui-icon>
    </div>
  `;
};

const renderContent = () => {
  return html` <div
    slot="overlay"
    style="border: 1px solid black; border-radius: 10px; padding: 12px; width: 300px; box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.05);"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta
    nisi id nunc sagittis, eget tincidunt libero posuere. Integer
  </div>`;
};

export const Click = () => {
  const element = html`
    <div style="margin: 200px; padding: 200px;">
      <uui-tooltip position="topRight" use-click>
        ${renderButton()} ${renderContent()}
      </uui-tooltip>
    </div>
  `;

  return element;
};

export const Hover = () => {
  const element = html`
    <div style="margin: 200px; padding: 200px;">
      <uui-tooltip position="rightTop">
        ${renderIcon()} ${renderContent()}
      </uui-tooltip>
    </div>
  `;

  return element;
};
