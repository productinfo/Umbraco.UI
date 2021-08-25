import { property, query, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';
import { UUIOverlayEvent } from './UUIOverlayEvent';

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
      }
      #root,
      #parent {
        position: relative;
      }
    `,
  ];

  // Cashed non-state variables //////////////////////////////
  intersectionObserver?: IntersectionObserver;
  documentClickEventHandler = this.onDocumentClick.bind(this);
  scrollEventHandler = this.updateOverlay.bind(this);
  scrollTimeout: any;
  ////////////////////////////////////////////////////////////

  @query('#container') containerElement?: HTMLElement;

  @state() _open = false;
  @state() _overlayPos: OverlayPosition = 'botLeft';
  @state() parent?: Element;

  @property({ type: Boolean, attribute: 'use-clamp' }) useClamp = false;
  @property({ type: Boolean, attribute: 'use-auto-placement' })
  useAutoPlacement = false;
  @property({ type: Number }) margin = 0;
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
    newValue ? this.openOverlay() : this.closeOverlay();
  }

  firstUpdated() {
    const slot = this.shadowRoot!.querySelector('slot');
    const childNodes = slot!.assignedNodes({ flatten: true });
    this.parent = childNodes[0] as HTMLElement;
  }

  disconnectedCallback() {
    document.addEventListener('click', this.documentClickEventHandler);
    document.removeEventListener('scroll', this.scrollEventHandler);
    this.intersectionObserver?.disconnect();
  }

  openOverlay() {
    if (this.containerElement) {
      this.containerElement!.style.opacity = '0';
      document.addEventListener('click', this.documentClickEventHandler);

      setTimeout(() => {
        this.updateOverlay();
        this.createIntersectionObserver();
        this.containerElement!.style.opacity = '1';
      }, 0);
    }
  }

  closeOverlay() {
    this.intersectionObserver?.disconnect();
    document.removeEventListener('click', this.documentClickEventHandler);
  }

  // Use this when changing the open state from within this component.
  forceCloseOverlay() {
    this.open = false;
    // Notifies parent about changes.
    this.dispatchEvent(new UUIOverlayEvent(UUIOverlayEvent.CHANGE));
  }

  createIntersectionObserver() {
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
        document.addEventListener('scroll', this.scrollEventHandler);
      } else {
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
          document.removeEventListener('scroll', this.scrollEventHandler);
        }, 1000);
      }
    });
  };

  // Close when clicking outside overlay
  onDocumentClick(event: Event) {
    if (!event.composedPath().includes(this)) {
      this.forceCloseOverlay();
    }
  }

  updateOverlay() {
    if (this.shadowRoot) {
      const conRect = this.containerElement?.getBoundingClientRect()!;
      const parentRect = this.parent!.getBoundingClientRect()!;
      const containerElement = this.containerElement!;

      this.updateOverlayPlacement(conRect, parentRect, containerElement);
    }
  }

  updateOverlayPos(rect: DOMRect) {
    const sideSplit = this._overlayPos.split(/(?=[A-Z])/);
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

    // If we need to flip, do it, otherwise dont do anything.
    if (flipSide) {
      this._overlayPos = (flipSide + sideSuffix) as OverlayPosition;
    }
  }

  updateOverlayPlacement(
    conRect: DOMRect,
    parentRect: DOMRect,
    containerElement: HTMLElement
  ) {
    if (parentRect != null && conRect != null && containerElement != null) {
      containerElement.style.top = '';
      containerElement.style.bottom = '';
      containerElement.style.left = '';
      containerElement.style.right = '';

      const isTopHorizontal = this._overlayPos.indexOf('top') !== -1;
      const isBotHorizontal = this._overlayPos.indexOf('bot') !== -1;
      const isLeftHorizontal = this._overlayPos.indexOf('Left') !== -1;
      const isRightHorizontal = this._overlayPos.indexOf('Right') !== -1;
      const isTopVertical = this._overlayPos.indexOf('Top') !== -1;
      const isBotVertical = this._overlayPos.indexOf('Bot') !== -1;
      const isLeftVertical = this._overlayPos.indexOf('left') !== -1;
      const isRightVertical = this._overlayPos.indexOf('right') !== -1;
      const isCenter = this._overlayPos.indexOf('Center') !== -1;

      // -------- | INITIATE MATH | --------
      let originX = 0;
      let originY = 0;
      let alignX = 0;
      let alignY = 0;

      let marginX = 0;
      let marginY = 0;

      if (this.useAutoPlacement) {
        const halfWindowX = window.innerWidth / 2;
        const halfWindowY = window.innerHeight / 2;

        const dirX = this.mathClamp(
          this.mathMap(halfWindowX - parentRect.x, 0, parentRect.width, 0, 1),
          0,
          1
        );
        let dirY = this.mathClamp(
          this.mathMap(halfWindowY - parentRect.y, 0, parentRect.height, 0, 1),
          0,
          1
        );

        if (dirX > 0 && dirX < 1) {
          dirY = Math.round(dirY);
        }

        originX = dirX;
        originY = dirY;
        alignX = 1 - dirX;
        alignY = 1 - dirY;
        marginX = this.margin;
        marginY = this.margin;
      } else {
        this.updateOverlayPos(conRect);
        // -------- TOP / BOT --------
        if (isTopHorizontal) {
          alignY = 1;
          originY = 0;
          marginY = this.margin;
        }

        if (isBotHorizontal) {
          alignY = 0;
          originY = 1;
          marginY = this.margin;
        }

        if (isTopHorizontal || isBotHorizontal) {
          if (isCenter) {
            alignX = 0.5;
            originX = 0.5;
          }
        }

        if (isLeftHorizontal) {
          alignX = 0;
          originX = 0;
        }
        if (isRightHorizontal) {
          alignX = 1;
          originX = 1;
        }

        // -------- LEFT / RIGHT --------
        if (isLeftVertical) {
          alignX = 1;
          originX = 0;
          marginX = this.margin;
        }
        if (isRightVertical) {
          alignX = 0;
          originX = 1;
          marginX = this.margin;
        }

        if (isLeftVertical || isRightVertical) {
          if (isCenter) {
            alignY = 0.5;
            originY = 0.5;
          }
        }

        if (isTopVertical) {
          alignY = 0;
          originY = 0;
        }
        if (isBotVertical) {
          alignY = 1;
          originY = 1;
        }
      }

      const calcX =
        -conRect.width * alignX +
        parentRect.width * originX -
        marginX * (alignX * 2 - 1);
      const calcY =
        -conRect.height * alignY +
        parentRect.height * originY -
        marginY * (alignY * 2 - 1);

      let clampXFinal = calcX;
      let clampYFinal = calcY;

      // IF Useclamp and not using autoplacement
      // Clamps the overlay to the screen as long as parent is on screen
      if (this.useClamp && !this.useAutoPlacement) {
        // Only do this clamp if overlay is on the top or bottom of the parent.
        if (isTopHorizontal || isBotHorizontal) {
          const leftClamp = -parentRect.x;
          const rightClamp =
            document.documentElement.clientWidth -
            parentRect.x -
            parentRect.width +
            calcX -
            (conRect.width - parentRect.width) * (1 - originX);

          const clampX = this.mathClamp(calcX, leftClamp, rightClamp);
          clampXFinal = this.mathClamp(
            clampX,
            -conRect.width,
            parentRect.width
          );
        }

        if (isLeftVertical || isRightVertical) {
          // Only do this clamp if overlay is on the sides of the parent.
          const topClamp = -parentRect.y;
          const bottomClamp =
            document.documentElement.clientHeight -
            parentRect.y -
            parentRect.height +
            calcY -
            (conRect.height - parentRect.height) * (1 - originY);

          const clampY = this.mathClamp(calcY, topClamp, bottomClamp);
          clampYFinal = this.mathClamp(
            clampY,
            -conRect.height,
            parentRect.height
          );
        }
      }

      console.log(marginX, marginY);
      // apply the positions as styling
      containerElement.style.left = `${clampXFinal}px`;
      containerElement.style.top = `${clampYFinal}px`;
    }
  }

  render() {
    return html`
      <div id="root">
        <slot id="parent" name="parent"></slot>
        <div id="container">
          ${this.open ? html`<slot name="overlay"></slot>` : ''}
        </div>
      </div>
    `;
  }

  // ------------------- Math extensions ---------------------
  mathClamp(value: number, min: number, max: number) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    }
    return value;
  }

  mathMap(value: number, x1: number, y1: number, x2: number, y2: number) {
    return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
  }
}
