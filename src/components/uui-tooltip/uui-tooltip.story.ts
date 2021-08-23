import { LitElement } from 'lit';
import { html } from 'lit-html';
import { customElement, state } from 'lit/decorators';
import '.';

export default {
  title: 'Misc/Tooltip',
  component: 'uui-tooltip',
};

function open(e: any, open: boolean) {
  e.target.parentElement.open = open;
}

export const Click = () => {
  const element = html`
    <div style="margin: 200px; padding: 200px;">
      <uui-tooltip position="topRight">
        <uui-button
          look="primary"
          label="Open"
          @click=${(e: any) => open(e, !e.target.parentElement.open)}
          slot="parent"
        />
        </uui-button>
        <div
          slot="overlay"
          style="border: 1px solid black; border-radius: 10px; padding: 12px; width: 300px; box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.05);"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          porta nisi id nunc sagittis, eget tincidunt libero posuere. Integer
        </div>
      </uui-tooltip>
    </div>
  `;

  return element;
};

export const Hover = () => {
  const element = html`
    <div style="margin: 200px; padding: 200px;">
      <uui-tooltip position="rightTop">
        <div
          @mouseover=${(e: any) => open(e, true)}
          @mouseout=${(e: any) => open(e, false)}
          slot="parent"
          style="width: 32px; height: 32px; border-radius: 100%; border: 2px solid #3544b1; display: flex; align-items: center; justify-content: center;"
        >
          <uui-icon
            name="info"
            style="color: #3544b1; pointer-events: none"
          ></uui-icon>
        </div>
        <div
          slot="overlay"
          style="border: 1px solid black; border-radius: 10px; padding: 12px; width: 300px; box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.05);"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          porta nisi id nunc sagittis, eget tincidunt libero posuere. Integer
        </div>
      </uui-tooltip>
    </div>
  `;

  return element;
};
