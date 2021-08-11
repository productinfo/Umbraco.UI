import { property, query, state } from 'lit/decorators';
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
 *  @element uui-overlay
 */

export class UUIOverlayElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
      }
      #container {
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
  @state() _overlayPosWant: OverlayPosition = 'botLeft';
  @state() overlayPosCurrent: OverlayPosition = this._overlayPosWant;
  @state() rootElement?: HTMLElement;
  @state() top = false;
  @state() intersectionObserver?: IntersectionObserver;

  @query('#container') containerElement?: HTMLElement;

  @property({ type: Number }) margin = 0;
  @property({ type: Object }) parent?: Element;
  @property({ type: String })
  get overlayPos() {
    return this._overlayPosWant;
  }
  set overlayPos(newValue) {
    this._overlayPosWant = newValue;
    this.overlayPosCurrent = newValue;
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

  initOverlay() {
    if (this.rootElement) {
      //Reset Styling
      this.rootElement.style.opacity = '0';

      setTimeout(() => {
        this.updateOverlay();
        this.createOberserver();
        this.rootElement!.style.opacity = '1';
      }, 0);
    }
  }

  closeOverlay() {
    this.intersectionObserver?.disconnect();
  }

  createOberserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    this.intersectionObserver = new IntersectionObserver(
      this.intersectionCallback,
      options
    );

    this.intersectionObserver.observe(this.containerElement as Element);
  }

  intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(element => {
      if (!element.isIntersecting) {
        this.setFlipSide(element.intersectionRect);
        this.updateOverlay();
      }
    });
  };

  setFlipSide(rect: DOMRectReadOnly) {
    const sideSplit = this.overlayPosCurrent.split(/(?=[A-Z])/);
    const currentSide = sideSplit[0];
    const sideSuffix = sideSplit[1] || 'Center';
    const viewportHeight = document.documentElement.clientHeight;
    const viewportWidth = document.documentElement.clientWidth;

    let flipSide = '';

    // add this to the calculation make sure that the position checks are not off by e.g: 0.1 pixel.
    const buffer = 2;

    if (currentSide === 'top' && rect.y - buffer <= 0) {
      flipSide = 'bot';
    }
    if (
      currentSide === 'bot' &&
      rect.y + rect.height + buffer >= viewportHeight
    ) {
      flipSide = 'top';
    }
    if (currentSide === 'left' && rect.x - buffer <= 0) {
      flipSide = 'right';
    }
    if (
      currentSide === 'right' &&
      rect.x + rect.width + buffer >= viewportWidth
    ) {
      flipSide = 'left';
    }
    console.log(rect.x + rect.width, viewportWidth);

    // If we need to flip, do it, otherwise dont do anything.
    if (flipSide) {
      this.overlayPosCurrent = (flipSide + sideSuffix) as OverlayPosition;
    }
  }

  updateOverlay() {
    if (!this.shadowRoot) {
      return;
    }
    // TODO: These 3 should propably be cashed.
    const conRect = this.containerElement?.getBoundingClientRect()!;
    const parentRect = this.parent!.getBoundingClientRect()!;
    const rootElement = this.rootElement!;

    this.staticPlacement(conRect, parentRect, rootElement);
  }

  staticPlacement(
    conRect: DOMRect,
    parentRect: DOMRect,
    rootElement: HTMLElement
  ) {
    if (parentRect != null && conRect != null && rootElement != null) {
      rootElement.style.top = '';
      rootElement.style.bottom = '';
      rootElement.style.left = '';
      rootElement.style.right = '';

      let originX = 0;
      let originY = 0;
      let alignX = 0;
      let alignY = 0;

      let marginX = 0;
      let marginY = 0;

      // -------- TOP / BOT --------
      if (this.overlayPosCurrent.indexOf('top') !== -1) {
        alignY = 1;
        originY = 0;
        marginY = this.margin;
      }

      if (this.overlayPosCurrent.indexOf('bot') !== -1) {
        alignY = 0;
        originY = 1;
        marginY = this.margin;
      }

      if (
        this.overlayPosCurrent.indexOf('top') !== -1 ||
        this.overlayPosCurrent.indexOf('bot') !== -1
      ) {
        if (this.overlayPosCurrent.indexOf('Center') !== -1) {
          alignX = 0.5;
          originX = 0.5;
        }
      }

      if (this.overlayPosCurrent.indexOf('Left') !== -1) {
        alignX = 0;
        originX = 0;
      }
      if (this.overlayPosCurrent.indexOf('Right') !== -1) {
        alignX = 1;
        originX = 1;
      }

      // -------- LEFT / RIGHT --------
      if (this.overlayPosCurrent.indexOf('left') !== -1) {
        alignX = 1;
        originX = 0;
        marginX = this.margin;
      }
      if (this.overlayPosCurrent.indexOf('right') !== -1) {
        alignX = 0;
        originX = 1;
        marginX = this.margin;
      }

      if (
        this.overlayPosCurrent.indexOf('left') !== -1 ||
        this.overlayPosCurrent.indexOf('right') !== -1
      ) {
        if (this.overlayPosCurrent.indexOf('Center') !== -1) {
          alignY = 0.5;
          originY = 0.5;
        }
      }

      if (this.overlayPosCurrent.indexOf('Top') !== -1) {
        alignY = 0;
        originY = 0;
      }
      if (this.overlayPosCurrent.indexOf('Bot') !== -1) {
        alignY = 1;
        originY = 1;
      }

      const calcX =
        -conRect.width * alignX +
        parentRect.width * originX -
        marginX * (alignX * 2 - 1);
      const calcY =
        -conRect.height * alignY -
        parentRect.height * (1 - originY) -
        marginY * (alignY * 2 - 1);

      rootElement.style.left = `${calcX}px`;
      rootElement.style.top = `${calcY}px`;
    }
  }

  render() {
    return this.open
      ? html`
          <div id="container">
            <slot></slot>
          </div>
        `
      : '';
  }

  // ------ BELOW IS NOT IN USE A THE MOMENT ------

  @property({ type: Boolean }) useAutoPlacement = false;

  mathClamp(value: number, min: number, max: number) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    }
    return value;
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
}
