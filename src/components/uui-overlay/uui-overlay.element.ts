import { property, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';

export type OverlayPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'botLeft'
  | 'botCenter'
  | 'botRight'
  | 'leftTop'
  | 'leftCenter'
  | 'leftBot'
  | 'rightTop'
  | 'rightCenter'
  | 'rightBot';

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
  @state() _overlayPos: OverlayPosition = 'botLeft';
  @state() rootElement?: HTMLElement;
  @state() top = false;

  @property({ type: Boolean }) useAutoPlacement = false;
  @property({ type: Object }) parent?: Element;
  @property({ type: String })
  get overlayPos() {
    return this._overlayPos;
  }
  set overlayPos(newValue) {
    this._overlayPos = newValue;
    this.updateOverlay();
  }

  @property({ type: Boolean })
  get open() {
    return this._open;
  }
  set open(newValue) {
    this._open = newValue;
    newValue ? this.initOverlay() : this.closeOverlay();
  }

  firstUpdated() {
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
        document.addEventListener('scroll', () => this.updateOverlay());
      }, 0);
    }
  }

  closeOverlay() {
    document.removeEventListener('scroll', () => this.updateOverlay());
  }

  updateOverlay() {
    if (!this.shadowRoot) {
      return;
    }

    // TODO: These 3 should propably be cashed.
    const conRect = this.shadowRoot!.querySelector(
      '.container'
    )?.getBoundingClientRect()!;
    const parentRect = this.parent!.getBoundingClientRect()!;
    const rootElement = this.rootElement!;

    this.useAutoPlacement = this.detectIfOutsideScreen(conRect, parentRect);
    if (this.useAutoPlacement) {
      this.autoPlacement(conRect, parentRect, rootElement);
    } else {
      this.staticPlacement(conRect, parentRect, rootElement);
    }
  }

  detectIfOutsideScreen(conRect: DOMRect, parentRect: DOMRect): boolean {
    let isOutsideScreen = false;

    if (
      this.overlayPos === 'leftTop' ||
      this.overlayPos === 'leftCenter' ||
      this.overlayPos === 'leftBot'
    ) {
      let outTop = false;
      let outBot = false;
      const outRight = window.innerWidth - parentRect.x < 0;
      const outLeft = parentRect.x - conRect.width < 0;

      if (this.overlayPos === 'leftTop') {
        outTop = parentRect.y < 0;
        outBot = window.innerHeight - (parentRect.y + conRect.height) < 0;
      }
      if (this.overlayPos === 'leftCenter') {
        outTop =
          parentRect.y + (parentRect.height / 2 - conRect.height / 2) < 0;
        outBot =
          window.innerHeight -
            (parentRect.y + (parentRect.height / 2 + conRect.height / 2)) <
          0;
      }
      if (this.overlayPos === 'leftBot') {
        outTop = parentRect.y + (parentRect.height - conRect.height) < 0;
        outBot = window.innerHeight - (parentRect.y + parentRect.height) < 0;
      }
      isOutsideScreen = outRight || outLeft || outTop || outBot;
    }

    if (
      this.overlayPos === 'rightTop' ||
      this.overlayPos === 'rightCenter' ||
      this.overlayPos === 'rightBot'
    ) {
      let outTop = false;
      let outBot = false;
      const outRight =
        window.innerWidth - (parentRect.x + parentRect.width + conRect.width) <
        0;
      const outLeft = parentRect.x + parentRect.width < 0;

      if (this.overlayPos === 'rightTop') {
        outTop = parentRect.y < 0;
        outBot = window.innerHeight - (parentRect.y + conRect.height) < 0;
      }
      if (this.overlayPos === 'rightCenter') {
        outTop =
          parentRect.y + (parentRect.height / 2 - conRect.height / 2) < 0;
        outBot =
          window.innerHeight -
            (parentRect.y + (parentRect.height / 2 + conRect.height / 2)) <
          0;
      }
      if (this.overlayPos === 'rightBot') {
        outTop = parentRect.y + (parentRect.height - conRect.height) < 0;
        outBot = window.innerHeight - (parentRect.y + parentRect.height) < 0;
      }
      isOutsideScreen = outRight || outLeft || outTop || outBot;
    }

    if (
      this.overlayPos === 'topLeft' ||
      this.overlayPos === 'topCenter' ||
      this.overlayPos === 'topRight'
    ) {
      const outTop = parentRect.y - conRect.height < 0;
      const outBot = window.innerHeight - parentRect.y < 0;
      let outRight = false;
      let outLeft = false;

      if (this.overlayPos === 'topLeft') {
        outRight = window.innerWidth - (parentRect.x + conRect.width) < 0;
        outLeft = parentRect.x < 0;
      }
      if (this.overlayPos === 'topCenter') {
        outRight =
          window.innerWidth -
            (parentRect.x + (parentRect.width / 2 + conRect.width / 2)) <
          0;
        outLeft = parentRect.x + (parentRect.width / 2 - conRect.width / 2) < 0;
      }
      if (this.overlayPos === 'topRight') {
        outRight = window.innerWidth - (parentRect.x + parentRect.width) < 0;
        outLeft = parentRect.x + parentRect.width - conRect.width < 0;
      }
      isOutsideScreen = outRight || outLeft || outTop || outBot;
    }

    if (
      this.overlayPos === 'botLeft' ||
      this.overlayPos === 'botCenter' ||
      this.overlayPos === 'botRight'
    ) {
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
      if (this.overlayPos === 'botCenter') {
        outRight =
          window.innerWidth -
            (parentRect.x + (parentRect.width / 2 + conRect.width / 2)) <
          0;
        outLeft = parentRect.x + (parentRect.width / 2 - conRect.width / 2) < 0;
      }
      if (this.overlayPos === 'botRight') {
        outRight = window.innerWidth - (parentRect.x + parentRect.width) < 0;
        outLeft = parentRect.x + parentRect.width - conRect.width < 0;
      }
      isOutsideScreen = outRight || outLeft || outTop || outBot;
    }
    return isOutsideScreen;
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
      if (
        this.overlayPos === 'topLeft' ||
        this.overlayPos === 'topCenter' ||
        this.overlayPos === 'topRight'
      ) {
        rootElement.style.top = `${parentRect.y - conRect.height}px`;
        switch (this.overlayPos) {
          case 'topLeft':
            rootElement.style.left = `${parentRect.x}px`;
            break;
          case 'topCenter':
            rootElement.style.left = `${
              parentRect.x + (parentRect.width / 2 - conRect.width / 2)
            }px`;
            break;
          case 'topRight':
            rootElement.style.left = `${
              parentRect.x + parentRect.width - conRect.width
            }px`;
            break;
        }
      }

      if (
        this.overlayPos === 'botLeft' ||
        this.overlayPos === 'botCenter' ||
        this.overlayPos === 'botRight'
      ) {
        rootElement.style.top = `${parentRect.y + parentRect.height}px`;
        switch (this.overlayPos) {
          case 'botLeft':
            rootElement.style.left = `${parentRect.x}px`;
            break;
          case 'botCenter':
            rootElement.style.left = `${
              parentRect.x + (parentRect.width / 2 - conRect.width / 2)
            }px`;
            break;
          case 'botRight':
            rootElement.style.left = `${
              parentRect.x + parentRect.width - conRect.width
            }px`;
            break;
        }
      }

      if (
        this.overlayPos === 'leftTop' ||
        this.overlayPos === 'leftCenter' ||
        this.overlayPos === 'leftBot'
      ) {
        rootElement.style.left = `${parentRect.x - conRect.width}px`;
        switch (this.overlayPos) {
          case 'leftTop':
            rootElement.style.top = `${parentRect.y}px`;
            break;
          case 'leftCenter':
            rootElement.style.top = `${
              parentRect.y + (parentRect.height / 2 - conRect.height / 2)
            }px`;
            break;
          case 'leftBot':
            rootElement.style.top = `${
              parentRect.y - (conRect.height - parentRect.height)
            }px`;
            break;
        }
      }

      if (
        this.overlayPos === 'rightTop' ||
        this.overlayPos === 'rightCenter' ||
        this.overlayPos === 'rightBot'
      ) {
        rootElement.style.left = `${parentRect.x + parentRect.width}px`;
        switch (this.overlayPos) {
          case 'rightTop':
            rootElement.style.top = `${parentRect.y}px`;
            break;
          case 'rightCenter':
            rootElement.style.top = `${
              parentRect.y + (parentRect.height / 2 - conRect.height / 2)
            }px`;
            break;
          case 'rightBot':
            rootElement.style.top = `${
              parentRect.y - (conRect.height - parentRect.height)
            }px`;
            break;
        }
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
