import { LitElement, html, css } from 'lit';

/**
 *  A basic loader.
 *  @element uui-loader
 */
export class UUILoaderElement extends LitElement {
  static styles = [
    css`
      div {
        display: inline-block;
        width: var(--uui-size-base-unit, 4px);
        height: var(--uui-size-base-unit);
        border: 2px solid currentColor;
        border-radius: 100%;
        animation: loaderAnimation 1.4s infinite;
      }

      div:nth-child(1n) {
        animation-delay: 0s;
      }

      div:nth-child(2n) {
        animation-delay: 0.15s;
      }

      div:nth-child(3n) {
        animation-delay: 0.3s;
      }

      @keyframes loaderAnimation {
        0% {
          transform: scale(0.5);
          background-color: currentColor;
        }
        50% {
          transform: scale(1);
          background-color: transparent;
        }
        100% {
          transform: scale(0.5);
          background-color: currentColor;
        }
      }
    `,
  ];

  render() {
    return html`
      <div></div>
      <div></div>
      <div></div>
    `;
  }
}
