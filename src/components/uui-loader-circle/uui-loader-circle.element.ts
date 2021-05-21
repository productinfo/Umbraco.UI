import { property } from '@lit/reactive-element/decorators/property';
import { css, html, LitElement, svg } from 'lit';
import { styleMap } from 'lit/directives/style-map';
import { Size } from '../../type/Size';

/**
 *  @element uui-loader-circle
 * @description - Circular loader for indicating loading. You can put in in a button ;)
 */

export class UUILoaderCircleElement extends LitElement {
  static styles = [
    css`
      :host {
        --uui-loader-circle-size: var(--uui-size-small, 12px);
        --uui-loader-circle-color: var(--uui-interface-chosen, #1b264f);
        display: inline-block;
        vertical-align: middle;
      }

      :host([size='xs']) {
        --uui-loader-circle-size: var(--uui-size-xsmall, 9px);
      }

      :host([size='s']) {
        --uui-loader-circle-size: var(--uui-size-small, 12px);
      }

      :host([size='m']) {
        --uui-loader-circle-size: var(--uui-size-medium, 24px);
      }

      :host([size='l']) {
        --uui-loader-circle-size: var(--uui-size-large, 30px);
      }

      :host([size='xl']) {
        --uui-loader-circle-size: var(--uui-size-xlarge, 42px);
      }

      :host([size='xxl']) {
        --uui-loader-circle-size: var(--uui-size-xlarge, 66px);
      }

      #svg-container {
        overflow: hidden;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: var(--uui-loader-circle-size);
        height: var(--uui-loader-circle-size);
      }

      :host([indefinite]) #spinner {
        animation: 3s linear infinite svg-animation;
      }

      :host([indefinite]) #circle {
        animation: 1.4s ease-in infinite circle-animation;
      }

      #spinner {
        width: 100%;
      }

      #circle {
        display: block;
        fill: transparent;
        stroke: var(--uui-loader-circle-color);
        stroke-linecap: round;
        stroke-dasharray: 0 100;
        /* stroke-dashoffset: 361; */
        stroke-width: 6px;
        transform-origin: 50% 50%;
        transform: rotate(-90deg);
      }

      #circle2 {
        fill: transparent;
        stroke: var(--uui-loader-circle-color);
        stroke-width: 6px;
        opacity: 0.5;
      }

      #progress-display {
        position: absolute;
        left: 0;
        top: 50%;
        right: 0;
        stroke: var(--uui-loader-circle-color);
        transform: translateY(-50%);
        font-size: 10px;
        font-weight: 700;
        text-align: center;
      }

      @keyframes svg-animation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes circle-animation {
        0%,
        25% {
          stroke-dashoffset: 100;
          transform: rotate(0);
        }

        50%,
        75% {
          stroke-dashoffset: 20;
          transform: rotate(45deg);
        }

        100% {
          stroke-dashoffset: 100;
          transform: rotate(360deg);
        }
      }
    `,
  ];

  private strokeDashOffset() {
    return { strokeDasharray: `${this.progress}, 100` };
  }

  private largeSizes = ['l', 'xl'];

  @property({ reflect: true })
  size: Size = 's';

  @property({ type: Boolean, reflect: true })
  indefinite = false;

  @property({ type: Number })
  progress = 100;

  @property({ type: Boolean, reflect: true, attribute: 'show-progress' })
  showProgress = false;

  render() {
    return html`<div id="svg-container">
      <svg id="spinner" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle id="circle2" cx="50%" cy="50%" r="15.9155" />
        <circle
          id="circle"
          cx="50%"
          cy="50%"
          r="15.9155"
          style=${styleMap(this.strokeDashOffset())}
        />
      </svg>
      ${this.largeSizes.includes(this.size) &&
      this.indefinite === false &&
      this.showProgress
        ? html`<span id="progress-display">${this.progress}</span>`
        : ''}
    </div>`;
  }
}