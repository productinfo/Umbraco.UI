import { property, query, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';
import { resolveTxt } from 'dns';
import { timeStamp } from 'console';

export type OverlayPosition =
  | 'topLeft'
  | 'topRight'
  | 'botLeft'
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
  @state() useAutoPlacement = false;

  @property({ type: String }) overlayPos: OverlayPosition = 'botLeft';

  @property({ type: Boolean })
  get open() {
    return this._open;
  }
  set open(newValue) {
    this._open = newValue;
    newValue ? this.initOverlay() : this.closeOverlay();
  }

  firstUpdated() {
    this.parent = this.shadowRoot?.host.previousElementSibling;
    this.rootElement = this.shadowRoot?.host as HTMLElement;
  }

  // connectedCallback() {
  //   super.connectedCallback();
  //   document.addEventListener('scroll', () => this.updateOverlay());
  // }
  // disconnectedCallback() {
  //   document.removeEventListener('scroll', () => this.updateOverlay());
  //   super.disconnectedCallback();
  // }

  initOverlay() {
    if (this.rootElement) {
      //Reset Styling
      this.rootElement.style.opacity = '0';
      this.rootElement.style.top = '';
      this.rootElement.style.bottom = '';
      this.rootElement.style.left = '';
      this.rootElement.style.right = '';

      setTimeout(() => {
        this.updateOverlay();
        this.rootElement!.style.opacity = '1';
      }, 0);

      document.addEventListener('scroll', () => this.updateOverlay());
    }
  }

  closeOverlay() {
    document.removeEventListener('scroll', () => this.updateOverlay());
  }

  updateOverlay() {
    const conRect = this.shadowRoot!.querySelector(
      '.container'
    )?.getBoundingClientRect()!;
    const parentRect = this.parent!.getBoundingClientRect()!;
    const rootElement = this.rootElement!;

    this.detectIfOutsideScreen(conRect, parentRect);

    if (this.useAutoPlacement) {
      this.autoPlacement(conRect, parentRect, rootElement);
    } else {
      this.staticPlacement(conRect, parentRect, rootElement);
    }
  }

  detectIfOutsideScreen(conRect: DOMRect, parentRect: DOMRect) {
    let isOutsideScreen = false;

    if (this.overlayPos === 'left' || this.overlayPos === 'right') {
      const outTop = parentRect.y < 0;
      const outBot = window.innerHeight - (parentRect.y + conRect.height) < 0;
      let outRight = false;
      let outLeft = false;

      if (this.overlayPos === 'left') {
        outRight = window.innerWidth - parentRect.x < 0;
        outLeft = parentRect.x - conRect.width < 0;
      }
      if (this.overlayPos === 'right') {
        outRight =
          window.innerWidth -
            (parentRect.x + parentRect.width + conRect.width) <
          0;
        outLeft = parentRect.x + parentRect.width < 0;
      }
      isOutsideScreen = outRight || outLeft || outTop || outBot;
    }

    if (this.overlayPos === 'topLeft' || this.overlayPos === 'topRight') {
      const outTop = parentRect.y - conRect.height < 0;
      const outBot = window.innerHeight - parentRect.y < 0;
      let outRight = false;
      let outLeft = false;

      if (this.overlayPos === 'topLeft') {
        outRight = window.innerWidth - (parentRect.x + conRect.width) < 0;
        outLeft = parentRect.x < 0;
      }
      if (this.overlayPos === 'topRight') {
        outRight = window.innerWidth - (parentRect.x + parentRect.width) < 0;
        outLeft = parentRect.x + parentRect.width - conRect.width < 0;
      }
      isOutsideScreen = outRight || outLeft || outTop || outBot;
    }

    if (this.overlayPos === 'botLeft' || this.overlayPos === 'botRight') {
      const outTop = parentRect.y + parentRect.height < 0;
      const outBot =
        window.innerHeight -
          (parentRect.y + parentRect.height + conRect.height) <
        0;
      let outRight = false;
      let outLeft = false;

      if (this.overlayPos === 'botLeft') {
        outRight = window.innerWidth - (parentRect.x + conRect.width) < 0;
        outLeft = parentRect.x < 0;
      }
      if (this.overlayPos === 'botRight') {
        outRight = window.innerWidth - (parentRect.x + parentRect.width) < 0;
        outLeft = parentRect.x + parentRect.width - conRect.width < 0;
      }
      isOutsideScreen = outRight || outLeft || outTop || outBot;
    }

    this.useAutoPlacement = isOutsideScreen;
  }

  staticPlacement(
    conRect: DOMRect,
    parentRect: DOMRect,
    rootElement: HTMLElement
  ) {
    if (
      parentRect !== (null || undefined) &&
      conRect !== (null || undefined) &&
      rootElement !== (null || undefined)
    ) {
      switch (this.overlayPos) {
        case 'topLeft':
          rootElement.style.top = `${parentRect.y - conRect.height}px`;
          rootElement.style.left = `${parentRect.x}px`;
          break;
        case 'topRight':
          rootElement.style.top = `${parentRect.y - conRect.height}px`;
          rootElement.style.left = `${
            parentRect.x + parentRect.width - conRect.width
          }px`;
          break;
        case 'botLeft':
          rootElement.style.top = `${parentRect.y + parentRect.height}px`;
          rootElement.style.left = `${parentRect.x}px`;
          break;
        case 'botRight':
          rootElement.style.top = `${parentRect.y + parentRect.height}px`;
          rootElement.style.left = `${
            parentRect.x + parentRect.width - conRect.width
          }px`;
          break;
        case 'left':
          rootElement.style.top = `${parentRect.y}px`;
          rootElement.style.left = `${parentRect.x - conRect.width}px`;
          break;
        case 'right':
          rootElement.style.top = `${parentRect.y}px`;
          rootElement.style.left = `${parentRect.x + parentRect.width}px`;
          break;
        default:
          break;
      }
    }
  }

  autoPlacement(
    conRect: DOMRect,
    parentRect: DOMRect,
    rootElement: HTMLElement
  ) {
    if (this.open) {
      // For Convience and readability
      const halfWindowX = window.innerWidth / 2;
      const halfWindowY = window.innerHeight / 2;
      const halfConX = conRect.width / 2;
      const halfConY = conRect.height / 2;
      const halfParentX = parentRect.width / 2;
      const halfParentY = parentRect.height / 2;

      const centerToParentX = halfWindowX - parentRect.x;
      const centerToParentY = halfWindowY - parentRect.y;

      // Is the center of the screen within the X or Y axis of the component?
      const isInCenterX =
        centerToParentX > 0 - halfConX &&
        centerToParentX < parentRect.width + halfConX;
      const isInCenterY =
        centerToParentY > 0 - halfConY &&
        centerToParentY < parentRect.height + halfConY;

      // Detect which side of the center the parent element is on, on both axes.
      const posXFlip = parentRect.x + halfParentX - halfWindowX < 0;
      const posYFlip = parentRect.y + halfParentY - halfWindowY < 0;

      // Flip the target left/right and top/down based on the position of the parent element relative to the screen center
      const posXInput = posXFlip ? window.innerWidth : 0;
      const posYInput = posYFlip ? window.innerHeight : 0;

      // Clamp the overlay container to the edges of the parent element.
      const posX = this.mathClamp(
        posXInput,
        parentRect.x - conRect.width,
        parentRect.x + parentRect.width
      );
      const posY = this.mathClamp(
        posYInput,
        parentRect.y - conRect.height,
        parentRect.y + parentRect.height
      );

      // Clamp the overlay to the screen so that it "always" stays inside:
      const posXClamp = this.mathClamp(
        posX,
        0,
        window.innerWidth - conRect.width
      );
      const posYClamp = this.mathClamp(
        posY,
        0,
        window.innerHeight - conRect.height
      );

      // Make the overlay container glide along the edges of the parent.
      const posXFinal = isInCenterX
        ? centerToParentX + parentRect.x - halfConX
        : posXClamp;
      const posYFinal = isInCenterY
        ? centerToParentY + parentRect.y - halfConY
        : posYClamp;

      // Make sure the overlay container doesn't overlap the parent and that it stays on screen.
      const posYActualFinal = isInCenterX
        ? this.mathClamp(
            centerToParentY - halfParentY < 0
              ? parentRect.y - conRect.height
              : parentRect.y + parentRect.height,
            0,
            window.innerHeight - conRect.height
          )
        : posYFinal;

      // Apply the positions as styling
      rootElement.style.top = `${posYActualFinal}px`;
      rootElement.style.left = `${posXFinal}px`;
    }
  }

  mathClamp(value: number, min: number, max: number) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    }
    return value;
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
