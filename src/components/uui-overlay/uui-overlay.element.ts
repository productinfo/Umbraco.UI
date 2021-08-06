import { property, query, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';
import { resolveTxt } from 'dns';
import { timeStamp } from 'console';

export type OverlayPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'botLeft'
  | 'botCenter'
  | 'botRight'
  | 'left'
  | 'right';

/**
 *  @element uui-avatar
 */

export class UUIOverlayElement extends LitElement {
  static styles = [
    css`
      :host {
        position: fixed;
      }
      .container {
        position: absolute;
        background: #ff000038;
      }
      .bot {
        bottom: 0;
      }
      .top {
        top: 0;
      }
      .left {
        left: 0;
      }
      .right {
        right: 0;
      }
    `,
  ];

  @state() _open = false;
  @state() parent: Element | undefined | null;
  @state() rootElement: HTMLElement | undefined | null;
  @state() top = false;

  @property({ type: Boolean })
  get open() {
    return this._open;
  }
  set open(newValue) {
    this._open = newValue;
    this.initOverlay();
  }

  firstUpdated() {
    this.parent = this.shadowRoot?.host.previousElementSibling;
    this.rootElement = this.shadowRoot?.host as HTMLElement;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mousemove', e => this.onMouseMove(e));
    document.addEventListener('scroll', () => this.onMouseMove());
  }
  disconnectedCallback() {
    document.removeEventListener('mousemove', e => this.onMouseMove(e));
    document.removeEventListener('scroll', () => this.onMouseMove());
    super.disconnectedCallback();
  }

  initOverlay() {
    if (this.rootElement) {
      //Reset Styling
      this.rootElement.style.opacity = '0';
      this.rootElement.style.top = '';
      this.rootElement.style.bottom = '';
      this.rootElement.style.left = '';
      this.rootElement.style.right = '';

      //
    }
    setTimeout(() => this.updateOverlay(), 0);
  }

  mathClamp(value: number, min: number, max: number) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    }

    return value;
  }

  onMouseMove(e?: MouseEvent) {
    const conRect = this.shadowRoot!.querySelector(
      '.container'
    )?.getBoundingClientRect()!;
    const parentRect = this.parent!.getBoundingClientRect()!;
    const rootElement = this.rootElement!;

    rootElement.style.opacity = '1';

    if (this.open) {
      // const posYInput = e.y;
      // const posXInput = e.x;
      const posXFlip =
        parentRect.x + parentRect.width / 2 - window.innerWidth / 2 < 0;
      const posYFlip =
        parentRect.y + parentRect.height / 2 - window.innerHeight / 2 < 0;
      const posXInput = posXFlip ? window.innerWidth : 0;
      const posYInput = posYFlip ? window.innerHeight : 0;
      const posY = this.mathClamp(
        posYInput,
        parentRect.y - conRect.height,
        parentRect.y + parentRect.height
      );
      const posX = this.mathClamp(
        posXInput,
        parentRect.x - conRect.width,
        parentRect.x + parentRect.width
      );

      const posYClamp = this.mathClamp(
        posY,
        0,
        window.innerHeight - conRect.height
      );
      const posXClamp = this.mathClamp(
        posX,
        0,
        window.innerWidth - conRect.width
      );

      // TRY REVERSE CLAMP
      // const reverseClampY = this.mathClamp(posYInput, parentRect.y + parentRect.height, parentRect.y - conRect.height);

      rootElement.style.top = `${posYClamp}px`;
      rootElement.style.left = `${posXClamp}px`;
    }

    // if(this.open) {
    //   // const posY = Math.max(0,Math.min(window.innerHeight, parentRect.y - conRect.height));
    //   const posXFlip = (parentRect.x + parentRect.width / 2 - window.innerWidth / 2) < 0;

    //   //  const posY = 0;
    //   //  const posX = 0;

    //   const posX = posXFlip ? window.innerWidth : 0;
    //   const posY = window.innerHeight;

    //   console.log(posX);

    //   const testY = posY - conRect.height;
    //   const testYOffset = parentRect.y + parentRect.height - testY;
    //   const testYBool = testYOffset > 0 && testYOffset < conRect.height * 2 + parentRect.height;
    //   const posXLeftClamp = Math.min(Math.max(0, testYBool ? parentRect.x - conRect.width : parentRect.x), window.innerWidth);
    //   const posXRightClamp = Math.max(0 ,parentRect.x + parentRect.width - (testYBool ? 0 : conRect.width ));

    //   const posXClamp = posX < parentRect.x + parentRect.width / 2 ? posXLeftClamp : posXRightClamp;

    //   const testX = posX;
    //   const testXOffset = -(parentRect.x - conRect.width - testX);
    //   const testXBool = testXOffset > 0 && testXOffset < conRect.width * 2 + parentRect.width;
    //   const posYTopClamp = Math.min(Math.max(0 , parentRect.y -  conRect.height), window.innerHeight - conRect.height);
    //   const posYBottomClamp = Math.max(0, Math.min(parentRect.y + parentRect.height, window.innerHeight - conRect.height));
    //   // const posYBottomClampTest = Math.max(0, Math.min(testYBool ? Math.min(posY, parentRect.y + parentRect.height) : parentRect.y + parentRect.height, window.innerHeight - conRect.height));
    //   const posYClamp = posY < parentRect.y + parentRect.height / 2 ? posYTopClamp : posYBottomClamp;
    //   const posYClampFinal = testYBool ? Math.min(posY, parentRect.y + parentRect.height) : posYClamp;

    //   rootElement.style.top = `${posYClampFinal}px`;
    //   rootElement.style.left = `${posXClamp}px`;
    // }

    // if (this.open) {
    //   const posY = -parentRect.y + parentRect.height - conRect.height;
    //   const posX = -parentRect.x;

    //   console.log(posY, -parentRect.y, parentRect.height);

    //   const posYClamp = Math.max(
    //     -conRect.height - parentRect.height,
    //     Math.min(posY, 0)
    //   );
    //   const posXClamp = Math.max(
    //     -conRect.width,
    //     Math.min(posX, parentRect.width)
    //   );

    //   let posYFinal = posY;
    //   if (-posY > parentRect.height) {
    //     posYFinal =
    //       posX < -conRect.width || posX > parentRect.width
    //         ? posYClamp
    //         : -parentRect.height - conRect.height;
    //   } else {
    //     posYFinal =
    //       posX < -conRect.width || posX > parentRect.width ? posYClamp : 0;
    //   }

    //   rootElement.style.top = `${posYFinal}px`;
    //   rootElement.style.left = `${posXClamp}px`;
    // }
  }

  updateOverlay(count = 1) {
    const conRect = this.shadowRoot!.querySelector(
      '.container'
    )?.getBoundingClientRect()!;
    const parentRect = this.parent!.getBoundingClientRect()!;
    // const rootRect = this.rootElement!.getBoundingClientRect()!;
    const rootElement = this.rootElement!;

    if (
      parentRect !== (null || undefined) &&
      conRect !== (null || undefined) &&
      rootElement !== (null || undefined)
    ) {
      // const overlayPosition: OverlayPosition = "left"
      // switch (overlayPosition) {
      //   case "left":
      //     rootElement.style.top = `${-parentRect.height}px`;
      //     rootElement.style.left = `${-conRect.width}px`;
      //     break;
      //   default:
      //     break;
      // }
      // // Should be a property that will be assigned in the parent component.
      // const wantToGoTop = false;
      // const wantToGoRight = false;
      // //This is the place that the overlay can actually fit.
      // let canGoTop = wantToGoTop;
      // let canGoRight = wantToGoRight;
      // if (wantToGoTop) {
      //   canGoTop = parentRect.y - conRect.height > 0;
      // } else {
      //   canGoTop =
      //     parentRect.y + parentRect.height + conRect.height >
      //     window.innerHeight;
      // }
      // if (wantToGoRight) {
      //   canGoRight =
      //     parentRect.x + parentRect.width + conRect.width < window.innerWidth;
      // } else {
      //   canGoRight = parentRect.x - conRect.width < 0;
      // }
      // // Vertical calculations
      // const vertStartPos = canGoTop ? parentRect.height + conRect.height : 0;
      // const botOffset =
      //   window.innerHeight - parentRect.y - conRect.height - parentRect.height;
      // const topOffset = parentRect.y + parentRect.height;
      // rootElement.style.bottom = `${Math.max(
      //   -botOffset,
      //   Math.min(vertStartPos, topOffset)
      // )}px`;
      // // Horizontal calculations
      // const horStarPos = canGoRight ? parentRect.width : -conRect.width;
      // const leftOffset = window.innerWidth - parentRect.x - conRect.width;
      // const rightOffset = parentRect.x;
      // rootElement.style.left = `${Math.max(
      //   -rightOffset,
      //   Math.min(leftOffset, horStarPos)
      // )}px`;
    }

    rootElement.style.opacity = '1';
  }

  render() {
    return this.open
      ? html`
          <div class="container">
            <slot></slot>
          </div>
        `
      : '';
  }
}
